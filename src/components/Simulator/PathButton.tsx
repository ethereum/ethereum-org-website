import React from "react"
import { Button, Flex, Text } from "@chakra-ui/react"

import type { SimulatorPathSummary } from "./interfaces"

type PathButtonProps = {
  pathSummary: SimulatorPathSummary
  handleClick: () => void
}
export const PathButton = ({ pathSummary, handleClick }: PathButtonProps) => {
  const { primaryText, secondaryText, Icon } = pathSummary
  return (
    <Button
      variant="outline"
      leftIcon={<Icon />}
      justifyContent="start"
      gap={3}
      textAlign="start"
      w="full"
      py={6}
      onClick={handleClick}
    >
      <Flex direction="column" as="span">
        <Text
          as="span"
          fontWeight="bold"
          m={0}
          lineHeight={6}
          letterSpacing="-1.1%"
        >
          {primaryText}
        </Text>
        {secondaryText && (
          <Text
            as="span"
            m={0}
            color="body.medium"
            fontSize="xs"
            lineHeight={5}
          >
            {secondaryText}
          </Text>
        )}
      </Flex>
    </Button>
  )
}
