export const shareOnTwitter = (): void => {
  const url = "https://ethereum.org/simulator" // TODO: Update with production link
  const hashtags = ["walletsimulator", "ethereum", "wallet"]
  const tweet = `${encodeURI(
    `New to Web3 and Ethereum wallets? Check out these interactive wallet simulations on ethereum.org: ${url}`
  )}`

  window.open(
    `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}`
  )
}
