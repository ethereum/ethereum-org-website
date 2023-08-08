import React, { type ComponentType, type SVGProps } from "react"
import { Button, Flex, type FlexProps, Text } from "@chakra-ui/react"
import type { PathOption } from "../../interfaces"

const getIconFromName = (
  iconName: string
): ComponentType<SVGProps<SVGElement>> => {
  const { [iconName]: Icon } = require("./icons")
  return Icon
}

interface IProps extends FlexProps {
  pathOption: PathOption
}
export const PathButton: React.FC<IProps> = ({
  pathOption: { primaryText, secondaryText, iconName, onClick },
}) => {
  const Icon = getIconFromName(iconName)
  return (
    <Button
      variant="outline"
      leftIcon={<Icon />}
      justifyContent="start"
      gap={3}
      textAlign="start"
      w="full"
      py={6}
      onClick={onClick}
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
