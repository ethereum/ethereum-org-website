import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import Pill from "./Pill"
import Link from "./Link"
import Icon from "./Icon"

const ScamImage = styled(Img)`
  width: 100%;
  max-width: 400px;
`

const Card = styled.div`
  width: 100%;
  margin-top: 2rem;
`

const CardContainer = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  width: 100%;
  margin-top: -0.11rem;
`

const Content = styled.div`
  padding: 1.5rem;
  text-align: left;
  height: 100%;
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 0.75rem;
  font-weight: 700;
  margin-top: 1rem;
`

const Url = styled.code`
  font-size: 12px;
  color: ${(props) => props.theme.colors.fail500};
  margin-bottom: 1rem;
`

const Description = styled.p`
  opacity: 0.8;
  font-size: ${(props) => props.theme.fontSizes.s};
  margin-bottom: 0.5rem;
  line-height: 140%;
`

const PillRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const PlatformIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary300};
  margin-right: 0.5rem;
`

const ScamCard = ({ content }) => {
  return (
    <Card>
      {content.map((listItem, idx) => {
        const {
          title,
          description,
          image,
          children,
          scamUrl,
          date,
          platform,
        } = listItem
        return (
          <CardContainer id={idx}>
            <div>{image && <ScamImage fixed={image} />}</div>
            <Content>
              <PillRow>
                <Pill>{date}</Pill>
                <PlatformIcon name={platform} />
              </PillRow>
              <Url>{scamUrl}</Url>
              <Title>{title}</Title>
              <Description>{description}</Description>

              {children}
            </Content>
          </CardContainer>
        )
      })}
    </Card>
  )
}

export default ScamCard
