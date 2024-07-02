import type { IconType } from "react-icons"
import { type ButtonProps, Icon } from "@chakra-ui/react"

import { Button } from "@/components/ui/button"

type FooterButtonProps = {
  icon: IconType
}

const FooterButton = ({ icon, ...props }: FooterButtonProps) => (
  <Button variant="ghost" {...props} />
)

export default FooterButton
