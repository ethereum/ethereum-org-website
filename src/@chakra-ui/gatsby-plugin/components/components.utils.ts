import { SystemStyleObject, theme } from "@chakra-ui/react"
import { merge } from "lodash"

const {
  Accordion: accordionDefaultTheme,
  Avatar: avatarDefaultTheme,
  Badge: badgeDefaultTheme,
  Breadcrumb: breadcrumbDefaultTheme,
  Button: buttonDefaultTheme,
  Checkbox: checkboxDefaultTheme,
  CloseButton: closeButtonDefaultTheme,
  Code: codeDefaultTheme,
  Divider: dividerDefaultTheme,
  Drawer: drawerDefaultTheme,
  Form: formDefaultTheme,
  FormLabel: formLabelDefaultTheme,
  Heading: headingDefaultTheme,
  Input: inputDefaultTheme,
  Link: linkDefaultTheme,
  List: listDefaultTheme,
  Menu: menuDefaultTheme,
  Modal: modalDefaultTheme,
  Select: selectDefaultTheme,
  Spinner: spinnerDefaultTheme,
  Switch: switchDefaultTheme,
  Table: tableDefaultTheme,
  Tabs: tabsDefaultTheme,
  Tag: tagDefaultTheme,
} = theme.components

export {
  accordionDefaultTheme,
  avatarDefaultTheme,
  badgeDefaultTheme,
  breadcrumbDefaultTheme,
  buttonDefaultTheme,
  checkboxDefaultTheme,
  closeButtonDefaultTheme,
  codeDefaultTheme,
  dividerDefaultTheme,
  drawerDefaultTheme,
  formDefaultTheme,
  formLabelDefaultTheme,
  headingDefaultTheme,
  inputDefaultTheme,
  linkDefaultTheme,
  listDefaultTheme,
  menuDefaultTheme,
  modalDefaultTheme,
  selectDefaultTheme,
  spinnerDefaultTheme,
  switchDefaultTheme,
  tableDefaultTheme,
  tabsDefaultTheme,
  tagDefaultTheme,
}

/**
 * Allows for type safety groups of styles that will be merged.
 *
 * This is for merging default imported theming with custom styles.
 *
 * @param defaultTheming - The related object that comes from the Charka default themes
 *
 * @param styleObjs - The following style objects to be merged
 */
export function defineMergeStyles(
  defaultTheming?: SystemStyleObject | unknown,
  ...styleObjs: SystemStyleObject[] | unknown[]
) {
  return merge(defaultTheming, ...styleObjs) as Record<
    string,
    SystemStyleObject
  >
}

export const _notDisabled = "&:not([data-disabled], [disabled])"

const INPUT_TRIGGER_DISABLE_COLOR = "--input-trigger-disable-color"

export const commonInputTriggerStyles = {
  commonControlProps: {
    border: "1px",
    outline: "2px solid",
    outlineColor: "transparent",
    _checked: {
      color: "background",
      bg: "primary",
      borderColor: "primary",
    },
    _focusVisible: {
      borderColor: "primaryHighContrast",
      outlineColor: "primaryHover",
      outlineOffset: "2px",
      boxShadow: "none",
    },
    _disabled: {
      bg: `var(${INPUT_TRIGGER_DISABLE_COLOR})`,
      borderColor: `var(${INPUT_TRIGGER_DISABLE_COLOR})`,
      opacity: 1,
    },
    [_notDisabled]: {
      // Hovering over the label triggers the style for the control
      "*:hover > &": {
        bg: "primaryHover",
        borderColor: "primaryHighContrast",
      },
    },
  },
  commonContainerProps: {
    [INPUT_TRIGGER_DISABLE_COLOR]: "colors.disabled",
    _disabled: {
      cursor: "not-allowed",
    },
  },
  commonLabelProps: {
    _disabled: {
      color: `var(${INPUT_TRIGGER_DISABLE_COLOR})`,
      opacity: 1,
    },
  },
}
