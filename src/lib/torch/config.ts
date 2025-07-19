import { mainnet } from "viem/chains"
import { createConfig, http } from "@wagmi/core"

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    ),
    // [sepolia.id]: http(
    //   `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    // ),
    // [hardhat.id]: http("http://127.0.0.1:8545"),
  },
})
