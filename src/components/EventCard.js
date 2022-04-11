import React from "react"
import styled from "styled-components"
import Emoji from "./Emoji"
import ButtonLink from "./ButtonLink"

const StyledCard = styled.div`
  position: relative;

  &:after,
  &:before {
    content: "";
    display: block;
    width: 100%;
    clear: both;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 30px;
  }
`

const StyledCardReference = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0;
  left: 50%;
  overflow: hidden;
  margin-left: -12px;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`

const StyledCardContent = styled.div`
  width: 45%;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.ednBackground};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};

  &:before {
    content: "";
    position: absolute;
    left: 45%;
    top: 10px;
    width: 0;
    height: 3px;
    border-left: 25px solid ${(props) => props.theme.colors.primary};
  }

  &.style-card-content-right {
    float: right;
    margin-top: -25%;

    &:before {
      content: "";
      right: 45%;
      left: inherit;
      border-left: 0;
      border-right: 25px solid ${(props) => props.theme.colors.primary};
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 100%;
    float: right;

    &.style-card-content-right {
      margin-top: 0;
    }

    &:before {
      display: none;
    }
  }
`

const Description = styled.p`
  opacity: 0.8;
`

const Date = styled.p`
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 0;
  text-align: right;
`

const Location = styled.p`
  margin-bottom: 0;
  text-align: right;
`

const LocationText = styled.span`
  opacity: 0.6;
`

const Title = styled.h3`
  margin-top: 0;
`

const EventCard = ({
  title,
  to,
  date,
  description,
  className,
  location,
  isEven,
}) => (
  <StyledCard className={className}>
    <StyledCardReference />
    <StyledCardContent className={isEven && "style-card-content-right"}>
      <Date>
        {date}
        <Emoji text=":spiral_calendar:" size={1} ml={`0.5em`} />
      </Date>
      <Location>
        <LocationText>{location}</LocationText>
        <Emoji text=":round_pushpin:" size={1} ml={`0.5em`} />
      </Location>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ButtonLink to={to}>View Event</ButtonLink>
    </StyledCardContent>
  </StyledCard>
)

export default EventCard
