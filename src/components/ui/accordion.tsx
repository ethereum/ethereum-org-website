"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils/cn"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("eth-border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="eth-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "eth-flex eth-flex-1 eth-items-center eth-justify-between eth-py-4 eth-font-medium eth-transition-all hover:eth-underline [&[data-state=open]>svg]:eth-rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="eth-h-4 eth-w-4 eth-shrink-0 eth-transition-transform eth-duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="eth-overflow-hidden eth-text-sm eth-transition-all data-[state=closed]:eth-animate-accordion-up data-[state=open]:eth-animate-accordion-down"
    {...props}
  >
    <div className={cn("eth-pb-4 eth-pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent,AccordionItem, AccordionTrigger }
