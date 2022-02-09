import React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import Translation from "./Translation"

const StyledCard = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background: linear-gradient(
    49.21deg,
    rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%
  );
  padding: 3rem;
  margin: 1rem;
  margin-top: 6rem;
  margin-bottom: 10rem;
  border-radius: 4px;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    margin-bottom: 1rem;
    margin: 4rem 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 2rem;
  }
`

const Content = styled.div`
  padding-left: 5rem;
  flex: 1 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 2rem;
    padding-left: 1rem;
    flex-direction: column;
    width: 100%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding-left: 0;
  }
`

const Description = styled.p`
  font-size: 1.25rem;
  width: 90%;
  line-height: 140%;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text200};
`

const Image = styled(GatsbyImage)`
  align-self: center; /* prevents crop */
  width: 100%;
  max-width: ${(props) => `${props.maxImageWidth}px`};
  margin-top: -6rem;
  margin-bottom: -6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 0rem;
    margin-top: -6rem;
  }
`

const H2 = styled.h2`
  margin-top: 0rem;
`

const CalloutBanner = ({
  image,
  maxImageWidth,
  titleKey,
  descriptionKey,
  alt,
  children,
  className,
}) => (
  <StyledCard className={className}>
    <Image image={image} alt={alt} maxImageWidth={maxImageWidth} />
    <Content>
      <H2>
        <Translation id={titleKey} />
      </H2>
      <Description>
        <Translation id={descriptionKey} />
      </Description>
      {children}
    </Content>
  </StyledCard>
)

export default CalloutBanner
