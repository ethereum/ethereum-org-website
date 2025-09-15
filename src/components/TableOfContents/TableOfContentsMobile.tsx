"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import type { ToCItem } from "@/lib/types"

import { Button } from "../ui/buttons/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import ItemsListMobile from "./ItemsListMobile"

import { useTranslation } from "@/hooks/useTranslation"

const variants = cva("flex w-full justify-between lg:hidden", {
  variants: {
    variant: {
      default: "",
      beginner:
        "[&>span]:flex-none mb-16 justify-center rounded-lg border-border bg-accent-a/10 text-lg font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TableOfContentsMobileProps = {
  items?: Array<ToCItem>
  maxDepth?: number
} & VariantProps<typeof variants>

const Mobile = ({ items, maxDepth, variant }: TableOfContentsMobileProps) => {
  const { t } = useTranslation("common")

  if (!items) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button isSecondary variant="outline" className={variants({ variant })}>
          <span className="flex-1 text-center">{t("on-this-page")}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
        // prevents focus from moving to the trigger after closing
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <ItemsListMobile
          items={items}
          depth={0}
          maxDepth={maxDepth ? maxDepth : 1}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Mobile
