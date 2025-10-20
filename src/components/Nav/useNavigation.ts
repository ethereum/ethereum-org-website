import BookIcon from "@/components/icons/book.svg"
import BuildingsIcon from "@/components/icons/buildings.svg"
import CodeSquareIcon from "@/components/icons/code-square.svg"
import CompassIcon from "@/components/icons/compass.svg"
import EthereumIcon from "@/components/icons/ethereum-icon.svg"
import FlagIcon from "@/components/icons/flag.svg"
import Flask from "@/components/icons/flask.svg"
import JournalCodeIcon from "@/components/icons/journal-code.svg"
import LayersIcon from "@/components/icons/layers.svg"
import LightbulbIcon from "@/components/icons/lightbulb.svg"
import MegaphoneIcon from "@/components/icons/megaphone.svg"
import MortarboardIcon from "@/components/icons/mortarboard.svg"
import PinAngleIcon from "@/components/icons/pin-angle.svg"
import SafeIcon from "@/components/icons/safe.svg"
import SignpostIcon from "@/components/icons/signpost.svg"
import SlidersHorizontalCircles from "@/components/icons/sliders-horizontal-circles.svg"
import UiChecksGridIcon from "@/components/icons/ui-checks-grid.svg"
import UsersFourLight from "@/components/icons/users-four-light.svg"

import type { NavItem, NavSections } from "./types"

import useTranslation from "@/hooks/useTranslation"
import { buildNavigation } from "@/lib/nav/buildNavigation"

export const useNavigation = () => {
  const { t } = useTranslation("common")

  const linkSections: NavSections = buildNavigation(t)

  const iconById: Record<string, NavItem["icon"]> = {
    "learn/overview": CompassIcon,
    "learn/basics": UiChecksGridIcon,
    "learn/advanced": SlidersHorizontalCircles,
    "learn/quizzes": MortarboardIcon,
    "use/get-started": PinAngleIcon,
    "use/use-cases": LightbulbIcon,
    "use/stake": SafeIcon,
    "use/networks": LayersIcon,
    "build/home": CodeSquareIcon,
    "build/get-started": FlagIcon,
    "build/docs": JournalCodeIcon,
    "build/business": BuildingsIcon,
    "participate/community-hub": UsersFourLight,
    "participate/events": MegaphoneIcon,
    "participate/ethereum-org": EthereumIcon,
    "research/whitepaper": BookIcon,
    "research/roadmap": SignpostIcon,
    "research/research": Flask,
  }

  const applyIconsToItems = (items: NavItem[]): NavItem[] =>
    items.map((item) => {
      const icon = item.id ? iconById[item.id] : undefined
      if ("items" in item && item.items) {
        return {
          ...item,
          ...(icon ? { icon } : {}),
          items: applyIconsToItems(item.items),
        }
      }
      return { ...item, ...(icon ? { icon } : {}) } as NavItem
    })

  const linkSectionsWithIcons: NavSections = {
    learn: {
      ...linkSections.learn,
      items: applyIconsToItems(linkSections.learn.items),
    },
    use: {
      ...linkSections.use,
      items: applyIconsToItems(linkSections.use.items),
    },
    build: {
      ...linkSections.build,
      items: applyIconsToItems(linkSections.build.items),
    },
    participate: {
      ...linkSections.participate,
      items: applyIconsToItems(linkSections.participate.items),
    },
    research: {
      ...linkSections.research,
      items: applyIconsToItems(linkSections.research.items),
    },
  }

  return { linkSections: linkSectionsWithIcons }
}
