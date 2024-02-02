import {
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import { Image } from "@/components/Image"

import futureProofing from "@/public/roadmap/roadmap-future.png"
import security from "@/public/roadmap/roadmap-security.png"
import scaling from "@/public/roadmap/roadmap-transactions.png"
import userExperience from "@/public/roadmap/roadmap-ux.png"

type RoadmapActionCardProps = {
  to: string
  alt: string
  image: string
  title: string
  description: string
  buttonText: string
}

const RoadmapActionCard = ({
  to,
  alt,
  image,
  title,
  description,
  buttonText,
}: RoadmapActionCardProps) => {
  const images = {
    futureProofing,
    scaling,
    security,
    userExperience,
  }
  const imgSrc = images[image] ?? images.futureProofing

  return (
    <LinkBox
      as={Flex}
      direction="column"
      border="1px solid"
      borderColor="lightBorder"
    >
      <Center background="cardGradient" h="260px">
        <Image src={imgSrc} alt={alt} style={{ objectFit: "contain" }} />
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
