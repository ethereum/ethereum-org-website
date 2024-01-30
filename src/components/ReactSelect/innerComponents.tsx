import * as React from "react"
import { FaChevronDown } from "react-icons/fa"
import {
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  GroupProps,
  MenuListProps,
  OptionProps,
} from "react-select"
import { Box, Center, HStack, Icon } from "@chakra-ui/react"

import { useReactSelectStyles } from "."

export const reactSelectAnatomyKeys = [
  "container",
  "control",
  "indicatorIcon",
  "menuList",
  "option",
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
  Group extends GroupBase<Option>
>(
  props: ContainerProps<Option, IsMulti, Group>
) => {
  const { innerProps, children, className, selectProps } = props
  const { menuIsOpen } = selectProps

  const styles = useReactSelectStyles()
  return (
    <Box
      className={className}
      data-expanded={menuIsOpen}
      {...innerProps}
      __css={styles.container}
    >
      {children}
    </Box>
  )
}

const Control = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ControlProps<Option, IsMulti, Group>
) => {
  const { innerProps, innerRef, children, menuIsOpen } = props

  const styles = useReactSelectStyles()
  return (
    <HStack
      ref={innerRef}
      data-expanded={menuIsOpen}
      __css={styles.control}
      {...innerProps}
    >
      {children}
    </HStack>
  )
}

const DropdownIndicator = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  const { innerProps } = props
  const styles = useReactSelectStyles()
  return (
    <Center {...innerProps} __css={styles.indicatorIcon}>
      <Icon as={FaChevronDown} />
    </Center>
  )
}
const MenuList = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: MenuListProps<Option, IsMulti, Group>
) => {
  const { innerProps, innerRef, children } = props
  const styles = useReactSelectStyles()
  return (
    <Box ref={innerRef} {...innerProps} __css={styles.menuList}>
      {children}
    </Box>
  )
}

const Option = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group>
) => {
  const { innerProps, innerRef, children, isSelected, isFocused } = props

  const styles = useReactSelectStyles()
  return (
    <Box
      ref={innerRef}
      data-focused={isFocused}
      data-active={isSelected}
      {...innerProps}
      __css={styles.option}
    >
      {children}
    </Box>
  )
}

const Group = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: GroupProps<Option, IsMulti, Group>
) => {
  const {
    children,
    Heading: GroupHeading,
    headingProps,
    label,
    ...rest
  } = props

  const notFirstGroupStyles = {
    _notFirst: {
      borderTop: "1px",
      borderColor: "primary.lowContrast",
    },
  }

  if (!label) {
    return <Box {...notFirstGroupStyles}>{children}</Box>
  }

  return (
    <Box p={2} {...notFirstGroupStyles}>
      <Box fontSize="sm">
        <GroupHeading id={headingProps.id} {...rest}>
          {label}
        </GroupHeading>
      </Box>
      {children}
    </Box>
  )
}

export const components = {
  SelectContainer,
  Control,
  IndicatorSeparator: nullop,
  DropdownIndicator,
  MenuList,
  Option,
  Group,
}
