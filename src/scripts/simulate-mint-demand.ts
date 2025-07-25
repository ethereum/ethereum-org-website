#!/usr/bin/env ts-node
import { privateKeyToAccount } from "viem/accounts"
import { generatePrivateKey } from "viem/accounts"

interface MintResponse {
  mintAllowed?: boolean
  estimatedTime?: number
  delaySeconds?: number
  queuePosition?: number
  error?: string
}

interface TestConfig {
  name: string
  concurrentUsers: number
  requestsPerUser: number
  delayBetweenRequests: number // ms
  description: string
}

interface RequestResult {
  wallet: string
  status: number
  response: MintResponse
  responseTime: number
  timestamp: number
}

const LOCALHOST_URL = "http://localhost:3000/api/request-mint"

// Test scenarios
const TEST_SCENARIOS: Record<string, TestConfig> = {
  low: {
    name: "Low Demand",
    concurrentUsers: 5,
    requestsPerUser: 3,
    delayBetweenRequests: 2000,
    description:
      "Simulates normal traffic with 5 users making 3 requests each with 2s delays",
  },
  medium: {
    name: "Medium Demand",
    concurrentUsers: 25,
    requestsPerUser: 5,
    delayBetweenRequests: 1000,
    description:
      "Simulates moderate traffic with 25 users making 5 requests each with 1s delays",
  },
  high: {
    name: "High Demand",
    concurrentUsers: 200,
    requestsPerUser: 3,
    delayBetweenRequests: 5000,
    description:
      "Simulates heavy traffic with 200 users making 3 requests each with 5s delays",
  },
  burst: {
    name: "Burst Traffic",
    concurrentUsers: 200,
    requestsPerUser: 1,
    delayBetweenRequests: 0,
    description: "Simulates burst traffic with 200 simultaneous requests",
  },
}

/**
 * Generate a unique Ethereum address
 */
function generateEthereumAddress(): string {
  const privateKey = generatePrivateKey()
  const account = privateKeyToAccount(privateKey)
  return account.address
}

/**
 * Make a single request to the mint endpoint
 */
async function makeMintRequest(wallet: string): Promise<RequestResult> {
  const startTime = Date.now()

  try {
    const response = await fetch(LOCALHOST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wallet }),
    })

    const responseData = (await response.json()) as MintResponse
    const responseTime = Date.now() - startTime

    return {
      wallet,
      status: response.status,
      response: responseData,
      responseTime,
      timestamp: Date.now(),
    }
  } catch (error) {
    const responseTime = Date.now() - startTime
    return {
      wallet,
      status: 0,
      response: {
        error: `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      responseTime,
      timestamp: Date.now(),
    }
  }
}

/**
 * Simulate a single user making multiple requests
 */
async function simulateUser(
  userId: number,
  config: TestConfig,
  results: RequestResult[]
): Promise<void> {
  console.log(`🚀 User ${userId} started`)

  for (let i = 0; i < config.requestsPerUser; i++) {
    const wallet = generateEthereumAddress()
    const result = await makeMintRequest(wallet)

    results.push(result)

    // Log individual request result
    const statusIcon =
      result.status === 200 ? "✅" : result.status === 403 ? "⚠️" : "❌"
    console.log(
      `${statusIcon} User ${userId}.${i + 1}: ${result.status} | ${result.responseTime}ms | ${
        result.response.error ||
        (result.response.mintAllowed
          ? "Mint allowed"
          : `Queue pos: ${result.response.queuePosition}`)
      }`
    )

    // Delay between requests (except for last request)
    if (i < config.requestsPerUser - 1 && config.delayBetweenRequests > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, config.delayBetweenRequests)
      )
    }
  }

  console.log(`✅ User ${userId} completed`)
}

/**
 * Analyze and display test results
 */
function analyzeResults(results: RequestResult[], config: TestConfig): void {
  console.log("\n" + "=".repeat(60))
  console.log(`📊 RESULTS ANALYSIS - ${config.name}`)
  console.log("=".repeat(60))

  const totalRequests = results.length
  const successfulRequests = results.filter((r) => r.status === 200).length
  const errorRequests = results.filter((r) => r.status >= 400).length
  const networkErrors = results.filter((r) => r.status === 0).length

  // Response time statistics
  const responseTimes = results.map((r) => r.responseTime)
  const avgResponseTime =
    responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
  const minResponseTime = Math.min(...responseTimes)
  const maxResponseTime = Math.max(...responseTimes)
  responseTimes.sort((a, b) => a - b)
  const p95ResponseTime = responseTimes[Math.floor(responseTimes.length * 0.95)]

  // Status code breakdown
  const statusCodes = results.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1
      return acc
    },
    {} as Record<number, number>
  )

  // Queue statistics
  const queuedResponses = results.filter(
    (r) => r.response.queuePosition !== undefined
  )
  const avgQueuePosition =
    queuedResponses.length > 0
      ? queuedResponses.reduce(
          (sum, r) => sum + (r.response.queuePosition || 0),
          0
        ) / queuedResponses.length
      : 0

  console.log(`📈 Total Requests: ${totalRequests}`)
  console.log(
    `✅ Successful (200): ${successfulRequests} (${((successfulRequests / totalRequests) * 100).toFixed(1)}%)`
  )
  console.log(
    `⚠️  Client/Server Errors (4xx/5xx): ${errorRequests} (${((errorRequests / totalRequests) * 100).toFixed(1)}%)`
  )
  console.log(
    `❌ Network Errors: ${networkErrors} (${((networkErrors / totalRequests) * 100).toFixed(1)}%)`
  )

  console.log(`\n⏱️  Response Time Statistics:`)
  console.log(`   Average: ${avgResponseTime.toFixed(1)}ms`)
  console.log(`   Min: ${minResponseTime}ms`)
  console.log(`   Max: ${maxResponseTime}ms`)
  console.log(`   95th percentile: ${p95ResponseTime}ms`)

  console.log(`\n📊 Status Code Breakdown:`)
  Object.entries(statusCodes).forEach(([status, count]) => {
    console.log(`   ${status}: ${count} requests`)
  })

  if (queuedResponses.length > 0) {
    console.log(`\n🔄 Queue Statistics:`)
    console.log(`   Queued responses: ${queuedResponses.length}`)
    console.log(`   Average queue position: ${avgQueuePosition.toFixed(1)}`)
  }

  // Sample error messages
  const errors = results.filter((r) => r.response.error).slice(0, 5)
  if (errors.length > 0) {
    console.log(`\n⚠️  Sample Error Messages:`)
    errors.forEach((error, i) => {
      console.log(`   ${i + 1}. ${error.response.error}`)
    })
  }

  console.log("=".repeat(60))
}

/**
 * Main simulation function
 */
async function runSimulation(scenario: string): Promise<void> {
  const config = TEST_SCENARIOS[scenario]
  if (!config) {
    console.error(`❌ Unknown scenario: ${scenario}`)
    console.log(
      `Available scenarios: ${Object.keys(TEST_SCENARIOS).join(", ")}`
    )
    return
  }

  console.log(`🎯 Starting ${config.name} simulation`)
  console.log(`📝 ${config.description}`)
  console.log(`👥 Concurrent users: ${config.concurrentUsers}`)
  console.log(`📊 Requests per user: ${config.requestsPerUser}`)
  console.log(`⏰ Delay between requests: ${config.delayBetweenRequests}ms`)
  console.log(
    `🎲 Total requests: ${config.concurrentUsers * config.requestsPerUser}`
  )
  console.log(`🌐 Target: ${LOCALHOST_URL}`)
  console.log("-".repeat(60))

  const results: RequestResult[] = []
  const startTime = Date.now()

  // Create promises for all users
  const userPromises = Array.from({ length: config.concurrentUsers }, (_, i) =>
    simulateUser(i + 1, config, results)
  )

  // Wait for all users to complete
  await Promise.all(userPromises)

  const totalTime = Date.now() - startTime
  console.log(`\n⏱️  Total simulation time: ${(totalTime / 1000).toFixed(2)}s`)

  // Analyze results
  analyzeResults(results, config)
}

/**
 * CLI interface
 */
async function main(): Promise<void> {
  const scenario = process.argv[2] || "low"

  console.log("🔥 Ethereum.org NFT Mint Load Testing Tool")
  console.log("==========================================\n")

  if (scenario === "--help" || scenario === "-h") {
    console.log("Usage: ts-node src/scripts/simulate-mint-demand.ts [scenario]")
    console.log("\nAvailable scenarios:")
    Object.entries(TEST_SCENARIOS).forEach(([key, config]) => {
      console.log(`  ${key.padEnd(8)} - ${config.description}`)
    })
    console.log("\nExample:")
    console.log("  ts-node src/scripts/simulate-mint-demand.ts medium")
    return
  }

  try {
    await runSimulation(scenario)
  } catch (error) {
    console.error("❌ Simulation failed:", error)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main()
}
