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
        "bg-background-highlight [&_[data-label='avatar']]:bg-accent-c mx-auto h-fit max-w-[400px] space-y-1 rounded-2xl border p-6",
        className
      )}
    >
      <div className="space-y-6">
        <p>{description}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <div
          data-label="avatar"
          className="text-body-inverse grid size-8 place-items-center rounded-full"
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-body-medium text-sm">{title}</p>
        </div>
      </div>
    </Card>
  )
}

export default CommentCard
