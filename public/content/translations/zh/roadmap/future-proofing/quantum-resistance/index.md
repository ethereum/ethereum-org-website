---
title: "以太坊上的后量子密码学"
description: "以太坊如何为后量子时代做准备，哪些方面存在漏洞，以及正在构建哪些保护措施。"
lang: zh
image: /images/roadmap/roadmap-future.png
alt: "以太坊路线图"
template: roadmap
summaryPoints:
  - 量子计算机最终将威胁到以太坊目前使用的密码学
  - 以太坊基金会拥有一个专门的后量子研究团队，以及一个结构化的“精简以太坊 (Lean Ethereum)”路线图，目标是在 2029 年实现全面的后量子保护
  - 您的资金目前是安全的，钱包软件将引导您完成未来的迁移
---

量子计算机最终将能够破解当今保护以太坊和大多数其他数字系统安全的密码学方法。本页面解释了这意味着什么，网络如何主动开发改进措施以减轻这种风险，以及您需要了解的内容。

## 为什么后量子密码学很重要 {#why-post-quantum-matters}

以太坊依赖几种形式的[密码学](/glossary/#cryptography)来保持网络安全并保护用户资金。最重要的是：

- **椭圆曲线数字签名算法 (ECDSA)**：用于签署交易的密码学。您的以太坊账户的安全性取决于此。
- **BLS 签名**：由[验证者](/glossary/#validator)用于就网络状态达成[共识](/glossary/#consensus)。
- **KZG 多项式承诺**：在以太坊的扩容路线图中用于[数据可用性](/glossary/#data-availability)。
- **零知识证明 (ZK-proof) 系统**：由汇总 (rollups) 和其他应用程序用于在链下验证计算。

所有这些都依赖于数学结构（例如阿贝尔群），这些结构对于经典计算机来说很难，但量子计算机可以使用[秀尔算法 (Shor's algorithm)](https://en.wikipedia.org/wiki/Shor%27s_algorithm)高效地解决。

### 量子计算机何时会威胁到以太坊？ {#when-will-quantum-computers-threaten-ethereum}

2026 年 3 月，谷歌量子人工智能 (Google Quantum AI) 发表的研究估计，破解 256 位椭圆曲线密码学（以太坊用于账户签名的类型）可能需要大约 1,200 个逻辑量子比特。之前的估计将这个数字定得高得多。谷歌设定了 2029 年的内部截止日期，以将其自身系统迁移到后量子密码学。

目前的量子硬件远未达到这种规模，仅以几千个嘈杂的物理量子比特运行。逻辑量子比特（用于纠正错误并执行可靠计算）每个都需要许多物理量子比特。**当前硬件与破解以太坊密码学所需硬件之间的差距仍然很大，但其缩小速度比许多人预期的要快。** 值得注意的是，美国国家标准与技术研究院 (NIST) 预计到 2030 年弃用 ECDSA，并在 2035 年之前禁止使用它。

这不是迫在眉睫的威胁。但密码学过渡需要数年时间，而以太坊的安全模型旨在持续几个世纪。以太坊的应对措施是 **精简以太坊 (Lean Ethereum)** 路线图，这是一项经过深思熟虑的多年任务，旨在围绕能够抵御任何密码学威胁的原语重建以太坊。

## 容易受到量子攻击的四个领域 {#four-vulnerable-areas}

2026 年 2 月，Vitalik Buterin [发布了一份路线图](https://x.com/VitalikButerin/status/2027075026378543132)，指出了以太坊密码学中需要进行后量子升级的四个不同领域。每个领域都有不同的挑战和不同的解决路径。

### 1. 共识层 BLS 签名 {#consensus-bls}

**它的作用**：以太坊的[权益证明 (PoS)](/glossary/#pos)协议使用 BLS 签名来聚合来自数十万验证者的投票。BLS 允许将许多签名组合成一个，从而保持网络高效。

**为什么它很脆弱**：BLS 签名依赖于椭圆曲线配对，而量子计算机可以破解它。

**解决方法**：精简共识 (Lean Consensus) 路线图包括开发两个互补的工具：
- **leanXMSS**：以太坊将用 leanXMSS（一种用于验证者的基于哈希的签名方案）取代 BLS 签名。基于哈希的签名被认为是量子安全的，因为它们仅依赖于哈希函数的安全性，量子计算机会削弱但不会破解哈希函数。
- **leanVM**：一个用于基于 SNARK 的签名聚合的最小 zkVM（零知识虚拟机）。由于基于哈希的签名要大得多（大约 3,000 字节，而 BLS 为 96 字节），因此切换到 leanXMSS 将在每个时隙产生更多的数据。为了解决这个问题，leanVM 充当聚合引擎，将数据压缩 250 倍。这保留了将许多签名组合成一个的效率优势，即使在切换到量子安全方案之后也是如此。

<ExpandableCard title="为什么以太坊不能直接用量子安全方案替换 BLS？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

使 BLS 高效的聚合属性（将数十万个签名组合成一个）没有明显的量子安全等效物。后量子签名也比 BLS 签名大得多。简单地将一个换成另一个会使以太坊的共识层变得明显更慢且更昂贵。这就是为什么团队正在构建 leanVM，这是一个使用零知识证明来高效聚合量子安全签名的工具。

</ExpandableCard>

### 2. 数据可用性：KZG 承诺 {#data-availability-kzg}

**它的作用**：KZG 多项式承诺确保数据（特别是来自汇总的[斑点](/glossary/#blob)数据）在网络上可用，而不需要每个节点下载所有数据。

**为什么它很脆弱**：KZG 承诺依赖于椭圆曲线配对，这正是量子计算机可以攻击的数学结构。

**当前的缓解措施**：KZG 承诺使用“可信设置”，其中许多参与者贡献了随机性。只要至少有一名参与者是诚实的并丢弃了他们的秘密，该设置就是安全的，即使面对试图在事后对其进行逆向工程的量子计算机也是如此。

**长期解决方案**：用量子安全的承诺方案取代 KZG。两个主要的候选方案是：
- **基于 STARK 的承诺**：依赖于哈希函数而不是椭圆曲线。已在一些 ZK 汇总中使用。
- **基于格的承诺**：依赖于格问题的难度，这些问题被认为是抗量子的。

这两种方法仍在针对以太坊规模的效率和实用性进行研究。

### 3. 账户签名：ECDSA {#eoa-signatures}

**它的作用**：每个标准的以太坊账户（外部拥有账户，或 [EOA](/glossary/#eoa)）都在 secp256k1 曲线上使用 ECDSA 来签署交易。这就是保护您资金的机制。

**为什么它很脆弱**：对于任何发送过交易的账户，其公钥都会暴露在链上。量子计算机可以从这些暴露的公钥数据中推导出私钥。

**重要的细微差别**：只接收过以太币而从未发送过交易的账户没有暴露其公钥。只有地址（公钥的哈希）是可见的，这提供了一些额外的保护。

**解决方法**：以太坊计划使用[账户抽象](/roadmap/account-abstraction/)（特别是 EIP-8141，正在考虑在 2026 年下半年的 Hegotá 升级中采用），而不是进行单一的协议范围内的迁移，从而为用户提供**签名敏捷性**。个人账户可以切换到后量子签名方案，而无需等待整个协议发生变化。

这是一种务实的方法。希望尽早获得后量子保护的用户和钱包可以自愿采用它，而更广泛的迁移则会随着时间的推移而发生。

### 4. 应用层零知识证明 {#zk-proofs}

**它的作用**：二层网络 (l2) 汇总和其他应用程序使用零知识证明系统来验证计算，而无需揭示底层数据。

**为什么它很脆弱**：许多流行的零知识证明系统（使用椭圆曲线配对的 SNARK）依赖于易受量子攻击的假设。

**解决方法**：依赖于哈希函数而不是椭圆曲线的 STARK 已经具有抗量子性，并被几个汇总使用。基于 STARK 的系统的自然生态系统采用已经在应用层提供了后量子安全。

## NIST 标准 {#nist-standards}

2024 年 8 月，美国国家标准与技术研究院 (NIST) [最终确定了三项后量子密码学标准](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)。这些标准很重要，因为它们为包括以太坊在内的整个科技行业提供了一套共享的、经过审查的算法作为构建基础，而不是每个项目都发明自己的算法。

| 标准 | 名称 | 类型 | 用例 |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | 基于格 | 密钥封装（密钥交换） |
| FIPS 204 | ML-DSA (Dilithium) | 基于格 | 数字签名 |
| FIPS 205 | SLH-DSA (SPHINCS+) | 基于哈希 | 数字签名 |

这些标准为更广泛行业的后量子过渡奠定了基础。以太坊的工作建立在这些标准之上并对其进行了扩展，特别关注去中心化的网络中效率和聚合至关重要的独特挑战。

## 以太坊基金会的方法 {#ef-approach}

以太坊基金会于 2026 年 1 月成立了一个专门的后量子安全团队，由 Thomas Coratger 领导。该团队的工作在 [pq.ethereum.org](https://pq.ethereum.org) 上公开跟踪。

### 当前活动（截至 2026 年 4 月） {#current-activity}

- **每周互操作性开发者网络 (devnets)**：超过 10 个客户端团队参与定期的后量子互操作性测试，包括莱特豪斯 (Lighthouse)、Grandine、Zeam、Ream Labs 和 PierTwo。
- **波塞冬奖 (Poseidon Prize)**：一项 100 万美元的研究奖金，旨在改进基于哈希的密码学原语。
- **开源实现**：leanXMSS、leanVM、leanSpec (Python)、leanSig (Rust) 和 leanMultisig 均可在 [leanEthereum GitHub 组织](https://github.com/leanEthereum)下获取。
- **第二届年度后量子研究静修会**：计划于 2026 年 10 月 9 日至 2026 年 10 月 12 日在英国剑桥举行。
- **与 NIST 保持一致**：以太坊的工作建立在 NIST 于 2024 年 8 月最终确定的后量子密码学标准（如 ML-KEM、ML-DSA 和 SLH-DSA）之上。

### 迁移里程碑 {#migration-milestones}

团队概述了一系列协议升级，以逐步将后量子密码学引入以太坊。这些是规划的里程碑，而不是有保证的承诺。名称和顺序可能会发生变化。

| 里程碑 | 引入的内容 |
|-----------|--------------------|
| I* | 后量子 (PQ) 密钥注册表。验证者可以在现有 BLS 密钥旁边注册后量子公钥。 |
| J* | 后量子签名验证预编译。智能合约和钱包可以原生验证后量子签名。 |
| L* | 通过 leanVM 进行后量子证明和实时共识层证明。验证者开始使用后量子签名达成共识。 |
| M* | 完整的后量子签名聚合和后量子安全的斑点承诺。 |

**目标**：结构化的分叉里程碑目标是在 2029 年左右完成核心后量子基础设施。完整的执行层和生态系统迁移将在此之后继续进行。

## 用户需要做什么？ {#what-users-need-to-do}

**现在：什么都不用做。** 您的资金是安全的。当今没有任何量子计算机能够威胁到以太坊的密码学。

**在未来**：一旦以太坊广泛支持后量子签名方案（预计在 Hegotá 硬分叉和 EIP-8141 实施之后），您将需要将您的账户迁移到量子安全签名。钱包软件将引导您完成这一过渡。

如果您的账户从未发送过交易（这意味着您的公钥尚未暴露在链上），它将拥有一层额外的保护。但所有账户最终都应该迁移。

如何处理休眠钱包（其所有者可能没有意识到需要迁移的账户）是一个开放的治理话题。以太坊社区尚未就此达成共识。

## 常见问题解答 {#faq}

<ExpandableCard title="量子计算机现在能窃取我的 ETH 吗？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**不。** 当今没有任何量子计算机能够破解以太坊的密码学。目前的量子硬件远未达到所需的规模。本页面描述的工作是为未来做准备，而不是对活跃威胁的响应。

</ExpandableCard>

<ExpandableCard title="量子计算机何时会构成威胁？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

估计各不相同。谷歌 2026 年 3 月的研究表明，破解 256 位椭圆曲线密码学所需的硬件最早可能在本十年末左右出现，但仍存在重大的工程挑战。大多数研究人员认为，现实的威胁至少还有几年的时间。诚实的回答是，没有人知道确切的时间表，这正是为什么现在做准备很重要的原因。

</ExpandableCard>

<ExpandableCard title="我需要做些什么来保护我的钱包吗？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

最终是的。一旦以太坊上提供了后量子签名方案，用户将需要迁移他们的账户。钱包软件可能会为您处理这种过渡。目前，您不需要做任何事情。当需要采取行动时，以太坊社区和钱包开发者将提供清晰的指导和工具。

</ExpandableCard>

<ExpandableCard title="我的代币、NFT 和 DeFi 头寸怎么办？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

以太坊上的资产由账户签名控制。一旦您的账户迁移到量子安全签名方案，该账户中的所有内容都会受到保护。您不需要单独迁移每项资产。持有资金的智能合约（如去中心化金融 (DeFi) 协议）可能需要根据其内部使用的密码学原语进行自身的升级。

</ExpandableCard>

<ExpandableCard title="在这方面，以太坊落后于其他区块链吗？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

不。以太坊拥有所有区块链中最结构化的后量子计划之一：专门的团队、受资助的研究、每周的开发者网络以及已发布的迁移路线图，将量子计算视为一等设计约束。目前还没有任何区块链完成全面的后量子过渡。根据以太坊基金会的估计，以太坊易受量子攻击的休眠资金风险敞口约为 0.1%，远低于其他主要区块链网络。

</ExpandableCard>

<ExpandableCard title="什么是「现在收集，以后解密」？" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

“现在收集，以后解密 (Harvest now, decrypt later)”是一种攻击方式，即有人今天记录加密数据或暴露的公钥，然后在以后存在足够强大的量子计算机时破解加密。对于以太坊来说，这与公钥已经暴露在链上的账户（任何发送过交易的账户）最相关。这也是为什么社区将后量子迁移视为时间敏感的原因之一，即使量子威胁尚未迫在眉睫。

</ExpandableCard>

## 延伸阅读 {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _以太坊基金会_
- [后量子密码学项目](https://pse.dev/projects/post-quantum-cryptography) - _以太坊隐私守护者 (PSE)_
- [NIST 后量子密码学标准](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [通过负责任地披露量子漏洞来保护加密货币](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _谷歌量子人工智能 (Google Quantum AI)_
- [量子前沿可能比看起来更近](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _谷歌_
- [KZG 和可信设置](/roadmap/danksharding/#what-is-kzg)
- [剑桥精简周 (2025) leanVM + 后量子研讨会资源](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _精简以太坊 (Lean Ethereum)_
- [后量子交易签名 ACD 分组会议](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _以太坊基金会_
- [后量子互操作性 ACD 分组会议](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _以太坊基金会_
- [精简以太坊与后量子安全 YouTube 播放列表](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _以太坊基金会_
- [后量子抗性小组访谈](https://youtu.be/5DRDjeMmOPw) - _Bankless 播客_
- [以太坊上的账户抽象](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _以太坊基金会架构_
- [叠加态：量子计算行业分析](https://www.superpositioned.co/) - _Saneel Sreeni_