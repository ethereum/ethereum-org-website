import React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { cn } from "@/lib/utils/cn"

const FaqTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionTrigger
    ref={ref}
    className={cn(
      "w-full px-4 py-3 md:px-8 md:py-6",
      "border-t border-body-light",
      "text-start font-medium",
      className
    )}
    {...props}
  >
    {children}
  </AccordionTrigger>
))
FaqTrigger.displayName = AccordionPrimitive.Trigger.displayName

const Faq = ({
  children,
  type,
  ...props
}: AccordionPrimitive.AccordionSingleProps) => {
  return (
    <Accordion
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
    </Accordion>
  )
}

const FaqItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionItem
    ref={ref}
    className={cn("hover:bg-background-highlight", className)}
    {...props}
  />
))
FaqItem.displayName = "AccordionItem"

const FaqContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionContent
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
  </AccordionContent>
))

FaqContent.displayName = AccordionPrimitive.Content.displayName

export { Faq, FaqContent, FaqItem, FaqTrigger }
