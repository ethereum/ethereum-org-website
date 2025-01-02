import type { IconType } from "react-icons/lib"

import { cn } from "@/lib/utils/cn"

import { Stack } from "../flex"

import {
  Button,
  ButtonLink,
  type ButtonLinkProps,
  type ButtonProps,
} from "./Button"

type CommonProps = {
  icon: IconType
  iconAlignment?: "left" | "right" | "start" | "end"
  /**
   * Reduced choices of the button variant.
   *
   * This component only accepts the `solid` or `outline` variant
   */
  variant?: "solid" | "outline"
  /**
   * Reduced choices of the button size
   *
   * This component only accepts the `md` or `sm` sizes
   */
  size?: "md" | "sm"
  mainText: string
  helperText: string
  /**
   * Should the main text be below the helper text instead of ab?
   */
  reverseTextOrder?: boolean
}

type OmittedTypes = "variant" | "size" | "children"

type ButtonTwoLinesProps = Omit<ButtonProps, OmittedTypes> & CommonProps

/**
 * Button that renders two styled lines of text
 */
export const ButtonTwoLines = ({
  className,
  iconAlignment = "start",
  size = "md",
  ...props
}: ButtonTwoLinesProps) => {
  const isIconLeft = ["left", "start"].includes(iconAlignment)

  const [childProps, ownProps] = createSplitProps<ButtonTwoLinesProps>()(
    { ...props, isIconLeft, size },
    [
      "reverseTextOrder",
      "mainText",
      "helperText",
      "variant",
      "icon",
      "isIconLeft",
      "isSecondary",
      "size",
    ]
  )

  return (
    <Button
      className={cn(
        isIconLeft ? "justify-start text-start" : "justify-end text-end",
        size === "md" ? "py-4" : "py-2",
        className
      )}
      {...ownProps}
    >
      <ChildContent {...childProps} />
    </Button>
  )
}

type ButtonLinkTwoLinesProps = Omit<ButtonLinkProps, OmittedTypes> & CommonProps

/**
 * ButtonLink that renders two styled lines of text
 */
export const ButtonLinkTwoLines = ({
  className,
  iconAlignment = "start",
  size = "md",
  ...props
}: ButtonLinkTwoLinesProps) => {
  const isIconLeft = ["left", "start"].includes(iconAlignment)

  const [childProps, ownProps] = createSplitProps<ButtonLinkTwoLinesProps>()(
    { ...props, isIconLeft, size },
    [
      "reverseTextOrder",
      "mainText",
      "helperText",
      "variant",
      "icon",
      "isIconLeft",
      "isSecondary",
      "size",
    ]
  )

  return (
    <ButtonLink
      className={cn(
        isIconLeft ? "justify-start text-start" : "justify-end text-end",
        size === "md" ? "py-4" : "py-2",
        className
      )}
      {...ownProps}
    >
      <ChildContent {...childProps} />
    </ButtonLink>
  )
}

type ChildContentProps = Omit<CommonProps, "iconAlignment"> & {
  isIconLeft: boolean
  isSecondary?: boolean
}

const ChildContent = ({
  helperText,
  icon: Icon,
  mainText,
  reverseTextOrder = false,
  size,
  variant,
  isIconLeft,
  isSecondary,
}: ChildContentProps) => {
  const ButtonIcon = () => (
    <Icon
      // TODO: Text size here should not be marked important after migration
      className="!text-2xl"
    />
  )
  return (
    <>
      {isIconLeft && <ButtonIcon />}
      <Stack
        className={cn(
          "gap-0",
          reverseTextOrder ? "flex-col-reverse" : "flex-col"
        )}
      >
        <span
          className={cn("text-md", size === "md" ? "font-bold" : "font-normal")}
        >
          {mainText}
        </span>
        <span
          className={cn(
            "text-xs",
            variant === "outline" || isSecondary
              ? "text-body-medium"
              : undefined
          )}
        >
          {helperText}
        </span>
      </Stack>
      {!isIconLeft && <ButtonIcon />}
    </>
  )
}

/**
 * Split props ripped from Ark UI and simplified:
 * https://github.com/chakra-ui/ark/blob/main/packages/react/src/utils/create-split-props.ts
 */
type EnsureKeys<ExpectedKeys extends (keyof ChildContentProps)[]> =
  keyof ChildContentProps extends ExpectedKeys[number]
    ? unknown
    : `Missing required keys: ${Exclude<keyof ChildContentProps, ExpectedKeys[number]> & string}`

function createSplitProps<ParentProps>() {
  return <
    Keys extends (keyof ChildContentProps)[],
    Props = Required<ParentProps>,
  >(
    props: Props,
    keys: Keys & EnsureKeys<Keys>
  ) =>
    (keys as string[]).reduce<
      [ChildContentProps, Omit<Props, Extract<(typeof keys)[number], string>>]
    >(
      (previousValue, currentValue) => {
        const [target, source] = previousValue
        const key = currentValue
        if (source[key] !== undefined) {
          target[key] = source[key]
        }
        delete source[key]
        return [target, source]
      },
      [{} as ChildContentProps, { ...props }]
    )
}
