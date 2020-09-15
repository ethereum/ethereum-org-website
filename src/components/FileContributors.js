import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import Button from "./Button"
import Icon from "./Icon"
import Link from "./Link"
import { FakeButtonSecondary } from "./SharedStyledComponents"
import { getLocaleTimestamp } from "../utils/time"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { useKeyPress } from "../hooks/useKeyPress"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 2px;
  padding: 0.5rem;
  padding-bottom: 1rem;
  margin-top: -1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    border-top: 1px solid ${(props) => props.theme.colors.border};
    padding-top: 1rem;
  }
`

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 14px;
  }
`

const Avatar = styled.img`
  height: 32px;
  width: 32px;
  margin-right: 0.5rem;
  border-radius: 32px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    height: 24px;
    width: 24px;
  }
`

const Info = styled.div`
  line-height: 130%;
  color: ${(props) => props.theme.colors.text200};
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

const ContributorsButton = styled(FakeButtonSecondary)`
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
  }
`

const GithubButton = styled(Button)`
  margin-top: 0;
  height: 40px;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
`

const GithubIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
`

const StyledOverlay = styled(motion.div)`
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  will-change: opacity;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`

const Overlay = ({ isActive }) => {
  return (
    <StyledOverlay
      initial={false}
      animate={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1001 : -1 }}
      transition={{ duration: 0.2 }}
    />
  )
}

const ModalContainer = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  position: fixed;
  z-index: 1002;
  cursor: pointer;
  padding: 10% 0px;
  width: 100%;
  height: 100%;
`

const Modal = styled.div`
  padding: 1rem;
  height: auto;
  cursor: auto;
  max-height: 100%;
  max-width: 600px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgb(189, 189, 189);
  margin: 0px auto;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`

const ModalClose = styled.div``
const ModalCloseIcon = styled(Icon)`
  cursor: pointer;
`

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
`

const Emoji = styled(Twemoji)`
  & > img {
    width: 3em !important;
    height: 3em !important;
    margin-bottom: 0 !important;
  }
  margin-right: 1rem;
`

const ContributorList = styled.ul`
  margin: 0;
  margin-top: 2rem;
  list-style-type: none;
  border-top: 1px solid ${(props) => props.theme.colors.border};
`

const Contributor = styled.li`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`

const FileContributors = ({ gitCommits, className, editPath }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const intl = useIntl()
  const ref = useRef()

  // Close modal on outside clicks & `Escape` keypress
  useOnClickOutside(ref, () => setModalOpen(false))
  useKeyPress(`Escape`, () => setModalOpen(false))

  const toggleModal = (e) => {
    // If user clicks on "X" icon, close modal
    if (e.target.tagName === "path") {
      setModalOpen(false)
    } else {
      setModalOpen(true)
    }
  }

  const commits = gitCommits.map((commit) => {
    return commit.node
  })
  const lastCommit = commits[0]
  const lastContributor = lastCommit.author

  // Add all additional unique contributors
  const allContributors = [lastContributor]
  for (const commit of commits) {
    const author = commit.author
    for (const contributor of allContributors) {
      if (contributor.email === commit.author.email) {
        continue
      }
      allContributors.push(author)
    }
  }
  return (
    <div className={className}>
      <Overlay isActive={isModalOpen} />
      {isModalOpen && (
        <ModalContainer>
          <Modal ref={ref}>
            <Emoji svg text=":writing_hand:" />
            <ModalContent>
              <ModalTitle>Contributors</ModalTitle>
              <div>Everyone who has contributed to this page – thank you!</div>
              <ContributorList>
                {allContributors.map((contributor) => {
                  return (
                    <Contributor key={contributor.email}>
                      <Avatar
                        src={contributor.avatarUrl}
                        alt={contributor.name}
                      />
                      <Link to={contributor.user.url}>
                        @{contributor.user.login}
                      </Link>
                    </Contributor>
                  )
                })}
              </ContributorList>
            </ModalContent>
            <ModalClose onClick={toggleModal}>
              <ModalCloseIcon name="close" />
            </ModalClose>
          </Modal>
        </ModalContainer>
      )}
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
          <ContributorsButton onClick={toggleModal}>
            View Contributors
          </ContributorsButton>
          {editPath && (
            <GithubButton to={editPath} isSecondary={true}>
              <ButtonContent>
                <GithubIcon name="github" /> <span>Edit content</span>
              </ButtonContent>
            </GithubButton>
          )}
        </ButtonContainer>
      </Container>
    </div>
  )
}

export default FileContributors
