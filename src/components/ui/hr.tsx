import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const variants = cva("", {
  variants: {
    variant: {
      full: "inline-block w-full border-body-medium opacity-60",
      narrow: "my-space-3x h-1 w-1/10 bg-primary-high-contrast",
    },
    position: {
      center: "mx-auto",
      indent: "mx-page",
    },
  },
  defaultVariants: {
    variant: "full",
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
