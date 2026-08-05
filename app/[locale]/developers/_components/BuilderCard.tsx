import { Image } from "@/components/Image"
import {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"

import type { DevelopersPath } from "../types"

type BuildCardProps = {
  path: DevelopersPath
}

const BuilderCard = ({ path }: BuildCardProps) => (
  <Card
    href={path.href}
    variant="ghost"
    className="border"
    customEventOptions={{
      eventCategory: "top_boxes",
      eventAction: "click",
      eventName: path.tag,
    }}
  >
    <CardHeader>
      <CardBanner fit="contain" background="none">
        <Image
          src={path.imgSrc}
          alt={path.imgAlt}
          sizes="(max-width: 480px) calc(100vw - 6rem), 285px"
        />
      </CardBanner>
    </CardHeader>
    <CardContent spacing="xs">
      {path.tag && (
        <Tag
          status="warning"
          size="small"
          className="rounded-sm px-1 py-px font-bold normal-case"
        >
          {path.tag}
        </Tag>
      )}
      <CardTitle size="sm">{path.title}</CardTitle>
      <CardParagraph size="sm">{path.description}</CardParagraph>
    </CardContent>
    <CardFooter>
      <CardButtonFake>{path.button}</CardButtonFake>
    </CardFooter>
  </Card>
)

export default BuilderCard
