import React, { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"

import Emoji from "./Emoji"
import ButtonLink from "./ButtonLink"
import Icon from "./Icon"
import Pill from "./Pill"
import { trackCustomEvent } from "../utils/matomo"

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  overflow: hidden;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column-reverse;
    border: none;
  }
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const AvatarContainer = styled.div`
  display: flex;
  > :first-child {
    margin-left: 0;
  }
`

const Avatar = styled.div`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  background: ${(props) => props.theme.colors.searchBorder};
  border: 0.5px solid ${(props) => props.theme.colors.background};
  margin-left: -1rem;
  background: url(${({ url }) => url}) no-repeat center;
  background-size: contain;
  overflow: hidden;
`

const Content = styled.div`
  margin-bottom: 0;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  white-space: normal; /* override dropdown style */
  margin-bottom: 0.5rem;
`

const StyledRow = styled.div`
  display: flex;
  align-items: center;
`

const Description = styled.p`
  opacity: 0.8;
  margin-left: 1rem;
  margin-bottom: 0;
`

const DiscordDescription = styled.p`
  opacity: 0.8;
  margin-left: 0.25rem;
  margin-bottom: 0;
`

const ContentContainer = styled.div`
  padding-bottom: 1rem;
`

const TopContent = styled.div`
  margin: 1rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    margin: 0;
    margin-bottom: 1.5rem;
  }
  margin-bottom: 1.5rem;
`

const Online = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.success400};
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.buttonColor};
  margin-left: 0.5rem;
`

const ButtonContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.m}) {
    padding: 0 1rem;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const DiscordStats = styled.div`
  background: ${(props) => props.theme.colors.ednBackground};
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    border-radius: 8px;
    flex-direction: column;
  }
`

const StyledPill = styled(Pill)`
  background: ${({ theme }) => theme.colors.primary100};
  display: flex;
  color: ${({ theme }) => theme.colors.black300};
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    display: none;
  }
`

const TitleRow = styled(Row)`
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const mentors = [
  {
    username: "taekikz",
    avatar_url:
      "https://cdn.discordapp.com/widget-avatars/h0TgJhUDc55mfAqHse16OJDouoEK-kT7ymtekdpy1G0/juSyzONMqWVbP71ufIDWslyKSJTiofQkRXLoHmX0oG5jwayaV4kWg2d1MF0l7T5EuIYegQZbsyd10xpEmREkgS9zSXo8-8vLJtdAolEAUVNWnQ1F7ROD01SDVh1XHerKByN8f9wv4sgOBA",
  },
  {
    username: "Sundeep Charan Ramkumar",
    avatar_url:
      "https://cdn.discordapp.com/widget-avatars/1rnO2M7ZN_5p8VIJpzpeBeUluKuh7JJ8cuOXRlt0s8M/dwg7A4Gv5m3KIomwXwcJq7Hig3a81ELB_pcoeDYIX0NR7UjWcBp8EpvNQCetHTTANVAthIHXfha4_nJEyEOKE9hW5GTDSOmTF2mKlim45DouaeLsQKXQpEH2dm2QxymvKjD31akrol9Ceg",
  },
  {
    username: "James Young | Collab.Land",
    avatar_url:
      "https://cdn.discordapp.com/widget-avatars/d_nJKKzBW2esc8ZabWGV5MskiAcEDwsFMnAjCniXSvY/P65p7NEwloRvVdHlsJKWZROUx79PbMWc0WNNglcPbkLuOLcglac2m8O2ILfSjd-m7ZWIYB1q7mi1D_907V3svdXzjUGmhGF0ZsH6HIzZYcLgr2tBbgcDnFrROCLOUwTT22jf3ekpTUbHHg",
  },
  {
    username: "OdLny",
    avatar_url:
      "https://cdn.discordapp.com/widget-avatars/ggA5gq6eus9NHcn9SY-95WfHsE_AVEGJbjyPEm0ef5k/a5d-DP4VbxMPNi7YVfx1fUs5Sf7isAkshy_OLxK_RqCcrSw1jcxgbN8w9wsW35wERJICfm9_Aqb9lArOn31aeLfTwnjBerFoyuJDMkwH8C7U_bjHxgum8JDLEPgYfpNhqS1IKc9HugZJaw",
  },
  {
    username: "solangegueiros",
    avatar_url:
      "https://cdn.discordapp.com/widget-avatars/D1iv9sqHTZl0SKOCxiShdUqRi3wUkT-9vv1lcFg4e_o/zmXhSAiVfVEftw456ipXH1j7LyzcbPN_EAasrZ03f0O8DVCAOygLiCsoan21ZAa5M4lJPYIT5p-YviQVrNnlH5dk1a_U-N_ku7dYEbQffyb4vIXxc4E1EjRcA_JH92mLjQVaSeTRtmdNqw",
  },
  {
    username: "austingriffith",
    avatar_url:
      "https://cdn.discordapp.com/widget-avatars/fT6zHmg2LM4rfDh-oB2RqccsYYlFyGqtUdjd8rn1MRQ/dobjHIToD-ZSROaTJqR9qA3LSuOXeJbx_iMrO0m7MjXUokZmN_U-mw0LMqxMaJqhpQIM4yg-10Qb83jDuNxpOEIEggksAm-hXuWQ2G6roxSNG_wr_KkZ4e_cRyt96n8MVfaYt-TbjJmy0g",
  },
  {
    username: "Joseph53",
    avatar_url:
      "https://cdn.discordapp.com/widget-avatars/Rx5GhtYBLCVSo4Iz9ecthirFM82UYZ--FW-l6MXWbbE/tn6WzS6X6N0LaGMB1-xiz-vxDL2_DBVKWCrndbZ_vzGqQSE5K2uY6IYjTByOvnX00pCl6HsJicO7f0ti-iweWfbsbqP0IjxBlTbLBOr-GHbpvzw0_1h1Ce2v0nCV94pwKjn6iZfduPPUZQ",
  },
  {
    username: "Roberto | dOrg",
    avatar_url:
      "https://cdn.discordapp.com/widget-avatars/UJ84u0GoYdUGQ2FLwXBdS3RaSURla47gQZIJZNoukQw/hBlRs3ViWrutn8NvTzBczNXz6ucaKPLnmjX2xIqpdSYSSqNDmW3Y9R_36VsqCqJMXyAvnG4HSrGluhVyPxa4r_eFPYgRTQo2Nb7tzIIquFvpmUBso4bf5iQv9ILSf0VQ3-Y3ndjMcQzrifPv",
  },
]

const Help = ({ className }) => {
  const [onlineCount, setOnlineCount] = useState(0)
  const [onlineMentors, setOnlineMentors] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(
          "https://discord.com/api/guilds/809505658248101948/widget.json"
        )
        setOnlineCount(response.data.presence_count)
        const mentorAvatars = mentors.map((mentor) => mentor.avatar_url)
        const onlineMentors = response.data.members.filter(
          (user) =>
            (user.status === "online" || user.status === "idle") &&
            mentorAvatars.includes(user.avatar_url)
        )
        const remaining = 5 - onlineMentors.length
        if (remaining > 0) {
          const pushItem = response.data.members.splice(0, remaining)
          onlineMentors.push(...pushItem)
        }
        setOnlineMentors(onlineMentors)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  const trackClick = () => {
    trackCustomEvent({
      eventCategory: `Enter Ethereum`,
      eventAction: `Clicked`,
      eventName: window.location.pathname,
    })
  }

  return (
    <StyledCard className={className}>
      <>
        <DiscordStats>
          <AvatarContainer>
            {onlineMentors.map(({ avatar_url }, idx) => (
              <Avatar url={avatar_url} key={idx} />
            ))}
          </AvatarContainer>
          <StyledRow>
            <Online />
            <DiscordDescription>
              <strong>{onlineCount}</strong> folks online
            </DiscordDescription>
          </StyledRow>
        </DiscordStats>
      </>
      <ContentContainer>
        <TopContent>
          <TitleRow>
            <Content>
              <strong>Need some help?</strong> Join the Enter Ethereum Discord
              for support.
            </Content>
            <StyledPill className="help-pill">
              NEW{" "}
              <Emoji
                size={2}
                mt="0.125rem"
                mr="0"
                mb="-0.325rem"
                ml="0.5rem"
                text=":sparkles:"
              />
            </StyledPill>
          </TitleRow>
          <Row>
            <Emoji size={2} text=":earth_globe_asia-australia:" />
            <Description>Multilingual support</Description>
          </Row>
          <Row>
            <Emoji size={2} text=":mage:" />
            <Description>Experts in every topic</Description>
          </Row>
          <Row>
            <Emoji size={2} text=":rainbow:" />
            <Description>Friendly vibes</Description>
          </Row>
        </TopContent>
        <ButtonContainer onClick={trackClick}>
          <StyledButtonLink to="https://discord.gg/5PzSpyKTVM">
            Enter Ethereum <StyledIcon size={`20`} name="discord" />
          </StyledButtonLink>
        </ButtonContainer>
      </ContentContainer>
    </StyledCard>
  )
}

export default Help
