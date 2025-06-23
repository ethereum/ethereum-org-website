"use client"

import MainArticle from "../MainArticle"
import InlineLink from "../ui/Link"

import useTranslation from "@/hooks/useTranslation"

function NotFoundPage() {
  const { t } = useTranslation("common")

  return (
    <MainArticle className="mb-32 mt-24 w-full space-y-8 px-8 py-4 md:mb-48 md:mt-32">
      <h1>{t("we-couldnt-find-that-page")}</h1>
      <p>
        {t("try-using-search")}{" "}
        <InlineLink href="/">{t("return-home")}</InlineLink>.
      </p>
    </MainArticle>
  )
}

export default NotFoundPage
