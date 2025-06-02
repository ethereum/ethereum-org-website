"use client"

import { Image } from "@/components/Image"
import ParallaxImage from "@/components/Image/ParallaxImage"
import Morpher from "@/components/Morpher"

import TenYearBackgroundImage from "@/public/images/10-year-anniversary/10-year-background.png"
import TenYearGraphicImage from "@/public/images/10-year-anniversary/10-year-graphic.png"

const TenYearHero = () => (
  <div>
    <div className="relative mb-16">
      <Image
        src={TenYearBackgroundImage}
        alt="10 Year Anniversary"
        className="max-h-[350px] object-cover"
      />
      <ParallaxImage
        src={TenYearGraphicImage}
        alt="10 Year Anniversary"
        className="absolute left-0 top-0 max-h-[350px] object-contain transition-transform duration-200 ease-out"
      />
    </div>
    <p className="text-center text-3xl">
      Celebrating 10 years of{" "}
      <span className="font-bold text-accent-b">
        <Morpher
          text="censorship resistance"
          words={[
            "censorship resistance",
            "100% uptime",
            "decentralization",
            "community building",
            "developer growth",
            "global collaboration",
            "cypherpunk values",
            "hackathons",
            "censorship resistance",
            "permissionless finance",
            "credible neutrality",
            "the infinite garden",
            "client diversity",
          ]}
        />
      </span>
    </p>
  </div>
)

export default TenYearHero
