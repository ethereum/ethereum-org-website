import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import {
  Box,
  Flex,
  FlexProps,
  Icon,
  LinkBox,
  LinkOverlay,
  Spacer,
} from "@chakra-ui/react"

import { TranslationKey } from "@/lib/types"
import type { DeveloperDocsLink } from "@/lib/interfaces"

import { BaseLink } from "@/components/Link"
import Text from "@/components/OldText"

import { trackCustomEvent } from "@/lib/utils/matomo"

import docLinks from "@/data/developer-docs-links.yaml"

import { useRtlFlip } from "@/hooks/useRtlFlip"

const TextDiv = ({ children, ...props }: FlexProps) => (
  <Flex
    direction="column"
    justify="space-between"
    w="100%"
    h="100%"
    wordWrap="break-word"
    p={4}
    lineHeight={4}
    {...props}
  >
    {children}
  </Flex>
)

type DocsArrayProps = {
  href: string
  id: TranslationKey
}

type CardLinkProps = {
  docData: DocsArrayProps
  contentNotTranslated: boolean
  isPrev?: boolean
}

const CardLink = ({ docData, isPrev, contentNotTranslated }: CardLinkProps) => {
  const { t } = useTranslation("page-developers-docs")
  const { flipForRtl } = useRtlFlip()

  const xPadding = isPrev ? { ps: "0" } : { pe: 0 }

  return (
    <LinkBox
      as={Flex}
      alignItems="center"
      w="full"
      flex="1"
      h="82px"
      bg="background.base"
      border="1px"
      borderColor="primary.base"
      borderRadius={4}
      justify={isPrev ? "flex-start" : "flex-end"}
      _hover={{
        borderColor: "primary.hover",
        "& svg": {
          fill: "primary.hover",
        },
        ".btn-txt": {
          color: "primary.hover",
        },
      }}
    >
      <Box
        textDecoration="none"
        p={4}
        order={isPrev ? 0 : 1}
        transform={contentNotTranslated ? undefined : flipForRtl}
      >
        {isPrev ? (
          <Icon
            fill="primary.base"
            fontSize="xl"
            as={FaChevronLeft}
            name="chevron left"
          />
        ) : (
          <Icon
            fill="primary.base"
            fontSize="xl"
            as={FaChevronRight}
            name="chevron right"
          />
        )}
      </Box>
      <TextDiv {...xPadding} {...(!isPrev && { textAlign: "end" })}>
        <Text m="0" color="primary.base" fontSize="lg" className="btn-txt">
          {t(isPrev ? "previous" : "next")}
        </Text>
        <LinkOverlay
          as={BaseLink}
          href={docData.href}
          textAlign={isPrev ? "start" : "end"}
          rel={isPrev ? "prev" : "next"}
          fontSize="sm"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
          onClick={() => {
            trackCustomEvent({
              eventCategory: "next/previous article DocsNav",
              eventAction: "click",
              eventName: isPrev ? "previous" : "next",
            })
          }}
        >
          {t(docData.id)}
        </LinkOverlay>
      </TextDiv>
    </LinkBox>
  )
}

type DocsNavProps = {
  contentNotTranslated: boolean
}

const DocsNav = ({ contentNotTranslated }: DocsNavProps) => {
  const { asPath } = useRouter()
  // Construct array of all linkable documents in order recursively
  const docsArray: DocsArrayProps[] = []
  const getDocs = (links: Array<DeveloperDocsLink>): void => {
    for (const item of links) {
      // If object has 'items' key
      if (item.items) {
        // And if item has a 'to' key
        // Add 'to' path and 'id' to docsArray
        item.href && docsArray.push({ href: item.href, id: item.id })
        // Then recursively add sub-items
        getDocs(item.items)
      } else {
        // If object has no further 'items', add and continue
        docsArray.push({ href: item.href, id: item.id })
      }
    }
  }

  // Initiate recursive loop with full docLinks yaml
  getDocs(docLinks)

  // Find index that matches current page
  let currentIndex = 0
  for (let i = 0; i < docsArray.length; i++) {
    if (
      asPath.indexOf(docsArray[i].href) >= 0 &&
      asPath.length === docsArray[i].href.length
    ) {
      currentIndex = i
    }
  }

  // Extract previous and next doc based on current index +/- 1
  const previousDoc = currentIndex - 1 >= 0 ? docsArray[currentIndex - 1] : null
  const nextDoc =
    currentIndex + 1 < docsArray.length ? docsArray[currentIndex + 1] : null

  return (
    <Flex
      as="nav"
      aria-label="Paginate to document"
      direction={{
        base: "column-reverse",
        md: "row",
        lg: "column-reverse",
        xl: "row",
      }}
      mt="8"
      gap="4"
      justify="space-between"
      alignItems={{ base: "center", md: "flex-start" }}
    >
      {previousDoc ? (
        <CardLink
          docData={previousDoc}
          contentNotTranslated={contentNotTranslated}
          isPrev
        />
      ) : (
        <Spacer />
      )}
      {nextDoc ? (
        <CardLink
          docData={nextDoc}
          contentNotTranslated={contentNotTranslated}
        />
      ) : (
        <Spacer />
      )}
    </Flex>
  )
}

export default DocsNav
