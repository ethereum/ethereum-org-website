import { ComponentStyleConfig } from "@chakra-ui/react"

export const Table: ComponentStyleConfig = {
  baseStyle: {
    thead: {
      textAlign: "start",
    },
    th: {
      fontFamily: "body",
      fontWeight: "bold",
      textTransform: "none",
      letterSpacing: "normal",
    },
  },
  sizes: {
    md: {
      th: {
        px: 4,
        py: 3,
        fontSize: "md",
        _first: {
          pl: 0,
        },
        _last: {
          pr: 0,
        },
      },
      td: {
        px: 4,
        py: 3,
        _first: {
          pl: 0,
        },
        _last: {
          pr: 0,
        },
      },
    },
  },
  variants: {
    simple: {
      th: {
        color: "body",
        borderBottom: "1px",
        borderColor: "border",
      },
      td: {
        borderBottom: "1px",
        borderColor: "border",
      },
    },
  },
}
