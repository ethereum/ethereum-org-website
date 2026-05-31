# ETHGlossary Integration

The intl-pipeline consumes ETHGlossary at https://ethglossary.visual-20-hoists.workers.dev as the canonical source for term translations. The pipeline does not author terminology policy — it queries.

## Start with llms.txt

ETHGlossary publishes a canonical agent reference at the **domain root** `${GLOSSARY_HOST}/llms.txt` (not under `/api/v1/`). Fetch this first when you need API details — it's authoritative, structured for LLMs, and stays in sync with the live API:

```bash
GLOSSARY_HOST="${GLOSSARY_API_URL%/api/*}"
curl -sf "$GLOSSARY_HOST/llms.txt"
```

This doc summarizes integration patterns for pipeline contributors; **endpoint shapes, parameters, and response schemas come from llms.txt** (which won't go stale as the API evolves). Treat sections below as orientation, not contract.

## Configuration

- **Default base URL**: defined in `src/scripts/intl-pipeline/config.ts` under `GLOSSARY_API_URL`
- **Override**: `GLOSSARY_API_URL` env var
- **Repo**: https://github.com/wackerow/ethglossary (MPL-2.0)
- **Live API**: https://ethglossary.visual-20-hoists.workers.dev
- **Agent reference**: `${GLOSSARY_HOST}/llms.txt`

## Endpoints the pipeline uses

Orientation — see llms.txt for the up-to-date contract.

| Endpoint | Use case |
|---|---|
| `GET ${GLOSSARY_HOST}/llms.txt` | Canonical API contract reference for agents. Fetch first. |
| `POST /api/v1/filter` | **Preferred per-file lookup.** Submit English source text + target language; returns only the glossary terms that appear in the source. Avoids pulling hundreds of irrelevant terms into prompt context. |
| `GET /api/v1/translations/{lang}` | Full glossary for a language. Fallback when filter is impractical. |
| `GET /api/v1/translations/{lang}/{termId}` | Single-term lookup. Intelligent term matching (aliases, avoid forms, variants resolve to canonical entries). |
| `GET /api/v1/style-guide` | English style guide entries. Useful when validating English-side conventions. |

## `script_rule` → pipeline behavior

Pipeline-specific mapping — these are how this consumer interprets glossary fields:

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

The `term_role` is metadata — actual policy is the per-term `script_rule`. Defaults exist for new entries; specific entries may override.

## When a term is missing from ETHGlossary

If a glossary lookup returns 404 for a term that should be there, the pipeline falls back to LLM-only translation (no glossary hint in the prompt). Safe default but lower consistency for unknown terms.

**Don't author terminology locally.** Flag the gap in the review report so a maintainer can address it upstream. Optionally note it in `.claude/translation-review/per-language/{lang}.md` for the next review of that language. Cross-repo coordination (filing an issue or PR against `wackerow/ethglossary`) is a separate maintainer task, not part of pipeline or review work.

## Cache behavior

The pipeline does not persist a glossary cache. Each pipeline run fetches fresh. Within a single run, the Gemini adapter may cache `/filter` results per file but does not persist across runs.

For local testing without network: there's no offline mode currently. If `GLOSSARY_API_URL` is unreachable, the pipeline logs a warning and falls back to LLM-only translation for the affected calls.

## Common mistakes

- **Querying `/translations/{lang}` and pulling all 500+ terms into the prompt** — bloats context. Use `/filter` per file.
- **Hard-coding a term's translation locally** — defeats the purpose. If you need a term ETHGlossary doesn't have, flag it; don't add a local override.
- **Reading endpoint shapes from this doc instead of llms.txt** — this doc is orientation. Live API specifics belong in llms.txt where they stay in sync.
- **Assuming the API URL is stable** — it's hosted on Cloudflare Workers; check `config.ts` if the default URL has moved.
- **Ignoring `confidence: low` entries** — the API returns them anyway; for review-time decisions, low-confidence terms should be flagged for native-speaker review, not blindly trusted.

## See also

- `intl-review/references/ethglossary-usage.md` for the review-side perspective (how reviewers check glossary compliance, what counts as a critical deviation)
- ETHGlossary `docs/translation-policy.md` for the policy that informs `script_rule` decisions
- `${GLOSSARY_HOST}/llms.txt` for the canonical API contract
