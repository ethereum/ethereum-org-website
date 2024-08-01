import { useRouter } from "next/router"
import { FaGithub } from "react-icons/fa"
import { Center, Flex, Icon } from "@chakra-ui/react"

import Emoji from "./Emoji"
import { BaseLink, LinkProps } from "./Link"
import Text from "./OldText"

type GitHubRepo = {
  stargazerCount: number
  url: string
}

type GitStarsProps = Omit<LinkProps, "href" | "href"> & {
  gitHubRepo: GitHubRepo
  hideStars: boolean
}

const GitStars = ({ gitHubRepo, hideStars, ...props }: GitStarsProps) => {
  const { locale } = useRouter()
  // Use Intl.NumberFormat to format the number for locale
  const starsString = Intl.NumberFormat(locale, {
    compactDisplay: "short",
  }).format(gitHubRepo.stargazerCount)

  return (
    <BaseLink
      href={gitHubRepo.url}
      hideArrow
      ms="auto"
      textDecoration="none"
      {...props}
    >
      <Flex
        background="lightBorder"
        textDecoration="none"
        border="1px solid"
        borderColor="lightBorder"
        borderRadius="base"
        color="text"
        _hover={{
          boxShadow: "0 0 1px var(--eth-colors-primary-base)",
          path: { fill: "primary.base" },
        }}
      >
        {hideStars ? (
          <Icon as={FaGithub} m={1} />
        ) : (
          <>
            <Center
              w="36px"
              justifyContent="space-between"
              fontSize="s"
              mx="0.325rem"
            >
              <Icon as={FaGithub} />
              <Emoji text=":star:" />
            </Center>
            <Text
              fontSize="0.8125rem"
              px="0.325rem"
              my="0"
              background="searchBackgroundEmpty"
            >
              {starsString}
            </Text>
          </>
        )}
      </Flex>
    </BaseLink>
  )
}

export default GitStars
