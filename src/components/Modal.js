import React, { useRef } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import Icon from "./Icon"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { useKeyPress } from "../hooks/useKeyPress"

const StyledOverlay = styled(motion.div)`
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  will-change: opacity;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`

const ModalContainer = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  position: fixed;
  z-index: 1002;
  cursor: pointer;
  padding: 15% 1rem 1rem;
  width: 100%;
  height: 100%;
`

const StyledModal = styled.div`
  position: relative;
  padding: 1rem;
  height: auto;
  cursor: auto;
  max-height: 100%;
  max-width: 600px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgb(189, 189, 189);
  margin: 0px auto;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 100%;
`

const ModalClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
`
const ModalCloseIcon = styled(Icon)`
  cursor: pointer;
`

const Overlay = ({ isActive }) => (
  <StyledOverlay
    initial={false}
    animate={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1001 : -1 }}
    transition={{ duration: 0.2 }}
  />
)

const Modal = ({ children, className, isOpen, setIsOpen }) => {
  const ref = useRef()

  // Close modal on outside clicks & `Escape` keypress
  useOnClickOutside(ref, () => setIsOpen(false))
  useKeyPress(`Escape`, () => setIsOpen(false))

  return (
    <div className={className}>
      <Overlay isActive={isOpen} />
      {isOpen && (
        <ModalContainer className="modal-component-container">
          <StyledModal className="modal-component" ref={ref}>
            <ModalContent className="modal-component-content">
              {children}
            </ModalContent>
            <ModalClose onClick={() => setIsOpen(false)}>
              <ModalCloseIcon name="close" />
            </ModalClose>
          </StyledModal>
        </ModalContainer>
      )}
    </div>
  )
}

export default Modal
