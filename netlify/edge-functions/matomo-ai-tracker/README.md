# Matomo AI Tracker (Netlify Edge Function)

Netlify Edge Function port of the upstream Cloudflare Worker from:

https://github.com/matomo-org/tracker-cloudflare

Original project license: BSD-3-Clause.

## Purpose

Tracks user-driven AI chatbot traffic (ChatGPT-User, Claude-User, Gemini-Deep-Research, Perplexity-User, Google-NotebookLM, etc.) through the Matomo Measurement Protocol so requests from AI assistants can appear in Matomo AI Chatbots reports.

This implementation is intentionally dormant and is not yet wired into `netlify.toml`.

## Environment

The edge function reads server-side environment variables via `Netlify.env`:

- `MATOMO_URL` - Matomo base URL, with or without `/matomo.php`
- `MATOMO_SITE_ID` - numeric Matomo site ID
- `MATOMO_TIMEOUT_MS` - optional request timeout in milliseconds, defaults to `5000`
- `LOG_LEVEL` - optional `silent`, `error`, `warn`, `info`, or `debug`
- `HTTP_METHOD_ALLOWLIST` - optional comma-separated methods, defaults to `GET`
- `USER_AGENT_ALLOWLIST_REGEX` - optional bot user-agent allowlist override
- `URL_EXCLUDE_REGEX` - optional static asset exclusion override
- `DOCUMENT_REGEX` - optional download/document URL detection override

These are intentionally separate from the existing public `NEXT_PUBLIC_MATOMO_*`
browser analytics variables.

## Local development

Because this function is dormant, local requests will only route through it if
you temporarily add an edge function declaration. Do not commit this wiring until
the staged rollout is ready.

Temporary local-only `netlify.toml` snippet:

```toml
[[edge_functions]]
  function = "matomo-ai-tracker"
  path = "/*"
```

Then run locally with the required env vars:

```bash
MATOMO_URL="https://example.matomo.cloud" MATOMO_SITE_ID="1" netlify dev
```

Example request:

```bash
curl -H "User-Agent: ChatGPT-User" http://localhost:8888/en/learn/
```

The Matomo Measurement Protocol payload sets `source` to `Netlify` for this
port.
