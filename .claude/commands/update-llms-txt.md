# Update LLMS.txt Command

This command helps maintain the `public/llms.txt` file by monitoring key navigation files:

1. **Main Navigation**: `src/components/Nav/useNavigation.ts`
2. **Developer Docs**: `src/data/developer-docs-links.yaml`
3. **Footer Links**: `src/components/Footer.tsx`

## How it works

- Adds missing links to appropriate sections
- Preserves existing descriptions and organization
- Follows established llms.txt structure
- **Prefers static markdown files URLs over html URLs** for better LLM comprehension

## Implementation

When this command is executed, I will:

### Step 1: Parse Navigation Files

**Main Navigation** (`src/components/Nav/useNavigation.ts`):

```javascript
// Extract linkSections object structure
// Parse learn, use, build, participate sections
// Get href, label, and description for each link
```

**Developer Docs** (`src/data/developer-docs-links.yaml`):

```yaml
# Parse foundational-topics, ethereum-stack, advanced, design-fundamentals
# Extract href and id mappings
# Build hierarchical structure
```

**Footer Links** (`src/components/Footer.tsx`):

```javascript
// Extract linkSections and dipperLinks arrays
// Get all footer navigation items
// Include external links (blog, ESP, Devcon)
```

### Step 2: Analyze Current llms.txt

- Parse existing sections and their links
- Extract current URLs and descriptions
- Identify section organization and hierarchy

### Step 3: URL to Markdown File Mapping

**Priority: Static markdown files URLs over web html URLs**

For each link, I will:

1. Check if corresponding markdown file exists in `public/content/`. **Ignore translations**: Skip `public/content/translations/` directory (60+ language versions)
2. Use a URL pointing to the markdown file for the page: `https://ethereum.org/content/[page]/index.md`
3. Fall back to web URL only if no markdown file exists
4. Example: `https://ethereum.org/learn/` → `https://ethereum.org/content/learn/index.md`
5. Example2: `https://ethereum.org/guides/how-to-use-a-wallet/` → `https://ethereum.org/content/guides/how-to-use-a-wallet/index.md`

### Step 4: Smart Link Categorization

New links are categorized using these rules:

1. **Learn Section**: `/learn/`, `/what-is-*`, `/guides/`, `/quizzes/`, `/glossary/`
2. **Use Section**: `/get-eth`, `/wallets/`, `/dapps/`, `/staking/`, use cases
3. **Build Section**: `/developers/`, `/enterprise/`, developer tools
4. **Participate Section**: `/community/`, `/contributing/`, `/foundation/`
5. **Research Section**: `/whitepaper`, `/roadmap/`, `/eips/`, `/governance/`

### Step 5: Validation & Quality Checks

- Verify all markdown files exist in `public/content/`
- Check for duplicate links within sections
- Validate section organization and hierarchy
- Ensure descriptions are informative and concise

### Step 6: Execute Action

Update llms.txt file with improved structure and validated links

---

The command ensures the llms.txt file remains comprehensive and current with minimal manual maintenance.
