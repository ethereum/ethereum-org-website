import { expect, test } from "@playwright/test"

import { parseEthereumMetrics } from "@/data-layer/fetchers/fetchEthereumMetrics"

test.describe("parseEthereumMetrics", () => {
  test("maps one CoinGecko response to both stored metric formats", () => {
    const timestamp = 1_700_000_000_000
    const result = parseEthereumMetrics(
      {
        ethereum: {
          usd: 3_500,
          usd_24h_change: 2.5,
          usd_market_cap: 420_000_000_000,
        },
      },
      timestamp
    )

    expect(result.ethPrice).toEqual({
      value: 3_500,
      timestamp,
      percentChange24h: 0.025,
    })
    expect(result.ethereumMarketcap).toEqual({
      value: 420_000_000_000,
      timestamp,
    })
  })

  test("allows CoinGecko to omit the 24-hour change", () => {
    const result = parseEthereumMetrics({
      ethereum: { usd: 3_500, usd_market_cap: 420_000_000_000 },
    })

    expect(result.ethPrice.percentChange24h).toBeUndefined()
  })

  for (const [name, response] of [
    ["price", { ethereum: { usd_market_cap: 420_000_000_000 } }],
    ["market cap", { ethereum: { usd: 3_500 } }],
  ] as const) {
    test(`rejects a response without a valid ${name}`, () => {
      expect(() => parseEthereumMetrics(response)).toThrow()
    })
  }
})
