// Libraries
import React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import Translation from "./Translation"

// Components
import Emoji from "../components/Emoji"

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    49.21deg,
    #7f7fd5 19.87%,
    #86a8e7 58.46%,
    #91eae4 97.05%
  );
  padding: 1.5rem;
  margin: 1rem;
  margin-top: 8rem;
  border-radius: 4px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 4rem;
  }
`

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`

const Image = styled(GatsbyImage)`
  margin-top: -10rem;
  align-self: center;
  max-width: 263px;
  min-height: 200px;
`

const Content = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const Callout = ({
  image,
  emoji,
  alt,
  titleKey,
  descriptionKey,
  children,
  className,
}) => (
  <StyledCard className={className}>
    {image && <Image image={image} alt={alt} />}
    <Content>
      <div>
        {emoji && <Emoji text={emoji} size={3} />}
        <h3>
          <Translation id={titleKey} />
        </h3>
        <Description>
          <Translation id={descriptionKey} />
        </Description>
      </div>
      {children}
    </Content>
  </StyledCard>
)

export default Callout
