import {
  Text,
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"
import { ButtonLink } from "@/components/Buttons"
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
    futureProofing: { src: "/roadmap/roadmap-future.png", width: 400, height: 260 },
    scaling: { src: "/roadmap/roadmap-transactions.png", width: 380, height: 260 },
    security: { src: "/roadmap/roadmap-security.png", width: 380, height: 260 },
    userExperience: { src: "/roadmap/roadmap-ux.png", width: 380, height: 260 },
  }
  const imgProps = data[image] ?? data.futureProofing

  return (
    <LinkBox
      as={Flex}
      direction="column"
      border="1px solid"
      borderColor="lightBorder"
    >
      <Center background="cardGradient" h="260px">
        <Image
          {...imgProps}
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
