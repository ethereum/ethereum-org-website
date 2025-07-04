# Website conventions / best practices

## ❗️ Translation initiative

_Please read carefully if adding or altering any written language content_

How to prepare your content for translation depends on whether you're working on a simple Markdown/MDX page or a React component page.

**- MDX pages (`public/content/page/`)**

Markdown will be translated as whole pages of content, so no specific action is required. Simply create a new folder within `public/content/` with the name of the page, then place an index markdown file (ie. `index.md`) within the new folder.

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
    miner. <Link href="link">More on Gas</Link>
  </p>
  ```

  Once, you've added your English content to the appropriate JSON file, the above code should look something more like:

  ```tsx
  <p>
    <Translation id="page-transactions" />{" "}
    <Link href="link">
      <Translation id="page-transactions-gas-link" />
    </Link>
  </p>
  ```

  - _tl;dr Each individual JSON entry should be a complete phrase by itself_

- This is done using the `Translation` component. However there is an alternative method for regular JS: using the `t` function from `@/hooks/useTranslation`

  - **Method one: `<Translation />` component (preferred if only needed in JSX)**

    ```tsx
    import { Translation } from "src/components/Translation"

    // Utilize in JSX using
    ;<Translation id="language-json-key" />
    ```

  - **Method two: `t()`**

    ```tsx
    import { useTranslation } from "@/hooks/useTranslation"

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

const ComponentName = () => {
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

We use [Chakra UI](https://chakra-ui.com/).

`src/@chakra-ui/theme.ts` - Holds all the theme configuration. This is where you can find the colors, fonts, component themes, variants, etc.

- Wrappers or layout divs

Use the [native layouts components](https://chakra-ui.com/docs/components/box)

```tsx
<Stack direction='row'>
```

Center things using the `<Center />` component

```tsx
<Center h="100px">
```

- Group buttons using `<ButtonGroup />` or `<Wrap />`

```tsx
<ButtonGroup variant='outline' spacing={2}>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>

// or
<Wrap spacing={2}>
  <WrapItem><Button variant="outline">Button 1</Button></WrapItem>
  <WrapItem><Button variant="outline">Button 2</Button></WrapItem>
</Wrap>
```

- Breakpoints

Use [the Chakra default breakpoints](https://www.chakra-ui.com/docs/theming/customization/breakpoints).

```tsx
<Container display={{ base: "block", sm: "flex" }} />
```

- Theme colors

```tsx
<Text color="primary.base" bg="background.base" />
```

> Note the dotted notation. In Chakra, the values are referred to as "semantic tokens" and the new theme applies a nested structure of like tokens for better organization. See [semanticTokens.ts](../src/@chakra-ui/semanticTokens.ts)

> Note 2: all the previous colors defined in the old theme `src/theme.ts` were
> ported into the new theme for compatibility reasons. Those colors will
> transition out of the codebase as we adopt the DS colors.

- [Framer Motion](https://www.framer.com/motion/) - An open source and production-ready motion library for React on the web, used for our animated designs
- **Emojis**: We use [Twemoji](https://twemoji.twitter.com/), an open-source emoji set created by Twitter. These are hosted by us, and used to provide a consistent experience across operating systems.

```tsx
// Example of emoji use
import Emoji from "./Emoji"

// Within JSX:
;<Emoji text=":star:" fontSize="xl" /> // the base fontSize is `md`
```

## Icons: Lucide

We use [Lucide](https://lucide.dev/icons/) for icons, imported via the [lucide-react](https://www.npmjs.com/package/lucide-react) package.

Lucide icons by default use strokes only, with default 2px stroke width, rounded line-caps and line-joins, and follow `currentColor`.

### Basic Usage

```tsx
import { Heart } from "lucide-react"
;<Heart />
```

### Sizing

Use tailwind classes to size icons:

- **Static**: example: `size-6` (24px), `size-4` (16px), etc.
- **Mirror `fontSize`**: `size-[1em]`, `size-[0.875em]` to match surrounding text
- **Custom (avoid)**: `size-[50px]` for specific dimensions

```tsx
<Heart className="size-6" />
```

### Coloring

- **Stroke color**: Follows `currentColor`, use `text-*` classes (e.g., `text-primary`, `text-accent-a`)
- **Fill**: Avoid using in most cases to maintain consistent theming

```tsx
<Heart className="text-primary" />
```

### Stroke Properties

- **`strokeWidth`**: example: `stroke-[3]` (use Tailwind classes),
- **`strokeLinecap`/`strokeLinejoin`**: Use props directly on the icon component

  ```tsx
  import { Check } from "lucide-react"
  ;<Check
    className="stroke-[4.5]"
    strokeLinecap="square"
    strokeLinejoin="miter"
  />
  ```

  Options:
  - `strokeLinecap`: `butt`, `round`, `square`
  - `strokeLinejoin`: `round`, `bevel`, `miter`, `

### Background Circles

Wrap icon in a div for circular backgrounds, and color using background:

```tsx
<div className="bg-primary/10 grid size-10 place-items-center rounded-full">
  <Heart className="text-primary size-5" />
</div>
```

### Repository Preferences

1. **Preferred**: Lucide out-of-box with color styling
2. **Acceptable**: Lucide with stroke property adjustments
3. **Last resort**: Custom `.svg` imports

## Using custom `Image` component

[Next Image](https://nextjs.org/docs/pages/api-reference/components/image) is the component of choice to handle responsive images. However, we use a custom version of this component that is properly optimized with Chakra. This way we can use style props from Chakra but still be able to forward common or Next Image-specific props to the component for correct usage and rendering.

```tsx
import { Image } from "@/components/Image"
```
