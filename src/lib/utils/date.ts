export const dateToString = (published: Date | string) =>
  new Date(published).toISOString().split("T")[0]
export const formatDate = (date: Date, locale: string): string => {
  return Intl.DateTimeFormat(locale).format(date)
}
