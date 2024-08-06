import { useTranslation } from "next-i18next"
import { Flex } from "@chakra-ui/react"

import Emoji from "@/components/Emoji"
import Link from "@/components/Link"
import Text from "@/components/OldText"

type AssetDownloadArtistProps = {
  artistName: string
  artistUrl?: string
}

const AssetDownloadArtist = ({
  artistName,
  artistUrl,
}: AssetDownloadArtistProps) => {
  const { t } = useTranslation("page-assets")
  return (
    <Flex
      mb="4"
      border="1px"
      borderTop="none"
      borderColor="white700"
      py="2"
      px="4"
      borderRadius="0 0 4px 4px"
    >
      <Flex me="2" fontSize="md" textColor="text300">
        <Emoji text=":artist_palette:" me="2" fontSize="2xl" />
        {t("page-assets-download-artist")}
      </Flex>
      {artistUrl && <Link href={artistUrl}>{artistName}</Link>}
      {!artistUrl && <Text m="0">{artistName}</Text>}
    </Flex>
  )
}

export default AssetDownloadArtist
