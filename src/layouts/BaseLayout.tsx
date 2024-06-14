import { join } from "path"

import { useRouter } from "next/router"
import { Container } from "@chakra-ui/react"

import type { Root } from "@/lib/types"

import FeedbackWidget from "@/components/FeedbackWidget"
import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import { SkipLink } from "@/components/SkipLink"
import TranslationBanner from "@/components/TranslationBanner"
import TranslationBannerLegal from "@/components/TranslationBannerLegal"

import { toPosixPath } from "@/lib/utils/relativePath"

import { DEFAULT_LOCALE } from "@/lib/constants"

export const BaseLayout = ({
  children,
  contentIsOutdated,
  contentNotTranslated,
  lastDeployDate,
}: Root) => {
  const { locale, asPath } = useRouter()

  const CONTRIBUTING = "/contributing/"
  const isUntranslatedContributingPage =
    asPath.includes(CONTRIBUTING) &&
    !(asPath.endsWith(CONTRIBUTING) || asPath.includes("/translation-program/"))

  const isLegal =
    isUntranslatedContributingPage ||
    asPath.includes(`/cookie-policy/`) ||
    asPath.includes(`/privacy-policy/`) ||
    asPath.includes(`/terms-of-use/`) ||
    asPath.includes(`/style-guide/`)

  const isPageLanguageEnglish = locale === DEFAULT_LOCALE

  const shouldShowTranslationBanner =
    (contentIsOutdated || (contentNotTranslated && !isPageLanguageEnglish)) &&
    !isLegal
  const shouldShowLegalTranslationBanner = isLegal && !isPageLanguageEnglish
  const originalPagePath = toPosixPath(join(DEFAULT_LOCALE, asPath))

  return (
    <>
      {/**
       * The Skip Link is positioned above the container to ensure it is not affecting the
       * layout on initial load.
       */}
      <SkipLink />
      <Container maxW="container.2xl" marginInline="auto">
        <Nav />

        {/* TODO: FIX TRANSLATION BANNER LOGIC FOR https://github.com/ethereum/ethereum-org-website/issues/11305 */}
        {/* <TranslationBanner
            shouldShow={shouldShowTranslationBanner}
            isPageContentEnglish={contentNotTranslated}
            originalPagePath={originalPagePath}
          />

          <TranslationBannerLegal
            shouldShow={shouldShowLegalTranslationBanner}
            originalPagePath={originalPagePath}
          /> */}

        {children}

        <Footer lastDeployDate={lastDeployDate} />
      </Container>
      {/**
       * The Feedback Widget is positioned below the container to ensure it is not affecting the
       * layout on initial load.
       */}
      <FeedbackWidget />
    </>
  )
}
