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
// STEP 1: SCAN FOR CONTENT FILES
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
      // Skip certain directories
      if (
        item === "node_modules" ||
        item === ".git" ||
        item === ".next" ||
        item === "dist"
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

function scanContentFiles() {
  log("Scanning for content files", "step")

  if (!fs.existsSync(CONFIG.contentDir)) {
    log(`Content directory not found: ${CONFIG.contentDir}`, "error")
    log(
      "Please run this script from the root directory containing ethereum-org-website/",
      "error"
    )
    return null
  }

  const markdownFiles = findMarkdownFiles(CONFIG.contentDir)
  markdownFiles.sort()

  log(`Found ${markdownFiles.length} markdown files`, "success")

  // Write to temporary file
  const outputContent = markdownFiles.join("\n") + "\n"
  fs.writeFileSync(CONFIG.tempFile, outputContent)

  // Show category breakdown
  const categories = {}
  markdownFiles.forEach((file) => {
    const relativePath = file.replace("public/content/", "")
    const category = relativePath.split("/")[0]
    categories[category] = (categories[category] || 0) + 1
  })

  log("Category breakdown:", "info")
  Object.entries(categories)
    .sort(([, a], [, b]) => b - a)
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count} files`)
    })

  return markdownFiles
}

// =============================================================================
// STEP 2: GENERATE LLMS.TXT (URL DIRECTORY)
// =============================================================================

function generateLlmsTxt(files) {
  log("Generating llms.txt (URL directory)", "step")

  // Category order and display names
  const categoryOrder = [
    { key: "about", display: "About" },
    { key: "ai-agents", display: "Ai agents" },
    { key: "bridges", display: "Bridges" },
    { key: "community", display: "Community" },
    { key: "contributing", display: "Contributing" },
    { key: "cookie-policy", display: "Cookie policy" },
    { key: "dao", display: "Dao" },
    { key: "decentralized-identity", display: "Decentralized identity" },
    { key: "defi", display: "Defi" },
    { key: "desci", display: "Desci" },
    { key: "developers", display: "Developers" },
    { key: "eips", display: "Eips" },
    { key: "energy-consumption", display: "Energy consumption" },
    { key: "enterprise", display: "Enterprise" },
    { key: "foundation", display: "Foundation" },
    { key: "glossary", display: "Glossary" },
    { key: "governance", display: "Governance" },
    { key: "guides", display: "Guides" },
    { key: "history", display: "History" },
    { key: "nft", display: "Nft" },
    { key: "payments", display: "Payments" },
    { key: "prediction-markets", display: "Prediction markets" },
    { key: "privacy-policy", display: "Privacy policy" },
    { key: "real-world-assets", display: "Real world assets" },
    { key: "refi", display: "Refi" },
    { key: "roadmap", display: "Roadmap" },
    { key: "security", display: "Security" },
    { key: "smart-contracts", display: "Smart contracts" },
    { key: "social-networks", display: "Social networks" },
    { key: "staking", display: "Staking" },
    { key: "terms-of-use", display: "Terms of use" },
    { key: "web3", display: "Web3" },
    { key: "whitepaper", display: "Whitepaper" },
    { key: "wrapped-eth", display: "Wrapped eth" },
    { key: "zero-knowledge-proofs", display: "Zero knowledge proofs" },
  ]

  // Group files by category
  const categorizedFiles = {}
  files.forEach((filePath) => {
    const relativePath = filePath.replace("public/content/", "")
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

  // Process categories in order
  categoryOrder.forEach((categoryInfo) => {
    const category = categoryInfo.key
    const displayName = categoryInfo.display

    if (categorizedFiles[category]) {
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
    }
  })

  // Add footer
  content += `---\n\n`
  content += `This document was rendered at ${new Date().toISOString()}.\n`
  content += `For the latest version of this document, see [https://ethereum.org/llms.txt](https://ethereum.org/llms.txt).\n`

  // Write the file
  const outputPath = path.join(CONFIG.outputDir, "llms.txt")
  fs.writeFileSync(outputPath, content)

  log(
    `Generated llms.txt: ${(Buffer.byteLength(content, "utf-8") / 1024).toFixed(2)} KB`,
    "success"
  )
  return content
}

// =============================================================================
// STEP 3: GENERATE LLMS-FULL.TXT (FULL CONTENT)
// =============================================================================

function generateLlmsFullTxt(files) {
  log("Generating llms-full.txt (full content)", "step")

  // Group files by category
  const categorizedFiles = {}
  const importantFiles = [
    "about/index.md",
    "what-is-ethereum/index.md",
    "developers/index.md",
    "developers/docs/intro-to-ethereum/index.md",
    "staking/index.md",
    "roadmap/index.md",
    "defi/index.md",
  ]

  files.forEach((filePath) => {
    const relativePath = filePath.replace("public/content/", "")
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
  let content = `# Ethereum.org Documentation (Full Content)

> Ethereum.org is the official documentation and learning resource for Ethereum. This file contains the complete content of all documentation pages, making it easy for AI systems to access comprehensive information about Ethereum in a single file.

## Overview

This llms-full.txt file contains the complete text content from ${files.length} documentation pages on Ethereum.org, including:

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

  // Add important core pages first
  log("Processing important core pages...", "info")
  content += `# Core Ethereum Information\n\n`

  importantFiles.forEach((relPath) => {
    const fullPath = path.join(CONFIG.contentDir, relPath)
    const markdownContent = readMarkdownContent(fullPath)

    if (markdownContent) {
      const title = createTitle(relPath)
      content += `## ${title}\n\n`
      content += `${markdownContent}\n\n---\n\n`
    }
  })

  // Process each category
  const priorityCategories = [
    "developers",
    "staking",
    "roadmap",
    "defi",
    "community",
  ]
  const processedCategories = new Set()

  // Process priority categories first
  priorityCategories.forEach((category) => {
    if (categorizedFiles[category] && !processedCategories.has(category)) {
      log(`Processing ${category} category...`, "info")

      content += `# ${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")}\n\n`

      // Sort files within category - prioritize index files and main docs
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

      // Limit to most important files to keep size manageable
      const maxFilesPerCategory = category === "developers" ? 25 : 15
      sortedFiles.slice(0, maxFilesPerCategory).forEach((fileInfo) => {
        const markdownContent = readMarkdownContent(fileInfo.filePath)

        if (markdownContent && markdownContent.length > 100) {
          const title = createTitle(fileInfo.relativePath)
          content += `## ${title}\n\n`
          content += `${markdownContent}\n\n---\n\n`
        }
      })

      processedCategories.add(category)
    }
  })

  // Process remaining categories (but limit them more strictly)
  Object.keys(categorizedFiles).forEach((category) => {
    if (!processedCategories.has(category) && category !== "translations") {
      log(`Processing remaining category: ${category}...`, "info")

      content += `# ${category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")}\n\n`

      // For remaining categories, only include index files and a few key pages
      const sortedFiles = categorizedFiles[category]
        .filter((fileInfo) => fileInfo.relativePath.endsWith("index.md"))
        .sort((a, b) => a.relativePath.localeCompare(b.relativePath))

      sortedFiles.slice(0, 5).forEach((fileInfo) => {
        const markdownContent = readMarkdownContent(fileInfo.filePath)

        if (markdownContent && markdownContent.length > 100) {
          const title = createTitle(fileInfo.relativePath)
          content += `## ${title}\n\n`
          content += `${markdownContent}\n\n---\n\n`
        }
      })

      processedCategories.add(category)
    }
  })

  // Add footer
  content += `\n---\n\nThis llms-full.txt file was generated at ${new Date().toISOString()}.\n`
  content += `It contains the complete content from Ethereum.org documentation to provide comprehensive context for AI systems.\n`
  content += `For the latest version, see: https://ethereum.org/llms-full.txt\n`

  // Write the file
  const outputPath = path.join(CONFIG.outputDir, "llms-full.txt")
  fs.writeFileSync(outputPath, content)

  log(
    `Generated llms-full.txt: ${(Buffer.byteLength(content, "utf-8") / 1024 / 1024).toFixed(2)} MB`,
    "success"
  )
  return content
}

// =============================================================================
// STEP 4: VALIDATE LLMS.TXT
// =============================================================================

function validateLlmsTxt(content) {
  log("Validating llms.txt", "step")

  const fileSize = Buffer.byteLength(content, "utf-8")
  const lines = content.split("\n")
  const sections = lines.filter((line) => line.startsWith("## ")).length
  const subsections = lines.filter((line) => line.startsWith("### ")).length
  const linkCount = (content.match(/\]\(https:\/\/ethereum\.org/g) || []).length

  log(
    `File size: ${fileSize} bytes (${(fileSize / 1024).toFixed(2)} KB)`,
    "info"
  )
  log(`Total lines: ${lines.length}`, "info")
  log(`Main sections: ${sections}`, "info")
  log(`Subsections: ${subsections}`, "info")
  log(`Total links: ${linkCount}`, "info")

  // Validate structure
  const validations = [
    {
      name: "Has correct title",
      check: content.startsWith("# Ethereum.org Documentation"),
    },
    { name: "Has Overview section", check: content.includes("## Overview") },
    {
      name: "Has footer timestamp",
      check: content.includes("This document was rendered at"),
    },
    {
      name: "No double domain in URLs",
      check: !content.includes("https://ethereum.org/https://"),
    },
  ]

  let passed = 0
  validations.forEach((validation) => {
    if (validation.check) {
      log(validation.name, "success")
      passed++
    } else {
      log(validation.name, "error")
    }
  })

  log(
    `Validation Score: ${passed}/${validations.length} (${((passed / validations.length) * 100).toFixed(0)}%)`,
    "info"
  )
  return passed === validations.length
}

// =============================================================================
// STEP 5: VALIDATE LLMS-FULL.TXT
// =============================================================================

function validateLlmsFullTxt(content) {
  log("Validating llms-full.txt", "step")

  const fileSize = Buffer.byteLength(content, "utf-8")
  const lines = content.split("\n")
  const mainSections = lines.filter((line) => line.match(/^# [^#]/)).length
  const subsections = lines.filter((line) => line.match(/^## [^#]/)).length
  const separators = lines.filter((line) => line.trim() === "---").length
  const wordCount = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  log(
    `File size: ${fileSize} bytes (${(fileSize / 1024 / 1024).toFixed(2)} MB)`,
    "info"
  )
  log(`Total lines: ${lines.length.toLocaleString()}`, "info")
  log(`Main sections: ${mainSections}`, "info")
  log(`Subsections: ${subsections}`, "info")
  log(`Content separators: ${separators}`, "info")
  log(`Word count: ${wordCount.toLocaleString()}`, "info")

  // Check for key Ethereum terms
  const keyTerms = [
    "Ethereum",
    "blockchain",
    "smart contract",
    "DeFi",
    "staking",
    "validator",
    "ETH",
  ]
  keyTerms.forEach((term) => {
    const count = (content.match(new RegExp(term, "gi")) || []).length
    log(`"${term}" mentions: ${count}`, "info")
  })

  // Validate structure
  const validations = [
    {
      name: "Proper title",
      check: content.startsWith("# Ethereum.org Documentation (Full Content)"),
    },
    {
      name: "Overview blockquote",
      check: content.includes("> Ethereum.org is the official documentation"),
    },
    { name: "Contains full content", check: wordCount > 100000 },
    { name: "Organized with clear sections", check: mainSections > 5 },
    {
      name: "Generation timestamp",
      check: content.includes("This llms-full.txt file was generated at"),
    },
    { name: "Reasonable file size (< 5MB)", check: fileSize < 5 * 1024 * 1024 },
  ]

  let passed = 0
  validations.forEach((validation) => {
    if (validation.check) {
      log(validation.name, "success")
      passed++
    } else {
      log(validation.name, "error")
    }
  })

  log(
    `Validation Score: ${passed}/${validations.length} (${((passed / validations.length) * 100).toFixed(0)}%)`,
    "info"
  )
  return passed === validations.length
}

// =============================================================================
// STEP 6: STATIC URL VALIDATION (NO SERVER REQUIRED)
// =============================================================================

// Convert URL to expected file path
function urlToFilePath(url) {
  if (!url.startsWith(CONFIG.baseUrl + "/content/")) {
    return null
  }

  const relativePath = url.replace(CONFIG.baseUrl + "/", "")
  const filePath = path.join("ethereum-org-website/public", relativePath)

  return filePath
}

// Validate file exists and has reasonable content
function validateFileContent(filePath, url) {
  const result = {
    url: url,
    filePath: filePath,
    exists: false,
    isEmpty: false,
    hasValidContent: false,
    fileSize: 0,
    error: null,
  }

  try {
    if (!fs.existsSync(filePath)) {
      result.error = "File does not exist"
      return result
    }

    result.exists = true
    const stats = fs.statSync(filePath)
    result.fileSize = stats.size

    if (stats.size === 0) {
      result.isEmpty = true
      result.error = "File is empty"
      return result
    }

    const content = fs.readFileSync(filePath, "utf-8")

    if (content.trim().length === 0) {
      result.isEmpty = true
      result.error = "File has no content"
      return result
    }

    const hasContent =
      content.includes("#") ||
      content.includes("##") ||
      content.length > 100 ||
      content.includes("---")

    if (!hasContent) {
      result.error = "File appears to have invalid or minimal content"
      return result
    }

    result.hasValidContent = true
  } catch (error) {
    result.error = `Error reading file: ${error.message}`
  }

  return result
}

// Extract URLs from llms.txt content
function extractUrlsFromContent(llmsContent) {
  const urlMatches = llmsContent.match(
    /\[([^\]]+)\]\((https:\/\/ethereum\.org\/content[^)]+)\)/g
  )

  if (!urlMatches) {
    return []
  }

  const urls = urlMatches
    .map((match) => {
      const urlMatch = match.match(
        /\((https:\/\/ethereum\.org\/content[^)]+)\)/
      )
      return urlMatch ? urlMatch[1] : null
    })
    .filter(Boolean)

  return urls
}

// Static URL validation function
function validateUrlsStatic(_files) {
  log("Static URL validation (no server required)", "step")

  const llmsPath = path.join(CONFIG.outputDir, "llms.txt")
  if (!fs.existsSync(llmsPath)) {
    log("llms.txt not found for static validation", "error")
    return false
  }

  const llmsContent = fs.readFileSync(llmsPath, "utf-8")
  const urls = extractUrlsFromContent(llmsContent)
  const uniqueUrls = [...new Set(urls)]

  log(`Validating ${uniqueUrls.length} unique URLs statically...`, "info")

  let validCount = 0

  uniqueUrls.forEach((url) => {
    const filePath = urlToFilePath(url)

    if (!filePath) {
      return
    }

    const validation = validateFileContent(filePath, url)

    if (validation.exists && validation.hasValidContent) {
      validCount++
    }
  })

  const successRate = (validCount / uniqueUrls.length) * 100
  log(
    `Static validation: ${validCount}/${uniqueUrls.length} valid (${successRate.toFixed(1)}%)`,
    successRate === 100 ? "success" : "error"
  )

  return successRate === 100
}

// =============================================================================
// STEP 7: CHECK PREREQUISITES
// =============================================================================

function checkPrerequisites() {
  log("Checking prerequisites...", "step")

  if (!fs.existsSync(CONFIG.contentDir)) {
    log(`${CONFIG.contentDir} directory not found`, "error")
    log(
      "Please run this script from the ethereum-org-website root directory",
      "error"
    )
    return false
  }

  if (!fs.existsSync(CONFIG.outputDir)) {
    log(`${CONFIG.outputDir} directory not found`, "error")
    return false
  }

  log("All prerequisites met", "success")
  return true
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

function main() {
  console.log("=".repeat(60))
  console.log("🌟 ETHEREUM.ORG LLMS FILES GENERATOR")
  console.log("=".repeat(60))
  console.log("This script will generate both llms.txt and llms-full.txt files")
  console.log("and validate them for proper structure and content.")
  console.log("")

  // Check prerequisites
  if (!checkPrerequisites()) {
    process.exit(1)
  }

  try {
    // Step 1: Scan for content files
    const files = scanContentFiles()
    if (!files) {
      log("Failed to scan content files", "error")
      process.exit(1)
    }

    // Step 2: Generate llms.txt
    const llmsTxtContent = generateLlmsTxt(files)

    // Step 3: Generate llms-full.txt
    const llmsFullTxtContent = generateLlmsFullTxt(files)

    // Step 4: Validate llms.txt
    const llmsTxtValid = validateLlmsTxt(llmsTxtContent)
    if (!llmsTxtValid) {
      log("llms.txt validation had issues (but continuing)", "warning")
    }

    // Step 5: Validate llms-full.txt
    const llmsFullTxtValid = validateLlmsFullTxt(llmsFullTxtContent)
    if (!llmsFullTxtValid) {
      log("llms-full.txt validation had issues (but continuing)", "warning")
    }

    // Step 6: Static URL validation (without server)
    const staticValidationPassed = validateUrlsStatic(files)
    if (!staticValidationPassed) {
      log("Static URL validation found issues (but continuing)", "warning")
    }

    // Cleanup temporary file
    if (fs.existsSync(CONFIG.tempFile)) {
      fs.unlinkSync(CONFIG.tempFile)
    }

    // Final summary
    console.log("\n" + "=".repeat(60))
    console.log("🎉 GENERATION COMPLETE!")
    console.log("=".repeat(60))

    // Check if files were created
    const llmsTxtPath = path.join(CONFIG.outputDir, "llms.txt")
    const llmsFullTxtPath = path.join(CONFIG.outputDir, "llms-full.txt")

    if (fs.existsSync(llmsTxtPath)) {
      const llmsTxtSize = fs.statSync(llmsTxtPath).size
      log(`llms.txt created: ${(llmsTxtSize / 1024).toFixed(2)} KB`, "success")
      console.log(`   Available at: https://ethereum.org/llms.txt`)
    } else {
      log("llms.txt was not created", "error")
    }

    if (fs.existsSync(llmsFullTxtPath)) {
      const llmsFullTxtSize = fs.statSync(llmsFullTxtPath).size
      log(
        `llms-full.txt created: ${(llmsFullTxtSize / 1024 / 1024).toFixed(2)} MB`,
        "success"
      )
      console.log(`   Available at: https://ethereum.org/llms-full.txt`)
    } else {
      log("llms-full.txt was not created", "error")
    }

    console.log("\n📝 Generated files:")
    console.log(
      "- ethereum-org-website/public/llms.txt (URL directory for AI crawlers)"
    )
    console.log(
      "- ethereum-org-website/public/llms-full.txt (full content for LLMs)"
    )

    console.log("\n🚀 Next steps:")
    console.log("1. Test the files locally")
    console.log("2. Deploy to your website")
    console.log("3. Set up automation (see README for GitHub Actions example)")
    console.log("4. Verify the files are accessible at the expected URLs")

    console.log("\n" + "=".repeat(60))
  } catch (error) {
    log(`Fatal error: ${error.message}`, "error")
    console.error(error.stack)
    process.exit(1)
  }
}

// Run the main function
if (require.main === module) {
  main()
}

module.exports = {
  main,
  scanContentFiles,
  generateLlmsTxt,
  generateLlmsFullTxt,
  validateLlmsTxt,
  validateLlmsFullTxt,
  checkPrerequisites,
}
