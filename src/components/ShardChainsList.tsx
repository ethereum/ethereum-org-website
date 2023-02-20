import React from "react"
import { useIntl } from "react-intl"
import CardList, { CardListItem } from "./CardList"

import { Box } from "@chakra-ui/react"
import { translateMessageId } from "../utils/translations"

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
    {
      title: translateMessageId("page-upgrade-article-title-eip-4844", intl),
      description: translateMessageId(
        "page-upgrade-article-author-eip-4844",
        intl
      ),
      link: "https://eips.ethereum.org/EIPS/eip-4844",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-proto-danksharding-faq",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-vitalik-buterin",
        intl
      ),
      link: "https://notes.ethereum.org/@vbuterin/proto_danksharding_faq",
    },
    {
      title: translateMessageId(
        "page-upgrade-article-title-sharding-das",
        intl
      ),
      description: translateMessageId(
        "page-upgrade-article-author-vitalik-buterin",
        intl
      ),
      link: "https://hackmd.io/@vbuterin/sharding_proposal",
    },
  ]

  return (
    <Box mb="4rem">
      <CardList content={reads} />
    </Box>
  )
}

export default ShardChainsList
