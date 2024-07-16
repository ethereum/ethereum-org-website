import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"

/** FIXME: TEMP COMPONENT FOR TESTING PURPOSES */

const buttonVariants = cva(
  "inline-flex items-center justify-cente whitespace-nowrap rounded font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary text-primary bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border border-body bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded px-3",
        lg: "h-11 rounded px-8",
        icon: "h-10 w-10",
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

const ButtonIcon = React.forwardRef<
  HTMLSpanElement,
  React.ButtonHTMLAttributes<HTMLSpanElement> & { icon: React.ReactNode }
>(({ className, icon, ...props }, ref) => {
  return (
    <span
      className={cn("me-2 text-base md:text-2xl", className)}
      ref={ref}
      {...props}
    >
      {icon}
    </span>
  )
})
ButtonIcon.displayName = "ButtonIcon"

export { Button, ButtonIcon, buttonVariants }
