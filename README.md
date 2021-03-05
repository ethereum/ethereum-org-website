[![Netlify Status](https://api.netlify.com/api/v1/badges/e8f2e766-888b-4954-8500-1b647d84db99/deploy-status)](https://app.netlify.com/sites/ethereumorg/deploys)
[![All Contributors](https://img.shields.io/badge/all_contributors-258-orange.svg?style=flat-square)](#contributors)
[![Discord](https://img.shields.io/discord/714888181740339261?color=1C1CE1&label=ethereum.org%20%7C%20Discord%20%F0%9F%91%8B%20&style=flat-square)](https://discord.gg/CetY6Y4)
[![Twitter Follow](https://img.shields.io/twitter/follow/ethdotorg.svg?style=social)](https://twitter.com/ethdotorg)

<h1 align="center" style="margin-top: 1em; margin-bottom: 3em;">
  <p><a href="https://ethereum.org"><img alt="ethereum logo" src="./eth-transparent.png" alt="ethereum.org" width="125"></a></p>
  <p>👋 Welcome to ethereum.org!</p>
</h1>

This is the repo for the [ethereum.org](https://ethereum.org) website, a resource for the Ethereum community. The purpose of the site is to _“Be the best portal to Ethereum for our growing global community"_ - read more about what this means [here](https://ethereum.org/en/about/).

[ethereum.org](https://ethereum.org) is improved and changed over time through the contributions of community members who submit content, give feedback, or volunteer their time to managing its evolution. If you’re interested in helping to improve [ethereum.org](https://ethereum.org), find out [how to contribute](https://ethereum.org/en/contributing/).

## Looking for the Ethereum blockchain's code?

If you're looking for the Ethereum blockchain itself, there is no single repo. Instead, Ethereum has multiple implementations of the protocol written in different programming languages for security and diversity. [Check out the different implementations](https://ethereum.org/en/developers/docs/nodes-and-clients/#clients)

<hr style="margin-top: 3em; margin-bottom: 3em;">

# How to contribute

This project follows the [all-contributors](https://allcontributors.org/docs/en/overview) specification. Contributions of any kind welcome!

## How updates are made to ethereum.org:

### Submit an issue

- Create a [new issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose)
- Comment on the issue (if you'd like to be assigned to it) - that way [our team can assign the issue to you](https://github.blog/2019-06-25-assign-issues-to-issue-commenters/).

### Fork the repository (repo)

- If you're not sure, here's how to [fork the repo](https://help.github.com/en/articles/fork-a-repo)

### Set up your local environment (optional)

If you're ready to contribute and create your PR, it will help to set up a local environment so you can see your changes.

1. [Set up your development environment](https://www.gatsbyjs.com/docs/tutorial/part-zero/)

2. Clone your fork

If this is your first time forking our repo, this is all you need to do for this step:

```
$ git clone git@github.com:[your_github_handle]/ethereum-org-website.git && cd ethereum-org-website
```

If you've already forked the repo, you'll want to ensure your fork is configured and that it's up to date. This will save you the headache of potential merge conflicts.

To [configure your fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork):

```
$ git remote add upstream https://github.com/ethereum/ethereum-org-website.git
```

To [sync your fork with the latest changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork):

```
$ git checkout dev
$ git fetch upstream
$ git merge upstream/dev
```

3. Install dependencies

```
$ yarn
```

4. Add personal GitHub API token (free)

This is required to run the project locally, as we use the GitHub API to fetch repository data for many projects.

> - [Follow these instructions](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) to create a personal GitHub API token
>   - When selecting scopes in step 7, leave everything unchecked (the data we fetch doesn't require any [scope](https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes))
> - In local repo root directory: Make a copy of `.env.example` and name it `.env`
> - Copy & paste your new GitHub API token in `.env`

```
// .env Example:
GITHUB_TOKEN_READ_ONLY_DEV=48f84de812090000demo00000000697cf6e6a059
```

### Make awesome changes!

1. Create new branch for your changes

```
$ git checkout -b new_branch_name
```

2. Start developing!

```
$ yarn start
```

- Open this directory in your favorite text editor / IDE, and see your changes live by visiting `localhost:8000` from your browser
- Pro Tip: Explore scripts within `package.json` for more build options

3. Commit and prepare for pull request (PR). In your PR commit message, reference the issue it resolves (see [how to link a commit message to an issue using a keyword](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

```
$ git commit -m "brief description of changes [Fixes #1234]"
```

4. Push to your GitHub account

```
$ git push
```

### Submit your PR

- After your changes are commited to your GitHub fork, submit a pull request (PR) to the `dev` branch of the `ethereum/ethereum-org-website` repo
- In your PR description, reference the issue it resolves (see [linking a pull request to an issue using a keyword](https://docs.github.com/en/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword))
  - ex. `Updates out of date content [Fixes #1234]`
- Netlify (our hosting service) deploys all PRs to a publicly accessible preview URL, e.g.:
  ![Netlify deploy preview](./netlify-deploy-preview.png)
- _Confirm your Netlify preview deploy looks & functions as expected_
- Why not say hi and draw attention to your PR in [our discord server](https://discord.gg/CetY6Y4)?

### Wait for review

- The website team reviews every PR
- See [how decisions are made on content changes](https://ethereum.org/en/contributing/#how-decisions-about-the-site-are-made)
- Acceptable PRs will be approved & merged into the `dev` branch

### Release

- `master` is continually synced to Netlify and will automatically deploy new commits to ethereum.org
- The [website team](https://ethereum.org/en/contributing/#how-decisions-about-the-site-are-made) will periodically merge `dev` into `master` (typically multiple times per week)
- You can [view the history of releases](https://github.com/ethereum/ethereum-org-website/releases), which include PR highlights

<hr style="margin-top: 3em; margin-bottom: 3em;">

## The ethereum.org website stack

- [Node.js](https://nodejs.org/)
- [Yarn package manager](https://yarnpkg.com/cli/install)
- [Gatsby](https://www.gatsbyjs.org/)
  - Manages page builds and deployment
  - Configurable in `gatsby-node.js`, `gatsby-browser.js`, `gatsby-config.js`, and `gatsby-ssr.js`
  - [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/)
  - [Gatsby Docs](https://www.gatsbyjs.org/docs/)
- [React](https://reactjs.org/) - A JavaScript library for building component-based user interfaces
- [GraphQL](https://graphql.org/) - A query language for APIs
- [Algolia](https://www.algolia.com/) - Site indexing, rapid intra-site search results, and search analytics
  - Primary implementation: `/src/components/Search/index.js`
- [Crowdin](https://crowdin.com/) - crowdsourcing for our translation efforts (See "Translation initiative" below)
- [Github Actions](https://github.com/features/actions) - Manages CI/CD, and issue tracking
- [Netlify](https://yarnpkg.com/cli/install) - DNS management and primary host for `master` build. Also provides automatic preview deployments for all pull requests

### Code structure

| Folder                                   | Primary use                                                                                                                                                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/src`                                   | Main source folder for development                                                                                                                                                                                  |
| `/src/assets`                            | Image assets                                                                                                                                                                                                        |
| `/src/components`                        | React components that do not function as stand alone pages                                                                                                                                                          |
| `/src/content`                           | Markdown/MDX files for site content stored here. <br>For example: `ethereum.org/en/about/` is built from `src/content/about/index.md` <br>The markdown files are parsed and rendered by `src/templates/static.js`\* |
| `/src/content/developers/docs`           | \*Markdown files in here use the Docs template: `src/templates/docs.js`                                                                                                                                             |
| `/src/content/developers/tutorials`      | \*Markdown files in here use the Tutorial template: `src/templates/tutorial.js`                                                                                                                                     |
| `/src/data`                              | General data files importable by components                                                                                                                                                                         |
| `/src/hooks`                             | Custom React hooks                                                                                                                                                                                                  |
| `/src/intl`                              | Language translation JSON files                                                                                                                                                                                     |
| `/src/lambda`                            | Lambda function scripts for API calls                                                                                                                                                                               |
| `/src/pages`<br>`/src/pages-conditional` | React components that function as stand alone pages. <br>For example: `ethereum.org/en/wallets/find-wallet` is built from `src/pages/wallets/find-wallet.js`                                                        |
| `/src/scripts`<br>`/src/utils`           | Custom utility scripts                                                                                                                                                                                              |
| `/src/styles`                            | Stores `layout.css` which contains root level css styling                                                                                                                                                           |
| `/src/templates`                         | JSX templates that define layouts of differnt regions of the site                                                                                                                                                   |
| `/src/theme.js`                          | Declares site color themes, breakpoints and other constants (try to utilize these colors first)                                                                                                                     |

<hr style="margin-top: 3em; margin-bottom: 3em;">

## Website conventions / best practices

### ❗️ Translation initiative

_Please read carefully if adding or altering any written language content_

How to prepare your content for translation depends on whether you're working on a simple Markdown/MDX page or a React component page.

**- MDX pages (`/src/content/page/`)**

Markdown will be translated as whole pages of content, so no specific action is required. Simply create a new folder within `/src/content/` with the name of the page, then place index markdown file (ie. `index.md`) within new folder.

**- React component page**

- **English text should be placed into `/src/intl/en/page-CORRESPONDING-PAGE.json`**
- [Crowdin](https://crowdin.com/) is the platform we use to manage & crowdsource translation efforts. Please use the following conventions to help streamline this process.
- Use kebab casing (utilizing-dashes-between-words) for file names and JSON keys
- Use standard sentence casing for entry values
  - If capitalization styling required, it is preferable to style with CSS
    - Do this:
      ```
        JSON `"page-warning": "Be very careful"`
        CSS `text-transform: uppercase`
      ```
    - Not this:
      ```
        JSON `"page-warning": "BE VERY CAREFUL"`
      ```
  - This minimizes issues during translation, and allows consistent styling to all languages
- _Please avoid_ embedding links within a sentence. For a word/phrase to be a link, it requires a key/string in the intl JSON. If this is in the middle of another sentence, this results in the sentence being broken into multiple pieces, and requires coding the sentence structure into the JavaScript.

  - This results in significant challenges during translation process, as written syntax for each language will very in terms of ordering subjects/verbs/etc.
  - If you're wanting to link to something within your sentence, create a link at the end of the sentence or paragraph:

  ```
  <p>All Ethereum transactions require a fee, known as Gas, that gets paid to the miner. <Link to="link">More on Gas</Link></p>
  ```

  Once, you've addded your English content to the appropriate JSON file, the above code should look something more like:

  ```
   <p><Translation id="page-transactions" />{" "}<Link to="link"><Translation id="page-transactions-gas-link" /></Link></p>
  ```

  - _tl;dr Each individual JSON entry should be a complete phrase by itself_

- This is done using the `Translation` component. However there is an alternative method for regular JS: `gatsby-plugin-intl` with `/src/utils/translations.js`

  - **Method one: `<Translation />` component (preferred if only needed in JSX)**

    ```
    import { Translation } from "src/components/Translation"

    // Utilize in JSX using
    <Translation id="language-json-key" />
    ```

  - **Method two: `translateMessageId()`**

    ```
    import { useIntl } from "gatsby-plugin-intl"
    import { translateMessageId } from "src/utils/translations"

    // Utilize anywhere in JS using
    const intl = useIntl()
    translateMessageId("language-json-key", intl)
    ```

    ```
    const siteTitle = translateMessageId("site-title", intl)
    ```

## React Hooks

- Components and pages are written using arrow function syntax with React hooks in lieu of using class-based components

```
// Example
import React, { useState, useEffect } from 'react'

const ComponentName = props => {
  // useState hook for managing state variables
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    // useEffect hook for handling component lifecycle
    setGreeting('Hello world')
  }, [])

  return <div>{greeting}</div>
};

export default ComponentName;
```

## Styling

- `src/theme.js` - Declares site color themes, breakpoints and other constants (try to utilize these colors first)
- We use [styled-components](https://styled-components.com/)

  - Tagged template literals are used to style custom components

  ```
  // Example of styling syntax using styled-components

  import styled from "styled-components"

  const GenericButton = styled.div`
    width: 200px;
    height: 50px;
  `
  const PrimaryButton = styled(GenericButton)`
    background: blue;
  `
  const SecondaryButton = styled(GenericButton)`
    background: red;
  `

  // These are each components, capitalized by convention, and can be used within JSX code
  // ie: <PrimaryButton>Text</PrimaryButton>
  ```

  - Recommended VS Code Plugin: `vscode-styled-components` <br>To install: Open VS Code > `Ctrl+P` / `Cmd+P` > Run: <br>`ext install vscode-styled-components`

- Values from `src/theme.js` are automatically passed as a prop object to styled components

  ```
  // Example of theme.js usage

  import styled from "styled-components"

  const Container = styled.div`
    background: ${(props) => props.theme.colors.background};
    @media (max-width: ${(props) => props.theme.breakpoints.s}) {
      font-size: #{(props) => props.theme.fontSized.s};
    }
  `
  ```

- [Framer Motion](https://www.framer.com/motion/) - An open source and production-ready motion library for React on the web, used for our animated designs
- **Emojis**: We use [Twemoji](https://twemoji.twitter.com/), an open-source emoji set created by Twitter. These are hosted by us, and used to provide a consistent experience across operating systems.

```
// Example of emoji use
import Emoji from "./Emoji"

// Within JSX:
<Emoji text=":star:" size={1} /> // sized in `em`
```

- **Icons**: We use [React Icons](https://react-icons.github.io/react-icons/)
  - `src/components/Icon.js` is the component used to import icons to be used
  - If an icon you want to use is not listed you will need to add it to this file

`src/components/Icon.js`:

```
// Example of how to add new icon not listed
import { ZzIconName } from "react-icons/zz"

// Then add to IconContect.Provider children:
{name === "alias" && <ZzIconName />}
```

From React component:

```
// Example of icon use
import Icon from "./Icon"

// Within JSX:
<Icon name="alias" />
```

## Image loading and API calls using GraphQL

- [Gatsby + GraphQL](https://www.gatsbyjs.com/docs/graphql/) used for loading of images and preferred for API calls (in lieu of REST, if possible/practical). Utilizes static page queries that run at build time, not at run time, optimizing performance
- Image loading example:

```
import { graphql } from "gatsby"

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
// These query results get passed as an object `props.data` to your component
```

- API call example:

```
import { graphql } from "gatsby"

export const repoInfo = graphql`
  fragment repoInfo on GitHub_Repository {
    stargazerCount
    languages(orderBy: { field: SIZE, direction: DESC }, first: 2) {
      nodes {
        name
      }
    }
    url
  }
`
export const query = graphql`
  query {
    hardhatGitHub: github {
      repository(owner: "nomiclabs", name: "hardhat") {
        ...repoInfo
      }
    }
  }
`
// These query results get passed as an object `props.data` to your component
```

<hr style="margin-top: 3em; margin-bottom: 3em;">

![POAP Logo](src/assets/poap-logo.svg)

## Claim your POAP!

### What is POAP?

> The Proof of Attendance Protocol is a dapp that distributes badges in the form of ERC-721 tokens to prove you participated in an event. [More on POAPs](https://www.poap.xyz/).

### ethereum.org 2020 Contributor POAP

- If you commited any changes in 2020 that were merged into our repo, you have a POAP waiting!
- This includes our dedicated translators on Crowdin

  [![Discord](https://img.shields.io/discord/714888181740339261?color=1C1CE1&label=Claim%20Your%20POAP!%20%7C%20Discord%20%F0%9F%91%8B%20&style=flat)](https://discord.gg/CetY6Y4)

- 👆 To claim your Contributor POAP, join our Discord server and paste a link to your contribution in the #poaps-🏆 channel

- A member of our team will verify the request and DM you with a peronalized link to claim your own freshly minted POAP collectible!

### Coming soon: 2021 POAPs

- Stay tuned for details!

<hr style="margin-top: 3em; margin-bottom: 3em;">

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ExodusActual"><img src="https://avatars3.githubusercontent.com/u/56446532?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ExodusActual</b></sub></a><br /><a href="#translation-ExodusActual" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/P1X3L0V4"><img src="https://avatars2.githubusercontent.com/u/3372341?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anna Karpińska</b></sub></a><br /><a href="#translation-P1X3L0V4" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/8bitp"><img src="https://avatars2.githubusercontent.com/u/8021176?v=4?s=100" width="100px;" alt=""/><br /><sub><b>8bitp</b></sub></a><br /><a href="#content-8bitp" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/AlexandrouR"><img src="https://avatars1.githubusercontent.com/u/21177075?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rousos Alexandros</b></sub></a><br /><a href="#content-AlexandrouR" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/EvanVanNessEth"><img src="https://avatars3.githubusercontent.com/u/34992008?v=4?s=100" width="100px;" alt=""/><br /><sub><b>EvanVanNessEth</b></sub></a><br /><a href="#content-EvanVanNessEth" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/JesseAbram"><img src="https://avatars0.githubusercontent.com/u/33698952?v=4?s=100" width="100px;" alt=""/><br /><sub><b>JesseAbram</b></sub></a><br /><a href="#content-JesseAbram" title="Content">🖋</a></td>
    <td align="center"><a href="http://impermanence.co"><img src="https://avatars1.githubusercontent.com/u/28689401?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lililashka</b></sub></a><br /><a href="#design-Lililashka" title="Design">🎨</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3ALililashka" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/vrde"><img src="https://avatars1.githubusercontent.com/u/134680?v=4?s=100" width="100px;" alt=""/><br /><sub><b>vrde</b></sub></a><br /><a href="#content-vrde" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/RichardMcSorley"><img src="https://avatars2.githubusercontent.com/u/6407008?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Richard McSorley</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=RichardMcSorley" title="Code">💻</a></td>
    <td align="center"><a href="http://ajsantander.github.io/"><img src="https://avatars2.githubusercontent.com/u/550409?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alejandro Santander</b></sub></a><br /><a href="#content-ajsantander" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/carver"><img src="https://avatars0.githubusercontent.com/u/205327?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jason Carver</b></sub></a><br /><a href="#content-carver" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/chaitanyapotti"><img src="https://avatars1.githubusercontent.com/u/1688380?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chaitanya Potti</b></sub></a><br /><a href="#content-chaitanyapotti" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/chriseth"><img src="https://avatars2.githubusercontent.com/u/9073706?v=4?s=100" width="100px;" alt=""/><br /><sub><b>chriseth</b></sub></a><br /><a href="#content-chriseth" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Achriseth" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/craigwilliams84"><img src="https://avatars2.githubusercontent.com/u/11519649?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Craig Williams</b></sub></a><br /><a href="#content-craigwilliams84" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/damianrusinek"><img src="https://avatars3.githubusercontent.com/u/3885749?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Damian Rusinek</b></sub></a><br /><a href="#content-damianrusinek" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/djrtwo"><img src="https://avatars0.githubusercontent.com/u/1433595?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Danny Ryan</b></sub></a><br /><a href="#content-djrtwo" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Adjrtwo" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://nomiclabs.io"><img src="https://avatars2.githubusercontent.com/u/232174?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Franco Zeoli</b></sub></a><br /><a href="#content-fzeoli" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Afzeoli" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://secinfodb.wordpress.com"><img src="https://avatars2.githubusercontent.com/u/14879163?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Guy Lando</b></sub></a><br /><a href="#content-guylando" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/jamesconnolly93"><img src="https://avatars1.githubusercontent.com/u/6970414?v=4?s=100" width="100px;" alt=""/><br /><sub><b>James Connolly</b></sub></a><br /><a href="#content-jamesconnolly93" title="Content">🖋</a></td>
    <td align="center"><a href="https://burden.blog"><img src="https://avatars3.githubusercontent.com/u/2081699?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jacob Burden</b></sub></a><br /><a href="#content-jekrb" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/joshorig"><img src="https://avatars3.githubusercontent.com/u/852671?v=4?s=100" width="100px;" alt=""/><br /><sub><b>joshorig</b></sub></a><br /><a href="#content-joshorig" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mariapaulafn"><img src="https://avatars1.githubusercontent.com/u/27913589?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mariapaulafn</b></sub></a><br /><a href="#content-mariapaulafn" title="Content">🖋</a></td>
    <td align="center"><a href="https://openzeppelin.com/"><img src="https://avatars0.githubusercontent.com/u/447637?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Martín</b></sub></a><br /><a href="#content-martintel" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/mat7ias"><img src="https://avatars2.githubusercontent.com/u/35585644?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mattias Nystrom</b></sub></a><br /><a href="#content-mat7ias" title="Content">🖋</a></td>
    <td align="center"><a href="http://iteasys.com"><img src="https://avatars0.githubusercontent.com/u/4185026?v=4?s=100" width="100px;" alt=""/><br /><sub><b>nabetse</b></sub></a><br /><a href="#content-nabetse00" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/nicksavers"><img src="https://avatars0.githubusercontent.com/u/7483198?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nick Savers</b></sub></a><br /><a href="#content-nicksavers" title="Content">🖋</a></td>
    <td align="center"><a href="http://playproject.io"><img src="https://avatars1.githubusercontent.com/u/1076427?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nina Breznik</b></sub></a><br /><a href="#content-ninabreznik" title="Content">🖋</a></td>
    <td align="center"><a href="https://odyssy.io"><img src="https://avatars2.githubusercontent.com/u/23664663?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ven Gist</b></sub></a><br /><a href="#content-oovg" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://paulfletcherhill.com"><img src="https://avatars0.githubusercontent.com/u/1607180?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Paul Fletcher-Hill</b></sub></a><br /><a href="#content-pfletcherhill" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/phillux"><img src="https://avatars1.githubusercontent.com/u/6450379?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Phil </b></sub></a><br /><a href="#content-phillux" title="Content">🖋</a></td>
    <td align="center"><a href="https://exomel.com"><img src="https://avatars1.githubusercontent.com/u/11348?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rémi Prévost</b></sub></a><br /><a href="#content-remiprev" title="Content">🖋</a></td>
    <td align="center"><a href="http://shanejonas.net"><img src="https://avatars2.githubusercontent.com/u/364566?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shane</b></sub></a><br /><a href="#content-shanejonas" title="Content">🖋</a></td>
    <td align="center"><a href="https://shazow.net/"><img src="https://avatars3.githubusercontent.com/u/6292?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrey Petrov</b></sub></a><br /><a href="#content-shazow" title="Content">🖋</a> <a href="#ideas-shazow" title="Ideas, Planning, & Feedback">🤔</a> <a href="#a11y-shazow" title="Accessibility">️️️️♿️</a></td>
    <td align="center"><a href="https://twitter.com/smpalladino"><img src="https://avatars2.githubusercontent.com/u/429604?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Santiago Palladino</b></sub></a><br /><a href="#content-spalladino" title="Content">🖋</a> <a href="#ideas-spalladino" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://www.twitter.com/timbeiko"><img src="https://avatars0.githubusercontent.com/u/9390255?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tim Beiko</b></sub></a><br /><a href="#content-timbeiko" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Atimbeiko" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://wanseob.com"><img src="https://avatars2.githubusercontent.com/u/8542397?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wanseob Lim</b></sub></a><br /><a href="#content-wanseob" title="Content">🖋</a> <a href="#translation-wanseob" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/wilbarnes"><img src="https://avatars1.githubusercontent.com/u/31866314?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wil Barnes</b></sub></a><br /><a href="#content-wilbarnes" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Aniket-Engg"><img src="https://avatars2.githubusercontent.com/u/30843294?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aniket</b></sub></a><br /><a href="#content-Aniket-Engg" title="Content">🖋</a></td>
    <td align="center"><a href="http://chrischinchilla.com"><img src="https://avatars2.githubusercontent.com/u/42080?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chris Chinchilla</b></sub></a><br /><a href="#content-ChrisChinchilla" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Perseverance"><img src="https://avatars0.githubusercontent.com/u/5130509?v=4?s=100" width="100px;" alt=""/><br /><sub><b>George Spasov</b></sub></a><br /><a href="#content-Perseverance" title="Content">🖋</a></td>
    <td align="center"><a href="http://pierrickturelier.fr"><img src="https://avatars3.githubusercontent.com/u/2401738?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pierrick TURELIER</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=PierrickGT" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Solexplorer"><img src="https://avatars3.githubusercontent.com/u/50027175?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Solexplorer</b></sub></a><br /><a href="#content-Solexplorer" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Sunghee2"><img src="https://avatars2.githubusercontent.com/u/31603479?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sunghee Lee</b></sub></a><br /><a href="#content-Sunghee2" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/awallendahl"><img src="https://avatars1.githubusercontent.com/u/32873416?v=4?s=100" width="100px;" alt=""/><br /><sub><b>awallendahl</b></sub></a><br /><a href="#content-awallendahl" title="Content">🖋</a></td>
    <td align="center"><a href="https://blog.bmannconsulting.com"><img src="https://avatars2.githubusercontent.com/u/280420?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Boris Mann</b></sub></a><br /><a href="#content-bmann" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/carumusan"><img src="https://avatars1.githubusercontent.com/u/879525?v=4?s=100" width="100px;" alt=""/><br /><sub><b>carumusan</b></sub></a><br /><a href="#content-carumusan" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/econoar"><img src="https://avatars1.githubusercontent.com/u/5050615?v=4?s=100" width="100px;" alt=""/><br /><sub><b>econoar</b></sub></a><br /><a href="#content-econoar" title="Content">🖋</a></td>
    <td align="center"><a href="http://twitter.com/gesq_"><img src="https://avatars1.githubusercontent.com/u/1707044?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gustavo Esquinca</b></sub></a><br /><a href="#content-gesquinca" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.superblocks.com"><img src="https://avatars3.githubusercontent.com/u/7814134?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Javier Tarazaga</b></sub></a><br /><a href="#content-javier-tarazaga" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/kcole16"><img src="https://avatars2.githubusercontent.com/u/5624527?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kendall Cole</b></sub></a><br /><a href="#content-kcole16" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/lbrendanl"><img src="https://avatars3.githubusercontent.com/u/5441045?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brendan Lee</b></sub></a><br /><a href="#content-lbrendanl" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.zastrin.com"><img src="https://avatars3.githubusercontent.com/u/70360?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mahesh Murthy</b></sub></a><br /><a href="#content-maheshmurthy" title="Content">🖋</a></td>
    <td align="center"><a href="http://oneclickdapp.com"><img src="https://avatars1.githubusercontent.com/u/35622595?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Patrick Gallagher</b></sub></a><br /><a href="#content-pi0neerpat" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.mrroom.in"><img src="https://avatars0.githubusercontent.com/u/43527087?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ali Abbas</b></sub></a><br /><a href="#content-realabbas" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/wtf"><img src="https://avatars3.githubusercontent.com/u/2460739?v=4?s=100" width="100px;" alt=""/><br /><sub><b>wtf</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=wtf" title="Code">💻</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Awtf" title="Reviewed Pull Requests">👀</a> <a href="#infra-wtf" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://s0b0lev.com"><img src="https://avatars1.githubusercontent.com/u/2613381?v=4?s=100" width="100px;" alt=""/><br /><sub><b> Aleksandr Sobolev</b></sub></a><br /><a href="#content-s0b0lev" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://www.whiteblock.io"><img src="https://avatars1.githubusercontent.com/u/20308948?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zak Cole</b></sub></a><br /><a href="#content-zscole" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/BogdanHabic"><img src="https://avatars2.githubusercontent.com/u/5364073?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bogdan Habic</b></sub></a><br /><a href="#content-BogdanHabic" title="Content">🖋</a></td>
    <td align="center"><a href="https://sawinyh.com"><img src="https://avatars1.githubusercontent.com/u/7769371?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nick Sawinyh</b></sub></a><br /><a href="#content-sneg55" title="Content">🖋</a></td>
    <td align="center"><a href="http://zoek1.github.com"><img src="https://avatars1.githubusercontent.com/u/660973?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Miguel Angel Gordián</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=zoek1" title="Code">💻</a></td>
    <td align="center"><a href="https://eswarasai.com"><img src="https://avatars2.githubusercontent.com/u/5172086?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eswara Sai</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=eswarasai" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ethers"><img src="https://avatars1.githubusercontent.com/u/6937903?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ethers</b></sub></a><br /><a href="#content-ethers" title="Content">🖋</a> <a href="#ideas-ethers" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://faraggi.org"><img src="https://avatars2.githubusercontent.com/u/264382?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Felipe Faraggi</b></sub></a><br /><a href="#content-faraggi" title="Content">🖋</a> <a href="#translation-faraggi" title="Translation">🌍</a> <a href="#ideas-faraggi" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Afaraggi" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/maurelian"><img src="https://avatars3.githubusercontent.com/u/23033765?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maurelian</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=maurelian" title="Code">💻</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Amaurelian" title="Reviewed Pull Requests">👀</a> <a href="#content-maurelian" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/CPSTL"><img src="https://avatars0.githubusercontent.com/u/32653033?v=4?s=100" width="100px;" alt=""/><br /><sub><b>CPSTL</b></sub></a><br /><a href="#content-CPSTL" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3ACPSTL" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=CPSTL" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.hudsonjameson.com"><img src="https://avatars1.githubusercontent.com/u/3460120?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hudson Jameson</b></sub></a><br /><a href="#content-Souptacular" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=Souptacular" title="Documentation">📖</a></td>
    <td align="center"><a href="https://shayan.es/"><img src="https://avatars2.githubusercontent.com/u/309108?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shayan Eskandari</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=shayanb" title="Code">💻</a> <a href="#translation-shayanb" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.scydev.ch"><img src="https://avatars3.githubusercontent.com/u/1307146?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lukas Sägesser</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=ScyDev" title="Code">💻</a></td>
    <td align="center"><a href="http://virgil.gr"><img src="https://avatars2.githubusercontent.com/u/81322?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Virgil Griffith</b></sub></a><br /><a href="#content-virgil" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/easeev"><img src="https://avatars3.githubusercontent.com/u/14873170?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eugene Aseev</b></sub></a><br /><a href="#content-easeev" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://jannispohlmann.de/"><img src="https://avatars0.githubusercontent.com/u/19324?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jannis Pohlmann</b></sub></a><br /><a href="#content-Jannis" title="Content">🖋</a></td>
    <td align="center"><a href="https://steemblog.github.io/@robertyan"><img src="https://avatars0.githubusercontent.com/u/46699230?v=4?s=100" width="100px;" alt=""/><br /><sub><b>think-in-universe</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=think-in-universe" title="Code">💻</a> <a href="#content-think-in-universe" title="Content">🖋</a></td>
    <td align="center"><a href="http://l4v.io"><img src="https://avatars3.githubusercontent.com/u/17183498?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Josh Stark</b></sub></a><br /><a href="#content-jjmstark" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Ajjmstark" title="Reviewed Pull Requests">👀</a> <a href="#projectManagement-jjmstark" title="Project Management">📆</a></td>
    <td align="center"><a href="https://www.alanwoo.ca"><img src="https://avatars0.githubusercontent.com/u/1481890?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alan Woo</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=alancwoo" title="Code">💻</a> <a href="#design-alancwoo" title="Design">🎨</a></td>
    <td align="center"><a href="https://manankpatni.wordpress.com/"><img src="https://avatars3.githubusercontent.com/u/12700384?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Manank Patni</b></sub></a><br /><a href="#content-Man-Jain" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.rogerioaraujo.co.nf/"><img src="https://avatars0.githubusercontent.com/u/20842252?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rogério Araújo</b></sub></a><br /><a href="#translation-rodgeraraujo" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/natacha-involves"><img src="https://avatars1.githubusercontent.com/u/49870579?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Natacha Souza</b></sub></a><br /><a href="#translation-natacha-involves" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/sorumfactory"><img src="https://avatars1.githubusercontent.com/u/15648718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sorumfactory</b></sub></a><br /><a href="#translation-sorumfactory" title="Translation">🌍</a> <a href="#projectManagement-sorumfactory" title="Project Management">📆</a> <a href="#content-sorumfactory" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Asorumfactory" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.samajammin.com/"><img src="https://avatars1.githubusercontent.com/u/8097623?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sam Richards</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=samajammin" title="Code">💻</a> <a href="#content-samajammin" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=samajammin" title="Documentation">📖</a> <a href="#projectManagement-samajammin" title="Project Management">📆</a></td>
    <td align="center"><a href="http://antodp.xyz"><img src="https://avatars3.githubusercontent.com/u/20992089?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Antonio Della Porta</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=antodp" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Abhimanyu121"><img src="https://avatars0.githubusercontent.com/u/16034874?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Abhimanyu Shekhawat</b></sub></a><br /><a href="#content-Abhimanyu121" title="Content">🖋</a></td>
    <td align="center"><a href="http://phor.net"><img src="https://avatars0.githubusercontent.com/u/382183?v=4?s=100" width="100px;" alt=""/><br /><sub><b>William Entriken</b></sub></a><br /><a href="#content-fulldecent" title="Content">🖋</a></td>
    <td align="center"><a href="http://sangphilkim.me"><img src="https://avatars1.githubusercontent.com/u/13456532?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sangphil Kim</b></sub></a><br /><a href="#translation-sangphilkim" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/tstt"><img src="https://avatars2.githubusercontent.com/u/16997688?v=4?s=100" width="100px;" alt=""/><br /><sub><b>peijie</b></sub></a><br /><a href="#translation-tstt" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Jokyash"><img src="https://avatars1.githubusercontent.com/u/44118299?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jokyash</b></sub></a><br /><a href="#translation-Jokyash" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/pedrorivera"><img src="https://avatars2.githubusercontent.com/u/4961012?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pedro Rivera</b></sub></a><br /><a href="#translation-pedrorivera" title="Translation">🌍</a></td>
    <td align="center"><a href="https://beta.rigoblock.com"><img src="https://avatars1.githubusercontent.com/u/12066256?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gabriele Rigo</b></sub></a><br /><a href="#translation-gabririgo" title="Translation">🌍</a></td>
    <td align="center"><a href="http://tilend.si"><img src="https://avatars1.githubusercontent.com/u/912560?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tilen Držan</b></sub></a><br /><a href="#translation-dTilen" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/jJosko1986"><img src="https://avatars2.githubusercontent.com/u/54378053?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jJosko1986</b></sub></a><br /><a href="#translation-jJosko1986" title="Translation">🌍</a></td>
    <td align="center"><a href="https://ethereum.cn"><img src="https://avatars1.githubusercontent.com/u/53846157?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ECN</b></sub></a><br /><a href="#translation-EthereumCommunityNetwork" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/damianoazzolini"><img src="https://avatars2.githubusercontent.com/u/24901681?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Damiano Azzolini</b></sub></a><br /><a href="#translation-damianoazzolini" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/matteopey"><img src="https://avatars2.githubusercontent.com/u/28830727?v=4?s=100" width="100px;" alt=""/><br /><sub><b>matteopey</b></sub></a><br /><a href="#translation-matteopey" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/kilu83"><img src="https://avatars3.githubusercontent.com/u/29397119?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hun Ryu</b></sub></a><br /><a href="#translation-kilu83" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/nake13"><img src="https://avatars0.githubusercontent.com/u/6271031?v=4?s=100" width="100px;" alt=""/><br /><sub><b>nake13</b></sub></a><br /><a href="#translation-nake13" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/alexiskefalas"><img src="https://avatars2.githubusercontent.com/u/57708389?v=4?s=100" width="100px;" alt=""/><br /><sub><b>alexiskefalas</b></sub></a><br /><a href="#translation-alexiskefalas" title="Translation">🌍</a></td>
    <td align="center"><a href="http://Behrad.Khodayar.me"><img src="https://avatars1.githubusercontent.com/u/16176436?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Behrad Khodayar</b></sub></a><br /><a href="#translation-behradkhodayar" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Frankaus"><img src="https://avatars3.githubusercontent.com/u/57708955?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Frankaus</b></sub></a><br /><a href="#translation-Frankaus" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/hacktar"><img src="https://avatars2.githubusercontent.com/u/11939542?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hacktar</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=hacktar" title="Code">💻</a> <a href="#translation-hacktar" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/DjangoM"><img src="https://avatars2.githubusercontent.com/u/35060411?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jaroslav Macej</b></sub></a><br /><a href="#translation-DjangoM" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/EmanHerawy"><img src="https://avatars3.githubusercontent.com/u/10674070?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eman Herawy</b></sub></a><br /><a href="#translation-EmanHerawy" title="Translation">🌍</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=EmanHerawy" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Bellinas"><img src="https://avatars0.githubusercontent.com/u/45827044?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bellinas</b></sub></a><br /><a href="#translation-Bellinas" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/amchercashin"><img src="https://avatars3.githubusercontent.com/u/8727497?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexander Cherkashin</b></sub></a><br /><a href="#translation-amchercashin" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.soarontech.com.ng"><img src="https://avatars0.githubusercontent.com/u/29120867?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Enoch Mbaebie</b></sub></a><br /><a href="#translation-EnochMbaebie" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/inlak16"><img src="https://avatars1.githubusercontent.com/u/53479637?v=4?s=100" width="100px;" alt=""/><br /><sub><b>inlak16</b></sub></a><br /><a href="#translation-inlak16" title="Translation">🌍</a></td>
    <td align="center"><a href="https://www.c4at.cn/"><img src="https://avatars0.githubusercontent.com/u/1224604?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bob Jiang</b></sub></a><br /><a href="#translation-bobjiang" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/suhunkim/"><img src="https://avatars1.githubusercontent.com/u/826798?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Suhun Kim</b></sub></a><br /><a href="#translation-cobject" title="Translation">🌍</a></td>
    <td align="center"><a href="http://jzu.blog.free.fr/"><img src="https://avatars3.githubusercontent.com/u/337334?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jean Zundel</b></sub></a><br /><a href="#translation-jzu" title="Translation">🌍</a></td>
    <td align="center"><a href="https://twitter.com/_Hachemi_"><img src="https://avatars2.githubusercontent.com/u/12778013?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hachemi</b></sub></a><br /><a href="#translation-HachemiH" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/hanzoh1"><img src="https://avatars0.githubusercontent.com/u/42790758?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hanzoh</b></sub></a><br /><a href="#translation-hanzoh1" title="Translation">🌍</a></td>
    <td align="center"><a href="https://twitter.com/vincentLg"><img src="https://avatars1.githubusercontent.com/u/813911?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vincent Le Gallic</b></sub></a><br /><a href="#translation-vincentlg" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Enigmatic331"><img src="https://avatars2.githubusercontent.com/u/28551011?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Enigmatic331</b></sub></a><br /><a href="#content-Enigmatic331" title="Content">🖋</a></td>
    <td align="center"><a href="https://twitter.com/0zAND1z"><img src="https://avatars1.githubusercontent.com/u/11145839?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ganesh Prasad Kumble</b></sub></a><br /><a href="#content-0zAND1z" title="Content">🖋</a> <a href="#translation-0zAND1z" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/pontiyaraja"><img src="https://avatars0.githubusercontent.com/u/1989030?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pandiyaraja Ramamoorthy</b></sub></a><br /><a href="#content-pontiyaraja" title="Content">🖋</a> <a href="#translation-pontiyaraja" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Kuekuatsheu95"><img src="https://avatars0.githubusercontent.com/u/45584024?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Archan Roychoudhury</b></sub></a><br /><a href="#content-Kuekuatsheu95" title="Content">🖋</a> <a href="#translation-Kuekuatsheu95" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/its-VSP"><img src="https://avatars0.githubusercontent.com/u/22447085?v=4?s=100" width="100px;" alt=""/><br /><sub><b>SAI PRASHANTH VUPPALA</b></sub></a><br /><a href="#content-its-VSP" title="Content">🖋</a> <a href="#translation-its-VSP" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/sickmorty"><img src="https://avatars3.githubusercontent.com/u/39275239?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sayid Almahdy</b></sub></a><br /><a href="#translation-sickmorty" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/jeedani"><img src="https://avatars2.githubusercontent.com/u/36130718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jeedani</b></sub></a><br /><a href="#translation-jeedani" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/akira-19"><img src="https://avatars2.githubusercontent.com/u/38364091?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Akira</b></sub></a><br /><a href="#translation-akira-19" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/karansinghgit"><img src="https://avatars3.githubusercontent.com/u/44376616?v=4?s=100" width="100px;" alt=""/><br /><sub><b>karansinghgit</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=karansinghgit" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.manning.com/books/redux-in-action?a_aid=coach&a_bid=48d05fcb"><img src="https://avatars1.githubusercontent.com/u/3621728?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marc Garreau</b></sub></a><br /><a href="#content-marcgarreau" title="Content">🖋</a> <a href="#ideas-marcgarreau" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Amarcgarreau" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/mul53"><img src="https://avatars0.githubusercontent.com/u/19148531?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mul53</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=mul53" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/CodinMaster"><img src="https://avatars3.githubusercontent.com/u/20395316?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Apoorv Lathey</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=CodinMaster" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ksato9700"><img src="https://avatars1.githubusercontent.com/u/175834?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ken Sato</b></sub></a><br /><a href="#content-ksato9700" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Sesamestrong"><img src="https://avatars3.githubusercontent.com/u/26335275?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sesamestrong</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=Sesamestrong" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Christofon"><img src="https://avatars0.githubusercontent.com/u/26435661?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ChrisK</b></sub></a><br /><a href="#content-Christofon" title="Content">🖋</a></td>
    <td align="center"><a href="https://stackoverflow.com/story/svanas"><img src="https://avatars1.githubusercontent.com/u/787861?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stefan van As</b></sub></a><br /><a href="#content-svanas" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://greg.jeanmart.me"><img src="https://avatars3.githubusercontent.com/u/506784?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Grégoire Jeanmart</b></sub></a><br /><a href="#content-gjeanmart" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/nysxah"><img src="https://avatars2.githubusercontent.com/u/30059030?v=4?s=100" width="100px;" alt=""/><br /><sub><b>nysxah</b></sub></a><br /><a href="#content-nysxah" title="Content">🖋</a></td>
    <td align="center"><a href="http://rachblondon.github.io/"><img src="https://avatars0.githubusercontent.com/u/8742251?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rachel</b></sub></a><br /><a href="#content-RachBLondon" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/wschwab"><img src="https://avatars3.githubusercontent.com/u/31592931?v=4?s=100" width="100px;" alt=""/><br /><sub><b>wschwab</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=wschwab" title="Code">💻</a> <a href="#content-wschwab" title="Content">🖋</a></td>
    <td align="center"><a href="http://twitter.com/relativeread"><img src="https://avatars2.githubusercontent.com/u/34966228?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Edson Ayllon</b></sub></a><br /><a href="#content-edsonayllon" title="Content">🖋</a> <a href="#ideas-edsonayllon" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://peteris.xyz"><img src="https://avatars0.githubusercontent.com/u/224585?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Peteris Erins</b></sub></a><br /><a href="#content-Pet3ris" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/JimmyShi22"><img src="https://avatars3.githubusercontent.com/u/12178678?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jimmyshi</b></sub></a><br /><a href="#content-JimmyShi22" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://www.netyul.com.br"><img src="https://avatars0.githubusercontent.com/u/3399117?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jefte Costa</b></sub></a><br /><a href="#translation-JefteCosta" title="Translation">🌍</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=JefteCosta" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/jinho-jang-4304a0142/"><img src="https://avatars2.githubusercontent.com/u/41753422?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jinho Jang</b></sub></a><br /><a href="#content-jinhojang6" title="Content">🖋</a></td>
    <td align="center"><a href="https://eattheblocks.com"><img src="https://avatars2.githubusercontent.com/u/9279488?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Julien Klepatch</b></sub></a><br /><a href="#content-jklepatch" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.yazkhoury.com"><img src="https://avatars2.githubusercontent.com/u/9094204?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yaz Khoury</b></sub></a><br /><a href="#content-YazzyYaz" title="Content">🖋</a></td>
    <td align="center"><a href="http://yos.io"><img src="https://avatars3.githubusercontent.com/u/1084226?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yos Riady</b></sub></a><br /><a href="#content-yosriady" title="Content">🖋</a></td>
    <td align="center"><a href="http://infura.io"><img src="https://avatars2.githubusercontent.com/u/1210802?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Cohen</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aandrewjcohen" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://twitter.com/wslyvh"><img src="https://avatars2.githubusercontent.com/u/25974464?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wesley van Heije</b></sub></a><br /><a href="#content-wslyvh" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/gr0uch0dev"><img src="https://avatars1.githubusercontent.com/u/17497722?v=4?s=100" width="100px;" alt=""/><br /><sub><b>gr0uch0dev</b></sub></a><br /><a href="#content-gr0uch0dev" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/hsy822"><img src="https://avatars3.githubusercontent.com/u/17763340?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sooyoung</b></sub></a><br /><a href="#content-hsy822" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/adria0"><img src="https://avatars3.githubusercontent.com/u/5526331?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adria Massanet</b></sub></a><br /><a href="#content-adria0" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.alexsingh.com"><img src="https://avatars0.githubusercontent.com/u/6787950?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alex Singh</b></sub></a><br /><a href="#design-as-dr" title="Design">🎨</a></td>
    <td align="center"><a href="http://carlfairclough.me"><img src="https://avatars1.githubusercontent.com/u/4670881?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Carl Fairclough</b></sub></a><br /><a href="#design-carlfairclough" title="Design">🎨</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=carlfairclough" title="Code">💻</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Acarlfairclough" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/kvrnc"><img src="https://avatars3.githubusercontent.com/u/36660375?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kaven C</b></sub></a><br /><a href="#content-kvrnc" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/mhatvan"><img src="https://avatars2.githubusercontent.com/u/16797721?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Markus Hatvan</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=mhatvan" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/evanstucker-hates-2fa"><img src="https://avatars0.githubusercontent.com/u/20584445?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Evans Tucker</b></sub></a><br /><a href="#content-evanstucker-hates-2fa" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/fluffays"><img src="https://avatars1.githubusercontent.com/u/39056857?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adina Cretu</b></sub></a><br /><a href="#translation-fluffays" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/tvanepps"><img src="https://avatars1.githubusercontent.com/u/27454964?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tvanepps</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Atvanepps" title="Bug reports">🐛</a> <a href="#content-tvanepps" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/FlipFloop"><img src="https://avatars3.githubusercontent.com/u/19635051?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Victor Guyard</b></sub></a><br /><a href="#a11y-FlipFloop" title="Accessibility">️️️️♿️</a></td>
    <td align="center"><a href="http://www.abhranil.net"><img src="https://avatars0.githubusercontent.com/u/1142007?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Abhranil Das</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aabhranildas" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.emin.tech"><img src="https://avatars2.githubusercontent.com/u/10382507?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ahmet Emin Koçal</b></sub></a><br /><a href="#translation-ahmeteminkocal" title="Translation">🌍</a></td>
    <td align="center"><a href="http://empire.studio"><img src="https://avatars0.githubusercontent.com/u/33502282?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aqeel</b></sub></a><br /><a href="#ideas-qnou" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/linda-xie"><img src="https://avatars0.githubusercontent.com/u/55955358?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Linda Xie</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Alinda-xie" title="Reviewed Pull Requests">👀</a> <a href="#content-linda-xie" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/IanEck"><img src="https://avatars2.githubusercontent.com/u/5863338?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ian Eck</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3AIanEck" title="Reviewed Pull Requests">👀</a> <a href="#content-IanEck" title="Content">🖋</a></td>
    <td align="center"><a href="http://wwaves.co"><img src="https://avatars2.githubusercontent.com/u/106938?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chris Waring</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=cwaring" title="Code">💻</a> <a href="#ideas-cwaring" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/evertonfraga"><img src="https://avatars2.githubusercontent.com/u/47108?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ev</b></sub></a><br /><a href="#ideas-evertonfraga" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aevertonfraga" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://discord.gg/5W5tVb3"><img src="https://avatars2.githubusercontent.com/u/6251510?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ivan Martinez</b></sub></a><br /><a href="#content-0xKiwi" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/sebastiantf"><img src="https://avatars3.githubusercontent.com/u/36922376?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sebastian T F</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=sebastiantf" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/AnettRolikova"><img src="https://avatars1.githubusercontent.com/u/44020788?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anett Rolikova </b></sub></a><br /><a href="#content-anettrolikova" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://etherworld.co"><img src="https://avatars0.githubusercontent.com/u/29681685?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pooja Ranjan</b></sub></a><br /><a href="#content-poojaranjan" title="Content">🖋</a></td>
    <td align="center"><a href="https//twitter.com/sassal0x"><img src="https://avatars0.githubusercontent.com/u/9276959?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sassal</b></sub></a><br /><a href="#content-sassal" title="Content">🖋</a></td>
    <td align="center"><a href="https://zaremba.ch"><img src="https://avatars0.githubusercontent.com/u/811701?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Robert Zaremba</b></sub></a><br /><a href="#content-robert-zaremba" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/tasdienes"><img src="https://avatars1.githubusercontent.com/u/18563486?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tas</b></sub></a><br /><a href="#ideas-tasdienes" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-tasdienes" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/s-pace"><img src="https://avatars2.githubusercontent.com/u/32097720?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sylvain Pace</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=s-pace" title="Code">💻</a></td>
    <td align="center"><a href="http://twitter.com/sinahab"><img src="https://avatars0.githubusercontent.com/u/4315207?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sina Habibian</b></sub></a><br /><a href="#ideas-sinahab" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://www.dennisonbertram.com"><img src="https://avatars0.githubusercontent.com/u/1938013?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dennison Bertram</b></sub></a><br /><a href="#ideas-crazyrabbitLTC" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/arturgontijo"><img src="https://avatars0.githubusercontent.com/u/15108323?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Artur Gontijo</b></sub></a><br /><a href="#ideas-arturgontijo" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-arturgontijo" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/ethjoe"><img src="https://avatars0.githubusercontent.com/u/36374665?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ethjoe</b></sub></a><br /><a href="#content-ethjoe" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Aethjoe" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/cooganb"><img src="https://avatars2.githubusercontent.com/u/8144425?v=4?s=100" width="100px;" alt=""/><br /><sub><b>cooganb</b></sub></a><br /><a href="#ideas-cooganb" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/drequinox"><img src="https://avatars1.githubusercontent.com/u/34604812?v=4?s=100" width="100px;" alt=""/><br /><sub><b>drequinox</b></sub></a><br /><a href="#content-drequinox" title="Content">🖋</a></td>
    <td align="center"><a href="https://biconomy.io"><img src="https://avatars1.githubusercontent.com/u/17008737?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tarun Gupta</b></sub></a><br /><a href="#content-tarun1475" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/jpitts"><img src="https://avatars1.githubusercontent.com/u/509756?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jamie Pitts</b></sub></a><br /><a href="#ideas-jpitts" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://web3.consulting"><img src="https://avatars0.githubusercontent.com/u/25006584?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chris Seifert</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aseichris" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://johnpcraig.com"><img src="https://avatars1.githubusercontent.com/u/16075438?v=4?s=100" width="100px;" alt=""/><br /><sub><b>John Craig</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=JCraigWasTaken" title="Code">💻</a></td>
    <td align="center"><a href="https://morpheus.network/"><img src="https://avatars0.githubusercontent.com/u/36540973?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Noam Eppel</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3AMorpheusNetwork" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/jacobwillemsma"><img src="https://avatars0.githubusercontent.com/u/4511854?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jacob Willemsma</b></sub></a><br /><a href="#content-jacobwillemsma" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/alexmb15"><img src="https://avatars3.githubusercontent.com/u/12184447?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alex</b></sub></a><br /><a href="#ideas-alexmb15" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://twitter.com/PaulRBerg"><img src="https://avatars1.githubusercontent.com/u/8782666?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Paul Razvan Berg</b></sub></a><br /><a href="#content-PaulRBerg" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/ph5500"><img src="https://avatars0.githubusercontent.com/u/60459707?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ph5500</b></sub></a><br /><a href="#content-ph5500" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=ph5500" title="Code">💻</a></td>
    <td align="center"><a href="http://www.johnmonarch.com"><img src="https://avatars1.githubusercontent.com/u/31969812?v=4?s=100" width="100px;" alt=""/><br /><sub><b>John Monarch</b></sub></a><br /><a href="#content-johnmonarch" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/shad-k"><img src="https://avatars1.githubusercontent.com/u/23720732?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shadab Khan</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=shad-k" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ryancreatescopy"><img src="https://avatars2.githubusercontent.com/u/40891631?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ryancreatescopy</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=ryancreatescopy" title="Documentation">📖</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=ryancreatescopy" title="Code">💻</a></td>
    <td align="center"><a href="http://jutt.ca"><img src="https://avatars3.githubusercontent.com/u/7143583?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hammad Jutt</b></sub></a><br /><a href="#content-hammadj" title="Content">🖋</a></td>
    <td align="center"><a href="https://becaz.org"><img src="https://avatars2.githubusercontent.com/u/58934348?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Becaz</b></sub></a><br /><a href="#ideas-becaz" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/caosbad"><img src="https://avatars2.githubusercontent.com/u/10805199?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Caos</b></sub></a><br /><a href="#content-caosbad" title="Content">🖋</a></td>
    <td align="center"><a href="http://bit.ly/SupportMyCode"><img src="https://avatars2.githubusercontent.com/u/57037080?v=4?s=100" width="100px;" alt=""/><br /><sub><b>codingsh</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=developerfred" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ArtemKo7v"><img src="https://avatars3.githubusercontent.com/u/2138231?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Artem</b></sub></a><br /><a href="#content-ArtemKo7v" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://medium.com/@crisgarner"><img src="https://avatars1.githubusercontent.com/u/578688?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cristian Espinoza Garner</b></sub></a><br /><a href="#content-crisgarner" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/dschlabach"><img src="https://avatars1.githubusercontent.com/u/31226559?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daniel Schlabach</b></sub></a><br /><a href="#content-dschlabach" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/MariusVanDerWijden"><img src="https://avatars0.githubusercontent.com/u/16664698?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marius van der Wijden</b></sub></a><br /><a href="#content-MariusVanDerWijden" title="Content">🖋</a> <a href="#ideas-MariusVanDerWijden" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://soliditydeveloper.com/"><img src="https://avatars1.githubusercontent.com/u/659390?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Markus Waas</b></sub></a><br /><a href="#content-gorgos" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/KiChjang"><img src="https://avatars0.githubusercontent.com/u/3248587?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Keith Yeung</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=KiChjang" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/JordanLyall"><img src="https://avatars0.githubusercontent.com/u/999289?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jordan Lyall</b></sub></a><br /><a href="#content-jordanlyall" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/elanh"><img src="https://avatars0.githubusercontent.com/u/23513719?v=4?s=100" width="100px;" alt=""/><br /><sub><b>elanh</b></sub></a><br /><a href="#content-elanh" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://mohamedhayibor.com"><img src="https://avatars1.githubusercontent.com/u/11381259?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mohamed Hayibor</b></sub></a><br /><a href="#content-mohamedhayibor" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.web3labs.com"><img src="https://avatars1.githubusercontent.com/u/2148266?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Conor Svensson</b></sub></a><br /><a href="#content-conor10" title="Content">🖋</a></td>
    <td align="center"><a href="http://twitter.com/aranhaagency"><img src="https://avatars1.githubusercontent.com/u/50056110?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aranha</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=aranhaagency" title="Code">💻</a></td>
    <td align="center"><a href="http://www.linkedin.com/in/jsyoo"><img src="https://avatars1.githubusercontent.com/u/37724247?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jung Sup (James) Yoo</b></sub></a><br /><a href="#translation-jyoo" title="Translation">🌍</a></td>
    <td align="center"><a href="https://veit.pro"><img src="https://avatars2.githubusercontent.com/u/22853176?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Veit Progl</b></sub></a><br /><a href="#ideas-Veeit" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/jcamilli"><img src="https://avatars3.githubusercontent.com/u/1952742?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jcamilli</b></sub></a><br /><a href="#content-jcamilli" title="Content">🖋</a></td>
    <td align="center"><a href="http://martin.swende.se"><img src="https://avatars1.githubusercontent.com/u/142290?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Martin Holst Swende</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aholiman" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/gilbertginsberg"><img src="https://avatars2.githubusercontent.com/u/4500679?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Steven Gilbert</b></sub></a><br /><a href="#content-gilbertginsberg" title="Content">🖋</a></td>
    <td align="center"><a href="https://hackingresear.ch"><img src="https://avatars1.githubusercontent.com/u/5483559?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sacha Saint-Leger</b></sub></a><br /><a href="#content-sachayves" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/gichiba"><img src="https://avatars3.githubusercontent.com/u/9886144?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Griffin Ichiba Hotchkiss</b></sub></a><br /><a href="#content-gichiba" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/epheph"><img src="https://avatars1.githubusercontent.com/u/361654?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Scott Bigelow</b></sub></a><br /><a href="#content-epheph" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/hrkrshnn"><img src="https://avatars2.githubusercontent.com/u/13174375?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Harikrishnan Mulackal</b></sub></a><br /><a href="#content-hrkrshnn" title="Content">🖋</a></td>
    <td align="center"><a href="https://matthieu.io"><img src="https://avatars1.githubusercontent.com/u/2828729?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matthieu Caneill</b></sub></a><br /><a href="#content-matthieucan" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/arjunaskykok"><img src="https://avatars0.githubusercontent.com/u/32124593?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Arjuna Sky Kok</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aarjunaskykok" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/briangu33"><img src="https://avatars2.githubusercontent.com/u/16885693?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brian Gu</b></sub></a><br /><a href="#content-briangu33" title="Content">🖋</a></td>
    <td align="center"><a href="http://goncalohoracarvalho.com"><img src="https://avatars1.githubusercontent.com/u/37756125?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gonçalo Hora de Carvalho</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3ABlueVelvetSackOfGoldPotatoes" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/taxmeifyoucan"><img src="https://avatars0.githubusercontent.com/u/61149543?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mário Havel</b></sub></a><br /><a href="#content-taxmeifyoucan" title="Content">🖋</a></td>
    <td align="center"><a href="http://Polynom.com"><img src="https://avatars1.githubusercontent.com/u/10713123?v=4?s=100" width="100px;" alt=""/><br /><sub><b>JosefJ</b></sub></a><br /><a href="#content-JosefJ" title="Content">🖋</a></td>
    <td align="center"><a href="http://christoph.burgdorf.eth.link"><img src="https://avatars2.githubusercontent.com/u/521109?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Christoph Burgdorf</b></sub></a><br /><a href="#ideas-cburgdorf" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/slipperybeluga"><img src="https://avatars0.githubusercontent.com/u/6125744?v=4?s=100" width="100px;" alt=""/><br /><sub><b>slipperybeluga</b></sub></a><br /><a href="#ideas-slipperybeluga" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://www.campusconnect.ca/"><img src="https://avatars3.githubusercontent.com/u/24978284?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Liu</b></sub></a><br /><a href="#content-liuzimin" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/shreyashariharan3"><img src="https://avatars3.githubusercontent.com/u/48186822?v=4?s=100" width="100px;" alt=""/><br /><sub><b>shreyashariharan3</b></sub></a><br /><a href="#content-shreyashariharan3" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/adrianclv/"><img src="https://avatars2.githubusercontent.com/u/9255560?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adrián Calvo</b></sub></a><br /><a href="#content-AdrianClv" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/daviroo"><img src="https://avatars1.githubusercontent.com/u/3502409?v=4?s=100" width="100px;" alt=""/><br /><sub><b>daviroo</b></sub></a><br /><a href="#content-daviroo" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/wim-notredame/"><img src="https://avatars1.githubusercontent.com/u/3173121?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wim Notredame</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=notrixbe" title="Code">💻</a></td>
    <td align="center"><a href="https://vaibhavsaini.com/"><img src="https://avatars2.githubusercontent.com/u/28847087?v=4?s=100" width="100px;" alt=""/><br /><sub><b>vasa</b></sub></a><br /><a href="#content-vasa-develop" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/franzihei"><img src="https://avatars2.githubusercontent.com/u/41991517?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Franziska Heintel</b></sub></a><br /><a href="#content-franzihei" title="Content">🖋</a></td>
    <td align="center"><a href="http://umair.me"><img src="https://avatars1.githubusercontent.com/u/834935?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Muhammad Umair Irshad</b></sub></a><br /><a href="#content-umair-me" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://gitcoin.co/profile/naszam/"><img src="https://avatars0.githubusercontent.com/u/23325228?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nazzareno Massari</b></sub></a><br /><a href="#content-naszam" title="Content">🖋</a></td>
    <td align="center"><a href="http://vladimirfomene.github.io"><img src="https://avatars1.githubusercontent.com/u/11140070?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mayemene Fomene Jean Vladimir</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Avladimirfomene" title="Bug reports">🐛</a> <a href="#content-vladimirfomene" title="Content">🖋</a></td>
    <td align="center"><a href="https://yahsin.me/"><img src="https://avatars2.githubusercontent.com/u/6111396?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yahsin Huang</b></sub></a><br /><a href="#content-yahsinhuangtw" title="Content">🖋</a> <a href="#translation-yahsinhuangtw" title="Translation">🌍</a></td>
    <td align="center"><a href="http://medium.com/@james.zaki"><img src="https://avatars1.githubusercontent.com/u/939603?v=4?s=100" width="100px;" alt=""/><br /><sub><b>James Zaki</b></sub></a><br /><a href="#content-jzaki" title="Content">🖋</a></td>
    <td align="center"><a href="https://rivet.cloud"><img src="https://avatars2.githubusercontent.com/u/16615034?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Greg Lang</b></sub></a><br /><a href="#content-designheretic" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/voska"><img src="https://avatars1.githubusercontent.com/u/3444419?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matt Voska</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Avoska" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/mustafawm"><img src="https://avatars0.githubusercontent.com/u/13101565?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mustafa</b></sub></a><br /><a href="#content-mustafawm" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/wackerow"><img src="https://avatars0.githubusercontent.com/u/54227730?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Paul Wackerow</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=wackerow" title="Code">💻</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Awackerow" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/detohm"><img src="https://avatars1.githubusercontent.com/u/4770525?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Attaphong Rattanaveerachanon</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Adetohm" title="Bug reports">🐛</a> <a href="#content-detohm" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/liaojianqi"><img src="https://avatars1.githubusercontent.com/u/14259182?v=4?s=100" width="100px;" alt=""/><br /><sub><b>LoinLiao</b></sub></a><br /><a href="#content-liaojianqi" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/DrMad92"><img src="https://avatars2.githubusercontent.com/u/28419987?v=4?s=100" width="100px;" alt=""/><br /><sub><b>DrMad92</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3ADrMad92" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.nomiclabs.io"><img src="https://avatars1.githubusercontent.com/u/176499?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Patricio Palladino</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Aalcuadrado" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://davidmurdoch.com"><img src="https://avatars2.githubusercontent.com/u/187813?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Murdoch</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/pulls?q=is%3Apr+reviewed-by%3Adavidmurdoch" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/MashhoodIjaz"><img src="https://avatars2.githubusercontent.com/u/33490414?v=4?s=100" width="100px;" alt=""/><br /><sub><b>MashhoodIjaz</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3AMashhoodIjaz" title="Bug reports">🐛</a> <a href="#content-MashhoodIjaz" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.chainshot.com/"><img src="https://avatars2.githubusercontent.com/u/4423365?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dan Nolan</b></sub></a><br /><a href="#content-Dan-Nolan" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/marekkirejczyk"><img src="https://avatars3.githubusercontent.com/u/197522?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marek Kirejczyk</b></sub></a><br /><a href="#content-marekkirejczyk" title="Content">🖋</a></td>
    <td align="center"><a href="https://joncursi.com/"><img src="https://avatars3.githubusercontent.com/u/4974609?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jon Cursi</b></sub></a><br /><a href="#content-joncursi" title="Content">🖋</a></td>
    <td align="center"><a href="https://topia.us"><img src="https://avatars2.githubusercontent.com/u/10499048?v=4?s=100" width="100px;" alt=""/><br /><sub><b>James Farrell</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Ajamespfarrell" title="Bug reports">🐛</a> <a href="#content-jamespfarrell" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/xaviarias"><img src="https://avatars3.githubusercontent.com/u/876579?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Xavi Arias Seguí</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Axaviarias" title="Bug reports">🐛</a> <a href="#content-xaviarias" title="Content">🖋</a></td>
    <td align="center"><a href="https://howdyankit.xyz"><img src="https://avatars2.githubusercontent.com/u/40737659?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ANKIT_PAL</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=howdyAnkit" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ikc89"><img src="https://avatars0.githubusercontent.com/u/7846803?v=4?s=100" width="100px;" alt=""/><br /><sub><b>İsmail Kerim Cem</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aikc89" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/eberhardtj"><img src="https://avatars0.githubusercontent.com/u/49472730?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joanne</b></sub></a><br /><a href="#content-eberhardtj" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/michael60634"><img src="https://avatars1.githubusercontent.com/u/59159320?v=4?s=100" width="100px;" alt=""/><br /><sub><b>michael60634</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Amichael60634" title="Bug reports">🐛</a> <a href="#ideas-michael60634" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/gumb0"><img src="https://avatars0.githubusercontent.com/u/1863135?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrei Maiboroda</b></sub></a><br /><a href="#content-gumb0" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/ankisharmadel"><img src="https://avatars2.githubusercontent.com/u/28820514?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anki</b></sub></a><br /><a href="#content-ankisharmadel" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/wendydv1989"><img src="https://avatars1.githubusercontent.com/u/52613476?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michelle Plur</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Awendydv1989" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/PAAlmasi"><img src="https://avatars3.githubusercontent.com/u/38504457?v=4?s=100" width="100px;" alt=""/><br /><sub><b>PAAlmasi</b></sub></a><br /><a href="#content-PAAlmasi" title="Content">🖋</a></td>
    <td align="center"><a href="http://benjaminion.xyz"><img src="https://avatars2.githubusercontent.com/u/20796281?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ben Edgington</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Abenjaminion" title="Bug reports">🐛</a> <a href="#content-benjaminion" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/alexsantee"><img src="https://avatars3.githubusercontent.com/u/40058461?v=4?s=100" width="100px;" alt=""/><br /><sub><b>alexsantee</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aalexsantee" title="Bug reports">🐛</a> <a href="#content-alexsantee" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/peth-yursick"><img src="https://avatars2.githubusercontent.com/u/55857222?v=4?s=100" width="100px;" alt=""/><br /><sub><b>peth-yursick</b></sub></a><br /><a href="#content-peth-yursick" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Arnor1711"><img src="https://avatars2.githubusercontent.com/u/23365186?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alwin Stockinger</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3AArnor1711" title="Bug reports">🐛</a> <a href="#content-Arnor1711" title="Content">🖋</a></td>
    <td align="center"><a href="http://henriquezperozo.com"><img src="https://avatars1.githubusercontent.com/u/12145726?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Roberto Henríquez Perozo</b></sub></a><br /><a href="#content-rihp" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/strykerin"><img src="https://avatars2.githubusercontent.com/u/19648581?v=4?s=100" width="100px;" alt=""/><br /><sub><b>strykerin</b></sub></a><br /><a href="#content-strykerin" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/jddxf"><img src="https://avatars2.githubusercontent.com/u/11155177?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jddxf</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Ajddxf" title="Bug reports">🐛</a> <a href="#content-jddxf" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.blockchair.com"><img src="https://avatars2.githubusercontent.com/u/48732931?v=4?s=100" width="100px;" alt=""/><br /><sub><b>LucasRoorda</b></sub></a><br /><a href="#content-LucasRoorda" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/MihirLuthra"><img src="https://avatars0.githubusercontent.com/u/42952059?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mihir Luthra</b></sub></a><br /><a href="#content-MihirLuthra" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/tentodev"><img src="https://avatars2.githubusercontent.com/u/75068379?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tentodev</b></sub></a><br /><a href="#content-tentodev" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Atentodev" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/MiZiet"><img src="https://avatars2.githubusercontent.com/u/55240109?v=4?s=100" width="100px;" alt=""/><br /><sub><b>MiZiet</b></sub></a><br /><a href="#content-MiZiet" title="Content">🖋</a></td>
    <td align="center"><a href="http://vaibhavchopra.codes"><img src="https://avatars0.githubusercontent.com/u/53619134?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vaibhav Chopra</b></sub></a><br /><a href="#content-sudo-vaibhav" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/lsankar4033"><img src="https://avatars1.githubusercontent.com/u/451947?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lakshman Sankar</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Alsankar4033" title="Bug reports">🐛</a> <a href="#content-lsankar4033" title="Content">🖋</a></td>
    <td align="center"><a href="https://twitter.com/hewigovens"><img src="https://avatars1.githubusercontent.com/u/360470?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hewigovens</b></sub></a><br /><a href="#content-hewigovens" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Ahewigovens" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/DragonDev1906"><img src="https://avatars3.githubusercontent.com/u/8270201?v=4?s=100" width="100px;" alt=""/><br /><sub><b>DragonDev1906</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3ADragonDev1906" title="Bug reports">🐛</a> <a href="#content-DragonDev1906" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ryanio"><img src="https://avatars0.githubusercontent.com/u/22116?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ryan Ghods</b></sub></a><br /><a href="#content-ryanio" title="Content">🖋</a></td>
    <td align="center"><a href="https://oliverpetrovic.sk/"><img src="https://avatars0.githubusercontent.com/u/44640417?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Oliver</b></sub></a><br /><a href="#content-OliverPetrovic" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Kristiyan96"><img src="https://avatars3.githubusercontent.com/u/15987117?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kristiyan</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3AKristiyan96" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.blockcypher.com"><img src="https://avatars0.githubusercontent.com/u/4904?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matthieu Riou</b></sub></a><br /><a href="#content-matthieu" title="Content">🖋</a></td>
    <td align="center"><a href="http://pansay.com/"><img src="https://avatars2.githubusercontent.com/u/4820218?v=4?s=100" width="100px;" alt=""/><br /><sub><b>pansay</b></sub></a><br /><a href="#content-pansay" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Apansay" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/eirtscience"><img src="https://avatars2.githubusercontent.com/u/6157618?v=4?s=100" width="100px;" alt=""/><br /><sub><b>eirtscience</b></sub></a><br /><a href="#content-eirtscience" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/lewifr"><img src="https://avatars2.githubusercontent.com/u/49526117?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Francis Lewis</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Alewifr" title="Bug reports">🐛</a> <a href="#content-lewifr" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/baub"><img src="https://avatars3.githubusercontent.com/u/44686?v=4?s=100" width="100px;" alt=""/><br /><sub><b>baub</b></sub></a><br /><a href="#content-baub" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Abaub" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/l-armstrong"><img src="https://avatars0.githubusercontent.com/u/43922258?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lamone</b></sub></a><br /><a href="#content-l-armstrong" title="Content">🖋</a></td>
    <td align="center"><a href="http://seanoconn.org"><img src="https://avatars2.githubusercontent.com/u/9483108?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sean O'Connor</b></sub></a><br /><a href="#content-aseoconnor" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/ttrowell"><img src="https://avatars1.githubusercontent.com/u/1165813?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tara Rowell</b></sub></a><br /><a href="#content-ttrowell" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/aleksicohen/"><img src="https://avatars0.githubusercontent.com/u/30537851?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aleksi Cohen</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Ahiiri" title="Bug reports">🐛</a> <a href="#content-hiiri" title="Content">🖋</a></td>
    <td align="center"><a href="https://staktrace.com/"><img src="https://avatars3.githubusercontent.com/u/485789?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kartikaya Gupta (kats)</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Astaktrace" title="Bug reports">🐛</a> <a href="#content-staktrace" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/siddhantkharode"><img src="https://avatars0.githubusercontent.com/u/50978880?v=4?s=100" width="100px;" alt=""/><br /><sub><b>siddhantkharode</b></sub></a><br /><a href="#content-siddhantkharode" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Asiddhantkharode" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://renandincer.com"><img src="https://avatars0.githubusercontent.com/u/1429100?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Renan Dincer</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Arenandincer" title="Bug reports">🐛</a> <a href="#content-renandincer" title="Content">🖋</a></td>
    <td align="center"><a href="http://znie.org"><img src="https://avatars1.githubusercontent.com/u/54489058?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zhangyuan Nie</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Azhangyuannie" title="Bug reports">🐛</a> <a href="#content-zhangyuannie" title="Content">🖋</a></td>
    <td align="center"><a href="https://alphachain.io"><img src="https://avatars0.githubusercontent.com/u/54278053?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Patrick Collins</b></sub></a><br /><a href="#content-PatrickAlphaC" title="Content">🖋</a></td>
    <td align="center"><a href="https://santdeleon.io"><img src="https://avatars2.githubusercontent.com/u/22578527?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sant Deleon</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=santdeleon" title="Code">💻</a></td>
    <td align="center"><a href="http://daml.com"><img src="https://avatars1.githubusercontent.com/u/11665611?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Martin Huschenbett</b></sub></a><br /><a href="#content-hurryabit" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Ahurryabit" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.kallemoen.com"><img src="https://avatars1.githubusercontent.com/u/13684960?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kalle Moen</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Akallemoen" title="Bug reports">🐛</a> <a href="#content-kallemoen" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/esteticalVE"><img src="https://avatars1.githubusercontent.com/u/49448423?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vitaly</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=esteticalVE" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/neewy"><img src="https://avatars.githubusercontent.com/u/11841667?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nikolay Yushkevich</b></sub></a><br /><a href="#content-neewy" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/darkwater4213"><img src="https://avatars.githubusercontent.com/u/53630002?v=4?s=100" width="100px;" alt=""/><br /><sub><b>darkwater4213</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Adarkwater4213" title="Bug reports">🐛</a> <a href="#content-darkwater4213" title="Content">🖋</a></td>
    <td align="center"><a href="https://akashnimare.in"><img src="https://avatars.githubusercontent.com/u/2263909?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Akash Nimare</b></sub></a><br /><a href="#content-akashnimare" title="Content">🖋</a></td>
    <td align="center"><a href="https://davemackey.net/"><img src="https://avatars.githubusercontent.com/u/8009774?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dave Mackey</b></sub></a><br /><a href="#content-davidshq" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Siegrift"><img src="https://avatars.githubusercontent.com/u/22679154?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Emanuel Tesař</b></sub></a><br /><a href="#content-Siegrift" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/DeFiDude"><img src="https://avatars.githubusercontent.com/u/59237470?v=4?s=100" width="100px;" alt=""/><br /><sub><b>DeFiDude</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3ADeFiDude" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://austingriffith.com"><img src="https://avatars.githubusercontent.com/u/2653167?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Austin Griffith</b></sub></a><br /><a href="#content-austintgriffith" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://chasemanning.co.nz"><img src="https://avatars.githubusercontent.com/u/53957795?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chase Manning</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Achase-manning" title="Bug reports">🐛</a> <a href="#content-chase-manning" title="Content">🖋</a></td>
    <td align="center"><a href="http://cartesi.io"><img src="https://avatars.githubusercontent.com/u/28073950?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Colin Steil</b></sub></a><br /><a href="#content-colinsteil" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/MonarthS"><img src="https://avatars.githubusercontent.com/u/40236229?v=4?s=100" width="100px;" alt=""/><br /><sub><b>MonarthS</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=MonarthS" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/adamdry"><img src="https://avatars.githubusercontent.com/u/7360709?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Dry</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aadamdry" title="Bug reports">🐛</a> <a href="#content-adamdry" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/seishun"><img src="https://avatars.githubusercontent.com/u/988441?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nikolai Vavilov</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aseishun" title="Bug reports">🐛</a> <a href="#content-seishun" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/okdonga"><img src="https://avatars.githubusercontent.com/u/12257412?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Katie </b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aokdonga" title="Bug reports">🐛</a> <a href="#content-okdonga" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/comeToThinkOfEth"><img src="https://avatars.githubusercontent.com/u/78873209?v=4?s=100" width="100px;" alt=""/><br /><sub><b>comeToThinkOfEth</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3AcomeToThinkOfEth" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/catsnackattack"><img src="https://avatars.githubusercontent.com/u/36013218?v=4?s=100" width="100px;" alt=""/><br /><sub><b>catsnackattack</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Acatsnackattack" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/maurycyp"><img src="https://avatars.githubusercontent.com/u/1296842?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maurycy</b></sub></a><br /><a href="#content-maurycyp" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/ipapandinas"><img src="https://avatars.githubusercontent.com/u/26460174?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Igor Papandinas</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aipapandinas" title="Bug reports">🐛</a> <a href="https://github.com/ethereum/ethereum-org-website/commits?author=ipapandinas" title="Code">💻</a></td>
    <td align="center"><a href="https://stackoverflow.com/users/355191/tahir-alvi"><img src="https://avatars.githubusercontent.com/u/1356887?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tahir Alvi </b></sub></a><br /><a href="#ideas-tahiralvi" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/amirmehdi"><img src="https://avatars.githubusercontent.com/u/24705793?v=4?s=100" width="100px;" alt=""/><br /><sub><b>amirmehdi</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aamirmehdi" title="Bug reports">🐛</a> <a href="#content-amirmehdi" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/Dadybayo"><img src="https://avatars.githubusercontent.com/u/33674013?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dan Dadybaev</b></sub></a><br /><a href="#content-Dadybayo" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.pir8aye.net"><img src="https://avatars.githubusercontent.com/u/18469214?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Finley</b></sub></a><br /><a href="#ideas-finleyexp" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/nobd"><img src="https://avatars.githubusercontent.com/u/51967351?v=4?s=100" width="100px;" alt=""/><br /><sub><b>nobd</b></sub></a><br /><a href="#content-nobd" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/AlexSSD7"><img src="https://avatars.githubusercontent.com/u/43043344?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexander Sadovskyi</b></sub></a><br /><a href="#content-AlexSSD7" title="Content">🖋</a></td>
    <td align="center"><a href="https://www.etggames.com/"><img src="https://avatars.githubusercontent.com/u/13756744?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ethan Sarif-Kattan</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3AEthanSK" title="Bug reports">🐛</a> <a href="#content-EthanSK" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/cj-technical"><img src="https://avatars.githubusercontent.com/u/58790577?v=4?s=100" width="100px;" alt=""/><br /><sub><b>C.J. Kozarski</b></sub></a><br /><a href="#content-cj-technical" title="Content">🖋</a></td>
    <td align="center"><a href="http://yakko.tech"><img src="https://avatars.githubusercontent.com/u/38760734?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yakko Majuri</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/commits?author=yakkomajuri" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/adlerjohn"><img src="https://avatars.githubusercontent.com/u/3290375?v=4?s=100" width="100px;" alt=""/><br /><sub><b>John Adler</b></sub></a><br /><a href="#content-adlerjohn" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aadlerjohn" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/fubuloubu"><img src="https://avatars.githubusercontent.com/u/3859395?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Just some guy</b></sub></a><br /><a href="#content-fubuloubu" title="Content">🖋</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ved08"><img src="https://avatars.githubusercontent.com/u/37742218?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vedvardhan</b></sub></a><br /><a href="#content-ved08" title="Content">🖋</a> <a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Aved08" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/vemuez"><img src="https://avatars.githubusercontent.com/u/9627828?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yussuf Elarif</b></sub></a><br /><a href="https://github.com/ethereum/ethereum-org-website/issues?q=author%3Avemuez" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://davidawad.com"><img src="https://avatars.githubusercontent.com/u/4019054?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David Awad</b></sub></a><br /><a href="#content-davidawad" title="Content">🖋</a></td>
    <td align="center"><a href="http://www.rtfs.hu"><img src="https://avatars.githubusercontent.com/u/20340?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alex Beregszaszi</b></sub></a><br /><a href="#content-axic" title="Content">🖋</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

### Join our Discord server

We have a space to discuss all things ethereum.org – share your ideas or just say hi over [on Discord](https://discord.gg/CetY6Y4).
