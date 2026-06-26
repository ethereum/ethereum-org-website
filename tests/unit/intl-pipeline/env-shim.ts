/**
 * Side-effect module: provide harmless placeholder tokens BEFORE any
 * intl-pipeline module is imported.
 *
 * config.ts validates GITHUB_API_TOKEN at import time and throws if absent, so
 * any test that transitively imports it (e.g. via gemini.ts -> workflows/utils
 * -> config) would crash on load even though it never makes a network call.
 * Import this module FIRST in such specs. Real env values are left untouched.
 */
if (!process.env.GITHUB_API_TOKEN) {
  process.env.GITHUB_API_TOKEN = "test-placeholder-token"
}
if (!process.env.GEMINI_API_KEY) {
  process.env.GEMINI_API_KEY = "test-placeholder-key"
}
