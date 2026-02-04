import React from "react"

import Modal, { type ModalProps } from "@/components/ui/dialog-modal"

type SimulatorModalProps = Omit<ModalProps, "size">

export const SimulatorModal = (props: SimulatorModalProps) => {
  return <Modal size="xl" {...props} variant="simulator" />
}
