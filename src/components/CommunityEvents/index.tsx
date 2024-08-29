import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaDiscord } from "react-icons/fa"
import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react"

import type { Lang } from "@/lib/types"
import type { CommunityEvent } from "@/lib/interfaces"

import { ButtonLink } from "@/components/Buttons"
import InlineLink from "@/components/Link"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"

const matomoEvent = (buttonType: string) => {
  trackCustomEvent({
    eventCategory: "CommunityEventsWidget",
    eventAction: "clicked",
    eventName: buttonType,
  })
}

type EventProps = {
  event: CommunityEvent
  type: "upcoming" | "past"
}

const Event = ({ event, type }: EventProps) => {
  const { locale } = useRouter()
  const { date, title, calendarLink } = event
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  return (
    <Grid gap={6} templateColumns="auto 1fr" mb={4}>
      <GridItem>
        <Text color="body.medium" m={0}>
          {getLocaleTimestamp(locale! as Lang, date, options)}
        </Text>
      </GridItem>
      <GridItem>
        <InlineLink href={calendarLink} onClick={() => matomoEvent(type)}>
          {title}
        </InlineLink>
      </GridItem>
    </Grid>
  )
}

type CommunityEventsProps = {
  events: {
    pastEventData: CommunityEvent[]
    upcomingEventData: CommunityEvent[]
  }
}

const CommunityEvents = ({ events }: CommunityEventsProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-index")
  const { pastEventData, upcomingEventData } = events

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
      id="community-events"
    >
      <Center w={{ base: "100%", lg: "40%" }}>
        <Box pe={8} ps={{ base: 8, lg: 0 }}>
          <OldHeading>
            {t("page-index:community-events-content-heading")}
          </OldHeading>
          <Text>
            <Translation id="page-index:community-events-content-1" />
          </Text>
          <Text>{t("page-index:community-events-content-2")}</Text>
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
          <Flex direction="column" h="full" gap={8}>
            {reversedUpcomingEventData.length ? (
              <Box flex={1}>
                <Text fontSize="3xl" fontWeight="bold" lineHeight={1.4}>
                  {reversedUpcomingEventData[0].title}
                </Text>
                <Text m={0} fontSize="xl">
                  {getLocaleTimestamp(
                    locale! as Lang,
                    reversedUpcomingEventData[0].date,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour12: false,
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </Text>
                <Text color="body.medium" fontSize="md">
                  ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                </Text>
              </Box>
            ) : (
              <Text fontSize="3xl" fontWeight="bold" mb={8}>
                {t("page-index:community-events-no-events-planned")}
              </Text>
            )}
            <Flex flexDirection="column" gap={2}>
              <ButtonLink
                href="/discord/"
                gap={2}
                onClick={() => matomoEvent("discord")}
              >
                <Icon as={FaDiscord} fontSize={25} />
                Join Discord
              </ButtonLink>
              {reversedUpcomingEventData[0] && (
                <InlineLink
                  href={reversedUpcomingEventData[0].calendarLink}
                  onClick={() => matomoEvent("Add to calendar")}
                  fontWeight={700}
                >
                  {t("community-events-add-to-calendar")}
                </InlineLink>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w={{ base: "100%", lg: "50%" }}
          bg="background.highlight"
          p={8}
          flexDir="column"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {t("page-index:community-events-upcoming-calls")}
          </Text>
          <Divider mb={4} />
          {reversedUpcomingEventData.slice(1).length ? (
            reversedUpcomingEventData.slice(1).map((item, idx) => {
              return <Event key={idx} event={item} type="upcoming" />
            })
          ) : (
            <Text mx="auto">
              {t("page-index:community-events-no-upcoming-calls")}
            </Text>
          )}
          <Text fontSize="lg" fontWeight="bold" mb={2} mt={4}>
            {t("page-index:community-events-previous-calls")}
          </Text>
          <Divider mb={4} />
          {reversedPastEventData.length ? (
            reversedPastEventData.map((item, idx) => {
              return <Event key={idx} event={item} type="past" />
            })
          ) : (
            <Text mx="auto">
              {t("page-index:community-events-there-are-no-past-calls")}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CommunityEvents
