---
title: "ERC-1363 可支付代币标准"
description: "ERC-1363 是 ERC-20 代币的一种扩展接口，支持在转账后于接收方合约上执行自定义逻辑，或在批准后于支出方合约上执行自定义逻辑，所有操作都在单笔交易中完成。"
lang: zh
---

## 简介 {#introduction}

### 什么是 ERC-1363？ {#what-is-erc1363}

ERC-1363 是 ERC-20 代币的一种扩展接口，支持在转账后于接收方合约上执行自定义逻辑，或在批准后于支出方合约上执行自定义逻辑，所有操作都在单笔交易中完成。

### 与 ERC-20 的区别 {#erc20-differences}

标准的 ERC-20 操作（如 `transfer`、`transferFrom` 和 `approve`）不允许在没有单独交易的情况下，在接收方或支出方合约上执行代码。
这给 UI 开发带来了复杂性，也给应用推广带来了阻力，因为用户必须等待第一笔交易执行完毕，然后才能提交第二笔交易。
他们还必须支付两次燃料费用。

ERC-1363 使同质化代币能够更轻松地执行操作，并且无需使用任何链下侦听器即可工作。
它允许在单笔交易中，于转账或批准后，对接收方或支出方合约进行回调。

## 前提条件 {#prerequisites}

为更好地理解本页面，我们建议你先阅读以下内容：

- [代币标准](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 正文 {#body}

ERC-1363 为 ERC-20 代币引入了一个标准应用程序接口 (API)，用于在 `transfer`、`transferFrom` 或 `approve` 之后与智能合约交互。

该标准提供了转移代币的基本功能，并允许代币被批准，以便链上第三方可以使用它们，然后在接收方或支出方合约上进行回调。

有很多关于可接受 ERC-20 回调的智能合约的提议用例。

例如：

- **众筹**：发送代币会触发即时奖励分配。
- **服务**：付款一步即可激活服务访问权限。
- **发票**：代币自动结算发票。
- **订阅**：批准年费率会在支付第一个月费用时激活订阅。

因此，它最初被命名为\*\*“可支付代币”\*\*。

回调行为进一步扩展了其效用，实现了无缝交互，例如：

- **质押**：转移的代币会触发在质押合约中自动锁定。
- **投票**：收到的代币在治理系统中登记为投票。
- **交换**：代币批准一步即可激活交换逻辑。

在所有需要在收到转账或批准后执行回调的情况下，ERC-1363 代币都可用于特定效用。
通过验证接收方处理代币的能力，ERC-1363 还有助于避免智能合约中的代币丢失或代币锁定。

与其他 ERC-20 扩展提案不同，ERC-1363 不会覆盖 ERC-20 的 `transfer` 和 `transferFrom` 方法，而是定义了要实现的接口 ID，从而保持与 ERC-20 的向后兼容性。

来自 [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363)：

### 方法 {#methods}

实现 ERC-1363 标准的智能合约**必须**实现 `ERC1363` 接口以及 `ERC20` 和 `ERC165` 接口中的所有函数。

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 代币的扩展接口，支持在单笔交易中，于 `transfer` 或 `transferFrom` 后在接收方合约上执行代码，或于 `approve` 后在支出方合约上执行代码。
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * 注意：此接口的 ERC-165 标识符是 0xb0202a11。
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev 从调用者的帐户向 `to` 转移 `value` 数量的代币，然后在 `to` 上调用 `ERC1363Receiver::onTransferReceived`。
   * @param to 代币转入的地址。
   * @param value 要转移的代币数量。
   * @return 一个布尔值，表示操作成功，除非抛出错误。
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev 从调用者的帐户向 `to` 转移 `value` 数量的代币，然后在 `to` 上调用 `ERC1363Receiver::onTransferReceived`。
   * @param to 代币转入的地址。
   * @param value 要转移的代币数量。
   * @param data 额外数据，无特定格式，在对 `to` 的调用中发送。
   * @return 一个布尔值，表示操作成功，除非抛出错误。
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev 使用授权机制将 `value` 数量的代币从 `from` 转移到 `to`，然后在 `to` 上调用 `ERC1363Receiver::onTransferReceived`。
   * @param from 发送代币的地址。
   * @param to 代币转入的地址。
   * @param value 要转移的代币数量。
   * @return 一个布尔值，表示操作成功，除非抛出错误。
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev 使用授权机制将 `value` 数量的代币从 `from` 转移到 `to`，然后在 `to` 上调用 `ERC1363Receiver::onTransferReceived`。
   * @param from 发送代币的地址。
   * @param to 代币转入的地址。
   * @param value 要转移的代币数量。
   * @param data 额外数据，无特定格式，在对 `to` 的调用中发送。
   * @return 一个布尔值，表示操作成功，除非抛出错误。
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev 将调用者代币的 `value` 数量设置为 `spender` 的授权额度，然后在 `spender` 上调用 `ERC1363Spender::onApprovalReceived`。
   * @param spender 将使用资金的地址。
   * @param value 要使用的代币数量。
   * @return 一个布尔值，表示操作成功，除非抛出错误。
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev 将调用者代币的 `value` 数量设置为 `spender` 的授权额度，然后在 `spender` 上调用 `ERC1363Spender::onApprovalReceived`。
   * @param spender 将使用资金的地址。
   * @param value 要使用的代币数量。
   * @param data 额外数据，无特定格式，在对 `spender` 的调用中发送。
   * @return 一个布尔值，表示操作成功，除非抛出错误。
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

想要通过 `transferAndCall` 或 `transferFromAndCall` 接受 ERC-1363 代币的智能合约**必须**实现 `ERC1363Receiver` 接口：

```solidity
/**
 * @title ERC1363Receiver
 * @dev 任何想要支持 ERC-1363 代币合约的 `transferAndCall` 或 `transferFromAndCall` 的合约接口。
 */
interface ERC1363Receiver {
  /**
   * @dev 每当 `operator` 从 `from` 通过 `ERC1363::transferAndCall` 或 `ERC1363::transferFromAndCall` 将 ERC-1363 代币转移到此合约时，都会调用此函数。
   *
   * 注意：要接受转账，此函数必须返回
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * （即 0x88a7ca5c，或其自身的函数选择器）。
   *
   * @param operator 调用 `transferAndCall` 或 `transferFromAndCall` 函数的地址。
   * @param from 代币转出的地址。
   * @param value 转移的代币数量。
   * @param data 额外数据，无特定格式。
   * @return 如果允许转账，则返回 `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`，除非抛出错误。
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

想要通过 `approveAndCall` 接受 ERC-1363 代币的智能合约**必须**实现 `ERC1363Spender` 接口：

```solidity
/**
 * @title ERC1363Spender
 * @dev 任何想要支持来自 ERC-1363 代币合约的 `approveAndCall` 的合约接口。
 */
interface ERC1363Spender {
  /**
   * @dev 每当 ERC-1363 代币的 `owner` 通过 `ERC1363::approveAndCall` 批准此合约使用其代币时，都会调用此函数。
   *
   * 注意：要接受批准，此函数必须返回
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * （即 0x7b04a2d0，或其自身的函数选择器）。
   *
   * @param owner 调用 `approveAndCall` 函数且之前拥有代币的地址。
   * @param value 要使用的代币数量。
   * @param data 额外数据，无特定格式。
   * @return 如果允许批准，则返回 `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`，除非抛出错误。
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## 扩展阅读{#further-reading}

- [ERC-1363：可支付代币标准](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363：GitHub 代码库](https://github.com/vittominacori/erc1363-payable-token)
