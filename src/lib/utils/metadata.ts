import { DEFAULT_OG_IMAGE } from "@/lib/constants"

/**
 * List of default og images for different sections
 */
const imageForSlug = [
  { section: "developers", image: "/heroes/developers-hub-hero.jpg" },
  { section: "roadmap", image: "/heroes/roadmap-hub-hero.jpg" },
  { section: "guides", image: "/heroes/guides-hub-hero.jpg" },
  { section: "community", image: "/heroes/community-hero.png" },
  { section: "staking", image: "/upgrades/upgrade_rhino.png" },
] as const

/**
 * Get the default OG image for a page based on the slug
 * @param slug - the slug of the page
 * @returns relative path of image
 */
export const getOgImage = (slug: string[]): string => {
  let result = DEFAULT_OG_IMAGE
  for (const item of imageForSlug) {
    if (slug.includes(item.section)) {
      result = item.image
    }
  }
  return result
}
