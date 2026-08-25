# Matomo AI Tracker (Netlify Edge Function)

Netlify Edge Function port of the upstream Cloudflare Worker from:

https://github.com/matomo-org/tracker-cloudflare

Original project license: BSD-3-Clause.

## Purpose

Tracks user-driven AI chatbot traffic (ChatGPT-User, Claude-User, Gemini-Deep-Research, Perplexity-User, Google-NotebookLM, etc.) through the Matomo Measurement Protocol so requests from AI assistants can appear in Matomo AI Chatbots reports.

The function is declared in `netlify.toml` for all page routes (`/*` with asset routes excluded to save edge invocations — pages are the only thing worth tracking) and gated per deploy context by the `MATOMO_AI_TRACKER_ENABLED` env var, which is the rollout mechanism. It fails open: platform-level errors and origin failures bypass to origin (`onError: "bypass"`, declared inline in `index.ts` — netlify.toml has no `on_error` key), config errors pass the request through untracked, and tracking runs after the response via `context.waitUntil()`.

Framework middleware runs before this function, so URLs arrive post-rewrite; tracked URLs are normalized back to their public form (default-locale `/en` prefix stripped, A/B `ab-code` variant routes mapped to the tested path). `llms.txt` fetches are deliberately tracked as plain pageviews — Matomo's bot telemetry drops download-flagged hits from the AI Chatbots report, so `txt` is removed from both default regexes; `robots.txt` is excluded.

## Environment

The edge function reads server-side environment variables via `Netlify.env`:

- `MATOMO_AI_TRACKER_ENABLED` - kill switch; tracking only runs when set to exactly `true`. Rollout: `true` on non-production contexts first (deploy previews report to the non-production Matomo site via the scoped `NEXT_PUBLIC_MATOMO_SITE_ID`), production flipped to `true` after verification. Flipping it is an env change plus a redeploy (no code change); instant rollback to a flag-off deploy also disables it immediately.
- `MATOMO_URL` - optional override for the Matomo base URL, with or without `/matomo.php`; defaults to `NEXT_PUBLIC_MATOMO_URL`
- `MATOMO_SITE_ID` - optional override for the numeric Matomo site ID; defaults to `NEXT_PUBLIC_MATOMO_SITE_ID`
- `MATOMO_TIMEOUT_MS` - optional request timeout in milliseconds, defaults to `5000`
- `LOG_LEVEL` - optional `silent`, `error`, `warn`, `info`, or `debug`
- `HTTP_METHOD_ALLOWLIST` - optional comma-separated methods, defaults to `GET`
- `USER_AGENT_ALLOWLIST_REGEX` - optional bot user-agent allowlist override
- `URL_EXCLUDE_REGEX` - optional static asset exclusion override
- `DOCUMENT_REGEX` - optional download/document URL detection override

## Local development

Run locally with the required env vars:

```bash
MATOMO_AI_TRACKER_ENABLED="true" MATOMO_URL="https://example.matomo.cloud" MATOMO_SITE_ID="1" netlify dev
```

Example request:

```bash
curl -H "User-Agent: ChatGPT-User" http://localhost:8888/en/learn/
```

The Matomo Measurement Protocol payload sets `source` to `Netlify` for this
port.

## Testing

Unit tests ported from the upstream suite live in `tests/unit/matomo-ai-tracker/` and run with the repo's Playwright unit project:

```bash
pnpm test:unit
```

Type checking uses the scoped `netlify/edge-functions/tsconfig.json` (Deno-style `.ts`-extension imports), run as part of `pnpm type-check`.
