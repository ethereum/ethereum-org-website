import {
  Box,
  Flex,
  type FlexProps,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import type { NFT } from "./interfaces"

interface IProps extends FlexProps {
  nfts: Array<NFT>
}
export const NFTList: React.FC<IProps> = ({ nfts, ...flexProps }) => {
  const size = useBreakpointValue({ base: 20, md: 24 })
  return (
    <Flex w="full" gap={4} h="full" flexWrap="wrap" {...flexProps}>
      {nfts.length ? (
        nfts.map(({ title, image }) => (
          <Box key={title} w="fit-content">
            <Image
              image={image}
              as={GatsbyImage}
              alt=""
              fit="contain"
              maxW={size}
              maxH={size}
            />
            <Text fontSize="xs" m={0}>
              {title}
            </Text>
          </Box>
        ))
      ) : (
        <Text>No NFTs yet!</Text>
      )}
    </Flex>
  )
}
