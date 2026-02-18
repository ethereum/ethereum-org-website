import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

// Size scale mirrors global.css heading sizes exactly
const headingVariants = cva("scroll-mt-20", {
  variants: {
    size: {
      xl: "text-4xl lg:text-5xl", // h1 default
      lg: "text-3xl lg:text-4xl", // h2 default
      md: "text-2xl lg:text-3xl", // h3 default
      sm: "text-xl lg:text-2xl", // h4 default
      xs: "text-md lg:text-xl", // h5 default
      "2xs": "text-sm lg:text-md", // h6 default
    },
    weight: {
      bold: "font-bold", // default — matches global.css
      black: "font-black", // SectionSubheader pattern
    },
  },
  defaultVariants: {
    size: "xl",
    weight: "bold",
  },
})

const defaultSizeMap = {
  h1: "xl",
  h2: "lg",
  h3: "md",
  h4: "sm",
  h5: "xs",
  h6: "2xs",
} as const satisfies Record<
  HeadingLevel,
  NonNullable<VariantProps<typeof headingVariants>["size"]>
>

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingLevel
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = "h1", size, weight, className, ...props }, ref) => {
    const resolvedSize = size ?? defaultSizeMap[Tag]
    return (
      <Tag
        ref={ref}
        className={cn(
          headingVariants({ size: resolvedSize, weight }),
          className
        )}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
export type { HeadingLevel, HeadingProps }
