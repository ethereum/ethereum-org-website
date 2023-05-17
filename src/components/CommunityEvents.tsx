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

  return (
    <Flex w="full" flexDirection={{ base: "column", lg: "row" }}>
      <Center w={{ base: "100%", lg: "40%" }} px={16}>
        <Box>
          <Heading>Join the ethereum.org community</Heading>
          <Text>
            Join almost <strong>40 000 members</strong> on our{" "}
            <Link to="/discord/">Discord server</Link>.
          </Text>
          <Text>
            Join our monthly community calls for exciting updates on
            Ethereum.org development and important ecosystem news. Get the
            chance to ask questions, share ideas and provide feedback - it's the
            perfect opportunity to be part of the thriving Ethereum community.
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
            Next event
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
                    {DateTime.fromISO(state.upcomingEventData[0].date)
                      .setLocale(language)
                      .toLocaleString({
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour12: false,
                        hour: "numeric",
                        minute: "numeric",
                      })}
                  </Text>
                  <Text color={"bodyLight"} fontSize="md">
                    ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                  </Text>
                  <Text fontSize="3xl" fontWeight="bold" mb={10}>
                    {state.upcomingEventData[0].title}
                  </Text>
                </>
              ) : (
                <>
                  <Text fontSize="3xl" fontWeight="bold" mb={8}>
                    No events planned
                  </Text>
                </>
              )}
              <Flex flexDirection="column" gap={6}>
                <DiscordButton />
                {state.upcomingEventData[0] && (
                  <Link
                    to={state.upcomingEventData[0].calenderLink}
                    fontWeight="700"
                  >
                    Add to calendar
                  </Link>
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
            Upcoming calls
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
              return (
                <Flex gap={6}>
                  <Text>
                    {DateTime.fromISO(item.date)
                      .setLocale(language)
                      .toLocaleString({
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </Text>
                  <Link to={item.calenderLink} fontWeight="700">
                    {item.title}
                  </Link>
                </Flex>
              )
            })
          ) : (
            <Text mx="auto">No upcoming calls</Text>
          )}
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Previous calls
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
              return (
                <Flex gap={6}>
                  <Text>
                    {DateTime.fromISO(item.date)
                      .setLocale(language)
                      .toLocaleString({
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </Text>
                  <Link to={item.pastEventLink} fontWeight="700">
                    {item.title}
                  </Link>
                </Flex>
              )
            })
          ) : (
            <Text mx="auto">There are no past calls</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CommunityEvents
