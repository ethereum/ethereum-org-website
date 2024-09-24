import {
  FaDiscord,
  FaGlobe,
  FaRedditAlien,
  FaStackExchange,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"
import { Box, Flex, Icon } from "@chakra-ui/react"

const socialColors = {
  reddit: "#ff4301",
  twitter: "#1da1f2",
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

type SocialListItemProps = {
  children?: React.ReactNode
  socialIcon: keyof typeof icons
}

const SocialListItem = ({ children, socialIcon }: SocialListItemProps) => (
  <Flex w="100%" py="2" px="0" align="center">
    <Icon
      as={icons[socialIcon]}
      pe={3}
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

export default SocialListItem
