import React from "react"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  margin-top: 0.5rem;
  align-self: stretch;
`

const BaseCard = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 2px;
`

const Card = styled(BaseCard)`
  z-index: 2;
  padding: 1.5rem;
  text-align: left;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.ghostCardBackground};
`

const Ghost = styled(BaseCard)`
  z-index: -1;
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.ghostCardGhost};
`

const GhostCard = ({ children, className }) => (
  <Container className={className}>
    <Ghost />
    <Card className="ghost-card-base">{children}</Card>
  </Container>
)

export default GhostCard
