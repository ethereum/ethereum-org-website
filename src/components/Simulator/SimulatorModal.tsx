import React from "react"
import Modal from "../Modal"

interface IProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
export const SimulatorModal: React.FC<IProps> = ({ isOpen, setIsOpen }) => (
  <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    Hello world
  </Modal>
)
