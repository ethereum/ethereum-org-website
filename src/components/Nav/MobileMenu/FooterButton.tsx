import { forwardRef } from "react"
import { LucideIcon } from "lucide-react"

import { Button, type ButtonProps } from "../../ui/buttons/Button"

type FooterButtonProps = ButtonProps & {
  icon?: React.FC<React.SVGProps<SVGElement>> | LucideIcon
}

const FooterButton = forwardRef<HTMLButtonElement, FooterButtonProps>(
  ({ icon: Icon, children, ...props }, ref) => (
    <Button
      ref={ref}
      className="flex h-fit flex-col items-center px-1 text-body data-[state=active]:text-primary-hover"
      variant="ghost"
      {...props}
    >
      {Icon && <Icon className="text-xl" />}
      {children}
    </Button>
  )
)
FooterButton.displayName = "FooterButton"

export default FooterButton
