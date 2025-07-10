import { Image } from "@/components/Image"
import Link from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import type { VideoCourse } from "../types"

type BuildCardProps = {
  course: VideoCourse
  className?: string
}

const VideoCourseCard = ({ course, className }: BuildCardProps) => (
  <Link
    href={course.href}
    className={cn(
      "group flex h-full w-fit flex-col gap-8 rounded-4xl no-underline",
      className
    )}
    hideArrow
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
        className="mb-0 rounded-[4px] px-1 py-px font-bold normal-case"
      >
        {Math.round(course.hours)}-hour course
      </Tag>
      <h3 className="groupfont-bold text-lg text-body group-hover:underline">
        {course.title}
      </h3>
      <p className="mb-4 text-sm text-body-medium">{course.description}</p>
    </div>
  </Link>
)

export default VideoCourseCard
