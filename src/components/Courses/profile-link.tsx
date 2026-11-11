import { UserRound } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { profileHref } from "@/data/courses"

import { statChip } from "./theme"

/** Round button beside the progress chips, to the profile page */
const ProfileLink = async ({ className }: { className?: string }) => {
  const t = await getTranslations("page-courses")
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
