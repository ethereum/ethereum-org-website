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

type QuizzesModalProps = Omit<ModalProps, "isCentered" | "scrollBehavior"> & {
  children: React.ReactNode
  quizStatus: QuizStatus
}

const QuizzesModal = ({
  children,
  quizStatus,
  ...props
}: QuizzesModalProps) => {
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
    <ChakraModal
      isCentered
      size={{ base: "full", md: "xl" }}
      scrollBehavior="inside"
      {...props}
    >
      <ModalOverlay bg="blackAlpha.700" />

      <Center as={ModalContent} m={0} bg={getStatusColor()} py="16">
        <ModalCloseButton size="lg" p="6" />
        {children}
      </Center>
    </ChakraModal>
  )
}

export default QuizzesModal
