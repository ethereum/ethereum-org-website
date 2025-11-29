import fs from "fs"
import path from "path"

import i18nConfig from "../../../i18n.config.json"

import { getPromptModelKey } from "./lib/crowdin/prompt-model"
import type { I18nConfigItem } from "./lib/types"

// Helper to get all internal language codes
function getInternalLanguageCodes(): string[] {
  return i18nConfig.map((lang: I18nConfigItem) => lang.code)
}

// Helper to call Copilot/GPT for trust matrix generation
async function generateTrustMatrix(
  modelKey: string,
  internalCodes: string[]
): Promise<unknown> {
  // Compose prompt for Copilot/GPT
  const prompt = `You are an expert in language quality assessment for AI translation models. Given the model ${modelKey} and the following internal language codes: ${internalCodes.join(", ")}, group these codes into buckets by expected translation quality (Aplus, A, Aminus, Bplus, B, Bminus, Cplus, C, Dplus). Output a JSON object with these groups as keys and arrays of codes as values. Only use the provided codes.`

  // Call Copilot (GPT-4.1) via API (pseudo-code, replace with actual API call)
  // const response = await copilotApi.generate({ prompt })
  // return JSON.parse(response)

  // For now, just log the prompt and return an empty object
  console.log("Prompt for Copilot/GPT:", prompt)
  return {}
}

async function main() {
  const userId = process.env.I18N_CROWDIN_USER_ID
  const promptId = process.env.I18N_CROWDIN_PROMPT_ID
  if (!userId || !promptId) {
    throw new Error(
      "Set I18N_CROWDIN_USER_ID and I18N_CROWDIN_PROMPT_ID in your .env.local"
    )
  }
  const modelKey = await getPromptModelKey(Number(userId), Number(promptId))
  const internalCodes = getInternalLanguageCodes()
  const matrix = await generateTrustMatrix(modelKey, internalCodes)

  // Write to language-trust.json
  const outPath = path.join(
    process.cwd(),
    "src/scripts/i18n/config/language-trust.json"
  )
  fs.writeFileSync(outPath, JSON.stringify({ [modelKey]: matrix }, null, 2))
  console.log(
    `Trust matrix for model ${modelKey} written to language-trust.json`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
