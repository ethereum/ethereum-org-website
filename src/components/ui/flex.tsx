import {
  type BaseHTMLAttributes,
  Children,
  cloneElement,
  type ElementRef,
  forwardRef,
  Fragment,
  isValidElement,
  type ReactElement,
  useMemo,
} from "react"
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

type StackProps = FlexProps & { separator?: ReactElement }

const Stack = forwardRef<FlexElement, StackProps>(
  ({ className, separator, children, ...props }, ref) => {
    const cloneChildren = useMemo(() => {
      if (!separator) return children

      const validChildren = Children.toArray(children).filter((child) =>
        isValidElement(child)
      )

      const sep = cloneElement(separator, {
        className: cn(
          separator.props.className,
          "size-auto border self-stretch"
        ),
      })

      return validChildren.map((child, index) => {
        const key = typeof child.key !== "undefined" ? child.key : index

        return (
          <Fragment key={key}>
            {index === 0 ? null : sep}
            {child}
          </Fragment>
        )
      })
    }, [separator, children])
    return (
      <Flex ref={ref} className={cn("flex-col gap-2", className)} {...props}>
        {cloneChildren}
      </Flex>
    )
  }
)

Stack.displayName = "Stack"

const HStack = forwardRef<FlexElement, StackProps>(
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

const VStack = forwardRef<FlexElement, StackProps>(
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

export { Center, Flex, type FlexProps, HStack, Stack, VStack }
