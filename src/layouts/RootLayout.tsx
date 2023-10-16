import { Container } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { join } from "path"

import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import TranslationBanner from "@/components/TranslationBanner"
import TranslationBannerLegal from "@/components/TranslationBannerLegal"

import { isLangRightToLeft } from "@/lib/utils/translations"

import { Lang } from "@/lib/types"
import { Root } from "@/lib/interfaces"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { lightTheme as oldTheme } from "../theme"

export const RootLayout = ({
  children,
  contentIsOutdated,
  contentNotTranslated,
}: Root) => {
  const { locale, asPath } = useRouter()

  const isLegal =
    asPath.includes(`/cookie-policy/`) ||
    asPath.includes(`/privacy-policy/`) ||
    asPath.includes(`/terms-of-use/`) ||
    asPath.includes(`/contributing/`) ||
    asPath.includes(`/style-guide/`)

  const isPageTranslationOutdated = contentIsOutdated ?? false
  const isPageLanguageEnglish = locale === DEFAULT_LOCALE
  const shouldShowTranslationBanner =
    (isPageTranslationOutdated ||
      (contentNotTranslated && !isPageLanguageEnglish)) &&
    !isLegal
  const isPageRightToLeft = isLangRightToLeft(locale as Lang)
  const originalPagePath = join(DEFAULT_LOCALE, asPath)

  return (
    <Container mx="auto" maxW={oldTheme.variables.maxPageWidth}>
      {/* TODO: get proper path value after setting i18n */}
      <Nav path="" />

      <TranslationBanner
        shouldShow={shouldShowTranslationBanner}
        isPageContentEnglish={contentNotTranslated}
        isPageRightToLeft={isPageRightToLeft}
        originalPagePath={originalPagePath}
      />

      <TranslationBannerLegal
        shouldShow={isLegal}
        isPageRightToLeft={isPageRightToLeft}
        originalPagePath={originalPagePath}
      />

      {children}

      <Footer />
    </Container>
  )
}
