# 🎨 @tool/tailwind-config

A collection of shared Tailwind CSS configurations for the Turbo Base monorepo, providing consistent styling foundations across web and mobile applications. 🚀

## 📖 Overview

This internal tooling package provides standardized Tailwind CSS configurations that can be extended by different packages and applications within the monorepo. It includes platform-specific presets for web and mobile applications with a unified design system.

## ⚙️ Available Configurations

### 🌐 Web Configuration

`web.ts` - Optimized for web applications

```typescript
import webConfig from '@tool/tailwind-config/web';

export default {
  presets: [webConfig],
  // Your additional configuration
} satisfies Config;
```

**Features:**

- Extends the base configuration
- Includes UI component library support (`../../packages/ui/src/**/*.{ts,tsx}`)
- Pre-configured with `tailwindcss-animate` plugin
- Empty theme object for custom extensions

### 📱 Mobile Configuration  

`mobile.ts` - Tailored for mobile applications

```typescript
import mobileConfig from '@tool/tailwind-config/mobile';

export default {
  presets: [mobileConfig],
  // Your mobile-specific configuration
} satisfies Config;
```

**Features:**

- Extends the base configuration
- Uses the same content patterns as base
- Empty theme object for custom extensions
- Lightweight configuration for mobile optimization

### 🎨 Base Configuration

`base.ts` - Foundation configuration shared across platforms

**Core Features:**

#### 🌗 Dark Mode Support

- Class-based dark mode implementation (`['class']`)
- CSS variable-based color system for seamless theme switching

#### 🎨 Extended Color Palette

The base configuration provides a comprehensive color system using CSS variables:

```css
/* Available CSS Variables */
--border
--input  
--ring
--background
--foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--destructive
--destructive-foreground
--muted
--muted-foreground
--accent
--accent-foreground
--popover
--popover-foreground
--card
--card-foreground
```

#### 📐 Content Scanning

- Default content pattern: `src/**/*.{ts,tsx}`
- Optimized for TypeScript and TSX files

## 🚀 Usage Examples

### 📦 Installing in a Package

```json
{
  "devDependencies": {
    "@tool/tailwind-config": "workspace:",
    "tailwindcss": "catalog:tooling"
  }
}
```

### 🌐 Web Application Setup

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import webConfig from '@tool/tailwind-config/web';

export default {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  presets: [webConfig],
  theme: {
    extend: {
      // Your custom extensions
      fontFamily: {
        custom: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Your additional plugins
  ],
} satisfies Config;
```

### 📱 Mobile Application Setup

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import mobileConfig from '@tool/tailwind-config/mobile';

export default {
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  presets: [mobileConfig],
  theme: {
    extend: {
      // Mobile-specific customizations
      spacing: {
        safe: 'env(safe-area-inset-top)',
      },
    },
  },
} satisfies Config;
```

### 🎨 Custom Configuration

```typescript
// For packages needing both web and mobile support
import type { Config } from 'tailwindcss';
import baseConfig from '@tool/tailwind-config/base';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [baseConfig],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [
    // Custom plugins
  ],
} satisfies Config;
```

## 🏗️ Architecture

### 📁 Project Structure

```sh
tools/tailwind/
├── base.ts           # Foundation configuration with color system
├── web.ts            # Web preset extending base + UI support
├── mobile.ts         # Mobile preset extending base
├── package.json      # Package configuration
└── tsconfig.json     # TypeScript configuration
```

### 🔧 Configuration Hierarchy

```sh
Base Configuration (base.ts)
├── Shared color system with CSS variables
├── Class-based dark mode
├── Content: src/**/*.{ts,tsx}
│
├── Web Configuration (web.ts)
│   ├── Extends base configuration
│   ├── Adds UI package content scanning
│   └── Includes tailwindcss-animate plugin
│
└── Mobile Configuration (mobile.ts)
    ├── Extends base configuration
    └── Uses same content patterns as base
```

## 🎨 Design System

### 🌈 Color System

The base configuration provides a comprehensive color system based on CSS variables. All colors use HSL values with CSS custom properties for consistent theming:

**Available Colors:**

- `border` - Default border color
- `input` - Form input backgrounds  
- `ring` - Focus ring color for accessibility
- `background` - Main background color
- `foreground` - Primary text color
- `primary` / `primary-foreground` - Brand primary colors
- `secondary` / `secondary-foreground` - Secondary colors
- `destructive` / `destructive-foreground` - Error and danger states
- `muted` / `muted-foreground` - Subdued text and backgrounds
- `accent` / `accent-foreground` - Highlight and accent elements
- `popover` / `popover-foreground` - Popover component colors
- `card` / `card-foreground` - Card component colors

### 📏 Content Scanning

The configurations use optimized content patterns:

- **Base**: `src/**/*.{ts,tsx}`
- **Web**: Extends base + `../../packages/ui/src/**/*.{ts,tsx}`
- **Mobile**: Same as base configuration

## 🛠️ Development

### 📋 Scripts

```bash
# Type check the configuration files
bun run ts:check

# Clean build artifacts and dependencies  
bun run clean
```

### 🧪 Testing Configurations

```bash
# Test web configuration
bunx tailwindcss -c web.ts --content "./test/**/*.html" -o test-web.css

# Test mobile configuration
bunx tailwindcss -c mobile.ts --content "./test/**/*.html" -o test-mobile.css
```

## 📚 Dependencies

### 🎨 Core Dependencies

- **tailwindcss** - Core Tailwind CSS framework (v3.x)
- **tailwindcss-animate** - Animation utilities for enhanced UX

### ⚙️ Development Dependencies

- **@tool/tsconfig** - Shared TypeScript configurations
- **TypeScript** - Type checking and compilation
- **Bun Types** - Runtime type definitions

## 🔌 Plugin Integration

The configurations are designed to work seamlessly with popular Tailwind plugins:

```typescript
// Example with additional plugins
import type { Config } from 'tailwindcss';
import webConfig from '@tool/tailwind-config/web';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  presets: [webConfig],
  plugins: [
    forms,
    typography,
    // Other plugins...
  ],
} satisfies Config;
```

## 🚀 Performance Optimization

### ⚡ Build Performance

- **Optimized Content Scanning**: Targeted file patterns
- **Tree Shaking**: Unused styles automatically removed
- **Caching**: Efficient build caching strategies
- **JIT Mode**: Just-in-time compilation for faster builds

### 📦 Bundle Size

- **Minimal Base**: Only essential utilities included
- **On-demand Loading**: Styles generated as needed
- **Purge Optimization**: Aggressive unused style removal
- **Compression Ready**: Optimized for production builds

## 🤝 Contributing

When contributing to the Tailwind configurations:

1. **Consistency**: Maintain design system consistency across platforms
2. **Performance**: Consider build and runtime performance impact
3. **Accessibility**: Ensure accessibility standards compliance
4. **Documentation**: Update this README for configuration changes
5. **Testing**: Test across different screen sizes and devices

## 🎯 Best Practices

### 🎨 Design Consistency

- Use CSS variables for dynamic theming
- Maintain consistent spacing scales
- Follow semantic color naming conventions
- Implement responsive design patterns

### ⚡ Performance

- Minimize configuration complexity
- Use efficient content scanning patterns
- Leverage Tailwind's JIT mode
- Optimize for production builds

### 🔧 Maintainability

- Keep configurations modular and focused
- Document custom utilities and components
- Use TypeScript for configuration validation
- Maintain backward compatibility when possible

## 📄 License

This tool is part of the Turbo Base monorepo and follows the same license terms.
