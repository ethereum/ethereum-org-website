---
title: Gas and fees
description:
lang: en
sidebar: true
incomplete: true
---

Gas is essential to the Ethereum network. It is the fuel that allows it to operate, in the same way that a car needs gasoline to run.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read up on [transactions](/developers/docs/transactions/) and the [EVM](/developers/docs/evm/).

## What is Gas? {#what-is-gas}

Gas refers to the unit that measures the amount of computational effort required to execute specific operations on the Ethereum network.

Since each Ethereum transaction requires computational resources to execute, each transaction requires a fee. Gas refers to the fee required to successfully conduct a transaction on Ethereum.

![A diagram showing where gas is needed in EVM operations](./gas.png)
_Diagram adapted from [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

In essence, gas fees are paid in Ethereum's native currency, ether (ETH). Gas prices are denoted in Gwei, which itself is a denomination of ETH - each Gwei is equal to 0.000000001 ETH (10<sup>-9</sup> ETH). For example, instead of saying that your gas costs 0.000000001 Ether, you can say your gas costs 1 Gwei.

Let's say Alice has to pay Bob 1ETH.
In the transaction the gas limit is 21000 units and the gas price is 200 GWei. 

Total fee will be: Gas units * Gas price per unit 
i.e 21000 * 200 = 4,200,000 Gwei or 0.0042 ETH

Now, when Alex sends money 1.0042 ETH will be deducted from his account.
Bob will be credited 1.0000 ETH.
Miner gets 0.0042 ETH.

This video offers a concise overview of gas and why it exists:

<iframe width="100%" height="315" src="https://www.youtube.com/embed/AJvzNICwcwc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Why do gas fees exist? {#why-do-gas-fees-exist}

In short, gas fees help keep the Ethereum network secure. By requiring a fee for every computation executed on the network, we prevent actors from spamming the network. In order to prevent accidental or hostile infinite loops or other computational wastage in code, each transaction is required to set a limit to how many computational steps of code execution it can use. The fundamental unit of computation is "gas".

Although a transaction includes a limit, any gas not used in a transaction is returned to the user.

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Diagram adapted from [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Why can gas fees get so high? {#why-can-gas-fees-get-so-high}

High gas fees are due to the popularity of Ethereum. Performing any operation on Ethereum requires consuming gas. This includes calculations, storing or manipulating data, or transferring tokens, each consuming different amounts of "gas" units. As dapp functionality grows more complex, the number of operations a smart contract performs grows too, and all contribute to high amounts of gas that must be paid for.

Gas is paid for with small amounts of ether (denominated in gwei, or (10<sup>-9</sup> ETH)). This value represents the amount of ether being paid per "unit of gas", not for the entire transaction. Since gas is capped within a block, under the current system, this means that users must out-bid one another to be included in the next block if demand exceeds capacity. Gas cost alone does not actually determine how much we have to pay for a particular transaction. To calculate the transaction fee we have to multiply the gas cost by gas price, which is measured in gwei.

This video about gas fees explains fully why fees are so expensive:

https://www.youtube.com/embed/Yh8cHUB-KoU

## Initiatives to reduce gas costs {#initiatives-to-reduce-gas-costs}

With the new network upgrades of Ethereum 2.0 (also known as Eth2 or Serenity). This should ultimately address some of the gas fee issues, which will in turn enable the platform to process thousands of transactions per second and scale globally.

Layer 2 scaling is a primary initiative to greatly improve gas costs, user experience and scalability. [More on layer 2 scaling](/developers/docs/scaling/layer-2-rollups/).

The new proof-of-stake model should reduce high power consumption and reliance on specialized hardware. The new PoS system was introduced on the Beacon Chain. This chain will allow the decentralized Ethereum network to come to agreement and keep the network secure, but avoid high energy use by requiring a financial commitment.

Anyone with at least 32 ETH is able to stake them and become a validator responsible for processing transactions, proposing new blocks to add to the blockchain and storing data. Users who have less than 32 ETH are able to join staking pools.

## What is Gas limit? {#what-is-gas-limit}

Gas limit refers to the maximum amount of gas you are willing to consume on a transaction. A higher gas limit means more computational work can be done while interacting with [smart contracts](/developers/docs/smart-contracts/). A standard ETH transfer requires a gas limit of 21,000 units of gas.

For example if you put a gas limit of 50,000 for a simple ETH transfer, the EVM would consume 21,000, and you would get back the remaining 29,000. However, if you specify too little gas say for example, a gas limit of 20,000 for a simple ETH transfer, the EVM will consume your 20,000 gas units attempting to fulfill the txn, but it will not complete. The EVM then reverts any changes, but since 20k gas units worth of work has already been done by the miner, that gas is consumed.

## What is Gas price? {#what-is-gas-price}

Gas price refers to the amount of Ether you are willing to pay for every unit of gas, and this is usually measured in 'gwei'. Prior to
[the London update](history/#london), you specify in the transaction how much you are willing to pay per gas, and you pay exactly that amount. This is
known as first price auction. Different transactions in the same block can have very different gas prices.

Starting with the London update, every block has a base fee, the minimum per gas price for inclusion in this block. The base fee is calculated by a formula
that compares the size of the previous block (the amount of gas used for all the transactions) with a target size. If the block size is higher than the target, there
is more demand for inclusion in the blockchain than supply, so the base fee is increased. If the block size is lower than the target then there is more supply 
of block space than demand, so the base fee is decreased. This base fee is "burned", removed from circulation.

Starting with the London update transactions can either specify a gas price using the old mechanism, or specify two other parameters:

-  Maximum Fee per Gas: The maximum gas price the transaction can be charged.
-  Maximum Priority Fee per Gas (a.k.a. Tip): The maximum priority fee the transaction signer is willing to pay the miner per gas to be included.
   If the base fee plus this amount is less than the maximum fee per gas, this is the priority fee. Otherwise, the priority fee is the maximum
   fee minus the base fee.

Transactions can only be included in a block if their maximum fee per gas is equal to the base fee or more. Out of that pool of transactions miners (or, when
ETH2 becomes the main network, validators) are expected to choose those that will pay them the highest priority fees. 

This mechanism is more complicated than the simple gas price auction, but it has the advantage of making gas fees more predictable and uniforms.

If you are interested you can read the exact specifications 
[in the EIP (Ethereum Improvement Proposal)](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).


## Strategies for you to reduce gas costs {#strategies-for-you-to-reduce-gas-costs}

If you are looking to reduce gas costs for your ETH you are able to set the price of your own gas fees and choose the priority level of your transaction. Miners will 'work on' and execute transactions that offer a higher gas price, as they get to keep the fees that you pay and will be less inclined to execute transactions with lower gas fees set. The gas price you set is how much you are willing to pay per unit of gas. However if you set the amount of gas too low you will not be able to send your ETH as you will run out of gas, you would then have to resubmit your transaction costing you more in gas fees. You can do this from some wallet providers when sending ETH.

If you want to monitor gas prices so you are able to send your ETH for less you can use many different tools such as:

- [Etherscan](https://etherscan.io/gastracker)
- [GasNow](https://www.gasnow.org)

## Further Reading {#further-reading}

- [Understanding Ethereum Gas, Blocks and the Fee Market](https://medium.com/@eric.conner/understanding-ethereum-gas-blocks-and-the-fee-market-d5e268bf0a0e)
- [Ethereum Gas Explained](https://defiprime.com/gas)
- [Is Ethereum more expensive to use as price rises?](https://docs.ethhub.io/questions-about-ethereum/is-ethereum-more-expensive-to-use-as-price-rises/)
- [Reducing the gas consumption of your Smart Contracts](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)

## Related Tools {#related-tools}

- [ETH Gas Station](https://ethgasstation.info/) _Consumer oriented metrics for the Ethereum gas market_
- [Etherscan Gas Tracker](https://etherscan.io/gastracker) _Transaction gas price estimator_
- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _Ethereum network gas stats_
- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _Gas estimation API powered by Blocknative's global mempool data platform_

## Related Topics {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
