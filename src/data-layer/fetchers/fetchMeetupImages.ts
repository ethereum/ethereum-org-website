import type { MeetupGroup } from "@/lib/types"

import communityMeetups from "@/data/community-meetups.json"

import { uploadToS3 } from "../s3"
import { get } from "../storage"

export const FETCH_MEETUP_IMAGES_TASK_ID = "fetch-meetup-images"

const MEETUP_IMAGE_PREFIX = "community/meetups"

/**
 * Mirror community-meetups.json images to S3 as a source URL -> S3 URL map,
 * so adding a meetup stays a plain JSON edit that needs no S3 credentials.
 */
export async function fetchMeetupImages(): Promise<Record<string, string>> {
  const sources = [
    ...new Set(
      (communityMeetups as MeetupGroup[])
        .flatMap(({ logoImage, bannerImage }) => [logoImage, bannerImage])
        .filter((url): url is string => !!url && url.startsWith("https://"))
    ),
  ]

  const previous =
    (await get<Record<string, string>>(FETCH_MEETUP_IMAGES_TASK_ID)) ?? {}

  console.log(`Starting meetup image sync for ${sources.length} images`)

  const imageMap: Record<string, string> = {}
  await Promise.all(
    sources.map(async (sourceUrl) => {
      // Keep the existing mirror when the source has since died upstream
      const s3Url =
        (await uploadToS3(sourceUrl, MEETUP_IMAGE_PREFIX)) ??
        previous[sourceUrl]
      if (s3Url) imageMap[sourceUrl] = s3Url
      else console.warn(`[MeetupImages] No upload for ${sourceUrl}`)
    })
  )

  console.log(
    `Meetup image sync complete: ${Object.keys(imageMap).length}/${sources.length} mirrored`
  )

  return imageMap
}
