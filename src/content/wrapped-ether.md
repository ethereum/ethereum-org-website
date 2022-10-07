---
title: Wrapped Ether (WETH)
description: An introduction to Wrapped Ether (WETH)—an ERC-20 compatible version of Ether (ETH). 
---

# What Is Wrapped Ether (WETH)? {#what-is-wrapped-ether-weth}    
   
Wrapped Ether (WETH) is an ERC-20 token representing [Ether](/eth/), Ethereum’s native token. WETH is called a [wrapped token](https://academy.binance.com/en/articles/what-are-wrapped-tokens) because it derives value from another cryptocurrency (Ether in this case). 

Wrapped tokens are so-called because the original cryptocurrency is deposited into a wrapper—similar to a digital bank vault—before a wrapped version of the cryptocurrency is created. For example, wrapping Ether involves depositing ETH into a smart contract that creates an amount of WETH equal to the original deposit. You can also “unwrap” Ether by sending WETH to a smart contract and receiving ETH in return. 

Locking up ETH before minting new WETH tokens ensures every amount of WETH in circulation is backed by an equal amount of ETH held in reserves. This keeps the values of  WETH and ETH equal, such that you can convert WETH to ETH (and vice-versa) at a 1:1 ratio.

Wrapped Ether (WETH) and other wrapped tokens are similar to [stablecoins](/stablecoins/), as their value is pegged to the value of other assets. But while stablecoins are backed by US dollars held in off-chain reserves, WETH is collateralized by ETH issued on the Ethereum blockchain.
  
## Why do we need to wrap ETH? {#why-do-we-need-to-wrap-eth} 

The [ERC-20 token standard](/developers/docs/standards/tokens/erc-20/) was to ensure greater interoperability and compatibility between products and services in the Ethereum ecosystem. ERC-20 defines a standard interface for [fungible](https://www.investopedia.com/terms/f/fungibility.asp) tokens on Ethereum, making it easier for developers to build [decentralized applications](/dapps/) that can interact with tokens conforming to this standard. 

But the creation of Ether predates the [introduction of ERC-20](https://eips.ethereum.org/EIPS/eip-20), meaning ETH tokens don’t conform to the ERC-20 token interface. This means users cannot exchange ETH directly for other ERC-20 tokens—not without introducing trusted third parties or complex technical processes—and limits the functionality of ETH tokens for users.

Wrapped Ether (WETH) was [created to make Ether compatible with applications](https://blog.0xproject.com/canonical-weth-a9aa7d0279dd) implementing ERC-20 token interfaces. The WETH token is a representation of Ether that complies with the ERC-20 token standard whose value is backed by ETH locked up during the wrapping process. 

As an ERC-20 token, WETH has more versatile use-cases—unlike ETH, which is limited to making payments and [paying for computation](/developers/docs/gas/) on the Ethereum network. Some of the things you can do with WETH include: 

- Make payments in dapps

- [Trading WETH for tokens](/defi/#swaps) 

- Use WETH as collateral to [borrow funds](/defi/#borrowing-privacy)

- Supply liquidity to [lending platforms](/defi/#lending)

## How does Wrapped Ether (WETH) work? {#how-does-wrapped-ether-weth-work} 

To wrap ETH, you need to send it to a [smart contract](/smart-contracts/) which mints an equivalent amount of Wrapped ETH (WETH). This smart contract acts as a custodian as it holds your ETH until you decide to unwrap WETH. You can also swap ETH for WETH directly on a [decentralized exchange](/get-eth/#dex) without needing to interact with a smart contract. 

The process of unwrapping ETH is similar: send WETH to the smart contract and have an equivalent amount of ETH sent to your address. Whenever you redeem WETH for ETH, those tokens are [burned](https://decrypt.co/resources/what-is-a-token-burn-how-crypto-is-removed-from-circulation) (to keep the supply of WETH and ETH equal and enforces parity in prices). You can also unwrap ETH by swapping WETH for ETH using a decentralized exchange.  

## Wrapped Ether (WETH) vs Ether (ETH): What is the difference? {#weth-vs-eth-differences}
 
### Control of supply, ownership, and transfer {#control-of-supply-ownership-transfer} 

#### Supply of ETH vs WETH

As Ethereum's native token, the supply of Ether is managed at the protocol level. New units of ETH are produced as a result of the Ethereum protocol [issuing rewards](/glossary/#issuance) to validators processing transactions and adding new blocks to the chain. Also, a portion of Ether paid for gas (the [base fee](/glossary/#base-fee)) is also burned during every transaction, removing those ETH tokens from circulation. 

As a token, the supply of WETH is managed at the smart contract level. New units of WETH are issued by a token contract deployed on the Ethereum network. The contract monitors the supply of WETH and has mechanisms for increasing or reducing the amount of WETH tokens in circulation through minting and burning, respectively. 

#### Ownership of ETH vs WETH 

The Ethereum protocol handles ownership of Ether. For example, Ether balances of [Ethereum accounts](/developers/docs/accounts/) are stored as part of the blockchain's state—making it visible to any participant on the network. To send Ether, you need to sign a transaction transferring ETH to another address (after signing with your [private key](/glossary/#private-key) to prove ownership of funds) 

Conversely, the [WETH token contract](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) controls ownership and transfer of WETH tokens. For example, balances of WETH token owners are stored in the contract as [key-value pairs](https://www.techtarget.com/searchenterprisedesktop/definition/key-value-pair) where the key (an address) maps to a value (the total tokens owned by an account). To send WETH to another address, you need to sign a transaction calling the smart contract's `transfer` function with the recipient's address and amount of tokens supplied as transaction parameters. 

#### Uses of ETH vs WETH {#use-cases} 

Ether is primarily used for transferring value between users and compensating nodes providing computational resources on the network. ETH is also used to secure the Ethereum network: validators processing transactions and producing new blocks must [deposit a bond paid in ETH](/staking/) before assuming this role. If a validator acts maliciously and attempts to subvert protocol rules, their ETH deposit will be [slashed](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/#slashing) (destroyed) as punishment. 

As an ERC-20 representation of Ether, WETH has a completely different use-case: making it easier to use ETH in dapps. Because ETH isn’t ERC-20 compatible, developers would need to create separate interfaces (one for Ether and another for ERC-20 tokens) in a smart contract. Wrapping ETH in ERC-20 standards removes this obstacle and enables developers to handle ETH and other fungible tokens within the same contract. 

With the ERC-compatible WETH, you can access more functionalities than is possible with regular ETH tokens. WETH is particularly popular for users interacting with [decentralized finance](/defi/) (DeFi) applications. At its core, DeFi is a collection of primitives that allow for trading, borrowing, and exchanging assets with others without intermediaries. 

DeFi enables even more complex use-cases, such as [yield farms](https://blockworks.co/what-is-yield-farming-what-you-need-to-know/) and [automated market makers](https://www.gemini.com/cryptopedia/amm-what-are-automated-market-makers) (AMMs) that can make investment decisions—like depositing into a lending pool or executing trades—for users. But these applications need access to your funds to work, which is why ERC-20 tokens like WETH define an `approve` function that allows you to approve other accounts to deduct a specific amount of tokens from your balance up to a predefined limit (`allowance`). 

#### Security properties of ETH vs WETH

As an asset native to Ethereum, the security of Ether is guaranteed by the Ethereum network—no one can steal your funds unless they have access to your private keys. Even in a [51% attack](https://academy.binance.com/en/glossary/51-percent-attack), attackers cannot create forged transactions to transfer ETH from your address without approval. In other words, your ETH remains safe as long as your private keys are safe. 

Wrapped Ether (WETH) is not issued and secured by the Ethereum network, so using WETH comes with different layers of risks. The security of your WETH largely depends on the smart contract holding ETH deposits and minting WETH tokens for users. Possible attack scenarios include:

1. An attacker could exploit the WETH contract and mint WETH tokens without depositing Ether (the equivalent of printing money out of thin air). If the attacker successfully redeems these tokens for actual ETH, other owners will be unable to access their Ether deposits. 

2. An attacker could exploit a vulnerability in the contract and drain the funds of users who deposited ETH during the wrapping process. This would leave users with valueless WETH tokens without any backing. 

3. Beyond scenarios involving malicious actors, a bug in the smart contract could prevent you from unwrapping ETH and withdrawing your locked-up assets.
 
## Frequently Asked Questions (FAQs) {#frequently-asked-questions} 

**Are ETH and WETH the same?**

No. Ether (ETH) is the native coin of the Ethereum blockchain, used as a unit of payment on the Ethereum network (including paying for transaction fees). Wrapped Ether (WETH) is an ERC-20-compatible version of ETH primarily designed to make ETH tokens compatible with applications built on the ERC-20 standard. 

**Do you pay to wrap ETH?**

No, you don’t pay to wrap ETH into WETH, as the assets are converted at a 1:1 ratio. However, interacting with the WETH contract to wrap ETH involves sending an on-chain transaction—and this requires paying a gas fee. You'll also pay gas when unwrapping ETH through a smart contract. 

**Are WETH and ETH the same price?**

WETH is pegged 1:1 to the price of ETH, so the value of both assets are usually equal at any time. This peg is maintained by ensuring that every unit of WETH is backed by ETH held in reserves. Forces of supply and demand also keep the prices of ETH and WETH relatively equal: 
- If WETH were cheaper, more people would buy it and convert it to the more expensive ETH at a 1:1 ratio to make profit. This would drive up demand for WETH and increase the price of WETH tokens. 
- If WETH is more expensive, more people would buy ETH and convert it to WETH to sell at a profit. As the supply of WETH increases, the value of WETH tokens would drop—keeping the peg relatively stable. 

**Why do people use WETH instead of ETH?**

WETH was created primarily because the ETH token doesn't comply with the ERC-20 technical standard. This made Ether infeasible for use in decentralized applications (dapps) that only support ERC-20 tokens. Unlike Ether, WETH follows the [ERC-20 fungible token standard](/developers/docs/standards/tokens/erc-20/) —so it can be exchanged for other ERC-20 tokens and used on applications (e.g., decentralized exchanges and wallets) that support ERC-20 interfaces.

**Is WETH safe?**

While WETH is safe, it isn’t as safe as holding ETH in your wallet. For example, If ETH locked in the WETH contract is stolen, the value of WETH tokens would plummet as they would have no backing assets.

**What can I do with WETH?**

WETH can be used with any decentralized application built on the ERC-20 standard. WETH is particularly useful for decentralized finance (DeFi) applications—you can [exchange WETH for other tokens](/defi/#swaps) on a decentralized exchange, use it as collateral to [borrow funds](/defi/#borrowing-privacy), or supply liquidity to [lending platforms](/defi/#lending) in order to earn interest. 

## Further reading {#further-reading}

- [WTF is WETH?](https://weth.io/)
- [What Is Wrapped Ether (WETH) and How to Wrap It?](https://academy.binance.com/en/articles/what-is-wrapped-ether-weth-and-how-to-wrap-it)
- [What is Wrapped Ether (wETH) and how does it work?](https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work/amp)
- [What are the cheapest ways to wrap ETH into WETH with the lowest gas fees?](https://medium.com/@therugpush/cheapest-way-to-wrap-eth-into-weth-446cf1ddccf7) 
