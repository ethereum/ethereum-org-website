/* eslint-disable react/jsx-key */
import { Center } from "@chakra-ui/react"
import { Link } from "@chakra-ui/next-js"

import { Image } from "@/components/Image"
import OrderedList from "@/components/OrderedList"
// Re-enable after i18n implemented
// import Translation from "@/components/Translation"

import image from "@/public/hackathon_transparent.png"

export interface IProps {}

const StakingHowSoloWorks: React.FC<IProps> = () => {
  // TODO: Re-enable after i18n implemented
  // const items = [
  //   <p>
  //     <Translation id="page-staking-how-solo-works-item-1" />
  //   </p>,
  //   <p>
  //     <Translation id="page-staking-how-solo-works-item-2" />
  //   </p>,
  //   <p>
  //     <Translation id="page-staking-how-solo-works-item-3" />
  //   </p>,
  //   <p>
  //     <Translation id="page-staking-how-solo-works-item-4" />
  //   </p>,
  //   <p>
  //     <Translation id="page-staking-how-solo-works-item-5" />
  //   </p>,
  // ]
  const items = [
    <p>
      Get some hardware: You need to <Link href="/run-a-node/">run a node</Link>{" "}
      to stake
    </p>,
    <p>Sync an execution layer client</p>,
    <p>Sync a consensus layer client</p>,
    <p>Generate your keys and load them into your validator client</p>,
    <p>Monitor and maintain your node</p>,
  ]

  return (
    <Center
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
    >
      <OrderedList listData={items} />
      <Image src={image} alt="" width={400} />
    </Center>
  )
}

export default StakingHowSoloWorks
