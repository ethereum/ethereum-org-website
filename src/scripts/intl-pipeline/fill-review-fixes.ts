/**
 * TEMPORARY one-off (throwaway branch only).
 *
 * Fixes two review-flagged criticals that need actual translation:
 *  A. Single-word Card titles the attr pass skips (isTranslatableValue rejects
 *     single words to protect brand names) -> force-translate the known ones.
 *  B. ta cross-script contamination (Bengali words leaked into Tamil prose) ->
 *     full re-translate the 2 affected files.
 *
 * Requires GEMINI_API_KEY (+ GITHUB_API_TOKEN for config import).
 */
import * as fs from "fs"

import { GLOSSARY_API_URL } from "./config"
import { translateFile } from "./lib/llm/gemini"
import {
  extractAttributeLeaves,
  translateJsxAttributes,
  type AttributeLeaf,
} from "./lib/llm/jsx-attribute-translator"

const LANGS = [
  "ar", "bn", "cs", "de", "es", "fr", "hi", "id", "it", "ja", "ko", "mr",
  "pl", "pt-br", "ru", "sw", "ta", "te", "tr", "uk", "ur", "vi", "zh", "zh-tw",
]

// A. Forced single-word Card-title leaves (bypass isTranslatableValue).
const ATTR_TARGETS: Array<{ enRel: string; leaves: AttributeLeaf[] }> = [
  {
    enRel: "public/content/prediction-markets/index.md",
    leaves: [
      { id: "pm1", componentName: "Card", attributeName: "title", englishValue: "Incentivized" },
      { id: "pm2", componentName: "Card", attributeName: "title", englishValue: "Decentralization" },
    ],
  },
  {
    enRel: "public/content/staking/solo/index.md",
    leaves: [
      { id: "ss1", componentName: "Card", attributeName: "title", englishValue: "Maintenance" },
    ],
  },
]

// B. ta files to fully re-translate (cross-script contamination).
const TA_FILES = [
  "public/content/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md",
  "public/content/decentralized-identity/index.md",
]

async function loadGlossary(content: string, locale: string): Promise<Map<string, string>> {
  try {
    const res = await fetch(`${GLOSSARY_API_URL}/filter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, language: locale }),
    })
    if (!res.ok) return new Map()
    const data = (await res.json()) as {
      terms: Array<{ english: string; translation: string; note?: string }>
    }
    // eslint-disable-next-line no-control-regex
    const ctrl = new RegExp("[\\u0000-\\u001f]", "g")
    const san = (s: string, n: number) => s.replace(ctrl, "").replace(/\n/g, " ").slice(0, n)
    const m = new Map<string, string>()
    for (const t of data.terms) {
      m.set(san(t.english, 200), t.note ? `${san(t.translation, 500)} (${san(t.note, 200)})` : san(t.translation, 500))
    }
    return m
  } catch {
    return new Map()
  }
}

function localePath(lang: string, enRel: string): string {
  return enRel.replace(/^public\/content\//, `public/content/translations/${lang}/`)
}

async function main() {
  // A. single-word Card titles
  for (const t of ATTR_TARGETS) {
    const enContent = fs.readFileSync(t.enRel, "utf8")
    for (const lang of LANGS) {
      const p = localePath(lang, t.enRel)
      if (!fs.existsSync(p)) continue
      const localeContent = fs.readFileSync(p, "utf8")
      const glossary = await loadGlossary(enContent, lang)
      const r = await translateJsxAttributes({
        leaves: t.leaves,
        localeContent,
        targetLanguage: lang,
        glossary,
        filePath: t.enRel,
      })
      if (r.appliedCount > 0) fs.writeFileSync(p, r.content)
      if (r.appliedCount > 0 || r.failedCount > 0)
        console.log(`[attr] ${lang} ${t.enRel}: applied=${r.appliedCount} failed=${r.failedCount}`)
    }
  }

  // B. ta full re-translate
  for (const enRel of TA_FILES) {
    const enContent = fs.readFileSync(enRel, "utf8")
    const glossary = await loadGlossary(enContent, "ta")
    const res = await translateFile({
      filePath: enRel,
      fileContent: enContent,
      fileType: "markdown",
      targetLanguage: "ta",
      glossaryTerms: glossary,
      useNormalizer: true,
    })
    let final = res.translatedContent
    const leaves = extractAttributeLeaves(enContent)
    if (leaves.length > 0) {
      const ar = await translateJsxAttributes({ leaves, localeContent: final, targetLanguage: "ta", glossary, filePath: enRel })
      final = ar.content
    }
    fs.writeFileSync(localePath("ta", enRel), final)
    console.log(`[ta-full] ${enRel}: written ${final.length} chars`)
  }

  console.log("[review-fixes] done")
}

main().catch((e) => {
  console.error("[review-fixes] ERROR", e)
  process.exit(1)
})
