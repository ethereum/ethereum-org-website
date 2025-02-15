import { useTranslation } from "next-i18next"
import { FaGithub } from "react-icons/fa"

import type { ToCItem } from "@/lib/types"

import ItemsList from "@/components/TableOfContents/ItemsList"
import Mobile from "@/components/TableOfContents/TableOfContentsMobile"

import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "../ui/buttons/Button"

import { useActiveHash } from "@/hooks/useActiveHash"

export type TableOfContentsProps = {
  items: Array<ToCItem>
  maxDepth?: number
  editPath?: string
  hideEditButton?: boolean
  isMobile?: boolean
  className?: string
}

const TableOfContents = ({
  items,
  maxDepth = 1,
  editPath,
  hideEditButton = false,
  isMobile = false,
  className,
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

  if (!items) {
    return null
  }
  if (isMobile) {
    return <Mobile items={items} maxDepth={maxDepth} />
  }

  return (
    <aside
      className={cn(
        "sticky top-19 hidden h-[calc(100vh-80px)] min-w-48 max-w-[25%] flex-col items-start gap-4 overflow-y-auto p-4 pe-0 lg:flex",
        className
      )}
      {...rest}
    >
      {!hideEditButton && editPath && (
        <ButtonLink href={editPath} variant="outline">
          <FaGithub />
          {t("edit-page")}
        </ButtonLink>
      )}
      <div className="uppercase text-body-medium">{t("on-this-page")}</div>
      <ul className="m-0 mb-2 mt-2 list-none gap-2 border-s border-s-body-medium ps-4 pt-0 text-sm">
        <ItemsList
          items={items}
          depth={0}
          maxDepth={maxDepth ? maxDepth : 1}
          activeHash={activeHash}
        />
      </ul>
    </aside>
  )
}

export default TableOfContents
