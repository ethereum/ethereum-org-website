import React, { useState } from "react"
import { navigate } from "gatsby-plugin-intl"
import styled from "styled-components"
import Link from "./Link"
import Emoji from "./Emoji"
import Translation from "./Translation"

const OpenTitle = styled.h3`
  font-size: 40px;
  font-weight: 700;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 32px;
  }
`

const Title = styled.h3`
  font-size: 40px;
  font-weight: 400;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 32px;
  }
`

const Subtitle = styled.h4`
  font-size: 32px;
  font-weight: 600;
  margin-top: 0rem;
  padding: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.black300};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 24px;
  }
`

const Body = styled.div`
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
  order: ${(props) => (props.isOpen ? `1` : `2`)};
  margin: 0.5rem;
  align-self: center;
  &:hover {
    transition: transform 50s;
    transform: rotate(10turn);
  }
`

const Row = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const Column = styled.div`
  width: 100%;
`

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.black300};
  &:hover {
    color: ${(props) => props.theme.colors.black};
  }
`

const Box = styled.div`
  grid-row-start: ${(props) => (props.isOpen ? props.rowNumber : `auto`)};
  grid-row-end: ${(props) => (props.isOpen ? `span 3` : `auto`)};
  grid-column-start: ${(props) => (props.isOpen ? props.columnNumber : `auto`)};
  color: ${(props) =>
    props.isOpen ? props.theme.colors.black300 : props.theme.colors.text};
  cursor: ${(props) => (props.isOpen ? `auto` : `pointer`)};
  background: ${(props) =>
    props.isOpen
      ? props.theme.colors[props.color]
      : props.theme.colors.background};
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 1.5rem;
  &:hover {
    background: ${(props) =>
      props.isOpen
        ? props.theme.colors[props.color]
        : props.theme.colors.ednBackground};
    transition: ${(props) => (props.isOpen ? `auto` : `transform 0.5s`)};
    transform: ${(props) => (props.isOpen ? `auto` : `skewX(-5deg)`)};
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: ${(props) => (props.isOpen ? `column` : `row`)};
    justify-content: ${(props) =>
      props.isOpen ? `flex-start` : `space-between`};
    align-items: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
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
  links,
}) => {
  const handleClick = () => {
    callback(index)
  }
  return (
    <Box
      id={`type-${index}`}
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
                  <Subtitle>
                    <Translation id="pros" />
                  </Subtitle>
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
                  <Subtitle>
                    <Translation id="cons" />
                  </Subtitle>
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
            <div>
              <Subtitle>
                <Translation id="example-projects" />
              </Subtitle>
              <Body>
                <ul>
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <StyledLink key={idx} to={link.url}>
                        {link.text}
                      </StyledLink>
                    </li>
                  ))}
                </ul>
              </Body>
            </div>
          </div>
        )}
      </div>
    </Box>
  )
}

const StablecoinBoxGrid = ({ items }) => {
  const [indexOpen, setOpenIndex] = useState(0)

  // TODO generalize
  const handleSelect = (idx) => {
    setOpenIndex(idx)
    const isMobile = document && document.documentElement.clientWidth < 1024
    if (isMobile) {
      navigate(`/stablecoins/#type-${idx}`)
    }
  }

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
            links={item.links}
            index={idx}
            columnNumber={columnNumber}
            rowNumber={rowNumber}
            isOpen={idx === indexOpen}
            callback={handleSelect}
            color={color}
          />
        )
      })}
    </Grid>
  )
}

export default StablecoinBoxGrid
