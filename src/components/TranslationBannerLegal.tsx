import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  useToken,
} from "@chakra-ui/react"

import Emoji from "./Emoji"
import Text from "./OldText"
import Translation from "./Translation"

export type TranslationBannerLegalProps = {
  shouldShow: boolean
  originalPagePath: string
}

const TranslationBannerLegal = ({
  shouldShow,
  originalPagePath,
}: TranslationBannerLegalProps) => {
  // Default to isOpen being false, and let the useEffect set this.
  const [isOpen, setIsOpen] = useState(false)
  const text = useToken("colors", "text")

  useEffect(() => {
    if (
      localStorage.getItem(
        `dont-show-translation-legal-banner-${originalPagePath}`
      ) === "true"
    ) {
      setIsOpen(false)
    } else {
      setIsOpen(shouldShow)
    }
  }, [originalPagePath, shouldShow])

  return (
    <Box
      as="aside"
      position="fixed"
      display={isOpen ? "block" : "none"}
      bottom={{ base: 0, md: 8 }}
      insetInlineEnd={{ base: 0, md: 8 }}
      zIndex="99"
    >
      <Flex
        bg="infoBanner"
        color="black300"
        justify="space-between"
        maxW={{ base: "full", md: "600px" }}
        maxH="full"
        p={4}
        borderRadius="sm"
        boxShadow={{
          base: `-4px 10px 0px ${text} 10%`,
          md: "rgba(0, 0, 0, 0.16) 0px 2px 4px 0px",
        }}
      >
        <Flex direction="column" m={4} mt={{ base: 10, sm: 4 }}>
          <Flex
            align={{ base: "flex-start", sm: "center" }}
            flexDirection={{ base: "column-reverse", sm: "row" }}
            mb={4}
          >
            <Heading
              as="h3"
              fontSize={{ base: "1.25rem", md: "1.5rem" }}
              fontWeight="bold"
              lineHeight="100%"
            >
              <Translation id="translation-banner-no-bugs-title" />
              <Emoji
                text=":bug:"
                fontSize="3xl"
                pt={2}
                ms={2}
                mb={{ base: 4, sm: "auto" }}
              />
            </Heading>
          </Flex>
          <Text>
            <Translation id="translation-banner-no-bugs-content" />
          </Text>
          <Flex
            align={{ base: "flex-start", sm: "center" }}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <Button
              onClick={() => {
                localStorage.setItem(
                  `dont-show-translation-legal-banner-${originalPagePath}`,
                  "true"
                )
                setIsOpen(false)
              }}
            >
              <Translation id="translation-banner-no-bugs-dont-show-again" />
            </Button>
          </Flex>
        </Flex>
        <CloseButton
          position="absolute"
          top={0}
          insetInlineEnd="0"
          margin={4}
          color="secondary"
          _hover={{
            color: "primary.base",
          }}
          onClick={() => setIsOpen(false)}
        />
      </Flex>
    </Box>
  )
}

export default TranslationBannerLegal
