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

import { QuizzesHubContext } from "./context"

interface IProps extends ModalProps {
  children: React.ReactNode
}

const QuizzesModal: React.FC<IProps> = ({ children, ...rest }) => {
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
    <ChakraModal
      isCentered
      size={{ base: "full", md: "xl" }}
      scrollBehavior="inside"
      {...rest}
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
