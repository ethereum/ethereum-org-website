// Libraries
import React, { useState } from "react"
import styled from "styled-components"
import { reverse, sortBy } from "lodash"

// Components
import Emoji from "./Emoji"
import { Option, OptionContainer, OptionText } from "./SharedStyledComponents"
import Translation from "./Translation"

// Data
import monthData from "../data/translation-reports/month-data.json"
import quarterData from "../data/translation-reports/quarter-data.json"
import allTimeData from "../data/translation-reports/alltime-data.json"

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
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2rem;
  overflow-wrap: anywhere;
`

const WordsContainer = styled.div`
  min-width: 20%;
  display: flex;
  flex-direction: row;
  align-items: left;
`

const Avatar = styled.img`
  margin-right: 1rem;
  height: 40px;
  width: 40px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    height: 30px;
    width: 30px;
  }
  border-radius: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    display: none;
  }
`

const NameContainer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 100px;
  }
`

const Width40 = styled.div`
  width: 40px;
`

const ItemNumber = styled(Width40)`
  opacity: 0.4;
`

const Language = styled.p`
  margin: 0;
  display: block;
  font-size: ${(props) => props.theme.fontSizes.s};
  opacity: 0.6;
`

const StyledEmoji = styled(Emoji)`
  display: block;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: none;
  }
`

const Flex = styled.div`
  display: flex;
`

const TranslationLeaderboard = () => {
  const leaderboardData = {
    monthData: reverse(sortBy(monthData.data, ({ user }) => user.totalCosts)),
    quarterData: reverse(
      sortBy(quarterData.data, ({ user }) => user.totalCosts)
    ),
    allTimeData: reverse(
      sortBy(allTimeData.data, ({ user }) => user.totalCosts)
    ),
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
      <OptionContainer>
        <Option
          onClick={() => updateDateRangeType("monthData")}
          isActive={dateRangeType === "monthData"}
        >
          <OptionText fontSize={"18px"}>
            <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-month-view" />
          </OptionText>
        </Option>
        <Option
          onClick={() => updateDateRangeType("quarterData")}
          isActive={dateRangeType === "quarterData"}
        >
          <OptionText fontSize={"18px"}>
            <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-quarter-view" />
          </OptionText>
        </Option>
        <Option
          onClick={() => updateDateRangeType("allTimeData")}
          isActive={dateRangeType === "allTimeData"}
        >
          <OptionText fontSize={"18px"}>
            <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-all-time-view" />
          </OptionText>
        </Option>
      </OptionContainer>
      <Table>
        <Header>
          <Flex>
            <ItemNumber>#</ItemNumber>
            <TextContainer>
              <Translation id="page-contributing-translation-program-acknowledgements-translator" />
            </TextContainer>
          </Flex>
          <WordsContainer>
            <Translation id="page-contributing-translation-program-acknowledgements-total-words" />
          </WordsContainer>
        </Header>
        {/* // TODO: Remove specific user checks once Acolad has updated their usernames */}
        {leaderboardData[dateRangeType]
          .filter(
            (item) =>
              item.user.username !== "ethdotorg" &&
              !item.user.username.includes("LQS_") &&
              !item.user.username.includes("REMOVED_USER") &&
              !item.user.username.includes("Aco_") &&
              !item.user.fullName.includes("Aco_") &&
              !item.user.username.includes("Acc_") &&
              !item.user.fullName.includes("Acc_") &&
              item.user.username !== "Finnish_Sandberg" &&
              item.user.username !== "Norwegian_Sandberg" &&
              item.user.username !== "Swedish_Sandberg"
          )
          .filter((item, idx) => idx < filterAmount)
          .map((item, idx) => {
            const { user, languages } = item
            const sortedLanguages = reverse(
              sortBy(languages, ({ language }) => language.totalCosts)
            )

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
                <Flex>
                  {emoji ? (
                    <Width40>
                      <Emoji mr={"1rem"} size={2} text={emoji} />
                    </Width40>
                  ) : (
                    <ItemNumber>{idx + 1}</ItemNumber>
                  )}
                  <TextContainer>
                    <Avatar src={user.avatarUrl} />
                    <NameContainer>
                      {user.username}
                      <Language>{sortedLanguages[0].language.name}</Language>
                    </NameContainer>
                  </TextContainer>
                </Flex>
                <WordsContainer>
                  <StyledEmoji mr={"0.5rem"} size={1.5} text={":writing:"} />
                  {user.totalCosts}
                </WordsContainer>
              </Item>
            )
          })}
      </Table>
      <OptionContainer>
        <Option onClick={filterAmount === 10 ? showMore : showLess}>
          <OptionText fontSize={"18px"}>
            <Translation
              id={
                filterAmount === 10
                  ? "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-more"
                  : "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-less"
              }
            />
          </OptionText>
        </Option>
      </OptionContainer>
    </Content>
  )
}

export default TranslationLeaderboard
