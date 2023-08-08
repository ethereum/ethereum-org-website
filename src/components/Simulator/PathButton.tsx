import React, { ComponentType, SVGProps } from "react"
import { Flex, type FlexProps, Text } from "@chakra-ui/react"
import Button from "../Button"

const getIconFromName = (
  iconName: string
): ComponentType<SVGProps<SVGElement>> => {
  const { [iconName]: Icon } = require("./icons")
  return Icon
}

interface IProps extends FlexProps {
  primaryText: string
  secondaryText?: string
  iconName: string
}
export const PathButton: React.FC<IProps> = ({
  primaryText,
  secondaryText,
  iconName,
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
