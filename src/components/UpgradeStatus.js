import React from "react"
import styled from "styled-components"

const ShippedContainer = styled.div`
  background: linear-gradient(
      180deg,
      rgba(0, 240, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
    #109e62;
  padding: 1.5rem;
  border-radius: 4px;
  width: 100%;
  margin: 2rem 0rem;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.05), 0px 10px 17px rgba(0, 0, 0, 0.03),
    0px 14px 66px rgba(0, 0, 0, 0.07);
`

const Container = styled.div`
  background: linear-gradient(
      180deg,
      rgba(0, 240, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
    #1c1ce1;
  padding: 1.5rem;
  border-radius: 4px;
  width: 100%;
  margin: 2rem 0rem;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.05), 0px 10px 17px rgba(0, 0, 0, 0.03),
    0px 14px 66px rgba(0, 0, 0, 0.07);
`

const Label = styled.h2`
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 1.5rem;
  font-weight: 400;
`

const Date = styled.p`
  text-transform: uppercase;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 1.5rem;
`

const Content = styled.p`
  font-size: 14px;
  margin-bottom: 0rem;
`

const UpgradeStatus = ({ date, children, isShipped }) => {
  if (isShipped) {
    return (
      <ShippedContainer>
        <Label>When's it shipping?</Label>
        <Date>{date}</Date>
        <Content>{children}</Content>
      </ShippedContainer>
    )
  }
  return (
    <Container>
      <Label>When's it shipping?</Label>
      <Date>{date}</Date>
      <Content>{children}</Content>
    </Container>
  )
}

export default UpgradeStatus
