type ScrollToTopOptions = {
  behavior?: ScrollBehavior

  targetId?: string
}

/**
 
 * @param options {ScrollToTopOptions} - Optional configuration
 */
export const scrollToTop = (options: ScrollToTopOptions = {}): void => {
  const { behavior = "smooth", targetId } = options

  if (targetId) {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior, block: "start" })
      return
    }
  }

  window.scrollTo({
    top: 0,
    behavior,
  })
}
