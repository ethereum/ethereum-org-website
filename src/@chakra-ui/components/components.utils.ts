import merge from "lodash/merge"
import { cssVar, SystemStyleObject, theme } from "@chakra-ui/react"

const {
  Alert: alertDefaultTheme,
  Avatar: avatarDefaultTheme,
  Badge: badgeDefaultTheme,
  Breadcrumb: breadcrumbDefaultTheme,
  Checkbox: checkboxDefaultTheme,
  CloseButton: closeButtonDefaultTheme,
  Code: codeDefaultTheme,
  Drawer: drawerDefaultTheme,
  Form: formDefaultTheme,
  FormLabel: formLabelDefaultTheme,
  Heading: headingDefaultTheme,
  Input: inputDefaultTheme,
  Link: linkDefaultTheme,
  List: listDefaultTheme,
  Menu: menuDefaultTheme,
  Modal: modalDefaultTheme,
  Popover: popoverDefaultTheme,
  Radio: radioDefaultTheme,
  Select: selectDefaultTheme,
  Spinner: spinnerDefaultTheme,
  Switch: switchDefaultTheme,
  Table: tableDefaultTheme,
  Tabs: tabsDefaultTheme,
  Tag: tagDefaultTheme,
} = theme.components

export {
  alertDefaultTheme,
  avatarDefaultTheme,
  badgeDefaultTheme,
  breadcrumbDefaultTheme,
  checkboxDefaultTheme,
  closeButtonDefaultTheme,
  codeDefaultTheme,
  drawerDefaultTheme,
  formDefaultTheme,
  formLabelDefaultTheme,
  headingDefaultTheme,
  inputDefaultTheme,
  linkDefaultTheme,
  listDefaultTheme,
  menuDefaultTheme,
  modalDefaultTheme,
  popoverDefaultTheme,
  radioDefaultTheme,
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
): Record<string, SystemStyleObject> {
  return merge(defaultTheming, ...styleObjs)
}

export const _notDisabledReadOnly =
  "&:not([data-disabled], [disabled], [data-readonly])"

const $inputTriggerDisableColor = cssVar("input-trigger-disable-color")

export const commonInputTriggerStyles = {
  commonControlProps: {
    border: "1px",
    borderColor: "body.medium",
    outline: "3px solid",
    outlineColor: "transparent",
    _checked: {
      color: "background.base",
      bg: "primary.base",
      borderColor: "primary.base",
    },
    _focusVisible: {
      borderColor: "primary.highContrast",
      outlineColor: "primary.hover",
      outlineOffset: "2px",
      boxShadow: "none",
    },
    _disabled: {
      bg: $inputTriggerDisableColor.reference,
      borderColor: $inputTriggerDisableColor.reference,
      opacity: 1,
      _checked: {
        bg: $inputTriggerDisableColor.reference,
        borderColor: $inputTriggerDisableColor.reference,
      },
    },
    [_notDisabledReadOnly]: {
      // Hovering over the label triggers the style for the control
      "*[data-checked]:hover > &": {
        bg: "primary.hover",
        borderColor: "primary.highContrast",
      },
      "*:not([data-checked]):hover > &": {
        bg: "body.light",
        borderColor: "primary.highContrast",
      },
    },
    _invalid: {
      // TODO: Investigate inconsistency in prop rendering order (possible Chakra bug)
      // border: "2px",
      borderColor: "error.base",
      bg: "error.light",
    },
  },
  commonContainerProps: {
    [$inputTriggerDisableColor.variable]: "colors.disabled",
    ["[data-disabled], [disabled], [data-readonly]"]: {
      cursor: "not-allowed",
    },
  },
  commonLabelProps: {
    _disabled: {
      color: $inputTriggerDisableColor.reference,
      opacity: 1,
    },
  },
}
