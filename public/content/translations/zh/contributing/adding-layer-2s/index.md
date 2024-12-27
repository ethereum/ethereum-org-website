---
title: 添加二层网络
description: 将二层网络添加到 ethereum.org 时适用的政策
lang: zh
---

# 添加二层网络 {#adding-layer-2}

我们想要确保上架的资源是最好的，让用户能够安全放心地浏览二层网络空间。

任何人都可以提出向 ethereum.org 添加二层网络的建议。 如果有遗漏的二层网络，**[请提出建议](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)！**

我们目前在以下页面上架了二层网络：

- [乐观卷叠](/developers/docs/scaling/optimistic-rollups/)
- [零知识卷叠](/developers/docs/scaling/zk-rollups/)
- [二层网络](/layer-2/)

对以太坊来说，二层网络是一个相对较新的、令人振奋的范式。 我们已尝试在 ethereum.org 上创建一个公平的考量框架，但纳入标准会随时间推移而变化和发展。

## 决策框架 {#decision-framework}

### 纳入标准：必备条件 {#criteria-for-inclusion-the-must-haves}

**在 L2BEAT 上架**

- 要想纳入考量范围，项目必须已在 [L2BEAT](https://l2beat.com) 上架。 L2BEAT 为二层网络项目提供了可靠的风险评估，可供我们评估二层网络项目。 **如果项目未在 L2BEAT 上架，则我们不会将其作为二层网络纳入 ethereum.org。**
- [了解如何将你的二层网络项目添加到 L2BEAT](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md)。

**开源**

- 你的代码必须是可访问的，同时你应接受来自更广泛社区的拉取请求。

**二层网络类别**

我们目前将以下项列为二层网络解决方案：

- 乐观卷叠
- 零知识卷叠

_我们认为，其他不使用以太坊来实现数据可用性或安全性的扩容解决方案不是二层网络。_

**以太坊数据可用性**

- 数据可用性是其他扩容方案与二层网络方案之间的重要区分因素。 一个项目**必须**使用以太坊主网来实现数据可用性，才考虑让它上架。

**链桥**

- 用户如何才能登临二层网络？

**项目上线日期**

- 二层网络已在主网上“上线”超过 6 个月

- 未经用户实战测试的较新项目不太可能上架。

**外部安全审核**

- 无论是通过审核、内部安全团队还是其他方法，产品安全性都必须经过可靠测试。 这会降低我们用户的风险，并向我们表明你非常重视安全性。

**持续的用户群**

- 我们会将价值总量历史记录、交易统计数据以及是否被知名公司或项目使用等指标考虑在内

**活跃的开发团队**

- 我们不会上架没有活跃团队来开发项目的二层网络方案。

**区块浏览器**

- 上架的项目需要能正常工作的区块浏览器，让用户轻松浏览区块链。

### 其他标准：最好具备 {#nice-to-haves}

**交易所对项目的支持**

- 用户是否可以直接从存款至交易所和/或从交易所提款？

**二层网络生态系统去中心化应用程序链接**

- 我们希望能够提供有关用户可以在此二层网络上执行哪些操作的信息 （例如 https://portal.arbitrum.io/、https://www.optimism.io/apps）。

**代币合约列表**

- 由于资产会在二层网络产生新地址，如果有可用的代币列表资源，请分享。

**支持原生钱包**

- 是否有任何钱包原生支持二层网络？

## 添加你的二层网络 {#add-exchange}

如果你想将二层网络添加到 ethereum.org，请在 GitHub 上创建一个提议。

<ButtonLink to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
  创建一个提议
</ButtonLink>
