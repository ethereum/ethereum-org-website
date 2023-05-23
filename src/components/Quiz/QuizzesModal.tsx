import React, { useContext } from "react"
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react"

import { QuizzesHubContext } from "./context"

interface IProps {
  children?: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const QuizzesModal: React.FC<IProps> = ({ children, isOpen, setIsOpen }) => {
  const { status: quizStatus } = useContext(QuizzesHubContext)

  const statusColor =
    quizStatus === "neutral"
      ? "white"
      : quizStatus === "success"
      ? "successLight"
      : "errorLight"

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isCentered
      size={{ base: "full", md: "xl" }}
      scrollBehavior="inside"
    >
      <ModalOverlay
        bg="blackAlpha.700"
        display={{ base: "none", md: "block" }}
      />

      <ModalContent justifyContent="center" bg={statusColor}>
        <ModalCloseButton size="lg" zIndex={1} />
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

export default QuizzesModal
