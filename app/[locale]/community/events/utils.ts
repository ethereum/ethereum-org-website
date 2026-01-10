export const sanitize = (s: string) =>
  s.toLowerCase().replace(/\W+/g, " ").replace(/\s+/g, " ")
