"use client"

import { Folder } from "lucide-react"

import { AppCategory, AppData } from "@/lib/types"

import AppCard, { type AppCardProps } from "@/components/AppCard"
import { Button } from "@/components/ui/buttons/Button"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { breakpointAsNumber } from "@/lib/utils/screen"
import { slugify } from "@/lib/utils/url"

import { appsCategories } from "@/data/apps/categories"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"
import { useIsClient } from "@/hooks/useIsClient"
import useTranslation from "@/hooks/useTranslation"

interface TopAppsProps {
  appsData: Record<AppCategory, AppData[]>
}

const TopApps = ({ appsData }: TopAppsProps) => {
  const { t } = useTranslation("page-apps")
  const isClient = useIsClient()
  const cardStyling = useBreakpointValue<{
    layout: AppCardProps["layout"]
    imageSize: AppCardProps["imageSize"]
  }>({
    base: {
      layout: "vertical",
      imageSize: "small",
    },
    sm: {
      layout: "vertical",
      imageSize: "small",
    },
    md: {
      layout: "vertical",
      imageSize: "small",
    },
    lg: {
      layout: "horizontal",
      imageSize: "medium",
    },
    xl: {
      layout: "horizontal",
      imageSize: "medium",
    },
    "2xl": {
      layout: "horizontal",
      imageSize: "medium",
    },
  })

  // Use fallback values during SSR to prevent hydration mismatch
  const imageSize = isClient ? cardStyling.imageSize : "small"
  const layout = isClient ? cardStyling.layout : "vertical"

  return (
    <SwiperContainer>
      <Swiper
        slidesPerView={1.2}
        spaceBetween={32}
        breakpoints={{
          [breakpointAsNumber.sm]: {
            slidesPerView: 1.2,
            slidesPerGroup: 1,
          },
          [breakpointAsNumber.md]: {
            slidesPerView: 2.2,
            slidesPerGroup: 2,
          },
          [breakpointAsNumber.lg]: {
            slidesPerView: 3.2,
            slidesPerGroup: 3,
          },
        }}
        onSlideChange={({ activeIndex }) => {
          trackCustomEvent({
            eventCategory: "apps",
            eventAction: "categories",
            eventName: `topapps_swipe_${activeIndex + 1}`,
          })
        }}
      >
        {Object.keys(appsData).map((category) => (
          <SwiperSlide key={category}>
            <div className="flex flex-col rounded-xl border">
              <LinkBox className="rounded-t-xl border-b p-4 hover:bg-background-highlight">
                <LinkOverlay
                  href={`/apps/categories/${slugify(category)}`}
                  className="text-body no-underline"
                  matomoEvent={{
                    eventCategory: "apps",
                    eventAction: "categories",
                    eventName: `topapps_category_name_${category}`,
                  }}
                >
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg border p-2">
                        {(() => {
                          // Find the category data by matching the name
                          const categoryData = Object.values(
                            appsCategories
                          ).find((cat) => cat.name === category)
                          const CategoryIcon = categoryData?.icon
                          return CategoryIcon ? (
                            <CategoryIcon className="h-6 w-6" />
                          ) : (
                            <Folder className="h-6 w-6" />
                          )
                        })()}
                      </div>
                      <p className="text-lg font-bold text-body no-underline group-hover:text-primary">
                        {t(appsCategories[category].name)}
                      </p>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        isSecondary
                        size="sm"
                        className="w-fit"
                      >
                        <p className="text-sm">{t("page-apps-see-all")}</p>
                      </Button>
                    </div>
                  </div>
                </LinkOverlay>
              </LinkBox>
              <div className="flex flex-col">
                {appsData[category].slice(0, 5).map((app) => (
                  <div key={app.name} className="border-b last:border-b-0">
                    <AppCard
                      name={app.name}
                      thumbnail={app.image}
                      tags={app.subCategory}
                      href={`/apps/${slugify(app.name)}`}
                      layout={layout}
                      imageSize={imageSize}
                      customEventOptions={{
                        eventCategory: "apps",
                        eventAction: "top_apps",
                        eventName: `app name ${app.name}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SwiperNavigation />
      </Swiper>
    </SwiperContainer>
  )
}

export default TopApps
