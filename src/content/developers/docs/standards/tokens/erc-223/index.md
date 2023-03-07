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

### Examples {#solidity-example}

The purpose of this example is to illustrate how a contract must work with ERC-223 tokens.

Assume that we have a very basic ERC-223 token:

```solidity
pragma solidity ^0.8.19;

abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}

contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);

    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    
    mapping(address => uint256) public balances;

    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function name() public view returns (string memory){
        return _name;
    }
    function symbol() public view returns (string memory){
        return _symbol;
    }
    function decimals() public view returns (uint8){
        return _decimals;
    }
    function totalSupply() public view returns (uint256){
        return _totalSupply;
    }
    function balanceOf(address _owner) public view returns (uint256){
        return balances[_owner];
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Now we want another contract to accept deposits of `tokenA` assuming that tokenA is a ERC-223 token. The contract must accept only tokenA and reject any other tokens. When the contract receives tokenA it must emit a `Deposit()` event and increase the value of the internal `deposits` variable.

Here is the code:

```solidity
contract Recipient is IERC223Recipient {
    event Deposit();
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit();
    }
}
```

## Further reading {#further-reading}

- [EIP-223: ERC-223 Token Standard](https://eips.ethereum.org/EIPS/eip-223)
- [Initial ERC-223 proposal](https://github.com/ethereum/eips/issues/223)
