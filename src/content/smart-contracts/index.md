---
title: Smart contracts
description: A non-technical introduction to smart contracts
lang: en
---

# Introduction to smart contracts {#introduction-to-smart-contracts}

Smart contracts are the fundamental building blocks of [Ethereum applications](/dapps/). They are computer programs stored on the blockchain that allow converting traditional contracts into digital parallels. Smart contracts are very logical - following an if this then that structure. This means they behave exactly as programmed and cannot be changed.

Nick Szabo coined the term "smart contract". In 1994, he wrote [an introduction to the concept](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) and, in 1996, [an exploration of what smart contracts could do](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Nick Szabo envisioned a digital marketplace built on these automatic, cryptographically secure processes. A place where transactions and business functions can happen trustlessly — without intermediaries. Smart contracts on Ethereum put this vision into practice.

## What are contracts? {#what-are-contracts}

You're probably thinking: _"I'm not a lawyer! Why would I care about contracts?"_. For most people, contracts bring to mind needlessly long terms and conditions agreements or boring legal documents.

Contracts are just agreements. That is, any form of agreement can be encapsulated within the conditions of a contract. Verbal agreements or pen-and-paper contracts are acceptable for many things, but they aren't without flaws.

### Trust and contracts {#trust-and-contracts}

One of the biggest problems with a traditional contract is the need for trusted individuals to follow through with the contract's outcomes.

Here is an example:

Alice and Bob are having a bicycle race. Let's say Alice bets Bob $10 that she will win the race. Bob is confident he'll be the winner and agrees to the bet. In the end, Alice finishes the race well ahead of Bob and is the clear winner. But Bob refuses to pay out on the bet, claiming Alice must have cheated.

This silly example illustrates the problem with any non-smart agreement. Even if the conditions of the agreement get met (i.e. you are the winner of the race), you must still trust another person to fulfill the agreement (i.e. payout on the bet).

## Smart contracts {#smart-contracts}

Smart contracts digitize agreements by turning the terms of an agreement into computer code that automatically executes when the contract terms are met.

### A digital vending machine {#vending-machine}

A simple metaphor for a smart contract is a vending machine, which works somewhat similarly to a smart contract - specific inputs guarantee predetermined outputs.

- You select a product
- The vending machine returns the amount required to purchase the product
- You insert the correct amount
- The vending machine verifies you have inserted the correct amount
- The vending machine dispenses the product of choice

The vending machine will only dispense your desired product after all requirements are met. If you don't select a product or insert enough money, the vending machine won't give out your product.

### Automatic execution {#automation}

One of the most significant benefits smart contracts have over regular contracts is that the outcome is automatically executed when the contract conditions are realized. There is no need to wait for a human to execute the result. In other words: smart contracts remove the need for trust.

For example, you could write a smart contract that holds funds in escrow for a child, allowing them to withdraw funds after a specific date. If they try to withdraw the funds before the specified date, the smart contract won't execute. Or, you could write a contract that automatically gives you a digital version of a car's title when you pay the dealer.

### Predictable outcomes {#predictability}

The human factor is one of the biggest points of failure with traditional contracts. For example, two individual judges may interpret a traditional contract in different ways. Their interpretations could lead to different decisions getting made and disparate outcomes. Smart contracts remove the possibility of different interpretations. Instead, smart contracts execute precisely based on the conditions written within the contract's code. This precision means that given the same circumstances, the smart contract will produce the same result.

### Public record {#public-record}

Smart contracts are also useful for audits and tracking. Since Ethereum smart contracts are on a public blockchain, anyone can instantly track asset transfers and other related information. You can check to see that someone sent money to your address, for example.

### Privacy protection {#privacy-protection}

Smart contracts can also protect your privacy. Since Ethereum is a pseudonymous network (your transactions are tied publicly to a unique cryptographic address, not your identity), you can protect your privacy from observers.

### Visible terms {#visible-terms}

Finally, like contracts, you can check what's in a smart contract before you sign it (or otherwise interact with it). Better yet, public transparency of the terms in the contract means that anyone can scrutinize it.

## Smart contract use cases {#use-cases}

So, smart contracts are computer programs that live on the blockchain. They can execute automatically. You can track their transactions, predict how they act and even use them pseudonymously. That's cool. But what are they good for? Well, smart contracts can do essentially anything that other computer programs do.

They can perform computations, create currency, store data, mint NFTs, send communications and even generate graphics. Here are some popular, real-world examples:

- [Stablecoins](/stablecoins/)
- [Creating and distributing unique digital assets](/nft/)
- [An automatic, open currency exchange](/get-eth/#dex)
- [Decentralized gaming](/dapps/?category=gaming)
- [An insurance policy that pays out automatically](https://etherisc.com/)
- [A standard that lets people create customized, interoperable currencies](/developers/docs/standards/tokens/)

## More of a visual learner? {#visual-learner}

Watch Finematics explain smart contracts:

<YouTube id="pWGLtjG-F5c" />

## Further reading {#further-reading}

- [How Smart Contracts Will Change the World](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Smart Contracts: The Blockchain Technology That Will Replace Lawyers](https://blockgeeks.com/guides/smart-contracts/)
- [Smart contracts for developers](/developers/docs/smart-contracts/)
- [Learn to write smart-contracts](/developers/learning-tools/)
- [Mastering Ethereum - What is a Smart Contract?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
