---
title: 什么是包装以太币 (WETH)
description: 包装以太币 (WETH) 简介 - 一种兼容 ERC20 的包装以太币 (ETH) 。
lang: zh
---

# 包装以太币 (WETH) {#intro-to-weth}

以太币 (ETH) 是以太坊的主要货币。 它被用于多种目的，比如作为货币进行质押，以及支付计算的燃料费。 **包装以太币实际上是以太币的升级形式，具有许多应用程序和 [ERC-20 代币](/glossary/#erc-20)所需的一些附加功能**，这些也是以太坊上的另一种数字资产。 为了使用这些代币，以太币必须遵循与它们相同的规则，也称为 ERC-20 标准。

为了弥补这个缺口，包装以太币 (WETH) 诞生了。 **包装以太币是一个智能合约，你可以向其中存入任意数量的以太币，并收到铸造的对应数量的包装以太币**，后者符合 ERC-20 代币标准。 包装以太币是以太币的一种表示，允许你以 ERC-20 代币（而非原生资产以太币）的形式与以太币进行交互。 你仍需要使用原生以太币来支付燃气费，因此在将它们存入智能合约时，确保留下一些。

你可以使用包装以太币智能合约将包装以太币转换为以太币。 你可以通过包装以太币智能合约赎回任意数量的包装以太币，并将收到对应数量的以太币。 然后，存入的包装以太币会被销毁并移出包装以太币的流通量。

**大约有 3% 的流通以太币被锁定在包装以太币代币合约中**，使其成为最常用的[智能合约](/glossary/#smart-contract)之一。 在用户与去中心化金融 (DeFi) 应用程序交互时，包装以太币尤为重要。

## 为什么需要按 ERC-20 标准包装以太币？ {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) 定义了可转移令牌的标准接口，因此任何人都可以创建代币，与以太坊生态系统中使用此标准的应用程序和代币进行无缝交互。 由于**以太币早于 ERC-20 标准出现**，因此不符合该规范。 这意味着**你不能轻易地**将以太币兑换成其他 ERC-20 代币，或**在使用 ERC-20 标准的应用程序中使用以太币**。 包装以太币使你有机会进行以下操作：

- **将以太币兑换为 ERC-20 代币**：你无法直接将以太币兑换为其他 ERC-20 代币。 包装以太币是符合 ERC-20 同质化代币标准的以太币表示，并且可以与其他 ERC-20 代币兑换。

- **在去中心化应用程序中使用以太币**：由于以太币与 ERC-20 不兼容，开发者需要在去中心化应用程序中分别创建单独的接口（一个用于以太币，另一个用于 ERC-20 代币）。 包装以太币消除了这一障碍，使开发者能够在同一个去中心化应用程序中处理以太币和其他代币。 许多去中心化金融应用程序使用该标准，并创建用于兑换这些代币的市场。

## 包装以太币 (WETH) 对比以太币 (ETH)：有哪些不同？ {#weth-vs-eth-differences}

|     | **以太币 (ETH)**                                            | **包装以太币 (WETH)**                                                  |
| --- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 供应  | 以太币的供应由以太坊协议管理。 以太币的[发行](/roadmap/merge/issuance)由以太坊验证者在处理交易和创造区块时处理。      | 包装以太币是一种 ERC-20 代币，其供应由智能合约管理。 合约会在收到用户存入的以太币时发行新的包装以太币单位，或在用户希望用包装以太币赎回以太币时销毁包装以太币。 |
| 所有权 | 所有权由以太坊协议通过你的帐户余额进行管理。                                                      | 包装以太币的所有权由包装以太币代币智能合约进行管理，并由以太坊协议提供安全保护。                                             |
| 燃料  | 以太币 (ETH) 是可接受的支付单位，用于支付以太坊网络上的计算。 燃料费以 Gwei（一种以太币单位）计价。 | 包装以太币代币在原生状态下不支持用于支付燃料。                                                              |

## 常见问题{#faq}

<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

你支付了燃料费，以使用包装以太币合约包装或解包以太币。

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

包装以太币通常被认为是安全的，因为它是基于一个简单且经过实战考验的智能合约。 包装以太币合约也得到了正式验证，符合以太坊智能合约的最高安全标准。

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

除了[包装以太币的规范实现](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)外，还有一些其他变体。 这些变体可能是应用程序开发者创建的自定义代币，或是在其他区块链上发行的版本，并且可能会有不同的行为或不同的安全属性。 **请务必仔细检查代币信息，以了解你正在与哪种包装以太币实现进行交互。**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [以太坊主网](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## 扩展阅读{#further-reading}

- [WTF 是包装以太币吗？](https://weth.tkn.eth.limo/)
- [Etherscan 上关于包装以太币代币的信息](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [包装以太币的形式化验证](https://zellic.io/blog/formal-verification-weth)
