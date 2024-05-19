import { writeFileSync } from "fs"
import { join } from "path"

import crowdin from "../api-client/crowdinClient"

const OUTPUT_PATH = join(process.env["GITHUB_WORKSPACE"] || "", "output.env")

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
    writeFileSync(OUTPUT_PATH, `BUILD_ID=${id}\n`, { flag: "a" })
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
}

triggerBuild()

export default triggerBuild
