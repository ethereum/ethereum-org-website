import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    49.21deg,
    rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%
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
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`

const Image = styled(Img)`
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

const Callout = ({ image, alt, title, description, children, className }) => (
  <StyledCard className={className}>
    <Image fixed={image} alt={alt} />
    <Content>
      <div>
        <h3>{title}</h3>
        <Description>{description}</Description>
      </div>
      {children}
    </Content>
  </StyledCard>
)

export default Callout
