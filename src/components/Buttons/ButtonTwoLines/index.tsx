import type { IconType } from "react-icons/lib"
import { Icon, Stack, Text } from "@chakra-ui/react"

import Button, { type ButtonProps } from "../Button"
import ButtonLink, { type ButtonLinkProps } from "../ButtonLink"

type CommonProps = {
  icon: IconType | typeof Icon
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

type OmittedTypes = "variant" | "size"

type ButtonTypeProps = CommonProps &
  Omit<ButtonProps, OmittedTypes> & {
    href?: never
  }

type ButtonLinkTypeProps = CommonProps &
  Omit<ButtonLinkProps, OmittedTypes> & {
    toId?: never
  }

type ButtonTwoLinesProps = ButtonTypeProps | ButtonLinkTypeProps

const hasHref = (props: ButtonTwoLinesProps): props is ButtonLinkTypeProps => {
  return "href" in props
}

const ButtonTwoLines = (props: ButtonTwoLinesProps) => {
  const {
    icon: Icon,
    iconAlignment = "start",
    mainText,
    helperText,
    reverseTextOrder = false,
    size = "md",
    ...rest
  } = props

  const isIconLeft = ["left", "start"].includes(iconAlignment)

  const vertPadding: ButtonTwoLinesProps["py"] = size === "md" ? "4" : "2"

  const buttonStyles: ButtonProps = {
    [isIconLeft ? "leftIcon" : "rightIcon"]: <Icon />,
    textAlign: isIconLeft ? "start" : "end",
    justifyContent: isIconLeft ? "flex-start" : "flex-end",
  }

  const Component = hasHref(props) ? ButtonLink : Button

  return (
    // TODO: fix type error
    // @ts-expect-error incompatible prop type shapes
    <Component
      {...buttonStyles}
      size={size}
      py={vertPadding}
      {...rest}
      sx={{
        ".chakra-button__icon svg": {
          // Force icon to be the same size for both button sizes
          fontSize: "2xl",
        },
      }}
    >
      <Stack
        spacing="0"
        flexDir={reverseTextOrder ? "column-reverse" : "column"}
      >
        <Text
          as="span"
          size="md"
          fontWeight={size === "md" ? "bold" : "normal"}
        >
          {mainText}
        </Text>
        <Text
          as="span"
          size="xs"
          color={
            rest.variant === "outline" || rest.isSecondary
              ? "body.medium"
              : undefined
          }
        >
          {helperText}
        </Text>
      </Stack>
    </Component>
  )
}

export default ButtonTwoLines
