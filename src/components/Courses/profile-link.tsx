"use client"

import { useEffect, useState } from "react"
import { UserRound } from "lucide-react"
import { useTranslations } from "next-intl"

import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { profileHref } from "@/data/courses"

import { statChip } from "./theme"
import { hasAnyProgress, useCourseProgress } from "./useCourseProgress"

/**
 * Round button beside the progress chips, to the profile page. Hidden until
 * there is any progress, since the profile has nothing to show before that.
 */
const ProfileLink = ({ className }: { className?: string }) => {
  const t = useTranslations("page-courses")
  const { progress } = useCourseProgress()
  // Progress loads from localStorage after mount
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  if (!ready || !hasAnyProgress(progress)) return null

  return (
    <BaseLink
      href={profileHref}
      aria-label={t("page-courses-profile-link")}
      className={cn(
        statChip,
        // Square, as tall as a chip: one line plus its padding and border
        "size-[calc(1lh+0.5rem+4px)] justify-center p-0 text-body-medium no-underline hover:border-primary-hover hover:text-primary-hover",
        className
      )}
    >
      <UserRound aria-hidden className="size-5" />
    </BaseLink>
  )
}

export default ProfileLink
