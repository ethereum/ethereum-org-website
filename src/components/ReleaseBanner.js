// Libraries
import React, { useEffect, useState } from "react"
import Countdown, { zeroPad } from "react-countdown"
import styled from "styled-components"

// Components
import BannerNotification from "./BannerNotification"
import Emoji from "./Emoji"
import Translation from "./Translation"

// Utils
import { getFreshData } from "../utils/cache"

const StyledEmoji = styled(Emoji)`
  margin-right: 1rem;
  flex-shrink: 0;
`

const StyledBannerNotification = styled(BannerNotification)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Span = styled.span`
  padding-left: 5px;
`

const ReleaseBanner = () => {
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState("0")

  useEffect(() => {
    setLoading(true)
    // Skip APIs when not in production
    if (process.env.NODE_ENV !== "production") {
      setTimeLeft("324737.2")
    } else {
      const fetchBlockInfo = async () => {
        try {
          const data = await getFreshData("/.netlify/functions/etherscanBlock")
          setTimeLeft(data)
          setLoading(false)
        } catch (error) {
          // will console log if an error, but wont set loading to false so that banner
          // doesnt show up
          console.error(error)
        }
      }
      fetchBlockInfo()
    }
  }, [])

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <StyledBannerNotification>
          <StyledEmoji size={2} text=":tada:" />
          <Translation id="london-upgrade-banner-released" />
          <Span>
            <a href="/history/#london">
              <Translation id="learn-more" />
            </a>
          </Span>
        </StyledBannerNotification>
      )
    } else {
      return (
        <StyledBannerNotification>
          <StyledEmoji size={2} text=":tada:" />
          <Translation id="london-upgrade-banner" />
          <Span>
            {zeroPad(days, 2)}:{zeroPad(hours, 2)}:{zeroPad(minutes, 2)}:
            {zeroPad(seconds, 2)}!
          </Span>
          <Span>
            <a href="/history/#london">
              <Translation id="learn-more" />
            </a>
          </Span>
        </StyledBannerNotification>
      )
    }
  }

  return loading ? null : (
    <Countdown
      date={Date.now() + parseFloat(timeLeft) * 1000}
      renderer={renderer}
    />
  )
}

export default ReleaseBanner
