import { normalizeSlug } from "@/lib/utils/url"

export const listenToPlaylists = {
  learn: [
    {
      title: "what-is-ethereum",
      audioFile: "/audio/what-is-ethereum.mp3",
      slug: "/what-is-ethereum/",
    },
    {
      title: "what-is-ether",
      audioFile: "/audio/eth.mp3",
      slug: "/eth/",
    },
    {
      title: "wallets",
      audioFile: "/audio/wallets.mp3",
      slug: "/wallets/",
    },
    {
      title: "web3",
      audioFile: "/audio/web3.mp3",
      slug: "/web3/",
    },
    {
      title: "smart-contracts",
      audioFile: "/audio/smart-contracts.mp3",
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
