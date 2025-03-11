import type { GetStaticProps } from "next"

import { BasePageProps, Lang } from "@/lib/types"

import MainArticle from "@/components/MainArticle"
import Translation from "@/components/Translation"
import InlineLink from "@/components/ui/Link"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DEFAULT_LOCALE } from "@/lib/constants"

import loadNamespaces from "@/i18n/loadNamespaces"

export const getStaticProps = (async () => {
  // TODO: generate 404 pages for each locale when we finish the app router migration
  const locale = DEFAULT_LOCALE

  const requiredNamespaces = getRequiredNamespacesForPage("/")

  // Want to check common namespace, so looking at requiredNamespaces[0]
  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[0])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const messages = await loadNamespaces(locale!, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const NotFoundPage = () => (
  <div className="mx-auto mb-0 mt-16 flex w-full flex-col items-center">
    <MainArticle className="my-8 w-full space-y-8 px-8 py-4">
      <h1>
        <Translation id="we-couldnt-find-that-page" />
      </h1>
      <p>
        <Translation id="try-using-search" />{" "}
        <InlineLink href="/">
          <Translation id="return-home" />
        </InlineLink>
        .
      </p>
    </MainArticle>
  </div>
)

export default NotFoundPage
