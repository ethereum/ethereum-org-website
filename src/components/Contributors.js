import React from "react"
import styled from "styled-components"

import ActionCard from "./ActionCard"
import data from "../data/contributors.json"

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

const Contributors = () => {
  return (
    <Container>
      {data.contributors
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((contributor, idx) => {
          return (
            <ContributorCard
              key={idx}
              image={contributor.avatar_url}
              to={contributor.profile}
              title={contributor.name}
            />
          )
        })}
    </Container>
  )
}

export default Contributors
