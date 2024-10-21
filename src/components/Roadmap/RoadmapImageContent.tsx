import { TwImage } from "@/components/Image"
import { Center, Flex, Stack } from "@/components/ui/flex"

import wallet from "@/public/images/wallet.png"

export type RoadmapImageContentProps = {
  children: React.ReactNode
  title: string
}

const RoadmapImageContent = ({ children, title }: RoadmapImageContentProps) => (
  <Stack className="mb-1 mt-16">
    <h3>{title}</h3>
    <Flex className="flex-col lg:flex-row">
      <Stack className="mb-4">{children}</Stack>
      <Center className="min-w-fit">
        <TwImage
          className="object-contain"
          src={wallet}
          alt="Ethereum Wallet"
          width={350}
        />
      </Center>
    </Flex>
  </Stack>
)

export default RoadmapImageContent
