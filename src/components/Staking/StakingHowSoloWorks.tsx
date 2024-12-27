/* eslint-disable react/jsx-key */
import { TwImage } from "@/components/Image"
import Translation from "@/components/Translation"
import { Center } from "@/components/ui/flex"

import { ListItem, OrderedList } from "../ui/list"

import image from "@/public/images/hackathon_transparent.png"

const StakingHowSoloWorks = () => {
  const items = [
    <p>
      <Translation id="page-staking:page-staking-how-solo-works-item-1" />
    </p>,
    <p>
      <Translation id="page-staking:page-staking-how-solo-works-item-2" />
    </p>,
    <p>
      <Translation id="page-staking:page-staking-how-solo-works-item-3" />
    </p>,
    <p>
      <Translation id="page-staking:page-staking-how-solo-works-item-4" />
    </p>,
    <p>
      <Translation id="page-staking:page-staking-how-solo-works-item-5" />
    </p>,
  ]

  return (
    <Center className="flex-col justify-between md:flex-row">
      <OrderedList>
        {items.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </OrderedList>
      <TwImage src={image} alt="" width={400} />
    </Center>
  )
}

export default StakingHowSoloWorks
