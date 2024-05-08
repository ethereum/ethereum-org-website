import crowdin from "../api-client/crowdinClient"

async function triggerBuild() {
  const projectId = Number(process.env.CROWDIN_PROJECT_ID) || 363359

  try {
    const response = await crowdin.translationsApi.buildProject(projectId)
    const { id, status } = response.data
    const isAlreadyFinished = status === "finished"
    console.log(
      `Build ${isAlreadyFinished ? "already finished" : "triggered"} id:`,
      id
    )
    console.log(`::set-output name=buildId::${id}`)
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
}

triggerBuild()

export default triggerBuild
