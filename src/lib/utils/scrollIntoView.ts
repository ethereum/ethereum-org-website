export const scrollIntoView = (
  toId: string,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" }
): void => {
  const element = document.getElementById(toId)

  if (!element) return

  element.scrollIntoView(options)
}
