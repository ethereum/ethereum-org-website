import React from "react"
import {
  type ModalContentProps,
  type ModalProps,
  UseDisclosureReturn,
} from "@chakra-ui/react"

import Modal from "../Modal"

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
  size,
  ...restProps
}: SimulatorModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="full"
      scrollBehavior="inside"
      contentProps={restProps}
    >
      {children}
    </Modal>
  )
}
