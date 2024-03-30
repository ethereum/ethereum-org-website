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

import { lightTheme as oldTheme } from "../theme"

export const RootLayout = ({
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
    <Container mx="auto" maxW={oldTheme.variables.maxPageWidth}>
      <SkipLink />

      <Nav />

      <TranslationBanner
        shouldShow={shouldShowTranslationBanner}
        isPageContentEnglish={contentNotTranslated}
        originalPagePath={originalPagePath}
      />

      <TranslationBannerLegal
        shouldShow={shouldShowLegalTranslationBanner}
        originalPagePath={originalPagePath}
      />

      {children}

      <Footer lastDeployDate={lastDeployDate} />
      <FeedbackWidget />
    </Container>
  )
}
