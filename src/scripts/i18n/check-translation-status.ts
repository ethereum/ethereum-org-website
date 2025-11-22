/**
 * Quick script to check translation status of a specific file in Crowdin
 */

const CROWDIN_API_KEY = process.env.CROWDIN_TOKEN!
const PROJECT_ID = 834930
const FILE_ID = 17434 // organizing/index.md
const LANGUAGE_ID = "es-EM"

const headers = {
  Authorization: `Bearer ${CROWDIN_API_KEY}`,
  "Content-Type": "application/json",
}

async function checkTranslationProgress() {
  console.log("\n=== Checking Translation Progress ===")
  console.log(`File ID: ${FILE_ID}`)
  console.log(`Language: ${LANGUAGE_ID}`)

  // Get translation progress for the file
  const url = `https://api.crowdin.com/api/v2/projects/${PROJECT_ID}/languages/${LANGUAGE_ID}/progress?fileIds=${FILE_ID}`

  try {
    const res = await fetch(url, { headers })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Failed to get progress (${res.status}): ${text}`)
    }

    const json = await res.json()
    console.log("\nTranslation Progress:")
    console.log(JSON.stringify(json, null, 2))
  } catch (error) {
    console.error("Error:", error)
  }
}

async function listStrings() {
  console.log("\n=== Listing Strings in File ===")

  // Get strings from the file
  const url = `https://api.crowdin.com/api/v2/projects/${PROJECT_ID}/strings?fileId=${FILE_ID}&limit=10`

  try {
    const res = await fetch(url, { headers })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Failed to list strings (${res.status}): ${text}`)
    }

    const json = await res.json()
    console.log(`\nFound ${json.data.length} strings (showing first 10):`)
    for (const item of json.data) {
      console.log(`\nString ID: ${item.data.id}`)
      console.log(`Text: "${item.data.text.substring(0, 100)}..."`)
      console.log(`Context: ${item.data.context || "none"}`)
    }
  } catch (error) {
    console.error("Error:", error)
  }
}

async function checkStringTranslations() {
  console.log("\n=== Checking String Translations ===")

  // First get a string ID
  const stringsUrl = `https://api.crowdin.com/api/v2/projects/${PROJECT_ID}/strings?fileId=${FILE_ID}&limit=1`

  try {
    const stringsRes = await fetch(stringsUrl, { headers })
    if (!stringsRes.ok) {
      throw new Error(`Failed to get strings: ${stringsRes.status}`)
    }

    const stringsJson = await stringsRes.json()
    if (stringsJson.data.length === 0) {
      console.log("❌ No strings found in file!")
      return
    }

    const stringId = stringsJson.data[0].data.id
    console.log(`\nChecking translations for string ID: ${stringId}`)
    console.log(
      `String text: "${stringsJson.data[0].data.text.substring(0, 100)}..."`
    )

    // Get translations for this string
    const translationsUrl = `https://api.crowdin.com/api/v2/projects/${PROJECT_ID}/translations?stringId=${stringId}&languageId=${LANGUAGE_ID}`
    const transRes = await fetch(translationsUrl, { headers })

    if (!transRes.ok) {
      const text = await transRes.text()
      console.log(
        `\n⚠️  No translations found or error (${transRes.status}): ${text}`
      )
      return
    }

    const transJson = await transRes.json()
    console.log(`\nTranslations found: ${transJson.data.length}`)
    if (transJson.data.length > 0) {
      console.log("First translation:")
      console.log(JSON.stringify(transJson.data[0].data, null, 2))
    } else {
      console.log("❌ String has NO translations in Spanish!")
    }
  } catch (error) {
    console.error("Error:", error)
  }
}

async function main() {
  await checkTranslationProgress()
  await listStrings()
  await checkStringTranslations()
}

main()
