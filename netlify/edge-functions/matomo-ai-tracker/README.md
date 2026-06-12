# Matomo AI Tracker (Netlify Edge Function)

Netlify Edge Function port of the upstream Cloudflare Worker from:

https://github.com/matomo-org/tracker-cloudflare

Original project license: BSD-3-Clause.

## Purpose

Tracks user-driven AI chatbot traffic (ChatGPT-User, Claude-User, Gemini-Deep-Research, Perplexity-User, Google-NotebookLM, etc.) through the Matomo Measurement Protocol so requests from AI assistants can appear in Matomo AI Chatbots reports.

This implementation is intentionally dormant and is not yet wired into `netlify.toml`.

## Local development

Run locally with:

```bash
netlify dev
```

Example request:

```bash
curl -H "User-Agent: ChatGPT-User" http://localhost:8888/en/learn/
```