import communityMeetups from "@/data/community-meetups.json"

import { uploadToS3 } from "../s3"

export const FETCH_MEETUP_IMAGES_TASK_ID = "fetch-meetup-images"

const MEETUP_IMAGE_PREFIX = "community/meetups"

type MeetupImageSource = {
  logoImage?: string
  bannerImage?: string
}

/**
 * Re-host the logos/banners referenced by community-meetups.json on our S3
 * bucket so the events pages never hot-link Meetup, Luma, Eventbrite or
 * Twitter. Returns a source-URL -> S3-URL map instead of rewriting the JSON:
 * a meetup added since the last sync still renders from its original URL,
 * and no S3 credentials are needed to add one.
 */
export async function fetchMeetupImages(): Promise<Record<string, string>> {
  const sources = [
    ...new Set(
      (communityMeetups as MeetupImageSource[])
        .flatMap(({ logoImage, bannerImage }) => [logoImage, bannerImage])
        .filter((url): url is string => !!url && url.startsWith("https://"))
    ),
  ]

  console.log(`Starting meetup image sync for ${sources.length} images`)

  const results = await Promise.all(
    sources.map(async (sourceUrl) => {
      const s3Url = await uploadToS3(sourceUrl, MEETUP_IMAGE_PREFIX)
      if (s3Url) return [sourceUrl, s3Url] as const
      console.warn(`[MeetupImages] No upload for ${sourceUrl}`)
      return null
    })
  )

  const imageMap: Record<string, string> = {}
  for (const result of results) {
    if (result) imageMap[result[0]] = result[1]
  }

  console.log(
    `Meetup image sync complete: ${Object.keys(imageMap).length}/${sources.length} uploaded`
  )

  // Never persist an empty map when there was something to upload: that only
  // happens when the uploads themselves failed. Throwing leaves the previously
  // cached blob intact instead of reverting every meetup to a hot-linked URL.
  if (sources.length > 0 && Object.keys(imageMap).length === 0) {
    throw new Error(
      "Meetup image sync produced an empty map; refusing to overwrite cached blob"
    )
  }

  return imageMap
}
