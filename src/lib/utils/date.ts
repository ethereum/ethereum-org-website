export const dateToString = (published: Date | string) =>
  new Date(published).toISOString().split("T")[0]

export const isValidDate = (dateString?: string | number): boolean => {
  if (!dateString) return false
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

export const formatDate = (date: string) => {
  if (/^\d{4}$/.test(date)) {
    return date
  }
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
