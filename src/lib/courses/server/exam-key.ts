import { ENCRYPTED_EXAM_KEY } from "@/data/courses/exam-key"

import { decryptExamKey, type ExamKey } from "../exam-key"

let cached: ExamKey | null | undefined

/** The answer key, or null without the secret (or an encrypted key) */
export const getExamKey = () => {
  if (cached !== undefined) return cached
  const secret = process.env.LEARNER_EXAM_KEY_SECRET
  try {
    cached =
      secret && ENCRYPTED_EXAM_KEY
        ? decryptExamKey(ENCRYPTED_EXAM_KEY, secret)
        : null
  } catch {
    console.error("The Course Mastery answer key could not be decrypted")
    cached = null
  }
  return cached
}
