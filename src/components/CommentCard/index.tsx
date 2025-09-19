import { ReactNode } from "react"

import { Card } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

const CommentCard = ({
  description,
  name,
  title,
  className,
}: {
  description: string | ReactNode
  name: string
  title: string
  className?: string
}) => {
  return (
    <Card
      className={cn(
        "mx-auto h-fit max-w-[400px] space-y-1 rounded-2xl border bg-background-highlight p-6 [&_[data-label='avatar']]:bg-accent-c",
        className
      )}
    >
      <div className="space-y-6">
        <p>{description}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <div
          data-label="avatar"
          className="grid size-8 place-items-center rounded-full text-body-inverse"
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm text-body-medium">{title}</p>
        </div>
      </div>
    </Card>
  )
}

export default CommentCard
