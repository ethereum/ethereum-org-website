"use client"

import { cva, type VariantProps } from "class-variance-authority"

import type { ToCItem } from "@/lib/types"

import Github from "@/components/icons/github.svg"
import ItemsList from "@/components/TableOfContents/ItemsList"
import Mobile from "@/components/TableOfContents/TableOfContentsMobile"

import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "../ui/buttons/Button"

import { useActiveHash } from "@/hooks/useActiveHash"
import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/routing"

const variants = cva(
  "sticky hidden flex-col items-start overflow-y-auto lg:flex",
  {
    variants: {
      variant: {
        default:
          "top-19 min-w-48 max-w-[25%] p-4 pe-0 h-[calc(100vh-80px)] gap-4",
        beginner: cn(
          "top-[7.25rem] min-w-80 max-w-72 lg:p-8 px-3 py-2",
          "h-fit shrink-0 space-y-2.5 rounded-2xl bg-accent-a/10 text-body-medium",
          "[&_ul]:list-decimal [&_ul]:border-s-0 [&_ul]:text-base [&_ul]:list-inside [&_ul]:ps-0"
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const labelVariants = cva("text-body-medium", {
  variants: {
    variant: {
      default: "uppercase",
      beginner: "font-bold text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface TableOfContentsProps extends VariantProps<typeof variants> {
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
  variant,
  ...rest
}: TableOfContentsProps) => {
  const pathname = usePathname()
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
    return <Mobile variant={variant} items={items} maxDepth={maxDepth} />
  }

  return (
    <aside className={variants({ variant, className })} {...rest}>
      {!hideEditButton && editPath && (
        <ButtonLink
          href={editPath}
          variant="outline"
          customEventOptions={{
            eventCategory: "edit_page",
            eventAction: "gh_edit_click",
            eventName: `${pathname}`,
          }}
        >
          <Github />
          {t("edit-page")}
        </ButtonLink>
      )}
      <div className={labelVariants({ variant })}>{t("on-this-page")}</div>
      <ul className="m-0 mb-2 mt-2 list-none gap-2 border-s border-s-body-medium ps-4 pt-0 text-sm">
        <ItemsList
          items={items}
          depth={0}
          maxDepth={maxDepth ? maxDepth : 1}
          activeHash={activeHash}
          variant={variant}
        />
      </ul>
    </aside>
  )
}

export default TableOfContents
