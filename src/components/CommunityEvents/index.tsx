//Libraries
import React from "react"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react"
import { FaDiscord } from "react-icons/fa"
import { DateTime, DateTimeFormatOptions } from "luxon"

// Components
import { ButtonLink } from "../Buttons"
import InlineLink from "../Link"
import Translation from "../Translation"
import Text from "../OldText"
import OldHeading from "../OldHeading"

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
    <Grid gap={6} templateColumns="auto 1fr" mb={4}>
      <GridItem>
        <Text color="body.medium" m={0}>
          {renderEventDateTime(date, language, params)}
        </Text>
      </GridItem>
      <GridItem>
        <InlineLink to={calendarLink} onClick={() => matomoEvent(type)}>
          {title}
        </InlineLink>
      </GridItem>
    </Grid>
  )
}

const CommunityEvents = () => {
  const { language } = useI18next()
  const { t } = useTranslation()
  const { pastEventData, upcomingEventData, loading, hasError } =
    useCommunityEvents()

  const reversedUpcomingEventData = upcomingEventData.slice().reverse()
  const reversedPastEventData = pastEventData.slice().reverse()

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
          <OldHeading>
            <Translation id="community-events-content-heading" />
          </OldHeading>
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
          px={8}
          py={16}
          textAlign="center"
          flexDir="column"
        >
          {loading ? (
            <Text>
              <Translation id="loading" />
            </Text>
          ) : (
            <Flex direction="column" h="full" gap={8}>
              {hasError ? (
                <Text color="error.base">
                  <Translation id="loading-error-try-again-later" />
                </Text>
              ) : reversedUpcomingEventData.length ? (
                <Box flex={1}>
                  <Text fontSize="3xl" fontWeight="bold" lineHeight={1.4}>
                    {reversedUpcomingEventData[0].title}
                  </Text>
                  <Text m={0} fontSize="xl">
                    {renderEventDateTime(
                      reversedUpcomingEventData[0].date,
                      language
                    )}
                  </Text>
                  <Text color="body.medium" fontSize="md">
                    ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                  </Text>
                </Box>
              ) : (
                <Text fontSize="3xl" fontWeight="bold" mb={8}>
                  <Translation id="community-events-no-events-planned" />
                </Text>
              )}
              <Flex flexDirection="column" gap={2}>
                <ButtonLink
                  to="/discord/"
                  gap={2}
                  onClick={() => matomoEvent("discord")}
                >
                  <Icon as={FaDiscord} fontSize={25} />
                  Join Discord
                </ButtonLink>
                {reversedUpcomingEventData[0] && (
                  <InlineLink
                    to={reversedUpcomingEventData[0].calendarLink}
                    onClick={() => matomoEvent("Add to calendar")}
                    fontWeight={700}
                  >
                    {t("community-events-add-to-calendar")}
                  </InlineLink>
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
        <Flex
          w={{ base: "100%", lg: "50%" }}
          bg="background.highlight"
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
            <Text color="error.base">
              <Translation id="loading-error-try-again-later" />
            </Text>
          ) : reversedUpcomingEventData.slice(1).length ? (
            reversedUpcomingEventData.slice(1).map((item) => {
              return <Event event={item} language={language} type="upcoming" />
            })
          ) : (
            <Text mx="auto">
              <Translation id="community-events-no-upcoming-calls" />
            </Text>
          )}
          <Text fontSize="lg" fontWeight="bold" mb={2} mt={4}>
            <Translation id="community-events-previous-calls" />
          </Text>
          <Divider mb={4} />
          {loading ? (
            <Text>
              <Translation id="loading" />
            </Text>
          ) : hasError ? (
            <Text color="error.base">
              <Translation id="loading-error-try-again-later" />
            </Text>
          ) : reversedPastEventData.length ? (
            reversedPastEventData.map((item) => {
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
