// Libraries
import React, { useState } from "react"
import styled from "styled-components"

// Components
import Emoji from "./Emoji"
import { ButtonSecondary } from "./SharedStyledComponents"
import Translation from "./Translation"

// Data
import monthData from "../data/translation_reports/month_data.json"
import quarterData from "../data/translation_reports/quarter_data.json"
import allTimeData from "../data/translation_reports/alltime_data.json"

const Content = styled.div`
  margin-bottom: 2rem;
`

const Table = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  width: 100%;
  margin-bottom: 2rem;
`

const Header = styled.div`
  background-color: ${(props) => props.theme.colors.grayBackground};
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.text} !important;
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
  color: #000;
`

const Item = styled.div`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 0.5rem 1rem;
  width: 100%;
  color: #000;
  &:hover {
    border-radius: 4px;
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
`

const TextContainer = styled.div`
  flex: 1 1 75%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2rem;
  overflow-wrap: anywhere;
`

const WordsContainer = styled.div`
  flex: 1 1 36%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Avatar = styled.img`
  margin-right: 1rem;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    display: none;
  }
`

const ItemNumber = styled.div`
  margin-right: 1rem;
  opacity: 0.4;
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  flex-wrap: wrap;
`

const ButtonSecondaryStyled = styled(ButtonSecondary)`
  margin: 0.5rem 1rem;
  border-radius: 25pt;
  width: 120px;
  height: 30px;
  padding: 0;
  color: ${(props) =>
    props.isSelected ? props.theme.colors.primary : props.theme.colors.text};
  border: 1px solid
    ${(props) =>
      props.isSelected ? props.theme.colors.primary : props.theme.colors.text};
`

const LanguageMobile = styled.p`
  margin: 0;
  display: none;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: block;
    font-size: ${(props) => props.theme.fontSizes.s};
    opacity: 0.6;
  }
`

const LangaugeContainer = styled(TextContainer)`
  display: inherit;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: none;
  }
`

const StyledEmoji = styled(Emoji)`
  display: block;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: none;
  }
`

const TranslationLeaderboard = () => {
  const leaderboardData = {
    monthData,
    quarterData,
    allTimeData,
  }
  const [filterAmount, updateFilterAmount] = useState(10)
  const [dateRangeType, updateDateRangeType] = useState("monthData")

  const showLess = () => {
    updateFilterAmount(10)
  }

  const showMore = () => {
    updateFilterAmount(50)
  }

  return (
    <Content>
      <ButtonRow>
        <ButtonSecondaryStyled
          onClick={() => updateDateRangeType("monthData")}
          isSelected={dateRangeType === "monthData"}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-month-view" />
        </ButtonSecondaryStyled>
        <ButtonSecondaryStyled
          onClick={() => updateDateRangeType("quarterData")}
          isSelected={dateRangeType === "quarterData"}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-quarter-view" />
        </ButtonSecondaryStyled>
        <ButtonSecondaryStyled
          onClick={() => updateDateRangeType("allTimeData")}
          isSelected={dateRangeType === "allTimeData"}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-all-time-view" />
        </ButtonSecondaryStyled>
      </ButtonRow>
      <Table>
        <Header>
          <ItemNumber>#</ItemNumber>
          <TextContainer>
            <Translation id="page-contributing-translation-program-acknowledgements-translator" />
          </TextContainer>
          <LangaugeContainer>
            <Translation id="page-contributing-translation-program-acknowledgements-language" />
          </LangaugeContainer>
          <WordsContainer>
            <Translation id="page-contributing-translation-program-acknowledgements-total-words" />
          </WordsContainer>
        </Header>
        {leaderboardData[dateRangeType].data
          .filter((item, idx) => idx < filterAmount)
          .map((item, idx) => {
            const { user, translated, languages } = item
            let emoji = null
            if (idx === 0) {
              emoji = ":trophy:"
            } else if (idx === 1) {
              emoji = ":2nd_place_medal:"
            } else if (idx === 2) {
              emoji = ":3rd_place_medal:"
            }
            return (
              <Item key={idx}>
                {emoji ? (
                  <Emoji mr={"1rem"} text={emoji} />
                ) : (
                  <ItemNumber>{idx + 1}</ItemNumber>
                )}
                <TextContainer>
                  <Avatar src={user.avatarUrl} />
                  <div>
                    {user.username}
                    <LanguageMobile>{languages[0]?.name || ""}</LanguageMobile>
                  </div>
                </TextContainer>
                <LangaugeContainer>
                  {languages[0]?.name || ""}
                </LangaugeContainer>
                <WordsContainer>
                  <StyledEmoji
                    ml={"1rem"}
                    mr={"1rem"}
                    size={1.5}
                    text={":writing:"}
                  />
                  {translated}
                </WordsContainer>
              </Item>
            )
          })}
      </Table>
      <ButtonRow>
        <ButtonSecondary onClick={filterAmount === 10 ? showMore : showLess}>
          <Translation
            id={
              filterAmount === 10
                ? "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-more"
                : "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-less"
            }
          />
        </ButtonSecondary>
      </ButtonRow>
    </Content>
  )
}

export default TranslationLeaderboard
