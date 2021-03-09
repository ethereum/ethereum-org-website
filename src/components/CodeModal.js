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
  width: 100%;
  height: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.text};
`

const StyledModal = styled.div`
  position: relative;
  height: auto;
  cursor: auto;
  max-height: 100%;
  max-width: 600px;
  background: ${(props) => props.theme.colors.codeBackground};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px;
  width: 100%;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ModalClose = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  margin-top: -1px;
  border-top: 1px solid ${(props) => props.theme.colors.text};
  border-bottom: 1px solid ${(props) => props.theme.colors.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.ednBackground};
`

const Title = styled.div`
  margin-left: 1.5rem;
  text-transform: uppercase;
  font-family: "SFMono-Regular", monospace;
`

const ModalCloseIcon = styled(Icon)`
  cursor: pointer;
  margin: 1rem;
`

const Overlay = ({ isActive }) => (
  <StyledOverlay
    initial={false}
    animate={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1001 : -1 }}
    transition={{ duration: 0.2 }}
  />
)

const CodeModal = ({ children, className, isOpen, setIsOpen, title }) => {
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
              <Title>{title}</Title>
              <ModalCloseIcon name="close" />
            </ModalClose>
          </StyledModal>
        </ModalContainer>
      )}
    </div>
  )
}

export default CodeModal
