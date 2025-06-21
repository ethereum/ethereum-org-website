const fs = require("fs")
const path = require("path")

// Configuration
const CONFIG = {
  llmsPath: "public/llms.txt",
  contentDir: "public/content",
  baseUrl: "https://ethereum.org",
}

// Stats tracking
let stats = {
  totalUrls: 0,
  uniqueUrls: 0,
  validFiles: 0,
  missingFiles: 0,
  emptyFiles: 0,
  invalidContent: 0,
  errors: [],
}

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

// Convert URL to expected file path
function urlToFilePath(url) {
  // Example: https://ethereum.org/content/developers/docs/index.md
  // Should map to: public/content/developers/docs/index.md

  if (!url.startsWith(CONFIG.baseUrl + "/content/")) {
    return null
  }

  // Remove base URL to get relative path
  const relativePath = url.replace(CONFIG.baseUrl + "/", "")

  // Build full file path
  const filePath = path.join("public", relativePath)

  return filePath
}

// Validate file exists and has reasonable content
function validateFile(filePath, url) {
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
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      result.error = "File does not exist"
      return result
    }

    result.exists = true

    // Get file stats
    const stats = fs.statSync(filePath)
    result.fileSize = stats.size

    // Check if file is empty
    if (stats.size === 0) {
      result.isEmpty = true
      result.error = "File is empty"
      return result
    }

    // Read and validate content
    const content = fs.readFileSync(filePath, "utf-8")

    // Basic content validation
    if (content.trim().length === 0) {
      result.isEmpty = true
      result.error = "File has no content"
      return result
    }

    // Check for basic markdown structure or content
    const hasContent =
      content.includes("#") || // Headers
      content.includes("##") || // Subheaders
      content.length > 100 || // Reasonable amount of text
      content.includes("---") // Frontmatter

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

// Extract URLs from llms.txt
function extractUrls(llmsContent) {
  // Match markdown links: [text](https://ethereum.org/content/...)
  const urlMatches = llmsContent.match(
    /\[([^\]]+)\]\((https:\/\/ethereum\.org\/content[^)]+)\)/g
  )

  if (!urlMatches) {
    return []
  }

  // Extract just the URLs
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

// Analyze URL patterns and structure
function analyzeUrlStructure(urls) {
  const categories = {}
  const depths = {}
  const extensions = {}

  urls.forEach((url) => {
    // Extract category (first part after /content/)
    const pathParts = url.replace(CONFIG.baseUrl + "/content/", "").split("/")
    const category = pathParts[0]
    categories[category] = (categories[category] || 0) + 1

    // Track depth
    const depth = pathParts.length
    depths[depth] = (depths[depth] || 0) + 1

    // Track file extensions
    const lastPart = pathParts[pathParts.length - 1]
    const ext = path.extname(lastPart) || "no-extension"
    extensions[ext] = (extensions[ext] || 0) + 1
  })

  return { categories, depths, extensions }
}

// Main validation function
async function validateUrls() {
  log("Static URL validation (no server required)", "step")

  // Check if llms.txt exists
  if (!fs.existsSync(CONFIG.llmsPath)) {
    log(`llms.txt not found at: ${CONFIG.llmsPath}`, "error")
    log("Please run generate_all.js first", "error")
    return false
  }

  // Check if content directory exists
  if (!fs.existsSync(CONFIG.contentDir)) {
    log(`Content directory not found: ${CONFIG.contentDir}`, "error")
    return false
  }

  // Read llms.txt
  log(`Reading URLs from ${CONFIG.llmsPath}...`, "info")
  const llmsContent = fs.readFileSync(CONFIG.llmsPath, "utf-8")

  // Extract URLs
  const urls = extractUrls(llmsContent)
  if (urls.length === 0) {
    log("No URLs found in llms.txt", "error")
    return false
  }

  // Remove duplicates
  const uniqueUrls = [...new Set(urls)]

  stats.totalUrls = urls.length
  stats.uniqueUrls = uniqueUrls.length

  log(`Found ${urls.length} total URLs (${uniqueUrls.length} unique)`, "info")

  // Analyze URL structure
  const structure = analyzeUrlStructure(uniqueUrls)
  log("URL structure analysis:", "info")
  console.log("  Categories:", Object.keys(structure.categories).length)
  console.log("  Most common categories:")
  Object.entries(structure.categories)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .forEach(([cat, count]) => console.log(`    ${cat}: ${count} URLs`))

  console.log("  File extensions:")
  Object.entries(structure.extensions)
    .sort(([, a], [, b]) => b - a)
    .forEach(([ext, count]) => console.log(`    ${ext}: ${count} files`))

  // Validate each URL
  log("Validating file existence and content...", "step")

  const batchSize = 50
  const batches = []
  for (let i = 0; i < uniqueUrls.length; i += batchSize) {
    batches.push(uniqueUrls.slice(i, i + batchSize))
  }

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex]
    console.log(
      `\n🔄 Validating batch ${batchIndex + 1}/${batches.length} (${batch.length} URLs)...`
    )

    let batchValid = 0
    let batchInvalid = 0

    batch.forEach((url) => {
      const filePath = urlToFilePath(url)

      if (!filePath) {
        stats.errors.push({
          url: url,
          error: "Could not map URL to file path",
          type: "mapping",
        })
        batchInvalid++
        console.log(`❌ ${url} - Cannot map to file path`)
        return
      }

      const validation = validateFile(filePath, url)

      if (validation.exists && validation.hasValidContent) {
        stats.validFiles++
        batchValid++
        console.log(`✅ ${url} (${(validation.fileSize / 1024).toFixed(1)}KB)`)
      } else {
        batchInvalid++

        if (!validation.exists) {
          stats.missingFiles++
          console.log(`❌ ${url} - File missing: ${validation.filePath}`)
        } else if (validation.isEmpty) {
          stats.emptyFiles++
          console.log(`⚠️  ${url} - Empty file: ${validation.filePath}`)
        } else {
          stats.invalidContent++
          console.log(`⚠️  ${url} - Invalid content: ${validation.error}`)
        }

        stats.errors.push({
          url: url,
          filePath: validation.filePath,
          error: validation.error,
          type: validation.exists ? "content" : "missing",
        })
      }
    })

    console.log(`   Batch result: ${batchValid} ✅ | ${batchInvalid} ❌`)
  }

  return true
}

// Generate detailed report
function generateReport() {
  console.log("\n" + "=".repeat(60))
  console.log("📊 STATIC VALIDATION RESULTS")
  console.log("=".repeat(60))
  console.log(`Total URLs: ${stats.totalUrls}`)
  console.log(`Unique URLs: ${stats.uniqueUrls}`)
  console.log(
    `✅ Valid files: ${stats.validFiles} (${((stats.validFiles / stats.uniqueUrls) * 100).toFixed(1)}%)`
  )
  console.log(`❌ Missing files: ${stats.missingFiles}`)
  console.log(`⚠️  Empty files: ${stats.emptyFiles}`)
  console.log(`⚠️  Invalid content: ${stats.invalidContent}`)

  if (stats.errors.length > 0) {
    console.log("\n🔍 ISSUES FOUND:")

    const missingFiles = stats.errors.filter((e) => e.type === "missing")
    const contentIssues = stats.errors.filter((e) => e.type === "content")
    const mappingIssues = stats.errors.filter((e) => e.type === "mapping")

    if (missingFiles.length > 0) {
      console.log(`\n📁 Missing Files (${missingFiles.length}):`)
      missingFiles.slice(0, 10).forEach((error, index) => {
        console.log(`${index + 1}. ${error.url}`)
        console.log(`   Expected: ${error.filePath}`)
      })
      if (missingFiles.length > 10) {
        console.log(`   ... and ${missingFiles.length - 10} more`)
      }
    }

    if (contentIssues.length > 0) {
      console.log(`\n📝 Content Issues (${contentIssues.length}):`)
      contentIssues.slice(0, 5).forEach((error, index) => {
        console.log(`${index + 1}. ${error.url}`)
        console.log(`   Issue: ${error.error}`)
      })
      if (contentIssues.length > 5) {
        console.log(`   ... and ${contentIssues.length - 5} more`)
      }
    }

    if (mappingIssues.length > 0) {
      console.log(`\n🔗 URL Mapping Issues (${mappingIssues.length}):`)
      mappingIssues.forEach((error, index) => {
        console.log(`${index + 1}. ${error.url} - ${error.error}`)
      })
    }
  }

  console.log("\n🎯 SUMMARY:")
  const successRate = (stats.validFiles / stats.uniqueUrls) * 100

  if (stats.errors.length === 0) {
    console.log("🎉 ALL URLS ARE STATICALLY VALID!")
    console.log("✅ All referenced files exist and have valid content.")
    console.log(
      "💡 Run the live test (test_urls_live.js) to verify server behavior."
    )
  } else {
    console.log(
      `❌ VALIDATION FAILED (${successRate.toFixed(1)}% success rate)`
    )
    console.log("🚨 Issues found - all URLs must be 100% valid.")
    console.log("🔧 Fix the issues above before proceeding.")
  }

  console.log("\n💡 NEXT STEPS:")
  if (stats.errors.length === 0) {
    console.log(
      "1. Run test_urls_live.js with dev server for final verification"
    )
    console.log("2. Deploy the generated files to production")
    console.log("3. Verify accessibility at the live URLs")
  } else {
    console.log("1. Fix any missing or problematic files identified above")
    console.log("2. Re-run this static validation to confirm fixes")
    console.log(
      "3. Run test_urls_live.js with dev server for final verification"
    )
    console.log("4. All URLs must be 100% valid - no exceptions")
  }

  console.log("\n" + "=".repeat(60))

  return successRate === 100
}

// Main execution
async function main() {
  console.log("=".repeat(60))
  console.log("🔍 ETHEREUM.ORG LLMS STATIC URL VALIDATION")
  console.log("=".repeat(60))
  console.log(
    "This script validates URLs from llms.txt without requiring a running server"
  )
  console.log(
    "It checks file existence, content validity, and URL-to-file mapping"
  )
  console.log("")

  try {
    const success = await validateUrls()
    if (!success) {
      process.exit(1)
    }

    const allValid = generateReport()
    process.exit(allValid ? 0 : 1)
  } catch (error) {
    log(`Fatal error: ${error.message}`, "error")
    console.error(error.stack)
    process.exit(1)
  }
}

// Handle uncaught errors
process.on("unhandledRejection", (error) => {
  log(`Unhandled error: ${error.message}`, "error")
  process.exit(1)
})

// Run the script
if (require.main === module) {
  main()
}

module.exports = {
  main,
  validateUrls,
  generateReport,
  urlToFilePath,
  validateFile,
}
