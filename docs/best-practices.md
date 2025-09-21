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
  - If capitalization styling is required, it is preferable to style with CSS
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

We use [Tailwind CSS](https://tailwindcss.com/) as our primary styling approach, combined with the [shadcn/ui](https://ui.shadcn.com/) component library built on [Radix UI](https://www.radix-ui.com/) primitives.

### Styling Approach

- **Primary**: Tailwind CSS utility classes
- **Component variants**: Use `class-variance-authority` (cva) for component variants
- **Dynamic classes**: Use `cn()` utility function (combines clsx + tailwind-merge)
- **Responsive design**: Mobile-first approach with Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)

### Layout Components

Use standard HTML elements with Tailwind classes for layouts:

```tsx
// Flexbox layouts
<div className="flex items-center justify-between">
<div className="flex flex-col gap-4">

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Centering
<div className="flex items-center justify-center min-h-screen">
```

### Component Styling

Use shadcn/ui components for interactive elements:

```tsx
import { Button } from "@/components/ui/button"

<Button variant="outline" size="sm">
  Click me
</Button>
```

### Colors and Theming

Use CSS custom properties defined in the design system:

```tsx
<div className="bg-primary text-primary-foreground">
<div className="border border-border bg-background">
```

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

[Next.js Image](https://nextjs.org/docs/app/api-reference/components/image) is the component of choice to handle responsive images. We use a custom version of this component that integrates with our design system.

```tsx
import { Image } from "@/components/Image"
```
