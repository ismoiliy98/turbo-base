# 🌐 @app/web

A modern React web application built with TanStack Start, Vite, and Tailwind CSS, providing the frontend interface for the Turbo Base monorepo. 🚀

## 📖 Overview

This application serves as the primary web interface for the Turbo Base platform. Built with React 19.x, TanStack Start for server-side rendering, TanStack Router for type-safe routing, and styled with Tailwind CSS, it provides a fast, modern, and accessible user experience with theme switching capabilities.

## 🛠️ Tech Stack

### 🌟 Core Framework

- **[React 19.x](https://react.dev/)** - Modern React with concurrent features
- **[TanStack Start](https://tanstack.com/start)** - Full-stack React framework with SSR
- **[TanStack Router](https://tanstack.com/router)** - Type-safe React routing

### 🎨 Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **@pkg/ui** - Internal UI component library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### 🔧 Build Tools

- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[TypeScript](https://typescriptlang.org/)** - Type safety and developer experience
- **[PostCSS](https://postcss.org/)** - CSS processing with Autoprefixer

### 🎭 Fonts & Assets

- **[Geist](https://vercel.com/font)** - Modern variable font family
- **[Geist Mono](https://vercel.com/font)** - Monospace variant for code

## 🏗️ Architecture

### 📁 Project Structure

```sh
apps/web/
├── src/
│   ├── assets/         # Static assets and global styles
│   │   └── tailwind.css    # Global CSS and Tailwind imports
│   ├── components/     # Reusable React components
│   │   ├── error/          # Error boundary components
│   │   ├── header.tsx      # App header component
│   │   ├── root.tsx        # Root app component
│   │   └── theme-provider.tsx  # Theme context provider
│   ├── lib/            # Utility libraries
│   │   └── theme.ts        # Theme management utilities
│   ├── routes/         # File-based routing structure
│   │   ├── (home)/         # Home route group
│   │   │   └── index.tsx   # Homepage component
│   │   └── __root.tsx      # Root route configuration
│   ├── routeTree.gen.ts    # Generated route tree
│   ├── router.tsx          # Router configuration
│   └── vite-env.d.ts       # Vite type definitions
├── .env.sample         # Environment variables template
├── Dockerfile          # Container configuration
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── turbo.json          # Turborepo configuration
└── vite.config.ts      # Vite configuration
```

### 🧭 Routing Architecture

The application uses TanStack Router's file-based routing:

```sh
Route Structure
├── __root.tsx          # Root layout and providers
└── (home)/             # Route group
    └── index.tsx       # Home page (/)
```

### 🎨 Component Architecture

```sh
Component Hierarchy
├── RootComponent           # App shell with theme provider
│   ├── ThemeProvider      # Theme context and state
│   ├── Header             # Navigation and theme toggle
│   └── Outlet             # Route content area
└── Page Components        # Individual route components
```

## 🚀 Getting Started

### 📋 Prerequisites

- **Bun** >= 1.x or **Node.js** >= 18.0.0
- **Modern browser** with ES2022 support

### 🔧 Environment Setup

1. **Copy environment template:**

    ```bash
    cp .env.sample .env
    ```

2. **Configure environment variables:**

    ```bash
    # Development Configuration
    PORT=3001             # Development server port
    ```

### 🏃‍♂️ Development

```bash
# Start development server with hot reload
bun run dev

# Type check the application
bun run ts:check

# Build for production
bun run build

# Preview production build
bun run preview
```

### 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t turbo-web .

# Run container
docker run -p 3001:3001 turbo-web
```

## 🎨 Styling & Theming

### 🌈 Design System

The application uses a comprehensive design system:

- **Color Palette**: CSS variables for light/dark theme support (defined in tailwind.css)
- **Typography**: Geist font family with CSS variable setup
- **Spacing**: Consistent spacing scale with Tailwind utilities
- **Components**: Reusable UI components from @pkg/ui including ThemeToggle

### 🌙 Theme Management

```typescript
// Theme switching functionality
import { useTheme } from '~/components/theme-provider';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### 🎯 Tailwind Configuration

The app extends the base Tailwind configuration:

```typescript
// tailwind.config.ts
export default {
  content: [...baseConfig.content],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
    },
  },
} satisfies Config;
```

## 🧭 Routing & Navigation

### 🛣️ Creating New Routes

1. **Create route file:**

    ```bash
    # For a new page at /about
    touch src/routes/about.tsx
    ```

2. **Define route component:**

    ```typescript
    // src/routes/about.tsx
    import { createFileRoute } from '@tanstack/react-router';

    export const Route = createFileRoute('/about')({
      component: About,
    });

    function About() {
      return (
        <div>
          <h1>About Page</h1>
          <p>Welcome to our platform!</p>
        </div>
      );
    }
    ```

3. **Regenerate route tree:**

    ```bash
    # The route tree is automatically generated
    bun run dev  # or build process will update it
    ```

### 🔗 Navigation

```typescript
import { Link } from '@tanstack/react-router';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {/* Add more links as routes are created */}
    </nav>
  );
}
```

### 📊 Route Data Loading

```typescript
// Route with data loading
export const Route = createFileRoute('/users')({
  loader: async () => {
    const users = await fetchUsers();
    return { users };
  },
  component: Users,
});

function Users() {
  const { users } = Route.useLoaderData();
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 🧩 Component Development

### 🎨 Using UI Components

```typescript
import { Button } from '@pkg/ui/button';
import { cn } from '@pkg/ui';

function MyComponent() {
  return (
    <div className={cn('flex gap-4', 'p-4')}>
      <Button variant="default">Primary Action</Button>
      <Button variant="outline">Secondary Action</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

### 🔄 State Management

```typescript
// Using the actual counter from home page
import { Button } from '@pkg/ui/button';
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="font-thin text-3xl text-neutral-400">Turbo Base</h1>
      <div className="flex items-center justify-center gap-2">
        <span className="text-neutral-500">Count: {count}</span>
        <Button size="sm" onClick={() => setCount(count + 1)}>
          Add +1
        </Button>
      </div>
    </div>
  );
}
```

### 🎭 Error Handling

```typescript
// Using the actual NotFound component
import { Button } from '@pkg/ui/button';
import { useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="container flex flex-col gap-2">
      <p className="font-medium text-destructive text-sm">404 error</p>
      <h1 className="mt-4 font-semibold text-2xl text-foreground md:text-3xl">
        We can't find that page
      </h1>
      <p className="text-neutral-400">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Button 
        variant="outline" 
        className="mt-4 w-fit"
        onClick={() => router.history.back()}
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Go back
      </Button>
    </section>
  );
}
```

## 🚀 Performance & Optimization

### ⚡ Built-in Optimizations

- **TanStack Start**: Server-side rendering and automatic code splitting
- **Vite**: Fast HMR and optimized production builds
- **React 19.x**: Concurrent features and automatic batching
- **Route-based Splitting**: Automatic code splitting by routes

### 📊 Build Optimizations

- **Tree Shaking**: Unused code elimination
- **CSS Purging**: Unused Tailwind classes removed
- **Asset Optimization**: Automatic image and font optimization
- **Bundle Analysis**: Built-in bundle size analysis

### 🎯 Performance Best Practices

```typescript
// Lazy loading components
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

## 🧪 Testing

### 🔬 Testing Setup

```bash
# Install testing dependencies
bun add -d @testing-library/react @testing-library/jest-dom vitest

# Run tests
bun run test

# Run tests in watch mode
bun run test --watch
```

### 📝 Writing Tests

```typescript
// Component test example using actual route component
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

// Mock the createFileRoute for testing
const mockRoute = {
  useLoaderData: () => ({}),
};

test('renders home page with counter', () => {
  render(<Home />);
  expect(screen.getByText('Turbo Base')).toBeInTheDocument();
  expect(screen.getByText(/Count:/)).toBeInTheDocument();
  expect(screen.getByText('Add +1')).toBeInTheDocument();
});
```

## 🔐 Security & Best Practices

### 🛡️ Security Features

- **Type Safety**: Full TypeScript coverage for runtime safety
- **Sanitized Inputs**: Automatic XSS protection
- **Secure Headers**: CSP and security headers in production
- **Environment Variables**: Secure handling of sensitive data

### 📋 Development Best Practices

- Use TypeScript for all components and utilities
- Follow React best practices for state management
- Implement proper error boundaries
- Use semantic HTML for accessibility
- Test components with realistic user interactions

## 📄 License

This application is part of the Turbo Base monorepo and follows the same license terms.
