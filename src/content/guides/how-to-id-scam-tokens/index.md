---
title: How to identify scam tokens
description: What are scam tokens, how do they make themselves look legitimate, and how to detect them to avoid the scam.
lang: en
---

# How to identify scam tokens {#how-to-identify-scam-tokens}

One of the most common uses for Ethereum is for a group to create a tradable token, in a sense their own currency. These tokens typically follow a standard, [ERC-20](/developers/docs/standards/tokens/erc-20/). However, anywhere there are legitimate use cases that bring value, there are also criminals who try to steal that value for themselves. In this case, there are two way in which they are likely to do so:

- Try to sell you *scam tokens*, which look like the legitimate token you want to purchase, but are issued by the scammers and worth nothing.
- Try to direct you into their own user interface, where they attempt to trick you into signing transactions that give them your ETH, your real tokens, etc. 

To illustrate what scam tokens are, and how to identify them, we are going to look at [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). This token attempts to look like the legitimate [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) token.

<ExpandableCard
title="What is ARB?"
contentPreview=''>

<a href="https://developer.arbitrum.io/intro/">Arbitrum</a> is an organization that develops and manages <a href="/developers/docs/scaling/optimistic-rollups/">optimistic rollups</a>. Initially Arbitrum was organized as a for-profit company, but then <a href="https://arbitrumfoundation.medium.com/arbitrum-the-next-phase-of-decentralization-e7f8b37b5226">took steps to decentralize</a>. As part of that process, they issued a tradeable <a href="/dao/#token-based-membership">governance token</a>.

</ExpandableCard>

<ExpandableCard
title="Why is the scam token called wARB?"
contentPreview=''>
  
There is a convention in Ethereum that when an asset is not ERC-20 compliant we create a "wrapped" version of it with the name starting with "w". So, for example, we have <a href="https://wbtc.network/">wBTC for bitcoin</a> and <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH for ether</a>.
  
It does not make sense to create a wrapped version of an ERC-20 token that is already on Ethereum, but scammers rely on the appearance of legitimacy rather than the underlying reality.

</ExpandableCard>


## How do scam tokens work? {#how-do-scam-tokens-work}

The whole point of Ethereum is decentralization. This means that there is no central authority that can confiscate your assets or prevent you from deploying a smart contract. But it also means that scammers can deploy any smart contract they wish.

<ExpandableCard
title="What are smart contracts?"
contentPreview=''>
  
<a href="/developers/docs/smart-contracts/">Smart contracts</a> are the programs that run on top of the Ethereum blockchain. Every ERC-20 token, for example, is implemented as a smart contract.
  
</ExpandableCard>

Specifically, Arbitrum deployed a contract that uses the symbol `ARB`. But that doesn't stop other people from also deploying a contract that uses the exact same symbol, or a similar one. Whoever writes the contract gets to set what the contract will do.

## Appearing legitimate {#appearing-legitimate}

There are several tricks that scam token creator pull to appear legitimate. They can do those, because they write the smart contract that implements the scam token. This means it can produce any effect they want from that contract.

- **Legitimate name and symbol**. As mentioned before, ERC-20 contracts can have the same symbol and name as other ERC-20 contracts. You cannot count on those fields for security.

- **Legitimate owners**. Scam tokens often airdrop significant balances to addresses that can be expected to be legitimate holders of the real token.

  For example, lets look at `wARB` again. [About 16% of the tokens](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) are held by an address whose public tag is [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f). This is *not* a fake address, it really is the address that [deployed the real ARB contract on Ethereum mainnet](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670). 
  
  Because the ERC-20 balance of an address is part of the ERC-20 contract's storage, it can be specified by the contract to be whatever the contract developer wishes. It is also possible for a contract to forbid transfers so the legitimate users won't be able to get rid of those scam tokens.

- **Legitimate transfers**. *Legitimate owners wouldn't pay to transfer a scam token around, so if there are transfers it must be legitimate, right?* Wrong. `Transfer` events are emitted by the ERC-20 contract. A scammer can easily write the contract in such a way it will emit those events, with any desired source and destination, at will. 

<ExpandableCard
title="What are Transfer events?"
contentPreview=''>
  
In theory a program running off-chain can view all the transactions that affected a particular ERC-20 contract from its initial deployment, and use that to identify transfers. In practice, doing this would require too much network bandwidth and CPU power. To allow for simpler analysis, ERC-20 contracts are <a href="https://eips.ethereum.org/EIPS/eip-20#transfer-1">required by the standard</a> to emit events tagged as transfers whenever tokens are transferred from one account to another. <a href="https://docs.alchemy.com/docs/deep-dive-into-eth_getlogs#what-are-logs-or-events">Events</a> are written to the blockchain and indexed, which makes it a lot easier to obtain and analyze on-chain data.
  
</ExpandableCard>

## Scammy appearing website {#scammy-appearing-website}

Another trick that scammers pull is to direct users to user interfaces that entice them to sign bad transactions. For example, one scam token ([view on explorer](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452)) tried to direct users to `https://op-claim.xyz`. This link probably used to host a scam. It doesn't anymore, probably because the scammer has given up and stopped paying for web hosting.

## How can you protect yourself? {#how-can-you-protect-yourself}

1. **Check the contract address**. Legitimate tokens come from legitimate organizations, and you can see the contract addresses on the organization's web site. For example, [for `ARB` you can see the legitimate addresses here](https://docs.arbitrum.foundation/deployment-addresses#token). 

2. **Real tokens have liquidity**. Another option is to look at liquidity pool size on [Uniswap](https://uniswap.org/), one of the most common token swapping protocols. This protocol works using [liquidity pools](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/pools), into which investors deposit their tokens in hope of a return from trading fees. Scam tokens typically have tiny liquidity pools, if any, because the scammers don't want to risk real assets. For example, the `ARB`/`ETH` Uniswap pool holds about a million dollars as I'm writing this ([see here for the up to date value](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) and buying or selling a small amount is not going to change the price:

   ![Buying a legitimate token](./uniswap-real.png)

   But if I try to buy `wARB`, even a tiny purchase would change the prince by over 90%:

   ![Buying a scam token](./uniswap-scam.png)

   This is another piece of evidence that shows us `wARB` is not likely to be a legitimate token.

3. **Look in Etherscan**. A lot of scam tokens have already been identified as such, and are [marked in Etherscan](https://info.etherscan.com/etherscan-token-reputation/). While Etherscan is not authoritative source of truth (it is the nature of decentralized networks that there can't be an authoritative source for legitimacy), tokens that are identified by Etherscan as scams are likely to be scams.

   ![Scam token in Etherscan](./etherscan-scam.png)
