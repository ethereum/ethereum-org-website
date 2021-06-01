import React, { useState } from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled, { css } from "styled-components"
import { useQuery, gql } from "@apollo/client"

import ButtonLink from "./ButtonLink"
import Icon from "./Icon"
import Link from "./Link"
import Modal from "./Modal"
import Translation from "./Translation"
import { ButtonSecondary } from "./SharedStyledComponents"
import { getLocaleTimestamp } from "../utils/time"

const loadingStyles = css`
  font-size: 0;
  background: ${({ theme }) =>
    `linear-gradient(-90deg, ${theme.colors.lightBorder} 0%, ${theme.colors.searchBackgroundEmpty} 50%, ${theme.colors.lightBorder} 100%)`};
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in-out infinite;

  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

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

const SkeletonContainer = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 1;
  transition: opacity 0.15s ease-in-out;

  ${({ loading }) =>
    !loading &&
    `
    opacity: 0;
    pointer-events: none;
  `}
`

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: ${(props) => props.theme.fontSizes.s};
  }
`

const SkeletonLeftContent = styled(LeftContent)`
  flex: 1;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex: none;
  }
`

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 0.5rem;
  border-radius: 50%;
`

const SkeletonAvatar = styled.div`
  height: 40px;
  width: 40px;
  margin-right: 0.5rem;
  border-radius: 50%;
  ${loadingStyles}
`

const Info = styled.div`
  line-height: 130%;
  color: ${(props) => props.theme.colors.text200};
`

const SkeletonInfo = styled(Info)`
  ${loadingStyles}
  height: 40px;
  flex: 1;
  border-radius: 3px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const SkeletonButtonContainer = styled(ButtonContainer)`
  ${loadingStyles}
  width: 145px;
  border-radius: 3px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 1rem;
    justify-content: center;
    width: calc(50% - 2rem);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    height: 40px;
    width: 50%;
    margin-top: 1rem;
  }
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

  ${({ loading }) =>
    loading &&
    `
    visibility: hidden;
  `}
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
  overflow-y: scroll;
  max-height: 16rem;
`

const Contributor = styled.li`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 0;
`

const COMMIT_HISTORY = gql`
  query CommitHistory($relativePath: String) {
    repository(name: "ethereum-org-website", owner: "ethereum") {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            id
            history(path: $relativePath) {
              edges {
                node {
                  author {
                    name
                    email
                    avatarUrl(size: 100)
                    user {
                      login
                      url
                    }
                  }
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
`

const FileContributors = ({ relativePath, className, editPath }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const intl = useIntl()

  const { loading, error, data } = useQuery(COMMIT_HISTORY, {
    variables: { relativePath },
  })

  if (error) return null

  const commits = data?.repository?.ref?.target?.history?.edges?.map(
    (commit) => commit.node
  )

  const lastCommit = commits?.[0] || {}
  const lastContributor = lastCommit?.author || {}
  const uniqueContributors =
    commits?.reduce(
      (res, cur) => {
        for (const contributor of res) {
          const hasAuthorInfo = !!contributor.user && !!cur.author.user
          if (
            hasAuthorInfo &&
            contributor.user.login === cur.author.user.login
          ) {
            return res
          }
        }
        res.push(cur.author)
        return res
      },
      [lastContributor]
    ) || []

  return (
    <div className={className}>
      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <ModalTitle>
          <Translation id="contributors" />
        </ModalTitle>
        <div>
          <Translation id="contributors-thanks" />
        </div>
        <ContributorList>
          {uniqueContributors.map((contributor) => (
            <Contributor key={contributor.email}>
              <Avatar src={contributor.avatarUrl} alt={contributor.name} />
              {contributor.user && (
                <Link to={contributor.user.url}>@{contributor.user.login}</Link>
              )}
              {!contributor.user && <span>{contributor.name}</span>}
            </Contributor>
          ))}
        </ContributorList>
      </Modal>
      <Container>
        <SkeletonContainer loading={!!loading}>
          <SkeletonLeftContent>
            <SkeletonAvatar />
            <SkeletonInfo />
          </SkeletonLeftContent>
          <SkeletonButtonContainer />
        </SkeletonContainer>
        <LeftContent>
          <Avatar src={lastContributor.avatarUrl} alt={lastContributor.name} />
          <Info>
            <Translation id="last-edit" />:{" "}
            {lastContributor.user && (
              <Link to={lastContributor.user.url}>
                @{lastContributor.user.login}
              </Link>
            )}
            {!lastContributor.user && <span>{lastContributor.name}</span>},{" "}
            {getLocaleTimestamp(intl.locale, lastCommit.committedDate)}
          </Info>
        </LeftContent>
        <ButtonContainer>
          <ContributorsButton
            onClick={() => setModalOpen(true)}
            loading={loading}
          >
            <Translation id="see-contributors" />
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
