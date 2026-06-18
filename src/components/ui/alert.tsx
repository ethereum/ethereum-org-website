import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"

import Emoji, { type EmojiProps } from "../Emoji"

import { Button } from "./buttons/Button"

const alertVariants = cva(
  "flex gap-4 items-center rounded-base border p-4 text-body/80 **:[:is(h2,h3,h4,h5,h6,strong)]:text-body",
  {
    variants: {
      variant: {
        info: "bg-background-highlight",
        error:
          "dark:border-error/70 border-error dark:bg-error-dark bg-error-light **:[svg:not(.lucide-external-link)]:text-error",
        success:
          "dark:border-success/70 border-success dark:bg-success-dark bg-success-light **:[svg:not(.lucide-external-link)]:text-success",
        warning:
          "dark:border-warning/70 border-warning dark:bg-warning-dark bg-warning-light **:[svg:not(.lucide-external-link)]:text-warning",
        update:
          "border-primary-high-contrast/70 bg-primary-low-contrast **:[svg:not(.lucide-external-link)]:text-primary-high-contrast",
        banner: cn(
          "rounded-none text-balance border-none w-full text-center justify-center bg-primary-action px-8",
          "text-white **:[a]:text-white **:[a]:hover:text-white/80 **:[a]:visited:text-white"
        ),
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

/**
 * Visual notice component. Renders an `aside` for `variant="banner"`,
 * otherwise a `div`. No ARIA role by default -- pass `role="status"` for
 * polite dynamic announcements (e.g. filter result counts) or
 * `role="alert"` for assertive runtime errors.
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  const Comp = variant === "banner" ? "aside" : "div"
  return (
    <Comp
      ref={ref}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-1 flex-col", className)} {...props} />
))
AlertContent.displayName = "AlertContent"

export interface AlertTitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean
}

const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "p"
    return (
      <Comp
        ref={ref}
        className={cn("font-bold text-body", className)}
        {...props}
      />
    )
  }
)
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
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    className={cn("-me-4 rounded-full text-body", className)}
    {...props}
  >
    <X className="h-6 w-6" />
    <span className="sr-only">Close</span>
  </Button>
))
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
