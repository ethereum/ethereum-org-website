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

type ButtonTypeProps = CommonProps &
  Omit<ButtonProps, OmittedTypes> & {
    componentType: "button"
  }

type ButtonLinkTypeProps = CommonProps &
  Omit<ButtonLinkProps, OmittedTypes> & {
    componentType: "link"
  }

type ButtonTwoLinesProps = ButtonTypeProps | ButtonLinkTypeProps

const ButtonTwoLines = ({
  iconAlignment = "start",
  className,
  size = "md",
  ...props
}: ButtonTwoLinesProps) => {
  const isIconLeft = ["left", "start"].includes(iconAlignment)

  const commonClassStyles = cn(
    isIconLeft ? "text-start justify-start" : "text-end justify-end",
    size === "md" ? "py-4" : "py-2",
    className
  )

  if (props.componentType === "link") {
    const { buttonProps, ...rest } = props
    return (
      <ButtonLink
        className={commonClassStyles}
        // size={size}
        buttonProps={buttonProps}
        {...rest}
      >
        <ChildContent
          {...rest}
          size={size}
          isSecondary={buttonProps?.isSecondary}
          isIconLeft={isIconLeft}
        />
      </ButtonLink>
    )
  }
  return (
    <Button className={commonClassStyles} size={size} {...props}>
      <ChildContent {...props} size={size} isIconLeft={isIconLeft} />
    </Button>
  )
}

export default ButtonTwoLines

const ChildContent = (
  props: Omit<ButtonTwoLinesProps, "iconAlignment" | "buttonProps"> & {
    isIconLeft: boolean
    isSecondary?: boolean
  }
) => {
  const {
    reverseTextOrder = false,
    size,
    mainText,
    helperText,
    icon: Icon,
    isIconLeft,
    isSecondary,
    variant,
  } = props

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
