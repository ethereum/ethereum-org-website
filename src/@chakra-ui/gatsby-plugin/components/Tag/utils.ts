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
      [$badgeBg.variable]: "colors.backgroundHighlight",
      [$badgeColor.variable]: "colors.bodyMedium",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primaryHover",
          [$badgeColor.variable]: "colors.background",
          [$tagBoxshadowColor.variable]: "colors.backgroundHighlight",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primaryLight",
          [$badgeColor.variable]: "colors.bodyMedium",
          outlineColor: "primaryHover",
        },
        _active: {
          [$badgeBg.variable]: "colors.primaryHover",
          [$badgeColor.variable]: "colors.primaryLight",
        },
      },
    },
    solid: {
      [$badgeBg.variable]: "colors.bodyMedium",
      [$badgeColor.variable]: "colors.backgroundHighlight",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primaryHover",
          [$badgeColor.variable]: "colors.background",
          [$tagBoxshadowColor.variable]: "colors.backgroundHighlight",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primaryLight",
          [$badgeColor.variable]: "colors.bodyMedium",
          outlineColor: "primaryHover",
        },
        _active: {
          [$badgeBg.variable]: "colors.primaryHover",
          [$badgeColor.variable]: "colors.primaryLight",
        },
      },
    },
    outline: {
      [$badgeColor.variable]: "colors.bodyMedium",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primaryHover",
          [$badgeColor.variable]: "colors.background",
          bg: $badgeBg.reference,
          [$tagBoxshadowColor.variable]: "colors.backgroundHighlight",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
          borderColor: "transparent",
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primaryLight",
          [$badgeColor.variable]: "colors.bodyMedium",
          bg: $badgeBg.reference,
          outlineColor: "primaryHover",
          borderColor: "transparent",
        },
        _active: {
          [$badgeBg.variable]: "colors.primaryHover",
          [$badgeColor.variable]: "colors.primaryLight",
        },
      },
    },
  },
  tag: {
    subtle: {
      [$badgeBg.variable]: "colors.primaryLight",
      [$badgeColor.variable]: "colors.primaryDark",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primaryHover",
          [$badgeColor.variable]: "colors.background",
          [$tagBoxshadowColor.variable]: "colors.primaryLight",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primaryHover",
          [$badgeColor.variable]: "colors.background",
          outlineColor: "primary",
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    solid: {
      [$badgeBg.variable]: "colors.primaryDark",
      [$badgeColor.variable]: "colors.primaryLight",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primaryHover",
          [$badgeColor.variable]: "colors.background",
          [$tagBoxshadowColor.variable]: "colors.primaryLight",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primaryHover",
          [$badgeColor.variable]: "colors.background",
          outlineColor: "primary",
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    outline: {
      [$badgeColor.variable]: "colors.tagOutline",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.primaryLight",
          [$badgeColor.variable]: "colors.primaryDark",
          bg: $badgeBg.reference,
          [$tagBoxshadowColor.variable]: "colors.primaryLight",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.primaryLight",
          [$badgeColor.variable]: "colors.primaryDark",
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
      [$badgeBg.variable]: "colors.successLight",
      [$badgeColor.variable]: "colors.success",
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
      [$badgeBg.variable]: "colors.success",
      [$badgeColor.variable]: "colors.successLight",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.successLight",
          [$badgeColor.variable]: "colors.success",
          boxShadow: `2px 2px 0 ${$badgeColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.successLight",
          [$badgeColor.variable]: "colors.success",
          outlineColor: $badgeColor.reference,
        },
        _active: {
          [$badgeBg.variable]: "colors.successLight",
          [$badgeColor.variable]: "colors.success",
          boxShadow: "none",
        },
      },
    },
    outline: {
      [$badgeColor.variable]: "colors.successOutline",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.successLight",
          [$badgeColor.variable]: "colors.success",
          boxShadow: `2px 2px 0 ${$badgeColor.reference}`,
          bg: $badgeBg.reference,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.successLight",
          [$badgeColor.variable]: "colors.success",
          bg: $badgeBg.reference,
          outlineColor: $badgeColor.reference,
        },
        _active: {
          [$badgeBg.variable]: "colors.successLight",
          [$badgeColor.variable]: "colors.success",
          bg: $badgeBg.reference,
          boxShadow: "none",
        },
      },
    },
  },
  error: {
    subtle: {
      [$badgeBg.variable]: "colors.errorLight",
      [$badgeColor.variable]: "colors.error",
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
      [$badgeBg.variable]: "colors.error",
      [$badgeColor.variable]: "colors.errorLight",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.errorLight",
          [$badgeColor.variable]: "colors.error",
          boxShadow: `2px 2px 0 ${$badgeColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.errorLight",
          [$badgeColor.variable]: "colors.error",
          outlineColor: $badgeColor.reference,
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    outline: {
      [$badgeColor.variable]: "colors.errorOutline",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.errorLight",
          [$badgeColor.variable]: "colors.error",
          bg: $badgeBg.reference,
          boxShadow: `2px 2px 0 ${$badgeColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.errorLight",
          [$badgeColor.variable]: "colors.error",
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
      [$badgeBg.variable]: "colors.attentionLight",
      [$badgeColor.variable]: "colors.attention",
      "&:any-link": {
        _hover: {
          [$tagBoxshadowColor.variable]: "colors.attention",
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
      [$badgeBg.variable]: "colors.attention",
      [$badgeColor.variable]: "white",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.attentionLight",
          [$badgeColor.variable]: "colors.attention",
          [$tagBoxshadowColor.variable]: "colors.attention",
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.attentionLight",
          [$badgeColor.variable]: "colors.attention",
          outlineColor: $badgeColor.reference,
        },
        _active: {
          boxShadow: "none",
        },
      },
    },
    outline: {
      [$badgeColor.variable]: "colors.attentionOutline",
      "&:any-link": {
        _hover: {
          [$badgeBg.variable]: "colors.attentionLight",
          [$badgeColor.variable]: "colors.attention",
          [$tagBoxshadowColor.variable]: "colors.attention",
          bg: $badgeBg.reference,
          boxShadow: `2px 2px 0 ${$tagBoxshadowColor.reference}`,
        },
        _focusWithin: {
          [$badgeBg.variable]: "colors.attentionLight",
          [$badgeColor.variable]: "colors.attention",
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
