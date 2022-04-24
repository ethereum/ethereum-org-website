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

## 9 (Execution Model)

This section (p. 12-14) includes most of the definition of the EVM.

The term *system state* includes everything you need to know about the system to run it.
In a normal computer this means the memory, content of registers, etc.

A [Turing machine](https://en.wikipedia.org/wiki/Turing_machine) is a computational model.
Essentially, it is a simplified version of a computer, which is proved to have the same ability to run computations that a normal computer can (everything that a computer can calculate a Turing machine can calculate and vice versa).
This model makes it easier to prove various theorems about what is and what isn't comnputable.

The term [*Turing-complete*](https://en.wikipedia.org/wiki/Turing_completeness) means a computer that can run the same calculations as a Turing machine. 
Turing machines can get into infinite loops, and the EVM cannot because it would run out of gas, so it's only quasi-Turing-complete.

## 9.1 (Basics)

This section gives the basics of the EVM, and how it compares with other computational models.

A [stack machine](https://en.wikipedia.org/wiki/Stack_machine) is a computer that stores intermediate data not in registers, but in a [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)).
Stack machine is the preferred architecture for virtual machines because it is easy to implement.
This ease of implementation is especially important in the case of the EVM because it means that bugs, and security vulnerabilities, are a lot less likely. 

The memory is a *byte array*, which means every memory location is a single byte.
This means that when you write a word (which is 256 bits) to memory it covers 32 (256/8) different memory locations.
For example, if you execute this [Yul](https://docs.soliditylang.org/en/latest/yul.html) code:

```yul
mstore(0, 0x60A7)
```

It writes zeros to locations 0-29, 0x60 to 30, and 0xA7 to 31.

The [*Von Neumann architecture*](https://en.wikipedia.org/wiki/Von_Neumann_architecture) specifies that the program to be executed and the data which it processes are stored in the same memory.
This is a bad idea from the security perspective because it allows program code to be modified, so the EVM never stores the currently running code in memory, it is always in a different memory that is ROM (read only memory).
There are only two cases code that will be executed in the future comes from memory, in both cases because the code needs to come from a different piece of code, so it *has* to come from memory (or [storage](https://coinyuppie.com/in-depth-understanding-of-evm-storage-mechanism-and-security-issues/), but that would be too expensive).

- When a contract creates another contract (using [CREATE](https://www.evm.codes/#f0) or [CREATE2](https://www.evm.codes/#f5)), the code for the contract constructor comes from memory.
- During the creation of *any* contract, the constructor code runs and then returns with the code of the actual contract, also from memory.

The term *exceptional execution* means an exception that causes the execution of the current contract to halt. 


## 9.2 (Fees Overview)

This section explains how the gas fees are calculated.
There are three costs:

1. The inherent cost of the specific opcode.
   To get this value, find the cost group opcode in Appendix H (p. 28, under expression (327)), and find the cost group in expression (324).
   This gives you a cost function, which in most cases uses parameters from Appendix G (p. 27).
   
   For example, the opcode `CALLDATACOPY` is a member of group *W<sub>copy</sub>*.
   The opcode cost for that group is *G<sub>verylow</sub>+G<sub>copy</sub>\*![](eq9-2-001.svg)*.  
   Looking at Appendix G, we see that this is *3+3\*![](eq9-2-001.svg)*.
   
   We still need to decipher the expression ![](eq9-2-001.svg). 
   The outmost part, ⌈ \<value\> ⌉ is the ceiling function, a function that given a value returns the smallest integer that is still not smaller than the value. 
   For example, ⌈ 2.5 ⌉ = ⌈ 3 ⌉ = 3. The next part is **μ<sub>s</sub>[2]**. 
   Looking at section 3 (Conventions) on p. 3, **μ** is the machine state.
   The machine state is defined in section 9.4.1 on p. 13.
   According to that section, one of the machine state parameters is **s** for the stack.
   Putting it all together, it seems that **μ<sub>s</sub>[2]** is location #2 in the stack.
   Looking at [the opcode](https://www.evm.codes/#37), location #2 in the stack is the size of the data in bytes.
   Looking at the other opcodes in group *W<sub>copy</sub>*, [CODECOPY](https://www.evm.codes/#39) and [RETURNDATACOPY](https://www.evm.codes/#3e), they also have a size of data in the same location.
   


## Conclusion
