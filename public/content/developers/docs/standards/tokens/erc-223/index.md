---
title: ERC-223 Token Standard
description: An overview of the ERC-223 fungible token standard, how it works, and a comparison to ERC-20.
lang: en
---

## Introduction {#introduction}

### What is ERC-223? {#what-is-erc223}

ERC-223 is a standard for fungible tokens, similar to the ERC-20 standard. The key difference is that ERC-223 defines not only the token API but also the logic for transferring tokens from sender to recipient. It introduces a communication model that allows token transfers to be handled on the recipient's side.

### Differences from ERC-20 {#erc20-differences}

ERC-223 addresses some limitations of ERC-20 and introduces a new method of interaction between the token contract and a contract that may receive the tokens. There are few things that are possible with ERC-223 but not with ERC-20:

- Token transfer handling on the recipient's side: Recipients can detect that an ERC-223 token is being deposited.
- Rejection of improperly sent tokens: If a user sends ERC-223 tokens to a contract not supposed to receive tokens, the contract can reject the transaction, preventing token loss.
- Metadata in transfers: ERC-223 tokens can include metadata, allowing arbitrary information to be attached to token transactions.

## Prerequisites {#prerequisites}

- [Accounts](/developers/docs/accounts)
- [Smart Contracts](/developers/docs/smart-contracts/)
- [Token standards](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

ERC-223 is a token standard that implements an API for tokens within smart contracts. It also declares an API for contracts that are supposed to receive ERC-223 tokens. Contracts that do not support the ERC-223 Receiver API cannot receive ERC-223 tokens, preventing user error.

If a smart contract implements the following methods and events it can be called an ERC-223 compatible token contract. Once deployed, it
will be responsible to keep track of the created tokens on Ethereum.

The contract is not obligated to have only these functions and a developer can add any other feature from different token standards to this contract. For example, `approve` and `transferFrom` functions are not part of ERC-223 standard but these functions could be implemented should it be necessary.

From [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Methods {#methods}

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

### Events {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Examples {#examples}

The API of ERC-223 token is similar to that of ERC-20, so from UI development point of view there is no difference. The only exception here is that ERC-223 tokens may not have `approve` + `transferFrom` functions as these are optional for this standard.

#### Solidity examples {#solidity-example}

The following example illustrates how a basic ERC-223 token contract operates:

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
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
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

Now we want another contract to accept deposits of `tokenA` assuming that tokenA is an ERC-223 token. The contract must accept only tokenA and reject any other tokens. When the contract receives tokenA it must emit a `Deposit()` event and increase the value of the internal `deposits` variable.

Here is the code:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function
        // msg.sender is the address of a token that is being received,
        // msg.value  is always 0 as the token contract does not own or send ether in most cases,
        // _from      is the sender of the token transfer,
        // _value     is the amount of tokens that was deposited.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Frequently asked questions {#faq}

### What will happen if we send some tokenB to the contract? {#sending-tokens}

The transaction will fail, and the transfer of tokens will not happen. The tokens will be returned to the sender's address.

### How can we make a deposit to this contract? {#contract-deposits}

Call the `transfer(address,uint256)` or `transfer(address,uint256,bytes)` function of the ERC-223 token, specifying the address of the `RecipientContract`.

### What will happen if we transfer an ERC-20 token to this contract? {#erc-20-transfers}

If an ERC-20 token is sent to the `RecipientContract`, the tokens will be transferred, but the transfer will not be recognized (no `Deposit()` event will be fired, and the deposits value will not change). Unwanted ERC-20 deposits cannot be filtered or prevented.

### What if we want to execute some function after the token deposit is completed? {#function-execution}

There are multiple ways of doing so. In this example we will follow the method which makes ERC-223 transfers identical to ether transfers:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

When the `RecipientContract` will receive a ERC-223 token the contract will execute a function encoded as `_data` parameter of the token transaction, identical to how ether transactions encode function calls as transaction `data`. Read [the data field](https://ethereum.org/en/developers/docs/transactions/#the-data-field) for more information.

In the above example an ERC-223 token must be transferred to the address of the `RecipientContract` with the `transfer(address,uin256,bytes calldata _data)` function. If the data parameter will be `0xc2985578` (the signature of a `foo()` function) then the function foo() will be invoked after the token deposit is received and the event Foo() will be fired.

Parameters can be encoded in the `data` of the token transfer as well, for example we can call the bar() function with 12345 value for `_someNumber`. In this case the `data` must be `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` where `0x0423a132` is the signature of the `bar(uint256)` function and `00000000000000000000000000000000000000000000000000000000000004d2` is 12345 as uint256.

## Limitations {#limitations}

While ERC-223 addresses several issues found in the ERC-20 standard, it is not without its own limitations:

- Adoption and Compatibility: ERC-223 is not yet widely adopted, which may limit its compatibility with existing tools and platforms.
- Backward Compatibility: ERC-223 is not backward compatible with ERC-20, meaning that existing ERC-20 contracts and tools will not work with ERC-223 tokens without modifications.
- Gas Costs: The additional checks and functionalities in ERC-223 transfers may result in higher gas costs compared to ERC-20 transactions.

## Further reading {#further-reading}

- [EIP-223: ERC-223 Token Standard](https://eips.ethereum.org/EIPS/eip-223)
- [Initial ERC-223 proposal](https://github.com/ethereum/eips/issues/223)
