import React from "react"
import styled from "@emotion/styled"
import { useTranslation } from "gatsby-plugin-react-i18next"
import CardList, { CardListItem } from "./CardList"

const Container = styled.div`
  margin-bottom: 4rem;
`

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
    <Container>
      <CardList content={reads} />
    </Container>
  )
}

export default ShardChainsList
