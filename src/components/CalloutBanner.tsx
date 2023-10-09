import { Flex, FlexProps } from "@chakra-ui/react"
import type { StaticImageData } from "next/image"
import { Image } from "@/components/Image"
import Text from "@/components/OldText"
import OldHeading from "@/components/OldHeading"
// TODO: Re-enable after i18n implemented
// import Translation from "./Translation"

import type { TranslationKey } from "@/lib/types"

export interface IProps extends FlexProps {
  children?: React.ReactNode
  image: string | StaticImageData
  maxImageWidth?: number
  titleKey: TranslationKey
  descriptionKey: TranslationKey
  alt: string
}

const CalloutBanner: React.FC<IProps> = ({
  image,
  maxImageWidth,
  titleKey,
  descriptionKey,
  alt,
  children,
  ...restProps
}) => (
  <Flex
    as="aside"
    direction={{ base: "column", lg: "row-reverse" }}
    bg="layer2Gradient"
    p={{ base: 8, sm: 12 }}
    borderRadius="base"
    {...restProps}
  >
    <Image
      src={image}
      alt={alt}
      objectFit="contain"
      alignSelf="center"
      maxW={`${maxImageWidth}px`}
      mt={-24}
      mb={{ base: 0, lg: -24 }}
    />
    <Flex
      flexGrow={1}
      flexShrink={0}
      flexBasis="50%"
      direction="column"
      justifyContent="center"
      pl={{ base: 0, sm: 4, lg: 8 }}
      w={{ base: "full", lg: "inherit" }}
    >
      <OldHeading
        as="h2"
        mt={0}
        fontSize={{ base: "2xl", sm: "2rem" }}
        lineHeight="1.4"
      >
        {/* <Translation id={titleKey} /> */}
        {titleKey}
      </OldHeading>
      <Text fontSize="xl" w="90%" lineHeight="140%" mb={8} color="text200">
        {/* <Translation id={descriptionKey} /> */}
        {descriptionKey}
      </Text>
      {children}
    </Flex>
  </Flex>
)

export default CalloutBanner
