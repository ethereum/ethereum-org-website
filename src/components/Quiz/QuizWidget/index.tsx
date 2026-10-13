import { pick } from "lodash"
import { getLocale, getMessages } from "next-intl/server"

import type { QuizKey } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import allQuizzesData from "@/data/quizzes"

import { StandaloneQuizClient } from "./QuizWidgetClient"

// Widget chrome strings within "learn-quizzes"; question strings are
// subset separately by question-id prefix
const QUIZ_UI_KEYS = [
  "test-your-knowledge",
  "explanation",
  "question-number",
  "submit-answer",
  "next-question",
  "see-results",
  "try-again",
  "share-results",
  "next-quiz",
  "passed",
  "your-results",
  "score",
  "correct",
  "questions",
]

/**
 * Standalone quiz for use on single pages (not the quizzes page).
 *
 * Server component: provisions a client i18n context scoped to this quiz's
 * own strings, so pages don't have to load and provide whole namespaces
 * ("learn-quizzes" alone carries every quiz's question bank).
 */
export const StandaloneQuizWidget = async ({
  quizKey,
}: {
  quizKey: QuizKey
}) => {
  const locale = await getLocale()
  const allMessages = await getMessages()
  const learnQuizzes = (allMessages["learn-quizzes"] ?? {}) as Record<
    string,
    string
  >

  const { title, questions } = allQuizzesData[quizKey]
  // Quiz titles are common-namespace keys, except legacy "learn-quizzes:"
  // pointers; non-key titles ("DAOs", "DeFi") fall through untranslated
  const quizzesTitleKey = title.startsWith("learn-quizzes:")
    ? title.slice("learn-quizzes:".length)
    : null

  const messages = {
    "learn-quizzes": {
      ...pick(
        learnQuizzes,
        quizzesTitleKey ? [...QUIZ_UI_KEYS, quizzesTitleKey] : QUIZ_UI_KEYS
      ),
      ...Object.fromEntries(
        Object.entries(learnQuizzes).filter(([key]) =>
          questions.some((id) => key.startsWith(`${id}-`))
        )
      ),
    },
    common: quizzesTitleKey
      ? {}
      : pick(allMessages.common as Record<string, string>, [title]),
  }

  return (
    <I18nProvider locale={locale} messages={messages}>
      <StandaloneQuizClient quizKey={quizKey} />
    </I18nProvider>
  )
}
