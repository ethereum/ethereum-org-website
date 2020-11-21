import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import GitStars from "./GitStars"
import ButtonLink from "./ButtonLink"

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 20%;
  margin: 1rem;
  min-width: 280px;
  max-width: 23%;
  @media (max-width: 1280px) {
    max-width: 31%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 46%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  background: ${(props) => props.theme.colors.searchBackground};
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Card = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
`

const Content = styled.div`
  padding: 1.5rem;
  padding-right: 1rem;
  text-align: left;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.h3`
  margin-top: ${(props) => (props.gitHidden ? "2rem" : "3rem")};
  margin-bottom: 0.75rem;
`

const Description = styled.p`
  opacity: 0.8;
  font-size: ${(props) => props.theme.fontSizes.s};
  margin-bottom: 0.5rem;
  line-height: 140%;
`

const SubjectContainer = styled.div`
  margin-top: 1.25rem;
`

const SubjectPill = styled.div`
  text-align: center;
  padding: 0 0.5rem;
  margin: 0 0.75rem 0.5rem 0;
  color: ${(props) => props.theme.colors.black300};
  float: left;
  background: ${({ theme, subject }) => {
    switch (subject) {
      case "Solidity":
        return theme.colors.tagYellow
      case "Vyper":
        return theme.colors.tagBlue
      case "web3":
        return theme.colors.tagTurqouise
      case "JavaScript":
        return theme.colors.tagRed
      case "TypeScript":
        return theme.colors.tagBlue
      case "Go":
        return theme.colors.tagTurqouise
      case "Python":
        return theme.colors.tagMint
      case "Rust":
        return theme.colors.tagOrange
      case "C#":
        return theme.colors.tagBlue
      case "Java":
        return theme.colors.tagPink
      default:
        return theme.colors.tagGray
    }
  }};
  font-size: ${(props) => props.theme.fontSizes.xs};
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  border-radius: 4px;
`

const StyledButtonLink = styled(ButtonLink)`
  margin: 1rem;
`

const Children = styled.div`
  margin-top: 1rem;
`

const ProductCard = ({
  url,
  background,
  image,
  name,
  description,
  children,
  gitHubRepo,
  subjects,
}) => {
  return (
    <Container>
      <Card>
        <ImageWrapper background={background}>
          <Image fixed={image} alt={`${name} logo`} />
        </ImageWrapper>

        <Content className="hover">
          <div>
            {gitHubRepo && <GitStars gitHubRepo={gitHubRepo} />}
            <Title gitHidden={!gitHubRepo}>{name}</Title>
            <Description>{description}</Description>
          </div>
          {children && <Children>{children}</Children>}
          <SubjectContainer>
            {subjects &&
              subjects.map((subject, idx) => (
                <SubjectPill key={idx} subject={subject}>
                  {subject}
                </SubjectPill>
              ))}
            {gitHubRepo &&
              gitHubRepo.languages.nodes.map(({ name }, idx) => (
                <SubjectPill key={idx} subject={name}>
                  {name.toUpperCase()}
                </SubjectPill>
              ))}
          </SubjectContainer>
        </Content>
        <StyledButtonLink to={url} hideArrow={true}>
          Open {name}
        </StyledButtonLink>
      </Card>
    </Container>
  )
}

export default ProductCard
