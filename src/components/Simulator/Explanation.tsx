import React from "react"
import { motion } from "framer-motion"
import { MdArrowBack } from "react-icons/md"
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react"

import type { SimulatorNavProps } from "@/lib/types"

import { Button, ButtonLink } from "../Buttons"

import type {
  LabelHref,
  SimulatorExplanation,
  SimulatorPathSummary,
} from "./interfaces"
import { MoreInfoPopover } from "./MoreInfoPopover"
import { PathButton } from "./PathButton"
import type { PathId } from "./types"

type ExplanationProps = SimulatorNavProps & {
  explanation: SimulatorExplanation
  nextPathSummary: SimulatorPathSummary | null
  nextPathId: PathId | null
  finalCtaLink: LabelHref
  openPath?: (pathId: PathId) => void
  logFinalCta?: () => void
}
export const Explanation = ({
  nav,
  explanation,
  nextPathSummary,
  nextPathId,
  finalCtaLink,
  openPath,
  logFinalCta,
}: ExplanationProps) => {
  const { regressStepper, step, totalSteps } = nav
  const { header, description } = explanation

  const isLastStep = nav.step + 1 === totalSteps

  const backButtonVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  return (
    <Flex direction="column" flex={1} zIndex={1}>
      {/* Back button */}
      <Button
        as={motion.button}
        variant="ghost"
        leftIcon={<MdArrowBack size="18px" />}
        sx={{ paddingInlineStart: 0 }}
        mt={{ base: -6, md: 0 }}
        mb={{ base: 2, md: 8 }}
        onClick={regressStepper}
        pointerEvents={step === 0 ? "none" : "all"}
        variants={backButtonVariants}
        initial="hidden"
        animate={step === 0 ? "hidden" : "visible"}
        transitionDuration="10ms"
        w="fit-content"
      >
        Back
      </Button>
      <Flex direction={{ base: "row", md: "column" }} gap={{ base: 3, md: 2 }}>
        {/* Step counter */}
        <Grid
          placeItems="center"
          bg="body.light"
          borderRadius="lg"
          p={2}
          w={9}
          h={8}
          fontSize="xs"
        >
          <Text as="span" lineHeight={1} fontWeight="bold" m={0}>
            {step + 1}/{totalSteps}
          </Text>
        </Grid>
        {/* Header and description */}
        <Box>
          <Heading
            as="h3"
            fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
            lineHeight={{ base: 8, md: 10 }}
            mt={0}
            mb={{ base: 4, md: 8 }}
          >
            {header}
          </Heading>
          {description && (
            <Box display={{ base: "block", md: "none" }} position="relative">
              <MoreInfoPopover isFirstStep={nav.step === 0}>
                <Box>{description}</Box>
              </MoreInfoPopover>
            </Box>
          )}
        </Box>
      </Flex>
      {description && (
        <Box display={{ base: "none", md: "block" }}>{description}</Box>
      )}
      {/* Last step navigation buttons */}
      {isLastStep && (
        <Flex
          direction="column"
          gap={4}
          maxW="300px"
          w="full"
          mx={{ base: "auto", md: 0 }}
          mt={4}
          zIndex={-1}
        >
          {nextPathSummary && openPath && nextPathId && (
            <PathButton
              pathSummary={nextPathSummary}
              handleClick={() => openPath(nextPathId)}
            />
          )}
          <ButtonLink
            variant={finalCtaLink.isPrimary ? "solid" : "outline"}
            href={finalCtaLink.href}
            onClick={logFinalCta}
          >
            {finalCtaLink.label}
          </ButtonLink>
        </Flex>
      )}
    </Flex>
  )
}
