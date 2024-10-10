import React from "react"
import { MdChevronRight } from "react-icons/md"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils/cn"

import * as RootAccordion from "../../../tailwind/ui/accordion"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  // p-4 hover:bg-background-highlight
  <AccordionPrimitive.Header className="flex w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "px-4 py-3 md:px-8 md:py-6",
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
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// TODO: Prop types
const Accordion = ({ children, ...props }) => {
  return (
    <RootAccordion.Accordion
      type="single"
      collapsible
      className={cn(
        "rounded border border-body-light first:border-t-0",
        "overflow-hidden bg-background",
        props?.className
      )}
      {...props}
    >
      {children}
    </RootAccordion.Accordion>
  )
}
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("hover:bg-background-highlight", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden px-4 text-sm md:px-8",
      "transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    )}
    {...props}
  >
    <div className={cn("border-t border-body-light py-3 md:py-6", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
