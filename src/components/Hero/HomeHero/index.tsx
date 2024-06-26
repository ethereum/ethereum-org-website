import { useTranslation } from "next-i18next"

import type { CommonHeroProps } from "@/lib/types"

import Morpher from "@/components/Morpher"
import Link from "next/link"
import Image from "next/image"

export type HomeHeroProps = Pick<CommonHeroProps, "heroImg">

const HomeHero = ({ heroImg }: HomeHeroProps) => {
  const { t } = useTranslation("page-index")
  return (
    <div>
      <div className="h-[300px] sm:h-[350px] md:h-[380px] lg:h-[440px]">
        <Image
          src={heroImg}
          alt={t("page-index:page-index-hero-image-alt")}
          sizes="(max-width: 1504px) 100vw, 1504px"
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="space-y-4 lg:space-y-7 text-center mx-4 py-8 max-w-2xl">
          <Morpher />
          <div className="flex flex-col items-center space-y-6 lg:max-w-2xl">
            <h1 className="text-2xl font-bold">
              {t("page-index:page-index-title")}
            </h1>
            <p className="text-lg">{t("page-index:page-index-description")}</p>
            <Link href="/learn/">
              {t("page-index:page-index-title-button")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHero
