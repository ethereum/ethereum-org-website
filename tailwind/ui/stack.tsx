import { type BaseHTMLAttributes, type ElementRef, forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"

type StackElement = ElementRef<"div">

type StackProps = BaseHTMLAttributes<HTMLDivElement> & { asChild?: boolean }

const Stack = forwardRef<StackElement, StackProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      />
    )
  }
)

Stack.displayName = "Stack"

const HStack = forwardRef<StackElement, StackProps>(
  ({ className, ...props }, ref) => {
    return <Stack ref={ref} className={cn("flex-row", className)} {...props} />
  }
)

HStack.displayName = "HStack"

const VStack = forwardRef<StackElement, StackProps>(
  ({ className, ...props }, ref) => {
    return <Stack ref={ref} className={cn("flex-col", className)} {...props} />
  }
)

VStack.displayName = "VStack"

export { HStack, Stack, VStack }
