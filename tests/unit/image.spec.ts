import { expect, test } from "@playwright/test"

import { isVolatileRemoteImage } from "@/components/Image"

test.describe("isVolatileRemoteImage", () => {
  test("identifies third-party user-managed image hosts", () => {
    const volatileSources = [
      "https://img.evbuc.com/event.jpg",
      "https://images.lumacdn.com/banner.png?width=800",
      "https://secure.meetupstatic.com/photo.webp",
      "https://avatars3.githubusercontent.com/u/123?v=4",
      "https://unavatar.io/github/example",
      "https://coin-images.coingecko.com/coins/images/1/large/token.png",
    ]

    for (const src of volatileSources) {
      expect(isVolatileRemoteImage(src)).toBe(true)
    }
  })

  test("keeps local and stable remote images optimized", () => {
    const optimizedSources = [
      "/images/ethereum.png",
      "https://s3-dcl1.ethquokkaops.io/app.png",
      "https://storage.googleapis.com/ethereum/image.png",
      "not a URL",
    ]

    for (const src of optimizedSources) {
      expect(isVolatileRemoteImage(src)).toBe(false)
    }
  })
})
