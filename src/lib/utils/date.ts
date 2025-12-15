export const dateToString = (published: Date | string) =>
  new Date(published).toISOString().split("T")[0]

export const isValidDate = (
  dateString?: Date | string | number | null
): boolean => {
  if (!dateString) return false
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

export const getValidDate = (
  dateValue: Date | string | number | null | undefined
): Date | null => {
  const dateString =
    dateValue instanceof Date ? dateValue.toISOString() : dateValue
  return isValidDate(dateString) ? new Date(dateValue as Date | string) : null
}

export const formatDate = (date: string, locale: string = "en-US") => {
  if (/^\d{4}$/.test(date)) {
    return date
  }
  return new Date(date).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export const isDateReached = (date: string) => {
  const today = new Date()
  const threshold = new Date(date)
  return threshold >= today
}
