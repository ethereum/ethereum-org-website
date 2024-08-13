import { useState } from "react"
import { MdSwipeLeft, MdSwipeRight } from "react-icons/md"

import { cn } from "@/lib/utils/cn"

import BentoBox, { BentoBoxProps } from "./Box"
import Title from "./Title"

import ImpactImage from "@/public/images/impact_transparent.png"
import ManAndDogImage from "@/public/images/man-and-dog-playing.png"
import ManBabyWomanImage from "@/public/images/man-baby-woman.png"
import RobotBarImage from "@/public/images/robot-help-bar.png"
import MergeImage from "@/public/images/upgrades/merge.png"

const BentoBoxes = () => {
  const [activeIndex, setActiveIndex] = useState(0)

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

  const n = bentoBoxes.length

  const getPositionFromIndex = (index: number) => {
    if (index === 0) return "z-[5] rotate-[-2deg]"
    if (index === 1) return "z-[4] rotate-[-1deg]"
    if (index === 2) return "z-[3] rotate-[0deg]"
    if (index === 3) return "z-[2] rotate-[1deg]"
    if (index === 4) return "z-[1] rotate-[2deg]"
    console.warn("Warning, index out of range; tw classes may not be correct")
    return "z-0 rotate-0"
  }

  const progressCard = () => setActiveIndex((prev) => (prev + 1) % n)

  const regressCard = () => setActiveIndex((prev) => (prev - 1 + n) % n)

  // Animation of old top card when active index progresses
  // Progression: 0%: z-[5] translate-x-0 rotate-0 origin-bottom, 50%: z-[5] translate-x-[120%] rotate-45 origin-bottom, 51%%: z-[1] translate-x-[120%] rotate-45 origin-bottom, 100%: z-[1] translate-x-[0%] rotate-[8deg] origin-bottom

  return (
    <>
      {/* Mobile */}
      <div className="relative my-16 overflow-visible lg:hidden">
        <Title className="" />
        <div className="absolute inset-x-0 top-128 z-10 flex justify-evenly py-1 text-4xl">
          <button onClick={regressCard}>
            <MdSwipeLeft />
          </button>
          <button onClick={progressCard}>
            <MdSwipeRight />
          </button>
        </div>
        {/* TODO: Fix height constraints */}
        <div className="relative mx-auto grid h-[800px] max-w-[min(calc(100vw_-_10rem),30rem)]">
          {bentoBoxes.map(({ className, ...box }, idx) => {
            const adjustedIndex = (idx - activeIndex + n) % n
            return (
              // TODO: Complete mobile gesture animations
              <BentoBox
                key={box.title}
                imgHeight={400}
                className={cn(
                  className,
                  "origin-bottom",
                  "bg-background",
                  "transition-all duration-200",
                  getPositionFromIndex(adjustedIndex),
                  adjustedIndex === 0 ? "relative" : "absolute",
                  "inset-0"
                )}
                {...box}
                imgWidth={undefined} // Intentionally last to override box
              />
            )
          })}
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
