import Link from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

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
  item: { title, description, href, icon },
  className,
}: ItemProps) => (
  <div className={cn("flex gap-2 p-3", className)}>
    <div>{icon}</div>
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Tag asChild className="mt-1">
        <Link href={href} className="normal-case">
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
