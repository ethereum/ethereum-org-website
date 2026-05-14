#!/usr/bin/env node
/**
 * Gemini 3.1 Pro classification of ETHGlossary candidate terms.
 *
 * One-off task. Two-pass design:
 *   Pass 1 (single call): classify every term -- term_role, script_rule_default,
 *           promote_to_master, rationale. Terms are presented grouped as People
 *           and Products so Gemini disambiguates ambiguous names (Casper, Base,
 *           Compound, Curve) up front.
 *   Pass 2 (13 parallel calls): per-language native-script forms for promoted
 *           terms only.
 *
 * Mirrors the call pattern from src/scripts/intl-pipeline/lib/llm/gemini.ts.
 *
 * Output: a single JSON file consumed by ETHGlossary's importer.
 */

import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai"
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { dirname } from "node:path"
import { parseArgs } from "node:util"

const MODELS = ["gemini-3.1-pro-preview", "gemini-3.1-pro"]
const LANGUAGES = [
  "ar", "bn", "hi", "ja", "ko", "mr", "ru",
  "ta", "te", "uk", "ur", "zh", "zh-tw",
]
const GEMINI_TIMEOUT_MS = 5 * 60 * 1000
const MAX_RETRIES = 2
const RETRY_DELAY_MS = 5000
const LOW_CONFIDENCE_FLAG_THRESHOLD = 0.3

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
]

async function main() {
  const { values } = parseArgs({
    options: {
      policy: { type: "string" },
      terms: { type: "string" },
      out: { type: "string" },
    },
  })

  if (!values.policy || !values.terms || !values.out) {
    throw new Error(
      "Usage: gemini-glossary-review.mjs --policy <path> --terms <path> --out <path>"
    )
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is not set")

  const client = new GoogleGenAI({ apiKey })
  const policy = await readFile(values.policy, "utf8")
  const termsFile = JSON.parse(await readFile(values.terms, "utf8"))

  const people = termsFile.people ?? []
  const products = termsFile.products ?? []
  const terms = [...people, ...products]
  if (terms.length === 0) {
    throw new Error("Terms file must contain non-empty `people` and/or `products` arrays")
  }

  console.log(
    `Loaded ${people.length} people + ${products.length} products = ${terms.length} terms, ` +
      `policy ${policy.length} chars`
  )

  console.log(`\n=== Pass 1: classifying ${terms.length} terms (single batch) ===`)
  const classifications = await pass1(client, policy, people, products)
  const promoted = classifications.filter((c) => c.promote_to_master === true)
  console.log(
    `Pass 1 done: ${classifications.length} classifications, ${promoted.length} promoted`
  )

  console.log(
    `\n=== Pass 2: per-language native forms for ${promoted.length} promoted ` +
      `terms across ${LANGUAGES.length} languages (parallel) ===`
  )
  const langForms = await pass2(client, policy, promoted)

  const merged = classifications.map((c) => {
    if (!c.promote_to_master) return c
    return {
      ...c,
      per_language_native_forms: Object.fromEntries(
        LANGUAGES.map((lang) => [
          lang,
          langForms[lang]?.[c.term] ?? { native_form: null, confidence: "low" },
        ])
      ),
    }
  })

  const lowFlags = {}
  for (const lang of LANGUAGES) {
    const lowCount = promoted.filter(
      (p) => langForms[lang]?.[p.term]?.confidence === "low"
    ).length
    if (promoted.length > 0 && lowCount / promoted.length > LOW_CONFIDENCE_FLAG_THRESHOLD) {
      lowFlags[lang] = `${lowCount} of ${promoted.length} promoted terms returned confidence=low`
    }
  }

  const output = {
    metadata: {
      ...termsFile.metadata,
      generated: new Date().toISOString(),
      models_attempted: MODELS,
      pass1_total: classifications.length,
      pass2_promoted: promoted.length,
      low_confidence_flags: lowFlags,
    },
    entries: merged,
  }

  await mkdir(dirname(values.out), { recursive: true })
  await writeFile(values.out, JSON.stringify(output, null, 2), "utf8")
  console.log(`\nWrote ${values.out}`)

  if (Object.keys(lowFlags).length > 0) {
    console.log(
      `\n--- LOW-CONFIDENCE FLAGS (>${LOW_CONFIDENCE_FLAG_THRESHOLD * 100}% of promoted) ---`
    )
    for (const [lang, msg] of Object.entries(lowFlags)) {
      console.log(`  ${lang}: ${msg}`)
    }
    console.log(
      "These languages likely need native-speaker re-review or a focused re-prompt."
    )
  }
}

async function pass1(client, policy, people, products) {
  const prompt = buildPass1Prompt(policy, people, products)
  const text = await callGemini(client, prompt, "pass1")
  return parsePass1(text, people.length + products.length)
}

async function pass2(client, policy, promoted) {
  if (promoted.length === 0) {
    return Object.fromEntries(LANGUAGES.map((l) => [l, {}]))
  }
  const results = await Promise.all(
    LANGUAGES.map(async (lang) => {
      const prompt = buildPass2Prompt(policy, promoted, lang)
      const text = await callGemini(client, prompt, `pass2[${lang}]`)
      const byTerm = parsePass2(text, lang)
      console.log(`  pass2[${lang}] parsed: ${Object.keys(byTerm).length} entries`)
      return [lang, byTerm]
    })
  )
  return Object.fromEntries(results)
}

async function callGemini(client, prompt, ctx) {
  let lastErr
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS)
        const response = await client.models
          .generateContent({
            model,
            contents: prompt,
            config: {
              temperature: 0,
              safetySettings: SAFETY_SETTINGS,
              abortSignal: controller.signal,
            },
          })
          .finally(() => clearTimeout(timeout))

        const candidate = response.candidates?.[0]
        const finishReason = candidate?.finishReason
        const blockReason = response.promptFeedback?.blockReason
        if (blockReason) throw new Error(`Prompt blocked: ${blockReason}`)

        const text = response.text ?? ""
        if (!text) {
          throw new Error(`Empty response (finishReason=${finishReason ?? "unknown"})`)
        }

        const usage = response.usageMetadata
        console.log(
          `  ${ctx} model=${model} attempt=${attempt} ok ` +
            `tokens_in=${usage?.promptTokenCount ?? "?"} ` +
            `tokens_out=${usage?.candidatesTokenCount ?? "?"}` +
            (finishReason && finishReason !== "STOP"
              ? ` finishReason=${finishReason}`
              : "")
        )
        return text
      } catch (err) {
        lastErr = err
        console.error(
          `  ${ctx} model=${model} attempt=${attempt} failed: ${err.message}`
        )
        if (attempt <= MAX_RETRIES) await delay(RETRY_DELAY_MS)
      }
    }
  }
  throw new Error(
    `${ctx}: all models/retries exhausted. Last error: ${lastErr?.message}`
  )
}

function parsePass1(text, expectedCount) {
  const json = extractJsonBlock(text)
  if (!Array.isArray(json)) throw new Error("Pass 1: response is not a JSON array")
  if (json.length !== expectedCount) {
    console.warn(`Pass 1: expected ${expectedCount} entries, got ${json.length}`)
  }
  const required = [
    "term", "term_role", "script_rule_default", "promote_to_master", "rationale",
  ]
  for (const [i, entry] of json.entries()) {
    for (const f of required) {
      if (!(f in entry)) {
        throw new Error(
          `Pass 1: entry ${i} (${entry.term ?? "?"}) missing required field "${f}"`
        )
      }
    }
  }
  return json
}

function parsePass2(text, lang) {
  const json = extractJsonBlock(text)
  if (!Array.isArray(json)) {
    throw new Error(`Pass 2 [${lang}]: response is not a JSON array`)
  }
  const byTerm = {}
  for (const entry of json) {
    if (!entry.term) continue
    byTerm[entry.term] = {
      native_form: entry.native_form ?? null,
      confidence: entry.confidence ?? "low",
    }
  }
  return byTerm
}

function extractJsonBlock(text) {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fence) return JSON.parse(fence[1])
  const trimmed = text.trim()
  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    return JSON.parse(trimmed)
  }
  throw new Error("No JSON found in response")
}

function buildPass1Prompt(policy, people, products) {
  const peopleEnd = people.length
  const peopleList = people.map((t, i) => `${i + 1}. ${t}`).join("\n")
  const productsList = products
    .map((t, i) => `${peopleEnd + i + 1}. ${t}`)
    .join("\n")
  return `You are classifying Ethereum-ecosystem terminology for inclusion in ETHGlossary, the canonical glossary powering ethereum.org translations into 24 languages. The audience is the ethereum.org reader: mostly newcomers and developers, mixed technical level, content that is conceptual and tutorial more than reference-grade.

The v1 translation policy is below. Read it carefully. Then for each term in the input list, produce a structured classification.

=== POLICY BEGIN ===

${policy}

=== POLICY END ===

For each input term, return a JSON object with these fields:

  - term: <exact input string>
  - term_role: <one of: concept | brand-or-project | person-name | programming-language | os-platform | cryptographic-primitive | network-name | file-extension | cli-command | ticker-or-standard | identifier>
  - script_rule_default: <one of: translate | calque | transliterate | keep_latin | always_latin | transliterate_with_translation>
  - promote_to_master: <true | false>
  - rationale: <one-sentence justification>

Rules for promote_to_master:

- TRUE only if at least one non-Latin-script language has a widely-used, established native-script form in the Ethereum/crypto community. Do NOT invent transliterations.
- For programming languages, OS/platform names, file extensions, CLI commands, tickers, standards, identifiers, and cryptographic primitives: promote_to_master is ALWAYS FALSE (these are always_latin by policy).
- For person-name: TRUE only if the person has an established native-script rendering in at least 2-3 of the 13 languages (e.g., Vitalik Buterin: widely transliterated; lesser-known engineers: typically not).
- For brand-or-project: TRUE only if at least one non-Latin community has officially adopted a native-script form. When in doubt, FALSE.

Conservatism bias: when uncertain whether a transliteration is "established" versus "could be transliterated phonetically," choose promote_to_master=false. We can promote later when native-speaker evidence is clear.

Do not use tools. Do not fetch web content. Reason only from the provided policy and your training knowledge.

Output: a single JSON array of objects, one per term, in input order (people first, then products). Wrap in a \`\`\`json fenced block. No commentary outside the JSON block.

=== Terms to classify ===

People (each is a real person; classify with term_role: person-name unless you have strong reason otherwise):

${peopleList}

Products / brands / projects / tools / programming languages / OS / platforms (classify into the specific term_role per the taxonomy):

${productsList}`
}

function buildPass2Prompt(policy, promoted, lang) {
  const termList = promoted
    .map((p, i) => `${i + 1}. ${p.term}  [role: ${p.term_role}]`)
    .join("\n")
  return `You are generating established native-script forms for ETHGlossary terms in ONE specific target language: \`${lang}\`.

The v1 translation policy is below. The per-language section for \`${lang}\` applies; respect it.

=== POLICY BEGIN ===

${policy}

=== POLICY END ===

For each term below, provide the established native-script form in \`${lang}\`, OR null if no widely-used established form exists in the Ethereum/crypto community.

Conservatism bias: do NOT invent transliterations. If you cannot recall a widely-used established native-script form for \`${lang}\`, return null. Native-speaker review will fill these in later; your job is to surface only what is genuinely established.

Output: a single JSON array of objects, one per term, in input order:

  - term: <exact input string>
  - native_form: <native-script form in ${lang}, OR null>
  - confidence: <"high" | "medium" | "low">

Wrap in a \`\`\`json fenced block. No commentary outside the block.

Do not use tools. Do not fetch web content. Reason only from the provided policy and your training knowledge.

Terms to render in ${lang}:
${termList}`
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

await main()
