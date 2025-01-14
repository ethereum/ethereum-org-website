import {
  FaDiscord,
  FaGlobe,
  FaRedditAlien,
  FaStackExchange,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"

import { cn } from "@/lib/utils/cn"

const socialColorClasses = {
  reddit: "text-[#ff4301]",
  twitter: "text-[#1da1f2]",
  youtube: "text-[#ff0000]",
  discord: "text-[#7289da]",
  stackExchange: "text-[#48a2da]",
}

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
      <Icon
        className={cn("size-8 shrink-0 pe-3", socialColorClasses[socialIcon])}
      />
      <div className="font-normal italic">{children}</div>
    </div>
  )
}

export default SocialListItem
