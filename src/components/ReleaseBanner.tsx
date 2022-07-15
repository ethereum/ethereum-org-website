// Libraries
import React, { useEffect, useState } from "react"
import Countdown, { zeroPad } from "react-countdown"
import styled from "styled-components"

// Components
import BannerNotification from "./BannerNotification"
import Emoji from "./Emoji"
import Icon from "./Icon"
import Link from "./Link"
import Translation from "./Translation"

// Utils
import { getFreshData } from "../utils/cache"
import { TranslationKey } from "../utils/translations"

// Constants
import { GATSBY_FUNCTIONS_PATH } from "../constants"

const CloseIconContainer = styled.span`
  position: absolute;
  cursor: pointer;
  top: 1.5rem;
  right: 1.5rem;

  & > svg {
    fill: ${(props) => props.theme.colors.background};

    &:hover path {
      fill: ${(props) => props.theme.colors.background};
    }
  }
`

const StyledEmoji = styled(Emoji)`
  margin-right: 1rem;
  flex-shrink: 0;
`

const StyledBannerNotification = styled(BannerNotification)`
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  padding-right: 3rem;
`

const Span = styled.span`
  padding-left: 5px;
`

interface CountdownRendererProps {
  days: number
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

export interface IProps {
  storageKey: string
}

const ReleaseBanner: React.FC<IProps> = ({ storageKey }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(true)
  const [timeLeft, setTimeLeft] = useState<string>("0")

  useEffect(() => {
    setLoading(true)
    const fetchBlockInfo = async (): Promise<void> => {
      try {
        const data: string = await getFreshData(
          `${GATSBY_FUNCTIONS_PATH}/etherscanBlock`
        )
        setTimeLeft(data)
        setLoading(false)
      } catch (error) {
        // will console log if an error, but wont set loading to false so that banner
        // doesnt show up
        console.error(error)
      }
    }
    fetchBlockInfo()

    if (localStorage && localStorage.getItem(storageKey) !== null) {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [storageKey])

  const handleClose = (): void => {
    if (localStorage) {
      localStorage.setItem(storageKey, "true")
    }
    setShow(false)
  }

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRendererProps): React.ReactNode => {
    if (completed) {
      return (
        <StyledBannerNotification shouldShow={show}>
          <CloseIconContainer onClick={handleClose}>
            <Icon name="close" />
          </CloseIconContainer>
          <StyledEmoji size={2} text=":tada:" />
          <Translation
            id={"london-upgrade-banner-released" as TranslationKey}
          />
          <Span>
            <Link to="/history/#london">
              <Translation id="learn-more" />
            </Link>
          </Span>
        </StyledBannerNotification>
      )
    } else {
      return (
        <StyledBannerNotification shouldShow={show}>
          <CloseIconContainer onClick={handleClose}>
            <Icon name="close" />
          </CloseIconContainer>
          <StyledEmoji size={2} text=":tada:" />
          <Translation id={"london-upgrade-banner" as TranslationKey} />
          <Span>
            {zeroPad(days, 2)}:{zeroPad(hours, 2)}:{zeroPad(minutes, 2)}:
            {zeroPad(seconds, 2)}!
          </Span>
          <Span>
            <Link to="/history/#london">
              <Translation id="learn-more" />
            </Link>
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
