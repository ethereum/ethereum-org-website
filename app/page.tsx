import { redirect } from "next/navigation"

import { DEFAULT_LOCALE } from "@/lib/constants"

export default function RedirectPage() {
  redirect(DEFAULT_LOCALE)
}
