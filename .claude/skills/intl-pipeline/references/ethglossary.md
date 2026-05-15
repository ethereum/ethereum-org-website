# ETHGlossary Integration

The intl-pipeline consumes ETHGlossary at https://ethglossary.visual-20-hoists.workers.dev as the canonical source for term translations. The pipeline does not author terminology policy — it queries.

## Configuration

- **Default base URL**: defined in `src/scripts/intl-pipeline/config.ts` under `GLOSSARY_API_URL`
- **Override**: `GLOSSARY_API_URL` env var
- **Repo**: https://github.com/wackerow/ethglossary (MPL-2.0)

## Endpoints the pipeline uses

| Endpoint | Use case |
|---|---|
| `GET /api/v1/llms.txt` | API contract reference. Fetch first if usage patterns are unclear. |
| `POST /api/v1/filter` | **Preferred per-file lookup.** Submit English source text + target language; returns only the glossary terms that appear in the source, with translations and metadata. Avoids pulling hundreds of irrelevant terms into prompt context. |
| `GET /api/v1/translations/{lang}` | Full glossary for a language. Fallback when filter is impractical or when you need all terms (e.g., review scoring). |
| `GET /api/v1/translations/{lang}/{termId}` | Single-term lookup. Intelligent term matching (aliases, avoid forms, variants resolve to canonical entries). |
| `GET /api/v1/style-guide` | English style guide entries — useful when validating English-side conventions. |
| `GET /api/v1/schema` | Glossary JSON schema. Reference when generating/parsing entries. |

## Term entry shape (what the pipeline cares about)

```
{
  "english": { "id": "ethereum", "term": "Ethereum", "definition": "..." },
  "translation": {
    "term": "イーサリアム",
    "contexts": { "prose": "...", "heading": "...", "tag": "...", "ui": "...", "code": "ethereum" },
    "grammar": { "gender": null, "partOfSpeech": "proper_noun", "formality": "neutral" },
    "confidence": "high",
    "notes": null
  }
}
```

Plus on the master entry: `category`, `term_role` (added in v0.2.0+), `script_rule`, `casing`, `aliases`, `notes`.

## `script_rule` → pipeline behavior

| `script_rule` | What the pipeline does |
|---|---|
| `translate` | Use the LLM to render the term semantically in target-language prose. Most concept terms. |
| `calque` | Use the LLM with explicit instruction to translate by meaning, not phonetics. CJK semantic group (zh, zh-tw). |
| `transliterate` | The translation entry's `term` field IS the canonical native-script form. Pipeline injects it into prompts as the authoritative rendering. |
| `keep_latin` | Pipeline preserves the English form in non-Latin target languages. Most dev tools by default. |
| `always_latin` | Stricter than `keep_latin` — translating breaks code or specification. Pipeline never modifies. Solidity, ETH, ERC-20, file extensions. |
| `transliterate_with_translation` | Latin form plus native-script gloss (e.g., "MetaMask 钱包"). |

If a term's `script_rule` is `transliterate` and the LLM produces a different form, the sanitizer auto-corrects to the canonical glossary form. This is the deterministic backbone that makes the pipeline reproducible.

## `term_role` taxonomy

| Role | Default `script_rule` | Examples |
|---|---|---|
| `concept` | `translate` | validator, gas, mainnet, smart contract |
| `brand-or-project` | `transliterate` (per group rules); `keep_latin` for dev tools | MetaMask, Aave, OpenSea, Uniswap |
| `person-name` | `transliterate` | Vitalik Buterin, Wei Dai, Gavin Wood |
| `programming-language` | `always_latin` | Python, JavaScript, Solidity, Vyper |
| `os-platform` | `always_latin` | Linux, macOS, iOS, Windows |
| `cryptographic-primitive` | `always_latin` | Keccak256, secp256k1, BLS |
| `network-name` | `transliterate` | Sepolia, Holesky |
| `file-extension` | `always_latin` | `.sol`, `.json`, `.vy` |
| `cli-command` | `always_latin` | `npm install`, `git clone` |
| `ticker-or-standard` | `always_latin` | ETH, ERC-20, EIP-1559 |
| `identifier` | `always_latin` | URLs, code identifiers, addresses |

The `term_role` is metadata — the actual policy is the per-term `script_rule`. Defaults exist for new entries; specific entries may override.

## When a term is missing from ETHGlossary

If a glossary lookup returns 404 for a term that should be there, the pipeline falls back to LLM-only translation (no glossary hint in the prompt). This is the safe default but means consistency is lower for missing terms.

**Fix:** add the term upstream:

1. Confirm the term is genuinely missing (`GET /api/v1/translations/{lang}/{termId}` returns 404, and `/filter` doesn't surface it on a source file that mentions it)
2. Open a PR against `wackerow/ethglossary`:
   - Add an entry to `src/data/glossary-terms-enhanced.json` `confirmed_terms[]` with `id`, `term`, `category`, `term_role`, `script_rule`, `casing`
   - Add per-language entries to `src/data/translations/glossary-{lang}.json` for each non-Latin script language where a native form exists
3. After merge, the next pipeline run picks it up (no cache invalidation needed — fresh API call per run)

For brand-name terms whose per-language forms are uncertain, the pattern is: classify in ETHGlossary first (`promote_to_master: false` for unknowns), then add per-language forms incrementally as native-speaker review confirms them.

## Cache behavior

The pipeline does not persist a glossary cache. Each pipeline run fetches fresh. Within a single run, the Gemini adapter may cache `/filter` results per file but does not persist across runs.

For local testing without network: there's no offline mode currently. If `GLOSSARY_API_URL` is unreachable, the pipeline logs a warning and falls back to LLM-only translation for the affected calls.

## Network and auth

The API is currently unauthenticated read-only. Workflow runs don't need a secret to query ETHGlossary. Write operations (adding terms, updating entries) happen via PR to the GitHub repo, not via the API.

## Common mistakes

- **Querying `/translations/{lang}` and pulling all 500+ terms into the prompt** — bloats context. Use `/filter` per file.
- **Hard-coding a term's translation locally** — defeats the purpose. If you need a term ETHGlossary doesn't have, add it there.
- **Assuming the API URL is stable** — it's hosted on Cloudflare Workers; check `config.ts` if the default URL has moved.
- **Ignoring `confidence: low` entries** — the API returns them anyway; for review-time decisions, low-confidence terms should be flagged for native-speaker review, not blindly trusted.

## See also

- `intl-review/references/ethglossary-usage.md` for the review-side perspective (how reviewers check glossary compliance, what counts as a critical deviation)
- ETHGlossary `docs/translation-policy.md` for the policy that informs `script_rule` decisions
