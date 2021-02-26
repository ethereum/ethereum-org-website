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
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.05), 0px 10px 17px rgba(0, 0, 0, 0.03),
    0px 14px 66px rgba(0, 0, 0, 0.07);
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 2rem;
  }
`

const Label = styled.h2`
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 1.5rem;
  font-weight: 400;
`

const Date = styled.p`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 100%;
`

const Content = styled.p`
  font-size: 20px;
  margin-bottom: 0rem;
`

const UpgradeStatus = ({ date, children, isShipped = false }) => (
  <Container isShipped={isShipped}>
    <Label>
      <Translation id="eth2-what-shipping" />
    </Label>
    <Date>{date}</Date>
    <Content>{children}</Content>
  </Container>
)

export default UpgradeStatus
