---
title: ERC-20 with Safety Rails
description: How to help people avoid silly mistakes
author: Ori Pomerantz
lang: en
tags: ["erc-20"]
skill: beginner
breadcrumb: ERC-20 safety
published: 2022-08-15
---

## Introduction {#introduction}

One of the great things about Ethereum is that there is no central authority that can modify or undo your transactions. One of the great problems with Ethereum is that there is no central authority with the power to undo user mistakes or illicit transactions. In this article you learn about some of the common mistakes that users commit with [ERC-20](/developers/docs/standards/tokens/erc-20/) tokens, as well as how to create ERC-20 contracts that help users to avoid those mistakes, or that give a central authority some power (for example to freeze accounts).

Note that while we will use the [OpenZeppelin ERC-20 token contract](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), this article does not explain it in great details. You can find this information [here](/developers/tutorials/erc20-annotated-code).

If you want to see the complete source code:

1. Open the [Remix IDE](https://remix.ethereum.org/).
2. Click the clone github icon (![clone github icon](icon-clone.png)).
3. Clone the github repository `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Open **contracts > erc20-safety-rails.sol**.

Note that the repository was written for OpenZeppelin Contracts 4.7.2, where the function this article overrides is called `_beforeTokenTransfer`. This article uses the current OpenZeppelin Contracts 5.x, where you override `_update` instead, so the code in this article differs slightly from the code in the repository.

## Creating an ERC-20 contract {#creating-an-erc-20-contract}

Before we can add the safety rail functionality we need an ERC-20 contract. In this article we'll use [the OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Open it in another browser and follow these instructions:

1. Select **ERC20**.
2. Enter these settings:

   | Parameter      | Value                     |
   | -------------- | ------------------------- |
   | Name           | SafetyRailsToken          |
   | Symbol         | SAFE                      |
   | Premint        | 1000                      |
   | Features       | None (uncheck **Permit**) |
   | Access Control | Ownable                   |
   | Upgradability  | None                      |

3. Scroll up and click **Open in Remix** (for Remix) or **Download** to use a different environment. I'm going to assume you're using Remix, if you use something else just make the appropriate changes.
4. We now have a fully functional ERC-20 contract. You can expand `.deps` > `npm` to see the imported code.
5. Compile, deploy, and play with the contract to see that it functions as an ERC-20 contract. If you need to learn how to use Remix, [use this tutorial](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Common mistakes {#common-mistakes}

### The mistakes {#the-mistakes}

Users sometimes send tokens to the wrong address. While we cannot read their minds to know what they meant to do, there are two error types that happen a lot and are easy to detect:

1. Sending the tokens to the contract's own address. For example, [Optimism's OP token](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) managed to accumulate [over 120,000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP tokens in less than two months. This represents a significant amount of wealth that presumably people just lost.

2. Sending the tokens to an empty address, one that doesn't correspond to an [externally owned account](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) or a [smart contract](/developers/docs/smart-contracts). While I don't have statistics on how often this happens, [one incident could have cost 20,000,000 tokens](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Preventing transfers {#preventing-transfers}

In the OpenZeppelin ERC-20 contract every change in balances, whether it's a transfer, a mint, or a burn, goes through [an internal function, `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-). We can override it to hang our own functionality on it, such as checks that revert if there's a problem.

To do so, add this function after the constructor:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

Some parts of this function may be new if you aren't very familiar with Solidity:

```solidity
        internal virtual
```

The `virtual` keyword means that just as we inherited functionality from `ERC20` and overrode this function, other contracts can inherit from us and override this function.

```solidity
        override(ERC20)
```

We have to specify explicitly that we're [overriding](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) the ERC20 token definition of `_update`. In general, explicit definitions are a lot better, from the security standpoint, than implicit ones - you cannot forget that you've done something if it's right in front of you. That is also the reason we need to specify which superclass's `_update` we are overriding.

```solidity
        super._update(from, to, value);
```

This line calls the `_update` function of the contract or contracts from which we inherited which have it. In this case, that is only `ERC20`, `Ownable` does not have this function. Unlike an empty hook, `ERC20._update` is what actually moves the tokens, so it is essential to call it. Our checks go before this call, so they can revert before any balance changes.

### Coding the requirements {#coding-the-requirements}

We want to add these requirements to the function. Because `_update` is also called when tokens are burned, with `to` set to `address(0)`, we only check `to` when it is not `address(0)`:

- The `to` address cannot equal `address(this)`, the address of the ERC-20 contract itself.
- The `to` address cannot be empty, it has to be either:
  - An externally owned account (EOA). We can't check if an address is an EOA directly, but we can check an address's ETH balance. EOAs almost always have a balance, even if they are no longer used - it's difficult to clear them to the last wei.
  - A smart contract. Testing if an address is a smart contract is a bit harder. There is an opcode that checks the external code length, called [`EXTCODESIZE`](https://www.evm.codes/#3b). In Solidity you can get it with [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types), which the compiler turns into `EXTCODESIZE`. Here we use [Yul](https://docs.soliditylang.org/en/latest/yul.html), which is EVM assembly, to show how to call the opcode directly. Note that since [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) an EOA can also have code (a delegation to a contract), so this check identifies accounts with code, not strictly contracts. For our purpose, rejecting empty addresses, that is fine.

Here is the complete function:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // Burning sends tokens to address(0), don't block it
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

Lets go over the new code line by line:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

This is the first requirement, check that `to` and `this(address)` are not the same thing.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

This is how we check if an address is a contract. We cannot receive output directly from Yul, so instead we define a variable to hold the result (`isToContract` in this case). The way Yul works is that every opcode is considered a function. So first we call [`EXTCODESIZE`](https://www.evm.codes/#3b) to get the contract size, and then use [`GT`](https://www.evm.codes/#11) to check it is not zero (we are dealing with unsigned integers, so of course it can't be negative). We then write the result to `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

And finally, we have the actual check for empty addresses.

## Administrative access {#admin-access}

Sometimes it is useful to have an administrator that can undo mistakes. To reduce the potential for abuse, this administrator can be a [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) so multiple people have to agree on an action. In this article we'll have two administrative features:

1. Freezing and unfreezing accounts. This can be useful, for example, when an account might be compromised.
2. Asset cleanup.

   Sometimes frauds send fraudulent tokens to the real token's contract to gain legitimacy. For example, [see here](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). The legitimate ERC-20 contract is [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). The scam that pretends to be it is [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   It is also possible that people send legitimate ERC-20 tokens to our contract by mistake, which is another reason to want to have a way to get them out.

OpenZeppelin provides two mechanisms to enable administrative access:

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) contracts have a single owner. Functions that have the `onlyOwner` [modifier](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) can only be called by that owner. Owners can transfer ownership to somebody else or renounce it completely. The rights of all other accounts are typically identical.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) contracts have [role based access control (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

For the sake of simplicity, in this article we use `Ownable`.

### Freezing and thawing contracts {#freezing-and-thawing-contracts}

Freezing and thawing contracts requires several changes:

- A [mapping](https://docs.soliditylang.org/en/latest/types.html#mapping-types) from addresses to [booleans](https://en.wikipedia.org/wiki/Boolean_data_type) to keep track of which addresses are frozen. All values are initially zero, which for boolean values is interpreted as false. This is what we want because by default accounts are not frozen.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Events](https://docs.soliditylang.org/en/latest/contracts.html#events) to inform anybody interested when an account is frozen or thawed. Technically speaking events are not required for these actions, but it helps offchain code to be able to listen to these events and know what is happening. It's considered good manners for a smart contract to emit them when something that might be relevant to somebody else happens.

  The events are indexed so will be possible to search for all the times an account has been frozen or thawed.

  ```solidity
    // When accounts are frozen or unfrozen
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Functions for freezing and thawing accounts. These two functions are nearly identical, so we'll only go over the freeze function.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Functions marked [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) can be called from other smart contracts or directly by a transaction.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  If the account is already frozen, revert. Otherwise, freeze it and `emit` an event.

- Change `_update` to prevent money being moved from a frozen account. Note that money can still be transferred into the frozen account. Put this line at the start of the function, outside the `if` block, so it also prevents burning tokens from a frozen account.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Asset cleanup {#asset-cleanup}

To release ERC-20 tokens held by this contract we need to call a function on the token contract to which they belong, either [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) or [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). There's no point wasting gas in this case on allowances, we might as well transfer directly.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

This is the syntax to create an object for a contract when we receive the address. To use it we need [the definition for IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), the interface for an OpenZeppelin ERC-20 contract. The Wizard's `import {ERC20} from ...` line only brings in `ERC20`, so add this line next to the other imports at the top of the file:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

This is a cleanup function, so presumably we don't want to leave any tokens. Instead of getting the balance from the user manually, we might as well automate the process.

## Conclusion {#conclusion}

This is not a perfect solution - there is no perfect solution for the "user made a mistake" problem. However, using these kinds of checks can at least prevent some mistakes. The ability to freeze accounts, while dangerous, can be used to limit the damage of certain hacks by denying the hacker the stolen funds.

[See here for more of my work](https://cryptodocguy.pro/).
