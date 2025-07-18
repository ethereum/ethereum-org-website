import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()

  console.log("Torch webhook", body)

  const webhookId = body.webhookId

  if (webhookId !== Number(process.env.TORCH_WEBHOOK_ID)) {
    return NextResponse.json({ message: "Invalid webhook ID" }, { status: 401 })
  }

  // revalidate the 10 years page
  revalidatePath("/10years")
  console.log("Revalidated 10 years page")

  return NextResponse.json({ message: "OK" })
}
