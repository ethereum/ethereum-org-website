/**
 * ETH glyph guidance for prompts: a shape spec appended to the prompt plus a rendered
 * reference of the canonical glyph, attached as the last reference image.
 * Image models reliably get this shape wrong (one solid rhombus, bridged gap, extra
 * facets), so the spec states the geometry instead of trusting "Ethereum logo".
 */

import { readFileSync } from "node:fs"
import sharp from "sharp"

// Geometry source only: the reference is rendered as outlines so the model copies shape, not fills.
const GLYPH_SVG = "src/components/icons/eth-home-icon.svg"

export type GlyphMode = "auto" | "on" | "off"

const MENTIONS = /\b(ethereum|eth)\b|glyph|diamond/i

export const wantsGlyph = (mode: GlyphMode, prompt: string) =>
  mode === "on" || (mode === "auto" && MENTIONS.test(prompt))

export const GLYPH_SPEC = `Ethereum diamond (ETH glyph): wherever one appears (on a building, coin, screen, document, sign, floor or floating), copy its shape exactly from the last reference image, which shows the canonical glyph as outlines on white. Its colors may change to suit the scene; its shape may not.
- It is two separate pieces stacked vertically with an open gap between them, where the background shows through. Never one solid rhombus or octahedron, and nothing bridges the gap: no line, fill, outline or highlight crosses it.
- Upper piece, a tall kite: a sharp top point; left and right corners at the widest point, about halfway down the whole glyph; a bottom point about two-thirds of the way down. A vertical center line runs from the top point to the bottom point, and a line from each side corner rises to meet that center line about a third of the way down the glyph, well above the corners. That makes exactly four triangular facets: two tall ones above, two shorter ones below.
- Lower piece, a downward chevron: its top edge is a shallow V that runs parallel to the upper piece's bottom edges, its outer tips sit just below the upper piece's side corners, and its sides converge to a sharp bottom point. A vertical center line splits it into exactly two facets.
- Both pieces are the same width. The whole glyph is about 1.6 times as tall as it is wide, symmetric left to right, and upright unless it lies on a surface; on a tilted or foreshortened surface it follows that surface's perspective while keeping the same two pieces, six facets and open gap.
- Each facet is a flat fill inside a thin outline, with neighboring facets in contrasting tints so the structure reads. No extra facets, inner lattice, nodes, glow or highlight lines inside it.
- Draw every glyph large enough that both pieces and the gap are clearly visible. On something too small for that (a tiny coin or badge), leave the glyph off instead of drawing a smudge.`

/** Canonical glyph as unfilled outlines on white. Strokes are thickened so facet lines and the gap survive downscaling. */
export const renderGlyphRef = async (size = 1024) => {
  const svg = readFileSync(GLYPH_SVG, "utf8")
    .replace(/strokeLinejoin/g, "stroke-linejoin")
    .replace(/fill="#[0-9a-f]{6}"/gi, 'fill="none"')
    .replace(/<svg[^>]*>/, (tag) =>
      tag
        .replace(/\s(width|height|class)="[^"]*"/g, "")
        .replace(">", ' width="460" height="728" stroke-width="2.2">')
    )
  const glyph = await sharp(Buffer.from(svg)).png().toBuffer()
  const meta = await sharp(glyph).metadata()
  const h = Math.round(size * 0.8)
  const resized = await sharp(glyph)
    .resize({ height: h, width: Math.round((h * meta.width!) / meta.height!) })
    .toBuffer()
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: "#ffffff",
    },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer()
}
