import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import communityMeetups from "@/data/community-meetups.json"

type MeetupImageSource = {
  logoImage?: string
  bannerImage?: string
}

const allImageUrls = () =>
  (communityMeetups as MeetupImageSource[])
    .flatMap(({ logoImage, bannerImage }) => [logoImage, bannerImage])
    .filter((url): url is string => !!url)

// Entries either point at a locally committed asset (/images/meetups/...) or at
// a remote host that the image sync mirrors to S3.
const remoteImageUrls = () =>
  allImageUrls().filter((url) => !url.startsWith("/"))

const allowedRemoteHosts = () => {
  const config = fs.readFileSync(
    path.resolve(process.cwd(), "next.config.js"),
    "utf-8"
  )
  return new Set(
    [...config.matchAll(/hostname:\s*"([^"]+)"/g)].map((match) => match[1])
  )
}

test.describe("community-meetups.json images", () => {
  test("every remote image URL is https and parseable", () => {
    for (const url of remoteImageUrls()) {
      expect(url, `not an https URL: ${url}`).toMatch(/^https:\/\//)
      expect(() => new URL(url), `unparseable URL: ${url}`).not.toThrow()
    }
  })

  // The events pages fall back to the original URL for any meetup the S3 image
  // sync hasn't mirrored yet, so an un-allowlisted host is a hard next/image
  // failure rather than just a stale image.
  test("every remote image host is allowlisted in next.config remotePatterns", () => {
    const allowed = allowedRemoteHosts()
    const missing = [
      ...new Set(remoteImageUrls().map((url) => new URL(url).hostname)),
    ].filter((host) => !allowed.has(host))

    expect(
      missing,
      `Add these hosts to images.remotePatterns in next.config.js: ${missing.join(", ")}`
    ).toEqual([])
  })
})
