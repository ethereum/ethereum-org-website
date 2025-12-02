# Content style checklist

This checklist is a quick companion to the ethereum.org style guide.  
Use it before opening a pull request that adds or edits content.

For detailed guidance, refer to the public style guide pages on ethereum.org.

## 1. Audience and tone

- [ ] The primary goal of the text is **to educate and inform**, not to promote products or services.
- [ ] The level of detail matches the target audience (beginner, intermediate, advanced).
- [ ] Explanations are **clear, concrete, and free of unnecessary jargon**.
- [ ] We avoid sensational language, hype, and marketing-style claims.

## 2. Neutrality and safety

- [ ] We do **not** give personalized financial, legal, or tax advice.
- [ ] We avoid promises of profit, guaranteed returns, or “get rich” language.
- [ ] Risks and limitations are mentioned where relevant (e.g. smart contract risk, key management).
- [ ] We avoid endorsing specific tokens, projects, or services as “the best” or “the only” solution.

## 3. Accuracy and references

- [ ] Definitions are technically accurate and consistent with existing ethereum.org pages.
- [ ] We link to relevant canonical resources when available (e.g. official specs, EIPs, or docs).
- [ ] External links use **https** where possible.
- [ ] We avoid linking to content that looks like spam, scams, or low-quality promotional material.

## 4. Structure and readability

- [ ] The page starts with a short, helpful introduction that explains **who** the page is for and **what** it covers.
- [ ] Headings follow a logical hierarchy (`#`, `##`, `###`) and describe the section clearly.
- [ ] Paragraphs are short and focused on a single idea.
- [ ] Lists are used where they make the content easier to scan.
- [ ] Code examples, if present, are minimal, focused, and properly formatted.

## 5. Language and terminology

- [ ] We use consistent terminology across the page (e.g. “smart contracts”, “validators”, “wallets”).
- [ ] We avoid slang or region-specific idioms that might confuse international readers.
- [ ] We avoid gendered language and write inclusively.
- [ ] We use “Ethereum” (capital E) and “ether (ETH)” correctly.

## 6. Links inside ethereum.org

- [ ] Internal links point to the **current** canonical paths on ethereum.org.
- [ ] When a topic is already covered on another ethereum.org page, we link to it instead of duplicating large sections of content.
- [ ] Anchor links (`#section-name`) are tested to ensure they work.

## 7. Formatting in Markdown

- [ ] Headings are written using `#` syntax, not HTML tags.
- [ ] Code is wrapped in backticks (inline) or fenced code blocks (triple backticks).
- [ ] Tables, if used, are readable and render correctly in preview.
- [ ] No stray HTML tags or unclosed Markdown formatting remain in the file.

## 8. Localization awareness

- [ ] The content does not assume a specific country, jurisdiction, or currency unless clearly stated.
- [ ] Date and time references are either avoided or expressed clearly (e.g. “March 2025” instead of “this spring”).
- [ ] We avoid cultural references that may not make sense to a global audience.

## 9. File and directory placement

Before creating a new content page:

- [ ] The file is placed in the appropriate directory under `public/content/` (for site content) or `docs/` (for internal documentation).
- [ ] The folder and file names are descriptive and use kebab-case (e.g. `wallet-security-basics/index.md`).
- [ ] If you are adding a new page to the site, you have checked `docs/best-practices.md` for any extra requirements.

## 10. Final review before opening a PR

- [ ] The text has been proofread for spelling and grammar.
- [ ] The GitHub preview looks as expected.
- [ ] The PR description clearly states **what** was changed and **why**.
- [ ] The PR links to any related issue, if one exists (e.g. `Fixes #1234`).

If you are unsure about any of the points above, feel free to mention it in your pull request.  
Maintainers and other contributors can help you refine the content so that it fits well within ethereum.org.
