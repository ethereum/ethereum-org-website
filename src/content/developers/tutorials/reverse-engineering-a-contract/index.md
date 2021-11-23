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

*There are no secrets on the blockchain*, everything that happens should be consistent, verifiable, and publicly available. Ideally, [contracts should have their source code published and verified on Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). However, [that is not always the case](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code).

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

## The Entry Point

This is the initial part of the code

| Offset | Opcode |
| -----: | ------ |
| 0	 | PUSH1 0x80
| 2	 | PUSH1 0x40
| 4	 | MSTORE
| 5	 | PUSH1 0x04
| 7	 |	CALLDATASIZE
| 8	 | LT
| 9	 |	PUSH2 0x005e
| C	 |	JUMPI
