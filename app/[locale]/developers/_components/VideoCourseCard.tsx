import { Image } from "@/components/Image"
import { Card } from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import type { VideoCourse } from "../types"

type VideoCourseCardProps = {
  course: VideoCourse
  className?: string
}

const VideoCourseCard = ({ course, className }: VideoCourseCardProps) => (
  <Card
    href={course.href}
    className={cn("group h-full w-fit rounded-4xl no-underline", className)}
    customEventOptions={{
      eventCategory: "video-courses",
      eventAction: "click",
      eventName: course.title,
    }}
  >
    <div className="h-fit w-full overflow-hidden rounded-2xl">
      <Image
        src={course.imgSrc}
        alt={course.imgAlt}
        className="mx-auto h-44 rounded-2xl object-cover transition-transform group-hover:scale-105 group-hover:transition-transform"
        sizes="(max-width: 480px) calc(100vw - 2rem), 300px"
      />
    </div>
    <div className="h-full space-y-1">
      <Tag
        status="warning"
        size="small"
        className="mb-2 mt-4 rounded-[4px] px-1 py-0 font-bold normal-case"
      >
        {/* // TODO: Extract intl */}
        {Math.round(course.hours)}-hour course
      </Tag>
      <h3 className="text-lg font-bold text-body group-hover:underline">
        {course.title}
      </h3>
      <p className="mb-4 text-sm text-body-medium">{course.description}</p>
    </div>
  </Card>
)

export default VideoCourseCard
