import React, { useState } from "react"
import { MdMenu } from "react-icons/md"

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
    const { matomo, callback } = item

    if (matomo) {
      trackCustomEvent(matomo)
    }

    if (callback) {
      callback(idx)
    }
    setSelectedItem(item.text)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("flex justify-between", className)}
        >
          <MdMenu />
          <span className="flex-1 text-center">{selectedItem}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
        sideOffset={8}
      >
        {list.items.map((item, idx) => {
          const { text, href } = item

          if (href) {
            return (
              <DropdownMenuItem
                key={item.text}
                className="justify-center text-center"
                onClick={() => handleClick(item, idx)}
                asChild
              >
                <BaseLink
                  href={item.href!}
                  className="text-body no-underline focus-visible:outline-0"
                >
                  <span>{text}</span>
                </BaseLink>
              </DropdownMenuItem>
            )
          }

          return (
            <DropdownMenuItem
              key={item.text}
              className="justify-center text-center"
              onClick={() => handleClick(item, idx)}
            >
              <span>{text}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ButtonDropdown
