import { ReactNode } from "react"

import "@/styles/global.css"

type Props = {
  children: ReactNode
}

// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children
}
