export const dateToString = (published: Date | string) =>
  new Date(published).toISOString().split("T")[0]

export const isValidDate = (dateString?: string | number): boolean => {
  if (!dateString) return false
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}
