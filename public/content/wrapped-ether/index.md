---
title: What is Wrapped Ether (wETH)
description: An introduction to Wrapped ether (wETH)—an ERC20-compatible wrapper for ether (ETH). 
lang: en
---

# Wrapped ether (wETH) {#intro-to-weth}

[Ether](/eth) (ETH) is the native token on Ethereum, and is used for staking, as a currency and paying for gas fees for computation. However, ETH has limitations in how it can interact with assets and applications built on top of Ethereum, like ERC-20 tokens. In order for ETH to be able to interact with ERC-20 tokens, it must conform with the ERC-20 standard.

To bridge this gap, wrapped ETH (wETH) was created. **Wrapped ETH is a smart contract that lets you deposit 1 ETH into the contract and receive 1 minted wETH** that conforms to the ERC-20 token standard. wETH is a representation of ETH that allows you to interact with it as an ERC-20 token, not as the native asset ETH. You will still need native ETH to pay for gas fees, so make sure you save some when depositing. 

You are able to unwrap wETH for ETH by using the wETH smart contract. You can deposit 1 wETH back into the wETH smart contract, and you will receive 1 ETH. The wETH deposited is then burned and taken out of the circulating supply of wETH.

**Roughly 3% of the circulating ETH supply is locked in the wETH token contract** making it one of the most used [smart contracts](/glossary/#smart-contract). wETH is especially important with users interacting with applications in decentralized finance (DeFi).

## Why do we need to wrap ETH as an ERC-20? {#why-do-we-need-to-wrap-eth} 

[ERC-20](/developers/docs/standards/tokens/erc-20/) defines a standard interface for fungible tokens, so anyone can create tokens that interact seamlessly with applications and tokens that use this standard in Ethereum's ecosystem. Since **ETH predates the ERC-20 standard**, ETH doesn't conform to this specification. This means **you can't easily** exchange ETH for other ERC-20 tokens or **use ETH in apps using the ERC-20 standard**. Wrapping ETH gives you the opportunity to do the following:

- **Exchange ETH for ERC-20 tokens**: You cannot exchange ETH directly for other ERC-20 tokens. wETH is a representation of Ether that complies with the ERC-20 fungible token standard and can be exchanged with other ERC-20 tokens. 

- **Use ETH in dapps**: Because ETH isn’t ERC20-compatible, developers would need to create separate interfaces (one for ETH and another for ERC-20 tokens) in dapps. Wrapping ETH removes this obstacle and enables developers to handle ETH and other tokens within the same dapp. Many decentralized finance applications use this standard, and create markets for exchanging these tokens.

## Wrapped ether (wETH) vs ether (ETH): What is the difference? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Wrapped Ether (wETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Supply     | The supply of ETH is managed by the Ethereum protocol. The [issuance](/roadmap/merge/issuance) of ETH is handled by Ethereum validators when processing transactions and creating blocks.                           | wETH is an ERC-20 token whose supply is managed by a smart contract. New units of wETH are issued by the contract after it receives ETH deposits from users, or units of wETH are burned when a user wishes to redeem wETH for ETH.                                                                                                                                        |
| Ownership  | Ownership is managed by the Ethereum protocol through your account balance.  | Ownership of wETH managed by the wETH token smart contract, not the Ethereum protocol.                                                                                                                                         |
| Gas        | Ether (ETH) is the accepted unit of payment for computation on the Ethereum network. Gas fees are denominated in gwei (a unit of Ether).                                                                                    | You cannot pay gas for a transaction using wETH tokens (except when using a third-party relayer service).                                                                                                                                                                                              |

## Frequently asked questions {#faq}
 
<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-ether" eventName="clicked Do you pay to wrap/unwrap ETH?">

You pay gas fees to wrap or unwrap ETH using the wETH contract.

</ExpandableCard>

<ExpandableCard title="Is wETH safe?" eventCategory="/wrapped-ether" eventName="clicked Is wETH safe?">

Nevertheless, wETH is generally considered secure because it is based on a simple, battle-tested smart contract. The wETH contract has also beeen formally verified, which is the highest security standard for smart contracts on Ethereum.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different wETH tokens?" eventCategory="/wrapped-ether" eventName="clicked Why am I seeing different wETH tokens?">

Besides the [canonical implementation of wETH](https://blog.0xproject.com/canonical-weth-a9aa7d0279dd) described on this page, there are other variants in the wild. These may be custom tokens created by app developers or versions issued on other blockchains, and may behave differently or have different security properties. **Always double-check the token information to know which wETH implementation you're interacting with.**

</ExpandableCard>

## Further reading {#further-reading}

- [WTF is wETH?](https://weth.io/)
- [What are the cheapest ways to wrap ETH into wETH?](https://medium.com/@therugpush/cheapest-way-to-wrap-eth-into-weth-446cf1ddccf7) 
- [wETH token information on Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [How To add Wrapped Ether (wETH) to Metamask](https://isitcrypto.com/add-weth-to-metamask/)
- [Formal Verification of wETH](https://zellic.io/blog/formal-verification-weth)
