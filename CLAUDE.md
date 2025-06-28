# CLAUDE.md - Ethereum.org Website

## Project Overview

This is the official Ethereum.org website - a Next.js application that serves as the primary educational and community hub for Ethereum. The site is built with modern web technologies and focuses on accessibility, internationalization, and performance.

## Technology Stack

### Core Framework

- **Next.js 14.2+** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5.5+** - Type safety and development experience
- **Tailwind CSS 3.4+** - Utility-first CSS framework

### Key Dependencies

- **next-intl 3.26+** - Internationalization (i18n) with 60+ languages
- **next-mdx-remote 5.0+** - MDX content processing
- **Framer Motion 10.13+** - Animations and transitions
- **Radix UI** - Accessible component primitives
- **ShadCN/UI** - Component library built on Radix UI
- **Recharts** - Data visualization
- **Viem/Wagmi** - Ethereum blockchain integration

### Development & Testing

- **Storybook 8.6+** - Component development and testing
- **Chromatic** - Visual regression testing
- **ESLint** - Code linting with custom rules
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **PNPM** - Package manager

## Project Structure

- **app/** - Next.js App Router pages
  - **[locale]/** - Internationalized routes
- **src/**
  - **components/** - React components
    - **ui/** - Design system components
    - **icons/** - SVG icon components
  - **data/** - Static data and configurations
  - **hooks/** - Custom React hooks
  - **i18n/** - Internationalization config
  - **intl/** - Translation files (60+ languages)
  - **layouts/** - Page layout components
  - **lib/** - Utility functions and types
    - **constants.ts** - App constants
    - **types.ts** - TypeScript type definitions
    - **utils/** - Utility functions
  - **styles/** - Global styles and design tokens
- **public/** - Static assets
  - **content/** - Markdown content files
  - **images/** - Image assets
- **docs/** - Development documentation

## Code Conventions

### File Naming

- **Components**: PascalCase (e.g., `ActionCard.tsx`)
- **Utilities**: camelCase (e.g., `cn.ts`, `relativePath.ts`)
- **Pages**: kebab-case following Next.js conventions
- **Assets**: kebab-case (e.g., `eth-logo.png`)

### TypeScript Patterns

- Use `interface` for object shapes, `type` for unions/intersections
- Prefer explicit typing over `any` (ESLint enforces `fixToUnknown`)
- Use generic constraints for reusable components
- Export types from dedicated files in `@/lib/types`

### Styling Conventions

- **Primary approach**: Tailwind CSS utility classes
- **Component variants**: Use `class-variance-authority` (cva)
- **Dynamic classes**: Use `cn()` utility (clsx + tailwind-merge)
- **Custom properties**: CSS variables in `:root` for theme values
- **Responsive design**: Mobile-first approach

## Development Workflows

### Available Scripts

```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # Run ESLint
pnpm lint:fix              # Fix ESLint issues
pnpm format                # Format with Prettier

# Storybook
pnpm storybook             # Start Storybook dev server
pnpm build-storybook       # Build Storybook
pnpm chromatic             # Run Chromatic visual tests

# Content Management
pnpm crowdin-import        # Import translations from Crowdin
pnpm markdown-checker      # Validate markdown content
pnpm events-import         # Import community events
```

### Testing Strategy

- **Visual Testing**: Storybook + Chromatic for component regression
- **Type Safety**: TypeScript strict mode enabled
- **Linting**: ESLint with custom rules for imports and TypeScript
- **Manual Testing**: No automated unit tests - relies on type safety and visual testing

## Content Management

### Internationalization

- **60+ languages** supported via Crowdin
- **RTL support** for Arabic, Hebrew, etc.
- Translation files (JSON format) in `src/intl/[locale]/`
- Content translations managed through Crowdin platform

### Markdown Content

- Educational content stored in `public/content/`
- Processed with `next-mdx-remote`
- Custom MDX components for rich content
- Automatic table of contents generation

### Asset Management

- Images optimized with Next.js Image component
- SVGs loaded as React components via `@svgr/webpack`
- Static assets served from `public/`
- Placeholder generation for images

## SEO & Meta

- Sitemap generation with `next-sitemap`
- Meta tags and Open Graph optimization
- Structured data for search engines
- Security headers (X-Frame-Options: DENY)

## Development Guidelines

### When Working on Features

1. **Check existing patterns** - Look at similar components first
2. **Prioritize Server Components** - Use App Router and Server Components when possible
3. **Follow import order** - ESLint will enforce, but be proactive
4. **Use TypeScript strictly** - No `any` types, prefer `unknown`
5. **Test in Storybook** - Create stories for new components (filename pattern: `.stories.tsx`)
6. **Consider i18n** - All user-facing text should be translatable (use `getTranslations` and `getLocale`)
7. **Mobile-first** - Design for mobile, enhance for desktop
8. **Accessibility** - Use Radix primitives, semantic HTML

### Component Development

1. Create component in appropriate `src/components/` subdirectory
   - Use `src/components/ui` for shadcn components or pure UI components
2. Add TypeScript types and proper props interface
3. Implement with proper forwardRef if needed
4. Add Storybook story in same directory
5. Export from appropriate index file
6. Update documentation if adding new patterns

### Content Updates

1. Markdown files go in `public/content/`
2. Images in `public/images/` with descriptive names
3. Translation strings in appropriate `src/intl/` JSON files
4. Data files in `src/data/` with TypeScript types

## Key Dependencies to Know

### UI & Styling

- `@radix-ui/*` - Accessible component primitives
- `tailwind-variants` - Component variant patterns
- `framer-motion` - Animation library
- `lucide-react` - Icon library

### Content & Data

- `gray-matter` - Frontmatter parsing
- `recharts` - Data visualization

### Ethereum Integration

- `viem` - Ethereum library
- `wagmi` - React hooks for Ethereum
- `@rainbow-me/rainbowkit` - Wallet connection

## Deployment

- **Platform**: Netlify (config in `netlify.toml`)
- **Next.js Integration**: Uses `@netlify/plugin-nextjs` for seamless Netlify and Next.js compatibility
- **Monitoring**: Matomo analytics integration
