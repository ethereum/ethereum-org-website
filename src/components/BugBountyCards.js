import React from "react"
import styled from "styled-components"
import ButtonLink from "./ButtonLink"

import Translation from "../components/Translation"

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 1rem;
  flex-wrap: wrap;
`

const StyledButton = styled(ButtonLink)`
  margin: 1rem;
`

const Card = styled.div`
  flex: 1 1 260px;
  @media (max-width: 1228px) {
    flex: 1 1 360px;
  }
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.Background};
  border-radius: 2px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  border: 1px solid ${(props) => props.theme.colors.border};
  margin: 1rem;
  justify-content: space-between;
  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Label = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  text-transform: uppercase;
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 0.25rem 0rem;
`

const LowLabel = styled(Label)`
  background: ${(props) => props.theme.colors.lowBug};
  color: ${(props) => props.theme.colors.black300};
`

const MediumLabel = styled(Label)`
  background: ${(props) => props.theme.colors.mediumBug};
  color: ${(props) => props.theme.colors.black300};
`

const HighLabel = styled(Label)`
  background: ${(props) => props.theme.colors.fail400};
  color: ${(props) => props.theme.colors.white};
`

const CriticalLabel = styled(Label)`
  background: ${(props) => props.theme.colors.fail600};
  color: ${(props) => props.theme.colors.white};
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  padding: 1rem;
  text-align: left;
  margin-bottom: -0.5rem;
  margin-top: 0.5rem;
`

const Description = styled.p`
  font-size: 20px;
  padding: 1rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
  opacity: 0.6;
`

const Divider = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const SubHeader = styled.p`
  text-transform: uppercase;
  font-size: 14px;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  opacity: 0.6;
`

const Text = styled.div`
  margin: 1rem;
  margin-top: 0.5rem;
`

// TODO move data into array & loop through
const BugBountyCards = () => (
  <CardRow>
    <Card>
      <LowLabel>
        <Translation id="page-eth2-bug-bountycard-label-1" />
      </LowLabel>
      <H2>
        <Translation id="page-eth2-bug-bountycard-low" />
      </H2>
      <Description>
        <Translation id="page-eth2-bug-bountycard-label-2" />
      </Description>
      <Divider />
      <SubHeader>
        <Translation id="page-eth2-bug-bountycard-subheader" />
      </SubHeader>
      <Text>
        <ul>
          <li>
            <Translation id="page-eth2-bug-bountycard-li-1" />
          </li>
          <li>
            <Translation id="page-eth2-bug-bountycard-li-2" />
          </li>
        </ul>
      </Text>
      <Divider />
      <SubHeader>
        <Translation id="page-eth2-bug-bountycard-subheader-2" />
      </SubHeader>
      <Text>
        <Translation id="page-eth2-bug-bountycard-text" />
      </Text>
      <StyledButton to="https://forms.gle/Gnh4gzGh66Yc3V7G8">
        <Translation id="page-eth2-bug-bountycard-low-risk" />
      </StyledButton>
    </Card>
    <Card>
      <MediumLabel>
        <Translation id="page-eth2-bug-bountycard-label-3" />
      </MediumLabel>
      <H2>
        <Translation id="page-eth2-bug-bountycard-h2" />
      </H2>
      <Description>
        <Translation id="page-eth2-bug-bountycard-label-4" />
      </Description>
      <Divider />
      <SubHeader>
        <Translation id="page-eth2-bug-bountycard-subheader" />
      </SubHeader>
      <Text>
        <ul>
          <li>
            <Translation id="page-eth2-bug-bountycard-li-3" />
          </li>
          <li>
            <Translation id="page-eth2-bug-bountycard-li-4" />
          </li>
          <li>
            <Translation id="page-eth2-bug-bountycard-li-5" />
          </li>
        </ul>
      </Text>
      <Divider />
      <SubHeader>
        <Translation id="page-eth2-bug-bountycard-subheader-2" />
      </SubHeader>
      <Text>
        <Translation id="page-eth2-bug-bountycard-text-1" />
      </Text>
      <StyledButton to="https://forms.gle/Gnh4gzGh66Yc3V7G8">
        <Translation id="page-eth2-bug-bountycard-medium-risk" />
      </StyledButton>
    </Card>
    <Card>
      <HighLabel>
        <Translation id="page-eth2-bug-bountycard-label-5" />
      </HighLabel>
      <H2>
        <Translation id="page-eth2-bug-bountycard-high" />
      </H2>
      <Description>
        <Translation id="page-eth2-bug-bountycard-label-6" />
      </Description>
      <Divider />
      <SubHeader>
        <Translation id="page-eth2-bug-bountycard-subheader" />
      </SubHeader>
      <Text>
        <ul>
          <li>
            <Translation id="page-eth2-bug-bountycard-li-6" />
          </li>
          <li>
            <Translation id="page-eth2-bug-bountycard-li-7" />
          </li>
        </ul>
      </Text>
      <Divider />
      <SubHeader>
        <Translation id="page-eth2-bug-bountycard-subheader-2" />
      </SubHeader>
      <Text>
        <Translation id="page-eth2-bug-bountycard-text-2" />
      </Text>
      <StyledButton to="https://forms.gle/Gnh4gzGh66Yc3V7G8">
        <Translation id="page-eth2-bug-bountycard-high-risk" />
      </StyledButton>
    </Card>
    <Card>
      <CriticalLabel>
        <Translation id="page-eth2-bug-bountycard-label-7" />
      </CriticalLabel>
      <H2>
        <Translation id="page-eth2-bug-bountycard-critical" />
      </H2>
      <Description>
        <Translation id="page-eth2-bug-bountycard-label-8" />
      </Description>
      <Divider />
      <SubHeader>
        <Translation id="page-eth2-bug-bountycard-subheader" />
      </SubHeader>
      <Text>
        <ul>
          <li>
            <Translation id="page-eth2-bug-bountycard-li-8" />
          </li>
        </ul>
      </Text>
      <Divider />
      <SubHeader>
        <Translation id="page-eth2-bug-bountycard-subheader-2" />
      </SubHeader>
      <Text>
        <Translation id="page-eth2-bug-bountycard-text-3" />
      </Text>
      <StyledButton to="https://forms.gle/Gnh4gzGh66Yc3V7G8">
        <Translation id="page-eth2-bug-bountycard-critical-risk" />
      </StyledButton>
    </Card>
  </CardRow>
)

export default BugBountyCards
