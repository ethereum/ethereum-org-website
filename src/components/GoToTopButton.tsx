import { memo } from "react"
import { IoChevronUpSharp } from "react-icons/io5"

import { Button } from "./Buttons"

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export const GoToTopButton = memo(() => {
  return (
    <Button
      leftIcon={<IoChevronUpSharp />}
      variant="outline"
      isSecondary
      onClick={scrollToTop}
    >
      Go to top
    </Button>
  )
})

GoToTopButton.displayName = "GoToTopButton"
