---
title: ERC-20 with Safety Rails
description: How to help people avoid silly mistakes
author: Ori Pomerantz
lang: en
sidebar: true
tags: ["erc-20"]
skill: beginner
published: 2022-09-01
---

## Introduction {#introduction}

One of the great things about Ethereum is that there is no central authority that can modify or undo your transactions. One of the great problems with Ethereum is that ther is no central authority with the power to undo user mistakes or illicit transactions. In this article you learn about some of the common mistakes that users commit with [ERC-20](/developers/docs/standards/tokens/erc-20/) tokens, as well as how to create ERC-20 contracts that help users to avoid those mistakes, or that give a central authority some limited power to undo them.

Note that while we will use the [OpenZeppelin ERC-20 token contract](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), this article does not explain it in great details. You can find this information [here](/developers/tutorials/erc20-annotated-code).

### Common mistakes {#commom-mistakes}

Users sometimes send tokens to the wrong address. While we cannot read their minds to know what they meant to do, there are two error types that happen a lot and are easy to detect:

1. Sending the tokens to the contract's own address. For example, [Optimism's OP token](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) managed to accumulate [over 120,000](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042#tokentxns) OP tokens in less than two months. This represents a significant amount of wealth that presumably people just lost.
2. Sending the tokens to an empty address, one that doesn't correspond to an [externally owned account](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) or a [smart contract](/developers/docs/smart-contracts). While I don't have statistics on how often this happens, [one incident could have cost 20,000,000 tokens](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).
