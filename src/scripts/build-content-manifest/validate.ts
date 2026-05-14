import type { Frontmatter, Layout } from "@/lib/types"

export type ValidationIssue = {
  bodyPath: string
  locale: string
  slug: string
  field: string
  reason: string
  severity: "error" | "warning"
}

const isString = (v: unknown): v is string =>
  typeof v === "string" && v.length > 0

const ensureString = (
  obj: Record<string, unknown>,
  field: string,
  ctx: Omit<ValidationIssue, "field" | "reason" | "severity">,
  issues: ValidationIssue[],
  severity: ValidationIssue["severity"] = "error"
): boolean => {
  if (!isString(obj[field])) {
    issues.push({
      ...ctx,
      field,
      reason: `expected non-empty string, got ${typeof obj[field]}`,
      severity,
    })
    return false
  }
  return true
}

type Ctx = Omit<ValidationIssue, "field" | "reason" | "severity">

const validateShared = (
  data: Record<string, unknown>,
  ctx: Ctx,
  issues: ValidationIssue[]
) => {
  ensureString(data, "title", ctx, issues, "error")
  ensureString(data, "lang", ctx, issues, "error")
  ensureString(data, "description", ctx, issues, "warning")
}

const validateImage = (
  data: Record<string, unknown>,
  ctx: Ctx,
  issues: ValidationIssue[]
) => {
  ensureString(data, "image", ctx, issues, "warning")
  ensureString(data, "alt", ctx, issues, "warning")
}

type LayoutValidator = (
  data: Record<string, unknown>,
  ctx: Ctx,
  issues: ValidationIssue[]
) => void

const layoutValidators: Record<Layout, LayoutValidator> = {
  static: (data, ctx, issues) => {
    validateShared(data, ctx, issues)
  },
  docs: (data, ctx, issues) => {
    validateShared(data, ctx, issues)
  },
  tutorial: (data, ctx, issues) => {
    validateShared(data, ctx, issues)
    ensureString(data, "author", ctx, issues, "warning")
    ensureString(data, "skill", ctx, issues, "warning")
    ensureString(data, "published", ctx, issues, "warning")
  },
  "use-cases": (data, ctx, issues) => {
    validateShared(data, ctx, issues)
    validateImage(data, ctx, issues)
    ensureString(data, "emoji", ctx, issues, "warning")
  },
  staking: (data, ctx, issues) => {
    validateShared(data, ctx, issues)
    validateImage(data, ctx, issues)
    ensureString(data, "emoji", ctx, issues, "warning")
  },
  roadmap: (data, ctx, issues) => {
    validateShared(data, ctx, issues)
    validateImage(data, ctx, issues)
  },
  upgrade: (data, ctx, issues) => {
    validateShared(data, ctx, issues)
    validateImage(data, ctx, issues)
  },
  translatathon: (data, ctx, issues) => {
    validateShared(data, ctx, issues)
  },
}

export const validateFrontmatter = (
  data: Record<string, unknown>,
  layout: Layout,
  ctx: Ctx,
  issues: ValidationIssue[]
): Frontmatter => {
  const validator = layoutValidators[layout] ?? layoutValidators.static
  validator(data, ctx, issues)
  return data as unknown as Frontmatter
}
