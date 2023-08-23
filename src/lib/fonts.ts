import { Inter } from "next/font/google"
import { IBM_Plex_Mono } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  fallback: ["sans-serif"],
})

export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  fallback: ["Courier", "monospace"],
})
