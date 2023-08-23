import React from "react"
import { Button, Flex, Text } from "@chakra-ui/react"
import { simulatorData } from "./data"

interface IProps {
  pathId: string // TODO: Type this against available paths
  handleClick: (pathId: string) => void
}
export const PathButton: React.FC<IProps> = ({ pathId, handleClick }) => {
  const {
    pathSummary: { primaryText, secondaryText, iconName },
  } = simulatorData[pathId]
  const { [iconName]: Icon } = require("./icons")

  return (
    <Button
      variant="outline"
      leftIcon={<Icon />}
      justifyContent="start"
      gap={3}
      textAlign="start"
      w="full"
      py={6}
      onClick={() => handleClick(pathId)}
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
