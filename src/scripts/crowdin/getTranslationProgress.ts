import fs from "fs"

import { CROWDIN_API_MAX_LIMIT } from "../../lib/constants"
import type { ProjectProgressData } from "../../lib/types"

import crowdin from "./api-client/crowdinClient"

import "dotenv/config"

async function main() {
  const projectId = Number(process.env.CROWDIN_PROJECT_ID) || 363359

  try {
    const response = await crowdin.translationStatusApi.getProjectProgress(
      projectId,
      {
        limit: CROWDIN_API_MAX_LIMIT,
      }
    )

    if (!response)
      throw new Error(
        "Error fetching Crowdin translation progress. Check your environment variables for a working API key."
      )

    const progress = response.data.map(
      ({ data }) =>
        ({
          languageId: data.languageId,
          words: {
            approved: data.words.approved,
            total: data.words.total,
          },
        }) as ProjectProgressData
    )

    fs.writeFileSync(
      "src/data/translationProgress.json",
      JSON.stringify(progress, null, 2)
    )
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
}

main()

export default main
