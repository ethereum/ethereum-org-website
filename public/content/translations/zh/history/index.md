---
title: 以太坊的历史和分叉
description: 以太坊区块链的历史，包括了主要的里程碑、版本发布和分叉。
lang: zh
sidebarDepth: 1
---

# 以太坊的历史 {#the-history-of-ethereum}

所有主要里程碑、分叉和更新以太坊区块链的时间表

<ExpandableCard title="什么是分叉？" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

分叉是需要对网络进行重大技术升级或更改时的变化 – 它们通常源自<a href="/eips/">以太坊改进建议 (EIP)</a> 并更改了以太坊协议的“规则”。

当传统的中心化软件需要升级时，公司会为终端用户发布新版本。 因为没有中心化所有权，区块链以不同的方式运作。 <a href="/developers/docs/nodes-and-clients/">以太坊客户端</a>必须更新他们的软件以执行新的分叉规则。 直链区块创造者（POW 中的矿工，POS 中的验证者）和节点必须创造区块和按照新规则进行验证。 <a href="/developers/docs/consensus-mechanisms/">关于共识机制的更多信息</a>

这些规则更改可能会在网络中造成暂时的分叉。 新区块的产生，可以来自新规则，也可以来自旧规则。 分叉通常提前商定，以便让客户端能够采用 Unison 的升级，升级后的分叉链成为主链。 然而，在极少数情况下，对分叉的不同意见可能导致网络永久硬分叉 – 最为著名的是 <a href="#dao-fork">DAO 分叉</a> 产生了 Ethereum Classic。

</ExpandableCard>

直接查阅有关一些特别重要的以往升级的信息：[信标链](/roadmap/beacon-chain/)、[合并](/roadmap/merge/)和 [EIP-1559](#london)

想了解未来的协议升级？ [了解以太坊路线图上即将进行的升级](/roadmap/)。

<Divider />

## 2023 年 {#2023}

### 上海嘉佩乐 (“Shapella”) {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### 上海总结 {#shanghai-summary}

上海升级将质押提款引入执行层。 上海升级与卡佩拉升级同时进行，使区块能够接受提款操作，因此质押人可以将以太币从信标链提取到执行层。

<ExpandableCard title="以太坊改进提案 - 上海升级" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>启动 <code>COINBASE</code> address warm</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>新 <code>PUSH0</code> 指令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>限制和计量 initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>信标链的提款推送操作</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>弃用 <code>ELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [阅读上海升级规范](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### 卡佩拉总结 {#capella-summary}

卡佩拉升级是共识层（信标链）的第三次重大升级，实现了质押提款。 卡佩拉与上海同步升级执行层并启用了质押提款功能。

这次共识层升级让未提供初始存款提款凭证的质押人能够提供提款凭证，从而实现提款。

该升级还提供了自动帐户扫描功能，可以持续处理验证者帐户的任何可用奖励支付或全额提款。

- [有关质押提款的更多信息](/staking/withdrawals/)。
- [阅读卡佩拉升级规范](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 年 {#2022}

### 巴黎升级（合并） {#paris}

<NetworkUpgradeSummary name="paris" />

#### 摘要 {#paris-summary}

巴黎升级是由于工作量证明区块链超过了[终端总难度](/glossary/#terminal-total-difficulty) 58750000000000000000000 而触发的。 这发生在 2022 年 9 月 15 日区块 15537393 上，并在下一个区块处触发了巴黎升级。 巴黎升级就是[合并](/roadmap/merge/)过渡，以太坊的主要功能结束了[工作量证明](/developers/docs/consensus-mechanisms/pow)挖矿算法及相关共识逻辑并启动了[权益证明](/developers/docs/consensus-mechanisms/pos)。 巴黎升级本身是对[执行客户端](/developers/docs/nodes-and-clients/#execution-clients)的升级（相当于共识层上的 Bellatrix 升级），让执行客户端能够从与其连接的[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)接受指令。 这需要激活一组新的内部应用程序接口方法，统称为[引擎应用程序接口](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)。 该升级可能是自[家园](#homestead)以来以太坊历史上最重要的升级！

- [阅读巴黎升级规范](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="以太坊改进提案 - 巴黎升级" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>升级权益证明共识</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>使用 PREVRANDAO 取代 DIFFICULTY 操作码</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix 升级 {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### 摘要 {#bellatrix-summary}

Bellatrix 升级是计划的第二次[信标链](/roadmap/beacon-chain)升级，让信标链为[合并](/roadmap/merge/)做好准备。 它将验证者由于怠惰及进行了可被罚没的行为而受到的惩罚提高到其全部价值。 Bellatrix 升级还包括对分叉选择规则的更新，让信标链为合并以及从最后一个工作量证明区块过渡到第一个权益证明区块做好准备。 这包括让共识客户端意识到[终端总难度](/glossary/#terminal-total-difficulty) 58750000000000000000000。

- [阅读 Bellatrix 升级规范](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### 灰色冰川升级 {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### 摘要 {#gray-glacier-summary}

灰色冰川网络升级将[难度炸弹](/glossary/#difficulty-bomb)推迟了三个月。 这是此次升级中引入的唯一变更，本质上类似于[箭形冰川](#arrow-glacier)和[缪尔冰川](#muir-glacier)升级。 [拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[伦敦](#london)网络升级也做了类似的变更。

- [以太坊基金会博客 - 灰色冰川升级公告](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="以太坊改进提案 - 灰色冰川升级" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>将难度炸弹推迟到 2022 年 9 月启动</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 年 {#2021}

### 箭形冰川升级 {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### 摘要 {#arrow-glacier-summary}

箭形冰川网络升级将[难度炸弹](/glossary/#difficulty-bomb)推迟了数月。 这是此次升级中引入的唯一变更，本质上类似于[缪尔冰川](#muir-glacier)升级。 [拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[伦敦](#london)网络升级也做了类似的更改。

- [以太坊基金会博客 - 箭形冰川升级公告](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [以太坊牧猫人组织 - 以太坊箭形冰川升级](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="箭形冰川升级以太坊改进提" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>将难度炸弹推迟到 2022 年 6 月启动</em></li>
</ul>

</ExpandableCard>

---

### 天鹰座升级 {#altair}

<NetworkUpgradeSummary name="altair" />

#### 摘要 {#altair-summary}

天鹰座升级是计划的第一次[信标链](/roadmap/beacon-chain)升级。 它增加了对“同步委员会”的支持—支持轻客户端，在向合并进展的过程中，增加了对验证者怠惰及可被罚没行为的惩罚。

- [阅读天鹰座升级规范](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />有趣的事实！ {#altair-fun-fact}

天鹰座升级是第一个有确切发布时间的重大网络升级。 之前的每一次升级均基于一个已经在工作量证明链上申报过的区块编号，而该链上的区块时间各不相同。 信标链不需要解析工作量证明，而是在一个基于时间、由 32 个 12 秒“时隙”组成的时段系统上运作。在这个系统上，验证者可以提出区块。 这就是为什么我们能准确知晓达到时段 74,240 以及天鹰座升级启动的时间！

- [出块时间](/developers/docs/blocks/#block-time)

---

### 伦敦升级 {#london}

<NetworkUpgradeSummary name="london" />

#### 摘要 {#london-summary}

伦敦升级引入了 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)，对交易费市场进行了改革，同时还对燃料费的退款处理方式和[冰河世纪](/glossary/#ice-age)日程进行了修改。

- [你是去中心化应用程序的开发者吗？ 请务必升级你的程序库和工具。](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [请阅读以太坊基金会公告](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [请阅读以太坊牧猫人组织的解释说明](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="以太坊改进提案 - 伦敦升级" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>改善交易费市场</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>从一个区块返回 <code>BASEFEE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>减少用于 EVM 运营的燃料退款</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>防止部署以 <code>0xEF</code> 开头的合约</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>将冰河世纪推迟到 2021 年 12 月启动</em></li>
</ul>

</ExpandableCard>

---

### 柏林升级 {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### 摘要 {#berlin-summary}

柏林升级优化了某些以太坊虚拟机操作的燃料成本，并增加了对多种交易类型的支持。

- [请阅读以太坊基金会公告](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [请阅读以太坊牧猫人组织的解释说明](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="以太坊改进提案 - 柏林升级" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>降低了 ModExp 燃料成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>可以更容易地支持多种交易类型</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>提高状态访问操作码的燃料成本</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>增加了可选访问列表</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 年 {#2020}

### 信标链创世块 {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### 摘要 {#beacon-chain-genesis-summary}

[信标链](/roadmap/beacon-chain/)需要 16384 个存储了 32 个质押以太币的帐户，以确保安全上线。 这发生于 2020 年 11 月 27 日，意味着信标链在 2020 年 12 月 1 日开始生产区块。 这是实现[以太坊愿景](/roadmap/vision/)的第一步，十分重要。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  信标链
</DocLink>

---

### 已部署质押存款合约 {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### 摘要 {#deposit-contract-summary}

质押存款合约将[质押](/glossary/#staking)引入以太坊生态系统。 虽然是一个[主网](/glossary/#mainnet)合约，但它直接影响到[信标链](/roadmap/beacon-chain/)的发布时间线，而后者是[以太坊升级](/roadmap/)的重要部分。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  质押
</DocLink>

---

### 缪尔冰川升级 {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### 摘要 {#muir-glacier-summary}

缪尔冰川分叉使[难度炸弹](/glossary/#difficulty-bomb)延迟。 增加[工作量证明](/developers/docs/consensus-mechanisms/pow/)共识机制的区块难度可能会增加发送交易和使用去中心化应用程序的等待时间，从而降低以太坊的可用性。

- [请阅读以太坊基金会公告](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [请阅读以太坊牧猫人组织的解释说明](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="以太坊改进提案 - 缪尔冰川升级" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>将难度炸弹再延迟 4,000,000 个区块，大约是 611 天</em>。</li>
</ul>

</ExpandableCard>

<Divider />

## 2019 年 {#2019}

### 伊斯坦布尔分叉 {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### 摘要 {#istanbul-summary}

伊斯坦布尔分叉：

- 优化了[以太坊虚拟机](/developers/docs/ethereum-stack/#ethereum-virtual-machine)中特定操作的[燃料](/glossary/#gas)成本。
- 提高受到拒绝服务攻击后的复原能力。
- 使基于“零知识简洁非交互式知识论证”和“零知识可扩容透明知识论证”的[二层网络扩容](/developers/docs/scaling/#layer-2-scaling)解决方案具有更佳的性能。
- 使以太坊和 Zcash 能够互操作。
- 让合约能够引入更多创造性功能。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="以太坊改进提案 - 伊斯坦布尔分叉" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>允许以太坊与 Zcash 等受隐私保护的数字货币一起使用。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>以更低廉的加密技术改善<a href="/glossary/#gas">燃料</a>成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>通过添加 <code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">操作码</a>，保护以太坊免受重放攻击。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>优化基于消耗量的操作码燃料价格。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>降低了 CallData 的成本，从而允许更多数据储放入区块中 – 这对 <a href="/developers/docs/scaling/#layer-2-scaling"> 二层扩容</a>很有帮助。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>其他操作码的燃料价格变更。</em></li>
</ul>

</ExpandableCard>

---

### 君士坦丁堡分叉 {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### 摘要 {#constantinople-summary}

君士坦丁堡分叉：

- 确保在[实现权益证明](#beacon-chain-genesis)之前，区块链不会冻结。
- 优化了[以太坊虚拟机](/developers/docs/ethereum-stack/#ethereum-virtual-machine)中特定操作的[燃料](/glossary/#gas)成本。
- 添加了与尚未创建的地址进行交互的能力。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="以太坊改进提案 - 君士坦丁堡分叉" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>优化某些链上操作的成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>允许你与尚未创建的地址互动。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>优化某些链上操作的成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>确保在实现权益证明之前，区块链不会冻结。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 年 {#2017}

### 拜占庭升级 {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### 摘要 {#byzantium-summary}

拜占庭分叉：

- 将区块[挖矿](/developers/docs/consensus-mechanisms/pow/mining/)奖励从 5 个以太币减少到 3 个以太币。
- 将[难度炸弹](/glossary/#difficulty-bomb)推迟一年。
- 增加了调用其他合约而不更改状态的能力。
- 增加了某些加密方法，以实现[二层网络扩容](/developers/docs/scaling/#layer-2-scaling)。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="以太坊改进提案 - 拜占庭升级" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>添加 <code>REVERT</code> 操作码。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>在交易收据中添加状态字段，以指示成功或失败。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>增加了椭圆曲线和标量乘法以允许 <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>增加了椭圆曲线和标量乘法以允许 <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>启用 RSA 签名验证。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>添加了对可变长度返回值的支持。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>添加 <code>STATICCALL</code> 操作码，允许对其他合约进行非状态改变调用。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>更改难度调整公式。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>将<a href="/glossary/#difficulty-bomb">难度炸弹</a>推迟 1 年启动，并将区块奖励从 5 个以太币减少到 3 个以太币。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 年 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### 摘要 {#spurious-dragon-summary}

伪龙分叉是对拒绝服务 (DoS) 网络攻击（2016 年 9 月/10 月）的第二个响应，包括：

- 调整操作码价格，以防网络将来再受攻击。
- 启用区块链状态的“区块链减重”。
- 增加重放攻击保护。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="以太坊改进提案 - 伪龙分叉" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>防止在一条以太坊链上的交易被重复广播到另一条链，例如测试网交易在主以太坊链上重放。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>调整 <code>EXP</code> 操作码的价格 – 使通过计算成本高昂的合约操作来降低网络速度变得更加困难。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>允许删除通过 DOS 攻击产生的空帐户。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>将区块链上合约可达到的最大代码大小改为 24576 字节。</em></li>
</ul>

</ExpandableCard>

---

### 橘子口哨分叉 {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### 摘要 {#tangerine-whistle-summary}

橘子口哨分叉是对拒绝服务 (DoS) 网络攻击（2016 年 9 月/10 月）的第一个响应，包括：

- 解决与作价低估的操作代码有关的紧急网络健康问题。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="以太坊改进提案 - 橘子口哨分叉" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>增加可用于垃圾邮件攻击的操作码的燃料成本。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>通过移除大量空帐户来减小状态大小。由于早期版本的以太坊协议中存在缺陷，这些帐户以非常低的成本置于相应状态下。</em></li>
</ul>

</ExpandableCard>

---

### 去中心化自治组织分叉 {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### 摘要 {#dao-fork-summary}

去中心化自治组织分叉是为了响应 [2016 DAO 攻击](https://www.coindesk.com/learn/understanding-the-dao-attack/)，当时一个不安全的[去中心化自治组织](/glossary/#dao)合约被黑客盗走了超过 360 万个以太币。 此分叉将资金从有问题的合约转移到一个[新合约](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)，新合约只有一个功能：提款。 任何损失了资金的人都可以在他们的钱包中提取以太币，每 100 个 DAO 代币 1 个以太币。

此操作是由以太坊社区投票决定的。 所有以太币持有者都能通过[投票平台](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)上的交易进行投票。 分叉的决定获得了 85% 以上的投票。

一些矿工拒绝分叉，因为那次 DAO 事件并不是协议中的缺陷。 他们之后组建了[以太坊经典](https://ethereumclassic.org/)。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### 家园分叉 {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### 摘要 {#homestead-summary}

家园分叉展望未来， 包括若干协议修改和联网变更，使以太坊能够进一步进行网络升级。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="以太坊改进提案 - 家园分叉" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>对合约创建过程进行编辑。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>添加新操作码：<code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>引入 devp2p 向前兼容性要求</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 年 {#2015}

### 边境解冻分叉 {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### 摘要 {#frontier-thawing-summary}

边境解冻分叉提高了每个[区块](/glossary/#block) 5,000 单位[燃料](/glossary/#gas)的限制，并将默认燃料价格设为 51 [gwei](/glossary/#gwei)。 这样便能进行交易 - 交易需要 21,000 单位燃料。 而引入[难度炸弹](/glossary/#difficulty-bomb)是为了确保未来硬分叉到[权益证明](/glossary/#pos)。

- [请阅读以太坊基金会公告](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [阅读以太坊协议更新 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### 边境 {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### 摘要 {#frontier-summary}

边境是以太坊最初的版本，但在上面能做的事情很少。 该版本在奥利匹克测试阶段成功完成之后推出。 它面向的是技术用户，特别是开发者。 [区块](/glossary/#block)有 5,000 单位的[燃料](/glossary/#gas)限制。 此“解冻”期使矿工能够开始操作，并使早期采用者能够有足够的时间来安装客户端。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 年 {#2014}

### 以太币销售 {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

以太币的预售期为 42 天， 可以使用比特币进行购买。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### 黄皮书已发布 {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Gavin Wood 博士撰写的黄皮书，关于以太坊协议的技术定义。

[查看黄皮书](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 年 {#2013}

### 白皮书已发布 {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

以太坊项目在 2015 年启动。但早在 2013 年，以太坊创始人 Vitalik Buterin 就发表了这一介绍性文章。

<DocLink href="/whitepaper/">
  白皮书
</DocLink>
