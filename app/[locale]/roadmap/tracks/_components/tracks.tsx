"use client"

import { motion } from "framer-motion"

import BannerNotification from "@/components/Banners/BannerNotification"
import FeedbackCard from "@/components/FeedbackCard"
import { ContentHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { useTracks } from "./useTracks"

import { useActiveHash } from "@/hooks/useActiveHash"
import { useTranslation } from "@/hooks/useTranslation"

const RoadmapTracksPage = () => {
  const { t } = useTranslation("page-roadmap-tracks")
  const tracks = useTracks()
  const activeSection = useActiveHash(
    tracks.map(({ key }) => key),
    "0% 0% -70% 0%"
  ).replace(/^#/, "")

  return (
    <MainArticle className="relative flex flex-col">
      <BannerNotification shouldShow>
        <p>
          Ethereum&apos;s development is community-driven and subject to change.
        </p>
      </BannerNotification>
      <ContentHero
        title="Roadmap tracks"
        description="The Ethereum roadmap, like Ethereum itself, doesn't have a single person or group in charge. One interpretation comes from Ethereum co-founder Vitalik Buterin's 2022 vision, with development shaped by contributions from across the Ethereum community."
        heroImg={"/images/roadmap/roadmap-tracks-hero.png"}
        blurDataURL={""}
        breadcrumbs={{ slug: "roadmap/tracks", startDepth: 1 }}
      />

      <div className="sticky top-1 my-8 flex flex-col items-center gap-3 py-4 text-center md:top-6 md:px-2">
        <div className="my-2 text-body-medium">
          {t("page-roadmap-tracks-whats-on-this-page")}
        </div>
        <nav className="z-sticky mx-4 flex max-w-full gap-1 overflow-x-auto bg-background p-2 shadow md:max-w-[calc(100%-2rem)] md:rounded-2xl md:border md:p-0.5 md:shadow-lg">
          {tracks.map(({ key, title, icon }) => (
            <ButtonLink
              key={key}
              href={`#${key}`}
              variant="ghost"
              isSecondary
              className={cn(
                "relative text-nowrap rounded-xl px-4 py-2 text-sm [&_svg]:shrink-0 [&_svg]:text-sm",
                activeSection === key && "!text-primary"
              )}
            >
              {activeSection === key && (
                <motion.div
                  layoutId="active-section-highlight"
                  className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast"
                />
              )}
              {icon && <span className="z-10 text-lg">{icon}</span>}
              <span className="relative z-10">{title}</span>
            </ButtonLink>
          ))}
        </nav>
      </div>

      <FeedbackCard />
    </MainArticle>
  )
}

export default RoadmapTracksPage
