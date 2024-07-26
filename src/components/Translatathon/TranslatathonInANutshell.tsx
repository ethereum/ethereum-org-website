import { Flex, Heading, Text } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import { Image } from "@/components/Image"

import Link from "../Link"

import dogeImage from "@/public/images/doge-computer.png"
import futureImage from "@/public/images/future_transparent.png"
import settlementImage from "@/public/images/translatathon/settlement.png"

export const TranslatathonInANutshell = () => {
  return (
    <Flex
      direction="column"
      py={16}
      px={8}
      bgGradient="linear-gradient(
        49.21deg,
        rgba(127, 127, 213, 0.2) 19.87%,
        rgba(134, 168, 231, 0.2) 58.46%,
        rgba(145, 234, 228, 0.2) 97.05%
      )"
    >
      <Flex m="auto">
        <Heading as="h2" fontSize="3xl" mb={8}>
          Translatathon essentials
        </Heading>
      </Flex>
      <Flex
        w="full"
        direction={{ base: "column", md: "row" }}
        align="flex-start"
        p={8}
        gap={8}
      >
        <Flex w="full" direction="column" gap={2} alignSelf="center">
          <Heading as="h3" fontSize="2xl">
            Earn points
          </Heading>
          <Text>
            Translate ethereum.org and ecosystem content to earn points and
            compete with other participants. 1 translated word = 1 point
          </Text>
        </Flex>
        <Flex w="full" justifyContent="center">
          <Image
            src={settlementImage}
            alt=""
            w="327"
            style={{ objectFit: "contain" }}
          />
        </Flex>
      </Flex>
      <Flex
        w="full"
        direction={{ base: "column-reverse", md: "row" }}
        align="flex-start"
        p={8}
        gap={8}
      >
        <Flex w="full" justifyContent="center">
          <Image
            src={futureImage}
            alt=""
            w="327"
            style={{ objectFit: "contain" }}
          />
        </Flex>
        <Flex w="full" direction="column" gap={2} alignSelf="center">
          <Heading as="h3" fontSize="2xl">
            Human translations only
          </Heading>
          <Text>
            Using machine translation is forbidden! All translations will be
            reviewed and evaluated, and participants using machine translation
            will be automatically disqualified and not be eligible to claim
            prizes (see{" "}
            <Link href="/contributing/translation-program/translatathon/terms-and-conditions/">
              terms and conditions
            </Link>
            )
          </Text>
        </Flex>
      </Flex>
      <Flex
        w="full"
        direction={{ base: "column", md: "row" }}
        align="flex-start"
        p={8}
        gap={8}
      >
        <Flex w="full" direction="column" gap={2} alignSelf="center">
          <Heading as="h3" fontSize="2xl">
            Focus on untranslated lines only
          </Heading>
          <Text>
            Translate strings that do not have any suggested translations yet.
            Do not translate strings that have already been translated and
            approved
          </Text>
        </Flex>
        <Flex w="full" justifyContent="center">
          <Image
            src={dogeImage}
            alt=""
            w="327"
            style={{ objectFit: "contain" }}
          />
        </Flex>
      </Flex>
      <Flex width="full" justifyContent="center">
        <ButtonLink href="/contributing/translation-program/translatathon/details">
          Details and rules
        </ButtonLink>
      </Flex>
    </Flex>
  )
}
