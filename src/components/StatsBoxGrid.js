import React, { useState } from "react"
import styled from "styled-components"

import Emoji from "./Emoji"

const Title = styled.h3`
  font-size: 64px;
  font-weight: 600;
  margin-top: 0rem;
  margin-bottom: 1rem;
`

const Body = styled.p`
  font-size: 20px;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.black300};
  text-transform: uppercase;
  font-family: "SFMono-Regular", monospace;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin: 4rem 0rem;
  border-radius: 2px;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: flex;
    flex-direction: column;
  }
`

const StyledEmoji = styled(Emoji)`
  margin: 0.5rem;
  &:hover {
    transition: transform 50s;
    transform: rotate(10turn);
  }
`

const Box = styled.div`
  /* grid-row-start: ${(props) => (props.isOpen ? `1` : `auto`)};
  grid-row-end: ${(props) => (props.isOpen ? `span 2` : `auto`)}; */
  color: ${(props) =>
    props.isOpen ? props.theme.colors.black300 : props.theme.colors.text};
  /* cursor: pointer; */
  height: 20rem;
  background: ${(props) =>
    props.isOpen
      ? props.theme.colors[props.color]
      : props.theme.colors.background};
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 1.5rem;
  /* &:hover {
    background: ${(props) =>
    props.isOpen
      ? props.theme.colors[props.color]
      : props.theme.colors.ednBackground};
    transition: transform 0.5s;
    transform: skewX(-5deg);
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  } */
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: ${(props) => (props.isOpen ? `column` : `row-reverse`)};
    align-items: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: ${(props) => (props.isOpen ? `column` : `column-reverse`)};
  }
`

// Represent string as 32-bit integer
const hashCode = (string) => {
  let hash = 0
  for (const char of string) {
    const code = char.charCodeAt(0)
    hash = (hash << 5) - hash + code
    hash |= 0
  }
  return Math.abs(hash)
}

// Theme variables from Theme.js
const colors = [
  "gridYellow",
  "gridRed",
  "gridBlue",
  "gridGreen",
  "gridOrange",
  "gridPink",
  "gridPurple",
]

const GridItem = ({
  description,
  columnNumber,
  emoji,
  explainer,
  index,
  title,
  isOpen,
  callback,
  color,
}) => {
  const handleClick = () => {
    callback(index)
  }
  return (
    <Box
      onClick={() => handleClick()}
      isOpen={isOpen}
      columnNumber={columnNumber}
      color={color}
    >
      <Title>{title}</Title>
      <div>
        <Body>{description}</Body>
        <p>{explainer}</p>
      </div>
      {/* <StyledEmoji size="6" text={emoji} /> */}
    </Box>
  )
}

const StatsBoxGrid = ({ items }) => {
  const [indexOpen, setOpenIndex] = useState(0)

  return (
    <Grid>
      {items.map((item, idx) => {
        let columnNumber = idx + 1
        if (columnNumber > 4) {
          columnNumber = columnNumber - 3
        }
        const colorIdx = hashCode(item.emoji) % colors.length
        const color = colors[colorIdx]
        return (
          <GridItem
            key={idx}
            title={item.title}
            emoji={item.emoji}
            description={item.description}
            explainer={item.explainer}
            index={idx}
            columnNumber={columnNumber}
            isOpen={idx === indexOpen}
            callback={setOpenIndex}
            color={color}
          />
        )
      })}
    </Grid>
  )
}

export default StatsBoxGrid
