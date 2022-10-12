// Libraries
import React, { useEffect, useState } from "react"
import Countdown, { zeroPad } from "react-countdown"

// Components
import BannerNotification from "./BannerNotification"
import Emoji from "./Emoji"
import Link from "./Link"
import Translation from "./Translation"
import { Box, Center, IconButton } from "@chakra-ui/react"
import { MdClose } from "react-icons/md"

// Utils
import { getFreshData } from "../utils/cache"
import { TranslationKey } from "../utils/translations"

// Constants
import { GATSBY_FUNCTIONS_PATH } from "../constants"

interface CountdownRendererProps {
  days: number
  hours: number
  minutes: number
  seconds: number
  completed: boolean
}

interface BannerWrapperProps {
  isBannerVisible: boolean
  onClose: () => void
  children: JSX.Element
}

const BannerWrapper: React.FC<BannerWrapperProps> = ({
  onClose,
  isBannerVisible,
  children,
}) => {
  return (
    <BannerNotification shouldShow={isBannerVisible} position="relative">
      <Center paddingRight="2rem" flexWrap="wrap">
        <Emoji
          marginRight="1rem"
          flexShrink={0}
          text=":tada:"
          w="1rem"
          h="1rem"
        />
        {children}
      </Center>
      <IconButton
        aria-label="Close Banner"
        icon={<MdClose />}
        onClick={onClose}
        position="absolute"
        top="1.5"
        right="1.5"
        size="xs"
      />
    </BannerNotification>
  )
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
        <BannerWrapper onClose={handleClose} isBannerVisible={show}>
          <>
            <Translation
              id={"london-upgrade-banner-released" as TranslationKey}
            />
            <Box paddingLeft="5px">
              <Link to="/history/#london">
                <Translation id="learn-more" />
              </Link>
            </Box>
          </>
        </BannerWrapper>
      )
    } else {
      return (
        <BannerWrapper onClose={handleClose} isBannerVisible={show}>
          <>
            <Translation id={"london-upgrade-banner" as TranslationKey} />
            <Box paddingLeft="5px">
              {zeroPad(days, 2)}:{zeroPad(hours, 2)}:{zeroPad(minutes, 2)}:
              {zeroPad(seconds, 2)}!
            </Box>
            <Box paddingLeft="5px">
              <Link to="/history/#london">
                <Translation id="learn-more" />
              </Link>
            </Box>
          </>
        </BannerWrapper>
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
