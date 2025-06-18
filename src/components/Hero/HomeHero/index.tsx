import { getTranslations } from "next-intl/server"

import type { ClassNameProp, CommonHeroProps, Lang } from "@/lib/types"

import LanguageMorpher from "@/components/Homepage/LanguageMorpher"
import { Image } from "@/components/Image"

export type HomeHeroProps = Pick<CommonHeroProps, "heroImg"> &
  ClassNameProp & {
    locale: Lang
  }

const HomeHero = async ({ heroImg, className, locale }: HomeHeroProps) => {
  const t = await getTranslations({ locale, namespace: "page-index" })

  return (
    <div className={className}>
      <div className="h-[240px] md:h-[380px] lg:h-[480px]">
        <Image
          src={heroImg}
          alt={t("page-index-hero-image-alt")}
          // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
          sizes="(max-width: 1504px) 100vw, 1504px"
          className="h-full w-full object-cover"
          quality={20}
          priority
        />
      </div>
      <div className="flex flex-col items-center border-t-[3px] border-primary-low-contrast px-4 py-10 text-center">
        <LanguageMorpher />
        <div className="flex flex-col items-center gap-y-5 lg:max-w-2xl">
          <h1 className="font-black">{t("page-index-title")}</h1>
          <p className="max-w-96 text-md text-body-medium lg:text-lg">
            {t("page-index-description")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomeHero
