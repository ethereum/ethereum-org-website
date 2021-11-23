---
title: "Reverse Engineering a Contract"
description: How to understand a contract when you don't have the source code
author: Ori Pomerantz
lang: en
sidebar: true
tags: ["evm", "opcodes", "reverse"]
skill: advanced
published: 2021-12-30
---

## Introduction {#introduction}

*There are no secrets on the blockchain*, everything that happens is consistent, verifiable, and publicly available. Ideally, [contracts should have their source code published and verified on Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). However, [that is not always the case](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code).

There are reverse compilers, but they don't always produce [usable results](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). In this article you learn how to manually reverse engineer and understand a contract from [the opcodes](https://github.com/wolflo/evm-opcodes).

## Prepare the Executable Code

You can get the opcodes by going to Etherscan for the contract, clicking the **Contract** tab and then **Switch of Opcodes View**. You get a view that is one opcode per line.

![Opcode View from Etherscan](opcode-view.png)

To be able to understand jumps, however, you need to know where in the code each opcode is located. To do that, one way is to open a Google Spreadsheet and paste the opcodes in column C. [You can skip the following steps by making a copy of this already prepared spreadsheet](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

The next step is to get the correct code locations so we'll be able to understand jumps. We'll put the opcode size in column B, and the location (in hexadecimal) in column A. Type this function in cell `B1` and then copy and paste it for the rest of column B, until the end of the code. After you do this you can hide column B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

First this function adds one byte for the opcode itself, and then looks for `PUSH`. Push opcodes are special because they need to have additional bytes for the value being pushed. If the opcode is a `PUSH`, we extract the number of bytes and add that.

In `A1` put the first offest, zero. Then, in `A2`, put this function and again copy and paste it for the rest of column A:

```
=dec2hex(hex2dec(A1)+B1)
```

We need this function to give us the hexadecimal value because the values that are pushed prior to jumps (`JUMP` and `JUMPI`) are given to us in hexadecimal. 

## The Entry Point (0x00)

Contracts are always executed from the first byte. This is the initial part of the code:

| Offset | Opcode   | Stack (after the opcode) |
| -----: | ------   | ------------------------ |
| 0	 | PUSH1 0x80   | 0x80   
| 2	 | PUSH1 0x40   | 0x40, 0x80
| 4	 | MSTORE       | Empty
| 5	 | PUSH1 0x04   | 0x04
| 7	 | CALLDATASIZE | CALLDATASIZE 0x04
| 8	 | LT           | CALLDATASIZE<4
| 9	 | PUSH2 0x005e | 0x5E CALLDATASIZE<4
| C	 | JUMPI        | Empty

This code does two things:
1. Write 0x80 as a 32 byte value to memory locations 0x40-0x5F (0x80 is stored in 0x5F, and 0x40-0x5E are all zeroes).
2. Read the calldata size. Normally the call data for an Ethereum contract follows [the ABI (application binary interface)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), which at a minimum requires four bytes for the function selector. If the call data size is less than four, jump to 0x5E.

### The Handler at 0x5E

This is the error handler code.

| Offset | Opcode |
| -----: | ------ |
| 5E | JUMPDEST |
| 5F |	CALLDATASIZE
| 60 |	PUSH2 0x007c
| 63 |	JUMPI

This snippet starts with a `JUMPDEST`. EVM (Ethereum virtual machine) programs throw an exception if you jump to an opcode that isn't `JUMPDEST`. Then it looks at the CALLDATASIZE, and if it is "true" (that is, not zero) jumps to 0x7C. We'll get to that below.


| Offset | Opcode | Stack (after opcode)
| -: | - | - |
| 64 | 	CALLVALUE | [wei](https://ethereum.org/en/glossary/#wei) provided by the call. Called `msg.value` in Solidity
| 65 | PUSH1 0x06 | 6 CALLVALUE
| 67 | PUSH1 0x00 | 0 6 CALLVALUE
| 69 | DUP3       | CALLVALUE 0 6 CALLVALUE
| 6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE
| 6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE

So when there is no call data we read the value of Storage[6]. We don't know what this value is right now, but we can look for transactions that the contract received with no call data. Transactions which just transfer ETH without any call data (and therefore no method) have in Etherscan the method `Transfer`. In fact, [the very first transaction the contract received](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) is a transfer.

If we look in that transaction and click **Click to see More**, we see that the call data, called input data, is indeed empty (`0x`). Notice also that the value is 1.559 ETH, that will be relevant later.

![The call data is empty](calldata-empty.png)


[for state changes](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7#statechange) and expand the contract we are reverse engineering, we can see that it did change 


6C	3	PUSH2 0x0075
6F	1	SWAP2
70	1	SWAP1
71	3	PUSH2 0x01a7
74	1	JUMP
75	1	JUMPDEST
76	1	SWAP1
77	1	SWAP2
78	1	SSTORE
79	1	POP
7A	1	POP
7B	1	STOP
