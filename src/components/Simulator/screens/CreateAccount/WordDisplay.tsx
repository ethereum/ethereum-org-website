import React, { type HTMLAttributes } from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { ListItem } from "@/components/ui/list"

const wordStyle = tv({
  base: "relative transition duration-1000 ease-in-out",
  variants: {
    variant: {
      initial: "border-b border-body-medium mt-1.5 md:mt-4 z-[1]",
      complete: "rounded-md bg-background text-body border border-body px-2",
      active:
        "rounded-md bg-background text-primary border border-primary px-2",
      incomplete:
        "rounded-md bg-background text-body border border-body-light px-2",
      disabled:
        "rounded-md bg-body-light text-body-medium px-2 border border-transparent",
    },
  },
})

export type WordStyleVariantProps = VariantProps<typeof wordStyle>

type WordDisplayProps = WordStyleVariantProps & HTMLAttributes<HTMLDivElement>

export const WordDisplay = ({
  children,
  variant,
  className,
  ...boxProps
}: WordDisplayProps) => (
  <div className={wordStyle({ variant, className })} {...boxProps}>
    <ListItem className="mb-0 list-inside text-sm leading-9">
      {children}
    </ListItem>
  </div>
)
