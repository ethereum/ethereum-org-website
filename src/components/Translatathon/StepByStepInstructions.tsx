import { Center, Flex, Text } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"

import { CROWDIN_PROJECT_URL } from "@/lib/constants"

import {
  APPLICATION_END_DATE,
  APPLICATION_START_DATE,
  APPLICATION_URL,
} from "./constants"

const instructions = [
  {
    title: "Read the rules and FAQs",
    description: "Get familiar with the rules, prizes and translation process",
    ctaLink: "/contributing/translation-program/translatathon/details/",
    ctaLabel: "Learn",
  },
  {
    title: "Submit your application",
    description:
      "Everyone needs to fill out the application form before the translation period starts!",
    ctaLink: APPLICATION_URL,
    ctaLabel: "Apply",
  },
  {
    title: "Register on Crowdin (translation platform)",
    description:
      "Join the ethereum.org project and familiarize yourself with Crowdin, where all the translations will take place",
    ctaLink: CROWDIN_PROJECT_URL,
    ctaLabel: "Join",
  },
  {
    title: "Join our Discord",
    description:
      "Attend the onboarding calls and workshops, stay up to date with the latest news or ask questions",
    ctaLink: "/discord/",
    ctaLabel: "Join",
  },
  {
    title: "Translate! August 9th to August 18th",
    description:
      "Translate content to earn points. Each word you translate counts towards your final score",
    ctaLink: CROWDIN_PROJECT_URL,
    ctaLabel: "Translate",
  },
  {
    title: "Wait for evaluations",
    description:
      "All translations will be evaluated for quality and machine translations will be rejected",
    ctaLink: null,
  },
  {
    title: "Claim your prizes",
    description: (
      <>
        Results will be announced on <strong>August 29th</strong>. Eligible
        participants will receive an email with prize claim instructions.
      </>
    ),
    ctaLink: null,
  },
]

export const StepByStepInstructions = () => {
  const appStartDate = new Date(APPLICATION_START_DATE)
  const appEndDate = new Date(APPLICATION_END_DATE)
  const todaysDate = new Date()
  const appLive = todaysDate >= appStartDate && todaysDate <= appEndDate

  return (
    <Flex w="full" flexDir="column">
      {instructions.map((instruction, index) => (
        <Flex
          key={index}
          w="full"
          justifyContent="space-between"
          p={4}
          borderBottom="1px solid"
          borderColor="body.light"
          gap={4}
          flexDir={{ base: "column", md: "row" }}
          alignItems={{ base: "left", md: "center" }}
        >
          <Flex
            gap={4}
            flexDir={{ base: "column", md: "row" }}
            alignItems={{ base: "left", md: "center" }}
          >
            <Center
              minWidth="46px"
              maxWidth="46px"
              h="46px"
              borderRadius={8}
              background="background.base"
              boxShadow="2px 6px 18px 0px rgba(0, 0, 0, 0.10)"
              p={1}
            >
              <Text fontSize="4xl" fontWeight="bold" color="primary.base">
                {index + 1}
              </Text>
            </Center>
            <Flex flexDir="column">
              <Text fontSize="xl" fontWeight="bold">
                {instruction.title}
              </Text>
              <Text>{instruction.description}</Text>
            </Flex>
          </Flex>
          {instruction.ctaLink ? (
            <Flex height="42px">
              <ButtonLink
                href={instruction.ctaLink}
                variant="outline"
                isDisabled={instruction.ctaLink === APPLICATION_URL && !appLive}
              >
                {instruction.ctaLabel}
              </ButtonLink>
            </Flex>
          ) : (
            <Flex w="140px" />
          )}
        </Flex>
      ))}
    </Flex>
  )
}
