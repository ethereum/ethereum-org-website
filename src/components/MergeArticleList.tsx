import React from "react"
import styled from "@emotion/styled"
import CardList, { CardListItem } from "./CardList"
import { useIntl } from "react-intl"

import { translateMessageId } from "../utils/translations"

const Container = styled.div`
  margin-bottom: 4rem;
`

export interface IProps {}

const MergeArticleList: React.FC<IProps> = () => {
  const intl = useIntl()
  const reads: Array<CardListItem> = [
    {
      title: translateMessageId("page-upgrade-article-title-ethmerge", intl),
      description: translateMessageId(
        "page-upgrade-article-author-ethmerge",
        intl
      ),
      link: "https://ethmerge.com/",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-merge-is-coming",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-alchemy",
        intl
      ),
      link: "https://www.alchemy.com/the-merge",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-state-of-the-merge",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-consensys",
        intl
      ),
      link: "https://consensys.net/blog/news/the-state-of-the-merge-an-update-on-ethereums-merge-to-proof-of-stake-in-2022/",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-ropsten-merge-testnet",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-ethereum-foundation",
        intl
      ),
      link: "https://blog.ethereum.org/2022/05/30/ropsten-merge-announcement/",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-execution-layer-specs",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-ethereum-foundation",
        intl
      ),
      link: "https://github.com/ethereum/execution-specs/",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-consensus-layer-specs",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-ethereum-foundation",
        intl
      ),
      link: "https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-engine-api-specs",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-ethereum-foundation",
        intl
      ),
      link: "https://github.com/ethereum/execution-apis/tree/main/src/engine",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-hitchhikers-guide-to-ethereum",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-delphi-digital",
        intl
      ),
      link: "https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum",
    },
  ]

  return (
    <Container>
      <CardList content={reads} />
    </Container>
  )
}

export default MergeArticleList
