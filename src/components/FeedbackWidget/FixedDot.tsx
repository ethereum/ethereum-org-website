import * as React from "react"
import { Button, ButtonProps, ScaleFade, Text } from "@chakra-ui/react"
import { FeedbackGlyphIcon } from "../icons"
import Translation from "../Translation"

interface FixedDotProps extends ButtonProps {
  bottomOffset: number
  isExpanded: boolean
}
const FixedDot = ({ bottomOffset, isExpanded, ...props }: FixedDotProps) => {
  const size = "12"
  return (
    <Button
      h={size}
      w={{ base: size, lg: !isExpanded ? size : "max-content" }}
      borderRadius="full"
      position="sticky"
      bottom={{ base: `${bottomOffset + 1}rem`, lg: 4 }}
      color="white"
      ms="auto"
      me="4"
      mt={{ lg: "inherit" }}
      zIndex={98} /* Below the mobile menu */
      _hover={{
        transform: "scale(1.1)",
        transition: "transform 0.2s ease-in-out",
      }}
      transition="transform 0.2s ease-in-out, width 0.25s linear,
      border-radius 0.25s linear"
      leftIcon={<FeedbackGlyphIcon />}
      iconSpacing={{ base: 0, lg: "3" }}
      sx={{
        ".chakra-button__icon": {
          me: !isExpanded ? 0 : undefined,
        },
      }}
      {...props}
    >
      <ScaleFade in={isExpanded} delay={0.25}>
        <Text
          as="span"
          fontWeight="bold"
          noOfLines={2}
          height="100%"
          alignItems="center"
          display={{ base: "none", lg: isExpanded ? "flex" : "none" }}
        >
          <Translation id="feedback-widget-prompt" />
        </Text>
      </ScaleFade>
    </Button>
  )
}

export default FixedDot
