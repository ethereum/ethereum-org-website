import * as React from "react"
import { FaChevronDown } from "react-icons/fa"
import type {
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  GroupProps,
  MenuListProps,
  OptionProps,
} from "react-select"
import { Box, Center, HStack, Icon } from "@chakra-ui/react"

import { useSelectStyles } from "./context"

export const reactSelectAnatomyKeys = [
  "container",
  "control",
  "indicatorIcon",
  "menuList",
  "option",
  "groupHeading",
] as const

export const nullop = () => null

/*
 * Note on the Generic declarations:
 * Because the custom components are being created outside of the `components`
 * prop, generics sent to the respective props have to be redeclared, else type
 * errors throw for incompatibility.
 */

const SelectContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: ContainerProps<Option, IsMulti, Group>
) => {
  const { innerProps, children, className, selectProps } = props
  const { menuIsOpen } = selectProps

  const styles = useSelectStyles()
  return (
    <Box
      className={className}
      data-expanded={menuIsOpen}
      {...innerProps}
      id="react-select-container"
      sx={styles.container}
    >
      {children}
    </Box>
  )
}

const Control = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: ControlProps<Option, IsMulti, Group>
) => {
  const { innerProps, innerRef, children, menuIsOpen } = props

  const styles = useSelectStyles()
  return (
    <HStack
      ref={innerRef}
      data-expanded={menuIsOpen}
      sx={styles.control}
      {...innerProps}
      id="react-select-control"
    >
      {children}
    </HStack>
  )
}

const DropdownIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  const { innerProps } = props
  const styles = useSelectStyles()
  return (
    <Center
      {...innerProps}
      id="react-select-dropdown-indicator"
      sx={styles.indicatorIcon}
    >
      <Icon as={FaChevronDown} />
    </Center>
  )
}
const MenuList = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: MenuListProps<Option, IsMulti, Group>
) => {
  const { innerProps, innerRef, children } = props
  const styles = useSelectStyles()
  return (
    <Box
      ref={innerRef}
      {...innerProps}
      id="react-select-menu-list"
      sx={styles.menuList}
    >
      {children}
    </Box>
  )
}

const Option = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: OptionProps<Option, IsMulti, Group>
) => {
  const { innerProps, innerRef, children, isSelected, isFocused } = props

  const styles = useSelectStyles()
  return (
    <Box
      ref={innerRef}
      data-focused={isFocused}
      data-active={isSelected}
      {...innerProps}
      id="react-select-option"
      sx={styles.option}
    >
      {children}
    </Box>
  )
}

const Group = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(
  props: GroupProps<Option, IsMulti, Group>
) => {
  const { children, headingProps, label } = props

  const styles = useSelectStyles()

  const notFirstGroupStyles = {
    _notFirst: {
      borderTop: "1px",
      borderColor: "primary.lowContrast",
    },
  }

  const PARENT_ID = "react-select-group"

  if (!label) {
    return (
      <Box id={PARENT_ID} {...notFirstGroupStyles}>
        {children}
      </Box>
    )
  }

  return (
    <Box id={PARENT_ID} p={2} {...notFirstGroupStyles}>
      <Box fontSize="sm">
        <Box id={headingProps.id} sx={styles.groupHeading}>
          {label}
        </Box>
      </Box>
      {children}
    </Box>
  )
}

export const components = {
  SelectContainer,
  Control,
  // Essentially removes this component from default render
  IndicatorSeparator: nullop,
  DropdownIndicator,
  MenuList,
  Option,
  Group,
}
