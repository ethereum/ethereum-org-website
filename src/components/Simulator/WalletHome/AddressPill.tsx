import { Button, Icon, type ButtonProps } from "@chakra-ui/react"
import React from "react"
import { MdContentCopy } from "react-icons/md"
import { FAKE_DEMO_ADDRESS } from "../constants"

interface IProps extends Omit<ButtonProps, "children"> {
  children?: Pick<ButtonProps, "children">
}
export const AddressPill: React.FC<IProps> = ({ children, ...btnProps }) => (
  <Button
    rightIcon={<Icon as={MdContentCopy} w={4} />}
    borderRadius="full"
    isDisabled
    _disabled={{
      bg: "background.highlight",
      color: "disabled",
      border: "1px",
      borderColor: "border",
    }}
    py={0}
    px={2}
    alignSelf="center"
    pointerEvents="none"
    fontSize="xs"
    {...btnProps}
  >
    {children ?? FAKE_DEMO_ADDRESS}
  </Button>
)
