import localFont from "next/font/local"

// downloaded from https://fonts.google.com/specimen/IBM+Plex+Mono
export const mono = localFont({
  src: "../fonts/IBMPlexMono-Regular.ttf",
  display: "swap",
  weight: "400",
  fallback: ["Courier", "monospace"],
  preload: false,
})
