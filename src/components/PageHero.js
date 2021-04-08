import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import ButtonLink from "./ButtonLink"
import { Content } from "./SharedStyledComponents"

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 0rem;
  padding: 0rem 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: ${(props) =>
      props.isReverse ? `column` : `column-reverse`};
    /* accounts for when we want image above or below text */
    padding: 0;
  }
`

const HeroContent = styled.div`
  max-width: 640px;
  padding: 8rem 0 8rem 2rem;
  margin-right: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 4rem 0;
    max-width: 100%;
  }
`

const HeroImg = styled(Img)`
  flex: 1 1 50%;
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  margin-top: 3rem;
  margin-left: 3rem;
  width: 100%;
  max-width: 624px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 0;
    margin-left: 0;
    max-width: 560px;
  }
`

const Header = styled.h2`
  font-weight: 700;
  font-size: 48px;
  max-width: 100%;
  margin-bottom: 0rem;
  color: ${(props) => props.theme.colors.text00};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 40px;
  }
`

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: -2rem;
  color: ${(props) => props.theme.colors.text300};
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-top: 1rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 20px;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
`

const StyledButtonLink = styled(ButtonLink)`
  margin-right: 1rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 1rem;
  }
`

const PageHero = ({ content, children, className, isReverse }) => {
  const { buttons, title, header, subtitle, image, alt } = content
  return (
    <Content>
      <HeroContainer isReverse={isReverse} className={className}>
        <HeroContent>
          <Title>{title}</Title>
          <Header>{header}</Header>
          <Subtitle>{subtitle}</Subtitle>
          {buttons && (
            <ButtonRow>
              {buttons.map((button, idx) => (
                <StyledButtonLink
                  isSecondary={button.isSecondary}
                  key={idx}
                  to={button.path}
                >
                  {button.content}
                </StyledButtonLink>
              ))}
            </ButtonRow>
          )}
          {children}
        </HeroContent>
        <HeroImg fluid={image} alt={alt} loading="eager" />
      </HeroContainer>
    </Content>
  )
}

export default PageHero
