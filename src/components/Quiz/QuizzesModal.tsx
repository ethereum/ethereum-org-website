import React, { useContext } from "react"
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalProps,
} from "@chakra-ui/react"

import { QuizzesHubContext } from "./context"

interface IProps extends ModalProps {
  children: React.ReactNode
}

const QuizzesModal: React.FC<IProps> = ({ children, ...rest }) => {
  const { status: quizStatus } = useContext(QuizzesHubContext)

  const statusColor =
    quizStatus === "neutral"
      ? "white"
      : quizStatus === "success"
      ? "success.light"
      : "error.light"

  return (
    <ChakraModal
      isCentered
      size={{ base: "full", md: "xl" }}
      scrollBehavior="inside"
      {...rest}
    >
      <ModalOverlay
        bg="blackAlpha.700"
        display={{ base: "none", md: "block" }}
      />

      <ModalContent justifyContent="center" bg={statusColor}>
        <ModalCloseButton size="lg" p={6} zIndex={1} />
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

export default QuizzesModal
