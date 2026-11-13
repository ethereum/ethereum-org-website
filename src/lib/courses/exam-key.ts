import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto"
import { gunzipSync, gzipSync } from "node:zlib"

import type { Course } from "@/data/courses"

/**
 * Right options for every mastery check question, by course then question
 * id. The questions and options are public; this key isn't. It's committed
 * encrypted (`src/data/courses/exam-key.ts`, AES-256-GCM over gzipped JSON)
 * so it ships with the questions it answers, and the server decrypts it
 * with `LEARNER_EXAM_KEY_SECRET`. `pnpm courses:exam-key` encrypts, decrypts
 * and checks it.
 */
export type ExamKey = Record<string, Record<string, string[]>>

const IV_BYTES = 12
const TAG_BYTES = 16

/** The secret as 32 bytes: `openssl rand -base64 32` */
const secretBytes = (secret: string) => {
  const bytes = Buffer.from(secret, "base64")
  if (bytes.length !== 32)
    throw new Error("LEARNER_EXAM_KEY_SECRET must be 32 bytes, base64")
  return bytes
}

/** base64 of iv, auth tag and ciphertext */
export const encryptExamKey = (key: ExamKey, secret: string) => {
  const iv = randomBytes(IV_BYTES)
  const cipher = createCipheriv("aes-256-gcm", secretBytes(secret), iv)
  const body = Buffer.concat([
    cipher.update(gzipSync(JSON.stringify(key), { level: 9 })),
    cipher.final(),
  ])
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString("base64")
}

/** Throws on a wrong secret or a tampered value */
export const decryptExamKey = (value: string, secret: string): ExamKey => {
  const data = Buffer.from(value, "base64")
  const decipher = createDecipheriv(
    "aes-256-gcm",
    secretBytes(secret),
    data.subarray(0, IV_BYTES)
  )
  decipher.setAuthTag(data.subarray(IV_BYTES, IV_BYTES + TAG_BYTES))
  const zipped = Buffer.concat([
    decipher.update(data.subarray(IV_BYTES + TAG_BYTES)),
    decipher.final(),
  ])
  return JSON.parse(gunzipSync(zipped).toString("utf8"))
}

/** Problems with a key against the courses' questions; empty when it fits */
export const checkExamKey = (key: ExamKey, courses: Course[]) => {
  const problems: string[] = []
  for (const course of courses) {
    const answers = key[course.id] ?? {}
    for (const question of course.exam) {
      const where = `${course.id}/${question.id}`
      const right = answers[question.id]
      if (!right?.length) {
        problems.push(`${where}: no answer`)
        continue
      }
      for (const id of right)
        if (!question.options.includes(id))
          problems.push(`${where}: "${id}" is not an option`)
      if (!question.multi && right.length !== 1)
        problems.push(`${where}: single choice with ${right.length} answers`)
    }
    const known = new Set(course.exam.map(({ id }) => id))
    for (const id of Object.keys(answers))
      if (!known.has(id)) problems.push(`${course.id}/${id}: no such question`)
  }
  return problems
}
