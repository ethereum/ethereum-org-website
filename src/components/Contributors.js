import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import ActionCard from "./ActionCard"
import Link from "./Link"
import data from "../data/contributors.json"

const contributors = data.contributors

const Emoji = styled(Twemoji)`
  margin-right: 0.5rem;
  & > img {
    width: 1em !important;
    height: 1em !important;
  }
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ContributorCard = styled(ActionCard)`
  max-width: 132px;
  margin: 0.5rem;

  .action-card-image-wrapper {
    min-height: 100px;
  }
  .action-card-image {
    width: 132px;
    height: 132px;
  }
  .action-card-content {
    padding: 1rem;
    h3 {
      font-size: ${(props) => props.theme.fontSizes.m};
    }
    p {
      margin-bottom: 0;
    }
  }
`

const EmojiRow = styled.div`
  display: flex;
`

// https://allcontributors.org/docs/en/emoji-key
const emojiMap = {
  a11y: ":wheelchair_symbol:",
  bug: ":bug:",
  code: ":laptop:",
  content: ":fountain_pen:",
  design: ":artist_palette:",
  doc: ":open_book:",
  ideas: ":thinking_face:",
  projectManagement: ":calendar:",
  review: ":eyes:",
  translation: ":globe_showing_europe_africa:",
}

const Contributors = () => {
  return (
    <Container>
      {contributors.map((contributor, idx) => {
        return (
          <ContributorCard
            key={idx}
            image={contributor.avatar_url}
            to={contributor.profile}
            title={contributor.name}
          >
            <EmojiRow>
              {contributor.contributions.map((contribution, idx) => {
                const emoji = emojiMap[contribution]
                return emoji ? <Emoji svg text={emoji} key={idx} /> : null
              })}
            </EmojiRow>
          </ContributorCard>
        )
      })}
    </Container>
  )
}

export default Contributors
