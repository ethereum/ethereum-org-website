import { type BaseHTMLAttributes, type ElementRef, forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"

type FlexElement = ElementRef<"div">

type FlexProps = BaseHTMLAttributes<HTMLDivElement> & { asChild?: boolean }

const Flex = forwardRef<FlexElement, FlexProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return <Comp ref={ref} className={cn("flex", className)} {...props} />
  }
)

Flex.displayName = "Flex"

const Center = forwardRef<FlexElement, FlexProps>(
  ({ className, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        className={cn("items-center justify-center gap-2", className)}
        {...props}
      />
    )
  }
)

Center.displayName = "Center"

const Stack = forwardRef<FlexElement, FlexProps>(
  ({ className, ...props }, ref) => {
    return (
      <Flex ref={ref} className={cn("flex-col gap-2", className)} {...props} />
    )
  }
)

Stack.displayName = "Stack"

const HStack = forwardRef<FlexElement, FlexProps>(
  ({ className, ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        className={cn("flex-row items-center", className)}
        {...props}
      />
    )
  }
)

HStack.displayName = "HStack"

const VStack = forwardRef<FlexElement, FlexProps>(
  ({ className, ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        className={cn("flex-col items-center", className)}
        {...props}
      />
    )
  }
)

VStack.displayName = "VStack"

export { Center, Flex, HStack, Stack, VStack }
