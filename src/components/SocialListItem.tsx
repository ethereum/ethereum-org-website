// Libraries
import React from "react"
import { Flex, Box, chakra } from "@chakra-ui/react"

// Components
import Icon from "./Icon"

// Styles
const StyledIcon = chakra(Icon)

export interface IProps {
  children?: React.ReactNode
  socialIcon: string
}
const SocialListItem: React.FC<IProps> = ({ children, socialIcon }) => {
  return (
    <Flex w="100%" py="0.5rem" px="0" alignItems="center">
      <div>
        <StyledIcon
          pr={"0.75em"}
          name={socialIcon}
          size={"2.5rem"}
          color={socialIcon}
        />
      </div>
      <Box
        fontStyle={"italic"}
        sx={{
          "> a": {
            fontStyle: "normal",
          },
        }}
      >
        {children}
      </Box>
    </Flex>
  )
}

export default SocialListItem
