import { findFileIdsByPaths } from "../utils"
import { fetchTranslationCostsReport } from "./reportsHelpers"
import getCrowdinCode from "../../../lib/utils/getCrowdinCode"

async function getTranslationCostsReports(translatedMarkdownPaths) {
  for (let lang in translatedMarkdownPaths) {
    const fileIds = await findFileIdsByPaths(
      translatedMarkdownPaths[lang],
      lang
    )
    console.log(`Getting reports for ${lang} for ${fileIds.length} files`)
    // The CrowdinCode is often different from what we use in our repo
    const crowdinLangCode = await getCrowdinCode(lang)

    for (const fileId of fileIds) {
      if (fileId !== null) {
        await fetchTranslationCostsReport(fileId, crowdinLangCode)
      } else {
        console.log("Error: No file ID found for one of the paths")
      }
    }
  }
}

export default getTranslationCostsReports
