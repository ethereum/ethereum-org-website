import { NextRequest, NextResponse } from "next/server"
import { isAddress } from "viem"

import {
  checkMintEligibility,
  cleanupExpiredQueue,
  cleanupStaleQueue,
  isMintWindowOpen,
} from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { wallet } = body

    // Validate request
    if (!wallet || typeof wallet !== "string") {
      return NextResponse.json(
        { error: "Invalid wallet address" },
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

    // Check eligibility and get queue status
    const status = await checkMintEligibility(wallet)

    if (!status.mintAllowed && !status.estimatedTime) {
      // Wallet has already minted
      return NextResponse.json(
        { error: "This wallet has already minted" },
        { status: 403 }
      )
    }

    return NextResponse.json({
      mintAllowed: status.mintAllowed,
      estimatedTime: status.estimatedTime,
      delaySeconds: status.delaySeconds,
      queuePosition: status.queuePosition,
    })
  } catch (error) {
    console.error("Error in request-mint:", error)
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
