# Custom header IDs for markdown documents

Html ID attributes are used to create links to specific sections of a document. In markdown, **custom header IDs** should be assigned to all header lines (lines that begin with one-or-more hash marks, `#`).

## Markdown syntax

A custom heading ID should follow these rules:

- Placed at the end of a heading line, preceded by a space, followed by a line break
- Wrapped in curly braces
- Starts with a hash-mark
- Uses kebab-case string
- Unique for the current page

For example:

```markdown
## My heading {#my-heading}

### A subheading {#a-subheading}

#### Or a longer title that can be shortened {#long-heading}
```

Note that for short headers, simply lowercasing and using hyphens instead of spaces is sufficient. For longer headers, a shortened concise version of the header is encouraged. Must not repeat the same ID on the same page.

## How are these used?

When these headers are rendered, they come with a link icon attached to it that can be used to quickly link to that section of the document.

Extending the above example, if we wanted to link to the `A subheading` section of the above document (for example living at path `/docs`), you could use the link`/docs#a-subheading` to link directly to that section.

See a live example on ethereum.org: [https://ethereum.org/en/developers/docs/blocks/#block-anatomy](https://ethereum.org/en/developers/docs/blocks/#block-anatomy)

## When to use custom header IDs

### English content

These should be created for header on every new English markdown document.

### Translated content

English files are uploaded to Crowdin for translation. Header ID's should be _inherited_ from the English version, and remain unchanged during translation.

This is to ensure that the translated content can be linked to from other documents and external links, without breaking the path. This is similar to why path and filenames are not translated, but remain in English to simplify linking and referencing.

See a live example on ethereum.org: [https://ethereum.org/es/developers/docs/blocks/#block-anatomy](https://ethereum.org/en/developers/docs/blocks/#block-anatomy)

Notice the header ID is still in English (`#block-anatomy`), but links to the Spanish (`/es/`) version of the site, at the correct section.

## When are these not needed?

Markdown files in the repo `/docs` (such as this one) do not require custom header IDs, as they are not yet displayed on the website, and do not have translated versions.
