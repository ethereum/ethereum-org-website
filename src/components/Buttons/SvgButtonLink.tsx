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
    hideArrow
    {...props}
  >
    <div className="flex flex-col items-center gap-3.5 lg:flex-row lg:items-center">
      <div
        className={cn(
          "relative grid aspect-square size-[5em] shrink-0 place-items-center lg:self-start",
          "rounded-2xl border shadow-svg-button-link transition-shadow duration-200",
          "group-hover:shadow-svg-button-link-hover group-hover:transition-shadow group-hover:duration-200",
          "group-focus:shadow-none group-focus:transition-shadow group-focus:duration-200"
        )}
      >
        <Svg
          className={cn(
            "group-hover:rotate-3 group-hover:scale-110",
            "text-4xl duration-200 group-hover:duration-200 group-focus:rotate-3"
          )}
        />
      </div>
      <div className="text-center lg:text-start">
        {label && <p className="text-xl font-bold">{label}</p>}
        {children}
      </div>
    </div>
  </BaseLink>
)

export default SvgButtonLink
