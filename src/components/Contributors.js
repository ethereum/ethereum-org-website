import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import Link from "./Link"
import data from "../data/contributors.json"

const contributors = data.contributors

const Emoji = styled(Twemoji)`
  margin-right: 0.5rem;
`

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  list-style-image: none;
`

const Contributor = styled.li`
  flex: 1 0 200px;
  display: flex;
  flex-direction: column;
`

const Image = styled.img`
  width: 100px;
  height: 100px;
`

const EmojiRow = styled.div`
  display: flex;
`

// `contributor` object:
// {
//   "login": "ExodusActual",
//   "name": "ExodusActual",
//   "avatar_url": "https://avatars3.githubusercontent.com/u/56446532?v=4",
//   "profile": "https://github.com/ExodusActual",
//   "contributions": [
//     "translation"
//   ]
// },

// TODO map out all contribution types
// https://allcontributors.org/docs/en/emoji-key
const emojiMap = {
  code: ":laptop:",
  bug: ":bug:",
  translation: ":bug:",
}

// TODO style Contributor cards
const Contributors = () => {
  return (
    <Container>
      {contributors.map((contributor, idx) => {
        return (
          <Contributor key={idx}>
            <Image src={contributor.avatar_url} />
            <Link to={contributor.profile}>{contributor.name}</Link>
            <EmojiRow>
              {contributor.contributions.map((contribution, idx) => {
                const emoji = emojiMap[contribution]
                return emoji ? <Emoji svg text={emoji} key={idx} /> : null
              })}
            </EmojiRow>
          </Contributor>
        )
      })}
    </Container>
  )
}

export default Contributors
