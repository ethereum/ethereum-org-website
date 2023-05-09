//Libraries
import React, { useEffect, useState } from "react"
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

// Components
import ButtonLink from "./ButtonLink"
import Link from "./Link"
import Translation from "./Translation"

interface Event {
  date: string
  title: string
  calenderLink: string
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
  const [state, setState] = useState<State>({
    pastEventData: [],
    upcomingEventData: [],
    loading: true,
    hasError: false,
  })

  useEffect(() => {
    try {
      setTimeout(
        () => setState({ ...state, loading: false, hasError: false }),
        500
      )
    } catch {
      setState({ ...state, loading: false, hasError: true })
    }
  }, [])

  return (
    <Flex w="full" flexDirection={{ base: "column", lg: "row" }}>
      <Center w={{ base: "100%", lg: "40%" }} p={16}>
        <Box>
          <Heading>Join the ethereum.org community</Heading>
          <Text>
            Join almost <strong>40 000 members</strong> on our{" "}
            <Link to="https://discord.gg/CetY6Y4">Discord server</Link>.
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
        <Box
          w={{ base: "100%", lg: "50%" }}
          bg="layer2Gradient"
          p={12}
          textAlign="center"
          display="flex"
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
                  <Text>Test</Text>
                  <Text>
                    ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                  </Text>
                </>
              ) : (
                <>
                  <Text fontSize="3xl" fontWeight="bold" mb={8}>
                    No events planned
                  </Text>
                </>
              )}
              <DiscordButton />
            </Box>
          )}
        </Box>
        <Box
          w={{ base: "100%", lg: "50%" }}
          bg="backgroundHighlight"
          p={12}
          display="flex"
          flexDir="column"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Upcoming
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
          ) : (
            <Text mx="auto">No upcoming calls</Text>
          )}
          <Text fontSize="lg" fontWeight="bold" mb={2} mt={18}>
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
          ) : (
            <Text mx="auto">There are no past calls</Text>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export default CommunityEvents
