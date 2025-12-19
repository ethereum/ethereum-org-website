import { NextRequest, NextResponse } from "next/server"

const isBuildTime =
  process.env.NETLIFY &&
  process.env.CONTEXT === "production" &&
  !process.env.DEPLOY_URL

export async function POST(req: NextRequest) {
  // ⛔ Byggtid: stoppa direkt
  if (isBuildTime) {
    return NextResponse.json(
      { message: "Revalidation unavailable during build" },
      { status: 503 }
    )
  }

  const body = await req.json()
  const webhookId = body?.webhookId

  if (webhookId !== process.env.TORCH_WEBHOOK_ID) {
    return NextResponse.json({ message: "Invalid webhook ID" }, { status: 401 })
  }

  // ⚠️ Dynamisk import – ingen IncrementalCache under build
  const { revalidatePath } = await import("next/cache")
  revalidatePath("/en/10years/")

  return NextResponse.json({ message: "OK" })
}
