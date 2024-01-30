import * as React from "react"
import Select, { ActionMeta, GroupBase, Props } from "react-select"
import {
  createStylesContext,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/react"

import { components } from "./innerComponents"

export const [ReactSelectStylesProvider, useReactSelectStyles] =
  createStylesContext("ReactSelect")

/**
 * Type for onChange handler in the `Select` component
 *
 * Specifically declared for single selects.
 *
 * @typeParam Option - The object type in the array
 * @param newValue - The object returned from the payload
 * @param actionMeta - The set of actions that can be run on change
 */
export type ReactSelectOnChange<Option> = (
  newValue: Option | null,
  actionMeta: ActionMeta<Option>
) => void

/**
 * Custom Built Version of the `react-select` single-select component.
 *
 * A styles provider wraps the original `Select` to send Chakra styles straight to the
 * custom internal components which are code-split into their own file.
 * See `./innerComponents.tsx`
 *
 * You can use the Chakra `variant` prop to declare a variant from the extended theme,
 * and use any valid props sent to the `Select` component.
 * @see {@link https://react-select.com/props#select-props} for the list of valid props
 */
const ReactSelect = <
  Option,
  Group extends GroupBase<Option> = any,
  IsMulti extends boolean = false
>({
  variant,
  ...rest
}: Props<Option, IsMulti, Group> & {
  variant?: ThemingProps<"ReactSelect">["variant"]
}) => {
  const styles = useMultiStyleConfig("ReactSelect", { variant })

  return (
    <ReactSelectStylesProvider value={styles}>
      <Select
        classNamePrefix="react-select"
        components={components}
        isSearchable={false}
        unstyled
        menuPlacement="bottom"
        styles={{
          menu: (base) => ({
            ...base,
            // This is to ensure a seamless border between the control and menu on open
            marginTop: "-2px",
          }),
          singleValue: (base) => ({
            ...base,
            // Force text overflow at smaller widths when inline with other select components
            position: "absolute",
          }),
        }}
        {...rest}
      />
    </ReactSelectStylesProvider>
  )
}

export default ReactSelect
