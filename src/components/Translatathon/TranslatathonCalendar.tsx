import { useRouter } from "next/router"
import { FaDiscord } from "react-icons/fa"
import { Flex, Heading, Icon, Text } from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import InlineLink from "@/components/Link"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"

const matomoEvent = (buttonType: string) => {
  trackCustomEvent({
    eventCategory: "TranslatathonCalender",
    eventAction: "clicked",
    eventName: buttonType,
  })
}

const events = [
  {
    date: "2024-08-06T09:30:00Z",
    title: "Crowdin walkthrough + Q&A",
    calendarLink:
      "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MHJoczcybG42Y2R2YXFncDBwZmxvbzRoNjUgY185ZTRiMWIyNzYwNzQzNDYzODE2MTAwYTE2OWQxNDI0MzAzNTJhN2NmYzMzNDRiMWU3ODVkYjUyMzg1YzlmZDM2QGc&tmsrc=c_9e4b1b2760743463816100a169d142430352a7cfc3344b1e785db52385c9fd36%40group.calendar.google.com",
  },
  {
    date: "2024-08-07T16:00:00Z",
    title: "Crowdin walkthrough + Q&A",
    calendarLink:
      "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NGRpZWo3Y3E4a2d2dWVqMjdjNnFtZzZzZTEgY185ZTRiMWIyNzYwNzQzNDYzODE2MTAwYTE2OWQxNDI0MzAzNTJhN2NmYzMzNDRiMWU3ODVkYjUyMzg1YzlmZDM2QGc&tmsrc=c_9e4b1b2760743463816100a169d142430352a7cfc3344b1e785db52385c9fd36%40group.calendar.google.com",
  },
  {
    date: "2024-08-09T12:00:00Z",
    title: "Translatathon kickoff call",
    calendarLink:
      "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NjU5dDRoNW9yNG0waDM3bjY0dDJmNWx2dmsgY185ZTRiMWIyNzYwNzQzNDYzODE2MTAwYTE2OWQxNDI0MzAzNTJhN2NmYzMzNDRiMWU3ODVkYjUyMzg1YzlmZDM2QGc&tmsrc=c_9e4b1b2760743463816100a169d142430352a7cfc3344b1e785db52385c9fd36%40group.calendar.google.com",
  },
  {
    date: "2024-08-13T09:30:00Z",
    title: "Translatathon office hours",
    calendarLink:
      "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=N292aDBqNWRnb3BoY2lldXBmcDVsM2o4MjIgY185ZTRiMWIyNzYwNzQzNDYzODE2MTAwYTE2OWQxNDI0MzAzNTJhN2NmYzMzNDRiMWU3ODVkYjUyMzg1YzlmZDM2QGc&tmsrc=c_9e4b1b2760743463816100a169d142430352a7cfc3344b1e785db52385c9fd36%40group.calendar.google.com",
  },
  {
    date: "2024-08-15T15:00:00Z",
    title: "Translatathon office hours",
    calendarLink:
      "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NGJxazFsa2xjdm9ocmZnaGU0ZWZqbGIwNWEgY185ZTRiMWIyNzYwNzQzNDYzODE2MTAwYTE2OWQxNDI0MzAzNTJhN2NmYzMzNDRiMWU3ODVkYjUyMzg1YzlmZDM2QGc&tmsrc=c_9e4b1b2760743463816100a169d142430352a7cfc3344b1e785db52385c9fd36%40group.calendar.google.com",
  },
]

export const TranslatathonCalendar = () => {
  const { locale } = useRouter()

  return (
    <Flex w="full" flexDirection={{ base: "column", lg: "row" }} py={16}>
      <Flex
        w={{ base: "100%", lg: "50%" }}
        bg="layer2Gradient"
        px={8}
        py={16}
        textAlign="center"
        flexDir="column"
        gap={6}
      >
        <Heading as="h3" fontSize="2xl">
          Translatathon calls
        </Heading>
        <Text>
          Join us on the ethereum.org Discord for a series of onboarding calls
          and workshops where we’ll cover everything you need to know about the
          Translatathon, walk through using Crowdin and answer any questions you
          might have.
        </Text>
        <ButtonLink
          href="/discord/"
          gap={2}
          onClick={() => matomoEvent("discord")}
        >
          <Icon as={FaDiscord} fontSize={25} />
          Join Discord
        </ButtonLink>
      </Flex>
      <Flex
        w={{ base: "100%", lg: "50%" }}
        bg="background.highlight"
        p={8}
        flexDir="column"
      >
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Translatathon calls
        </Text>
        {events.map((event, index) => (
          <Flex gap={6} mb={4} key={index}>
            <Text>{getLocaleTimestamp(locale! as Lang, event.date)}</Text>
            <InlineLink href={event.calendarLink}>{event.title}</InlineLink>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
