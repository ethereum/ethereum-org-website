import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Center, Flex } from "@/components/ui/flex"
import { LinkBox } from "@/components/ui/link-box"
import { LinkOverlay } from "@/components/ui/link-box"

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
    <LinkBox className="flex flex-col border">
      <Center className="h-[260px] bg-gradient-main">
        <Image src={imgSrc} alt={alt} style={{ objectFit: "contain" }} />
      </Center>
      <Flex className="flex-1 flex-col justify-between gap-4 p-6">
        <h3 className="text-2xl">{title}</h3>
        <p className="flex-1">{description}</p>
        <LinkOverlay asChild>
          <ButtonLink href={href}>{buttonText}</ButtonLink>
        </LinkOverlay>
      </Flex>
    </LinkBox>
  )
}

export default RoadmapActionCard
