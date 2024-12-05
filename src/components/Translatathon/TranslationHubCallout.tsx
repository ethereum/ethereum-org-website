import { ButtonLink } from "@/components/Buttons"
import { TwImage } from "@/components/Image"
import { Center, Flex } from "@/components/ui/flex"

import WalkingImage from "@/public/images/translatathon/walking.png"

export const TranslationHubCallout = ({ children }) => {
  return (
    <Flex className="align-stretch w-full flex-col gap-8 bg-background-highlight p-8 lg:flex-row">
      <Flex className="w-full flex-col">
        {children}
        <Flex>
          <ButtonLink href="/contributing/translation-program/translatathon/translatathon-hubs">
            Find out more on hubs
          </ButtonLink>
        </Flex>
      </Flex>
      <Center className="w-full">
        <TwImage
          src={WalkingImage}
          alt=""
          width={265}
          style={{ objectFit: "contain" }}
        />
      </Center>
    </Flex>
  )
}
