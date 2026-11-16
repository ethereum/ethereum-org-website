"use client"

import { type FormEvent, useId, useRef, useState } from "react"
import { SquarePen, UserRound } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"
import { Section } from "@/components/ui/section"
import { Skeleton } from "@/components/ui/skeleton"
import { Tag } from "@/components/ui/tag"

import AccountSettings from "../Account/account-settings"
import Avatar from "../Account/avatar"
import SignInDialog from "../Account/sign-in-dialog"
import { useAccount } from "../Account/use-account"

import {
  releaseAccountProgress,
  syncProgress,
  useCourseAccount,
} from "./account-sync"

import { authClient } from "@/lib/auth/client"
import {
  DISPLAY_NAME_MAX,
  DISPLAY_NAME_MIN,
  displayName,
  type DisplayNameProblem,
  displayNameProblem,
  normalizeDisplayName,
} from "@/lib/auth/display-name"

const NAME_PROBLEMS: DisplayNameProblem[] = [
  "length",
  "characters",
  "link",
  "reserved",
  "language",
]

/**
 * The learner's display name, with an edit button that swaps it for a field.
 * The server checks the name again (and filters words)
 */
const DisplayName = () => {
  const t = useTranslations("component-account")
  const { user, refetch } = useAccount()
  const id = useId()
  const editRef = useRef<HTMLButtonElement>(null)
  const current = user?.name ? displayName(user.name) : ""
  const [draft, setDraft] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const limits = { min: DISPLAY_NAME_MIN, max: DISPLAY_NAME_MAX }
  const problemText = (problem: DisplayNameProblem) =>
    t(`account-name-${problem}`, limits)

  const close = () => {
    setDraft(null)
    setError(null)
    // Back to the button that opened the field
    requestAnimationFrame(() => editRef.current?.focus())
  }

  const save = async (event: FormEvent) => {
    event.preventDefault()
    if (draft === null) return
    const name = normalizeDisplayName(draft)
    if (draft === current || name === current) return close()
    const problem = displayNameProblem(name)
    if (problem) return setError(problemText(problem))
    setBusy(true)
    setError(null)
    const result = await authClient.updateUser({ name })
    setBusy(false)
    if (result.error) {
      const code = result.error.message as DisplayNameProblem
      return setError(
        NAME_PROBLEMS.includes(code) ? problemText(code) : t("account-error")
      )
    }
    refetch()
    close()
  }

  if (draft === null)
    return (
      <div className="flex min-w-0 items-center gap-2">
        <p className="m-0 min-w-0 text-xl font-bold break-words text-body">
          {current}
        </p>
        <Button
          ref={editRef}
          variant="ghost"
          size="sm"
          aria-label={t("account-name-edit")}
          onClick={() => setDraft(current)}
          className="shrink-0 px-2"
        >
          <SquarePen aria-hidden />
        </Button>
      </div>
    )

  return (
    <form
      onSubmit={save}
      onKeyDown={(event) => event.key === "Escape" && close()}
      className="flex flex-col gap-2"
    >
      <Input
        id={id}
        autoFocus
        value={draft}
        maxLength={DISPLAY_NAME_MAX * 2}
        autoComplete="nickname"
        aria-label={t("account-name-label")}
        aria-describedby={`${id}-error`}
        aria-invalid={!!error || undefined}
        onFocus={(event) => event.currentTarget.select()}
        onChange={(event) => {
          setDraft(event.target.value)
          setError(null)
        }}
        className="w-full bg-background text-xl font-bold"
      />
      {/* Kept mounted so a refusal is announced when it appears */}
      <p
        id={`${id}-error`}
        role="status"
        className="m-0 text-sm font-bold text-error empty:hidden"
      >
        {error}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={busy}>
          {t("account-save")}
        </Button>
        <Button type="button" variant="ghost" onClick={close}>
          {t("account-cancel")}
        </Button>
      </div>
    </form>
  )
}

/** The profile's picture: the learner's blockie once signed in */
export const ProfileAvatar = () => {
  const { user } = useCourseAccount()
  return user ? (
    <Avatar
      accountId={user.id}
      className="absolute inset-0 size-full ring-4 ring-white/25"
    />
  ) : (
    <UserRound aria-hidden className="absolute inset-1/4 size-1/2 text-white" />
  )
}

/**
 * Under the profile's title: the learner's name with its edit button, the
 * last signed-in name while the session check is out, or an offer to sign in
 */
export const ProfileAccountLine = () => {
  const t = useTranslations("page-courses")
  const { status, user } = useCourseAccount()

  if (status === "signed-in") return <DisplayName />

  if (status === "loading")
    return user ? (
      // The edit button's height, so nothing moves when it arrives
      <p className="m-0 flex min-h-[31px] items-center text-xl font-bold break-words text-body">
        {displayName(user.name)}
      </p>
    ) : (
      <Skeleton className="h-7 w-40" />
    )

  if (status !== "signed-out") return null

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p className="m-0 text-xl font-bold text-body">
        {t("page-courses-profile-account-local")}
      </p>
      <SignInDialog
        view="create"
        onSignedIn={() => void syncProgress(true)}
        trigger={
          <Button size="sm" variant="outline">
            {t("page-courses-profile-account-sign-in")}
          </Button>
        }
      />
    </div>
  )
}

/**
 * Once signed in: completion records and the leaderboard (both still to
 * come) and, last, account settings
 */
export const ProfileAccountSections = () => {
  const t = useTranslations("page-courses")
  const { status } = useAccount()

  if (status !== "signed-in") return null

  return (
    <>
      {/* Planned: needs a signing key the team controls and publishes
            first (the courses skill's accounts reference) */}
      <Section id="records" className="flow">
        <h2 className="flex flex-wrap items-center gap-3">
          {t("page-courses-profile-records-title")}
          <Tag asChild status="tag" className="font-normal">
            <span>{t("page-courses-coming-soon")}</span>
          </Tag>
        </h2>
        <p className="max-w-3xl text-body-medium">
          {t("page-courses-profile-records-soon")}
        </p>
      </Section>
      {/* Opens once enough learners have joined for a ranking to mean
            something; the opt-out switch in the settings is ready for it */}
      <Section id="leaderboard" className="flow">
        <h2 className="flex flex-wrap items-center gap-3">
          {t("page-courses-profile-leaderboard-title")}
          <Tag asChild status="tag" className="font-normal">
            <span>{t("page-courses-coming-soon")}</span>
          </Tag>
        </h2>
        <p className="max-w-3xl text-body-medium">
          {t("page-courses-profile-leaderboard-soon")}
        </p>
      </Section>
      <Section id="account" className="flow">
        <h2>{t("page-courses-profile-account-title")}</h2>
        <AccountSettings
          onLeave={(deleted) => {
            releaseAccountProgress(deleted)
            // The page is shorter now
            window.scrollTo({ top: 0 })
          }}
        />
      </Section>
    </>
  )
}
