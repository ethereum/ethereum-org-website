import { forwardRef } from "react"
import type { IconType } from "react-icons"

import { Button, type ButtonProps } from "../../ui/buttons/Button"

type FooterButtonProps = ButtonProps & {
  icon: IconType
}

const FooterButton = forwardRef<HTMLButtonElement, FooterButtonProps>(
  ({ icon: Icon, children, ...props }, ref) => (
    <Button
      ref={ref}
      className="flex h-fit flex-col items-center px-1 text-body"
      variant="ghost"
      {...props}
    >
      <Icon className="h-6 w-6" />
      {children}
    </Button>
  )
)
FooterButton.displayName = "FooterButton"

export default FooterButton
