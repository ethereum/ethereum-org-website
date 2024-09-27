import { useTranslation } from "next-i18next"

import Emoji from "@/components/Emoji"

import { cn } from "@/lib/utils/cn"

import { Flex } from "../ui/flex"
import { BaseLink } from "../ui/Link"

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
    <Flex className={cn("mb-4 border border-t-0", "rounded-b px-4 py-2")}>
      <Flex className="me-2">
        <Emoji text=":artist_palette:" className="me-2 text-2xl" />
        {t("page-assets-download-artist")}
      </Flex>
      {artistUrl && <BaseLink href={artistUrl}>{artistName}</BaseLink>}
      {!artistUrl && <p>{artistName}</p>}
    </Flex>
  )
}

export default AssetDownloadArtist
