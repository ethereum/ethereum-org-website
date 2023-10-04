import React from "react"
import {
  Text,
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"
import { ButtonLink } from "../Buttons"
import { Image } from "@/components/Image"

interface IProps {
  to: string
  alt: string
  image: string
  title: string
  description: string
  buttonText: string
}

const RoadmapActionCard: React.FC<IProps> = ({
  to,
  alt,
  image,
  title,
  description,
  buttonText,
}) => {
  const data = {
    futureProofing: "/roadmap/roadmap-future.png",
    scaling: "/roadmap/roadmap-transactions.png",
    security: "/roadmap/roadmap-security.png",
    userExperience: "/roadmap/roadmap-ux.png",
  }
  const imgSrc = data[image] ?? data.futureProofing

  return (
    <LinkBox
      as={Flex}
      direction="column"
      border="1px solid"
      borderColor="lightBorder"
    >
      <Center background="cardGradient" h="260px">
        <Image
          src={imgSrc}
          alt={alt}
          objectFit="contain"
        />
      </Center>
      <Flex p={6} flex="1" flexDir="column" justify="space-between" gap={4}>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text flex="1">{description}</Text>
        <LinkOverlay as={ButtonLink} href={to}>
          {buttonText}
        </LinkOverlay>
      </Flex>
    </LinkBox>
  )
}

export default RoadmapActionCard
