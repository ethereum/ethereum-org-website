---
title: Smart contracts
description: A non-technical introduction to smart contracts
lang: en
---

# Introduction to Smart Contracts {#introduction-to-smart-contracts}

Smart Contracts are the fundamental building blocks of Ethereum's application layer. They are computer programs stored on the [blockchain](/glossary/#blockchain) that follow "if this then that" logic, and are guaranteed to execute according to the rules defined by its code, which cannot be changed once created.

Nick Szabo coined the term "Smart Contract". In 1994, he wrote [an introduction to the concept](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), and in 1996 he wrote [an exploration of what Smart Contracts could do](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo envisioned a digital marketplace where automatic, [cryptographically-secure](/glossary/#cryptography) processes enable transactions and business functions to happen without trusted intermediaries. Smart Contracts on Ethereum put this vision into practice.

Watch Finematics explain Smart Contracts:

<YouTube id="pWGLtjG-F5c" />

## Trust in conventional contracts {#trust-and-contracts}

One of the biggest problems with a traditional contract is the need for trusted individuals to follow through with the contract's outcomes.

Here is an example:

Alice and Bob are having a bicycle race. Let's say Alice bets Bob $10 that she will win the race. Bob is confident he'll be the winner and agrees to the bet. In the end, Alice finishes the race well ahead of Bob and is the clear winner. But Bob refuses to pay out on the bet, claiming Alice must have cheated.

This silly example illustrates the problem with any non-smart agreement. Even if the conditions of the agreement get met (i.e. you are the winner of the race), you must still trust another person to fulfill the agreement (i.e. payout on the bet).

## A digital vending machine {#vending-machine}

A simple metaphor for a Smart Contract is a vending machine, which works somewhat similarly to a Smart Contract - specific inputs guarantee predetermined outputs.

- You select a product
- The vending machine displays the price
- You pay the price
- The vending machine verifies that you paid the right amount
- The vending machine gives you your item

The vending machine will only dispense your desired product after all requirements are met. If you don't select a product or insert enough money, the vending machine won't give out your product.

## Automatic execution {#automation}

The main benefit of a Smart Contract is that it deterministically executes unambiguous code when certain conditions are met. There is no need to wait for a human to interpret or negotiate the result. This removes the need for trusted intermediaries.

For example, you could write a Smart Contract that holds funds in escrow for a child, allowing them to withdraw funds after a specific date. If they try to withdraw before that date, the Smart Contract won't execute. Or you could write a contract that automatically gives you a digital version of a car's title when you pay the dealer.

## Predictable outcomes {#predictability}

Traditional contracts are ambiguous because they rely on humans to interpret and implement them. For example, two judges might interpret a contract differently, which could lead to inconsistent decisions and unequal outcomes. Smart Contracts remove this possibility. Instead, Smart Contracts execute precisely based on the conditions written within the contract's code. This precision means that given the same circumstances, the Smart Contract will produce the same result.

## Public record {#public-record}

Smart Contracts are useful for audits and tracking. Since Ethereum Smart Contracts are on a public blockchain, anyone can instantly track asset transfers and other related information. For example, you can check to see that someone sent money to your address.

## Privacy protection {#privacy-protection}

Smart Contracts also protect your privacy. Since Ethereum is a pseudonymous network (your transactions are tied publicly to a unique cryptographic address, not your identity), you can protect your privacy from observers.

## Visible terms {#visible-terms}

Finally, like traditional contracts, you can check what's in a Smart Contract before you sign it (or otherwise interact with it). A Smart Contract's transparency guarantees that anyone can scrutinize it.

## Smart Contract use cases {#use-cases}

Smart Contracts can do essentially anything that computer programs can do.

They can perform computations, create currency, store data, mint [NFTs](/glossary/#nft), send communications and even generate graphics. Here are some popular, real-world examples:

- [Stablecoins](/stablecoins/)
- [Creating and distributing unique digital assets](/nft/)
- [An automatic, open currency exchange](/get-eth/#dex)
- [Decentralized gaming](/dapps/?category=gaming#explore)
- [An insurance policy that pays out automatically](https://etherisc.com/)
- [A standard that lets people create customized, interoperable currencies](/developers/docs/standards/tokens/)

## Further reading {#further-reading}

- [How Smart Contracts Will Change the World](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Smart Contracts: The Blockchain Technology That Will Replace Lawyers](https://blockgeeks.com/guides/smart-contracts/)
- [Smart contracts for developers](/developers/docs/smart-contracts/)
- [Learn to write smart-contracts](/developers/learning-tools/)
- [Mastering Ethereum - What is a Smart Contract?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
