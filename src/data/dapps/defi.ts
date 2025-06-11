import { DefiDapp } from "@/lib/types"

import AaveLogo from "@/public/images/dapps/aave.png"

export const defiDapps: DefiDapp[] = [
  {
    name: "Aave",
    url: "https://aave.com",
    description:
      "Aave is a decentralized lending platform that allows users to lend and borrow assets.",
    image: AaveLogo,
    category: "defi",
    subCategory: "Lending",
    networks: ["Ethereum"],
  },
]
