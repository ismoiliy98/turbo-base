#!/bin/bash

if ! mapfile -t app_paths < <(
  turbo --no-update-notifier --skip-infer build --only \
    --filter '...[HEAD^]' --dry-run json |
    jq -r '.packages[] | select(startswith("@app")) | sub("^@app"; "apps")'
); then
  printf 'Error: Failed to read packages\n' >&2
  exit 1
fi

json='['

for app_path in "${app_paths[@]}"; do
  app_json="$app_path/package.json"
  app_name="$(jq -r '.name' <"$app_json")"
  app_version="$(jq -r '.version' <"$app_json")"
  app_dockerfile="$app_path/Dockerfile"

  if [[ -z "$app_name" ]] || [[ -z "$app_version" ]] ||
    [[ ! -f "$app_dockerfile" ]]; then
    continue
  fi

  release='false'

  if [[ "$APP_EVENT" != 'pull_request' ]]; then
    git diff HEAD^ HEAD -- "$app_json" |
      grep '"version":' &>/dev/null && release='true'
    app_img="$IMAGES_REGISTRY/$(echo "$app_name" |
      sed 's|@||g' |
      tr '/' '-' |
      tr '[:upper:]' '[:lower:]')"
    app_tags="$app_img:$app_version-$APP_BRANCH,$app_img:$APP_BRANCH"

    if [[ "$APP_BRANCH" == 'main' ]]; then
      app_tags="$app_img:$app_version,$app_img:latest"
    fi
  fi

  json+="{ \
    \"name\": \"$app_name\", \
    \"tags\": \"$app_tags\", \
    \"version\": \"$app_version\", \
    \"dockerfile\": \"$app_dockerfile\", \
    \"release\": $release,
  },"
done

echo "include=${json%,}]"
