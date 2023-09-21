import {
  type As,
  Grid,
  Icon,
  Text,
  type TextProps,
  Box,
} from "@chakra-ui/react"
import React from "react"
import { ClickAnimation } from "../ClickAnimation"
import { PulseAnimation } from "../PulseAnimation"
import { Button } from "../../Buttons"

interface SendReceiveButtonProps extends Pick<TextProps, "children"> {
  icon: As
  isHighlighted: boolean
  isDisabled: boolean
  onClick?: () => void
  isAnimated?: boolean
}

export const SendReceiveButton: React.FC<SendReceiveButtonProps> = ({
  children,
  icon,
  isHighlighted,
  isDisabled,
  onClick,
  isAnimated,
}) => (
  <Button
    variant="ghost"
    display="flex"
    flexDirection="column"
    alignItems="center"
    data-group
    isDisabled={isDisabled}
    onClick={onClick}
    gap={4}
  >
    <Grid
      bg="primary.base"
      borderRadius="full"
      placeItems="center"
      w={{ base: 10, md: 16 }}
      aspectRatio={1}
      _groupHover={{ bg: "primary.hover" }}
      _groupDisabled={{
        background: isHighlighted ? "primary.base" : "body.light",
      }}
      position="relative"
    >
      {!isDisabled && isAnimated && <PulseAnimation type="circle" />}
      <Icon
        as={icon}
        w={{ base: 4, md: 6 }}
        h={{ base: 4, md: 6 }}
        color="background.base"
      />
    </Grid>
    <Box position="relative">
      <Text
        fontWeight="bold"
        color="primary.base"
        textAlign="center"
        m={0}
        _groupHover={{ color: "primary.hover" }}
        _groupDisabled={{
          color: isHighlighted ? "primary.base" : "body.medium",
        }}
        position="relative"
      >
        {children}
      </Text>
      {!isDisabled && isAnimated && (
        <ClickAnimation below>click!</ClickAnimation>
      )}
    </Box>
  </Button>
)
