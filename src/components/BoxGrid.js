import React, { useState } from "react"
import styled from "styled-components"

import Emoji from "./Emoji"

const Title = styled.h3`
  font-size: 40px;
  font-weight: 400;
  margin-top: 0.75rem;
`

const Body = styled.p`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.black300};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 4rem 0rem;
  height: 640px;
  border-radius: 2px;
`

const Box = styled.div`
  grid-row-start: ${(props) => (props.isOpen ? `1` : `auto`)};
  grid-row-end: ${(props) => (props.isOpen ? `span 2` : `auto`)};
  grid-column-start: ${(props) => (props.isOpen ? props.columnNumber : `auto`)};

  cursor: pointer;
  background: ${(props) =>
    props.isOpen
      ? props.theme.colors.primary300
      : props.theme.colors.background};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 1.5rem;
  &:hover {
    background: ${(props) =>
      props.isOpen
        ? props.theme.colors.primary300
        : props.theme.colors.ednBackground};
    transition: transform 0.5s;
    transform: skewX(-5deg);
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  }
`

const GridItem = ({
  description,
  columnNumber,
  emoji,
  index,
  title,
  isOpen,
  callback,
}) => {
  const handleClick = () => {
    callback(index)
  }
  return (
    <Box
      onClick={() => handleClick()}
      isOpen={isOpen}
      columnNumber={columnNumber}
    >
      <Title>{title}</Title>
      <Emoji size="6" text={emoji} />
      {isOpen && <Body>{description}</Body>}
    </Box>
  )
}

const BoxGrid = ({ items }) => {
  const [indexOpen, setOpenIndex] = useState(0)

  return (
    <Grid>
      {items.map((item, idx) => {
        let columnNumber = idx + 1
        if (columnNumber > 4) {
          columnNumber = columnNumber - 3
        }
        return (
          <GridItem
            title={item.title}
            emoji={item.emoji}
            description={item.description}
            index={idx}
            columnNumber={columnNumber}
            isOpen={idx === indexOpen}
            callback={setOpenIndex}
          />
        )
      })}
    </Grid>
  )
}

export default BoxGrid
