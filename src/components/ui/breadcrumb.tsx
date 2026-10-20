import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"
import { addSlashes } from "@/lib/utils/url"

import { BaseLink, type LinkProps } from "./Link"

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode
}
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "m-0 flex list-none flex-wrap items-center text-sm tracking-wider",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      "m-0 inline-flex items-center gap-1.5 tracking-wider",
      className
    )}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const classes = cn(
    "!text-body-medium uppercase no-underline transition-colors hover:!text-primary",
    className
  )

  if (asChild) return <Slot ref={ref} className={classes} {...props} />

  return (
    <BaseLink
      ref={ref}
      className={classes}
      isPartiallyActive={false}
      customEventOptions={{
        eventCategory: "breadcrumbs",
        eventAction: "click",
        // Canonical trailing-slash form, so one target is one event name
        eventName: addSlashes(props.href ?? "/"),
      }}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("text-primary uppercase", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("m-0", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = async ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  const t = await getTranslations("common")
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4 text-md" aria-label={t("more")} />
    </span>
  )
}
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  type BreadcrumbProps,
  BreadcrumbSeparator,
}
