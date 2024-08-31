import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"

import { cn } from "@/lib/utils/cn"

import type { BentoCardProps } from "./BentoCard"

import ImpactImage from "@/public/images/impact_transparent.png"
import ManAndDogImage from "@/public/images/man-and-dog-playing.png"
import ManBabyWomanImage from "@/public/images/man-baby-woman.png"
import RobotBarImage from "@/public/images/robot-help-bar.png"
import MergeImage from "@/public/images/upgrades/merge.png"

type Breakpoint = "mobile" | "lg" | "xl"
type Direction = "down" | "up" | "right" | "left"

const flow: Record<Breakpoint, Record<Direction, string>> = {
  mobile: {
    down: "flex-col bg-gradient-to-b",
    up: "flex-col-reverse bg-gradient-to-t",
    right: "flex-row bg-gradient-to-r",
    left: "flex-row-reverse bg-gradient-to-l",
  },
  lg: {
    down: "lg:flex-col lg:bg-gradient-to-b",
    up: "lg:flex-col-reverse lg:bg-gradient-to-t",
    right: "lg:flex-row lg:bg-gradient-to-r",
    left: "lg:flex-row-reverse lg:bg-gradient-to-l",
  },
  xl: {
    down: "xl:flex-col xl:bg-gradient-to-b",
    up: "xl:flex-col-reverse xl:bg-gradient-to-t",
    right: "xl:flex-row xl:bg-gradient-to-r",
    left: "xl:flex-row-reverse xl:bg-gradient-to-l",
  },
}

const pos: Record<Breakpoint, string[]> = {
  mobile: [
    flow.mobile.down,
    flow.mobile.down,
    flow.mobile.down,
    flow.mobile.down,
    flow.mobile.down,
  ],
  lg: [
    cn("lg:col-span-6 lg:row-start-2", flow.lg.up),
    cn("lg:col-span-6 lg:col-start-7 lg:row-start-2", flow.lg.down),
    cn("lg:col-span-12 lg:row-start-3", flow.lg.right),
    cn("lg:col-span-6 lg:col-start-7 lg:row-start-4", flow.lg.up),
    cn("lg:col-span-6 lg:row-start-4", flow.lg.down),
  ],
  xl: [
    cn("xl:col-span-7 xl:col-start-5 xl:row-start-1", flow.xl.right),
    cn("xl:col-span-4 xl:col-start-2 xl:row-start-2", flow.xl.up),
    cn("xl:col-span-3 xl:col-start-6 xl:row-start-2", flow.xl.down),
    cn("xl:col-span-3 xl:col-start-9 xl:row-span-2 xl:row-start-2", flow.xl.up),
    cn("xl:col-span-7 xl:col-start-2 xl:row-start-3", flow.xl.right),
  ],
}

const gradientStops = "from-20% to-60%"

const colors = {
  primary: cn(
    gradientStops,
    "from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/10"
  ),
  "accent-a": cn(
    gradientStops,
    "from-accent-a/10 to-accent-a/5 dark:from-accent-a/20 dark:to-accent-a/10 border-accent-a/10"
  ),
  "accent-b": cn(
    gradientStops,
    "from-accent-b/10 to-accent-b/5 dark:from-accent-b/20 dark:to-accent-b/10 border-accent-b/10"
  ),
  "accent-c": cn(
    gradientStops,
    "from-accent-c/10 to-accent-c/5 dark:from-accent-c/20 dark:to-accent-c/10 border-accent-c/10"
  ),
}

export const useBentoBox = () => {
  const { t } = useTranslation("page-index")
  const [items, setItems] = useState<BentoCardProps[]>([])

  useEffect(() => {
    setItems([
      {
        title: t("page-index-bento-stablecoins-title"),
        children: t("page-index:page-index-bento-stablecoins-content"),
        action: t("page-index:page-index-bento-stablecoins-action"),
        href: "/stablecoins/",
        imgSrc: ImpactImage,
        imgWidth: 400,
        className: cn(colors["primary"], pos.mobile[0], pos.lg[0], pos.xl[0]),
      },
      {
        title: t("page-index:page-index-bento-defi-title"),
        children: t("page-index:page-index-bento-defi-content"),
        action: t("page-index:page-index-bento-defi-action"),
        href: "/defi/",
        imgSrc: ManAndDogImage,
        className: cn(colors["accent-c"], pos.mobile[1], pos.lg[1], pos.xl[1]),
      },
      {
        title: t("page-index:page-index-bento-dapps-title"),
        children: t("page-index:page-index-bento-dapps-content"),
        action: t("page-index:page-index-bento-dapps-action"),
        href: "/dapps/",
        imgSrc: MergeImage,
        imgWidth: 320,
        className: cn(colors["accent-b"], pos.mobile[2], pos.lg[2], pos.xl[2]),
      },
      {
        title: t("page-index:page-index-bento-networks-title"),
        children: t("page-index:page-index-bento-networks-content"),
        action: t("page-index:page-index-bento-networks-action"),
        href: "/layer-2/",
        imgSrc: ManBabyWomanImage,
        imgWidth: 324,
        className: cn(colors["accent-a"], pos.mobile[3], pos.lg[3], pos.xl[3]),
      },
      {
        title: t("page-index:page-index-bento-assets-title"),
        children: t("page-index:page-index-bento-assets-content"),
        action: t("page-index:page-index-bento-assets-action"),
        href: "/nft/",
        imgSrc: RobotBarImage,
        imgWidth: 324,
        className: cn(colors["primary"], pos.mobile[4], pos.lg[4], pos.xl[4]),
      },
    ])
  }, [t])

  return { items }
}
