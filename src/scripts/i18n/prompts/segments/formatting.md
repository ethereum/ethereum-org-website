# FORMATTING AND TECHNICAL CONTENT

## Locale-Specific Formatting

Follow Unicode CLDR standards for all locale-specific typography:
- Quotation marks (use the correct style for the target language)
- Decimal separators (comma vs period)
- Thousand separators (comma, period, space, or none)
- Punctuation spacing (French uses spaces before certain punctuation)

Apply these conventions consistently throughout the translation.

---

## Tags and Placeholders

### Preserve Tags and Placeholders
Keep tags/placeholders exactly ordered. Do not duplicate, omit, or reorder them.

### Do Not Break Variables
Leave placeholders such as `{userName}`, `{value}`, `%s`, `<0>...</0>` unchanged. Adapt surrounding punctuation only if required.

### Avoid Tag Duplication or Omission
Every opening tag must have its closing counterpart. Never remove tags.

### Maintain Markdown Structure
Lists, tables, headings remain structurally identical. Custom IDs stay identical to English.

### Line Breaks and Whitespace
Avoid introducing or removing line breaks unless necessary for the target language grammar.

---

## Code and Technical Content

### Code, Commands, and Output
Retain code snippets, configuration commands, outputs, function names, and anything in backticks or code blocks exactly. Do not translate placeholders, variables, or braces.

### Code Comments
Translate English comments inside code (lines or blocks starting with `//`, `#`, or `/* ... */`) while leaving all code tokens unchanged.

### URLs, File Paths, and Domain Names
Never translate or alter these. Preserve exactly, including case and slashes.

### Markdown, HTML, and JSX/MDX Syntax
Preserve all formatting symbols, tags, and structure. Do not add/remove markers. Keep tag order identical. Translate only human-readable text outside tags.

---

## Capitalization and Punctuation

### Match Source Capitalization
Preserve capitalization of terms, acronyms, proper nouns (e.g., "Ethereum", "Solidity", "NFT"). Maintain ALL CAPS where used.

### Follow Target Language Conventions
Apply normal punctuation/grammar rules of the target language except where code syntax would break.

### Sentence Structure
Reorder or split/join sentences only to achieve natural grammar; avoid ambiguity changes.

---

## Consistency Guidelines

### Headings
Keep section and subsection heading choices consistent with the English source across the document.

### Example Arrays and Lists
When the source contains example items, translate common nouns/adjectives to the target language. Retain English only for proper names and brands.

### Stable Canonical Terms
Prefer previously used localized headings/labels for recurring sections when known.

---

## Inclusive and Localized Language

### Inclusive Language
Use gender-neutral constructions where possible.

### Regional Neutrality
Use region-neutral language that will be understood by the broadest audience of speakers. Avoid regional slang, colloquialisms, or region-specific vocabulary when a more universal term exists.

### Localize Examples and Units Where Appropriate
Localize date formats, basic punctuation as customary without altering meaning. Do not convert currencies.
