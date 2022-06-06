export const isProd = (): boolean => {
  return !isDev()
}

export const isDev = (): boolean => {
  return process.env.NODE_ENV === "development"
}
