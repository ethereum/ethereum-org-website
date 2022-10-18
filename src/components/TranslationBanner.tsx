import React, { useEffect, useState } from "react"

import { Box, Flex, Heading, Icon } from "@chakra-ui/react"
import ButtonLink from "./ButtonLink"
import Translation from "./Translation"
import theme from "../@chakra-ui/gatsby-plugin/theme"
import { MdClose } from "react-icons/md"
import Emoji from "./Emoji"

export interface IProps {
  shouldShow: boolean
  isPageRightToLeft: boolean
  originalPagePath: string
  isPageContentEnglish: boolean
}

const TranslationBanner: React.FC<IProps> = ({
  shouldShow,
  isPageRightToLeft,
  originalPagePath,
  isPageContentEnglish,
}) => {
  const [isOpen, setIsOpen] = useState(shouldShow)

  useEffect(() => {
    setIsOpen(shouldShow)
  }, [originalPagePath, shouldShow])

  const headerTextId = isPageContentEnglish
    ? "translation-banner-title-new"
    : "translation-banner-title-update"

  const bodyTextId = isPageContentEnglish
    ? "translation-banner-body-new"
    : "translation-banner-body-update"

  return (
    <Box
      display={isOpen ? "block" : "none"}
      bottom={{ base: 0, md: "2rem" }}
      right={{ base: 0, md: "2rem" }}
      position="fixed"
      zIndex="99"
    >
      <Flex
        p="1rem"
        maxH="100%"
        maxW={{ base: "100%", md: "600px" }}
        bg="infoBanner"
        color="black300"
        justify="space-between"
        boxShadow={{
          base: `0px -4px 10px 0px #333333 10%`,
          md: "rgba(0, 0, 0, 0.16) 0px 2px 4px 0px",
        }}
        borderRadius="2px"
      >
        <Flex
          flexDirection="column"
          alignItems={isPageRightToLeft ? "flex-end" : "flex-start"}
          m="1rem"
          mt={{ sm: "2.5rem" }}
        >
          <Flex
            align={{ base: "flex-start", sm: "center" }}
            mb="1rem"
            flexDirection={{ base: "column-reverse", sm: "row" }}
          >
            <Heading
              as="h3"
              size="1.25rem"
              fontWeight="700"
              lineHeight="100%"
              my="0"
            >
              <Translation id={headerTextId} />
            </Heading>
            <Emoji
              text=":globe_showing_asia_australia:"
              pt="0.5rem"
              ml="0.5rem"
              my="auto"
              mb={{ base: "1rem", sm: "auto" }}
            />
          </Flex>
          <p>
            <Translation id={bodyTextId} />
          </p>
          <Flex
            align={{ base: "flex-start", sm: "center" }}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <Box>
              <ButtonLink to="/contributing/translation-program/">
                <Translation id="translation-banner-button-translate-page" />
              </ButtonLink>
            </Box>
            {!isPageContentEnglish && (
              <Box>
                <ButtonLink
                  to={originalPagePath}
                  variant="outline"
                  ml={{ base: 0, sm: "0.5rem" }}
                  mt={{ base: "0.5rem", sm: 0 }}
                  borderColor="#333333"
                  color="#333333"
                  language="en"
                >
                  <Translation id="translation-banner-button-see-english" />
                </ButtonLink>
              </Box>
            )}
          </Flex>
        </Flex>
        <Box
          position="absolute"
          top="0"
          right={isPageRightToLeft ? "auto" : 0}
          m="1rem"
          onClick={() => setIsOpen(false)}
        >
          <Icon
            as={MdClose}
            fill="secondary"
            name="close"
            boxSize="1.5em"
            cursor="pointer"
            _hover={{
              fill: "primary",
            }}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default TranslationBanner
