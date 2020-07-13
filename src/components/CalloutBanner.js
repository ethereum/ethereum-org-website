import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

const StyledCard = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background: linear-gradient(
    49.21deg,
    rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%
  );
  padding: 1.5rem;
  margin: 1rem;
  margin-top: 6rem;
  margin-bottom: 10rem;
  border-radius: 4px;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    margin-bottom: 1rem;
    margin: 4rem 2rem;
  }
`

const Content = styled.div`
  padding-left: 5rem;
  padding-top: 3rem;
  padding-bottom: 2.5rem;
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-left: 1rem;
    flex-direction: column;
    width: 100%;
  }
`

const Description = styled.p`
  font-size: 20px;
  width: 90%;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`

const Image = styled(Img)`
  width: 100%;
  max-width: ${(props) => props.maxImageWidth};
  margin-top: -6rem;
  margin-bottom: -6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 0rem;
    margin-top: -6rem;
    align-self: center;
    max-width: 263px;
    min-height: 200px;
  }
`

const CalloutBanner = ({
  image,
  maxImageWidth,
  title,
  description,
  children,
  className,
}) => {
  return (
    <StyledCard className={className}>
      <Image
        fluid={image}
        alt={`${title} image`}
        maxImageWidth={maxImageWidth}
      />
      <Content>
        <h2>{title}</h2>
        <Description>{description}</Description>
        {children}
      </Content>
    </StyledCard>
  )
}

export default CalloutBanner
