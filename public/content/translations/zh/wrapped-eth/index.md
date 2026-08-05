---
title: 封装以太币 (WETH)
metaTitle: 什么是封装以太币 (WETH)
description: 封装以太币 (WETH) 简介——一种兼容 ERC-20 的以太币 (ETH) 封装形式。
lang: zh
---

<Alert variant="update">
<Emoji text="🎁" />
<div>连接你的钱包，在 [WrapETH.com](https://www.wrapeth.com/) 上在任何链上封装或解封 ETH</div>
</Alert>

以太币 (ETH) 是以太坊的主要货币。它有多种用途，例如质押、作为货币以及支付计算的 Gas 费。**WETH 实际上是 ETH 的升级形式，具有许多应用和 [ERC-20 代币](/glossary/#erc-20)（以太坊上的其他类型的数字资产）所需的一些附加功能**。为了与这些代币协同工作，ETH 必须遵循与它们相同的规则，即 ERC-20 标准。

为了弥合这一差距，封装以太币 (WETH) 应运而生。**封装以太币是一个智能合约，允许你将任意数量的 ETH 存入合约，并获得相同数量的符合 ERC-20 代币标准的铸造 WETH**。WETH 是 ETH 的一种表现形式，允许你将其作为 ERC-20 代币而不是原生资产 ETH 进行交互。你仍然需要原生 ETH 来支付 Gas 费，因此在存款时请确保保留一些。

你可以使用 WETH 智能合约将 WETH 解封为 ETH。你可以使用 WETH 智能合约赎回任意数量的 WETH，并获得相同数量的 ETH。存入的 WETH 随后会被销毁，并从 WETH 的流通供应量中剔除。

**大约 3% 的 ETH 流通供应量被锁定在 WETH 代币合约中**，使其成为最常用的[智能合约](/glossary/#smart-contract)之一。WETH 对于在去中心化金融 (DeFi) 中与应用交互的用户尤为重要。

## 为什么我们需要将 ETH 封装为 ERC-20？ {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) 为可转移代币定义了一个标准接口，因此任何人都可以创建代币，与以太坊生态系统中采用该标准的应用和代币无缝交互。由于 **ETH 早于 ERC-20 标准出现**，因此 ETH 不符合该规范。这意味着**你无法轻易地**将 ETH 兑换为其他 ERC-20 代币，也**无法在使用 ERC-20 标准的应用中使用 ETH**。封装 ETH 为你提供了执行以下操作的机会：

- **将 ETH 兑换为 ERC-20 代币**：你无法直接将 ETH 兑换为其他 ERC-20 代币。WETH 是符合 ERC-20 同质化代币标准的以太币表现形式，可以与其他 ERC-20 代币进行兑换。

- **在去中心化应用 (dapp) 中使用 ETH**：由于 ETH 不兼容 ERC-20，开发者需要在 dapp 中创建单独的接口（一个用于 ETH，另一个用于 ERC-20 代币）。封装 ETH 消除了这一障碍，使开发者能够在同一个 dapp 中处理 ETH 和其他代币。许多去中心化金融应用使用此标准，并创建了用于兑换这些代币的市场。

## 封装以太币 (WETH) 与以太币 (ETH)：有什么区别？ {#weth-vs-eth-differences}


|            | **以太币 (ETH)**                                                                                                                                                                                                                 | **封装以太币 (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 供应量     | [ETH 的供应量](/eth/supply/)由[以太坊](/)协议管理。ETH 的[发行](/roadmap/merge/issuance)由以太坊验证者在处理交易和创建区块时处理。                           | WETH 是一种 ERC-20 代币，其供应量由智能合约管理。在收到用户的 ETH 存款后，合约会发行新的 WETH 单位；或者当用户希望将 WETH 赎回为 ETH 时，WETH 单位会被销毁。                                                                                                                                        |
| 所有权  | 所有权由以太坊协议通过你的账户余额进行管理。  | WETH 的所有权由 WETH 代币智能合约管理，并由以太坊协议保障安全。                                                                                                                                         |
| Gas        | 以太币 (ETH) 是以太坊网络上公认的计算支付单位。Gas 费以 Gwei（以太币的单位）计价。                                                                                    | 原生不支持使用 WETH 代币支付 Gas 费。                                                                                                                                                                                              |

## 常见问题 {#faq}
 
<ExpandableCard title="封装/解封 ETH 需要付费吗？" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

使用 WETH 合约封装或解封 ETH 时，你需要支付 Gas 费。

</ExpandableCard>

<ExpandableCard title="WETH 安全吗？" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH 通常被认为是安全的，因为它基于一个简单且经过实战检验的智能合约。WETH 合约也经过了形式化验证，这是以太坊上智能合约的最高安全标准。

</ExpandableCard>

<ExpandableCard title="为什么我会看到不同的 WETH 代币？" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

除了本页描述的 [WETH 规范实现](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)之外，在实际应用中还有其他变体。这些可能是由应用开发者创建的自定义代币，或者是发行在其他区块链上的版本，它们可能表现出不同的行为或具有不同的安全属性。**请务必仔细检查代币信息，以了解你正在与哪种 WETH 实现进行交互。**

</ExpandableCard>

<ExpandableCard title="其他网络上的 WETH 合约有哪些？" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [以太坊主网](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## 延伸阅读 {#further-reading}

- [WETH 到底是什么？](https://weth.tkn.eth.limo/)
- [Blockscout 上的 WETH 代币信息](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [WETH 的形式化验证](https://zellic.io/blog/formal-verification-weth)