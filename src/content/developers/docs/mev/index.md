---
title: Maximal extractable value (MEV)
description: An introduction to maximal extractable value (MEV)
lang: en
sidebar: true
preMergeBanner: true
---

Maximal extractable value (MEV) refers to the maximum value that can be extracted from block production in excess of the standard block reward and gas fees by including, excluding, and changing the order of transactions in a block.

### Miner extractable value

This concept was first applied in the context of [proof-of-work](/developers/docs/consensus-mechanisms/pow/), and was initially referred to as "miner extractable value". This is because in proof-of-work, miners control transaction inclusion, exclusion, and ordering. However, after the transition to proof-of-stake via [The Merge](/upgrades/merge) validators will be responsible for these roles, and mining will no longer be applicable. The value extraction methods here will still persist after this transition, and thus the term "miner extractable value" is no longer valid. "Maximal extractable value" is now used as a more inclusive replacement.

## Prerequisites {#prerequisites}

Make sure you're familiar with [transactions](/developers/docs/transactions/), [blocks](/developers/docs/blocks/), [gas](/developers/docs/gas/), and [mining](/developers/docs/consensus-mechanisms/pow/mining/). Familiarity with [dapps](/dapps/) and [DeFi](/defi/) is helpful as well.

## MEV extraction {#mev-extraction}

In theory MEV accrues entirely to miners/validators because they are the only party that can guarantee the execution of a profitable MEV opportunity. In practice, however, a large portion of MEV is extracted by independent network participants referred to as "searchers." Searchers run complex algorithms on blockchain data to detect profitable MEV opportunities and have bots to automatically submit those profitable transactions to the network.

Miners/validators do get a portion of the full MEV amount anyway because searchers are willing to pay high gas fees (which go to the miner/validator) in exchange for higher likelihood of inclusion of their profitable transactions in a block. Assuming searchers are economically rational, the gas fee that a searcher is willing to pay will be an amount up to 100% of the searcher's MEV (because if the gas fee was higher, the searcher would lose money).

With that, for some highly competitive MEV opportunities, such as [DEX arbitrage](#mev-examples-dex-arbitrage), searchers may have to pay 90% or even more of their total MEV revenue in gas fees to the miner/validator because so many people want to run the same profitable arbitrage trade. This is because the only way to guarantee that their arbitrage transaction runs is if they submit the transaction with the highest gas price.

### Gas golfing {#mev-extraction-gas-golfing}

This dynamic has made being good at "gas golfing" — programming transactions so that they use the least amount of gas — a competitive advantage, because it allows searchers to set a higher gas price while keeping their total gas fees constant (since gas fees = gas price \* gas used).

A few well-known gas golf techniques include: using addresses that start with a long string of zeroes (e.g. [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)) since they take less space (and hence gas) to store; and leaving small [ERC-20](/developers/docs/standards/tokens/erc-20/) token balances in contracts, since it costs more gas to initialize a storage slot (the case if the balance is 0) than to update a storage slot. Finding more techniques to reduce gas usage is an active area of research among searchers.

### Generalized frontrunners {#mev-extraction-generalized-frontrunners}

Rather than programming complex algorithms to detect profitable MEV opportunities, some searchers run generalized frontrunners. Generalized frontrunners are bots that watch the mempool to detect profitable transactions. The frontrunner will copy the potentially profitable transaction's code, replace addresses with the frontrunner's address, and run the transaction locally to double-check that the modified transaction results in a profit to the frontrunner's address. If the transaction is indeed profitable, the frontrunner will submit the modified transaction with the replaced address and a higher gas price, "frontrunning" the original transaction and getting the original searcher's MEV.

### Flashbots {#mev-extraction-flashbots}

Flashbots is an independent project which extends the go-ethereum client with a service that allows searchers to submit MEV transactions to miners without revealing them to the public mempool. This prevents transactions from being frontrun by generalized frontrunners.

As of this writing, a significant portion of MEV transactions is routed through Flashbots, meaning generalized frontrunners aren't as effective as they used to be.

## MEV examples {#mev-examples}

MEV emerges on the blockchain in a few ways.

### DEX arbitrage {#mev-examples-dex-arbitrage}

[Decentralized exchange](/glossary/#dex) (DEX) arbitrage is the simplest and most well-known MEV opportunity. As a result, it is also the most competitive.

It works like this: if two DEXes are offering a token at two different prices, someone can buy the token on the lower-priced DEX and sell it on the higher-priced DEX in a single, atomic transaction. Thanks to the mechanics of the blockchain, this is true, riskless arbitrage.

[Here's an example](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) of a profitable arbitrage transaction where a searcher turned 1,000 ETH into 1,045 ETH by taking advantage of different pricing of the ETH/DAI pair on Uniswap vs. Sushiswap.

### Liquidations {#mev-examples-liquidations}

Lending protocol liquidations present another well-known MEV opportunity.

Lending protocols like Maker and Aave function by requiring users to deposit some sort of collateral (e.g. ETH). Users can then borrow different assets and tokens from others depending on what they need (for example, they may borrow MKR if they want to vote on a MakerDAO governance proposal or SUSHI if they want to earn a portion of trading fees on Sushiswap) up to a certain amount of their deposited collateral — for instance, 30% (the exact borrowing power percentage is determined by the protocol). The users they borrow the other tokens from function as lenders in this case.

As the value of a borrower's collateral fluctuates, so too does their borrowing power. If, due to market fluctuations, the value of borrowed assets exceeds say, 30% of the value of their collateral (again, the exact percentage is determined by the protocol), the protocol typically allows anyone to liquidate the collateral, instantly paying off the lenders (this is similar to how [margin calls](https://www.investopedia.com/terms/m/margincall.asp) work in traditional finance). If liquidated, the borrower usually has to pay a hefty liquidation fee, some of which goes to the liquidator — which is where the MEV opportunity comes in.

Searchers compete to parse blockchain data as fast as possible to determine which borrowers can be liquidated and be the first to submit a liquidation transaction and collect the liquidation fee for themselves.

### Sandwich trading {#mev-examples-sandwich-trading}

Sandwich trading is another common method of MEV extraction.

To sandwich, a searcher will watch the mempool for large DEX trades. For instance, suppose someone wants to buy 10,000 UNI with DAI on Uniswap. A trade of this magnitude will have a meaningful effect on the UNI/DAI pair, potentially significantly raising the price of UNI relative to DAI.

A searcher can calculate the approximate price effect of this large trade on the UNI/DAI pair and execute an optimal buy order immediately _before_ the large trade, buying UNI cheaply, then execute a sell order immediately _after_ the large trade, selling it for the higher price caused by the large order.

Sandwiching, however, is riskier as it isn't atomic (unlike DEX arbitrage, as described above) and is prone to a [salmonella attack](https://github.com/Defi-Cartel/salmonella).

### NFT MEV {#mev-examples-nfts}

MEV in the NFT space is an emergent phenomenon, and isn't necessarily profitable.

However, since NFT transactions happen on the same blockchain shared by all other Ethereum transactions, searchers can use similar techniques as those used in traditional MEV opportunities in the NFT market too.

For example, if there's a popular NFT drop and a searcher wants a certain NFT or set of NFTs, they can program a transaction such that they are the first in line to buy the NFT, or they can buy the entire set of NFTs in a single transaction. Or if an NFT is [mistakenly listed at a low price](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), a searcher can frontrun other purchasers and snap it up for cheap.

One prominent example of NFT MEV occurred when a searcher spent $7 million to [buy](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) every single Cryptopunk at the price floor. A blockchain researcher [explained on Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) how the buyer worked with an MEV provider to keep their purchase secret.

### The long tail {#mev-examples-long-tail}

DEX arbitrage, liquidations, and sandwich trading are all very well-known MEV opportunities and are unlikely to be profitable for new searchers. However, there is a long tail of lesser known MEV opportunities (NFT MEV is arguably one such opportunity).

Searchers who are just getting started may be able to find more success by searching for MEV in this longer tail. Flashbot's [MEV job board](https://github.com/flashbots/mev-job-board) lists some emerging opportunities.

## Effects of MEV {#effects-of-mev}

MEV is not all bad — there are both positive and negative consequences to MEV on Ethereum.

### The good {#effects-of-mev-the-good}

Many DeFi projects rely on economically rational actors to ensure the usefulness and stability of their protocols. For instance, DEX arbitrage ensures that users get the best, most correct prices for their tokens, and lending protocols rely on speedy liquidations when borrowers fall below collateralization ratios to ensure lenders get paid back.

Without rational searchers seeking and fixing economic inefficiencies and taking advantage of protocols' economic incentives, DeFi protocols and dapps in general may not be as robust as they are today.

### The bad {#effects-of-mev-the-bad}

At the application layer, some forms of MEV, like sandwich trading, result in an unequivocally worse experience for users. Users who are sandwiched face increased slippage and worse execution on their trades.

At the network layer, generalized frontrunners and the gas-price auctions they often engage in (when two or more frontrunners compete for their transaction to be included in the next block by progressively raising their own transactions' gas price) result in network congestion and high gas prices for everyone else trying to run regular transactions.

Beyond what's happening _within_ blocks, MEV can have deleterious effects _between_ blocks. If the MEV available in a block significantly exceeds the standard block reward, miners may be incentivized to remine blocks and capture the MEV for themselves, causing blockchain re-organization and consensus instability.

This possibility of blockchain re-organization has been [previously explored on the Bitcoin blockchain](https://dl.acm.org/doi/10.1145/2976749.2978408). As Bitcoin's block reward halves and transaction fees make up a greater and greater portion of the block reward, situations arise where it becomes economically rational for miners to give up the next block's reward and instead remine past blocks with higher fees. With the growth of MEV, the same sort of situation could occur in Ethereum, threatening the integrity of the blockchain.

## State of MEV {#state-of-mev}

MEV extraction ballooned in early 2021, resulting in extremely high gas prices in the first few months of the year. The emergence of Flashbots's MEV relay has reduced the effectiveness of generalized frontrunners and has taken gas price auctions off-chain, lowering gas prices for ordinary users.

While many searchers are still making good money from MEV, as opportunities become more well-known and more and more searchers compete for the same opportunity, miners/validators will capture more and more total MEV revenue (because the same sort of gas auctions as originally described above also occur in Flashbots, albeit privately, and miners will capture the resulting gas revenue). MEV is also not unique to Ethereum, and as opportunities become more competitive on Ethereum, searchers are moving to alternate blockchains like Binance Smart Chain, where similar MEV opportunities as those on Ethereum exist with less competition.

As DeFi grows and increases in popularity, MEV may soon significantly outweigh the base Ethereum block reward. With that comes a growing possibility of selfish block remining and consensus instability. Some consider this to be an existential threat to Ethereum, and disincentivizing selfish mining is an active area of research in Ethereum protocol theory. One solution currently being explored is [MEV reward smoothing](https://ethresear.ch/t/committee-driven-mev-smoothing/10408).

## Related resources {#related-resources}

- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _Dashboard and live transaction explorer for MEV transactions_

## Further reading {#further-reading}

- [What Is Miner-Extractable Value (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV and Me](https://research.paradigm.xyz/MEV)
- [Ethereum is a Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Escaping the Dark Forest](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning the MEV Crisis](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV Threads](https://twitter.com/bertcmiller/status/1402665992422047747)
