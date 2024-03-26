import { useTranslation } from "next-i18next"
import { Flex, type FlexProps } from "@chakra-ui/react"

import type { TranslationKey } from "@/lib/types"

import { Image, type ImageProps } from "@/components/Image"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"

export type CalloutBannerProps = FlexProps & {
  children?: React.ReactNode
  image: ImageProps["src"]
  imageWidth?: number
  titleKey: TranslationKey
  descriptionKey: TranslationKey
  alt: string
}

const CalloutBanner = ({
  image,
  imageWidth,
  titleKey,
  descriptionKey,
  alt,
  children,
  ...props
}: CalloutBannerProps) => {
  const { t } = useTranslation("page-staking")

  return (
    <Flex
      as="aside"
      direction={{ base: "column", lg: "row-reverse" }}
      bg="layer2Gradient"
      p={{ base: 8, sm: 12 }}
      borderRadius="base"
      {...props}
    >
      {image && (
        <Flex>
          <Image
            src={image}
            alt={alt}
            width={imageWidth}
            style={{
              objectFit: "contain",
            }}
            mx="auto"
            mt={-24}
            mb={{ base: 0, lg: -24 }}
          />
        </Flex>
      )}
      <Flex
        flexGrow={1}
        flexShrink={0}
        flexBasis="50%"
        direction="column"
        justifyContent="center"
        ps={{ base: 0, sm: 4, lg: 8 }}
        w={{ base: "full", lg: "inherit" }}
      >
        <OldHeading
          as="h2"
          mt={0}
          fontSize={{ base: "2xl", sm: "2rem" }}
          lineHeight="1.4"
        >
          {t(titleKey)}
        </OldHeading>
        <Text fontSize="xl" w="90%" lineHeight="140%" mb={8} color="text200">
          {t(descriptionKey)}
        </Text>
        {children}
      </Flex>
    </Flex>
  )
}

export default CalloutBanner
