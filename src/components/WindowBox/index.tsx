import type { FC, ReactNode, SVGProps } from "react"

import { cn } from "@/lib/utils/cn"

type WindowBoxProps = {
  title: ReactNode
  Svg: FC<SVGProps<SVGElement>>
  children?: ReactNode
  className?: string
}

const WindowBox = ({ title, Svg, children, className }: WindowBoxProps) => (
  <div
    className={cn(
      "flex max-w-screen-md flex-col overflow-hidden rounded-2xl border shadow-window-box",
      className
    )}
  >
    <div className="flex items-center gap-4 bg-gradient-to-b from-primary-hover/5 p-4 dark:from-primary-hover/20">
      <div className="grid size-10 place-items-center rounded-lg border">
        <Svg />
      </div>
      <p className="font-bold">{title}</p>
    </div>
    {children}
  </div>
)

export default WindowBox
