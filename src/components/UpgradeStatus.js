import React from "react"
import styled from "styled-components"
import Translation from "../components/Translation"

const Container = styled.div`
  background: ${(props) =>
    props.isShipped
      ? props.theme.colors.upgradeStatusShippedBackground
      : props.theme.colors.upgradeStatusBackground};
  border: ${(props) =>
    props.isShipped
      ? props.theme.colors.upgradeStatusShippedBorder
      : props.theme.colors.upgradeStatusBorder};
  padding: 1.5rem;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 2rem;
  box-shadow: 0px 4px 7px #0000000d, 0px 10px 17px #00000008,
    0px 14px 66px #00000012;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 2rem;
  }
`

const Label = styled.h2`
  text-transform: uppercase;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  font-weight: 400;
  margin-top: 0;
`

const Date = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 100%;
`

const Content = styled.p`
  font-size: 1.25rem;
  margin-bottom: 0rem;
`

const UpgradeStatus = ({ dateKey, children, isShipped = false }) => (
  <Container isShipped={isShipped}>
    <Label>
      <Translation id="consensus-when-shipping" />
    </Label>
    <Date>
      <Translation id={dateKey} />
    </Date>
    <Content>{children}</Content>
  </Container>
)

export default UpgradeStatus
