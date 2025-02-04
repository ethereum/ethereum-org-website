import React from "react"
import { useTranslation } from "next-i18next"
import { MdExpandMore } from "react-icons/md"

import type { ToCItem } from "@/lib/types"

import { Button } from "../ui/buttons/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import ItemsListMobile from "./ItemsListMobile"

export type TableOfContentsMobileProps = {
  items?: Array<ToCItem>
  maxDepth?: number
}

const Mobile = ({ items, maxDepth }: TableOfContentsMobileProps) => {
  const { t } = useTranslation("common")

  if (!items) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          isSecondary
          variant="outline"
          className="flex w-full justify-between lg:hidden"
        >
          <span className="flex-1 text-center">{t("on-this-page")}</span>
          <MdExpandMore />
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
