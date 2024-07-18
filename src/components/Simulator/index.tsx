import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { Flex, type FlexProps, Grid } from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { PATH_ID_QUERY_PARAM, SIMULATOR_ID } from "./constants"
import { Explanation } from "./Explanation"
import type {
  SimulatorDetails,
  SimulatorNav,
  SimulatorPathSummary,
} from "./interfaces"
import { PathButton } from "./PathButton"
import { Phone } from "./Phone"
import { SimulatorModal } from "./SimulatorModal"
import { Template } from "./Template"
import type { PathId, SimulatorData } from "./types"
import { getValidPathId } from "./utils"

type SimulatorProps = Pick<FlexProps, "children"> & {
  data: SimulatorData
}
export const Simulator = ({ children, data }: SimulatorProps) => {
  const router = useRouter()

  // Track step
  const [step, setStep] = useState(0) // 0-indexed to use as array index

  // Track pathID
  const pathId = getValidPathId(router.query.sim as string)
  const simulator: SimulatorDetails | null = pathId ? data[pathId] : null
  const totalSteps: number = simulator ? simulator.explanations.length : 0

  // If pathId present, modal is open, else closed
  const isOpen = !!pathId

  const clearUrlParams = () => {
    const pathWithoutParams = router.asPath.replace(/\?[^#]*/, "")
    router.replace(pathWithoutParams)
  }

  // When simulator closed: log event, clear URL params and close modal
  const onClose = (): void => {
    trackCustomEvent({
      eventCategory: "simulator",
      eventAction: `${pathId}_click`,
      eventName: `close-from-step-${step + 1}`,
    })
    // Clearing URL Params will reset pathId, and close modal
    clearUrlParams()
  }

  // Remove URL search param if invalid pathId
  useEffect(() => {
    setStep(0)
    if (!pathId) clearUrlParams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathId])

  // Navigation helpers
  const progressStepper = (): void => {
    trackCustomEvent({
      eventCategory: "simulator",
      eventAction: `${pathId}_click`,
      eventName: `progress-from-step-${step + 1}`,
    })
    setStep((step) => Math.min(step + 1, totalSteps - 1))
  }

  const regressStepper = (): void => {
    trackCustomEvent({
      eventCategory: "simulator",
      eventAction: `${pathId}_click`,
      eventName: `back-from-step-${step + 1}`,
    })
    if (step === 0) {
      clearUrlParams()
      return
    }
    setStep((step) => Math.max(step - 1, 0))
  }

  const openPath = (id: PathId): void => {
    // Set new pathId in navigation
    const params = new URLSearchParams()
    params.set(PATH_ID_QUERY_PARAM, id)
    const url = `?${params.toString()}#${SIMULATOR_ID}`
    router.replace(url)
  }

  // Navigation object passed to child components
  const nav: SimulatorNav | null = pathId
    ? {
        step,
        totalSteps,
        progressStepper,
        regressStepper,
        openPath,
      }
    : null

  const { Screen, explanations, ctaLabels, nextPathId, finalCtaLink } =
    simulator ?? {}
  const explanation = explanations ? explanations[step] : null
  const ctaLabel = ctaLabels ? ctaLabels[step] : null

  const nextPathSummary = useMemo<SimulatorPathSummary | null>(() => {
    if (!simulator) return null
    const { nextPathId } = simulator
    if (!nextPathId) return null
    const { title, Icon } = data[nextPathId]
    return {
      primaryText: "Start next lesson",
      secondaryText: title,
      Icon,
    }
  }, [data, simulator])

  const logFinalCta = (): void => {
    trackCustomEvent({
      eventCategory: "simulator",
      eventAction: `${pathId}_click`,
      eventName: `find-wallet`,
    })
  }

  return (
    <Grid
      id={SIMULATOR_ID}
      bg="cardGradient"
      placeItems="center"
      p={{ base: 4, md: 16 }}
      w="full"
      scrollMarginTop={{ base: "5rem" }}
      scrollBehavior="smooth"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        bg="background.base"
        px={{ base: 4, md: 16 }}
        py={{ base: 8, md: 16 }}
        alignItems="center"
        textAlign={{ base: "center", md: "start" }}
        gap={{ base: 16, md: 8, lg: 16 }}
        maxW="1000px"
        w="full"
      >
        {/* TEXT CONTENT */}
        <Flex direction="column" px={4}>
          {children}
        </Flex>
        {/* Button stack for path options */}
        <Flex
          direction="column"
          gap={8}
          w={{ base: "min(100%, 320px)", md: "300px" }}
          minW={{ md: "300px" }}
        >
          {Object.keys(data).map((id) => {
            const sim = data[id]
            const pathSummary = {
              primaryText: sim.title,
              secondaryText: "How to?",
              Icon: sim.Icon,
            }
            return (
              <PathButton
                key={id}
                pathSummary={pathSummary}
                handleClick={() => {
                  trackCustomEvent({
                    eventCategory: "simulator",
                    eventAction: `main-buttons_click`,
                    eventName: id,
                  })
                  openPath(id as PathId)
                }}
              />
            )
          })}
        </Flex>
      </Flex>
      <SimulatorModal isOpen={isOpen} onClose={onClose}>
        <Template>
          {explanation ? (
            <Explanation
              nav={nav!}
              explanation={explanation}
              nextPathSummary={nextPathSummary}
              nextPathId={nextPathId ?? null}
              finalCtaLink={finalCtaLink!}
              openPath={(id: PathId) => {
                trackCustomEvent({
                  eventCategory: "simulator",
                  eventAction: `${pathId}_click`,
                  eventName: `next-lesson-${id}`,
                })
                openPath(id)
              }}
              logFinalCta={logFinalCta}
            />
          ) : (
            <Flex flex={1} minH={32} />
          )}
          {Screen && (
            <Phone>
              <Screen nav={nav!} ctaLabel={ctaLabel ?? ""} />
            </Phone>
          )}
        </Template>
      </SimulatorModal>
    </Grid>
  )
}
