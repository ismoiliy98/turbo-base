import { Button } from '@pkg/ui/button';
import { useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="container flex flex-col gap-2">
      <p className="font-medium text-destructive text-sm">404 error</p>
      <h1 className="mt-4 font-semibold text-2xl text-foreground md:text-3xl">
        We can’t find that page
      </h1>
      <p className="text-neutral-400">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      <div className="mt-6 flex items-center gap-x-3">
        <Button onClick={() => router.navigate({ to: '..' })}>
          <ArrowLeftIcon />
          Go back
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.navigate({ to: '/', replace: true })}
        >
          Take me home
        </Button>
      </div>
    </section>
  );
}
