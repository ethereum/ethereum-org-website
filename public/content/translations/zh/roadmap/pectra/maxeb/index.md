---
title: MaxEB
metaTitle: 佩克特拉 MaxEB
description: 了解有关佩克特拉版本中 MaxEB 的更多信息
lang: zh
authors: ["Nixo"]
---

*简而言之：* 佩克特拉硬分叉允许以太坊验证者通过将**类型 1** 提款凭证转换为**类型 2** 提款凭证，选择加入更高的最大有效余额和复利。执行此操作的官方工具是 Launchpad。此操作不可逆。

## 概述 {#overview}

### 谁会受到影响？ {#who-is-affected}

任何运行验证者的人——这通常是知道其控制的验证者索引（例如，[验证者 #12345](https://beaconcha.in/validator/12345)）的人。如果你使用协议来运行验证者（例如 Lido CSM 或 Rocket Pool），你必须向他们确认是否以及何时支持 MaxEB。

如果你使用流动性质押代币 (LST)（例如 rETH 或 stETH）进行质押，则不需要也不建议采取任何操作。

### 什么是“MaxEB”？ {#what-is-maxeb}

MaxEB = 验证者的最大有效余额 (MAXimum Effective Balance)。在佩克特拉硬分叉之前，每个验证者最多只能在 32 ETH 上赚取收益。在佩克特拉之后，验证者可以选择加入该变更，从而在 32 到 2048 ETH 之间的任何余额（以 1 ETH 为增量）上赚取收益。

### 验证者如何选择加入？ {#how-does-a-validator-opt-in}

验证者通过将**类型 1** 提款凭证转换为**类型 2** 提款凭证来选择加入 MaxEB 变更。在佩克特拉硬分叉上线后，可以在 [Launchpad（验证者操作）](https://launchpad.ethereum.org/validator-actions) 上完成此操作。与**类型 0** → **类型 1** 一样，从**类型 1** → **类型 2** 的转换是一个不可逆的过程。

### 什么是提款凭证？ {#whats-a-withdrawal-credential}

当你运行验证者时，你会有一组提款凭证。这些可以在你的存款数据 JSON 文件中找到，或者你可以在你的验证者的 beaconcha.in [存款选项卡](https://beaconcha.in/validator/12345#deposits)上查看它们。

1. **类型 0** 提款凭证：如果你的验证者的提款凭证以 `0x00...` 开头，说明你在沙佩拉硬分叉之前进行了存款，并且尚未设置提款地址。

![Type 0 withdrawal credential](./0x00-wd.png)

2. **类型 1** 提款凭证：如果你的验证者的提款凭证以 `0x01...` 开头，说明你在沙佩拉硬分叉之后进行了存款，或者已经将你的**类型 0** 凭证转换为**类型 1** 凭证。

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. **类型 2** 提款凭证：这种新的提款凭证类型将以 `0x02...` 开头，并在佩克特拉之后启用。具有**类型 2** 提款凭证的验证者有时被称为“**复利验证者**”

| **允许** | **不允许** |
| --- | --- |
| ✅ 类型 0 → 类型 1 | ❌ 类型 0 → 类型 2 |
| ✅ 类型 1 → 类型 2 | ❌ 类型 1 → 类型 0 |
|  | ❌ 类型 2 → 类型 1 |
|  | ❌ 类型 2 → 类型 0 |

### 风险 {#risks}

MaxEB 允许验证者将其全部余额发送给另一个验证者。提交合并请求的用户应验证他们正在签名的交易的来源和内容。利用 MaxEB 功能的官方工具是 Launchpad。如果你确实决定使用第三方工具，你应该验证：

- 源验证者的公钥和提款地址与他们控制的验证者相匹配
- 目标验证者的公钥是正确的并且属于他们
- 如果他们不打算将资金发送给另一个验证者，则该请求是转换，而不是合并
- 交易正由正确的提款地址进行签名

我们**强烈建议**与 [EthStaker 社区](https://ethstaker.org/about)讨论你计划使用的任何第三方工具。这是一个有助于检查你的方法并避免错误的有用地方。如果你使用恶意或配置错误的工具，**你的全部验证者余额可能会被发送到一个你不控制的验证者**——并且无法找回。

## 技术细节 {#technical-details}

### 流程 {#the-flow}

`ConsolidationRequest` 操作将有两种用途：

1. 将现有验证者从**类型 1** 转换为**类型 2** 验证者
2. 将其他验证者合并到现有的**类型 2** 验证者中

在将**类型 1** 转换为**类型 2** 验证者的过程中，*源*和*目标*都将是你正在转换的验证者。该操作将消耗 Gas，并将在其他合并请求之后排队。此队列与存款队列是**分开的**，不受新验证者存款的影响，可以在 [pectrified.com](https://pectrified.com/) 上查看。

要合并验证者，你必须有一个具有**类型 2** 提款凭证的*目标验证者*。这是任何被合并的验证者余额的目的地，并且其索引将被保留。

### 转换为类型 2 的要求 {#requirements-for-converting-to-type-2}

这对于你转换为**类型 2** 的第一个验证者是必需的。该验证者的索引将被保留并保持活跃。对于转换，*源验证者* == *目标验证者*。

验证者必须...

- 处于活跃状态
- 具有**类型 1** 提款凭证
- 不处于退出状态（或被罚没）
- 没有待处理的手动触发提款（不适用于自动归集）

![conversion illustration](./conversion.png)

### 合并的要求 {#requirements-for-consolidating}

这与转换是*相同的操作*，但*源验证者*与*目标验证者*不同。目标验证者的索引被保留，并接收来自源验证者的余额。源验证者的索引被置于 `EXITED` 状态。

在这种情况下，源验证者具有与上述相同的所有要求，外加：

- 已经活跃了至少约 27.3 小时（一个 `SHARD_COMMITTEE_PERIOD`）

目标验证者必须

- 具有**类型 2** 提款凭证
- 不处于退出状态。

![consolidation illustration](./consolidation.png)

### 合并请求 {#the-consolidation-request}

合并请求将由与源验证者关联的提款地址进行签名，并包含：

1. 源验证者的地址（例如，`0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`）
2. 源验证者的公钥（例如，`0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`）
3. 目标验证者的公钥

在转换中，2 和 3 将是相同的。此操作可以在 [Launchpad](https://launchpad.ethereum.org/) 上完成。

### 签名要求 {#signing-requirements}

要提交 `ConsolidationRequest`，**源验证者的提款地址**必须对请求进行签名。这证明了对验证者资金的控制权。

### 签名了什么？ {#what-is-signed}

使用了 `ConsolidationRequest` 对象的域分离 [签名根](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root)。

- **域：** `DOMAIN_CONSOLIDATION_REQUEST`
- **签名根字段：**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

生成的 **BLS 签名**将与请求一起提交。

注意：签名由提款地址完成，而不是验证者密钥。

### 部分提款 {#partial-withdrawals}

具有**类型 1** 凭证的验证者会将其超额余额（超过 32 ETH 的任何部分）自动、免 Gas 地归集到其提款地址。因为**类型 2** 允许验证者以 1 ETH 的增量复利余额，所以在达到 2048 ETH 之前，它不会自动归集余额。**类型 2** 验证者的部分提款必须手动触发，并且将消耗 Gas。

## 合并工具 {#consolidation-tooling}

有几种工具可用于管理合并。由以太坊基金会创建的官方工具是 [Launchpad](https://launchpad.ethereum.org/en/validator-actions)。还有由质押社区实体创建的第三方工具，它们可能提供 Launchpad 未提供的功能。虽然这里的工具未经以太坊基金会审计或认可，但以下是社区知名成员提供的开源工具。

| 工具 | 网站 | 开源 | 创建者 | 已审计 | 界面 | 显著功能 |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | 是，Apache-2.0 | [Pier Two](https://piertwo.com/) | 否 | Web UI | WalletConnect，支持 SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | 是，MIT | [Luganodes](https://www.luganodes.com/) | 是，Quantstamp [2025 年 5 月](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | 命令行 | 批量处理，可同时处理多个验证者 |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | 是，Apache-2.0 | [Jim McDonald](https://www.attestant.io/team/) | 否 | 命令行 | 验证者和节点管理的全套功能 |
| Siren | [GitHub](https://github.com/sigp/siren) | 是，Apache-2.0 | [Sigma Prime](https://sigmaprime.io/) | 否 | 部分命令行，但主要是 Web UI | 仅在使用莱特豪斯共识客户端时有效 |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | 是，MIT 许可证 | [Stakely](https://stakely.io/) | 否 | Web UI，由 Stakely 托管并可免费自托管 | 支持主要钱包连接，包括通过 WalletConnect 连接 Safe |

## 常见问题解答 {#faq}

### 选择加入会改变我的提案运气或奖励吗？ {#change-luck-or-rewards}

不会。选择加入不会降低你被选中提案的机会——你的职责和提案选择保持不变。例如，如果你有两个 32 ETH 的验证者与一个 64 ETH 的验证者相比，你被选中提出区块并赚取奖励的总机会是相同的。

### 选择加入会改变我的罚没风险吗？ {#change-slashing-risk}

对于较小或非专业的运营者来说，简短的回答是不会。详细的回答是，对于每个节点运行许多验证者并具有快速警报的专业运营者来说，合并为较少的验证者可能会降低他们对罚没做出反应并防止级联事件的能力。为了抵消这种风险，所有验证者的初始罚没*惩罚*已从 1 ETH（每 32 ETH）大幅降低至 0.0078125 ETH（每 32 ETH）。

### 我必须退出我的验证者才能转换吗？ {#exit-validator}

不需要。你可以在不退出的情况下就地转换。

### 转换/合并需要多长时间？ {#how-long}

至少 27.3 小时，但合并也需要排队。此队列独立于存款和提款队列，不受它们的影响。

### 我可以保留我的验证者索引吗？ {#keep-validator-index}

可以。就地转换保留相同的验证者索引。如果你合并多个验证者，你将只能保留*目标验证者*的索引。

### 我会错过证明吗？ {#miss-attestations}

在合并到另一个验证者的过程中，源验证者将退出，并且在余额在目标验证者上激活之前有大约 27 小时的等待期。此期间**不会影响性能指标**。

### 我会受到惩罚吗？ {#incur-penalties}

不会。只要你的验证者在线，你就不会受到惩罚。

### 被合并的验证者的提款地址必须匹配吗？ {#withdrawal-addresses-match}

不需要。但*源*必须从其自己的地址授权该请求。

### 转换后我的奖励会复利吗？ {#rewards-compound}

会。使用**类型 2** 凭证，超过 32 ETH 的奖励会自动重新质押——但不是立即进行。由于存在一个小的缓冲区（称为 [*滞后 (hysteresis)*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)），你的余额需要达到**大约多出 1.25 ETH** 才能将额外部分重新质押。因此，它不是在 33.0 ETH 时复利，而是在 33.25 ETH（有效余额 = 33 ETH），然后是 34.25 ETH（有效余额 = 34 ETH）时发生，依此类推。

### 转换后我还能获得自动归集吗？ {#automatic-sweep}

自动归集仅在超额余额超过 2048 时才会发生。对于所有其他部分提款，你需要手动触发它们。

### 我可以改变主意并从类型 2 恢复到类型 1 吗？ {#go-back-to-type1}

不可以。转换为**类型 2** 是不可逆的。

### 如果我想合并多个验证者，我必须先将每个验证者转换为类型 2 吗？ {#consolidate-multiple-validators}

不需要！将一个验证者转换为类型 2，然后将其用作目标。合并到该类型 2 目标中的所有其他验证者可以是类型 1 或类型 2。

### 我的验证者离线或低于 32 ETH - 我还能转换它吗？ {#offline-or-below-32eth}

可以。只要它处于活跃状态（未退出）并且你可以使用其提款地址进行签名，你就可以转换它。

## 资源 {#resources}

- [Electra 共识规范](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md)：这是你应该依赖的“最真实”版本。如有疑问，请阅读规范。
- 并非每个人都习惯于阅读代码，因此 [这个 MaxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) 可以帮助解释规范。*免责声明：应将规范而非 AI 视为真相，因为 AI 可能会误解信息或产生幻觉。*
- [pectrified.com](https://pectrified.com/)：查看合并、存款的状态以及队列等待时间。
- [Ethereal](https://github.com/wealdtech/ethereal)：社区创建的 CLI 工具，用于管理常见的验证者任务。
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor)：社区创建的合约，允许在单笔交易中存入多个以太坊验证者。