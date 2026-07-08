import type { StaticImageData } from "next/image"

import postHeader1 from "@/public/images/developers/blog/latest-post-header-1.png"
import postHeader2 from "@/public/images/developers/blog/latest-post-header-2.png"
import postHeader3 from "@/public/images/developers/blog/latest-post-header-3.png"

export const BLOG_HERO_FALLBACKS: readonly StaticImageData[] = [
  postHeader1,
  postHeader2,
  postHeader3,
]

/**
 * Deterministic fallback hero image for a blog post. The same key always
 * maps to the same image so a post looks consistent across the carousel
 * and its article hero when no frontmatter image is set.
 */
export const getBlogFallbackHero = (key: string): StaticImageData => {
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0
  }
  return BLOG_HERO_FALLBACKS[Math.abs(hash) % BLOG_HERO_FALLBACKS.length]
}
