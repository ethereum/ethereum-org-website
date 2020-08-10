---
title: Introduction to smart contracts
description:
lang: en
sidebar: true
---

# Introduction to smart contracts

**Original author:** Chrischinchilla
**Link:** https://kauri.io/an-introduction-to-solidity-for-experienced-develo/16b7b58597fc4a9e848b29a6299ee967/ahttps:/kauri.io/an-introduction-to-solidity-for-experienced-develo/16b7b58597fc4a9e848b29a6299ee967/a

<Divider />

This is an introduction to smart contracts written in [Solidity](/en/edn/ethereum-development/smart-contracts/languages/solidity/)

## Prerequisites

You're an experienced JavaScript/Java/Python/Go/Ruby/Rust/COBOL/somethingelse developer and have heard about this Ethereum thing. You took a quick look at Solidity, and it looked familiar, but you saw some terms that were new and confusing. Maybe you even tried running an Ethereum node or two locally, and it looked a bit like some other distributed systems you tried before, but all that accounts and addresses stuff was new.

This post tries to explain some of these concepts in terms that are hopefully more familiar to you and compare them to similar concepts in other programming languages.

## Addresses, accounts, and balances

Pretty much everything on the Ethereum network has an address. For many interactions with the network, you need an account, and that account has an address. If you create a smart contract and set it run on the Ethereum network, it also has an address that is different from your personal address.

All accounts on Ethereum networks have a balance of the ETH cryptocurrency. This currency is used to pay for transactions and interactions on the network.

Just when you thought it was all starting to make sense, it's worth pointing out that there are different Ethereum networks, and you have different accounts and balances on each of them. Practically speaking, this means that if you are testing your smart contracts on a test network, or a private or local network, the ETH you add to your account doesn't cost you anything.

## Functions and variables

Like Java function methods, Solidity function modifiers change the way that code interacts with them, and how the compiler deals with them.

### Visibility

A function or variable declared as private is only visible to the contract that defines it.

A function or variable declared as internal is only visible to the contract that defines it, or any contracts derived from that contract.

For example with data of the C contract marked as internal or private:

```
pragma solidity >=0.4.0 <0.7.0;

contract C {
 uint internal data = 42;
}

contract Caller {
 C c = new C();
 function f() public view returns (uint) {
 return c.data();
 }
}
```

An attempt to call it from contract `Caller` results in a compiler error:

```
TypeError: Member "data" not found or not visible after argument-dependent lookup in contract C.
return c.data();
^----^
```

A function or variable declared as `public` is part of the contract interface, and are accessible to all other contracts. The EVM also generates a getter function for public state variables automatically. For example, by marking `data` as `public`, the `Caller` contract can "get" the value via a convenience function:

```
pragma solidity >=0.4.0 <0.7.0;

contract C {
    uint public data = 42;
}

contract Caller {
    C c = new C();
    function f() public view returns (uint) {
        return c.data();
    }
}
```

A function (not variable) declared as `external` is only part of the contract interface, and can be called by external contracts, but not internal ones.

For example, assigning `get()` to `localData` results in an error, using it within `Caller` does not:

```
pragma solidity >=0.4.0 <0.7.0;

contract SimpleStorage {
    uint storedData;

    function get() external view returns (uint) {
        return storedData;
    }

    uint localData = get();
}

contract Caller {
    SimpleStorage c = new SimpleStorage();
    function f() public view returns (uint) {
        return c.get();
    }
}
```

Read more details about visibility in the [documentation](https://solidity.readthedocs.io/v0.5.15/v0.5.12/contracts.html#visibility-and-getters).

Getter functions operate similarly to other programming languages and provide a convenience function to access the value of a public state variable. You access the value from the getter function by creating an instance of the contract that provides the variable in the calling contract. For example:

```
pragma solidity >=0.4.0 <0.7.0;

contract C {
 uint public data = 42;
}

contract Caller {
 C c = new C();
 function f() public view returns (uint) {
 return c.data();
 }
}
```

Like other languages, Solidity doesn't provide any special functionality for setter functions, and it is up to you to implement them based on your needs.

### Protecting state with `view` and `pure`

A function declared `view` promises not to modify state. A function declared `pure` promises not to modify or read from state. When compiling the contract, the compiler throws an error if a function marked `view` or `pure` does not meet this promise. For example:

pragma solidity >=0.5.0 <0.7.0;

```
contract C {
    uint c;
    function f(uint a, uint b) public view returns (uint) {
        c = a * (b + 42) + now;
    }
}
```

Results in the following error (and similar for `pure`):

```
TypeError: Function declared as view, but this expression (potentially) modifies the state and thus requires non-payable (the default) or payable.

        c = a * (b + 42) + now;
        ^
```

## Interfaces and abstract contracts

Similar to classes in C++ or Java, interfaces, and abstract contracts in Solidity are a way of implementing inheritance.

[An abstract contract](https://solidity.readthedocs.io/v0.5.15/v0.5.12/contracts.html#abstract-contracts) is a contract with at least one function that lacks an implementation. An abstract contract is not compiled, but other contracts can use it as a base contract. If the contract inherits from an abstract contract, but doesn't implement all the non-implemented functions, then it is also an abstract contract.

[Interfaces](https://solidity.readthedocs.io/v0.5.15/v0.5.12/contracts.html#interfaces) are similar, but are more restricted:

- They cannot implement any functions.
- They cannot inherit other contracts or interfaces.
- All declared functions must be external.
- They cannot declare a constructor.
- They cannot declare state variables.

## Error handling

Solidity does not have the concept of `try/catch` common in other programming languages. Instead, it provides 3 convenience functions to check if conditions are met before performing an operation. If the conditions are not met, all changes made to state in the current function call (and sub-calls) are reverted, and an error message generated. The three functions work in slightly different ways, and to serve different potential error flows. Read more about the details and how to use them in [the documentation](https://solidity.readthedocs.io/v0.5.15/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions).

## Subscribing to events

A blockchain is essentially an immutable ledger of events, and this isn't too dissimilar from other "traditional" systems such as event stores, write-ahead logs, or immutable data streams. Typically when your application uses such a tool, you have applications that publish and subscribe (pubsub) to them. With Ethereum, the smart contract is always the publisher, but the subscriber can be any other application you want that listens to the event emitting from the blockchain.

With a Solidity smart contract, you first define the data structure of the event you want to emit and then emit it. For example:

```
pragma solidity >=0.4.21 <0.7.0;

contract ClientReceipt {
 event Deposit(
 address indexed _from,
 bytes32 indexed _id,
 uint _value
 );

 function deposit(bytes32 _id) public payable {
 emit Deposit(msg.sender, _id, msg.value);
 }
}
```

Read the documentation for more details on [events](https://solidity.readthedocs.io/v0.5.15/latest/contracts.html#events).

## Storage locations

Some C-style languages allow you to specify if a variable should be stored in a register instead of RAM, but Solidity adds other location options that reflect the nature of the EVM Solidity code runs within.

These are:

- "Storage", where values persist between calls but cost more gas to read from.
- "Memory", where every call to the contract creates a cleared instance of the variable.
- "Stack", is similar to the register, but has limited access options.

Find more details in the [documentation](https://solidity.readthedocs.io/v0.5.15/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

Modularity
You can think of [libraries](https://solidity.readthedocs.io/v0.5.15/v0.5.12/contracts.html#libraries) as something like an `include`, `import` or `require` statement for using any public functions and variables from other contracts. The [`using A for B`](https://solidity.readthedocs.io/v0.5.15/v0.5.12/contracts.html#using-for) statement lets you take this a step further, by attaching library `A` to type `B`. This means that the functions in the library receive the object they are called on as their first parameter. This effectively lets you override or replace functions with library functions, and there are common patterns in Solidity for doing this, such as using the [`SafeMath`](https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath) library to improve arithmetic operations.

Here's an abstracted example of a library definition, and a contract that uses it:

```
pragma solidity >=0.4.22 <0.7.0;


library Set {
 struct Data { mapping(uint => bool) flags; }

 function insert(Data storage self, uint value)
 public
 returns (bool)
 {
 if (self.flags[value])
 return false;
 self.flags[value] = true;
 return true;
 }
}


contract C {
 Set.Data knownValues;

 function register(uint value) public {
 require(Set.insert(knownValues, value));
 }
}
```

And an example of `using A for B`:

```
pragma solidity >=0.4.16 <0.7.0;


library Set {
 struct Data { mapping(uint => bool) flags; }

 function insert(Data storage self, uint value)
 public
 returns (bool)
 {
 if (self.flags[value])
 return false; // already there
 self.flags[value] = true;
 return true;
 }
}


contract C {
 using Set for Set.Data;
 Set.Data knownValues;

 function register(uint value) public {
 require(knownValues.insert(value));
 }
}
```

Read the documentation for more on [libraries](https://solidity.readthedocs.io/v0.5.15/latest/contracts.html#libraries) and [using for](https://solidity.readthedocs.io/v0.5.15/latest/contracts.html#using-for).
