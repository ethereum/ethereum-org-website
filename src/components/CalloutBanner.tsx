import { useTranslation } from "next-i18next"
import { Flex } from "@chakra-ui/react"

import type { TranslationKey } from "@/lib/types"

import { Image, type ImageProps } from "@/components/Image"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"

import { cn } from "@/lib/utils/cn"

export type CalloutBannerProps = React.HTMLAttributes<HTMLDivElement> & {
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
    <aside
      className={cn(
        "flex flex-col rounded p-8 sm:p-12 lg:flex-row-reverse",
        "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20"
      )}
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
    </aside>
  )
}

export default CalloutBanner
