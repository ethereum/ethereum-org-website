import React from "react"
import { type ModalContentProps, type ModalProps } from "@chakra-ui/react"

import Modal from "../Modal"

import { type UseDisclosureReturn } from "@/hooks/useDisclosure"

type SimulatorModalProps = ModalContentProps &
  Pick<ModalProps, "size"> & {
    isOpen: UseDisclosureReturn["isOpen"]
    onClose: UseDisclosureReturn["onClose"]
    children?: React.ReactNode
  }

export const SimulatorModal = ({
  isOpen,
  onClose,
  children,
  ...restProps
}: SimulatorModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="full"
      scrollBehavior="outside"
      contentProps={restProps}
    >
      {children}
    </Modal>
  )
}
