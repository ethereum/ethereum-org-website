# ExpandableCard Usage: Benefit of server-rendering vs. performance tradeoff

## Summary of ExpandableCard Usage 

> **Scope:** All `<ExpandableCard` instances in English content (`public/content/`), `app/` page components, and `src/components/`. Excludes translations, `.manifests`, and `*specs.ts` files.


| Category | Count | Percentage |
|----------|-------|------------|
| **FAQ** | 73 | **~59%** |
| **Non-FAQ** | 50 | **~41%** |
| **Total** | 123 | 100% |


1. **~59% of all ExpandableCard usage is for FAQs** — question-and-answer style content within explicitly labeled FAQ sections.
2. **The largest non-FAQ use case is EIP reference lists** on the ethereum-forks page (18 cards), using the component purely as a collapsible container for dense technical data.

**Note on the reality of a performance tradeoff**: 
- For standard markdown text and lists, **forcing the content into the initial server-rendered HTML (e.g., using Radix UI's forceMount prop) should only add mere kilobytes** to the payload. 
- This analysis of whether the positive SEO impact of making content server-rendered is worth the performance cost should consider the reality of that performance cost, and whether it will actually measurably impact Lighthouse scores, Core Web Vitals, or perceived load times.
- The JSON-LD provides a partial safety net for FAQs, but it relies on a bet that LLMs parse the < script > tags, and the search engine ranking signal from the answer text may still be weaker than if the content were in the visible DOM. If performance impact is minimal-to-none in reality, then **a more robust approach would be to combine both**: JSON-LD for FAQs + ensuring the FAQ answer text is present in the rendered DOM. 

---

## FAQ Usage (72 instances)

These are cards explicitly used as FAQ items — their titles are questions, they live in explicitly labeled FAQ sections, or their i18n keys contain "faq".

---

## Non-FAQ Usage (25 instances)

### 1. Ethereum Forks — EIP Reference Lists + Intro Explainers (18 cards)

**File:** `public/content/ethereum-forks/index.md`

Each card is a collapsible container for dense technical reference data (not Q&A).

| Card Title | Content |
|------------|---------|
| "What are forks?" | Explainer on what blockchain forks are and how they work |
| "Why do some upgrades have multiple names?" | Naming convention tables for execution/consensus upgrades |
| "Pectra EIPs" | List of EIPs in the Pectra upgrade |
| "Cancun EIPs" | List of EIPs in the Cancun upgrade |
| "Deneb EIPs" | List of EIPs in the Deneb upgrade |
| "Shanghai EIPs" | List of EIPs in the Shanghai upgrade |
| "Paris EIPs" | List of EIPs in the Paris upgrade |
| "Gray Glacier EIPs" | List of EIPs in the Gray Glacier upgrade |
| "Arrow Glacier EIPs" | List of EIPs in the Arrow Glacier upgrade |
| "London EIPs" | List of EIPs in the London upgrade |
| "Berlin EIPs" | List of EIPs in the Berlin upgrade |
| "Muir Glacier EIPs" | List of EIPs in the Muir Glacier upgrade |
| "Istanbul EIPs" | List of EIPs in the Istanbul upgrade |
| "Constantinople EIPs" | List of EIPs in the Constantinople upgrade |
| "Byzantium EIPs" | List of EIPs in the Byzantium upgrade |
| "Spurious Dragon EIPs" | List of EIPs in the Spurious Dragon upgrade |
| "Tangerine Whistle EIPs" | List of EIPs in the Tangerine Whistle upgrade |
| "Homestead EIPs" | List of EIPs in the Homestead upgrade |

> 16 of the 18 cards are EIP reference lists. 2 are introductory explainers.

### 2. The Merge — Stakeholder Guidance + Misconceptions (8 cards)

**File:** `public/content/roadmap/merge/index.md`

| Card Title | Content |
|------------|---------|
| "Staking node operators and providers" | Guidance for staking operators on what The Merge meant for them |
| "Non-validating node operators and infrastructure providers" | Guidance for non-validating node operators |
| "Dapp and smart contract developers" | Guidance for dapp developers |
| Misconception: "Running a node requires staking 32 ETH." | Debunking a common misconception |
| Misconception: "The Merge failed to reduced gas fees." | Debunking a common misconception |
| Misconception: "Transactions were accelerated substantially by The Merge." | Debunking a common misconception |
| Misconception: "The Merge enabled staking withdrawals." | Debunking a common misconception |
| Misconception: "Now that The Merge is complete..." | Debunking a common misconception |

> The first 3 cards are **audience-segmented guidance**. The last 5 are **misconception debunkers** (FAQ-adjacent, but titled as statements/myths rather than questions).

### 3. Run a Node — "Why Run a Node" Benefits (6 cards, rendered dynamically)

**File:** `app/[locale]/run-a-node/_components/run-a-node.tsx`

| Card Title | Content |
|------------|---------|
| Privacy | Benefits of running a node for privacy |
| Censorship resistance | Benefits for censorship resistance |
| Participate | Benefits for network participation |
| Decentralization | Benefits for decentralization |
| Voice your choice | Benefits for governance influence |
| Sovereignty | Benefits for self-sovereignty |

> **Benefit/value proposition cards** with SVG icons. Non-FAQ.

### 4. Solo Staking — Prerequisites Checklist (6 cards)

**File:** `public/content/staking/solo/index.md`

| Card Title | Content |
|------------|---------|
| "Required reading" | Prerequisite knowledge before solo staking |
| "Comfortable with computers" | Tech comfort level needed |
| "Secure key management" | Key management requirements |
| "Maintenance" | Ongoing maintenance expectations |
| "Reliable uptime" | Uptime requirements |
| "Slashing risk" | Risk awareness for slashing penalties |

> A **checklist/prerequisites** section, not FAQ. Describes what you need to know *before* staking.

### 5. Scam Awareness — Scam Type Descriptions (4 cards)

**File:** `public/content/community/support/scams/index.md`

| Card Title | Content |
|------------|---------|
| "Giveaway and airdrop scams" | How giveaway/airdrop scams work and how to identify them |
| "Impersonation and fake support" | How impersonation and fake support scams operate |
| "Recovery scams" | How recovery scams target victims of previous scams |
| "Phishing websites and fake apps" | How phishing sites and counterfeit apps deceive users |

> These cards describe **scam categories** with educational content about how each scam type works. They are structured as collapsible informational sections: titles are noun phrases (not questions), and the content is descriptive rather than answer-oriented.

### 6. Style Guide — Audience Personas (3 cards)

**File:** `public/content/contributing/style-guide/index.md`

| Card Title | Content |
|------------|---------|
| "Individuals" | Target audience persona with example user journeys |
| "Developers" | Target audience persona with example user journeys |
| "Enterprises" | Target audience persona with example user journeys |

### 7. Scam Token Guide — Contextual Inline Explainers (3 cards)

**File:** `public/content/guides/how-to-id-scam-tokens/index.md`

| Card Title | Content |
|------------|---------|
| "What is ARB?" | Brief background on the Arbitrum governance token |
| "Why is the scam token called wARB?" | Explains the "wrapped" naming convention scammers exploit |
| "What are smart contracts?" | Brief explainer providing context for how scam tokens are deployed |

### 8. Network Maturity — Explainer (1 card)

**File:** `src/components/NetworkMaturity.tsx`

| Card Title | Content |
|------------|---------|
| "Network maturity explained" | Explanation of the network maturity framework used for L2 assessments |

### 9. Listing Methodology — Details (1 card)

**File:** `src/components/ListingMethodology/index.tsx`

| Card Title | Content |
|------------|---------|
| (Dynamic title via i18n) | Expandable details about how listings (wallets, exchanges, etc.) are evaluated — criteria and methodology |

---

## SEO/LLMO Impact Evaluation: Non-FAQ Crawlability

### Context

- **Google** renders pages with a headless Chrome instance. In the current mobile-first indexing era, Google gives full ranking weight to content hidden in accordions/tabs for UX purposes, provided it is present in the HTML DOM. The primary SEO risk is not reduced weighting, but **total invisibility**. Next.js and Radix UI (which power the `ExpandableCard`) typically unmount closed accordion content from the server-rendered HTML. If the content isn't in the raw HTML payload, Googlebot has to rely on its JavaScript rendering engine to find it. Because the content requires a click event to mount, Googlebot will almost certainly miss it entirely.
- **LLM crawlers** (GPTBot, ClaudeBot, etc.) generally perform simple HTTP requests and **do not execute JavaScript** or interact with page elements. Content behind a click interaction is effectively invisible to them.
- **FAQ cards** will receive `FAQPage` JSON-LD schema, making their content available to Google rich results regardless of accordion state; LLM crawlers *can* read JSON-LD from static HTML (though there is some debate; reliably extracting Q&A pairs from it is considered 'unconfirmed'). **Minimal performance tradeoff needed for FAQ cards.**
- For **non-FAQ cards**, the tradeoff is: take a page performance hit to make content server-rendered/visible in initial HTML, or accept that this content remains invisible to LLM crawlers and potentially down-weighted by Google.

### Rating Scale

| Rating | Meaning |
|--------|---------|
| 🔴 **HIGH** | Strong positive impact from crawlability. Content targets high-value queries, is unique/authoritative, or falls under YMYL. Recommend making crawlable. |
| 🟡 **MEDIUM** | Moderate benefit. Content adds topical depth or trust signals but is not primary ranking content. Consider selectively. |
| 🟢 **LOW** | Minimal impact. Content is internal/niche, has low search demand, or card titles already convey sufficient signal. Keep as-is. |

---

### 1. Ethereum Forks — EIP Reference Lists (18 cards) 🔴 HIGH

**Crawlability impact: HIGH**

- **Query match:** "What EIPs are in Pectra/Dencun/Shapella?" and "Ethereum [upgrade name] changes" are active, high-intent informational queries. These are exactly the queries LLMs answer when users ask about Ethereum upgrades.
- **Unique authoritative content:** ethereum.org is the canonical source for this data. No other site has more authority to answer these questions.
- **LLM citation potential:** Very high. When an LLM is asked "What changed in the Pectra upgrade?", it needs to read the EIP list. If hidden, the LLM cannot cite this page.
- **Content density:** Each card contains structured lists of EIPs with links — high-value structured data that LLMs and Google both parse well.
- **The 2 intro explainers** ("What are forks?" and "Why do some upgrades have multiple names?") are also high-value — they define core Ethereum terminology and contain reference tables.

> **Recommendation:** Make crawlable. This is the single highest-impact non-FAQ section. The EIP lists are dense but highly structured, and represent ethereum.org's core authority advantage.

### 2. The Merge — Stakeholder Guidance + Misconceptions (8 cards) 🟢 LOW

**Crawlability impact: LOW**

- **Declining search interest:** The Merge occurred in September 2022. Search volume for Merge-specific queries has dropped sharply and continues to decline.
- **Historical content:** The stakeholder guidance (3 cards) is no longer actionable — it advised operators on how to prepare for an event that already happened.
- **Misconceptions are partially stale:** Some misconceptions (e.g., "The Merge enabled staking withdrawals") were clarified by subsequent upgrades (Shapella). They are historically interesting but not actively sought.
- **Existing page signals:** The Merge page already ranks well for its target queries based on visible content; the hidden accordion content adds marginal incremental value.

> **Recommendation:** Keep as-is. The performance cost is not justified by the diminishing search relevance. If the page is ever refreshed, consider inlining the misconceptions as visible content rather than using accordions.

### 3. Run a Node — "Why Run a Node" Benefits (6 cards) 🟡 MEDIUM

**Crawlability impact: MEDIUM**

- **Card titles are already visible:** "Privacy", "Censorship resistance", "Decentralization", etc. are already in the crawlable DOM. The hidden content provides deeper explanation but the topical signal is present.
- **Moderate query match:** "Why run an Ethereum node" and "benefits of running a node" are active queries, but the visible page content already covers the topic well.
- **LLM enrichment:** An LLM answering "why should I run an Ethereum node?" would benefit from the expanded body text, but can construct a reasonable answer from the visible titles and surrounding content.
- **Topical depth vs. breadth:** The expanded content adds depth to each benefit, which improves content quality signals, but this is a secondary ranking factor.

> **Recommendation:** Low-priority improvement. If making specific sections crawlable is cheap (e.g., `forceMount` on just this section), it is worth doing. Otherwise, the visible titles carry most of the SEO signal.

### 4. Solo Staking — Prerequisites Checklist (6 cards) 🟡 MEDIUM

**Crawlability impact: MEDIUM**

- **Active search queries:** "How to solo stake Ethereum", "solo staking requirements", and "Ethereum staking hardware requirements" are active, high-intent queries.
- **Actionable decision-driving content:** This is exactly the content someone needs before they commit to staking. LLMs asked "what do I need to solo stake?" need to see this checklist.
- **YMYL-adjacent:** Staking involves financial commitment (32 ETH minimum). Google applies elevated quality standards to this content.
- **However:** The card titles ("Required reading", "Secure key management", etc.) are already visible and carry strong semantic signal. The expanded body text adds detail but the core checklist is already crawlable.

> **Recommendation:** Consider making crawlable if there are few performance concerns on this page. The expanded content strengthens the page for staking preparation queries, which remain high-volume and high-intent.

### 5. Scam Awareness — Scam Type Descriptions (4 cards) 🔴 HIGH

**Crawlability impact: HIGH**

- **YMYL content:** This is textbook "Your Money or Your Life" content. Google holds this to the highest EEAT standards and rewards comprehensive, trustworthy coverage.
- **High search demand:** "Ethereum scams", "crypto scam types", "how to avoid crypto scams" are high-volume queries with strong user-protection intent.
- **LLM safety citations:** LLMs are increasingly asked about scam identification. A user asking "what are common Ethereum scams?" needs the detailed descriptions hidden in these cards. Without crawlability, ethereum.org (the most authoritative source) gets bypassed.
- **Trust signal multiplier:** For a YMYL page, having comprehensive, clearly structured safety content visible to crawlers directly improves the page's EEAT score. Hiding it behind an accordion undermines the trust signal.
- **Unique content:** The detailed descriptions of how each scam type operates (giveaway/airdrop, impersonation, recovery, phishing) are unique educational content from the most authoritative source in the Ethereum ecosystem.

> **Recommendation:** Make crawlable. This is the second-highest priority after the EIP lists. Scam awareness content should be fully visible to search engines and LLMs to maximize ethereum.org's protective reach.

### 6. Style Guide — Audience Personas (3 cards) 🟢 LOW

**Crawlability impact: LOW**

- **Internal contributor documentation:** This page targets contributors, not end users or general searchers.
- **Near-zero external search demand:** Nobody is searching for "ethereum.org audience personas" or "ethereum.org style guide contributors."
- **No YMYL or EEAT impact:** This content does not affect trust, authority, or user safety signals.

> **Recommendation:** Keep as-is. No SEO/LLMO benefit.

### 7. Scam Token Guide — Contextual Inline Explainers (3 cards) 🟡 MEDIUM

**Crawlability impact: MEDIUM**

- **Mixed query value:** "What is ARB?" and "What are smart contracts?" are very high-volume queries, but these cards are brief asides on a page about scam identification — not the primary answer target for those queries. Other pages on the site answer those queries directly.
- **Contextual enrichment:** The cards help the scam token guide page rank for long-tail queries like "is wARB a scam token" by providing supporting context. This enriches the page's topical coverage.
- **YMYL relevance:** As a scam identification guide, having "What are smart contracts?" visible reinforces the educational depth for EEAT evaluation.

> **Recommendation:** Moderate priority. Making these visible adds topical depth to a YMYL page but is not as impactful as the scams page itself or the EIP lists.

### 8. Network Maturity — Explainer (1 card) 🟡 MEDIUM

**Crawlability impact: MEDIUM**

- **Unique proprietary methodology:** Ethereum.org's network maturity framework is unique content that no other site has. This is a niche but growing area of interest (L2 evaluation).
- **Trust/transparency signal:** Having the methodology visible improves transparency and EEAT, particularly for the L2 networks page which is a decision-driving page.
- **Small content footprint:** Only 1 card, so the performance cost is minimal.

> **Recommendation:** Worth making crawlable given the minimal performance cost and the unique authority signal it provides for L2 evaluation queries.

### 9. Listing Methodology — Details (1 card) 🟢 LOW

**Crawlability impact: LOW**

- **Transparency content:** This explains how wallet/exchange listings are evaluated. Important for trust but very low direct search demand.
- **Limited query match:** Users do not search for "how does ethereum.org evaluate wallets" — they search for "best Ethereum wallet." The methodology card supports EEAT but does not drive organic traffic.
- **Already has `forceMount`:** This component uses the `forceMount` prop, which means it may already be rendering content in the DOM regardless of open/closed state.

> **Recommendation:** Keep as-is. Already potentially crawlable via `forceMount`. Minimal incremental value from additional optimization.

---

## Priority Summary

| Priority | Section | Cards | Rationale |
|----------|---------|-------|-----------|
| 🔴 **P0** | Ethereum Forks — EIP lists | 18 | Canonical reference data, high query volume, strong LLM citation potential |
| 🔴 **P0** | Scam Awareness — Scam types | 4 | YMYL content, high search demand, critical trust/safety signal |
| 🟡 **P1** | Solo Staking — Prerequisites | 6 | Active staking queries, actionable content, YMYL-adjacent |
| 🟡 **P1** | Scam Token Guide — Explainers | 3 | YMYL page enrichment, contextual depth |
| 🟡 **P1** | Network Maturity — Explainer | 1 | Unique methodology, minimal perf cost, transparency signal |
| 🟡 **P2** | Run a Node — Benefits | 6 | Titles already visible, expanded text adds marginal value |
| 🟢 **Skip** | The Merge — Misconceptions | 8 | Historical content, declining search relevance |
| 🟢 **Skip** | Style Guide — Personas | 3 | Internal docs, zero external search demand |
| 🟢 **Skip** | Listing Methodology | 1 | Already uses `forceMount`, low search demand |

> **Total recommended for crawlability improvement:** 22 of 25 non-FAQ cards (P0) immediately justify the performance tradeoff. An additional 10 cards at P1 are worth considering if the implementation approach allows selective opt-in per section.

> **The Details:** The only time rendering hidden content in the initial DOM causes a performance hit is if the cards contain massive, unoptimized images, complex interactive widgets that require heavy JS hydration, or thousands of DOM nodes. For standard markdown text and lists, forcing the content into the initial server-rendered HTML (e.g., using Radix UI's forceMount prop) adds mere kilobytes to the payload. It will not impact Lighthouse scores, Core Web Vitals, or perceived load times.
