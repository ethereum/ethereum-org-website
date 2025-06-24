import { DappCategoryEnum, DefiDapp } from "@/lib/types"

import AaveLogo from "@/public/images/dapps/aave.png"

export const defiDapps: DefiDapp[] = [
  {
    name: "Aave",
    url: "https://aave.com",
    description:
      "Aave is a decentralized lending platform that allows users to lend and borrow assets.",
    image: AaveLogo,
    category: DappCategoryEnum.DEFI,
    subCategory: ["Lending"],
    networks: ["Ethereum"],
  },
  {
    name: "Aave 2",
    url: "https://aave.com",
    description:
      "Aave is a decentralized lending platform that allows users to lend and borrow assets.",
    image: AaveLogo,
    category: DappCategoryEnum.DEFI,
    subCategory: ["RWA"],
    networks: ["Ethereum"],
  },
  {
    name: "Aave 3",
    url: "https://aave.com",
    description:
      "Aave is a decentralized lending platform that allows users to lend and borrow assets.",
    image: AaveLogo,
    category: DappCategoryEnum.DEFI,
    subCategory: ["DEX"],
    networks: ["Ethereum"],
  },
  {
    name: "Aave 4",
    url: "https://aave.com",
    description:
      "Aave is a decentralized lending platform that allows users to lend and borrow assets.",
    image: AaveLogo,
    category: DappCategoryEnum.DEFI,
    subCategory: ["Liquid staking"],
    networks: ["Ethereum"],
  },
  {
    name: "Aave 5",
    url: "https://aave.com",
    description:
      "Aave is a decentralized lending platform that allows users to lend and borrow assets.",
    image: AaveLogo,
    category: DappCategoryEnum.DEFI,
    subCategory: ["Lending"],
    networks: ["Ethereum"],
  },
]
