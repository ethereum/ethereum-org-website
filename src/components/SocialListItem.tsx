// Libraries
import React from "react"
import { Flex, Box, Icon } from "@chakra-ui/react"
import {
  FaYoutube,
  FaDiscord,
  FaRedditAlien,
  FaStackExchange,
  FaGlobe,
} from "react-icons/fa"

import { FaXTwitter } from "react-icons/fa6"

const socialColors = {
  reddit: "#ff4301",
  twitter: "#000000",
  youtube: "#ff0000",
  discord: "#7289da",
  stackExchange: "#48a2da",
}

const icons = {
  reddit: FaRedditAlien,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  discord: FaDiscord,
  stackExchange: FaStackExchange,
  webpage: FaGlobe,
}

export interface IProps {
  children?: React.ReactNode
  socialIcon: keyof typeof icons
}

const SocialListItem: React.FC<IProps> = ({ children, socialIcon }) => {
  return (
    <Flex w="100%" py="2" px="0" align="center">
      <Icon
        as={icons[socialIcon]}
        pr={3}
        boxSize={10}
        color={socialColors[socialIcon]}
      />
      <Box
        fontStyle="italic"
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
