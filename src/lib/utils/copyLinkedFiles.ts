import fs from "fs"

// In NextJS, static assets needs to be inside /public to be accesed with a relative path
// This utility copies local linked files (images, .pdf, etc) in markdown file to public/_static to allow it
export const copyLinkedFiles = (path: string) => {
  const prefixLength = "src/content/".length
  // Generate its own subdir for each asset (keeping original structure) to avoid filename clashing
  const copyLinkedFilesDir = `${process.cwd()}/public/_static/${path
    .substring(prefixLength) // Removes `src/content/` prefix
    .split("/")
    .slice(0, -1)
    .join("/")}`

  if (!fs.existsSync(copyLinkedFilesDir)) {
    fs.mkdirSync(copyLinkedFilesDir, { recursive: true })
  }

  // Copy assets to /public/_static dir
  const fileName = path.split("/").slice(-1).join("/")

  if (!fs.existsSync(`${copyLinkedFilesDir}/${fileName}`)) {
    fs.copyFileSync(`${path}`, `${copyLinkedFilesDir}/${fileName}`)
  }

  return `${copyLinkedFilesDir}/${fileName}`
}

// 1) fixear link a pdf, es: /whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf
// // deberia ser: _static/whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf

// 2) fix fonts local next

// =====
// 3) usar NextImage component (import local image)
// 4) layout component (nav, footer)
// 5) pr review -next
