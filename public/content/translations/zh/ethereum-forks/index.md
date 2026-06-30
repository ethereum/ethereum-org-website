---
title: "所有以太坊分叉的时间线（2014 年至今）"
description: "以太坊区块链的历史，包括主要里程碑、版本发布和分叉。"
lang: zh
sidebarDepth: 1
authors: ["尼克索"]
---

[以太坊](/)区块链所有主要里程碑、分叉和更新的时间线。

<ExpandableCard title="什么是分叉？" contentPreview="对以太坊协议规则的更改，通常包含计划中的技术升级。">

当网络需要进行重大的技术升级或更改时，就会发生分叉——它们通常源于[以太坊改进提案 (EIP)](/eips/)，并改变协议的“规则”。

在传统的集中控制软件中需要升级时，公司只需为最终用户发布一个新版本即可。区块链的工作方式不同，因为没有中心化的所有权。[以太坊客户端](/developers/docs/nodes-and-clients/)必须更新其软件以实施新的分叉规则。此外，区块创建者（工作量证明 (PoW) 世界中的矿工，权益证明 (PoS) 世界中的验证者）和节点必须根据新规则创建区块并进行验证。[了解有关共识机制的更多信息](/developers/docs/consensus-mechanisms/)

这些规则的改变可能会在网络中造成暂时的分裂。新区块可以根据新规则或旧规则产生。分叉通常会提前达成一致，以便客户端一致地采用这些更改，并且带有升级的分叉将成为主链。然而，在极少数情况下，对分叉的分歧可能会导致网络永久分裂——最著名的就是通过 <a href="#dao-fork">DAO 分叉</a>创建了以太坊经典。

</ExpandableCard>

<ExpandableCard title="为什么有些升级有多个名称？" contentPreview="升级名称遵循特定模式">

构成以太坊基础的软件由两部分组成，即[执行层](/glossary/#execution-layer)和[共识层](/glossary/#consensus-layer)。

**执行层升级命名**

自 2021 年起，**执行层**的升级按时间顺序根据[历届 Devcon 和 Devconnect 举办地](https://devcon.org/en/past-events/)的城市名称命名：

| 升级名称   | Devcon(nect) 年份 | Devcon 届数 | 升级日期 |
| -------------- | ----------------- | ------------- | ------------ |
| 柏林         | 2014              | 0             | 2021 年 4 月 15 日 |
| 伦敦         | 2015              | I             | 2021 年 8 月 5 日  |
| 上海       | 2016              | II            | 2023 年 4 月 12 日 |
| 坎昆         | 2017              | III           | 2024 年 3 月 13 日 |
| 布拉格         | 2018              | IV            | 2025 年 5 月 7 日  |
| 大阪          | 2019              | V             | 2025 年 12 月 3 日  |
| **阿姆斯特丹**  | 2022              | Devconnect    | 待定 - 下一次   |
| _波哥大_       | 2022              | VI            | 待定          |
| _伊斯坦布尔_     | 2023              | Devconnect    | 待定          |
| _曼谷_      | 2024              | VII           | 待定          |
| _布宜诺斯艾利斯_ | 2025              | Devconnect    | 待定          |
| _孟买_       | 2026              | VIII          | 待定          |

**共识层升级命名**

自[信标链](/glossary/#beacon-chain)启动以来，**共识层**的升级以恒星命名，其首字母按字母表顺序排列：

| 升级名称                                              | 升级日期 |
| --------------------------------------------------------- | ------------ |
| 信标链创世                                      | 2020 年 12 月 1 日  |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 2021 年 10 月 27 日 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 2022 年 9 月 6 日  |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 2023 年 4 月 12 日 |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 2024 年 3 月 13 日 |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 2025 年 5 月 7 日  |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 2025 年 12 月 3 日  |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | 待定 - 下一次   |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | 待定          |

**组合命名**

执行层和共识层的升级最初是在不同时间推出的，但在 2022 年[合并](/roadmap/merge/)之后，它们开始同时部署。因此，出现了一些通俗的术语，使用单一的组合词来简化对这些升级的引用。这始于 _Shanghai-Capella_ 升级，通常被称为“**沙佩拉**”，并在随后的升级中延续。

| 执行层升级 | 共识层升级 | 简称    |
| ----------------- | ----------------- | ------------- |
| 上海          | Capella           | "沙佩拉"    |
| 坎昆            | Deneb             | "Dencun"      |
| 布拉格            | Electra           | "佩克特拉"      |
| 大阪             | Fulu              | "弗萨卡"      |
| 阿姆斯特丹         | Gloas             | "格拉姆斯特丹" |
| 波哥大            | Heze              | "Hegotá"      |

</ExpandableCard>

直接跳转到有关一些特别重要的过去升级的信息：[信标链](/roadmap/beacon-chain/)；[合并](/roadmap/merge/)；以及 [EIP-1559](#london)

寻找未来的协议升级？[了解以太坊路线图上即将进行的升级](/roadmap/)。

<Divider />

## 2025 {#2025}

### 福禄-大阪 ("弗萨卡") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[更多关于弗萨卡的信息](/roadmap/fusaka/)

### 布拉格-Electra ("佩克特拉") {#pectra}

<NetworkUpgradeSummary name="pectra" />

布拉格-Electra (“佩克特拉”) 升级包含了几项对以太坊协议的改进，旨在提升所有用户、二层网络 (l2)、质押者和节点运营商的体验。

质押功能得到了升级，引入了复利验证者账户，并通过使用执行提款地址改善了对质押资金的控制。EIP-7251 将单个验证者的最大有效余额增加到 2048，从而提高了质押者的资金效率。EIP-7002 允许执行账户安全地触发验证者操作，包括退出或提取部分资金，这改善了 ETH 质押者的体验，同时有助于加强节点运营商的问责制。

升级的其他部分侧重于改善普通用户的体验。EIP-7702 使普通的非智能合约账户（[外部拥有账户 (EOA)](/glossary/#eoa)）能够执行类似于智能合约的代码。这为传统的以太坊账户解锁了无限的新功能，例如交易批量处理、Gas 赞助、替代身份验证、可编程支出控制、账户恢复机制等。

<ExpandableCard title="佩克特拉 EIP" contentPreview="此次升级中包含的官方改进。">

更好的用户体验：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>设置 EOA 账户代码</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>增加斑点吞吐量</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>增加调用数据成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>将斑点时间表添加到执行层配置文件</em></li>
</ul>

更好的质押体验：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>增加 <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>执行层可触发退出</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>通用执行层请求</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>在链上提供验证者存款</em></li>
</ul>

协议效率和安全性改进：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381 曲线操作的预编译合约</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>在状态中保存历史区块哈希</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>将委员会索引移出证明</em></li>
</ul>

</ExpandableCard>

- [佩克特拉将如何提升质押体验](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [阅读 Electra 升级规范](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [布拉格-Electra (“佩克特拉”) 常见问题解答](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### 坎昆-德内布 ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### 坎昆摘要 {#cancun-summary}

坎昆升级包含了一系列对以太坊_执行_的改进，旨在提高可扩展性，并与德内布 (Deneb) 共识升级协同进行。

值得注意的是，这包括 EIP-4844，即 **Proto-Danksharding**，它显著降低了二层网络 (l2) 汇总的数据存储成本。这是通过引入数据“斑点”来实现的，它允许汇总在短时间内将数据发布到主网。这为二层网络 (l2) 汇总的用户带来了显著降低的交易费。

<ExpandableCard title="坎昆 EIP" contentPreview="此次升级中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>瞬态存储操作码</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM 中的信标区块根</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>分片斑点交易 (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - 内存复制指令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em>仅在同一交易中使用的 <code>SELFDESTRUCT</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> 操作码</em></li>
</ul>

</ExpandableCard>

- [二层网络 (l2) 汇总](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [丹克分片](/roadmap/danksharding/)
- [阅读坎昆升级规范](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### 德内布摘要 {#deneb-summary}

德内布升级包含了一系列对以太坊_共识_的改进，旨在提高可扩展性。此次升级与坎昆执行升级协同进行，以启用 Proto-Danksharding (EIP-4844)，并对信标链进行了其他改进。

预先生成的已签名“自愿退出消息”不再过期，从而为将资金质押给第三方节点运营商的用户提供更多控制权。借助此已签名的退出消息，质押者可以委托节点运营，同时保留随时安全退出和提款的能力，而无需征求任何人的许可。

EIP-7514 通过将验证者加入网络的“流转”率限制为每个时段八 (8) 个，从而收紧了 ETH 的发行。由于 ETH 发行量与质押的 ETH 总量成正比，限制加入的验证者数量可以限制新发行 ETH 的_增长率_，同时还能降低节点运营商的硬件要求，有助于去中心化。

<ExpandableCard title="Deneb EIP" contentPreview="此次升级中包含的官方改进">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM 中的信标区块根</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>分片斑点交易</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>永久有效的已签名自愿退出</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>增加最大证明包含时隙</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>添加最大时段流转限制</em></li>
</ul>

</ExpandableCard>

- [阅读德内布升级规范](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [坎昆-德内布 ("Dencun") 常见问题解答](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### 上海-Capella (“沙佩拉”) {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### 上海升级摘要 {#shanghai-summary}

上海升级将质押提款引入了执行层。与 Capella 升级协同，这使得区块能够接受提款操作，从而允许质押者将其 ETH 从信标链提取到执行层。

<ExpandableCard title="上海 EIP" contentPreview="此次升级中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>预热 <code>COINBASE</code> 地址</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>新增 <code>PUSH0</code> 指令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>限制并计量 initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>以操作形式推送信标链提款</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>弃用 <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [阅读上海升级规范](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella 升级摘要 {#capella-summary}

Capella 升级是共识层（信标链）的第三次重大升级，并启用了质押提款。Capella 与执行层升级（上海）同步进行，并启用了质押提款功能。

此次共识层升级使那些在初始存款时未提供提款凭证的质押者能够提供凭证，从而实现提款。

该升级还提供了自动账户清扫功能，该功能会持续处理验证者账户，以进行任何可用的奖励支付或全额提款。

- [了解有关质押提款的更多信息](/staking/withdrawals/)。
- [阅读 Capella 升级规范](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### 巴黎（合并） {#paris}

<NetworkUpgradeSummary name="paris" />

#### 摘要 {#paris-summary}

巴黎升级是由工作量证明 (PoW) 区块链超过 58750000000000000000000 的[终端总难度](/glossary/#terminal-total-difficulty)触发的。这发生在 2022 年 9 月 15 日的第 15537393 个区块，并在下一个区块触发了巴黎升级。巴黎升级是[合并](/roadmap/merge/)过渡——其主要特点是关闭[PoW](/developers/docs/consensus-mechanisms/pow)挖矿算法及相关的共识逻辑，并转而开启[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos)。巴黎升级本身是对[执行客户端](/developers/docs/nodes-and-clients/#execution-clients)的升级（相当于共识层上的 Bellatrix 升级），使它们能够接收来自其连接的[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)的指令。这需要激活一组新的内部 API 方法，统称为[引擎 API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)。这可以说是自[霍姆斯特德](#homestead)以来以太坊历史上最重要的升级！

- [阅读巴黎升级规范](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="巴黎 EIP" contentPreview="此次升级中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>将共识升级为权益证明</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>用 PREVRANDAO 替代 DIFFICULTY 操作码</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### 摘要 {#bellatrix-summary}

Bellatrix 升级是[信标链](/roadmap/beacon-chain)的第二次计划升级，为[合并](/roadmap/merge/)做准备。它将验证者因不活跃和可罚没违规行为受到的惩罚提高到最大值。Bellatrix 还包括对分叉选择规则的更新，以使该链为合并以及从最后一个工作量证明 (PoW) 区块到第一个权益证明 (PoS) 区块的过渡做好准备。这包括让共识客户端知晓 58750000000000000000000 的[终端总难度](/glossary/#terminal-total-difficulty)。

- [阅读 Bellatrix 升级规范](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### 灰冰川 {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### 摘要 {#gray-glacier-summary}

灰冰川网络升级将[难度炸弹](/glossary/#difficulty-bomb)推迟了三个月。这是本次升级中引入的唯一变化，其性质与[箭形冰川](#arrow-glacier)和[缪尔冰川](#muir-glacier)升级类似。在[拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[伦敦](#london)网络升级中也进行了类似的更改。

- [以太坊基金会博客 - 灰冰川升级公告](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="灰冰川 EIP" contentPreview="此次升级中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>将难度炸弹推迟到 2022 年 9 月</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### 箭形冰川 {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### 摘要 {#arrow-glacier-summary}

箭形冰川网络升级将[难度炸弹](/glossary/#difficulty-bomb)推迟了几个月。这是本次升级中引入的唯一变化，其性质与[缪尔冰川](#muir-glacier)升级类似。在[拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[伦敦](#london)网络升级中也进行过类似的更改。

- [以太坊基金会博客 - 箭形冰川升级公告](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - 以太坊箭形冰川升级](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="箭形冰川 EIP" contentPreview="此次升级中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>将难度炸弹推迟到 2022 年 6 月</em></li>
</ul>

</ExpandableCard>

---

### 牵牛星 {#altair}

<NetworkUpgradeSummary name="altair" />

#### 摘要 {#altair-summary}

牵牛星升级是[信标链](/roadmap/beacon-chain)的首次计划内升级。它增加了对“同步委员会”的支持（从而支持轻客户端），并随着向合并的开发进展，增加了验证者不活跃和罚没的惩罚力度。

- [阅读牵牛星升级规范](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> 有趣的事实！ {#altair-fun-fact}

牵牛星是第一个具有确切推出时间的主要网络升级。在此之前，每次升级都是基于工作量证明 (PoW) 链上声明的区块号，而出块时间是不断变化的。信标链不需要求解工作量证明，而是基于时间的时段系统运行，该系统由 32 个 12 秒的“时隙”组成，验证者可以在这些时隙中提议区块。这就是为什么我们确切知道何时会达到第 74,240 个时段，以及牵牛星何时上线！

- [出块时间](/developers/docs/blocks/#block-time)

---

### 伦敦 {#london}

<NetworkUpgradeSummary name="london" />

#### 摘要 {#london-summary}

伦敦升级引入了 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)，改革了交易费市场，并改变了 Gas 退款的处理方式以及[冰河时代](/glossary/#ice-age)的时间表。

#### 什么是伦敦升级 / EIP-1559？ {#eip-1559}

在伦敦升级之前，以太坊的区块大小是固定的。在网络需求高涨的时期，这些区块满负荷运行。因此，用户通常不得不等待需求减少才能被包含在区块中，这导致了糟糕的用户体验。伦敦升级为以太坊引入了可变大小的区块。

以太坊网络上交易费的计算方式随着 2021 年 8 月的[伦敦升级](/ethereum-forks/#london)发生了改变。在伦敦升级之前，费用的计算没有区分 `base` 和 `priority` 费用，具体如下：

假设 Alice 必须向 Bob 支付 1 ETH。在这笔交易中，gas 上限为 21,000 单位，Gas 价格为 200 Gwei。

总费用将是：`Gas units (limit) * Gas price per unit`，即 `21,000 * 200 = 4,200,000 gwei` 或 0.0042 ETH

伦敦升级中 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 的实施使交易费机制变得更加复杂，但也使 Gas 费用更具可预测性，从而形成了一个更高效的交易费市场。用户可以提交带有 `maxFeePerGas` 的交易，该值对应于他们愿意为执行交易支付的金额，并且他们知道自己支付的 Gas 费用不会超过市场价格（`baseFeePerGas`），任何多余的部分（扣除优先费后）都会被退还。

本视频解释了 EIP-1559 及其带来的好处：[EIP-1559 详解](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [您是去中心化应用 (dapp) 开发者吗？请务必升级您的库和工具。](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [阅读以太坊基金会公告](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [阅读 Ethereum Cat Herders 的解释文章](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="伦敦 EIP" contentPreview="此次升级中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>改善交易费市场</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>返回区块的 <code>BASEFEE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>减少 EVM 操作的 Gas 退款</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>防止部署以 <code>0xEF</code> 开头的合约</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>将冰河时代推迟到 2021 年 12 月</em></li>
</ul>

</ExpandableCard>

---

### 柏林 {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### 摘要 {#berlin-summary}

柏林升级优化了某些 EVM 操作的 Gas 成本，并增加了对多种交易类型的支持。

- [阅读以太坊基金会公告](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [阅读 Ethereum Cat Herders 的解释文章](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="柏林 EIP" contentPreview="此次升级中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>降低 MODEXP 的 Gas 成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>使支持多种交易类型变得更容易</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>增加状态访问操作码的 Gas 成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>添加可选的访问列表</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### 信标链创世 {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### 摘要 {#beacon-chain-genesis-summary}

[信标链](/roadmap/beacon-chain/)需要 16384 笔 32 个质押的 ETH 存款才能安全上线。这发生在 11 月 27 日，信标链于 2020 年 12 月 1 日开始生成区块。

[阅读以太坊基金会的公告](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  信标链
</DocLink>

---

### 质押存款合约部署 {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### 摘要 {#deposit-contract-summary}

质押存款合约将[质押](/glossary/#staking)引入了以太坊生态系统。尽管这是一个[主网](/glossary/#mainnet)合约，但它直接影响了启动[信标链](/roadmap/beacon-chain/)（一项重要的[以太坊升级](/roadmap/)）的时间表。

[阅读以太坊基金会的公告](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  质押
</DocLink>

---

### 缪尔冰川 {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### 摘要 {#muir-glacier-summary}

缪尔冰川分叉推迟了[难度炸弹](/glossary/#difficulty-bomb)。[工作量证明 (PoW)](/developers/docs/consensus-mechanisms/pow/)共识机制的区块难度增加，导致发送交易和使用去中心化应用 (dapp) 的等待时间变长，从而威胁到以太坊的可用性。

- [阅读以太坊基金会的公告](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [阅读 Ethereum Cat Herders 的解释文章](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="缪尔冰川 EIP" contentPreview="此次分叉中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>将难度炸弹再推迟 4,000,000 个区块，约 611 天。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### 伊斯坦布尔 {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### 摘要 {#istanbul-summary}

伊斯坦布尔分叉：

- 优化了 [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 中某些操作的 [Gas](/glossary/#gas) 成本。
- 提高了抵御拒绝服务攻击的能力。
- 使基于 SNARKs 和 STARKs 的[二层网络 (l2) 扩容](/developers/docs/scaling/#layer-2-scaling)解决方案性能更高。
- 实现了以太坊和 Zcash 之间的互操作性。
- 允许合约引入更具创意的功能。

[阅读以太坊基金会的公告](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="伊斯坦布尔 EIP" contentPreview="此次分叉中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>允许以太坊与 Zcash 等保护隐私的货币协同工作。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>更便宜的密码学操作以改善 [Gas](/glossary/#gas) 成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>通过添加 <code>CHAINID</code> [操作码](/developers/docs/ethereum-stack/#ethereum-virtual-machine)来保护以太坊免受重放攻击。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>根据消耗量优化操作码的 Gas 价格。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>降低调用数据的成本，以允许区块中包含更多数据——有利于[二层网络 (l2) 扩容](/developers/docs/scaling/#layer-2-scaling)。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>其他操作码 Gas 价格的变更。</em></li>
</ul>

</ExpandableCard>

---

### 君士坦丁堡 {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### 摘要 {#constantinople-summary}

君士坦丁堡分叉：

- 将区块[挖矿](/developers/docs/consensus-mechanisms/pow/mining/)奖励从 3 ETH 减少到 2 ETH。
- 确保区块链在[实施权益证明 (PoS) 之前](#beacon-chain-genesis)不会冻结。
- 优化了 [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 中某些操作的 [Gas](/glossary/#gas) 成本。
- 增加了与尚未创建的地址进行交互的功能。

[阅读以太坊基金会的公告](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="君士坦丁堡 EIP" contentPreview="此次分叉中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>优化了某些链上操作的成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>允许你与尚未创建的地址进行交互。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>引入了 <code>EXTCODEHASH</code> 指令，用于检索另一个合约代码的哈希。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>确保区块链在实施权益证明 (PoS) 之前不会冻结，并将区块奖励从 3 ETH 减少到 2 ETH。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### 拜占庭 {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### 摘要 {#byzantium-summary}

拜占庭分叉：

- 将区块[挖矿](/developers/docs/consensus-mechanisms/pow/mining/)奖励从 5 个 ETH 减少到 3 个 ETH。
- 将[难度炸弹](/glossary/#difficulty-bomb)推迟了一年。
- 增加了对其他合约进行不改变状态的调用的能力。
- 添加了某些密码学方法以支持[二层网络 (l2) 扩容](/developers/docs/scaling/#layer-2-scaling)。

[阅读以太坊基金会公告](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="拜占庭 EIP" contentPreview="此次分叉中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>添加了 <code>REVERT</code> 操作码。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>在交易收据中添加了状态字段，以指示成功或失败。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>添加了椭圆曲线和标量乘法以支持 [ZK-Snarks](/developers/docs/scaling/zk-rollups/)。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>添加了椭圆曲线和标量乘法以支持 [ZK-Snarks](/developers/docs/scaling/zk-rollups/)。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>启用了 RSA 签名验证。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>添加了对可变长度返回值的支持。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>添加了 <code>STATICCALL</code> 操作码，允许对其他合约进行不改变状态的调用。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>更改了难度调整公式。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>将[难度炸弹](/glossary/#difficulty-bomb)推迟 1 年，并将区块奖励从 5 个 ETH 减少到 3 个 ETH。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### 摘要 {#spurious-dragon-summary}

Spurious Dragon 分叉是对网络遭受拒绝服务 (DoS) 攻击（2016 年 9 月/10 月）的第二次响应，包括：

- 调整操作码定价，以防止未来对网络发起攻击。
- 启用区块链状态的“去臃肿化”。
- 添加重放攻击保护。

[阅读以太坊基金会公告](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="伪龙 EIP" contentPreview="此次分叉中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>防止一条以太坊链上的交易在另一条替代链上被重新广播，例如防止测试网交易在以太坊主链上被重放。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>调整 <code>EXP</code> 操作码的价格——使得通过计算成本高昂的合约操作来减缓网络速度变得更加困难。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>允许移除通过 DOS 攻击添加的空账户。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>将区块链上合约的最大代码大小更改为 24576 字节。</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### 摘要 {#tangerine-whistle-summary}

Tangerine Whistle 分叉是对网络遭受拒绝服务 (DoS) 攻击（2016 年 9 月/10 月）的首次响应，包括：

- 解决有关定价过低的操作码的紧急网络健康问题。

[阅读以太坊基金会公告](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="橘子口哨 EIP" contentPreview="此次分叉中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>增加可用于垃圾邮件攻击的操作码的 Gas 成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>通过移除大量空账户来减小状态大小，这些空账户是由于早期版本以太坊协议中的缺陷而以极低成本放入状态中的。</em></li>
</ul>

</ExpandableCard>

---

### DAO 分叉 {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### 摘要 {#dao-fork-summary}

DAO 分叉是对 [2016 年 DAO 攻击](https://www.coindesk.com/learn/understanding-the-dao-attack/)的响应，在这次黑客攻击中，一个不安全的 [DAO](/glossary/#dao) 合约被抽走了超过 360 万个 ETH。该分叉将资金从有缺陷的合约转移到了一个具有单一功能（提款）的[新合约](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)中。任何损失资金的人都可以为其钱包中的每 100 个 DAO 代币提取 1 个 ETH。

这一行动方案由以太坊社区投票表决。任何 ETH 持有者都可以通过[投票平台](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)上的交易进行投票。分叉的决定获得了超过 85% 的选票。

一些矿工拒绝分叉，因为 DAO 事件并不是协议中的缺陷。他们随后组建了[以太坊经典](https://ethereumclassic.org/)。

[阅读以太坊基金会公告](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### 霍姆斯特德 {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### 摘要 {#homestead-summary}

霍姆斯特德分叉着眼于未来。它包含了几项协议更改和一项网络更改，赋予了以太坊进行进一步网络升级的能力。

[阅读以太坊基金会公告](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="霍姆斯特德 EIP" contentPreview="此次分叉中包含的官方改进。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>对合约创建过程进行编辑。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>添加新操作码：<code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>引入 devp2p 向前兼容性要求</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### 前沿解冻 {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### 摘要 {#frontier-thawing-summary}

前沿解冻分叉取消了每个[区块](/glossary/#block) 5,000 [Gas](/glossary/#gas) 的限制，并将默认 Gas 价格设置为 51 [Gwei](/glossary/#gwei)。这使得交易成为可能——交易需要 21,000 Gas。引入[难度炸弹](/glossary/#difficulty-bomb)是为了确保未来硬分叉至[权益证明 (PoS)](/glossary/#pos)。

- [阅读以太坊基金会公告](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [阅读以太坊协议更新 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### 前沿 {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### 摘要 {#frontier-summary}

前沿是以太坊项目的实时但最基础的实现。它紧随成功的奥林匹克 (Olympic) 测试阶段之后发布。它主要面向技术用户，特别是开发者。[区块](/glossary/#block)的 [Gas](/glossary/#gas) 上限为 5,000。这个“解冻”期使矿工能够开始挖矿作业，并让早期采用者有时间安装客户端，而无需“匆忙”行事。

[阅读以太坊基金会公告](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### 以太币发售 {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

以太币正式发售，为期 42 天。你可以使用 BTC 购买。

[阅读以太坊基金会公告](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### 黄皮书发布 {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

由加文·伍德博士撰写的《黄皮书》是以太坊协议的技术定义。

[查看黄皮书](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### 白皮书发布 {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

这篇介绍性论文由以太坊创始人维塔利克·布特林于 2013 年发表，早于该项目在 2015 年的正式启动。

<DocLink href="/whitepaper/">
  白皮书
</DocLink>
