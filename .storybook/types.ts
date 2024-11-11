import type { StyleConfig, ThemingProps } from "@chakra-ui/react"
import type { ArgTypes } from "@storybook/react"

// Type declarations below pulled directly from `@chakra-ui/storybook-addon`
// with some alteration
// (Subject to deprecation and removal upon release of Chakra v3)

/**
 * `keyof` alternative which omits non-string keys
 */
type KeyOf<T> = [T] extends [never]
  ? never
  : T extends object
    ? Extract<keyof T, string>
    : never

export type ThemingArgTypeKey = "variant" | "size"

/**
 * Create Storybook controls based on a Chakra UI theme component.
 *
 * @example
 * export default {
 *   title: "Components / Forms / Button",
 *   argTypes: getThemingArgTypes(theme, "Button"),
 * }
 *
 * @example full example
 * import { Meta, StoryFn } from "@storybook/react"
 * import { getThemingArgTypes } from "@chakra-ui/storybook-addon"
 * import { theme } from "<your-theme>"
 *
 * export default {
 *   title: "Components / Forms / Button",
 *   argTypes: {
 *     ...getThemingArgTypes(theme, "Button"),
 *     children: "string"
 *   },
 *   args: { children: "Button" },
 * } as Meta
 *
 * interface StoryProps extends ThemingProps<"Button"> {
 *   children?: React.ReactNode
 * }
 *
 * export const Basic: StoryFn<StoryProps> = (props) => <Button {...props} />
 *
 * @param theme same Chakra UI theme used in .storybook/preview.tsx
 * @param componentName component name to create the ArgTypes for
 */
export function getThemingArgTypes<
  Theme extends Record<string, unknown> & {
    components?: Record<string, StyleConfig>
  },
  ComponentName extends KeyOf<Theme["components"]>,
>(theme: Theme, componentName: ComponentName) {
  const component = theme.components?.[componentName]
  if (!component) {
    return undefined
  }

  const argTypes: ArgTypes<
    Partial<Pick<ThemingProps<ComponentName>, ThemingArgTypeKey>>
  > = {}

  const variantOptions = Object.keys(component.variants || {})
  if (variantOptions.length) {
    argTypes.variant = {
      type: { name: "enum", value: variantOptions },
      defaultValue: component.defaultProps?.variant,
    }
  }

  const sizeOptions = Object.keys(component.sizes || {})
  if (sizeOptions.length) {
    argTypes.size = {
      type: { name: "enum", value: sizeOptions },
      defaultValue: component.defaultProps?.size,
    }
  }

  return argTypes
}
