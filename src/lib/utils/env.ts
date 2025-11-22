export const IS_DEV = process.env.NODE_ENV === "development"
export const IS_CI = process.env.CI === "true"
export const IS_PROD = process.env.NODE_ENV === "production"
export const IS_PREVIEW_DEPLOY =
  process.env.NEXT_PUBLIC_IS_PREVIEW_DEPLOY === "true"
