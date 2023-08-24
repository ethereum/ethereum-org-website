import React from "react"
import { Flex } from "@chakra-ui/react"
import { Explanation, Phone } from "./"
import type {
  SimulatorDetails,
  SimulatorPathSummary,
  SimulatorStateProps,
} from "../../interfaces"
import type { PathId } from "./types"

interface IProps extends SimulatorStateProps {
  simulator: SimulatorDetails
  nextPathSummary: SimulatorPathSummary | null
  onClose: () => void
  openPath?: (pathId: PathId) => void
}
export const Template: React.FC<IProps> = ({
  state,
  simulator,
  nextPathSummary,
  onClose,
  openPath,
}) => {
  const { step } = state
  const {
    Screen,
    stepDetails: { explanations },
    nextPathId,
  } = simulator
  const explanation = explanations[step]

  return (
    <Flex
      pt={{ base: 0, md: 8 }}
      px={{ base: 0, md: 16 }}
      w="full"
      justify="center"
      direction={{ base: "column", md: "row" }}
      gap={8}
    >
      <Explanation
        state={state}
        explanation={explanation}
        nextPathSummary={nextPathSummary}
        nextPathId={nextPathId ?? null}
        onClose={onClose}
        openPath={openPath}
      />
      <Phone>
        <Screen state={state} />
      </Phone>
    </Flex>
  )
}
