import crowdin from "../api-client/crowdinClient"

import "dotenv/config"

async function triggerBuild() {
  const projectId = Number(process.env.CROWDIN_PROJECT_ID) || 363359

  try {
    await crowdin.translationsApi.buildProject(projectId, {
      exportApprovedOnly: true,
    })
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
}

triggerBuild()

export default triggerBuild
