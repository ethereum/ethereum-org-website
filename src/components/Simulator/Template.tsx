import React, { useState } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { Phone } from "./"
import Button from "../Button"
import { MdChevronLeft } from "react-icons/md"
import type { Controller, ControllerProps } from "../../interfaces"

const Explanation: React.FC<ControllerProps> = ({ controller }) => (
  <Flex direction="column" flex={1} alignItems="start">
    <Button
      variant="ghost"
      leftIcon={<MdChevronLeft size="18px" />}
      sx={{ paddingInlineStart: 0 }}
      mb={8}
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
      1/9
    </Text>
    <Text
      fontSize={{ base: "2xl", md: "3xl" }}
      lineHeight={{ base: 8, md: 10 }}
      fontWeight="bold"
      mb={8}
    >
      Hello header world long header text
    </Text>
    <Box>
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
  </Flex>
)

export const Template: React.FC = () => {
  const [step, setStep] = useState<number>(0)
  const progressStepper = () => {
    setStep((step) => step + 1)
  }
  const regressStepper = () => {
    setStep((step) => Math.max(step - 1, 0))
  }
  const resetStepper = () => {
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
      px={16}
      w="full"
      justify="center"
      direction={{ base: "column", md: "row" }}
      pt={8}
      gap={8}
    >
      <Explanation controller={controller} />
      <Phone controller={controller}>Hello inside phone world</Phone>
    </Flex>
  )
}
