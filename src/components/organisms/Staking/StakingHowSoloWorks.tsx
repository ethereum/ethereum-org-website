/* eslint-disable react/jsx-key */
import { Center } from "@/components/atoms/flex"
import { ListItem, OrderedList } from "@/components/atoms/list"
import { Image } from "@/components/molecules/Image"
import Translation from "@/components/utilities/Translation"

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
      <Image src={image} alt="" width={400} />
    </Center>
  )
}

export default StakingHowSoloWorks
