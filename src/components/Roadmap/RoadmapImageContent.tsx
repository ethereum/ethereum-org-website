import { Center, Flex, Heading, Stack } from "@chakra-ui/react"

import { Image } from "@/components/Image"

import wallet from "@/public/images/wallet.png"

export type RoadmapImageContentProps = {
  children: React.ReactNode
  title: string
}

const RoadmapImageContent = ({ children, title }: RoadmapImageContentProps) => (
  <Stack mb={1} mt={16}>
    <Heading as="h3">{title}</Heading>
    <Flex flexDir={{ base: "column", lg: "row" }}>
      <Stack mb={4}>{children}</Stack>
      <Center minW="fit-content">
        <Image
          src={wallet}
          alt="Ethereum Wallet"
          width={350}
          style={{ objectFit: "contain" }}
        />
      </Center>
    </Flex>
  </Stack>
)

export default RoadmapImageContent
