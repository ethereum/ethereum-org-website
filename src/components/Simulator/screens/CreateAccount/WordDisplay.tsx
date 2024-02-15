import React from "react"
import {
  Box,
  type BoxProps,
  ListItem,
  type ListItemProps,
} from "@chakra-ui/react"

const wordStyleVariants = {
  initial: {
    borderBottom: "1px",
    borderColor: "body.medium",
    mt: { base: 1.5, md: 4 },
    zIndex: 1,
  },
  complete: {
    borderRadius: "md",
    bg: "background.base",
    color: "body.base",
    border: "1px",
    borderColor: "body.base",
    px: 2,
  },
  active: {
    borderRadius: "md",
    bg: "background.base",
    color: "primary.base",
    border: "1px",
    borderColor: "primary.base",
    px: 2,
  },
  incomplete: {
    borderRadius: "md",
    bg: "background.base",
    color: "body.base",
    border: "1px",
    borderColor: "body.light",
    px: 2,
  },
  disabled: {
    borderRadius: "md",
    bg: "body.light",
    color: "body.medium",
    px: 2,
    border: "1px",
    borderColor: "transparent",
  },
} as const

export type WordStyleVariant = keyof typeof wordStyleVariants

type WordDisplayProps = Pick<ListItemProps, "children"> &
  Omit<BoxProps, "children"> & {
    variant: WordStyleVariant
  }

export const WordDisplay = ({
  children,
  variant,
  ...boxProps
}: WordDisplayProps) => (
  <Box {...wordStyleVariants[variant]} {...boxProps}>
    <ListItem fontSize="sm" lineHeight={9} mb={0} listStylePos="inside">
      {children}
    </ListItem>
  </Box>
)
