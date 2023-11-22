import React, { useContext } from "react"
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalProps,
  ModalContentProps,
  Center,
} from "@chakra-ui/react"
import Modal from "../Modal"

import { QuizzesHubContext } from "./context"

type props = {
  isQuizModalOpen: boolean
  onQuizModalClose: () => void
  children: React.ReactNode
}

const QuizzesModal: React.FC<props> = ({
  isQuizModalOpen,
  onQuizModalClose,
  children,
  ...rest
}) => {
  const { status: quizStatus } = useContext(QuizzesHubContext)

  const getStatusColor = (): ModalContentProps["bg"] => {
    if (quizStatus === "neutral") {
      return "neutral"
    }
    if (quizStatus === "success") {
      return "success.neutral"
    }
    return "error.neutral"
  }

  return (
    <Modal
      isOpen={isQuizModalOpen}
      setIsOpen={onQuizModalClose}
      size={{ base: "full", md: "xl" }}
      {...rest}
    >
      <Center m={0} bg={getStatusColor()} py="16">
        {children}
      </Center>
    </Modal>
  )
}

export default QuizzesModal
