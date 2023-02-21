# The ethereum.org website stack

- [Node.js](https://nodejs.org/)
- [Yarn package manager](https://yarnpkg.com/cli/install)
- [Gatsby](https://www.gatsbyjs.org/)
  - Manages page builds and deployment
  - Configurable in `gatsby-node.ts`, `gatsby-browser.ts`, `gatsby-config.ts`, and `gatsby-ssr.ts`
  - [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/)
  - [Gatsby Docs](https://www.gatsbyjs.org/docs/)
- [React](https://reactjs.org/) - A JavaScript library for building component-based user interfaces
- [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript
- [Chakra UI](https://chakra-ui.com/) - A UI library (Migration in progress)
- [GraphQL](https://graphql.org/) - A query language for APIs
- [Algolia](https://www.algolia.com/) - Site indexing, rapid intra-site search results, and search analytics. [Learn more on how we implement Algolia for site search](./docs/ALGOLIA_DOCSEARCH.md).
  - Primary implementation: `/src/components/Search/index.ts`
- [Crowdin](https://crowdin.com/) - crowdsourcing for our translation efforts (See "Translation initiative" below)
- [GitHub Actions](https://github.com/features/actions) - Manages CI/CD, and issue tracking
- [Netlify](https://www.netlify.com/) - DNS management and primary host for `master` build.
- [Gatsby Cloud](https://www.gatsbyjs.com/) - Site builds and automatic preview deployments for all pull requests

## Code structure

| Folder                                   | Primary use                                                                                                                                                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/src`                                   | Main source folder for development                                                                                                                                                                                  |
| `/src/assets`                            | Image assets                                                                                                                                                                                                        |
| `/src/components`                        | React components that do not function as standalone pages                                                                                                                                                           |
| `/src/content`                           | Markdown/MDX files for site content stored here. <br>For example: `ethereum.org/en/about/` is built from `src/content/about/index.md` <br>The markdown files are parsed and rendered by `src/templates/static.ts`\* |
| `/src/content/developers/docs`           | \*Markdown files in here use the Docs template: `src/templates/docs.ts`                                                                                                                                             |
| `/src/content/developers/tutorials`      | \*Markdown files in here use the Tutorial template: `src/templates/tutorial.ts`                                                                                                                                     |
| `/src/data`                              | General data files importable by components                                                                                                                                                                         |
| `/src/hooks`                             | Custom React hooks                                                                                                                                                                                                  |
| `/src/intl`                              | Language translation JSON files                                                                                                                                                                                     |
| `/src/lambda`                            | Lambda function scripts for API calls                                                                                                                                                                               |
| `/src/pages`<br>`/src/pages-conditional` | React components that function as standalone pages. <br>For example: `ethereum.org/en/wallets/find-wallet` is built from `src/pages/wallets/find-wallet.ts`                                                         |
| `/src/scripts`<br>`/src/utils`           | Custom utility scripts                                                                                                                                                                                              |
| `/src/styles`                            | Stores `layout.css` which contains root level css styling                                                                                                                                                           |
| `/src/templates`                         | TSX templates that define layouts of different regions of the site                                                                                                                                                  |
| `/src/theme.ts`                          | Declares site color themes, breakpoints and other constants (try to utilize these colors first)                                                                                                                     |
