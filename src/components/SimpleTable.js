import React from "react"
import styled from "styled-components"
import Link from "./Link"
import Img from "gatsby-image"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: auto;
  margin: 2rem 0rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  margin-bottom: 2rem;
  min-width: 640px;
`

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const HBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text200};
`

const Image = styled(Img)`
  min-width: 24px;
  margin-right: 0.5rem;
`

const FakeLinkExternalTable = styled.div`
  &:after {
    margin-left: 0.125em;
    margin-right: 0.3em;
    display: inline;
    color: ${(props) => props.theme.colors.text200};
    content: "↗";
    transition: all 0.1s ease-in-out;
    font-style: normal;
  }
`

const Header = styled(FakeLinkExternalTable)`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-decoration: none;
  display: flex;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.ednBackground};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
`

const Div = styled(Link)`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-decoration: none;
  display: flex;
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.text};
  padding: 1rem;
  width: 100%;
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.primary200};
    color: ${(props) => props.theme.colors.black300};
  }
  &:after {
    color: ${(props) => props.theme.colors.primary};
  }
`

const SimpleTable = ({ column1, column2, column3, content }) => {
  return (
    <Grid>
      <Header>
        <HBox>{column1}</HBox>
        <HBox>{column2}</HBox>
        <HBox>{column3}</HBox>
      </Header>
      {content.map((listItem, idx) => {
        const { test1, test2, test3, link, image } = listItem
        return (
          <Div key={idx} to={link}>
            <Box>
              {image && <Image fixed={image} />}
              {test1}
            </Box>
            <Box>{test2}</Box>
            <Box>{test3}</Box>
          </Div>
        )
      })}
    </Grid>
  )
}

export default SimpleTable
