"use client"

import { useState } from "react"
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
}

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
        {list.items.map((item, idx) => (
          <DropdownMenuItem
            key={item.text}
            className="justify-center text-center"
            onClick={() => handleClick(item, idx)}
            asChild={!!item.href}
          >
            {item.href ? (
              <BaseLink
                href={item.href}
                className="text-body no-underline focus-visible:outline-0"
              >
                {item.text}
              </BaseLink>
            ) : (
              <span>{item.text}</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ButtonDropdown
