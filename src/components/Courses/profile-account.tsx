"use client"

import { type FormEvent, useId, useRef, useState } from "react"
import { SquarePen, UserRound } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import { CardParagraph } from "@/components/ui/card"
import Input from "@/components/ui/input"
import { Section } from "@/components/ui/section"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import AccountSettings from "../Account/account-settings"
import Avatar from "../Account/avatar"
import SignInDialog from "../Account/sign-in-dialog"
import { useAccount } from "../Account/use-account"

import { syncProgress } from "./account-sync"

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

// White on the card's solid course colour, which is the same hex in both
// modes; ghost has no hover shadow or primary text to undo
const whiteButton =
  "justify-center bg-white font-bold text-(--course-strong) focus-visible:outline-white active:text-(--course-strong) hover-link:bg-white/90 hover-link:!text-(--course-strong)"
const clearButton =
  "text-white focus-visible:outline-white active:text-white hover-link:bg-white/15 hover-link:!text-white"

/**
 * The learner's display name as the card's title, with an edit button that
 * swaps it for a field. The server checks the name again (and filters words)
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
        <p className="m-0 min-w-0 text-2xl font-bold break-words text-white">
          {current}
        </p>
        <Button
          ref={editRef}
          variant="ghost"
          size="sm"
          aria-label={t("account-name-edit")}
          onClick={() => setDraft(current)}
          className={cn("shrink-0 px-2", clearButton)}
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
        className="m-0 text-sm font-bold text-white empty:hidden"
      >
        {error}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="submit"
          variant="ghost"
          disabled={busy}
          className={whiteButton}
        >
          {t("account-save")}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={close}
          className={clearButton}
        >
          {t("account-cancel")}
        </Button>
      </div>
    </form>
  )
}

/** The account card's picture: the learner's blockie once signed in */
export const ProfileAvatar = () => {
  const { status, user } = useAccount()
  return status === "signed-in" && user ? (
    <Avatar
      accountId={user.id}
      className="absolute inset-0 size-full ring-4 ring-white/25"
    />
  ) : (
    <UserRound aria-hidden className="absolute inset-1/4 size-1/2 text-white" />
  )
}

/** The profile's account card text: the learner's name, or an offer to sign in */
export const ProfileAccountSummary = ({ muted }: { muted: string }) => {
  const t = useTranslations("page-courses")
  const { status } = useAccount()

  if (status === "signed-in")
    return (
      <div className="flex flex-col gap-1">
        <DisplayName />
        <CardParagraph className={cn("m-0", muted)} size="sm">
          {t("page-courses-profile-account-signed-in-detail")}
        </CardParagraph>
      </div>
    )

  return (
    // Container query: in a narrow card the button takes the full width
    <div className="@container flex w-full flex-col items-start gap-2">
      <p className="m-0 text-2xl font-bold text-white">
        {t("page-courses-profile-account-local")}
      </p>
      <CardParagraph className={cn("m-0", muted)} size="sm">
        {status === "signed-out"
          ? t("page-courses-profile-account-save")
          : t("page-courses-profile-account-soon")}
      </CardParagraph>
      {status === "signed-out" && (
        <SignInDialog
          onSignedIn={() => void syncProgress(true)}
          trigger={
            <Button
              variant="ghost"
              className={cn(whiteButton, "w-full @xs:w-auto")}
            >
              {t("page-courses-profile-account-sign-in")}
            </Button>
          }
        />
      )}
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
          <Tag asChild status="tag">
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
          <Tag asChild status="tag">
            <span>{t("page-courses-coming-soon")}</span>
          </Tag>
        </h2>
        <p className="max-w-3xl text-body-medium">
          {t("page-courses-profile-leaderboard-soon")}
        </p>
      </Section>
      <Section id="account" className="flow">
        <h2>{t("page-courses-profile-account-title")}</h2>
        <AccountSettings />
      </Section>
    </>
  )
}
