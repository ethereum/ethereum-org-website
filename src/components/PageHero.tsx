import type { ReactNode } from "react"
import { Box, Center, Flex, Heading, Wrap, WrapItem } from "@chakra-ui/react"

import {
  Button,
  ButtonLink,
  type ButtonLinkProps,
  type IButtonProps as ButtonProps,
} from "@/components/Buttons"
import { Image, type ImageProps } from "@/components/Image"
import Text from "@/components/OldText"

import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

export type ButtonLinkType = Omit<ButtonLinkProps, "content"> & {
  content: ReactNode
  matomo: MatomoEventOptions
}

export type ButtonType = Omit<ButtonProps, "content"> & {
  content: ReactNode
  matomo: MatomoEventOptions
}

export type Content = {
  buttons?: ButtonLinkType[] | ButtonType[]
  title: ReactNode
  header: ReactNode
  subtitle: ReactNode
  image: ImageProps["src"]
  alt: string
}

export type PageHeroProps = {
  content: Content
  isReverse?: boolean
  children?: ReactNode
  className?: string
}

function isButtonLink(
  button: ButtonType | ButtonLinkType
): button is ButtonLinkType {
  return (button as ButtonLinkType).to !== undefined
}

const PageHero = ({
  content: { buttons, title, header, subtitle, image, alt },
  isReverse = false,
  children,
  className,
}: PageHeroProps) => (
  <Box py="4" px="8" width="full">
    <Flex
      justifyContent="space-between"
      mt="8"
      px={{ base: 0, lg: 16 }}
      direction={{ base: isReverse ? "column" : "column-reverse", lg: "row" }}
      className={className}
    >
      <Box
        maxW={{ base: "full", lg: "container.sm" }}
        pt={{ base: isReverse ? 0 : 8, lg: 32 }}
        pb={{ base: isReverse ? 8 : 0, lg: 32 }}
        ps={{ base: 0, lg: 8 }}
        me={{ base: 0, lg: 4 }}
      >
        <Heading
          as="h1"
          textTransform="uppercase"
          fontSize="md"
          fontWeight="normal"
          mt={{ base: 0, lg: 8 }}
          mb="4"
          color="text300"
          lineHeight={1.4}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          fontWeight="bold"
          fontSize={{ base: "2.5rem", lg: "5xl" }}
          maxW="full"
          mb="0"
          mt={{ base: 8, lg: 12 }}
          color="text00"
          lineHeight={1.4}
        >
          {header}
        </Heading>
        <Text
          fontSize={{ base: "xl", lg: "2xl" }}
          lineHeight={1.4}
          color="text200"
          mt="4"
          mb="8"
        >
          {subtitle}
        </Text>
        {buttons && (
          // FIXME: remove the `ul` override once removed the corresponding
          // global styles in `src/@chakra-ui/gatsby-plugin/styles.ts`
          <Wrap spacing="2" overflow="visible" sx={{ ul: { m: 0 } }}>
            {buttons.map((button, idx) => {
              if (isButtonLink(button)) {
                return (
                  <WrapItem key={idx}>
                    <ButtonLink
                      variant={button.variant}
                      to={button.to}
                      onClick={() =>
                        trackCustomEvent({
                          eventCategory: button.matomo.eventCategory,
                          eventAction: button.matomo.eventAction,
                          eventName: button.matomo.eventName,
                        })
                      }
                    >
                      {button.content}
                    </ButtonLink>
                  </WrapItem>
                )
              }

              if (button.toId) {
                return (
                  <WrapItem key={idx}>
                    <Button
                      variant={button.variant}
                      toId={button.toId}
                      onClick={() =>
                        trackCustomEvent({
                          eventCategory: button.matomo.eventCategory,
                          eventAction: button.matomo.eventAction,
                          eventName: button.matomo.eventName,
                        })
                      }
                    >
                      {button.content}
                    </Button>
                  </WrapItem>
                )
              }
            })}
          </Wrap>
        )}
        {children}
      </Box>
      <Center
        flex="1 1 50%"
        maxWidth={{ base: "560px", lg: "624px" }}
        mt={{ base: 0, lg: 12 }}
        ms={{ base: 0, lg: 12 }}
      >
        <Image
          src={image}
          sizes="100%"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
          alt={alt}
          priority
        />
      </Center>
    </Flex>
  </Box>
)

export default PageHero
