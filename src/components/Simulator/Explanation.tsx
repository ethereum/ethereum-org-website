import React from "react"
import { Box, type BoxProps, Flex, Text, Grid } from "@chakra-ui/react"
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
  finalCtaLink: LabelHref
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
    <Flex direction="column" flex={1} zIndex={1}>
      {/* Back button */}
      <Button
        variant="ghost"
        leftIcon={<MdChevronLeft size="18px" />}
        sx={{ paddingInlineStart: 0 }}
        mt={{ base: -6, md: 0 }}
        mb={{ base: 6, md: 8 }}
        onClick={step === 0 && onClose ? onClose : regressStepper}
        visibility={step === 0 && !onClose ? "hidden" : "unset"}
        w="fit-content"
      >
        Back
      </Button>
      <Flex direction={{ base: "row", md: "column" }} gap={{ base: 3, md: 2 }}>
        {/* Step counter */}
        <Grid
          placeItems="center"
          bg="background.highlight"
          borderRadius="lg"
          p={2}
          w="fit-content"
          h="fit-content"
          aspectRatio={1}
          fontSize="xs"
        >
          <Text as="span" lineHeight={1} fontWeight="bold" m={0}>
            {step + 1}/{totalSteps}
          </Text>
        </Grid>
        {/* Header and description */}
        <Box>
          <Text
            fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
            lineHeight={{ base: 8, md: 10 }}
            fontWeight="bold"
            mb={{ base: 4, md: 8 }}
          >
            {header}
          </Text>
          {description && (
            <Box display={{ base: "block", md: "none" }} position="relative">
              <MoreInfoPopover>
                <Description />
              </MoreInfoPopover>
            </Box>
          )}
        </Box>
      </Flex>
      {description && <Description display={{ base: "none", md: "block" }} />}
      {/* Last step navigation buttons */}
      {isLastStep && (
        <Flex
          direction="column"
          gap={4}
          maxW="300px"
          w="full"
          mx={{ base: "auto", md: 0 }}
          mt={{ base: 4, md: 16 }}
        >
          {nextPathSummary && openPath && nextPathId && (
            <PathButton
              pathSummary={nextPathSummary}
              handleClick={() => openPath(nextPathId)}
            />
          )}
          {finalCtaLink && (
            <ButtonLink
              variant={finalCtaLink.isPrimary ? "solid" : "outline"}
              href={finalCtaLink.href}
            >
              {finalCtaLink.label}
            </ButtonLink>
          )}
          {!nextPathId && (
            <Button onClick={onClose} variant="outline">
              Go back
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  )
}
