// OpenAI integration for generating language trust matrices
import fs from "fs"
import path from "path"

import i18nConfig from "../../../../../i18n.config.json"

type TrustBucket = {
  lastUpdated?: string
  Aplus?: string[]
  A?: string[]
  Aminus?: string[]
  Bplus?: string[]
  B?: string[]
  Bminus?: string[]
  Cplus?: string[]
  C?: string[]
  Dplus?: string[]
}

/**
 * Generate a trust matrix using OpenAI GPT-4
 * @param modelKey The Crowdin AI model identifier (provider:model:version)
 * @returns The generated trust bucket with quality grades for each language
 */
export async function generateTrustMatrixWithOpenAI(
  modelKey: string
): Promise<TrustBucket> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY not found. Cannot generate trust matrix without API access."
    )
  }

  const languageList = i18nConfig
    .map((lang) => `${lang.code} (${lang.name})`)
    .join(", ")

  const prompt = `You are an expert in evaluating AI translation model quality across different languages.

Given the Crowdin AI translation model identifier: "${modelKey}"

Please assess the expected translation quality for each of the following languages: ${languageList}

Group the language codes into these quality buckets:
- Aplus: Exceptional quality, native-level fluency expected
- A: High quality, minimal post-editing needed
- Aminus: Good quality, occasional review needed
- Bplus: Above-average quality, regular review recommended
- B: Average quality, consistent review needed
- Bminus: Below-average quality, careful review required
- Cplus: Fair quality, significant review needed
- C: Poor quality, extensive review required
- Dplus: Very poor quality, requires thorough human translation review

Respond ONLY with a valid JSON object in this exact format:
{
  "Aplus": ["code1", "code2"],
  "A": ["code3"],
  "Aminus": ["code4", "code5"],
  "Bplus": ["code6"],
  "B": ["code7", "code8"],
  "Bminus": ["code9"],
  "Cplus": ["code10"],
  "C": ["code11"],
  "Dplus": ["code12"]
}

Use ONLY the internal codes provided (e.g., "es", "fr", "zh", "pt-br"). Do not include any explanatory text, only the JSON object.`

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a language quality assessment expert. Respond only with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content?.trim()
  if (!content) {
    throw new Error("OpenAI returned empty response")
  }

  // Parse the JSON response
  let trustBucket: TrustBucket
  try {
    trustBucket = JSON.parse(content)
  } catch (err) {
    console.error("[OPENAI] Failed to parse response:", content)
    throw new Error(`OpenAI response was not valid JSON: ${err}`)
  }

  // Add timestamp
  trustBucket.lastUpdated = new Date().toISOString()

  console.log(`[OPENAI] Generated trust matrix for model: ${modelKey}`)
  return trustBucket
}

/**
 * Update the language-trust.json file with a new model's trust matrix
 * @param modelKey The model identifier
 * @param trustBucket The trust bucket to add
 */
export function saveTrustMatrixToFile(
  modelKey: string,
  trustBucket: TrustBucket
): void {
  const filePath = path.join(
    process.cwd(),
    "src/scripts/i18n/config/language-trust.json"
  )

  let matrix: Record<string, TrustBucket> = {}
  try {
    const raw = fs.readFileSync(filePath, "utf8")
    matrix = JSON.parse(raw)
  } catch {
    console.warn(
      "[TRUST-MATRIX] Could not read existing matrix, creating new file"
    )
  }

  matrix[modelKey] = trustBucket

  fs.writeFileSync(filePath, JSON.stringify(matrix, null, 2) + "\n")
  console.log(
    `[TRUST-MATRIX] Saved trust matrix for model "${modelKey}" to language-trust.json`
  )
}
