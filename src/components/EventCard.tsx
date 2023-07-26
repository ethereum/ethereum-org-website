import React from "react"
import Emoji from "./Emoji"
import ButtonLink from "./ButtonLink"
import { Box, Text, Heading } from "@chakra-ui/react"

const clearStyles = {
  content: '""',
  display: "block",
  width: "100%",
  clear: "both",
}

export interface IProps {
  title: string
  to: string
  date: string
  description: string
  className?: string
  location: string
  isEven: boolean
}

const EventCard: React.FC<IProps> = ({
  title,
  to,
  date,
  description,
  className,
  location,
  isEven,
}) => (
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
      left="50%"
      overflow="hidden"
      marginLeft="-12px"
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
      float={isEven ? "right" : { base: "right", md: "none" }}
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
              left: "inherit",
              right: "45%",
              borderLeft: 0,
              borderRight: "25px solid",
            }
          : {
              left: "45%",
              borderLeft: "25px solid",
              borderRight: 0,
            }),
        borderColor: "primary.base",
      }}
    >
      <Text color="primary.base" marginBottom={0} textAlign="right">
        {date}
        <Emoji text=":spiral_calendar:" fontSize="md" marginLeft={2} />
      </Text>
      <Text marginBottom={0} textAlign="right">
        <Text as="span" opacity={0.6}>
          {location}
        </Text>
        <Emoji text=":round_pushpin:" fontSize="md" marginLeft={2} />
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
