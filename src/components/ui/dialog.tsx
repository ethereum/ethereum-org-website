"use client"

import * as React from "react"
import { X } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils/cn"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "eth-fixed eth-inset-0 eth-z-50 eth-bg-black/80 eth- data-[state=open]:eth-animate-in data-[state=closed]:eth-animate-out data-[state=closed]:eth-fade-out-0 data-[state=open]:eth-fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "eth-fixed eth-left-[50%] eth-top-[50%] eth-z-50 eth-grid eth-w-full eth-max-w-lg eth-translate-x-[-50%] eth-translate-y-[-50%] eth-gap-4 eth-border eth-bg-background eth-p-6 eth-shadow-lg eth-duration-200 data-[state=open]:eth-animate-in data-[state=closed]:eth-animate-out data-[state=closed]:eth-fade-out-0 data-[state=open]:eth-fade-in-0 data-[state=closed]:eth-zoom-out-95 data-[state=open]:eth-zoom-in-95 data-[state=closed]:eth-slide-out-to-left-1/2 data-[state=closed]:eth-slide-out-to-top-[48%] data-[state=open]:eth-slide-in-from-left-1/2 data-[state=open]:eth-slide-in-from-top-[48%] sm:eth-rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="eth-absolute eth-right-4 eth-top-4 eth-rounded-sm eth-opacity-70 eth-ring-offset-background eth-transition-opacity hover:eth-opacity-100 focus:eth-outline-none focus:eth-ring-2 focus:eth-ring-ring focus:eth-ring-offset-2 disabled:eth-pointer-events-none data-[state=open]:eth-bg-accent data-[state=open]:eth-text-muted-foreground">
        <X className="eth-h-4 eth-w-4" />
        <span className="eth-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "eth-flex eth-flex-col eth-space-y-1.5 eth-text-center sm:eth-text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "eth-flex eth-flex-col-reverse sm:eth-flex-row sm:eth-justify-end sm:eth-space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "eth-text-lg eth-font-semibold eth-leading-none eth-tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("eth-text-sm eth-text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
