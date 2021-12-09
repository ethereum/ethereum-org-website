import React from "react"
import styled from "styled-components"
import Emoji from "./Emoji"
import ButtonLink from "./ButtonLink"

const StyledCard = styled.div`
  display: flex;
  flex: 1 1 30%;
  max-width: 620px;
  min-width: 240px;
  margin: 1rem;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.ednBackground};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.5rem;
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

const EventCard = ({ title, to, date, description, className, location }) => (
  <StyledCard className={className}>
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
  </StyledCard>
)

export default EventCard
