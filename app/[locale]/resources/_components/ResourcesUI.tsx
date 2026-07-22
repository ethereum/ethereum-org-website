import Link from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import { Image } from "../../../../src/components/Image"
import { Item } from "../types"

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
      "group/item flex gap-2 p-4 text-body no-underline not-last:border-b hover:bg-background-highlight hover:text-body",
      className
    )}
    customEventOptions={{
      eventCategory: "dashboard",
      eventAction: "links",
      eventName: title,
    }}
    hideArrow
  >
    <div className="size-6 shrink-0">
      <Image src={imgSrc} alt={title} />
    </div>
    <div className="w-full">
      <h3 className="text-base text-inherit">{title}</h3>
      <p className="text-inherit">{description}</p>
      <Tag className="mt-2 rounded-full text-inherit normal-case group-hover/item:bg-primary-low-contrast">
        {href}
      </Tag>
    </div>
  </Link>
)

export const ResourcesContainer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "overflow-hidden rounded-base border bg-background",
      className
    )}
    {...props}
  />
)
