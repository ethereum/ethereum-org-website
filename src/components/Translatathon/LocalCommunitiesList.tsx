import { Box, Flex, Text } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"

import Emoji from "../Emoji"

const localCommunitiesData = [
  {
    emojiString: "🇷🇴",
    lumaLink: "https://lu.ma/b7m1nyid",
    location: "Bucharest, Romania",
    eventName: "Ethereum Translatathon Bucharest 🌐🐬",
  },
  {
    emojiString: "🇪🇹",
    lumaLink: "https://lu.ma/zi092c8v",
    location: "Ababa, Ethiopia",
    eventName: "Eth Translatathon",
  },
  {
    emojiString: "🇷🇸",
    lumaLink: "https://lu.ma/ehd86ohx",
    location: "Belgrade, Serbia",
    eventName: "Ethereum Translatathon — ETH Belgrade",
  },
]

export const LocalCommunitiesList = () => {
  return (
    <Flex gap={4} direction="column">
      {localCommunitiesData.map((community, index) => (
        <Flex
          bg="background.highlight"
          key={index}
          direction={{ base: "column-reverse", md: "row" }}
          p={6}
          gap={8}
          justifyContent={"space-between"}
        >
          <Flex direction="column" gap={6}>
            <Flex
              borderRadius={80}
              bg="background.base"
              px={5}
              py={1}
              w="fit-content"
            >
              <Text fontWeight="bold">{community.location}</Text>
            </Flex>
            <Box>
              <Text size="lg" fontWeight="bold">
                {community.eventName}
              </Text>
            </Box>
            <Flex>
              <ButtonLink
                href={community.lumaLink}
                variant="outline"
                color="body.base"
              >
                Register here
              </ButtonLink>
            </Flex>
          </Flex>
          <Flex minW="90">
            <Emoji fontSize={90} text={community.emojiString} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}
