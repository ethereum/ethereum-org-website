---
title: ERC-1155 多代币标准
description:
lang: zh
---

## 介绍 {#introduction}

用于多种代币管理的合约标准接口。 单个部署的合约可以包括同质化代币、非同质化代币或其他配置（如半同质化代币）的任何组合。

**多代币标准是什么？**

它的目的很单纯，就是创建一个智能合约接口，可以代表和控制任何数量的同质化和非同质化代币类型。 这样一来，ERC-1155 代币就具有与 [ERC-20](/developers/docs/standards/tokens/erc-20/) 和 [ERC-721](/developers/docs/standards/tokens/erc-721/) 代币相同的功能，甚至可以同时使用这两者的功能。 它改进了 ERC-20 和 ERC-721 标准的功能，提升了效率并纠正了实现中的明显错误。

[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) 中对 ERC-1155 代币进行了全面的描述。

## 前提条件 {#prerequisites}

为了更好地理解这一页面的内容，我们建议你先阅读[代币标准](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/) 和 [ERC-721](/developers/docs/standards/tokens/erc-721/)。

## ERC-1155 的功能和特点： {#body}

- [批量传输](#batch_transfers)：通过一次合约调用传输多种资产。
- [批量余额](#batch_balance)：在一次调用中获取多个资产的余额。
- [批量审批](#batch_approval)：审批同一地址的所有代币。
- [Hook](#recieve_hook)：接收代币的钩子函数。
- [支持非同质化代币](#nft_support)：如果供应量仅为 1，将其作为非同质化代币处理。
- [安全转账规则](#safe_transfer_rule)：安全转账规则集。

### 批量传输 {#batch-transfers}

批量传输与常规 ERC-20 传输非常相似。 让我们看看常规 ERC-20 `transferFrom` 函数：

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

ERC-1155 中唯一的区别是我们将值作为数组传递，同时也传递了 ids 数组。 例如，给出 `ids=[3, 6, 13]` 和 `values=[100, 200, 5]`，传输结果将是

1. 将 id 3 的 100 个代币从 `_from` 传输到 `_to`。
2. 将 id 6 的 200 个代币从 `_from` 传输到 `_to`。
3. 将 id 13 的 5 个代币从 `_from` 转移到 `_to`。

在 ERC-1155 中，我们只有 `transferFrom`，没有 `transfer`。 要像常规的 `transfer`一样使用它，只需将 "from" 地址设为调用该函数的地址。

### 批量余额 {#batch-balance}

相应的 ERC-20 `balanceOf` 调用同样具有支持批处理的相应函数。 作为对比，这是 ERC-20 版本：

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

调用余额查询更简单的是，我们可以在单次调用中获取多个余额。 参数中传递所有者帐户数组和代币的 id 数组。

例如，对于给出的 `_ids=[3, 6, 13]` 和 `_owners=[0xbeef..., 0x1337..., 0x1111...]`，返回值将为：

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### 批量审批 {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

审批过程与 ERC-20 略有不同。 这里不是批准特定金额，而是通过 `setApprovalForAll` 函数设置操作帐户为已批准或未批准。

查看当前的审批状态可以通过 `isApprovedForAll` 完成。 如你所见，要么全部批准，要么不批准。 不能定义要批准代币的数量，甚至代币类型。

这是考虑到简洁性而故意设计的。 你只能批准一个地址的所有代币。

### 接收钩子 {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

基于 [EIP-165](https://eips.ethereum.org/EIPS/eip-165) 的协议支持，ERC-1155 只支持智能合约的接收钩子函数。 钩子函数必须返回一个事先预定义的 4 字节值，这个值被指定为：

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

当接收合约返回这一值时，意味着合约知道如何处理 ERC-1155 代币并接受转账。 太好了，代币不会再卡在合约中了！

### 支持非同质化代币 {#nft-support}

当供应量仅为 1 时，代币本质上就是一个非同质化的代币 (NFT)。 按照 ERC-721 的标准，你可以定义一个元数据网址。 客户端可以读取并修改网址，请参阅[这里](https://eips.ethereum.org/EIPS/eip-1155#metadata)。

### 安全转账规则 {#safe-transfer-rule}

在前面的解释中，我们已经提到过一些安全转账规则。 现在我们来看一下最重要的规则：

1. 调用者必须获得批准才能从 `_from` 的帐户地址消费代币，或者调用者帐户地址必须与 `_from` 的帐户地址相同。
2. 在以下情况下，转账调用将回退
   1. `_to` 地址为 0；
   2. `_ids` 的长度与 `_values` 的长度不同；
   3. `_ids` 中代币持有者的任何余额低于发送给接收者的相应 `_value` 金额。
   4. 出现任何其他错误。

_注意_：包括钩子在内的所有批处理函数也均作为非批处理的版本存在。 这样做是为了提高燃料效率，考虑到只转移一种资产可能仍然是最常用的方式。 简洁起见，我们没有在这里介绍这些非批处理的版本，包括安全转账规则。 名称是相同的，只需移除 'Batch'。

## 延伸阅读 {#further-reading}

- [EIP-1155：多代币标准](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155：OpenZeppelin 文档](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155: GitHub Repo](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
