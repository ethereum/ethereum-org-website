import type { ReactNode } from "react"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react"

type CodeModalProps = {
  title: string
  children: ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CodeModal = ({ children, isOpen, setIsOpen, title }: CodeModalProps) => {
  const bgColor = useColorModeValue("rgb(247, 247, 247)", "rgb(25, 25, 25)")
  const borderColor = useColorModeValue("rgb(51, 51, 51)", "rgb(242, 242, 242)")

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onClose={() => setIsOpen(false)}
    >
      <ModalOverlay />
      <ModalContent
        maxW="100vw"
        marginTop="auto"
        marginBottom="0"
        maxHeight="50%"
        borderRadius="0"
        p="0"
        gap="0"
      >
        <ModalHeader
          bg={bgColor}
          borderColor={borderColor}
          borderTop="1px solid"
          borderBottom="1px solid"
          textTransform="uppercase"
          fontWeight="normal"
          fontSize="md"
          fontFamily="monospace"
          px="6"
          py="4"
          me="0"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton
          position="absolute"
          padding="0"
          width="24px"
          height="24px"
          borderRadius="0"
          color="rgb(178, 178, 178)"
          fontSize="sm"
          margin="0"
          top="4"
          insetInlineEnd="4"
          bottom="4"
        />
        <ModalBody p="0">{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CodeModal
