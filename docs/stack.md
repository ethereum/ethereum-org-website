# The ethereum.org website stack

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- [Next.js 14](https://nextjs.org/)
  - React framework with App Router, SSG, SSR, i18n support, Image component, etc.
  - Configurable in `next.config.js`
  - [NextJS Tutorial](https://nextjs.org/learn)
  - [NextJS Docs](https://nextjs.org/docs)
- [React](https://react.dev/) - A JavaScript library for building component-based user interfaces
- [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ShadCN/UI](https://ui.shadcn.com/) - Component library built on Radix UI and Tailwind CSS
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Algolia](https://www.algolia.com/) - Site indexing, rapid intra-site search results, and search analytics. [Learn more on how we implement Algolia for site search](./site-search.md).
  - Primary implementation: `/src/components/Search/index.ts`
- [Crowdin](https://crowdin.com/) - crowdsourcing for our translation efforts (See "Translation initiative" below)
- [GitHub Actions](https://github.com/features/actions) - Manages CI/CD, and issue tracking
- [Netlify](https://www.netlify.com/) - DNS management and primary host for `master` build.
- [Storybook](https://storybook.js.org/) - For UI development, testing, and documentation. Check out [our storybook!](https://dev--63b7ea99632763723c7f4d6b.chromatic.com/)
- [Chromatic](https://www.chromatic.com/) - Visual testing & UI reviews. Visit [our chromatic project](https://www.chromatic.com/builds?appId=63b7ea99632763723c7f4d6b)

## Code structure

| Folder                                 | Primary use                                                                                                                                                                                                                                                           |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/src`                                 | Main source folder for development.                                                                                                                                                                                                                                   |
| `/public/assets`                       | Image assets.                                                                                                                                                                                                                                                         |
| `/src/components`                      | React components that do not function as standalone pages.                                                                                                                                                                                                            |
| `/public/content`                      | Markdown/MDX files for site content stored here. <br>For example: `ethereum.org/about/` is built from `public/content/about/index.md` <br>The markdown files are parsed by `[...slug].tsx` and rendered using the proper layout in `ContentPage.getLayout` method. |
| `/public/content/developers/docs`      | \*Markdown files in here use the Docs layout: `src/layouts/Docs.tsx`                                                                                                                                                                                                  |
| `/public/content/developers/tutorials` | \*Markdown files in here use the Tutorial layout: `src/layouts/Tutorial.tsx`                                                                                                                                                                                          |
| `/src/data`                            | General data files importable by components.                                                                                                                                                                                                                          |
| `/src/hooks`                           | Custom React hooks.                                                                                                                                                                                                                                                   |
| `/src/intl`                            | Language translation JSON files.                                                                                                                                                                                                                                      |
| `/app/api`                             | Next.js API Routes (https://nextjs.org/docs/app/building-your-application/routing/route-handlers)                                                                                                                                                                    |
| `/app`                                 | Next.js App Router pages and layouts.                                                                                                                                                                                                                                |
| `/src/scripts`<br>`/src/lib/utils`     | Custom utility scripts.                                                                                                                                                                                                                                               |
| `/src/styles`                          | Global styles and Tailwind CSS configuration.                                                                                                                                                                                                                        |
| `/src/layouts`                         | Next.js layout components used throughout the site.                                                                                                                                                                                                                  |
