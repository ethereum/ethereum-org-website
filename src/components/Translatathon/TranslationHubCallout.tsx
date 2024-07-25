import { Flex } from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import { Image } from "@/components/Image"

import WalkingImage from "@/public/images/translatathon/walking.png"

export const TranslationHubCallout = ({ children }) => {
  return (
    <Flex
      w="full"
      align="stretch"
      bg="background.highlight"
      direction={{ base: "column", lg: "row" }}
      p={8}
    >
      <Flex w="full" direction="column">
        {children}
        <Flex>
          <ButtonLink href="/contributing/translation-program/translatathon/local-communities">
            Find out more on hubs
          </ButtonLink>
        </Flex>
      </Flex>
      <Flex w="full">
        <Image
          src={WalkingImage}
          alt=""
          maxW={265}
          style={{ objectFit: "contain" }}
        />
      </Flex>
    </Flex>
  )
}
