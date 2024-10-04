import { createContext, useContext } from "react"
import { FaChevronDown } from "react-icons/fa"
import type {
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  GroupProps,
  MenuListProps,
  MenuProps,
  OptionProps,
} from "react-select"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils/cn"

export const selectVariants = tv({
  slots: {
    container:
      "w-full min-h-10.5 [--border-base-width:1px] relative z-[1] cursor-pointer",
    control:
      "p-2 flex items-center gap-4 border-[length:var(--border-base-width)] border-current text-[color:var(--my-var)] not-[[data-expanded=true]]:focus-within:outline-3 not-[[data-expanded=true]]:focus-within:outline-primary-hover not-[[data-expanded=true]]:focus-within:outline -outline-offset-2 [&[data-expanded=true]]:bg-background-highlight [&[data-expanded=true]]:text-primary [&[data-expanded=true]]:border-primary-low-contrast hover:text-primary hover:border-primary-high-contrast",
    indicatorIcon:
      "text-sm leading-none transition-transform [*[data-expanded=true]_&]:rotate-180",
    menu: "-z-[1] absolute w-full",
    menuList:
      "overflow-y-auto bg-background-highlight w-full max-h-80 border-x-[length:--border-base-width] border-b-[length:--border-base-width] rounded-b",
    option:
      "text-body p-2 [&[data-focused=true]]:bg-primary-low-contrast [&[data-focused=true]]:text-primary [&[data-active=true]]:bg-body-light [&[data-active=true]]:text-primary-visited",
    groupHeading: "text-body-medium text-xs",
  },
  variants: {
    variant: {
      flushed: {
        container: "[--border-top-radius:4px] rounded-t-[--border-top-radius]",
        control:
          "border-t-transparent border-x-transparent rounded-t-[--border-top-radius] hover:border-t-transparent hover:border-x-transparent [&[data-expanded=true]]:border-body-light [&[data-expanded=true]]:border-b-primary",
        menuList: "border-body-light",
      },
      outline: {
        container:
          "[--border-outline-radius:4px] rounded-[--border-outline-radius]",
        control:
          "rounded-[--border-outline-radius] [&[data-expanded=true]]:border-b-transparent [&[data-expanded=true]]:rounded-b-none",
        menuList: "border-primary-low-contrast",
      },
    },
  },
  defaultVariants: {
    variant: "flushed",
  },
})

export type SelectVariants = VariantProps<typeof selectVariants>

export const SelectStylesContext = createContext(selectVariants())

const useSelectStyles = () => useContext(SelectStylesContext)

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

  const { container } = useSelectStyles()
  return (
    <div
      className={cn(container(), className)}
      data-expanded={menuIsOpen}
      {...innerProps}
      id="react-select-container"
    >
      {children}
    </div>
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

  const { control } = useSelectStyles()
  return (
    <div
      ref={innerRef}
      className={control()}
      data-expanded={menuIsOpen}
      {...innerProps}
      id="react-select-control"
    >
      {children}
    </div>
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
  const { indicatorIcon } = useSelectStyles()
  return (
    <div
      {...innerProps}
      className={indicatorIcon()}
      id="react-select-dropdown-indicator"
    >
      <FaChevronDown />
    </div>
  )
}

const Menu = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({
  children,
  innerProps,
  innerRef,
}: MenuProps<Option, IsMulti, Group>) => {
  const { menu } = useSelectStyles()
  return (
    <div
      ref={innerRef}
      className={menu()}
      id="react-select-menu"
      {...innerProps}
    >
      {children}
    </div>
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
  const { menuList } = useSelectStyles()
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={menuList()}
      id="react-select-menu-list"
    >
      {children}
    </div>
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

  const { option } = useSelectStyles()
  return (
    <div
      ref={innerRef}
      data-focused={isFocused}
      data-active={isSelected}
      {...innerProps}
      className={option()}
      id="react-select-option"
    >
      {children}
    </div>
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

  const { groupHeading } = useSelectStyles()

  const notFirstGroupClasses =
    "not-[:first-of-type]:border-t-[1px] not-[:first-of-type]:border-primary-low-contrast"

  const PARENT_ID = "react-select-group"

  if (!label) {
    return (
      <div id={PARENT_ID} className={notFirstGroupClasses}>
        {children}
      </div>
    )
  }

  return (
    <div id={PARENT_ID} className={cn("p-2", notFirstGroupClasses)}>
      <div className="text-sm">
        <div id={headingProps.id} className={groupHeading()}>
          {label}
        </div>
      </div>
      {children}
    </div>
  )
}

export const components = {
  SelectContainer,
  Control,
  // Essentially removes this component from default render
  IndicatorSeparator: nullop,
  DropdownIndicator,
  Menu,
  MenuList,
  Option,
  Group,
}
