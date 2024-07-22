import { Flex, Heading, Text } from "@chakra-ui/react"

import { Image } from "@/components/Image"

import dogeImage from "@/public/images/doge-computer.png"
import settlementImage from "@/public/images/translatathon/settlement.png"
import mergeImage from "@/public/images/upgrades/merge.png"

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
          Translatathon in a nutshell
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
            What is a Translatathon?
          </Heading>
          <Text>
            The goal is to translate website content and help make ethereum.org
            more accessible to non-English speakers, raise awareness of the
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
            src={mergeImage}
            alt=""
            w="327"
            style={{ objectFit: "contain" }}
          />
        </Flex>
        <Flex w="full" direction="column" gap={2} alignSelf="center">
          <Heading as="h3" fontSize="2xl">
            Why we do it
          </Heading>
          <Text>
            The goal is to translate website content and help make ethereum.org
            more accessible to non-English speakers, raise awareness of the
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
            Why should you participate
          </Heading>
          <Text>
            The goal is to translate website content and help make ethereum.org
            more accessible to non-English speakers, raise awareness of the
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
    </Flex>
  )
}
