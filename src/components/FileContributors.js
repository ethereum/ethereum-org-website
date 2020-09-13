import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

import Button from "./Button"
import Icon from "./Icon"
import Link from "./Link"
import { FakeButtonSecondary } from "./SharedStyledComponents"
import { getLocaleTimestamp } from "../utils/time"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  padding: 0.5rem;
`

const LeftContent = styled.div`
  display: flex;
`
const RightContent = styled.div`
  display: flex;
`

const Avatar = styled.img`
  height: 51px;
  width: 51px;
  margin-right: 1rem;
`

const Info = styled.div``

const ContributorsButton = styled(FakeButtonSecondary)`
  background-color: ${(props) => props.theme.colors.background};
  margin-top: 0;
  margin-right: 1rem;
  display: flex;
  align-items: center;
`

const GithubButton = styled(Button)`
  margin-top: 0;
  display: flex;
  align-items: center;
`

const GithubIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
`

// TODO style mobile
// TODO modal pop to "View Contributors"
const FileContributors = ({ gitCommits, editPath }) => {
  const intl = useIntl()

  const commits = gitCommits.map((commit) => {
    return commit.node
  })
  const lastCommit = commits[0]
  console.log(lastCommit)
  const author = lastCommit.author
  return (
    <Container>
      <LeftContent>
        <Avatar src={author.avatarUrl} alt={author.name} />
        <Info>
          <div>
            Last edited{" "}
            {getLocaleTimestamp(intl.locale, lastCommit.committedDate)}
          </div>
          <div>
            <Link to={author.user.url}>@{author.user.login}</Link>
          </div>
        </Info>
      </LeftContent>
      <RightContent>
        <ContributorsButton>View Contributors</ContributorsButton>
        <GithubButton to={editPath} isSecondary={true}>
          <GithubIcon name="github" /> <span>Edit content</span>
        </GithubButton>
      </RightContent>
    </Container>
  )
  // return commits.map(commit => {

  // })
}

export default FileContributors
