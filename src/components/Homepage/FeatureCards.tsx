import { getLocale, getTranslations } from "next-intl/server"

import { ChevronNext } from "@/components/Chevron"
import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Section, SectionHeader } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { formatCompactNumber } from "@/lib/utils/numbers"

import freeAccessImage from "@/public/images/homepage/features/free-access.png"
import globalImage from "@/public/images/homepage/features/global.png"
import ownershipImage from "@/public/images/homepage/features/ownership.png"
import publicRulesImage from "@/public/images/homepage/features/public-rules.png"

type FeatureCardsProps = {
  className?: string
  eventCategory?: string
}

const FeatureCards = async ({
  className,
  eventCategory = "Homepage",
}: FeatureCardsProps) => {
  const t = await getTranslations("page-index")
  const locale = await getLocale()

  const volume = formatCompactNumber(4_600_000_000, locale, {
    maximumSignificantDigits: 2,
  })

  return (
    <Section
      className={cn(
        "rounded-none bg-background-highlight py-20 lg:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <SectionHeader className="mb-0 mt-0">
            {t("page-index-features-title")}{" "}
            <span className="text-body">
              {t("page-index-features-title-highlight")}
            </span>
          </SectionHeader>
          <p className="max-w-xl text-lg text-body-medium">
            {t("page-index-features-subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-purple-700 to-purple-500 p-8 shadow-xl lg:col-span-7">
              <Image
                src={ownershipImage}
                alt=""
                sizes="(max-width: 1024px) 50vw, 600px"
                className="absolute -bottom-16 -end-16 h-2/3 w-auto object-contain opacity-25"
              />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-white/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/homepage/eth.svg" alt="eth logo" />
                </div>

                <h3 className="text-4xl font-bold text-white lg:text-5xl">
                  {t("page-index-features-ownership-title")}
                </h3>

                <p className="max-w-lg text-lg text-white/90">
                  {t("page-index-features-ownership-description-1")}{" "}
                  <span className="opacity-70">
                    {t("page-index-features-ownership-description-custody")}
                  </span>
                  .{" "}
                  <strong className="font-bold">
                    {t("page-index-features-ownership-description-2")}
                  </strong>
                </p>

                <div className="mt-4">
                  <p className="text-3xl font-bold text-white">
                    {t("page-index-features-ownership-stat", { volume })}
                  </p>
                  <p className="text-sm text-white/70">
                    {t("page-index-features-ownership-stat-label")}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border bg-background p-8 lg:col-span-5">
              <Image
                src={publicRulesImage}
                alt=""
                sizes="(max-width: 1024px) 50vw, 450px"
                className="absolute -bottom-12 -end-24 h-2/3 w-auto object-contain"
              />

              <div className="relative z-10">
                <h3 className="mb-4 text-4xl font-black lg:text-5xl">
                  {t("page-index-features-public-rules-title")}
                </h3>
                <p className="max-w-xs text-body">
                  {t("page-index-features-public-rules-description")}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-3xl border bg-background p-8">
              <Image
                src={globalImage}
                alt=""
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                className="absolute -bottom-6 -end-8 h-2/3 w-auto object-contain"
              />

              <div className="relative z-10">
                <h3 className="mb-4 text-3xl font-black">
                  {t("page-index-features-global-title")}
                </h3>
                <p className="text-body">
                  {t("page-index-features-global-description")}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border bg-background p-8">
              <Image
                src={freeAccessImage}
                alt=""
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                className="absolute -bottom-6 -end-8 h-2/3 w-auto object-contain"
              />

              <div className="relative z-10">
                <h3 className="mb-4 text-3xl font-black">
                  {t("page-index-features-free-access-title")}
                </h3>
                <p className="text-body">
                  {t("page-index-features-free-access-description")}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-body p-8 md:col-span-2 lg:col-span-1">
              <h3 className="mb-3 text-3xl font-black">
                {t("page-index-features-nobody-owns-title")}
              </h3>
              <p className="text-body">
                {t("page-index-features-nobody-owns-description")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink
            href="/what-is-ethereum/"
            size="lg"
            customEventOptions={{
              eventCategory,
              eventAction: "section_click",
              eventName: "feature_cards/learn_more",
            }}
          >
            {t("page-index-features-cta")} <ChevronNext />
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}

export default FeatureCards
