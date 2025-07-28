/**
 * Checks if the NFT mint card should be displayed based on the environment variable
 * NEXT_PUBLIC_MINT_TIMESTAMP_START (timestamp in seconds)
 */
export const shouldShowNFTMintCard = (): boolean => {
  const mintTimestamp = process.env.NEXT_PUBLIC_MINT_TIMESTAMP_START

  if (!mintTimestamp) {
    return false
  }

  try {
    const mintDate = new Date(Number(mintTimestamp) * 1000)
    const now = new Date()

    // Check if the mint date has passed (or is current)
    return now >= mintDate
  } catch (error) {
    console.error("Invalid NFT_MINT_DATE format:", mintTimestamp)
    return false
  }
}
