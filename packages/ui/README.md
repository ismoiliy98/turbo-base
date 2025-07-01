# 🎨 @pkg/ui

A comprehensive React UI component library for the Turbo Base monorepo, built with Tailwind CSS, Shadcn/ui, Radix UI, and modern design principles. 🚀

## 📖 Overview

This internal UI package provides a collection of reusable, accessible, and customizable React components for building consistent user interfaces across all applications in the monorepo. Built on top of Radix UI primitives and styled with Tailwind CSS, it follows the shadcn/ui design system approach.

## ⚙️ Available Components

### 🔘 Button

Versatile button component with multiple variants and sizes, built with CVA and Radix UI Slot.

**Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`  
**Sizes:** `default`, `sm`, `lg`, `icon`

### 🌙 ThemeToggle

Theme toggle component for switching between light and dark modes with smooth animations.

### 🛠️ Utilities

- **`cn()`** - Merge Tailwind classes intelligently using clsx and tailwind-merge
- **`pxToRem()`** - Convert pixel values to rem units
- **`remToPx()`** - Convert rem values to pixel units

## 🚀 Usage Examples

### 📦 Installation

The package is automatically available within the monorepo workspace:

```json
{
  "dependencies": {
    "@pkg/ui": "workspace:*"
  }
}
```

### 🎯 Basic Component Usage

```tsx
import { Button } from '@pkg/ui/button';
import { cn } from '@pkg/ui';

export function LoginForm() {
  return (
    <form className="space-y-4">
      <Button 
        type="submit" 
        className={cn('w-full', 'hover:shadow-lg')}
      >
        Sign In
      </Button>
      
      <Button variant="outline" className="w-full">
        Cancel
      </Button>
    </form>
  );
}
```

### 🎨 Custom Button Variants

```tsx
import { Button } from '@pkg/ui/button';

export function ActionButtons() {
  return (
    <div className="flex gap-2">
      {/* Primary action */}
      <Button>Save Changes</Button>
      
      {/* Destructive action */}
      <Button variant="destructive">Delete</Button>
      
      {/* Secondary action */}
      <Button variant="outline">Cancel</Button>
      
      {/* Subtle action */}
      <Button variant="ghost">Learn More</Button>
    </div>
  );
}
```

### 🔧 Utility Functions

```tsx
import { cn, pxToRem, remToPx } from '@pkg/ui';

export function ResponsiveComponent() {
  // Class name merging
  const containerClass = cn(
    'flex items-center',
    'p-4 rounded-lg',
    'bg-background border'
  );
  
  // Unit conversion
  const responsiveHeight = pxToRem(48); // "3rem"
  const pixelWidth = remToPx(20); // 320px (if base font is 16px)
  
  return (
    <div 
      className={containerClass}
      style={{ height: responsiveHeight }}
    >
      Content
    </div>
  );
}
```

## 🏗️ Architecture

### 📁 Project Structure

```sh
packages/ui/
├── src/
│   ├── button.tsx         # Button component with variants
│   ├── index.ts           # Utility functions and exports
│   └── theme.tsx          # Theme configuration
├── components.json        # shadcn/ui configuration
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript configuration
└── turbo.json             # Turborepo configuration
```

### 🔧 Component Architecture

```sh
UI Package (@pkg/ui)
├── Radix UI Primitives
│   ├── @radix-ui/react-slot (Button base)
│   └── Accessibility features
├── Styling System
│   ├── Tailwind CSS classes
│   ├── Class Variance Authority (CVA)
│   └── clsx + tailwind-merge utilities
└── TypeScript Support
    ├── Variant props typing
    ├── Component prop interfaces
    └── Utility function types
```

## 🎨 Design System

### 🌈 Component Variants

The UI library follows a consistent variant system:

**Button Variants:**

- `default` - Primary brand button with solid background
- `destructive` - Red button for dangerous actions
- `outline` - Bordered button with transparent background
- `secondary` - Subtle button with secondary background
- `ghost` - Minimal button with hover effects only
- `link` - Text button with underline on hover

**Button Sizes:**

- `sm` - Small button (32px height)
- `default` - Standard button (36px height)
- `lg` - Large button (40px height)
- `icon` - Square icon button (36x36px)

### 🎯 Design Tokens

The components use CSS variables from the Tailwind configuration:

```css
/* Available design tokens */
--primary / --primary-foreground
--secondary / --secondary-foreground
--destructive / --destructive-foreground
--accent / --accent-foreground
--background / --foreground
--border / --input / --ring
```

## 🛠️ Development

### 📋 Scripts

```bash
# Type check the UI components
bun run ts:check

# Clean build artifacts and dependencies
bun run clean

# Add new shadcn/ui components
bun run ui:add <component-name>
```

### 🧪 Adding New Components

```bash
# Add a new shadcn/ui component
bun run ui:add dialog
bun run ui:add form
bun run ui:add input
```

### 🎨 Customizing Components

The package uses shadcn/ui configuration for easy component customization:

```json
{
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "../../tools/tailwind/web.ts",
    "baseColor": "slate",
    "cssVariables": true
  }
}
```

## 📚 Dependencies

### 🎨 Core Dependencies

- **@radix-ui/react-slot** - Composable slot primitive for flexible component APIs
- **class-variance-authority** - CVA for building type-safe component variants
- **clsx** - Utility for conditionally joining class names
- **lucide-react** - Beautiful & consistent SVG icon library
- **tailwind-merge** - Merge Tailwind CSS classes without style conflicts

### ⚙️ Development Dependencies

- **@tool/tsconfig** - Shared TypeScript configurations
- **TypeScript** - Type checking and compilation

### 🔗 Peer Dependencies

- **React** - Required React version from workspace catalog

## 🚀 Performance Features

### ⚡ Build Optimization

- **Tree Shaking**: Components are individually exportable
- **CSS-in-JS Free**: Pure Tailwind CSS classes for optimal performance
- **Bundle Size**: Minimal runtime overhead with utility-first approach
- **Type Safety**: Zero-cost abstractions with TypeScript

### 📦 Bundle Efficiency

- **Modular Exports**: Import only the components you need
- **Primitive Based**: Built on proven Radix UI primitives
- **Tailwind Optimized**: Works seamlessly with Tailwind's JIT compiler
- **No Runtime**: Compile-time class generation

## 🤝 Contributing

When contributing to the UI package:

1. **Accessibility** - Ensure all components meet WCAG 2.1 AA standards
2. **Design Consistency** - Follow the established variant and sizing patterns
3. **Performance** - Consider bundle size and runtime performance
4. **Documentation** - Update this README for new components
5. **Testing** - Test components across different screen sizes and themes

## 🎯 Best Practices

### 🎨 Component Design

- Use Radix UI primitives as the foundation for complex components
- Implement consistent variant patterns across all components
- Follow the CVA pattern for type-safe variant props
- Ensure proper keyboard navigation and screen reader support

### ⚡ Performance

- Leverage Tailwind's utility classes over custom CSS
- Use the `cn` utility for conditional class application
- Avoid unnecessary re-renders with proper prop design
- Keep component APIs simple and focused

### 🔧 Maintainability

- Follow the shadcn/ui conventions for new components
- Use TypeScript for all component APIs
- Maintain consistent naming patterns
- Document complex component behaviors

## 📄 License

This package is part of the Turbo Base monorepo and follows the same license terms.
