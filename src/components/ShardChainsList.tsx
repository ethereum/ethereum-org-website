import { Box } from "@chakra-ui/react"

import CardList, { CardListItem } from "@/components/CardList"

export interface IProps {}

const ShardChainsList: React.FC<IProps> = () => {
  // TODO: Re-enable after i18n implemented
  // const { t } = useTranslation()
  const reads: Array<CardListItem> = [
    {
      title: "page-upgrade-article-title-sharding-is-great", // t("page-upgrade-article-title-sharding-is-great"),
      description: "page-upgrade-article-author-vitalik-buterin", // t("page-upgrade-article-author-vitalik-buterin"),
      link: "https://vitalik.ca/general/2021/04/07/sharding.html",
    },
    {
      title: "page-upgrade-article-title-rollup-roadmap", // t("page-upgrade-article-title-rollup-roadmap"),
      description: "page-upgrade-article-author-vitalik-buterin", // t("page-upgrade-article-author-vitalik-buterin"),
      link: "https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698",
    },
    {
      title: "page-upgrade-article-title-two-point-oh", // t("page-upgrade-article-title-two-point-oh"),
      description: "page-upgrade-article-author-ethos-dev", // t("page-upgrade-article-author-ethos-dev"),
      link: "https://ethos.dev/beacon-chain/",
    },
    {
      title: "page-upgrade-article-title-sharding-consensus", // t("page-upgrade-article-title-sharding-consensus"),
      description: "page-upgrade-article-author-ethereum-foundation", // t("page-upgrade-article-author-ethereum-foundation"),
      link: "https://blog.ethereum.org/2020/03/27/sharding-consensus/",
    },
    {
      title: "page-upgrade-article-title-hitchhikers-guide-to-ethereum", // t("page-upgrade-article-title-hitchhikers-guide-to-ethereum"),
      description: "page-upgrade-article-author-delphi-digital", // t("page-upgrade-article-author-delphi-digital"),
      link: "https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum",
    },
    {
      title: "page-upgrade-article-title-eip-4844", // t("page-upgrade-article-title-eip-4844"),
      description: "page-upgrade-article-author-eip-4844", // t("page-upgrade-article-author-eip-4844"),
      link: "https://eips.ethereum.org/EIPS/eip-4844",
    },
    {
      title: "page-upgrade-article-title-proto-danksharding-faq", // t("page-upgrade-article-title-proto-danksharding-faq"),
      description: "page-upgrade-article-author-vitalik-buterin", // t("page-upgrade-article-author-vitalik-buterin"),
      link: "https://notes.ethereum.org/@vbuterin/proto_danksharding_faq",
    },
    {
      title: "page-upgrade-article-title-sharding-das", // t("page-upgrade-article-title-sharding-das"),
      description: "page-upgrade-article-author-vitalik-buterin", // t("page-upgrade-article-author-vitalik-buterin"),
      link: "https://hackmd.io/@vbuterin/sharding_proposal",
    },
  ]

  return (
    <Box mb="4rem">
      <CardList items={reads} />
    </Box>
  )
}

export default ShardChainsList
