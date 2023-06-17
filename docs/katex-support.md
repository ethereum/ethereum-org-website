# KaTeX Support

## Libraries utilized:

- `remark-math@3.0.1`
  - Parses markdown to find mathematical expressions, converting wrappers into html with KaTeX supported class names, containing raw KaTex strings
  - Using old version for compatibility with `gatsby-plugin-mdx`
- `@matejmazur/react-katex`
  - Used to convert raw KaTeX strings into html elements with KaTeX supported class names
- `katex`
  - Used to style the classes to actually look like math

## Repo support

KaTeX can be used both in markdown files, as well as inside React components.

### Markdown

KaTeX is supported in markdown using the `$` and `$$` wrappers.

- A pair of `$` wrapping the content is used for inline mathematical expressions
- A pair of `$$` wrapping the content, each on its own line, is used for block mathematical expressions

**Example**

```markdown
This is an inline mathematical expression: $a^2 + b^2 = c^2$

This is a block mathematical expression:

$$
a^2 + b^2 = c^2
$$
```

Inline: $a^2 + b^2 = c^2$

Block:

$$
a^2 + b^2 = c^2
$$

### MDX

When writing expressions nested inside html or React components, you should avoid using traditional markdown syntax. You can instead write the above using html and classes as follows:

```html
<span class="math-inline">a^2 + b^2 = c^2</span>

<div class="math-display">a^2 + b^2 = c^2</div>
```

### React

To utilize KaTeX expressions in React, import the `TeX` library

```tsx
import TeX from "@matejmazur/react-katex"
```

Then, use the `TeX` component to render the expression. The `math` prop is used to pass the raw KaTeX string.

```tsx
<TeX math="a^2 + b^2 = c^2" />
```

For a block expression, use the `block` prop.

```tsx
<TeX block math="a^2 + b^2 = c^2" />
```

To style these expressions appropriately, you must make sure the KaTeX stylesheet is imported where you're using it. This can be done by importing or requiring the css file directly.

```tsx
// At the top of the file
import "katex/dist/katex.min.css"
```

```tsx
// Inside a component
require("katex/dist/katex.min.css")
```

## Resources

- [Gatsby implementation guide](https://nickymeuleman.netlify.app/blog/math-gatsby-mdx)
- [KaTeX Supported Syntax](https://katex.org/docs/supported.html)
- [What are LaTeX, TeX, and KaTeX?](https://standardnotes.com/blog/what-are-latex-tex-and-katex)
