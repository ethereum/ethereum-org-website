import React from "react"
import { MdChevronRight } from "react-icons/md"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils/cn"

import * as RootAccordion from "../../../tailwind/ui/accordion"

const FaqAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "w-full px-4 py-3 md:px-8 md:py-6",
        "flex flex-1 items-center justify-between gap-2",
        "border-t border-body-light",
        "focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover",
        "group cursor-pointer text-start font-medium",
        "transition-all [&[data-state=open]>svg]:-rotate-90",
        className
      )}
      {...props}
    >
      {children}

      <MdChevronRight
        className={cn(
          "size-[1em] shrink-0 p-1 text-2xl md:size-[1.25em]",
          "rounded-full border",
          "group-hover:border-primary group-hover:text-primary group-hover:shadow-md group-hover:shadow-primary-low-contrast",
          "transition-transform duration-200"
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
FaqAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const FaqAccordion = ({
  children,
  type,
  ...props
}: AccordionPrimitive.AccordionSingleProps) => {
  return (
    <RootAccordion.Accordion
      type={type}
      collapsible
      className={cn(
        "rounded border border-body-light first:border-t-0",
        "max-w-4xl overflow-hidden bg-background",
        props?.className
      )}
      {...props}
    >
      {children}
    </RootAccordion.Accordion>
  )
}
const FaqAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("hover:bg-background-highlight", className)}
    {...props}
  />
))
FaqAccordionItem.displayName = "AccordionItem"

const FaqAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "w-full overflow-hidden px-4 text-sm md:px-8",
      "transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    )}
    {...props}
  >
    <div className={cn("border-t border-body-light py-3 md:py-6", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))

FaqAccordionContent.displayName = AccordionPrimitive.Content.displayName

export {
  FaqAccordion,
  FaqAccordionContent,
  FaqAccordionItem,
  FaqAccordionTrigger,
}
