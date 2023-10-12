import React, { ReactNode } from "react"
import { Box, Flex, Heading, Wrap, WrapItem } from "@chakra-ui/react"

import { IGatsbyImageData } from "gatsby-plugin-image"

import { Button, IButtonProps, ButtonLink, IButtonLinkProps } from "./Buttons"
import Text from "./OldText"

import { MatomoEventOptions, trackCustomEvent } from "../utils/matomo"
import GatsbyImage from "./GatsbyImage"

export interface IButtonLink extends Omit<IButtonLinkProps, "content"> {
  content: ReactNode
  matomo: MatomoEventOptions
}

export interface IButton extends Omit<IButtonProps, "content"> {
  content: ReactNode
  matomo: MatomoEventOptions
}

export interface IContent {
  buttons?: Array<IButtonLink | IButton>
  title: ReactNode
  header: ReactNode
  subtitle: ReactNode
  image: IGatsbyImageData
  alt: string
}

export interface IProps {
  content: IContent
  isReverse?: boolean
  children?: ReactNode
  className?: string
}

function isButtonLink(button: IButton | IButtonLink): button is IButtonLink {
  return (button as IButtonLink).to !== undefined
}

const PageHero: React.FC<IProps> = ({
  content,
  isReverse = false,
  children,
  className,
}) => {
  const { buttons, title, header, subtitle, image, alt } = content
  return (
    <Box py={4} px={8} width="full">
      <Flex
        justifyContent="space-between"
        mt={8}
        px={{ base: 0, lg: 16 }}
        direction={{ base: isReverse ? "column" : "column-reverse", lg: "row" }}
        className={className}
      >
        <Box
          maxW={{ base: "full", lg: "container.sm" }}
          pt={{ base: isReverse ? 0 : 8, lg: 32 }}
          pb={{ base: isReverse ? 8 : 0, lg: 32 }}
          pl={{ base: 0, lg: 8 }}
          mr={{ base: 0, lg: 4 }}
        >
          <Heading
            as="h1"
            textTransform="uppercase"
            fontSize="md"
            fontWeight="normal"
            mt={{ base: 0, lg: 8 }}
            mb={4}
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
            mb={0}
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
            mt={4}
            mb={8}
          >
            {subtitle}
          </Text>
          {buttons && (
            // FIXME: remove the `ul` override once removed the corresponding
            // global styles in `src/@chakra-ui/gatsby-plugin/styles.ts`
            <Wrap spacing={2} overflow="visible" sx={{ ul: { m: 0 } }}>
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
        <GatsbyImage
          flex="1 1 50%"
          alignSelf="center"
          mt={{ base: 0, lg: 12 }}
          ml={{ base: 0, lg: 12 }}
          w="full"
          maxWidth={{ base: "560px", lg: "624px" }}
          image={image}
          objectFit="contain"
          alt={alt}
          loading="eager"
        />
      </Flex>
    </Box>
  )
}

export default PageHero
