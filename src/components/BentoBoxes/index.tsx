import { useEffect } from "react"
import { Swiper } from "swiper"
import { EffectCards } from "swiper/modules"

import { cn } from "@/lib/utils/cn"

import BentoBox, { BentoBoxProps } from "./Box"
import Title from "./Title"

import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/navigation"
import "swiper/css/pagination"

import ImpactImage from "@/public/images/impact_transparent.png"
import ManAndDogImage from "@/public/images/man-and-dog-playing.png"
import ManBabyWomanImage from "@/public/images/man-baby-woman.png"
import RobotBarImage from "@/public/images/robot-help-bar.png"
import MergeImage from "@/public/images/upgrades/merge.png"

const BentoBoxes = () => {
  // Mobile swiper
  useEffect(() => {
    new Swiper(".swiper", {
      grabCursor: true,
      effect: "cards",
      modules: [EffectCards],
    })
  }, [])

  const flow = {
    mobile: {
      down: "flex-col bg-gradient-to-b",
      up: "flex-col-reverse bg-gradient-to-t",
      right: "flex-row bg-gradient-to-r",
      left: "flex-row-reverse bg-gradient-to-l",
    },
    md: {
      down: "md:flex-col md:bg-gradient-to-b md",
      up: "md:flex-col-reverse md:bg-gradient-to-t md",
      right: "md:flex-row md:bg-gradient-to-r md",
      left: "md:flex-row-reverse md:bg-gradient-to-l md",
    },
    lg: {
      down: "lg:flex-col lg:bg-gradient-to-b lg",
      up: "lg:flex-col-reverse lg:bg-gradient-to-t lg",
      right: "lg:flex-row lg:bg-gradient-to-r lg",
      left: "lg:flex-row-reverse lg:bg-gradient-to-l lg",
    },
    xl: {
      down: "xl:flex-col xl:bg-gradient-to-b xl",
      up: "xl:flex-col-reverse xl:bg-gradient-to-t xl",
      right: "xl:flex-row xl:bg-gradient-to-r xl",
      left: "xl:flex-row-reverse xl:bg-gradient-to-l xl",
    },
  }

  const positions = "from-20% to-60%"

  const colors = (color: "primary" | "accent-a" | "accent-b" | "accent-c") => {
    if (color === "primary")
      return "from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10"
    if (color === "accent-a")
      return "from-accent-a/10 to-accent-a/5 dark:from-accent-a/20 dark:to-accent-a/10"
    if (color === "accent-b")
      return "from-accent-b/10 to-accent-b/5 dark:from-accent-b/20 dark:to-accent-b/10"
    if (color === "accent-c")
      return "from-accent-c/10 to-accent-c/5 dark:from-accent-c/20 dark:to-accent-c/10"
  }

  const bentoBoxes: BentoBoxProps[] = [
    {
      title: "Crypto without volatility",
      children:
        "Stablecoins are currencies that maintain stable value. Their price matches the U.S. dollar or other steady asset",
      action: "Learn more",
      href: "/stablecoins/",
      imgSrc: ImpactImage,
      imgWidth: 500,
      className: cn(
        "border-primary/10",
        positions,
        colors("primary"),
        flow.mobile.down,
        flow.lg.up,
        flow.xl.right,
        "lg:col-span-6 lg:row-start-2",
        "xl:col-span-7 xl:col-start-5 xl:row-start-1"
      ),
    },
    {
      title: "A fairer financial system",
      children:
        "Billions can't open bank accounts or freely use their money. Ethereum's financial system is always open and unbiased.",
      action: "Explore DeFi",
      href: "/defi/",
      imgSrc: ManAndDogImage,
      className: cn(
        "border-accent-c/10",
        positions,
        colors("accent-c"),
        flow.mobile.down,
        flow.lg.down,
        flow.xl.up,
        "lg:col-span-6 lg:col-start-7 lg:row-start-2",
        "xl:col-span-4 xl:col-start-2 xl:row-start-2"
      ),
    },
    {
      title: "Innovative apps",
      children:
        "Ethereum apps work without selling your data. Protect your privacy.",
      action: "Browse apps",
      href: "/dapps/",
      imgSrc: MergeImage,
      imgWidth: 320,
      className: cn(
        "border-accent-b/10",
        positions,
        colors("accent-b"),
        flow.mobile.down,
        flow.lg.right,
        flow.xl.down,
        "lg:col-span-12 lg:row-start-3",
        "xl:col-span-3 xl:col-start-6 xl:row-start-2"
      ),
    },
    {
      title: "The network of networks",
      children:
        "Ethereum is the hub for blockchain innovation. The best project are built on Ethereum.",
      action: "Explore benefits",
      href: "/layer-2/",
      imgSrc: ManBabyWomanImage,
      className: cn(
        "border-accent-a/10",
        positions,
        colors("accent-a"),
        flow.mobile.down,
        flow.lg.up,
        flow.xl.up,
        "lg:col-span-6 lg:col-start-7 lg:row-start-4",
        "xl:col-span-3 xl:col-start-9 xl:row-span-2 xl:row-start-2"
      ),
    },
    {
      title: "The internet of assets",
      children:
        "Arts, certificates or even real estate can be tokenized. Anything can be a tradable token. Ownership is public and verifiable.",
      action: "More on NFTs",
      href: "/nft/",
      imgSrc: RobotBarImage,
      imgWidth: 324,
      className: cn(
        "border-primary/10",
        positions,
        colors("primary"),
        flow.mobile.down,
        flow.lg.down,
        flow.xl.right,
        "lg:col-span-6 lg:row-start-4",
        "xl:col-span-7 xl:col-start-2 xl:row-start-3"
      ),
    },
  ]

  return (
    <>
      {/* Mobile */}
      <div className="relative my-16 lg:hidden">
        <Title className="" />
        {/* TODO: Fix height constraints */}
        <div className="swiper mt-4 h-fit max-w-[min(calc(100vw_-_2rem),_30rem)]">
          <div className="swiper-wrapper">
            {bentoBoxes.map(({ className, ...box }) => (
              <BentoBox
                key={box.title}
                imgHeight={160}
                className={cn(
                  className,
                  "swiper-slide bg-background text-body"
                )}
                {...box}
                imgWidth={undefined} // Intentionally last to override box
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="flex grid-cols-bento flex-row gap-4 lg:grid">
          <Title className="lg:col-span-12 lg:flex xl:col-span-3 xl:col-start-2" />
          {bentoBoxes.map((box) => (
            <BentoBox key={box.title} {...box} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BentoBoxes
