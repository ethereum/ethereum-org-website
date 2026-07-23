---
title: 智能合约简介
metaTitle: "智能合约：它们是什么及其优势"
description: 智能合约的非技术性简介
lang: zh
---

智能合约是[以太坊](/)应用层的基础构建块。它们是存储在[区块链](/glossary/#blockchain)上的计算机程序，遵循“如果这样，那么那样”的逻辑，并保证按照其代码定义的规则执行，一旦创建便无法更改。

尼克·萨博（Nick Szabo）创造了“智能合约”一词。1994 年，他写了[一篇关于该概念的简介](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html)，并在 1996 年写了[一篇关于智能合约能做什么的探索文章](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html)。

萨博设想了一个数字市场，在这个市场中，自动且[密码学安全](/glossary/#cryptography)的流程使得交易和业务功能能够在没有受信任中介的情况下发生。以太坊上的智能合约将这一愿景付诸实践。

观看 Finematics 解释智能合约：

<VideoWatch slug="smart-contracts-code-is-law" />

## 传统合约中的信任 {#trust-and-contracts}

传统合约最大的问题之一是需要受信任的个人来贯彻执行合约的结果。

这里有一个例子：

爱丽丝（Alice）和鲍勃（Bob）正在进行一场自行车比赛。假设爱丽丝和鲍勃打赌 10 美元她会赢得比赛。鲍勃确信自己会是赢家，于是同意了这个赌注。最后，爱丽丝远远领先于鲍勃完成比赛，成为毫无争议的赢家。但鲍勃拒绝支付赌金，声称爱丽丝肯定作弊了。

这个简单的例子说明了任何非智能协议存在的问题。即使协议的条件得到满足（即你是比赛的赢家），你仍然必须信任另一个人来履行协议（即支付赌金）。

## 数字自动售货机 {#vending-machine}

智能合约的一个简单比喻是自动售货机，它的工作原理与智能合约有些相似——特定的输入保证了预定的输出。

- 你选择一件商品
- 自动售货机显示价格
- 你支付价格
- 自动售货机验证你支付了正确的金额
- 自动售货机给你商品

自动售货机只有在满足所有要求后才会分配你想要的商品。如果你没有选择商品或投入足够的钱，自动售货机就不会给出你的商品。

## 自动执行 {#automation}

智能合约的主要优势在于，当满足特定条件时，它会确定性地执行明确的代码。无需等待人类来解释或协商结果。这消除了对受信任中介的需求。

例如，你可以编写一个智能合约，为孩子托管资金，允许他们在特定日期后提取资金。如果他们试图在该日期之前提取，智能合约将不会执行。或者，你可以编写一个合约，当你向经销商付款时，自动给你一份汽车所有权凭证的数字版本。

## 可预测的结果 {#predictability}

传统合约是模棱两可的，因为它们依赖人类来解释和执行。例如，两名法官可能会对同一份合约有不同的解释，这可能导致不一致的决定和不平等的结果。智能合约消除了这种可能性。相反，智能合约完全根据合约代码中编写的条件精确执行。这种精确性意味着在相同的情况下，智能合约将产生相同的结果。

## 公开记录 {#public-record}

智能合约对于审计和跟踪非常有用。由于以太坊智能合约位于公共区块链上，任何人都可以立即跟踪资产转移和其他相关信息。例如，你可以检查是否有人向你的地址发送了资金。

## 隐私保护 {#privacy-protection}

智能合约还能保护你的隐私。由于以太坊是一个伪匿名网络（你的交易公开绑定到一个唯一的加密地址，而不是你的身份），你可以保护自己的隐私免受观察者的窥探。

## 可见条款 {#visible-terms}

最后，就像传统合约一样，你可以在签名之前检查智能合约中的内容。与传统合约不同，智能合约的链上透明度允许任何人在与其交互之前对其进行仔细审查。 

然而，尽管任何人都可以查看智能合约的条款，但原始交易数据被设计为由应用程序和钱包解释，而不是人类。由于这些数据非常难以阅读，用户经常面临一个被称为“盲签名”的重大安全风险，即在没有真正理解其意图的情况下，批准与智能合约交互的交易。 

以太坊生态系统正在向**[明文签名（Clear Signing）](https://clearsigning.org/)**标准（特别是 [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)）过渡。明文签名将不透明的智能合约数据转换为通俗易懂、人类可读的交易描述，确保任何人在签名之前都能理解合约的真实意图。

## 智能合约用例 {#use-cases}

智能合约基本上可以做计算机程序能做的任何事情。

它们可以执行计算、创建货币、存储数据、铸造 [NFT](/glossary/#nft)、发送通信，甚至生成图形。以下是一些流行的现实世界示例：

- [稳定币](/stablecoins/)
- [创建和分发独特的数字资产](/nft/)
- [自动、开放的货币交易所](/get-eth/#dex)
- [去中心化游戏](/apps/categories/gaming)
- [自动理赔的保险单](https://etherisc.com/)
- [允许人们创建定制化、可互操作货币的标准](/developers/docs/standards/tokens/)

## 延伸阅读 {#further-reading}

- [智能合约将如何改变世界](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [面向开发者的智能合约](/developers/docs/smart-contracts/)
- [学习编写智能合约](/developers/learning-tools/)
- [精通以太坊 - 什么是智能合约？](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />