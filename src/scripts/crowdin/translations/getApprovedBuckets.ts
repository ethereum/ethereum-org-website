import i18n from "../../../../i18n.config.json"
import bucketDirs from "../../../data/crowdin/translation-buckets-dirs.json"
import { CROWDIN_API_MAX_LIMIT } from "../../../lib/constants"
import crowdin from "../api-client/crowdinClient"
import type { BucketsList } from "../import/types"

import { APPROVAL_THRESHOLD } from "./constants"

async function getApprovedBuckets(): Promise<BucketsList> {
  console.log("⏳ Getting approved buckets...")
  const projectId = Number(process.env.CROWDIN_PROJECT_ID) || 363359

  const bucketsList: BucketsList = {}

  for (const bucketDir of bucketDirs) {
    const directoryProgress =
      await crowdin.translationStatusApi.getDirectoryProgress(
        projectId,
        bucketDir.id,
        { limit: CROWDIN_API_MAX_LIMIT }
      )

    const onlyApproved = directoryProgress.data.filter(
      ({ data: { approvalProgress } }) => approvalProgress >= APPROVAL_THRESHOLD
    )

    for (const { code, crowdinCode } of i18n) {
      const match = onlyApproved.find(
        ({ data: { languageId } }) => languageId === crowdinCode
      )
      if (!match) continue

      if (!bucketsList[code]) bucketsList[code] = []

      const n = parseInt(bucketDir.name.substring(0, 2))
      bucketsList[code].push(n)
    }
  }

  return bucketsList
}

export default getApprovedBuckets
