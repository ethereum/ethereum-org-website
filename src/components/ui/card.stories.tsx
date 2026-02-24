import Image from "next/image"
import { Meta } from "@storybook/react"

import { VStack } from "@/components/ui/flex"

import { CardBanner } from "./card"

const meta = {
  title: "Atoms / Display Content / CardBanner",
  component: CardBanner,
} satisfies Meta<typeof CardBanner>

export default meta

// Default (cover) - image fills, may crop
export const FitCover = {
  render: () => (
    <VStack className="max-w-md items-stretch gap-4">
      <p className="text-sm text-body-medium">
        Default fit=&quot;cover&quot; - image fills container, may be cropped
      </p>
      <CardBanner background="accent-a">
        <Image src="/images/dapps/uni.png" alt="" width={400} height={200} />
      </CardBanner>
    </VStack>
  ),
}

// Contain - image fully visible, blur background auto-generated
export const FitContain = {
  render: () => (
    <VStack className="max-w-md items-stretch gap-4">
      <p className="text-sm text-body-medium">
        fit=&quot;contain&quot; - blur background auto-generated from single
        image
      </p>
      <CardBanner fit="contain" background="accent-a">
        <Image src="/images/dapps/uni.png" alt="" width={368} height={92} />
      </CardBanner>
    </VStack>
  ),
}

// Background variants
export const BackgroundVariants = {
  render: () => (
    <VStack className="max-w-md items-stretch gap-4">
      {(
        ["accent-a", "accent-b", "accent-c", "primary", "body", "none"] as const
      ).map((bg) => (
        <div key={bg}>
          <p className="mb-2 text-sm text-body-medium">background: {bg}</p>
          <CardBanner background={bg}>
            <Image
              src="/images/dapps/uni.png"
              alt=""
              width={400}
              height={200}
            />
          </CardBanner>
        </div>
      ))}
    </VStack>
  ),
}
