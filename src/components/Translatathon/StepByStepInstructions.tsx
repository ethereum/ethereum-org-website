import { Center, Flex, Text } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"

const instructions = [
  {
    title: "Read the rules and FAQs",
    description:
      "Get familiar with the rules, prizes and translation process",
    cta: "/translatathon/details",
    ctaLabel: "Learn",
  },
  {
    title: "Submit your application",
    description:
      "Everyone needs to fill out the application form before the translation period starts!",
    cta: "https://gtly.to/Mql-w3Gs_",
    ctaLabel: "Apply",
  },
  {
    title: "Register on Crowdin (translation platform)",
    description:
      "Join the ethereum.org project and familiarize yourself with Crowdin, where all the translations will take place",
    cta: "https://crowdin.com/project/ethereum-org",
    ctaLabel: "Join",
  },
  {
    title: "Join our Discord",
    description:
      "Attend the onboarding calls and workshops, stay up to date with the latest news or ask questions",
    cta: "https://discord.com/invite/ethereum-org",
    ctaLabel: "Join",
  },
  {
    title: "Translate! August 9th to August 18th",
    description:
      "Translate content to earn points. Each word you translate counts towards your final score",
    cta: "https://crowdin.com/project/ethereum-org",
    ctaLabel: "Translate",
  },
  {
    title: "Wait for evaluations",
    description:
      "All translations will be evaluated for quality and machine translations will be rejected",
    cta: null,
  },
  {
    title: "Claim your prizes",
    description:
      "Results will be announced on **August 29th**. Eligible participants will receive an email with prize claim instructions.",
    cta: null,
  },
]

export const StepByStepInstructions = () => {
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
          {instruction.cta ? (
            <Flex height="42px">
              <ButtonLink href={instruction.cta} variant="outline">
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
