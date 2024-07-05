import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const alertVariants = cva(
  "eth-relative eth-w-full eth-rounded-lg eth-border eth-p-4 [&>svg~*]:eth-pl-7 [&>svg+div]:eth-translate-y-[-3px] [&>svg]:eth-absolute [&>svg]:eth-left-4 [&>svg]:eth-top-4 [&>svg]:eth-text-foreground",
  {
    variants: {
      variant: {
        default: "eth-bg-background eth-text-foreground",
        destructive:
          "eth-border-destructive/50 eth-text-destructive dark:eth-border-destructive [&>svg]:eth-text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("eth-mb-1 eth-font-medium eth-leading-none eth-tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("eth-text-sm [&_p]:eth-leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription,AlertTitle }
