import React, { type ComponentType, type SVGProps } from "react"
import { Button, Flex, Text } from "@chakra-ui/react"
import type { PathOption } from "../../interfaces"

const getIconFromName = (
  iconName: string
): ComponentType<SVGProps<SVGElement>> => {
  const { [iconName]: Icon } = require("./icons")
  return Icon
}

interface IProps {
  pathOption: PathOption
}
export const PathButton: React.FC<IProps> = ({
  pathOption: { primaryText, secondaryText, iconName },
}) => {
  const Icon = getIconFromName(iconName)
  const handleClick = () => {
    // TODO: Open appropriate modal
    console.log("Clicked:", primaryText)
  }
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
      <Flex direction="column">
        <Text fontWeight="bold" m={0} lineHeight={6} letterSpacing="-1.1%">
          {primaryText}
        </Text>
        {secondaryText && (
          <Text m={0} color="body.medium" fontSize="xs" lineHeight={5}>
            {secondaryText}
          </Text>
        )}
      </Flex>
    </Button>
  )
}
