import React, { ReactNode } from "react"
import { Box, Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react"

import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import ButtonLink, { IProps as IButtonLinkProps } from "./ButtonLink"
import Button, { IProps as IButtonProps } from "./Button"

import { MatomoEventOptions, trackCustomEvent } from "../utils/matomo"

export interface IButtonLink extends IButtonLinkProps {
  content: ReactNode
  matomo: MatomoEventOptions
}

export interface IButton extends IButtonProps {
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
          py={{ base: 16, lg: 32 }}
          pl={{ base: 0, lg: 8 }}
          mr={4}
        >
          <Heading
            as="h1"
            textTransform="uppercase"
            fontSize="md"
            fontWeight="normal"
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
            <Wrap spacing={2} overflow="visible">
              {buttons.map((button, idx) => {
                if (isButtonLink(button)) {
                  return (
                    <WrapItem>
                      <ButtonLink
                        key={idx}
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
                    <WrapItem>
                      <Button
                        key={idx}
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
        <Box
          as={GatsbyImage}
          flex="1 1 50%"
          alignSelf="center"
          mt={{ base: 0, lg: 12 }}
          ml={{ base: 0, lg: 12 }}
          w="full"
          maxWidth={{ base: "560px", lg: "624px" }}
          image={image}
          imgStyle={{
            objectFit: "contain",
          }}
          alt={alt}
          loading="eager"
        />
      </Flex>
    </Box>
  )
}

export default PageHero
