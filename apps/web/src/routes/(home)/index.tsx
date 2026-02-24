import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { Button } from '@pkg/ui/button';

export const Route = createFileRoute('/(home)/')({ component: Home });

function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="font-thin text-3xl text-neutral-400">Turbo Base</h1>
      <div className="flex items-center justify-center gap-2">
        <span className="text-neutral-500">Count: {count}</span>
        <Button onClick={() => setCount(count + 1)} size="sm">
          Add +1
        </Button>
      </div>
    </div>
  );
}
