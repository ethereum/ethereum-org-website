import { COINGECKO_API_BASE_URL, COINGECKO_API_URL_PARAMS } from "../constants"

export async function fetchEthereumEcosystemData() {
  const url = `${COINGECKO_API_BASE_URL}ethereum-ecosystem${COINGECKO_API_URL_PARAMS}`

  try {
    const ethereumEcosystemData = await fetch(url).then((res) => res.json())

    return ethereumEcosystemData
  } catch (error) {
    // In production mode, throw an error to stop the build in case this fetch fails
    console.error(error)
    throw new Error(
      "Something went wrong with requesting the Ethereum ecosystem data."
    )
  }
}

export async function fetchEthereumStablecoinsData() {
  const url = `${COINGECKO_API_BASE_URL}stablecoins${COINGECKO_API_URL_PARAMS}`

  try {
    const ethereumStablecoinsData = await fetch(url).then((res) => res.json())

    return ethereumStablecoinsData
  } catch (error) {
    // In production mode, throw an error to stop the build in case this fetch fails
    console.error(error)
    throw new Error(
      "Something went wrong with requesting the Ethereum ecosystem data."
    )
  }
}
