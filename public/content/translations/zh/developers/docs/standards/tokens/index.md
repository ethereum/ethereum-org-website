---
title: "代币标准"
description: "探索以太坊代币标准，包括用于同质化和非同质化代币的 ERC-20、ERC-721 和 ERC-1155。"
lang: zh
incomplete: true
---

## 简介 {#introduction}

许多[以太坊](/)开发标准都侧重于代币接口。这些标准有助于确保智能合约保持可组合性，因此当新项目发行代币时，它能与现有的去中心化交易所和应用程序保持兼容。

代币标准定义了代币在整个以太坊生态系统中的行为和交互方式。它们使开发者更容易进行构建，而无需重复造轮子，确保代币与钱包、交易所和去中心化金融 (DeFi) 平台无缝协作。无论是在游戏、治理还是其他用例中，这些标准都提供了一致性，并使以太坊的互联性更强。

## 前提条件 {#prerequisites}

- [以太坊开发标准](/developers/docs/standards/)
- [智能合约](/developers/docs/smart-contracts/)

## 代币标准 {#token-standards}

以下是以太坊上一些最受欢迎的代币标准：

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 同质化（可互换）代币的标准接口，如投票代币、质押代币或虚拟货币。

### NFT 标准 {#nft-standards}

- [ERC-721](/developers/docs/standards/tokens/erc-721/) - 非同质化代币的标准接口，如艺术品或歌曲的契约。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - ERC-1155 允许更高效的交易和打包交易，从而节省成本。该代币标准允许创建实用代币（如 $BNB 或 $BAT）和非同质化代币（如 CryptoPunks）。

[ERC](https://eips.ethereum.org/erc) 提案的完整列表。

## 延伸阅读 {#further-reading}

_知道对您有帮助的社区资源吗？编辑本页面并添加它！_

## 相关教程 {#related-tutorials}

- [代币集成清单](/developers/tutorials/token-integration-checklist/) _– 与代币交互时需要考虑的事项清单。_
- [了解 ERC20 代币智能合约](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– 在以太坊测试网络上部署您的第一个智能合约的简介。_
- [通过 Solidity 智能合约转移和授权 ERC20 代币](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– 如何使用 Solidity 语言通过智能合约与代币进行交互。_
- [实现 ERC721 市场【操作指南】](/developers/tutorials/how-to-implement-an-erc721-market/) _– 如何在去中心化分类广告板上出售代币化物品。_