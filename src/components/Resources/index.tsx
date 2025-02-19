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
  <div
    className={cn("flex gap-2 border-b p-3 last-of-type:border-0", className)}
  >
    <div className="m-1 size-[18px] shrink-0 text-[18px]">
      <Image src={imgSrc} alt={title} />
    </div>
    <div>
      <h3 className="text-lg">{title}</h3>
      <p>{description}</p>
      <Tag asChild>
        <Link href={href} className="mt-1 rounded-full normal-case">
          {href}
        </Link>
      </Tag>
    </div>
  </div>
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
