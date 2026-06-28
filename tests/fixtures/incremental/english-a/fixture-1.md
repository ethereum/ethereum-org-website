---
title: Understanding Open Source Licensing
description: A practical guide to free software licenses and collaborative development
image: /images/open-source/hero-licensing.png
alt: "Diagram showing different license types"
template: tutorial
lang: en
published: 2025-06-15
tags: ["open-source", "licensing", "compliance"]
summaryPoints:
  - Open source licenses define how code can be used, modified, and shared
  - Copyleft licenses require derivative works to remain open source
  - Permissive licenses allow proprietary use with minimal restrictions
---

# Understanding Open Source Licensing {#understanding-open-source-licensing}

Open source software is built on the principle that code should be freely shared, studied, and improved. This guide covers the major license families, how to choose between them, and best practices for collaborative development.

**Remember: licensing is a legal matter. This guide is educational, not legal advice. Consult a qualified attorney for your specific situation.**

<Divider />

## What is open source? {#what-is-open-source}

A software license determines how others can use, modify, and distribute your code. Open source licenses grant these rights explicitly, unlike proprietary licenses that restrict them.

The [Open Source Initiative](https://opensource.org/osd) maintains the official Open Source Definition, which requires that licenses allow free redistribution, access to source code, and derived works.

_Without clear licensing_, every project would need custom legal review. The `LICENSE` file in a repository signals exactly what permissions are granted, similar to how the `README.md` file explains the project's purpose.

You can verify a project's license on <a href="https://choosealicense.com/">Choose a License</a> to understand what it permits.

![License comparison chart](/images/open-source/license-comparison.png)

### The four freedoms {#the-four-freedoms}

The [Free Software Foundation](https://www.fsf.org/about/what-is-free-software) defines four essential freedoms:

- **Freedom 0**: The freedom to run the program for any purpose
- **Freedom 1**: The freedom to study how the program works and adapt it
- **Freedom 2**: The freedom to redistribute copies
- **Freedom 3**: The freedom to improve the program and release improvements

These freedoms form the foundation of all free and open source software (FOSS) licensing.

<InfoBanner title="Important distinction" description="Free as in freedom, not free as in price">

The word "free" in free software refers to liberty, not cost. Proprietary software can be free of charge, and free software can be sold commercially. See the [GNU philosophy](https://www.gnu.org/philosophy/free-sw.html) for a detailed explanation.

</InfoBanner>

## Choosing a license {#choosing-a-license}

### Copyleft licenses {#copyleft-licenses}

Copyleft licenses like `GPL-3.0` require that derivative works use the same license. This ensures the software and all modifications remain free. The `AGPL-3.0` extends this requirement to software accessed over a network.

```solidity
// SPDX-License-Identifier: GPL-3.0
// This contract demonstrates a simple registry
pragma solidity ^0.8.0;

contract ProjectRegistry {
  mapping(address => string) public projects;

  function register(string memory name) public {
    require(bytes(name).length > 0, "Name required");
    projects[msg.sender] = name;
  }
}
```

The key advantage of copyleft is that improvements must be shared back with the community. If someone builds on your GPL-licensed library, their modifications are also GPL-licensed.

<ExpandableCard title="When should I use copyleft?" contentPreview="Copyleft is ideal when you want to ensure derivatives stay open" eventCategory="/open-source/copyleft">

Use copyleft when:

1. You want to ensure all derivative works remain open source
2. You are building a library or framework that others will extend
3. You want to prevent proprietary forks of your work

The trade-off is that some companies avoid copyleft-licensed dependencies because of the "viral" nature of the license.

Check the <a href="https://www.gnu.org/licenses/gpl-faq.html">GPL FAQ</a> for common questions about copyleft compliance.

</ExpandableCard>

### Permissive licenses {#permissive-licenses}

Permissive licenses like `MIT` and `Apache-2.0` allow proprietary derivatives. The `BSD-2-Clause` is another popular permissive option with minimal restrictions.

```python
# Example: reading a project's license file
def read_license(path: str) -> str:
  """Read and return the contents of a LICENSE file."""
  with open(path, "r") as f:
    return f.read()

# Check if the license is permissive
def is_permissive(license_text: str) -> bool:
  permissive_keywords = ["MIT", "Apache", "BSD"]
  return any(kw in license_text for kw in permissive_keywords)
```

The main advantage of permissive licenses is maximum adoption. Companies are more likely to use and contribute to permissively-licensed projects because there are no restrictions on how the code can be used.

You can deploy projects using [GitHub](https://github.com/) on any hosting platform, and verify compliance with [SPDX](https://spdx.org/).

Use [Remix](https://remix.ethereum.org/) on [Sepolia](https://sepolia.dev/) with a [block explorer](https://eth.blockscout.com/) to test [smart contracts](/glossary/#smart-contract) before deploying to production.

### Comparison table {#comparison-table}

| License | Type | Derivative works | Patent grant |
|---------|------|-----------------|-------------|
| GPL-3.0 | Copyleft | Must be GPL | Yes |
| AGPL-3.0 | Network copyleft | Must be AGPL | Yes |
| LGPL-3.0 | Weak copyleft | Library can be proprietary | Yes |
| MIT | Permissive | Any license | No |
| Apache-2.0 | Permissive | Any license | Yes |
| BSD-2-Clause | Permissive | Any license | No |
| MPL-2.0 | File-level copyleft | Modified files must be MPL | Yes |

## Community collaboration {#community-collaboration}

### Contributing to projects {#contributing-to-projects}

Contributing to open source starts with understanding the project's workflow. Most projects use issue trackers to coordinate work and pull requests to propose changes.

<ButtonLink href="/contributing/guide/">Start contributing today</ButtonLink>

<DocLink href="/contributing/">
  How to contribute to this project
</DocLink>

<DocLink href="/community/">
  Join our community
</DocLink>

Before submitting a contribution, always check the project's `CONTRIBUTING.md` file for guidelines. Code style, test requirements, and review processes vary between projects.

```md
## Pull Request Template

**Description:** Brief summary of changes
**Related issue:** Link to the issue this addresses
**Testing:** How was this tested?
```

### <Emoji text=":bulb:" size={1} className="me-2" /> Code review best practices {#code-review}

Code review is essential for maintaining quality in collaborative projects. Reviewers should check for correctness, style consistency, and potential security issues.

<Alert variant="update">
<AlertEmoji text=":mag:"/>
<AlertContent>
<AlertDescription>
  Good code reviews focus on the logic and design, not just formatting. Use automated tools like linters for style enforcement, and reserve human review for architectural decisions and edge cases.
</AlertDescription>
</AlertContent>
</Alert>

<QuizWidget quizKey="open-source-licensing" />

## Compliance and auditing {#compliance-and-auditing}

Organizations using open source software must track their dependencies and ensure license compliance<sup>1</sup>. Tools like [FOSSA](https://fossa.com/) and [Snyk](https://snyk.io/) can automate this process.

<CardGrid>
  <Card title="License Audit" description="Scan your project for license conflicts" href="/tools/audit/" />
  <Card title="SBOM Generator" description="Create a software bill of materials" href="/tools/sbom/" />
</CardGrid>

### License scanning {#license-scanning}

Automated license scanning should be part of every CI/CD pipeline. It catches incompatible licenses before they enter your dependency tree.

```bash
# Run a license scan on your project
npx license-checker --production --json > licenses.json

# Check for copyleft licenses in production dependencies
npx license-checker --production --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;ISC"
```

Consider using <a href="https://docs.github.com/en/code-security/dependabot" target="_blank">Dependabot</a> to keep dependencies updated and monitor for license changes.

### SBOM generation {#sbom-generation}

A Software Bill of Materials (SBOM) lists all components in your software. Generating an SBOM is increasingly required for regulatory compliance, especially in security-sensitive industries.

<YouTube id="spec-fixture-001" />

### Key terms {#key-terms}

<GlossaryDefinition term="open-source" />

<GlossaryDefinition term="copyleft" />

Understanding these terms is <em>essential</em> for making <strong>informed decisions</strong> about licensing.

<Alert variant="info">
<Emoji text="📋" />
<div>

Review the full [glossary of terms](/glossary/) for additional definitions. This resource is maintained by the community and updated regularly.

</div>
</Alert>

## Further reading {#further-reading}

_This guide is adapted from materials by the [Open Source Initiative](https://opensource.org/) and the [Free Software Foundation](https://www.fsf.org/)._

- [Choose a License guide](https://choosealicense.com/) - _Simple tool to help pick the right license for your project_
- [SPDX License List](https://spdx.org/licenses/) - _Standardized identifiers for over 500 open source licenses_
- [Open Source Guide](https://opensource.guide/) - _Community-maintained resources for running and contributing to projects_
- Compliance tooling on [FOSSA](https://fossa.com/) - _Automated license scanning and dependency management_
