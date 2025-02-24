import * as React from "react"
import { RxCheck } from "react-icons/rx"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils/cn"

/**
 * Common style classes for the checkbox, radio, and switch controls
 */
export const commonControlClasses =
  "size-4 border border-body-medium text-background focus-visible:outline-offset-4 focus-visible:outline-primary-hover disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled aria-[invalid]:border-error aria-[invalid]:bg-error-light data-[state='checked']:not-disabled:border-primary data-[state='checked']:not-disabled:bg-primary hover:[@media(hover:hover)_and_(pointer:fine)]:border-primary-hover hover:[@media(hover:hover)_and_(pointer:fine)]:bg-primary-hover data-[state='checked']:hover:[@media(hover:hover)_and_(pointer:fine)]:not-disabled:bg-primary-hover"

export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(commonControlClasses, "rounded-sm", className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center">
      <RxCheck className="text-sm" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export default Checkbox
