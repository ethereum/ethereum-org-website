export const dateToString = (published: Date | string) =>
  new Date(published).toISOString().split("T")[0]
