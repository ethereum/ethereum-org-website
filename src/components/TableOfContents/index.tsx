"use client"

import { tv, type VariantProps } from "tailwind-variants"

import type { ToCItem } from "@/lib/types"

import ButtonDropdown, {
  List as ButtonDropdownList,
} from "@/components/ButtonDropdown"
import ItemsList from "@/components/TableOfContents/ItemsList"
import Mobile from "@/components/TableOfContents/TableOfContentsMobile"

import { useActiveHash } from "@/hooks/useActiveHash"
import { useTranslation } from "@/hooks/useTranslation"

const toc = tv({
  slots: {
    // `root` is the sticky flex-item: width caps live here (not on `container`)
    // so a `%` cap resolves against the page column. `self-start` opts the nav
    // out of the flex row's default `align-items: stretch` (docs mount) -- a
    // stretched, full-height sticky box has no room to travel. `h-fit` keeps it
    // content-height in the non-flex (card-in-`<aside>`) mount.
    root: "sticky h-fit self-start max-lg:hidden",
    dropdown: "relative mb-8 flex w-full items-end justify-end",
    container: "flex flex-col items-start overflow-y-auto",
    label: "font-bold",
    list: "mx-0 gap-2 py-0",
  },
  variants: {
    variant: {
      docs: {
        root: "top-19 min-w-48 max-w-[25%]",
        dropdown: "hidden",
        container: [
          "p-4 pb-16 pe-0 gap-4 max-h-[calc(100vh-5rem)]",
          // 1rem fade at the top edge as an overflow-scroll indicator
          "mask-t-from-[calc(100%-1rem)]",
        ],
        label: "uppercase text-body-medium font-normal",
        list: "list-none border-s border-s-body-medium ps-4 my-2 text-sm",
      },
      card: {
        root: "top-28",
        dropdown: "",
        container: [
          "min-w-80 max-w-72 lg:p-8 px-3 py-2",
          "shrink-0 gap-y-2.5 rounded-base bg-accent-a/10 text-body-medium",
        ],
        label: "text-lg text-body-medium",
        list: "list-decimal list-inside ps-0 my-2",
      },
    },
    showDropdown: {
      false: { dropdown: "hidden" },
    },
  },
  defaultVariants: {
    variant: "docs",
  },
})

export interface TableOfContentsProps extends VariantProps<typeof toc> {
  items: Array<ToCItem>
  maxDepth?: number
  isMobile?: boolean
  className?: string
  dropdownLinks?: ButtonDropdownList
}

const TableOfContents = ({
  items,
  maxDepth = 1,
  isMobile,
  className,
  dropdownLinks,
  variant,
  showDropdown,
  ...rest
}: TableOfContentsProps) => {
  const { t } = useTranslation("common")
  const titleIds: Array<string> = []
  if (!isMobile) {
    const getTitleIds = (items: Array<ToCItem>, depth: number): void => {
      // Return early if maxDepth hit
      if (depth > maxDepth) return
      items?.forEach(({ url, items }) => {
        titleIds.push(url)
        items && getTitleIds(items, depth + 1)
      })
    }

    getTitleIds(items, 0)
  }

  const activeHash = useActiveHash(titleIds)

  if (!items) return null

  if (isMobile) {
    return <Mobile variant={variant} items={items} maxDepth={maxDepth} />
  }

  const { root, dropdown, container, label, list } = toc({
    variant,
    showDropdown,
  })

  return (
    <nav className={root()}>
      {dropdownLinks && (
        <div className={dropdown()}>
          <ButtonDropdown list={dropdownLinks} className="w-full min-w-60" />
        </div>
      )}

      <div className={container({ className })} {...rest}>
        <div className={label()}>{t("on-this-page")}</div>
        <ul className={list()}>
          <ItemsList
            items={items}
            depth={0}
            maxDepth={maxDepth ?? 1}
            activeHash={activeHash}
            variant={variant}
          />
        </ul>
      </div>
    </nav>
  )
}

export default TableOfContents
