import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import Link from "./Link"

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.background};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  min-height: 200px;
`

const Image = styled(Img)`
  width: 100%;
  align-self: center;
  max-width: 372px;
  max-height: 257px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 311px;
  }
`

const Card = styled(Link)`
  color: ${(props) => props.theme.colors.text};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  text-decoration: none;
  &:hover {
    box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Content = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const Title = styled.h3`
  margin: 2rem 1rem;
  margin-bottom: 1rem;
`

const Description = styled.p`
  opacity: 0.8;
  font-size: ${(props) => props.theme.fontSizes.s};
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  line-height: 140%;
`

const DataRow = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
  color: ${(props) => props.theme.colors.text300};
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.s};
  justify-content: space-between;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-left: 1rem;
  text-transform: uppercase;
`

const Data = styled.div`
  overflow-y: scroll;
  max-height: 160px;
  margin-bottom: 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.lightBorder};
`

const Box = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled(Img)`
  min-width: 24px;
  margin-right: 0.5rem;
`

const DataProductCard = ({
  url,
  background,
  image,
  name,
  description,
  data,
}) => (
  <Card hideArrow={true} to={url}>
    <ImageWrapper background={background}>
      <Image fixed={image} alt={`${name} logo`} />
    </ImageWrapper>
    <Content>
      <div>
        <Title>{name}</Title>
        {description && <Description>{description}</Description>}
      </div>
      {data && (
        <Data>
          {data.map(({ logo, coin, apy }, idx) => (
            <DataRow key={idx}>
              <Box>
                {logo && <Logo fixed={logo} />}
                {coin}
              </Box>
              <div>{apy}% APY</div>
            </DataRow>
          ))}
        </Data>
      )}
    </Content>
  </Card>
)

export default DataProductCard
