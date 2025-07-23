/**
 * Checks if the NFT mint card should be displayed based on the environment variable
 * NEXT_PUBLIC_NFT_MINT_DATE (ISO date string)
 */
export const shouldShowNFTMintCard = (): boolean => {
  const mintDateEnv = process.env.NEXT_PUBLIC_NFT_MINT_DATE

  if (!mintDateEnv) {
    return false
  }

  // TODO: testing purposes, remove before merging
  return true

  // try {
  //   const mintDate = new Date(mintDateEnv)
  //   const now = new Date()

  //   // Check if the mint date has passed (or is current)
  //   return now >= mintDate
  // } catch (error) {
  //   console.error("Invalid NFT_MINT_DATE format:", mintDateEnv)
  //   return false
  // }
}
