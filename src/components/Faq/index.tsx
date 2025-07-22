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
      "w-full p-4 md:px-8 md:py-6",
      "text-start font-medium",
      "hover:text-body [&[data-state=open]_h2]:text-current [&[data-state=open]_svg]:-rotate-90 hover:[&_h2]:!text-body [&_svg]:rotate-90",
      "[&_[data-label='icon-container']]:ms-8 [&_[data-label='icon-container']]:rounded-full [&_[data-label='icon-container']]:border [&_[data-label='icon-container']]:border-body [&_[data-label='icon-container']]:p-2 [&_svg]:text-lg",
      "[&_[data-label='icon-container']:hover_svg]:text-primary-hover hover:[&_[data-label='icon-container']]:!border-primary-hover hover:[&_[data-label='icon-container']]:shadow-[4px_4px_0_hsla(var(--primary-low-contrast),1)]",
      "[&[data-state=open]]:text-current",
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
        "overflow-hidden rounded border",
        "w-full bg-background",
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
    className={cn(
      "w-full border-b last:border-b-0 hover:bg-background-highlight [&[data-state=open]]:bg-background-highlight",
      className
    )}
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
