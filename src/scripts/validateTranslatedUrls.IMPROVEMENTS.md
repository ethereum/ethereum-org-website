# Validate Translated URLs - Future Improvements

## P2 - Important (Should Consider)

### 1. Hardcoded Route Prefixes
**File:** `validateTranslatedUrls.ts:36-81`

`VALID_PREFIXES` is a hardcoded 46-item list that will drift from actual application routes over time. Consider dynamically extracting routes from `app/[locale]/` directory structure.

### 2. Performance - Levenshtein on All Paths
**File:** `validateTranslatedUrls.ts:279-293`

`findBestMatch` runs O(n×m) Levenshtein distance against ALL 284 valid paths for each invalid URL. Add length-based pre-filtering:

```typescript
const maxLengthDiff = Math.floor(url.length * 0.4)
const candidates = Array.from(validPaths).filter(
  p => Math.abs(p.length - url.length) <= maxLengthDiff
)
```

### 3. Three Separate Whitelists
**File:** `validateTranslatedUrls.ts:36-96`

`VALID_PREFIXES`, `WHITELISTED_PATHS`, and `WHITELISTED_PREFIXES` serve overlapping purposes. Consolidate into two lists: `VALID_PATH_PREFIXES` and `EXACT_VALID_PATHS`.

### 4. Duplicate Link Extraction Functions
**File:** `validateTranslatedUrls.ts:235-277`

`extractLinksFromMarkdown` and `extractLinksFromJson` are nearly identical (43 lines). Could be one 15-line function:

```typescript
function extractLinks(content: string, regex: RegExp, urlIndex: number): LinkInfo[]
```

### 5. Custom Levenshtein Implementation
**File:** `validateTranslatedUrls.ts:187-212`

Re-implements standard algorithm. Consider using `fastest-levenshtein` or `leven` package.

## P3 - Nice-to-Have

### 1. Path Prefix Inconsistency
**File:** `validateTranslatedUrls.ts:20-23`

Uses `"public/content"` without `./` prefix. Add `./` prefix to match existing convention.

### 2. Regex Recreation in Loop
**File:** `validateTranslatedUrls.ts:241, 264`

Creates new RegExp inside forEach loop unnecessarily.

### 3. Parallel Arrays in applyFix
**File:** `validateTranslatedUrls.ts:382-400`

Parallel `patterns[]` and `replacements[]` arrays are error-prone. Use array of objects instead.

### 4. Pre-compute Normalized Prefixes
**File:** `validateTranslatedUrls.ts:314-315`

`.replace(/\/$/, "")` called in hot loop. Should pre-compute.
