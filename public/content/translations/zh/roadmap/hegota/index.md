---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "了解 Hegotá 协议升级"
lang: zh
template: upgrade
---

Hegotá 是预计在 [格拉姆斯特丹](/roadmap/glamsterdam/) 之后的 [以太坊](/) 网络升级。它的名字由“Bogotá”（执行层升级，以之前的 Devcon 举办地命名）和“Heze”（共识层升级，以一颗恒星命名）组合而成。

Hegotá 目前处于早期规划阶段。其核心提案（headliner）已经确定，并且随后也安排了第二项变更，但其余范围仍在决定中，尚未设定具体日期。

## 核心提案：FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

分叉选择强制包含列表（Fork-choice enforced inclusion lists，简称 FOCIL，即 EIP-7805）与 [抗审查性](/roadmap/security/#censorship-resistance) 有关：确保有效的交易能够进入区块，即使构建区块的人更想将其排除在外。

如今，每个区块由单个 [验证者](/glossary/#validator) 构建，并决定其中包含哪些交易。因此，任何能够影响足够多区块构建者的人都可以延迟一笔交易，而用户除了等待和祈祷之外，没有其他办法来强制解决这个问题。

FOCIL 将这一决定权分散给许多验证者。一个委员会中的每个成员都会提出一个应该被包含的交易列表，而协议的规则强制区块构建者遵守这些列表。审查一笔交易不再是某一方可以单独做到的事情。

## 框架交易 {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

框架交易（EIP-8141）允许 [账户](/glossary/#account) 自行决定什么才算作有效的交易，而不是由协议坚持使用一种固定的签名方案。

如今，每笔交易的授权方式都是相同的：来自一个密钥的一个签名。[智能合约账户](/roadmap/account-abstraction/) 通过将交易路由到额外的基础设施来绕过这一限制，但这会消耗 Gas，并增加可能发生故障的活动部件。

框架交易将检查过程转移到账户本身。账户运行自己的验证逻辑，因此目前需要额外基础设施才能实现的功能——社交恢复、支出限制、需要多次批准、让其他人代付 Gas——都变成了协议直接支持的功能。

因为账户可以选择自己的规则，它也可以选择一种量子计算机无法破解的签名方案。这使其成为迈向 [抗量子计算](/roadmap/security/#quantum-resistance) 以及更好钱包的一步。

## Hegotá 中还有什么 {#scope}

尚未决定。FOCIL 和框架交易是目前已安排的两项变更；还有数十项提案已被提出，但均未敲定。在范围确定之前，本页面将保持简短——有关讨论的当前状态，请参阅以下资源。

## 延伸阅读 {#further-reading}

- [Forkcast：Hegotá](https://forkcast.org/upgrade/hegota) — 每项提案的实时状态
- [Hegotá 元 EIP (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [EIP-7805 技术规范](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 技术规范](https://eips.ethereum.org/EIPS/eip-8141)
- [以太坊路线图](/roadmap/)