---
title: "Video pages for videos hosted only on X (Twitter)"
slug: "x-hosted-video-pages"
category: "integration-issues"
severity: "medium"
symptoms:
  - "A video exists only as an X post, but video pages only accept a YouTube `youtubeId`"
  - "X video in react-tweet shows the poster, then stays black after pressing play"
  - "Browser console: `Failed to load resource: 403` for a `video.twimg.com` URL"
  - 'Video gallery shows broken thumbnails and `Image is missing required "src" property`'
components:
  - "src/lib/interfaces.ts"
  - "app/[locale]/videos/[slug]/page.tsx"
  - "app/[locale]/videos/[slug]/page-jsonld.tsx"
  - "src/components/Videos/VideoWatch/index.tsx"
  - "src/components/TweetEmbed.tsx"
  - "src/lib/utils/videos.ts"
  - "next.config.js"
  - "src/scripts/intl-pipeline/intl-sanitizer.ts"
  - "src/scripts/intl-pipeline/lib/llm/prompt-builder.ts"
tags:
  - "videos"
  - "x"
  - "twitter"
  - "react-tweet"
  - "referrer-policy"
  - "thumbnails"
discovered_at: "2026-11-18"
status: "resolved"
---

# Video pages for videos hosted only on X

The Devcon 8 Mumbai video was published only on X, so `/videos/` needed a way
to show a video that has no YouTube upload.

## Adding an X-hosted video

Use `tweetId` instead of `youtubeId` in `public/content/videos/<slug>/index.md`,
and set `customThumbnailUrl` to the post's video poster:

```yaml
tweetId: "2119461867483693314"
customThumbnailUrl: "https://pbs.twimg.com/amplify_video_thumb/<media-id>/img/<name>.jpg"
```

The poster URL is `mediaDetails[0].media_url_https` from `getTweet(id)` in
`react-tweet/api`. Don't commit the video file itself: GitHub rejects files
over 100 MB, and video pages embed hosted videos rather than serving files.

## What changed

- **Frontmatter**: `VideoFrontmatter.youtubeId` is now optional, and the new
  optional `tweetId` field holds the X post ID.
- **Player**: the video page and the inline `VideoWatch` card render
  `TweetEmbed` (server-rendered `react-tweet`) when there is no `youtubeId`.
  react-tweet caps its card at 550px, so the embed overrides `max-width` to
  fill the column the way YouTube videos do.
- **JSON-LD**: `embedUrl` / `contentUrl` point to the X post for X videos.
- **Translations**: `tweetId` is copied from English and never translated (the
  sanitizer's protected fields and the LLM prompts).
- **Thumbnails**: gallery cards use the S3 thumbnail when it exists, then
  `customThumbnailUrl`, then YouTube's `hqdefault.jpg`. `img.youtube.com` is
  allowed in `images.remotePatterns`.

## Gotcha: X videos return 403 to other sites

`video.twimg.com` answers **403** to any request whose `Referer` is another
site (ethereum.org included), and **200** when no referrer is sent. A `<video>`
element can't set its own referrer policy, so X-hosted video pages set
`referrer: "no-referrer"` in `generateMetadata`. Only those pages are affected.

The inline `VideoWatch` card is rendered inside other pages, which keep their
referrer, so it can't play X videos yet. Use the full video page for them.

## Gotcha: thumbnails are empty until the task runs

Card thumbnails come from the `fetchVideoThumbnails` task (S3). A new video, or a
local setup that can't read the stored map, used to get `src=""`, which breaks
`next/image`. The fallback above covers that.

## Verifying

1. Open `/videos/<slug>/`, press play, and check the video's `currentTime`
   advances with no 403 in the console.
2. Open `/videos/` and check every card's thumbnail loads.
3. Check a YouTube video page still plays and has no `referrer` meta tag.
