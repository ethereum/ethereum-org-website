import { expect, test } from "@playwright/test"

import {
  BLACK,
  contrast,
  generatePalette,
  PALETTE_TARGETS,
  WHITE,
} from "../../../src/components/Courses/course-palette"
import { themeId } from "../../../src/components/Courses/theme"
import { COURSES } from "../../../src/data/courses"

test.describe("course palette", () => {
  test("every course has its own colour", () => {
    const ids = COURSES.map(({ theme }) => themeId(theme))
    expect(ids.length).toBe(new Set(ids).size)
  })

  test("generated palettes meet their contrast targets at every hue", () => {
    for (let hue = 0; hue < 360; hue++) {
      const { fill, strong, bright } = generatePalette(hue)
      expect(contrast(fill, WHITE)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(strong, WHITE)).toBeGreaterThanOrEqual(
        PALETTE_TARGETS.strong - 0.01
      )
      expect(contrast(bright, BLACK)).toBeGreaterThanOrEqual(
        PALETTE_TARGETS.bright - 0.01
      )
    }
  })
})
