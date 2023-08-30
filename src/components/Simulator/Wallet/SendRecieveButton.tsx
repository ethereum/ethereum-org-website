import {
  type As,
  Grid,
  Icon,
  Text,
  type TextProps,
  Box,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import React from "react"
import Button from "../../Button"

const MotionBox = motion(Box)

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
      {!isDisabled && isAnimated && (
        <MotionBox
          position="absolute"
          inset={0}
          borderRadius="full"
          border="2px"
          borderColor="primary.hover"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <Icon
        as={icon}
        w={{ base: 4, md: 6 }}
        h={{ base: 4, md: 6 }}
        color="background.base"
      />
    </Grid>
    <Text
      fontWeight="bold"
      color="primary.base"
      textAlign="center"
      m={0}
      _groupHover={{ color: "primary.hover" }}
      _groupDisabled={{
        color: isHighlighted ? "primary.base" : "body.medium",
      }}
    >
      {children}
    </Text>
  </Button>
)
