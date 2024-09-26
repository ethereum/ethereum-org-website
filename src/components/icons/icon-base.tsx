import { type ReactNode } from "react"
import { IconBase as ReactIconBase, type IconBaseProps } from "react-icons/lib"

import { cn } from "@/lib/utils/cn"

/**
 * Wrapper to generate an icon component, using the react-icons `IconBase` component.
 * Requires setting `displayName` and `children` props.
 *
 * **NOTE:** Setting SVG attributes in the `options` object become default values, which are overriden when passing props on render.
 */
export const createIconBase = (
  options: Omit<IconBaseProps, "children"> & {
    displayName: string
    children: ReactNode
  }
) => {
  const {
    children,
    displayName,
    className: defaultClassName,
    ...defaultProps
  } = options

  const Comp = ({ className, ...props }: IconBaseProps) => (
    <ReactIconBase
      className={cn(defaultClassName, className)}
      {...defaultProps}
      {...props}
    >
      {children}
    </ReactIconBase>
  )

  Comp.displayName = displayName

  return Comp
}
