import type { Lang } from "@/lib/types"

import HomeHero2026 from "@/components/Hero/HomeHero2026"
import FeatureCards from "@/components/Homepage/FeatureCards"
import GetStartedGrid from "@/components/Homepage/GetStartedGrid"
import KPISection from "@/components/Homepage/KPISection"
import SavingsCarousel from "@/components/Homepage/SavingsCarousel"
import SimulatorSection from "@/components/Homepage/SimulatorSection"
import TrustLogos from "@/components/Homepage/TrustLogos"
import MainArticle from "@/components/MainArticle"

import { getDirection } from "@/lib/utils/direction"

type Homepage2026Props = {
  locale: Lang
  accountHolders: number
  transactionsToday: number
  apyData: {
    traditional: {
      label: string
      apy: number
    }
    ethereum: {
      label: string
      apyMin: number
      apyMax: number
    }
  }
}

const Homepage2026 = ({
  locale,
  accountHolders,
  transactionsToday,
  apyData,
}: Homepage2026Props) => {
  const { direction: dir } = getDirection(locale)

  return (
    <MainArticle className="flex w-full flex-col items-center" dir={dir}>
      <HomeHero2026 />

      <div className="my-24 w-full space-y-24 px-4 md:mx-6 lg:my-32 lg:space-y-32">
        <KPISection
          accountHolders={accountHolders}
          transactionsToday={transactionsToday}
          className="py-12"
        />

        <SavingsCarousel apyData={apyData} className="py-12" />

        <TrustLogos className="py-12" />

        <FeatureCards />

        <SimulatorSection className="py-12" />

        <GetStartedGrid />
      </div>
    </MainArticle>
  )
}

export default Homepage2026
