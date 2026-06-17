import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { ChevronNext } from "@/components/Chevron"

import { cn } from "@/lib/utils/cn"

const AccordionContainer = ({
  className,
  ...props
}: React.BaseHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("w-full max-w-5xl space-y-4", className)} {...props} />
  )
}

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={className} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    hideIcon?: boolean
  }
>(({ className, children, hideIcon = false, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex [font-size:inherit]">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-2 px-2 py-2 font-medium transition-all hover:bg-background-highlight hover:text-primary-hover focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover md:px-4 [&[data-state=open]]:bg-background-highlight [&[data-state=open]]:text-primary-high-contrast [&[data-state=open]_[data-label=icon-container]>svg]:-rotate-90 [&[data-state=open]:dir(rtl)_[data-label=icon-container]>svg]:rotate-90",
        className
      )}
      {...props}
    >
      <>
        {children}
        {!hideIcon && (
          <div data-label="icon-container">
            <ChevronNext className="size-[1em] shrink-0 text-2xl transition-transform duration-200" />
          </div>
        )}
      </>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, forceMount = true, children, ...props }, ref) => (
  // With forceMount, Radix never hides closed content, so collapse is
  // CSS-only: grid rows animate 1fr <-> 0fr. duration-200! (important) is
  // required because Radix zeroes this node's inline transition-duration
  // while re-measuring on every toggle. The visibility transition drops
  // closed content from the tab order without removing it from the DOM.
  <AccordionPrimitive.Content
    ref={ref}
    forceMount={forceMount} // forceMount keeps content in DOM for SEO crawlers
    className="grid grid-rows-[1fr] text-sm transition-[grid-template-rows,visibility] duration-200! ease-out data-[state=closed]:invisible data-[state=closed]:grid-rows-[0fr]"
    {...props}
  >
    {/* The grid item must clip overflow and carry no vertical padding
        (padding floors a box's height, so the 0fr row could never fully
        collapse); padding lives one level deeper instead. */}
    <div className="min-h-0 overflow-hidden">
      <div className={cn("p-2 md:p-4", className)}>{children}</div>
    </div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {
  Accordion,
  AccordionContainer,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
}
