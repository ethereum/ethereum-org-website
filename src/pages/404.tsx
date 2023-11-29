import React from "react"
import type { GetStaticProps, NextPage } from "next"
import type { SSRConfig } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"

import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import InlineLink from "../components/Link"
import Translation from "../components/Translation"

type Props = SSRConfig

export const getStaticProps = (async (context) => {
  const { locale } = context

  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPage("/")
  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<Props>

const NotFoundPage = () => (
  <Flex flexDir="column" align="center" w="full" mt={16} mb={0} mx="auto">
    <Box py={4} px={8} w="full">
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
