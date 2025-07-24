import { hardhat, sepolia } from "wagmi/chains"

import TenYearsNFT from "./TenYearsNFT.json"

export const TEN_YEARS_NFT_CONTRACTS = {
  [hardhat.id]: {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    blockNumber: 1,
    abi: TenYearsNFT.abi,
  },
  [sepolia.id]: {
    address: "0x0f150b47894538f0247ba35e69c9a15f81724c1f",
    blockNumber: 8825480,
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
