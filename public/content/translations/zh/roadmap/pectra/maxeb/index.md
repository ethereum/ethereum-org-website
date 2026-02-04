---
title: "Pectra 升级后的最大有效金额机制"
description: "在 Pectra 升级中了解更多关于 MaxEB（Maximum Effective Balance） 的信息"
lang: zh
---

# MaxEB {#maxeb}

_简而言之：_ Pectra 硬分叉允许以太坊验证者将 **类型1** 提款凭证转换为 **类型2** 提款凭证，从而参与更高的最大有效余额和复利机制。 执行此操作的官方工具是 Launchpad。 此操作无法撤销。

## 概述 {#overview}

### 谁会受到影响？ {#who-is-affected}

任何运行验证者的人——他们很可能知道自己所控制的验证者的索引（例如[验证者 #12345](https://beaconcha.in/validator/12345)）。 如果您使用协议来运行验证者（例如 Lido CSM 或 Rocket Pool），则需要与他们核实，以确定他们是否以及何时支持 maxEB。

如果您使用流动性质押代币（例如 rETH 或 stETH）进行质押，则无需或不建议采取任何行动。

### 什么是 “maxEB” ？ {#what-is-maxeb}

maxEB = 验证者的最大有效余额。 在Pectra硬分叉之前，单个验证者最多可获得基于32 ETH的收益。 在 Pectra 之后，验证者可以选择，以 1 ETH 为增量单位赚取基于 32 至 2048 ETH 任意金额之间的收益。

### 验证者如何参与？ {#how-does-a-validator-opt-in}

验证者若要选择启用 maxEB（最大有效余额） 的变更，需要将提取凭证从 类型1（Type 1） 转换为 类型2（Type 2）。 Pectra 硬分叉上线后，可以在 [启动板（验证者操作）](https://launchpad.ethereum.org/validator-actions) 上完成此操作。 与**类型0** → **类型1**类似，从**类型1**转换为**类型2**是一个不可逆的过程。

### 什么是提款凭证？ {#whats-a-withdrawal-credential}

当你成为一个验证者时，你会拥有一组 提取凭证 这些信息可以在您的存款数据 JSON 文件 中找到，或者您可以在验证者的 beaconcha.in [存款标签](https://beaconcha.in/validator/12345#deposits) 上查看。

1. **类型 0** 提款凭证：如果您的验证者的提款凭证以“0x00...”开头，则您在 Shapella 硬分叉之前进行了存款，但尚未设置提款地址。

![类型 0 提款凭证](./0x00-wd.png)

2. **类型 1** 提款凭证：如果您的验证器的提款凭证以 `0x01...` 开头，则表示您是在 Shapella 硬分叉之后进行的存款，或者您已经将 **类型 0** 凭证转换为 **类型 1** 凭证。

![类型1提款凭证](./0x01-wd.png)

3. **类型 2** 提款凭证：凭证类型将以 `0x02...` 开头，并在 Pectra 升级之后启用。 启用**类型2**提款凭证的验证者也被称为“**复利验证者**”

| **可行的**       | **不可行的**      |
| ------------- | ------------- |
| ✅ 类型 0 → 类型 1 | ❌ 类型 0 → 类型 2 |
| ✅ 类型1 → 类型2   | ❌ 类型 1 → 类型 0 |
|               | ❌ 类型 2 → 类型 1 |
|               | ❌ 类型 2 → 类型 0 |

### 风险 {#risks}

MaxEB 允许验证者将其全部余额转账给另一位验证者。 提交合并请求的用户应核实其签名的交易的来源和内容。 利用maxEB功能的官方工具是Launchpad。 如果您决定使用第三方工具，您应确认以下几点：

- 源验证者的公钥和提现地址与他们控制的验证者相匹配
- 目标验证器的公钥正确且属于他们
- 该请求为转换操作，而非合并操作，若他们无意将资金转至另一验证者
- 该交易正在由正确的提现地址进行签名

我们**强烈建议**你在使用任何第三方工具之前，与 [EthStaker 社区](https://ethstaker.org/about)进行讨论。 这是一个有助于验证你的方法并避免错误的有用地方。 如果您使用了恶意或配置错误的工具，**您的整个验证者余额可能会被发送到您无法控制的验证者** ——且无法取回。

## 技术细节 {#technical-details}

### 流程 {#the-flow}

`ConsolidationRequest` 操作将有两种用途：

1. 将现有验证者从**类型1**转换为**类型2**验证者
2. 将其他验证者合并到现有的**类型2**验证者中

在将**类型 1** 验证者转换为**类型 2** 验证者时，_源验证者_和_目标验证者_都将是你正在转换的验证者。 该操作将消耗燃料，并将排在其他合并请求之后。 此队列与存款队列**独立**，不受新验证者存款的影响，可通过[pectrified.com](https://pectrified.com/)查看。

要合并验证者，您必须拥有一个具有**类型 2** 提币凭证的_目标验证者_。 这是任何验证者余额被合并的目的地，且索引需要保留。

### 转换为类型2的要求 {#requirements-for-converting-to-type-2}

这将是您将第一个验证者转换为**类型2**时所需的。 该验证者的序号已保留且处于活动状态。 对于转换，_源验证者_ == _目标验证者_

验证者必须……

- 处于激活状态
- 拥有**类型1**的取款凭证
- 不处于退出状态（或被禁用）
- 没有待处理的手动触发提现（不适用于自动转账）

![转换示意图](./conversion.png)

### 合并的条件 {#requirements-for-consolidating}

这是与转换_相同的操作_，但此时_源验证者与_目标验证者\*不同。 目标验证者的序号得以保留，并接受来自源验证者的余额。 源验证者的索引被置于“已退出”的状态。

在这种情况下，源验证者需要满足上述所有要求，还要满足：

- 持续保持活跃至少大约27.3小时（一个 共同的委员会周期（SHARD_COMMITTEE_PERIOD））

源验证者必须

- 拥有**类型 2**的提款凭证
- 未在退出状态中。

![合并示意图](./consolidation.png)

### 合并请求{#the-consolidation-request}

合并请求将会被源验证者所关联的取款地址签名，且需要具有：

1. 源验证者的地址（例如，`0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`）
2. 源验证者的公钥（例如，`0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`）
3. 目标验证者的公钥

在转换过程中，2和3将是同样的。 这个操作可以在[Launchpad]上完成（https://launchpad.ethereum.org/）。

### 签名的要求{#signing-requirements}

要提交“合并请求”，源验证者的取款地址必须在请求上签名。 这证明了对于验证者资金的控制权。

### 签名了什么？ {#what-is-signed}

使用 `合并请求` 的域名分隔[签名根](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root)。

- **领域**“领域合并请求”
- **签名根字段:**
  - `源公钥`: `BLSPubkey`
  - `目标公钥`: `BLSPubkey`
  - `源地址`: `ExecutionAddress`

生成的 **​​BLS 签名**​​随请求一同提交。

注意：签名由取款地址执行，而非通过验证者的密钥。

### 部分取款{#partial-withdrawals}

有着**Type 1** 凭证的验证者会自动地、无需Gas 费地把它们的超额余额（任何超过 32 ETH的）清理到他们的提款地址。 由于 **Type 2**验证者​​允许以 ​​1 ETH 为增量单位​​进行余额复利累积，在余额达到 ​​2048 ETH​​ 之前，系统​​不会自动清理余额。 在 **类型2** 验证者上的部分提取必须被手动触发，且需要消耗燃料。

## 合并工具{#consolidation-tooling}

有几种可以使用的工具来管理合并。 [启动板（Launchpad）](https://launchpad.ethereum.org/en/validator-actions) 是由以太坊基金会创建的官方工具。 还有一些由质押社区的实体创建的第三方工具，可能提供该启动版（Launchpad）未提供的功能。 尽管这里的工具没有经过以太坊基金会的审计或认可，社区知名成员的开源工具如下。

| 工具                              | 网站                                                                                                        | 开源                            | 创建者                                                                   | 已审核                                                                                                                                                 | 接口                          | 显著特征                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------ |
| Pectra 质押经理                     | pectrastaking.com                                                                         | 是的，Apache 2.0 | [Pier Two](https://piertwo.com/)                                      | 否                                                                                                                                                   | 网页用户界面                      | Wallet Connect，可用于 SAFE              |
| Pectra Validator Ops CLI 工具     | 【GitHub】（https://github.com/Luganodes/Pectra-Batch-Contract）              | 是的，MIT                        | [Luganodes](https://www.luganodes.com/)                               | 是的，Quantstamp [2025 年 5 月](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | 命令行                         | 批量处理，一次处理多个验证者                       |
| Ethereal                        | [GitHub](https://github.com/wealdtech/ethereal)                                                           | 是的，Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/)                        | 否                                                                                                                                                   | 命令行                         | 用于验证者和节点管理的完整功能集合                    |
| Siren                           | 【GitHub】（https://github.com/sigp/siren）                                   | 是的，Apache 2.0 | 【Sigma Prime】（https://sigmaprime.io/） | 否                                                                                                                                                   | 一些命令行，但主要是网页用户界面            | 仅在你使用 Lighthouse 共识用户端时有用            |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | 是，MIT 许可证                     | [Stakely](https://stakely.io/)                                        | 否                                                                                                                                                   | Web UI，由 stakely 托管，可免费自行托管 | 支持主流钱包连接，包括通过 walletconnect 连接 safe。 |

## 常见问题 {#faq}

### 选择加入会改变我的提案的运气或者奖励吗？ （{#change-luck-or-rewards}）

否。 选择加入不会降低你的提议被选中的机会——你的验证责任和提案选择仍然保持不变。 例如，如果你有两个 ​​32 ETH 的验证​者和一个 ​​64 ETH 的验证者，它们被选中提议一个区块并赢得奖励的总概率是相同的。

### 选择加入会改变我被惩罚的风险吗？ {#change-slashing-risk}

对于小型或非专业运营商而言，​​合并验证者节点不会改变被惩罚的风险。 更详细的回答是：对于每个节点运行多个验证者且拥有快速警报的专业运营者来说，合并为更少的验证者可能会降低他们对罚没事件的反应能力，从而无法避免连锁惩罚事件发生。 对所有验证者的初始罚没_惩罚_已经从 1 ETH (每 32 ETH) 大幅降低到了 0.0078125 ETH (每 32 ETH) 以抵消这种风险。

### 我需要退出我的验证者来进行转换吗？ {#exit-validator}

否。 你可以在不退出的情况下就地进行转换。

### 转换/合并需要多长时间？ {#how-long}

最少需要27.3小时，但是合并的时候也会遭遇排队。 这个排队独立于存款队列与取款队列，且不受到它们的影响。

### 我可以保留我的验证者索引吗？ {#keep-validator-index}

由此可见， 就地转换使得验证者索引得以保持相同。 如果你合并了多个验证者，你只能够保留_目标验证者_.的索引。

### 我会错过认证吗？ {#miss-attestations}

在合并到另一个验证者期间，源验证者将退出，并且在目标验证者的余额生效前，有大约 27 小时的等待期。 这段时间**不会影响性能指标**。

### 我会遭到惩罚吗？ {#incur-penalties}

否。 只要你的验证者还在线，你就不会遭受惩罚。

### 合并的验证者的提现地址是否必须匹配？ {#withdrawal-addresses-match}

否。 但是_来源_必须从自己的地址授权请求。

### 转换之后我的奖励会进行复利吗？ {#rewards-compound}

由此可见， 通过**类型 2**凭证，超过 32 ETH 的奖励会自动被重新质押——但不是立即开始重新质押。 由于存在一个小缓冲区 (称为[_滞后_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis))，你的余额需要达到**约 1.25 ETH 以上**，才会将多余部分重新质押。 因此，复利并非在 33.0 ETH 时发生，而是在 33.25 (有效余额为 33 ETH) 时发生，然后是 34.25 (有效余额为 34 ETH)，以此类推。

### 完成转换之后我还能获得自动转账的功能吗？ {#automatic-sweep}

自动转账只会在超额余额超过 2048 时触发。 对于所有其它的部分取款，你都需要通过手动触发它们。

### 我能否改变主意，将验证器从类型2​​转回类型 1​​？ {#go-back-to-type1}

否。 到**类型2**的转换是不可逆的。

### 如果我想要合并多个验证者，是否需要首先将每个验证者单独转换为类型2？ {#consolidate-multiple-validators}

不需要！ 把其中一个验证器转换为类型2，然后把它作为目标验证器使用。 所有合并到类型2目标验证者的其他验证者，都可以是类型1或类型2

### ​​我的验证者是离线的或余额低于32 ETH——我仍然可以转化它吗？ {#offline-or-below-32eth}

由此可见， 只要验证者处在活跃状态（未退出）且你能用其取款地址进行签名，你就可以进行转换。

## 资源{#resources}

- 【Electra 共识规范】（https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md）这是您应该参照的最权威的版本。 当您感到疑惑的时候，请阅读这些规范
- 并非每个人都擅长阅读代码。因此，可以使用[这个 maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) 帮助解读规范。 _免责声明：应参照规范本身，而非AI作为事实的来源，因为AI可能会误解信息或者提供幻觉回答_
- 【pectrified.com】（https://pectrified.com/）：]：查看合并、存款及队列等待时间的状态
- 【Ethereal】（https://github.com/wealdtech/ethereal）：社区创造的 CLI 工具，用于管理常见的验证者任务
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor)：社区创建的合约，允许在单笔交易中存入多个以太坊验证者
