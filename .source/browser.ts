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
  content_de: create.doc("content_de", {
    "about/index.md": () =>
      import(
        "../public/content/translations/de/about/index.md?collection=content_de"
      ),
    "contributing/index.md": () =>
      import(
        "../public/content/translations/de/contributing/index.md?collection=content_de"
      ),
    "dao/index.md": () =>
      import(
        "../public/content/translations/de/dao/index.md?collection=content_de"
      ),
    "bridges/index.md": () =>
      import(
        "../public/content/translations/de/bridges/index.md?collection=content_de"
      ),
    "defi/index.md": () =>
      import(
        "../public/content/translations/de/defi/index.md?collection=content_de"
      ),
    "ai-agents/index.md": () =>
      import(
        "../public/content/translations/de/ai-agents/index.md?collection=content_de"
      ),
    "decentralized-identity/index.md": () =>
      import(
        "../public/content/translations/de/decentralized-identity/index.md?collection=content_de"
      ),
    "energy-consumption/index.md": () =>
      import(
        "../public/content/translations/de/energy-consumption/index.md?collection=content_de"
      ),
    "desci/index.md": () =>
      import(
        "../public/content/translations/de/desci/index.md?collection=content_de"
      ),
    "ethereum-forks/index.md": () =>
      import(
        "../public/content/translations/de/ethereum-forks/index.md?collection=content_de"
      ),
    "eips/index.md": () =>
      import(
        "../public/content/translations/de/eips/index.md?collection=content_de"
      ),
    "gaming/index.md": () =>
      import(
        "../public/content/translations/de/gaming/index.md?collection=content_de"
      ),
    "glossary/index.md": () =>
      import(
        "../public/content/translations/de/glossary/index.md?collection=content_de"
      ),
    "foundation/index.md": () =>
      import(
        "../public/content/translations/de/foundation/index.md?collection=content_de"
      ),
    "guides/index.md": () =>
      import(
        "../public/content/translations/de/guides/index.md?collection=content_de"
      ),
    "nft/index.md": () =>
      import(
        "../public/content/translations/de/nft/index.md?collection=content_de"
      ),
    "privacy/index.md": () =>
      import(
        "../public/content/translations/de/privacy/index.md?collection=content_de"
      ),
    "governance/index.md": () =>
      import(
        "../public/content/translations/de/governance/index.md?collection=content_de"
      ),
    "prediction-markets/index.md": () =>
      import(
        "../public/content/translations/de/prediction-markets/index.md?collection=content_de"
      ),
    "real-world-assets/index.md": () =>
      import(
        "../public/content/translations/de/real-world-assets/index.md?collection=content_de"
      ),
    "payments/index.md": () =>
      import(
        "../public/content/translations/de/payments/index.md?collection=content_de"
      ),
    "restaking/index.md": () =>
      import(
        "../public/content/translations/de/restaking/index.md?collection=content_de"
      ),
    "refi/index.md": () =>
      import(
        "../public/content/translations/de/refi/index.md?collection=content_de"
      ),
    "smart-contracts/index.md": () =>
      import(
        "../public/content/translations/de/smart-contracts/index.md?collection=content_de"
      ),
    "social-networks/index.md": () =>
      import(
        "../public/content/translations/de/social-networks/index.md?collection=content_de"
      ),
    "security/index.md": () =>
      import(
        "../public/content/translations/de/security/index.md?collection=content_de"
      ),
    "web3/index.md": () =>
      import(
        "../public/content/translations/de/web3/index.md?collection=content_de"
      ),
    "whitepaper/index.md": () =>
      import(
        "../public/content/translations/de/whitepaper/index.md?collection=content_de"
      ),
    "wrapped-eth/index.md": () =>
      import(
        "../public/content/translations/de/wrapped-eth/index.md?collection=content_de"
      ),
    "what-are-apps/index.md": () =>
      import(
        "../public/content/translations/de/what-are-apps/index.md?collection=content_de"
      ),
    "zero-knowledge-proofs/index.md": () =>
      import(
        "../public/content/translations/de/zero-knowledge-proofs/index.md?collection=content_de"
      ),
    "community/code-of-conduct/index.md": () =>
      import(
        "../public/content/translations/de/community/code-of-conduct/index.md?collection=content_de"
      ),
    "community/get-involved/index.md": () =>
      import(
        "../public/content/translations/de/community/get-involved/index.md?collection=content_de"
      ),
    "community/grants/index.md": () =>
      import(
        "../public/content/translations/de/community/grants/index.md?collection=content_de"
      ),
    "community/online/index.md": () =>
      import(
        "../public/content/translations/de/community/online/index.md?collection=content_de"
      ),
    "community/language-resources/index.md": () =>
      import(
        "../public/content/translations/de/community/language-resources/index.md?collection=content_de"
      ),
    "community/research/index.md": () =>
      import(
        "../public/content/translations/de/community/research/index.md?collection=content_de"
      ),
    "contributing/adding-desci-projects/index.md": () =>
      import(
        "../public/content/translations/de/contributing/adding-desci-projects/index.md?collection=content_de"
      ),
    "contributing/adding-developer-tools/index.md": () =>
      import(
        "../public/content/translations/de/contributing/adding-developer-tools/index.md?collection=content_de"
      ),
    "contributing/adding-exchanges/index.md": () =>
      import(
        "../public/content/translations/de/contributing/adding-exchanges/index.md?collection=content_de"
      ),
    "contributing/adding-glossary-terms/index.md": () =>
      import(
        "../public/content/translations/de/contributing/adding-glossary-terms/index.md?collection=content_de"
      ),
    "contributing/adding-layer-2s/index.md": () =>
      import(
        "../public/content/translations/de/contributing/adding-layer-2s/index.md?collection=content_de"
      ),
    "contributing/adding-products/index.md": () =>
      import(
        "../public/content/translations/de/contributing/adding-products/index.md?collection=content_de"
      ),
    "contributing/adding-resources/index.md": () =>
      import(
        "../public/content/translations/de/contributing/adding-resources/index.md?collection=content_de"
      ),
    "contributing/adding-staking-products/index.md": () =>
      import(
        "../public/content/translations/de/contributing/adding-staking-products/index.md?collection=content_de"
      ),
    "contributing/adding-videos/index.md": () =>
      import(
        "../public/content/translations/de/contributing/adding-videos/index.md?collection=content_de"
      ),
    "contributing/content-resources/index.md": () =>
      import(
        "../public/content/translations/de/contributing/content-resources/index.md?collection=content_de"
      ),
    "contributing/adding-wallets/index.md": () =>
      import(
        "../public/content/translations/de/contributing/adding-wallets/index.md?collection=content_de"
      ),
    "contributing/design/index.md": () =>
      import(
        "../public/content/translations/de/contributing/design/index.md?collection=content_de"
      ),
    "contributing/design-principles/index.md": () =>
      import(
        "../public/content/translations/de/contributing/design-principles/index.md?collection=content_de"
      ),
    "contributing/quizzes/index.md": () =>
      import(
        "../public/content/translations/de/contributing/quizzes/index.md?collection=content_de"
      ),
    "contributing/translation-program/index.md": () =>
      import(
        "../public/content/translations/de/contributing/translation-program/index.md?collection=content_de"
      ),
    "developers/docs/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/index.md?collection=content_de"
      ),
    "eth/supply/index.md": () =>
      import(
        "../public/content/translations/de/eth/supply/index.md?collection=content_de"
      ),
    "guides/how-to-create-an-ethereum-account/index.md": () =>
      import(
        "../public/content/translations/de/guides/how-to-create-an-ethereum-account/index.md?collection=content_de"
      ),
    "guides/how-to-id-scam-tokens/index.md": () =>
      import(
        "../public/content/translations/de/guides/how-to-id-scam-tokens/index.md?collection=content_de"
      ),
    "guides/how-to-revoke-token-access/index.md": () =>
      import(
        "../public/content/translations/de/guides/how-to-revoke-token-access/index.md?collection=content_de"
      ),
    "guides/how-to-swap-tokens/index.md": () =>
      import(
        "../public/content/translations/de/guides/how-to-swap-tokens/index.md?collection=content_de"
      ),
    "guides/how-to-use-a-bridge/index.md": () =>
      import(
        "../public/content/translations/de/guides/how-to-use-a-bridge/index.md?collection=content_de"
      ),
    "guides/how-to-use-a-wallet/index.md": () =>
      import(
        "../public/content/translations/de/guides/how-to-use-a-wallet/index.md?collection=content_de"
      ),
    "roadmap/account-abstraction/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/account-abstraction/index.md?collection=content_de"
      ),
    "roadmap/beacon-chain/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/beacon-chain/index.md?collection=content_de"
      ),
    "roadmap/danksharding/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/danksharding/index.md?collection=content_de"
      ),
    "roadmap/dencun/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/dencun/index.md?collection=content_de"
      ),
    "roadmap/fusaka/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/fusaka/index.md?collection=content_de"
      ),
    "roadmap/future-proofing/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/future-proofing/index.md?collection=content_de"
      ),
    "roadmap/glamsterdam/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/glamsterdam/index.md?collection=content_de"
      ),
    "roadmap/merge/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/merge/index.md?collection=content_de"
      ),
    "roadmap/pbs/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/pbs/index.md?collection=content_de"
      ),
    "roadmap/pectra/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/pectra/index.md?collection=content_de"
      ),
    "roadmap/scaling/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/scaling/index.md?collection=content_de"
      ),
    "roadmap/secret-leader-election/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/secret-leader-election/index.md?collection=content_de"
      ),
    "roadmap/security/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/security/index.md?collection=content_de"
      ),
    "roadmap/single-slot-finality/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/single-slot-finality/index.md?collection=content_de"
      ),
    "roadmap/statelessness/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/statelessness/index.md?collection=content_de"
      ),
    "roadmap/user-experience/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/user-experience/index.md?collection=content_de"
      ),
    "roadmap/verkle-trees/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/verkle-trees/index.md?collection=content_de"
      ),
    "roadmap/zkevm/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/zkevm/index.md?collection=content_de"
      ),
    "staking/dvt/index.md": () =>
      import(
        "../public/content/translations/de/staking/dvt/index.md?collection=content_de"
      ),
    "staking/saas/index.md": () =>
      import(
        "../public/content/translations/de/staking/saas/index.md?collection=content_de"
      ),
    "staking/withdrawals/index.md": () =>
      import(
        "../public/content/translations/de/staking/withdrawals/index.md?collection=content_de"
      ),
    "staking/solo/index.md": () =>
      import(
        "../public/content/translations/de/staking/solo/index.md?collection=content_de"
      ),
    "staking/pools/index.md": () =>
      import(
        "../public/content/translations/de/staking/pools/index.md?collection=content_de"
      ),
    "videos/ai-agents-interview-luna/index.md": () =>
      import(
        "../public/content/translations/de/videos/ai-agents-interview-luna/index.md?collection=content_de"
      ),
    "videos/atoms-institutions-blockchains-josh-stark/index.md": () =>
      import(
        "../public/content/translations/de/videos/atoms-institutions-blockchains-josh-stark/index.md?collection=content_de"
      ),
    "videos/blobspace-101-dencun/index.md": () =>
      import(
        "../public/content/translations/de/videos/blobspace-101-dencun/index.md?collection=content_de"
      ),
    "videos/blockchain-101-visual-demo/index.md": () =>
      import(
        "../public/content/translations/de/videos/blockchain-101-visual-demo/index.md?collection=content_de"
      ),
    "videos/blockchain-eth-build/index.md": () =>
      import(
        "../public/content/translations/de/videos/blockchain-eth-build/index.md?collection=content_de"
      ),
    "videos/crypto-apps-desocial-linda-xie/index.md": () =>
      import(
        "../public/content/translations/de/videos/crypto-apps-desocial-linda-xie/index.md?collection=content_de"
      ),
    "videos/crypto-security-passwords/index.md": () =>
      import(
        "../public/content/translations/de/videos/crypto-security-passwords/index.md?collection=content_de"
      ),
    "videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md": () =>
      import(
        "../public/content/translations/de/videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md?collection=content_de"
      ),
    "videos/dao-build-next-great-city/index.md": () =>
      import(
        "../public/content/translations/de/videos/dao-build-next-great-city/index.md?collection=content_de"
      ),
    "videos/dao-hack-ethereum-classic/index.md": () =>
      import(
        "../public/content/translations/de/videos/dao-hack-ethereum-classic/index.md?collection=content_de"
      ),
    "videos/decentralized-identity-explained/index.md": () =>
      import(
        "../public/content/translations/de/videos/decentralized-identity-explained/index.md?collection=content_de"
      ),
    "videos/decentralized-social-media/index.md": () =>
      import(
        "../public/content/translations/de/videos/decentralized-social-media/index.md?collection=content_de"
      ),
    "videos/defi-future-of-finance/index.md": () =>
      import(
        "../public/content/translations/de/videos/defi-future-of-finance/index.md?collection=content_de"
      ),
    "videos/desci-movement-juan-benet/index.md": () =>
      import(
        "../public/content/translations/de/videos/desci-movement-juan-benet/index.md?collection=content_de"
      ),
    "videos/devcon-mumbai-coming-2026/index.md": () =>
      import(
        "../public/content/translations/de/videos/devcon-mumbai-coming-2026/index.md?collection=content_de"
      ),
    "videos/defi-history-inception-to-2021/index.md": () =>
      import(
        "../public/content/translations/de/videos/defi-history-inception-to-2021/index.md?collection=content_de"
      ),
    "videos/devconnect-argentina-2025-recap/index.md": () =>
      import(
        "../public/content/translations/de/videos/devconnect-argentina-2025-recap/index.md?collection=content_de"
      ),
    "videos/devconnect-buenos-aires-promo/index.md": () =>
      import(
        "../public/content/translations/de/videos/devconnect-buenos-aires-promo/index.md?collection=content_de"
      ),
    "videos/eigenlayer-permissionless-features/index.md": () =>
      import(
        "../public/content/translations/de/videos/eigenlayer-permissionless-features/index.md?collection=content_de"
      ),
    "videos/eip-4844-dencun-explained/index.md": () =>
      import(
        "../public/content/translations/de/videos/eip-4844-dencun-explained/index.md?collection=content_de"
      ),
    "videos/ethereum-basics-intro/index.md": () =>
      import(
        "../public/content/translations/de/videos/ethereum-basics-intro/index.md?collection=content_de"
      ),
    "videos/ethereum-core-governance-explained/index.md": () =>
      import(
        "../public/content/translations/de/videos/ethereum-core-governance-explained/index.md?collection=content_de"
      ),
    "videos/ethereum-evolution-glamsterdam/index.md": () =>
      import(
        "../public/content/translations/de/videos/ethereum-evolution-glamsterdam/index.md?collection=content_de"
      ),
    "videos/ethereum-in-30-minutes-vitalik-buterin/index.md": () =>
      import(
        "../public/content/translations/de/videos/ethereum-in-30-minutes-vitalik-buterin/index.md?collection=content_de"
      ),
    "videos/ethereum-institutional-privacy-panel/index.md": () =>
      import(
        "../public/content/translations/de/videos/ethereum-institutional-privacy-panel/index.md?collection=content_de"
      ),
    "videos/ethereum-localism-global-protocols-local-power/index.md": () =>
      import(
        "../public/content/translations/de/videos/ethereum-localism-global-protocols-local-power/index.md?collection=content_de"
      ),
    "videos/ethereum-staking-withdrawals/index.md": () =>
      import(
        "../public/content/translations/de/videos/ethereum-staking-withdrawals/index.md?collection=content_de"
      ),
    "videos/ethereum-things-i-like-mariano-conti/index.md": () =>
      import(
        "../public/content/translations/de/videos/ethereum-things-i-like-mariano-conti/index.md?collection=content_de"
      ),
    "videos/ethereums-quantum-plan-justin-drake/index.md": () =>
      import(
        "../public/content/translations/de/videos/ethereums-quantum-plan-justin-drake/index.md?collection=content_de"
      ),
    "videos/hash-function-eth-build/index.md": () =>
      import(
        "../public/content/translations/de/videos/hash-function-eth-build/index.md?collection=content_de"
      ),
    "videos/fusaka-upgrade-explained/index.md": () =>
      import(
        "../public/content/translations/de/videos/fusaka-upgrade-explained/index.md?collection=content_de"
      ),
    "videos/how-to-be-cypherpunk-juan-benet/index.md": () =>
      import(
        "../public/content/translations/de/videos/how-to-be-cypherpunk-juan-benet/index.md?collection=content_de"
      ),
    "videos/how-to-make-a-guerilla-l2/index.md": () =>
      import(
        "../public/content/translations/de/videos/how-to-make-a-guerilla-l2/index.md?collection=content_de"
      ),
    "videos/key-pair-eth-build/index.md": () =>
      import(
        "../public/content/translations/de/videos/key-pair-eth-build/index.md?collection=content_de"
      ),
    "videos/layer-2-scaling-explained/index.md": () =>
      import(
        "../public/content/translations/de/videos/layer-2-scaling-explained/index.md?collection=content_de"
      ),
    "videos/learn-nfts-and-defi/index.md": () =>
      import(
        "../public/content/translations/de/videos/learn-nfts-and-defi/index.md?collection=content_de"
      ),
    "videos/next-10-years-of-ethereum/index.md": () =>
      import(
        "../public/content/translations/de/videos/next-10-years-of-ethereum/index.md?collection=content_de"
      ),
    "videos/pectra-upgrade-overview/index.md": () =>
      import(
        "../public/content/translations/de/videos/pectra-upgrade-overview/index.md?collection=content_de"
      ),
    "videos/pectra-what-stakers-need-to-know/index.md": () =>
      import(
        "../public/content/translations/de/videos/pectra-what-stakers-need-to-know/index.md?collection=content_de"
      ),
    "videos/pos-reorgs-attack-defense/index.md": () =>
      import(
        "../public/content/translations/de/videos/pos-reorgs-attack-defense/index.md?collection=content_de"
      ),
    "videos/post-quantum-security-ethereum-roadmap/index.md": () =>
      import(
        "../public/content/translations/de/videos/post-quantum-security-ethereum-roadmap/index.md?collection=content_de"
      ),
    "videos/pow-vs-pos/index.md": () =>
      import(
        "../public/content/translations/de/videos/pow-vs-pos/index.md?collection=content_de"
      ),
    "videos/proof-of-authority-explained/index.md": () =>
      import(
        "../public/content/translations/de/videos/proof-of-authority-explained/index.md?collection=content_de"
      ),
    "videos/privacy-is-existential/index.md": () =>
      import(
        "../public/content/translations/de/videos/privacy-is-existential/index.md?collection=content_de"
      ),
    "videos/proof-of-work-explained/index.md": () =>
      import(
        "../public/content/translations/de/videos/proof-of-work-explained/index.md?collection=content_de"
      ),
    "videos/proposer-builder-separation/index.md": () =>
      import(
        "../public/content/translations/de/videos/proposer-builder-separation/index.md?collection=content_de"
      ),
    "videos/real-state-of-l2s-bartek-kiepuszewski/index.md": () =>
      import(
        "../public/content/translations/de/videos/real-state-of-l2s-bartek-kiepuszewski/index.md?collection=content_de"
      ),
    "videos/regenerative-finance-refi/index.md": () =>
      import(
        "../public/content/translations/de/videos/regenerative-finance-refi/index.md?collection=content_de"
      ),
    "videos/restaking-explained/index.md": () =>
      import(
        "../public/content/translations/de/videos/restaking-explained/index.md?collection=content_de"
      ),
    "videos/rollups-scaling-strategy/index.md": () =>
      import(
        "../public/content/translations/de/videos/rollups-scaling-strategy/index.md?collection=content_de"
      ),
    "videos/security-through-obscurity-microdots/index.md": () =>
      import(
        "../public/content/translations/de/videos/security-through-obscurity-microdots/index.md?collection=content_de"
      ),
    "videos/smart-contracts-code-is-law/index.md": () =>
      import(
        "../public/content/translations/de/videos/smart-contracts-code-is-law/index.md?collection=content_de"
      ),
    "videos/stani-kulechov-building-aave/index.md": () =>
      import(
        "../public/content/translations/de/videos/stani-kulechov-building-aave/index.md?collection=content_de"
      ),
    "videos/surveillance-silence-reclaiming-privacy/index.md": () =>
      import(
        "../public/content/translations/de/videos/surveillance-silence-reclaiming-privacy/index.md?collection=content_de"
      ),
    "videos/transactions-eth-build/index.md": () =>
      import(
        "../public/content/translations/de/videos/transactions-eth-build/index.md?collection=content_de"
      ),
    "videos/understanding-consensus-mechanisms/index.md": () =>
      import(
        "../public/content/translations/de/videos/understanding-consensus-mechanisms/index.md?collection=content_de"
      ),
    "videos/what-is-a-dapp/index.md": () =>
      import(
        "../public/content/translations/de/videos/what-is-a-dapp/index.md?collection=content_de"
      ),
    "videos/zero-knowledge-proofs-5-levels/index.md": () =>
      import(
        "../public/content/translations/de/videos/zero-knowledge-proofs-5-levels/index.md?collection=content_de"
      ),
    "community/events/organizing/index.md": () =>
      import(
        "../public/content/translations/de/community/events/organizing/index.md?collection=content_de"
      ),
    "community/support/faq/index.md": () =>
      import(
        "../public/content/translations/de/community/support/faq/index.md?collection=content_de"
      ),
    "community/support/misconceptions/index.md": () =>
      import(
        "../public/content/translations/de/community/support/misconceptions/index.md?collection=content_de"
      ),
    "community/support/scams/index.md": () =>
      import(
        "../public/content/translations/de/community/support/scams/index.md?collection=content_de"
      ),
    "contributing/design/adding-design-resources/index.md": () =>
      import(
        "../public/content/translations/de/contributing/design/adding-design-resources/index.md?collection=content_de"
      ),
    "contributing/translation-program/faq/index.md": () =>
      import(
        "../public/content/translations/de/contributing/translation-program/faq/index.md?collection=content_de"
      ),
    "contributing/translation-program/how-to-translate/index.md": () =>
      import(
        "../public/content/translations/de/contributing/translation-program/how-to-translate/index.md?collection=content_de"
      ),
    "contributing/translation-program/mission-and-vision/index.md": () =>
      import(
        "../public/content/translations/de/contributing/translation-program/mission-and-vision/index.md?collection=content_de"
      ),
    "contributing/translation-program/playbook/index.md": () =>
      import(
        "../public/content/translations/de/contributing/translation-program/playbook/index.md?collection=content_de"
      ),
    "contributing/translation-program/resources/index.md": () =>
      import(
        "../public/content/translations/de/contributing/translation-program/resources/index.md?collection=content_de"
      ),
    "contributing/translation-program/translatathon/index.md": () =>
      import(
        "../public/content/translations/de/contributing/translation-program/translatathon/index.md?collection=content_de"
      ),
    "contributing/translation-program/translators-guide/index.md": () =>
      import(
        "../public/content/translations/de/contributing/translation-program/translators-guide/index.md?collection=content_de"
      ),
    "developers/docs/accounts/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/accounts/index.md?collection=content_de"
      ),
    "developers/docs/blocks/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/blocks/index.md?collection=content_de"
      ),
    "developers/docs/bridges/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/bridges/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/index.md?collection=content_de"
      ),
    "developers/docs/dapps/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/dapps/index.md?collection=content_de"
      ),
    "developers/docs/data-and-analytics/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/data-and-analytics/index.md?collection=content_de"
      ),
    "developers/docs/data-availability/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/data-availability/index.md?collection=content_de"
      ),
    "developers/docs/data-structures-and-encoding/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/data-structures-and-encoding/index.md?collection=content_de"
      ),
    "developers/docs/design-and-ux/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/design-and-ux/index.md?collection=content_de"
      ),
    "developers/docs/development-networks/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/development-networks/index.md?collection=content_de"
      ),
    "developers/docs/ethereum-stack/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/ethereum-stack/index.md?collection=content_de"
      ),
    "developers/docs/evm/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/evm/index.md?collection=content_de"
      ),
    "developers/docs/frameworks/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/frameworks/index.md?collection=content_de"
      ),
    "developers/docs/gas/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/gas/index.md?collection=content_de"
      ),
    "developers/docs/ides/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/ides/index.md?collection=content_de"
      ),
    "developers/docs/intro-to-ether/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/intro-to-ether/index.md?collection=content_de"
      ),
    "developers/docs/intro-to-ethereum/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/intro-to-ethereum/index.md?collection=content_de"
      ),
    "developers/docs/mev/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/mev/index.md?collection=content_de"
      ),
    "developers/docs/networking-layer/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/networking-layer/index.md?collection=content_de"
      ),
    "developers/docs/networks/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/networks/index.md?collection=content_de"
      ),
    "developers/docs/nodes-and-clients/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/nodes-and-clients/index.md?collection=content_de"
      ),
    "developers/docs/oracles/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/oracles/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/index.md?collection=content_de"
      ),
    "developers/docs/scaling/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/scaling/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/index.md?collection=content_de"
      ),
    "developers/docs/standards/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/standards/index.md?collection=content_de"
      ),
    "developers/docs/storage/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/storage/index.md?collection=content_de"
      ),
    "developers/docs/transactions/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/transactions/index.md?collection=content_de"
      ),
    "developers/docs/web2-vs-web3/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/web2-vs-web3/index.md?collection=content_de"
      ),
    "developers/docs/wrapped-eth/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/wrapped-eth/index.md?collection=content_de"
      ),
    "developers/tutorials/ai-trading-agent/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/ai-trading-agent/index.md?collection=content_de"
      ),
    "developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md?collection=content_de"
        ),
    "developers/tutorials/all-you-can-cache/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/all-you-can-cache/index.md?collection=content_de"
      ),
    "developers/tutorials/app-plasma/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/app-plasma/index.md?collection=content_de"
      ),
    "developers/tutorials/calling-a-smart-contract-from-javascript/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/calling-a-smart-contract-from-javascript/index.md?collection=content_de"
        ),
    "developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md?collection=content_de"
      ),
    "developers/tutorials/deploying-your-first-smart-contract/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/deploying-your-first-smart-contract/index.md?collection=content_de"
      ),
    "developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md?collection=content_de"
        ),
    "developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md?collection=content_de"
        ),
    "developers/tutorials/eip-1271-smart-contract-signatures/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/eip-1271-smart-contract-signatures/index.md?collection=content_de"
      ),
    "developers/tutorials/erc-721-vyper-annotated-code/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/erc-721-vyper-annotated-code/index.md?collection=content_de"
      ),
    "developers/tutorials/erc20-annotated-code/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/erc20-annotated-code/index.md?collection=content_de"
      ),
    "developers/tutorials/erc20-with-safety-rails/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/erc20-with-safety-rails/index.md?collection=content_de"
      ),
    "developers/tutorials/ethereum-for-web2-auth/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/ethereum-for-web2-auth/index.md?collection=content_de"
      ),
    "developers/tutorials/gasless/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/gasless/index.md?collection=content_de"
      ),
    "developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md?collection=content_de"
        ),
    "developers/tutorials/guide-to-smart-contract-security-tools/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/guide-to-smart-contract-security-tools/index.md?collection=content_de"
        ),
    "developers/tutorials/hello-world-smart-contract/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/hello-world-smart-contract/index.md?collection=content_de"
      ),
    "developers/tutorials/hello-world-smart-contract-fullstack/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/hello-world-smart-contract-fullstack/index.md?collection=content_de"
      ),
    "developers/tutorials/how-to-implement-an-erc721-market/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/how-to-implement-an-erc721-market/index.md?collection=content_de"
      ),
    "developers/tutorials/how-to-mint-an-nft/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/how-to-mint-an-nft/index.md?collection=content_de"
      ),
    "developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md?collection=content_de"
        ),
    "developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md?collection=content_de"
        ),
    "developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md?collection=content_de"
        ),
    "developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md?collection=content_de"
        ),
    "developers/tutorials/how-to-use-tellor-as-your-oracle/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/how-to-use-tellor-as-your-oracle/index.md?collection=content_de"
      ),
    "developers/tutorials/how-to-view-nft-in-metamask/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/how-to-view-nft-in-metamask/index.md?collection=content_de"
      ),
    "developers/tutorials/how-to-write-and-deploy-an-nft/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/how-to-write-and-deploy-an-nft/index.md?collection=content_de"
      ),
    "developers/tutorials/interact-with-other-contracts-from-solidity/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/interact-with-other-contracts-from-solidity/index.md?collection=content_de"
        ),
    "developers/tutorials/ipfs-decentralized-ui/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/ipfs-decentralized-ui/index.md?collection=content_de"
      ),
    "developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md?collection=content_de"
        ),
    "developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md?collection=content_de"
        ),
    "developers/tutorials/logging-events-smart-contracts/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/logging-events-smart-contracts/index.md?collection=content_de"
      ),
    "developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md?collection=content_de"
        ),
    "developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md?collection=content_de"
        ),
    "developers/tutorials/nft-minter/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/nft-minter/index.md?collection=content_de"
      ),
    "developers/tutorials/optimism-std-bridge-annotated-code/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/optimism-std-bridge-annotated-code/index.md?collection=content_de"
      ),
    "developers/tutorials/reverse-engineering-a-contract/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/reverse-engineering-a-contract/index.md?collection=content_de"
      ),
    "developers/tutorials/run-node-raspberry-pi/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/run-node-raspberry-pi/index.md?collection=content_de"
      ),
    "developers/tutorials/scam-token-tricks/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/scam-token-tricks/index.md?collection=content_de"
      ),
    "developers/tutorials/secret-state/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/secret-state/index.md?collection=content_de"
      ),
    "developers/tutorials/secure-development-workflow/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/secure-development-workflow/index.md?collection=content_de"
      ),
    "developers/tutorials/send-token-ethersjs/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/send-token-ethersjs/index.md?collection=content_de"
      ),
    "developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md?collection=content_de"
        ),
    "developers/tutorials/server-components/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/server-components/index.md?collection=content_de"
      ),
    "developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md?collection=content_de"
        ),
    "developers/tutorials/short-abi/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/short-abi/index.md?collection=content_de"
      ),
    "developers/tutorials/smart-contract-security-guidelines/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/smart-contract-security-guidelines/index.md?collection=content_de"
      ),
    "developers/tutorials/stealth-addr/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/stealth-addr/index.md?collection=content_de"
      ),
    "developers/tutorials/the-graph-fixing-web3-data-querying/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/the-graph-fixing-web3-data-querying/index.md?collection=content_de"
      ),
    "developers/tutorials/token-integration-checklist/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/token-integration-checklist/index.md?collection=content_de"
      ),
    "developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md?collection=content_de"
        ),
    "developers/tutorials/understand-the-erc-20-token-smart-contract/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/tutorials/understand-the-erc-20-token-smart-contract/index.md?collection=content_de"
        ),
    "developers/tutorials/uniswap-v2-annotated-code/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/uniswap-v2-annotated-code/index.md?collection=content_de"
      ),
    "developers/tutorials/using-websockets/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/using-websockets/index.md?collection=content_de"
      ),
    "developers/tutorials/yellow-paper-evm/index.md": () =>
      import(
        "../public/content/translations/de/developers/tutorials/yellow-paper-evm/index.md?collection=content_de"
      ),
    "roadmap/fusaka/peerdas/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/fusaka/peerdas/index.md?collection=content_de"
      ),
    "roadmap/future-proofing/quantum-resistance/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/future-proofing/quantum-resistance/index.md?collection=content_de"
      ),
    "roadmap/merge/issuance/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/merge/issuance/index.md?collection=content_de"
      ),
    "roadmap/pectra/7702/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/pectra/7702/index.md?collection=content_de"
      ),
    "roadmap/pectra/maxeb/index.md": () =>
      import(
        "../public/content/translations/de/roadmap/pectra/maxeb/index.md?collection=content_de"
      ),
    "contributing/translation-program/translatathon/details/index.md": () =>
      import(
        "../public/content/translations/de/contributing/translation-program/translatathon/details/index.md?collection=content_de"
      ),
    "developers/docs/apis/backend/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/apis/backend/index.md?collection=content_de"
      ),
    "developers/docs/apis/javascript/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/apis/javascript/index.md?collection=content_de"
      ),
    "developers/docs/apis/json-rpc/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/apis/json-rpc/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/poa/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/poa/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pos/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pow/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/pow/index.md?collection=content_de"
      ),
    "developers/docs/data-and-analytics/block-explorers/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/data-and-analytics/block-explorers/index.md?collection=content_de"
      ),
    "developers/docs/data-availability/blockchain-data-storage-strategies/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/docs/data-availability/blockchain-data-storage-strategies/index.md?collection=content_de"
        ),
    "developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md?collection=content_de"
        ),
    "developers/docs/data-structures-and-encoding/rlp/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/data-structures-and-encoding/rlp/index.md?collection=content_de"
      ),
    "developers/docs/data-structures-and-encoding/ssz/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/data-structures-and-encoding/ssz/index.md?collection=content_de"
      ),
    "developers/docs/data-structures-and-encoding/web3-secret-storage/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/docs/data-structures-and-encoding/web3-secret-storage/index.md?collection=content_de"
        ),
    "developers/docs/design-and-ux/dex-design-best-practice/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/design-and-ux/dex-design-best-practice/index.md?collection=content_de"
      ),
    "developers/docs/design-and-ux/heuristics-for-web3/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/design-and-ux/heuristics-for-web3/index.md?collection=content_de"
      ),
    "developers/docs/evm/opcodes/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/evm/opcodes/index.md?collection=content_de"
      ),
    "developers/docs/networking-layer/network-addresses/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/networking-layer/network-addresses/index.md?collection=content_de"
      ),
    "developers/docs/networking-layer/portal-network/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/networking-layer/portal-network/index.md?collection=content_de"
      ),
    "developers/docs/nodes-and-clients/archive-nodes/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/nodes-and-clients/archive-nodes/index.md?collection=content_de"
      ),
    "developers/docs/nodes-and-clients/bootnodes/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/nodes-and-clients/bootnodes/index.md?collection=content_de"
      ),
    "developers/docs/nodes-and-clients/client-diversity/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/nodes-and-clients/client-diversity/index.md?collection=content_de"
      ),
    "developers/docs/nodes-and-clients/light-clients/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/nodes-and-clients/light-clients/index.md?collection=content_de"
      ),
    "developers/docs/nodes-and-clients/node-architecture/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/nodes-and-clients/node-architecture/index.md?collection=content_de"
      ),
    "developers/docs/nodes-and-clients/nodes-as-a-service/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/nodes-and-clients/nodes-as-a-service/index.md?collection=content_de"
      ),
    "developers/docs/nodes-and-clients/run-a-node/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/nodes-and-clients/run-a-node/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/dart/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/dart/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/delphi/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/delphi/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/dot-net/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/dot-net/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/elixir/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/elixir/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/golang/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/golang/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/java/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/java/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/javascript/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/javascript/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/python/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/python/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/ruby/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/ruby/index.md?collection=content_de"
      ),
    "developers/docs/programming-languages/rust/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/programming-languages/rust/index.md?collection=content_de"
      ),
    "developers/docs/scaling/optimistic-rollups/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/scaling/optimistic-rollups/index.md?collection=content_de"
      ),
    "developers/docs/scaling/plasma/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/scaling/plasma/index.md?collection=content_de"
      ),
    "developers/docs/scaling/sidechains/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/scaling/sidechains/index.md?collection=content_de"
      ),
    "developers/docs/scaling/state-channels/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/scaling/state-channels/index.md?collection=content_de"
      ),
    "developers/docs/scaling/validium/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/scaling/validium/index.md?collection=content_de"
      ),
    "developers/docs/scaling/zk-rollups/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/scaling/zk-rollups/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/anatomy/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/anatomy/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/compiling/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/compiling/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/composability/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/composability/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/deploying/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/deploying/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/formal-verification/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/formal-verification/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/languages/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/languages/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/libraries/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/libraries/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/naming/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/naming/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/security/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/security/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/testing/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/testing/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/upgrading/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/upgrading/index.md?collection=content_de"
      ),
    "developers/docs/smart-contracts/verifying/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/smart-contracts/verifying/index.md?collection=content_de"
      ),
    "developers/docs/standards/tokens/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/standards/tokens/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pos/attestations/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/attestations/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md?collection=content_de"
        ),
    "developers/docs/consensus-mechanisms/pos/block-proposal/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/block-proposal/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pos/faqs/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/faqs/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pos/keys/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/keys/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md?collection=content_de"
        ),
    "developers/docs/consensus-mechanisms/pos/gasper/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/gasper/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md?collection=content_de"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/consensus-mechanisms/pow/mining/index.md?collection=content_de"
      ),
    "developers/docs/standards/tokens/erc-1155/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/standards/tokens/erc-1155/index.md?collection=content_de"
      ),
    "developers/docs/standards/tokens/erc-1363/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/standards/tokens/erc-1363/index.md?collection=content_de"
      ),
    "developers/docs/standards/tokens/erc-20/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/standards/tokens/erc-20/index.md?collection=content_de"
      ),
    "developers/docs/standards/tokens/erc-223/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/standards/tokens/erc-223/index.md?collection=content_de"
      ),
    "developers/docs/standards/tokens/erc-4626/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/standards/tokens/erc-4626/index.md?collection=content_de"
      ),
    "developers/docs/standards/tokens/erc-721/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/standards/tokens/erc-721/index.md?collection=content_de"
      ),
    "developers/docs/standards/tokens/erc-777/index.md": () =>
      import(
        "../public/content/translations/de/developers/docs/standards/tokens/erc-777/index.md?collection=content_de"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md?collection=content_de"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md?collection=content_de"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md":
      () =>
        import(
          "../public/content/translations/de/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md?collection=content_de"
        ),
  }),
  content_en: create.doc("content_en", {
    "about/index.md": () =>
      import("../public/content/about/index.md?collection=content_en"),
    "bridges/index.md": () =>
      import("../public/content/bridges/index.md?collection=content_en"),
    "ai-agents/index.md": () =>
      import("../public/content/ai-agents/index.md?collection=content_en"),
    "cookie-policy/index.md": () =>
      import("../public/content/cookie-policy/index.md?collection=content_en"),
    "dao/index.md": () =>
      import("../public/content/dao/index.md?collection=content_en"),
    "decentralized-identity/index.md": () =>
      import(
        "../public/content/decentralized-identity/index.md?collection=content_en"
      ),
    "contributing/index.md": () =>
      import("../public/content/contributing/index.md?collection=content_en"),
    "desci/index.md": () =>
      import("../public/content/desci/index.md?collection=content_en"),
    "defi/index.md": () =>
      import("../public/content/defi/index.md?collection=content_en"),
    "eips/index.md": () =>
      import("../public/content/eips/index.md?collection=content_en"),
    "energy-consumption/index.md": () =>
      import(
        "../public/content/energy-consumption/index.md?collection=content_en"
      ),
    "gaming/index.md": () =>
      import("../public/content/gaming/index.md?collection=content_en"),
    "ethereum-forks/index.md": () =>
      import("../public/content/ethereum-forks/index.md?collection=content_en"),
    "foundation/index.md": () =>
      import("../public/content/foundation/index.md?collection=content_en"),
    "glossary/index.md": () =>
      import("../public/content/glossary/index.md?collection=content_en"),
    "governance/index.md": () =>
      import("../public/content/governance/index.md?collection=content_en"),
    "guides/index.md": () =>
      import("../public/content/guides/index.md?collection=content_en"),
    "prediction-markets/index.md": () =>
      import(
        "../public/content/prediction-markets/index.md?collection=content_en"
      ),
    "nft/index.md": () =>
      import("../public/content/nft/index.md?collection=content_en"),
    "payments/index.md": () =>
      import("../public/content/payments/index.md?collection=content_en"),
    "privacy-policy/index.md": () =>
      import("../public/content/privacy-policy/index.md?collection=content_en"),
    "privacy/index.md": () =>
      import("../public/content/privacy/index.md?collection=content_en"),
    "real-world-assets/index.md": () =>
      import(
        "../public/content/real-world-assets/index.md?collection=content_en"
      ),
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
    "web3/index.md": () =>
      import("../public/content/web3/index.md?collection=content_en"),
    "what-are-apps/index.md": () =>
      import("../public/content/what-are-apps/index.md?collection=content_en"),
    "whitepaper/index.md": () =>
      import("../public/content/whitepaper/index.md?collection=content_en"),
    "wrapped-eth/index.md": () =>
      import("../public/content/wrapped-eth/index.md?collection=content_en"),
    "zero-knowledge-proofs/index.md": () =>
      import(
        "../public/content/zero-knowledge-proofs/index.md?collection=content_en"
      ),
    "community/get-involved/index.md": () =>
      import(
        "../public/content/community/get-involved/index.md?collection=content_en"
      ),
    "community/code-of-conduct/index.md": () =>
      import(
        "../public/content/community/code-of-conduct/index.md?collection=content_en"
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
    "contributing/adding-desci-projects/index.md": () =>
      import(
        "../public/content/contributing/adding-desci-projects/index.md?collection=content_en"
      ),
    "contributing/adding-developer-tools/index.md": () =>
      import(
        "../public/content/contributing/adding-developer-tools/index.md?collection=content_en"
      ),
    "contributing/adding-glossary-terms/index.md": () =>
      import(
        "../public/content/contributing/adding-glossary-terms/index.md?collection=content_en"
      ),
    "contributing/adding-exchanges/index.md": () =>
      import(
        "../public/content/contributing/adding-exchanges/index.md?collection=content_en"
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
    "contributing/design-principles/index.md": () =>
      import(
        "../public/content/contributing/design-principles/index.md?collection=content_en"
      ),
    "contributing/design/index.md": () =>
      import(
        "../public/content/contributing/design/index.md?collection=content_en"
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
    "roadmap/beacon-chain/index.md": () =>
      import(
        "../public/content/roadmap/beacon-chain/index.md?collection=content_en"
      ),
    "roadmap/dencun/index.md": () =>
      import("../public/content/roadmap/dencun/index.md?collection=content_en"),
    "roadmap/danksharding/index.md": () =>
      import(
        "../public/content/roadmap/danksharding/index.md?collection=content_en"
      ),
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
    "roadmap/pbs/index.md": () =>
      import("../public/content/roadmap/pbs/index.md?collection=content_en"),
    "roadmap/merge/index.md": () =>
      import("../public/content/roadmap/merge/index.md?collection=content_en"),
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
    "videos/blobspace-101-dencun/index.md": () =>
      import(
        "../public/content/videos/blobspace-101-dencun/index.md?collection=content_en"
      ),
    "videos/blockchain-101-visual-demo/index.md": () =>
      import(
        "../public/content/videos/blockchain-101-visual-demo/index.md?collection=content_en"
      ),
    "videos/crypto-security-passwords/index.md": () =>
      import(
        "../public/content/videos/crypto-security-passwords/index.md?collection=content_en"
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
    "videos/dao-build-next-great-city/index.md": () =>
      import(
        "../public/content/videos/dao-build-next-great-city/index.md?collection=content_en"
      ),
    "videos/dao-hack-ethereum-classic/index.md": () =>
      import(
        "../public/content/videos/dao-hack-ethereum-classic/index.md?collection=content_en"
      ),
    "videos/decentralized-identity-explained/index.md": () =>
      import(
        "../public/content/videos/decentralized-identity-explained/index.md?collection=content_en"
      ),
    "videos/decentralized-social-media/index.md": () =>
      import(
        "../public/content/videos/decentralized-social-media/index.md?collection=content_en"
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
    "videos/eigenlayer-permissionless-features/index.md": () =>
      import(
        "../public/content/videos/eigenlayer-permissionless-features/index.md?collection=content_en"
      ),
    "videos/ethereum-basics-intro/index.md": () =>
      import(
        "../public/content/videos/ethereum-basics-intro/index.md?collection=content_en"
      ),
    "videos/eip-4844-dencun-explained/index.md": () =>
      import(
        "../public/content/videos/eip-4844-dencun-explained/index.md?collection=content_en"
      ),
    "videos/ethereum-core-governance-explained/index.md": () =>
      import(
        "../public/content/videos/ethereum-core-governance-explained/index.md?collection=content_en"
      ),
    "videos/ethereum-evolution-glamsterdam/index.md": () =>
      import(
        "../public/content/videos/ethereum-evolution-glamsterdam/index.md?collection=content_en"
      ),
    "videos/ethereum-institutional-privacy-panel/index.md": () =>
      import(
        "../public/content/videos/ethereum-institutional-privacy-panel/index.md?collection=content_en"
      ),
    "videos/ethereum-in-30-minutes-vitalik-buterin/index.md": () =>
      import(
        "../public/content/videos/ethereum-in-30-minutes-vitalik-buterin/index.md?collection=content_en"
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
    "videos/ethereums-quantum-plan-justin-drake/index.md": () =>
      import(
        "../public/content/videos/ethereums-quantum-plan-justin-drake/index.md?collection=content_en"
      ),
    "videos/fusaka-upgrade-explained/index.md": () =>
      import(
        "../public/content/videos/fusaka-upgrade-explained/index.md?collection=content_en"
      ),
    "videos/hash-function-eth-build/index.md": () =>
      import(
        "../public/content/videos/hash-function-eth-build/index.md?collection=content_en"
      ),
    "videos/how-to-make-a-guerilla-l2/index.md": () =>
      import(
        "../public/content/videos/how-to-make-a-guerilla-l2/index.md?collection=content_en"
      ),
    "videos/how-to-be-cypherpunk-juan-benet/index.md": () =>
      import(
        "../public/content/videos/how-to-be-cypherpunk-juan-benet/index.md?collection=content_en"
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
    "videos/pectra-upgrade-overview/index.md": () =>
      import(
        "../public/content/videos/pectra-upgrade-overview/index.md?collection=content_en"
      ),
    "videos/pectra-what-stakers-need-to-know/index.md": () =>
      import(
        "../public/content/videos/pectra-what-stakers-need-to-know/index.md?collection=content_en"
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
    "developers/tutorials/ai-trading-agent/index.md": () =>
      import(
        "../public/content/developers/tutorials/ai-trading-agent/index.md?collection=content_en"
      ),
    "developers/tutorials/all-you-can-cache/index.md": () =>
      import(
        "../public/content/developers/tutorials/all-you-can-cache/index.md?collection=content_en"
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
    "developers/tutorials/eip-1271-smart-contract-signatures/index.md": () =>
      import(
        "../public/content/developers/tutorials/eip-1271-smart-contract-signatures/index.md?collection=content_en"
      ),
    "developers/tutorials/erc-721-vyper-annotated-code/index.md": () =>
      import(
        "../public/content/developers/tutorials/erc-721-vyper-annotated-code/index.md?collection=content_en"
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
    "developers/tutorials/hello-world-smart-contract/index.md": () =>
      import(
        "../public/content/developers/tutorials/hello-world-smart-contract/index.md?collection=content_en"
      ),
    "developers/tutorials/hello-world-smart-contract-fullstack/index.md": () =>
      import(
        "../public/content/developers/tutorials/hello-world-smart-contract-fullstack/index.md?collection=content_en"
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
    "developers/tutorials/how-to-use-tellor-as-your-oracle/index.md": () =>
      import(
        "../public/content/developers/tutorials/how-to-use-tellor-as-your-oracle/index.md?collection=content_en"
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
    "developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md":
      () =>
        import(
          "../public/content/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md?collection=content_en"
        ),
    "developers/tutorials/nft-minter/index.md": () =>
      import(
        "../public/content/developers/tutorials/nft-minter/index.md?collection=content_en"
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
    "developers/tutorials/secret-state/index.md": () =>
      import(
        "../public/content/developers/tutorials/secret-state/index.md?collection=content_en"
      ),
    "developers/tutorials/secure-development-workflow/index.md": () =>
      import(
        "../public/content/developers/tutorials/secure-development-workflow/index.md?collection=content_en"
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
    "developers/tutorials/uniswap-v2-annotated-code/index.md": () =>
      import(
        "../public/content/developers/tutorials/uniswap-v2-annotated-code/index.md?collection=content_en"
      ),
    "developers/tutorials/using-websockets/index.md": () =>
      import(
        "../public/content/developers/tutorials/using-websockets/index.md?collection=content_en"
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
    "contributing/translation-program/translatathon/terms-and-conditions/index.md":
      () =>
        import(
          "../public/content/contributing/translation-program/translatathon/terms-and-conditions/index.md?collection=content_en"
        ),
    "contributing/translation-program/translatathon/details/index.md": () =>
      import(
        "../public/content/contributing/translation-program/translatathon/details/index.md?collection=content_en"
      ),
    "developers/docs/apis/backend/index.md": () =>
      import(
        "../public/content/developers/docs/apis/backend/index.md?collection=content_en"
      ),
    "developers/docs/apis/json-rpc/index.md": () =>
      import(
        "../public/content/developers/docs/apis/json-rpc/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/poa/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/poa/index.md?collection=content_en"
      ),
    "developers/docs/apis/javascript/index.md": () =>
      import(
        "../public/content/developers/docs/apis/javascript/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pow/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pow/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/index.md?collection=content_en"
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
    "developers/docs/design-and-ux/heuristics-for-web3/index.md": () =>
      import(
        "../public/content/developers/docs/design-and-ux/heuristics-for-web3/index.md?collection=content_en"
      ),
    "developers/docs/design-and-ux/dex-design-best-practice/index.md": () =>
      import(
        "../public/content/developers/docs/design-and-ux/dex-design-best-practice/index.md?collection=content_en"
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
    "developers/docs/nodes-and-clients/run-a-node/index.md": () =>
      import(
        "../public/content/developers/docs/nodes-and-clients/run-a-node/index.md?collection=content_en"
      ),
    "developers/docs/nodes-and-clients/nodes-as-a-service/index.md": () =>
      import(
        "../public/content/developers/docs/nodes-and-clients/nodes-as-a-service/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/dart/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/dart/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/delphi/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/delphi/index.md?collection=content_en"
      ),
    "developers/docs/programming-languages/dot-net/index.md": () =>
      import(
        "../public/content/developers/docs/programming-languages/dot-net/index.md?collection=content_en"
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
    "developers/docs/scaling/optimistic-rollups/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/optimistic-rollups/index.md?collection=content_en"
      ),
    "developers/docs/scaling/plasma/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/plasma/index.md?collection=content_en"
      ),
    "developers/docs/scaling/sidechains/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/sidechains/index.md?collection=content_en"
      ),
    "developers/docs/scaling/state-channels/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/state-channels/index.md?collection=content_en"
      ),
    "developers/docs/scaling/zk-rollups/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/zk-rollups/index.md?collection=content_en"
      ),
    "developers/docs/scaling/validium/index.md": () =>
      import(
        "../public/content/developers/docs/scaling/validium/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/anatomy/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/anatomy/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/compiling/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/compiling/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/deploying/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/deploying/index.md?collection=content_en"
      ),
    "developers/docs/smart-contracts/composability/index.md": () =>
      import(
        "../public/content/developers/docs/smart-contracts/composability/index.md?collection=content_en"
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
    "developers/docs/consensus-mechanisms/pow/mining/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pow/mining/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md":
      () =>
        import(
          "../public/content/developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md?collection=content_en"
        ),
    "developers/docs/consensus-mechanisms/pos/block-proposal/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/block-proposal/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/attestations/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/attestations/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/faqs/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/faqs/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/gasper/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/gasper/index.md?collection=content_en"
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
    "developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md": () =>
      import(
        "../public/content/developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md?collection=content_en"
      ),
    "developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md":
      () =>
        import(
          "../public/content/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md?collection=content_en"
        ),
    "developers/docs/standards/tokens/erc-1363/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-1363/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-1155/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-1155/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-20/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-20/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-223/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-223/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-721/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-721/index.md?collection=content_en"
      ),
    "developers/docs/standards/tokens/erc-4626/index.md": () =>
      import(
        "../public/content/developers/docs/standards/tokens/erc-4626/index.md?collection=content_en"
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
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md":
      () =>
        import(
          "../public/content/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md?collection=content_en"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md":
      () =>
        import(
          "../public/content/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md?collection=content_en"
        ),
  }),
  content_es: create.doc("content_es", {
    "ai-agents/index.md": () =>
      import(
        "../public/content/translations/es/ai-agents/index.md?collection=content_es"
      ),
    "about/index.md": () =>
      import(
        "../public/content/translations/es/about/index.md?collection=content_es"
      ),
    "bridges/index.md": () =>
      import(
        "../public/content/translations/es/bridges/index.md?collection=content_es"
      ),
    "dao/index.md": () =>
      import(
        "../public/content/translations/es/dao/index.md?collection=content_es"
      ),
    "contributing/index.md": () =>
      import(
        "../public/content/translations/es/contributing/index.md?collection=content_es"
      ),
    "decentralized-identity/index.md": () =>
      import(
        "../public/content/translations/es/decentralized-identity/index.md?collection=content_es"
      ),
    "defi/index.md": () =>
      import(
        "../public/content/translations/es/defi/index.md?collection=content_es"
      ),
    "desci/index.md": () =>
      import(
        "../public/content/translations/es/desci/index.md?collection=content_es"
      ),
    "eips/index.md": () =>
      import(
        "../public/content/translations/es/eips/index.md?collection=content_es"
      ),
    "energy-consumption/index.md": () =>
      import(
        "../public/content/translations/es/energy-consumption/index.md?collection=content_es"
      ),
    "ethereum-forks/index.md": () =>
      import(
        "../public/content/translations/es/ethereum-forks/index.md?collection=content_es"
      ),
    "foundation/index.md": () =>
      import(
        "../public/content/translations/es/foundation/index.md?collection=content_es"
      ),
    "gaming/index.md": () =>
      import(
        "../public/content/translations/es/gaming/index.md?collection=content_es"
      ),
    "glossary/index.md": () =>
      import(
        "../public/content/translations/es/glossary/index.md?collection=content_es"
      ),
    "governance/index.md": () =>
      import(
        "../public/content/translations/es/governance/index.md?collection=content_es"
      ),
    "how-to-create-an-ethereum-account/index.md": () =>
      import(
        "../public/content/translations/es/how-to-create-an-ethereum-account/index.md?collection=content_es"
      ),
    "guides/index.md": () =>
      import(
        "../public/content/translations/es/guides/index.md?collection=content_es"
      ),
    "prediction-markets/index.md": () =>
      import(
        "../public/content/translations/es/prediction-markets/index.md?collection=content_es"
      ),
    "nft/index.md": () =>
      import(
        "../public/content/translations/es/nft/index.md?collection=content_es"
      ),
    "payments/index.md": () =>
      import(
        "../public/content/translations/es/payments/index.md?collection=content_es"
      ),
    "real-world-assets/index.md": () =>
      import(
        "../public/content/translations/es/real-world-assets/index.md?collection=content_es"
      ),
    "privacy/index.md": () =>
      import(
        "../public/content/translations/es/privacy/index.md?collection=content_es"
      ),
    "refi/index.md": () =>
      import(
        "../public/content/translations/es/refi/index.md?collection=content_es"
      ),
    "restaking/index.md": () =>
      import(
        "../public/content/translations/es/restaking/index.md?collection=content_es"
      ),
    "security/index.md": () =>
      import(
        "../public/content/translations/es/security/index.md?collection=content_es"
      ),
    "smart-contracts/index.md": () =>
      import(
        "../public/content/translations/es/smart-contracts/index.md?collection=content_es"
      ),
    "social-networks/index.md": () =>
      import(
        "../public/content/translations/es/social-networks/index.md?collection=content_es"
      ),
    "whitepaper/index.md": () =>
      import(
        "../public/content/translations/es/whitepaper/index.md?collection=content_es"
      ),
    "web3/index.md": () =>
      import(
        "../public/content/translations/es/web3/index.md?collection=content_es"
      ),
    "what-are-apps/index.md": () =>
      import(
        "../public/content/translations/es/what-are-apps/index.md?collection=content_es"
      ),
    "wrapped-eth/index.md": () =>
      import(
        "../public/content/translations/es/wrapped-eth/index.md?collection=content_es"
      ),
    "zero-knowledge-proofs/index.md": () =>
      import(
        "../public/content/translations/es/zero-knowledge-proofs/index.md?collection=content_es"
      ),
    "10years/terms-and-conditions/index.md": () =>
      import(
        "../public/content/translations/es/10years/terms-and-conditions/index.md?collection=content_es"
      ),
    "community/code-of-conduct/index.md": () =>
      import(
        "../public/content/translations/es/community/code-of-conduct/index.md?collection=content_es"
      ),
    "community/get-involved/index.md": () =>
      import(
        "../public/content/translations/es/community/get-involved/index.md?collection=content_es"
      ),
    "community/grants/index.md": () =>
      import(
        "../public/content/translations/es/community/grants/index.md?collection=content_es"
      ),
    "community/language-resources/index.md": () =>
      import(
        "../public/content/translations/es/community/language-resources/index.md?collection=content_es"
      ),
    "community/online/index.md": () =>
      import(
        "../public/content/translations/es/community/online/index.md?collection=content_es"
      ),
    "community/research/index.md": () =>
      import(
        "../public/content/translations/es/community/research/index.md?collection=content_es"
      ),
    "contributing/adding-desci-projects/index.md": () =>
      import(
        "../public/content/translations/es/contributing/adding-desci-projects/index.md?collection=content_es"
      ),
    "contributing/adding-developer-tools/index.md": () =>
      import(
        "../public/content/translations/es/contributing/adding-developer-tools/index.md?collection=content_es"
      ),
    "contributing/adding-exchanges/index.md": () =>
      import(
        "../public/content/translations/es/contributing/adding-exchanges/index.md?collection=content_es"
      ),
    "contributing/adding-glossary-terms/index.md": () =>
      import(
        "../public/content/translations/es/contributing/adding-glossary-terms/index.md?collection=content_es"
      ),
    "contributing/adding-layer-2s/index.md": () =>
      import(
        "../public/content/translations/es/contributing/adding-layer-2s/index.md?collection=content_es"
      ),
    "contributing/adding-products/index.md": () =>
      import(
        "../public/content/translations/es/contributing/adding-products/index.md?collection=content_es"
      ),
    "contributing/adding-resources/index.md": () =>
      import(
        "../public/content/translations/es/contributing/adding-resources/index.md?collection=content_es"
      ),
    "contributing/adding-staking-products/index.md": () =>
      import(
        "../public/content/translations/es/contributing/adding-staking-products/index.md?collection=content_es"
      ),
    "contributing/adding-videos/index.md": () =>
      import(
        "../public/content/translations/es/contributing/adding-videos/index.md?collection=content_es"
      ),
    "contributing/design/index.md": () =>
      import(
        "../public/content/translations/es/contributing/design/index.md?collection=content_es"
      ),
    "contributing/content-resources/index.md": () =>
      import(
        "../public/content/translations/es/contributing/content-resources/index.md?collection=content_es"
      ),
    "contributing/design-principles/index.md": () =>
      import(
        "../public/content/translations/es/contributing/design-principles/index.md?collection=content_es"
      ),
    "contributing/adding-wallets/index.md": () =>
      import(
        "../public/content/translations/es/contributing/adding-wallets/index.md?collection=content_es"
      ),
    "contributing/quizzes/index.md": () =>
      import(
        "../public/content/translations/es/contributing/quizzes/index.md?collection=content_es"
      ),
    "contributing/translation-program/index.md": () =>
      import(
        "../public/content/translations/es/contributing/translation-program/index.md?collection=content_es"
      ),
    "eth/supply/index.md": () =>
      import(
        "../public/content/translations/es/eth/supply/index.md?collection=content_es"
      ),
    "developers/docs/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/index.md?collection=content_es"
      ),
    "guides/how-to-create-an-ethereum-account/index.md": () =>
      import(
        "../public/content/translations/es/guides/how-to-create-an-ethereum-account/index.md?collection=content_es"
      ),
    "guides/how-to-id-scam-tokens/index.md": () =>
      import(
        "../public/content/translations/es/guides/how-to-id-scam-tokens/index.md?collection=content_es"
      ),
    "guides/how-to-revoke-token-access/index.md": () =>
      import(
        "../public/content/translations/es/guides/how-to-revoke-token-access/index.md?collection=content_es"
      ),
    "guides/how-to-swap-tokens/index.md": () =>
      import(
        "../public/content/translations/es/guides/how-to-swap-tokens/index.md?collection=content_es"
      ),
    "guides/how-to-use-a-bridge/index.md": () =>
      import(
        "../public/content/translations/es/guides/how-to-use-a-bridge/index.md?collection=content_es"
      ),
    "guides/how-to-use-a-wallet/index.md": () =>
      import(
        "../public/content/translations/es/guides/how-to-use-a-wallet/index.md?collection=content_es"
      ),
    "roadmap/account-abstraction/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/account-abstraction/index.md?collection=content_es"
      ),
    "roadmap/beacon-chain/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/beacon-chain/index.md?collection=content_es"
      ),
    "roadmap/dencun/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/dencun/index.md?collection=content_es"
      ),
    "roadmap/fusaka/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/fusaka/index.md?collection=content_es"
      ),
    "roadmap/danksharding/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/danksharding/index.md?collection=content_es"
      ),
    "roadmap/future-proofing/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/future-proofing/index.md?collection=content_es"
      ),
    "roadmap/glamsterdam/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/glamsterdam/index.md?collection=content_es"
      ),
    "roadmap/merge/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/merge/index.md?collection=content_es"
      ),
    "roadmap/pbs/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/pbs/index.md?collection=content_es"
      ),
    "roadmap/pectra/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/pectra/index.md?collection=content_es"
      ),
    "roadmap/scaling/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/scaling/index.md?collection=content_es"
      ),
    "roadmap/secret-leader-election/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/secret-leader-election/index.md?collection=content_es"
      ),
    "roadmap/security/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/security/index.md?collection=content_es"
      ),
    "roadmap/single-slot-finality/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/single-slot-finality/index.md?collection=content_es"
      ),
    "roadmap/statelessness/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/statelessness/index.md?collection=content_es"
      ),
    "roadmap/user-experience/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/user-experience/index.md?collection=content_es"
      ),
    "roadmap/verkle-trees/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/verkle-trees/index.md?collection=content_es"
      ),
    "roadmap/zkevm/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/zkevm/index.md?collection=content_es"
      ),
    "staking/dvt/index.md": () =>
      import(
        "../public/content/translations/es/staking/dvt/index.md?collection=content_es"
      ),
    "staking/pools/index.md": () =>
      import(
        "../public/content/translations/es/staking/pools/index.md?collection=content_es"
      ),
    "staking/saas/index.md": () =>
      import(
        "../public/content/translations/es/staking/saas/index.md?collection=content_es"
      ),
    "staking/solo/index.md": () =>
      import(
        "../public/content/translations/es/staking/solo/index.md?collection=content_es"
      ),
    "staking/withdrawals/index.md": () =>
      import(
        "../public/content/translations/es/staking/withdrawals/index.md?collection=content_es"
      ),
    "videos/ai-agents-interview-luna/index.md": () =>
      import(
        "../public/content/translations/es/videos/ai-agents-interview-luna/index.md?collection=content_es"
      ),
    "videos/atoms-institutions-blockchains-josh-stark/index.md": () =>
      import(
        "../public/content/translations/es/videos/atoms-institutions-blockchains-josh-stark/index.md?collection=content_es"
      ),
    "videos/blobspace-101-dencun/index.md": () =>
      import(
        "../public/content/translations/es/videos/blobspace-101-dencun/index.md?collection=content_es"
      ),
    "videos/blockchain-101-visual-demo/index.md": () =>
      import(
        "../public/content/translations/es/videos/blockchain-101-visual-demo/index.md?collection=content_es"
      ),
    "videos/blockchain-eth-build/index.md": () =>
      import(
        "../public/content/translations/es/videos/blockchain-eth-build/index.md?collection=content_es"
      ),
    "videos/crypto-apps-desocial-linda-xie/index.md": () =>
      import(
        "../public/content/translations/es/videos/crypto-apps-desocial-linda-xie/index.md?collection=content_es"
      ),
    "videos/crypto-security-passwords/index.md": () =>
      import(
        "../public/content/translations/es/videos/crypto-security-passwords/index.md?collection=content_es"
      ),
    "videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md": () =>
      import(
        "../public/content/translations/es/videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md?collection=content_es"
      ),
    "videos/dao-build-next-great-city/index.md": () =>
      import(
        "../public/content/translations/es/videos/dao-build-next-great-city/index.md?collection=content_es"
      ),
    "videos/dao-hack-ethereum-classic/index.md": () =>
      import(
        "../public/content/translations/es/videos/dao-hack-ethereum-classic/index.md?collection=content_es"
      ),
    "videos/decentralized-identity-explained/index.md": () =>
      import(
        "../public/content/translations/es/videos/decentralized-identity-explained/index.md?collection=content_es"
      ),
    "videos/decentralized-social-media/index.md": () =>
      import(
        "../public/content/translations/es/videos/decentralized-social-media/index.md?collection=content_es"
      ),
    "videos/defi-future-of-finance/index.md": () =>
      import(
        "../public/content/translations/es/videos/defi-future-of-finance/index.md?collection=content_es"
      ),
    "videos/defi-history-inception-to-2021/index.md": () =>
      import(
        "../public/content/translations/es/videos/defi-history-inception-to-2021/index.md?collection=content_es"
      ),
    "videos/desci-movement-juan-benet/index.md": () =>
      import(
        "../public/content/translations/es/videos/desci-movement-juan-benet/index.md?collection=content_es"
      ),
    "videos/devcon-mumbai-coming-2026/index.md": () =>
      import(
        "../public/content/translations/es/videos/devcon-mumbai-coming-2026/index.md?collection=content_es"
      ),
    "videos/devconnect-argentina-2025-recap/index.md": () =>
      import(
        "../public/content/translations/es/videos/devconnect-argentina-2025-recap/index.md?collection=content_es"
      ),
    "videos/devconnect-buenos-aires-promo/index.md": () =>
      import(
        "../public/content/translations/es/videos/devconnect-buenos-aires-promo/index.md?collection=content_es"
      ),
    "videos/eigenlayer-permissionless-features/index.md": () =>
      import(
        "../public/content/translations/es/videos/eigenlayer-permissionless-features/index.md?collection=content_es"
      ),
    "videos/eip-4844-dencun-explained/index.md": () =>
      import(
        "../public/content/translations/es/videos/eip-4844-dencun-explained/index.md?collection=content_es"
      ),
    "videos/ethereum-basics-intro/index.md": () =>
      import(
        "../public/content/translations/es/videos/ethereum-basics-intro/index.md?collection=content_es"
      ),
    "videos/ethereum-core-governance-explained/index.md": () =>
      import(
        "../public/content/translations/es/videos/ethereum-core-governance-explained/index.md?collection=content_es"
      ),
    "videos/ethereum-evolution-glamsterdam/index.md": () =>
      import(
        "../public/content/translations/es/videos/ethereum-evolution-glamsterdam/index.md?collection=content_es"
      ),
    "videos/ethereum-in-30-minutes-vitalik-buterin/index.md": () =>
      import(
        "../public/content/translations/es/videos/ethereum-in-30-minutes-vitalik-buterin/index.md?collection=content_es"
      ),
    "videos/ethereum-staking-withdrawals/index.md": () =>
      import(
        "../public/content/translations/es/videos/ethereum-staking-withdrawals/index.md?collection=content_es"
      ),
    "videos/ethereum-institutional-privacy-panel/index.md": () =>
      import(
        "../public/content/translations/es/videos/ethereum-institutional-privacy-panel/index.md?collection=content_es"
      ),
    "videos/ethereum-localism-global-protocols-local-power/index.md": () =>
      import(
        "../public/content/translations/es/videos/ethereum-localism-global-protocols-local-power/index.md?collection=content_es"
      ),
    "videos/ethereum-things-i-like-mariano-conti/index.md": () =>
      import(
        "../public/content/translations/es/videos/ethereum-things-i-like-mariano-conti/index.md?collection=content_es"
      ),
    "videos/ethereums-quantum-plan-justin-drake/index.md": () =>
      import(
        "../public/content/translations/es/videos/ethereums-quantum-plan-justin-drake/index.md?collection=content_es"
      ),
    "videos/hash-function-eth-build/index.md": () =>
      import(
        "../public/content/translations/es/videos/hash-function-eth-build/index.md?collection=content_es"
      ),
    "videos/fusaka-upgrade-explained/index.md": () =>
      import(
        "../public/content/translations/es/videos/fusaka-upgrade-explained/index.md?collection=content_es"
      ),
    "videos/how-to-be-cypherpunk-juan-benet/index.md": () =>
      import(
        "../public/content/translations/es/videos/how-to-be-cypherpunk-juan-benet/index.md?collection=content_es"
      ),
    "videos/key-pair-eth-build/index.md": () =>
      import(
        "../public/content/translations/es/videos/key-pair-eth-build/index.md?collection=content_es"
      ),
    "videos/how-to-make-a-guerilla-l2/index.md": () =>
      import(
        "../public/content/translations/es/videos/how-to-make-a-guerilla-l2/index.md?collection=content_es"
      ),
    "videos/layer-2-scaling-explained/index.md": () =>
      import(
        "../public/content/translations/es/videos/layer-2-scaling-explained/index.md?collection=content_es"
      ),
    "videos/learn-nfts-and-defi/index.md": () =>
      import(
        "../public/content/translations/es/videos/learn-nfts-and-defi/index.md?collection=content_es"
      ),
    "videos/next-10-years-of-ethereum/index.md": () =>
      import(
        "../public/content/translations/es/videos/next-10-years-of-ethereum/index.md?collection=content_es"
      ),
    "videos/pectra-upgrade-overview/index.md": () =>
      import(
        "../public/content/translations/es/videos/pectra-upgrade-overview/index.md?collection=content_es"
      ),
    "videos/pectra-what-stakers-need-to-know/index.md": () =>
      import(
        "../public/content/translations/es/videos/pectra-what-stakers-need-to-know/index.md?collection=content_es"
      ),
    "videos/pos-reorgs-attack-defense/index.md": () =>
      import(
        "../public/content/translations/es/videos/pos-reorgs-attack-defense/index.md?collection=content_es"
      ),
    "videos/post-quantum-security-ethereum-roadmap/index.md": () =>
      import(
        "../public/content/translations/es/videos/post-quantum-security-ethereum-roadmap/index.md?collection=content_es"
      ),
    "videos/pow-vs-pos/index.md": () =>
      import(
        "../public/content/translations/es/videos/pow-vs-pos/index.md?collection=content_es"
      ),
    "videos/privacy-is-existential/index.md": () =>
      import(
        "../public/content/translations/es/videos/privacy-is-existential/index.md?collection=content_es"
      ),
    "videos/proof-of-authority-explained/index.md": () =>
      import(
        "../public/content/translations/es/videos/proof-of-authority-explained/index.md?collection=content_es"
      ),
    "videos/proof-of-work-explained/index.md": () =>
      import(
        "../public/content/translations/es/videos/proof-of-work-explained/index.md?collection=content_es"
      ),
    "videos/proposer-builder-separation/index.md": () =>
      import(
        "../public/content/translations/es/videos/proposer-builder-separation/index.md?collection=content_es"
      ),
    "videos/real-state-of-l2s-bartek-kiepuszewski/index.md": () =>
      import(
        "../public/content/translations/es/videos/real-state-of-l2s-bartek-kiepuszewski/index.md?collection=content_es"
      ),
    "videos/regenerative-finance-refi/index.md": () =>
      import(
        "../public/content/translations/es/videos/regenerative-finance-refi/index.md?collection=content_es"
      ),
    "videos/restaking-explained/index.md": () =>
      import(
        "../public/content/translations/es/videos/restaking-explained/index.md?collection=content_es"
      ),
    "videos/rollups-scaling-strategy/index.md": () =>
      import(
        "../public/content/translations/es/videos/rollups-scaling-strategy/index.md?collection=content_es"
      ),
    "videos/security-through-obscurity-microdots/index.md": () =>
      import(
        "../public/content/translations/es/videos/security-through-obscurity-microdots/index.md?collection=content_es"
      ),
    "videos/smart-contracts-code-is-law/index.md": () =>
      import(
        "../public/content/translations/es/videos/smart-contracts-code-is-law/index.md?collection=content_es"
      ),
    "videos/surveillance-silence-reclaiming-privacy/index.md": () =>
      import(
        "../public/content/translations/es/videos/surveillance-silence-reclaiming-privacy/index.md?collection=content_es"
      ),
    "videos/transactions-eth-build/index.md": () =>
      import(
        "../public/content/translations/es/videos/transactions-eth-build/index.md?collection=content_es"
      ),
    "videos/understanding-consensus-mechanisms/index.md": () =>
      import(
        "../public/content/translations/es/videos/understanding-consensus-mechanisms/index.md?collection=content_es"
      ),
    "videos/what-is-a-dapp/index.md": () =>
      import(
        "../public/content/translations/es/videos/what-is-a-dapp/index.md?collection=content_es"
      ),
    "videos/zero-knowledge-proofs-5-levels/index.md": () =>
      import(
        "../public/content/translations/es/videos/zero-knowledge-proofs-5-levels/index.md?collection=content_es"
      ),
    "videos/stani-kulechov-building-aave/index.md": () =>
      import(
        "../public/content/translations/es/videos/stani-kulechov-building-aave/index.md?collection=content_es"
      ),
    "community/events/organizing/index.md": () =>
      import(
        "../public/content/translations/es/community/events/organizing/index.md?collection=content_es"
      ),
    "community/support/faq/index.md": () =>
      import(
        "../public/content/translations/es/community/support/faq/index.md?collection=content_es"
      ),
    "community/support/misconceptions/index.md": () =>
      import(
        "../public/content/translations/es/community/support/misconceptions/index.md?collection=content_es"
      ),
    "community/support/scams/index.md": () =>
      import(
        "../public/content/translations/es/community/support/scams/index.md?collection=content_es"
      ),
    "contributing/design/adding-design-resources/index.md": () =>
      import(
        "../public/content/translations/es/contributing/design/adding-design-resources/index.md?collection=content_es"
      ),
    "contributing/translation-program/faq/index.md": () =>
      import(
        "../public/content/translations/es/contributing/translation-program/faq/index.md?collection=content_es"
      ),
    "contributing/translation-program/how-to-translate/index.md": () =>
      import(
        "../public/content/translations/es/contributing/translation-program/how-to-translate/index.md?collection=content_es"
      ),
    "contributing/translation-program/mission-and-vision/index.md": () =>
      import(
        "../public/content/translations/es/contributing/translation-program/mission-and-vision/index.md?collection=content_es"
      ),
    "contributing/translation-program/playbook/index.md": () =>
      import(
        "../public/content/translations/es/contributing/translation-program/playbook/index.md?collection=content_es"
      ),
    "contributing/translation-program/resources/index.md": () =>
      import(
        "../public/content/translations/es/contributing/translation-program/resources/index.md?collection=content_es"
      ),
    "contributing/translation-program/translatathon/index.md": () =>
      import(
        "../public/content/translations/es/contributing/translation-program/translatathon/index.md?collection=content_es"
      ),
    "contributing/translation-program/translators-guide/index.md": () =>
      import(
        "../public/content/translations/es/contributing/translation-program/translators-guide/index.md?collection=content_es"
      ),
    "developers/docs/accounts/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/accounts/index.md?collection=content_es"
      ),
    "developers/docs/blocks/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/blocks/index.md?collection=content_es"
      ),
    "developers/docs/bridges/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/bridges/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/index.md?collection=content_es"
      ),
    "developers/docs/dapps/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/dapps/index.md?collection=content_es"
      ),
    "developers/docs/data-and-analytics/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/data-and-analytics/index.md?collection=content_es"
      ),
    "developers/docs/data-availability/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/data-availability/index.md?collection=content_es"
      ),
    "developers/docs/data-structures-and-encoding/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/data-structures-and-encoding/index.md?collection=content_es"
      ),
    "developers/docs/design-and-ux/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/design-and-ux/index.md?collection=content_es"
      ),
    "developers/docs/development-networks/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/development-networks/index.md?collection=content_es"
      ),
    "developers/docs/ethereum-stack/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/ethereum-stack/index.md?collection=content_es"
      ),
    "developers/docs/evm/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/evm/index.md?collection=content_es"
      ),
    "developers/docs/frameworks/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/frameworks/index.md?collection=content_es"
      ),
    "developers/docs/gas/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/gas/index.md?collection=content_es"
      ),
    "developers/docs/ides/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/ides/index.md?collection=content_es"
      ),
    "developers/docs/intro-to-ether/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/intro-to-ether/index.md?collection=content_es"
      ),
    "developers/docs/intro-to-ethereum/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/intro-to-ethereum/index.md?collection=content_es"
      ),
    "developers/docs/layer-2-scaling/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/layer-2-scaling/index.md?collection=content_es"
      ),
    "developers/docs/mev/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/mev/index.md?collection=content_es"
      ),
    "developers/docs/networking-layer/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/networking-layer/index.md?collection=content_es"
      ),
    "developers/docs/networks/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/networks/index.md?collection=content_es"
      ),
    "developers/docs/nodes-and-clients/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/nodes-and-clients/index.md?collection=content_es"
      ),
    "developers/docs/oracles/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/oracles/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/index.md?collection=content_es"
      ),
    "developers/docs/scaling/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/scaling/index.md?collection=content_es"
      ),
    "developers/docs/security/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/security/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/index.md?collection=content_es"
      ),
    "developers/docs/standards/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/standards/index.md?collection=content_es"
      ),
    "developers/docs/storage/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/storage/index.md?collection=content_es"
      ),
    "developers/docs/transactions/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/transactions/index.md?collection=content_es"
      ),
    "developers/docs/web2-vs-web3/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/web2-vs-web3/index.md?collection=content_es"
      ),
    "developers/docs/wrapped-eth/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/wrapped-eth/index.md?collection=content_es"
      ),
    "developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md?collection=content_es"
        ),
    "developers/tutorials/ai-trading-agent/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/ai-trading-agent/index.md?collection=content_es"
      ),
    "developers/tutorials/all-you-can-cache/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/all-you-can-cache/index.md?collection=content_es"
      ),
    "developers/tutorials/app-plasma/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/app-plasma/index.md?collection=content_es"
      ),
    "developers/tutorials/calling-a-smart-contract-from-javascript/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/calling-a-smart-contract-from-javascript/index.md?collection=content_es"
        ),
    "developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md?collection=content_es"
      ),
    "developers/tutorials/deploying-your-first-smart-contract/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/deploying-your-first-smart-contract/index.md?collection=content_es"
      ),
    "developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md?collection=content_es"
        ),
    "developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md?collection=content_es"
        ),
    "developers/tutorials/eip-1271-smart-contract-signatures/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/eip-1271-smart-contract-signatures/index.md?collection=content_es"
      ),
    "developers/tutorials/erc-721-vyper-annotated-code/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/erc-721-vyper-annotated-code/index.md?collection=content_es"
      ),
    "developers/tutorials/erc20-annotated-code/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/erc20-annotated-code/index.md?collection=content_es"
      ),
    "developers/tutorials/erc20-with-safety-rails/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/erc20-with-safety-rails/index.md?collection=content_es"
      ),
    "developers/tutorials/ethereum-for-web2-auth/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/ethereum-for-web2-auth/index.md?collection=content_es"
      ),
    "developers/tutorials/gasless/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/gasless/index.md?collection=content_es"
      ),
    "developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md?collection=content_es"
        ),
    "developers/tutorials/guide-to-smart-contract-security-tools/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/guide-to-smart-contract-security-tools/index.md?collection=content_es"
        ),
    "developers/tutorials/hello-world-smart-contract/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/hello-world-smart-contract/index.md?collection=content_es"
      ),
    "developers/tutorials/hello-world-smart-contract-fullstack/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/hello-world-smart-contract-fullstack/index.md?collection=content_es"
      ),
    "developers/tutorials/how-to-implement-an-erc721-market/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/how-to-implement-an-erc721-market/index.md?collection=content_es"
      ),
    "developers/tutorials/how-to-mint-an-nft/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/how-to-mint-an-nft/index.md?collection=content_es"
      ),
    "developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md?collection=content_es"
        ),
    "developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md?collection=content_es"
        ),
    "developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md?collection=content_es"
        ),
    "developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md?collection=content_es"
        ),
    "developers/tutorials/how-to-use-tellor-as-your-oracle/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/how-to-use-tellor-as-your-oracle/index.md?collection=content_es"
      ),
    "developers/tutorials/how-to-view-nft-in-metamask/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/how-to-view-nft-in-metamask/index.md?collection=content_es"
      ),
    "developers/tutorials/how-to-write-and-deploy-an-nft/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/how-to-write-and-deploy-an-nft/index.md?collection=content_es"
      ),
    "developers/tutorials/interact-with-other-contracts-from-solidity/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/interact-with-other-contracts-from-solidity/index.md?collection=content_es"
        ),
    "developers/tutorials/ipfs-decentralized-ui/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/ipfs-decentralized-ui/index.md?collection=content_es"
      ),
    "developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md?collection=content_es"
        ),
    "developers/tutorials/kickstart-your-dapp-frontend-development-wth-create-eth-app/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/kickstart-your-dapp-frontend-development-wth-create-eth-app/index.md?collection=content_es"
        ),
    "developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md?collection=content_es"
        ),
    "developers/tutorials/logging-events-smart-contracts/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/logging-events-smart-contracts/index.md?collection=content_es"
      ),
    "developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md?collection=content_es"
        ),
    "developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md?collection=content_es"
        ),
    "developers/tutorials/nft-minter/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/nft-minter/index.md?collection=content_es"
      ),
    "developers/tutorials/optimism-std-bridge-annotated-code/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/optimism-std-bridge-annotated-code/index.md?collection=content_es"
      ),
    "developers/tutorials/reverse-engineering-a-contract/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/reverse-engineering-a-contract/index.md?collection=content_es"
      ),
    "developers/tutorials/run-node-raspberry-pi/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/run-node-raspberry-pi/index.md?collection=content_es"
      ),
    "developers/tutorials/scam-token-tricks/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/scam-token-tricks/index.md?collection=content_es"
      ),
    "developers/tutorials/secret-state/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/secret-state/index.md?collection=content_es"
      ),
    "developers/tutorials/secure-development-workflow/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/secure-development-workflow/index.md?collection=content_es"
      ),
    "developers/tutorials/send-token-etherjs/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/send-token-etherjs/index.md?collection=content_es"
      ),
    "developers/tutorials/send-token-ethersjs/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/send-token-ethersjs/index.md?collection=content_es"
      ),
    "developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md?collection=content_es"
        ),
    "developers/tutorials/server-components/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/server-components/index.md?collection=content_es"
      ),
    "developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md?collection=content_es"
        ),
    "developers/tutorials/short-abi/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/short-abi/index.md?collection=content_es"
      ),
    "developers/tutorials/smart-contract-security-guidelines/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/smart-contract-security-guidelines/index.md?collection=content_es"
      ),
    "developers/tutorials/stealth-addr/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/stealth-addr/index.md?collection=content_es"
      ),
    "developers/tutorials/the-graph-fixing-web3-data-querying/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/the-graph-fixing-web3-data-querying/index.md?collection=content_es"
      ),
    "developers/tutorials/token-integration-checklist/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/token-integration-checklist/index.md?collection=content_es"
      ),
    "developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md?collection=content_es"
        ),
    "developers/tutorials/understand-the-erc-20-token-smart-contract/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/tutorials/understand-the-erc-20-token-smart-contract/index.md?collection=content_es"
        ),
    "developers/tutorials/uniswap-v2-annotated-code/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/uniswap-v2-annotated-code/index.md?collection=content_es"
      ),
    "developers/tutorials/using-websockets/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/using-websockets/index.md?collection=content_es"
      ),
    "developers/tutorials/yellow-paper-evm/index.md": () =>
      import(
        "../public/content/translations/es/developers/tutorials/yellow-paper-evm/index.md?collection=content_es"
      ),
    "roadmap/fusaka/peerdas/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/fusaka/peerdas/index.md?collection=content_es"
      ),
    "roadmap/future-proofing/quantum-resistance/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/future-proofing/quantum-resistance/index.md?collection=content_es"
      ),
    "roadmap/merge/issuance/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/merge/issuance/index.md?collection=content_es"
      ),
    "roadmap/pectra/7702/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/pectra/7702/index.md?collection=content_es"
      ),
    "roadmap/pectra/maxeb/index.md": () =>
      import(
        "../public/content/translations/es/roadmap/pectra/maxeb/index.md?collection=content_es"
      ),
    "contributing/translation-program/translatathon/details/index.md": () =>
      import(
        "../public/content/translations/es/contributing/translation-program/translatathon/details/index.md?collection=content_es"
      ),
    "developers/docs/apis/backend/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/apis/backend/index.md?collection=content_es"
      ),
    "developers/docs/apis/javascript/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/apis/javascript/index.md?collection=content_es"
      ),
    "developers/docs/apis/json-rpc/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/apis/json-rpc/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/poa/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/poa/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pow/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/pow/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pos/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/index.md?collection=content_es"
      ),
    "developers/docs/data-and-analytics/block-explorers/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/data-and-analytics/block-explorers/index.md?collection=content_es"
      ),
    "developers/docs/data-availability/blockchain-data-storage-strategies/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/docs/data-availability/blockchain-data-storage-strategies/index.md?collection=content_es"
        ),
    "developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md?collection=content_es"
        ),
    "developers/docs/data-structures-and-encoding/rlp/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/data-structures-and-encoding/rlp/index.md?collection=content_es"
      ),
    "developers/docs/data-structures-and-encoding/ssz/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/data-structures-and-encoding/ssz/index.md?collection=content_es"
      ),
    "developers/docs/data-structures-and-encoding/web3-secret-storage/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/docs/data-structures-and-encoding/web3-secret-storage/index.md?collection=content_es"
        ),
    "developers/docs/data-structures-and-encoding/web3-secret-storage-definition/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/docs/data-structures-and-encoding/web3-secret-storage-definition/index.md?collection=content_es"
        ),
    "developers/docs/design-and-ux/dex-design-best-practice/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/design-and-ux/dex-design-best-practice/index.md?collection=content_es"
      ),
    "developers/docs/design-and-ux/heuristics-for-web3/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/design-and-ux/heuristics-for-web3/index.md?collection=content_es"
      ),
    "developers/docs/evm/opcodes/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/evm/opcodes/index.md?collection=content_es"
      ),
    "developers/docs/networking-layer/network-addresses/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/networking-layer/network-addresses/index.md?collection=content_es"
      ),
    "developers/docs/networking-layer/portal-network/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/networking-layer/portal-network/index.md?collection=content_es"
      ),
    "developers/docs/nodes-and-clients/archive-nodes/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/nodes-and-clients/archive-nodes/index.md?collection=content_es"
      ),
    "developers/docs/nodes-and-clients/bootnodes/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/nodes-and-clients/bootnodes/index.md?collection=content_es"
      ),
    "developers/docs/nodes-and-clients/client-diversity/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/nodes-and-clients/client-diversity/index.md?collection=content_es"
      ),
    "developers/docs/nodes-and-clients/node-architecture/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/nodes-and-clients/node-architecture/index.md?collection=content_es"
      ),
    "developers/docs/nodes-and-clients/light-clients/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/nodes-and-clients/light-clients/index.md?collection=content_es"
      ),
    "developers/docs/nodes-and-clients/run-a-node/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/nodes-and-clients/run-a-node/index.md?collection=content_es"
      ),
    "developers/docs/nodes-and-clients/nodes-as-a-service/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/nodes-and-clients/nodes-as-a-service/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/dart/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/dart/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/delphi/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/delphi/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/dot-net/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/dot-net/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/elixir/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/elixir/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/golang/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/golang/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/java/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/java/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/javascript/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/javascript/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/python/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/python/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/ruby/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/ruby/index.md?collection=content_es"
      ),
    "developers/docs/programming-languages/rust/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/programming-languages/rust/index.md?collection=content_es"
      ),
    "developers/docs/scaling/optimistic-rollups/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/scaling/optimistic-rollups/index.md?collection=content_es"
      ),
    "developers/docs/scaling/plasma/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/scaling/plasma/index.md?collection=content_es"
      ),
    "developers/docs/scaling/sidechains/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/scaling/sidechains/index.md?collection=content_es"
      ),
    "developers/docs/scaling/state-channels/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/scaling/state-channels/index.md?collection=content_es"
      ),
    "developers/docs/scaling/validium/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/scaling/validium/index.md?collection=content_es"
      ),
    "developers/docs/scaling/zk-rollups/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/scaling/zk-rollups/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/anatomy/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/anatomy/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/compiling/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/compiling/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/composability/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/composability/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/deploying/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/deploying/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/formal-verification/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/formal-verification/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/languages/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/languages/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/libraries/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/libraries/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/security/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/security/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/naming/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/naming/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/testing/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/testing/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/upgrading/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/upgrading/index.md?collection=content_es"
      ),
    "developers/docs/smart-contracts/verifying/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/smart-contracts/verifying/index.md?collection=content_es"
      ),
    "developers/docs/standards/tokens/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/standards/tokens/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/pow/mining/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md?collection=content_es"
        ),
    "developers/docs/consensus-mechanisms/pos/attestations/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/attestations/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pos/block-proposal/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/block-proposal/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pos/faqs/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/faqs/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pos/gasper/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/gasper/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pos/keys/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/keys/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md?collection=content_es"
        ),
    "developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md?collection=content_es"
        ),
    "developers/docs/standards/tokens/erc-1155/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/standards/tokens/erc-1155/index.md?collection=content_es"
      ),
    "developers/docs/standards/tokens/erc-1363/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/standards/tokens/erc-1363/index.md?collection=content_es"
      ),
    "developers/docs/standards/tokens/erc-20/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/standards/tokens/erc-20/index.md?collection=content_es"
      ),
    "developers/docs/standards/tokens/erc-223/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/standards/tokens/erc-223/index.md?collection=content_es"
      ),
    "developers/docs/standards/tokens/erc-4626/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/standards/tokens/erc-4626/index.md?collection=content_es"
      ),
    "developers/docs/standards/tokens/erc-721/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/standards/tokens/erc-721/index.md?collection=content_es"
      ),
    "developers/docs/standards/tokens/erc-777/index.md": () =>
      import(
        "../public/content/translations/es/developers/docs/standards/tokens/erc-777/index.md?collection=content_es"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md?collection=content_es"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md?collection=content_es"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md":
      () =>
        import(
          "../public/content/translations/es/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md?collection=content_es"
        ),
  }),
  content_fr: create.doc("content_fr", {
    "about/index.md": () =>
      import(
        "../public/content/translations/fr/about/index.md?collection=content_fr"
      ),
    "ai-agents/index.md": () =>
      import(
        "../public/content/translations/fr/ai-agents/index.md?collection=content_fr"
      ),
    "bridges/index.md": () =>
      import(
        "../public/content/translations/fr/bridges/index.md?collection=content_fr"
      ),
    "dao/index.md": () =>
      import(
        "../public/content/translations/fr/dao/index.md?collection=content_fr"
      ),
    "decentralized-identity/index.md": () =>
      import(
        "../public/content/translations/fr/decentralized-identity/index.md?collection=content_fr"
      ),
    "defi/index.md": () =>
      import(
        "../public/content/translations/fr/defi/index.md?collection=content_fr"
      ),
    "contributing/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/index.md?collection=content_fr"
      ),
    "desci/index.md": () =>
      import(
        "../public/content/translations/fr/desci/index.md?collection=content_fr"
      ),
    "eips/index.md": () =>
      import(
        "../public/content/translations/fr/eips/index.md?collection=content_fr"
      ),
    "energy-consumption/index.md": () =>
      import(
        "../public/content/translations/fr/energy-consumption/index.md?collection=content_fr"
      ),
    "ethereum-forks/index.md": () =>
      import(
        "../public/content/translations/fr/ethereum-forks/index.md?collection=content_fr"
      ),
    "foundation/index.md": () =>
      import(
        "../public/content/translations/fr/foundation/index.md?collection=content_fr"
      ),
    "gaming/index.md": () =>
      import(
        "../public/content/translations/fr/gaming/index.md?collection=content_fr"
      ),
    "glossary/index.md": () =>
      import(
        "../public/content/translations/fr/glossary/index.md?collection=content_fr"
      ),
    "governance/index.md": () =>
      import(
        "../public/content/translations/fr/governance/index.md?collection=content_fr"
      ),
    "guides/index.md": () =>
      import(
        "../public/content/translations/fr/guides/index.md?collection=content_fr"
      ),
    "nft/index.md": () =>
      import(
        "../public/content/translations/fr/nft/index.md?collection=content_fr"
      ),
    "payments/index.md": () =>
      import(
        "../public/content/translations/fr/payments/index.md?collection=content_fr"
      ),
    "privacy/index.md": () =>
      import(
        "../public/content/translations/fr/privacy/index.md?collection=content_fr"
      ),
    "prediction-markets/index.md": () =>
      import(
        "../public/content/translations/fr/prediction-markets/index.md?collection=content_fr"
      ),
    "refi/index.md": () =>
      import(
        "../public/content/translations/fr/refi/index.md?collection=content_fr"
      ),
    "real-world-assets/index.md": () =>
      import(
        "../public/content/translations/fr/real-world-assets/index.md?collection=content_fr"
      ),
    "restaking/index.md": () =>
      import(
        "../public/content/translations/fr/restaking/index.md?collection=content_fr"
      ),
    "smart-contracts/index.md": () =>
      import(
        "../public/content/translations/fr/smart-contracts/index.md?collection=content_fr"
      ),
    "security/index.md": () =>
      import(
        "../public/content/translations/fr/security/index.md?collection=content_fr"
      ),
    "social-networks/index.md": () =>
      import(
        "../public/content/translations/fr/social-networks/index.md?collection=content_fr"
      ),
    "web3/index.md": () =>
      import(
        "../public/content/translations/fr/web3/index.md?collection=content_fr"
      ),
    "what-are-apps/index.md": () =>
      import(
        "../public/content/translations/fr/what-are-apps/index.md?collection=content_fr"
      ),
    "whitepaper/index.md": () =>
      import(
        "../public/content/translations/fr/whitepaper/index.md?collection=content_fr"
      ),
    "wrapped-eth/index.md": () =>
      import(
        "../public/content/translations/fr/wrapped-eth/index.md?collection=content_fr"
      ),
    "zero-knowledge-proofs/index.md": () =>
      import(
        "../public/content/translations/fr/zero-knowledge-proofs/index.md?collection=content_fr"
      ),
    "community/code-of-conduct/index.md": () =>
      import(
        "../public/content/translations/fr/community/code-of-conduct/index.md?collection=content_fr"
      ),
    "community/get-involved/index.md": () =>
      import(
        "../public/content/translations/fr/community/get-involved/index.md?collection=content_fr"
      ),
    "community/grants/index.md": () =>
      import(
        "../public/content/translations/fr/community/grants/index.md?collection=content_fr"
      ),
    "community/language-resources/index.md": () =>
      import(
        "../public/content/translations/fr/community/language-resources/index.md?collection=content_fr"
      ),
    "community/online/index.md": () =>
      import(
        "../public/content/translations/fr/community/online/index.md?collection=content_fr"
      ),
    "community/research/index.md": () =>
      import(
        "../public/content/translations/fr/community/research/index.md?collection=content_fr"
      ),
    "contributing/adding-desci-projects/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/adding-desci-projects/index.md?collection=content_fr"
      ),
    "contributing/adding-developer-tools/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/adding-developer-tools/index.md?collection=content_fr"
      ),
    "contributing/adding-exchanges/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/adding-exchanges/index.md?collection=content_fr"
      ),
    "contributing/adding-layer-2s/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/adding-layer-2s/index.md?collection=content_fr"
      ),
    "contributing/adding-products/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/adding-products/index.md?collection=content_fr"
      ),
    "contributing/adding-resources/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/adding-resources/index.md?collection=content_fr"
      ),
    "contributing/adding-glossary-terms/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/adding-glossary-terms/index.md?collection=content_fr"
      ),
    "contributing/adding-staking-products/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/adding-staking-products/index.md?collection=content_fr"
      ),
    "contributing/adding-videos/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/adding-videos/index.md?collection=content_fr"
      ),
    "contributing/adding-wallets/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/adding-wallets/index.md?collection=content_fr"
      ),
    "contributing/content-resources/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/content-resources/index.md?collection=content_fr"
      ),
    "contributing/design/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/design/index.md?collection=content_fr"
      ),
    "contributing/design-principles/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/design-principles/index.md?collection=content_fr"
      ),
    "contributing/quizzes/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/quizzes/index.md?collection=content_fr"
      ),
    "contributing/translation-program/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/translation-program/index.md?collection=content_fr"
      ),
    "developers/docs/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/index.md?collection=content_fr"
      ),
    "eth/supply/index.md": () =>
      import(
        "../public/content/translations/fr/eth/supply/index.md?collection=content_fr"
      ),
    "guides/how-to-create-an-ethereum-account/index.md": () =>
      import(
        "../public/content/translations/fr/guides/how-to-create-an-ethereum-account/index.md?collection=content_fr"
      ),
    "guides/how-to-id-scam-tokens/index.md": () =>
      import(
        "../public/content/translations/fr/guides/how-to-id-scam-tokens/index.md?collection=content_fr"
      ),
    "guides/how-to-revoke-token-access/index.md": () =>
      import(
        "../public/content/translations/fr/guides/how-to-revoke-token-access/index.md?collection=content_fr"
      ),
    "guides/how-to-swap-tokens/index.md": () =>
      import(
        "../public/content/translations/fr/guides/how-to-swap-tokens/index.md?collection=content_fr"
      ),
    "guides/how-to-use-a-bridge/index.md": () =>
      import(
        "../public/content/translations/fr/guides/how-to-use-a-bridge/index.md?collection=content_fr"
      ),
    "guides/how-to-use-a-wallet/index.md": () =>
      import(
        "../public/content/translations/fr/guides/how-to-use-a-wallet/index.md?collection=content_fr"
      ),
    "roadmap/account-abstraction/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/account-abstraction/index.md?collection=content_fr"
      ),
    "roadmap/beacon-chain/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/beacon-chain/index.md?collection=content_fr"
      ),
    "roadmap/danksharding/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/danksharding/index.md?collection=content_fr"
      ),
    "roadmap/dencun/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/dencun/index.md?collection=content_fr"
      ),
    "roadmap/fusaka/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/fusaka/index.md?collection=content_fr"
      ),
    "roadmap/future-proofing/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/future-proofing/index.md?collection=content_fr"
      ),
    "roadmap/glamsterdam/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/glamsterdam/index.md?collection=content_fr"
      ),
    "roadmap/merge/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/merge/index.md?collection=content_fr"
      ),
    "roadmap/pbs/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/pbs/index.md?collection=content_fr"
      ),
    "roadmap/pectra/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/pectra/index.md?collection=content_fr"
      ),
    "roadmap/scaling/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/scaling/index.md?collection=content_fr"
      ),
    "roadmap/secret-leader-election/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/secret-leader-election/index.md?collection=content_fr"
      ),
    "roadmap/security/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/security/index.md?collection=content_fr"
      ),
    "roadmap/single-slot-finality/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/single-slot-finality/index.md?collection=content_fr"
      ),
    "roadmap/statelessness/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/statelessness/index.md?collection=content_fr"
      ),
    "roadmap/user-experience/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/user-experience/index.md?collection=content_fr"
      ),
    "roadmap/verkle-trees/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/verkle-trees/index.md?collection=content_fr"
      ),
    "roadmap/zkevm/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/zkevm/index.md?collection=content_fr"
      ),
    "staking/dvt/index.md": () =>
      import(
        "../public/content/translations/fr/staking/dvt/index.md?collection=content_fr"
      ),
    "staking/pools/index.md": () =>
      import(
        "../public/content/translations/fr/staking/pools/index.md?collection=content_fr"
      ),
    "staking/saas/index.md": () =>
      import(
        "../public/content/translations/fr/staking/saas/index.md?collection=content_fr"
      ),
    "staking/withdrawals/index.md": () =>
      import(
        "../public/content/translations/fr/staking/withdrawals/index.md?collection=content_fr"
      ),
    "staking/solo/index.md": () =>
      import(
        "../public/content/translations/fr/staking/solo/index.md?collection=content_fr"
      ),
    "videos/ai-agents-interview-luna/index.md": () =>
      import(
        "../public/content/translations/fr/videos/ai-agents-interview-luna/index.md?collection=content_fr"
      ),
    "videos/atoms-institutions-blockchains-josh-stark/index.md": () =>
      import(
        "../public/content/translations/fr/videos/atoms-institutions-blockchains-josh-stark/index.md?collection=content_fr"
      ),
    "videos/blobspace-101-dencun/index.md": () =>
      import(
        "../public/content/translations/fr/videos/blobspace-101-dencun/index.md?collection=content_fr"
      ),
    "videos/blockchain-eth-build/index.md": () =>
      import(
        "../public/content/translations/fr/videos/blockchain-eth-build/index.md?collection=content_fr"
      ),
    "videos/blockchain-101-visual-demo/index.md": () =>
      import(
        "../public/content/translations/fr/videos/blockchain-101-visual-demo/index.md?collection=content_fr"
      ),
    "videos/crypto-apps-desocial-linda-xie/index.md": () =>
      import(
        "../public/content/translations/fr/videos/crypto-apps-desocial-linda-xie/index.md?collection=content_fr"
      ),
    "videos/crypto-security-passwords/index.md": () =>
      import(
        "../public/content/translations/fr/videos/crypto-security-passwords/index.md?collection=content_fr"
      ),
    "videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md": () =>
      import(
        "../public/content/translations/fr/videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md?collection=content_fr"
      ),
    "videos/dao-build-next-great-city/index.md": () =>
      import(
        "../public/content/translations/fr/videos/dao-build-next-great-city/index.md?collection=content_fr"
      ),
    "videos/dao-hack-ethereum-classic/index.md": () =>
      import(
        "../public/content/translations/fr/videos/dao-hack-ethereum-classic/index.md?collection=content_fr"
      ),
    "videos/decentralized-identity-explained/index.md": () =>
      import(
        "../public/content/translations/fr/videos/decentralized-identity-explained/index.md?collection=content_fr"
      ),
    "videos/decentralized-social-media/index.md": () =>
      import(
        "../public/content/translations/fr/videos/decentralized-social-media/index.md?collection=content_fr"
      ),
    "videos/defi-future-of-finance/index.md": () =>
      import(
        "../public/content/translations/fr/videos/defi-future-of-finance/index.md?collection=content_fr"
      ),
    "videos/defi-history-inception-to-2021/index.md": () =>
      import(
        "../public/content/translations/fr/videos/defi-history-inception-to-2021/index.md?collection=content_fr"
      ),
    "videos/desci-movement-juan-benet/index.md": () =>
      import(
        "../public/content/translations/fr/videos/desci-movement-juan-benet/index.md?collection=content_fr"
      ),
    "videos/devcon-mumbai-coming-2026/index.md": () =>
      import(
        "../public/content/translations/fr/videos/devcon-mumbai-coming-2026/index.md?collection=content_fr"
      ),
    "videos/devconnect-argentina-2025-recap/index.md": () =>
      import(
        "../public/content/translations/fr/videos/devconnect-argentina-2025-recap/index.md?collection=content_fr"
      ),
    "videos/devconnect-buenos-aires-promo/index.md": () =>
      import(
        "../public/content/translations/fr/videos/devconnect-buenos-aires-promo/index.md?collection=content_fr"
      ),
    "videos/eigenlayer-permissionless-features/index.md": () =>
      import(
        "../public/content/translations/fr/videos/eigenlayer-permissionless-features/index.md?collection=content_fr"
      ),
    "videos/eip-4844-dencun-explained/index.md": () =>
      import(
        "../public/content/translations/fr/videos/eip-4844-dencun-explained/index.md?collection=content_fr"
      ),
    "videos/ethereum-basics-intro/index.md": () =>
      import(
        "../public/content/translations/fr/videos/ethereum-basics-intro/index.md?collection=content_fr"
      ),
    "videos/ethereum-core-governance-explained/index.md": () =>
      import(
        "../public/content/translations/fr/videos/ethereum-core-governance-explained/index.md?collection=content_fr"
      ),
    "videos/ethereum-evolution-glamsterdam/index.md": () =>
      import(
        "../public/content/translations/fr/videos/ethereum-evolution-glamsterdam/index.md?collection=content_fr"
      ),
    "videos/ethereum-in-30-minutes-vitalik-buterin/index.md": () =>
      import(
        "../public/content/translations/fr/videos/ethereum-in-30-minutes-vitalik-buterin/index.md?collection=content_fr"
      ),
    "videos/ethereum-institutional-privacy-panel/index.md": () =>
      import(
        "../public/content/translations/fr/videos/ethereum-institutional-privacy-panel/index.md?collection=content_fr"
      ),
    "videos/ethereum-localism-global-protocols-local-power/index.md": () =>
      import(
        "../public/content/translations/fr/videos/ethereum-localism-global-protocols-local-power/index.md?collection=content_fr"
      ),
    "videos/ethereum-staking-withdrawals/index.md": () =>
      import(
        "../public/content/translations/fr/videos/ethereum-staking-withdrawals/index.md?collection=content_fr"
      ),
    "videos/ethereum-things-i-like-mariano-conti/index.md": () =>
      import(
        "../public/content/translations/fr/videos/ethereum-things-i-like-mariano-conti/index.md?collection=content_fr"
      ),
    "videos/ethereums-quantum-plan-justin-drake/index.md": () =>
      import(
        "../public/content/translations/fr/videos/ethereums-quantum-plan-justin-drake/index.md?collection=content_fr"
      ),
    "videos/fusaka-upgrade-explained/index.md": () =>
      import(
        "../public/content/translations/fr/videos/fusaka-upgrade-explained/index.md?collection=content_fr"
      ),
    "videos/hash-function-eth-build/index.md": () =>
      import(
        "../public/content/translations/fr/videos/hash-function-eth-build/index.md?collection=content_fr"
      ),
    "videos/how-to-be-cypherpunk-juan-benet/index.md": () =>
      import(
        "../public/content/translations/fr/videos/how-to-be-cypherpunk-juan-benet/index.md?collection=content_fr"
      ),
    "videos/how-to-make-a-guerilla-l2/index.md": () =>
      import(
        "../public/content/translations/fr/videos/how-to-make-a-guerilla-l2/index.md?collection=content_fr"
      ),
    "videos/key-pair-eth-build/index.md": () =>
      import(
        "../public/content/translations/fr/videos/key-pair-eth-build/index.md?collection=content_fr"
      ),
    "videos/layer-2-scaling-explained/index.md": () =>
      import(
        "../public/content/translations/fr/videos/layer-2-scaling-explained/index.md?collection=content_fr"
      ),
    "videos/learn-nfts-and-defi/index.md": () =>
      import(
        "../public/content/translations/fr/videos/learn-nfts-and-defi/index.md?collection=content_fr"
      ),
    "videos/next-10-years-of-ethereum/index.md": () =>
      import(
        "../public/content/translations/fr/videos/next-10-years-of-ethereum/index.md?collection=content_fr"
      ),
    "videos/pectra-what-stakers-need-to-know/index.md": () =>
      import(
        "../public/content/translations/fr/videos/pectra-what-stakers-need-to-know/index.md?collection=content_fr"
      ),
    "videos/pectra-upgrade-overview/index.md": () =>
      import(
        "../public/content/translations/fr/videos/pectra-upgrade-overview/index.md?collection=content_fr"
      ),
    "videos/pos-reorgs-attack-defense/index.md": () =>
      import(
        "../public/content/translations/fr/videos/pos-reorgs-attack-defense/index.md?collection=content_fr"
      ),
    "videos/post-quantum-security-ethereum-roadmap/index.md": () =>
      import(
        "../public/content/translations/fr/videos/post-quantum-security-ethereum-roadmap/index.md?collection=content_fr"
      ),
    "videos/pow-vs-pos/index.md": () =>
      import(
        "../public/content/translations/fr/videos/pow-vs-pos/index.md?collection=content_fr"
      ),
    "videos/proof-of-authority-explained/index.md": () =>
      import(
        "../public/content/translations/fr/videos/proof-of-authority-explained/index.md?collection=content_fr"
      ),
    "videos/proof-of-work-explained/index.md": () =>
      import(
        "../public/content/translations/fr/videos/proof-of-work-explained/index.md?collection=content_fr"
      ),
    "videos/proposer-builder-separation/index.md": () =>
      import(
        "../public/content/translations/fr/videos/proposer-builder-separation/index.md?collection=content_fr"
      ),
    "videos/real-state-of-l2s-bartek-kiepuszewski/index.md": () =>
      import(
        "../public/content/translations/fr/videos/real-state-of-l2s-bartek-kiepuszewski/index.md?collection=content_fr"
      ),
    "videos/regenerative-finance-refi/index.md": () =>
      import(
        "../public/content/translations/fr/videos/regenerative-finance-refi/index.md?collection=content_fr"
      ),
    "videos/restaking-explained/index.md": () =>
      import(
        "../public/content/translations/fr/videos/restaking-explained/index.md?collection=content_fr"
      ),
    "videos/rollups-scaling-strategy/index.md": () =>
      import(
        "../public/content/translations/fr/videos/rollups-scaling-strategy/index.md?collection=content_fr"
      ),
    "videos/security-through-obscurity-microdots/index.md": () =>
      import(
        "../public/content/translations/fr/videos/security-through-obscurity-microdots/index.md?collection=content_fr"
      ),
    "videos/smart-contracts-code-is-law/index.md": () =>
      import(
        "../public/content/translations/fr/videos/smart-contracts-code-is-law/index.md?collection=content_fr"
      ),
    "videos/stani-kulechov-building-aave/index.md": () =>
      import(
        "../public/content/translations/fr/videos/stani-kulechov-building-aave/index.md?collection=content_fr"
      ),
    "videos/surveillance-silence-reclaiming-privacy/index.md": () =>
      import(
        "../public/content/translations/fr/videos/surveillance-silence-reclaiming-privacy/index.md?collection=content_fr"
      ),
    "videos/transactions-eth-build/index.md": () =>
      import(
        "../public/content/translations/fr/videos/transactions-eth-build/index.md?collection=content_fr"
      ),
    "videos/understanding-consensus-mechanisms/index.md": () =>
      import(
        "../public/content/translations/fr/videos/understanding-consensus-mechanisms/index.md?collection=content_fr"
      ),
    "videos/what-is-a-dapp/index.md": () =>
      import(
        "../public/content/translations/fr/videos/what-is-a-dapp/index.md?collection=content_fr"
      ),
    "videos/zero-knowledge-proofs-5-levels/index.md": () =>
      import(
        "../public/content/translations/fr/videos/zero-knowledge-proofs-5-levels/index.md?collection=content_fr"
      ),
    "community/events/organizing/index.md": () =>
      import(
        "../public/content/translations/fr/community/events/organizing/index.md?collection=content_fr"
      ),
    "community/support/faq/index.md": () =>
      import(
        "../public/content/translations/fr/community/support/faq/index.md?collection=content_fr"
      ),
    "community/support/misconceptions/index.md": () =>
      import(
        "../public/content/translations/fr/community/support/misconceptions/index.md?collection=content_fr"
      ),
    "community/support/scams/index.md": () =>
      import(
        "../public/content/translations/fr/community/support/scams/index.md?collection=content_fr"
      ),
    "contributing/design/adding-design-resources/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/design/adding-design-resources/index.md?collection=content_fr"
      ),
    "contributing/translation-program/faq/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/translation-program/faq/index.md?collection=content_fr"
      ),
    "contributing/translation-program/how-to-translate/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/translation-program/how-to-translate/index.md?collection=content_fr"
      ),
    "contributing/translation-program/mission-and-vision/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/translation-program/mission-and-vision/index.md?collection=content_fr"
      ),
    "contributing/translation-program/playbook/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/translation-program/playbook/index.md?collection=content_fr"
      ),
    "contributing/translation-program/resources/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/translation-program/resources/index.md?collection=content_fr"
      ),
    "contributing/translation-program/translatathon/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/translation-program/translatathon/index.md?collection=content_fr"
      ),
    "contributing/translation-program/translators-guide/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/translation-program/translators-guide/index.md?collection=content_fr"
      ),
    "developers/docs/accounts/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/accounts/index.md?collection=content_fr"
      ),
    "developers/docs/blocks/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/blocks/index.md?collection=content_fr"
      ),
    "developers/docs/bridges/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/bridges/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/index.md?collection=content_fr"
      ),
    "developers/docs/dapps/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/dapps/index.md?collection=content_fr"
      ),
    "developers/docs/data-and-analytics/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/data-and-analytics/index.md?collection=content_fr"
      ),
    "developers/docs/data-availability/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/data-availability/index.md?collection=content_fr"
      ),
    "developers/docs/data-structures-and-encoding/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/data-structures-and-encoding/index.md?collection=content_fr"
      ),
    "developers/docs/design-and-ux/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/design-and-ux/index.md?collection=content_fr"
      ),
    "developers/docs/development-networks/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/development-networks/index.md?collection=content_fr"
      ),
    "developers/docs/ethereum-stack/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/ethereum-stack/index.md?collection=content_fr"
      ),
    "developers/docs/evm/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/evm/index.md?collection=content_fr"
      ),
    "developers/docs/frameworks/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/frameworks/index.md?collection=content_fr"
      ),
    "developers/docs/gas/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/gas/index.md?collection=content_fr"
      ),
    "developers/docs/ides/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/ides/index.md?collection=content_fr"
      ),
    "developers/docs/intro-to-ether/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/intro-to-ether/index.md?collection=content_fr"
      ),
    "developers/docs/intro-to-ethereum/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/intro-to-ethereum/index.md?collection=content_fr"
      ),
    "developers/docs/layer-2-scaling/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/layer-2-scaling/index.md?collection=content_fr"
      ),
    "developers/docs/mev/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/mev/index.md?collection=content_fr"
      ),
    "developers/docs/networking-layer/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/networking-layer/index.md?collection=content_fr"
      ),
    "developers/docs/networks/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/networks/index.md?collection=content_fr"
      ),
    "developers/docs/nodes-and-clients/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/nodes-and-clients/index.md?collection=content_fr"
      ),
    "developers/docs/oracles/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/oracles/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/index.md?collection=content_fr"
      ),
    "developers/docs/scaling/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/scaling/index.md?collection=content_fr"
      ),
    "developers/docs/security/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/security/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/index.md?collection=content_fr"
      ),
    "developers/docs/standards/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/standards/index.md?collection=content_fr"
      ),
    "developers/docs/storage/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/storage/index.md?collection=content_fr"
      ),
    "developers/docs/transactions/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/transactions/index.md?collection=content_fr"
      ),
    "developers/docs/web2-vs-web3/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/web2-vs-web3/index.md?collection=content_fr"
      ),
    "developers/docs/wrapped-eth/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/wrapped-eth/index.md?collection=content_fr"
      ),
    "developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md?collection=content_fr"
        ),
    "developers/tutorials/ai-trading-agent/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/ai-trading-agent/index.md?collection=content_fr"
      ),
    "developers/tutorials/all-you-can-cache/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/all-you-can-cache/index.md?collection=content_fr"
      ),
    "developers/tutorials/app-plasma/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/app-plasma/index.md?collection=content_fr"
      ),
    "developers/tutorials/calling-a-smart-contract-from-javascript/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/calling-a-smart-contract-from-javascript/index.md?collection=content_fr"
        ),
    "developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md?collection=content_fr"
      ),
    "developers/tutorials/deploying-your-first-smart-contract/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/deploying-your-first-smart-contract/index.md?collection=content_fr"
      ),
    "developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md?collection=content_fr"
        ),
    "developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md?collection=content_fr"
        ),
    "developers/tutorials/eip-1271-smart-contract-signatures/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/eip-1271-smart-contract-signatures/index.md?collection=content_fr"
      ),
    "developers/tutorials/erc-721-vyper-annotated-code/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/erc-721-vyper-annotated-code/index.md?collection=content_fr"
      ),
    "developers/tutorials/erc20-annotated-code/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/erc20-annotated-code/index.md?collection=content_fr"
      ),
    "developers/tutorials/erc20-with-safety-rails/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/erc20-with-safety-rails/index.md?collection=content_fr"
      ),
    "developers/tutorials/ethereum-for-web2-auth/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/ethereum-for-web2-auth/index.md?collection=content_fr"
      ),
    "developers/tutorials/gasless/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/gasless/index.md?collection=content_fr"
      ),
    "developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md?collection=content_fr"
        ),
    "developers/tutorials/guide-to-smart-contract-security-tools/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/guide-to-smart-contract-security-tools/index.md?collection=content_fr"
        ),
    "developers/tutorials/hello-world-smart-contract/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/hello-world-smart-contract/index.md?collection=content_fr"
      ),
    "developers/tutorials/hello-world-smart-contract-fullstack/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/hello-world-smart-contract-fullstack/index.md?collection=content_fr"
      ),
    "developers/tutorials/how-to-implement-an-erc721-market/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/how-to-implement-an-erc721-market/index.md?collection=content_fr"
      ),
    "developers/tutorials/how-to-mint-an-nft/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/how-to-mint-an-nft/index.md?collection=content_fr"
      ),
    "developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md?collection=content_fr"
        ),
    "developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md?collection=content_fr"
        ),
    "developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md?collection=content_fr"
        ),
    "developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md?collection=content_fr"
        ),
    "developers/tutorials/how-to-use-tellor-as-your-oracle/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/how-to-use-tellor-as-your-oracle/index.md?collection=content_fr"
      ),
    "developers/tutorials/how-to-view-nft-in-metamask/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/how-to-view-nft-in-metamask/index.md?collection=content_fr"
      ),
    "developers/tutorials/how-to-write-and-deploy-an-nft/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/how-to-write-and-deploy-an-nft/index.md?collection=content_fr"
      ),
    "developers/tutorials/interact-with-other-contracts-from-solidity/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/interact-with-other-contracts-from-solidity/index.md?collection=content_fr"
        ),
    "developers/tutorials/ipfs-decentralized-ui/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/ipfs-decentralized-ui/index.md?collection=content_fr"
      ),
    "developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md?collection=content_fr"
        ),
    "developers/tutorials/kickstart-your-dapp-frontend-development-wth-create-eth-app/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/kickstart-your-dapp-frontend-development-wth-create-eth-app/index.md?collection=content_fr"
        ),
    "developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md?collection=content_fr"
        ),
    "developers/tutorials/logging-events-smart-contracts/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/logging-events-smart-contracts/index.md?collection=content_fr"
      ),
    "developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md?collection=content_fr"
        ),
    "developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md?collection=content_fr"
        ),
    "developers/tutorials/nft-minter/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/nft-minter/index.md?collection=content_fr"
      ),
    "developers/tutorials/optimism-std-bridge-annotated-code/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/optimism-std-bridge-annotated-code/index.md?collection=content_fr"
      ),
    "developers/tutorials/reverse-engineering-a-contract/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/reverse-engineering-a-contract/index.md?collection=content_fr"
      ),
    "developers/tutorials/run-node-raspberry-pi/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/run-node-raspberry-pi/index.md?collection=content_fr"
      ),
    "developers/tutorials/scam-token-tricks/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/scam-token-tricks/index.md?collection=content_fr"
      ),
    "developers/tutorials/secret-state/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/secret-state/index.md?collection=content_fr"
      ),
    "developers/tutorials/secure-development-workflow/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/secure-development-workflow/index.md?collection=content_fr"
      ),
    "developers/tutorials/send-token-ethersjs/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/send-token-ethersjs/index.md?collection=content_fr"
      ),
    "developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md?collection=content_fr"
        ),
    "developers/tutorials/server-components/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/server-components/index.md?collection=content_fr"
      ),
    "developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md?collection=content_fr"
        ),
    "developers/tutorials/short-abi/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/short-abi/index.md?collection=content_fr"
      ),
    "developers/tutorials/smart-contract-security-guidelines/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/smart-contract-security-guidelines/index.md?collection=content_fr"
      ),
    "developers/tutorials/stealth-addr/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/stealth-addr/index.md?collection=content_fr"
      ),
    "developers/tutorials/the-graph-fixing-web3-data-querying/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/the-graph-fixing-web3-data-querying/index.md?collection=content_fr"
      ),
    "developers/tutorials/token-integration-checklist/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/token-integration-checklist/index.md?collection=content_fr"
      ),
    "developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md?collection=content_fr"
        ),
    "developers/tutorials/understand-the-erc-20-token-smart-contract/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/tutorials/understand-the-erc-20-token-smart-contract/index.md?collection=content_fr"
        ),
    "developers/tutorials/uniswap-v2-annotated-code/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/uniswap-v2-annotated-code/index.md?collection=content_fr"
      ),
    "developers/tutorials/using-websockets/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/using-websockets/index.md?collection=content_fr"
      ),
    "developers/tutorials/yellow-paper-evm/index.md": () =>
      import(
        "../public/content/translations/fr/developers/tutorials/yellow-paper-evm/index.md?collection=content_fr"
      ),
    "roadmap/fusaka/peerdas/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/fusaka/peerdas/index.md?collection=content_fr"
      ),
    "roadmap/future-proofing/quantum-resistance/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/future-proofing/quantum-resistance/index.md?collection=content_fr"
      ),
    "roadmap/merge/issuance/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/merge/issuance/index.md?collection=content_fr"
      ),
    "roadmap/pectra/7702/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/pectra/7702/index.md?collection=content_fr"
      ),
    "roadmap/pectra/maxeb/index.md": () =>
      import(
        "../public/content/translations/fr/roadmap/pectra/maxeb/index.md?collection=content_fr"
      ),
    "contributing/translation-program/translatathon/details/index.md": () =>
      import(
        "../public/content/translations/fr/contributing/translation-program/translatathon/details/index.md?collection=content_fr"
      ),
    "developers/docs/apis/javascript/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/apis/javascript/index.md?collection=content_fr"
      ),
    "developers/docs/apis/backend/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/apis/backend/index.md?collection=content_fr"
      ),
    "developers/docs/apis/json-rpc/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/apis/json-rpc/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/poa/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/poa/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pow/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/pow/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pos/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/index.md?collection=content_fr"
      ),
    "developers/docs/data-and-analytics/block-explorers/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/data-and-analytics/block-explorers/index.md?collection=content_fr"
      ),
    "developers/docs/data-availability/blockchain-data-storage-strategies/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/docs/data-availability/blockchain-data-storage-strategies/index.md?collection=content_fr"
        ),
    "developers/docs/data-structures-and-encoding/rlp/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/data-structures-and-encoding/rlp/index.md?collection=content_fr"
      ),
    "developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md?collection=content_fr"
        ),
    "developers/docs/data-structures-and-encoding/ssz/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/data-structures-and-encoding/ssz/index.md?collection=content_fr"
      ),
    "developers/docs/data-structures-and-encoding/web3-secret-storage/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/docs/data-structures-and-encoding/web3-secret-storage/index.md?collection=content_fr"
        ),
    "developers/docs/data-structures-and-encoding/web3-secret-storage-definition/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/docs/data-structures-and-encoding/web3-secret-storage-definition/index.md?collection=content_fr"
        ),
    "developers/docs/design-and-ux/dex-design-best-practice/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/design-and-ux/dex-design-best-practice/index.md?collection=content_fr"
      ),
    "developers/docs/design-and-ux/heuristics-for-web3/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/design-and-ux/heuristics-for-web3/index.md?collection=content_fr"
      ),
    "developers/docs/evm/opcodes/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/evm/opcodes/index.md?collection=content_fr"
      ),
    "developers/docs/networking-layer/network-addresses/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/networking-layer/network-addresses/index.md?collection=content_fr"
      ),
    "developers/docs/networking-layer/portal-network/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/networking-layer/portal-network/index.md?collection=content_fr"
      ),
    "developers/docs/nodes-and-clients/archive-nodes/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/nodes-and-clients/archive-nodes/index.md?collection=content_fr"
      ),
    "developers/docs/nodes-and-clients/bootnodes/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/nodes-and-clients/bootnodes/index.md?collection=content_fr"
      ),
    "developers/docs/nodes-and-clients/client-diversity/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/nodes-and-clients/client-diversity/index.md?collection=content_fr"
      ),
    "developers/docs/nodes-and-clients/light-clients/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/nodes-and-clients/light-clients/index.md?collection=content_fr"
      ),
    "developers/docs/nodes-and-clients/node-architecture/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/nodes-and-clients/node-architecture/index.md?collection=content_fr"
      ),
    "developers/docs/nodes-and-clients/nodes-as-a-service/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/nodes-and-clients/nodes-as-a-service/index.md?collection=content_fr"
      ),
    "developers/docs/nodes-and-clients/run-a-node/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/nodes-and-clients/run-a-node/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/dart/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/dart/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/delphi/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/delphi/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/dot-net/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/dot-net/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/elixir/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/elixir/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/golang/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/golang/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/java/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/java/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/python/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/python/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/javascript/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/javascript/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/ruby/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/ruby/index.md?collection=content_fr"
      ),
    "developers/docs/programming-languages/rust/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/programming-languages/rust/index.md?collection=content_fr"
      ),
    "developers/docs/scaling/plasma/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/scaling/plasma/index.md?collection=content_fr"
      ),
    "developers/docs/scaling/optimistic-rollups/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/scaling/optimistic-rollups/index.md?collection=content_fr"
      ),
    "developers/docs/scaling/sidechains/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/scaling/sidechains/index.md?collection=content_fr"
      ),
    "developers/docs/scaling/state-channels/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/scaling/state-channels/index.md?collection=content_fr"
      ),
    "developers/docs/scaling/validium/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/scaling/validium/index.md?collection=content_fr"
      ),
    "developers/docs/scaling/zk-rollups/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/scaling/zk-rollups/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/anatomy/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/anatomy/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/compiling/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/compiling/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/composability/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/composability/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/deploying/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/deploying/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/formal-verification/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/formal-verification/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/languages/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/languages/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/libraries/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/libraries/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/naming/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/naming/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/security/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/security/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/testing/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/testing/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/upgrading/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/upgrading/index.md?collection=content_fr"
      ),
    "developers/docs/smart-contracts/verifying/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/smart-contracts/verifying/index.md?collection=content_fr"
      ),
    "developers/docs/standards/tokens/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/standards/tokens/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/pow/mining/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pos/attestations/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/attestations/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md?collection=content_fr"
        ),
    "developers/docs/consensus-mechanisms/pos/block-proposal/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/block-proposal/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pos/faqs/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/faqs/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pos/gasper/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/gasper/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pos/keys/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/keys/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md?collection=content_fr"
        ),
    "developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md?collection=content_fr"
        ),
    "developers/docs/standards/tokens/erc-1155/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/standards/tokens/erc-1155/index.md?collection=content_fr"
      ),
    "developers/docs/standards/tokens/erc-1363/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/standards/tokens/erc-1363/index.md?collection=content_fr"
      ),
    "developers/docs/standards/tokens/erc-20/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/standards/tokens/erc-20/index.md?collection=content_fr"
      ),
    "developers/docs/standards/tokens/erc-223/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/standards/tokens/erc-223/index.md?collection=content_fr"
      ),
    "developers/docs/standards/tokens/erc-4626/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/standards/tokens/erc-4626/index.md?collection=content_fr"
      ),
    "developers/docs/standards/tokens/erc-721/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/standards/tokens/erc-721/index.md?collection=content_fr"
      ),
    "developers/docs/standards/tokens/erc-777/index.md": () =>
      import(
        "../public/content/translations/fr/developers/docs/standards/tokens/erc-777/index.md?collection=content_fr"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md?collection=content_fr"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md?collection=content_fr"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md":
      () =>
        import(
          "../public/content/translations/fr/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md?collection=content_fr"
        ),
  }),
  content_hi: create.doc("content_hi", {}),
  content_id: create.doc("content_id", {}),
  content_it: create.doc("content_it", {}),
  content_ja: create.doc("content_ja", {
    "about/index.md": () =>
      import(
        "../public/content/translations/ja/about/index.md?collection=content_ja"
      ),
    "ai-agents/index.md": () =>
      import(
        "../public/content/translations/ja/ai-agents/index.md?collection=content_ja"
      ),
    "bridges/index.md": () =>
      import(
        "../public/content/translations/ja/bridges/index.md?collection=content_ja"
      ),
    "contributing/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/index.md?collection=content_ja"
      ),
    "dao/index.md": () =>
      import(
        "../public/content/translations/ja/dao/index.md?collection=content_ja"
      ),
    "defi/index.md": () =>
      import(
        "../public/content/translations/ja/defi/index.md?collection=content_ja"
      ),
    "decentralized-identity/index.md": () =>
      import(
        "../public/content/translations/ja/decentralized-identity/index.md?collection=content_ja"
      ),
    "desci/index.md": () =>
      import(
        "../public/content/translations/ja/desci/index.md?collection=content_ja"
      ),
    "eips/index.md": () =>
      import(
        "../public/content/translations/ja/eips/index.md?collection=content_ja"
      ),
    "energy-consumption/index.md": () =>
      import(
        "../public/content/translations/ja/energy-consumption/index.md?collection=content_ja"
      ),
    "foundation/index.md": () =>
      import(
        "../public/content/translations/ja/foundation/index.md?collection=content_ja"
      ),
    "ethereum-forks/index.md": () =>
      import(
        "../public/content/translations/ja/ethereum-forks/index.md?collection=content_ja"
      ),
    "gaming/index.md": () =>
      import(
        "../public/content/translations/ja/gaming/index.md?collection=content_ja"
      ),
    "glossary/index.md": () =>
      import(
        "../public/content/translations/ja/glossary/index.md?collection=content_ja"
      ),
    "governance/index.md": () =>
      import(
        "../public/content/translations/ja/governance/index.md?collection=content_ja"
      ),
    "how-to-create-an-ethereum-account/index.md": () =>
      import(
        "../public/content/translations/ja/how-to-create-an-ethereum-account/index.md?collection=content_ja"
      ),
    "nft/index.md": () =>
      import(
        "../public/content/translations/ja/nft/index.md?collection=content_ja"
      ),
    "payments/index.md": () =>
      import(
        "../public/content/translations/ja/payments/index.md?collection=content_ja"
      ),
    "prediction-markets/index.md": () =>
      import(
        "../public/content/translations/ja/prediction-markets/index.md?collection=content_ja"
      ),
    "guides/index.md": () =>
      import(
        "../public/content/translations/ja/guides/index.md?collection=content_ja"
      ),
    "privacy/index.md": () =>
      import(
        "../public/content/translations/ja/privacy/index.md?collection=content_ja"
      ),
    "real-world-assets/index.md": () =>
      import(
        "../public/content/translations/ja/real-world-assets/index.md?collection=content_ja"
      ),
    "refi/index.md": () =>
      import(
        "../public/content/translations/ja/refi/index.md?collection=content_ja"
      ),
    "restaking/index.md": () =>
      import(
        "../public/content/translations/ja/restaking/index.md?collection=content_ja"
      ),
    "security/index.md": () =>
      import(
        "../public/content/translations/ja/security/index.md?collection=content_ja"
      ),
    "smart-contracts/index.md": () =>
      import(
        "../public/content/translations/ja/smart-contracts/index.md?collection=content_ja"
      ),
    "social-networks/index.md": () =>
      import(
        "../public/content/translations/ja/social-networks/index.md?collection=content_ja"
      ),
    "web3/index.md": () =>
      import(
        "../public/content/translations/ja/web3/index.md?collection=content_ja"
      ),
    "what-are-apps/index.md": () =>
      import(
        "../public/content/translations/ja/what-are-apps/index.md?collection=content_ja"
      ),
    "whitepaper/index.md": () =>
      import(
        "../public/content/translations/ja/whitepaper/index.md?collection=content_ja"
      ),
    "wrapped-eth/index.md": () =>
      import(
        "../public/content/translations/ja/wrapped-eth/index.md?collection=content_ja"
      ),
    "zero-knowledge-proofs/index.md": () =>
      import(
        "../public/content/translations/ja/zero-knowledge-proofs/index.md?collection=content_ja"
      ),
    "community/code-of-conduct/index.md": () =>
      import(
        "../public/content/translations/ja/community/code-of-conduct/index.md?collection=content_ja"
      ),
    "community/get-involved/index.md": () =>
      import(
        "../public/content/translations/ja/community/get-involved/index.md?collection=content_ja"
      ),
    "community/grants/index.md": () =>
      import(
        "../public/content/translations/ja/community/grants/index.md?collection=content_ja"
      ),
    "community/language-resources/index.md": () =>
      import(
        "../public/content/translations/ja/community/language-resources/index.md?collection=content_ja"
      ),
    "community/online/index.md": () =>
      import(
        "../public/content/translations/ja/community/online/index.md?collection=content_ja"
      ),
    "community/research/index.md": () =>
      import(
        "../public/content/translations/ja/community/research/index.md?collection=content_ja"
      ),
    "contributing/adding-desci-projects/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/adding-desci-projects/index.md?collection=content_ja"
      ),
    "contributing/adding-developer-tools/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/adding-developer-tools/index.md?collection=content_ja"
      ),
    "contributing/adding-exchanges/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/adding-exchanges/index.md?collection=content_ja"
      ),
    "contributing/adding-glossary-terms/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/adding-glossary-terms/index.md?collection=content_ja"
      ),
    "contributing/adding-layer-2s/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/adding-layer-2s/index.md?collection=content_ja"
      ),
    "contributing/adding-products/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/adding-products/index.md?collection=content_ja"
      ),
    "contributing/adding-resources/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/adding-resources/index.md?collection=content_ja"
      ),
    "contributing/adding-staking-products/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/adding-staking-products/index.md?collection=content_ja"
      ),
    "contributing/adding-videos/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/adding-videos/index.md?collection=content_ja"
      ),
    "contributing/adding-wallets/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/adding-wallets/index.md?collection=content_ja"
      ),
    "contributing/content-resources/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/content-resources/index.md?collection=content_ja"
      ),
    "contributing/design/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/design/index.md?collection=content_ja"
      ),
    "contributing/design-principles/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/design-principles/index.md?collection=content_ja"
      ),
    "contributing/quizzes/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/quizzes/index.md?collection=content_ja"
      ),
    "contributing/translation-program/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/translation-program/index.md?collection=content_ja"
      ),
    "developers/docs/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/index.md?collection=content_ja"
      ),
    "eth/supply/index.md": () =>
      import(
        "../public/content/translations/ja/eth/supply/index.md?collection=content_ja"
      ),
    "guides/how-to-create-an-ethereum-account/index.md": () =>
      import(
        "../public/content/translations/ja/guides/how-to-create-an-ethereum-account/index.md?collection=content_ja"
      ),
    "guides/how-to-revoke-token-access/index.md": () =>
      import(
        "../public/content/translations/ja/guides/how-to-revoke-token-access/index.md?collection=content_ja"
      ),
    "guides/how-to-id-scam-tokens/index.md": () =>
      import(
        "../public/content/translations/ja/guides/how-to-id-scam-tokens/index.md?collection=content_ja"
      ),
    "guides/how-to-swap-tokens/index.md": () =>
      import(
        "../public/content/translations/ja/guides/how-to-swap-tokens/index.md?collection=content_ja"
      ),
    "guides/how-to-use-a-bridge/index.md": () =>
      import(
        "../public/content/translations/ja/guides/how-to-use-a-bridge/index.md?collection=content_ja"
      ),
    "guides/how-to-use-a-wallet/index.md": () =>
      import(
        "../public/content/translations/ja/guides/how-to-use-a-wallet/index.md?collection=content_ja"
      ),
    "roadmap/account-abstraction/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/account-abstraction/index.md?collection=content_ja"
      ),
    "roadmap/beacon-chain/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/beacon-chain/index.md?collection=content_ja"
      ),
    "roadmap/danksharding/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/danksharding/index.md?collection=content_ja"
      ),
    "roadmap/dencun/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/dencun/index.md?collection=content_ja"
      ),
    "roadmap/fusaka/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/fusaka/index.md?collection=content_ja"
      ),
    "roadmap/future-proofing/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/future-proofing/index.md?collection=content_ja"
      ),
    "roadmap/glamsterdam/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/glamsterdam/index.md?collection=content_ja"
      ),
    "roadmap/merge/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/merge/index.md?collection=content_ja"
      ),
    "roadmap/pbs/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/pbs/index.md?collection=content_ja"
      ),
    "roadmap/pectra/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/pectra/index.md?collection=content_ja"
      ),
    "roadmap/scaling/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/scaling/index.md?collection=content_ja"
      ),
    "roadmap/secret-leader-election/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/secret-leader-election/index.md?collection=content_ja"
      ),
    "roadmap/security/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/security/index.md?collection=content_ja"
      ),
    "roadmap/statelessness/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/statelessness/index.md?collection=content_ja"
      ),
    "roadmap/single-slot-finality/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/single-slot-finality/index.md?collection=content_ja"
      ),
    "roadmap/user-experience/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/user-experience/index.md?collection=content_ja"
      ),
    "roadmap/verkle-trees/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/verkle-trees/index.md?collection=content_ja"
      ),
    "roadmap/zkevm/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/zkevm/index.md?collection=content_ja"
      ),
    "staking/dvt/index.md": () =>
      import(
        "../public/content/translations/ja/staking/dvt/index.md?collection=content_ja"
      ),
    "staking/pools/index.md": () =>
      import(
        "../public/content/translations/ja/staking/pools/index.md?collection=content_ja"
      ),
    "staking/saas/index.md": () =>
      import(
        "../public/content/translations/ja/staking/saas/index.md?collection=content_ja"
      ),
    "staking/solo/index.md": () =>
      import(
        "../public/content/translations/ja/staking/solo/index.md?collection=content_ja"
      ),
    "staking/withdrawals/index.md": () =>
      import(
        "../public/content/translations/ja/staking/withdrawals/index.md?collection=content_ja"
      ),
    "videos/ai-agents-interview-luna/index.md": () =>
      import(
        "../public/content/translations/ja/videos/ai-agents-interview-luna/index.md?collection=content_ja"
      ),
    "videos/atoms-institutions-blockchains-josh-stark/index.md": () =>
      import(
        "../public/content/translations/ja/videos/atoms-institutions-blockchains-josh-stark/index.md?collection=content_ja"
      ),
    "videos/blobspace-101-dencun/index.md": () =>
      import(
        "../public/content/translations/ja/videos/blobspace-101-dencun/index.md?collection=content_ja"
      ),
    "videos/blockchain-101-visual-demo/index.md": () =>
      import(
        "../public/content/translations/ja/videos/blockchain-101-visual-demo/index.md?collection=content_ja"
      ),
    "videos/blockchain-eth-build/index.md": () =>
      import(
        "../public/content/translations/ja/videos/blockchain-eth-build/index.md?collection=content_ja"
      ),
    "videos/crypto-apps-desocial-linda-xie/index.md": () =>
      import(
        "../public/content/translations/ja/videos/crypto-apps-desocial-linda-xie/index.md?collection=content_ja"
      ),
    "videos/crypto-security-passwords/index.md": () =>
      import(
        "../public/content/translations/ja/videos/crypto-security-passwords/index.md?collection=content_ja"
      ),
    "videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md": () =>
      import(
        "../public/content/translations/ja/videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md?collection=content_ja"
      ),
    "videos/dao-build-next-great-city/index.md": () =>
      import(
        "../public/content/translations/ja/videos/dao-build-next-great-city/index.md?collection=content_ja"
      ),
    "videos/dao-hack-ethereum-classic/index.md": () =>
      import(
        "../public/content/translations/ja/videos/dao-hack-ethereum-classic/index.md?collection=content_ja"
      ),
    "videos/decentralized-identity-explained/index.md": () =>
      import(
        "../public/content/translations/ja/videos/decentralized-identity-explained/index.md?collection=content_ja"
      ),
    "videos/defi-future-of-finance/index.md": () =>
      import(
        "../public/content/translations/ja/videos/defi-future-of-finance/index.md?collection=content_ja"
      ),
    "videos/decentralized-social-media/index.md": () =>
      import(
        "../public/content/translations/ja/videos/decentralized-social-media/index.md?collection=content_ja"
      ),
    "videos/defi-history-inception-to-2021/index.md": () =>
      import(
        "../public/content/translations/ja/videos/defi-history-inception-to-2021/index.md?collection=content_ja"
      ),
    "videos/desci-movement-juan-benet/index.md": () =>
      import(
        "../public/content/translations/ja/videos/desci-movement-juan-benet/index.md?collection=content_ja"
      ),
    "videos/devcon-mumbai-coming-2026/index.md": () =>
      import(
        "../public/content/translations/ja/videos/devcon-mumbai-coming-2026/index.md?collection=content_ja"
      ),
    "videos/devconnect-argentina-2025-recap/index.md": () =>
      import(
        "../public/content/translations/ja/videos/devconnect-argentina-2025-recap/index.md?collection=content_ja"
      ),
    "videos/devconnect-buenos-aires-promo/index.md": () =>
      import(
        "../public/content/translations/ja/videos/devconnect-buenos-aires-promo/index.md?collection=content_ja"
      ),
    "videos/eigenlayer-permissionless-features/index.md": () =>
      import(
        "../public/content/translations/ja/videos/eigenlayer-permissionless-features/index.md?collection=content_ja"
      ),
    "videos/eip-4844-dencun-explained/index.md": () =>
      import(
        "../public/content/translations/ja/videos/eip-4844-dencun-explained/index.md?collection=content_ja"
      ),
    "videos/ethereum-basics-intro/index.md": () =>
      import(
        "../public/content/translations/ja/videos/ethereum-basics-intro/index.md?collection=content_ja"
      ),
    "videos/ethereum-core-governance-explained/index.md": () =>
      import(
        "../public/content/translations/ja/videos/ethereum-core-governance-explained/index.md?collection=content_ja"
      ),
    "videos/ethereum-evolution-glamsterdam/index.md": () =>
      import(
        "../public/content/translations/ja/videos/ethereum-evolution-glamsterdam/index.md?collection=content_ja"
      ),
    "videos/ethereum-in-30-minutes-vitalik-buterin/index.md": () =>
      import(
        "../public/content/translations/ja/videos/ethereum-in-30-minutes-vitalik-buterin/index.md?collection=content_ja"
      ),
    "videos/ethereum-institutional-privacy-panel/index.md": () =>
      import(
        "../public/content/translations/ja/videos/ethereum-institutional-privacy-panel/index.md?collection=content_ja"
      ),
    "videos/ethereum-localism-global-protocols-local-power/index.md": () =>
      import(
        "../public/content/translations/ja/videos/ethereum-localism-global-protocols-local-power/index.md?collection=content_ja"
      ),
    "videos/ethereum-staking-withdrawals/index.md": () =>
      import(
        "../public/content/translations/ja/videos/ethereum-staking-withdrawals/index.md?collection=content_ja"
      ),
    "videos/ethereum-things-i-like-mariano-conti/index.md": () =>
      import(
        "../public/content/translations/ja/videos/ethereum-things-i-like-mariano-conti/index.md?collection=content_ja"
      ),
    "videos/ethereums-quantum-plan-justin-drake/index.md": () =>
      import(
        "../public/content/translations/ja/videos/ethereums-quantum-plan-justin-drake/index.md?collection=content_ja"
      ),
    "videos/fusaka-upgrade-explained/index.md": () =>
      import(
        "../public/content/translations/ja/videos/fusaka-upgrade-explained/index.md?collection=content_ja"
      ),
    "videos/hash-function-eth-build/index.md": () =>
      import(
        "../public/content/translations/ja/videos/hash-function-eth-build/index.md?collection=content_ja"
      ),
    "videos/how-to-be-cypherpunk-juan-benet/index.md": () =>
      import(
        "../public/content/translations/ja/videos/how-to-be-cypherpunk-juan-benet/index.md?collection=content_ja"
      ),
    "videos/how-to-make-a-guerilla-l2/index.md": () =>
      import(
        "../public/content/translations/ja/videos/how-to-make-a-guerilla-l2/index.md?collection=content_ja"
      ),
    "videos/key-pair-eth-build/index.md": () =>
      import(
        "../public/content/translations/ja/videos/key-pair-eth-build/index.md?collection=content_ja"
      ),
    "videos/learn-nfts-and-defi/index.md": () =>
      import(
        "../public/content/translations/ja/videos/learn-nfts-and-defi/index.md?collection=content_ja"
      ),
    "videos/layer-2-scaling-explained/index.md": () =>
      import(
        "../public/content/translations/ja/videos/layer-2-scaling-explained/index.md?collection=content_ja"
      ),
    "videos/next-10-years-of-ethereum/index.md": () =>
      import(
        "../public/content/translations/ja/videos/next-10-years-of-ethereum/index.md?collection=content_ja"
      ),
    "videos/pectra-upgrade-overview/index.md": () =>
      import(
        "../public/content/translations/ja/videos/pectra-upgrade-overview/index.md?collection=content_ja"
      ),
    "videos/pectra-what-stakers-need-to-know/index.md": () =>
      import(
        "../public/content/translations/ja/videos/pectra-what-stakers-need-to-know/index.md?collection=content_ja"
      ),
    "videos/pos-reorgs-attack-defense/index.md": () =>
      import(
        "../public/content/translations/ja/videos/pos-reorgs-attack-defense/index.md?collection=content_ja"
      ),
    "videos/post-quantum-security-ethereum-roadmap/index.md": () =>
      import(
        "../public/content/translations/ja/videos/post-quantum-security-ethereum-roadmap/index.md?collection=content_ja"
      ),
    "videos/pow-vs-pos/index.md": () =>
      import(
        "../public/content/translations/ja/videos/pow-vs-pos/index.md?collection=content_ja"
      ),
    "videos/privacy-is-existential/index.md": () =>
      import(
        "../public/content/translations/ja/videos/privacy-is-existential/index.md?collection=content_ja"
      ),
    "videos/proof-of-authority-explained/index.md": () =>
      import(
        "../public/content/translations/ja/videos/proof-of-authority-explained/index.md?collection=content_ja"
      ),
    "videos/proof-of-work-explained/index.md": () =>
      import(
        "../public/content/translations/ja/videos/proof-of-work-explained/index.md?collection=content_ja"
      ),
    "videos/proposer-builder-separation/index.md": () =>
      import(
        "../public/content/translations/ja/videos/proposer-builder-separation/index.md?collection=content_ja"
      ),
    "videos/real-state-of-l2s-bartek-kiepuszewski/index.md": () =>
      import(
        "../public/content/translations/ja/videos/real-state-of-l2s-bartek-kiepuszewski/index.md?collection=content_ja"
      ),
    "videos/regenerative-finance-refi/index.md": () =>
      import(
        "../public/content/translations/ja/videos/regenerative-finance-refi/index.md?collection=content_ja"
      ),
    "videos/restaking-explained/index.md": () =>
      import(
        "../public/content/translations/ja/videos/restaking-explained/index.md?collection=content_ja"
      ),
    "videos/rollups-scaling-strategy/index.md": () =>
      import(
        "../public/content/translations/ja/videos/rollups-scaling-strategy/index.md?collection=content_ja"
      ),
    "videos/security-through-obscurity-microdots/index.md": () =>
      import(
        "../public/content/translations/ja/videos/security-through-obscurity-microdots/index.md?collection=content_ja"
      ),
    "videos/smart-contracts-code-is-law/index.md": () =>
      import(
        "../public/content/translations/ja/videos/smart-contracts-code-is-law/index.md?collection=content_ja"
      ),
    "videos/stani-kulechov-building-aave/index.md": () =>
      import(
        "../public/content/translations/ja/videos/stani-kulechov-building-aave/index.md?collection=content_ja"
      ),
    "videos/surveillance-silence-reclaiming-privacy/index.md": () =>
      import(
        "../public/content/translations/ja/videos/surveillance-silence-reclaiming-privacy/index.md?collection=content_ja"
      ),
    "videos/transactions-eth-build/index.md": () =>
      import(
        "../public/content/translations/ja/videos/transactions-eth-build/index.md?collection=content_ja"
      ),
    "videos/understanding-consensus-mechanisms/index.md": () =>
      import(
        "../public/content/translations/ja/videos/understanding-consensus-mechanisms/index.md?collection=content_ja"
      ),
    "videos/what-is-a-dapp/index.md": () =>
      import(
        "../public/content/translations/ja/videos/what-is-a-dapp/index.md?collection=content_ja"
      ),
    "videos/zero-knowledge-proofs-5-levels/index.md": () =>
      import(
        "../public/content/translations/ja/videos/zero-knowledge-proofs-5-levels/index.md?collection=content_ja"
      ),
    "community/events/organizing/index.md": () =>
      import(
        "../public/content/translations/ja/community/events/organizing/index.md?collection=content_ja"
      ),
    "community/support/faq/index.md": () =>
      import(
        "../public/content/translations/ja/community/support/faq/index.md?collection=content_ja"
      ),
    "community/support/scams/index.md": () =>
      import(
        "../public/content/translations/ja/community/support/scams/index.md?collection=content_ja"
      ),
    "community/support/misconceptions/index.md": () =>
      import(
        "../public/content/translations/ja/community/support/misconceptions/index.md?collection=content_ja"
      ),
    "contributing/design/adding-design-resources/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/design/adding-design-resources/index.md?collection=content_ja"
      ),
    "contributing/translation-program/faq/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/translation-program/faq/index.md?collection=content_ja"
      ),
    "contributing/translation-program/how-to-translate/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/translation-program/how-to-translate/index.md?collection=content_ja"
      ),
    "contributing/translation-program/mission-and-vision/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/translation-program/mission-and-vision/index.md?collection=content_ja"
      ),
    "contributing/translation-program/playbook/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/translation-program/playbook/index.md?collection=content_ja"
      ),
    "contributing/translation-program/resources/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/translation-program/resources/index.md?collection=content_ja"
      ),
    "contributing/translation-program/translatathon/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/translation-program/translatathon/index.md?collection=content_ja"
      ),
    "contributing/translation-program/translators-guide/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/translation-program/translators-guide/index.md?collection=content_ja"
      ),
    "developers/docs/accounts/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/accounts/index.md?collection=content_ja"
      ),
    "developers/docs/blocks/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/blocks/index.md?collection=content_ja"
      ),
    "developers/docs/bridges/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/bridges/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/index.md?collection=content_ja"
      ),
    "developers/docs/data-and-analytics/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/data-and-analytics/index.md?collection=content_ja"
      ),
    "developers/docs/data-availability/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/data-availability/index.md?collection=content_ja"
      ),
    "developers/docs/dapps/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/dapps/index.md?collection=content_ja"
      ),
    "developers/docs/data-structures-and-encoding/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/data-structures-and-encoding/index.md?collection=content_ja"
      ),
    "developers/docs/design-and-ux/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/design-and-ux/index.md?collection=content_ja"
      ),
    "developers/docs/development-networks/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/development-networks/index.md?collection=content_ja"
      ),
    "developers/docs/ethereum-stack/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/ethereum-stack/index.md?collection=content_ja"
      ),
    "developers/docs/evm/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/evm/index.md?collection=content_ja"
      ),
    "developers/docs/frameworks/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/frameworks/index.md?collection=content_ja"
      ),
    "developers/docs/gas/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/gas/index.md?collection=content_ja"
      ),
    "developers/docs/ides/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/ides/index.md?collection=content_ja"
      ),
    "developers/docs/intro-to-ether/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/intro-to-ether/index.md?collection=content_ja"
      ),
    "developers/docs/intro-to-ethereum/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/intro-to-ethereum/index.md?collection=content_ja"
      ),
    "developers/docs/mev/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/mev/index.md?collection=content_ja"
      ),
    "developers/docs/networking-layer/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/networking-layer/index.md?collection=content_ja"
      ),
    "developers/docs/networks/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/networks/index.md?collection=content_ja"
      ),
    "developers/docs/nodes-and-clients/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/nodes-and-clients/index.md?collection=content_ja"
      ),
    "developers/docs/oracles/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/oracles/index.md?collection=content_ja"
      ),
    "developers/docs/scaling/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/scaling/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/index.md?collection=content_ja"
      ),
    "developers/docs/standards/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/standards/index.md?collection=content_ja"
      ),
    "developers/docs/storage/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/storage/index.md?collection=content_ja"
      ),
    "developers/docs/transactions/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/transactions/index.md?collection=content_ja"
      ),
    "developers/docs/web2-vs-web3/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/web2-vs-web3/index.md?collection=content_ja"
      ),
    "developers/docs/wrapped-eth/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/wrapped-eth/index.md?collection=content_ja"
      ),
    "developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md?collection=content_ja"
        ),
    "developers/tutorials/ai-trading-agent/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/ai-trading-agent/index.md?collection=content_ja"
      ),
    "developers/tutorials/all-you-can-cache/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/all-you-can-cache/index.md?collection=content_ja"
      ),
    "developers/tutorials/app-plasma/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/app-plasma/index.md?collection=content_ja"
      ),
    "developers/tutorials/calling-a-smart-contract-from-javascript/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/calling-a-smart-contract-from-javascript/index.md?collection=content_ja"
        ),
    "developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md?collection=content_ja"
      ),
    "developers/tutorials/deploying-your-first-smart-contract/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/deploying-your-first-smart-contract/index.md?collection=content_ja"
      ),
    "developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md?collection=content_ja"
        ),
    "developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md?collection=content_ja"
        ),
    "developers/tutorials/eip-1271-smart-contract-signatures/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/eip-1271-smart-contract-signatures/index.md?collection=content_ja"
      ),
    "developers/tutorials/erc-721-vyper-annotated-code/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/erc-721-vyper-annotated-code/index.md?collection=content_ja"
      ),
    "developers/tutorials/erc20-annotated-code/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/erc20-annotated-code/index.md?collection=content_ja"
      ),
    "developers/tutorials/erc20-with-safety-rails/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/erc20-with-safety-rails/index.md?collection=content_ja"
      ),
    "developers/tutorials/ethereum-for-web2-auth/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/ethereum-for-web2-auth/index.md?collection=content_ja"
      ),
    "developers/tutorials/gasless/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/gasless/index.md?collection=content_ja"
      ),
    "developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md?collection=content_ja"
        ),
    "developers/tutorials/guide-to-smart-contract-security-tools/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/guide-to-smart-contract-security-tools/index.md?collection=content_ja"
        ),
    "developers/tutorials/hello-world-smart-contract/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/hello-world-smart-contract/index.md?collection=content_ja"
      ),
    "developers/tutorials/hello-world-smart-contract-fullstack/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/hello-world-smart-contract-fullstack/index.md?collection=content_ja"
      ),
    "developers/tutorials/how-to-implement-an-erc721-market/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/how-to-implement-an-erc721-market/index.md?collection=content_ja"
      ),
    "developers/tutorials/how-to-mint-an-nft/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/how-to-mint-an-nft/index.md?collection=content_ja"
      ),
    "developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md?collection=content_ja"
        ),
    "developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md?collection=content_ja"
        ),
    "developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md?collection=content_ja"
        ),
    "developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md?collection=content_ja"
        ),
    "developers/tutorials/how-to-use-tellor-as-your-oracle/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/how-to-use-tellor-as-your-oracle/index.md?collection=content_ja"
      ),
    "developers/tutorials/how-to-view-nft-in-metamask/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/how-to-view-nft-in-metamask/index.md?collection=content_ja"
      ),
    "developers/tutorials/how-to-write-and-deploy-an-nft/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/how-to-write-and-deploy-an-nft/index.md?collection=content_ja"
      ),
    "developers/tutorials/interact-with-other-contracts-from-solidity/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/interact-with-other-contracts-from-solidity/index.md?collection=content_ja"
        ),
    "developers/tutorials/ipfs-decentralized-ui/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/ipfs-decentralized-ui/index.md?collection=content_ja"
      ),
    "developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md?collection=content_ja"
        ),
    "developers/tutorials/kickstart-your-dapp-frontend-development-wth-create-eth-app/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/kickstart-your-dapp-frontend-development-wth-create-eth-app/index.md?collection=content_ja"
        ),
    "developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md?collection=content_ja"
        ),
    "developers/tutorials/logging-events-smart-contracts/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/logging-events-smart-contracts/index.md?collection=content_ja"
      ),
    "developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md?collection=content_ja"
        ),
    "developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md?collection=content_ja"
        ),
    "developers/tutorials/nft-minter/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/nft-minter/index.md?collection=content_ja"
      ),
    "developers/tutorials/optimism-std-bridge-annotated-code/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/optimism-std-bridge-annotated-code/index.md?collection=content_ja"
      ),
    "developers/tutorials/reverse-engineering-a-contract/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/reverse-engineering-a-contract/index.md?collection=content_ja"
      ),
    "developers/tutorials/run-node-raspberry-pi/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/run-node-raspberry-pi/index.md?collection=content_ja"
      ),
    "developers/tutorials/scam-token-tricks/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/scam-token-tricks/index.md?collection=content_ja"
      ),
    "developers/tutorials/secret-state/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/secret-state/index.md?collection=content_ja"
      ),
    "developers/tutorials/secure-development-workflow/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/secure-development-workflow/index.md?collection=content_ja"
      ),
    "developers/tutorials/send-token-etherjs/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/send-token-etherjs/index.md?collection=content_ja"
      ),
    "developers/tutorials/send-token-ethersjs/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/send-token-ethersjs/index.md?collection=content_ja"
      ),
    "developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md?collection=content_ja"
        ),
    "developers/tutorials/server-components/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/server-components/index.md?collection=content_ja"
      ),
    "developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md?collection=content_ja"
        ),
    "developers/tutorials/short-abi/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/short-abi/index.md?collection=content_ja"
      ),
    "developers/tutorials/smart-contract-security-guidelines/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/smart-contract-security-guidelines/index.md?collection=content_ja"
      ),
    "developers/tutorials/stealth-addr/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/stealth-addr/index.md?collection=content_ja"
      ),
    "developers/tutorials/testing-smart-contract-with-waffle/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/testing-smart-contract-with-waffle/index.md?collection=content_ja"
      ),
    "developers/tutorials/the-graph-fixing-web3-data-querying/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/the-graph-fixing-web3-data-querying/index.md?collection=content_ja"
      ),
    "developers/tutorials/token-integration-checklist/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/token-integration-checklist/index.md?collection=content_ja"
      ),
    "developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md?collection=content_ja"
        ),
    "developers/tutorials/understand-the-erc-20-token-smart-contract/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/tutorials/understand-the-erc-20-token-smart-contract/index.md?collection=content_ja"
        ),
    "developers/tutorials/uniswap-v2-annotated-code/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/uniswap-v2-annotated-code/index.md?collection=content_ja"
      ),
    "developers/tutorials/using-websockets/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/using-websockets/index.md?collection=content_ja"
      ),
    "developers/tutorials/yellow-paper-evm/index.md": () =>
      import(
        "../public/content/translations/ja/developers/tutorials/yellow-paper-evm/index.md?collection=content_ja"
      ),
    "roadmap/fusaka/peerdas/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/fusaka/peerdas/index.md?collection=content_ja"
      ),
    "roadmap/future-proofing/quantum-resistance/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/future-proofing/quantum-resistance/index.md?collection=content_ja"
      ),
    "roadmap/merge/issuance/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/merge/issuance/index.md?collection=content_ja"
      ),
    "roadmap/pectra/7702/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/pectra/7702/index.md?collection=content_ja"
      ),
    "roadmap/pectra/maxeb/index.md": () =>
      import(
        "../public/content/translations/ja/roadmap/pectra/maxeb/index.md?collection=content_ja"
      ),
    "contributing/translation-program/translatathon/details/index.md": () =>
      import(
        "../public/content/translations/ja/contributing/translation-program/translatathon/details/index.md?collection=content_ja"
      ),
    "developers/docs/apis/javascript/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/apis/javascript/index.md?collection=content_ja"
      ),
    "developers/docs/apis/backend/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/apis/backend/index.md?collection=content_ja"
      ),
    "developers/docs/apis/json-rpc/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/apis/json-rpc/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/poa/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/poa/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pow/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/pow/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pos/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/index.md?collection=content_ja"
      ),
    "developers/docs/data-and-analytics/block-explorers/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/data-and-analytics/block-explorers/index.md?collection=content_ja"
      ),
    "developers/docs/data-availability/blockchain-data-storage-strategies/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/docs/data-availability/blockchain-data-storage-strategies/index.md?collection=content_ja"
        ),
    "developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md?collection=content_ja"
        ),
    "developers/docs/data-structures-and-encoding/rlp/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/data-structures-and-encoding/rlp/index.md?collection=content_ja"
      ),
    "developers/docs/data-structures-and-encoding/ssz/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/data-structures-and-encoding/ssz/index.md?collection=content_ja"
      ),
    "developers/docs/data-structures-and-encoding/web3-secret-storage/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/docs/data-structures-and-encoding/web3-secret-storage/index.md?collection=content_ja"
        ),
    "developers/docs/data-structures-and-encoding/web3-secret-storage-definition/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/docs/data-structures-and-encoding/web3-secret-storage-definition/index.md?collection=content_ja"
        ),
    "developers/docs/design-and-ux/dex-design-best-practice/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/design-and-ux/dex-design-best-practice/index.md?collection=content_ja"
      ),
    "developers/docs/design-and-ux/heuristics-for-web3/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/design-and-ux/heuristics-for-web3/index.md?collection=content_ja"
      ),
    "developers/docs/evm/opcodes/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/evm/opcodes/index.md?collection=content_ja"
      ),
    "developers/docs/networking-layer/portal-network/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/networking-layer/portal-network/index.md?collection=content_ja"
      ),
    "developers/docs/networking-layer/network-addresses/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/networking-layer/network-addresses/index.md?collection=content_ja"
      ),
    "developers/docs/nodes-and-clients/bootnodes/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/nodes-and-clients/bootnodes/index.md?collection=content_ja"
      ),
    "developers/docs/nodes-and-clients/archive-nodes/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/nodes-and-clients/archive-nodes/index.md?collection=content_ja"
      ),
    "developers/docs/nodes-and-clients/client-diversity/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/nodes-and-clients/client-diversity/index.md?collection=content_ja"
      ),
    "developers/docs/nodes-and-clients/light-clients/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/nodes-and-clients/light-clients/index.md?collection=content_ja"
      ),
    "developers/docs/nodes-and-clients/node-architecture/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/nodes-and-clients/node-architecture/index.md?collection=content_ja"
      ),
    "developers/docs/nodes-and-clients/nodes-as-a-service/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/nodes-and-clients/nodes-as-a-service/index.md?collection=content_ja"
      ),
    "developers/docs/nodes-and-clients/run-a-node/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/nodes-and-clients/run-a-node/index.md?collection=content_ja"
      ),
    "developers/docs/scaling/optimistic-rollups/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/scaling/optimistic-rollups/index.md?collection=content_ja"
      ),
    "developers/docs/scaling/plasma/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/scaling/plasma/index.md?collection=content_ja"
      ),
    "developers/docs/scaling/sidechains/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/scaling/sidechains/index.md?collection=content_ja"
      ),
    "developers/docs/scaling/state-channels/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/scaling/state-channels/index.md?collection=content_ja"
      ),
    "developers/docs/scaling/validium/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/scaling/validium/index.md?collection=content_ja"
      ),
    "developers/docs/scaling/zk-rollups/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/scaling/zk-rollups/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/dart/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/dart/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/delphi/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/delphi/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/dot-net/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/dot-net/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/elixir/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/elixir/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/golang/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/golang/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/java/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/java/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/javascript/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/javascript/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/python/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/python/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/ruby/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/ruby/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/anatomy/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/anatomy/index.md?collection=content_ja"
      ),
    "developers/docs/programming-languages/rust/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/programming-languages/rust/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/compiling/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/compiling/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/composability/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/composability/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/deploying/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/deploying/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/languages/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/languages/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/formal-verification/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/formal-verification/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/libraries/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/libraries/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/naming/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/naming/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/security/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/security/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/testing/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/testing/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/upgrading/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/upgrading/index.md?collection=content_ja"
      ),
    "developers/docs/smart-contracts/verifying/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/smart-contracts/verifying/index.md?collection=content_ja"
      ),
    "developers/docs/standards/tokens/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/standards/tokens/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/pow/mining/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md?collection=content_ja"
        ),
    "developers/docs/consensus-mechanisms/pos/attestations/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/attestations/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pos/block-proposal/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/block-proposal/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pos/faqs/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/faqs/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pos/gasper/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/gasper/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pos/keys/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/keys/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md?collection=content_ja"
        ),
    "developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md?collection=content_ja"
        ),
    "developers/docs/standards/tokens/erc-1155/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/standards/tokens/erc-1155/index.md?collection=content_ja"
      ),
    "developers/docs/standards/tokens/erc-1363/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/standards/tokens/erc-1363/index.md?collection=content_ja"
      ),
    "developers/docs/standards/tokens/erc-20/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/standards/tokens/erc-20/index.md?collection=content_ja"
      ),
    "developers/docs/standards/tokens/erc-223/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/standards/tokens/erc-223/index.md?collection=content_ja"
      ),
    "developers/docs/standards/tokens/erc-4626/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/standards/tokens/erc-4626/index.md?collection=content_ja"
      ),
    "developers/docs/standards/tokens/erc-721/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/standards/tokens/erc-721/index.md?collection=content_ja"
      ),
    "developers/docs/standards/tokens/erc-777/index.md": () =>
      import(
        "../public/content/translations/ja/developers/docs/standards/tokens/erc-777/index.md?collection=content_ja"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md?collection=content_ja"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md?collection=content_ja"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md":
      () =>
        import(
          "../public/content/translations/ja/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md?collection=content_ja"
        ),
  }),
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
  content_zh: create.doc("content_zh", {
    "about/index.md": () =>
      import(
        "../public/content/translations/zh/about/index.md?collection=content_zh"
      ),
    "ai-agents/index.md": () =>
      import(
        "../public/content/translations/zh/ai-agents/index.md?collection=content_zh"
      ),
    "beacon-chain/index.md": () =>
      import(
        "../public/content/translations/zh/beacon-chain/index.md?collection=content_zh"
      ),
    "account-abstraction/index.md": () =>
      import(
        "../public/content/translations/zh/account-abstraction/index.md?collection=content_zh"
      ),
    "danksharding/index.md": () =>
      import(
        "../public/content/translations/zh/danksharding/index.md?collection=content_zh"
      ),
    "contributing/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/index.md?collection=content_zh"
      ),
    "dao/index.md": () =>
      import(
        "../public/content/translations/zh/dao/index.md?collection=content_zh"
      ),
    "defi/index.md": () =>
      import(
        "../public/content/translations/zh/defi/index.md?collection=content_zh"
      ),
    "decentralized-identity/index.md": () =>
      import(
        "../public/content/translations/zh/decentralized-identity/index.md?collection=content_zh"
      ),
    "desci/index.md": () =>
      import(
        "../public/content/translations/zh/desci/index.md?collection=content_zh"
      ),
    "bridges/index.md": () =>
      import(
        "../public/content/translations/zh/bridges/index.md?collection=content_zh"
      ),
    "dvt/index.md": () =>
      import(
        "../public/content/translations/zh/dvt/index.md?collection=content_zh"
      ),
    "eips/index.md": () =>
      import(
        "../public/content/translations/zh/eips/index.md?collection=content_zh"
      ),
    "energy-consumption/index.md": () =>
      import(
        "../public/content/translations/zh/energy-consumption/index.md?collection=content_zh"
      ),
    "ethereum-forks/index.md": () =>
      import(
        "../public/content/translations/zh/ethereum-forks/index.md?collection=content_zh"
      ),
    "future-proofing/index.md": () =>
      import(
        "../public/content/translations/zh/future-proofing/index.md?collection=content_zh"
      ),
    "foundation/index.md": () =>
      import(
        "../public/content/translations/zh/foundation/index.md?collection=content_zh"
      ),
    "governance/index.md": () =>
      import(
        "../public/content/translations/zh/governance/index.md?collection=content_zh"
      ),
    "gaming/index.md": () =>
      import(
        "../public/content/translations/zh/gaming/index.md?collection=content_zh"
      ),
    "glossary/index.md": () =>
      import(
        "../public/content/translations/zh/glossary/index.md?collection=content_zh"
      ),
    "how-to-create-an-ethereum-account/index.md": () =>
      import(
        "../public/content/translations/zh/how-to-create-an-ethereum-account/index.md?collection=content_zh"
      ),
    "guides/index.md": () =>
      import(
        "../public/content/translations/zh/guides/index.md?collection=content_zh"
      ),
    "payments/index.md": () =>
      import(
        "../public/content/translations/zh/payments/index.md?collection=content_zh"
      ),
    "nft/index.md": () =>
      import(
        "../public/content/translations/zh/nft/index.md?collection=content_zh"
      ),
    "prediction-markets/index.md": () =>
      import(
        "../public/content/translations/zh/prediction-markets/index.md?collection=content_zh"
      ),
    "privacy/index.md": () =>
      import(
        "../public/content/translations/zh/privacy/index.md?collection=content_zh"
      ),
    "restaking/index.md": () =>
      import(
        "../public/content/translations/zh/restaking/index.md?collection=content_zh"
      ),
    "real-world-assets/index.md": () =>
      import(
        "../public/content/translations/zh/real-world-assets/index.md?collection=content_zh"
      ),
    "refi/index.md": () =>
      import(
        "../public/content/translations/zh/refi/index.md?collection=content_zh"
      ),
    "scaling/index.md": () =>
      import(
        "../public/content/translations/zh/scaling/index.md?collection=content_zh"
      ),
    "smart-contracts/index.md": () =>
      import(
        "../public/content/translations/zh/smart-contracts/index.md?collection=content_zh"
      ),
    "security/index.md": () =>
      import(
        "../public/content/translations/zh/security/index.md?collection=content_zh"
      ),
    "social-networks/index.md": () =>
      import(
        "../public/content/translations/zh/social-networks/index.md?collection=content_zh"
      ),
    "user-experience/index.md": () =>
      import(
        "../public/content/translations/zh/user-experience/index.md?collection=content_zh"
      ),
    "statelessness/index.md": () =>
      import(
        "../public/content/translations/zh/statelessness/index.md?collection=content_zh"
      ),
    "support/index.md": () =>
      import(
        "../public/content/translations/zh/support/index.md?collection=content_zh"
      ),
    "whitepaper/index.md": () =>
      import(
        "../public/content/translations/zh/whitepaper/index.md?collection=content_zh"
      ),
    "what-are-apps/index.md": () =>
      import(
        "../public/content/translations/zh/what-are-apps/index.md?collection=content_zh"
      ),
    "web3/index.md": () =>
      import(
        "../public/content/translations/zh/web3/index.md?collection=content_zh"
      ),
    "wrapped-eth/index.md": () =>
      import(
        "../public/content/translations/zh/wrapped-eth/index.md?collection=content_zh"
      ),
    "zero-knowledge-proofs/index.md": () =>
      import(
        "../public/content/translations/zh/zero-knowledge-proofs/index.md?collection=content_zh"
      ),
    "contributing/adding-desci-projects/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/adding-desci-projects/index.md?collection=content_zh"
      ),
    "contributing/adding-developer-tools/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/adding-developer-tools/index.md?collection=content_zh"
      ),
    "contributing/adding-exchanges/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/adding-exchanges/index.md?collection=content_zh"
      ),
    "contributing/adding-glossary-terms/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/adding-glossary-terms/index.md?collection=content_zh"
      ),
    "contributing/adding-layer-2s/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/adding-layer-2s/index.md?collection=content_zh"
      ),
    "contributing/adding-products/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/adding-products/index.md?collection=content_zh"
      ),
    "contributing/adding-resources/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/adding-resources/index.md?collection=content_zh"
      ),
    "contributing/adding-staking-products/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/adding-staking-products/index.md?collection=content_zh"
      ),
    "contributing/adding-videos/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/adding-videos/index.md?collection=content_zh"
      ),
    "contributing/adding-wallets/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/adding-wallets/index.md?collection=content_zh"
      ),
    "contributing/content-resources/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/content-resources/index.md?collection=content_zh"
      ),
    "contributing/design/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/design/index.md?collection=content_zh"
      ),
    "contributing/design-principles/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/design-principles/index.md?collection=content_zh"
      ),
    "contributing/quizzes/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/quizzes/index.md?collection=content_zh"
      ),
    "contributing/translation-program/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/translation-program/index.md?collection=content_zh"
      ),
    "developers/docs/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/index.md?collection=content_zh"
      ),
    "community/get-involved/index.md": () =>
      import(
        "../public/content/translations/zh/community/get-involved/index.md?collection=content_zh"
      ),
    "community/code-of-conduct/index.md": () =>
      import(
        "../public/content/translations/zh/community/code-of-conduct/index.md?collection=content_zh"
      ),
    "community/grants/index.md": () =>
      import(
        "../public/content/translations/zh/community/grants/index.md?collection=content_zh"
      ),
    "community/language-resources/index.md": () =>
      import(
        "../public/content/translations/zh/community/language-resources/index.md?collection=content_zh"
      ),
    "community/online/index.md": () =>
      import(
        "../public/content/translations/zh/community/online/index.md?collection=content_zh"
      ),
    "community/research/index.md": () =>
      import(
        "../public/content/translations/zh/community/research/index.md?collection=content_zh"
      ),
    "eth/supply/index.md": () =>
      import(
        "../public/content/translations/zh/eth/supply/index.md?collection=content_zh"
      ),
    "guides/how-to-create-an-ethereum-account/index.md": () =>
      import(
        "../public/content/translations/zh/guides/how-to-create-an-ethereum-account/index.md?collection=content_zh"
      ),
    "guides/how-to-id-scam-tokens/index.md": () =>
      import(
        "../public/content/translations/zh/guides/how-to-id-scam-tokens/index.md?collection=content_zh"
      ),
    "guides/how-to-register-an-ethereum-account/index.md": () =>
      import(
        "../public/content/translations/zh/guides/how-to-register-an-ethereum-account/index.md?collection=content_zh"
      ),
    "guides/how-to-revoke-token-access/index.md": () =>
      import(
        "../public/content/translations/zh/guides/how-to-revoke-token-access/index.md?collection=content_zh"
      ),
    "guides/how-to-swap-tokens/index.md": () =>
      import(
        "../public/content/translations/zh/guides/how-to-swap-tokens/index.md?collection=content_zh"
      ),
    "guides/how-to-use-a-bridge/index.md": () =>
      import(
        "../public/content/translations/zh/guides/how-to-use-a-bridge/index.md?collection=content_zh"
      ),
    "guides/how-to-use-a-wallet/index.md": () =>
      import(
        "../public/content/translations/zh/guides/how-to-use-a-wallet/index.md?collection=content_zh"
      ),
    "roadmap/account-abstraction/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/account-abstraction/index.md?collection=content_zh"
      ),
    "roadmap/beacon-chain/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/beacon-chain/index.md?collection=content_zh"
      ),
    "roadmap/danksharding/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/danksharding/index.md?collection=content_zh"
      ),
    "roadmap/dencun/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/dencun/index.md?collection=content_zh"
      ),
    "roadmap/fusaka/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/fusaka/index.md?collection=content_zh"
      ),
    "roadmap/future-proofing/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/future-proofing/index.md?collection=content_zh"
      ),
    "roadmap/glamsterdam/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/glamsterdam/index.md?collection=content_zh"
      ),
    "roadmap/merge/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/merge/index.md?collection=content_zh"
      ),
    "roadmap/pbs/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/pbs/index.md?collection=content_zh"
      ),
    "roadmap/pectra/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/pectra/index.md?collection=content_zh"
      ),
    "roadmap/scaling/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/scaling/index.md?collection=content_zh"
      ),
    "roadmap/secret-leader-election/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/secret-leader-election/index.md?collection=content_zh"
      ),
    "roadmap/security/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/security/index.md?collection=content_zh"
      ),
    "roadmap/single-slot-finality/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/single-slot-finality/index.md?collection=content_zh"
      ),
    "roadmap/statelessness/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/statelessness/index.md?collection=content_zh"
      ),
    "roadmap/user-experience/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/user-experience/index.md?collection=content_zh"
      ),
    "roadmap/verkle-trees/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/verkle-trees/index.md?collection=content_zh"
      ),
    "roadmap/zkevm/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/zkevm/index.md?collection=content_zh"
      ),
    "staking/dvt/index.md": () =>
      import(
        "../public/content/translations/zh/staking/dvt/index.md?collection=content_zh"
      ),
    "staking/pools/index.md": () =>
      import(
        "../public/content/translations/zh/staking/pools/index.md?collection=content_zh"
      ),
    "staking/saas/index.md": () =>
      import(
        "../public/content/translations/zh/staking/saas/index.md?collection=content_zh"
      ),
    "staking/solo/index.md": () =>
      import(
        "../public/content/translations/zh/staking/solo/index.md?collection=content_zh"
      ),
    "staking/withdrawals/index.md": () =>
      import(
        "../public/content/translations/zh/staking/withdrawals/index.md?collection=content_zh"
      ),
    "videos/ai-agents-interview-luna/index.md": () =>
      import(
        "../public/content/translations/zh/videos/ai-agents-interview-luna/index.md?collection=content_zh"
      ),
    "videos/atoms-institutions-blockchains-josh-stark/index.md": () =>
      import(
        "../public/content/translations/zh/videos/atoms-institutions-blockchains-josh-stark/index.md?collection=content_zh"
      ),
    "videos/blockchain-101-visual-demo/index.md": () =>
      import(
        "../public/content/translations/zh/videos/blockchain-101-visual-demo/index.md?collection=content_zh"
      ),
    "videos/blockchain-eth-build/index.md": () =>
      import(
        "../public/content/translations/zh/videos/blockchain-eth-build/index.md?collection=content_zh"
      ),
    "videos/blobspace-101-dencun/index.md": () =>
      import(
        "../public/content/translations/zh/videos/blobspace-101-dencun/index.md?collection=content_zh"
      ),
    "videos/crypto-apps-desocial-linda-xie/index.md": () =>
      import(
        "../public/content/translations/zh/videos/crypto-apps-desocial-linda-xie/index.md?collection=content_zh"
      ),
    "videos/crypto-security-passwords/index.md": () =>
      import(
        "../public/content/translations/zh/videos/crypto-security-passwords/index.md?collection=content_zh"
      ),
    "videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md": () =>
      import(
        "../public/content/translations/zh/videos/danny-ryan-leading-cryptos-biggest-upgrade/index.md?collection=content_zh"
      ),
    "videos/dao-hack-ethereum-classic/index.md": () =>
      import(
        "../public/content/translations/zh/videos/dao-hack-ethereum-classic/index.md?collection=content_zh"
      ),
    "videos/dao-build-next-great-city/index.md": () =>
      import(
        "../public/content/translations/zh/videos/dao-build-next-great-city/index.md?collection=content_zh"
      ),
    "videos/decentralized-identity-explained/index.md": () =>
      import(
        "../public/content/translations/zh/videos/decentralized-identity-explained/index.md?collection=content_zh"
      ),
    "videos/decentralized-social-media/index.md": () =>
      import(
        "../public/content/translations/zh/videos/decentralized-social-media/index.md?collection=content_zh"
      ),
    "videos/defi-future-of-finance/index.md": () =>
      import(
        "../public/content/translations/zh/videos/defi-future-of-finance/index.md?collection=content_zh"
      ),
    "videos/defi-history-inception-to-2021/index.md": () =>
      import(
        "../public/content/translations/zh/videos/defi-history-inception-to-2021/index.md?collection=content_zh"
      ),
    "videos/desci-movement-juan-benet/index.md": () =>
      import(
        "../public/content/translations/zh/videos/desci-movement-juan-benet/index.md?collection=content_zh"
      ),
    "videos/devcon-mumbai-coming-2026/index.md": () =>
      import(
        "../public/content/translations/zh/videos/devcon-mumbai-coming-2026/index.md?collection=content_zh"
      ),
    "videos/devconnect-argentina-2025-recap/index.md": () =>
      import(
        "../public/content/translations/zh/videos/devconnect-argentina-2025-recap/index.md?collection=content_zh"
      ),
    "videos/devconnect-buenos-aires-promo/index.md": () =>
      import(
        "../public/content/translations/zh/videos/devconnect-buenos-aires-promo/index.md?collection=content_zh"
      ),
    "videos/eigenlayer-permissionless-features/index.md": () =>
      import(
        "../public/content/translations/zh/videos/eigenlayer-permissionless-features/index.md?collection=content_zh"
      ),
    "videos/eip-4844-dencun-explained/index.md": () =>
      import(
        "../public/content/translations/zh/videos/eip-4844-dencun-explained/index.md?collection=content_zh"
      ),
    "videos/ethereum-basics-intro/index.md": () =>
      import(
        "../public/content/translations/zh/videos/ethereum-basics-intro/index.md?collection=content_zh"
      ),
    "videos/ethereum-core-governance-explained/index.md": () =>
      import(
        "../public/content/translations/zh/videos/ethereum-core-governance-explained/index.md?collection=content_zh"
      ),
    "videos/ethereum-evolution-glamsterdam/index.md": () =>
      import(
        "../public/content/translations/zh/videos/ethereum-evolution-glamsterdam/index.md?collection=content_zh"
      ),
    "videos/ethereum-in-30-minutes-vitalik-buterin/index.md": () =>
      import(
        "../public/content/translations/zh/videos/ethereum-in-30-minutes-vitalik-buterin/index.md?collection=content_zh"
      ),
    "videos/ethereum-institutional-privacy-panel/index.md": () =>
      import(
        "../public/content/translations/zh/videos/ethereum-institutional-privacy-panel/index.md?collection=content_zh"
      ),
    "videos/ethereum-localism-global-protocols-local-power/index.md": () =>
      import(
        "../public/content/translations/zh/videos/ethereum-localism-global-protocols-local-power/index.md?collection=content_zh"
      ),
    "videos/ethereum-staking-withdrawals/index.md": () =>
      import(
        "../public/content/translations/zh/videos/ethereum-staking-withdrawals/index.md?collection=content_zh"
      ),
    "videos/ethereum-things-i-like-mariano-conti/index.md": () =>
      import(
        "../public/content/translations/zh/videos/ethereum-things-i-like-mariano-conti/index.md?collection=content_zh"
      ),
    "videos/ethereums-quantum-plan-justin-drake/index.md": () =>
      import(
        "../public/content/translations/zh/videos/ethereums-quantum-plan-justin-drake/index.md?collection=content_zh"
      ),
    "videos/fusaka-upgrade-explained/index.md": () =>
      import(
        "../public/content/translations/zh/videos/fusaka-upgrade-explained/index.md?collection=content_zh"
      ),
    "videos/hash-function-eth-build/index.md": () =>
      import(
        "../public/content/translations/zh/videos/hash-function-eth-build/index.md?collection=content_zh"
      ),
    "videos/how-to-be-cypherpunk-juan-benet/index.md": () =>
      import(
        "../public/content/translations/zh/videos/how-to-be-cypherpunk-juan-benet/index.md?collection=content_zh"
      ),
    "videos/how-to-make-a-guerilla-l2/index.md": () =>
      import(
        "../public/content/translations/zh/videos/how-to-make-a-guerilla-l2/index.md?collection=content_zh"
      ),
    "videos/key-pair-eth-build/index.md": () =>
      import(
        "../public/content/translations/zh/videos/key-pair-eth-build/index.md?collection=content_zh"
      ),
    "videos/layer-2-scaling-explained/index.md": () =>
      import(
        "../public/content/translations/zh/videos/layer-2-scaling-explained/index.md?collection=content_zh"
      ),
    "videos/learn-nfts-and-defi/index.md": () =>
      import(
        "../public/content/translations/zh/videos/learn-nfts-and-defi/index.md?collection=content_zh"
      ),
    "videos/next-10-years-of-ethereum/index.md": () =>
      import(
        "../public/content/translations/zh/videos/next-10-years-of-ethereum/index.md?collection=content_zh"
      ),
    "videos/pectra-upgrade-overview/index.md": () =>
      import(
        "../public/content/translations/zh/videos/pectra-upgrade-overview/index.md?collection=content_zh"
      ),
    "videos/pectra-what-stakers-need-to-know/index.md": () =>
      import(
        "../public/content/translations/zh/videos/pectra-what-stakers-need-to-know/index.md?collection=content_zh"
      ),
    "videos/pos-reorgs-attack-defense/index.md": () =>
      import(
        "../public/content/translations/zh/videos/pos-reorgs-attack-defense/index.md?collection=content_zh"
      ),
    "videos/post-quantum-security-ethereum-roadmap/index.md": () =>
      import(
        "../public/content/translations/zh/videos/post-quantum-security-ethereum-roadmap/index.md?collection=content_zh"
      ),
    "videos/pow-vs-pos/index.md": () =>
      import(
        "../public/content/translations/zh/videos/pow-vs-pos/index.md?collection=content_zh"
      ),
    "videos/privacy-is-existential/index.md": () =>
      import(
        "../public/content/translations/zh/videos/privacy-is-existential/index.md?collection=content_zh"
      ),
    "videos/proof-of-authority-explained/index.md": () =>
      import(
        "../public/content/translations/zh/videos/proof-of-authority-explained/index.md?collection=content_zh"
      ),
    "videos/proof-of-work-explained/index.md": () =>
      import(
        "../public/content/translations/zh/videos/proof-of-work-explained/index.md?collection=content_zh"
      ),
    "videos/proposer-builder-separation/index.md": () =>
      import(
        "../public/content/translations/zh/videos/proposer-builder-separation/index.md?collection=content_zh"
      ),
    "videos/real-state-of-l2s-bartek-kiepuszewski/index.md": () =>
      import(
        "../public/content/translations/zh/videos/real-state-of-l2s-bartek-kiepuszewski/index.md?collection=content_zh"
      ),
    "videos/regenerative-finance-refi/index.md": () =>
      import(
        "../public/content/translations/zh/videos/regenerative-finance-refi/index.md?collection=content_zh"
      ),
    "videos/rollups-scaling-strategy/index.md": () =>
      import(
        "../public/content/translations/zh/videos/rollups-scaling-strategy/index.md?collection=content_zh"
      ),
    "videos/restaking-explained/index.md": () =>
      import(
        "../public/content/translations/zh/videos/restaking-explained/index.md?collection=content_zh"
      ),
    "videos/security-through-obscurity-microdots/index.md": () =>
      import(
        "../public/content/translations/zh/videos/security-through-obscurity-microdots/index.md?collection=content_zh"
      ),
    "videos/smart-contracts-code-is-law/index.md": () =>
      import(
        "../public/content/translations/zh/videos/smart-contracts-code-is-law/index.md?collection=content_zh"
      ),
    "videos/stani-kulechov-building-aave/index.md": () =>
      import(
        "../public/content/translations/zh/videos/stani-kulechov-building-aave/index.md?collection=content_zh"
      ),
    "videos/surveillance-silence-reclaiming-privacy/index.md": () =>
      import(
        "../public/content/translations/zh/videos/surveillance-silence-reclaiming-privacy/index.md?collection=content_zh"
      ),
    "videos/transactions-eth-build/index.md": () =>
      import(
        "../public/content/translations/zh/videos/transactions-eth-build/index.md?collection=content_zh"
      ),
    "videos/understanding-consensus-mechanisms/index.md": () =>
      import(
        "../public/content/translations/zh/videos/understanding-consensus-mechanisms/index.md?collection=content_zh"
      ),
    "videos/what-is-a-dapp/index.md": () =>
      import(
        "../public/content/translations/zh/videos/what-is-a-dapp/index.md?collection=content_zh"
      ),
    "videos/zero-knowledge-proofs-5-levels/index.md": () =>
      import(
        "../public/content/translations/zh/videos/zero-knowledge-proofs-5-levels/index.md?collection=content_zh"
      ),
    "contributing/design/adding-design-resources/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/design/adding-design-resources/index.md?collection=content_zh"
      ),
    "contributing/translation-program/faq/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/translation-program/faq/index.md?collection=content_zh"
      ),
    "contributing/translation-program/how-to-translate/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/translation-program/how-to-translate/index.md?collection=content_zh"
      ),
    "contributing/translation-program/mission-and-vision/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/translation-program/mission-and-vision/index.md?collection=content_zh"
      ),
    "contributing/translation-program/playbook/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/translation-program/playbook/index.md?collection=content_zh"
      ),
    "contributing/translation-program/resources/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/translation-program/resources/index.md?collection=content_zh"
      ),
    "contributing/translation-program/translatathon/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/translation-program/translatathon/index.md?collection=content_zh"
      ),
    "contributing/translation-program/translators-guide/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/translation-program/translators-guide/index.md?collection=content_zh"
      ),
    "developers/docs/accounts/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/accounts/index.md?collection=content_zh"
      ),
    "developers/docs/blocks/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/blocks/index.md?collection=content_zh"
      ),
    "developers/docs/bridges/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/bridges/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/index.md?collection=content_zh"
      ),
    "developers/docs/dapps/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/dapps/index.md?collection=content_zh"
      ),
    "developers/docs/data-and-analytics/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/data-and-analytics/index.md?collection=content_zh"
      ),
    "developers/docs/data-availability/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/data-availability/index.md?collection=content_zh"
      ),
    "developers/docs/data-structures-and-encoding/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/data-structures-and-encoding/index.md?collection=content_zh"
      ),
    "developers/docs/design-and-ux/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/design-and-ux/index.md?collection=content_zh"
      ),
    "developers/docs/development-networks/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/development-networks/index.md?collection=content_zh"
      ),
    "developers/docs/ethereum-stack/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/ethereum-stack/index.md?collection=content_zh"
      ),
    "developers/docs/evm/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/evm/index.md?collection=content_zh"
      ),
    "developers/docs/frameworks/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/frameworks/index.md?collection=content_zh"
      ),
    "developers/docs/gas/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/gas/index.md?collection=content_zh"
      ),
    "developers/docs/ides/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/ides/index.md?collection=content_zh"
      ),
    "developers/docs/intro-to-ether/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/intro-to-ether/index.md?collection=content_zh"
      ),
    "developers/docs/intro-to-ethereum/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/intro-to-ethereum/index.md?collection=content_zh"
      ),
    "developers/docs/mev/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/mev/index.md?collection=content_zh"
      ),
    "developers/docs/networking-layer/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/networking-layer/index.md?collection=content_zh"
      ),
    "developers/docs/networks/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/networks/index.md?collection=content_zh"
      ),
    "developers/docs/nodes-and-clients/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/nodes-and-clients/index.md?collection=content_zh"
      ),
    "developers/docs/oracles/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/oracles/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/index.md?collection=content_zh"
      ),
    "developers/docs/scaling/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/scaling/index.md?collection=content_zh"
      ),
    "developers/docs/security/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/security/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/index.md?collection=content_zh"
      ),
    "developers/docs/standards/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/standards/index.md?collection=content_zh"
      ),
    "developers/docs/storage/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/storage/index.md?collection=content_zh"
      ),
    "developers/docs/transactions/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/transactions/index.md?collection=content_zh"
      ),
    "developers/docs/web2-vs-web3/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/web2-vs-web3/index.md?collection=content_zh"
      ),
    "developers/docs/wrapped-eth/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/wrapped-eth/index.md?collection=content_zh"
      ),
    "developers/tutorials/Waffle-hello-world-with-buidler-tutorial/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/Waffle-hello-world-with-buidler-tutorial/index.md?collection=content_zh"
        ),
    "developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/a-developers-guide-to-ethereum-part-one/index.md?collection=content_zh"
        ),
    "developers/tutorials/ai-trading-agent/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/ai-trading-agent/index.md?collection=content_zh"
      ),
    "developers/tutorials/all-you-can-cache/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/all-you-can-cache/index.md?collection=content_zh"
      ),
    "developers/tutorials/app-plasma/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/app-plasma/index.md?collection=content_zh"
      ),
    "developers/tutorials/calling-a-smart-contract-from-javascript/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/calling-a-smart-contract-from-javascript/index.md?collection=content_zh"
        ),
    "developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/creating-a-wagmi-ui-for-your-contract/index.md?collection=content_zh"
      ),
    "developers/tutorials/deploying-your-first-smart-contract/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/deploying-your-first-smart-contract/index.md?collection=content_zh"
      ),
    "developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/index.md?collection=content_zh"
        ),
    "developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/index.md?collection=content_zh"
        ),
    "developers/tutorials/eip-1271-smart-contract-signatures/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/eip-1271-smart-contract-signatures/index.md?collection=content_zh"
      ),
    "developers/tutorials/erc-721-vyper-annotated-code/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/erc-721-vyper-annotated-code/index.md?collection=content_zh"
      ),
    "developers/tutorials/erc20-annotated-code/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/erc20-annotated-code/index.md?collection=content_zh"
      ),
    "developers/tutorials/erc20-with-safety-rails/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/erc20-with-safety-rails/index.md?collection=content_zh"
      ),
    "developers/tutorials/ethereum-for-web2-auth/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/ethereum-for-web2-auth/index.md?collection=content_zh"
      ),
    "developers/tutorials/gasless/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/gasless/index.md?collection=content_zh"
      ),
    "developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/index.md?collection=content_zh"
        ),
    "developers/tutorials/guide-to-smart-contract-security-tools/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/guide-to-smart-contract-security-tools/index.md?collection=content_zh"
        ),
    "developers/tutorials/hello-world-smart-contract/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/hello-world-smart-contract/index.md?collection=content_zh"
      ),
    "developers/tutorials/hello-world-smart-contract-fullstack/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/hello-world-smart-contract-fullstack/index.md?collection=content_zh"
      ),
    "developers/tutorials/how-to-implement-an-erc721-market/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/how-to-implement-an-erc721-market/index.md?collection=content_zh"
      ),
    "developers/tutorials/how-to-mint-an-nft/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/how-to-mint-an-nft/index.md?collection=content_zh"
      ),
    "developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/how-to-mock-solidity-contracts-for-testing/index.md?collection=content_zh"
        ),
    "developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/index.md?collection=content_zh"
        ),
    "developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/index.md?collection=content_zh"
        ),
    "developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/index.md?collection=content_zh"
        ),
    "developers/tutorials/how-to-use-tellor-as-your-oracle/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/how-to-use-tellor-as-your-oracle/index.md?collection=content_zh"
      ),
    "developers/tutorials/how-to-view-nft-in-metamask/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/how-to-view-nft-in-metamask/index.md?collection=content_zh"
      ),
    "developers/tutorials/how-to-write-and-deploy-an-nft/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/how-to-write-and-deploy-an-nft/index.md?collection=content_zh"
      ),
    "developers/tutorials/interact-with-other-contracts-from-solidity/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/interact-with-other-contracts-from-solidity/index.md?collection=content_zh"
        ),
    "developers/tutorials/ipfs-decentralized-ui/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/ipfs-decentralized-ui/index.md?collection=content_zh"
      ),
    "developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/index.md?collection=content_zh"
        ),
    "developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/learn-foundational-ethereum-topics-with-sql/index.md?collection=content_zh"
        ),
    "developers/tutorials/kickstart-your-dapp-frontend-development-wth-create-eth-app/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/kickstart-your-dapp-frontend-development-wth-create-eth-app/index.md?collection=content_zh"
        ),
    "developers/tutorials/logging-events-smart-contracts/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/logging-events-smart-contracts/index.md?collection=content_zh"
      ),
    "developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md?collection=content_zh"
        ),
    "developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/index.md?collection=content_zh"
        ),
    "developers/tutorials/nft-minter/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/nft-minter/index.md?collection=content_zh"
      ),
    "developers/tutorials/optimism-std-bridge-annotated-code/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/optimism-std-bridge-annotated-code/index.md?collection=content_zh"
      ),
    "developers/tutorials/reverse-engineering-a-contract/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/reverse-engineering-a-contract/index.md?collection=content_zh"
      ),
    "developers/tutorials/run-node-raspberry-pi/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/run-node-raspberry-pi/index.md?collection=content_zh"
      ),
    "developers/tutorials/scam-token-tricks/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/scam-token-tricks/index.md?collection=content_zh"
      ),
    "developers/tutorials/secret-state/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/secret-state/index.md?collection=content_zh"
      ),
    "developers/tutorials/secure-development-workflow/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/secure-development-workflow/index.md?collection=content_zh"
      ),
    "developers/tutorials/send-token-ethersjs/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/send-token-ethersjs/index.md?collection=content_zh"
      ),
    "developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/sending-transactions-using-web3-and-alchemy/index.md?collection=content_zh"
        ),
    "developers/tutorials/server-components/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/server-components/index.md?collection=content_zh"
      ),
    "developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/index.md?collection=content_zh"
        ),
    "developers/tutorials/short-abi/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/short-abi/index.md?collection=content_zh"
      ),
    "developers/tutorials/smart-contract-security-guidelines/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/smart-contract-security-guidelines/index.md?collection=content_zh"
      ),
    "developers/tutorials/stealth-addr/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/stealth-addr/index.md?collection=content_zh"
      ),
    "developers/tutorials/testing-smart-contract-with-waffle/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/testing-smart-contract-with-waffle/index.md?collection=content_zh"
      ),
    "developers/tutorials/the-graph-fixing-web3-data-querying/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/the-graph-fixing-web3-data-querying/index.md?collection=content_zh"
      ),
    "developers/tutorials/token-integration-checklist/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/token-integration-checklist/index.md?collection=content_zh"
      ),
    "developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/index.md?collection=content_zh"
        ),
    "developers/tutorials/understand-the-erc-20-token-smart-contract/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/tutorials/understand-the-erc-20-token-smart-contract/index.md?collection=content_zh"
        ),
    "developers/tutorials/uniswap-v2-annotated-code/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/uniswap-v2-annotated-code/index.md?collection=content_zh"
      ),
    "developers/tutorials/using-websockets/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/using-websockets/index.md?collection=content_zh"
      ),
    "developers/tutorials/yellow-paper-evm/index.md": () =>
      import(
        "../public/content/translations/zh/developers/tutorials/yellow-paper-evm/index.md?collection=content_zh"
      ),
    "community/events/organizing/index.md": () =>
      import(
        "../public/content/translations/zh/community/events/organizing/index.md?collection=content_zh"
      ),
    "community/support/faq/index.md": () =>
      import(
        "../public/content/translations/zh/community/support/faq/index.md?collection=content_zh"
      ),
    "community/support/misconceptions/index.md": () =>
      import(
        "../public/content/translations/zh/community/support/misconceptions/index.md?collection=content_zh"
      ),
    "community/support/scams/index.md": () =>
      import(
        "../public/content/translations/zh/community/support/scams/index.md?collection=content_zh"
      ),
    "roadmap/fusaka/peerdas/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/fusaka/peerdas/index.md?collection=content_zh"
      ),
    "roadmap/future-proofing/quantum-resistance/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/future-proofing/quantum-resistance/index.md?collection=content_zh"
      ),
    "roadmap/merge/issuance/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/merge/issuance/index.md?collection=content_zh"
      ),
    "roadmap/pectra/7702/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/pectra/7702/index.md?collection=content_zh"
      ),
    "roadmap/pectra/maxeb/index.md": () =>
      import(
        "../public/content/translations/zh/roadmap/pectra/maxeb/index.md?collection=content_zh"
      ),
    "contributing/translation-program/translatathon/details/index.md": () =>
      import(
        "../public/content/translations/zh/contributing/translation-program/translatathon/details/index.md?collection=content_zh"
      ),
    "developers/docs/apis/javascript/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/apis/javascript/index.md?collection=content_zh"
      ),
    "developers/docs/apis/backend/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/apis/backend/index.md?collection=content_zh"
      ),
    "developers/docs/apis/json-rpc/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/apis/json-rpc/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/poa/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/poa/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pow/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/pow/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pos/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/index.md?collection=content_zh"
      ),
    "developers/docs/data-and-analytics/block-explorers/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/data-and-analytics/block-explorers/index.md?collection=content_zh"
      ),
    "developers/docs/data-availability/blockchain-data-storage-strategies/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/docs/data-availability/blockchain-data-storage-strategies/index.md?collection=content_zh"
        ),
    "developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/docs/data-structures-and-encoding/patricia-merkle-trie/index.md?collection=content_zh"
        ),
    "developers/docs/data-structures-and-encoding/rlp/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/data-structures-and-encoding/rlp/index.md?collection=content_zh"
      ),
    "developers/docs/data-structures-and-encoding/ssz/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/data-structures-and-encoding/ssz/index.md?collection=content_zh"
      ),
    "developers/docs/data-structures-and-encoding/web3-secret-storage/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/docs/data-structures-and-encoding/web3-secret-storage/index.md?collection=content_zh"
        ),
    "developers/docs/data-structures-and-encoding/web3-secret-storage-definition/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/docs/data-structures-and-encoding/web3-secret-storage-definition/index.md?collection=content_zh"
        ),
    "developers/docs/design-and-ux/dex-design-best-practice/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/design-and-ux/dex-design-best-practice/index.md?collection=content_zh"
      ),
    "developers/docs/design-and-ux/heuristics-for-web3/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/design-and-ux/heuristics-for-web3/index.md?collection=content_zh"
      ),
    "developers/docs/evm/opcodes/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/evm/opcodes/index.md?collection=content_zh"
      ),
    "developers/docs/networking-layer/portal-network/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/networking-layer/portal-network/index.md?collection=content_zh"
      ),
    "developers/docs/networking-layer/network-addresses/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/networking-layer/network-addresses/index.md?collection=content_zh"
      ),
    "developers/docs/nodes-and-clients/client-diversity/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/nodes-and-clients/client-diversity/index.md?collection=content_zh"
      ),
    "developers/docs/nodes-and-clients/archive-nodes/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/nodes-and-clients/archive-nodes/index.md?collection=content_zh"
      ),
    "developers/docs/nodes-and-clients/bootnodes/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/nodes-and-clients/bootnodes/index.md?collection=content_zh"
      ),
    "developers/docs/nodes-and-clients/light-clients/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/nodes-and-clients/light-clients/index.md?collection=content_zh"
      ),
    "developers/docs/nodes-and-clients/node-architecture/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/nodes-and-clients/node-architecture/index.md?collection=content_zh"
      ),
    "developers/docs/nodes-and-clients/nodes-as-a-service/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/nodes-and-clients/nodes-as-a-service/index.md?collection=content_zh"
      ),
    "developers/docs/nodes-and-clients/run-a-node/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/nodes-and-clients/run-a-node/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/dart/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/dart/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/delphi/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/delphi/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/dot-net/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/dot-net/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/elixir/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/elixir/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/golang/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/golang/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/java/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/java/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/javascript/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/javascript/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/python/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/python/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/ruby/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/ruby/index.md?collection=content_zh"
      ),
    "developers/docs/programming-languages/rust/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/programming-languages/rust/index.md?collection=content_zh"
      ),
    "developers/docs/scaling/optimistic-rollups/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/scaling/optimistic-rollups/index.md?collection=content_zh"
      ),
    "developers/docs/scaling/plasma/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/scaling/plasma/index.md?collection=content_zh"
      ),
    "developers/docs/scaling/sidechains/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/scaling/sidechains/index.md?collection=content_zh"
      ),
    "developers/docs/scaling/state-channels/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/scaling/state-channels/index.md?collection=content_zh"
      ),
    "developers/docs/scaling/validium/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/scaling/validium/index.md?collection=content_zh"
      ),
    "developers/docs/scaling/zk-rollups/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/scaling/zk-rollups/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/anatomy/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/anatomy/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/compiling/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/compiling/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/composability/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/composability/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/deploying/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/deploying/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/formal-verification/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/formal-verification/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/languages/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/languages/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/libraries/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/libraries/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/naming/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/naming/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/security/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/security/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/testing/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/testing/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/upgrading/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/upgrading/index.md?collection=content_zh"
      ),
    "developers/docs/smart-contracts/verifying/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/smart-contracts/verifying/index.md?collection=content_zh"
      ),
    "developers/docs/standards/tokens/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/standards/tokens/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/pow/mining/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/attack-and-defense/index.md?collection=content_zh"
        ),
    "developers/docs/consensus-mechanisms/pos/attestations/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/attestations/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pos/block-proposal/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/block-proposal/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pos/faqs/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/faqs/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pos/gasper/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/gasper/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pos/keys/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/keys/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/pos-vs-pow/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/index.md?collection=content_zh"
        ),
    "developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/index.md?collection=content_zh"
        ),
    "developers/docs/standards/tokens/erc-1155/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/standards/tokens/erc-1155/index.md?collection=content_zh"
      ),
    "developers/docs/standards/tokens/erc-1363/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/standards/tokens/erc-1363/index.md?collection=content_zh"
      ),
    "developers/docs/standards/tokens/erc-20/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/standards/tokens/erc-20/index.md?collection=content_zh"
      ),
    "developers/docs/standards/tokens/erc-223/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/standards/tokens/erc-223/index.md?collection=content_zh"
      ),
    "developers/docs/standards/tokens/erc-4626/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/standards/tokens/erc-4626/index.md?collection=content_zh"
      ),
    "developers/docs/standards/tokens/erc-721/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/standards/tokens/erc-721/index.md?collection=content_zh"
      ),
    "developers/docs/standards/tokens/erc-777/index.md": () =>
      import(
        "../public/content/translations/zh/developers/docs/standards/tokens/erc-777/index.md?collection=content_zh"
      ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/index.md?collection=content_zh"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/index.md?collection=content_zh"
        ),
    "developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md":
      () =>
        import(
          "../public/content/translations/zh/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/index.md?collection=content_zh"
        ),
  }),
  content_zh_tw: create.doc("content_zh_tw", {}),
}
export default browserCollections
