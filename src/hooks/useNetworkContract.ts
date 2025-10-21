import { useAccount, useChainId } from "wagmi"
import { hardhat, mainnet, sepolia } from "wagmi/chains"

import { getTenYearsNFTContract } from "@/data/contracts/TenYearsNFT"

import { getTargetChains } from "@/config/rainbow-kit"

export const useNetworkContract = () => {
  const { chainId: accountChainId } = useAccount()
  const chainId = useChainId()

  const getContractData = () => {
    const contractData = getTenYearsNFTContract(chainId)

    if (!contractData) {
      throw new Error(`Contract not deployed on chain ${chainId}`)
    }

    return contractData
  }

  const isSupportedNetwork = () => {
    return getTargetChains().some((chain) => chain.id === accountChainId)
  }

  const getNetworkName = () => {
    switch (chainId) {
      case hardhat.id:
        return "Hardhat (Local)"
      case sepolia.id:
        return "Sepolia"
      case mainnet.id:
        return "Mainnet"
      default:
        return "Unsupported Network"
    }
  }

  return {
    chainId,
    contractData: getContractData(),
    isSupportedNetwork: isSupportedNetwork(),
    networkName: getNetworkName(),
  }
}
