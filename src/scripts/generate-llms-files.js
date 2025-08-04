const fs = require("fs")
const path = require("path")

// =============================================================================
// CONFIGURATION
// =============================================================================

const CONFIG = {
  baseUrl: "https://ethereum.org",
  contentDir: "public/content",
  outputDir: "public",
  tempFile: "all_content_files.txt",
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function log(message, type = "info") {
  const prefix = {
    info: "📝",
    success: "✅",
    error: "❌",
    warning: "⚠️",
    step: "🚀",
  }
  console.log(`${prefix[type]} ${message}`)
}

function createTitle(relativePath) {
  const pathParts = relativePath.split("/")
  let title = pathParts[pathParts.length - 1]
    .replace(/\.md$/, "")
    .replace(/index$/, "")

  if (!title || title === "") {
    title = pathParts[pathParts.length - 2] || pathParts[0]
  }

  // Create breadcrumb for nested content
  if (pathParts.length > 2) {
    const breadcrumb = pathParts.slice(0, -1).join(" > ").replace(/-/g, " ")
    title = `${breadcrumb}`
  } else if (pathParts.length === 2) {
    title = pathParts[0]
  }

  return title.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

function readMarkdownContent(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return null
    }

    let markdownContent = fs.readFileSync(filePath, "utf-8")

    // Remove frontmatter (YAML between --- blocks)
    markdownContent = markdownContent.replace(/^---[\s\S]*?---\n/, "")

    // Clean up any remaining metadata or special formatting
    markdownContent = markdownContent
      .replace(/import\s+.*from.*['"].*['"];?\n/g, "") // Remove import statements
      .replace(/<[^>]+>/g, "") // Remove HTML tags
      .replace(/\{[^}]+\}/g, "") // Remove JSX/React components
      .trim()

    return markdownContent
  } catch (error) {
    log(`Error reading ${filePath}: ${error.message}`, "error")
    return null
  }
}

// =============================================================================
// MAIN FUNCTIONS
// =============================================================================

function findMarkdownFiles(dir, baseDir = dir) {
  const files = []

  if (!fs.existsSync(dir)) {
    log(`Directory ${dir} does not exist`, "error")
    return files
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Skip certain directories including translations
      if (
        item === "node_modules" ||
        item === ".git" ||
        item === ".next" ||
        item === "dist" ||
        item === "translations"
      ) {
        continue
      }

      // Recursively search subdirectories
      files.push(...findMarkdownFiles(fullPath, baseDir))
    } else if (stat.isFile() && item.endsWith(".md")) {
      files.push(fullPath)
    }
  }

  return files
}

function generateLlmsTxt(files) {
  log("Generating llms.txt (URL directory)", "step")

  // Group files by category
  const categorizedFiles = {}

  files.forEach((filePath) => {
    const relativePath = filePath.replace(CONFIG.contentDir + "/", "")
    const pathParts = relativePath.split("/")
    const mainCategory = pathParts[0]

    if (!categorizedFiles[mainCategory]) {
      categorizedFiles[mainCategory] = []
    }

    categorizedFiles[mainCategory].push({
      filePath,
      relativePath,
      pathParts,
    })
  })

  // Start building content
  let content = `# Ethereum.org Documentation

> Ethereum.org is the official documentation and learning resource for Ethereum. It provides comprehensive guides, tutorials, and reference materials for developers, users, and community members to understand and interact with the Ethereum blockchain.

## Overview

Ethereum.org contains these primary sections:

- [About](https://ethereum.org/content/about/index.md): Core information about Ethereum and the website
- [AI Agents](https://ethereum.org/content/ai-agents/index.md): Resources on AI agents in the Ethereum ecosystem  
- [Bridges](https://ethereum.org/content/bridges/index.md): Cross-chain bridging documentation and guides
- [Community](https://ethereum.org/content/community/get-involved/index.md): Community resources, events, and involvement opportunities
- [Contributing](https://ethereum.org/content/contributing/index.md): Guidelines and resources for contributing to Ethereum.org
- [DeFi](https://ethereum.org/content/defi/index.md): Decentralized Finance resources and guides
- [Developers](https://ethereum.org/content/developers/docs/index.md): Comprehensive developer documentation and tutorials
- [Staking](https://ethereum.org/content/staking/solo/index.md): Everything about Ethereum staking

## Core Resources

### About Ethereum

`

  // Process main categories (excluding translations to keep file manageable)
  Object.keys(categorizedFiles)
    .filter((category) => category !== "translations") // Exclude all translations
    .sort()
    .forEach((category) => {
      const displayName =
        category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
      content += `### ${displayName}\n\n`

      // Sort files within category - prioritize index files
      const sortedFiles = categorizedFiles[category].sort((a, b) => {
        if (
          a.relativePath.endsWith("index.md") &&
          !b.relativePath.endsWith("index.md")
        )
          return -1
        if (
          !a.relativePath.endsWith("index.md") &&
          b.relativePath.endsWith("index.md")
        )
          return 1
        return a.relativePath.localeCompare(b.relativePath)
      })

      sortedFiles.forEach((fileInfo) => {
        const title = createTitle(fileInfo.relativePath)
        const url = `${CONFIG.baseUrl}/content/${fileInfo.relativePath}`
        content += `- [${title}](${url})\n`
      })

      content += `\n`
    })

  // Add footer
  content += `---\n\n`
  content += `This document was rendered at ${new Date().toISOString()}.\n`
  content += `For the latest version of this document, see [https://ethereum.org/llms.txt](https://ethereum.org/llms.txt).\n`

  return content
}

function generateLlmsFullTxt(files) {
  log("Generating llms-full.txt (full content)", "step")

  // Start building content
  let content = `# Ethereum.org Documentation (Full Content)

> Ethereum.org is the official documentation and learning resource for Ethereum. This file contains the complete content of all documentation pages, making it easy for AI systems to access comprehensive information about Ethereum in a single file.

## Overview

This llms-full.txt file contains the complete text content from documentation pages on Ethereum.org, including:

- Core Ethereum concepts and introduction materials
- Comprehensive developer documentation and tutorials  
- Technical specifications and standards
- Staking guides and validator information
- Community resources and contribution guidelines
- Roadmap and future development plans
- Use case examples and applications

The content is organized by main topics and includes the full text of each page for complete context.

---

`

  // Group files by category to provide some structure
  const categorizedFiles = {}
  files.forEach((filePath) => {
    const relativePath = filePath.replace(CONFIG.contentDir + "/", "")
    const category = relativePath.split("/")[0]
    if (!categorizedFiles[category]) {
      categorizedFiles[category] = []
    }
    categorizedFiles[category].push({
      filePath,
      relativePath,
    })
  })

  log("Processing all markdown files by category...", "info")

  Object.keys(categorizedFiles)
    .filter((category) => category !== "translations") // Exclude all translations for English-only content
    .sort()
    .forEach((category) => {
      content += `# ${category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}\n\n`

      categorizedFiles[category].forEach((fileInfo) => {
        const markdownContent = readMarkdownContent(fileInfo.filePath)
        if (markdownContent) {
          const title = createTitle(fileInfo.relativePath)
          content += `## ${title}\n\n`
          content += `${markdownContent}\n\n---\n\n`
        }
      })
    })

  // Add footer
  content += `\n---\n\nThis llms-full.txt file was generated at ${new Date().toISOString()}.\n`
  content += `It contains the complete content from Ethereum.org documentation to provide comprehensive context for AI systems.\n`
  content += `For the latest version, see: https://ethereum.org/llms-full.txt\n`

  return content
}

function main() {
  try {
    console.log("============================================================")
    console.log("🌟 ETHEREUM.ORG LLMS FILES GENERATOR")
    console.log("============================================================")
    console.log(
      "This script will generate both llms.txt and llms-full.txt files"
    )
    console.log("and place them in the public directory.")
    console.log("")

    log("Starting generation...", "step")

    // Check prerequisites
    if (!fs.existsSync(CONFIG.contentDir)) {
      throw new Error(`Content directory not found: ${CONFIG.contentDir}`)
    }

    const markdownFiles = findMarkdownFiles(CONFIG.contentDir)
    markdownFiles.sort()

    log(`Found ${markdownFiles.length} markdown files`, "success")

    // Generate files
    const llmsTxt = generateLlmsTxt(markdownFiles)
    const llmsFullTxt = generateLlmsFullTxt(markdownFiles)

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), CONFIG.outputDir)
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Write files
    const llmsTxtPath = path.join(publicDir, "llms.txt")
    const llmsFullTxtPath = path.join(publicDir, "llms-full.txt")

    fs.writeFileSync(llmsTxtPath, llmsTxt)
    fs.writeFileSync(llmsFullTxtPath, llmsFullTxt)

    log(
      `Generated llms.txt: ${(Buffer.byteLength(llmsTxt, "utf-8") / 1024).toFixed(2)} KB`,
      "success"
    )
    log(
      `Generated llms-full.txt: ${(Buffer.byteLength(llmsFullTxt, "utf-8") / 1024 / 1024).toFixed(2)} MB`,
      "success"
    )

    console.log("")
    console.log("============================================================")
    console.log("🎉 GENERATION COMPLETE!")
    console.log("============================================================")
    console.log("✅ Files created:")
    console.log(`   - ${llmsTxtPath}`)
    console.log(`   - ${llmsFullTxtPath}`)
    console.log("")
    console.log("🌐 URLs will be available at:")
    console.log("   - https://ethereum.org/llms.txt")
    console.log("   - https://ethereum.org/llms-full.txt")
    console.log("============================================================")
  } catch (error) {
    log(`Error: ${error.message}`, "error")
    console.error(error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { generateLlmsTxt, generateLlmsFullTxt, findMarkdownFiles }
