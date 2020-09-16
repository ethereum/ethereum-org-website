import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import Pill from "./Pill"
import Link from "./Link"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    border-bottom: 0px;
  }
`

const PillContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`

const HorizontalContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  margin-top: -1.5rem;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text300};
  justify-content: flex-start;
`

const TagsContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`
const DataContainer = styled.div`
  margin-right: 1rem;
`

const IconEmoji = styled(Twemoji)`
  margin-right: 0.2rem;
`

const TutorialContributors = () => {
  return (
    <Container>
      <TagsContainer>
        <PillContainer>
          <Pill>Example</Pill>
          <Pill>Example</Pill>
          <Pill>Example</Pill>
        </PillContainer>
        <Pill isSecondary={true}>Advanced</Pill>
      </TagsContainer>
      <HorizontalContainer>
        <DataContainer>
          <IconEmoji svg text=":writing_hand:" /> author{" "}
        </DataContainer>
        <DataContainer>
          <IconEmoji svg text=":books:" /> published published published
          published published{" "}
        </DataContainer>
        <DataContainer>
          <IconEmoji svg text=":calendar:" /> time{" "}
        </DataContainer>
        <DataContainer>
          <IconEmoji svg text=":stopwatch:" /> Time min
        </DataContainer>
      </HorizontalContainer>
    </Container>
  )
}

export default TutorialContributors
