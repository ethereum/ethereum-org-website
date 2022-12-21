---
title: Wrapped Ether (WETH)
description: An introduction to Wrapped Ether (WETH)—an ERC-20 compatible version of Ether (ETH). 
---

# What Is Wrapped Ether (WETH)? {#what-is-wrapped-ether-weth}    

Wrapped Ether (WETH) is an ERC-20 token representing [Ether](/eth/), Ethereum’s native cryptocurrency. [Wrapped tokens](https://academy.binance.com/en/articles/what-are-wrapped-tokens) are so-called because the original cryptocurrency is deposited into a wrapper—similar to a digital bank vault—before a wrapped version of the cryptocurrency is created. For example, wrapping Ether involves depositing ETH into a smart contract that creates an amount of WETH equal to the original deposit; you can also “unwrap” Ether by sending WETH to a smart contract and receiving ETH in return. 

Locking up ETH before minting new WETH tokens ensures every amount of WETH in circulation is backed by an equal amount of ETH held in reserves. This keeps the values of  WETH and ETH equal, such that you can convert WETH to ETH (and vice-versa) at a 1:1 ratio.

Wrapped Ether (WETH) and other wrapped tokens are similar to [stablecoins](/stablecoins/), as their value is pegged to the value of other assets. But while stablecoins are backed by US dollars held in off-chain reserves, WETH is collateralized by ETH issued on the Ethereum blockchain.
  
## Why do we need to wrap ETH? {#why-do-we-need-to-wrap-eth} 

The [ERC-20 token standard](/developers/docs/standards/tokens/erc-20/) was introduced to ensure greater interoperability and compatibility between products and services in the Ethereum ecosystem. ERC-20 defines a standard interface for [fungible](https://www.investopedia.com/terms/f/fungibility.asp) tokens on Ethereum, making it easier for developers to build [decentralized applications](/dapps/) that can interact with tokens conforming to this standard. 

But the creation of Ether predates the [introduction of the ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20), so ETH tokens don’t conform to the ERC-20 token interface. This means users cannot exchange ETH directly for other ERC-20 tokens (not without introducing trusted third parties or complex technical processes), which limits the functionality of ETH tokens for users.

Wrapped Ether (WETH) was created to [make Ether compatible with applications](https://blog.0xproject.com/canonical-weth-a9aa7d0279dd) implementing ERC-20 token interfaces. The WETH token is a representation of Ether that complies with the ERC-20 token standard whose value is backed by ETH locked up during the wrapping process. 

As an ERC-20 token, WETH has more versatile use-cases, unlike ETH which is limited to making payments and [paying for computation](/developers/docs/gas/) on the Ethereum network. Some of the things you can do with WETH include: 

- Make payments in dapps

- [Exchange WETH for other tokens](/defi/#swaps) 

- Use WETH as collateral to [borrow funds](/defi/#borrowing-privacy)

- Supply liquidity to [lending platforms](/defi/#lending)

## How does Wrapped Ether (WETH) work? {#how-does-wrapped-ether-weth-work} 

To wrap ETH, you need to send it to a [smart contract](/smart-contracts/) that mints an equivalent amount of Wrapped ETH (WETH) for you. This smart contract acts as a custodian as it holds your ETH until you decide to unwrap WETH. You can also swap ETH for WETH directly on a [decentralized exchange](/get-eth/#dex) without needing to interact with a smart contract. 

The process of unwrapping ETH is similar: send WETH to the smart contract and have an equivalent amount of ETH sent to your address. Whenever you redeem WETH for ETH, the WETH tokens are [burned](https://decrypt.co/resources/what-is-a-token-burn-how-crypto-is-removed-from-circulation), which keeps the supply of WETH and ETH equal and enforces parity in prices. You can also unwrap ETH by swapping WETH for ETH directly using a decentralized exchange.  

Wrapping ETH to to WETH doesn't incur additional costs, as both assets are converted at a 1:1 ratio. Nevertheless, you'll need to have some extra ETH in your wallet to pay for gas fees when interacting with the WETH token contract. Gas fees on the Ethereum network—paid for performing computation—are paid solely in Ether (demoninated in gwei). 

## Wrapped Ether (WETH) vs Ether (ETH): What is the difference? {#weth-vs-eth-differences}

Although they look similar, Wrapped Ether (WETH) and Ether (ETH) have subtle differences you should be aware of. For example, Ether is recognized by the Ethereum protocol, but the blockchain has no native knowledge of ERC-20 tokens like WETH—which causes differences in how both tokens behave. Below are some of the major distinctions between ETH and WETH tokens: 
 
### Control of supply, ownership, and transfer {#control-of-supply-ownership-transfer} 

#### Supply of ETH vs WETH {#eth-vs-weth-supply}

As Ethereum's native token, the supply of Ether is managed at the protocol level. New units of ETH are produced as a result of the Ethereum protocol [issuing rewards](/glossary/#issuance) to validators processing transactions and adding new blocks to the chain. Also, a portion of Ether paid for gas (the [base fee](/glossary/#base-fee)) is also burned during every transaction, removing those ETH tokens from circulation. 

As an ERC-20 token, the supply of WETH is managed at the smart contract level. New units of WETH are issued by a token contract deployed on the Ethereum network. The contract monitors the supply of WETH and has mechanisms for increasing or reducing the amount of WETH tokens in circulation through [minting](/glossary/#mint) and burning, respectively. 

#### Ownership and transfer of ETH vs WETH {#eth-vs-weth-ownership-transfer}

The Ethereum protocol defines and handles the ownership of Ether on the Ethereum network. Ether balances associated with [Ethereum accounts](/developers/docs/accounts/) are stored in the blockchain's [state](/glossary/#state) as [key-value pairs](https://www.techtarget.com/searchenterprisedesktop/definition/key-value-pair) where each *key* (an address) maps to a *value* (the amount of Ether owned by an account). Since Ether balances are stored in-protocol, [wallet applications](/wallets/) with access to the blockchain's state can automatically track ETH balances associated with any address.  

Transferring ETH to another account requires creating a `send` transaction with the recipient's address as the destination (after signing with your [private key](/glossary/#private-key) to prove ownership of funds). As with any other Ethereum transaction, sending ETH demands paying a gas fee which is demoninated in [gwei](/glossary/#gwei) (a unit of Ether).

Unlike ETH, the ownership and transfer of WETH tokens is handled by the [WETH token contract](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2). Balances of WETH token owners are stored **inside the contract** as key-value pairs where a key (an address) maps to a value (the total tokens owned by an account). As such, a wallet application cannot automatically track changes in your WETH balance unless you explictly ask the wallet application to "watch" the WETH token contract (i.e., read the contract's state).  

Sending WETH tokens also requires a different approach: you'll have to create a transaction with the WETH token contract's address (not the recipient's address) as the destination. This transaction calls the smart contract's `transfer` function with the recipient's address and amount of tokens to transfer supplied as transaction parameters. While this transaction is recorded on the blockchain, the actual transfer of WETH tokens from one address to another occurs inside the token contract and isn't recorded directly on the blockchain (hence, it is described as an [internal transaction](https://coinmarketcap.com/alexandria/glossary/internal-transaction)). 

You cannot pay gas for a transaction using WETH tokens. Only Ethereum's native token, ETH, can be used to pay gas. This is why you must have some ETH in your wallet when wrapping/unwrapping ETH or sending WETH to another address. 

### Uses of ETH vs WETH {#eth-vs-weth-use-cases} 

Ether is primarily used for transferring value between users and compensating validators securing the network. ETH is also used as collateral by validators. They stake ETH into a smart contract so that it can be destroyed if they act maliciously. 

The main use case for WETH is making it easier to use ETH in dapps. Because ETH isn’t ERC-20 compatible, developers would need to create separate interfaces (one for Ether and another for ERC-20 tokens) in smart contracts. Wrapping ETH in ERC-20 standards removes this obstacle and enables developers to handle ETH and other fungible tokens within the same contract. 

With the ERC-compatible WETH, you can access more functions than with regular ETH. WETH is particularly popular for users interacting with [decentralized finance](/defi/) (DeFi) applications. At its core, DeFi is a collection of primitives that allow for trading, borrowing, and exchanging assets with others without intermediaries. 

DeFi enables even more complex use-cases, such as [yield farms](https://blockworks.co/what-is-yield-farming-what-you-need-to-know/) and [automated market makers](https://www.gemini.com/cryptopedia/amm-what-are-automated-market-makers) (AMMs) that can make investment decisions—like depositing into a lending pool or executing trades—for users. But these applications need access to your funds to work, which is why ERC-20 tokens like WETH define an `approve` function (used in combination with `transfer`) that allows you to approve other accounts (mostly contract accounts) to deduct a specific amount of tokens from your balance up to a predefined limit (`allowance`). 

### Security properties of ETH vs WETH {#eth-vs-weth-security-properties}

As an asset native to Ethereum, the security of ETH is guaranteed by the Ethereum network—no one can steal your funds unless they have access to your private keys. Even in a [51% attack](https://academy.binance.com/en/glossary/51-percent-attack), attackers cannot create forged transactions to transfer ETH from your address without approval. In other words, your ETH remains safe as long as your private keys are safe. 

Wrapped Ether (WETH) is not issued and secured by the Ethereum network, so using WETH comes with different layers of risks. The security of your WETH largely depends on the smart contract holding ETH deposits and minting WETH tokens for users. Possible attack scenarios include:

1. An attacker could exploit the WETH contract and mint WETH tokens without depositing Ether (the equivalent of printing money out of thin air). If the attacker successfully redeems these tokens for actual ETH, other owners will be unable to access their Ether deposits. 

2. An attacker could exploit a vulnerability in the contract and drain the funds of users who deposited ETH during the wrapping process. This would leave users with valueless WETH tokens without any backing. 

3. Beyond scenarios involving malicious actors, a bug in the smart contract could prevent you from unwrapping ETH and withdrawing your locked-up assets.
 
## Frequently Asked Questions about Wrapped Ether (WETH) {#weth-frequently-asked-questions} 

**Are ETH and WETH the same?**

No. Ether (ETH) is the native coin of the Ethereum blockchain, used as a unit of payment on the Ethereum network (including paying for transaction fees). Wrapped Ether (WETH) is an ERC-20-compatible version of ETH primarily designed to make ETH tokens compatible with applications built on the ERC-20 standard. 

**Do you pay to wrap ETH?**

No, you don’t pay to wrap ETH into WETH, as the assets are converted at a 1:1 ratio. However, interacting with the WETH contract to wrap ETH involves sending an on-chain transaction—and this requires paying a gas fee. You'll also pay gas when unwrapping ETH through a smart contract. 

**Are WETH and ETH the same price?**

WETH is pegged 1:1 to the price of ETH, so the value of both assets are usually equal at any time. This peg is maintained by ensuring that every unit of WETH is backed by ETH held in reserves. Forces of supply and demand also keep the prices of ETH and WETH relatively equal: 

- If WETH were cheaper, more people would buy it and convert it to the more expensive ETH at a 1:1 ratio to make profit. This would drive up demand for WETH and increase the price of WETH tokens. 
- If WETH is more expensive, more people would buy ETH and convert it to WETH to sell at a profit. As the supply of WETH increases, the value of WETH tokens would drop—keeping the peg relatively stable. 

**Why do people use WETH instead of ETH?**

WETH was created primarily because the ETH token doesn't comply with the ERC-20 technical standard. This made Ether difficult to use in decentralized applications (dapps). Unlike Ether, WETH follows the [ERC-20 fungible token standard](/developers/docs/standards/tokens/erc-20/) —so it can be exchanged for other ERC-20 tokens and used on applications (e.g., decentralized exchanges and wallets) that support ERC-20 interfaces.

**Is WETH safe?**

ETH is the safest asset because it is part of the Ethereum protocol, whereas WETH is defined in a smart contract which could feasibly be hacked. WETH is generally considered a very safe asset because the contract is small, simple, well-tested and it has been around for a long time.

**What can I do with WETH?**

WETH can be used with any decentralized application built on the ERC-20 standard. WETH is particularly useful for decentralized finance (DeFi) applications—you can [exchange WETH for other tokens](/defi/#swaps) on a decentralized exchange, use it as collateral to [borrow funds](/defi/#borrowing-privacy), or supply liquidity to [lending platforms](/defi/#lending) in order to earn interest. 

## Further reading {#further-reading}

- [WTF is WETH?](https://weth.io/)
- [What Is Wrapped Ether (WETH) and How to Wrap It?](https://academy.binance.com/en/articles/what-is-wrapped-ether-weth-and-how-to-wrap-it)
- [What is Wrapped Ether (wETH) and how does it work?](https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work/amp)
- [What are the cheapest ways to wrap ETH into WETH?](https://medium.com/@therugpush/cheapest-way-to-wrap-eth-into-weth-446cf1ddccf7) 
- [WETH token information on Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
