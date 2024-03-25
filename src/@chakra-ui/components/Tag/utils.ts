import { cssVar } from "@chakra-ui/react"

// Because the color scheme from the default theme
// Goes through the `Badge` config, used the variables
// created from that config.
export const $badgeBg = cssVar("badge-bg")
export const $badgeColor = cssVar("badge-color")

export const $tagBoxshadowColor = cssVar("tag-boxshadow-color")

// TODO: Can this get consolidated?
export const STATUS_COLORS = {
  normal: {
    subtle: {
      [$badgeBg.variable]: "colors.background.highlight",
      [$badgeColor.variable]: "colors.body.medium",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primary.hover",
          [$badgeColor.variable]: "colors.background.base",
          [$tagBoxshadowColor.variable]: "colors.background.highlight",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primary.light",
          [$badgeColor.variable]: "colors.body.medium",
          outlineColor: "primary.hover",
        },
        _active: {
          [$badgeBg.variable]: "colors.primary.hover",
          [$badgeColor.variable]: "colors.primary.light",
        },
      },
    },
    solid: {
      [$badgeBg.variable]: "colors.body.medium",
      [$badgeColor.variable]: "colors.background.highlight",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primary.hover",
          [$badgeColor.variable]: "colors.background.base",
          [$tagBoxshadowColor.variable]: "colors.background.highlight",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primary.light",
          [$badgeColor.variable]: "colors.body.medium",
          outlineColor: "primary.hover",
        },
        _active: {
          [$badgeBg.variable]: "colors.primary.hover",
          [$badgeColor.variable]: "colors.primary.light",
        },
      },
    },
    outline: {
      [$badgeColor.variable]: "colors.body.medium",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primary.hover",
          [$badgeColor.variable]: "colors.background.base",
          bg: $badgeBg.reference,
          [$tagBoxshadowColor.variable]: "colors.background.highlight",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
          borderColor: "transparent",
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primary.light",
          [$badgeColor.variable]: "colors.body.medium",
          bg: $badgeBg.reference,
          outlineColor: "primary.hover",
          borderColor: "transparent",
        },
        _active: {
          [$badgeBg.variable]: "colors.primary.hover",
          [$badgeColor.variable]: "colors.primary.light",
        },
      },
    },
  },
  tag: {
    subtle: {
      [$badgeBg.variable]: "colors.primary.light",
      [$badgeColor.variable]: "colors.primary.dark",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primary.hover",
          [$badgeColor.variable]: "colors.background.base",
          [$tagBoxshadowColor.variable]: "colors.primary.light",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primary.hover",
          [$badgeColor.variable]: "colors.background.base",
          outlineColor: "primary.base",
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    solid: {
      [$badgeBg.variable]: "colors.primary.dark",
      [$badgeColor.variable]: "colors.primary.light",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primary.hover",
          [$badgeColor.variable]: "colors.background.base",
          [$tagBoxshadowColor.variable]: "colors.primary.light",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primary.hover",
          [$badgeColor.variable]: "colors.background.base",
          outlineColor: "primary.base",
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    outline: {
      [$badgeColor.variable]: "colors.primary.highContrast",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primary.light",
          [$badgeColor.variable]: "colors.primary.dark",
          bg: $badgeBg.reference,
          [$tagBoxshadowColor.variable]: "colors.primary.light",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primary.light",
          [$badgeColor.variable]: "colors.primary.dark",
          bg: $badgeBg.reference,
          outlineColor: $badgeColor.reference,
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
  },
  success: {
    subtle: {
      [$badgeBg.variable]: "colors.success.light",
      [$badgeColor.variable]: "colors.success.base",
      "&:any-link": {
        _hover: {
          boxShadow: `2px 2px 0 ${$badgeColor.reference}`,
        },
        _focusWithin: {
          outlineColor: $badgeColor.reference,
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    solid: {
      [$badgeBg.variable]: "colors.success.base",
      [$badgeColor.variable]: "colors.success.light",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.success.light",
          [$badgeColor.variable]: "colors.success.base",
          boxShadow: `2px 2px 0 ${$badgeColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.success.light",
          [$badgeColor.variable]: "colors.success.base",
          outlineColor: $badgeColor.reference,
        },
        _active: {
          [$badgeBg.variable]: "colors.success.light",
          [$badgeColor.variable]: "colors.success.base",
          boxShadow: "none",
        },
      },
    },
    outline: {
      [$badgeColor.variable]: "colors.success.outline",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.success.light",
          [$badgeColor.variable]: "colors.success.base",
          boxShadow: `2px 2px 0 ${$badgeColor.reference}`,
          bg: $badgeBg.reference,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.success.light",
          [$badgeColor.variable]: "colors.success.base",
          bg: $badgeBg.reference,
          outlineColor: $badgeColor.reference,
        },
        _active: {
          [$badgeBg.variable]: "colors.success.light",
          [$badgeColor.variable]: "colors.success.base",
          bg: $badgeBg.reference,
          boxShadow: "none",
        },
      },
    },
  },
  error: {
    subtle: {
      [$badgeBg.variable]: "colors.error.light",
      [$badgeColor.variable]: "colors.error.base",
      "&:any-link": {
        _hover: {
          boxShadow: `2px 2px 0 ${$badgeColor.reference}`,
        },
        _focusWithin: {
          outlineColor: $badgeColor.reference,
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    solid: {
      [$badgeBg.variable]: "colors.error.base",
      [$badgeColor.variable]: "colors.error.light",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.error.light",
          [$badgeColor.variable]: "colors.error.base",
          boxShadow: `2px 2px 0 ${$badgeColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.error.light",
          [$badgeColor.variable]: "colors.error.base",
          outlineColor: $badgeColor.reference,
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    outline: {
      [$badgeColor.variable]: "colors.error.outline",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.error.light",
          [$badgeColor.variable]: "colors.error.base",
          bg: $badgeBg.reference,
          boxShadow: `2px 2px 0 ${$badgeColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.error.light",
          [$badgeColor.variable]: "colors.error.base",
          bg: $badgeBg.reference,
          outlineColor: $badgeColor.reference,
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
  },
  warning: {
    subtle: {
      [$badgeBg.variable]: "colors.attention.light",
      [$badgeColor.variable]: "colors.attention.base",
      "&:any-link": {
        _hover: {
          [$tagBoxshadowColor.variable]: "colors.attention.base",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          outlineColor: $badgeColor.reference,
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    solid: {
      [$badgeBg.variable]: "colors.attention.base",
      [$badgeColor.variable]: "white",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.attention.light",
          [$badgeColor.variable]: "colors.attention.base",
          [$tagBoxshadowColor.variable]: "colors.attention.base",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.attention.light",
          [$badgeColor.variable]: "colors.attention.base",
          outlineColor: $badgeColor.reference,
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    outline: {
      [$badgeColor.variable]: "colors.attention.outline",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.attention.light",
          [$badgeColor.variable]: "colors.attention.base",
          [$tagBoxshadowColor.variable]: "colors.attention.base",
          bg: $badgeBg.reference,
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.attention.light",
          [$badgeColor.variable]: "colors.attention.base",
          bg: $badgeBg.reference,
          outlineColor: $badgeColor.reference,
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
  },
}
