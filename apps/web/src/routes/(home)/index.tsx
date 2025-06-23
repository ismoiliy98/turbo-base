import { Button } from '@pkg/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/(home)/')({ component: Home });

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-neutral-400 text-3xl font-thin">Turbo Base</h1>
      <div className="flex items-center justify-center gap-2">
        <span className="text-primary">Count: {count}</span>
        <Button size="sm" onClick={() => setCount(count + 1)}>
          Add +1
        </Button>
      </div>
    </div>
  );
}
