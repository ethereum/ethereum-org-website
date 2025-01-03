---
title: 智能合约
description: 智能合约的非技术性介绍
lang: zh
---

# 智能合约简介 {#introduction-to-smart-contracts}

智能合约是以太坊应用程序层的基石。 它们是存储在[区块链](/glossary/#blockchain)上的计算机程序，遵循“如果...那么...”(IFTTT) 逻辑，并且保证按照其代码定义的规则执行，智能合约一旦创建就无法更改。

Nick Szabo 创造了“智能合约”这一术语。 1994 年，他撰写了[智能合约简介](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html)；1996 年，他撰写了[对智能合约潜在功能的探索](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html)。

Szabo 构想了一个数字市场，在这个市场中，交易和商业功能可在不需要受信任中介的情况下通过[加密学保证安全](/glossary/#cryptography)的自动化流程进行。 以太坊上的智能合约将这一设想付诸实践。

观看 Finematics 解释智能合约：

<YouTube id="pWGLtjG-F5c" />

## 传统合约中的信任问题 {#trust-and-contracts}

传统合约的最大问题之一是需要可信的个人来执行合约的结果。

下面是一个例子：

Alice 和 Bob 要进行一场自行车比赛。 假设 Alice 和 Bob 打赌 $10 元她会赢得比赛。 Bob 相信自己会成为赢家并同意下注。 最后，Alice 远远领先 Bob 完成了比赛，并且毫无疑问是赢家。 但 Bob 拒绝支付赌注，声称 Alice 一定是作弊了。

这个荒唐的例子说明了所有非智能协议存在的问题。 即使协议条件得到满足（即你是比赛的获胜者），你仍然必须要信任对方会履行协议（即支付赌注）。

## 数字自动售货机 {#vending-machine}

一个适合智能合约的简单比喻是自动售货机，其工作方式有点类似于智能合约 — 特定的输入保证预定的输出。

- 你选择一种产品
- 自动售货机显示出价格
- 你付款
- 自动售货机验证你的付款金额是否正确
- 自动售货机给你提供产品

只有在所有要求满足后，自动售货机才会提供你想要的产品。 如果你不选择产品或投入足够的钱，自动售货机将不会提供你选择的产品。

## 自动执行 {#automation}

智能合约的主要优点是在满足特定条件时确定地执行清晰的代码。 无需等待人来执行或商量结果。 这消除了对可信中介的需求。

例如，你可以编写一个智能合约为孩子托管资金，并允许他们在特定日期后提取资金。 如果他们试图在指定日期前提取资金，智能合约将无法执行。 或者你可以编写一份合约，在你向经销商付款后它会自动授予你汽车的数字化所有权。

## 可预测的结果 {#predictability}

传统合约比较含糊，因为它们依赖于人来解释和执行。 例如，两位法官可能会对合同有不同的解释，这可能会导致不一致的判决和不公平的结果。 智能合约消除了这种可能性。 然而，智能合约会根据合约代码中写入的条件精确执行。 这种精确性意味着在相同情况下，智能合约将产生相同的结果。

## 公开的记录 {#public-record}

智能合约可用于审计和跟踪。 由于以太坊智能合约位于公共区块链上，任何人都可以立即跟踪资产转移和其他相关信息。 例如，你可以检查是否有人向自己的地址发送了资金。

## 隐私保护 {#privacy-protection}

智能合约还可以保护你的隐私。 由于以太坊是匿名网络（你的交易公开绑定到唯一的加密地址，而不是你的身份），你可以保护你的隐私不受观察者窥探。

## 可查看的条款 {#visible-terms}

最后一点，与传统合约一样，你可以在签署（或以其他方式与之交互）之前检查智能合约的内容。 智能合约的透明性保证了任何人都可以进行审查。

## 智能合约用例 {#use-cases}

其他计算机程序可以做的事情，智能合约基本上都可以做。

它们可以执行计算、创建货币、存储数据、铸造[非同质化代币](/glossary/#nft)、发送通信甚至生成图形。 以下是一些常见的真实示例：

- [稳定币](/stablecoins/)
- [创建和分发独特的数字资产](/nft/)
- [自动、开放的货币交易所](/get-eth/#dex)
- [去中心化游戏](/dapps/?category=gaming#explore)
- [自动赔付的保单](https://etherisc.com/)
- [允许创建定制、可互操作货币的标准](/developers/docs/standards/tokens/)

## 延伸阅读 {#further-reading}

- [智能合约将如何改变世界](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [智能合约：将要取代律师的区块链技术](https://blockgeeks.com/guides/smart-contracts/)
- [面向开发者的智能合约](/developers/docs/smart-contracts/)
- [学习编写智能合约](/developers/learning-tools/)
- [精通以太坊 — 什么是智能合约？](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
