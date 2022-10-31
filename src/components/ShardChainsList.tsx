import React from "react"
import styled from "@emotion/styled"
import CardList, { CardListItem } from "./CardList"
import { useIntl } from "react-intl"

import { translateMessageId } from "../utils/translations"

const Container = styled.div`
  margin-bottom: 4rem;
`

export interface IProps {}

const ShardChainsList: React.FC<IProps> = () => {
  const intl = useIntl()
  const reads: Array<CardListItem> = [
    {
      title: translateMessageId(
        "page-upgrade-article-title-sharding-is-great",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-vitalik-buterin",
        intl
      ),
      link: "https://vitalik.ca/general/2021/04/07/sharding.html",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-rollup-roadmap",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-vitalik-buterin",
        intl
      ),
      link: "https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-two-point-oh",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-ethos-dev",
        intl
      ),
      link: "https://ethos.dev/beacon-chain/",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-sharding-consensus",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-ethereum-foundation",
        intl
      ),
      link: "https://blog.ethereum.org/2020/03/27/sharding-consensus/",
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

export default ShardChainsList
