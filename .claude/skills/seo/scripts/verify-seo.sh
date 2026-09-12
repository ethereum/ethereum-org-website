#!/usr/bin/env bash
# verify-seo.sh — run the standard SEO verification checklist against a URL.
#
# Usage:
#   ./verify-seo.sh <url>
#
# Example:
#   ./verify-seo.sh https://deploy-preview-17928--ethereumorg.netlify.app/en/
#
# Runs:
#   1. Canonical + alternate tags
#   2. Robots meta
#   3. Sitemap sanity (fetches /sitemap.xml from the origin)
#   4. JSON-LD presence, count, and per-script size
#   5. Crawlable nav link count (sr-only)
#   6. Googlebot vs browser UA parity (checks for accidental cloaking)
#
# Exits 0 on success. Notes anomalies inline but does not fail hard —
# this is a diagnostic, not a test suite.

set -u

if [ $# -lt 1 ]; then
  echo "Usage: $0 <url>" >&2
  echo "Example: $0 https://ethereum.org/en/" >&2
  exit 2
fi

URL="$1"
ORIGIN="$(echo "$URL" | awk -F/ '{print $1"//"$3}')"

section() { printf "\n── %s ──\n" "$1"; }

section "URL"
printf "  %s\n" "$URL"
printf "  origin: %s\n" "$ORIGIN"

# ---------------------------------------------------------------------------
section "Canonical + hreflang alternates"
curl -sL "$URL" \
  | grep -oE '<link rel="(canonical|alternate)"[^>]*>' \
  | head -40 \
  | sed 's/^/  /'

# ---------------------------------------------------------------------------
section "Robots meta"
ROBOTS=$(curl -sL "$URL" | grep -oE '<meta name="robots"[^>]*>' | head -5)
if [ -z "$ROBOTS" ]; then
  printf "  (no robots meta — indexable by default)\n"
else
  printf "%s\n" "$ROBOTS" | sed 's/^/  /'
fi

# ---------------------------------------------------------------------------
section "Sitemap"
SITEMAP_URL="$ORIGIN/sitemap.xml"
SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITEMAP_URL")
ENTRY_COUNT=$(curl -sL "$SITEMAP_URL" | grep -c "<loc>")
printf "  %s → HTTP %s (%s <loc> entries)\n" "$SITEMAP_URL" "$SITEMAP_STATUS" "$ENTRY_COUNT"

# Check whether the current URL is actually listed in the sitemap
URL_IN_SITEMAP=$(curl -sL "$SITEMAP_URL" | grep -c "<loc>$URL</loc>" || true)
if [ "$URL_IN_SITEMAP" -gt 0 ]; then
  printf "  ✓ URL is listed in sitemap\n"
else
  printf "  · URL not found in sitemap (may be fine if trailing-slash or default-locale stripping applies)\n"
fi

# ---------------------------------------------------------------------------
section "JSON-LD scripts (size indicates tool truncation risk)"
HTML=$(curl -sL "$URL")
# Count and print byte size of each application/ld+json block.
# awk handles the multi-line extraction safely.
echo "$HTML" \
  | awk '
      BEGIN { n=0 }
      /<script type="application\/ld\+json">/ { cap=1; buf=""; next }
      cap && /<\/script>/ { cap=0; n++; printf "  #%d  %6d bytes\n", n, length(buf) }
      cap { buf = buf $0 }
      END { if (n==0) print "  (no JSON-LD found)" }
    '

# Soft warning if any block is larger than ~5KB
LARGE=$(echo "$HTML" \
  | awk '
      /<script type="application\/ld\+json">/ { cap=1; buf=""; next }
      cap && /<\/script>/ { cap=0; if (length(buf) > 5120) print length(buf); }
      cap { buf = buf $0 }
    ')
if [ -n "$LARGE" ]; then
  printf "  ⚠  At least one block exceeds ~5KB — split into more scripts to avoid validator truncation.\n"
fi

# ---------------------------------------------------------------------------
section "Crawlable nav (sr-only link count)"
GBOT_HTML=$(curl -sL -A "Googlebot/2.1 (+http://www.google.com/bot.html)" "$URL")
SR_ONLY_COUNT=$(echo "$GBOT_HTML" | grep -oE '<nav[^>]*class="[^"]*sr-only[^"]*"' | wc -l | tr -d ' ')
SR_LINK_COUNT=$(echo "$GBOT_HTML" \
  | awk '/<nav[^>]*class="[^"]*sr-only/,/<\/nav>/' \
  | grep -c '<a ')
printf "  sr-only nav blocks: %s\n" "$SR_ONLY_COUNT"
printf "  links inside:       %s\n" "$SR_LINK_COUNT"

# ---------------------------------------------------------------------------
section "Googlebot vs browser parity"
GBOT_HASH=$(echo "$GBOT_HTML" | md5sum | awk '{print $1}')
BROWSER_HASH=$(curl -sL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" "$URL" | md5sum | awk '{print $1}')
printf "  Googlebot md5: %s\n" "$GBOT_HASH"
printf "  Browser md5:   %s\n" "$BROWSER_HASH"
if [ "$GBOT_HASH" = "$BROWSER_HASH" ]; then
  printf "  ✓ Identical — no cloaking.\n"
else
  printf "  · Different. For a fully-static RSC page these should match.\n"
  printf "    Common benign causes: client-only A/B variants, CSRF tokens, timestamps.\n"
  printf "    Investigate if the delta is structural (links, nav, JSON-LD differ).\n"
fi

echo
