import { ReactNode } from "react"

import Emoji from "@/components/Emoji"

import { cn } from "@/lib/utils/cn"

export type CardProps = {
  children?: ReactNode
  emoji?: string
  title?: ReactNode
  description?: ReactNode
  className?: string
}

const Card = ({
  emoji,
  title,
  description,
  children,
  className,
  ...props
}: CardProps) => (
  <div
    className={cn(
      "flex flex-col justify-between space-y-4",
      "rounded-sm bg-background-highlight",
      "border border-solid",
      "p-6",
      className
    )}
    {...props}
  >
    <div className="flex flex-col space-y-4">
      {emoji && <Emoji className="text-5xl leading-none" text={emoji} />}
      <div className="flex flex-col space-y-8">
        {title && <h3 className="text-2xl leading-[1.4]">{title}</h3>}
        {description && <p>{description}</p>}
      </div>
    </div>
    {children}
  </div>
)

export default Card
