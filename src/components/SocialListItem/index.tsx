import { Globe } from "lucide-react"

import Discord from "@/components/icons/discord.svg"
import Reddit from "@/components/icons/reddit.svg"
import StackExchange from "@/components/icons/stack-exchange.svg"
import Twitter from "@/components/icons/twitter.svg"
import Youtube from "@/components/icons/youtube.svg"

import { cn } from "@/lib/utils/cn"

const socialColorClasses = {
  reddit: "text-[#ff4301]",
  twitter: "text-[#1da1f2]",
  youtube: "text-[#ff0000]",
  discord: "text-[#7289da]",
  stackExchange: "text-[#48a2da]",
}

const icons = {
  reddit: Reddit,
  twitter: Twitter,
  youtube: Youtube,
  discord: Discord,
  stackExchange: StackExchange,
  webpage: Globe,
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
