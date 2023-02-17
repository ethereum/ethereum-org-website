---
title: Wrapped Ether (WETH)
description: An introduction to Wrapped Ether (WETH)—an ERC20-compatible version of Ether (ETH). 
---

# What Is Wrapped Ether (WETH)? {#what-is-wrapped-ether-weth}    
Wrapped Ether (WETH) is an ERC-20 token representing Ether, Ethereum’s native coin. If you use Ethereum dapps, you've likely seen tokens built using the ERC-20 standard. The ERC-20 standard offers many benefits to developers and users, especially **flexibility** (tokens can be customized for different use cases) and **fungibility** (tokens are identical and interchangeable). 

Ether (ETH) doesn't comply with the ERC-20 standard, but there's significant demand to use it in ERC20-compatible wallets and dapps. Wrapped Ether (WETH) solves the problem by providing an ERC20-compliant version of ETH to use in dapps or swap with other ERC-20 tokens. As WETH is pegged to the price of ETH, using it will feel very similar to using native ETH. 

Wrapping Ether requires depositing ETH into a smart contract that creates an amount of WETH tokens equal to the original deposit; you can also “unwrap” Ether by sending WETH to the contract and receiving ETH in return. By locking up ETH before minting new WETH tokens, the WETH contract ensures the value of WETH tokens in circulation is backed by ETH held in reserves. This keeps the prices WETH and ETH relatively equal, such that you can convert WETH to ETH (and vice-versa) at a 1:1 ratio

Today, **nearly 3% of the circulating ETH supply is locked in the WETH token contract**—inspiring its description as the "World's Most Popular Smart Contract". WETH is also one of the most used ERC-20 tokens, especially among users interacting with Ethereum applications in the Decentralized Finance (DeFi) ecosystem. 

## Why do we need to wrap ETH? {#why-do-we-need-to-wrap-eth} 
The [ERC-20 token standard](https://www.gemini.com/cryptopedia/erc20-token-standard-ethereum) was introduced to ensure greater interoperability between products and services on Ethereum. ERC-20 defines a standard interface for fungible tokens, making it easier for developers to build tokens that seamlessly integrate with applications and other tokens in the Ethereum ecosystem. 

But the creation of Ether predates the introduction of the ERC-20 standard, which means ETH tokens don’t conform to the ERC-20 specification. Wrapped Ether (WETH) was thus created to [make ETH compatible with applications](https://blog.0xproject.com/canonical-weth-a9aa7d0279dd) implementing ERC-20 interfaces. Compared to ETH, WETH is based on the ERC-20 standard and offers similar functionalities as other ERC-20 tokens (eg. the ability to approve token spends by third-party accounts). 

### What are the use cases for WETH? {#weth-use-cases} 
As an ERC-20 token, WETH has more versatile use-cases, unlike ETH which is limited to making payments and paying for computation on the Ethereum network. Benefits of using WETH include: 

1. **Exchange ETH for ERC-20 tokens**

You  cannot exchange ETH directly for other ERC-20 tokens (not without introducing trusted third parties or complex technical processes). WETH is a representation of Ether that complies with the ERC-20 fungible token standard and can be exchanged 1:1 for other ERC20 tokens. 

2. **Use ETH in dapps**

Because ETH isn’t ERC20-compatible, developers would need to create separate interfaces (one for ETH and another for ERC-20 tokens) in dapps. Wrapping ETH in ERC-20 standards using WETH removes this obstacle and enables developers to handle ETH and other tokens within the same dapp. 

3. **Interact with DeFi applications**

Besides borrowing and lending, DeFi enables complex use-cases like [yield farms](https://blockworks.co/what-is-yield-farming-what-you-need-to-know/) and [automated market makers](https://www.gemini.com/cryptopedia/amm-what-are-automated-market-makers) (AMMs). These applications can make investment decisions on your behalf, such as automatically supplying liquidity to a lending pool or executing trades. 

That said, these applications can only work if they have access to funds in your wallet. With ERC-20 tokens like WETH, you can approve a smart contract to deduct WETH tokens from your balance up to a predefined limit. This feature is, however, unavailable when using native ETH. 

## Wrapped Ether (WETH) vs Ether (ETH): What is the difference? {#weth-vs-eth-differences}
Although they look similar, Wrapped Ether (WETH) and Ether (ETH) have subtle differences you should be aware of. For example, the Ethereum protocol recognizes Ether—but it has no native knowledge of WETH (and ERC-20 tokens), causing both assets to behave differently. We have listed other important distinctions between ETH and WETH tokens below: 

|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Supply     | **As Ethereum’s native token, the supply of ETH is managed by the  protocol.** The supply of ETH increases when Ethereum validators earn rewards for processing transactions and creating blocks.                           | **WETH is an ERC-20 token whose supply is managed by a smart contract.** New units of WETH are issued by the contract after it receives ETH deposits from users.                                                                                                                                        |
| Ownership  | **Ownership of ETH is defined and guaranteed by the Ethereum blockchain.** For example, protocol rules ensure you can always spend from an account’s ETH balance if you control the [private key](/glossary/#private-key).  | **Ownership of WETH depends on the WETH token contract.** For example, if nothing happens to the smart contract, you always have access to your WETH tokens.                                                                                                                                            |
| Transfer   | The transfer of ETH is intrinsic to the Ethereum protocol. Transfers are recorded on-chain and publicly verifiable.                                                                                                         | **The transfer of WETH tokens occurs inside the WETH token contract and [isn’t directly recorded on-chain](https://coinmarketcap.com/alexandria/glossary/internal-transaction).** The blockchain only records the transaction authorizing the smart contract to deduct from the sender’s WETH balance.  |
| Gas        | Ether (ETH) is the accepted unit of payment for computation on the Ethereum network. Gas fees are denominated in gwei (a unit of Ether).                                                                                    | You cannot pay gas for a transaction using WETH tokens (except when using a third-party relayers service).                                                                                                                                                                                              |
### Security considerations for using WETH {#weth-security-considerations}
As an asset native to Ethereum, the security of ETH is guaranteed by the Ethereum network—no one can steal your funds unless they have access to your private keys. Even in a [51% attack](https://academy.binance.com/en/glossary/51-percent-attack), attackers cannot create forged transactions to transfer ETH from your address without approval. 

Wrapped Ether (WETH) is not issued and secured by the Ethereum network; and being a token, WETH exposes you to smart contract risks that ETH does not have. The WETH contract is considered very secure, but some hypothetical attack scenarios exist including:

- **An attacker mints WETH tokens without depositing ETH (the equivalent of printing money out of thin air)**. If the attacker successfully redeems these tokens for ETH, other owners may be unable to withdraw their ETH deposits. 

- **An attacker exploits a vulnerability that allows them to drain the WETH contract of ETH deposited by users**. This would leave users with valueless WETH tokens without any backing. 

- **A smart contract bug prevents users from unwrapping WETH and withdrawing ETH deposits.** While the chances of this happening are low, it is still a feasible scenario that could affect the safety of WETH assets. 

Note that these security considerations apply **only if you’re using WETH issued on Ethereum**. [Blockchain bridges](/bridges/) allow you to use ETH on non-Ethereum blockchains by issuing a variant of WETH compatible with another blockchain’s technical standards.

But this introduces additional security issues other than those described previously. For example, you must also believe the bridge is secure against attacks, the bridge operator(s) won’t freeze or steal your funds, etc.  

## Frequently Asked Questions about Wrapped Ether (WETH) {#weth-frequently-asked-questions} 

**Are ETH and WETH the same?**

No. Ether (ETH) is the native coin of the Ethereum blockchain, used as a unit of payment on the Ethereum network (including paying for transaction fees). Wrapped Ether (WETH) is an ERC20-compatible version of ETH primarily designed to make ETH tokens compatible with applications built on the ERC-20 standard. 

**How does Wrapped Ether (WETH) work?**  

Users wrap ETH by sending it to a smart that mints an equivalent amount of Wrapped ETH (WETH) in return. Another way to get wrapped ETH is to swap ETH for WETH tokens on a decentralized exchange (DEX). 
Unwrapping ETH requires a similar workflow: send WETH to the smart contract and have an equivalent amount of ETH sent to your address. You can also unwrap ETH by swapping WETH for ETH directly using a decentralized exchange.  

**Do you pay to wrap/unwrap ETH?**

No. You don’t pay to wrap ETH into WETH, as the assets are converted at a 1:1 ratio. However, interacting with the WETH contract to wrap/unwrap ETH involves sending an on-chain transaction—and this requires paying a gas fee. DEX platforms also charge for gas when executing swaps between ETH and WETH (or vice-versa).

**Can I pay for gas with WETH?**

No. Ethereum nodes only accept ETH as payment for gas fees. You can only pay for gas in WETH only if using a third-party relayer that accepts the (signed) transaction off-chain and broadcasts it on-chain on your behalf. Typically, [relayers](https://blog.kyros.ventures/2022/07/24/meta-transaction-relayer-an-overview/) pay the gas fee for a relayed transactions from their ETH balance and accept payment for the service in ERC-20 tokens like WETH. 

**Are WETH and ETH the same price?**

WETH is pegged 1:1 to the price of ETH, so the value of both assets are usually equal at any time. This peg is maintained by ensuring that every unit of WETH is backed by ETH held in reserves. Forces of supply and demand also keep the prices of ETH and WETH relatively equal: 

- If WETH were cheaper, more people would buy it and convert it to the more expensive ETH at a 1:1 ratio to make profit. This would drive up demand for WETH and increase the price of WETH tokens. 

- If WETH is more expensive, more people would buy ETH and convert it to WETH to sell at a profit. As the supply of WETH increases, the value of WETH tokens would drop—keeping the peg relatively stable. 

**Why do people use WETH instead of ETH?**

WETH was created because the ETH token doesn't follow with the ERC-20 technical specification, making it difficult to use in decentralized applications (dapps). Unlike Ether, WETH follows the ERC-20 standard and is compatible with applications, such as decentralized exchanges and wallets, that support ERC-20 interfaces. WETH is also tradeable for other ERC-20 tokens while directly exchanging ETH for ERC-20 tokens requires complex accounting. 

**Is WETH safe?**

ETH is the safest asset because it is part of the Ethereum protocol, whereas WETH is defined in a smart contract which could feasibly be hacked. Nevertheless, WETH is generally considered safe because it is based on a simple, well-tested  smart contract with a limited attack surface. The WETH contract has also passed formal verification, which is considered the highest security standard for Ethereum-based applications. 

**Can I use WETH on other blockchains?**

Yes. If using a bridge, it is possible to get WETH tokens compatible with other blockchain protocols aside from Ethereum. These variants of WETH have different security properties from Ethereum-native WETH, however. For example, you must believe the bridge is well-secured and will let you redeem your WETH tokens for ETH. 

**What can I do with WETH?**

WETH can be used with any decentralized application built on the ERC-20 standard. WETH is particularly useful for decentralized finance (DeFi) applications—you can [exchange WETH for other tokens](/defi/#swaps) on a DEX, use it as collateral to [borrow funds](/defi/#borrowing-privacy), or supply liquidity to [lending platforms](/defi/#lending) in order to earn interest. 

## Further reading {#further-reading}
- [WTF is WETH?](https://weth.io/)
- [What Is Wrapped Ether (WETH) and How to Wrap It?](https://academy.binance.com/en/articles/what-is-wrapped-ether-weth-and-how-to-wrap-it)
- [What are the cheapest ways to wrap ETH into WETH?](https://medium.com/@therugpush/cheapest-way-to-wrap-eth-into-weth-446cf1ddccf7) 
- [WETH token information on Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Formal Verification of WETH](https://zellic.io/blog/formal-verification-weth)


