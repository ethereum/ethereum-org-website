import React, { useState } from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

import ButtonLink from "./ButtonLink"
import Icon from "./Icon"
import Link from "./Link"
import Modal from "./Modal"
import { ButtonSecondary } from "./SharedStyledComponents"
import { getLocaleTimestamp } from "../utils/time"

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  border-radius: 2px;
  padding: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    padding-top: 0rem;
    padding-left: 0rem;
    padding-right: 0rem;
    border-bottom: 0px solid ${(props) => props.theme.colors.border};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    border-bottom: 0px solid ${(props) => props.theme.colors.border};
  }
`

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: ${(props) => props.theme.fontSizes.s};
  }
`

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 0.5rem;
  border-radius: 50%;
`

const Info = styled.div`
  line-height: 130%;
  color: ${(props) => props.theme.colors.text200};
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const ContributorsButton = styled(ButtonSecondary)`
  background-color: ${(props) => props.theme.colors.background};
  margin-top: 0;
  height: 40px;
  border: 0px;
  &:hover {
    border: 0px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 1rem;
    margin-right: 0.5rem;
    justify-content: center;
    width: 50%;
  }
`

const GithubButton = styled(ButtonLink)`
  margin-top: 0;
  height: 40px;
  width: 50%;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const ButtonContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const GithubIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
`

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
`

const ContributorList = styled.ul`
  margin: 0;
  margin-top: 1.5rem;
  list-style-type: none;
`

const Contributor = styled.li`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 0;
`

const FileContributors = ({ gitCommits, className, editPath }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const intl = useIntl()

  const commits = gitCommits.map((commit) => {
    return commit.node
  })
  if (commits.length < 1) {
    return null
  }
  const lastCommit = commits[0]
  const lastContributor = lastCommit.author
  const uniqueContributors = commits.reduce(
    (res, cur) => {
      for (const contributor of res) {
        if (contributor.user.login === cur.author.user.login) {
          return res
        }
      }
      res.push(cur.author)
      return res
    },
    [lastContributor]
  )

  return (
    <div className={className}>
      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <ModalTitle>Contributors</ModalTitle>
        <div>Everyone who has contributed to this page – thank you!</div>
        <ContributorList>
          {uniqueContributors.map((contributor) => {
            return (
              <Contributor key={contributor.email}>
                <Avatar src={contributor.avatarUrl} alt={contributor.name} />
                <Link to={contributor.user.url}>@{contributor.user.login}</Link>
              </Contributor>
            )
          })}
        </ContributorList>
      </Modal>
      <Container>
        <LeftContent>
          <Avatar src={lastContributor.avatarUrl} alt={lastContributor.name} />
          <Info>
            Last edit:{" "}
            <Link to={lastContributor.user.url}>
              @{lastContributor.user.login}
            </Link>
            , {getLocaleTimestamp(intl.locale, lastCommit.committedDate)}
          </Info>
        </LeftContent>
        <ButtonContainer>
          <ContributorsButton onClick={() => setModalOpen(true)}>
            See contributors
          </ContributorsButton>
          {editPath && (
            <GithubButton to={editPath} isSecondary={true}>
              <ButtonContent>
                <GithubIcon name="github" /> <span>Edit page</span>
              </ButtonContent>
            </GithubButton>
          )}
        </ButtonContainer>
      </Container>
    </div>
  )
}

export default FileContributors
