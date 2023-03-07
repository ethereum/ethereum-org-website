---
title: ERC-223 Token Standard
description:
lang: en
---

## Introduction {#introduction}

**What is ERC-223?**

The ERC-223 is another standard for Fungible Tokens, like the ERC-20. The key difference is that ERC-223 defines not only the token API, but also the logic of how tokens should be transferred from sender to recipient and introduces a communication model that allows token transfers to be handled on the recipients side.

**How is it different from ERC-20 and why we need another token standard?**

ERC-223 addresses some limitations of ERC-20 and introduces a new method of interactions between token contract and a contract that may receive the tokens. There are few things that are possible with ERC-223 but not with ERC-20:

- Token transfer handling on the recipient's side. Recipient can detect that a ERC-223 token is being deposited.
- Rejection of improperly sent tokens. If a user sent ERC-223 tokens to a contract that is not supposed to receive tokens then the contract can reject the transaction and the tokens will not be lost.
- The transfer of ERC-223 tokens may contain metadata, which allows arbitrary information to be attached to the token transactions.

## Prerequisites {#prerequisites}

- [Accounts](/developers/docs/accounts)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token standards](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

The ERC-223 (Ethereum Request for Comments 223), proposed by Dexaran in March 2017, is a Token Standard that
implements an API for tokens within Smart Contracts and declares API for a contract that is supposed to receive ERC-223 tokens. Any contract that does not support ERC-223 Receiver API can not receive ERC-223 tokens which prevents the most common user mistakes.

If a Smart Contract implements the following methods and events it can be called a ERC-223 compatible token contract and, once deployed, it
will be responsible to keep track of the created tokens on Ethereum.

The contract is not obligated to have only this functions and a developer can add any other feature from different token standards to this contract. For example, `approve` and `transferFrom` functions are not part of ERC-223 standard but these functions could be implemented should it be necessary.

From [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

#### Methods {#methods}

ERC-223 token must implement the following methods:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

A contract that is supposed to receive ERC-223 tokens must implement the following method:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

If ERC-223 tokens are sent to a contract that doesn't implement the `tokenReceived(..)` function then the transfer must fail and the tokens must not be moved from the sender's balance.

#### Events {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Examples {#web3py-example}

The API of ERC-223 token is similar to that of ERC-20, so from UI development point of view there is no difference. The only exception here is that ERC-223 tokens may  not have `approve` + `transferFrom` functions as these are optional for this standard.

## Further reading {#further-reading}

- [EIP-223: ERC-223 Token Standard](https://eips.ethereum.org/EIPS/eip-223)
- [Initial ERC-223 proposal](https://github.com/ethereum/eips/issues/223)
