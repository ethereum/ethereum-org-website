"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import * as SelectPrimitive from "@radix-ui/react-select"

import { cn } from "@/lib/utils/cn"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "eth-flex eth-h-10 eth-w-full eth-items-center eth-justify-between eth-rounded-md eth-border eth-border-input eth-bg-background eth-px-3 eth-py-2 eth-text-sm eth-ring-offset-background placeholder:eth-text-muted-foreground focus:eth-outline-none focus:eth-ring-2 focus:eth-ring-ring focus:eth-ring-offset-2 disabled:eth-cursor-not-allowed disabled:eth-opacity-50 [&>span]:eth-line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="eth-h-4 eth-w-4 eth-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "eth-flex eth-cursor-default eth-items-center eth-justify-center eth-py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="eth-h-4 eth-w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "eth-flex eth-cursor-default eth-items-center eth-justify-center eth-py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="eth-h-4 eth-w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "eth-relative eth-z-50 eth-max-h-96 eth-min-w-[8rem] eth-overflow-hidden eth-rounded-md eth-border eth-bg-popover eth-text-popover-foreground eth-shadow-md data-[state=open]:eth-animate-in data-[state=closed]:eth-animate-out data-[state=closed]:eth-fade-out-0 data-[state=open]:eth-fade-in-0 data-[state=closed]:eth-zoom-out-95 data-[state=open]:eth-zoom-in-95 data-[side=bottom]:eth-slide-in-from-top-2 data-[side=left]:eth-slide-in-from-right-2 data-[side=right]:eth-slide-in-from-left-2 data-[side=top]:eth-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:eth-translate-y-1 data-[side=left]:eth--translate-x-1 data-[side=right]:eth-translate-x-1 data-[side=top]:eth--translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "eth-p-1",
          position === "popper" &&
            "eth-h-[var(--radix-select-trigger-height)] eth-w-full eth-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("eth-py-1.5 eth-pl-8 eth-pr-2 eth-text-sm eth-font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "eth-relative eth-flex eth-w-full eth-cursor-default eth-select-none eth-items-center eth-rounded-sm eth-py-1.5 eth-pl-8 eth-pr-2 eth-text-sm eth-outline-none focus:eth-bg-accent focus:eth-text-accent-foreground data-[disabled]:eth-pointer-events-none data-[disabled]:eth-opacity-50",
      className
    )}
    {...props}
  >
    <span className="eth-absolute eth-left-2 eth-flex eth-h-3.5 eth-w-3.5 eth-items-center eth-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="eth-h-4 eth-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("eth--mx-1 eth-my-1 eth-h-px eth-bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
