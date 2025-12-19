import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // Skip during build time - revalidation only works at runtime
  if (
    process.env.NETLIFY &&
    process.env.CONTEXT === "production" &&
    !process.env.DEPLOY_URL
  ) {
    return NextResponse.json(
      { message: "Revalidation unavailable during build" },
      { status: 503 }
    )
  }

  const body = await req.json()

  console.log("Torch webhook", body)

  const webhookId = body.webhookId

  if (webhookId !== process.env.TORCH_WEBHOOK_ID) {
    return NextResponse.json({ message: "Invalid webhook ID" }, { status: 401 })
  }

  revalidatePath("/en/10years/")

  return NextResponse.json({ message: "OK" })
}
