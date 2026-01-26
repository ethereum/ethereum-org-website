# Markdown Page System v2: Consolidated Plan

## Overview

An optimized markdown page rendering system replacing the existing `[...slug]/page.tsx`. The system efficiently generates ~7,000 pages with full internationalization support.

**Goals:**
- Build time under 5 minutes for all pages
- Zero external API calls during build (no GitHub API)
- Full feature parity with existing system
- Optimized for Netlify serverless deployment

**Future (v2):**
- Blur placeholder generation
- Crowdin translator integration

---

## Design Principles

- **Start fresh** - No bias from previous implementation
- **Best-in-class** - Use most performant, maintainable patterns in Next.js 14+ ecosystem
- **Follow Vercel/React recommendations** - RSC, data fetching, caching patterns
- **Simplicity over cleverness** - Straightforward, debuggable solutions
- **Build-time over runtime** - Compute everything possible at build time
- **Parallel by default** - Design for concurrent processing of 7k pages

---

## Constraints

### Content Structure

| Content Type | Location |
|--------------|----------|
| English markdown | `public/content/{slug}/index.md` |
| Translated markdown | `public/content/translations/{locale}/{slug}/index.md` |
| Localized images | Colocated with markdown files |
| Supported locales | 60+ languages |

### Performance

- ~7,000 pages to generate
- Target build time: < 5 minutes
- Deployment: Netlify serverless (cold starts, memory limits)
- No external API calls during build or runtime

---

## Architecture

### File Structure

```
src/lib/utils/md/
├── index.ts          # Re-exports
├── content.ts        # Content loading, path generation
├── contributors.ts   # Contributor fetching
├── images.ts         # Image path resolution with locale fallback
├── preprocess.ts     # MDX v1→v2 compatibility
└── toc.ts            # Table of contents extraction

app/[locale]/[...slug]/
└── page.tsx          # Main page component with all layouts
```

### Component Architecture

```
MdComponents (base HTML + common components)
    ↓
componentsMapping[layout] (layout-specific components)
    ↓
MDXRemote receives merged components
```

### Key Components by Layout

| Layout | Special Components |
|--------|-------------------|
| docs | `DeveloperDocsLinks` |
| tutorial | `TutorialMetadata` |
| staking | `StakingProductsCardGrid`, `StakingComparison` |
| static | Base components only |

---

## Functional Requirements

### FR1: Content Loading

| ID | Requirement |
|----|-------------|
| FR1.1 | Load markdown content from English source path |
| FR1.2 | Load translated content from locale-specific path |
| FR1.3 | Fall back to English when translation doesn't exist |
| FR1.4 | Indicate when page is displaying fallback content |
| FR1.5 | Calculate reading time |

### FR2: Contributors & History

| ID | Requirement |
|----|-------------|
| FR2.1 | Display list of contributor names for each page |
| FR2.2 | Display last modified date for each page |

**Implementation:** Pre-compute JSON at build time via a single `git log` pass. Write results to a JSON file that is read during page render. This avoids per-page git commands (150,000 → 1) while keeping all data local.

### FR3: Table of Contents

| ID | Requirement |
|----|-------------|
| FR3.1 | Generate table of contents from markdown headings |
| FR3.2 | Support custom heading IDs (`{#custom-id}` syntax) |
| FR3.3 | Respect frontmatter depth configuration |

**Key Insight:** TOC extraction must happen BEFORE preprocessing, since preprocessing removes the `{#custom-id}` syntax.

### FR4: Image Handling

| ID | Requirement |
|----|-------------|
| FR4.1 | Resolve images from locale-specific colocated folder first |
| FR4.2 | Fall back to default locale (English) colocated images |
| FR4.3 | Pass through external URLs unchanged |

### FR5: SEO & Metadata

| ID | Requirement |
|----|-------------|
| FR5.1 | Generate meta title and description |
| FR5.2 | Generate OpenGraph tags |
| FR5.3 | Generate Twitter card tags |
| FR5.4 | Generate canonical URL |
| FR5.5 | Generate hreflang alternates for translated locales |
| FR5.6 | Generate JSON-LD structured data |
| FR5.7 | Use section-specific default OG images |

### FR6: Layout System

| ID | Requirement |
|----|-------------|
| FR6.1 | Select layout based on frontmatter `template` field |
| FR6.2 | Support **static** layout |
| FR6.3 | Support **docs** layout |
| FR6.4 | Support **staking** layout |
| FR6.5 | Support **upgrade** layout |
| FR6.6 | Support **use-cases** layout |
| FR6.7 | Support **roadmap** layout |
| FR6.8 | Support **tutorial** layout |
| FR6.9 | Support **translatathon** layout |

**Layout Detection Logic:**
```typescript
const getLayoutFromPath = (slug: string, fm: Frontmatter): Layout => {
  if (slug.startsWith("developers/docs")) return "docs"
  if (slug.startsWith("developers/tutorials")) return "tutorial"
  return "static"
}
```

### FR7: Content Banners

| ID | Requirement |
|----|-------------|
| FR7.1 | Show outdated content banner when flagged |
| FR7.2 | Show incomplete content warning when flagged |
| FR7.3 | Show translation fallback notice |
| FR7.4 | Allow hiding edit button via frontmatter |

### FR8: Static Generation

| ID | Requirement |
|----|-------------|
| FR8.1 | Pre-generate all page paths at build time |
| FR8.2 | Generate paths for all supported locales |

### FR9: MDX Components

| ID | Requirement |
|----|-------------|
| FR9.1 | Support all existing custom MDX components |
| FR9.2 | Style base HTML elements |
| FR9.3 | Support MDX v1 syntax (via preprocessing) |

---

## MDX v1 → v2 Compatibility

MDX v2 is **much stricter** than v1. The existing ~3,000 markdown files use patterns that break MDX v2 parsing.

### Issues & Solutions

| Pattern | MDX v2 Behavior | Solution |
|---------|-----------------|----------|
| `## Heading {#custom-id}` | Interprets `{#...}` as JavaScript expression | Preprocess: strip `{#...}` before MDX, extract for TOC separately |
| `<!-- HTML comments -->` | Not allowed in MDX v2 | Preprocess: remove all HTML comments |
| `<img src="...">` (non-self-closing) | Must be self-closing in JSX | Preprocess: convert to `<img src="..." />` |
| `<Tag />/>` (double slash) | Invalid JSX | Fixed regex with negative lookbehind `(?<!\/)>` |

### Preprocessing Pipeline

```typescript
// src/lib/utils/md/preprocess.ts
export function preprocessMdx(content: string): string {
  // 1. Remove heading IDs (extracted separately for TOC)
  // 2. Remove HTML comments
  // 3. Normalize HTML attributes (single → double quotes)
  // 4. Fix self-closing tags (with negative lookbehind)
}
```

### Remark/Rehype Plugins

**Working:**
- `remarkGfm` - GitHub Flavored Markdown (tables, strikethrough, etc.)
- `rehypeSlug` - Adds IDs to headings for anchor links

**Did Not Work:**
- `remarkHeadingId` - Supposed to handle `{#custom-id}` syntax but didn't process before MDX parser. Manual preprocessing required.

---

## MDX Scope Variables

Some pages use variables in MDX content like `<IssuesList issues={gfissues} />`. These must be passed to MDX scope.

```typescript
<MDXRemote
  source={content}
  options={{
    scope: {
      gfissues: [], // Mock for now
    },
  }}
/>
```

**Note:** The RSC version of `next-mdx-remote` uses `options.scope`, not a top-level `scope` prop.

---

## Performance

### Build Optimization

| Metric | Before Optimization | After Optimization |
|--------|--------------------|--------------------|
| Git commands per build | ~150,000 | 1 (pre-compute) |
| Build time | 10+ minutes | < 5 minutes |
| External API calls | 0 | 0 |

### Bottleneck Analysis

- ~3,000 slugs × 25 locales = 75,000 page renders
- Original: each render called `git log` for contributors + last edit date
- Original: 2 git commands × 75,000 = 150,000 shell executions
- Optimized: single pre-build `git log` extracts all data at once

### Solution

Pre-compute contributor data in a single git pass before build:

```typescript
// Pre-build script: generates src/data/content-contributors.json
// Single git log command extracts all contributors + last edit dates
// Output: { [filePath]: { contributors: string[], lastEditDate: string } }

// During render: simple JSON lookup
export function getMarkdownContributors(filePath: string): FileContributor[] {
  return contributorsData[filePath]?.contributors ?? []
}

export function getLastEditDate(filePath: string): string {
  return contributorsData[filePath]?.lastEditDate ?? ""
}
```

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Build time (~7k pages) | < 5 minutes |
| External API calls | 0 |
| Layout support | 8 layouts |
| Locale support | 60+ languages |

---

## Recommendations

1. **Consider ISR** - For pages that need fresher data without full rebuilds
2. **Add error boundaries** - Some MDX content may still have edge cases
3. **Monitor build times** - As content grows, may need further optimization
4. **Test all layouts** - Verify each layout type renders correctly with real content
