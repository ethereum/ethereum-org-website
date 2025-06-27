#!/usr/bin/env node

/**
 * LLMS Validation Unit Test
 *
 * This script validates that llms.txt and llms-full.txt files are correctly generated
 * and all referenced URLs map to valid files. Designed for CI/CD environments.
 *
 * Usage: node test_llms_validation.js
 * Exit codes: 0 = success, 1 = failure
 */

const fs = require("fs")
const path = require("path")

// Configuration
const CONFIG = {
  baseUrl: "https://ethereum.org",
  contentDir: "public/content",
  outputDir: "public",
  llmsFile: "public/llms.txt",
  llmsFullFile: "public/llms-full.txt",
}

// Test results tracking
let testResults = {
  passed: 0,
  failed: 0,
  errors: [],
}

function log(message, type = "info") {
  const prefix = {
    info: "📝",
    success: "✅",
    error: "❌",
    warning: "⚠️",
    test: "🧪",
  }
  console.log(`${prefix[type]} ${message}`)
}

function assert(condition, message, details = null) {
  if (condition) {
    testResults.passed++
    log(`PASS: ${message}`, "success")
  } else {
    testResults.failed++
    log(`FAIL: ${message}`, "error")
    if (details) {
      console.log(`   Details: ${details}`)
    }
    testResults.errors.push({ message, details })
  }
}

// Test 1: Check if required files exist
function testFilesExist() {
  log("Test 1: Checking if LLMS files exist", "test")

  assert(
    fs.existsSync(CONFIG.llmsFile),
    "llms.txt file exists",
    `Expected: ${CONFIG.llmsFile}`
  )

  assert(
    fs.existsSync(CONFIG.llmsFullFile),
    "llms-full.txt file exists",
    `Expected: ${CONFIG.llmsFullFile}`
  )

  assert(
    fs.existsSync(CONFIG.contentDir),
    "Content directory exists",
    `Expected: ${CONFIG.contentDir}`
  )
}

// Test 2: Validate llms.txt structure and content
function testLlmsTxtStructure() {
  log("Test 2: Validating llms.txt structure", "test")

  if (!fs.existsSync(CONFIG.llmsFile)) {
    assert(false, "llms.txt structure validation", "File does not exist")
    return
  }

  const content = fs.readFileSync(CONFIG.llmsFile, "utf-8")

  assert(
    content.startsWith("# Ethereum.org Documentation"),
    "llms.txt has correct title",
    'Should start with "# Ethereum.org Documentation"'
  )

  assert(
    content.includes("## Overview"),
    "llms.txt has Overview section",
    'Should contain "## Overview" section'
  )

  assert(
    content.includes("This document was rendered at"),
    "llms.txt has timestamp footer",
    "Should contain generation timestamp"
  )

  assert(
    !content.includes("https://ethereum.org/https://"),
    "llms.txt has no double domain URLs",
    "URLs should not contain double domains"
  )

  const lines = content.split("\n")
  assert(
    lines.length > 100,
    "llms.txt has reasonable content length",
    `Should have >100 lines, got ${lines.length}`
  )

  const linkCount = (
    content.match(/\]\(https:\/\/ethereum\.org\/content/g) || []
  ).length
  assert(
    linkCount > 50,
    "llms.txt has sufficient links",
    `Should have >50 content links, got ${linkCount}`
  )
}

// Test 3: Validate llms-full.txt structure and content
function testLlmsFullTxtStructure() {
  log("Test 3: Validating llms-full.txt structure", "test")

  if (!fs.existsSync(CONFIG.llmsFullFile)) {
    assert(false, "llms-full.txt structure validation", "File does not exist")
    return
  }

  const content = fs.readFileSync(CONFIG.llmsFullFile, "utf-8")
  const fileSize = Buffer.byteLength(content, "utf-8")
  const wordCount = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  assert(
    content.startsWith("# Ethereum.org Documentation (Full Content)"),
    "llms-full.txt has correct title",
    "Should start with full content title"
  )

  assert(
    content.includes("> Ethereum.org is the official documentation"),
    "llms-full.txt has description blockquote",
    "Should contain description blockquote"
  )

  assert(
    wordCount > 50000,
    "llms-full.txt has substantial content",
    `Should have >50k words, got ${wordCount.toLocaleString()}`
  )

  assert(
    fileSize < 10 * 1024 * 1024,
    "llms-full.txt size is reasonable",
    `Should be <10MB, got ${(fileSize / 1024 / 1024).toFixed(2)}MB`
  )

  assert(
    content.includes("This llms-full.txt file was generated at"),
    "llms-full.txt has generation timestamp",
    "Should contain generation timestamp"
  )

  // Check for key Ethereum terms
  const ethereumMentions = (content.match(/ethereum/gi) || []).length
  assert(
    ethereumMentions > 500,
    "llms-full.txt mentions Ethereum frequently",
    `Should mention "Ethereum" >500 times, got ${ethereumMentions}`
  )
}

// Test 4: Validate URL to file mapping
function testUrlToFileMapping() {
  log("Test 4: Validating URL to file mapping", "test")

  if (!fs.existsSync(CONFIG.llmsFile)) {
    assert(false, "URL to file mapping validation", "llms.txt does not exist")
    return
  }

  const llmsContent = fs.readFileSync(CONFIG.llmsFile, "utf-8")
  const urlMatches = llmsContent.match(
    /\[([^\]]+)\]\((https:\/\/ethereum\.org\/content[^)]+)\)/g
  )

  if (!urlMatches) {
    assert(false, "URL extraction from llms.txt", "No URLs found")
    return
  }

  const urls = urlMatches
    .map((match) => {
      const urlMatch = match.match(
        /\((https:\/\/ethereum\.org\/content[^)]+)\)/
      )
      return urlMatch ? urlMatch[1] : null
    })
    .filter(Boolean)

  const uniqueUrls = [...new Set(urls)]

  assert(
    uniqueUrls.length > 50,
    "Sufficient unique URLs extracted",
    `Should have >50 unique URLs, got ${uniqueUrls.length}`
  )

  // Test a sample of URLs for file existence
  let validCount = 0
  let invalidCount = 0
  const sampleSize = Math.min(uniqueUrls.length, 20) // Test up to 20 URLs for speed
  const sampleUrls = uniqueUrls.slice(0, sampleSize)

  sampleUrls.forEach((url) => {
    if (!url.startsWith(CONFIG.baseUrl + "/content/")) {
      invalidCount++
      return
    }

    const relativePath = url.replace(CONFIG.baseUrl + "/", "")
    const filePath = path.join("public", relativePath)

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath)
      if (stats.size > 0) {
        validCount++
      } else {
        invalidCount++
      }
    } else {
      invalidCount++
    }
  })

  assert(
    invalidCount === 0,
    "All sampled URLs map to valid files",
    `Tested ${sampleSize} URLs: ${validCount} valid, ${invalidCount} invalid`
  )
}

// Test 5: Check file freshness (optional - for CI environments)
function testFileFreshness() {
  log("Test 5: Checking file freshness", "test")

  if (!fs.existsSync(CONFIG.llmsFile)) {
    assert(false, "File freshness check", "llms.txt does not exist")
    return
  }

  const llmsStats = fs.statSync(CONFIG.llmsFile)
  const ageInMinutes = (Date.now() - llmsStats.mtime.getTime()) / (1000 * 60)

  // In CI, files should be freshly generated (within last 10 minutes)
  // In local development, we're more lenient (within last 24 hours)
  const maxAgeMinutes = process.env.CI ? 10 : 1440 // 10 min in CI, 24 hours locally

  assert(
    ageInMinutes <= maxAgeMinutes,
    "LLMS files are fresh",
    `llms.txt is ${ageInMinutes.toFixed(1)} minutes old, max allowed: ${maxAgeMinutes}`
  )
}

// Test 6: Content consistency between files
function testContentConsistency() {
  log("Test 6: Testing content consistency", "test")

  if (!fs.existsSync(CONFIG.llmsFile) || !fs.existsSync(CONFIG.llmsFullFile)) {
    assert(false, "Content consistency check", "Required files do not exist")
    return
  }

  const llmsContent = fs.readFileSync(CONFIG.llmsFile, "utf-8")
  const llmsFullContent = fs.readFileSync(CONFIG.llmsFullFile, "utf-8")

  // Both should have similar generation timestamps (within 5 minutes)
  const llmsTimestamp = llmsContent.match(
    /This document was rendered at ([^.]+)/
  )
  const llmsFullTimestamp = llmsFullContent.match(
    /This llms-full\.txt file was generated at ([^.]+)/
  )

  if (llmsTimestamp && llmsFullTimestamp) {
    const llmsTime = new Date(llmsTimestamp[1])
    const llmsFullTime = new Date(llmsFullTimestamp[1])
    const timeDiff =
      Math.abs(llmsTime.getTime() - llmsFullTime.getTime()) / (1000 * 60) // minutes

    assert(
      timeDiff <= 5,
      "Files have consistent generation times",
      `Time difference: ${timeDiff.toFixed(1)} minutes`
    )
  }

  // Both should reference the same base content
  const llmsUrlCount = (
    llmsContent.match(/https:\/\/ethereum\.org\/content/g) || []
  ).length
  const bothMentionEthereum =
    llmsContent.includes("Ethereum") && llmsFullContent.includes("Ethereum")

  assert(
    bothMentionEthereum,
    "Both files mention Ethereum",
    "Both files should contain Ethereum content"
  )

  assert(
    llmsUrlCount > 0,
    "llms.txt contains content URLs",
    `Should have content URLs, got ${llmsUrlCount}`
  )
}

// Main test runner
function runAllTests() {
  console.log("🧪 ETHEREUM.ORG LLMS VALIDATION TESTS")
  console.log("=".repeat(50))
  console.log("")

  try {
    testFilesExist()
    testLlmsTxtStructure()
    testLlmsFullTxtStructure()
    testUrlToFileMapping()
    testFileFreshness()
    testContentConsistency()
  } catch (error) {
    log(`Unexpected error during tests: ${error.message}`, "error")
    testResults.failed++
    testResults.errors.push({
      message: "Unexpected error",
      details: error.message,
    })
  }
}

// Generate test report
function generateReport() {
  console.log("\n" + "=".repeat(50))
  console.log("📊 TEST RESULTS")
  console.log("=".repeat(50))

  const total = testResults.passed + testResults.failed
  const successRate = total > 0 ? (testResults.passed / total) * 100 : 0

  console.log(`Total tests: ${total}`)
  console.log(`✅ Passed: ${testResults.passed}`)
  console.log(`❌ Failed: ${testResults.failed}`)
  console.log(`Success rate: ${successRate.toFixed(1)}%`)

  if (testResults.failed > 0) {
    console.log("\n🔍 FAILED TESTS:")
    testResults.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.message}`)
      if (error.details) {
        console.log(`   ${error.details}`)
      }
    })
  }

  console.log("\n🎯 SUMMARY:")
  if (testResults.failed === 0) {
    console.log("🎉 ALL TESTS PASSED!")
    console.log("✅ LLMS files are valid and ready for deployment.")
  } else {
    console.log("❌ TESTS FAILED!")
    console.log("🚨 Fix the issues above before proceeding.")
  }

  console.log("\n" + "=".repeat(50))

  return testResults.failed === 0
}

// Main execution
function main() {
  // Change to project root if we're in the scripts directory
  if (process.cwd().includes("/scripts")) {
    process.chdir("..")
  }

  runAllTests()
  const success = generateReport()

  process.exit(success ? 0 : 1)
}

// Handle uncaught errors
process.on("unhandledRejection", (error) => {
  log(`Unhandled error: ${error.message}`, "error")
  process.exit(1)
})

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = {
  runAllTests,
  generateReport,
  testResults,
}
