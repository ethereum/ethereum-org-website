---
title: 智能合约
description: 智能合约的非技术性介绍
lang: zh
---

# 智能合约简介 {#introduction-to-smart-contracts}

智能合约是[以太坊应用程序](/dapps/)的基石。 它们是存储在区块链上的计算机程序，让我们能够将传统合约转换成对应的数字化合约。 智能合约完全符合逻辑 — 遵循 IFTTT 逻辑结构。 这意味着它们完全按照程序设定执行并且不能更改。

Nick Szabo 创造了“智能合约”这一术语。 1994 年，他撰写了[概念简介](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html)，1996 年又撰写了[探索智能合约的功能](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html)。

Nick Szabo 设想了一个建立在这些自动化、加密安全流程上的数字化市场。 在这种数字化市场中，交易和业务功能可以在无需信任的情况下进行，无需中间人。 以太坊上的智能合约将这一设想付诸实践。

## 什么是合约？ {#what-are-contracts}

您可能在想：_“我不是律师！ 我为什么要关心合约？”_。 对于大多数人来说，合约会让人想起不必要的冗长条款和条件协议或无聊的法律文件。

合约就是协议。 也就是说，任何形式的协议都可以概括到合约条件中。 口头协议或书面合约适用于很多情况，但它们并非无懈可击。

### 信任与合约 {#trust-and-contracts}

传统合约的最大问题之一是需要可信的个人来执行合约的结果。

下面一个例子：

Alice 和 Bob 在参加一场自行车比赛。 假设 Alice 和 Bob 打赌 $10 元她会赢得比赛。 Bob 相信自己会成为赢家并同意下注。 最后，Alice 远远领先 Bob 完成了比赛，并且毫无疑问是赢家。 但 Bob 拒绝支付赌注，声称 Alice 一定是作弊了。

这个荒唐的例子说明了所有非智能协议存在的问题。 即使协议条件得到满足（即您是比赛的获胜者），您仍然必须要信任另一个人会去履行协议（即支付赌注）。

## 智能合约 {#smart-contracts}

智能合约通过将协议条款转换为计算机代码使协议数字化，这些计算机代码在合约条款得到满足时自动执行。

### 数字自动售货机 {#vending-machine}

一个适合智能合约的简单比喻是自动售货机，其工作方式有点类似于智能合约 — 特定的输入保证预定的输出。

- 您选择一种产品
- 自动售货机返回购买该产品需要的金额
- 您投入正确金额
- 自动售货机验证您投入的金额是否正确
- 自动售货机提供您选择的产品

只有在所有要求满足后，自动售货机才会提供您想要的产品。 如果您不选择产品或投入足够的钱，自动售货机将不会提供您选择的产品。

### 自动执行 {#automation}

与普通合约相比，智能合约最显著的优势之一是，当合约条件满足时，结果会自动执行。 无需等待人来执行结果。 换句话说：智能合约无需信任。

例如，您可以编写一个智能合约为孩子托管资金，并允许他们在特定日期后提取资金。 如果孩子试图在指定日期前提取资金，智能合约将不会执行。 或者您可以编写一份合约，在您向经销商付款后它会自动授予您汽车的数字化所有权。

### 可预测的结果 {#predictability}

人为因素是传统合同最大的缺陷之一。 例如，两位不同的法官可能会用不同方式解释传统合约。 他们的解释可能导致不同的判决和不同的结果。 智能合约消除了产生不同解释的可能性。 相反，智能合约会根据合约代码中写入的条件精确执行。 这种精确性意味着在相同情况下，智能合约将产生相同的结果。

### 公开的记录 {#public-record}

智能合约也可用于审计和跟踪。 由于以太坊智能合约位于公共区块链上，任何人都可以立即跟踪资产转移和其他相关信息。 例如，您可以查看是否有人向您的地址汇款。

### 隐私保护 {#privacy-protection}

智能合约还可以保护你的隐私。 由于以太坊是匿名网络（您的交易公开绑定到唯一的加密地址，而不是您的身份），您可以保护您的隐私不受观察者窥探。

### 可查看的条款 {#visible-terms}

最后一点，与合约一样，您可以在签署（或以其他方式与之交互）之前检查智能合同的内容。 更妙的是，合约条款的公开透明意味着任何人都可以对其进行审查。

## 智能合约使用案例 {#use-cases}

总之，智能合约是存在于区块链上的计算机程序。 它们可以自动执行。 您可以跟踪它们的交易，预测它们的行为方式，甚至可以匿名使用。 太酷了。 但是它们有什么用呢？ 好吧，其他计算机程序可以做的事情，智能合约基本上都可以做。

它们可以执行计算、创建货币、存储数据、铸造非同质化代币、发送通信甚至生成图形。 以下是一些常见的真实示例：

- [稳定币](/stablecoins/)
- [创建和分发独特的数字资产](/nft/)
- [自动、开放的货币交易所](/get-eth/#dex)
- [去中心化游戏](/dapps/?category=gaming)
- [自动赔付的保单](https://etherisc.com/)
- [允许创建定制、可互操作货币的标准](/developers/docs/standards/tokens/)

## 更愿意通过视频学习？ {#visual-learner}

观看 Finematics 解释智能合约：

<YouTube id="pWGLtjG-F5c" />

## 延伸阅读 {#further-reading}

- [智能合约将如何改变世界](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [智能合约：将要取代律师的区块链技术](https://blockgeeks.com/guides/smart-contracts/)
- [面向开发者的智能合约](/developers/docs/smart-contracts/)
- [学习编写智能合约](/developers/learning-tools/)
- [精通以太坊 — 什么是智能合约？](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
