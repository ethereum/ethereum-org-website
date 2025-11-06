/**
 * Framework data without image imports.
 * This file contains pure data that can be imported by ts-node scripts.
 */

export interface FrameworkData {
  id: string
  url: string
  githubUrl: string
  background: string
  name: string
  description: string
  alt: string
}

export const frameworksListData: FrameworkData[] = [
  {
    id: "Kurtosis Ethereum Package",
    url: "https://github.com/kurtosis-tech/ethereum-package",
    githubUrl: "https://github.com/kurtosis-tech/ethereum-package",
    background: "#000000",
    name: "Kurtosis Ethereum Package",
    description:
      "page-developers-local-environment:page-local-environment-kurtosis-desc",
    alt: "page-developers-local-environment:page-local-environment-kurtosis-logo-alt",
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
  },
]
