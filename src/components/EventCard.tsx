import React from "react"
import { Box, Heading } from "@chakra-ui/react"

import { ButtonLink } from "./Buttons"
import Emoji from "./Emoji"
import Text from "./OldText"

const clearStyles = {
  content: '""',
  display: "block",
  width: "100%",
  clear: "both",
}

export type EventCardProps = {
  title: string
  to: string
  date: string
  description: string
  className?: string
  location: string
  isEven: boolean
}

const EventCard = ({
  title,
  to,
  date,
  description,
  className,
  location,
  isEven,
}: EventCardProps) => (
  <Box
    className={className}
    position="relative"
    marginTop={{ base: "30px", md: 0 }}
    _before={clearStyles}
    _after={clearStyles}
  >
    <Box
      w="24px"
      h="24px"
      position="absolute"
      top="0"
      insetInlineStart="50%"
      overflow="hidden"
      ms="-12px"
      backgroundColor="primary.base"
      display={{ base: "none", md: "block" }}
    />
    <Box
      width={{ base: "100%", md: "45%" }}
      padding={6}
      backgroundColor="ednBackground"
      borderRadius="sm"
      border="1px solid"
      borderColor="lightBorder"
      float={isEven ? "inline-end" : { base: "inline-end", md: "none" }}
      marginTop={isEven ? { base: 0, md: "-25%" } : 0}
      _before={{
        content: '""',
        position: "absolute",
        top: "10px",
        width: 0,
        height: "3px",
        display: { base: "none", md: "inline" },
        ...(isEven
          ? {
              insetInlineStart: "inherit",
              insetInlineEnd: "45%",
              borderInlineStart: 0,
              borderInlineEnd: "25px solid",
            }
          : {
              insetInlineStart: "45%",
              borderInlineStart: "25px solid",
              borderInlineEnd: 0,
            }),
        borderColor: "primary.base",
      }}
    >
      <Text color="primary.base" marginBottom={0} textAlign="end">
        {date}
        <Emoji text=":spiral_calendar:" fontSize="md" ms={2} />
      </Text>
      <Text marginBottom={0} textAlign="end">
        <Text as="span" opacity={0.6}>
          {location}
        </Text>
        <Emoji text=":round_pushpin:" fontSize="md" ms={2} />
      </Text>
      <Heading as="h3" marginTop={0} fontWeight="semibold" lineHeight={1.4}>
        {title}
      </Heading>
      <Text opacity={0.8}>{description}</Text>
      <ButtonLink to={to}>View Event</ButtonLink>
    </Box>
  </Box>
)

export default EventCard
