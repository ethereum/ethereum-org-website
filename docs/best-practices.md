# Website conventions / best practices

## ❗️ Translation initiative

_Please read carefully if adding or altering any written language content_

How to prepare your content for translation depends on whether you're working on a simple Markdown/MDX page or a React component page.

**- MDX pages (`/src/content/page/`)**

Markdown will be translated as whole pages of content, so no specific action is required. Simply create a new folder within `/src/content/` with the name of the page, then place index markdown file (ie. `index.md`) within the new folder.

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

  - This results in significant challenges during the translation process, as written syntax for each language will vary in terms of ordering subjects/verbs/etc.
  - If you're wanting to link to something within your sentence, create a link at the end of the sentence or paragraph:

  ```tsx
  <p>
    All Ethereum transactions require a fee, known as Gas, that gets paid to the
    miner. <Link to="link">More on Gas</Link>
  </p>
  ```

  Once, you've added your English content to the appropriate JSON file, the above code should look something more like:

  ```tsx
  <p>
    <Translation id="page-transactions" />{" "}
    <Link to="link">
      <Translation id="page-transactions-gas-link" />
    </Link>
  </p>
  ```

  - _tl;dr Each individual JSON entry should be a complete phrase by itself_

- This is done using the `Translation` component. However there is an alternative method for regular JS: using the `t` function from `gatsby-plugin-react-i18next`

  - **Method one: `<Translation />` component (preferred if only needed in JSX)**

    ```tsx
    import { Translation } from "src/components/Translation"

    // Utilize in JSX using
    ;<Translation id="language-json-key" />
    ```

  - **Method two: `t()`**

    ```tsx
    import { useTranslation } from "gatsby-plugin-react-i18next"

    // Utilize anywhere in JS using
    const { t } = useTranslation()
    t("language-json-key")
    ```

    ```tsx
    const siteTitle = t("site-title")
    ```

## React Hooks

- Components and pages are written using arrow function syntax with React hooks in lieu of using class-based components

```tsx
// Example
import React, { useState, useEffect } from "react"

const ComponentName: React.FC = (props) => {
  // useState hook for managing state variables
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    // useEffect hook for handling component lifecycle
    setGreeting("Hello world")
  }, [])

  return <div>{greeting}</div>
}

export default ComponentName
```

## Styling

- `src/theme.ts` - Declares site color themes, breakpoints and other constants (try to utilize these colors first)
- We use [emotion](https://emotion.sh/)

  - Tagged template literals are used to style custom components

  ```tsx
  // Example of styling syntax using emotion

  import styled from "@emotion/styled"

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

- Values from `src/theme.ts` are automatically passed as a prop object to styled components

  ```tsx
  // Example of theme.ts usage

  import styled from "@emotion/styled"

  const Container = styled.div`
    background: ${(props) => props.theme.colors.background};
    @media (max-width: ${(props) => props.theme.breakpoints.s}) {
      font-size: #{(props) => props.theme.fontSized.s};
    }
  `
  ```

- [Framer Motion](https://www.framer.com/motion/) - An open source and production-ready motion library for React on the web, used for our animated designs
- **Emojis**: We use [Twemoji](https://twemoji.twitter.com/), an open-source emoji set created by Twitter. These are hosted by us, and used to provide a consistent experience across operating systems.

```tsx
// Example of emoji use
import Emoji from "./Emoji"

// Within JSX:
;<Emoji text=":star:" fontSize="xl" /> // the base fontSize is `md`
```

- **Icons**: We use [React Icons](https://react-icons.github.io/react-icons/)
  - `src/components/Icon.ts` is the component used to import icons to be used
  - If an icon you want to use is not listed you will need to add it to this file

`src/components/Icon.ts`:

```tsx
// Example of how to add new icon not listed
import { ZzIconName } from "react-icons/zz"

// Then add to IconContect.Provider children:
{
  name === "alias" && <ZzIconName />
}
```

From React component:

```tsx
// Example of icon use
import Icon from "./Icon"

// Within JSX:
;<Icon name="alias" />
```

## Image loading and API calls using GraphQL

- [Gatsby + GraphQL](https://www.gatsbyjs.com/docs/graphql/) used for loading of images and preferred for API calls (in lieu of REST, if possible/practical). Utilizes static page queries that run at build time, not at run time, optimizing performance.
- Image loading example:

```tsx
import { graphql } from "gatsby"

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
// These query results get passed as an object `props.data` to your component
```

- API call example:

```tsx
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
