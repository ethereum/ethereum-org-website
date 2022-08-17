export const IS_PROD = process.env.NODE_ENV === "production"

export const IS_DEV = process.env.NODE_ENV === "development"

export const IS_PREVIEW = process.env.IS_PREVIEW_DEPLOY === "true"
