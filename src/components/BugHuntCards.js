import React from "react"
import styled from "styled-components"
import ButtonLink from "./ButtonLink"

const StyledButton = styled(ButtonLink)`
  margin: 1rem;
  width: 100%;
`

const Card = styled.div`
  background: ${(props) => props.theme.colors.Background};
  border-radius: 2px;
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  border: 1px solid ${(props) => props.theme.colors.border};
  margin: 1rem;
  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const LowLabel = styled.div`
  background: ${(props) => props.theme.colors.lowBug};
  color: ${(props) => props.theme.colors.black300};
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

const MediumLabel = styled.div`
  background: ${(props) => props.theme.colors.mediumBug};
  color: ${(props) => props.theme.colors.black300};
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

const HighLabel = styled.div`
  background: ${(props) => props.theme.colors.fail400};
  color: ${(props) => props.theme.colors.white};
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

const CriticalLabel = styled.div`
  background: ${(props) => props.theme.colors.fail600};
  color: ${(props) => props.theme.colors.white};
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

const SubDivider = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  margin-left: 1rem;
`

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 2rem;
`

const Label = styled.p`
  text-transform: uppercase;
  font-size: 14px;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  opacity: 0.6;
`

const Text = styled.p`
  margin: 1rem;
  margin-top: 0.5rem;
`

const BugHuntCards = ({ children, data }) => {
  return (
    <CardRow>
      <Card>
        <LowLabel>Up to 1,000 points</LowLabel>
        <H2>Low</H2>
        <Description>Up to 2,000 DAI</Description>
        <Divider />
        <Label>Severity</Label>
        <Text>
          <ul>
            <li>Low impact, medium likelihood</li>
            <li>Medium impact, low likelihood</li>
          </ul>
        </Text>
        <SubDivider />
        <Label>Example</Label>
        <Text>
          This is an example of a low risk bug for Eth2 – this should help users
          submit bugs in the right category.
        </Text>
        <StyledButton to="#">Submit low risk bug</StyledButton>
      </Card>
      <Card>
        <MediumLabel>Up to 5,000 points</MediumLabel>
        <H2>Medium</H2>
        <Description>Up to 10,000 DAI</Description>
        <Divider />
        <Label>Severity</Label>
        <Text>
          <ul>
            <li>Low impact, medium likelihood</li>
            <li>Medium impact, low likelihood</li>
          </ul>
        </Text>
        <SubDivider />
        <Label>Example</Label>
        <Text>
          This is an example of a low risk bug for Eth2 – this should help users
          submit bugs in the right category.
        </Text>
        <StyledButton to="#">Submit medium risk bug</StyledButton>
      </Card>
      <Card>
        <HighLabel>Up to 10,000 points</HighLabel>
        <H2>High</H2>
        <Description>Up to 25,000 DAI</Description>
        <Divider />
        <Label>Severity</Label>
        <Text>
          <ul>
            <li>Low impact, medium likelihood</li>
            <li>Medium impact, low likelihood</li>
          </ul>
        </Text>
        <SubDivider />
        <Label>Example</Label>
        <Text>
          This is an example of a low risk bug for Eth2 – this should help users
          submit bugs in the right category.
        </Text>
        <StyledButton to="#">Submit high risk bug</StyledButton>
      </Card>
      <Card>
        <CriticalLabel>Up to 25,000 points</CriticalLabel>
        <H2>Critical</H2>
        <Description>Up to 50,000 DAI</Description>
        <Divider />
        <Label>Severity</Label>
        <Text>
          <ul>
            <li>Low impact, medium likelihood</li>
            <li>Medium impact, low likelihood</li>
          </ul>
        </Text>
        <SubDivider />
        <Label>Example</Label>
        <Text>
          This is an example of a low risk bug for Eth2 – this should help users
          submit bugs in the right category.
        </Text>
        <StyledButton to="#">Submit critical risk bug</StyledButton>
      </Card>
    </CardRow>
  )
}

export default BugHuntCards
