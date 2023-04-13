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
): Record<string, SystemStyleObject> {
  return merge(defaultTheming, ...styleObjs)
}
