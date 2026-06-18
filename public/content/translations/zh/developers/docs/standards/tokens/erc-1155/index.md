---
title: ERC-1155 多代币标准
description: 了解 ERC-1155，这是一种在单个合约中结合了同质化代币和非同质化代币的多代币标准。
lang: zh
---

## 简介 {#introduction}

用于管理多种代币类型的合约的标准接口。单个部署的合约可以包含同质化代币、非同质化代币或其他配置（例如半同质化代币）的任意组合。

**多代币标准是什么意思？**

这个想法很简单，旨在创建一个可以表示和控制任意数量的同质化和非同质化代币类型的智能合约接口。通过这种方式，ERC-1155 代币可以实现与 [ERC-20](/developers/docs/standards/tokens/erc-20/) 和 [ERC-721](/developers/docs/standards/tokens/erc-721/) 代币相同的功能，甚至可以同时实现两者的功能。它改进了 ERC-20 和 ERC-721 标准的功能，使其更加高效并纠正了明显的实现错误。

ERC-1155 代币在 [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) 中有完整描述。

## 前提条件 {#prerequisites}

为了更好地理解本页面，我们建议你首先阅读有关[代币标准](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/) 和 [ERC-721](/developers/docs/standards/tokens/erc-721/) 的内容。

## ERC-1155 功能和特点： {#body}

- [批量转账](#batch-transfers)：在一次调用中转账多个资产。
- [批量余额](#batch-balance)：在一次调用中获取多个资产的余额。
- [批量授权](#batch-approval)：将所有代币授权给一个地址。
- [钩子 (Hooks)](#receive-hook)：接收代币钩子。
- [NFT 支持](#nft-support)：如果供应量仅为 1，则将其视为 NFT。
- [安全转账规则](#safe-transfer-rule)：用于安全转账的一组规则。

### 批量转账 {#batch-transfers}

批量转账的工作原理与常规的 ERC-20 转账非常相似。让我们看看常规的 ERC-20 `transferFrom` 函数：

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

ERC-1155 中唯一的区别是我们以数组形式传递值，并且还传递一个 ID 数组。例如，给定 `ids=[3, 6, 13]` 和 `values=[100, 200, 5]`，产生的转账将是：

1. 将 100 个 ID 为 3 的代币从 `_from` 转账到 `_to`。
2. 将 200 个 ID 为 6 的代币从 `_from` 转账到 `_to`。
3. 将 5 个 ID 为 13 的代币从 `_from` 转账到 `_to`。

在 ERC-1155 中，我们只有 `transferFrom`，没有 `transfer`。要像常规的 `transfer` 一样使用它，只需将 from 地址设置为调用该函数的地址即可。

### 批量余额 {#batch-balance}

相应的 ERC-20 `balanceOf` 调用同样具有支持批处理的对应函数。提醒一下，这是 ERC-20 版本：

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

对于余额调用来说甚至更简单，我们可以在一次调用中检索多个余额。我们传递所有者数组，然后传递代币 ID 数组。

例如，给定 `_ids=[3, 6, 13]` 和 `_owners=[0xbeef..., 0x1337..., 0x1111...]`，返回值将是：

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### 批量授权 {#batch-approval}

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

授权与 ERC-20 略有不同。你不是授权特定金额，而是通过 `setApprovalForAll` 将操作员设置为已授权或未授权。

可以通过 `isApprovedForAll` 读取当前状态。如你所见，这是一个全有或全无的操作。你无法定义要授权多少代币，甚至无法定义哪个代币类别。

这是为了保持简单而有意设计的。你只能为一个地址授权所有内容。

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

鉴于 [EIP-165](https://eips.ethereum.org/EIPS/eip-165) 的支持，ERC-1155 仅支持智能合约的接收钩子。钩子函数必须返回一个预定义的魔术 bytes4 值，如下所示：

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

当接收合约返回此值时，即假定该合约接受转账并知道如何处理 ERC-1155 代币。太棒了，合约中不再有卡住的代币！

### NFT 支持 {#nft-support}

当供应量仅为 1 时，该代币本质上是一个非同质化代币 (NFT)。与 ERC-721 的标准一样，你可以定义一个元数据 URL。该 URL 可以被客户端读取和修改，请参见[此处](https://eips.ethereum.org/EIPS/eip-1155#metadata)。

### 安全转账规则 {#safe-transfer-rule}

在前面的解释中，我们已经提到了一些安全转账规则。但让我们看看其中最重要的规则：

1. 调用者必须被授权花费 `_from` 地址的代币，或者调用者必须等于 `_from`。
2. 如果出现以下情况，转账调用必须回退：
   1. `_to` 地址为 0。
   2. `_ids` 的长度与 `_values` 的长度不同。
   3. `_ids` 中代币持有者的任何余额低于发送给接收者的 `_values` 中的相应金额。
   4. 发生任何其他错误。

_注意_：所有批量函数（包括钩子）也存在非批量版本。这样做是为了提高 Gas 效率，考虑到仅转账一个资产可能仍然是最常用的方式。为了简化解释（包括安全转账规则），我们省略了它们。名称是相同的，只需删除“Batch”即可。

## 延伸阅读 {#further-reading}

- [EIP-1155：多代币标准](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155：欧本齐柏林文档](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155：GitHub 仓库](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)