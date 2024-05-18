import { writeFileSync } from "fs"
import { join } from "path"

import crowdin from "../api-client/crowdinClient"

const FINISHED = "finished"
const TIMEOUT = 2 * 60 * 60 * 1000 // Timeout after 2 hours
const INTERVAL = 10 * 1000 // 10 seconds between checks

const OUTPUT_PATH = join(process.env["GITHUB_WORKSPACE"] || "", "output.env")

async function awaitLatestBuild() {
  const projectId = Number(process.env.CROWDIN_PROJECT_ID) || 363359

  // BUILD_ID is provided by the triggerBuild script run in the same workflow prior to this script
  const buildId = process.env.BUILD_ID

  console.log("Build ID provided:", buildId)
  const initialResponse = await crowdin.translationsApi.checkBuildStatus(
    projectId,
    Number(buildId)
  )
  let data = initialResponse.data

  let isFinished = data.status === FINISHED

  const timeoutTime = Date.now() + TIMEOUT
  let tryAgainTime = Date.now() - 1
  while (!isFinished && Date.now() < timeoutTime) {
    if (Date.now() < tryAgainTime) continue
    tryAgainTime = Date.now() + INTERVAL

    const repeatCheck = await crowdin.translationsApi.checkBuildStatus(
      projectId,
      Number(buildId)
    )
    data = repeatCheck.data
    isFinished = data.status === FINISHED
    console.log(
      `id: ${buildId}, status: ${data.status}, progress ${data.progress}`
    )
  }

  if (data.status !== FINISHED) {
    writeFileSync(OUTPUT_PATH, `BUILD_SUCCESS=false\n`, { flag: "a" })
    throw new Error(
      `Timeout: Build did not finish in ${TIMEOUT / 1000 / 60} minutes`
    )
  }

  console.log("Latest build data:", data)
  writeFileSync(OUTPUT_PATH, `BUILD_SUCCESS=true\n`, { flag: "a" })
}

awaitLatestBuild()

export default awaitLatestBuild
