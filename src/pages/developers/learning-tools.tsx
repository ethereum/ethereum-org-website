import Translation from "@/components/Translation"
import { RootLayout } from "../../layouts/RootLayout"
import { getRequiredNamespacesForPath } from "@/lib/utils/translations"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps } from "next"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"

export const getStaticProps: GetStaticProps = async (
  context
) => {
  const { locale } = context
  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPath('/developers')
  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      lastDeployDate,
    },
  }
}

const DevelopersPage = ({ lastDeployDate }) => {
  return (
    <RootLayout
      contentIsOutdated={false}
      contentNotTranslated={false}
      lastDeployDate={lastDeployDate}
    >
      <>
        <h1>Learning tools</h1>
      </>
    </RootLayout>
  )
}

export default DevelopersPage