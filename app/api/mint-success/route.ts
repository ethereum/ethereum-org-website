import { NextRequest, NextResponse } from "next/server"
import { isAddress, isHash } from "viem"

import {
  incrementMintRate,
  isMintWindowOpen,
  markWalletAsMinted,
  removeFromQueue,
} from "@/lib/redis"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { wallet, transactionHash } = body

    // Validate request
    if (!wallet || typeof wallet !== "string") {
      return NextResponse.json(
        { error: "Invalid wallet address" },
        { status: 400 }
      )
    }

    if (!transactionHash || typeof transactionHash !== "string") {
      return NextResponse.json(
        { error: "Invalid transaction hash" },
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

    // Validate transaction hash format
    if (!isHash(transactionHash)) {
      return NextResponse.json(
        { error: "Invalid transaction hash format" },
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

    // Record the successful mint
    await markWalletAsMinted(wallet)

    // Increment the mint rate counter for dynamic queue calculation
    await incrementMintRate()

    // Remove wallet from queue if it was queued
    await removeFromQueue(wallet)

    return NextResponse.json({
      success: true,
      message: "Mint recorded successfully",
    })
  } catch (error) {
    console.error("Error in mint-success:", error)
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
