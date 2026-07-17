import { ArrowRight, ScrollText } from "lucide-react"

import { cn } from "@/lib/utils/cn"

import Link from "../ui/Link"

export type DocLinkProps = {
  children?: React.ReactNode
  href: string
  isExternal?: boolean
}

const DocLink = ({ href, children, isExternal }: DocLinkProps) => (
  <Link
    href={href}
    hideArrow
    className={cn(
      "group flex gap-4 rounded-base border p-4 text-current no-underline",
      "hover:bg-background-highlight hover:no-underline",
      "hover-lift-xs"
    )}
  >
    <ScrollText className="shrink-0 self-center" />
    <p className="flex-1 font-semibold">{children}</p>
    <ArrowRight
      className={cn(
        "mx-6 shrink-0 self-center",
        "transition-transform duration-300 group-hover:scale-120 group-hover:text-primary",
        isExternal ? "-rotate-45 rtl:-rotate-135" : "rotate-0 rtl:rotate-180"
      )}
    />
  </Link>
)

export default DocLink
