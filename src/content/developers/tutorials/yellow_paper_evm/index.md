---
title: Understanding the Yellow Paper (EVM)
description: Understanding the part of the Yellow Paper, the formal specifications for Ethereum, that explains the ethereum virtual machine (EVM).
author: "qbzzt"
tags: ["evm", "yellow paper", "specifications"]
skill: intermediate
lang: en
sidebar: true
published: 2022-05-15
---

[The Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) is the formal specifications for Ethereum. 
Except where amended by [the EIP process](https://eips.ethereum.org/EIPS/eip-1), it contains the exact description of how everything works.
It is written as a mathematical paper, which includes terminology programmers may not be familiar with. 
In this paper you learn how to read it, and by extension other related mathematical papers.

## Which Yellow Paper?

Like almost everything else in Ethereum, the Yellow Paper evolves over time. 
To be able to refer to a specific version, I uploaded [the current version at writing](yellow-paper-Berlin.pdf).
The section, page, and equation numbers I use will refer to that version.
It is a good idea to have it open in a different window while reading this document.


### Why the EVM?

I am writing this a few months before [the merge](/upgrades/merge). 
That event will significantly change the way blocks are handled, making that part of the current yellow paper of mostly historical instance.
On the other hand, the EVM is mostly unaffected by the merge.

The EVM is explained primarily in section 9 (p. 12-14). 

## 9 (Execution Model)

The term *system state* includes everything you need to know about the system to run it.
In a normal computer this means the memory, content of registers, etc.

A [Turing machine](https://en.wikipedia.org/wiki/Turing_machine) is a computational model.
Essentially, it is a simplified version of a computer, which is proved to have the same ability to run computations that a normal computer can (everything that a computer can calculate a Turing machine can calculate and vice versa).
This model makes it easier to prove various theorems about what is and what isn't comnputable.

The term [*Turing-complete*](https://en.wikipedia.org/wiki/Turing_completeness) means a computer that can run the same calculations as a Turing machine. 

## Conclusion
