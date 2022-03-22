export const scrollIntoView = (
  id,
  options = { behavior: "smooth", block: "start" }
) => {
  const element = document.getElementById(id)

  if (!element) {
    return
  }

  element.scrollIntoView(options)
}
