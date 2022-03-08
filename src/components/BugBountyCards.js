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
  font-size: 0.875rem;
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
  font-size: 1.5rem;
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
  font-size: 1.25rem;
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
  font-size: 0.875rem;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  opacity: 0.6;
`

const Text = styled.div`
  margin: 1rem;
  margin-top: 0.5rem;
`

const bugBountyCardsInfo = [
  {
    lowLabelTranslationId: "page-upgrades-bug-bounty-card-label-1",
    h2TranslationId: "page-upgrades-bug-bounty-card-low",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-2",
    subHeader1TranslationId: "page-upgrades-bug-bounty-card-subheader",
    severityList: [
      "page-upgrades-bug-bounty-card-li-1",
      "page-upgrades-bug-bounty-card-li-2",
    ],
    subHeader2TranslationId: "page-upgrades-bug-bounty-card-subheader-2",
    textTranslationId: "page-upgrades-bug-bounty-card-text",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-low-risk",
  },
  {
    mediumLabelTranslationId: "page-upgrades-bug-bounty-card-label-3",
    h2TranslationId: "page-upgrades-bug-bounty-card-h2",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-4",
    subHeader1TranslationId: "page-upgrades-bug-bounty-card-subheader",
    severityList: [
      "page-upgrades-bug-bounty-card-li-3",
      "page-upgrades-bug-bounty-card-li-4",
      "page-upgrades-bug-bounty-card-li-5",
    ],
    subHeader2TranslationId: "page-upgrades-bug-bounty-card-subheader-2",
    textTranslationId: "page-upgrades-bug-bounty-card-text-1",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-medium-risk",
  },
  {
    highLabelTranslationId: "page-upgrades-bug-bounty-card-label-5",
    h2TranslationId: "page-upgrades-bug-bounty-card-high",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-6",
    subHeader1TranslationId: "page-upgrades-bug-bounty-card-subheader",
    severityList: [
      "page-upgrades-bug-bounty-card-li-6",
      "page-upgrades-bug-bounty-card-li-7",
    ],
    subHeader2TranslationId: "page-upgrades-bug-bounty-card-subheader-2",
    textTranslationId: "page-upgrades-bug-bounty-card-text-2",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-high-risk",
  },
  {
    criticalLabelTranslationId: "page-upgrades-bug-bounty-card-label-7",
    h2TranslationId: "page-upgrades-bug-bounty-card-critical",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-8",
    subHeader1TranslationId: "page-upgrades-bug-bounty-card-subheader",
    severityList: ["page-upgrades-bug-bounty-card-li-8"],
    subHeader2TranslationId: "page-upgrades-bug-bounty-card-subheader-2",
    textTranslationId: "page-upgrades-bug-bounty-card-text-3",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-critical-risk",
  },
]

const BugBountyCards = () => (
  <CardRow>
    {bugBountyCardsInfo.map((card, idx) => (
      <Card key={`bug-bounty-card-${idx}`}>
        {card.lowLabelTranslationId && (
          <LowLabel>
            <Translation id={card.lowLabelTranslationId} />
          </LowLabel>
        )}
        {card.mediumLabelTranslationId && (
          <MediumLabel>
            <Translation id={card.mediumLabelTranslationId} />
          </MediumLabel>
        )}
        {card.highLabelTranslationId && (
          <HighLabel>
            <Translation id={card.highLabelTranslationId} />
          </HighLabel>
        )}
        {card.criticalLabelTranslationId && (
          <CriticalLabel>
            <Translation id={card.criticalLabelTranslationId} />
          </CriticalLabel>
        )}
        <H2>
          <Translation id={card.h2TranslationId} />
        </H2>
        <Description>
          <Translation id={card.descriptionTranslationId} />
        </Description>
        <Divider />
        <SubHeader>
          <Translation id={card.subHeader1TranslationId} />
        </SubHeader>
        <Text>
          <ul>
            {card.severityList.map((listItemId) => (
              <li key={`${listItemId}`}>
                <Translation id={listItemId} />
              </li>
            ))}
          </ul>
        </Text>
        <Divider />
        <SubHeader>
          <Translation id={card.subHeader2TranslationId} />
        </SubHeader>
        <Text>
          <Translation id={card.textTranslationId} />
        </Text>
        <StyledButton to="https://forms.gle/Gnh4gzGh66Yc3V7G8">
          <Translation id={card.styledButtonTranslationId} />
        </StyledButton>
      </Card>
    ))}
  </CardRow>
)

export default BugBountyCards
