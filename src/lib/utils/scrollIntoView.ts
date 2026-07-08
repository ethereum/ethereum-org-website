export const scrollIntoView = (
  selector: string,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" }
): void => {
  const element = document.querySelector(selector)

  if (!element) return

  element.scrollIntoView(options)
}
