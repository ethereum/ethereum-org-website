import { findFileIdsByPaths } from "../utils"
import { getCrowdinCode } from "../utils"

import { fetchTranslationCostsReport } from "./reportsHelpers"

async function getTranslationCostsReports(translatedMarkdownPaths) {
  for (const lang in translatedMarkdownPaths) {
    const fileIds = await findFileIdsByPaths(
      translatedMarkdownPaths[lang],
      lang
    )
    console.log(`Getting reports for ${lang} for ${fileIds.length} files`)
    // The CrowdinCode is often different from what we use in our repo
    const crowdinLangCode = await getCrowdinCode(lang)

    for (const fileId of fileIds) {
      if (!fileId) {
        console.log("Error: No file ID found for one of the paths")
        continue
      }
      await fetchTranslationCostsReport(fileId, crowdinLangCode)
    }
  }
}

export default getTranslationCostsReports
