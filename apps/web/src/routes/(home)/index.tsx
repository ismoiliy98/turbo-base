import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(home)/')({ component: Home });

function Home() {
  return <h1>Hello, world!</h1>;
}
