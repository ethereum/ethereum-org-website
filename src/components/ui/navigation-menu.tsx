import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"

import { cn } from "@/lib/utils/cn"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "eth-relative eth-z-10 eth-flex eth-max-w-max eth-flex-1 eth-items-center eth-justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "eth-group eth-flex eth-flex-1 eth-list-none eth-items-center eth-justify-center eth-space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "eth-group eth-inline-flex eth-h-10 eth-w-max eth-items-center eth-justify-center eth-rounded-md eth-bg-background eth-px-4 eth-py-2 eth-text-sm eth-font-medium eth-transition-colors hover:eth-bg-accent hover:eth-text-accent-foreground focus:eth-bg-accent focus:eth-text-accent-foreground focus:eth-outline-none disabled:eth-pointer-events-none disabled:eth-opacity-50 data-[active]:eth-bg-accent/50 data-[state=open]:eth-bg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "eth-group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="eth-relative eth-top-[1px] eth-ml-1 eth-h-3 eth-w-3 eth-transition eth-duration-200 group-data-[state=open]:eth-rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "eth-left-0 eth-top-0 eth-w-full data-[motion^=from-]:eth-animate-in data-[motion^=to-]:eth-animate-out data-[motion^=from-]:eth-fade-in data-[motion^=to-]:eth-fade-out data-[motion=from-end]:eth-slide-in-from-right-52 data-[motion=from-start]:eth-slide-in-from-left-52 data-[motion=to-end]:eth-slide-out-to-right-52 data-[motion=to-start]:eth-slide-out-to-left-52 md:eth-absolute md:eth-w-auto eth-",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("eth-absolute eth-left-0 eth-top-full eth-flex eth-justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "eth-origin-top-center eth-relative eth-mt-1.5 eth-h-[var(--radix-navigation-menu-viewport-height)] eth-w-full eth-overflow-hidden eth-rounded-md eth-border eth-bg-popover eth-text-popover-foreground eth-shadow-lg data-[state=open]:eth-animate-in data-[state=closed]:eth-animate-out data-[state=closed]:eth-zoom-out-95 data-[state=open]:eth-zoom-in-90 md:eth-w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "eth-top-full eth-z-[1] eth-flex eth-h-1.5 eth-items-end eth-justify-center eth-overflow-hidden data-[state=visible]:eth-animate-in data-[state=hidden]:eth-animate-out data-[state=hidden]:eth-fade-out data-[state=visible]:eth-fade-in",
      className
    )}
    {...props}
  >
    <div className="eth-relative eth-top-[60%] eth-h-2 eth-w-2 eth-rotate-45 eth-rounded-tl-sm eth-bg-border eth-shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
}
