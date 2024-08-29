import { Framework } from "@/lib/interfaces"

import EthDiamondBlackImage from "@/public/images/assets/eth-diamond-black.png"
import EpirusImage from "@/public/images/dev-tools/epirus.png"
import FoundryImage from "@/public/images/dev-tools/foundry.png"
import HardhatImage from "@/public/images/dev-tools/hardhat.png"
import KurtosisImage from "@/public/images/dev-tools/kurtosis.png"
import ScaffoldEthImage from "@/public/images/dev-tools/scaffoldeth.png"
import WaffleImage from "@/public/images/dev-tools/waffle.png"

const frameworksList: Array<Framework> = [
  {
    id: "waffle",
    url: "https://getwaffle.io/",
    githubUrl: "https://github.com/EthWorks/waffle",
    background: "#ffffff",
    name: "Waffle",
    description:
      "page-developers-local-environment:page-local-environment-waffle-desc",
    alt: "page-developers-local-environment:page-local-environment-waffle-logo-alt",
    image: WaffleImage,
  },
  {
    id: "Kurtosis Ethereum Package",
    url: "https://github.com/kurtosis-tech/ethereum-package",
    githubUrl: "https://github.com/kurtosis-tech/ethereum-package",
    background: "#000000",
    name: "Kurtosis Ethereum Package",
    description:
      "page-developers-local-environment:page-local-environment-kurtosis-desc",
    alt: "page-developers-local-environment:page-local-environment-kurtosis-logo-alt",
    image: KurtosisImage,
  },
  {
    id: "hardhat",
    url: "https://hardhat.org/",
    githubUrl: "https://github.com/nomiclabs/hardhat",
    background: "#faf8fb",
    name: "Hardhat",
    description:
      "page-developers-local-environment:page-local-environment-hardhat-desc",
    alt: "page-developers-local-environment:page-local-environment-hardhat-logo-alt",
    image: HardhatImage,
  },
  {
    id: "brownie",
    url: "https://github.com/eth-brownie/brownie",
    githubUrl: "https://github.com/eth-brownie/brownie",
    background: "#ffffff",
    name: "Brownie",
    description:
      "page-developers-local-environment:page-local-environment-brownie-desc",
    alt: "page-developers-local-environment:page-local-environment-brownie-logo-alt",
    image: EthDiamondBlackImage,
  },
  {
    id: "epirus",
    url: "https://www.web3labs.com/epirus",
    githubUrl: "https://github.com/web3labs/epirus-free",
    background: "#ffffff",
    name: "Epirus",
    description:
      "page-developers-local-environment:page-local-environment-epirus-desc",
    alt: "page-developers-local-environment:page-local-environment-epirus-logo-alt",
    image: EpirusImage,
  },
  {
    id: "createethapp",
    url: "https://github.com/PaulRBerg/create-eth-app",
    githubUrl: "https://github.com/PaulRBerg/create-eth-app",
    background: "#ffffff",
    name: "Create Eth App",
    description:
      "page-developers-local-environment:page-local-environment-eth-app-desc",
    alt: "page-developers-local-environment:page-local-environment-eth-app-logo-alt",
    image: EthDiamondBlackImage,
  },
  {
    id: "scaffoldeth",
    url: "https://scaffoldeth.io/",
    githubUrl: "https://github.com/scaffold-eth/scaffold-eth-2",
    background: "#ffffff",
    name: "Scaffold-ETH-2",
    description:
      "page-developers-local-environment:page-local-environment-scaffold-eth-desc",
    alt: "page-local-environment-scaffold-eth-logo-alt",
    image: ScaffoldEthImage,
  },
  {
    id: "soliditytemplate",
    url: "https://github.com/paulrberg/solidity-template",
    githubUrl: "https://github.com/paulrberg/solidity-template",
    background: "#ffffff",
    name: "Solidity template",
    description:
      "page-developers-local-environment:page-local-environment-solidity-template-desc",
    alt: "page-developers-local-environment:page-local-environment-solidity-template-logo-alt",
    image: EthDiamondBlackImage,
  },
  {
    id: "foundry",
    url: "https://getfoundry.sh/",
    githubUrl: "https://github.com/foundry-rs/foundry",
    background: "#ffffff",
    name: "Foundry",
    description:
      "page-developers-local-environment:page-local-environment-foundry-desc",
    alt: "page-developers-local-environment:page-local-environment-foundry-logo-alt",
    image: FoundryImage,
  },
]

export const ghRepoData = async (githubUrl: string) => {
  const split = githubUrl.split("/")
  const repoOwner = split[split.length - 2]
  const repoName = split[split.length - 1]
  const repoReq = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN_READ_ONLY}`,
      },
    }
  )
  if (!repoReq.ok) {
    console.log(repoReq.status, repoReq.statusText)
    throw new Error("Failed to fetch Github repo data")
  }

  const repoData = await repoReq.json()

  const languageReq = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/languages`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN_READ_ONLY}`,
      },
    }
  )
  if (!languageReq.ok) {
    console.log(languageReq.status, languageReq.statusText)
    throw new Error("Failed to fetch Github repo language data")
  }
  const languageData = await languageReq.json()

  return {
    starCount: repoData.stargazers_count,
    languages: Object.keys(languageData),
  }
}

export const getLocalEnvironmentFrameworkData = async () => {
  const frameworksListData = await Promise.all(
    frameworksList.map(async (framework) => {
      const repoData = await ghRepoData(framework.githubUrl)
      return {
        ...framework,
        starCount: repoData.starCount,
        languages: repoData.languages.slice(0, 2),
      }
    })
  )
  return frameworksListData
}
