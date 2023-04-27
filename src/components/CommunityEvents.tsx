//Libraries
import React, { useEffect, useState } from "react"
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react"

// Components
import Link from "./Link"

interface Event {
  date: string
  title: string
  calenderLink: string
}

const CommunityEvents = () => {
  const [pastEventData, setPastEventData] = useState<Array<Event>>([])
  const [upcomingEventData, setUpcomingEventData] = useState<Array<Event>>([])

  useEffect(() => {
    console.log("hello world")
  }, [])

  return (
    <Flex w="full" direction={{ base: "column", lg: "row" }}>
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
        direction={{ base: "column", lg: "row" }}
      >
        <Center w={{ base: "100%", lg: "50%" }} bg="layer2Gradient">
          <Text>Hello world</Text>
        </Center>
        <Center w={{ base: "100%", lg: "50%" }} bg="backgroundHighlight">
          <Text>Hello world</Text>
        </Center>
      </Flex>
    </Flex>
  )
}

export default CommunityEvents
