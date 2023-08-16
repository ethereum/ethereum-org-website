import React from "react"
import { Box, type BoxProps, Flex, Icon, Text } from "@chakra-ui/react"
import { MdChevronLeft, MdInfoOutline } from "react-icons/md"
import Button from "../Button"
import Tooltip from "../Tooltip"
import { SimulatorStateProps } from "../../interfaces"

export const Explanation: React.FC<SimulatorStateProps> = ({ state }) => {
  const { regressStepper, step, totalSteps } = state
  // TODO: Import simulator step data, fetch header/description for current step
  const header = "Header text" as const
  const description = <Text>Description text here</Text>

  const Description: React.FC<BoxProps> = (props) => (
    <Box {...props}>{description}</Box>
  )
  return (
    <Flex direction="column" flex={1} alignItems="start">
      <Button
        variant="ghost"
        leftIcon={<MdChevronLeft size="18px" />}
        sx={{ paddingInlineStart: 0 }}
        mb={8}
        onClick={regressStepper}
      >
        Back
      </Button>
      {/* Step counter */}
      <Text
        borderRadius="base"
        bg="background.highlight"
        p={2}
        lineHeight={1}
        fontSize="xs"
        fontWeight="bold"
        mb={2}
      >
        {step + 1}/{totalSteps}
      </Text>
      <Text
        fontSize={{ base: "2xl", md: "3xl" }}
        lineHeight={{ base: 8, md: 10 }}
        fontWeight="bold"
        mb={8}
      >
        {header}
      </Text>
      <Description display={{ base: "none", md: "block" }} />
      <Flex display={{ md: "none" }} alignItems="center">
        <Tooltip content={<Description />}>
          <Text as="span">More info</Text>
          <Icon as={MdInfoOutline} size={24} />
        </Tooltip>
      </Flex>
    </Flex>
  )
}
