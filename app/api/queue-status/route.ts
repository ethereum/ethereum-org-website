import { NextRequest, NextResponse } from "next/server"
import { isAddress } from "viem"

import {
  checkMintEligibility,
  cleanupExpiredQueue,
  cleanupStaleQueue,
  isMintWindowOpen,
} from "@/lib/redis"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const wallet = searchParams.get("wallet")

    // Validate request
    if (!wallet || typeof wallet !== "string") {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      )
    }

    // Validate ethereum address format
    if (!isAddress(wallet)) {
      return NextResponse.json(
        { error: "Invalid Ethereum address format" },
        { status: 400 }
      )
    }

    // Check if mint window is open
    if (!isMintWindowOpen()) {
      return NextResponse.json(
        { error: "Minting window is not open" },
        { status: 403 }
      )
    }

    // Clean up expired and stale queue entries
    await cleanupExpiredQueue()
    await cleanupStaleQueue()

    // Check current status
    const status = await checkMintEligibility(wallet)

    return NextResponse.json({
      mintAllowed: status.mintAllowed,
      estimatedTime: status.estimatedTime,
      delaySeconds: status.delaySeconds,
      queuePosition: status.queuePosition,
      currentTime: Math.floor(Date.now() / 1000),
    })
  } catch (error) {
    console.error("Error in queue-status:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 })
}
