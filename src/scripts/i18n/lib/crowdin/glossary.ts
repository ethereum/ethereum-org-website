/**
 * Crowdin Glossary and Translation Memory API operations
 */

import {
  config,
  CROWDIN_API_BASE_URL,
  crowdinBearerHeaders,
} from "../../config"

export interface CrowdinGlossary {
  id: number
  name: string
  languageId: string
  terms: number
  createdAt: string
}

export interface CrowdinTMSegment {
  id: number
  text: string
  translation: string
  createdAt: string
}

/**
 * List all glossaries in the project
 */
export async function listGlossaries(): Promise<CrowdinGlossary[]> {
  const url = `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/glossaries`
  console.log(`[CROWDIN-GLOSSARY] Fetching glossaries from: ${url}`)

  try {
    const response = await fetch(url, { headers: crowdinBearerHeaders })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Crowdin glossaries list failed (${response.status}): ${errorText}`
      )
    }

    const json: { data: { data: CrowdinGlossary }[] } = await response.json()
    const glossaries = json.data.map(({ data }) => data)

    console.log(`[CROWDIN-GLOSSARY] Found ${glossaries.length} glossaries`)
    return glossaries
  } catch (error) {
    console.error(`[CROWDIN-GLOSSARY] Failed to list glossaries:`, error)
    throw error
  }
}

/**
 * Export a glossary to TBX format
 */
export async function exportGlossary(glossaryId: number): Promise<string> {
  const url = `${CROWDIN_API_BASE_URL}/glossaries/${glossaryId}/exports`
  console.log(`[CROWDIN-GLOSSARY] Exporting glossary ${glossaryId}`)

  try {
    // Start export
    const exportResponse = await fetch(url, {
      method: "POST",
      headers: {
        ...crowdinBearerHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ format: "tbx" }),
    })

    if (!exportResponse.ok) {
      const errorText = await exportResponse.text()
      throw new Error(
        `Crowdin glossary export failed (${exportResponse.status}): ${errorText}`
      )
    }

    const exportJson: { data: { url: string; identifier: string } } =
      await exportResponse.json()
    const downloadUrl = exportJson.data.url

    console.log(
      `[CROWDIN-GLOSSARY] Export ready, downloading from: ${downloadUrl}`
    )

    // Download the exported file
    const downloadResponse = await fetch(downloadUrl)
    if (!downloadResponse.ok) {
      throw new Error(
        `Failed to download glossary export (${downloadResponse.status})`
      )
    }

    const content = await downloadResponse.text()
    console.log(
      `[CROWDIN-GLOSSARY] Downloaded glossary (${content.length} bytes)`
    )

    return content
  } catch (error) {
    console.error(`[CROWDIN-GLOSSARY] Failed to export glossary:`, error)
    throw error
  }
}

/**
 * Import a glossary from TBX content (creates or updates glossary)
 */
export async function importGlossary(
  name: string,
  languageId: string,
  tbxContent: string
): Promise<{ glossaryId: number; imported: number }> {
  console.log(`[CROWDIN-GLOSSARY] Importing glossary: ${name} (${languageId})`)

  try {
    // Check if glossary exists
    const existingGlossaries = await listGlossaries()
    const existing = existingGlossaries.find((g) => g.name === name)

    let glossaryId: number

    if (existing) {
      console.log(
        `[CROWDIN-GLOSSARY] Using existing glossary ID: ${existing.id}`
      )
      glossaryId = existing.id
    } else {
      // Create new glossary
      console.log(`[CROWDIN-GLOSSARY] Creating new glossary: ${name}`)
      const createUrl = `${CROWDIN_API_BASE_URL}/glossaries`
      const createResponse = await fetch(createUrl, {
        method: "POST",
        headers: {
          ...crowdinBearerHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, languageId }),
      })

      if (!createResponse.ok) {
        const errorText = await createResponse.text()
        throw new Error(
          `Failed to create glossary (${createResponse.status}): ${errorText}`
        )
      }

      const createJson: { data: { id: number } } = await createResponse.json()
      glossaryId = createJson.data.id
      console.log(`[CROWDIN-GLOSSARY] Created glossary with ID: ${glossaryId}`)
    }

    // Upload TBX file to storage first
    const storageId = await uploadToStorage(tbxContent, "glossary.tbx")

    // Import the glossary
    const importUrl = `${CROWDIN_API_BASE_URL}/glossaries/${glossaryId}/imports`
    const importResponse = await fetch(importUrl, {
      method: "POST",
      headers: {
        ...crowdinBearerHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storageId,
        scheme: {
          sourceLanguageId: "en",
          targetLanguageId: languageId,
        },
      }),
    })

    if (!importResponse.ok) {
      const errorText = await importResponse.text()
      throw new Error(
        `Failed to import glossary (${importResponse.status}): ${errorText}`
      )
    }

    const importJson: { data: { identifier: string } } =
      await importResponse.json()
    console.log(
      `[CROWDIN-GLOSSARY] Import started: ${importJson.data.identifier}`
    )

    // Wait for import to complete (simple polling)
    await waitForImport(glossaryId, importJson.data.identifier)

    console.log(
      `[CROWDIN-GLOSSARY] Successfully imported glossary ${glossaryId}`
    )
    return { glossaryId, imported: 0 } // Crowdin doesn't return count immediately
  } catch (error) {
    console.error(`[CROWDIN-GLOSSARY] Failed to import glossary:`, error)
    throw error
  }
}

/**
 * Upload content to Crowdin storage
 */
async function uploadToStorage(
  content: string,
  filename: string
): Promise<number> {
  const url = `${CROWDIN_API_BASE_URL}/storages`
  console.log(`[CROWDIN-GLOSSARY] Uploading to storage: ${filename}`)

  const formData = new FormData()
  const blob = new Blob([content], { type: "application/xml" })
  formData.append("file", blob, filename)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: crowdinBearerHeaders.Authorization,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Storage upload failed (${response.status}): ${errorText}`
      )
    }

    const json: { data: { id: number } } = await response.json()
    console.log(`[CROWDIN-GLOSSARY] Uploaded to storage ID: ${json.data.id}`)
    return json.data.id
  } catch (error) {
    console.error(`[CROWDIN-GLOSSARY] Storage upload failed:`, error)
    throw error
  }
}

/**
 * Wait for glossary import to complete
 */
async function waitForImport(
  glossaryId: number,
  identifier: string
): Promise<void> {
  const maxAttempts = 30
  const delayMs = 2000

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, delayMs))

    const url = `${CROWDIN_API_BASE_URL}/glossaries/${glossaryId}/imports/${identifier}`
    const response = await fetch(url, { headers: crowdinBearerHeaders })

    if (!response.ok) continue

    const json: { data: { status: string } } = await response.json()
    console.log(`[CROWDIN-GLOSSARY] Import status: ${json.data.status}`)

    if (json.data.status === "finished") {
      return
    }

    if (json.data.status === "failed") {
      throw new Error("Glossary import failed")
    }
  }

  throw new Error("Glossary import timeout")
}

/**
 * List Translation Memory (TM) resources
 */
export async function listTranslationMemories(): Promise<
  Array<{ id: number; name: string; languageId: string }>
> {
  const url = `${CROWDIN_API_BASE_URL}/projects/${config.projectId}/tms`
  console.log(`[CROWDIN-TM] Fetching TMs from: ${url}`)

  try {
    const response = await fetch(url, { headers: crowdinBearerHeaders })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Crowdin TM list failed (${response.status}): ${errorText}`
      )
    }

    const json: {
      data: { data: { id: number; name: string; languageId: string } }[]
    } = await response.json()
    const tms = json.data.map(({ data }) => data)

    console.log(`[CROWDIN-TM] Found ${tms.length} TMs`)
    return tms
  } catch (error) {
    console.error(`[CROWDIN-TM] Failed to list TMs:`, error)
    throw error
  }
}

/**
 * Export Translation Memory to TMX format
 */
export async function exportTranslationMemory(tmId: number): Promise<string> {
  const url = `${CROWDIN_API_BASE_URL}/tms/${tmId}/exports`
  console.log(`[CROWDIN-TM] Exporting TM ${tmId}`)

  try {
    // Start export
    const exportResponse = await fetch(url, {
      method: "POST",
      headers: {
        ...crowdinBearerHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sourceLanguageId: "en",
        targetLanguageId: "all",
        format: "tmx",
      }),
    })

    if (!exportResponse.ok) {
      const errorText = await exportResponse.text()
      throw new Error(
        `Crowdin TM export failed (${exportResponse.status}): ${errorText}`
      )
    }

    const exportJson: { data: { url: string } } = await exportResponse.json()
    const downloadUrl = exportJson.data.url

    console.log(`[CROWDIN-TM] Export ready, downloading from: ${downloadUrl}`)

    // Download the exported file
    const downloadResponse = await fetch(downloadUrl)
    if (!downloadResponse.ok) {
      throw new Error(
        `Failed to download TM export (${downloadResponse.status})`
      )
    }

    const content = await downloadResponse.text()
    console.log(`[CROWDIN-TM] Downloaded TM (${content.length} bytes)`)

    return content
  } catch (error) {
    console.error(`[CROWDIN-TM] Failed to export TM:`, error)
    throw error
  }
}
