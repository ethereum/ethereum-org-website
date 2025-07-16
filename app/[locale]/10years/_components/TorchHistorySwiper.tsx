"use client"

import { EffectCoverflow, Navigation } from "swiper/modules"
import { SwiperSlide } from "swiper/react"

import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
} from "@/components/ui/swiper"

import TorchHistoryCard from "./TorchHistoryCard"

const mockHolders = [
  {
    name: "Danny Ryan",
    role: "Ethereum researcher & co-founder Ethererelize",
    avatar: "/images/heroes/hero-danny-ryan.png",
    from: "July 03, 10:00pm",
    to: "July 4th, 10:00pm",
    twitter: "setty_rychan",
  },
  {
    name: "Vitalik Buterin",
    role: "Co-founder of Ethereum",
    avatar: "/images/heroes/hero-vitalik-buterin.png",
    from: "July 04, 10:00pm",
    to: "July 5th, 10:00pm",
    twitter: "vitalikbuterin",
  },
  {
    name: "Aya Miyaguchi",
    role: "Executive Director, Ethereum Foundation",
    avatar: "/images/heroes/hero-aya-miyaguchi.png",
    from: "July 05, 10:00pm",
    to: "July 6th, 10:00pm",
    twitter: "AyaMiyagotchi",
  },
  {
    name: "Hudson Jameson",
    role: "Ethereum core dev & community",
    avatar: "/images/heroes/hero-hudson-jameson.png",
    from: "July 06, 10:00pm",
    to: "July 7th, 10:00pm",
    twitter: "hudsonjameson",
  },
  {
    name: "Lefteris Karapetsas",
    role: "Founder, Rotki",
    avatar: "/images/heroes/hero-lefteris-karapetsas.png",
    from: "July 07, 10:00pm",
    to: "July 8th, 10:00pm",
    twitter: "LefterisJP",
  },
  {
    name: "Danny Ryan",
    role: "Ethereum researcher & co-founder Ethererelize",
    avatar: "/images/heroes/hero-danny-ryan.png",
    from: "July 03, 10:00pm",
    to: "July 4th, 10:00pm",
    twitter: "setty_rychan",
  },
  {
    name: "Vitalik Buterin",
    role: "Co-founder of Ethereum",
    avatar: "/images/heroes/hero-vitalik-buterin.png",
    from: "July 04, 10:00pm",
    to: "July 5th, 10:00pm",
    twitter: "vitalikbuterin",
  },
  {
    name: "Aya Miyaguchi",
    role: "Executive Director, Ethereum Foundation",
    avatar: "/images/heroes/hero-aya-miyaguchi.png",
    from: "July 05, 10:00pm",
    to: "July 6th, 10:00pm",
    twitter: "AyaMiyagotchi",
  },
  {
    name: "Hudson Jameson",
    role: "Ethereum core dev & community",
    avatar: "/images/heroes/hero-hudson-jameson.png",
    from: "July 06, 10:00pm",
    to: "July 7th, 10:00pm",
    twitter: "hudsonjameson",
  },
  {
    name: "Lefteris Karapetsas",
    role: "Founder, Rotki",
    avatar: "/images/heroes/hero-lefteris-karapetsas.png",
    from: "July 07, 10:00pm",
    to: "July 8th, 10:00pm",
    twitter: "LefterisJP",
  },
]

const TorchHistorySwiper = () => (
  <SwiperContainer className="w-full">
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 0,
        stretch: -80,
        depth: 200,
        modifier: 2.5,
        slideShadows: false,
      }}
      modules={[EffectCoverflow, Navigation]}
      className="w-full"
    >
      {mockHolders.map((holder, idx) => (
        <SwiperSlide key={idx} className="flex !w-72 justify-center">
          <TorchHistoryCard
            name={holder.name}
            role={holder.role}
            avatar={holder.avatar}
            from={holder.from}
            to={holder.to}
            twitter={holder.twitter}
          />
        </SwiperSlide>
      ))}
      <SwiperNavigation />
    </Swiper>
  </SwiperContainer>
)

export default TorchHistorySwiper
