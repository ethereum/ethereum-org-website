import { BaseHTMLAttributes, ElementRef, forwardRef } from "react"

import { cn } from "@/lib/utils/cn"

const List = forwardRef<ElementRef<"ul">, BaseHTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("m-0", className)} {...props} />
  )
)

List.displayName = "List"

const ListItem = forwardRef<
  ElementRef<"li">,
  BaseHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={className} {...props} />
))

ListItem.displayName = "ListItem"

export { List, ListItem }
