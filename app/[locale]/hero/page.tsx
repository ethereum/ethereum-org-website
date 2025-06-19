import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"

import { Heading2 } from "@/components/MdComponents"

import { breakpointAsNumber } from "@/lib/utils/screen"

import heroImage from "@/public/images/home/hero.png"

export default async function HeroQualityDemo() {
  const locale = getLocale()
  const t = await getTranslations({ locale, namespace: "page-index" })

  const alt = t("page-index-hero-image-alt")

  // Generate quality values from 100% to 5% in 5% decrements
  const qualityValues = Array.from({ length: 20 }, (_, i) => 100 - i * 5)

  return (
    <div className="min-h-screen bg-background">
      <div className="mb-8 p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">
          Hero Image Quality Comparison
        </h1>
        <p className="text-body-medium">
          Comparing the homepage hero image at different quality settings (100%
          to 5% in 5% decrements)
        </p>
      </div>

      <div className="space-y-8">
        {qualityValues.map((quality) => (
          <div key={quality} className="w-full">
            <div className="px-6 pb-4">
              <Heading2
                id={quality.toString()}
                className="m-0 text-xl font-semibold"
              >
                Quality: {quality}%
              </Heading2>
            </div>
            <div className="mx-auto w-full max-w-[1536px]">
              <div className="h-[240px] overflow-hidden md:h-[380px] lg:h-[480px]">
                <Image
                  src={heroImage}
                  alt={`${alt} (Quality: ${quality}%)`}
                  width={1536}
                  height={480}
                  quality={quality}
                  sizes={`(max-width: ${breakpointAsNumber["2xl"]}px) 100vw, ${breakpointAsNumber["2xl"]}px`}
                  className="h-full w-full object-cover"
                  priority={quality >= 80} // Only prioritize the highest quality images
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-4xl px-8">
        <div className="rounded-lg bg-background-highlight p-6">
          <h3 className="mb-4 text-lg font-semibold">Usage Notes:</h3>
          <ul className="space-y-2 text-sm text-body-medium">
            <li>
              • Lower quality (5-20%) = smaller file size, faster loading, but
              visible compression artifacts
            </li>
            <li>
              • Medium quality (25-50%) = balanced file size and visual quality
            </li>
            <li>
              • Higher quality (55-100%) = larger file size, slower loading, but
              better visual fidelity
            </li>
            <li>
              • The optimal quality depends on your performance vs visual
              quality requirements
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
