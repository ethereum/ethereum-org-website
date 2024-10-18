import {
  FaDiscord,
  FaGlobe,
  FaRedditAlien,
  FaStackExchange,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"
import { Icon } from "@chakra-ui/react"

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
  color?: string
  boxSize?: number
}

const SocialListItem = ({
  children,
  socialIcon,
  color,
  boxSize = 10,
}: SocialListItemProps) => (
  <div className="flex w-full items-center px-0 py-2">
    <Icon
      as={icons[socialIcon]}
      pe={3}
      boxSize={boxSize}
      color={color || socialColors[socialIcon]}
    />
    <div className="font-normal italic">{children}</div>
  </div>
)

export default SocialListItem
