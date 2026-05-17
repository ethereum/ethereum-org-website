import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils/cn"

import Emoji, { type EmojiProps } from "../Emoji"

import { Button } from "./buttons/Button"

const alertVariants = cva(
  "flex flex-row gap-4 items-center rounded-lg border p-4",
  {
    variants: {
      variant: {
        info: "bg-background-highlight border",
        error:
          "border-error bg-error-light [&_h6]:text-error [&_svg]:text-error text-gray-800",
        success:
          "border-success bg-success-light [&_h6]:text-success [&_svg]:text-success text-gray-800",
        warning:
          "border-warning bg-warning-light [&_h6]:text-warning [&_svg]:text-warning text-gray-800",
        update:
          "bg-primary-low-contrast border-primary-high-contrast [&_h6]:text-primary-high-contrast [&_svg]:text-primary-high-contrast",
      },
      size: {
        // Useful for banner alerts
        full: "rounded-none border-none w-full",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant, size }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-1 flex-col", className)} {...props} />
))
AlertContent.displayName = "AlertContent"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h6 ref={ref} className={cn("tracking-tight", className)} {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "[&_p]:mt-0 [&_p]:mb-4 [&_p]:leading-relaxed [&_p:last-child]:mb-0",
      className
    )}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(async ({ className, ...props }, ref) => {
  const t = await getTranslations("common")
  return (
    <Button
      ref={ref}
      variant="ghost"
      className={cn("-me-4 rounded-full text-body", className)}
      {...props}
      aria-label={props["aria-label"] || t("close")}
    >
      <X className="h-6 w-6" />
    </Button>
  )
})
AlertCloseButton.displayName = "AlertCloseButton"

const AlertEmoji = ({ className, ...props }: EmojiProps) => (
  <Emoji
    className={cn(
      "shrink-0 grow-0 self-start text-4xl sm:self-auto",
      className
    )}
    {...props}
  />
)

const AlertIcon = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-0.5 shrink-0 self-start [&>svg]:size-6", className)}
    {...props}
  >
    {children}
  </div>
)

export {
  Alert,
  AlertCloseButton,
  AlertContent,
  AlertDescription,
  AlertEmoji,
  AlertIcon,
  AlertTitle,
}
