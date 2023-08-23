import React from "react"
import { Flex } from "@chakra-ui/react"
import { Explanation, Phone } from "./"
import type {
  PhoneScreenProps,
  SimulatorExplanation,
  SimulatorStateProps,
} from "../../interfaces"

interface IProps extends SimulatorStateProps {
  explanation: SimulatorExplanation
  Screen: React.FC<PhoneScreenProps>
  onClose: () => void
}
export const Template: React.FC<IProps> = ({
  state,
  explanation,
  Screen,
  onClose,
}) => (
  <Flex
    pt={{ base: 0, md: 8 }}
    px={{ base: 0, md: 16 }}
    w="full"
    justify="center"
    direction={{ base: "column", md: "row" }}
    gap={8}
  >
    <Explanation state={state} explanation={explanation} onClose={onClose} />
    <Phone>
      <Screen state={state} />
    </Phone>
  </Flex>
)
