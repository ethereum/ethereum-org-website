/**
 * Lessons link to an ethereum.org page once done, and each course-check
 * question cites one. The title is read from the page itself (markdown
 * title, else breadcrumb label), so a moved page or anchor breaks silently.
 */

import { existsSync, readFileSync } from "fs"

import matter from "gray-matter"
import { expect, test } from "@playwright/test"

import { COURSES } from "../../../src/data/courses"
import common from "../../../src/intl/en/common.json"
import {
  getBreadcrumbLabelKey,
  toBreadcrumbPath,
} from "../../../src/lib/utils/breadcrumbs"

const links = COURSES.flatMap((course) => [
  ...course.lessons.map(({ id, learnMore }) => ({
    from: `${course.id}/${id}`,
    href: learnMore,
  })),
  ...course.exam.map(({ id, source }) => ({
    from: `${course.id}/exam/${id}`,
    href: source,
  })),
])

test.describe("course links", () => {
  for (const { from, href } of links) {
    test(`${from} -> ${href}`, () => {
      const [path, anchor] = href.split("#")
      // A glossary entry is a one-line definition, not further reading
      expect(path).not.toBe("/glossary/")
      expect(path).toBe(toBreadcrumbPath(path))
      const md = `public/content${path}index.md`
      if (existsSync(md)) {
        const source = readFileSync(md, "utf8")
        expect(matter(source).data.title).toBeTruthy()
        if (anchor)
          expect(
            source.includes(`{#${anchor}}`) ||
              source.includes(`term="${anchor}"`)
          ).toBe(true)
      } else {
        expect(existsSync(`app/[locale]${path}page.tsx`)).toBe(true)
        expect(common).toHaveProperty([getBreadcrumbLabelKey(path)])
        expect(anchor).toBeUndefined()
      }
    })
  }
})
