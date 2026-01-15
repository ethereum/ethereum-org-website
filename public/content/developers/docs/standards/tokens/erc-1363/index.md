---
title: ERC-1363 Payable Token Standard
description: ERC-1363 is an extension interface for ERC-20 tokens that supports executing custom logic on a recipient contract after transfers, or on a spender contract after approvals, all within a single transaction.
lang: en
---

## Introduction {#introduction}

### What is ERC-1363? {#what-is-erc1363}

ERC-1363 is an extension interface for ERC-20 tokens that supports executing custom logic on a recipient contract after transfers, or on a spender contract after approvals, all within a single transaction.

### Differences from ERC-20 {#erc20-differences}

Standard ERC-20 operations like `transfer`, `transferFrom` and `approve`, do not allow code execution on the recipient or spender contract without a separate transaction.
This introduces complexity in UI development and friction on adoption because users must wait for the first transaction to be executed and then submit the second one.
They must also pay GAS twice.

ERC-1363 makes fungible tokens capable of performing actions more easily and working without the use of any off-chain listener.
It allows to make a callback on a receiver or spender contract, after a transfer or an approval, in a single transaction.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read about:

- [Token standards](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

ERC-1363 introduces a standard API for ERC-20 tokens to interact with smart contracts after `transfer`, `transferFrom` or `approve`.

This standard provides basic functionality to transfer tokens, as well as allow tokens to be approved so they can be spent by another on-chain third party, and then make a callback on the receiver or spender contract.

There are many proposed uses of smart contracts that can accept ERC-20 callbacks.

Examples could be:

- **Crowdsales**: tokens sent trigger instant reward allocation.
- **Services**: payment activates service access in one step.
- **Invoices**: tokens settle invoices automatically.
- **Subscriptions**: approving annual rate activates subscription within the first month’s payment.

For these reasons it was originally named **"Payable Token"**.

The callback behavior further expands its utility, enabling seamless interactions like:

- **Staking**: tokens transferred trigger automatic locking in a staking contract.
- **Voting**: tokens received register votes in a governance system.
- **Swapping**: token approvals activate swap logic in a single step.

ERC-1363 tokens can be used for specific utilities in all cases that require a callback to be executed after a transfer or an approval received.
ERC-1363 is also useful for avoiding token loss or token locking in smart contracts by verifying the recipient's ability to handle tokens.

Unlike other ERC-20 extension proposals, ERC-1363 doesn't override the ERC-20 `transfer` and `transferFrom` methods and defines the interfaces IDs to be implemented maintaining backward compatibility with ERC-20.

From [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Methods {#methods}

Smart contracts implementing the ERC-1363 standard **MUST** implement all of the functions in the `ERC1363` interface, as well as the `ERC20` and `ERC165` interfaces.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev An extension interface for ERC-20 tokens that supports executing code on a recipient contract
 * after `transfer` or `transferFrom`, or code on a spender contract after `approve`, in a single transaction.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOTE: the ERC-165 identifier for this interface is 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Moves a `value` amount of tokens from the caller's account to `to`
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Moves a `value` amount of tokens from the caller's account to `to`
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @param data Additional data with no specified format, sent in call to `to`.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Moves a `value` amount of tokens from `from` to `to` using the allowance mechanism
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param from The address from which to send tokens.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Moves a `value` amount of tokens from `from` to `to` using the allowance mechanism
   * and then calls `ERC1363Receiver::onTransferReceived` on `to`.
   * @param from The address from which to send tokens.
   * @param to The address to which tokens are being transferred.
   * @param value The amount of tokens to be transferred.
   * @param data Additional data with no specified format, sent in call to `to`.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Sets a `value` amount of tokens as the allowance of `spender` over the caller's tokens
   * and then calls `ERC1363Spender::onApprovalReceived` on `spender`.
   * @param spender The address which will spend the funds.
   * @param value The amount of tokens to be spent.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Sets a `value` amount of tokens as the allowance of `spender` over the caller's tokens
   * and then calls `ERC1363Spender::onApprovalReceived` on `spender`.
   * @param spender The address which will spend the funds.
   * @param value The amount of tokens to be spent.
   * @param data Additional data with no specified format, sent in call to `spender`.
   * @return A boolean value indicating the operation succeeded unless throwing.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

A smart contract that wants to accept ERC-1363 tokens via `transferAndCall` or `transferFromAndCall` **MUST** implement the `ERC1363Receiver` interface:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Interface for any contract that wants to support `transferAndCall` or `transferFromAndCall` from ERC-1363 token contracts.
 */
interface ERC1363Receiver {
  /**
   * @dev Whenever ERC-1363 tokens are transferred to this contract via `ERC1363::transferAndCall` or `ERC1363::transferFromAndCall`
   * by `operator` from `from`, this function is called.
   *
   * NOTE: To accept the transfer, this must return
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (i.e. 0x88a7ca5c, or its own function selector).
   *
   * @param operator The address which called `transferAndCall` or `transferFromAndCall` function.
   * @param from The address which are tokens transferred from.
   * @param value The amount of tokens transferred.
   * @param data Additional data with no specified format.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` if transfer is allowed unless throwing.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

A smart contract that wants to accept ERC-1363 tokens via `approveAndCall` **MUST** implement the `ERC1363Spender` interface:

```solidity
/**
 * @title ERC1363Spender
 * @dev Interface for any contract that wants to support `approveAndCall` from ERC-1363 token contracts.
 */
interface ERC1363Spender {
  /**
   * @dev Whenever an ERC-1363 tokens `owner` approves this contract via `ERC1363::approveAndCall`
   * to spend their tokens, this function is called.
   *
   * NOTE: To accept the approval, this must return
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (i.e. 0x7b04a2d0, or its own function selector).
   *
   * @param owner The address which called `approveAndCall` function and previously owned the tokens.
   * @param value The amount of tokens to be spent.
   * @param data Additional data with no specified format.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` if approval is allowed unless throwing.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Further reading {#further-reading}

- [ERC-1363: Payable Token Standard](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub Repo](https://github.com/vittominacori/erc1363-payable-token)
