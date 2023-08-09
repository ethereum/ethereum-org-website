---
title: 以太坊的历史和分叉
description: 以太坊区块链的历史，包括了主要的里程碑、版本发布和分叉。
lang: zh
sidebarDepth: 1
---

# 以太坊的历史 {#the-history-of-ethereum}

所有主要里程碑、分叉和更新以太坊区块链的时间表

<ExpandableCard title="什么是分叉？" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

分叉是需要对网络进行重大技术升级或更改时的变化——它们通常源自【以太坊改进建议（EIP）】(/eips/) ，并且更改以太坊协议的“规则”。

当传统的中心化软件需要升级时，公司会为终端用户发布新版本。 因为没有中心化所有权，区块链以不同的方式运作。 【以太坊客户端】(/developers/docs/nodes-and-clients/) 必须升级他们的软件来执行新的分叉规则。 直链区块创造者（POW 中的矿工，POS 中的验证者）和节点必须创造区块和按照新规则进行验证。 [关于共识机制的更多信息](/developers/docs/consenus-mechanisms/)

这些规则更改可能会在网络中造成暂时的分叉。 新区块的产生，可以来自新规则，也可以来自旧规则。 分叉通常提前商定，以便让客户端能够采用 Unison 的升级，升级后的分叉链成为主链。 然而，在极少数情况下，对分叉的不同意见可能导致网络永久硬分叉——最为著名的是【DAO fork】(#dao-fork) 的分叉，产生了 Ethereum Classic（ETC-ETH）。
</ExpandableCard>

直接查阅有关一些以往特别重要的升级的信息：[信标链](/roadmap/beacon-chain/)、[合并](/roadmap/merge/)和 [EIP-1559](#london)

想了解未来的协议升级？ [了解以太坊路线图上即将进行的升级](/roadmap/)。

<Divider />

## 2023 年 {#2023}

### 上海升级（_按计划安排_） {#shanghai}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} />时间戳：2023 年 4 月 12 日，22:27:35 +UTC<br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：待定<br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：待定<br />

<!-- <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/{}/https://ethereum.org/">ethereum.org on waybackmachine</a> -->

#### 摘要 {#shanghai-summary}

上海升级将质押提款引入执行层。 上海升级与卡佩拉升级同时进行，使区块能够接受提款操作，因此质押人可以将以太币从信标链提取到执行层。

<ExpandableCard title="以太坊改进提案 - 上海升级" contentPreview="Official improvements included in this upgrade.">

- [EIP-3651](https://eips.ethereum.org/EIPS/eip-3651) - _开始“COINBASE”地址预热_
- [EIP-3855](https://eips.ethereum.org/EIPS/eip-3855) - _新“PUSH0”指令_
- [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) - _限制和计量 initcode_
- [EIP-4895](https://eips.ethereum.org/EIPS/eip-4895) - _信标链将提款作为操作指令_
- [EIP-6049](https://eips.ethereum.org/EIPS/eip-6049) - _废弃“SELDDESTRUCT”_

</ExpandableCard>

- [阅读上海升级规范](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

---

### 卡佩拉升级（_按计划安排_） {#capella}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} />时间戳：2023 年 4 月 12 日，22:27:35 +UTC<br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />时段编号：194048（时隙 6209536）<br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：待定<br />

<!-- <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/{}/https://ethereum.org/en/">ethereum.org on waybackmachine</a> -->

#### 摘要 {#capella-summary}

卡佩拉升级是共识层（信标链）的第三次重大升级，实现了质押提款。 卡佩拉升级将与执行层上的上海升级同步进行，以使提款功能彼此同步。

这次共识层升级让未提供初始存款提款凭证的质押人能够提供提款凭证，从而实现提款。

该升级还提供了自动帐户扫描功能，可以持续处理验证者帐户的任何可用奖励支付或全额提款。

- [有关质押提款的更多信息](/staking/withdrawals/)。
- [阅读卡佩拉升级规范](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 年 {#2022}

### 巴黎升级（合并） {#paris}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>2022 年 9 月 15 日，06:42:42 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/15537394">15537394</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：1,472 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20220915075314/https://ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#paris-summary}

巴黎升级是由于工作量证明区块链超过了[终端总难度](/glossary/#terminal-total-difficulty) 58750000000000000000000 而触发的。 这发生在 2022 年 9 月 15 日区块 15537393 上，并在下一个区块处触发了巴黎升级。 巴黎升级就是[合并 ](/roadmap/merge/)过渡，以太坊的主要功能结束了[工作量证明](/developers/docs/consensus-mechanisms/pow)挖矿算法及相关共识逻辑并启动了[权益证明](/developers/docs/consensus-mechanisms/pos)。 巴黎升级本身是对[执行客户端](/developers/docs/nodes-and-clients/#execution-clients)的升级（相当于共识层上的 Bellatrix 升级），让执行客户端能够从与其连接的[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)接受指令。 这需要激活一组新的内部应用程序接口方法，统称为[引擎应用程序接口](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)。 该升级可能是自[家园](#homestead)以来以太坊历史上最重要的升级！

- [阅读巴黎升级规范](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="以太坊改进提案 - 巴黎升级" contentPreview="Official improvements included in this upgrade.">

- [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) – _将共识升级为权益证明_
- [EIP-4399](https://eips.ethereum.org/EIPS/eip-4399) – _用 PREVRANDAO 取代 DIFFICULTY 操作码_

</ExpandableCard>

---

### Bellatrix 升级 {#bellatrix}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>2022 年 9 月 6 日，11:34:47 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />时段编号：144,896<br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：1,558 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20220906112525/https://ethereum.org/en/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#bellatrix-summary}

Bellatrix 升级是计划的第二次[信标链](/roadmap/beacon-chain)升级，让信标链为[合并](/roadmap/merge/)做好准备。 它将验证者由于怠惰及进行了可被罚没的行为而受到的惩罚提高到其全部价值。 Bellatrix 升级还包括对分叉选择规则的更新，让信标链为合并以及从最后一个工作量证明区块过渡到第一个权益证明区块做好准备。 这包括让共识客户端意识到[终端总难度](/glossary/#terminal-total-difficulty) 58750000000000000000000。

- [阅读 Bellatrix 升级规范](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### 灰色冰川升级 {#gray-glacier}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>2022 年 6 月 30 日，10:54:04 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/15050000">15,050,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：1,069 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20220630094629/https://ethereum.org/en/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#gray-glacier-summary}

灰色冰川网络升级将[难度炸弹](/glossary/#difficulty-bomb)推迟了三个月。 这是此次升级中引入的唯一变更，本质上类似于[箭形冰川](#arrow-glacier)和[缪尔冰川](#muir-glacier)升级。 [拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[伦敦](#london)网络升级也做了类似的变更。

- [以太坊基金会博客 - 灰色冰川升级公告](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="以太坊改进提案 - 灰色冰川升级" contentPreview="Official improvements included in this upgrade.">

- [EIP-5133](https://eips.ethereum.org/EIPS/eip-5133) - _将难度炸弹延迟到 2022 年 9 月_

</ExpandableCard>

<Divider />

## 2021 年 {#2021}

### 箭形冰川升级 {#arrow-glacier}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>2021 年 12 月 9 日，07:55:23 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号： <a href="https://etherscan.io/block/13773000">13,773,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：4111 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211207064430/https://ethereum.org/en/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#arrow-glacier-summary}

箭形冰川网络升级将[难度炸弹](/glossary/#difficulty-bomb)推迟了数月。 这是此次升级中引入的唯一变更，本质上类似于[缪尔冰川](#muir-glacier)升级。 [拜占庭](#byzantium)、[君士坦丁堡](#constantinople)和[伦敦](#london)网络升级也做了类似的更改。

- [以太坊基金会博客 - 箭形冰川升级公告](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [以太坊牧猫人组织 - 以太坊箭形冰川升级](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="箭形冰川升级以太坊改进提" contentPreview="Official improvements included in this upgrade.">

- [EIP-4345](https://eips.ethereum.org/EIPS/eip-4345) – _将难度炸弹推迟到 2022 年 6 月_

</ExpandableCard>

---

### 天鹰座升级 {#altair}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>2021 年 10 月 27 日，10:56:23 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />时段编号：74,240<br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：4024 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211026174951/https://ethereum.org/en/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#altair-summary}

天鹰座升级是计划的第一次[信标链](/roadmap/beacon-chain)升级。 它增加了对“同步委员会”的支持—支持轻客户端，在向合并进展的过程中，增加了对验证者怠惰及可被罚没行为的惩罚。

- [阅读天鹰座升级规范](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <emoji text=":tada:" size={1} mr="0.5rem" />有趣的事实！ {#altair-fun-fact}

天鹰座升级是第一个有确切发布时间的重大网络升级。 之前的每一次升级均基于一个已经在工作量证明链上申报过的区块编号，而该链上的区块时间各不相同。 信标链不需要解析工作量证明，而是在一个基于时间、由 32 个 12 秒“时隙”组成的时段系统上运作。在这个系统上，验证者可以提出区块。 这就是为什么我们能准确知晓达到时段 74,240 以及天鹰座升级启动的时间！

- [出块时间](/developers/docs/blocks/#block-time)

---

### 伦敦升级 {#london}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2021 年 8 月 5 日，12:33:42 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/12965000">12,965,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：2621 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#london-summary}

伦敦升级引入了 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)，对交易费市场进行了改革，同时还对燃料费的退款处理方式和[冰河世纪](/glossary/#ice-age)日程进行了修改。

- [你是去中心化应用程序的开发者吗？ 请务必升级你的程序库和工具。](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [请阅读以太坊基金会公告](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [请阅读以太坊牧猫人组织的解释说明](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="以太坊改进提案 - 伦敦升级" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) - _改善交易费市场_
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) - _从区块返回“BASEFEE”_
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) - _减少以太坊虚拟机操作的燃料费用退款_
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) - _防止部署以“0xEF”开头的合约_
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) - _将冰河世纪推迟到 2021 年 12 月_

</ExpandableCard>

---

### 柏林升级 {#berlin}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2021 年 4 月 15 日，10:07:03 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/12244000">12,244,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：2454 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210415093618/https://ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#berlin-summary}

柏林升级优化了某些以太坊虚拟机操作的燃料成本，并增加了对多种交易类型的支持。

- [请阅读以太坊基金会公告](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [请阅读以太坊牧猫人组织的解释说明](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="以太坊改进提案 - 柏林升级" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – _减少 ModExp 燃料成本_
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) – _更轻松地支持多种交易类型_
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – _状态访问操作码的燃料成本增加_
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) – _添加可选访问列表_

</ExpandableCard>

<Divider />

## 2020 年 {#2020}

### 信标链创世块 {#beacon-chain-genesis}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2020 年 12 月 1 日，12:00:35 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />信标链区块编号：<a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：586.23 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#beacon-chain-genesis-summary}

[信标链](/roadmap/beacon-chain/)需要 16384 个存储了 32 个质押以太币的帐户，以确保安全上线。 这发生于 2020 年 11 月 27 日，意味着信标链在 2020 年 12 月 1 日开始生产区块。 这是实现[以太坊愿景](/roadmap/vision/)的第一步，十分重要。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/roadmap/beacon-chain/">
  信标链
</DocLink>

---

### 已部署质押存款合约 {#staking-deposit-contract}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2020 年 10 月 14 日，09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/11052984">11,052,984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：379.04 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#deposit-contract-summary}

质押存款合约将[质押](/glossary/#staking)引入以太坊生态系统。 虽然是一个[主网](/glossary/#mainnet)合约，但它直接影响到[信标链](/roadmap/beacon-chain/)的发布时间，而后者是[以太坊升级](/roadmap/)的重要部分。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  质押
</DocLink>

---

### 缪尔冰川升级 {#muir-glacier}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2020 年 1 月 2 日，08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/9200000">9,200,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：127.18 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#muir-glacier-summary}

缪尔冰川分叉使[难度炸弹](/glossary/#difficulty-bomb)延迟。 增加[工作量证明](/developers/docs/consensus-mechanisms/pow/)共识机制的区块难度可能会增加发送交易和使用去中心化应用程序的等待时间，从而降低以太坊的可用性。

- [请阅读以太坊基金会公告](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [请阅读以太坊牧猫人组织的解释说明](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="以太坊改进提案 - 缪尔冰川升级" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) -- _将难度炸弹又推迟了 4,000,000 个区块或约 611 天。_

</ExpandableCard>

<Divider />

## 2019 年 {#2019}

### 伊斯坦布尔分叉 {#istanbul}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2019 年 12 月 8 日，12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/9069000">9,069,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：151.06 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#istanbul-summary}

伊斯坦布尔分叉：

- 优化了[以太坊虚拟机](/developers/docs/ethereum-stack/#ethereum-virtual-machine)中特定操作的[燃料](/glossary/#gas)成本。
- 提高受到拒绝服务攻击后的复原能力。
- 使基于“零知识简洁非交互式知识论证”和“零知识可扩容透明知识论证”的[二层网络扩容](/developers/docs/scaling/#layer-2-scaling)解决方案具有更佳的性能。
- 使以太坊和 Zcash 能够互操作。
- 让合约能够引入更多创造性功能。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="以太坊改进提案 - 伊斯坦布尔分叉" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _使以太坊能够和 Zcash 之类的隐私保护币共同作用。_
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _使用更经济的加密方法来优化 [gas](/glossary/#gas) 成本。_
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _通过增加“CHAINID”[opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine) 来保护以太坊免受重放攻击。_
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _优化基于消耗的操作码燃料价格。_
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _减少 CallData 的成本，使区块中可容纳更多数据 – 有益于 [二层网络扩容](/developers/docs/scaling/#layer-2-scaling)。_
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _其他操作码燃料成本备选方案。_

</ExpandableCard>

---

### 君士坦丁堡分叉 {#constantinople}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2019 年 2 月 28 日，07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/7280000">7,280,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：136.29 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#constantinople-summary}

君士坦丁堡分叉：

- 确保在[实现权益证明](#beacon-chain-genesis)之前，区块链不会冻结。
- 优化了[以太坊虚拟机](/developers/docs/ethereum-stack/#ethereum-virtual-machine)中特定操作的[燃料](/glossary/#gas)成本。
- 添加了与尚未创建的地址进行交互的能力。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="以太坊改进提案 - 君士坦丁堡分叉" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _优化某些链上操作的成本。_
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _实现与尚未创建的地址交互。_
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _优化某些链上操作的成本。_
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _确保区块链在权益证明前不会冻结。_

</ExpandableCard>

<Divider />

## 2017 年 {#2017}

### 拜占庭升级 {#byzantium}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2017 年 10 月 16 日，05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/4370000">4,370,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：334.23 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#byzantium-summary}

拜占庭分叉：

- 将区块[挖矿](/developers/docs/consensus-mechanisms/pow/mining/)奖励从 5 个以太币减少到 3 个以太币。
- 将[难度炸弹](/glossary/#difficulty-bomb)推迟一年。
- 增加了调用其他合约而不更改状态的能力。
- 增加了某些加密方法，以实现[二层网络扩容](/developers/docs/scaling/#layer-2-scaling)。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="以太坊改进提案 - 拜占庭升级" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _添加“REVERT”操作码。_
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _为交易收据添加了状态字段，以说明成功还是失败。_
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _添加椭圆曲线和标量乘法，以实现 [ZK-Snarks](/developers/docs/scaling/zk-rollups/)。_
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _添加椭圆曲线和标量乘法，以实现 [ZK-Snarks](/developers/docs/scaling/zk-rollups/)。_
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _启用 RSA 签名验证。_
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _增加对可变长度返回值的支持。_
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _添加“STATICCALL”操作码，可以调用其他合约，但不会改变状态。_
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _更改难度调整公式。_
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _使 [难度炸弹](/glossary/#difficulty-bomb) 延迟 1 年，并将区块奖励从 5 个以太币减少为 3 个以太币。_

</ExpandableCard>

<Divider />

## 2016 年 {#2016}

### Spurious Dragon {#spurious-dragon}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2016 年 11 月 22 日，04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/2675000">2,675,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：9.84 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#spurious-dragon-summary}

伪龙分叉是对拒绝服务 (DoS) 网络攻击（2016 年 9 月/10 月）的第二个响应，包括：

- 调整操作码价格，以防网络将来再受攻击。
- 启用区块链状态的“区块链减重”。
- 增加重放攻击保护。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="以太坊改进提案 - 伪龙分叉" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _防止一条以太坊链上的交易在另一条链上重放。例如，在以太坊主链上重放测试网交易。_
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _调整“EXP”操作码的价格 – 使得更难通过计算成本昂贵的合约操作减缓网络。_
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _允许删除通过拒绝服务攻击添加的空帐户。_
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _将区块链上合约可以有的最大代码大小更改为 24576 个字节。_

</ExpandableCard>

---

### 橘子口哨分叉 {#tangerine-whistle}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2016 年 10 月 18 日，01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/2463000">2,463,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：12.50 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#tangerine-whistle-summary}

橘子口哨分叉是对拒绝服务 (DoS) 网络攻击（2016 年 9 月/10 月）的第一个响应，包括：

- 解决与作价低估的操作代码有关的紧急网络健康问题。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="以太坊改进提案 - 橘子口哨分叉" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _增加可用于垃圾邮件攻击的操作码的燃料成本。_
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _通过移除大量空帐户来减小状态大小。由于早期版本的以太坊协议中存在缺陷，这些帐户以非常低的成本置于相应状态下。_

</ExpandableCard>

---

### 去中心化自治组织分叉 {#dao-fork}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2016 年 7 月 20 日，01:20:40 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/1920000">1,920,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：12.54 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#dao-fork-summary}

去中心化自治组织分叉是为了响应 [2016 DAO 攻击](https://www.coindesk.com/markets/2016/06/25/understanding-the-dao-attack/)，当时一个不安全的[去中心化自治组织](/glossary/#dao)合约被黑客盗走了超过 360 万个以太币。 此分叉将资金从有问题的合约转移到一个[新合约](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)，新合约只有一个功能：提款。 任何损失了资金的人都可以在他们的钱包中提取以太币，每 100 个 DAO 代币 1 个以太币。

此操作是由以太坊社区投票决定的。 所有以太币持有者都能通过[一个投票平台](http://v1.carbonvote.com/)上的交易进行投票。 分叉的决定获得了 85% 以上的投票。

一些矿工拒绝分叉，因为那次 DAO 事件并不是协议中的缺陷。 他们之后组建了[以太坊经典](https://ethereumclassic.org/)。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### 家园分叉 {#homestead}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2016 年 3 月 14 日，06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/1150000">1,150,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：12.50 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#homestead-summary}

家园分叉展望未来， 包括若干协议修改和联网变更，使以太坊能够进一步进行网络升级。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="以太坊改进提案 - 家园分叉" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _编辑合约创建流程。_
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _添加新的操作码：“DELEGATECALL”_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _引入 devp2p 向前兼容要求_

</ExpandableCard>

<Divider />

## 2015 年 {#2015}

### 边境解冻分叉 {#frontier-thawing}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2015 年 9 月 7 日，09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/200000">200,000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：1.24 美元<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#frontier-thawing-summary}

边境解冻分叉提高了每个[区块](/glossary/#block) 5,000 单位[燃料](/glossary/#gas)的限制，并将默认燃料价格设为 51 [gwei](/glossary/#gwei)。 这样便能进行交易 - 交易需要 21,000 单位燃料。 而引入[难度炸弹](/glossary/#difficulty-bomb)是为了确保未来硬分叉到[权益证明](/glossary/#pos)。

- [请阅读以太坊基金会公告](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [阅读以太坊协议更新 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### 边境 {#frontier}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2015 年 7 月 30 日，03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />区块编号：<a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />以太币价格：未提供<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">互联网时光机上的 ethereum.org</a>

#### 摘要 {#frontier-summary}

边境是以太坊最初的版本，但在上面能做的事情很少。 该版本在奥利匹克测试阶段成功完成之后推出。 它面向的是技术用户，特别是开发者。 [区块](/glossary/#block)有 5,000 单位的[燃料](/glossary/#gas)限制。 此“解冻”期使矿工能够开始操作，并使早期采用者能够有足够的时间来安装客户端。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 年 {#2014}

### 以太币销售 {#ether-sale}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 2014 年 7 月 22 日 - 9 月 2 日<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">互联网时光机上的 ethereum.org</a>

以太币的预售期为 42 天， 可以使用比特币进行购买。

[请阅读以太坊基金会公告](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### 黄皮书已发布 {#yellowpaper}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 2014 年 4 月 1 日<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">互联网时光机上的 ethereum.org</a>

Gavin Wood 博士撰写的黄皮书，关于以太坊协议的技术定义。

[查看黄皮书](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 年 {#2013}

### 白皮书已发布 {#whitepaper}

<emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 2013 年 11 月 27 日<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">互联网时光机上的 ethereum.org</a>

以太坊项目在 2015 年启动。但早在 2013 年，以太坊创始人 Vitalik Buterin 就发表了这一介绍性文章。

<DocLink to="/whitepaper/">
  白皮书
</DocLink>
