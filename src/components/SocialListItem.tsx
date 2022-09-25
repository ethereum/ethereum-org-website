// Libraries
import React, { useMemo } from "react"
import { Flex, Box, chakra, Icon } from "@chakra-ui/react"
import {
  FaTwitter,
  FaYoutube,
  FaDiscord,
  FaRedditAlien,
  FaStackExchange,
  FaGlobe,
} from "react-icons/fa"

// Components
import { socialColors } from "./Icon"

// Styles
const StyledIcon = chakra(Icon, {
  pr: 3,
  boxSize: "2.5rem",
})

export interface IProps {
  children?: React.ReactNode
  socialIcon: string
}

const SocialListItem: React.FC<IProps> = ({ children, socialIcon }) => {
  const RenderIcon = useMemo(() => {
    switch (socialIcon) {
      case "reddit":
        return (
          <StyledIcon as={FaRedditAlien} color={socialColors[socialIcon]} />
        )
      case "twitter":
        return <StyledIcon as={FaTwitter} color={socialColors[socialIcon]} />
      case "youtube":
        return <StyledIcon as={FaYoutube} color={socialColors[socialIcon]} />
      case "discord":
        return <StyledIcon as={FaDiscord} color={socialColors[socialIcon]} />
      case "stackExchange":
        return (
          <StyledIcon as={FaStackExchange} color={socialColors[socialIcon]} />
        )
      case "webpage":
        return <StyledIcon as={FaGlobe} color={socialColors[socialIcon]} />
    }
  }, [socialIcon])
  return (
    <Flex w="100%" py="2" px="0" align="center">
      {RenderIcon}
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
