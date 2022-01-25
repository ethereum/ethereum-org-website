---
title: 以太坊的历史和分叉
description: 以太坊区块链的历史，包括了主要的里程碑、版本发布和分叉。
lang: zh
sidebar: true
sidebarDepth: 1
---

# 以太坊的历史 {#the-history-of-ethereum}

所有主要里程碑、分叉和更新以太坊区块链的时间表

<ExpandableCard title="什么是分叉？" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

分叉是需要对网络进行重大技术升级或更改时的变化——它们通常源自【以太坊改进建议（EIP）】(/eips/) ，并且更改以太坊协议的“规则”。

当传统的中心化软件需要升级时，公司会为终端用户发布新版本。 因为没有中心化所有权，区块链以不同的方式运作。 【以太坊客户端】(/developers/docs/nodes-and-clients/) 必须升级他们的软件来执行新的分叉规则。 直链区块创造者（POW 中的矿工，POS 中的验证者）和节点必须创造区块和按照新规则进行验证。 [关于共识机制的更多信息](/developers/docs/consenus-mechanisms/)

这些规则更改可能会在网络中造成暂时的分叉。 新区块的产生，可以来自新规则，也可以来自旧规则。 分叉通常提前商定，以便让客户端能够采用 Unison 的升级，升级后的分叉链成为主链。 然而，在极少数情况下，对分叉的不同意见可能导致网络永久硬分叉——最为著名的是【DAO fork】(#dao-fork) 的分叉，产生了 Ethereum Classic（ETC-ETH）。

</ExpandableCard>

<Divider />

## 2021 {#2021}

### (_进行中_) 牵牛星升级 {#altair}

Altair 升级是[信标链](/upgrades/beacon-chain)的第一次预定升级。 预计将于 2021 年启用。 它将增加对“同步委员会”的支持，可以启用轻型客户端，并将不活动和削价的惩罚提高到其全部价值。

- [阅读 Altair 升级说明](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

---

### 伦敦 {#london}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>世界标准时间 2021 年 8 月 5 日下午 12 点 33 分 42 秒 </code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/12965000">12,965,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH 价格：2621 美金<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### 概览 {#london-summary}

伦敦升级版引入了 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)，对交易费市场进行了改革，同时还对 gas 费用退款的处理方式和[冰河世纪](/glossary/#ice-age)日程进行了修改。

- [您是去中心化应用开发者吗？ 请务必升级您的库和工具包。](https://github.com/ethereum/eth1.0-specs/blob/master/network-upgrades/ecosystem-readiness.md)
- [请阅读以太坊基金会公告](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [请阅读以太坊 Cat Herder 的解释](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="伦敦 EIP" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) – _improves the transaction fee market_
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) – _returns the `BASEFEE` from a block_
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) - _reduces gas refunds for EVM operations_
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) - _prevents deploying contracts starting with `0xEF`_
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) – _delays the Ice Age until December 2021_

</ExpandableCard>

---

### 柏林升级 {#berlin}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Apr-15-2021 10:07:03 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块高度：<a href="https://etherscan.io/block/12965000">12,965,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太坊价格：2621 美金<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### 概览 {#berlin-summary}

柏林升级优化了某些 EVM 行动的 Gas 成本，并增加了对多种交易类型的支持。

- [请阅读以太坊基金会公告](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [请阅读以太坊 Cat Herder 的解释](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="柏林 EIP" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – _lowers ModExp gas cost_
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) – _enables easier support for multiple transaction types_
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – _gas cost increases for state access opcodes_
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) – _adds optional access lists_

</ExpandableCard>

<Divider />

## 2020 {#2020}

### 信标链的起源 {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-01-2020 12:00:35 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 信标链区块号：<a href="https://beaconscan.com/slot/1">1</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：586.23 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org</a>

#### 概览 {#beacon-chain-genesis-summary}

[信标链](/upgrades/beacon-chain/)需要 16384 个 ETH 并且每个节点拥有 32 个 ETH，以保证网络安全。 这发生在 2020 年 11 月 27 日，意味着信标链在 2020 年 12 月 1 日开始产生区块。 这是实现 [Eth2.0 愿景](/upgrades/vision/)的重要一步。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  信标链
</DocLink>

---

### 质押合约部署 {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-14-2020 09:22:52 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/11052984">11052984</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：379.04 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">waybackmachine 上 ethereum.org</a>

#### 概览 {#deposit-contract-summary}

质押存款合约将[质押](/glossary/#staking)引入以太坊生态系统。 虽然这只是一个[主网](/glossary/#mainnet) 合约，但它直接影响了 [信标链](/upgrades/beacon-chain/)的发布，而这是[Eth2 升级](/upgrades/)的重要部分。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  权益质押
</DocLink>

---

### 缪尔冰川升级 {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jan-02-2020 08:30:49 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/9200000">9200000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：127.18 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">waybackmachine 上 ethereum.org</a>

#### 概览 {#muir-glacier-summary}

缪尔冰川分叉将 [难度炸弹](/glossary/#difficulty-bomb) 的启动延迟。 增加[Pow](/developers/docs/consensus-mechanisms/pow/) 的区块难度可能会增加发送交易和使用数据库的等待时间，从而降低以太坊的可用性。

- [请阅读以太坊基金会公告](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [请阅读 Ethereum Cat Herder 的解释](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="缪尔冰川 EIP" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _delays the difficulty bomb for another 4,000,000 blocks, or ~611 days._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### 伊斯坦布尔升级 {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-08-2019 12:25:09 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/9069000">9069000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：151.06 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">waybackmachine 上 ethereum.org</a>

#### 概览 {#istanbul-summary}

伊斯坦布尔分叉：

- 优化 [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 数据存储操作的 [gas](/glossary/#gas) 耗用量计量方式。
- 提高拒绝服务（DoS）攻击的弹性。
- 使基于 SNARK 和 STARK 的[第二层方案性能更佳](/developers/docs/scaling/layer-2-rollups/)。
- 使以太坊和 Zcash 能够互操作。
- 让合约能够引入更有创造性的功能。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="伊斯坦布尔 EIP" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _allow Ethereum to work with privacy-preserving currency like Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _cheaper cryptography to improve [gas](/glossary/#gas) costs._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _protects Ethereum against replay attacks by adding `CHAINID` [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _optimising opcode gas prices based on consumption._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _reduces the cost of CallData to allow more data in blocks – good for [Layer 2 scaling](/developers/docs/scaling/layer-2-rollups/)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _other opcode gas price alterations._

</ExpandableCard>

---

### 君士坦丁堡升级 {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Feb-28-2019 07:52:04 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/7280000">7280000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：136.29 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">waybackmachine 上 ethereum.org</a>

#### 概览 {#constantinople-summary}

君士坦丁堡分叉：

- 保证在 [POS 实现前](#beacon-chain-genesis)区块不会被冻结。
- 优化 [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 数据存储操作的 [gas](/glossary/#gas) 耗用量计量方式。
- 添加了与尚未创建的地址进行交互的能力。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="君士坦丁堡 EIP" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _optimises cost of certain on-chain actions._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _allows you to interact with addresses that have yet to be created._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _optimises cost of certain on-chain actions._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _makes sure the blockchain doesn't freeze before proof-of-stake._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-16-2017 05:22:11 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/4370000">4370000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：334.23 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">waybackmachine 上 ethereum.org</a>

#### 概览 {#byzantium-summary}

拜占庭分叉：

- 将区块[挖矿](/developers/docs/consensus-mechanisms/pow/mining/)奖励从 5 ETH 减少到 3 ETH。
- 将[难度炸弹](/glossary/#difficulty-bomb) 升级延迟一年。
- 增加了调用其他合约的能力。
- 增加了某些密码学方法，允许[2 层缩放](/developers/docs/scaling/layer-2-rollups/)。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="拜占庭 EIP" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _adds `REVERT` opcode._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _status field added to transaction receipts to indicate success or failure._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _adds elliptic curve and scalar multiplication to allow for [ZK-Snarks](/developers/docs/scaling/layer-2-rollups/#zk-rollups)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _adds elliptic curve and scalar multiplication to allow for [ZK-Snarks](/developers/docs/scaling/layer-2-rollups/#zk-rollups)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _enables RSA signature verification._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _adds support for variable length return values._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _adds `STATICCALL` opcode, allowing non-state-changing calls to other contracts._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _changes difficulty adjustment formula._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _delays [difficulty bomb](/glossary/#difficulty-bomb) by 1 year and reduces block reward from 5 to 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Nov-22-2016 04:15:44 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/2675000">2675000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：9.84 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">waybackmachine 上 ethereum.org</a>

#### 概览 {#spurious-dragon-summary}

对拒绝服务（DoS）攻击（2016 年 9 月/10 月）的第二个反应是 Spurious Dragon 分叉，包括：

- 调整操作码的价格以防止今后对网络的攻击。
- 启用区块链状态的“区块链减重”。
- 添加重放攻击保护。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIP" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _prevents transactions from one Ethereum chain from being rebroadcasted on an alternative chain, for example a testnet transaction being replayed on the main Ethereum chain._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _adjusts prices of `EXP` opcode – makes it more difficult to slow down the network via computationally expensive contract operations._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _allows for removal of empty accounts added via the DOS attacks._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _changes the maximum code size that a contract on the blockchain can have – to 24576 bytes._

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-18-2016 01:19:31 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/2463000">2463000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：12.50 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">waybackmachine 上 ethereum.org</a>

#### 概览 {#tangerine-whistle-summary}

Tangerine Whistle 分叉是第一次对拒绝提供服务（DoS）网络攻击作出的反应（2016 年 9 月/10 月），包括：

- 处理与价格低廉的操作代码有关的紧急网络健康问题。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIP" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _increases gas costs of opcodes that can be used in spam attacks._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _reduces state size by removing a large number of empty accounts that were put in the state at very low cost due to flaws in earlier versions of the Ethereum protocol._

</ExpandableCard>

---

### DAO 分叉 {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-20-2016 01:20:40 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块号：<a href="https://etherscan.io/block/1920000">1920000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：12.54 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">waybackmachine 上 ethereum.org</a>

#### 概览 {#dao-fork-summary}

DAO 分叉是为了解决 [2016 DAO 攻击](https://www.coindesk.com/markets/2016/06/25/understanding-the-dao-attack/) ，当时一个不安全 [DAO](/glossary/#dao) 合约被黑客盗走了超过 3 百万个 ETH。 此分叉将资金从有问题的合约转移到一个[新的合约](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)，只有一个功能：提款。 任何损失资金的人都可以在他们的钱包中为每 100 个 DAO 代币提取 1 个 ETH。

这一决定是由以太坊社区投票决定的。 任何 ETH 持有人都能够通过一个交易在[一个投票平台](http://v1.carbonvote.com/)进行投票。 分叉的决定获得了 85% 以上的票。

一些矿工拒绝分叉，因为 DAO 事件并不是协议中的一个缺陷。 他们随后成为了 [Ethereum Classic](https://ethereumclassic.org/)。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Mar-14-2016 06:49:53 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/1150000">1150000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：12.50 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">waybackmachine 上 ethereum.org</a>

#### 概览 {#homestead-summary}

展望未来的 Homestead 分叉。 其中包括若干协议修改和网络变更，使以太坊能够进一步进行网络升级。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIP" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _makes edits to contract creation process._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _adds new opcode: `DELEGATECALL`_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _introduces devp2p forward compatibility requirements_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Sep-07-2015 09:33:09 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/200000">200000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH 价格：1.24 美元<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">waybackmachine 上 ethereum.org</a>

#### 概览 {#frontier-thawing-summary}

Frontier thawing 分叉取消了每个[区块](/glossary/#block) 5,000 [gas](/glossary/#gas) 的限制，并将默认的 gas 价格设置为 51 [gwei](/glossary/#gwei)。 这开启了交易功能——交易需要 21,000 gas。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-30-2015 03:26:13 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 区块号：<a href="https://etherscan.io/block/0">0</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETP 价格：不适用<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">waybackmachine 上 ethereum.org</a>

#### 概览 {#frontier-summary}

边境是以太坊的最初版本，但在上面能做的事情很少。 它是在 Olympic 测试阶段之后进行的。 它面向技术用户，特别是开发者。 每个[区块](/glossary/#block)有一个 [gas](/glossary/#gas) 限制为 5,000。 这个“缓冲”期使矿工能够开始工作，并使早期采用者能够安装他们的客户端而不必“匆忙”。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### 公开募资 {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 2014 年 7 月 22 日 - 9 月 2 日<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">waybackmachine 上 ethereum.org</a>

以太币预售为期 42 天。 你可以使用比特币进行购买。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### 黄皮书发布 {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 2014 年 4 月 1 日<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">waybackmachine 上 ethereum.org</a>

Gavin Wood 博士撰写的黄皮书，是关于以太坊协议的技术定义。

[查看黄皮书](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### 白皮书发布 {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 2013 年 11 月 27 日<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">waybackmachine 上 ethereum.org</a>

该项目在 2015 年启动。但早在 2013 年，以太坊的创始人 Vitalik Buterin 就发表了介绍性文章。

<DocLink to="/whitepaper/">
  白皮书
</DocLink>
