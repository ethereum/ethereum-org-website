"use client"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"

import { DAPPS_HIGHLIGHT_DATA } from "@/data/dapps/index"

import DappCard from "./DappCard"

import DappHighlightImage from "@/public/images/dapps/dapp-highlight.png"

const DappsHighlight = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="hidden flex-row md:flex">
        {DAPPS_HIGHLIGHT_DATA.map((dapp, index) => (
          <LinkBox
            key={index}
            className="group rounded-xl p-3 hover:bg-background-highlight"
          >
            <LinkOverlay href={dapp.url} className="no-underline">
              <Image
                src={DappHighlightImage}
                alt=""
                className="mb-2 rounded-xl"
              />
              <div className="mb-6">
                <p className="text-body">{dapp.description}</p>
              </div>
              <DappCard dapp={dapp} imageSize={16} />
            </LinkOverlay>
          </LinkBox>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        <SwiperContainer>
          <Swiper>
            {DAPPS_HIGHLIGHT_DATA.map((dapp, index) => (
              <SwiperSlide key={index}>
                <LinkBox className="group w-full">
                  <LinkOverlay
                    href={dapp.url}
                    target="_blank"
                    className="no-underline"
                  >
                    <div className="w-full">
                      <Image
                        src={DappHighlightImage}
                        alt=""
                        className="mb-2 h-auto max-h-[200px] w-full rounded-xl object-cover"
                      />
                    </div>
                    <div className="mb-6 text-body">
                      <p className="text-body">{dapp.description}</p>
                    </div>
                    <DappCard dapp={dapp} imageSize={16} />
                  </LinkOverlay>
                </LinkBox>
              </SwiperSlide>
            ))}
            <SwiperNavigation />
          </Swiper>
        </SwiperContainer>
      </div>
    </div>
  )
}

export default DappsHighlight
