import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Icon from "./Icon"

const Card = styled.div`
  display: ${(props) => (props.shouldShow ? `block` : `none`)};
  position: relative;
  background: ${(props) => props.theme.colors.warning};
  padding: 1.5rem;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.black300};
`

const CloseIconContainer = styled.span`
  position: absolute;
  cursor: pointer;
  top: 1.5rem;
  right: 1.5rem;

  & > svg {
    fill: ${(props) => props.theme.colors.black300};
  }
`

const DismissibleCard = ({ children, storageKey }) => {
  const [shouldShow, setshouldShow] = useState(false)

  useEffect(() => {
    if (localStorage && localStorage.getItem(storageKey) !== null) {
      setshouldShow(false)
    } else {
      setshouldShow(true)
    }
  }, [])

  const handleClose = () => {
    if (localStorage) {
      localStorage.setItem(storageKey, true)
    }
    setshouldShow(false)
  }

  return (
    <Card shouldShow={shouldShow}>
      <CloseIconContainer onClick={handleClose}>
        <Icon name="close" />
      </CloseIconContainer>
      {children}
    </Card>
  )
}

export default DismissibleCard
