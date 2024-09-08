import { Box, Flex, Heading, Text } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"

import { CROWDIN_PROJECT_URL } from "@/lib/constants"

import {
  APPLICATION_END_DATE,
  APPLICATION_START_DATE,
  APPLICATION_URL,
} from "./constants"

export const dates = [
  {
    title: "Applications open",
    description:
      "Fill out the application form to participate and compete for prizes",
    startDate: new Date(APPLICATION_START_DATE),
    endDate: new Date(APPLICATION_END_DATE),
    link: APPLICATION_URL,
    linkText: "Apply",
  },
  {
    title: "Workshops",
    description:
      "Join our Discord to participate in onboarding calls and workshops and learn all about the Translatathon",
    startDate: new Date("2024-08-05T12:00:00Z"),
    endDate: new Date("2024-08-08T12:00:00Z"),
    link: "/discord/",
    linkText: "Prepare",
  },
  {
    title: "Translatathon",
    description:
      "The translation period - translate as much or as little as you want",
    startDate: new Date("2024-08-09T12:00:00Z"),
    endDate: new Date("2024-08-18T12:00:00Z"),
    link: CROWDIN_PROJECT_URL,
    linkText: "Translate",
  },
  {
    title: "Evaluation period",
    description:
      "Each translation will be evaluated by professional reviewers to verify translations were not done with AI tools and meet the minimum quality threshold",
    startDate: new Date("2024-08-19T12:00:00Z"),
    endDate: new Date("2024-08-28T12:00:00Z"),
    link: null,
    linkText: null,
  },
  {
    title: "Results announcement",
    description:
      "We will announce the results and winners on the ethereum.org community Call",
    startDate: new Date("2024-08-29T12:00:00Z"),
    endDate: null,
    link: null,
    linkText: null,
  },
]

export const DatesAndTimeline = () => {
  const todaysDate = new Date()

  return (
    <Flex direction="column" p={4} mb={16}>
      {dates.map((date, index) => {
        const isLive =
          todaysDate >= date.startDate &&
          (date.endDate ? todaysDate <= date.endDate : true)
        return (
          <Flex
            key={index}
            borderLeft={"1px solid"}
            borderColor={
              index === dates.length - 1 ? "transparent" : "primary.base"
            }
            px={4}
            pb={index === dates.length - 1 ? 0 : 16}
            gap={4}
          >
            <Flex>
              <Box
                w={8}
                h={8}
                bg={isLive ? "primary.base" : "primary.lowContrast"}
                borderRadius="full"
                ml={-8}
              />
            </Flex>
            <Flex direction="column" gap={6}>
              <Flex
                h={8}
                bg={isLive ? "primary.base" : "primary.lowContrast"}
                borderRadius="full"
                px={4}
                alignItems="center"
                color={isLive ? "background.base" : "body.base"}
              >
                <Text>
                  {date.startDate.toDateString()}{" "}
                  {date.endDate ? `- ${date.endDate.toDateString()}` : ""}
                </Text>
              </Flex>
              <Flex direction="column">
                <Heading as="h3" fontSize="2xl">
                  {date.title}
                </Heading>
                <Text>{date.description}</Text>
              </Flex>
              {date.link && (
                <Flex>
                  <ButtonLink
                    href={date.link}
                    mt={2}
                    variant="outline"
                    isDisabled={date.link === APPLICATION_URL && !isLive} // Application only
                  >
                    {date.linkText}
                  </ButtonLink>
                </Flex>
              )}
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}
