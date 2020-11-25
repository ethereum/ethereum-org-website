import React, { useState } from "react"
import styled from "styled-components"

import Emoji from "./Emoji"

const OpenTitle = styled.h3`
  font-size: 64px;
  font-weight: 700;
  margin-top: 0rem;
`

const Title = styled.h3`
  font-size: 40px;
  font-weight: 400;
  margin-top: 0rem;
`

const Subtitle = styled.h4`
  font-size: 32px;
  font-weight: 600;
  margin-top: 0rem;
`

const Body = styled.p`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.black300};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 3fr 3fr;
  margin: 4rem 0rem;
  border-radius: 2px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: flex;
    flex-direction: column;
  }
`

const StyledEmoji = styled(Emoji)`
  margin: 0.5rem;
  align-self: center;
  &:hover {
    transition: transform 50s;
    transform: rotate(10turn);
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const Column = styled.div`
  width: 100%;
`

const Box = styled.div`
  grid-row-start: ${(props) => (props.isOpen ? props.rowNumber : `auto`)};
  grid-row-end: ${(props) => (props.isOpen ? `span 3` : `auto`)};
  grid-column-start: ${(props) => (props.isOpen ? props.columnNumber : `auto`)};
  color: ${(props) =>
    props.isOpen ? props.theme.colors.black300 : props.theme.colors.text};
  cursor: pointer;
  background: ${(props) =>
    props.isOpen
      ? props.theme.colors[props.color]
      : props.theme.colors.background};
  display: flex;
  flex-direction: ${(props) => (props.isOpen ? `column` : `column-reverse`)};
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 1.5rem;
  &:hover {
    background: ${(props) =>
      props.isOpen
        ? props.theme.colors[props.color]
        : props.theme.colors.ednBackground};
    transition: transform 0.5s;
    transform: skewX(-5deg);
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  }
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
  "gridBlue",
  "gridGreen",
  "gridOrange",
  "gridPink",
  "gridPurple",
]

const GridItem = ({
  description,
  columnNumber,
  rowNumber,
  emoji,
  index,
  title,
  isOpen,
  callback,
  color,
  pros,
  cons,
}) => {
  const handleClick = () => {
    callback(index)
  }
  return (
    <Box
      onClick={() => handleClick()}
      isOpen={isOpen}
      columnNumber={columnNumber}
      rowNumber={rowNumber}
      color={color}
    >
      {isOpen ? (
        <Emoji mb={"2rem"} text={emoji} size="6" />
      ) : (
        <>
          <StyledEmoji size="6" text={emoji} />
          <Title>{title}</Title>
        </>
      )}
      <div>
        {isOpen && (
          <div>
            <OpenTitle>{title}</OpenTitle>
            <Body>{description}</Body>
            <Row>
              {pros && (
                <Column>
                  <Subtitle>Pros</Subtitle>
                  <Body>
                    <ul>
                      {pros.map((pro, idx) => (
                        <li key={idx}>{pro}</li>
                      ))}
                    </ul>
                  </Body>
                </Column>
              )}
              {cons && (
                <Column>
                  <Subtitle>Cons</Subtitle>
                  <Body>
                    <ul>
                      {cons.map((con, idx) => (
                        <li key={idx}>{con}</li>
                      ))}
                    </ul>
                  </Body>
                </Column>
              )}
            </Row>
          </div>
        )}
      </div>
    </Box>
  )
}

const StablecoinBoxGrid = ({ items }) => {
  const [indexOpen, setOpenIndex] = useState(0)

  return (
    <Grid>
      {items.map((item, idx) => {
        let columnNumber = 1
        let rowNumber = 1
        const colorIdx = hashCode(item.emoji) % colors.length
        const color = colors[colorIdx]
        return (
          <GridItem
            key={idx}
            title={item.title}
            emoji={item.emoji}
            description={item.description}
            pros={item.pros}
            cons={item.cons}
            index={idx}
            columnNumber={columnNumber}
            rowNumber={rowNumber}
            isOpen={idx === indexOpen}
            callback={setOpenIndex}
            color={color}
          />
        )
      })}
    </Grid>
  )
}

export default StablecoinBoxGrid
