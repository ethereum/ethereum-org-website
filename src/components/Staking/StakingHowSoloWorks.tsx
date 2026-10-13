/* eslint-disable react/jsx-key */
import { getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import { Center } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { ListItem, OrderedList } from "../ui/list"

import image from "@/public/images/hackathon_transparent.png"

const StakingHowSoloWorks = async () => {
  const t = await getTranslations("page-staking")

  const items = [
    <p>
      {t.rich("page-staking-how-solo-works-item-1", {
        a: (chunks) => <InlineLink href="/run-a-node/">{chunks}</InlineLink>,
      })}
    </p>,
    <p>{t("page-staking-how-solo-works-item-2")}</p>,
    <p>{t("page-staking-how-solo-works-item-3")}</p>,
    <p>{t("page-staking-how-solo-works-item-4")}</p>,
    <p>{t("page-staking-how-solo-works-item-5")}</p>,
    <p>{t("page-staking-how-solo-works-item-6")}</p>,
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
