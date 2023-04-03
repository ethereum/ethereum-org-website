import React from "react"
import { Box } from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import CardList, { CardListItem } from "./CardList"

export interface IProps {}

const ShardChainsList: React.FC<IProps> = () => {
  const { t } = useTranslation()
  const reads: Array<CardListItem> = [
    {
      title: t("page-upgrade-article-title-sharding-is-great"),
      description: t("page-upgrade-article-author-vitalik-buterin"),
      link: "https://vitalik.ca/general/2021/04/07/sharding.html",
    },
    {
      title: t("page-upgrade-article-title-rollup-roadmap"),
      description: t("page-upgrade-article-author-vitalik-buterin"),
      link: "https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698",
    },
    {
      title: t("page-upgrade-article-title-two-point-oh"),
      description: t("page-upgrade-article-author-ethos-dev"),
      link: "https://ethos.dev/beacon-chain/",
    },
    {
      title: t("page-upgrade-article-title-sharding-consensus"),
      description: t("page-upgrade-article-author-ethereum-foundation"),
      link: "https://blog.ethereum.org/2020/03/27/sharding-consensus/",
    },
    {
      title: t("page-upgrade-article-title-hitchhikers-guide-to-ethereum"),
      description: t("page-upgrade-article-author-delphi-digital"),
      link: "https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum",
    },
    {
      title: t("page-upgrade-article-title-eip-4844"),
      description: t("page-upgrade-article-author-eip-4844"),
      link: "https://eips.ethereum.org/EIPS/eip-4844",
    },
    {
      title: t("page-upgrade-article-title-proto-danksharding-faq"),
      description: t("page-upgrade-article-author-vitalik-buterin"),
      link: "https://notes.ethereum.org/@vbuterin/proto_danksharding_faq",
    },
    {
      title: t("page-upgrade-article-title-sharding-das"),
      description: t("page-upgrade-article-author-vitalik-buterin"),
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
