---
title: Wrapped ether (WETH)
description: An introduction to wrapped ether (WETH)—an ERC20-compatible version of Ether (ETH).
lang: en
---

# What Is wrapped ether (WETH)? {#what-is-wrapped-ether-weth}

Wrapped ether (WETH) is an ERC-20 token representing Ethereum’s native token ether (ETH). Ether is limited to transferring value and paying for computation on the Ethereum network. Wrapping ETH into an ERC-20 token (WETH) allows users to use ETH in applications, such as DeFi or liquid staking tokens, that the native asset ETH cannot. Because there's significant demand to use ETH in the ecosystem, wrapped ether (WETH) solves this problem by providing an ERC20-compliant version of ETH to use in other applications.

Today, **nearly 3% of the circulating ETH supply is locked in the WETH token contract** making it one of the most popular smart contracts. WETH is especially popular with users interacting with applications in Ethereum's Decentralized Finance (DeFi) ecosystem.
## What are wrapped tokens? {#intro-to-wrapped-tokens}

A wrapped token is a token whose value is pegged to an underlying asset. An amount of the original asset is deposited into a smart contract which mints an equal amount of wrapped tokens. The smart contract holds the deposit until users are ready to exchange your wrapped tokens for the original asset.

Wrapping ETH today requires depositing it in a smart contract which creates an amount of wrapped ETH (WETH) tokens equal to the original deposit. You can also “unwrap” ETH by sending WETH tokens to the contract and receiving ETH in return.

In all cases, the conversion between WETH and ETH is always completed at a 1:1 ratio. Since the smart contract locks up ETH before minting WETH tokens, the value of WETH tokens in circulation is backed by ETH held in the reserves of the WETH smart contract. This keeps the prices of WETH and ETH relatively equal and ensures you can always swap both assets without realizing a loss.

## Why do we need to wrap ETH? {#why-do-we-need-to-wrap-eth}

Common benefits for wrapping tokens include extending its functionality and allowing the use of a token outside its native blockchain (e.g. using ETH on other networks like Arbitrum or Polygon). 

ETH token was created before newer and widely accepted [ERC-20](/developers/docs/standards/tokens/erc-20/) token standard was introduced. Most tokens and application of today use the ERC-20 standard and therefore there was a need to create an ERC-20 compliant version of ETH.   

Wrapped ether (WETH) extends the functionality of native ETH token:

- **Exchange ETH for ERC-20 tokens**: You cannot exchange ETH directly for other ERC-20 tokens (not without introducing trusted third parties or complex technical processes). WETH is a representation of ether that complies with the ERC-20 fungible token standard and can be exchanged 1:1 for other ERC-20 tokens.

- **Use ETH in Ethereum applications**: It is significantly easier for developers to program applications for WETH usage than it is for ETH.

- **Interact with DeFi applications**: DeFi enables complex use-cases like [yield farms](https://blockworks.co/what-is-yield-farming-what-you-need-to-know/) and [automated market makers](https://www.gemini.com/cryptopedia/amm-what-are-automated-market-makers) (AMMs), but these applications need access to funds in your wallet to work. With ERC-20 tokens like WETH, you can approve a smart contract to deduct WETH tokens from your balance up to a predefined limit (a feature that's unavailable when using native ETH).

- **Bridge ETH to layer 2**: Since ETH is the native token on Ethereum it needs to be wrapped in order bridged and used on layer 2.

## Wrapped ether (WETH) vs ether (ETH): What is the difference? {#weth-vs-eth-differences}

Wrapped ether (WETH) and ether (ETH) have subtle differences you should be aware of. For example, the Ethereum protocol recognizes ether—but it has no native knowledge of WETH (and ERC-20 tokens), causing both assets to behave differently. Below are some important distinctions between ETH and WETH tokens below:

|           | **Ether (ETH)**                                                                                                                                                                              | **Wrapped ether (WETH)**                                                                                                                                                                                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Supply    | **The supply of ETH is managed by the protocol.** The supply of ETH increases when Ethereum validators earn rewards for processing transactions and creating blocks.                         | **WETH is an ERC-20 token whose supply is managed by a smart contract.** New units of WETH are issued by the contract after it receives ETH deposits from users.                                                                                                                                       |
| Ownership | **Ownership of ETH is defined and guaranteed by the Ethereum blockchain.** For example, protocol rules ensure you can always spend from an account’s ETH balance if you control the account. | **Ownership of WETH depends on the WETH token contract.** The contract defines ownership of WETH tokens and determines the conditions under which you can access your WETH balance.                                                                                                                    |
| Transfer  | The transfer of ETH is intrinsic to the Ethereum protocol. Transfers are recorded on-chain and publicly verifiable.                                                                          | **The transfer of WETH tokens occurs inside the WETH token contract and [isn’t directly recorded on-chain](https://coinmarketcap.com/alexandria/glossary/internal-transaction).** The blockchain only records the transaction authorizing the smart contract to deduct from the sender’s WETH balance. |
| Gas       | Ether (ETH) is the accepted unit of payment for computation on the Ethereum network. Gas fees are denominated in gwei (a unit of ether).                                                     | You cannot pay gas for a transaction using WETH tokens (except when using a third-party relayer service).                                                                                                                                                                                              |

### Security considerations for using WETH {#weth-security-considerations}

As Ethereum's native asset, the security of ETH is guaranteed by the protocol—no one can steal your funds unless they have access to your private keys. Even in a [51% attack](/glossary/#51%-attack), attackers cannot create forged transactions to transfer ETH from your address without approval.

In comparison, wrapped ether (WETH) is not issued and secured natively by the Ethereum network and using it may involve certain risks.

Some unique qualities that WETH has are:

- **Simplistic design**: The canonical WETH smart contract has less than 60 lines of code and lacks complexities that can produce unintended bugs or exploitable vulnerabilities.
- **No centralized control*: WETH cannot be changed as no one has administrative control over the WETH token smart contract. As such, you don't have to worry about a malicious admin arbitrarily taking advantage of WETH tokens, censoring or attempts to withdraw your ETH.
- **Non-upgradeable**: The WETH contract is non-upgradeable (unlike many variants) and has remained the same since its launch many years ago.
- **Extensively audited and tested**: Members of the Ethereum community (including auditors, developers, and security researchers) have tested the security of the WETH contract before _and_ after its launch. The WETH contract has also passed formal verification, which is used as a high security standard for Ethereum-based applications.

While the WETH contract is considered secure, some hypothetical attack scenarios exist including:

- **An attacker mints WETH tokens without depositing ETH (the equivalent of printing money out of thin air)**. If the attacker successfully redeems these tokens for ETH, other owners may be unable to withdraw their ETH deposits.

- **An attacker exploits a vulnerability that allows them to drain the WETH contract of ETH deposited by users**. This would leave users with valueless WETH tokens without any backing.

- **A smart contract bug prevents users from unwrapping WETH and withdrawing ETH deposits.** While the chances of this happening are low, it is still a feasible scenario that could affect the safety of WETH assets.

Note that these security considerations apply **only if you’re using WETH issued on Ethereum**. [Blockchain bridges](/bridges/) make ETH usable on a non-Ethereum blockchain by issuing a variant of WETH compatible that blockchain’s technical standards.

But this introduces additional security issues other than those described previously. For example, you must also believe the bridge is secure against attacks, the bridge operator(s) won’t freeze or steal your funds, etc.

## Further reading {#further-reading}

- [WTF is WETH?](https://weth.io/)
- [What are the cheapest ways to wrap ETH into WETH?](https://medium.com/@therugpush/cheapest-way-to-wrap-eth-into-weth-446cf1ddccf7)
- [WETH token information on Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [How To add Wrapped Ether (WETH) to Metamask](https://isitcrypto.com/add-weth-to-metamask/)
- [Formal Verification of WETH](https://zellic.io/blog/formal-verification-weth)
