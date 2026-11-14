/**
 * Course Mastery answer key: see `src/lib/courses/exam-key.ts`.
 *
 *   pnpm courses:exam-key encrypt [file]  JSON file -> src/data/courses/exam-key.ts
 *   pnpm courses:exam-key decrypt         committed key -> JSON on stdout
 *   pnpm courses:exam-key check [file]    compare a key with the questions
 *
 * `file` defaults to `.learner-exam-key.json` (gitignored). Encrypting and
 * decrypting need `LEARNER_EXAM_KEY_SECRET`, read from `.env.local`.
 */
import { config } from "dotenv"
import { existsSync, readFileSync, writeFileSync } from "node:fs"

import { COURSES } from "@/data/courses"
import { ENCRYPTED_EXAM_KEY } from "@/data/courses/exam-key"

import {
  checkExamKey,
  decryptExamKey,
  encryptExamKey,
  type ExamKey,
} from "../../lib/courses/exam-key"

config({ path: ".env.local" })
config()

const DEFAULT_FILE = ".learner-exam-key.json"
const MODULE = "src/data/courses/exam-key.ts"

const secret = () => {
  const value = process.env.LEARNER_EXAM_KEY_SECRET
  if (!value) throw new Error("LEARNER_EXAM_KEY_SECRET is not set")
  return value
}

const readFile = (file = DEFAULT_FILE): ExamKey =>
  JSON.parse(readFileSync(file, "utf8"))

const committed = () => {
  if (!ENCRYPTED_EXAM_KEY) throw new Error(`${MODULE} holds no key yet`)
  return decryptExamKey(ENCRYPTED_EXAM_KEY, secret())
}

const report = (key: ExamKey) => {
  const problems = checkExamKey(key, COURSES)
  for (const problem of problems) console.error(problem)
  if (problems.length) process.exit(1)
}

const [command, file] = process.argv.slice(2)

if (command === "encrypt") {
  const key = readFile(file)
  report(key)
  // Written the way Prettier formats it, so the file stays lint-clean
  const source = readFileSync(MODULE, "utf8").replace(
    /ENCRYPTED_EXAM_KEY =\s*".*"/,
    `ENCRYPTED_EXAM_KEY =\n  "${encryptExamKey(key, secret())}"`
  )
  writeFileSync(MODULE, source)
  console.log(`Wrote ${MODULE}`)
} else if (command === "decrypt") {
  console.log(JSON.stringify(committed(), null, 2))
} else if (command === "check") {
  // The local file when there is one, else the committed key
  report(file || existsSync(DEFAULT_FILE) ? readFile(file) : committed())
  console.log("The key matches every question")
} else {
  console.error("Usage: pnpm courses:exam-key encrypt|decrypt|check [file]")
  process.exit(1)
}
