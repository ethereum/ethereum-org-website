import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const variants = cva("my-space-3x", {
  variants: {
    variant: {
      narrow: "h-1 w-1/10 bg-primary-high-contrast",
    },
    position: {
      indent: "mx-page",
    },
  },
})

const HR = forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement> & VariantProps<typeof variants>
>(({ variant, position, className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn(variants({ variant, position }), className)}
    {...props}
  />
))
HR.displayName = "HR"

/**
 * @deprecated Use `HR` with `variant="narrow"` instead. `Divider` is retained
 * only for backward compatibility and is a thin wrapper that forwards that
 * variant. Prefer importing the `HR` default export from `@/components/ui/hr`.
 */
const Divider = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <HR ref={ref} variant="narrow" className={className} {...props} />
  )
)
Divider.displayName = "Divider"

export default HR

export { Divider }
