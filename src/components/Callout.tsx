import { Flex, type FlexProps, type ImageProps } from "@chakra-ui/react"

// TODO: Re-enable once i18n is implemented
// import Translation from "./Translation"
import Emoji from "@/components/Emoji"
import Text from "@/components/OldText"
import OldHeading from "@/components/OldHeading"
import { Image } from "@/components/Image"

import type { TranslationKey } from "@/lib/types"

export interface IProps extends FlexProps {
  children?: React.ReactNode
  image?: ImageProps["src"]
  emoji?: string
  alt?: string
  titleKey: TranslationKey
  descriptionKey: TranslationKey
  className?: string
}

const Callout: React.FC<IProps> = ({
  image,
  emoji,
  alt,
  titleKey,
  descriptionKey,
  children,
  className,
  ...rest
}) => (
  <Flex
    as="aside"
    direction="column"
    bgGradient="linear-gradient(
    49.21deg,
    rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%
  )"
    p={6}
    m={4}
    mt={32}
    mb={{ base: 16, lg: 4 }}
    borderRadius="base"
    className={className}
    {...rest}
  >
    {image && (
      <Image
        src={image}
        alt={alt || ""}
        mt={-40}
        alignSelf="center"
        w={263}
        h={200}
        maxW="263px"
        minH="200px"
      />
    )}
    <Flex direction="column" justify="space-between" mt={10} h="full">
      <div>
        {emoji && <Emoji text={emoji} fontSize="5xl" />}
        <OldHeading as="h3" fontSize="2xl" lineHeight={1.4}>
          {/* TODO: Re-enable after i18n implemented and remove placeholders */}
          {/* <Translation id={titleKey} /> */}
          {titleKey}
        </OldHeading>
        <Text color="text200" fontSize="xl" lineHeight="140%">
          {/* <Translation id={descriptionKey} /> */}
          {descriptionKey}
        </Text>
      </div>
      {children}
    </Flex>
  </Flex>
)

export default Callout
