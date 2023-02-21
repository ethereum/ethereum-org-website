import type { ComponentStyleConfig } from "@chakra-ui/theme"

export const Tabs: ComponentStyleConfig = {
  variants: {
    primary: {
      tab: {
        borderTopRadius: "0.3rem",
        borderBottom: "1px solid",
        borderBottomColor: "primary",
        px: 4,
        py: "0.3rem",
        _selected: {
          color: "background",
          bg: "primary",
        },
      },
      tabpanels: {
        mt: 4,
      },
      tabpanel: {
        p: 6,
        bg: "ednBackground",
        border: "1px solid",
        borderColor: "lightBorder",
        borderRadius: "lg",
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
}
