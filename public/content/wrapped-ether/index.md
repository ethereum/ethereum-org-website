---
title: What is Wrapped Ether (WETH)
description: An introduction to Wrapped Ether (WETH)—an ERC20-compatible version of Ether (ETH). 
lang: en
---

# Wrapped Ether (WETH)

[Ether](/eth) (ETH) is the native token on Ethereum, and is used for staking, as a currency and paying for gas fees for computation. However, ETH has limitations in how it can interact with assets and applications built on top of Ethereum, like ERC-20 tokens. In order for ETH to be able to interact with ERC-20 tokens, it must conform with the ERC-20 standard.

To bridge this gap, wrapped ETH (wETH) was created. Wrapped ETH is a smart contract that lets you deposit 1 ETH into the contract, and receive 1 minted wETH with conforms to the ERC-20 token standard. However, wETH is a representation of ETH that allows you to interact with ETH as an ERC-20, not as the native asset ETH. You will still need native ETH to pay for gas fees, so make sure you save some when depositing. 

You are able to unwrap wETH for ETH by using the wETH smart contract. You can deposit 1 wETH back into the wETH smart contract, and you will receive 1 ETH. The wETH deposited is then burned and taken out of the circulating supply of wETH.

Roughly 3% of the circulating ETH supply is locked in the WETH token contract making it one of the most used smart contracts. WETH is especially important with users interacting with applications in decentralized finance (DeFi).

## Why do we need to wrap ETH as an ERC-20? {#why-do-we-need-to-wrap-eth} 

[ERC-20](/developers/docs/standards/tokens/erc-20/) defines a standard interface for fungible tokens, so anyone can create tokens that interact seamlessly with applications and tokens that use this standard in Ethereum's ecosystem. Since ETH predates the ERC-20 standard, ETH doesn't conform to this specification. This means you can't easily exchange ETH for other ERC-20 tokens or use ETH in apps using the ERC-20 standard. Wrapping ETH gives you the opportunity to do the following:

- **Exchange ETH for ERC-20 tokens**: You cannot exchange ETH directly for other ERC-20 tokens. WETH is a representation of Ether that complies with the ERC-20 fungible token standard and can be exchanged with other ERC-20 tokens. 

- **Use ETH in dapps**: Because ETH isn’t ERC20-compatible, developers would need to create separate interfaces (one for ETH and another for ERC-20 tokens) in dapps. Wrapping ETH removes this obstacle and enables developers to handle ETH and other tokens within the same dapp. Many decentralized finance applications use this standard, and create markets for exchanging these tokens.

## Wrapped Ether (WETH) vs Ether (ETH): What is the difference? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Supply     | The supply of ETH is managed by the Ethereum protocol. The [issuance](/roadmap/merge/issuance) of ETH is handled by Ethereum validators when processing transactions and creating blocks.                           | WETH is an ERC-20 token whose supply is managed by a smart contract. New units of WETH are issued by the contract after it receives ETH deposits from users, or units of wETH are burned when a user wishes to redeem wETH for ETH.                                                                                                                                        |
| Ownership  | Ownership is managed by the Ethereum protocol through your account balance.  | Ownership of WETH managed by the WETH token smart contract, not the Ethereum protocol.                                                                                                                                         |
| Transfer   | The transfer of ETH is intrinsic to the Ethereum protocol. Transfers are recorded on-chain and publicly verifiable.                                                                                                         | **The transfer of WETH tokens occurs inside the WETH token contract and [isn’t directly recorded on-chain](https://coinmarketcap.com/alexandria/glossary/internal-transaction).** The blockchain only records the transaction authorizing the smart contract to deduct from the sender’s WETH balance.  |
| Gas        | Ether (ETH) is the accepted unit of payment for computation on the Ethereum network. Gas fees are denominated in gwei (a unit of Ether).                                                                                    | You cannot pay gas for a transaction using WETH tokens (except when using a third-party relayer service).                                                                                                                                                                                              |
### Security considerations for using WETH {#weth-security-considerations}

As Ethereum's native asset, the security of ETH is guaranteed by the protocol—no one can steal your funds unless they have access to your private keys. Even in a [51% attack](https://academy.binance.com/en/glossary/51-percent-attack), attackers cannot create forged transactions to transfer ETH from your address without approval. 

In comparison, Wrapped Ether (WETH) is not issued and secured by the Ethereum network and using it may involve certain risks. Still, WETH is considered a safe asset to own and use (compared to similar wrapped tokens) due to its unique qualities:

- **Simplistic design**: The canonical WETH smart contract has less than 60 lines of code and lacks complexities that can produce unintended bugs or exploitable vulnerabilities. 
- **Zero admin controls**: Your interaction with WETH is fully **trustless** as no one has administrative control of the WETH token contract. As such, you don't have to worry about a malicious admin arbitrarily minting or burning tokens, censoring attempts to withdraw your ETH, or blacklisting transfers. 
- **Non-upgradeable**: The WETH contract is non-upgradeable (unlike many variants) and has remained the same since its launch many years ago. 
- **Extensively audited and tested**: Members of the Ethereum community (including auditors, developers, and security researchers) have tested the security of the WETH contract before *and* after its launch. The WETH contract has also passed formal verification, which is considered the highest security standard for Ethereum-based applications. 

Note that these security considerations apply **only if you’re using WETH issued on Ethereum**. [Blockchain bridges](/bridges/) make ETH usable on a non-Ethereum blockchain by issuing a variant of WETH compatible that blockchain’s technical standards.

But this introduces additional security issues other than those described previously. For example, you must also believe the bridge is secure against attacks, the bridge operator(s) won’t freeze or steal your funds, etc.  

## Frequently Asked Questions about Wrapped Ether (WETH) {#weth-frequently-asked-questions} 

**Are ETH and WETH the same?**

No. Ether (ETH) is the native coin of the Ethereum blockchain, used as a unit of payment on the Ethereum network (including paying for transaction fees). Wrapped Ether (WETH) is an ERC20-compliant version of ETH primarily designed to make ETH tokens compatible with applications built on the ERC-20 standard. 

**How does Wrapped Ether (WETH) work?**  

Users wrap ETH by sending it to a smart contract that mints an equivalent amount of Wrapped ETH (WETH) in return. Another way to get wrapped ETH is to swap ETH for WETH tokens on a decentralized exchange (DEX). 
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

ETH is the safest asset because it is part of the Ethereum protocol, whereas WETH is defined in a smart contract which could feasibly be hacked. Nevertheless, WETH is generally considered secure because it is based on a simple, battle-tested smart contract. The WETH contract has also beeen formally verified, which is the highest security standard for smart contracts on Ethereum. 

**Why am I seeing different WETH tokens?**

Besides the [canonical implementation of WETH](https://blog.0xproject.com/canonical-weth-a9aa7d0279dd) described on this page, there are other variants in the wild. These may be custom tokens created by dapp developers or versions issued on other blockchains, and may behave differently or have different security properties. **Always double-check the token information to know which WETH implementation you're interacting with.**

**How can I add WETH to my Metamask wallet?**

The easiest way to add WETH on Metamask is to use the "Import Tokens" feature: search for "wrapped ether" and select WETH as the token you want to import. You'll need to make sure your Metamask wallet is connected to Ethereum Mainnet before trying to add WETH to your wallet. 

Alternatively, you can add WETH to Metamask by clicking the "Custom Token" button (after selecting "Import Tokens"). Copy the WETH contract address from [Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) and paste into the "Token Contract Address" field. If the contract address is correct, WETH should appear as the Token Symbol, after which you'll need to confirm importing WETH before it appears in your wallet. 

## Further reading {#further-reading}
- [WTF is WETH?](https://weth.io/)
- [What are the cheapest ways to wrap ETH into WETH?](https://medium.com/@therugpush/cheapest-way-to-wrap-eth-into-weth-446cf1ddccf7) 
- [WETH token information on Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [How To add Wrapped Ether (WETH) to Metamask](https://isitcrypto.com/add-weth-to-metamask/)
- [Formal Verification of WETH](https://zellic.io/blog/formal-verification-weth)


