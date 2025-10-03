"use client"

import { AppData } from "@/lib/types"

import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { breakpointAsNumber } from "@/lib/utils/screen"

import AppCard from "./AppCard"

import DestinoImage from "@/public/images/devconnect/destino.png"
import DevconnectBannerImage from "@/public/images/devconnect/devconnect-hero.png"

const DevconnectBanner = ({ apps }: { apps: AppData[] }) => {
  const cards = apps
    .slice(0, 18)
    .map((app, index) => (
      <AppCard
        key={index}
        app={app}
        imageSize={24}
        showDescription={false}
        matomoCategory="devconnect_apps"
        matomoAction="click"
      />
    ))

  return (
    <div className="relative flex min-h-20 w-full rounded-2xl bg-gradient-to-b from-transparent via-[#A8E8FF] to-[#A8E8FF] p-8 md:bg-gradient-to-r">
      <Image
        src={DevconnectBannerImage}
        alt="Devconnect Banner"
        className="absolute inset-0 -z-10 h-full rounded-2xl object-cover"
        sizes="100vw"
      />
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <div className="flex w-full flex-col items-center justify-between gap-4 md:w-1/3">
          <Image
            src={DestinoImage}
            alt="Destino"
            className="mx-auto h-auto max-w-[224px] object-contain"
            sizes="100vw"
          />
          <div className="flex flex-col gap-5 rounded-xl bg-white/70 p-2.5 shadow-[0_4px_0_0_rgba(0,0,0,0.35)]">
            <div>
              <p className="font-bold text-black">17 - 22 Nov 2025</p>
              <p className="font-bold text-black">Buenos Aires, Argentina</p>
            </div>
            <ButtonLink
              href="https://devconnect.org/"
              size="md"
              hideArrow
              className="min-h-0 whitespace-nowrap rounded-none border-b-2 border-b-[#B2820A] bg-[#F6B40E] px-4 text-md/none font-bold uppercase text-black hover:bg-[#B2820A] hover:!text-black active:text-black"
            >
              Get tickets
            </ButtonLink>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2 md:w-2/3">
          <h2 className="text-black">Ethereum world fair</h2>
          <p className="text-black">
            Discover some of the apps featuring in Buenos Aires this November.
          </p>
          <div className="relative w-full overflow-hidden">
            <SwiperContainer>
              <Swiper
                slidesPerView={1}
                grid={{
                  rows: 2,
                  fill: "row",
                }}
                breakpoints={{
                  [breakpointAsNumber.sm]: {
                    slidesPerView: 2,
                    grid: {
                      rows: 2,
                      fill: "row",
                    },
                  },
                  [breakpointAsNumber.md]: {
                    slidesPerView: 2,
                    grid: {
                      rows: 3,
                      fill: "row",
                    },
                  },
                }}
              >
                {cards.map((card, index) => (
                  <SwiperSlide key={index}>{card}</SwiperSlide>
                ))}
                <SwiperNavigation />
              </Swiper>
            </SwiperContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DevconnectBanner
