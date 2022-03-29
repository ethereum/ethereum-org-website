To add a new page to ethereum.org:

If the new page needs a new directory, create it and also create a landing page named index.md
Then create a subdir for the specific page, inside create the content file index.md.

e.g. new dir in /developer/docs/

```
developers
|
|---- docs
	|
	|----data-structures
		|
		|----index.md
		|----rlp
		      |
		      |----index.md

```

`data-structures/index.md` is a landing page with links to the content in its subdirectories but usually containing some introductory information about the topic.
The specific content about (e.g.) rlp serialization goes in `/data-structures/rlp/index.md`.

Then this page needs to be made visible in the top menu and sidebar menu. This requires additions to four files.

1. /src/data/developers-docs-links.yaml

This file includes links that are used to automatically update links to translated pages. Copy the syntax from other pages, nesting where appropriate

e.g.

```yaml

---
- id: docs-nav-data-structures
  to: /developers/docs/data-structures/
  description: docs-nav-data-structures-description
  items:
    - id: docs-nav-data-structures-rlp
      to: /developers/docs/data-structures/rlp/
```

2. src/intl/en/page-developers-docs.json

This adds info necessary for including the pages in menus. Copy syntax from othe rpages and add for new page.
e.g.

```yaml
...
  "docs-nav-data-structures": "Data structures",
  "docs-nav-data-structures-description": "Explanation of the data structures used across the Ethereum stack",
  "docs-nav-data-structures-rlp": "Recursive-length prefix (RLP)",

```

3. src/intl/en/page-developers-index.json

```yaml

```

4. src/pages/developers/index.js
   Adds link to the developers landing page

```yaml

---
<Link to="/developers/docs/data-structures/">
<Translation id="page-developers-data-structures-link" />
</Link>
<p>
<Translation id="page-developers-data-structures-desc" />
</p>
```
