import {
  Box,
  Flex,
  type FlexProps,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import React from "react"
import GatsbyImage from "../../GatsbyImage"
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
            <GatsbyImage
              image={image}
              alt=""
              objectFit="contain"
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
