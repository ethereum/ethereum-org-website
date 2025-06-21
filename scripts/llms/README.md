# LLMS Files Generator

This directory contains scripts to generate `llms.txt` and `llms-full.txt` files for AI systems to easily access Ethereum.org content.

## 🚀 Quick Start

```bash
# Generate LLMS files and validate them
npm run llms:ci

# Or run individual commands:
npm run llms:generate     # Generate both llms.txt and llms-full.txt
npm run llms:test         # Run unit tests (21 tests)
npm run llms:test:static  # Static URL validation (no server required)
npm run llms:validate     # Run both test suites
```

## 📁 Files

- **`generate_all.js`** - Main script that generates both LLMS files with validation
- **`test_llms_validation.js`** - Unit test suite (21 tests) for CI/CD validation
- **`validate_urls_static.js`** - Static URL validation without requiring a server

## 🎯 Generated Files

- **`public/llms.txt`** - URL directory for AI crawlers (32KB, 262 URLs)
- **`public/llms-full.txt`** - Complete content for LLMs (1.05MB, 150k+ words)

## 🔧 CI/CD Integration

The GitHub Actions workflow (`.github/workflows/validate-llms.yml`) automatically:

1. **Detects content changes** in `public/content/` or `.md` files
2. **Generates fresh LLMS files** using the generation script
3. **Runs 21 unit tests** to validate structure and content
4. **Performs static URL validation** (253 URLs, 100% success rate)
5. **Posts results** as PR comments with validation status
6. **Uploads artifacts** for manual review

## ✅ Validation Coverage

### Unit Tests (21 tests)
- File existence and structure validation
- Content length and quality checks  
- URL mapping and file consistency
- Timestamp and freshness verification
- Cross-file consistency validation

### Static Validation
- 253 unique URLs validated
- File existence and content checks
- No server required (fast CI/CD)
- 100% success rate expected

## 🎯 Quality Standards

- **100% test coverage** - All 21 tests must pass
- **100% URL validation** - All referenced files must exist
- **Content standards** - 150k+ words, proper structure, fresh timestamps
- **Performance** - Generation completes in ~30 seconds

## 📊 Current Stats

- **Total content files**: 3,975 markdown files
- **Categories**: 35 (developers, contributing, roadmap, etc.)
- **Generated URLs**: 262 unique content URLs
- **File sizes**: 32KB (llms.txt) + 1.05MB (llms-full.txt)
- **Word count**: 151,945 words in llms-full.txt

## 🔄 Development Workflow

1. **Make content changes** in `public/content/`
2. **Run locally**: `npm run llms:ci`
3. **Commit changes** - CI automatically validates
4. **Review PR** - Check validation report in comments
5. **Deploy** - Files are ready for production

This system ensures Ethereum.org content is always accessible and up-to-date for AI systems! 🌟 