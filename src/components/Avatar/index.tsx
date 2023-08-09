import * as React from "react"
import {
  Avatar as ChakraAvatar,
  AvatarProps,
  Center,
  CenterProps,
  FlexProps,
  forwardRef,
  Link,
  LinkBox,
  LinkOverlay,
  LinkProps,
  ThemingProps,
} from "@chakra-ui/react"
import { RxExternalLink } from "react-icons/rx"

type AssignAvatarProps = Required<Pick<AvatarProps, "name" | "src">> &
  AvatarProps

type AvatarLinkProps = AssignAvatarProps &
  Pick<LinkProps, "href"> &
  ThemingProps<"Avatar"> & {
    label?: string
    direction?: "column" | "row"
  }

const Avatar = forwardRef<AvatarLinkProps, "div" | "a">((props, ref) => {
  const { href, src, name, size = "md", label, direction = "row" } = props

  const avatarProps = {
    src,
    name,
    size,
  }

  const linkProps = {
    href,
    isExternal: true,
    color: "primary.base",
  }

  if (label) {
    const _direction: "column-reverse" | "row-reverse" = `${direction}-reverse`
    return (
      <LinkBox as={Center} ref={ref} flexDirection={_direction} columnGap="1">
        <LinkOverlay
          as={Link}
          data-peer
          display="inline-flex"
          textDecoration="none"
          alignItems="center"
          gap="1"
          p="1"
          fontSize={size !== "md" ? "xs" : "sm"}
          zIndex="overlay"
          {...linkProps}
        >
          {label}
          <RxExternalLink />
        </LinkOverlay>
        <ChakraAvatar {...avatarProps} />
      </LinkBox>
    )
  }

  return (
    <ChakraAvatar
      as={Link}
      ref={ref}
      showBorder
      {...avatarProps}
      {...linkProps}
    />
  )
})

export default Avatar
