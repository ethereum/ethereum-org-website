import {
  FaDiscord,
  FaGlobe,
  FaRedditAlien,
  FaStackExchange,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"

import { Flex } from "./ui/flex"

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

const SocialListItem = ({ children, socialIcon }: SocialListItemProps) => {
  const SocialIcon = icons[socialIcon]

  return (
    <Flex className="w-full items-center px-0 py-2">
      <SocialIcon
        className="size-10 shrink-0 pe-3"
        style={{ color: socialColors[socialIcon] }}
      />
      <div className="italic [&>a]:not-italic">{children}</div>
    </Flex>
  )
}

export default SocialListItem
