import { getLocale } from "next-intl/server"

import { getCommunityStories } from "@/lib/utils/stories"

import WhatAreAppsStoriesList from "./WhatAreAppsStoriesList"

// Featured community stories, with twitter display overrides: the avatar
// derives a handle from a profile URL, while the story data holds status
// links or other platforms
const FEATURED_STORIES: Array<{ storyKey: string; twitter: string | null }> = [
  { storyKey: "story-imrulo-eth", twitter: null },
  { storyKey: "story-casio", twitter: "https://twitter.com/0xCasio" },
  { storyKey: "story-thiago", twitter: null },
]

const WhatAreAppsStories = async () => {
  const locale = await getLocale()
  const allStories = await getCommunityStories(locale)
  const stories = FEATURED_STORIES.flatMap(({ storyKey, twitter }) => {
    const story = allStories.find((s) => s.storyKey === storyKey)
    return story ? [{ ...story, twitter }] : []
  })

  return <WhatAreAppsStoriesList stories={stories} />
}

export default WhatAreAppsStories
