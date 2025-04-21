import { IconBase as ReactIconBase, type IconBaseProps } from "react-icons"

import { cn } from "@/lib/utils/cn"

/**
 * Wrapper to generate an icon component, using the react-icons `IconBase` component.
 * Requires setting `displayName` and `children` props.
 *
 * **NOTE:** Setting SVG attributes in the `options` object become default values, which are overridden when passing props on render.
 */
export const createIconBase = (
  options: IconBaseProps & {
    displayName: string
  }
) => {
  const {
    children,
    displayName,
    className: defaultClassName,
    ...defaultProps
  } = options

  const Comp = ({ className, ...props }: IconBaseProps) => {
    return (
      <ReactIconBase
        className={cn(defaultClassName, className)}
        // Remove default props that come from `ReactIconBase` with `undefined`
        strokeWidth={undefined}
        stroke={undefined}
        {...defaultProps}
        {...props}
      >
        {children}
      </ReactIconBase>
    )
  }

  Comp.displayName = displayName

  return Comp
}

export type IconBaseType = ReturnType<typeof createIconBase>
