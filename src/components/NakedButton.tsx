import React from "react"
import { Button, ButtonProps } from "@chakra-ui/react"

const NakedButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    appearance="none"
    bg="none"
    border="none"
    color="inherit"
    display="inline-block"
    fontFamily="inherit"
    padding="initial"
    cursor="pointer"
    {...props}
  >
    {children}
  </Button>
)

export default NakedButton
