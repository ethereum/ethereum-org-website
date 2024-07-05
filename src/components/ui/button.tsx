import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "eth-inline-flex eth-items-center eth-justify-center eth-whitespace-nowrap eth-rounded-md eth-text-sm eth-font-medium eth-ring-offset-background eth-transition-colors focus-visible:eth-outline-none focus-visible:eth-ring-2 focus-visible:eth-ring-ring focus-visible:eth-ring-offset-2 disabled:eth-pointer-events-none disabled:eth-opacity-50",
  {
    variants: {
      variant: {
        default: "eth-bg-primary eth-text-primary-foreground hover:eth-bg-primary/90",
        destructive:
          "eth-bg-destructive eth-text-destructive-foreground hover:eth-bg-destructive/90",
        outline:
          "eth-border eth-border-input eth-bg-background hover:eth-bg-accent hover:eth-text-accent-foreground",
        secondary:
          "eth-bg-secondary eth-text-secondary-foreground hover:eth-bg-secondary/80",
        ghost: "hover:eth-bg-accent hover:eth-text-accent-foreground",
        link: "eth-text-primary eth-underline-offset-4 hover:eth-underline",
      },
      size: {
        default: "eth-h-10 eth-px-4 eth-py-2",
        sm: "eth-h-9 eth-rounded-md eth-px-3",
        lg: "eth-h-11 eth-rounded-md eth-px-8",
        icon: "eth-h-10 eth-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
