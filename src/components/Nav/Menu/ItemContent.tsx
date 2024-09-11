import { useRouter } from "next/router"

import { cn } from "@/lib/utils/cn"
import { cleanPath } from "@/lib/utils/url"

import type { Level, NavItem } from "../types"

import { useNavMenuColorsTw } from "@/hooks/useNavMenuColorsTw"

type ItemProps = {
  item: NavItem
  lvl: Level
}

const ItemContent = ({ item, lvl }: ItemProps) => {
  const { label, description, ...action } = item
  const { asPath } = useRouter()
  const menuColors = useNavMenuColorsTw()

  const isLink = "href" in action
  const isActivePage = isLink && cleanPath(asPath) === action.href

  return (
    <div className="relative me-auto text-start">
      <p className={cn("font-bold text-body", menuColors.body)}>{label}</p>
      <p
        className={cn(
          "text-sm",
          isActivePage ? menuColors.body : menuColors.lvl[lvl].subtext
        )}
      >
        {description}
      </p>
    </div>
  )
}

export default ItemContent
