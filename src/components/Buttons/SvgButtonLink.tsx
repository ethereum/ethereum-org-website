import { FunctionComponent, ReactNode, SVGProps } from "react"

import { cn } from "@/lib/utils/cn"

type SvgButtonLinkProps = {
  Svg: FunctionComponent<SVGProps<SVGSVGElement>>
  label: string
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
  <a className={cn("group", className)} {...props}>
    <div className="flex flex-col items-center gap-3.5 lg:flex-row">
      <div className="relative grid size-[5em] place-items-center rounded-2xl border shadow-lg">
        <Svg />
      </div>
      <div className="text-center lg:text-start">
        <p className="text-xl font-bold">{label}</p>
        <p className="text-body">{children}</p>
      </div>
    </div>
  </a>
)

export default SvgButtonLink
