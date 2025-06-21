import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(home)/')({ component: Home });

function Home() {
  return <h1 className="text-neutral-400 text-3xl font-thin">Turbo Base</h1>;
}
