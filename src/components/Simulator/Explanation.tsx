import React from "react"
import { Box, type BoxProps, Flex, Icon, Text } from "@chakra-ui/react"
import { MdChevronLeft, MdInfoOutline } from "react-icons/md"
import Button from "../Button"
import Tooltip from "../Tooltip"
import type {
  SimulatorExplanation,
  SimulatorPathSummary,
  SimulatorStateProps,
} from "../../interfaces"
import type { PathId } from "./types"
import { PathButton } from "."

interface ExplanationProps extends SimulatorStateProps {
  explanation: SimulatorExplanation
  nextPathSummary: SimulatorPathSummary | null
  nextPathId: PathId | null
  onClose?: () => void
  openPath?: (pathId: PathId) => void
}
export const Explanation: React.FC<ExplanationProps> = ({
  state,
  explanation,
  nextPathSummary,
  nextPathId,
  onClose,
  openPath,
}) => {
  const { regressStepper, step, totalSteps } = state
  const { header, description } = explanation

  const Description: React.FC<BoxProps> = (props) => (
    <Box {...props}>{description}</Box>
  )
  const isLastStep = state.step + 1 === totalSteps
  return (
    <Flex direction="column" alignItems="start">
      {/* Back button */}
      <Button
        variant="ghost"
        leftIcon={<MdChevronLeft size="18px" />}
        sx={{ paddingInlineStart: 0 }}
        mb={8}
        onClick={step === 0 && onClose ? onClose : regressStepper}
        visibility={step === 0 && !onClose ? "hidden" : "unset"}
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
      {/* Header and description */}
      <Text
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        lineHeight={{ base: 8, md: 10 }}
        fontWeight="bold"
        mb={8}
      >
        {header}
      </Text>
      <Description
        display={{ base: isLastStep ? "block" : "none", md: "block" }}
      />
      <Flex
        display={{ base: isLastStep ? "none" : "flex", md: "none" }}
        alignItems="center"
      >
        <Tooltip content={<Description />}>
          <Text as="span">More info</Text>
          <Icon as={MdInfoOutline} size={24} />
        </Tooltip>
      </Flex>
      {/* Last step navigation buttons */}
      {isLastStep && nextPathSummary && openPath && nextPathId && (
        <PathButton
          pathSummary={nextPathSummary}
          handleClick={() => openPath(nextPathId)}
        />
      )}
    </Flex>
  )
}
