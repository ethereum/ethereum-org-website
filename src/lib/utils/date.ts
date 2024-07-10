export const dateToString = (published: Date | string) =>
  new Date(published).toISOString().split("T")[0]

// Define an array of month names
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export const formatDateRange = (startDate: string, endDate: string) => {
  // Parse the input dates
  // .replace(/-/g, "/") ==> Fixes Safari Invalid date
  const start = new Date(startDate.replace(/-/g, "/"))
  const end = new Date(endDate.replace(/-/g, "/"))

  // Extract day and month from the start and end dates
  const startDay = start.getDate()
  const startMonth = months[start.getMonth()]
  const endDay = end.getDate()
  const endMonth = months[end.getMonth()]

  // Extract year from start and end dates
  const startYear = start.getFullYear()
  const endYear = end.getFullYear()

  // Format the year (if start and end years are the same, only show the year once)
  const startYearFormatted = startYear.toString()
  const endYearFormatted = endYear.toString()

  // Format the date range string
  let dateRangeString

  if (startYear === endYear && start.getMonth() === end.getMonth()) {
    dateRangeString = `${startDay}-${endDay} ${startMonth} ${startYearFormatted}`
  } else if (startYear === endYear) {
    dateRangeString = `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYearFormatted}`
  } else {
    dateRangeString = `${startDay} ${startMonth} ${startYearFormatted} - ${endDay} ${endMonth} ${endYearFormatted}`
  }
  if (startDate === endDate) {
    dateRangeString = `${startDay} ${startMonth} ${startYearFormatted}`
  }

  return dateRangeString
}
