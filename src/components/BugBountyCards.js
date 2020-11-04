import React from "react"
import styled from "styled-components"
import ButtonLink from "./ButtonLink"

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
const BugBountyCards = () => {
  return (
    <CardRow>
      <Card>
        <LowLabel>Up to 1,000 points</LowLabel>
        <H2>Low</H2>
        <Description>Up to 2,000 DAI</Description>
        <Divider />
        <SubHeader>Severity</SubHeader>
        <Text>
          <ul>
            <li>Low impact, medium likelihood</li>
            <li>Medium impact, low likelihood</li>
          </ul>
        </Text>
        <Divider />
        <SubHeader>Example</SubHeader>
        <Text>
          This is an example of a low risk bug for Eth2 – this should help users
          submit bugs in the right category.
        </Text>
        <StyledButton to="http://goo.gl/forms/CjPwb1Di0CGQRs2d2">
          Submit low risk bug
        </StyledButton>
      </Card>
      <Card>
        <MediumLabel>Up to 5,000 points</MediumLabel>
        <H2>Medium</H2>
        <Description>Up to 10,000 DAI</Description>
        <Divider />
        <SubHeader>Severity</SubHeader>
        <Text>
          <ul>
            <li>High impact, low likelihood</li>
            <li>Medium impact, medium likelihood</li>
            <li>Low impact, high likelihood</li>
          </ul>
        </Text>
        <Divider />
        <SubHeader>Example</SubHeader>
        <Text>
          This is an example of a low risk bug for Eth2 – this should help users
          submit bugs in the right category.
        </Text>
        <StyledButton to="http://goo.gl/forms/CjPwb1Di0CGQRs2d2">
          Submit medium risk bug
        </StyledButton>
      </Card>
      <Card>
        <HighLabel>Up to 10,000 points</HighLabel>
        <H2>High</H2>
        <Description>Up to 25,000 DAI</Description>
        <Divider />
        <SubHeader>Severity</SubHeader>
        <Text>
          <ul>
            <li>High impact, medium likelihood</li>
            <li>Medium impact, high likelihood</li>
          </ul>
        </Text>
        <Divider />
        <SubHeader>Example</SubHeader>
        <Text>
          This is an example of a low risk bug for Eth2 – this should help users
          submit bugs in the right category.
        </Text>
        <StyledButton to="http://goo.gl/forms/CjPwb1Di0CGQRs2d2">
          Submit high risk bug
        </StyledButton>
      </Card>
      <Card>
        <CriticalLabel>Up to 25,000 points</CriticalLabel>
        <H2>Critical</H2>
        <Description>Up to 50,000 DAI</Description>
        <Divider />
        <SubHeader>Severity</SubHeader>
        <Text>
          <ul>
            <li>High impact, high likelihood</li>
          </ul>
        </Text>
        <Divider />
        <SubHeader>Example</SubHeader>
        <Text>
          This is an example of a low risk bug for Eth2 – this should help users
          submit bugs in the right category.
        </Text>
        <StyledButton to="http://goo.gl/forms/CjPwb1Di0CGQRs2d2">
          Submit critical risk bug
        </StyledButton>
      </Card>
    </CardRow>
  )
}

export default BugBountyCards
