import { ArrowRight, Check } from "lucide-react"
import type { StaticImageData } from "next/image"

import { Image } from "@/components/Image"
import { BaseLink } from "@/components/ui/Link"
import {
  Section,
  SectionContent,
  SectionHeader,
  SectionTag,
} from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

import { ENTERPRISE_ETHEREUM_URL } from "@/lib/constants"

import FloatingCard from "./FloatingCard"

import builtToLastImage from "@/public/images/homepage/built-to-last.png"
import blackrockLogo from "@/public/images/homepage/logos/blackrock.webp"
import jpmorganLogo from "@/public/images/homepage/logos/jpmorgan.png"
import mastercardLogo from "@/public/images/homepage/logos/mastercard.png"
import paypalLogo from "@/public/images/homepage/logos/paypal.png"
import robinhoodLogo from "@/public/images/homepage/logos/robinhood.png"
import visaLogo from "@/public/images/homepage/logos/visa.png"

type Logo = {
  src: StaticImageData
  alt: string
  className?: string
}

const logos: Logo[] = [
  { src: mastercardLogo, alt: "Mastercard", className: "h-10" },
  { src: visaLogo, alt: "Visa" },
  { src: jpmorganLogo, alt: "JPMorgan" },
  { src: robinhoodLogo, alt: "Robinhood" },
  { src: paypalLogo, alt: "PayPal" },
  { src: blackrockLogo, alt: "BlackRock" },
]

type TrustLogosProps = {
  className?: string
  eventCategory?: string
}

const TrustLogos = ({
  className,
  eventCategory = "Homepage",
}: TrustLogosProps) => {
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
              alt="Ethereum community illustration"
              sizes="(max-width: 768px) 100vw, 1024px"
              quality={90}
              className="h-full w-full object-cover"
            />
          </div>

          <FloatingCard className="absolute -left-4 top-8 z-10 shadow-lg md:top-12 lg:-left-8">
            <p className="text-lg font-bold text-body md:text-xl lg:text-2xl">
              Never offline
            </p>
            <div className="mt-1 flex items-center gap-1 md:mt-2">
              <Check className="size-3 text-success md:size-4" />
              <span className="text-xs font-semibold text-success md:text-sm">
                100% uptime
              </span>
            </div>
          </FloatingCard>

          <FloatingCard className="absolute -right-4 bottom-12 z-10 shadow-lg md:-right-6 lg:-right-12">
            <p className="text-lg font-bold text-body md:text-xl lg:text-2xl">
              10 years
            </p>
            <p className="mt-1 text-xs text-body-medium md:text-sm">
              Since 2015
            </p>
          </FloatingCard>
        </div>
      </div>

      <SectionContent className="flex max-w-[660px] flex-1 flex-col gap-6 pt-8 md:gap-8 md:pt-0 lg:gap-10">
        <div className="flex flex-col gap-2">
          <SectionTag variant="plain">
            Trusted by leading institutions
          </SectionTag>
          <SectionHeader className="!mb-0 !mt-0">Built to last</SectionHeader>
        </div>

        <p className="text-lg leading-relaxed text-body-medium lg:text-2xl lg:leading-relaxed">
          Major financial institutions choose Ethereum because it&apos;s the
          most battle-tested, low-risk, and dependable blockchain. The code is
          open, the network is always on, and the track record speaks for
          itself.
        </p>

        <BaseLink
          href={ENTERPRISE_ETHEREUM_URL}
          className="inline-flex items-center gap-1 no-underline"
          hideArrow
          customEventOptions={{
            eventCategory,
            eventAction: "section_click",
            eventName: "trust_logos/enterprise",
          }}
        >
          See institutional adoption
          <ArrowRight className="size-4" />
        </BaseLink>

        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          {logos.map((logo) => (
            <div key={logo.alt} className="flex h-12 w-36 items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                className={cn(
                  "h-7 w-auto object-contain grayscale dark:invert",
                  logo.className
                )}
                sizes="144px"
              />
            </div>
          ))}
        </div>
      </SectionContent>
    </Section>
  )
}

export default TrustLogos
