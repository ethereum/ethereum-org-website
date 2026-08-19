# Organizations hub: information architecture and keyword audit

**Status:** proposed information architecture and search-intent guardrails

**Scope:** a new top-level **Organizations** hub, its Enterprise and Institutions
paths, and the existing Founders path.

## Recommendation

Add **Organizations** as a top-level navigation item.

```text
Learn · Use · Build · Organizations · Participate · Research
```

This audience cannot be accurately represented by **Build** alone. A decision to
use Ethereum can involve product, treasury, operations, legal, compliance,
security, procurement, and policy teams; not every visitor is a builder.

The hub should be an impartial router, not an acquisition funnel:

```text
/organizations
├── /enterprise
├── /institutions
└── /founders                    existing route
```

### Why these three paths

| Path             | Audience and job                                                                                                                                    |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Enterprise**   | Commercial organizations, including financial institutions, assessing products, operations, settlement, and shared infrastructure.                  |
| **Institutions** | Governments, public agencies, multilaterals, NGOs, civil-society groups, and public-interest organizations assessing durable public infrastructure. |
| **Founders**     | Teams building new products and looking for existing ecosystem support. This remains a distinct task and an existing route.                         |

No fourth primary path is needed. Financial institutions belong within
Enterprise; research is already top-level; nonprofits are covered by
Institutions.

## `/organizations`: the top-level hub

**Navigation label:** Organizations
**Route:** `/organizations`
**Suggested H1:** _Ethereum for organizations_
**Suggested title tag:** _Ethereum for organizations | ethereum.org_
**Suggested meta description:** _Choose an Ethereum learning path for your
organization: enterprise systems, public-interest institutions, or a new
product team._

### Purpose

A short audience router. It should not recreate Enterprise, Institutions, or
Founders content.

### Content

- **Hero:** Ethereum for organizations.
- **Enterprise card:** For companies evaluating open infrastructure for products,
  operations, and coordination. → `/enterprise`
- **Institutions card:** For public agencies, public-interest organizations, and
  civil society exploring resilient digital infrastructure. → `/institutions`
- **Founders card:** For teams building Ethereum products and seeking programs,
  funding, and community. → `/founders`
- **Shared note:** Ethereum is open infrastructure; no organization owns it; it
  is not the right tool for every problem.

## Enterprise information architecture

```text
/enterprise
├── /enterprise/why-ethereum
├── /enterprise/use-cases
│   ├── /enterprise/digital-assets
│   ├── /enterprise/onchain-markets
│   └── /enterprise/verifiable-credentials
├── /enterprise/architecture
├── /enterprise/confidential-systems
├── /enterprise/operational-resilience
├── /enterprise/due-diligence
├── /enterprise/get-started
└── /enterprise/evidence-and-data
```

### Page definitions and search-intent guardrails

| Route                                | Navigation label        | Suggested H1                                  | Intended search task                                                                       | Content boundary                                                                                                                                                                                                               |
| ------------------------------------ | ----------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/enterprise`                        | Enterprise              | **Ethereum for enterprises**                  | “Is Ethereum relevant to my company?”                                                      | A commercial-organization hub. Routes visitors by question, shows capabilities and constraints, and avoids a generic blockchain explainer.                                                                                     |
| `/enterprise/why-ethereum`           | Why Ethereum            | **Open infrastructure for organizations**     | “What is structurally different about Ethereum for an organization?”                       | CROPS in organizational-risk language; credible neutrality; smallest-trust-boundary table; limitations. Do not compete with the broad _What is Ethereum?_ page.                                                                |
| `/enterprise/use-cases`              | Use cases               | **Coordination patterns for organizations**   | “What organizational problems can Ethereum help coordinate?”                               | A routing index: value movement, markets, credentials, and shared records. Each card includes requirements and trade-offs. Do not recreate the general `/use-cases/` catalogue.                                                |
| `/enterprise/digital-assets`         | Digital assets          | **Designing digital asset systems**           | “How do we design issuance, transfer controls, redemption, and settlement?”                | Tokenized assets, stablecoins, lifecycle rules, custody, redemption, and system boundaries. It must not target “what are stablecoins?” - that belongs to `/stablecoins/`.                                                      |
| `/enterprise/onchain-markets`        | Onchain markets         | **Evaluating onchain market infrastructure**  | “How should an organization assess lending, collateral, trading, or settlement protocols?” | Open financial infrastructure, composability, market structure, counterparties, and smart-contract risk. It must not target generic “DeFi explained,” which belongs to existing DeFi content.                                  |
| `/enterprise/verifiable-credentials` | Verifiable credentials  | **Designing verifiable credential systems**   | “How can an organization issue and verify claims with data minimization?”                  | Attestations, eligibility, revocation, portability, and selective disclosure. It must not target generic “decentralized identity,” which belongs to `/decentralized-identity/`.                                                |
| `/enterprise/architecture`           | Architecture            | **Choosing an Ethereum architecture**         | “Should we use Mainnet, an L2, a tailored rollup, or a conventional system?”               | Mainnet, existing L2s, tailored environments, permissioned designs, and escape hatches. It must not target “what is Layer 2?” - that belongs to `/layer-2/`.                                                                   |
| `/enterprise/confidential-systems`   | Confidential systems    | **Confidential systems for organizations**    | “How can an organization keep data confidential while proving what matters?”               | Information flow, selective disclosure, privacy architectures, viewing permissions, ZK proofs, operational limits, and an external link to EthSystems. It must not target “privacy on Ethereum,” which belongs to `/privacy/`. |
| `/enterprise/operational-resilience` | Security and operations | **Operating resilient Ethereum systems**      | “How do we run an Ethereum-based system safely over time?”                                 | Contracts, keys, custody, dependencies, incidents, upgrades, and governance. Link to Trillion-Dollar Security; do not replicate its ecosystem-wide report.                                                                     |
| `/enterprise/due-diligence`          | Evaluate                | **Evaluating Ethereum for your organization** | “What must we validate before committing?”                                                 | Diligence checklist, walkaway test, phased approach, owners, and clear cases where Ethereum is not appropriate. This is a decision guide, not a security manual.                                                               |
| `/enterprise/get-started`            | Get started             | **From evaluation to first deployment**       | “What is the responsible next step after deciding to explore?”                             | Documentation, standards, testnets, and criteria for evaluating external help. No provider ranking or lead-routing.                                                                                                            |
| `/enterprise/evidence-and-data`      | Evidence and data       | **Evidence for organizational decisions**     | “Where can we verify claims, sources, and relevant network data?”                          | Primary sources, dated case studies, methodology, and maintained data modules. Do not duplicate the general `/resources/` discovery hub.                                                                                       |

### Enterprise page sequencing

The local Enterprise navigation should group pages by the visitor’s decision:

```text
Understand
  Why Ethereum
  Use cases

Design
  Architecture
  Confidential systems
  Operational resilience

Decide and proceed
  Evaluate
  Get started
  Evidence and data
```

## Institutions information architecture

```text
/institutions
├── /institutions/public-infrastructure
├── /institutions/civil-society-and-development
├── /institutions/policy-and-procurement
└── /institutions/evidence-and-case-studies
```

**Slug decision:** Prefer `/institutions` only if the former
`institutions.ethereum.org` subdomain is not redirected to that exact route. If
the subdomain is redirected to `/enterprise`, use `/public-infrastructure`
instead to avoid two similarly named destinations with different purposes.

| Route                                         | Navigation label              | Suggested H1                                               | Intended search task                                                                            | Content boundary                                                                                                                                                     |
| --------------------------------------------- | ----------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/institutions`                               | Institutions                  | **Ethereum for public-interest institutions**              | “Is Ethereum relevant to a public agency, NGO, or multilateral?”                                | A hub for public-interest and civic contexts. It should not be another institutional-finance landing page.                                                           |
| `/institutions/public-infrastructure`         | Public infrastructure         | **Digital public infrastructure with credible neutrality** | “How can open infrastructure support identity, records, payments, or data exchange?”            | Public services, citizen rights, continuity, accountability, and inclusion. Grounded in EPIC material.                                                               |
| `/institutions/civil-society-and-development` | Civil society and development | **Open coordination for civil society and development**    | “How can Ethereum support public goods, humanitarian work, development, or local coordination?” | Public goods, transparent funding, aid delivery, connectivity, and community coordination. Avoid treating charitable use as proof of impact without primary sources. |
| `/institutions/policy-and-procurement`        | Policy and procurement        | **Procuring open digital infrastructure**                  | “How should a public institution evaluate a public blockchain?”                                 | Sovereignty, vendor dependence, privacy, legal duties, accessibility, inclusion, long-term capability, and exit paths.                                               |
| `/institutions/evidence-and-case-studies`     | Evidence and case studies     | **Public-interest Ethereum: evidence and case studies**    | “What verified public-sector and civil-society examples exist?”                                 | Dated, primary-source deployments and research. No logo wall or testimonials.                                                                                        |

## Keyword repetition audit

### Existing Ethereum.org pages found locally

| Existing route                       | Current title or dominant intent                                           | New route that could collide         | Resolution                                                                                                                                                        |
| ------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/privacy/`                          | **Privacy on Ethereum** - tools and techniques for protecting privacy      | `/enterprise/confidential-systems`   | Use “confidential systems,” “selective disclosure,” and “organizational information flow.” Do not use “Privacy on Ethereum” in the title, H1, or primary keyword. |
| `/layer-2/`                          | **Layer 2** - what L2s are, their benefits, and where to begin             | `/enterprise/architecture`           | Use “choosing an Ethereum architecture,” “settlement choices,” “execution environment,” and “exit paths.” Avoid “Ethereum Layer 2” as the primary title phrase.   |
| `/stablecoins/`                      | **Stablecoins explained: What are they for?**                              | `/enterprise/digital-assets`         | Use “digital asset systems,” “issuance,” “redemption,” “transfer controls,” and “asset lifecycle.” Avoid “stablecoins explained” and “what are stablecoins.”      |
| `/use-cases/`                        | **Ethereum use cases: DeFi, payments, NFTs, DAOs, and more**               | `/enterprise/use-cases`              | Use “coordination patterns for organizations” as the H1 and focus on organizational requirements, not broad consumer/app categories.                              |
| `/decentralized-identity/`           | **Decentralized identity**                                                 | `/enterprise/verifiable-credentials` | Use “verifiable credentials,” “attestations,” “eligibility,” and “revocation.” Avoid “what is decentralized identity?”                                            |
| `/reports/trillion-dollar-security/` | **Trillion Dollar Security Project - Security Challenges Overview Report** | `/enterprise/operational-resilience` | Use “operating resilient Ethereum systems.” Link to 1TS for ecosystem security research; do not create a competing security-report page.                          |
| `/resources/`                        | General Ethereum resources and live ecosystem information                  | `/enterprise/evidence-and-data`      | Use “evidence for organizational decisions,” with sources and decision-relevant methodology. Avoid generic “Ethereum resources.”                                  |
| `/founders/`                         | **Founders support**                                                       | `/organizations`                     | Keep the route unchanged; link to it as one audience path. Do not create `/enterprise/founders`.                                                                  |
| `/what-is-ethereum/` and `/learn/`   | General Ethereum foundations                                               | `/enterprise/why-ethereum`           | Focus on organizational architecture and trust boundaries, not definitions of Ethereum, ether, wallets, or gas.                                                   |

### Rules that prevent cannibalization

1. Each new page must own an **organizational decision**; existing pages own a
   **general concept** or a **consumer/developer task**.
2. Do not duplicate the existing page’s title tag, H1, opening paragraph, or
   internal-link anchor text.
3. The Enterprise page should link to the general explainer for foundational
   education, then add decision context rather than repeat it.
4. Use one primary query family per route. Supporting terms can overlap, but the
   page’s title, H1, opening, and section hierarchy must remain distinct.
5. Canonicalize every new page to itself and avoid creating two routes that
   answer the same query with different audience labels.

## Naming decisions

### Use these names

- **Organizations** - top-level navigation and audience hub.
- **Enterprise** - commercial organization path.
- **Institutions** - public-interest path, provided the redirect decision does
  not create ambiguity.
- **Confidential systems** - the Enterprise privacy page.
- **Architecture** - the Enterprise Mainnet/L2/custom-environment decision page.
- **Operational resilience** - the page joining security and long-term operation.
- **Due diligence** - the decision page, rather than a second generic security page.
- **Evidence and data** - a source and methodology page, not a generic resource directory.

### Avoid these names

- **Business** - sounds like a commercial channel and excludes public-interest
  organizations.
- **Institutional privacy** - too close to the former redirect and frames
  privacy only as an institutional requirement.
- **Enterprise privacy** - competes too directly with `/privacy/`.
- **Layer 2 for enterprise** - competes too directly with `/layer-2/`.
- **Enterprise stablecoins** - competes too directly with `/stablecoins/`.
- **Enterprise security** - competes too directly with 1TS and other security
  content.
- **Resources** - too generic on its own, given the existing `/resources/` hub.

## Launch order

### First release

1. `/organizations`
2. `/enterprise`
3. `/enterprise/why-ethereum`
4. `/enterprise/use-cases`
5. `/enterprise/architecture`
6. `/enterprise/confidential-systems`
7. `/enterprise/due-diligence`
8. `/institutions`
9. `/institutions/public-infrastructure`
10. A prominent link to existing `/founders`

### Second release

- Digital assets
- Onchain markets
- Verifiable credentials
- Operational resilience
- Get started
- Evidence and data
- The remaining Institutions pages

This keeps the first release focused on the questions currently served by
redirects: what Ethereum provides, privacy, architecture, and whether an
organization should proceed.

## Editorial requirements

- CROPS is a trade-off lens, never a simplistic scorecard.
- Every page names at least one limitation or trust assumption.
- Use primary sources for claims and date claims that can change.
- Ethereum.org does not recommend vendors, route leads, certify compliance, or
  offer legal, investment, tax, or procurement advice.
- Keep Institutions and EthSystems as clearly labelled specialist resources in
  context, rather than top-level menu destinations or implicit endorsements.
