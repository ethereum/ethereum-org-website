import { hardhat, mainnet, sepolia } from "wagmi/chains"

import TenYearsNFT from "./TenYearsNFT.json"

export const TEN_YEARS_NFT_CONTRACTS = {
  [hardhat.id]: {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    blockNumber: 1,
    abi: TenYearsNFT.abi,
  },
  [sepolia.id]: {
    address: "0x388B10E1F9aC2a0a6bd874d00a971875Ae89Ec6E",
    blockNumber: 8863414,
    abi: TenYearsNFT.abi,
  },
  [mainnet.id]: {
    address: "0x26d85a13212433fe6a8381969c2b0db390a0b0ae",
    blockNumber: 23023215,
    abi: TenYearsNFT.abi,
  },
} as const

export const getTenYearsNFTContract = (chainId: number) => {
  return TEN_YEARS_NFT_CONTRACTS[
    chainId as keyof typeof TEN_YEARS_NFT_CONTRACTS
  ]
}

export type TenYearsNFTContract =
  (typeof TEN_YEARS_NFT_CONTRACTS)[keyof typeof TEN_YEARS_NFT_CONTRACTS]
