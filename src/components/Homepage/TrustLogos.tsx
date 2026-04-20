import { ArrowRight, Check } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import { BaseLink } from "@/components/ui/Link"
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTag,
} from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { numberFormat, numberToPercent } from "@/lib/utils/numbers"

import FloatingCard from "./FloatingCard"

import builtToLastImage from "@/public/images/homepage/built-to-last.png"

type TrustLogosProps = {
  className?: string
  eventCategory?: string
}

const TrustLogos = async ({
  className,
  eventCategory = "Homepage",
}: TrustLogosProps) => {
  const t = await getTranslations("page-index")
  const locale = await getLocale()

  const uptime = numberToPercent(1, locale)
  const count = numberFormat(locale).format(10)

  return (
    <Section
      id="trust"
      variant="responsiveFlex"
      className={cn("justify-between md:items-center", className)}
    >
      <div className="relative shrink-0 md:w-96 lg:w-128">
        <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[700px]">
          <div className="absolute inset-0 w-full overflow-hidden rounded-4xl">
            <Image
              src={builtToLastImage}
              alt={t("page-index-trust-image-alt")}
              sizes="(max-width: 768px) 100vw, 1024px"
              className="h-full w-full object-cover"
            />
          </div>

          <FloatingCard className="absolute -left-4 top-8 z-10 shadow-lg md:top-12 lg:-left-8">
            <p className="text-lg font-bold text-body md:text-xl lg:text-2xl">
              {t("page-index-trust-never-offline")}
            </p>
            <div className="mt-1 flex items-center gap-1 md:mt-2">
              <Check className="size-3 text-success md:size-4" />
              <span className="text-xs font-semibold text-success md:text-sm">
                {t("page-index-trust-uptime", { uptime })}
              </span>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -right-4 bottom-12 z-10 shadow-lg md:-right-6 lg:-right-12">
            <p className="text-lg font-bold text-body md:text-xl lg:text-2xl">
              {t("page-index-trust-years", { count })}
            </p>
            <p className="mt-1 text-xs text-body-medium md:text-sm">
              {t("page-index-trust-since")}
            </p>
          </FloatingCard>
        </div>
      </div>

      <SectionContent className="flex max-w-[660px] flex-1 flex-col gap-6 pt-8 md:gap-8 md:pt-0 lg:gap-10">
        <div className="flex flex-col gap-2">
          <SectionTag variant="plain">{t("page-index-trust-tag")}</SectionTag>
          <SectionHeader className="!mb-0 !mt-0">
            {t("page-index-trust-title")}
          </SectionHeader>
        </div>

        <div className="flex flex-col gap-6 text-lg leading-relaxed text-body-medium lg:text-2xl lg:leading-relaxed">
          <p>{t("page-index-trust-description-1")}</p>
          <p>{t("page-index-trust-description-2")}</p>
        </div>

        <BaseLink
          href="/get-eth/"
          className="inline-flex items-center gap-1 no-underline"
          hideArrow
          customEventOptions={{
            eventCategory,
            eventAction: "section_click",
            eventName: "trust_logos/get_eth",
          }}
        >
          {t("page-index-trust-cta")}
          <ArrowRight className="size-4" />
        </BaseLink>
      </SectionContent>
    </Section>
  )
}

export default TrustLogos
