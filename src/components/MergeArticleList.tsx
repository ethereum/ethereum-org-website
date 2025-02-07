import { useTranslation } from "next-i18next"

import CardList, { type CardProps } from "@/components/CardList"

const MergeArticleList = () => {
  const { t } = useTranslation(["page-upgrades", "page-upgrades-index"])

  const reads: CardProps[] = [
    {
      title: t("page-upgrades-index:page-upgrade-article-title-ethmerge"),
      description: t(
        "page-upgrades-index:page-upgrade-article-author-ethmerge"
      ),
      link: "https://ethmerge.com/",
    },
    {
      title: t(
        "page-upgrades-index:page-upgrade-article-title-merge-is-coming"
      ),
      description: t("page-upgrades-index:page-upgrade-article-author-alchemy"),
      link: "https://www.alchemy.com/the-merge",
    },
    {
      title: t(
        "page-upgrades-index:page-upgrade-article-title-state-of-the-merge"
      ),
      description: t(
        "page-upgrades-index:page-upgrade-article-author-consensys"
      ),
      link: "https://consensys.net/blog/news/the-state-of-the-merge-an-update-on-ethereums-merge-to-proof-of-stake-in-2022/",
    },
    {
      title: t(
        "page-upgrades-index:page-upgrade-article-title-ropsten-merge-testnet"
      ),
      description: t(
        "page-upgrades-index:page-upgrade-article-author-ethereum-foundation"
      ),
      link: "https://blog.ethereum.org/2022/05/30/ropsten-merge-announcement/",
    },
    {
      title: t(
        "page-upgrades-index:page-upgrade-article-title-execution-layer-specs"
      ),
      description: t(
        "page-upgrades-index:page-upgrade-article-author-ethereum-foundation"
      ),
      link: "https://github.com/ethereum/execution-specs/",
    },
    {
      title: t(
        "page-upgrades-index:page-upgrade-article-title-consensus-layer-specs"
      ),
      description: t(
        "page-upgrades-index:page-upgrade-article-author-ethereum-foundation"
      ),
      link: "https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix",
    },
    {
      title: t(
        "page-upgrades-index:page-upgrade-article-title-engine-api-specs"
      ),
      description: t(
        "page-upgrades-index:page-upgrade-article-author-ethereum-foundation"
      ),
      link: "https://github.com/ethereum/execution-apis/tree/main/src/engine",
    },
    {
      title: t(
        "page-upgrades-index:page-upgrade-article-title-hitchhikers-guide-to-ethereum"
      ),
      description: t(
        "page-upgrades-index:page-upgrade-article-author-delphi-digital"
      ),
      link: "https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum",
    },
  ]

  return (
    <div className="mb-16">
      <CardList items={reads} />
    </div>
  )
}

export default MergeArticleList
