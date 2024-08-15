import React from "react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { BsCalendar3 } from "react-icons/bs"
import { Box, Flex, Heading, Icon } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"

import { ButtonLink } from "./Buttons"
import Text from "./OldText"

const clearStyles = {
  content: '""',
  display: "block",
  width: "100%",
  clear: "both",
}

export type EventCardProps = {
  title: string
  href: string
  date: string
  startDate: string
  endDate: string
  description: string
  className?: string
  location: string
  imageUrl?: string
}

const EventCard = ({
  title,
  href,
  description,
  className,
  location,
  imageUrl,
  endDate,
  startDate,
}: EventCardProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-community")
  const formatedDate = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
  }).formatRange(
    // .replace(/-/g, "/") ==> Fixes Safari Invalid date
    new Date(startDate?.replace(/-/g, "/")),
    new Date(endDate?.replace(/-/g, "/"))
  )

  return (
    <Box
      className={className}
      position="relative"
      mt="0"
      _before={clearStyles}
      _after={clearStyles}
      w="full"
      h="full"
    >
      <Flex
        border="1px solid"
        borderColor="lightBorder"
        height={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
        rounded="base"
      >
        <Box>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            background={"grayBackground"}
            padding={2}
            gap={2}
            borderBottom="1px solid"
            borderColor="primary.base"
            roundedTop={"4px"}
          >
            <Icon as={BsCalendar3} boxSize={6} color="primary.base" />

            <Text color="primary.base" marginBottom={0} textAlign="end">
              {formatedDate}
            </Text>
          </Flex>

          {/* TODO : add image hostname to next config or add event image to public dir  */}
          <Flex
            alignItems="center"
            justifyContent="center"
            boxShadow="rgb(0 0 0 / 10%) 0px -1px 0px inset;"
          >
            <Image
              src={imageUrl || "/images/events/event-placeholder.png"}
              alt={title}
              w="full"
              height={{ base: "224px", xl: "124px" }}
              objectFit={"cover"}
              fallbackSrc="/images/events/event-placeholder.png"
            />
          </Flex>
          <Box padding={4}>
            <Box textAlign={"center"}>
              <Heading
                as="h3"
                fontSize={{ base: "md", md: "2xl" }}
                marginTop={0}
                lineHeight={1.4}
              >
                {title}
              </Heading>
              <Text as="span" opacity={0.6}>
                {location}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm">{description}</Text>
            </Box>
          </Box>
        </Box>
        <Box padding={4} paddingTop={0} width={"100%"}>
          <ButtonLink href={href} width={"100%"} variant="outline">
            {t("page-community-upcoming-events-view-event")}
          </ButtonLink>
        </Box>
      </Flex>
    </Box>
  )
}

export default EventCard
