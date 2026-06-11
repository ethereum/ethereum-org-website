import { ArrowRight, ScrollText } from "lucide-react"

import { cn } from "@/lib/utils/cn"

import Link from "../ui/Link"

export type DocLinkProps = {
  children?: React.ReactNode
  href: string
  isExternal?: boolean
}

const DocLink = ({ href, children, isExternal }: DocLinkProps) => {
  const durationClasses =
    "duration-300 hover:duration-300 group-hover:duration-300"

  return (
    <Link
      href={href}
      hideArrow
      className={cn(
        "group flex gap-4 rounded-base border p-4 text-current no-underline",
        "hover:bg-background-highlight hover:no-underline",
        "transition-all hover:scale-[1.005] hover:shadow hover:transition-all",
        durationClasses
      )}
    >
      <ScrollText className="shrink-0 self-center" />
      <p className="flex-1 font-semibold">{children}</p>
      <ArrowRight
        className={cn(
          "mx-6 shrink-0 self-center",
          "transition-tranform group-hover:transition-tranform group-hover:scale-120 group-hover:text-primary",
          isExternal ? "-rotate-45 rtl:-rotate-135" : "rotate-0 rtl:rotate-180",
          durationClasses
        )}
      />
    </Link>
  )
}

export default DocLink
