---
title: 最大可提取价值 (MEV)
description: 最大可提取价值 (MEV) 简介
lang: zh
---

最大可提取价值 (MEV) 是指在标准区块奖励和 gas 费之外，通过包含、排除和更改区块中的交易顺序，从区块生产中可以提取的最大价值。

## 最大可提取价值 {#maximal-extractable-value}

最大可提取价值最初应用于[工作量证明 (PoW)](/developers/docs/consensus-mechanisms/pow/)的背景下，最初被称为“矿工可提取价值”。这是因为在工作量证明中，矿工控制着交易的包含、排除和排序。然而，自从通过[合并](/roadmap/merge)过渡到权益证明 (PoS) 以来，验证者一直负责这些角色，并且挖矿不再是[以太坊](/)协议的一部分。不过，价值提取方法仍然存在，因此现在改用“最大可提取价值”一词。

## 先决条件 {#prerequisites}

确保你熟悉[交易](/developers/docs/transactions/)、[区块](/developers/docs/blocks/)、[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos)和 [Gas](/developers/docs/gas/)。熟悉[去中心化应用 (dapp)](/apps/)和[去中心化金融 (DeFi)](/defi/)也会有所帮助。

## MEV 提取 {#mev-extraction}

理论上，MEV 完全归验证者所有，因为他们是唯一能够保证执行有利可图的 MEV 机会的一方。然而在实践中，很大一部分 MEV 是由被称为“搜索者”的独立网络参与者提取的。搜索者在区块链数据上运行复杂的算法来检测有利可图的 MEV 机会，并使用机器人自动将这些有利可图的交易提交到网络。

无论如何，验证者确实获得了全部 MEV 金额的一部分，因为搜索者愿意支付高昂的 gas 费（归验证者所有），以换取他们有利可图的交易被包含在区块中的更高可能性。假设搜索者在经济上是理性的，搜索者愿意支付的 gas 费将高达搜索者 MEV 的 100%（因为如果 gas 费更高，搜索者就会亏钱）。

因此，对于一些竞争激烈的 MEV 机会，例如[去中心化交易所 (DEX) 套利](#mev-examples-dex-arbitrage)，搜索者可能不得不将其总 MEV 收入的 90% 甚至更多作为 gas 费支付给验证者，因为有太多人想要进行相同的有利可图的套利交易。这是因为保证其套利交易执行的唯一方法是提交具有最高 Gas 价格的交易。

### Gas 优化 (Gas golfing) {#mev-extraction-gas-golfing}

这种动态使得擅长“Gas 优化 (gas golfing)”——对交易进行编程以使其使用最少的 Gas——成为一种竞争优势，因为它允许搜索者设置更高的 Gas 价格，同时保持其总 gas 费不变（因为 gas 费 = Gas 价格 \* 使用的 Gas）。

一些著名的 Gas 优化技术包括：使用以一长串零开头的地址（例如 [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://eth.blockscout.com/address/0x0000000000C521824EaFf97Eac7B73B084ef9306)），因为它们占用的存储空间（以及 Gas）更少；以及在合约中留下少量的 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代币余额，因为初始化存储时隙（余额为 0 的情况）比更新存储时隙花费更多的 Gas。寻找更多减少 Gas 使用的技术是搜索者中一个活跃的研究领域。

### 广义抢跑者 {#mev-extraction-generalized-frontrunners}

一些搜索者没有编写复杂的算法来检测有利可图的 MEV 机会，而是运行广义抢跑者。广义抢跑者是监视内存池以检测有利可图的交易的机器人。抢跑者将复制潜在有利可图的交易代码，将地址替换为抢跑者的地址，并在本地运行交易以仔细检查修改后的交易是否为抢跑者的地址带来利润。如果交易确实有利可图，抢跑者将提交带有替换地址和更高 Gas 价格的修改后交易，“抢跑”原始交易并获得原始搜索者的 MEV。

### Flashbots {#mev-extraction-flashbots}

Flashbots 是一个独立项目，它通过一项服务扩展了执行客户端，该服务允许搜索者向验证者提交 MEV 交易，而无需将其暴露给公共内存池。这可以防止交易被广义抢跑者抢跑。

## MEV 示例 {#mev-examples}

MEV 在区块链上以几种方式出现。

### DEX 套利 {#mev-examples-dex-arbitrage}

[去中心化交易所](/glossary/#dex) (DEX) 套利是最简单、最著名的 MEV 机会。因此，它也是竞争最激烈的。

它的工作原理如下：如果两个 DEX 以两种不同的价格提供一种代币，有人可以在单笔原子交易中在价格较低的 DEX 上购买该代币，并在价格较高的 DEX 上出售。由于区块链的机制，这是真正的无风险套利。

[这里有一个有利可图的套利交易示例](https://eth.blockscout.com/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4)，搜索者利用尤尼斯瓦普和 Sushiswap 上 ETH/DAI 交易对的不同定价，将 1,000 ETH 变成了 1,045 ETH。

### 清算 {#mev-examples-liquidations}

借贷协议清算提供了另一个著名的 MEV 机会。

像 Maker 和 Aave 这样的借贷协议要求用户存入一些抵押品（例如 ETH）。然后，这些存入的抵押品被用于借贷给其他用户。

然后，用户可以根据自己的需要向其他人借款资产和代币（例如，如果你想在 MakerDAO 治理提案中投票，你可能会借款 MKR），最高可达其存入抵押品的一定比例。例如，如果借款金额最高为 30%，则向协议存入 100 DAI 的用户最多可以借款价值 30 DAI 的另一种资产。协议决定了确切的借款能力百分比。

随着借款人抵押品价值的波动，他们的借款能力也会随之波动。如果由于市场波动，借入资产的价值超过了其抵押品价值的（比如说）30%（同样，确切的百分比由协议决定），协议通常允许任何人清算抵押品，立即偿还贷款人（这类似于传统金融中[追加保证金](https://www.investopedia.com/terms/m/margincall.asp)的运作方式）。如果被清算，借款人通常必须支付高额的清算费，其中一部分归清算人所有——这就是 MEV 机会的来源。

搜索者竞相尽可能快地解析区块链数据，以确定哪些借款人可以被清算，并成为第一个提交清算交易并为自己收取清算费的人。

### 三明治交易 {#mev-examples-sandwich-trading}

三明治交易是另一种常见的 MEV 提取方法。

为了进行三明治交易，搜索者将监视内存池中的大型 DEX 交易。例如，假设有人想在尤尼斯瓦普上用 DAI 购买 10,000 UNI。这种规模的交易将对 UNI/DAI 交易对产生有意义的影响，可能会显著提高 UNI 相对于 DAI 的价格。

搜索者可以计算这笔大额交易对 UNI/DAI 交易对的近似价格影响，并在大额交易_之前_立即执行最佳买单，廉价购买 UNI，然后在大额交易_之后_立即执行卖单，以大额订单导致的更高价格出售。

然而，三明治交易的风险更高，因为它不是原子的（与上述 DEX 套利不同），并且容易受到[沙门氏菌攻击](https://github.com/Defi-Cartel/salmonella)。

### NFT MEV {#mev-examples-nfts}

NFT 领域的 MEV 是一种新兴现象，并不一定有利可图。

然而，由于 NFT 交易发生在所有其他以太坊交易共享的同一区块链上，搜索者也可以在 NFT 市场中使用与传统 MEV 机会中使用的类似技术。

例如，如果有一个受欢迎的 NFT 发行，并且搜索者想要某个 NFT 或一组 NFT，他们可以对交易进行编程，使他们成为第一个购买该 NFT 的人，或者他们可以在单笔交易中购买整套 NFT。或者，如果一个 NFT 被[错误地以低价挂出](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent)，搜索者可以抢在其他购买者之前以低价抢购。

NFT MEV 的一个突出例子是，一名搜索者花费 700 万美元以底价[购买](https://eth.blockscout.com/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5?tab=txs)了每一个 Cryptopunk。一位区块链研究人员在[推特上解释了](https://twitter.com/IvanBogatyy/status/1422232184493121538)买家如何与 MEV 提供商合作以对他们的购买保密。

### 长尾效应 {#mev-examples-long-tail}

DEX 套利、清算和三明治交易都是非常著名的 MEV 机会，不太可能为新的搜索者带来利润。然而，存在着大量鲜为人知的长尾 MEV 机会（NFT MEV 可以说是其中之一）。

刚刚起步的搜索者可能会通过在这条长尾中寻找 MEV 来获得更多成功。Flashbots 的 [MEV 任务板](https://github.com/flashbots/mev-job-board)列出了一些新兴机会。

## MEV 的影响 {#effects-of-mev}

MEV 并非全都是坏事——以太坊上的 MEV 既有积极的后果，也有消极的后果。

### 积极影响 {#effects-of-mev-the-good}

许多去中心化金融 (DeFi) 项目依赖于经济理性的参与者来确保其协议的实用性和稳定性。例如，DEX 套利确保用户获得其代币的最佳、最正确的价格，而借贷协议在借款人低于抵押率时依赖于快速清算，以确保贷款人获得还款。

如果没有理性的搜索者寻找并修复经济效率低下的问题，并利用协议的经济激励，DeFi 协议和去中心化应用 (dapp) 总体上可能不会像今天这样稳健。

### 消极影响 {#effects-of-mev-the-bad}

在应用层，某些形式的 MEV（如三明治交易）会导致用户体验明显变差。被夹击的用户面临着增加的滑点和更糟糕的交易执行。

在网络层，广义抢跑者以及他们经常参与的 Gas 价格拍卖（当两个或多个抢跑者通过逐步提高自己交易的 Gas 价格来竞争将其交易包含在下一个区块中时）会导致网络拥堵，并使其他试图运行常规交易的人面临高昂的 Gas 价格。

除了在区块_内部_发生的事情之外，MEV 还会对区块_之间_产生有害影响。如果一个区块中可用的 MEV 明显超过标准区块奖励，验证者可能会被激励去重组区块并为自己捕获 MEV，从而导致区块链重组和共识不稳定。

这种区块链重组的可能性[之前已在比特币区块链上探讨过](https://dl.acm.org/doi/10.1145/2976749.2978408)。随着比特币的区块奖励减半，交易费在区块奖励中所占的比例越来越大，就会出现这样的情况：矿工放弃下一个区块的奖励，转而重新挖掘具有更高费用的过去区块，这在经济上是理性的。随着 MEV 的增长，以太坊中也可能发生类似的情况，从而威胁到区块链的完整性。

## MEV 的现状 {#state-of-mev}

MEV 提取在 2021 年初激增，导致当年头几个月的 Gas 价格极高。Flashbots 的 MEV 中继的出现降低了广义抢跑者的有效性，并将 Gas 价格拍卖转移到了链下，从而降低了普通用户的 Gas 价格。

虽然许多搜索者仍然从 MEV 中赚取丰厚的利润，但随着机会变得越来越为人所知，并且越来越多的搜索者竞争同一个机会，验证者将捕获越来越多的总 MEV 收入（因为最初如上所述的同类 Gas 拍卖也发生在 Flashbots 中，尽管是私下进行的，并且验证者将捕获由此产生的 Gas 收入）。MEV 也不是以太坊独有的，随着以太坊上的机会竞争变得更加激烈，搜索者正在转向币安智能链等替代区块链，那里存在与以太坊上类似的 MEV 机会，但竞争较少。

另一方面，从工作量证明到权益证明的过渡以及使用汇总来扩展以太坊的持续努力，都以目前尚不完全清楚的方式改变了 MEV 的格局。与工作量证明中的概率模型相比，稍微提前知道有保证的区块提议者将如何改变 MEV 提取的动态，或者当实施 [单一秘密领导者选举 (SSLE)](https://ethresear.ch/t/secret-non-single-leader-election/11789) 和[分布式验证者技术 (DVT)](/staking/dvt/) 时这将如何被颠覆，目前尚不清楚。同样，当大多数用户活动从以太坊转移到其二层网络 (l2) 汇总和分片上时，存在哪些 MEV 机会还有待观察。

## 以太坊权益证明 (PoS) 中的 MEV {#mev-in-ethereum-proof-of-stake}

如前所述，MEV 对整体用户体验和共识层安全性具有负面影响。但以太坊向权益证明共识的过渡（被称为“合并”）可能会引入新的与 MEV 相关的风险：

### 验证者中心化 {#validator-centralization}

在合并后的以太坊中，验证者（已缴纳 32 ETH 的安全押金）就添加到信标链的区块的有效性达成共识。由于 32 ETH 可能超出了许多人的承受能力，[加入质押池](/staking/pools/)可能是一个更可行的选择。尽管如此，[独立质押者](/staking/solo/)的健康分布是理想的，因为它减轻了验证者的中心化并提高了以太坊的安全性。

然而，人们认为 MEV 提取能够加速验证者中心化。部分原因是，由于验证者[提议区块的收入](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply)低于以前的矿工，自[合并](/roadmap/merge/)以来，MEV 提取极大地[影响了验证者的收益](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb)。

较大的质押池可能会有更多资源投资于必要的优化，以捕获 MEV 机会。这些池提取的 MEV 越多，它们用来提高其 MEV 提取能力（并增加总收入）的资源就越多，本质上创造了[规模经济](https://www.investopedia.com/terms/e/economiesofscale.asp#)。

由于可支配的资源较少，独立质押者可能无法从 MEV 机会中获利。这可能会增加独立验证者加入强大的质押池以提高其收益的压力，从而降低以太坊的去中心化程度。

### 许可型内存池 {#permissioned-mempools}

为了应对三明治交易和抢跑攻击，交易者可能会开始与验证者进行链下交易以获得交易隐私。交易者不会将潜在的 MEV 交易发送到公共内存池，而是将其直接发送给验证者，验证者将其包含在区块中并与交易者分享利润。

“暗池”是这种安排的更大版本，充当许可型、仅限访问的内存池，向愿意支付一定费用的用户开放。这种趋势将削弱以太坊的无许可性和去信任化，并可能将区块链转变为有利于出价最高者的“付费参与”机制。

许可型内存池也将加速上一节中描述的中心化风险。运行多个验证者的大型池可能会受益于向交易者和用户提供交易隐私，从而增加其 MEV 收入。

在合并后的以太坊中解决这些与 MEV 相关的问题是一个核心研究领域。迄今为止，为减少合并后 MEV 对以太坊去中心化和安全性的负面影响而提出的两个解决方案是[**提议者-构建者分离 (PBS)**](/roadmap/pbs/)和 [**Builder API**](https://github.com/ethereum/builder-specs)。

### 提议者-构建者分离 (PBS) {#proposer-builder-separation}

在工作量证明和权益证明中，构建区块的节点会向参与共识的其他节点提议将其添加到链中。在另一个矿工在其之上构建（在 PoW 中）或它收到大多数验证者的证明（在 PoS 中）之后，新区块成为规范链的一部分。

区块生产者和区块提议者角色的结合引入了前面描述的大多数与 MEV 相关的问题。例如，共识节点被激励在[时间强盗攻击](https://www.mev.wiki/attack-examples/time-bandit-attack)中触发链重组，以最大化 MEV 收益。

[提议者-构建者分离 (PBS)](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) 旨在减轻 MEV 的影响，尤其是在共识层。PBS 的主要特点是分离区块生产者和区块提议者的规则。验证者仍然负责提议区块并对其进行投票，但一类新的专门实体（称为**区块构建者**）的任务是排序交易和构建区块。

在 PBS 下，区块构建者创建一个交易包，并出价将其包含在信标链区块中（作为“执行负载”）。然后，被选中提议下一个区块的验证者检查不同的出价，并选择费用最高的交易包。PBS 本质上创建了一个拍卖市场，构建者在其中与出售区块空间的验证者进行谈判。

当前的 PBS 设计使用[承诺-揭示方案](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/)，其中构建者仅发布对区块内容（区块头）的加密承诺及其出价。在接受中标后，提议者创建一个包含区块头的签名区块提案。区块构建者在看到签名的区块提案后，应发布完整的区块主体，并且在已最终确定之前，它还必须收到来自验证者的足够[证明](/glossary/#attestation)。

#### 提议者-构建者分离如何减轻 MEV 的影响？ {#how-does-pbs-curb-mev-impact}

协议内提议者-构建者分离通过将 MEV 提取从验证者的权限中移除，减少了 MEV 对共识的影响。相反，运行专用硬件的区块构建者将在未来捕获 MEV 机会。

不过，这并没有将验证者完全排除在与 MEV 相关的收入之外，因为构建者必须出高价才能让验证者接受他们的区块。尽管如此，由于验证者不再直接专注于优化 MEV 收入，时间强盗攻击的威胁降低了。

提议者-构建者分离也降低了 MEV 的中心化风险。例如，承诺-揭示方案的使用消除了构建者信任验证者不会窃取 MEV 机会或将其暴露给其他构建者的需要。这降低了独立质押者从 MEV 中受益的门槛，否则，构建者将倾向于青睐具有链下声誉的大型池并与它们进行链下交易。

同样，验证者不必信任构建者不会隐瞒区块主体或发布无效区块，因为付款是无条件的。即使提议的区块不可用或被其他验证者宣布无效，验证者的费用仍会处理。在后一种情况下，区块将被简单地丢弃，迫使区块构建者失去所有交易费和 MEV 收入。

### Builder API {#builder-api}

虽然提议者-构建者分离有望减少 MEV 提取的影响，但实施它需要更改共识协议。具体来说，信标链上的[分叉选择](/developers/docs/consensus-mechanisms/pos/#fork-choice)规则需要更新。[Builder API](https://github.com/ethereum/builder-specs) 是一个临时解决方案，旨在提供提议者-构建者分离的有效实现，尽管具有更高的信任假设。

Builder API 是共识层客户端用于向执行层客户端请求执行负载的 [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 的修改版本。正如[诚实验证者规范](https://github.com/ethereum/consensus-specs/blob/master/specs/bellatrix/validator.md)中所述，被选中执行区块提议职责的验证者向连接的执行客户端请求交易包，并将其包含在提议的信标链区块中。

Builder API 还充当验证者和执行层客户端之间的中间件；但它有所不同，因为它允许信标链上的验证者从外部实体获取区块（而不是使用执行客户端在本地构建区块）。

以下是 Builder API 工作原理的概述：

1. Builder API 将验证者连接到运行执行层客户端的区块构建者网络。与 PBS 中一样，构建者是专门的参与者，他们投资于资源密集型的区块构建，并使用不同的策略来最大化从 MEV + 优先小费中赚取的收入。

2. 验证者（运行共识层客户端）向构建者网络请求执行负载以及出价。构建者的出价将包含执行负载头——对负载内容的加密承诺——以及支付给验证者的费用。

3. 验证者审查收到的出价，并选择费用最高的执行负载。使用 Builder API，验证者创建一个“盲化”的信标区块提案，其中仅包含他们的签名和执行负载头，并将其发送给构建者。

4. 运行 Builder API 的构建者在看到盲化的区块提案后，应以完整的执行负载进行响应。这允许验证者创建一个“签名”的信标区块，并在整个网络中传播。

5. 使用 Builder API 的验证者仍应在本地构建区块，以防区块构建者未能及时响应，从而不会错过区块提案奖励。然而，验证者不能使用现在揭示的交易或另一组交易创建另一个区块，因为这相当于_模棱两可_（在同一个时隙内签署两个区块），这是一种可被罚没的违规行为。

Builder API 的一个示例实现是 [MEV-Boost](https://github.com/flashbots/mev-boost)，这是对 [Flashbots 拍卖机制](https://docs.flashbots.net/flashbots-auction/overview)的改进，旨在遏制 MEV 对以太坊的负面外部性。Flashbots 拍卖允许权益证明中的验证者将构建有利可图的区块的工作外包给称为**搜索者**的专门参与者。
![A diagram showing the MEV flow in detail](./mev.png)

搜索者寻找利润丰厚的 MEV 机会，并将交易包连同包含在区块中的[密封价格出价](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction)一起发送给区块提议者。运行 mev-geth（Go以太坊 (Geth) 客户端的分叉版本）的验证者只需选择利润最高的交易包，并将其作为新区块的一部分包含在内。为了保护区块提议者（验证者）免受垃圾信息和无效交易的影响，交易包在到达提议者之前会通过**中继者**进行验证。

MEV-Boost 保留了原始 Flashbots 拍卖的相同工作原理，尽管具有为以太坊切换到权益证明而设计的新功能。搜索者仍然寻找有利可图的 MEV 交易以包含在区块中，但一类新的专门参与者（称为**构建者**）负责将交易和交易包聚合到区块中。构建者接受搜索者的密封价格出价，并运行优化以找到最有利可图的排序。

中继者仍然负责在将交易包传递给提议者之前对其进行验证。然而，MEV-Boost 引入了**托管**，负责通过存储构建者发送的区块主体和验证者发送的区块头来提供[数据可用性](/developers/docs/data-availability/)。在这里，连接到中继的验证者请求可用的执行负载，并使用 MEV-Boost 的排序算法选择具有最高出价 + MEV 小费的负载头。

#### Builder API 如何减轻 MEV 的影响？ {#how-does-builder-api-curb-mev-impact}

Builder API 的核心优势在于其使 MEV 机会获取民主化的潜力。使用承诺-揭示方案消除了信任假设，并降低了寻求从 MEV 中受益的验证者的进入门槛。这应该会减轻独立质押者为了提高 MEV 利润而与大型质押池整合的压力。

Builder API 的广泛实施将鼓励区块构建者之间进行更激烈的竞争，从而提高抗审查性。当验证者审查来自多个构建者的出价时，意图审查一个或多个用户交易的构建者必须出价高于所有其他不审查的构建者才能成功。这极大地增加了审查用户的成本，并阻碍了这种做法。

一些项目（如 MEV-Boost）使用 Builder API 作为整体结构的一部分，旨在为某些参与者（例如试图避免抢跑/三明治攻击的交易者）提供交易隐私。这是通过在用户和区块构建者之间提供私人通信渠道来实现的。与前面描述的许可型内存池不同，这种方法有以下好处：

1. 市场上存在多个构建者使得审查变得不切实际，这使用户受益。相比之下，中心化和基于信任的暗池的存在会将权力集中在少数区块构建者手中，并增加审查的可能性。

2. Builder API 软件是开源的，这允许任何人提供区块构建者服务。这意味着用户不会被迫使用任何特定的区块构建者，并提高了以太坊的中立性和无许可性。此外，寻求 MEV 的交易者不会因为使用私人交易渠道而无意中助长中心化。

## 相关资源 {#related-resources}

- [Flashbots 文档](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [mevboost.org](https://www.mevboost.org/) - _提供 MEV-Boost 中继和区块构建者实时统计数据的跟踪器_

## 延伸阅读 {#further-reading}

- [什么是矿工可提取价值 (MEV)？](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV 与我](https://www.paradigm.xyz/2021/02/mev-and-me)
- [以太坊是一片黑暗森林](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [逃离黑暗森林](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots：抢跑 MEV 危机](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller 的 MEV 帖子](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost：为合并准备的 Flashbots 架构](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [什么是 MEV-Boost](https://www.alchemy.com/overviews/mev-boost)
- [为什么要运行 mev-boost？](https://writings.flashbots.net/writings/why-run-mevboost/)
- [以太坊漫游指南](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)