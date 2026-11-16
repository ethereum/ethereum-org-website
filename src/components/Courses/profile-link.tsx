"use client"

import { useEffect, useState } from "react"
import { SquareArrowRightEnter, UserRound } from "lucide-react"
import { useTranslations } from "next-intl"

import { BaseLink } from "@/components/ui/Link"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"

import { profileHref } from "@/data/courses"

import Avatar from "../Account/avatar"
import SignInDialog from "../Account/sign-in-dialog"

import { syncProgress, useCourseAccount } from "./account-sync"
import { HAS_ACCOUNT_ATTR } from "./progress-storage"
import { statChip } from "./theme"
import { hasAnyProgress, useCourseProgress } from "./useCourseProgress"

import { displayName } from "@/lib/auth/display-name"

const chipHover = "hover:border-primary-hover hover:text-primary-hover"

// Square, as tall as a chip: one line plus its padding and border
const roundChip = cn(
  statChip,
  chipHover,
  "size-[calc(1lh+0.5rem+4px)] justify-center p-0 text-body-medium no-underline"
)

const SignInChip = ({ className }: { className?: string }) => {
  const tAccount = useTranslations("component-account")
  return (
    <SignInDialog
      onSignedIn={() => void syncProgress(true)}
      trigger={
        <button
          type="button"
          className={cn(
            statChip,
            chipHover,
            "cursor-pointer text-body-medium",
            className
          )}
        >
          <SquareArrowRightEnter aria-hidden className="size-6" />
          {tAccount("account-sign-in")}
        </button>
      }
    />
  )
}

/** A signed-in chip's shape, until the session check names the learner */
const PendingChip = ({ className }: { className?: string }) => (
  <span aria-hidden className={cn(statChip, className)}>
    <Skeleton className="size-6 shrink-0 rounded-full" />
    <Skeleton className="h-5 w-28" />
  </span>
)

/**
 * Signed in: the learner's blockie and display name, linking to their
 * profile (where they sign out). Signed out: sign in. Without accounts on
 * this deploy: the profile, once there's progress to show. The courses
 * layout's pre-paint flag picks the server HTML's shape, and the last
 * signed-in learner fills it while the session check is out, so it doesn't
 * jump between states
 */
const ProfileLink = ({ className }: { className?: string }) => {
  const t = useTranslations("page-courses")
  const tAccount = useTranslations("component-account")
  const { progress } = useCourseProgress()
  const { status, user } = useCourseAccount()
  // Progress loads from localStorage after mount
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  // On every courses page with the header: the account's progress in, this
  // browser's up, once per page load
  useEffect(() => {
    if (status === "signed-in") void syncProgress()
  }, [status])

  if (!ready)
    return (
      <>
        {/* Literals for Tailwind's scanner; must match HAS_ACCOUNT_ATTR */}
        <PendingChip
          className={cn("hidden [[data-course-account]_&]:flex", className)}
        />
        <SignInChip
          className={cn("[[data-course-account]_&]:hidden", className)}
        />
      </>
    )

  if (user)
    return (
      <BaseLink
        href={profileHref}
        className={cn(statChip, chipHover, "text-body no-underline", className)}
      >
        <Avatar accountId={user.id} className="size-6" />
        <span className="sr-only">{t("page-courses-profile-link")}: </span>
        <span className="max-w-32 truncate sm:max-w-48">
          {user.name ? displayName(user.name) : tAccount("account-signed-in")}
        </span>
      </BaseLink>
    )

  if (status === "signed-out") return <SignInChip className={className} />

  if (status === "loading")
    // Signed in here before: hold the shape until the session answers
    return document.documentElement.hasAttribute(HAS_ACCOUNT_ATTR) ? (
      <PendingChip className={className} />
    ) : (
      <SignInChip className={className} />
    )

  return hasAnyProgress(progress) ? (
    <BaseLink
      href={profileHref}
      aria-label={t("page-courses-profile-link")}
      className={cn(roundChip, className)}
    >
      <UserRound aria-hidden className="size-6" />
    </BaseLink>
  ) : null
}

export default ProfileLink
