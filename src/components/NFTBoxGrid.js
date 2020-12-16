import React, { useState } from "react"
import { navigate } from "gatsby-plugin-intl"
import styled from "styled-components"
import Link from "./Link"
import Emoji from "./Emoji"
import Img from "gatsby-image"

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
  width: 100%;
  height: 100%;
  margin: -1px;
  /*   grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr; */
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

const Image = styled(Img)`
  max-width: 320px;
  max-height: 320px;
`

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.black300};
  &:hover {
    color: ${(props) => props.theme.colors.black};
  }
`

const Box = styled.div`
  grid-row-start: ${(props) => (props.isOpen ? props.rowNumber : `auto`)};
  grid-row-end: ${(props) => (props.isOpen ? `span 1` : `auto`)};
  grid-column-start: ${(props) => (props.isOpen ? `span 2` : `auto`)};
  color: ${(props) =>
    props.isOpen ? props.theme.colors.black300 : props.theme.colors.text};
  cursor: ${(props) => (props.isOpen ? `auto` : `pointer`)};
  background: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.text};
  padding: 1.5rem;
  justify-content: ${(props) => (props.isOpen ? `center` : `center`)};
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

const GridItem = ({
  description,
  columnNumber,
  rowNumber,
  image,
  index,
  title,
  isOpen,
  callback,
  color,
  link,
  url,
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
      <Image fixed={image} />

      <div>
        {isOpen && (
          <div>
            <OpenTitle>{title}</OpenTitle>
            <Body>{description}</Body>
            <Body>Owner:</Body>
            <StyledLink to={url}>{link}</StyledLink>
          </div>
        )}
      </div>
    </Box>
  )
}

const NFTBoxGrid = ({ items }) => {
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
        return (
          <GridItem
            key={idx}
            title={item.title}
            image={item.image}
            description={item.description}
            pros={item.pros}
            cons={item.cons}
            link={item.link}
            url={item.url}
            index={idx}
            columnNumber={columnNumber}
            rowNumber={rowNumber}
            isOpen={idx === indexOpen}
            callback={handleSelect}
          />
        )
      })}
    </Grid>
  )
}

export default NFTBoxGrid
