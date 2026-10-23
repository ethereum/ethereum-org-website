---
title: Prediction markets
description: "What are prediction markets? Learn how Ethereum-based markets let anyone trade on the outcome of real-world events, and why their odds can be so accurate."
lang: en
template: use-cases
image: /images/use-cases/prediction-markets.png
sidebarDepth: 2
summaryPoints:
  - "Trade on the outcome of future events"
  - "Prices work as a live, public estimate of how likely something is"
buttons: 
  - content: Learn more
    toId: how-prediction-markets-work
  - content: Explore apps
    toId: find-a-prediction-market
    isSecondary: false
---

Prediction markets let people buy and sell shares in the outcome of future events. The price of a share shows how likely the market as a whole thinks that outcome is. They drew wide attention during the 2024 U.S. elections.

## How prediction markets work {#how-prediction-markets-work}

Each market asks a question with a clear answer, like "Will it rain in Lisbon tomorrow?". A **Yes** share pays $1 if the answer turns out to be yes and nothing if it doesn't. A **No** share works the other way round.

If Yes shares trade at 67 cents, the market is saying there's roughly a 67% chance of rain. Anyone who thinks the real chance is different can buy or sell, and that moves the price. Because people who know more have a reason to trade, new information tends to show up in the price quickly. That's why prediction markets can be useful forecasts. They are not perfect ones.

Every winning share is paid for by someone who held the losing side. Prediction markets are **zero-sum**: apart from fees, what winners make, losers lose.

## Why does this matter? {#why-does-this-matter}

Blockchain-based prediction markets add a few things that traditional betting sites and exchanges don't:

<Grid>
  <Card title="Open data" emoji="🔍" description="Every trade is recorded onchain, so anyone can check prices, volumes, and who won or lost."/>
  <Card title="Onchain settlement" emoji="🌎" description="Positions are tokens in your own wallet, and smart contracts pay out winning shares once the result is reported." />
  <Card title="Market driven odds" emoji="🤝" description="Prices are set by traders buying and selling outcome shares, rather than preset by a centralized bookmaker." />
</Grid>

Open data matters in practice. Researchers were able to [study every trade on Polymarket](https://cepr.org/publications/dp21615), covering over 2.4 million users from November 2022 to March 2026, because its trades settle on a public blockchain. That kind of independent check isn't possible on centralized platforms like Kalshi, where trading and payouts happen on the company's own systems. There is no public record to audit, and no smart contract guaranteeing that winning positions get paid.

Here's how a market runs from start to finish:

1. A market is created around a question with clear rules for how it will be decided.
2. Traders buy and sell Yes and No shares, and the price moves as they do.
3. Once the event happens, an [oracle](/developers/docs/oracles/) reports the result onchain. On Polymarket, anyone can propose the result by putting up a deposit, and anyone else can dispute it. If a dispute isn't settled, holders of the UMA token vote on the outcome.
4. Each winning share can be redeemed for $1. Losing shares are worth nothing.
5. Anyone can use the price history and trade data for research or discussion.

## Find a prediction market {#find-a-prediction-market}

These prediction markets settle trades onchain, so anyone can check prices and trade history:

<PredictionMarketLists />

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Stay mindful of the risks</strong></p>
  <p className="mt-2">Most people who trade on prediction markets lose money. Only trade what you can afford to lose, and be aware of potential addictive behaviors.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Challenges & Risks {#challenges-and-risks}

Prediction markets face real challenges that affect fairness, legality, and accuracy.

📉 **Most traders lose** – A [study of every Polymarket trade](https://cepr.org/publications/dp21615) from November 2022 to March 2026 found that about 69% of users ended with a loss. Among users who made money, the top 1% took 76.5% of the profits. The biggest winners were mostly traders who provide liquidity with limit orders, often professionally and at high volume.

🕵️ **Insider trading** – People who know the outcome in advance can profit at other traders' expense. [Researchers at Columbia Law School and the University of Haifa](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6426778) estimated that suspected informed traders made about $143 million on Polymarket between February 2024 and February 2026.

⚖️ **Disputed results** – Smart contracts can pay out automatically, but someone still has to report what happened. When a question is worded loosely or the facts are unclear, the reported result can be contested.

⚠️ **Market manipulation** – Traders with a lot of money can move prices, especially in small markets. Wash trading (trading with yourself) can make a market look busier than it is.

💧 **Liquidity issues** – Low participation ([thin liquidity](https://www.investopedia.com/terms/t/thinmarket.asp)) can make prices less reliable.

🏛 **Regulatory uncertainty** – Rules differ by country and change quickly. In the U.S., regulators and courts are still deciding whether some event contracts, especially on sports, count as financial products or gambling. Many platforms block users in certain countries.

## Experimenting with prediction markets {#experimenting-with-prediction-markets}

Prediction markets can be useful beyond trading for profit. One idea, called futarchy, goes further and uses markets to help make decisions, not just forecast them.

For example, a [Devcon Improvement Proposal](https://forum.devcon.org/t/futarchy-decision-markets-for-deciding-next-devcon/5305) (DIP) suggested that the Devcon organizers use prediction markets to forecast attendance at possible future locations. This could help them weigh which city would draw the largest event against which would be the most accessible internationally. It could also save time spent comparing visa policies, airport access, and cost of living, while showing where prospective attendees would be excited to go.

## Further reading {#further-reading}

[From prediction markets to info finance](https://vitalik.eth.limo/general/2024/11/09/infofinance.html) - Vitalik Buterin  
[Who wins and who loses in prediction markets? Evidence from Polymarket](https://cepr.org/publications/dp21615) - Akey, Grégoire, Harvie, and Martineau  
[The Augur Project Whitepaper](https://github.com/AugurProject/whitepaper)
