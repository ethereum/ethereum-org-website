import {
  FaDiscord,
  FaGlobe,
  FaRedditAlien,
  FaStackExchange,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"

import { cn } from "@/lib/utils/cn"

const icons = {
  reddit: FaRedditAlien,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  discord: FaDiscord,
  stackExchange: FaStackExchange,
  webpage: FaGlobe,
}

type SocialListItemProps = React.HTMLAttributes<HTMLDivElement> & {
  socialIcon: keyof typeof icons
}

const SocialListItem = ({
  children,
  socialIcon,
  className,
}: SocialListItemProps) => {
  const Icon = icons[socialIcon]
  return (
    <div className={cn("flex w-full items-center px-0 py-2", className)}>
      <Icon className={cn("size-10 pe-3 text-body")} />
      <div className="font-normal italic">{children}</div>
    </div>
  )
}

export default SocialListItem
