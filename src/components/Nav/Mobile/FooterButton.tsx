import type { IconType } from "react-icons"
import { type ButtonProps, Icon } from "@chakra-ui/react"

import { Button } from "@/components/Buttons"

type FooterButtonProps = ButtonProps & {
  icon: IconType
}

const FooterButton = ({ icon, ...props }: FooterButtonProps) => (
  <Button
    leftIcon={<Icon as={icon} />}
    sx={{ span: { m: 0 } }}
    variant="ghost"
    flexDir="column"
    alignItems="center"
    color="body.base"
    px="1"
    {...props}
  />
)

export default FooterButton
