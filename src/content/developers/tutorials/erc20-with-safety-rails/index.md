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

## Creating an ERC-20 contract {#creating-an-erc-20-contract}

Before we can add the safety rail functionality we need an ERC-20 contract. In this article we'll use [the OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard). Open it in another browser and follow these instructions:

1. Select **ERC20**.
2. Enter these settings:

   | Parameter | Value |
   | - | - |
   | Name      | SafetyRailsToken
   | Symbol    | SAFE
   | Premint   | 1000
   | Features  | None
   | Access Control | Ownable 
   | Upgradability  | None
   
3. Scroll up and click **Open in Remix** (for Remix) or **Download** to use a different environment. I'm going to assume you're using Remix, if you use something else just make the appropriate changes.
4. We now have a fully functional ERC-20 contract. You can expand `.deps` > `npm` to see the imported code.
5. Compile, deploy, and play with the contract to see that it functions as an ERC-20 contract. If you need to learn how to use Remix, [use this tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).


## Common mistakes {#commom-mistakes}

### What are they? {#what-are-they}

Users sometimes send tokens to the wrong address. While we cannot read their minds to know what they meant to do, there are two error types that happen a lot and are easy to detect:

1. Sending the tokens to the contract's own address. For example, [Optimism's OP token](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) managed to accumulate [over 120,000](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042#tokentxns) OP tokens in less than two months. This represents a significant amount of wealth that presumably people just lost.

2. Sending the tokens to an empty address, one that doesn't correspond to an [externally owned account](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) or a [smart contract](/developers/docs/smart-contracts). While I don't have statistics on how often this happens, [one incident could have cost 20,000,000 tokens](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).


### How do we prevent them? {#how-do-we-prevent-them}

The OpenZeppelin ERC-20 contract includes [a hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), that is called before a token is transferred. By default this hook does not do anything, but we can hang our own functionality on it. So we can add this function after the constructor:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Some parts of this function may be new if you aren't very familiar with Solidity:

```solidity
        override(ERC20)
```

We have to specify explicitly that we're [overriding](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) the ERC20 token definition of `_beforeTokenTransfer`. In general, explicit definitions are a lot better, from the security standpoint, than implicit ones - you cannot forget that you've done something if it's right in front of you. That is also the reason we need to specify which superclass's `_beforeTokenTransfer` we are overriding.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

This line calls the `_beforeTokenTransfer` function of the contract or contracts from which we inherited which have it. In this case, that is only `ERC20`, `Ownable` does not have this hook.

    
## Conclusion

Add extendability. 
