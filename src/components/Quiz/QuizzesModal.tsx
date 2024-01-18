import {
  Center,
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react"

import { QuizStatus } from "@/lib/types"

import Modal from "../Modal"

type props = {
  isQuizModalOpen: boolean
  onQuizModalClose: () => void
  children: React.ReactNode
  quizStatus: QuizStatus
}

const QuizzesModal: React.FC<props> = ({
  isQuizModalOpen,
  onQuizModalClose,
  children,
  quizStatus,
  ...rest
}) => {
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
