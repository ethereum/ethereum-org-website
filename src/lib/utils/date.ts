export const dateToString = (published: Date | string) =>
  new Date(published).toISOString().split("T")[0]

export const formatDateRange = (startDate: string, endDate: string) => {
  // Parse the input dates
  // .replace(/-/g, "/") ==> Fixes Safari Invalid date

  const start = new Date(startDate.replace(/-/g, "/"))
  const end = new Date(endDate.replace(/-/g, "/"))

  // Formatter for day and month
  // undefined :: denotes to use automatic user's locale
  const dayMonthFormatter = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
  })

  // Extract formatted strings
  const startDayMonth = dayMonthFormatter.format(start)
  const endDayMonth = dayMonthFormatter.format(end)
  const startMonth = new Intl.DateTimeFormat(undefined, {
    month: "short",
  }).format(start)
  const endMonth = new Intl.DateTimeFormat(undefined, {
    month: "short",
  }).format(end)

  // Determine the date range string
  let dateRangeString
  if (start.toDateString() === end.toDateString()) {
    dateRangeString = startDayMonth // If the start and end dates are the same
  } else if (
    startMonth === endMonth &&
    start.getFullYear() === end.getFullYear()
  ) {
    // Output as "12-14 Jul" in the user's locale format
    dateRangeString = `${start.getDate()}-${end.getDate()} ${startMonth}`
  } else {
    // If different months or years, show as "12 Jul - 14 Aug"
    dateRangeString = `${startDayMonth}-${endDayMonth}`
  }

  return dateRangeString
}
