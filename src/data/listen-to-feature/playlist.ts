import { normalizeSlug } from "@/lib/utils/url"

import ethAudio from "@/data/audio/eth/eth.mp3"
import smartContractsAudio from "@/data/audio/smart-contracts/smart-contracts.mp3"
import walletsAudio from "@/data/audio/wallets/wallets.mp3"
import web3Audio from "@/data/audio/web3/web3.mp3"
import whatIsEthereumAudio from "@/data/audio/what-is-ethereum/what-is-ethereum.mp3"

export const listenToPlaylists = {
  learn: [
    {
      title: "what-is-ethereum",
      audioFile: whatIsEthereumAudio,
      slug: "/what-is-ethereum/",
    },
    {
      title: "what-is-ether",
      audioFile: ethAudio,
      slug: "/eth/",
    },
    {
      title: "wallets",
      audioFile: walletsAudio,
      slug: "/wallets/",
    },
    {
      title: "web3",
      audioFile: web3Audio,
      slug: "/web3/",
    },
    {
      title: "smart-contracts",
      audioFile: smartContractsAudio,
      slug: "/smart-contracts/",
    },
  ],
}

export const getPlaylistBySlug = (
  slug: string
): {
  playlist: (typeof listenToPlaylists)[keyof typeof listenToPlaylists]
  index: number
} => {
  for (const playlist of Object.values(listenToPlaylists)) {
    const index = playlist.findIndex(
      (item) => normalizeSlug(item.slug) === normalizeSlug(slug)
    )
    if (index !== -1) {
      return { playlist, index }
    }
  }
  return { playlist: [], index: -1 }
}
