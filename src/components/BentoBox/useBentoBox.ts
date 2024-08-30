import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"

import { cn } from "@/lib/utils/cn"

import type { BentoCardProps } from "./BentoCard"

import ImpactImage from "@/public/images/impact_transparent.png"
import ManAndDogImage from "@/public/images/man-and-dog-playing.png"
import ManBabyWomanImage from "@/public/images/man-baby-woman.png"
import RobotBarImage from "@/public/images/robot-help-bar.png"
import MergeImage from "@/public/images/upgrades/merge.png"

const flow = {
  mobile: {
    down: "flex-col bg-gradient-to-b",
    up: "flex-col-reverse bg-gradient-to-t",
    right: "flex-row bg-gradient-to-r",
    left: "flex-row-reverse bg-gradient-to-l",
  },
  md: {
    down: "md:flex-col md:bg-gradient-to-b",
    up: "md:flex-col-reverse md:bg-gradient-to-t",
    right: "md:flex-row md:bg-gradient-to-r",
    left: "md:flex-row-reverse md:bg-gradient-to-l",
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
        title: t("page-index:page-index-bento-defi-title"),
        children: t("page-index:page-index-bento-defi-content"),
        action: t("page-index:page-index-bento-defi-action"),
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
        title: t("page-index:page-index-bento-dapps-title"),
        children: t("page-index:page-index-bento-dapps-content"),
        action: t("page-index:page-index-bento-dapps-action"),
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
        title: t("page-index:page-index-bento-networks-title"),
        children: t("page-index:page-index-bento-networks-content"),
        action: t("page-index:page-index-bento-networks-action"),
        href: "/layer-2/",
        imgSrc: ManBabyWomanImage,
        imgWidth: 324,
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
        title: t("page-index:page-index-bento-assets-title"),
        children: t("page-index:page-index-bento-assets-content"),
        action: t("page-index:page-index-bento-assets-action"),
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
    ])
  }, [t])

  return { items }
}
