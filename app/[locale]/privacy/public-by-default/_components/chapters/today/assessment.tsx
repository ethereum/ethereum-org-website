"use client"

import { useMemo } from "react"
import { useLocale, useTranslations } from "next-intl"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"
import { Button } from "@/components/ui/buttons/Button"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { useLessonStorage } from "../../lesson-provider"
import { LESSON_NS, useLessonTranslations } from "../../use-lesson-translations"

import {
  type Answers,
  EXAMPLE_ANSWERS,
  HORIZONS,
  normalizeAnswers,
  type Question,
  QUESTIONS,
  type Severity,
  severityKey,
  TODO_IDS,
  type TodoId,
  TODOS,
} from "./data"
import { computeLeaks, planFor } from "./leaks"

interface StoredAnswers {
  mine: boolean
  answers: Answers
}

// Module-level so the storage hook gets stable initial values
const INITIAL_ANSWERS: StoredAnswers = { mine: false, answers: EXAMPLE_ANSWERS }
const INITIAL_DONE: TodoId[] = []

const severityTag: Record<Severity, "error" | "warning" | "normal"> = {
  4: "error",
  3: "warning",
  2: "normal",
  1: "normal",
}

// Rich-text targets inside leak explanations
const leakGlossary: Record<string, string> = { "trades-visible": "mempool" }

const todoAnchor = (id: TodoId) => `today-todo-${id}`

const QuestionField = ({
  question,
  answers,
  onChange,
}: {
  question: Question
  answers: Answers
  onChange: (next: Answers) => void
}) => {
  const t = useLessonTranslations()
  const { id, type } = question
  const value = answers[id]
  const legendId = `today-q-${id}`

  return (
    <fieldset
      className="m-0 space-y-2 border-0 p-0"
      aria-describedby={"hint" in question ? `${legendId}-hint` : undefined}
    >
      <legend id={legendId} className="mb-1 p-0 font-bold">
        {t(`today-q-${id}-question`)}
      </legend>
      {"hint" in question && (
        <p id={`${legendId}-hint`} className="m-0 text-sm text-body-medium">
          {t(`today-q-${id}-hint`)}
        </p>
      )}
      <div className="flex flex-col gap-1">
        {question.options.map((option) => {
          const checked =
            type === "check"
              ? (value as string[]).includes(option)
              : value === option
          return (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 hover:border-primary-hover",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary-hover",
                checked && "border-primary bg-primary-low-contrast/40"
              )}
            >
              <input
                type={type === "check" ? "checkbox" : "radio"}
                name={`today-${id}`}
                value={option}
                checked={checked}
                onChange={(event) => {
                  const next = { ...answers } as Record<
                    string,
                    string | string[]
                  >
                  if (type === "check") {
                    const current = new Set(value as string[])
                    if (event.target.checked) current.add(option)
                    else current.delete(option)
                    // Keep the option order stable
                    next[id] = question.options.filter((o) => current.has(o))
                  } else {
                    next[id] = option
                  }
                  onChange(next as unknown as Answers)
                }}
                className="mt-1 size-4 shrink-0 accent-primary"
              />
              <span>{t(`today-q-${id}-option-${option}`)}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/**
 * The self-assessment: questions, the leak report they produce, and a plan
 * built from it. Answers and checked-off items stay in this browser.
 */
const Assessment = () => {
  const t = useLessonTranslations()
  const tRich = useTranslations(LESSON_NS)
  const locale = useLocale()
  const [stored, setStored] = useLessonStorage<StoredAnswers>(
    "today-answers",
    INITIAL_ANSWERS
  )
  const [storedDone, setDone] = useLessonStorage<TodoId[]>(
    "today-done",
    INITIAL_DONE
  )

  const answers = useMemo(() => normalizeAnswers(stored?.answers), [stored])
  const mine = Boolean(stored?.mine)
  const done = useMemo(
    () =>
      new Set(
        (Array.isArray(storedDone) ? storedDone : []).filter((id) =>
          TODO_IDS.has(id)
        )
      ),
    [storedDone]
  )

  const leaks = useMemo(() => computeLeaks(answers), [answers])
  const { score, helps } = useMemo(() => planFor(leaks), [leaks])
  const planIds = [...score.keys()]
  const critical = leaks.filter(({ severity }) => severity === 4).length
  const doneCount = planIds.filter((id) => done.has(id)).length
  const formatNumber = numberFormat(locale)
  const listFormat = new Intl.ListFormat(locale, {
    style: "long",
    type: "conjunction",
  })

  const jumpToTodo = (id: TodoId) => {
    const item = document.getElementById(todoAnchor(id))
    if (!item) return
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    item.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    })
    item
      .querySelector<HTMLInputElement>("input")
      ?.focus({ preventScroll: true })
  }

  const toggleDone = (id: TodoId, checked: boolean) => {
    const next = new Set(done)
    if (checked) next.add(id)
    else next.delete(id)
    setDone([...next])
  }

  return (
    <div className="flow">
      <form
        aria-label={t("today-form-label")}
        onSubmit={(event) => event.preventDefault()}
        className="space-y-8 rounded-base border p-4 md:p-6"
      >
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-3 rounded-lg p-3 text-sm",
            mine ? "bg-primary-low-contrast" : "bg-background-highlight"
          )}
        >
          <p className="m-0">
            {tRich.rich(
              `${LESSON_NS}-${mine ? "today-banner-mine" : "today-banner-example"}`,
              richTags()
            )}
          </p>
          {mine && (
            <Button
              size="sm"
              variant="outline"
              isSecondary
              onClick={() => setStored(INITIAL_ANSWERS)}
            >
              {t("today-reset")}
            </Button>
          )}
        </div>

        {QUESTIONS.map((question) => (
          <QuestionField
            key={question.id}
            question={question}
            answers={answers}
            onChange={(next) => setStored({ mine: true, answers: next })}
          />
        ))}
      </form>

      <section
        aria-labelledby="today-results-title"
        className="space-y-4 rounded-base border-2 border-leak p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 id="today-results-title" className="m-0">
            {t("today-results-title")}
          </h3>
          <Tag size="small" status="normal" variant="outline">
            {t(mine ? "today-results-yours" : "today-results-example")}
          </Tag>
        </div>
        <p aria-live="polite" className="m-0 text-lg">
          {leaks.length ? (
            <>
              {t("today-summary-count", { count: leaks.length })}{" "}
              {critical > 0 &&
                tRich.rich(`${LESSON_NS}-today-summary-critical`, {
                  ...richTags(),
                  count: critical,
                })}
            </>
          ) : (
            t("today-summary-none")
          )}
        </p>
        <ol className="m-0 list-none space-y-4">
          {leaks.map((leak) => (
            <li key={leak.id} className="space-y-2 border-t pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <Tag
                  size="small"
                  status={severityTag[leak.severity]}
                  variant={leak.severity === 1 ? "outline" : "subtle"}
                >
                  {t(`today-severity-${severityKey[leak.severity]}`)}
                </Tag>
                <h4 className="m-0 text-h6">
                  {t(`today-leak-${leak.id}-title`)}
                </h4>
              </div>
              <p className="m-0">
                {tRich.rich(
                  `${LESSON_NS}-today-leak-${leak.id}-learn`,
                  richTags({ glossary: leakGlossary[leak.id] })
                )}
              </p>
              <p className="m-0 text-sm text-body-medium">
                {t("today-leak-seen-by", {
                  who: t(`today-leak-${leak.id}-who`),
                })}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold">
                  {t("today-leak-fix-label")}
                </span>
                {leak.todos.map((todo) => (
                  <Button
                    key={todo}
                    size="sm"
                    variant="outline"
                    onClick={() => jumpToTodo(todo)}
                  >
                    {t(`today-todo-${todo}-title`)}
                  </Button>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <p className="m-0 rounded-lg bg-background-highlight p-3 text-sm">
          {tRich.rich(`${LESSON_NS}-today-honest`, richTags())}
        </p>
      </section>

      <section aria-labelledby="today-plan-title" className="space-y-4">
        <h3 id="today-plan-title">{t("today-plan-title")}</h3>
        <p>{t("today-plan-intro")}</p>
        <div className="space-y-2" aria-live="polite">
          <p className="m-0 font-semibold">
            {t("today-plan-progress", {
              done: formatNumber.format(doneCount),
              total: formatNumber.format(planIds.length),
            })}
          </p>
          <div
            aria-hidden
            className="flex h-2 overflow-hidden rounded-full bg-background-medium"
          >
            <div
              className="bg-success motion-safe:transition-[flex-basis] motion-safe:duration-500"
              style={{
                flexBasis: `${planIds.length ? (doneCount / planIds.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {HORIZONS.map((horizon, index) => {
          const items = TODOS.filter(
            (todo) => todo.horizon === index && score.has(todo.id)
          ).sort((a, b) => (score.get(b.id) ?? 0) - (score.get(a.id) ?? 0))
          if (!items.length) return null
          return (
            <div key={horizon} className="space-y-3">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h4 className="m-0">{t(`today-horizon-${horizon}-title`)}</h4>
                <span className="text-sm text-body-medium">
                  {t(`today-horizon-${horizon}-subtitle`)}
                </span>
              </div>
              <ul className="m-0 grid list-none gap-4 md:grid-cols-2">
                {items.map((todo) => {
                  const isDone = done.has(todo.id)
                  const helped = helps.get(todo.id) ?? []
                  return (
                    <li
                      key={todo.id}
                      id={todoAnchor(todo.id)}
                      className={cn(
                        "m-0 scroll-mt-48 space-y-3 rounded-base border p-4",
                        isDone && "border-success bg-success-light/40"
                      )}
                    >
                      <label className="flex cursor-pointer items-start gap-3 font-bold">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={(event) =>
                            toggleDone(todo.id, event.target.checked)
                          }
                          className="mt-1 size-4 shrink-0 accent-primary"
                        />
                        <span className="flex-1">
                          {t(`today-todo-${todo.id}-title`)}
                        </span>
                        {isDone && (
                          <Tag size="small" status="success" variant="subtle">
                            {t("today-todo-done")}
                          </Tag>
                        )}
                      </label>
                      <p className="m-0 text-sm text-body-medium">
                        {helped.length
                          ? t("today-todo-closes", {
                              leaks: listFormat.format(
                                helped.map((leakId) =>
                                  t(`today-leak-${leakId}-title`)
                                )
                              ),
                            })
                          : t("today-todo-closes-none")}
                      </p>
                      <ol className="m-0 space-y-1 ps-5 text-sm">
                        {Array.from(
                          { length: todo.steps },
                          (_, i) => i + 1
                        ).map((step) => (
                          <li key={step}>
                            {tRich.rich(
                              `${LESSON_NS}-today-todo-${todo.id}-step-${step}`,
                              richTags({ link: todo.links?.[step] })
                            )}
                          </li>
                        ))}
                      </ol>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default Assessment
