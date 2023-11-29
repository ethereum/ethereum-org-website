import React from "react"
import { Flex } from "@chakra-ui/react"

import Emoji from "../Emoji"
import Link from "../Link"
import Text from "../OldText"
import Translation from "../Translation"

interface Props {
  artistName: string
  artistUrl?: string
}

const AssetDownloadArtist = ({ artistName, artistUrl }: Props) => {
  return (
    <Flex
      mb={4}
      border="1px"
      borderTop="none"
      borderColor="white700"
      py={2}
      px={4}
      borderRadius="0 0 4px 4px"
    >
      <Flex me={2} fontSize="md" textColor="text300">
        <Emoji text=":artist_palette:" me={2} fontSize="2xl" />
        <Translation id="page-assets-download-artist" />
      </Flex>
      {artistUrl && <Link to={artistUrl}>{artistName}</Link>}
      {!artistUrl && <Text m={0}>{artistName}</Text>}
    </Flex>
  )
}

export default AssetDownloadArtist
