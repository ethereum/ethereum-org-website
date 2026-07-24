export const isUserAgentAllowed = (
  userAgent: string | undefined | null,
  regex?: RegExp
): boolean => {
  if (!regex) return true
  if (!userAgent) return false
  return regex.test(userAgent)
}

export const formatMatomoDateTime = (date: Date): string => {
  const pad = (num: number) => num.toString().padStart(2, "0")
  const year = date.getUTCFullYear()
  const month = pad(date.getUTCMonth() + 1)
  const day = pad(date.getUTCDate())
  const hours = pad(date.getUTCHours())
  const minutes = pad(date.getUTCMinutes())
  const seconds = pad(date.getUTCSeconds())
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const getContentLength = (response: Response): number | undefined => {
  const header = response.headers.get("content-length")
  if (!header) return undefined
  const parsed = Number.parseInt(header, 10)
  return Number.isNaN(parsed) ? undefined : parsed
}
