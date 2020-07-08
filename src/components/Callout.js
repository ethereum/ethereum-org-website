import React from "react"
import styled from "styled-components"

const StyledCard = styled.div`
  background: linear-gradient(
    49.21deg,
    rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%
  );
  padding: 1.5rem;
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 4px;
`

const Description = styled.h4`
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 140%;
  color: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    #000000;
`

const Image = styled.img`
  margin-top: -9rem;
  justify-content: center;
  max-width: 400px;
`
const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
`
const Buttons = styled.div`
  display: flex;
  width: 100%;
`

const Callout = ({ to, image, title, description, children, className }) => {
  return (
    <StyledCard className={className}>
      <ImageDiv>
        <Image src={image} />
      </ImageDiv>
      <h3>{title}</h3>
      <Description>{description}</Description>
      <Buttons>{children}</Buttons>
    </StyledCard>
  )
}

export default Callout
