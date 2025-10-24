"use client"

import { cva, type VariantProps } from "class-variance-authority"

import type { ToCItem } from "@/lib/types"

import ButtonDropdown, {
  List as ButtonDropdownList,
} from "@/components/ButtonDropdown"
import Github from "@/components/icons/github.svg"
import ItemsList from "@/components/TableOfContents/ItemsList"
import Mobile from "@/components/TableOfContents/TableOfContentsMobile"

import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "../ui/buttons/Button"

import { useActiveHash } from "@/hooks/useActiveHash"
import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/routing"

const variants = cva(
  "sticky flex h-fit max-lg:hidden flex-col items-start overflow-y-auto max-h-[calc(100vh-5rem)]",
  {
    variants: {
      variant: {
        docs: "top-19 min-w-48 max-w-[25%] p-4 pe-0 gap-4",
        card: cn(
          "top-28 min-w-80 max-w-72 lg:p-8 px-3 py-2",
          "shrink-0 gap-y-2.5 rounded-2xl bg-accent-a/10 text-body-medium"
        ),
        left: "top-28 me-16 ms-8 basis-[400px] [&_ul]:leading-relaxed",
      },
    },
    defaultVariants: {
      variant: "docs",
    },
  }
)

const labelVariants = cva("font-bold", {
  variants: {
    variant: {
      docs: "uppercase text-body-medium font-normal",
      card: "text-lg text-body-medium",
      left: "mb-8 text-3xl leading-xs",
    },
  },
  defaultVariants: {
    variant: "docs",
  },
})

const listVariants = cva("mx-0 gap-2 py-0", {
  variants: {
    variant: {
      docs: "list-none border-s border-s-body-medium ps-4 my-2 text-sm",
      card: "list-decimal list-inside ps-0 my-2",
      left: "list-none my-0",
    },
  },
  defaultVariants: {
    variant: "docs",
  },
})

export interface TableOfContentsProps extends VariantProps<typeof variants> {
  items: Array<ToCItem>
  maxDepth?: number
  editPath?: string
  hideEditButton?: boolean
  isMobile?: boolean
  className?: string
  dropdownLinks?: ButtonDropdownList
  showDropdown?: boolean
}

const TableOfContents = ({
  items,
  maxDepth = 1,
  editPath,
  hideEditButton = false,
  isMobile = false,
  className,
  variant,
  dropdownLinks,
  showDropdown = true,
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
    <nav className={variants({ variant, className })} {...rest}>
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
      {variant === "left" && showDropdown && dropdownLinks && (
        <div className="relative mb-8 flex w-full items-end justify-end">
          <ButtonDropdown
            list={dropdownLinks}
            className="w-full min-w-[240px]"
          />
        </div>
      )}
      <div className={labelVariants({ variant })}>{t("on-this-page")}</div>
      <ul className={listVariants({ variant })}>
        <ItemsList
          items={items}
          depth={0}
          maxDepth={maxDepth ?? 1}
          activeHash={activeHash}
          variant={variant}
        />
      </ul>
    </nav>
  )
}

export default TableOfContents
