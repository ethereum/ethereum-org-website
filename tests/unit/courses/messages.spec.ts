/**
 * Courses pages send the browser only the `page-courses` strings they render
 * (`pickCourseMessages`), and a string left out shows as its raw key. So each
 * page's set is checked against what its data references, and each widget's
 * source against the strings `WIDGET_KEYS` lets its lessons send.
 */

import { expect, test } from "@playwright/test"

import { COURSES, EXAM_ID, stepKey, TRACKS } from "../../../src/data/courses"
import en from "../../../src/intl/en/page-courses.json"
import {
  type CourseMessageScope,
  coursePromptKeys,
  pickCourseMessages,
} from "../../../src/lib/courses/messages"
import {
  WIDGET_KEY_PREFIX,
  WIDGET_KEYS,
} from "../../../src/lib/courses/widgets"

import {
  registryWidgets,
  WIDGET_REGISTRY,
  widgetKeyUsages,
} from "./widget-key-usage"

const keys = Object.keys(en)
const uiKeys = keys.filter(
  (key) => key.startsWith("page-courses-") && !key.startsWith(WIDGET_KEY_PREFIX)
)

const sent = (scope: CourseMessageScope) =>
  new Set(
    Object.keys(
      pickCourseMessages({ "page-courses": en, common: {} }, scope)[
        "page-courses"
      ] as Record<string, string>
    )
  )

/** Every key starting with `prefix`: one step's strings, whatever its type */
const startingWith = (prefix: string) =>
  keys.filter((key) => key.startsWith(prefix))

const missing = (scope: CourseMessageScope, expected: string[]) => {
  const got = sent(scope)
  return expected.filter((key) => key in en && !got.has(key))
}

const catalogKeys = TRACKS.flatMap(({ courses, upcoming = [] }) => [
  ...courses,
  ...upcoming,
]).flatMap(({ id }) => [`${id}-title`, `${id}-description`])

const lessonListKeys = (courseId: string) =>
  COURSES.find(({ id }) => id === courseId)!.lessons.flatMap(({ id }) => [
    `${courseId}-${id}-title`,
    `${courseId}-${id}-summary`,
  ])

const widgets = registryWidgets()
const usages = Object.fromEntries(
  widgets.map(({ id, file, exportName }) => [
    id,
    widgetKeyUsages(file, exportName, keys),
  ])
)

test.describe("course messages", () => {
  test("every page keeps the UI strings and the course titles", () => {
    const scopes: CourseMessageScope[] = [
      { page: "hub" },
      { page: "profile" },
      ...COURSES.flatMap(({ id, lessons }) => [
        { page: "course" as const, courseId: id },
        { page: "exam" as const, courseId: id },
        ...lessons.map(({ id: lessonId }) => ({
          page: "lesson" as const,
          courseId: id,
          lessonId,
        })),
      ]),
    ]
    for (const scope of scopes)
      expect(missing(scope, [...uiKeys, ...catalogKeys]), scope.page).toEqual(
        []
      )
  })

  test("the hub sends no lesson content or widget strings", () => {
    const hub = sent({ page: "hub" })
    expect(
      [...hub].filter(
        (key) =>
          key.startsWith(WIDGET_KEY_PREFIX) ||
          COURSES.some(({ id, lessons }) =>
            lessons.some((lesson) => key.startsWith(`${id}-${lesson.id}-`))
          )
      )
    ).toEqual([])
  })

  for (const course of COURSES) {
    const next = COURSES[COURSES.indexOf(course) + 1]

    test(`${course.id}: course page has its lessons`, () => {
      expect(
        missing({ page: "course", courseId: course.id }, [
          ...lessonListKeys(course.id),
          ...(next ? [`${next.id}-title`] : []),
        ])
      ).toEqual([])
    })

    test(`${course.id}: lessons have their steps and widgets`, () => {
      for (const lesson of course.lessons) {
        const scope = {
          page: "lesson" as const,
          courseId: course.id,
          lessonId: lesson.id,
        }
        const widgetKeys = lesson.steps.flatMap((step) =>
          step.type === "interactive"
            ? usages[step.widget].flatMap((usage) =>
                "prefix" in usage ? startingWith(usage.prefix) : []
              )
            : []
        )
        expect(
          missing(scope, [
            `${course.id}-title`,
            ...lessonListKeys(course.id),
            ...lesson.steps.flatMap(({ id }) =>
              startingWith(stepKey(course.id, lesson.id, id, ""))
            ),
            ...widgetKeys,
          ]),
          lesson.id
        ).toEqual([])
      }
    })

    test(`${course.id}: exam has its questions`, () => {
      expect(
        missing({ page: "exam", courseId: course.id }, [
          `${course.id}-title`,
          ...(next ? [`${next.id}-title`] : []),
          ...course.exam.flatMap(({ id }) =>
            startingWith(stepKey(course.id, EXAM_ID, id, ""))
          ),
        ])
      ).toEqual([])
    })
  }

  test("the profile has every lesson title and no prompts", () => {
    expect(
      missing(
        { page: "profile" },
        COURSES.flatMap(({ id, lessons }) =>
          lessons.map((lesson) => `${id}-${lesson.id}-title`)
        )
      )
    ).toEqual([])
    expect(
      [...sent({ page: "profile" })].filter((key) => key.endsWith("-prompt"))
    ).toEqual([])
  })

  test("the profile's per-course prompts cover every question", () => {
    const fetched = new Set(COURSES.flatMap(({ id }) => coursePromptKeys(id)))
    const prompts = keys.filter((key) => key.endsWith("-prompt"))
    expect(prompts.length).toBeGreaterThan(0)
    expect(prompts.filter((key) => !fetched.has(key))).toEqual([])
  })
})

test.describe("widget strings", () => {
  test(`${WIDGET_REGISTRY} lists every widget`, () => {
    expect(widgets.map(({ id }) => id).sort()).toEqual(
      Object.keys(WIDGET_KEYS).sort()
    )
  })

  for (const { id } of widgets) {
    test(`${id} reads only the strings WIDGET_KEYS names`, () => {
      const bases = WIDGET_KEYS[id as keyof typeof WIDGET_KEYS].map(
        (name) => WIDGET_KEY_PREFIX + name
      )
      const outside = usages[id].filter((usage) =>
        "prefix" in usage
          ? !bases.some(
              (base) =>
                usage.prefix === base || usage.prefix.startsWith(`${base}-`)
            )
          : true
      )
      // Unresolved: a key head built from something other than string literals
      expect(outside).toEqual([])
    })
  }

  test("every name in WIDGET_KEYS has strings", () => {
    const stale = Object.entries(WIDGET_KEYS).flatMap(([id, names]) =>
      names
        .filter(
          (name) =>
            !keys.some(
              (key) =>
                key === WIDGET_KEY_PREFIX + name ||
                key.startsWith(`${WIDGET_KEY_PREFIX}${name}-`)
            )
        )
        .map((name) => `${id}: ${name}`)
    )
    expect(stale).toEqual([])
  })
})
