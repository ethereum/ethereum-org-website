# The ethereum.org website stack

- [Node.js](https://nodejs.org/)
- [Yarn package manager](https://yarnpkg.com/cli/install)
- [NextJS](https://nextjs.org/)
  - React framework that provides some goodies out of the box (pages router, SSG, SSR, i18n support, Image component, etc)
  - Configurable in `next.config.js`
  - [NextJS Tutorial](https://nextjs.org/learn)
  - [NextJS Docs](https://nextjs.org/docs)
- [React](https://reactjs.org/) - A JavaScript library for building component-based user interfaces
- [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript
- [Chakra UI](https://chakra-ui.com/) - A UI library (Migration in progress)
- [Algolia](https://www.algolia.com/) - Site indexing, rapid intra-site search results, and search analytics. [Learn more on how we implement Algolia for site search](./docs/ALGOLIA_DOCSEARCH.md).
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
| `/public/content`                      | Markdown/MDX files for site content stored here. <br>For example: `ethereum.org/en/about/` is built from `public/content/about/index.md` <br>The markdown files are parsed by `[...slug].tsx` and rendered using the proper layout in `ContentPage.getLayout` method. |
| `/public/content/developers/docs`      | \*Markdown files in here use the Docs layout: `src/layouts/Docs.tsx`                                                                                                                                                                                                  |
| `/public/content/developers/tutorials` | \*Markdown files in here use the Tutorial layout: `src/layouts/Tutorial.tsx`                                                                                                                                                                                          |
| `/src/data`                            | General data files importable by components.                                                                                                                                                                                                                          |
| `/src/hooks`                           | Custom React hooks.                                                                                                                                                                                                                                                   |
| `/src/intl`                            | Language translation JSON files.                                                                                                                                                                                                                                      |
| `/src/pages/api`                       | NextJS API Routes (https://nextjs.org/docs/pages/building-your-application/routing/api-routes)                                                                                                                                                                        |
| `/src/pages`                           | React components that function as standalone pages.                                                                                                                                                                                                                   |
| `/src/scripts`<br>`/src/lib/utils`     | Custom utility scripts.                                                                                                                                                                                                                                               |
| `src/@chakra-ui`                       | Stores `theme.ts` which contains our custom Chakra theme, along with src/@chakra-ui/`semanticTokens.ts` (dark/light mode tokens) and custom Chakra components styles.                                                                                                 |
| `src/layouts`                          | NextJS layouts (https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript) that define layouts of different regions of the site.                                                                                              |
