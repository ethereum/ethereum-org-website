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

import futureProofing from "@/public/images/roadmap/roadmap-future.png"
import security from "@/public/images/roadmap/roadmap-security.png"
import scaling from "@/public/images/roadmap/roadmap-transactions.png"
import userExperience from "@/public/images/roadmap/roadmap-ux.png"

type RoadmapActionCardProps = {
  href: string
  alt: string
  image: string
  title: string
  description: string
  buttonText: string
}

const RoadmapActionCard = ({
  href,
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
        <LinkOverlay as={ButtonLink} href={href}>
          {buttonText}
        </LinkOverlay>
      </Flex>
    </LinkBox>
  )
}

export default RoadmapActionCard
