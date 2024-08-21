import type { FC, ReactNode, SVGProps } from "react"

import { cn } from "@/lib/utils/cn"

import { BaseLink } from "../ui/Link"

type SvgButtonLinkProps = {
  Svg: FC<SVGProps<SVGElement>>
  label?: string
  children: ReactNode
  href: string
  className?: string
  size?: number
}

const SvgButtonLink = ({
  label,
  children,
  Svg,
  className,
  ...props
}: SvgButtonLinkProps) => (
  <BaseLink
    className={cn(
      "group rounded-2xl no-underline focus:outline focus:outline-4 focus:outline-offset-8",
      className
    )}
    {...props}
  >
    <div className="flex flex-col items-center gap-3.5 lg:flex-row lg:items-center">
      <div className="relative grid aspect-square size-[5em] shrink-0 place-items-center rounded-2xl border shadow-lg group-hover:shadow-2xl group-hover:transition-shadow group-hover:duration-100 group-focus:shadow-2xl group-focus:transition-shadow group-focus:duration-100 lg:self-start">
        <Svg className="text-4xl group-hover:animate-pulse group-focus:animate-pulse" />
      </div>
      <div className="text-center lg:text-start">
        {label && <p className="text-xl font-bold">{label}</p>}
        {children}
      </div>
    </div>
  </BaseLink>
)

export default SvgButtonLink
