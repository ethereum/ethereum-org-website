"use client"

import { Fragment, useState } from "react"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { Button } from "./ui/buttons/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { BaseLink } from "./ui/Link"

export interface ListItem {
  text: string
  href?: string
  matomo?: {
    eventCategory: string
    eventAction: string
    eventName: string
  }
  callback?: (idx: number) => void
  /** Nested sub-items rendered beneath this item, marked with a leading dash per level. */
  items?: Array<ListItem>
}

/** Visual nesting marker; excluded from accessible names. Levels past the first indent the dash with an em space per extra level. */
const SUB_ITEM_MARKER = "–" // en dash
const SUB_ITEM_INDENT = " " // em space

export interface List {
  text: string
  ariaLabel: string
  items: Array<ListItem>
}

export type ButtonDropdownProps = {
  list: List
  className?: string
}

const ButtonDropdown = ({ list, className }: ButtonDropdownProps) => {
  const [selectedItem, setSelectedItem] = useState(list.text)

  const handleClick = (item: ListItem, idx: number) => {
    if (item.matomo) trackCustomEvent(item.matomo)
    item.callback?.(idx)
    setSelectedItem(item.text)
  }

  const renderItems = (items: Array<ListItem>, depth = 0): React.ReactNode =>
    items.map((item, idx) => {
      const label = (
        <>
          {depth > 0 && (
            <span aria-hidden className="me-2">
              {SUB_ITEM_INDENT.repeat(depth - 1) + SUB_ITEM_MARKER}
            </span>
          )}
          {item.text}
        </>
      )
      return (
        <Fragment key={item.text}>
          <DropdownMenuItem
            className="justify-start ps-8 pe-4 text-start"
            onClick={() => handleClick(item, idx)}
            asChild={!!item.href}
          >
            {item.href ? (
              <BaseLink
                href={item.href}
                className="text-body no-underline focus-visible:outline-0"
              >
                {label}
              </BaseLink>
            ) : (
              <span>{label}</span>
            )}
          </DropdownMenuItem>
          {item.items?.length ? renderItems(item.items, depth + 1) : null}
        </Fragment>
      )
    })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label={list.ariaLabel}
          className={cn("flex justify-between", className)}
        >
          <Menu aria-hidden />
          <span className="flex-1 text-center">{selectedItem}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        scrollAffordance
        className="w-(--radix-dropdown-menu-trigger-width)"
        collisionPadding={16}
        sideOffset={8}
      >
        {renderItems(list.items)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ButtonDropdown
