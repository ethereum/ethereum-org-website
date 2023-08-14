import React, { useState } from "react"
import { Box, type BoxProps, Flex, Icon, Text } from "@chakra-ui/react"
import { Phone } from "./"
import Button from "../Button"
import { MdChevronLeft, MdInfoOutline } from "react-icons/md"
import type { Controller, ControllerProps } from "../../interfaces"
import Tooltip from "../Tooltip"

const Explanation: React.FC<ControllerProps> = ({ controller }) => {
  const { progressStepper, regressStepper, resetStepper, step } = controller
  // TODO: Replace with simulator data
  const totalSteps = 9
  const Description: React.FC<BoxProps> = (props) => (
    <Box {...props}>
      <Text>
        Hello text world Lorem ipsum dolor sit amet, consectetur adipisicing
        elit.
      </Text>
      <Text>
        Quas laudantium officia esse alias vitae sequi accusantium, magnam
        dolorem! Consequuntur deleniti voluptatem illum repellat labore
        obcaecati eaque voluptatibus officia odit quibusdam.
      </Text>
    </Box>
  )
  const header = "Hello header world long header text"
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
        <Text as="span">More info</Text>
        <Tooltip content={<Description />}>
          <Icon as={MdInfoOutline} />
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export const Template: React.FC = () => {
  const [step, setStep] = useState<number>(0)
  const progressStepper = (): void => {
    setStep((step) => step + 1)
  }
  const regressStepper = (): void => {
    setStep((step) => Math.max(step - 1, 0))
  }
  const resetStepper = (): void => {
    setStep(0)
  }
  const controller: Controller = {
    progressStepper,
    regressStepper,
    resetStepper,
    step,
  }

  return (
    <Flex
      pt={{ base: 0, md: 8 }}
      px={{ base: 0, md: 16 }}
      w="full"
      justify="center"
      direction={{ base: "column", md: "row" }}
      gap={8}
    >
      <Explanation controller={controller} />
      <Phone controller={controller}>Hello inside phone world</Phone>
    </Flex>
  )
}
