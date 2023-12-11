/** @type {import('next').NextConfig["redirects"]} */
module.exports = async function redirects() {
  return [
    {
      source: "/discord",
      destination: "https://discord.gg/ethereum-org",
      permanent: true,
    },
    {
      source: "/pdfs/:splat*",
      destination: "/",
      permanent: true,
    },
    {
      source: "/brand",
      destination: "/assets",
      permanent: true,
    },
    {
      source: "/ether",
      destination: "/eth",
      permanent: true,
    },
    {
      source: "/token",
      destination: "/developers",
      permanent: true,
    },
    {
      source: "/crowdsale",
      destination: "/developers",
      permanent: true,
    },
    {
      source: "/cli",
      destination: "/developers",
      permanent: true,
    },
    {
      source: "/greeter",
      destination: "/developers",
      permanent: true,
    },
    {
      source: "/search",
      destination: "/",
      permanent: true,
    },
    {
      source: "/use",
      destination: "/dapps",
      permanent: true,
    },
    {
      source: "/beginners",
      destination: "/what-is-ethereum",
      permanent: true,
    },
    {
      source: "/eth2",
      destination: "/roadmap",
      permanent: true,
    },
    {
      source: "/build",
      destination: "/developers/learning-tools",
      permanent: true,
    },
    {
      source: "/java",
      destination: "/developers/docs/programming-languages/java",
      permanent: true,
    },
    {
      source: "/python",
      destination: "/developers/docs/programming-languages/python",
      permanent: true,
    },
    {
      source: "/javascript",
      destination: "/developers/docs/programming-languages/javascript",
      permanent: true,
    },
    {
      source: "/golang",
      destination: "/developers/docs/programming-languages/golang",
      permanent: true,
    },
    {
      source: "/rust",
      destination: "/developers/docs/programming-languages/rust",
      permanent: true,
    },
    {
      source: "/dot-net",
      destination: "/developers/docs/programming-languages/dot-net",
      permanent: true,
    },
    {
      source: "/delphi",
      destination: "/developers/docs/programming-languages/delphi",
      permanent: true,
    },
    {
      source: "/dart",
      destination: "/developers/docs/programming-languages/dart",
      permanent: true,
    },
    {
      source: "/nfts",
      destination: "/nft",
      permanent: true,
    },
    {
      source: "/daos",
      destination: "/dao",
      permanent: true,
    },
    {
      source: "/layer2",
      destination: "/layer-2",
      permanent: true,
    },
    {
      source: "/grants",
      destination: "/community/grants",
      permanent: true,
    },
    {
      source: "/no/:splat*",
      destination: "/nb/:splat*",
      permanent: true,
    },
    {
      source: "/ph/:splat*",
      destination: "/fil/:splat*",
      permanent: true,
    },
    {
      source: "/java",
      destination: "/developers/docs/programming-languages/java",
      permanent: true,
    },
    {
      source: "/python",
      destination: "/developers/docs/programming-languages/python",
      permanent: true,
    },
    {
      source: "/javascript",
      destination: "/developers/docs/programming-languages/javascript",
      permanent: true,
    },
    {
      source: "/golang",
      destination: "/developers/docs/programming-languages/golang",
      permanent: true,
    },
    {
      source: "/rust",
      destination: "/developers/docs/programming-languages/rust",
      permanent: true,
    },
    {
      source: "/dot-net",
      destination: "/developers/docs/programming-languages/dot-net",
      permanent: true,
    },
    {
      source: "/delphi",
      destination: "/developers/docs/programming-languages/delphi",
      permanent: true,
    },
    {
      source: "/dart",
      destination: "/developers/docs/programming-languages/dart",
      permanent: true,
    },
    {
      source: "/developers/docs/mining",
      destination: "/developers/docs/consensus-mechanisms/pow/mining",
      permanent: true,
    },
    {
      source: "/beginners",
      destination: "/what-is-ethereum",
      permanent: true,
    },
    {
      source: "/build",
      destination: "/developers/learning-tools",
      permanent: true,
    },
    {
      source: "/eth2/beacon-chain",
      destination: "/upgrades/beacon-chain",
      permanent: true,
    },
    {
      source: "/eth2/the-beacon-chain",
      destination: "/upgrades/beacon-chain",
      permanent: true,
    },
    {
      source: "/upgrades/the-beacon-chain",
      destination: "/upgrades/beacon-chain",
      permanent: true,
    },
    {
      source: "/eth2/merge",
      destination: "/upgrades/merge",
      permanent: true,
    },
    {
      source: "/eth2/the-merge",
      destination: "/upgrades/merge",
      permanent: true,
    },
    {
      source: "/upgrades/the-merge",
      destination: "/upgrades/merge",
      permanent: true,
    },
    {
      source: "/eth2/docking",
      destination: "/upgrades/merge",
      permanent: true,
    },
    {
      source: "/upgrades/docking",
      destination: "/upgrades/merge",
      permanent: true,
    },
    {
      source: "/eth2/the-docking",
      destination: "/upgrades/merge",
      permanent: true,
    },
    {
      source: "/upgrades/the-docking",
      destination: "/upgrades/merge",
      permanent: true,
    },
    {
      source: "/eth2/shard-chains",
      destination: "/roadmap/danksharding",
      permanent: true,
    },
    {
      source: "/upgrades/shard-chains",
      destination: "/roadmap/danksharding",
      permanent: true,
    },
    {
      source: "/upgrades/sharding",
      destination: "/roadmap/danksharding",
      permanent: true,
    },
    {
      source: "/upgrades/sharding",
      destination: "/roadmap/danksharding",
      permanent: true,
    },
    {
      source: "/upgrades/shard-chains",
      destination: "/roadmap/danksharding",
      permanent: true,
    },
    {
      source: "/upgrades/merge",
      destination: "/roadmap/merge",
      permanent: true,
    },
    {
      source: "/upgrades/merge",
      destination: "/roadmap/merge",
      permanent: true,
    },
    {
      source: "/upgrades/merge/issuance",
      destination: "/roadmap/merge/issuance",
      permanent: true,
    },
    {
      source: "/upgrades/merge/issuance",
      destination: "/roadmap/merge/issuance",
      permanent: true,
    },
    {
      source: "/upgrades/beacon-chain",
      destination: "/roadmap/beacon-chain",
      permanent: true,
    },
    {
      source: "/upgrades/beacon-chain",
      destination: "/roadmap/beacon-chain",
      permanent: true,
    },
    {
      source: "/upgrades/vision",
      destination: "/roadmap/vision",
      permanent: true,
    },
    {
      source: "/upgrades/vision",
      destination: "/roadmap/vision",
      permanent: true,
    },
    {
      source: "/upgrades",
      destination: "/roadmap",
      permanent: true,
    },
    {
      source: "/upgrades",
      destination: "/roadmap",
      permanent: true,
    },
    {
      source: "/upgrades/get-involved",
      destination: "/contributing",
      permanent: true,
    },
    {
      source: "/upgrades/get-involved",
      destination: "/contributing",
      permanent: true,
    },
    {
      source: "/eth2/staking",
      destination: "/staking",
      permanent: true,
    },
    {
      source: "/eth2/vision",
      destination: "/roadmap/vision",
      permanent: true,
    },
    {
      source: "/eth2/get-involved",
      destination: "/upgrades/get-involved",
      permanent: true,
    },
    {
      source: "/eth2/get-involved/bug-bounty",
      destination: "/bug-bounty",
      permanent: true,
    },
    {
      source: "/upgrades/get-involved/bug-bounty",
      destination: "/bug-bounty",
      permanent: true,
    },
    {
      source: "/eth2/deposit-contract",
      destination: "/staking/deposit-contract",
      permanent: true,
    },
    {
      source: "/eth2",
      destination: "/upgrades",
      permanent: true,
    },
    {
      source: "/developers/docs/layer-2-scaling",
      destination: "/developers/docs/scaling",
      permanent: true,
    },
    {
      source: "/developers/docs/scaling/layer-2-rollups",
      destination: "/developers/docs/scaling",
      permanent: true,
    },
    {
      source: "/about/web-developer",
      destination: "/about/#open-jobs",
      permanent: true,
    },
    {
      source: "/about/product-designer",
      destination: "/about/#open-jobs",
      permanent: true,
    },
    {
      source: "/use",
      destination: "/dapps",
      permanent: true,
    },
    {
      source: "/contributing/translation-program/translation-guide",
      destination: "/contributing/translation-program/faq",
      permanent: true,
    },
    {
      source: "/contributing/translation-program/content-versions",
      destination: "/contributing/translation-program/content-buckets",
      permanent: true,
    },
    {
      source: "/developers/docs/smart-contracts/source-code-verification",
      destination: "/developers/docs/smart-contracts/verifying",
      permanent: true,
    },
    {
      source: "/developers/docs/smart-contracts/upgrading-smart-contracts",
      destination: "/developers/docs/smart-contracts/upgrading",
      permanent: true,
    },
    {
      source: "/staking/withdraws",
      destination: "/staking/withdrawals",
      permanent: true,
    },
    {
      source: "/writing-cohort",
      destination: "https://ethereumwriterscohort.carrd.co/",
      permanent: true,
    },
    {
      source: "/staking/withdraws",
      destination: "/staking/withdrawals",
      permanent: true,
    },
    {
      source: "/guides/how-to-register-an-ethereum-account",
      destination: "/guides/how-to-create-an-ethereum-account",
      permanent: true,
    },
  ]
}
