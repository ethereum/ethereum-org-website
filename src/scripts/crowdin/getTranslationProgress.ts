import fs from 'fs'

import crowdin from "./api-client/crowdinClient"

import "dotenv/config"

async function main() {
  const projectId = Number(process.env.CROWDIN_PROJECT_ID) || 363359

  try {
    const progress = await crowdin.translationStatusApi.getProjectProgress(projectId, {
      limit: 200,
    })

    if (!progress) throw new Error("Error fetching Crowdin translation progress. Check your environment variables for a working API key.")

    const results = progress.data.map(({ data: { languageId, translationProgress, approvalProgress } }) => ({
      languageId,
      translationProgress,
      approvalProgress,
    }))

    fs.writeFileSync("src/data/translationProgress.json", JSON.stringify(results, null, 2))

  } catch (error: unknown) {
    console.error((error as Error).message)
  }
}

main()

export default main
