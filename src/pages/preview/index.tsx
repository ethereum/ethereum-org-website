import React from "react"
import { useIntl } from "react-intl"

import { translateMessageId } from "../../utils/translations"
import { BugBountyCards } from "../../components/BugBountyCards"
import PageMetadata from "../../components/PageMetadata"
import { Page } from "../../components/SharedStyledComponents"

const BugBountiesPage = () => {
  const intl = useIntl()

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-upgrades-bug-bounty-meta-title", intl)}
        description={translateMessageId(
          "page-upgrades-bug-bounty-meta-description",
          intl
        )}
      />
      <BugBountyCards />
    </Page>
  )
}

export default BugBountiesPage
