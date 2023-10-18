import { Box } from "@chakra-ui/react"

import CardList, { CardListItem } from "./CardList"

export interface IProps {}

const MergeArticleList: React.FC<IProps> = () => {
  // TODO: Re-enable after i18n implemented
  // const { t } = useTranslation()
  const reads: Array<CardListItem> = [
    {
      title: "Ethmerge", // t("page-upgrade-article-title-ethmerge"),
      description: "Ethmerge", // t("page-upgrade-article-author-ethmerge"),
      link: "https://ethmerge.com/",
    },
    {
      title: "The Merge is Coming", // t("page-upgrade-article-title-merge-is-coming"),
      description: "Alchemy", // t("page-upgrade-article-author-alchemy"),
      link: "https://www.alchemy.com/the-merge",
    },
    {
      title: "The State of The Merge: An Update on Ethereum’s Merge to Proof of Stake in 2022", // t("page-upgrade-article-title-state-of-the-merge"),
      description: "Consensys", // t("page-upgrade-article-author-consensys"),
      link: "https://consensys.net/blog/news/the-state-of-the-merge-an-update-on-ethereums-merge-to-proof-of-stake-in-2022/",
    },
    {
      title: "Announcing the Ropsten Merge Testnet", // t("page-upgrade-article-title-ropsten-merge-testnet"),
      description: "Ethereum Foundation", // t("page-upgrade-article-author-ethereum-foundation"),
      link: "https://blog.ethereum.org/2022/05/30/ropsten-merge-announcement/",
    },
    {
      title: "Execution layer specs", // t("page-upgrade-article-title-execution-layer-specs"),
      description: "Ethereum Foundation", // t("page-upgrade-article-author-ethereum-foundation"),
      link: "https://github.com/ethereum/execution-specs/",
    },
    {
      title: "Consensus layer specs", // t("page-upgrade-article-title-consensus-layer-specs"),
      description: "Ethereum Foundation", // t("page-upgrade-article-author-ethereum-foundation"),
      link: "https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix",
    },
    {
      title: "Engine API specs", // t("page-upgrade-article-title-engine-api-specs"),
      description: "Ethereum Foundation", // t("page-upgrade-article-author-ethereum-foundation"),
      link: "https://github.com/ethereum/execution-apis/tree/main/src/engine",
    },
    {
      title: "The Hitchhikers Guide To Ethereum", // t("page-upgrade-article-title-hitchhikers-guide-to-ethereum"),
      description: "Delphi Digital", // t("page-upgrade-article-author-delphi-digital"),
      link: "https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum",
    },
  ]

  return (
    <Box mb="4rem">
      <CardList items={reads} />
    </Box>
  )
}

export default MergeArticleList
