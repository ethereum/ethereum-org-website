import React from "react"
import { Box, type BoxProps, Flex, Text } from "@chakra-ui/react"
import { MdChevronLeft } from "react-icons/md"
import Button from "../Button"
import type {
  LabelHref,
  SimulatorExplanation,
  SimulatorPathSummary,
  SimulatorStateProps,
} from "./interfaces"
import type { PathId } from "./types"
import { MoreInfoPopover, PathButton } from "."
import ButtonLink from "../ButtonLink"

interface ExplanationProps extends SimulatorStateProps {
  explanation: SimulatorExplanation
  nextPathSummary: SimulatorPathSummary | null
  nextPathId: PathId | null
  finalCtaLink?: LabelHref | null
  onClose?: () => void
  openPath?: (pathId: PathId) => void
}
export const Explanation: React.FC<ExplanationProps> = ({
  state,
  explanation,
  nextPathSummary,
  nextPathId,
  finalCtaLink,
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
    <Flex direction="column" alignItems="start" flex={1} zIndex={1}>
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
        fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
        lineHeight={{ base: 8, md: 10 }}
        fontWeight="bold"
        mb={8}
      >
        {header}
      </Text>
      <Description
        display={{ base: isLastStep ? "block" : "none", md: "block" }}
      />
      <Box
        display={{ base: isLastStep ? "none" : "flex", md: "none" }}
        position="relative"
      >
        <MoreInfoPopover>
          <Description />
        </MoreInfoPopover>
      </Box>
      {/* Last step navigation buttons */}
      {isLastStep && (
        <Flex direction="column" gap={4} maxW="300px" w="full">
          {nextPathSummary && openPath && nextPathId && (
            <PathButton
              pathSummary={nextPathSummary}
              handleClick={() => openPath(nextPathId)}
            />
          )}
          {finalCtaLink && (
            <ButtonLink variant="outline" href={finalCtaLink.href}>
              {finalCtaLink.label}
            </ButtonLink>
          )}
        </Flex>
      )}
    </Flex>
  )
}
