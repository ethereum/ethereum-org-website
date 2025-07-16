import type { Level, NavItem } from "../types"

import { navMenuVariants } from "./MenuContent"

type ItemProps = {
  item: NavItem
  lvl: Level
}

const ItemContent = ({ item, lvl }: ItemProps) => {
  const { label, description } = item
  const { linkSubtext } = navMenuVariants({ level: lvl })

  return (
    <div className="relative me-auto text-start">
      <p className="font-bold">{label}</p>
      <p className={linkSubtext()}>{description}</p>
    </div>
  )
}

export default ItemContent
