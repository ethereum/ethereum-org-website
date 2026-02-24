---
title: "ERC-1155 多代币标准"
description: "了解 ERC-1155，这是一种多代币标准，可在单个合约中组合同质化代币和非同质化代币。"
lang: zh
---

## 简介 {#introduction}

用于多种代币管理的合约标准接口。 单个已部署的合约可以包含同质化代币、非同质化代币或其他配置（例如半同质化代币）的任何组合。

**什么是多代币标准？**

它的目的很单纯，就是创建一个智能合约接口，可以代表和控制任何数量的同质化和非同质化代币类型。 通过这种方式，ERC-1155 代币可以执行与 [ERC-20](/developers/docs/standards/tokens/erc-20/) 和 [ERC-721](/developers/docs/standards/tokens/erc-721/) 代币相同的功能，甚至可以同时执行这两种功能。 它改进了 ERC-20 和 ERC-721 标准的功能，提升了效率并纠正了实现中的明显错误。

[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) 中对 ERC-1155 代币有全面说明。

## 前提条件 {#prerequisites}

为了更好地理解本页面，我们建议您首先阅读有关[代币标准](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/) 和 [ERC-721](/developers/docs/standards/tokens/erc-721/) 的内容。

## ERC-1155 的功能和特点：{#body}

- [批量转账](#batch_transfers)：在单次调用中转账多个资产。
- [批量余额](#batch_balance)：在单次调用中获取多个资产的余额。
- [批量批准](#batch_approval)：向一个地址批准所有代币。
- [钩子](#receive_hook)：接收代币的钩子。
- [NFT 支持](#nft_support)：如果供应量仅为 1，则将其视为 NFT。
- [安全转账规则](#safe_transfer_rule)：用于安全转账的一套规则。

### 批量转账 {#batch-transfers}

批量传输与常规 ERC-20 传输非常相似。 让我们看看常规的 ERC-20 `transferFrom` 函数：

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

ERC-1155 中唯一的区别是我们将值作为数组传递，同时也传递了 ids 数组。 例如，给定 `ids=[3, 6, 13]` 和 `values=[100, 200, 5]`，产生的转账将是

1. 将 100 个 ID 为 3 的代币从 `_from` 转账到 `_to`。
2. 将 200 个 ID 为 6 的代币从 `_from` 转账到 `_to`。
3. 将 5 个 ID 为 13 的代币从 `_from` 转账到 `_to`。

在 ERC-1155 中，我们只有 `transferFrom`，没有 `transfer`。 要像常规 `transfer` 一样使用它，只需将 from 地址设置为调用该函数的地址。

### 批量余额 {#batch-balance}

相应的 ERC-20 `balanceOf` 调用同样有其支持批量处理的伙伴函数。 作为对比，这是 ERC-20 版本：

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

例如，给定 `_ids=[3, 6, 13]` 和 `_owners=[0xbeef..., 0x1337..., 0x1111...]`，返回值将是

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### 批量批准 {#batch-approval}

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

审批过程与 ERC-20 略有不同。 无需批准特定数额，你可以通过 `setApprovalForAll` 将一个操作员设置为“已批准”或“未批准”。

可通过 `isApprovedForAll` 读取当前状态。 如你所见，要么全部批准，要么不批准。 不能定义要批准代币的数量，甚至代币类型。

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

有了 [EIP-165](https://eips.ethereum.org/EIPS/eip-165) 支持，ERC-1155 仅支持智能合约的接收钩子。 钩子函数必须返回一个事先预定义的 4 字节值，这个值被指定为：

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

当接收合约返回这一值时，意味着合约知道如何处理 ERC-1155 代币并接受转账。 太好了，代币不会再卡在合约中了！

### NFT 支持 {#nft-support}

当供应量仅为 1 时，代币本质上就是一个非同质化的代币 (NFT)。 按照 ERC-721 的标准，你可以定义一个元数据网址。 客户端可以读取和修改该 URL，请参阅[此处](https://eips.ethereum.org/EIPS/eip-1155#metadata)。

### 安全转账规则 {#safe-transfer-rule}

在前面的解释中，我们已经提到过一些安全转账规则。 现在我们来看一下最重要的规则：

1. 调用者必须被批准可为 `_from` 地址消费代币，或者调用者必须等于 `_from`。
2. 在以下情况下，转账调用将回退
   1. `_to` 地址是 0。
   2. `_ids` 的长度与 `_values` 的长度不同。
   3. `_ids` 中代币持有者的任何余额低于发送给接收者的 `_values` 中的相应数额。
   4. 出现任何其他错误。

_注意_：所有批量处理函数（包括钩子）也都存在非批量处理的版本。 这样做是为了提高燃料效率，考虑到只转移一种资产可能仍然是最常用的方式。 简洁起见，我们没有在这里介绍这些非批处理的版本，包括安全转账规则。 名称是相同的，只需移除 'Batch'。

## 扩展阅读{#further-reading}

- [EIP-1155：多代币标准](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155：OpenZeppelin 文档](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155：GitHub 代码库](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
