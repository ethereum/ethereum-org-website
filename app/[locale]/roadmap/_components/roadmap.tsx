import BannerNotification from "@/components/Banners/BannerNotification"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import MainArticle from "@/components/MainArticle"

import { useTranslation } from "@/hooks/useTranslation"
import roadmapHeroImg from "@/public/images/heroes/roadmap-hub-hero.jpg"

const RoadmapPage = () => {
  const { t } = useTranslation("page-roadmap")

  const heroContent: HubHeroProps = {
    title: "",
    header: t("page-roadmap-meta-title"),
    description: t("page-roadmap-meta-description"),
    heroImg: roadmapHeroImg,
  }

  return (
    <MainArticle>
      <BannerNotification shouldShow>
        <p>Ethereum’s development is community-driven and subject to change.</p>
      </BannerNotification>

      <HubHero {...heroContent} />
      {/* TODO: ROADMAP CAROUSAL */}
      {/* TODO: WHAT CHANGES ARE COMING UP */}
      {/* TODO: WHY DOES ETHEREUM NEED ROADMAP */}
      {/* TODO: LOOKING FOR SPECIFIC UPGRADES? */}
      {/* TODO: FAQ */}
    </MainArticle>
  )
}

export default RoadmapPage
