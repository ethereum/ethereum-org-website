import type { StaticImageData } from "next/image"
import { getImageProps } from "next/image"

import { breakpointAsNumber } from "@/lib/utils/screen"

// Import all landscape images (all PNG now)
import developersHubHero from "@/public/images/heroes/developers-hub-hero.png"
// Import all portrait images (all PNG)
import developersHubHeroPortrait from "@/public/images/heroes/developers-hub-hero-portrait.png"
import layerTwoHubHero from "@/public/images/heroes/layer-2-hub-hero.png"
import layerTwoHubHeroPortrait from "@/public/images/heroes/layer-2-hub-hero-portrait.png"
import learnHubHero from "@/public/images/heroes/learn-hub-hero.png"
import learnHubHeroPortrait from "@/public/images/heroes/learn-hub-hero-portrait.png"
import quizzesHubHero from "@/public/images/heroes/quizzes-hub-hero.png"
import quizzesHubHeroPortrait from "@/public/images/heroes/quizzes-hub-hero-portrait.png"

const imageMap: Record<
  string,
  {
    mobile: StaticImageData
    desktop: StaticImageData
  }
> = {
  activity: {
    mobile: layerTwoHubHero,
    desktop: layerTwoHubHeroPortrait,
  },
  learn: {
    mobile: learnHubHero,
    desktop: learnHubHeroPortrait,
  },
  builders: {
    mobile: developersHubHero,
    desktop: developersHubHeroPortrait,
  },
  community: {
    mobile: quizzesHubHero,
    desktop: quizzesHubHeroPortrait,
  },
}

type HomepageSectionImageProps = {
  sectionId: string // e.g. "activity", "learn", "builders", "community"
  alt: string
  className?: string
}

export default function HomepageSectionImage({
  sectionId,
  alt,
  className,
}: HomepageSectionImageProps) {
  const images = imageMap[sectionId]

  if (!images) {
    throw new Error(
      `Image not found for section: ${sectionId}. Available sections: ${Object.keys(imageMap).join(", ")}`
    )
  }

  const common = {
    alt,
    // Be very specific: Desktop max 512px, Mobile 100vw
    sizes: `(max-width: ${breakpointAsNumber.md}px) 100vw, 512px`,
    priority: false,
  }

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    ...images.desktop,
    quality: 25,
  })

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    ...images.mobile,
    quality: 40,
  })

  return (
    <picture className={className}>
      <source
        media={`(min-width: ${breakpointAsNumber.md}px)`}
        srcSet={desktop}
      />
      <source
        media={`(max-width: ${breakpointAsNumber.md - 1}px)`}
        srcSet={mobile}
      />
      <img
        {...rest}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      />
    </picture>
  )
}
