import {
  ElementRef,
  forwardRef,
  type HTMLAttributes,
  type OlHTMLAttributes,
} from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"

export type ListProps<T = HTMLAttributes<HTMLUListElement>> = T & {
  asChild?: boolean
}

const List = forwardRef<ElementRef<"ul">, ListProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "ul"
    return (
      <Comp
        ref={ref}
        className={cn("mb-6 ms-6 list-disc", className)}
        {...props}
      />
    )
  }
)

List.displayName = "List"

// Alias
const UnorderedList = List

const OrderedList = forwardRef<
  ElementRef<"ol">,
  ListProps<OlHTMLAttributes<HTMLOListElement>>
>(({ className, children, ...props }, ref) => (
  <List className={cn("list-decimal", className)} asChild>
    <ol ref={ref} {...props}>
      {children}
    </ol>
  </List>
))

OrderedList.displayName = "OrderedList"

const ListItem = forwardRef<ElementRef<"li">, HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("mb-3 last:mb-0 [&_ol]:mt-3 [&_ul]:mt-3", className)}
      {...props}
    />
  )
)

ListItem.displayName = "ListItem"

export { List, ListItem, OrderedList, UnorderedList }
