import crowdin from "../api-client/crowdinClient"

async function awaitLatestBuild() {
  const FINISHED = "finished"
  const TIMEOUT = 2 * 60 * 60 * 1000 // 2 hours in milliseconds

  const projectId = Number(process.env.CROWDIN_PROJECT_ID) || 363359

  const initialResponse = await crowdin.translationsApi.listProjectBuilds(
    projectId
  )

  let data = initialResponse.data
  let isFinished = data[0].data.status === FINISHED

  const timeoutTime = Date.now() + TIMEOUT
  while (!isFinished && Date.now() < timeoutTime) {
    const repeatCheck = await crowdin.translationsApi.listProjectBuilds(
      projectId
    )
    data = repeatCheck.data
    isFinished = data[0].data.status === FINISHED
  }
  const latestBuildData = data[0].data
  if (latestBuildData.status !== FINISHED)
    throw new Error(
      `Timeout: Build did not finish in ${TIMEOUT / 1000 / 60} minutes`
    )
}

awaitLatestBuild()

export default awaitLatestBuild
