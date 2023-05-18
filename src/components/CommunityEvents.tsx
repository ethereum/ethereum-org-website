//Libraries
import React, { useEffect, useState } from "react"
import { useI18next } from "gatsby-plugin-react-i18next"
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react"
import { FaDiscord } from "react-icons/fa"
import { DateTime } from "luxon"

// Components
import ButtonLink from "./ButtonLink"
import Link from "./Link"
import Translation from "./Translation"

// Constants
import { GATSBY_FUNCTIONS_PATH } from "../constants"

// Utils
import { getData } from "../utils/cache"

interface Event {
  date: string
  title: string
  calenderLink: string
  pastEventLink: string | undefined
}

interface State {
  pastEventData: Array<Event>
  upcomingEventData: Array<Event>
  loading: boolean
  hasError: boolean
}

const DiscordButton = () => {
  return (
    <ButtonLink to={"/discord/"} gap={2}>
      <Icon as={FaDiscord} fontSize={25} />
      Join Discord
    </ButtonLink>
  )
}

const CommunityEvents = () => {
  const { language } = useI18next()
  const [state, setState] = useState<State>({
    pastEventData: [],
    upcomingEventData: [],
    loading: true,
    hasError: false,
  })

  useEffect(() => {
    try {
      const fetchCalendarData = async () => {
        const events = await getData(`${GATSBY_FUNCTIONS_PATH}/calendarEvents`)
      }
      fetchCalendarData()

      const pastEventData: Array<Event> = []
      const upcomingEventData: Array<Event> = []

      setTimeout(
        () =>
          setState({
            ...state,
            pastEventData,
            upcomingEventData,
            loading: false,
            hasError: false,
          }),
        500
      )
    } catch {
      setState({ ...state, loading: false, hasError: true })
    }
  }, [])

  const renderEventDateTime = (date, language) => {
    return DateTime.fromISO(date).setLocale(language).toLocaleString({
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    })
  }

  const renderEventLink = (link, title) => {
    return (
      <Link to={link} fontWeight="700">
        {title}
      </Link>
    )
  }

  const renderEvent = (event, language) => {
    const { date, title, calenderLink } = event
    return (
      <Flex gap={6}>
        <Text>{renderEventDateTime(date, language)}</Text>
        {renderEventLink(calenderLink, title)}
      </Flex>
    )
  }

  return (
    <Flex w="full" flexDirection={{ base: "column", lg: "row" }}>
      <Center w={{ base: "100%", lg: "40%" }} px={16}>
        <Box>
          <Heading>
            <Translation id="community-events-content-heading" />
          </Heading>
          <Text>
            <Translation id="community-events-content-1" />
          </Text>
          <Text>
            <Translation id="community-events-content-2" />
          </Text>
        </Box>
      </Center>
      <Flex
        w={{ base: "100%", lg: "60%" }}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Flex
          w={{ base: "100%", lg: "50%" }}
          bg="layer2Gradient"
          p={12}
          textAlign="center"
          flexDir="column"
        >
          <Text fontSize="md" fontWeight="bold">
            <Translation id="community-events-next-event" />
          </Text>
          {state.loading ? (
            <Text>
              <Translation id="loading" />
            </Text>
          ) : (
            <Box>
              {state.hasError ? (
                <Text color="error">
                  <Translation id="loading-error-try-again-later" />
                </Text>
              ) : state.upcomingEventData.length ? (
                <>
                  <Text m={0} fontSize="xl">
                    {renderEventDateTime(
                      state.upcomingEventData[0].date,
                      language
                    )}
                  </Text>
                  <Text color={"bodyLight"} fontSize="md">
                    ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                  </Text>
                  <Text fontSize="3xl" fontWeight="bold" mb={10}>
                    {state.upcomingEventData[0].title}
                  </Text>
                </>
              ) : (
                <Text fontSize="3xl" fontWeight="bold" mb={8}>
                  <Translation id="community-events-no-events-planned" />
                </Text>
              )}
              <Flex flexDirection="column" gap={6}>
                <DiscordButton />
                {state.upcomingEventData[0] &&
                  renderEventLink(
                    state.upcomingEventData[0].calenderLink,
                    "Add to calendar"
                  )}
              </Flex>
            </Box>
          )}
        </Flex>
        <Flex
          w={{ base: "100%", lg: "50%" }}
          bg="backgroundHighlight"
          p={12}
          flexDir="column"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            <Translation id="community-events-upcoming-calls" />
          </Text>
          <Divider mb={4} />
          {state.loading ? (
            <Text>
              <Translation id="loading" />
            </Text>
          ) : state.hasError ? (
            <Text color="error">
              <Translation id="loading-error-try-again-later" />
            </Text>
          ) : state.upcomingEventData.slice(1).length ? (
            state.upcomingEventData.slice(1).map((item) => {
              return renderEvent(item, language)
            })
          ) : (
            <Text mx="auto">
              <Translation id="community-events-no-upcoming-calls" />
            </Text>
          )}
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            <Translation id="community-events-previous-calls" />
          </Text>
          <Divider mb={4} />
          {state.loading ? (
            <Text>
              <Translation id="loading" />
            </Text>
          ) : state.hasError ? (
            <Text color="error">
              <Translation id="loading-error-try-again-later" />
            </Text>
          ) : state.pastEventData.length ? (
            state.pastEventData.map((item) => {
              return renderEvent(item, language)
            })
          ) : (
            <Text mx="auto">
              <Translation id="community-events-there-are-no-past-calls" />
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CommunityEvents
