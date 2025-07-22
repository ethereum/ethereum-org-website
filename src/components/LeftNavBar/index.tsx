import type { ToCItem } from "@/lib/types"

import ButtonDropdown, {
  List as ButtonDropdownList,
} from "@/components/ButtonDropdown"
import Translation from "@/components/Translation"
import UpgradeTableOfContents from "@/components/UpgradeTableOfContents"

import { cn } from "@/lib/utils/cn"

export type LeftNavBarProps = {
  dropdownLinks?: ButtonDropdownList
  maxDepth?: number
  tocItems: ToCItem[]
  className?: string
}

const LeftNavBar = ({
  dropdownLinks,
  maxDepth = 1,
  tocItems,
  className,
  ...props
}: LeftNavBarProps) => {
  return (
    <aside
      className={cn(
        "z-99 sticky top-[6.25rem] me-16 ms-8 flex h-[calc(100vh-80px)] basis-[400px] flex-col",
        className
      )}
      {...props}
    >
      {dropdownLinks && (
        <div className="relative mb-8 flex items-end justify-end">
          <ButtonDropdown
            list={dropdownLinks}
            className="w-full min-w-[240px]"
          />
        </div>
      )}
      <h2 className="mb-8 text-3xl leading-xs">
        <Translation id="on-this-page" />
      </h2>
      {tocItems && (
        <UpgradeTableOfContents items={tocItems} maxDepth={maxDepth} />
      )}
    </aside>
  )
}

export default LeftNavBar
