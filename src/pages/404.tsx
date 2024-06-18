import type { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"

import { BasePageProps, Lang } from "@/lib/types"

import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/")

  // Want to check common namespace, so looking at requiredNamespaces[0]
  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[0])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const NotFoundPage = () => (
  <Flex flexDir="column" align="center" w="full" mt={16} mb={0} mx="auto">
    <Box as={MainArticle} py={4} px={8} w="full">
      <Heading as="h1" size="2xl" my={8}>
        <Translation id="we-couldnt-find-that-page" />
      </Heading>
      <Text mb={8}>
        <Translation id="try-using-search" />{" "}
        <InlineLink href="/">
          <Translation id="return-home" />
        </InlineLink>
        .
      </Text>
    </Box>
  </Flex>
)

export default NotFoundPage
