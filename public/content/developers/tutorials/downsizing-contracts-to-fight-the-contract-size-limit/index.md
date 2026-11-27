---
title: "Downsizing contracts to fight the contract size limit"
description: What can you do to prevent your smart contracts from getting too large?
author: Markus Waas
lang: en
tags: ["solidity", "smart contracts", "storage"]
skill: intermediate
breadcrumb: Downsizing contracts
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Why is there a limit? {#why-is-there-a-limit}

On [November 22, 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon) the Spurious Dragon hard-fork introduced [EIP-170](https://eips.ethereum.org/EIPS/eip-170) which added a smart contract size limit of 24,576 bytes (24 KiB). For you as a Solidity developer this means when you add more and more functionality to your contract, at some point you will reach the limit and the compiler will warn you:

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

There is a similar warning for the deployment code (initcode), which [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) limited to 49,152 bytes in the Shanghai upgrade.

The limit is not permanent. [EIP-7954](https://eips.ethereum.org/EIPS/eip-7954) raises it to 65,536 bytes (64 KiB), and the initcode limit to 131,072 bytes, and it is scheduled for the [Glamsterdam upgrade](/roadmap/glamsterdam/). Until that upgrade activates on the network you deploy to, 24,576 bytes is the limit there, and even afterwards smaller contracts remain cheaper to deploy and easier to audit.

This limit was introduced to prevent denial-of-service (DOS) attacks. Any call to a contract is relatively cheap gas-wise. However, the impact of a contract call for Ethereum nodes increases disproportionately depending on the called contract code's size (reading the code from disk, pre-processing the code, adding data to the Merkle proof). Whenever you have such a situation where the attacker requires few resources to cause a lot of work for others, you get the potential for DOS attacks.

Originally this was less of a problem because one natural contract size limit is the block gas limit. Obviously, a contract must be deployed within a transaction that holds all of the contract's bytecode. If you include only that one transaction into a block, you can use up all that gas, but it's not infinite. Today the block gas limit is tens of millions of gas and has been raised several times by validators, so on its own it would allow very large contracts. Since the [Fusaka upgrade](/roadmap/fusaka/), a single transaction is also capped at 16,777,216 gas ([EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)), but that is still well above what deploying a 24 KiB contract costs, which is why an explicit size limit is needed.

In the following we will look at some methods ordered by their potential impact. Think about it in the terms of weight-loss. The best strategy for someone to hit their target weight (in our case 24kb) is to focus on the big impact methods first. In most cases just fixing your diet will get you there, but sometimes you need a little bit more. Then you might add some exercise (medium impact) or even supplements (small impact).

## Big impact {#big-impact}

### Separate your contracts {#separate-your-contracts}

This should always be your first approach. How can you separate the contract into multiple smaller ones? It generally forces you to come up with a good architecture for your contracts. Smaller contracts are always preferred from a code readability perspective. For splitting contracts, ask yourself:

- Which functions belong together? Each set of functions might be best in its own contract.
- Which functions don't require reading contract state or just a specific subset of the state?
- Can you split storage and functionality?

### Libraries {#libraries}

One simple way to move functionality code away from the storage is using a [library](https://docs.soliditylang.org/en/latest/contracts.html#libraries). Don't declare the library functions as internal as those will be [added to the contract](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) directly during compilation. But if you use public functions, then those will be in fact in a separate library contract. Consider [using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for) to make the use of libraries more convenient.

### Proxies {#proxies}

A more advanced strategy would be a proxy system. Libraries use `DELEGATECALL` in the back which simply executes another contract's function with the state of the calling contract. Check out [upgrading smart contracts](/developers/docs/smart-contracts/upgrading/) to learn more about proxy systems. They give you more functionality, e.g., they enable upgradability, but they also add a lot of complexity. I wouldn't add those only to reduce contract sizes unless it's your only option for whatever reason.

## Medium impact {#medium-impact}

### Remove functions {#remove-functions}

This one should be obvious. Functions increase a contract size quite a bit.

- **External**: Often times we add a lot of view functions for convenience reasons. That's perfectly fine until you hit the size limit. Then you might want to really think about removing all but absolutely essential ones.
- **Internal**: You can also remove internal/private functions and simply inline the code as long the function is called only once.

### Avoid additional variables {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

A simple change like this made a difference of **0.28kb** when this article was written. The exact savings depend on your compiler version and settings (with Solidity 0.8.37 it is about 0.1kb without the optimizer and much less with it), so always measure. Chances are you can find many similar situations in your contracts and those can really add up to significant amounts.

### Shorten error message {#shorten-error-message}

Long revert messages and in particular many different revert messages can bloat up the contract. Instead use short error codes and decode them in your contract. A long message could be become much shorter:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Use custom errors instead of error messages {#use-custom-errors-instead-of-error-messages}

Custom errors have been introduced in [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). They are a great way to reduce the size of your contracts, because they are ABI-encoded as selectors (just like functions are).

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### Consider a low run value in the optimizer {#consider-a-low-run-value-in-the-optimizer}

You can also change the optimizer settings. The default value of 200 means that it's trying to optimize the bytecode as if a function is called 200 times. If you change it to 1, you basically tell the optimizer to optimize for the case of running each function only once. An optimized function for running only one time means it is optimized for the deployment itself. Be aware that **this increases the [gas costs](/developers/docs/gas/) for running the functions**, so you may not want to do it. If you compile with `viaIR` enabled, check the size with and without it, as the IR-based code generator can produce noticeably different bytecode sizes. See the [optimizer options](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options) for details.

## Small impact {#small-impact}

### Avoid passing structs to functions {#avoid-passing-structs-to-functions}

If you are using [ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) (the default since Solidity 0.8.0), it can help to not pass structs to a function. Instead of passing the parameter as a struct, pass the required parameters directly. In this example we saved another **0.1kb**.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### Declare correct visibility for functions and variables {#declare-correct-visibility-for-functions-and-variables}

- Functions or variables that are only called from the outside? Declare them as `external` instead of `public`.
- Functions or variables only called from within the contract? Declare them as `private` or `internal` instead of `public`.

### Remove modifiers {#remove-modifiers}

Modifiers, especially when used intensely, could have a significant impact on the contract size. Consider removing them and instead use functions.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

Those tips should help you to significantly reduce the contract size. Once again, I cannot stress enough, always focus on splitting contracts if possible for the biggest impact.
