import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import Link from "./Link"

const translators = [
  {
    title: "Joe Bloggs",
    words: "10,800",
    flag: ":germany:",
    rank: ":up_arrow:",
    place: "10 places",
  },
  {
    title: "Joe Bloggs",
    words: "7,800",
    flag: ":taiwan:",
    rank: ":down_arrow:",
    place: "1 place",
  },
  {
    title: "Joe Bloggs",
    words: "4,800",
    flag: ":russia:",
    rank: ":up_arrow:",
    place: "10 places",
  },
  {
    title: "Joe Bloggs",
    words: "3,800",
    flag: ":russia:",
    rank: ":up_arrow:",
    place: "10 places",
  },
  {
    title: "Joe Bloggs",
    words: "2,800",
    flag: ":portugal:",
    rank: ":down_arrow:",
    place: "10 places",
  },
  {
    title: "Joe Bloggs",
    words: "1,800",
    flag: ":brazil:",
    rank: ":down_arrow:",
    place: "10 places",
  },
  {
    title: "Joe Bloggs",
    words: "800",
    flag: ":lithuania:",
    rank: ":up_arrow:",
    place: "1000 places",
  },
  {
    title: "Joe Bloggs",
    words: "600",
    flag: ":ukraine:",
    rank: ":up_arrow:",
    place: "6 places",
  },
  {
    title: "Joe Bloggs",
    words: "40",
    flag: ":finland:",
    rank: ":up_arrow:",
    place: "3 places",
  },
  {
    title: "Joe Bloggs",
    words: "20",
    flag: ":vietnam:",
    rank: ":up_arrow:",
    place: "10 places",
  },
]

const Table = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  width: 768px;
  margin-top: 3rem;
`

const Item = styled.div`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
  color: #000;
`

const Header = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text} !important;
  background: ${(props) => props.theme.colors.searchResultBackground};
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
  color: #000;
`

const ItemNumber = styled.div`
  margin-right: 1rem;
  opacity: 0.4;
`
const ItemTitle = styled.div`
  margin-right: 1rem;
`

const ItemDesc = styled.p`
  margin-bottom: 0;
  opacity: 0.6;
`

const Rank = styled.p`
  margin-bottom: 0;
  color: ${(props) => props.theme.colors.success};
`

const NameRank = styled.div``

const Flag = styled(Twemoji)`
  margin-right: 0.5rem;
`

const RightContainer = styled.div`
  display: flex;
  align-items: right;
  align-content: center;
  flex: 1 1 25%;
  margin-right: 1rem;
  flex-wrap: wrap;
`
const LeftContainer = styled.div`
  display: flex;
  flex: 1 1 75%;
  margin-right: 1rem;
`
// TODO create generalized CardList / TableCard
// TODO prop if ordered list or unordered
const TranslationsLeaderboard = () => {
  return (
    <Table>
      <Header>
        <LeftContainer>
          <ItemNumber>#</ItemNumber>
          <ItemTitle>Translator</ItemTitle>
          <ItemTitle>Languages</ItemTitle>
        </LeftContainer>
        <RightContainer>
          <ItemTitle>Total words</ItemTitle>
        </RightContainer>
        <RightContainer>
          <ItemTitle>Rank change</ItemTitle>
        </RightContainer>
      </Header>
      {translators.map((translator, idx) => {
        return (
          <Item key={idx}>
            <LeftContainer>
              <ItemNumber>{idx + 1}</ItemNumber>
              <ItemTitle>{translator.title}</ItemTitle>
              <Flag svg text={translator.flag} />
            </LeftContainer>
            <RightContainer>
              <Flag svg text=":writing_hand:" />
              <ItemDesc>{translator.words}</ItemDesc>
            </RightContainer>
            <RightContainer>
              <Flag svg text={translator.rank} />
              <ItemDesc>{translator.place}</ItemDesc>
            </RightContainer>
          </Item>
        )
      })}
    </Table>
  )
}

export default TranslationsLeaderboard
