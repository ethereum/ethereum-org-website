import { Image } from "@/components/Image"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"

import type { VideoCourse } from "../types"

type VideoCourseCardProps = {
  course: VideoCourse
  className?: string
}

const VideoCourseCard = ({ course, className }: VideoCourseCardProps) => (
  <Card
    href={course.href}
    className={className}
    customEventOptions={{
      eventCategory: "video-courses",
      eventAction: "click",
      eventName: course.title,
    }}
    variant="ghost"
    size="xs"
  >
    <CardBanner size="sm">
      <Image
        src={course.imgSrc}
        alt={course.imgAlt}
        className="transition-transform group-hover:scale-105 group-hover:transition-transform"
        sizes="(max-width: 480px) calc(100vw - 2rem), 300px"
      />
    </CardBanner>
    <CardContent>
      <Tag
        status="warning"
        size="small"
        className="mt-4 rounded-sm px-1 py-0 font-bold normal-case"
      >
        {course.hours}
      </Tag>
      <CardTitle size="sm">{course.title}</CardTitle>
      <CardParagraph size="sm">{course.description}</CardParagraph>
    </CardContent>
  </Card>
)

export default VideoCourseCard
