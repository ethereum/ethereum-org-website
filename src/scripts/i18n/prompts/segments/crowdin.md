# CROWDIN-SPECIFIC RULES

These rules apply only when translating through Crowdin's AI pre-translation system.

---

## JSON Escaping (Critical for JSON Files)

When translating JSON files, ALL double quotes (`"`) inside string values MUST be escaped as `\"` to maintain valid JSON.

Similarly:
- Escape backslashes (`\`) as `\\`
- Escape newlines as `\n`
- Escape tabs as `\t`

The output MUST be parseable JSON—invalid JSON will break the build.

### Example
- Source: `"Learn about "Ethereum""`
- Correct: `"[translated text] \"Ethereum\""`
- Wrong: `"[translated text] "Ethereum""`

This rule also applies to any links contained within JSON string values used in React/MDX pages.

---

## Translation Memory

### External Translation Memory (TM)
Use exact matches from TM if context fits.

### Termbase Resources
If translation memory/termbase resources are available to Crowdin AI, they should be applied to maintain consistency.

---

## Flagging for Review

### Ambiguous Strings
If a string is ambiguous and unsafe to translate confidently, produce a literal translation or leave it for review (do not guess).

### Consistency Conflicts
When consistency conflicts arise (e.g., competing heading variants), prefer the most widely used term in the target language or the termbase entry if available.

### Missing Context
Choose neutral wording when context is unclear; retain English term where ambiguity could mislead.
