import { Center, Flex } from "@chakra-ui/react"

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
      gap={8}
    >
      <Flex w="full" direction="column">
        {children}
        <Flex>
          <ButtonLink href="/contributing/translation-program/translatathon/translatathon-hubs">
            Find out more on hubs
          </ButtonLink>
        </Flex>
      </Flex>
      <Center w="full">
        <Image
          src={WalkingImage}
          alt=""
          maxW={265}
          style={{ objectFit: "contain" }}
        />
      </Center>
    </Flex>
  )
}
