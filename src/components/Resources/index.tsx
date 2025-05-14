import Link from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import { Image } from "../Image"

import { Item } from "./types"

export const DashboardBox = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("overflow-hidden rounded-2xl border shadow-lg", className)}
    {...props}
  />
)

type ItemProps = React.HTMLAttributes<HTMLDivElement> & {
  item: Item
}

export const ResourceItem = ({
  item: { title, description, href, imgSrc },
  className,
}: ItemProps) => (
  <Link
    href={href}
    className={cn(
      "flex gap-2 border-b p-3 text-body no-underline last-of-type:border-0 hover:bg-background-highlight hover:text-body",
      className
    )}
    customEventOptions={{
      eventCategory: "dashboard",
      eventAction: "links",
      eventName: title,
    }}
    hideArrow
  >
    <div className="my-1 size-[18px] shrink-0">
      <Image src={imgSrc} alt={title} />
    </div>
    <div className="w-full">
      <h3 className="text-md text-inherit">{title}</h3>
      <p className="text-inherit">{description}</p>
      <Tag className="mt-1 rounded-full normal-case text-inherit">{href}</Tag>
    </div>
  </Link>
)

export const ResourcesContainer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "overflow-hidden rounded-2xl border bg-[#ffffff] dark:bg-[#171717]",
      className
    )}
    {...props}
  />
)
