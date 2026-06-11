---
title: Adding articles
description: Guidelines for contributing builder articles to ethereum.org
lang: en
---

# Adding articles {#adding-articles}

## Publishing a builder article {#publishing-a-builder-article}

Builder articles appear at [ethereum.org/latest/](/latest/) and are authored as Markdown files in the repository. They are internally hosted, long-form articles that cover overviews and guides on the Ethereum ecosystem, open-source tech landscape, as well as timely updates for builders and researchers, covering topics like protocol upgrades, new tooling patterns, reference deployments, and more.

### Listing policy {#listing-policy}

Ethereum.org is a neutral, educational resource. The "Latest" section is curated to:

- **Educate** builders and the broader community about Ethereum technology, the open-source ecosystem, and timely developments
- **Remain accurate** in its technical content and references
- **Stay relevant** to the Ethereum builder community

The site does not list articles that primarily promote a specific product, token, or commercial service. All submissions are reviewed by the ethereum.org team before publication.

### Criteria for inclusion {#criteria-for-inclusion}

#### Must-haves {#must-haves}

- **Ethereum and open-source focused** - The article must be primarily about Ethereum, its protocol, tooling, or builder ecosystem, or about the open-source and sanctuary technologies that support it. Content about general blockchain or Web3 topics that does not substantially reference Ethereum or its open-source landscape will not be accepted.
- **Educational or landscape value** - The article should teach builders something actionable (e.g., how to use a new EIP, how to evaluate an architectural choice, how to deploy or contribute to open-source infrastructure) or provide a meaningful perspective on the state of Ethereum and its surrounding open-source ecosystem. Promotional content for specific products, tokens, or commercial services is not accepted.
- **Accurate information** - Technical claims must be factually correct and current. Cite EIPs, official announcements, or onchain data where possible.
- **Original work** - Content must be original or used with permission. See the [plagiarism policy](/contributing/#plagiarism).
- **Language** - Articles may be submitted in any [supported language](/contributing/translation-program/). Set the `lang` field to match the language the article is written in (e.g., `en` for English, `es` for Spanish). Once the article is submitted, English submissions can be translated to other languages, and non-English submissions can be translated to English.

#### Nice-to-haves {#nice-to-haves}

- **Timely and evergreen** - Content that remains useful beyond its publish date is preferred over purely time-sensitive material.
- **Author credibility** - Articles from established builders, researchers, or CROPS-aligned  contributors receive priority.
- **Further reading** - Include a `## Further reading` section with links to relevant EIPs, documentation, and primary sources.

### Propose a builder article {#propose-a-builder-article}

If you want to write a builder article for ethereum.org and it meets the criteria, create an issue on GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?template=content-suggestion.yml">
  Suggest an article
</ButtonLink>
