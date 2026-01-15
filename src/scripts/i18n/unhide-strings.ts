/**
 * Unhide all hidden/duplicate strings in a Crowdin file
 */

import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const API_KEY = process.env.I18N_CROWDIN_API_KEY!
const PROJ_ID = 834930
const TARGET_FILE_ID = 17434 // organizing/index.md

const requestHeaders = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
}

async function unhideAllStrings() {
  console.log(`\n=== Unhiding strings in file ${TARGET_FILE_ID} ===`)

  // Get all strings from the file
  const listUrl = `https://api.crowdin.com/api/v2/projects/${PROJ_ID}/strings?fileId=${TARGET_FILE_ID}&limit=500`

  const listRes = await fetch(listUrl, { headers: requestHeaders })
  if (!listRes.ok) {
    throw new Error(`Failed to list strings: ${listRes.status}`)
  }

  const listJson = await listRes.json()
  console.log(`Found ${listJson.data.length} strings`)

  let unhiddenCount = 0

  for (const item of listJson.data) {
    const stringId = item.data.id
    const isHidden = item.data.isHidden

    if (!isHidden) {
      continue
    }

    // Unhide the string using PATCH
    const patchUrl = `https://api.crowdin.com/api/v2/projects/${PROJ_ID}/strings/${stringId}`

    const patchRes = await fetch(patchUrl, {
      method: "PATCH",
      headers: requestHeaders,
      body: JSON.stringify([
        {
          op: "replace",
          path: "/isHidden",
          value: false,
        },
      ]),
    })

    if (!patchRes.ok) {
      const text = await patchRes.text()
      console.error(`Failed to unhide string ${stringId}: ${text}`)
      continue
    }

    unhiddenCount++
    if (unhiddenCount % 10 === 0) {
      console.log(`Unhidden ${unhiddenCount} strings...`)
    }
  }

  console.log(`\n✅ Successfully unhidden ${unhiddenCount} strings!`)
}

unhideAllStrings().catch(console.error)
