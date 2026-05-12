// @ts-nocheck
import { browser } from "fumadocs-mdx/runtime/browser"
import type * as Config from "../source.config"

const create = browser<
  typeof Config,
  import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
    DocData: {}
  }
>()
const browserCollections = {
  content_ar: create.doc("content_ar", {}),
  content_bn: create.doc("content_bn", {}),
  content_cs: create.doc("content_cs", {}),
  content_de: create.doc("content_de", {}),
  content_en: create.doc("content_en", {
    "about/index.md": () =>
      import("../public/content/about/index.md?collection=content_en"),
    "ai-agents/index.md": () =>
      import("../public/content/ai-agents/index.md?collection=content_en"),
    "contributing/index.md": () =>
      import("../public/content/contributing/index.md?collection=content_en"),
    "dao/index.md": () =>
      import("../public/content/dao/index.md?collection=content_en"),
    "bridges/index.md": () =>
      import("../public/content/bridges/index.md?collection=content_en"),
    "cookie-policy/index.md": () =>
      import("../public/content/cookie-policy/index.md?collection=content_en"),
    "decentralized-identity/index.md": () =>
      import(
        "../public/content/decentralized-identity/index.md?collection=content_en"
      ),
    "defi/index.md": () =>
      import("../public/content/defi/index.md?collection=content_en"),
    "desci/index.md": () =>
      import("../public/content/desci/index.md?collection=content_en"),
    "energy-consumption/index.md": () =>
      import(
        "../public/content/energy-consumption/index.md?collection=content_en"
      ),
    "eips/index.md": () =>
      import("../public/content/eips/index.md?collection=content_en"),
    "ethereum-forks/index.md": () =>
      import("../public/content/ethereum-forks/index.md?collection=content_en"),
    "gaming/index.md": () =>
      import("../public/content/gaming/index.md?collection=content_en"),
    "foundation/index.md": () =>
      import("../public/content/foundation/index.md?collection=content_en"),
    "glossary/index.md": () =>
      import("../public/content/glossary/index.md?collection=content_en"),
    "governance/index.md": () =>
      import("../public/content/governance/index.md?collection=content_en"),
    "nft/index.md": () =>
      import("../public/content/nft/index.md?collection=content_en"),
    "guides/index.md": () =>
      import("../public/content/guides/index.md?collection=content_en"),
    "payments/index.md": () =>
      import("../public/content/payments/index.md?collection=content_en"),
    "prediction-markets/index.md": () =>
      import(
        "../public/content/prediction-markets/index.md?collection=content_en"
      ),
    "privacy/index.md": () =>
      import("../public/content/privacy/index.md?collection=content_en"),
    "real-world-assets/index.md": () =>
      import(
        "../public/content/real-world-assets/index.md?collection=content_en"
      ),
    "privacy-policy/index.md": () =>
      import("../public/content/privacy-policy/index.md?collection=content_en"),
    "refi/index.md": () =>
      import("../public/content/refi/index.md?collection=content_en"),
    "restaking/index.md": () =>
      import("../public/content/restaking/index.md?collection=content_en"),
    "smart-contracts/index.md": () =>
      import(
        "../public/content/smart-contracts/index.md?collection=content_en"
      ),
    "security/index.md": () =>
      import("../public/content/security/index.md?collection=content_en"),
    "social-networks/index.md": () =>
      import(
        "../public/content/social-networks/index.md?collection=content_en"
      ),
    "terms-of-use/index.md": () =>
      import("../public/content/terms-of-use/index.md?collection=content_en"),
    "what-are-apps/index.md": () =>
      import("../public/content/what-are-apps/index.md?collection=content_en"),
    "web3/index.md": () =>
      import("../public/content/web3/index.md?collection=content_en"),
    "whitepaper/index.md": () =>
      import("../public/content/whitepaper/index.md?collection=content_en"),
    "wrapped-eth/index.md": () =>
      import("../public/content/wrapped-eth/index.md?collection=content_en"),
    "zero-knowledge-proofs/index.md": () =>
      import(
        "../public/content/zero-knowledge-proofs/index.md?collection=content_en"
      ),
    "community/code-of-conduct/index.md": () =>
      import(
        "../public/content/community/code-of-conduct/index.md?collection=content_en"
      ),
    "community/get-involved/index.md": () =>
      import(
        "../public/content/community/get-involved/index.md?collection=content_en"
      ),
    "community/grants/index.md": () =>
      import(
        "../public/content/community/grants/index.md?collection=content_en"
      ),
    "community/language-resources/index.md": () =>
      import(
        "../public/content/community/language-resources/index.md?collection=content_en"
      ),
    "community/online/index.md": () =>
      import(
        "../public/content/community/online/index.md?collection=content_en"
      ),
    "community/research/index.md": () =>
      import(
        "../public/content/community/research/index.md?collection=content_en"
      ),
    "contributing/adding-developer-tools/index.md": () =>
      import(
        "../public/content/contributing/adding-developer-tools/index.md?collection=content_en"
      ),
    "contributing/adding-desci-projects/index.md": () =>
      import(
        "../public/content/contributing/adding-desci-projects/index.md?collection=content_en"
      ),
    "contributing/adding-exchanges/index.md": () =>
      import(
        "../public/content/contributing/adding-exchanges/index.md?collection=content_en"
      ),
    "contributing/adding-glossary-terms/index.md": () =>
      import(
        "../public/content/contributing/adding-glossary-terms/index.md?collection=content_en"
      ),
    "contributing/adding-layer-2s/index.md": () =>
      import(
        "../public/content/contributing/adding-layer-2s/index.md?collection=content_en"
      ),
    "contributing/adding-products/index.md": () =>
      import(
        "../public/content/contributing/adding-products/index.md?collection=content_en"
      ),
    "contributing/adding-resources/index.md": () =>
      import(
        "../public/content/contributing/adding-resources/index.md?collection=content_en"
      ),
    "contributing/adding-staking-products/index.md": () =>
      import(
        "../public/content/contributing/adding-staking-products/index.md?collection=content_en"
      ),
    "contributing/adding-videos/index.md": () =>
      import(
        "../public/content/contributing/adding-videos/index.md?collection=content_en"
      ),
    "contributing/adding-wallets/index.md": () =>
      import(
        "../public/content/contributing/adding-wallets/index.md?collection=content_en"
      ),
    "contributing/content-resources/index.md": () =>
      import(
        "../public/content/contributing/content-resources/index.md?collection=content_en"
      ),
    "contributing/design/index.md": () =>
      import(
        "../public/content/contributing/design/index.md?collection=content_en"
      ),
    "contributing/design-principles/index.md": () =>
      import(
        "../public/content/contributing/design-principles/index.md?collection=content_en"
      ),
    "contributing/quizzes/index.md": () =>
      import(
        "../public/content/contributing/quizzes/index.md?collection=content_en"
      ),
    "contributing/style-guide/index.md": () =>
      import(
        "../public/content/contributing/style-guide/index.md?collection=content_en"
      ),
    "contributing/translation-program/index.md": () =>
      import(
        "../public/content/contributing/translation-program/index.md?collection=content_en"
      ),
    "developers/docs/index.md": () =>
      import(
        "../public/content/developers/docs/index.md?collection=content_en"
      ),
    "eth/supply/index.md": () =>
      import("../public/content/eth/supply/index.md?collection=content_en"),
    "foundation/mandate/index.md": () =>
      import(
        "../public/content/foundation/mandate/index.md?collection=content_en"
      ),
    "guides/how-to-create-an-ethereum-account/index.md": () =>
      import(
        "../public/content/guides/how-to-create-an-ethereum-account/index.md?collection=content_en"
      ),
    "guides/how-to-id-scam-tokens/index.md": () =>
      import(
        "../public/content/guides/how-to-id-scam-tokens/index.md?collection=content_en"
      ),
    "guides/how-to-revoke-token-access/index.md": () =>
      import(
        "../public/content/guides/how-to-revoke-token-access/index.md?collection=content_en"
      ),
    "guides/how-to-swap-tokens/index.md": () =>
      import(
        "../public/content/guides/how-to-swap-tokens/index.md?collection=content_en"
      ),
    "guides/how-to-use-a-bridge/index.md": () =>
      import(
        "../public/content/guides/how-to-use-a-bridge/index.md?collection=content_en"
      ),
    "guides/how-to-use-a-wallet/index.md": () =>
      import(
        "../public/content/guides/how-to-use-a-wallet/index.md?collection=content_en"
      ),
    "roadmap/account-abstraction/index.md": () =>
      import(
        "../public/content/roadmap/account-abstraction/index.md?collection=content_en"
      ),
    "roadmap/danksharding/index.md": () =>
      import(
        "../public/content/roadmap/danksharding/index.md?collection=content_en"
      ),
    "roadmap/beacon-chain/index.md": () =>
      import(
        "../public/content/roadmap/beacon-chain/index.md?collection=content_en"
      ),
    "roadmap/dencun/index.md": () =>
      import("../public/content/roadmap/dencun/index.md?collection=content_en"),
    "roadmap/fusaka/index.md": () =>
      import("../public/content/roadmap/fusaka/index.md?collection=content_en"),
    "roadmap/future-proofing/index.md": () =>
      import(
        "../public/content/roadmap/future-proofing/index.md?collection=content_en"
      ),
    "roadmap/glamsterdam/index.md": () =>
      import(
        "../public/content/roadmap/glamsterdam/index.md?collection=content_en"
      ),
    "roadmap/merge/index.md": () =>
      import("../public/content/roadmap/merge/index.md?collection=content_en"),
    "roadmap/pbs/index.md": () =>
      import("../public/content/roadmap/pbs/index.md?collection=content_en"),
    "roadmap/pectra/index.md": () =>
      import("../public/content/roadmap/pectra/index.md?collection=content_en"),
    "roadmap/scaling/index.md": () =>
      import(
        "../public/content/roadmap/scaling/index.md?collection=content_en"
      ),
    "roadmap/secret-leader-election/index.md": () =>
      import(
        "../public/content/roadmap/secret-leader-election/index.md?collection=content_en"
      ),
    "roadmap/security/index.md": () =>
      import(
        "../public/content/roadmap/security/index.md?collection=content_en"
      ),
    "roadmap/single-slot-finality/index.md": () =>
      import(
        "../public/content/roadmap/single-slot-finality/index.md?collection=content_en"
      ),
    "roadmap/statelessness/index.md": () =>
      import(
        "../public/content/roadmap/statelessness/index.md?collection=content_en"
      ),
    "roadmap/user-experience/index.md": () =>
      import(
        "../public/content/roadmap/user-experience/index.md?collection=content_en"
      ),
    "roadmap/verkle-trees/index.md": () =>
      import(
        "../public/content/roadmap/verkle-trees/index.md?collection=content_en"
      ),
    "roadmap/zkevm/index.md": () =>
      import("../public/content/roadmap/zkevm/index.md?collection=content_en"),
    "staking/dvt/index.md": () =>
      import("../public/content/staking/dvt/index.md?collection=content_en"),
    "staking/pools/index.md": () =>
      import("../public/content/staking/pools/index.md?collection=content_en"),
    "staking/saas/index.md": () =>
      import("../public/content/staking/saas/index.md?collection=content_en"),
    "staking/solo/index.md": () =>
      import("../public/content/staking/solo/index.md?collection=content_en"),
    "staking/withdrawals/index.md": () =>
      import(
        "../public/content/staking/withdrawals/index.md?collection=content_en"
      ),
    "videos/ai-agents-interview-luna/index.md": () =>
      import(
        "../public/content/videos/ai-agents-interview-luna/index.md?collection=content_en"
      ),
    "videos/atoms-institutions-blockchains-josh-stark/index.md": () =>
      import(
        "../public/content/videos/atoms-institutions-blockchains-josh-stark/index.md?collection=content_en"
      ),
    "videos/blockchain-101-visual-demo/index.md": () =>
      import(
        "../public/content/videos/blockchain-101-visual-demo/index.md?collection=content_en"
      ),
    "videos/blockchain-eth-build/index.md": () =>
      import(
        "../public/content/videos/blockchain-eth-build/index.md?collection=content_en"
      ),
    "videos/crypto-apps-desocial-linda-xie/index.md": () =>
      import(
        "../public/content/videos/crypto-apps-desocial-linda-xie/index.md?collection=content_en"
      ),
    "videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md": () =>
      import(
        "../public/content/videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md?collection=content_en"
      ),
    "videos/crypto-security-passwords/index.md": () =>
      import(
        "../public/content/videos/crypto-security-passwords/index.md?collection=content_en"
      ),
    "videos/dao-build-next-great-city/index.md": () =>
      import(
        "../public/content/videos/dao-build-next-great-city/index.md?collection=content_en"
      ),
    "videos/decentralized-identity-explained/index.md": () =>
      import(
        "../public/content/videos/decentralized-identity-explained/index.md?collection=content_en"
      ),
    "videos/dao-hack-ethereum-classic/index.md": () =>
      import(
        "../public/content/videos/dao-hack-ethereum-classic/index.md?collection=content_en"
      ),
    "videos/decentralized-social-media/index.md": () =>
      import(
        "../public/content/videos/decentralized-social-media/index.md?collection=content_en"
      ),
    "videos/blobspace-101-dencun/index.md": () =>
      import(
        "../public/content/videos/blobspace-101-dencun/index.md?collection=content_en"
      ),
    "videos/defi-future-of-finance/index.md": () =>
      import(
        "../public/content/videos/defi-future-of-finance/index.md?collection=content_en"
      ),
    "videos/defi-history-inception-to-2021/index.md": () =>
      import(
        "../public/content/videos/defi-history-inception-to-2021/index.md?collection=content_en"
      ),
    "videos/desci-movement-juan-benet/index.md": () =>
      import(
        "../public/content/videos/desci-movement-juan-benet/index.md?collection=content_en"
      ),
    "videos/devcon-mumbai-coming-2026/index.md": () =>
      import(
        "../public/content/videos/devcon-mumbai-coming-2026/index.md?collection=content_en"
      ),
    "videos/devconnect-argentina-2025-recap/index.md": () =>
      import(
        "../public/content/videos/devconnect-argentina-2025-recap/index.md?collection=content_en"
      ),
    "videos/devconnect-buenos-aires-promo/index.md": () =>
      import(
        "../public/content/videos/devconnect-buenos-aires-promo/index.md?collection=content_en"
      ),
    "videos/eip-4844-dencun-explained/index.md": () =>
      import(
        "../public/content/videos/eip-4844-dencun-explained/index.md?collection=content_en"
      ),
    "videos/ethereum-core-governance-explained/index.md": () =>
      import(
        "../public/content/videos/ethereum-core-governance-explained/index.md?collection=content_en"
      ),
    "videos/eigenlayer-permissionless-features/index.md": () =>
      import(
        "../public/content/videos/eigenlayer-permissionless-features/index.md?collection=content_en"
      ),
    "videos/ethereum-basics-intro/index.md": () =>
      import(
        "../public/content/videos/ethereum-basics-intro/index.md?collection=content_en"
      ),
    "videos/ethereum-evolution-glamsterdam/index.md": () =>
      import(
        "../public/content/videos/ethereum-evolution-glamsterdam/index.md?collection=content_en"
      ),
    "videos/ethereum-in-30-minutes-vitalik-buterin/index.md": () =>
      import(
        "../public/content/videos/ethereum-in-30-minutes-vitalik-buterin/index.md?collection=content_en"
      ),
    "videos/ethereum-institutional-privacy-panel/index.md": () =>
      import(
        "../public/content/videos/ethereum-institutional-privacy-panel/index.md?collection=content_en"
      ),
    "videos/ethereum-localism-global-protocols-local-power/index.md": () =>
      import(
        "../public/content/videos/ethereum-localism-global-protocols-local-power/index.md?collection=content_en"
      ),
    "videos/ethereum-staking-withdrawals/index.md": () =>
      import(
        "../public/content/videos/ethereum-staking-withdrawals/index.md?collection=content_en"
      ),
    "videos/ethereum-things-i-like-mariano-conti/index.md": () =>
      import(
        "../public/content/videos/ethereum-things-i-like-mariano-conti/index.md?collection=content_en"
      ),
    "videos/fusaka-upgrade-explained/index.md": () =>
      import(
        "../public/content/videos/fusaka-upgrade-explained/index.md?collection=content_en"
      ),
    "videos/ethereums-quantum-plan-justin-drake/index.md": () =>
      import(
        "../public/content/videos/ethereums-quantum-plan-justin-drake/index.md?collection=content_en"
      ),
    "videos/hash-function-eth-build/index.md": () =>
      import(
        "../public/content/videos/hash-function-eth-build/index.md?collection=content_en"
      ),
    "videos/how-to-be-cypherpunk-juan-benet/index.md": () =>
      import(
        "../public/content/videos/how-to-be-cypherpunk-juan-benet/index.md?collection=content_en"
      ),
    "videos/how-to-make-a-guerilla-l2/index.md": () =>
      import(
        "../public/content/videos/how-to-make-a-guerilla-l2/index.md?collection=content_en"
      ),
    "videos/key-pair-eth-build/index.md": () =>
      import(
        "../public/content/videos/key-pair-eth-build/index.md?collection=content_en"
      ),
    "videos/layer-2-scaling-explained/index.md": () =>
      import(
        "../public/content/videos/layer-2-scaling-explained/index.md?collection=content_en"
      ),
    "videos/learn-nfts-and-defi/index.md": () =>
      import(
        "../public/content/videos/learn-nfts-and-defi/index.md?collection=content_en"
      ),
    "videos/next-10-years-of-ethereum/index.md": () =>
      import(
        "../public/content/videos/next-10-years-of-ethereum/index.md?collection=content_en"
      ),
    "videos/pectra-what-stakers-need-to-know/index.md": () =>
      import(
        "../public/content/videos/pectra-what-stakers-need-to-know/index.md?collection=content_en"
      ),
    "videos/pectra-upgrade-overview/index.md": () =>
      import(
        "../public/content/videos/pectra-upgrade-overview/index.md?collection=content_en"
      ),
    "videos/pos-reorgs-attack-defense/index.md": () =>
      import(
        "../public/content/videos/pos-reorgs-attack-defense/index.md?collection=content_en"
      ),
    "videos/post-quantum-security-ethereum-roadmap/index.md": () =>
      import(
        "../public/content/videos/post-quantum-security-ethereum-roadmap/index.md?collection=content_en"
      ),
    "videos/pow-vs-pos/index.md": () =>
      import(
        "../public/content/videos/pow-vs-pos/index.md?collection=content_en"
      ),
    "videos/privacy-is-existential/index.md": () =>
      import(
        "../public/content/videos/privacy-is-existential/index.md?collection=content_en"
      ),
    "videos/proof-of-authority-explained/index.md": () =>
      import(
        "../public/content/videos/proof-of-authority-explained/index.md?collection=content_en"
      ),
    "videos/proof-of-work-explained/index.md": () =>
      import(
        "../public/content/videos/proof-of-work-explained/index.md?collection=content_en"
      ),
    "videos/proposer-builder-separation/index.md": () =>
      import(
        "../public/content/videos/proposer-builder-separation/index.md?collection=content_en"
      ),
    "videos/real-state-of-l2s-bartek-kiepuszewski/index.md": () =>
      import(
        "../public/content/videos/real-state-of-l2s-bartek-kiepuszewski/index.md?collection=content_en"
      ),
    "videos/regenerative-finance-refi/index.md": () =>
      import(
        "../public/content/videos/regenerative-finance-refi/index.md?collection=content_en"
      ),
    "videos/restaking-explained/index.md": () =>
      import(
        "../public/content/videos/restaking-explained/index.md?collection=content_en"
      ),
    "videos/rollups-scaling-strategy/index.md": () =>
      import(
        "../public/content/videos/rollups-scaling-strategy/index.md?collection=content_en"
      ),
    "videos/security-through-obscurity-microdots/index.md": () =>
      import(
        "../public/content/videos/security-through-obscurity-microdots/index.md?collection=content_en"
      ),
    "videos/smart-contracts-code-is-law/index.md": () =>
      import(
        "../public/content/videos/smart-contracts-code-is-law/index.md?collection=content_en"
      ),
    "videos/stani-kulechov-building-aave/index.md": () =>
      import(
        "../public/content/videos/stani-kulechov-building-aave/index.md?collection=content_en"
      ),
    "videos/surveillance-silence-reclaiming-privacy/index.md": () =>
      import(
        "../public/content/videos/surveillance-silence-reclaiming-privacy/index.md?collection=content_en"
      ),
    "videos/transactions-eth-build/index.md": () =>
      import(
        "../public/content/videos/transactions-eth-build/index.md?collection=content_en"
      ),
    "videos/understanding-consensus-mechanisms/index.md": () =>
      import(
        "../public/content/videos/understanding-consensus-mechanisms/index.md?collection=content_en"
      ),
    "videos/what-is-a-dapp/index.md": () =>
      import(
        "../public/content/videos/what-is-a-dapp/index.md?collection=content_en"
      ),
    "videos/zero-knowledge-proofs-5-levels/index.md": () =>
      import(
        "../public/content/videos/zero-knowledge-proofs-5-levels/index.md?collection=content_en"
      ),
    "community/events/organizing/index.md": () =>
      import(
        "../public/content/community/events/organizing/index.md?collection=content_en"
      ),
    "community/support/faq/index.md": () =>
      import(
        "../public/content/community/support/faq/index.md?collection=content_en"
      ),
    "community/support/misconceptions/index.md": () =>
      import(
        "../public/content/community/support/misconceptions/index.md?collection=content_en"
      ),
    "community/support/scams/index.md": () =>
      import(
        "../public/content/community/support/scams/index.md?collection=content_en"
      ),
    "contributing/design/adding-design-resources/index.md": () =>
      import(
        "../public/content/contributing/design/adding-design-resources/index.md?collection=content_en"
      ),
    "contributing/style-guide/content-standardization/index.md": () =>
      import(
        "../public/content/contributing/style-guide/content-standardization/index.md?collection=content_en"
      ),
    "contributing/translation-program/faq/index.md": () =>
      import(
        "../public/content/contributing/translation-program/faq/index.md?collection=content_en"
      ),
    "contributing/translation-program/how-to-translate/index.md": () =>
      import(
        "../public/content/contributing/translation-program/how-to-translate/index.md?collection=content_en"
      ),
    "contributing/translation-program/mission-and-vision/index.md": () =>
      import(
        "../public/content/contributing/translation-program/mission-and-vision/index.md?collection=content_en"
      ),
    "contributing/translation-program/playbook/index.md": () =>
      import(
        "../public/content/contributing/translation-program/playbook/index.md?collection=content_en"
      ),
    "contributing/translation-program/resources/index.md": () =>
      import(
        "../public/content/contributing/translation-program/resources/index.md?collection=content_en"
      ),
    "contributing/translation-program/translatathon/index.md": () =>
      import(
        "../public/content/contributing/translation-program/translatathon/index.md?collection=content_en"
      ),
    "contributing/translation-program/translators-guide/index.md": () =>
      import(
        "../public/content/contributing/translation-program/translators-guide/index.md?collection=content_en"
      ),
    "developers/docs/accounts/index.md": () =>
      import(
        "../public/content/developers/docs/accounts/index.md?collection=content_en"
      ),
    "developers/docs/blocks/index.md": () =>
      import(
        "../public/content/developers/docs/blocks/index.md?collection=content_en"
      ),
    "developers/docs/bridges/index.md": () =>
      import(
        "../public/content/developers/docs/bridges/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/index.md?collection=content_en"
      ),
    "developers/docs/dapps/index.md": () =>
      import(
        "../public/content/developers/docs/dapps/index.md?collection=content_en"
      ),
    "developers/docs/data-and-analytics/index.md": () =>
      import(
        "../public/content/developers/docs/data-and-analytics/index.md?collection=content_en"
      ),
    "developers/docs/data-availability/index.md": () =>
      import(
        "../public/content/developers/docs/data-availability/index.md?collection=content_en"
      ),
    "developers/docs/data-structures-and-encoding/index.md": () =>
      import(
        "../public/content/developers/docs/data-structures-and-encoding/index.md?collection=content_en"
      ),
    "developers/docs/design-and-ux/index.md": () =>
      import(
        "../public/content/developers/docs/design-and-ux/index.md?collection=content_en"
      ),
    "developers/docs/development-networks/index.md": () =>
      import(
        "../public/content/developers/docs/development-networks/index.md?collection=content_en"
      ),
    "developers/docs/ethereum-stack/index.md": () =>
      import(
        "../public/content/developers/docs/ethereum-stack/index.md?collection=content_en"
      ),
    "developers/docs/evm/index.md": () =>
      import(
        "../public/content/developers/docs/evm/index.md?collection=content_en"
      ),
    "developers/docs/frameworks/index.md": () =>
      import(
        "../public/content/developers/docs/frameworks/index.md?collection=content_en"
      ),
    "developers/docs/gas/index.md": () =>
      import(
        "../public/content/developers/docs/gas/index.md?collection=content_en"
      ),
    "developers/docs/ides/index.md": () =>
      import(
        "../public/content/developers/docs/ides/index.md?collection=content_en"
      ),
    "developers/docs/intro-to-ether/index.md": () =>
      import(
        "../public/content/developers/docs/intro-to-ether/index.md?collection=content_en"
      ),
    "developers/docs/intro-to-ethereum/index.md": () =>
      import(
        "../public/content/developers/docs/intro-to-ethereum/index.md?collection=content_en"
      ),
    "developers/docs/mev/index.md": () =>
      import(
        "../public/content/developers/docs/mev/index.md?collection=content_en"
      ),
    "developers/docs/networking-layer/index.md": () =>
      import(
        "../public/content/developers/docs/networking-layer/index.md?collection=content_en"
      ),
    "developers/docs/networks/index.md": () =>
      import(
        "../public/content/developers/docs/networks/index.md?collection=content_en"
      ),
    "developers/docs/nodes-and-clients/index.md": () =>
      import(
        "../public/content/developers/docs/nodes-and-clients/index.md?collection=content_en"
      ),
    "developers/docs/oracles/index.md": () =>
      import(
        "../public/content/developers/docs/oracles/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/index.md?collection=content_en"
      ),
    "developers/docs/scaling/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/index.md?collection=content_en"
      ),
    "developers/docs/standards/index.md": () =>
      import(
        "../public/content/developers/docs/standards/index.md?collection=content_en"
      ),
    "developers/docs/storage/index.md": () =>
      import(
        "../public/content/developers/docs/storage/index.md?collection=content_en"
      ),
    "developers/docs/transactions/index.md": () =>
      import(
        "../public/content/developers/docs/transactions/index.md?collection=content_en"
      ),
    "developers/docs/web2-vs-web3/index.md": () =>
      import(
        "../public/content/developers/docs/web2-vs-web3/index.md?collection=content_en"
      ),
    "developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md?collection=content_en"
        ),
    "developers/tutorials/all-you-can-cache/index.md": () =>
      import(
        "../public/content/developers/tutorials/all-you-can-cache/index.md?collection=content_en"
      ),
    "developers/tutorials/ai-trading-agent/index.md": () =>
      import(
        "../public/content/developers/tutorials/ai-trading-agent/index.md?collection=content_en"
      ),
    "developers/tutorials/app-plasma/index.md": () =>
      import(
        "../public/content/developers/tutorials/app-plasma/index.md?collection=content_en"
      ),
    "developers/tutorials/calling-a-smart-contract-from-javascript/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/calling-a-smart-contract-from-javascript/index.md?collection=content_en"
        ),
    "developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md": () =>
      import(
        "../public/content/developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md?collection=content_en"
      ),
    "developers/tutorials/deploying-your-first-smart-contract/index.md": () =>
      import(
        "../public/content/developers/tutorials/deploying-your-first-smart-contract/index.md?collection=content_en"
      ),
    "developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md?collection=content_en"
        ),
    "developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md?collection=content_en"
        ),
    "developers/tutorials/erc-721-vyper-annotated-code/index.md": () =>
      import(
        "../public/content/developers/tutorials/erc-721-vyper-annotated-code/index.md?collection=content_en"
      ),
    "developers/tutorials/eip-1271-smart-contract-signatures/index.md": () =>
      import(
        "../public/content/developers/tutorials/eip-1271-smart-contract-signatures/index.md?collection=content_en"
      ),
    "developers/tutorials/erc20-annotated-code/index.md": () =>
      import(
        "../public/content/developers/tutorials/erc20-annotated-code/index.md?collection=content_en"
      ),
    "developers/tutorials/erc20-with-safety-rails/index.md": () =>
      import(
        "../public/content/developers/tutorials/erc20-with-safety-rails/index.md?collection=content_en"
      ),
    "developers/tutorials/ethereum-for-web2-auth/index.md": () =>
      import(
        "../public/content/developers/tutorials/ethereum-for-web2-auth/index.md?collection=content_en"
      ),
    "developers/tutorials/gasless/index.md": () =>
      import(
        "../public/content/developers/tutorials/gasless/index.md?collection=content_en"
      ),
    "developers/tutorials/gasless-token/index.md": () =>
      import(
        "../public/content/developers/tutorials/gasless-token/index.md?collection=content_en"
      ),
    "developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md?collection=content_en"
        ),
    "developers/tutorials/guide-to-smart-contract-security-tools/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/guide-to-smart-contract-security-tools/index.md?collection=content_en"
        ),
    "developers/tutorials/hello-world-smart-contract-fullstack/index.md": () =>
      import(
        "../public/content/developers/tutorials/hello-world-smart-contract-fullstack/index.md?collection=content_en"
      ),
    "developers/tutorials/hello-world-smart-contract/index.md": () =>
      import(
        "../public/content/developers/tutorials/hello-world-smart-contract/index.md?collection=content_en"
      ),
    "developers/tutorials/how-to-implement-an-erc721-market/index.md": () =>
      import(
        "../public/content/developers/tutorials/how-to-implement-an-erc721-market/index.md?collection=content_en"
      ),
    "developers/tutorials/how-to-mint-an-nft/index.md": () =>
      import(
        "../public/content/developers/tutorials/how-to-mint-an-nft/index.md?collection=content_en"
      ),
    "developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md?collection=content_en"
        ),
    "developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md?collection=content_en"
        ),
    "developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md?collection=content_en"
        ),
    "developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md?collection=content_en"
        ),
    "developers/tutorials/how-to-view-nft-in-metamask/index.md": () =>
      import(
        "../public/content/developers/tutorials/how-to-view-nft-in-metamask/index.md?collection=content_en"
      ),
    "developers/tutorials/how-to-write-and-deploy-an-nft/index.md": () =>
      import(
        "../public/content/developers/tutorials/how-to-write-and-deploy-an-nft/index.md?collection=content_en"
      ),
    "developers/tutorials/interact-with-other-contracts-from-solidity/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/interact-with-other-contracts-from-solidity/index.md?collection=content_en"
        ),
    "developers/tutorials/how-to-use-tellor-as-your-oracle/index.md": () =>
      import(
        "../public/content/developers/tutorials/how-to-use-tellor-as-your-oracle/index.md?collection=content_en"
      ),
    "developers/tutorials/ipfs-decentralized-ui/index.md": () =>
      import(
        "../public/content/developers/tutorials/ipfs-decentralized-ui/index.md?collection=content_en"
      ),
    "developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md?collection=content_en"
        ),
    "developers/tutorials/logging-events-smart-contracts/index.md": () =>
      import(
        "../public/content/developers/tutorials/logging-events-smart-contracts/index.md?collection=content_en"
      ),
    "developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md?collection=content_en"
        ),
    "developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md?collection=content_en"
        ),
    "developers/tutorials/nft-minter/index.md": () =>
      import(
        "../public/content/developers/tutorials/nft-minter/index.md?collection=content_en"
      ),
    "developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md?collection=content_en"
        ),
    "developers/tutorials/optimism-std-bridge-annotated-code/index.md": () =>
      import(
        "../public/content/developers/tutorials/optimism-std-bridge-annotated-code/index.md?collection=content_en"
      ),
    "developers/tutorials/reverse-engineering-a-contract/index.md": () =>
      import(
        "../public/content/developers/tutorials/reverse-engineering-a-contract/index.md?collection=content_en"
      ),
    "developers/tutorials/run-node-raspberry-pi/index.md": () =>
      import(
        "../public/content/developers/tutorials/run-node-raspberry-pi/index.md?collection=content_en"
      ),
    "developers/tutorials/scam-token-tricks/index.md": () =>
      import(
        "../public/content/developers/tutorials/scam-token-tricks/index.md?collection=content_en"
      ),
    "developers/tutorials/secure-development-workflow/index.md": () =>
      import(
        "../public/content/developers/tutorials/secure-development-workflow/index.md?collection=content_en"
      ),
    "developers/tutorials/secret-state/index.md": () =>
      import(
        "../public/content/developers/tutorials/secret-state/index.md?collection=content_en"
      ),
    "developers/tutorials/send-token-ethersjs/index.md": () =>
      import(
        "../public/content/developers/tutorials/send-token-ethersjs/index.md?collection=content_en"
      ),
    "developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md?collection=content_en"
        ),
    "developers/tutorials/server-components/index.md": () =>
      import(
        "../public/content/developers/tutorials/server-components/index.md?collection=content_en"
      ),
    "developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md?collection=content_en"
        ),
    "developers/tutorials/short-abi/index.md": () =>
      import(
        "../public/content/developers/tutorials/short-abi/index.md?collection=content_en"
      ),
    "developers/tutorials/smart-contract-security-guidelines/index.md": () =>
      import(
        "../public/content/developers/tutorials/smart-contract-security-guidelines/index.md?collection=content_en"
      ),
    "developers/tutorials/stealth-addr/index.md": () =>
      import(
        "../public/content/developers/tutorials/stealth-addr/index.md?collection=content_en"
      ),
    "developers/tutorials/the-graph-fixing-web3-data-querying/index.md": () =>
      import(
        "../public/content/developers/tutorials/the-graph-fixing-web3-data-querying/index.md?collection=content_en"
      ),
    "developers/tutorials/token-integration-checklist/index.md": () =>
      import(
        "../public/content/developers/tutorials/token-integration-checklist/index.md?collection=content_en"
      ),
    "developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md?collection=content_en"
        ),
    "developers/tutorials/understand-the-erc-20-token-smart-contract/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/understand-the-erc-20-token-smart-contract/index.md?collection=content_en"
        ),
    "developers/tutorials/using-websockets/index.md": () =>
      import(
        "../public/content/developers/tutorials/using-websockets/index.md?collection=content_en"
      ),
    "developers/tutorials/uniswap-v2-annotated-code/index.md": () =>
      import(
        "../public/content/developers/tutorials/uniswap-v2-annotated-code/index.md?collection=content_en"
      ),
    "developers/tutorials/yellow-paper-evm/index.md": () =>
      import(
        "../public/content/developers/tutorials/yellow-paper-evm/index.md?collection=content_en"
      ),
    "roadmap/fusaka/peerdas/index.md": () =>
      import(
        "../public/content/roadmap/fusaka/peerdas/index.md?collection=content_en"
      ),
    "roadmap/future-proofing/quantum-resistance/index.md": () =>
      import(
        "../public/content/roadmap/future-proofing/quantum-resistance/index.md?collection=content_en"
      ),
    "roadmap/merge/issuance/index.md": () =>
      import(
        "../public/content/roadmap/merge/issuance/index.md?collection=content_en"
      ),
    "roadmap/pectra/7702/index.md": () =>
      import(
        "../public/content/roadmap/pectra/7702/index.md?collection=content_en"
      ),
    "roadmap/pectra/maxeb/index.md": () =>
      import(
        "../public/content/roadmap/pectra/maxeb/index.md?collection=content_en"
      ),
    "contributing/translation-program/translatathon/details/index.md": () =>
      import(
        "../public/content/contributing/translation-program/translatathon/details/index.md?collection=content_en"
      ),
    "contributing/translation-program/translatathon/terms-and-conditions/index.md":
      () =>
        import(
          "../public/content/contributing/translation-program/translatathon/terms-and-conditions/index.md?collection=content_en"
        ),
    "developers/docs/apis/backend/index.md": () =>
      import(
        "../public/content/developers/docs/apis/backend/index.md?collection=content_en"
      ),
    "developers/docs/apis/javascript/index.md": () =>
      import(
        "../public/content/developers/docs/apis/javascript/index.md?collection=content_en"
      ),
    "developers/docs/apis/json-rpc/index.md": () =>
      import(
        "../public/content/developers/docs/apis/json-rpc/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/poa/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/poa/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pow/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pow/index.md?collection=content_en"
      ),
    "developers/docs/data-and-analytics/block-explorers/index.md": () =>
      import(
        "../public/content/developers/docs/data-and-analytics/block-explorers/index.md?collection=content_en"
      ),
    "developers/docs/data-availability/blockchain-data-storage-strategies/index.md":
      () =>
        import(
          "../public/content/developers/docs/data-availability/blockchain-data-storage-strategies/index.md?collection=content_en"
        ),
    "developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md":
      () =>
        import(
          "../public/content/developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md?collection=content_en"
        ),
    "developers/docs/data-structures-and-encoding/rlp/index.md": () =>
      import(
        "../public/content/developers/docs/data-structures-and-encoding/rlp/index.md?collection=content_en"
      ),
    "developers/docs/data-structures-and-encoding/ssz/index.md": () =>
      import(
        "../public/content/developers/docs/data-structures-and-encoding/ssz/index.md?collection=content_en"
      ),
    "developers/docs/data-structures-and-encoding/web3-secret-storage/index.md":
      () =>
        import(
          "../public/content/developers/docs/data-structures-and-encoding/web3-secret-storage/index.md?collection=content_en"
        ),
    "developers/docs/design-and-ux/dex-design-best-practice/index.md": () =>
      import(
        "../public/content/developers/docs/design-and-ux/dex-design-best-practice/index.md?collection=content_en"
      ),
    "developers/docs/design-and-ux/heuristics-for-web3/index.md": () =>
      import(
        "../public/content/developers/docs/design-and-ux/heuristics-for-web3/index.md?collection=content_en"
      ),
    "developers/docs/evm/opcodes/index.md": () =>
      import(
        "../public/content/developers/docs/evm/opcodes/index.md?collection=content_en"
      ),
    "developers/docs/networking-layer/network-addresses/index.md": () =>
      import(
        "../public/content/developers/docs/networking-layer/network-addresses/index.md?collection=content_en"
      ),
    "developers/docs/networking-layer/portal-network/index.md": () =>
      import(
        "../public/content/developers/docs/networking-layer/portal-network/index.md?collection=content_en"
      ),
    "developers/docs/nodes-and-clients/archive-nodes/index.md": () =>
      import(
        "../public/content/developers/docs/nodes-and-clients/archive-nodes/index.md?collection=content_en"
      ),
    "developers/docs/nodes-and-clients/bootnodes/index.md": () =>
      import(
        "../public/content/developers/docs/nodes-and-clients/bootnodes/index.md?collection=content_en"
      ),
    "developers/docs/nodes-and-clients/client-diversity/index.md": () =>
      import(
        "../public/content/developers/docs/nodes-and-clients/client-diversity/index.md?collection=content_en"
      ),
    "developers/docs/nodes-and-clients/light-clients/index.md": () =>
      import(
        "../public/content/developers/docs/nodes-and-clients/light-clients/index.md?collection=content_en"
      ),
    "developers/docs/nodes-and-clients/node-architecture/index.md": () =>
      import(
        "../public/content/developers/docs/nodes-and-clients/node-architecture/index.md?collection=content_en"
      ),
    "developers/docs/nodes-and-clients/nodes-as-a-service/index.md": () =>
      import(
        "../public/content/developers/docs/nodes-and-clients/nodes-as-a-service/index.md?collection=content_en"
      ),
    "developers/docs/nodes-and-clients/run-a-node/index.md": () =>
      import(
        "../public/content/developers/docs/nodes-and-clients/run-a-node/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/dart/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/dart/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/dot-net/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/dot-net/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/delphi/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/delphi/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/elixir/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/elixir/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/golang/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/golang/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/java/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/java/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/javascript/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/javascript/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/python/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/python/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/ruby/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/ruby/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/rust/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/rust/index.md?collection=content_en"
      ),
    "developers/docs/scaling/plasma/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/plasma/index.md?collection=content_en"
      ),
    "developers/docs/scaling/optimistic-rollups/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/optimistic-rollups/index.md?collection=content_en"
      ),
    "developers/docs/scaling/sidechains/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/sidechains/index.md?collection=content_en"
      ),
    "developers/docs/scaling/state-channels/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/state-channels/index.md?collection=content_en"
      ),
    "developers/docs/scaling/validium/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/validium/index.md?collection=content_en"
      ),
    "developers/docs/scaling/zk-rollups/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/zk-rollups/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/anatomy/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/anatomy/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/compiling/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/compiling/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/composability/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/composability/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/deploying/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/deploying/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/formal-verification/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/formal-verification/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/languages/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/languages/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/libraries/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/libraries/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/naming/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/naming/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/security/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/security/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/testing/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/testing/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/upgrading/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/upgrading/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/verifying/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/verifying/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/attestations/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/attestations/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md":
      () =>
        import(
          "../public/content/developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md?collection=content_en"
        ),
    "developers/docs/consensus-mechanisms/pos/gasper/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/gasper/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/faqs/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/faqs/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/block-proposal/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/block-proposal/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/keys/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/keys/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md":
      () =>
        import(
          "../public/content/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md?collection=content_en"
        ),
    "developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md":
      () =>
        import(
          "../public/content/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md?collection=content_en"
        ),
    "developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pow/mining/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-1155/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-1155/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-1363/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-1363/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-20/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-20/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-223/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-223/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-4626/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-4626/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-721/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-721/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-777/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-777/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md":
      () =>
        import(
          "../public/content/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md?collection=content_en"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md":
      () =>
        import(
          "../public/content/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md?collection=content_en"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md":
      () =>
        import(
          "../public/content/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md?collection=content_en"
        ),
  }),
  content_es: create.doc("content_es", {}),
  content_fr: create.doc("content_fr", {}),
  content_hi: create.doc("content_hi", {}),
  content_id: create.doc("content_id", {}),
  content_it: create.doc("content_it", {}),
  content_ja: create.doc("content_ja", {}),
  content_ko: create.doc("content_ko", {}),
  content_mr: create.doc("content_mr", {}),
  content_pl: create.doc("content_pl", {}),
  content_pt_br: create.doc("content_pt_br", {}),
  content_ru: create.doc("content_ru", {}),
  content_sw: create.doc("content_sw", {}),
  content_ta: create.doc("content_ta", {}),
  content_te: create.doc("content_te", {}),
  content_tr: create.doc("content_tr", {}),
  content_uk: create.doc("content_uk", {}),
  content_ur: create.doc("content_ur", {}),
  content_vi: create.doc("content_vi", {}),
  content_zh: create.doc("content_zh", {}),
  content_zh_tw: create.doc("content_zh_tw", {}),
}
export default browserCollections
