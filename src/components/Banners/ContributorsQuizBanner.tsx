import { Box, Flex, Heading, Text } from "@chakra-ui/react"

import { Image } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "../Buttons"

import PeopleLearning from "@/public/images/people-learning.png"

// TODO: refactor to use CalloutBanner component
function ContributorsQuizBanner(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside
      className={cn(
        "flex flex-col rounded md:flex-row",
        "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20"
      )}
      {...props}
    >
      <Flex
        flex="1 1 50%"
        position="relative"
        justify={{ base: "center", md: "end" }}
        align="end"
        minH={{ base: 200, md: "auto" }}
        px={{ base: 8, md: 0 }}
      >
        <Image
          position="absolute"
          src={PeopleLearning}
          alt="People learning about Ethereum"
          w="full"
          maxH="120%"
          style={{
            objectFit: "contain",
          }}
        />
        <Box hideFrom="md" borderBottom="1px solid #D3C5F1" w="full" />
      </Flex>
      <Flex
        flex="1 1 50%"
        flexDir="column"
        gap="8"
        py="8"
        ps="8"
        pe={{ base: 8, lg: 0 }}
      >
        <Flex gap="2" flexDir="column">
          <Heading size="lg">Unsure where to start?</Heading>
          <Text size="lg" color="body.base">
            Take a quick quiz and find out how you can contribute on
            ethereum.org.
          </Text>
        </Flex>
        <Box>
          <ButtonLink href="https://ethdotorg.typeform.com/contributor">
            Take a quiz
          </ButtonLink>
        </Box>
      </Flex>
    </aside>
  )
}

export default ContributorsQuizBanner
