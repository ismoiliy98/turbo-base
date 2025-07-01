#!/bin/bash

FORCE_BUILD="$(echo "$FORCE_BUILD" | tr '[:upper:]' '[:lower:]')"

case "$FORCE_BUILD" in
true) FILTER="@app/*" ;;
*) FILTER="@app/*...[HEAD^1]" ;;
esac

if ! mapfile -t app_paths < <(
  turbo --no-update-notifier --skip-infer build --only \
    --filter="$FILTER" --dry-run json | jq -r '.tasks[].directory'
); then
  printf 'Error: Failed to read packages\n' >&2
  exit 1
fi

apps_json=()

for app_path in "${app_paths[@]}"; do
  app_json="$app_path/package.json"
  app_name="$(jq -r '.name' <"$app_json")"
  app_version="$(jq -r '.version' <"$app_json")"
  app_dockerfile="$app_path/Dockerfile"

  if [[ -z "$app_name" ]] || [[ -z "$app_version" ]] ||
    [[ ! -f "$app_dockerfile" ]]; then
    continue
  fi

  release="$FORCE_RELEASE"

  if [[ "$APP_EVENT" != 'pull_request' ]]; then
    git diff HEAD^ HEAD -- "$app_json" |
      grep '"version":' &>/dev/null && release='true'
    app_img="$IMAGES_REGISTRY/$(echo "$app_name" |
      sed 's|@||g' |
      tr '/' '-' |
      tr '[:upper:]' '[:lower:]')"
    app_tags="$app_img:$app_version-$APP_BRANCH,$app_img:$APP_BRANCH"

    [[ "$APP_BRANCH" == 'main' ]] &&
      app_tags="$app_img:$app_version,$app_img:latest"
  fi

  apps_json+=("$(jq -nc \
    --arg name "$app_name" \
    --arg tags "$app_tags" \
    --arg version "$app_version" \
    --arg dockerfile "$app_dockerfile" \
    --argjson release "$release" \
    '{name: $name, tags: $tags, version: $version,
    dockerfile: $dockerfile, release: $release}')")
done

json_input=$(printf "%s\n" "${apps_json[@]}")
echo "include=$(jq -sc . <<<"$json_input")"
