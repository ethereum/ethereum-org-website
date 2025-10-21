import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card } from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import type { DevelopersPath } from "../types"

type BuildCardProps = {
  path: DevelopersPath
  className?: string
}

const BuilderCard = ({ path, className }: BuildCardProps) => (
  <Card className={cn("flex flex-col gap-8 rounded-4xl border p-6", className)}>
    <Image
      src={path.imgSrc}
      alt={path.imgAlt}
      className="mx-auto h-44 object-contain"
      sizes="(max-width: 480px) calc(100vw - 6rem), 285px"
    />
    <div className="h-full space-y-1">
      {path.tag && (
        <Tag
          status="warning"
          size="small"
          className="mb-0 rounded-[4px] px-1 py-px font-bold normal-case"
        >
          {path.tag}
        </Tag>
      )}
      <h3 className="text-lg font-bold">{path.title}</h3>
      <p className="mb-4 text-sm text-body-medium">{path.description}</p>
    </div>
    <ButtonLink
      href={path.href}
      className="sm:w-fit"
      customEventOptions={{
        eventCategory: "top_boxes",
        eventAction: "click",
        eventName: path.tag,
      }}
      rel="noopener"
    >
      {path.button}
    </ButtonLink>
  </Card>
)

export default BuilderCard
