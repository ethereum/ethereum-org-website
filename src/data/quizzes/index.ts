import type { QuizzesSection, RawQuizzes } from "@/lib/types"

import { addNextQuiz } from "@/components/Quiz/utils"

// Declare hash-map of quizzes based on slug key
const quizzes = {
  "ai-basics": {
    title: "ai-basics",
    questions: [
      "ai-basics-1",
      "ai-basics-2",
      "ai-basics-3",
      "ai-basics-4",
      "ai-basics-5",
    ],
  },
  "machine-learning": {
    title: "machine-learning",
    questions: [
      "machine-learning-1",
      "machine-learning-2",
      "machine-learning-3",
      "machine-learning-4",
    ],
  },
  programming: {
    title: "programming",
    questions: [
      "programming-1",
      "programming-2",
      "programming-3",
      "programming-4",
      "programming-5",
    ],
  },
  "web-development": {
    title: "web-development",
    questions: ["web-dev-1", "web-dev-2", "web-dev-3", "web-dev-4"],
  },
  security: {
    title: "security",
    questions: ["security-1", "security-2", "security-3", "security-4"],
  },
  "data-structures": {
    title: "data-structures",
    questions: [
      "data-structures-1",
      "data-structures-2",
      "data-structures-3",
      "data-structures-4",
    ],
  },
  "cloud-computing": {
    title: "cloud-computing",
    questions: ["cloud-1", "cloud-2", "cloud-3", "cloud-4"],
  },
  databases: {
    title: "databases",
    questions: ["databases-1", "databases-2", "databases-3", "databases-4"],
  },
  devops: {
    title: "devops",
    questions: ["devops-1", "devops-2", "devops-3", "devops-4"],
  },
  algorithms: {
    title: "algorithms",
    questions: ["algorithms-1", "algorithms-2", "algorithms-3", "algorithms-4"],
  },
} satisfies RawQuizzes

const techBasicsQuizzesRaw: QuizzesSection[] = [
  {
    id: "ai-basics",
    level: "beginner",
  },
  {
    id: "programming",
    level: "beginner",
  },
  {
    id: "web-development",
    level: "beginner",
  },
  {
    id: "security",
    level: "beginner",
  },
]
export const techBasicsQuizzes: QuizzesSection[] =
  addNextQuiz(techBasicsQuizzesRaw)

const advancedTechQuizzesRaw: QuizzesSection[] = [
  {
    id: "machine-learning",
    level: "intermediate",
  },
  {
    id: "data-structures",
    level: "intermediate",
  },
  {
    id: "cloud-computing",
    level: "intermediate",
  },
  {
    id: "databases",
    level: "intermediate",
  },
  {
    id: "devops",
    level: "advanced",
  },
  {
    id: "algorithms",
    level: "advanced",
  },
]

export const advancedTechQuizzes: QuizzesSection[] = addNextQuiz(
  advancedTechQuizzesRaw
)

export default quizzes
