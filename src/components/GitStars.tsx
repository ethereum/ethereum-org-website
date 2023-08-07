import React from "react"
import { Icon, Text, Center, Flex } from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"
import Emoji from "./Emoji"
import Link from "./Link"

export interface GitHubRepo {
  stargazerCount: number
  url: string
}

export interface IProps {
  gitHubRepo: GitHubRepo
  className?: string
  hideStars: boolean
}

const GitStars: React.FC<IProps> = ({ gitHubRepo, className, hideStars }) => {
  // Stringify with commas
  let starsString = gitHubRepo.stargazerCount.toString()
  const rgx = /(\d+)(\d{3})/
  while (rgx.test(starsString)) {
    starsString = starsString.replace(rgx, "$1,$2")
  }

  return (
    <Link className={className} to={gitHubRepo.url} hideArrow>
      <Flex
        background="lightBorder"
        textDecoration="none"
        border="1px solid"
        borderColor="lightBorder"
        borderRadius="base"
        float="right"
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
    </Link>
  )
}

export default GitStars
