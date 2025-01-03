import type { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { BasePageProps, Lang } from "@/lib/types"

import InlineLink from "@/components/Link"
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
  <div className="mx-auto mb-0 mt-16 flex w-full flex-col items-center">
    <div className="w-full px-8 py-4">
      <h1 className="my-8 text-4xl font-bold">
        <Translation id="we-couldnt-find-that-page" />
      </h1>
      <p className="mb-8">
        <Translation id="try-using-search" />{" "}
        <InlineLink href="/">
          <Translation id="return-home" />
        </InlineLink>
        .
      </p>
    </div>
  </div>
)

export default NotFoundPage
