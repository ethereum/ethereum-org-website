---
title: Ethereum virtual machine (EVM)
description:
lang: en
sidebar: true
---

**Original author:** Wil Barnes  
**Link:** https://kauri.io/ethereum-101-part-7-the-evm/a7ac47d26eab4ce899a865619122d42e/a

The EVM is the Ethereum Virtual Machine, it is the Turing complete virtual machine that handles all of the transaction processing on the Ethereum network. It is a complete 256 bit virtual machine that serves to execute arbitrary EVM bytecode.

## Prerequisites

## EVM bytecode

Bytecode is the machine code that the high-level smart contract languages are compiled into. It looks like this:

```
608060405234801561001057600080fd5b506040516020806108b28339810180604052602081101561003057600080fd5b8101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166002816100fa9190610101565b5050610154565b81548183558181111561012857818360005260206000209182019101610127919061012d565b5b505050565b61015191905b8082111561014d5760008082016000905550600101610133565b5090565b90565b61074f806101636000396000f3fe60806040526004361061005c576000357c0100000000000000000000000000000000000000000000000000000000900480635c19a95c14610061578063609ff1bd146100b25780639e7b8d61146100e3578063b3f98adc14610134575b600080fd5b34801561006d57600080fd5b506100b06004803603602081101561008457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610172565b005b3480156100be57600080fd5b506100c76104c7565b604051808260ff1660ff16815260200191505060405180910390f35b3480156100ef57600080fd5b506101326004803603602081101561010657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610543565b005b34801561014057600080fd5b506101706004803603602081101561015757600080fd5b81019080803560ff169060200190929190505050610640565b005b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156101d257506104c4565b5b600073ffffffffffffffffffffffffffffffffffffffff16600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415801561030057503373ffffffffffffffffffffffffffffffffffffffff16600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b1561036f57600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691506101d3565b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156103a957506104c4565b60018160010160006101000a81548160ff021916908315150217905550818160010160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156104aa57816000015460028260010160019054906101000a900460ff1660ff1681548110151561048b57fe5b90600052602060002001600001600082825401925050819055506104c1565b816000015481600001600082825401925050819055505b50505b50565b6000806000905060008090505b6002805490508160ff16101561053e578160028260ff168154811015156104f757fe5b906000526020600020016000015411156105315760028160ff1681548110151561051d57fe5b906000526020600020016000015491508092505b80806001019150506104d4565b505090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415806105eb5750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff165b156105f55761063d565b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055505b50565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806106a857506002805490508260ff1610155b156106b35750610720565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460028360ff1681548110151561070457fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a723058209061ffc04667804683fe01748db07db99f66b416464677c76a87e047d3ff2a430029
```

This is not human readable code. If you had some free time, it could be reverse engineered, but that's not always a value-adding task. Further, you shouldn't be interacting with contracts on the blockchain unless you also have their high-level source code and application binary interface (ABI).

## Deployment vs runtime bytecode

The above is deployment bytecode of a Solidity smart contract. Deployment bytecode is the runtime bytecode wrapped in auxiliary code to foster successful deployment of the contract. After successful contract deployment, the runtime bytecode resides alone at its new contract address.

## EVM Assembly

The solidity compiler can print out the EVM assembly of our contract in human readable format:

```
/ "HelloWorld.sol":109:871 contract HelloWorld // defining the contract... / mstore(0x40, 0x80) / "HelloWorld.sol":231:395 constructor() // constructor function, optional, executed once upon deployment and cannot be called again... / callvalue / "--CODEGEN--":8:17 / dup1 / "--CODEGEN--":5:7 / iszero tag_1 jumpi / "--CODEGEN--":30:31 / 0x00 / "--CODEGEN--":27:28 / dup1 / "--CODEGEN--":20:32 / revert / "--CODEGEN--":5:7 / tag_1: / "HelloWorld.sol":231:395 constructor() // constructor function, optional, executed once upon deployment and cannot be called again... / pop / "HelloWorld.sol":362:388 greeting = "Hello, World." / 0x40 dup1 mload swap1 dup2 add 0x40 mstore dup1 0x0d dup2 mstore 0x20 add 0x48656c6c6f2c20576f726c642e00000000000000000000000000000000000000 dup2 mstore pop / "HelloWorld.sol":362:370 greeting / 0x00 / "HelloWorld.sol":362:388 greeting = "Hello, World." / swap1 dup1 mload swap1 0x20 add swap1 tag_4 swap3 swap2 swap1 tag_5 jump // in tag_4: pop / "HelloWorld.sol":109:871 contract HelloWorld // defining the contract... / jump(tag_6) tag_5: dup3 dup1 sload 0x01 dup2 0x01 and iszero 0x0100 mul sub and 0x02 swap1 div swap1 0x00 mstore keccak256(0x00, 0x20) swap1 0x1f add 0x20 swap1 div dup2 add swap3 dup3 0x1f lt tag_8 jumpi dup1 mload not(0xff) and dup4 dup1 add or dup6 sstore jump(tag_7)
```

...

```
tag_29:
  tag_30
  swap2
  swap1
tag_31:
  dup1
  dup3
  gt
  iszero
  tag_32
  jumpi
  0x00
  dup2
  0x00
  swap1
  sstore
  pop
  0x01
  add
  jump(tag_31)
tag_32:
  pop
  swap1
  jump
tag_30:
  swap1
  jump    // out

auxdata: 0xa165627a7a723058205a6ad79adf0bb2db43f8594df4cf90d9ddac2dcc7fdec3406884535056226e4c0029
}
```

This EVM assembly has been truncated. It's actually quite long. This is a little easier to interpret than the raw bytecode.

## Quick primer on the EVM instruction set

The instruction set consists of many operations called opcodes. Each opcode is a computational step with an explicit [gas](/en/developers/beginners/blockchain/gas/) cost.

Some examples:

| Opcode | Name           | Description                                                                     | Gas    | Notes                                      |
| ------ | -------------- | ------------------------------------------------------------------------------- | ------ | ------------------------------------------ |
| 0x01   | `ADD`          | Addition operation                                                              | 3      | Simple computational steps                 |
| 0x02   | `MUL`          | Multiplication operation                                                        | 5      | N/A                                        |
| 0x31   | `BALANCE`      | Retrieve balance of given account                                               | 400    | See higher costs                           |
| 0x54   | `SLOAD`        | Load word from storage                                                          | 200    | N/A                                        |
| 0x55   | `SSTORE`       | Save word to storage                                                            | 20000  | High cost to store a 256-bit word          |
| 0xf4   | `DELEGATECALL` | Perform a message call to another account in the context of the calling account | Varies | Need to be cautious when using this opcode |

Some opcodes cost 0 gas. For example, opcodes that halt execution are gas-less opcodes. For example, the 0x00 STOP opcode halting execution costs 0 gas. Opcodes that terminate a transaction generally use no gas. Some other exceptions that will force the EVM to terminate a transaction are invalid opcodes, invalid jump destinations (the EVM is able to jump to arbitrary positions only if lands on a valid jump-destination), and stack underflows.

## EVM performance

On mainnet, the EVM generally executes bytecode slower than one would expect of other virtual machines. The salient reason for this is that each operation must be executed by every full node in the network in order to achieve a trust-less environment. This is by design. The EVM was designed to achieve decentralized consensus across the whole network, and as a result, computation speeds are slower and costs are higher than those of a centralized network. The upside is that Ethereum network experiences near immutability, significantly improved fault tolerance, and zero downtime.

Additionally, the EVM's gas metering mechanism ensures that miners receive compensation for including the transaction in a block. This also prevents programs from looping eternally. Eventually the transaction will exceed its gas limit, the transaction will immediately halt and rollback all sandboxed state changes. The only state changes resulting from the transaction is the sender's nonce incremented by one and the gas costs up until transaction failure are paid to the miner for their computational effort.
