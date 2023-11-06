import { Center, Flex, Heading, Stack } from "@chakra-ui/react"

import { Image } from "@/components/Image"

import wallet from "@/public/wallet.png"

export interface IProps {
  children: React.ReactNode
  title: String
}

const RoadmapImageContent: React.FC<IProps> = ({ children, title }) => (
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
