//Libraries
import React, { ComponentProps } from "react"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react"
import { FaDiscord } from "react-icons/fa"
import { DateTime, DateTimeFormatOptions } from "luxon"

// Components
import ButtonLink from "../ButtonLink"
import Link from "../Link"
import Translation from "../Translation"

// Utils
import { trackCustomEvent } from "../../utils/matomo"

// Hooks
import {
  type Event as EventType,
  useCommunityEvents,
} from "./useCommunityEvents"

const matomoEvent = (buttonType: string) => {
  trackCustomEvent({
    eventCategory: "CommunityEventsWidget",
    eventAction: "clicked",
    eventName: buttonType,
  })
}

const renderEventDateTime = (
  date: string,
  language: string,
  params: DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  }
) => {
  return DateTime.fromISO(date).setLocale(language).toLocaleString(params)
}

const EventLink = (props: ComponentProps<typeof Link>) => (
  <Link fontWeight="700" {...props} />
)

interface EventProps {
  event: EventType
  language: string
  type: "upcoming" | "past"
}

const Event = ({ event, language, type }: EventProps) => {
  const { date, title, calendarLink } = event
  const params: DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  return (
    <Grid gap={6} templateColumns="auto 1fr">
      <GridItem>
        <Text>{renderEventDateTime(date, language, params)}</Text>
      </GridItem>
      <GridItem>
        <EventLink to={calendarLink} onClick={() => matomoEvent(type)}>
          {title}
        </EventLink>
      </GridItem>
    </Grid>
  )
}

const CommunityEvents = () => {
  const { language } = useI18next()
  const { t } = useTranslation()
  const { pastEventData, upcomingEventData, loading, hasError } =
    useCommunityEvents()

  return (
    <Flex
      w="full"
      flexDirection={{ base: "column", lg: "row" }}
      p={{
        base: "0",
        sm: "2rem 0 0",
        lg: "2rem 2rem 0",
      }}
    >
      <Center w={{ base: "100%", lg: "40%" }}>
        <Box pr={8} pl={{ base: 8, lg: 0 }}>
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
          p={8}
          textAlign="center"
          flexDir="column"
        >
          <Text fontSize="md" fontWeight="bold">
            <Translation id="community-events-next-event" />
          </Text>
          {loading ? (
            <Text>
              <Translation id="loading" />
            </Text>
          ) : (
            <Box>
              {hasError ? (
                <Text color="error">
                  <Translation id="loading-error-try-again-later" />
                </Text>
              ) : upcomingEventData.length ? (
                <>
                  <Text m={0} fontSize="xl">
                    {renderEventDateTime(upcomingEventData[0].date, language)}
                  </Text>
                  <Text color={"bodyLight"} fontSize="md">
                    ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                  </Text>
                  <Text fontSize="3xl" fontWeight="bold" mb={10}>
                    {upcomingEventData[0].title}
                  </Text>
                </>
              ) : (
                <Text fontSize="3xl" fontWeight="bold" mb={8}>
                  <Translation id="community-events-no-events-planned" />
                </Text>
              )}
              <Flex flexDirection="column" gap={6}>
                <ButtonLink
                  to="/discord/"
                  gap={2}
                  onClick={() => matomoEvent("discord")}
                >
                  <Icon as={FaDiscord} fontSize={25} />
                  Join Discord
                </ButtonLink>
                {upcomingEventData[0] && (
                  <EventLink
                    to={upcomingEventData[0].calendarLink}
                    onClick={() => matomoEvent("Add to calendar")}
                  >
                    {t("community-events-add-to-calendar")}
                  </EventLink>
                )}
              </Flex>
            </Box>
          )}
        </Flex>
        <Flex
          w={{ base: "100%", lg: "50%" }}
          bg="backgroundHighlight"
          p={8}
          flexDir="column"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            <Translation id="community-events-upcoming-calls" />
          </Text>
          <Divider mb={4} />
          {loading ? (
            <Text>
              <Translation id="loading" />
            </Text>
          ) : hasError ? (
            <Text color="error">
              <Translation id="loading-error-try-again-later" />
            </Text>
          ) : upcomingEventData.slice(1).length ? (
            upcomingEventData.slice(1).map((item) => {
              return <Event event={item} language={language} type="upcoming" />
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
          {loading ? (
            <Text>
              <Translation id="loading" />
            </Text>
          ) : hasError ? (
            <Text color="error">
              <Translation id="loading-error-try-again-later" />
            </Text>
          ) : pastEventData.length ? (
            pastEventData.map((item) => {
              return <Event event={item} language={language} type="past" />
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
