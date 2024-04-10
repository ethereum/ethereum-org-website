import i18n from "../../../../i18n.config.json"
import crowdin from "../api-client/crowdinClient"

import { APPROVAL_THRESHOLD } from "./constants"
import type {
  BucketsList,
  DirectoryAsBucket,
  ListProjectDirectoryResponse,
} from "./types"
import {
  reduceToLatest,
  removeUpdatedAt,
  sortByBucketNumber,
  transformData,
} from "./utils"

async function getApprovedBuckets(): Promise<BucketsList> {
  const projectId = Number(process.env.CROWDIN_PROJECT_ID) || 363359

  const projectDirectories =
    (await crowdin.sourceFilesApi.listProjectDirectories(projectId, {
      limit: 200,
    })) as ListProjectDirectoryResponse

  const latest: DirectoryAsBucket[] = projectDirectories.data
    .map(transformData)
    .sort(sortByBucketNumber)
    .reduce(reduceToLatest, [])
    .map(removeUpdatedAt)

  const bucketsList: BucketsList = {}

  for (const bucketDir of latest) {
    const directoryProgress =
      await crowdin.translationStatusApi.getDirectoryProgress(
        projectId,
        bucketDir.id,
        { limit: 200 }
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

      const n = parseInt(bucketDir.bucket.number)
      bucketsList[code].push(n)
    }
  }

  return bucketsList
}

getApprovedBuckets()

export default getApprovedBuckets
