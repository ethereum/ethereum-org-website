---
title: 二层扩容
description: 介绍以太坊社区目前正在开发的不同扩容选择。
lang: zh
sidebar: true
incomplete: true
sidebarDepth: 3
---

二层网络是旨在通过处理以太坊主网（一层）以外的交易，来帮助扩展你的应用程序的解决方案的总称。 当网络繁忙时，交易速度会受到影响，这可能使某些类型的 dapp 用户体验变差。 而且，随着网络越来越繁忙，由于交易发送者的目标是超越对方的出价，Gas 价格也随之上升。 这可能会让使用以太坊的成本非常高。

## 前置要求 {#prerequisites}

你应该很好地理解所有的基础性课题。 部署二层解决方案是非常领先的，该技术没有那么久经沙场。

## 为什么我们需要二层？ {#why-is-layer-2-needed}

- 一些用例，如区块链游戏，在目前的交易时间内其实没有意义
- 使用区块链应用可能会过于昂贵
- 关于可扩展性的任何更新都不应以分散安全性为代价——二层建立在以太坊的顶端。

## 二层解决方案的种类 {#types}

- [Rollup](#rollups)
  - [ZK rollup](#zk-rollups)
  - [Optimistic rollup](#optimistic-rollups)
- [状态通道](#channels)
- [以太坊 Plasma 扩容解决方案](#plasma)
- [Validium](#validium)
- [侧链](#sidechains)
- [混合解决方案](#hybrid-solutions)

大多数二层解决方案是围绕着一个服务器或服务器群集的，其中每一种都可以称为节点、验证员、操作员、序列员、块生产者或类似的术语。 根据实施情况，这些二层节点可能由使用它们的企业或实体运行，或由第三方运营商，或由一大群个人（类似于主网）运行。 一般来说，交易被提交给这些二层节点，而不是直接提交给一层（[主网](/glossary/#mainnet)）；然后二层事件在将它们锚定到一层之前，将它们分成若干组，之后由一层保护，不能被更改。 在不同的二层技术和实现之间，如何做到这一点的细节差异很大。

一个特定的二层事件可能是开放的，由许多应用程序共享，也可能由一家公司部署，专门支持他们的应用程序。

## Rollup {#rollups}

Rollup 是将侧链交易捆绑或 "卷"为一笔交易，并生成加密证明的解决方案，被称为 SNARK（简洁的非交互知识论证）。 只有这个证明被提交给主链。

_侧链是与以太坊兼容的独立区块链。_

换句话说，rollup 意味着所有的状态和执行都在侧链中处理 -- 签名验证、合约执行等。 以太坊主链（一层）只存储交易数据。

Rollup 解决方案需要在 rollup 合约中抵押了保证金的中继者。 这激励了他们准确地中继 rollup。

**适用于：**

- 减少手续费
- 公开参与
- 快速的交易吞吐量

有两种不同安全模式的 rollup：

- 零知识证明：在链下运行计算并向链上提交[**有效性证明**](/glossary/#validity-proof)
- Optimistic：假设交易在默认情况下是有效的，并且在被挑战的情况下，只通过[**欺诈证明**](/glossary/#fraud-proof)运行计算

### ZK Rollup {#zk-rollups}

ZKRollup 通过智能合约将数百次链下转账捆绑成一笔交易。 从提交的数据中，智能合约可以验证所有包含的转账。 这就是所谓的有效性证明。

有了 ZK Rollup，验证一个区块会更快、更便宜，因为包含的数据更少。 你不需要通过所有的交易数据来验证交易，只需要证明。

ZK Rollup 的侧链可以被优化，以进一步减少交易大小。 例如，一个帐户由一个索引而不是一个地址来表示，这就把一个交易从 32 个字节减少到只有 4 个字节。 交易也作为 calldata 写入以太坊，减少 gas 消耗。

#### 优点和缺点 {#zk-pros-and-cons}

| 优点                                                                               | 缺点                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 没有延迟，因为证明在提交给主链时已经被认为是有效的。                               | 只限于简单的转账，不兼容 EVM。                                                                                                                                                       |
| 不太容易受到[ Optimistic rollup ](#optimistic-pros-and-cons)可能会受到的经济攻击。 | 有效性证明的计算量很大 -- 对于链上活动很少的应用来说，不值得这样做。                                                                                                                 |
|                                                                                    | 主观的[终局性](/glossary/#finality)时间较慢（生成一个零知识证明需要 10-30 分钟）（但到完全终局性的速度较快，因为没有像[ Optimistic rollup ](#optimistic-rollups)中的争议时间延迟）。 |

#### 使用 ZK Rollup {#use-zk-rollups}

- [路印（Loopring）](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs zkSync](https://matter-labs.io/)
- [Aztec 2.0](https://aztec.network/)

### Optimistic rollup {#optimistic-rollups}

Optimistic rollup 使用一个与以太坊主链平行的侧链。 它们可以提供可扩展性方面的改进，因为它们默认不做任何计算。 相反，在一笔交易之后，他们向主网提出新的状态。 或者对交易进行 "公证"。

通过 Optimistic rollup，交易以 calldata 的形式写入以太坊主网，通过减少 gas 消耗进一步优化。

由于计算是使用以太坊 Optimistic rollup 缓慢而昂贵的部分，Optimistic rollup 可以提供高达 10-100 倍的可扩展性，这取决于交易。 随着 Eth2 升级版的推出，这一数字将进一步增加。[分片链](/eth2/shard-chains)。 这是因为在交易有争议的情况下，会有更多的数据可用。

#### 对交易提出异议 {#disputing-transactions}

Optimistic rollup 并不实际计算交易，所以需要有一个机制来确保交易是合法的，而不是欺诈性的。 这就是欺诈证明的作用。 如果有人注意到有欺诈性交易，rollup 将执行防欺诈并运行交易的计算，使用可用的状态数据。 这意味着你的交易确认等待时间可能比 ZK Rollup 更长，因为它可能受到质疑。

![显示以太坊中的 Optimistic rollup 中发生欺诈性交易时的图表](./optimistic-rollups.png)

你需要运行计算的欺诈证明的 gas 甚至可以报销。 来自 Optimism 的 Ben Jones 介绍了现有的联系制度。

"_任何可能采取你必须证明是欺诈性的行动来保证你的资金的人，都要求你缴纳保证金。 这基本上等同于你拿了一些 ETH，并把它锁起来，你说 "嘿，我保证说实话"... 如果我不说实话，欺诈被证实，这笔钱就会被没收。 这笔钱不仅被没收了一部分，而且还有一部分将支付人们做欺诈证明所花的 gas_。

所以你可以因为证明欺诈而获得补偿。

#### 优点和缺点 {#optimistic-pros-and-cons}

| 优点                                                                                         | 缺点                                                                          |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 你能在以太坊一层做的任何事情，你都能用 Optimistic rollup 做，因为它与 EVM 和 Solidity 兼容。 | 由于潜在的欺诈挑战，链上交易的等待时间很长。                                  |
| 所有交易数据都存储在一层链上，这意味着它是安全和分散的。                                     | 如果在一个 Optimistic rollup 的价值超过运营商的保证金数额，则有可能受到攻击。 |

#### 使用 Optimistic rollup {#use-optimistic-rollups}

- [Optimism](https://optimism.io/)
- [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
- [Fuel Network](https://fuel.sh/)

<!-- #### The Optimism virtual machine (OVM)

What makes Optimistic rollups particularly exciting is that the chain works the same as the main Ethereum chain because it's based on [the EVM](/developers/docs/evm/). It doesn't use Ethereum, it is Ethereum. This means if you want to use Optimistic rollups, it's just a matter of deploying it to the OVM. It looks, feels, and acts just like the Ethereum main chain–you write contracts in Solidity, and interact with the chain via the Web3 API.

The OVM also has a bunch of features that allow for a really seamless experience moving code from the EVM. In fact you can move Solidity contracts onto a cheaper and faster solution with just a few lines of code.

[Check out the OVM documentation](http://docs.optimism.io/) -->

## 通道 {#channels}

通道允许参与者在链下进行`x`次交易，而在链上只向网络提交两次交易。 这允许极高的交易吞吐量

**适用于**：

- 需要大量状态更新
- 通道使用者的数量是确定的
- 所有的参与者都在线

参与者必须将以太坊的一部分状态，如 ETH 存款，锁定在一个多签合约中。 多签合约是一种需要多个私钥的签名（从而达成一致）才能执行的合约。

以这种方式锁定状态是第一个交易，并打开了通道。 然后参与者可以在链下快速自由地进行交易。 当互动结束后，提交最后一笔链上交易，解锁状态。

### 状态通道 {#state-channels}

状态通道井字游戏：

1. 在以太坊主链上创建一个井字游戏智能合约 "法官"，它了解井字游戏的规则，并能识别爱丽丝和鲍勃是我们游戏中的两个玩家。 该智能合约持有 1 个 ETH 的奖励。

2. 然后，爱丽丝和鲍勃开始玩游戏，打开状态通道。 每一个动作都会创建一个包含 "nonce" 的链下交易，nonce 代表这些动作发生的顺序。

3. 当有赢家时，他们通过向法官智能合约提交最终状态（如转账交易的清单）来关闭通道，这时候只需要支付一笔交易的费用。 法官确保双方签署这一“最后状态”。 并等待一段时间以确保没有人能够合法地对结果提出质疑，然后向爱丽丝支付 1 ETH 的奖励。

现在有两种类型状态通道：

- 状态通道 -- 如上所述
- 支付通道 -- 简化的状态通道，只处理支付问题。 他们允许两个参与者之间的链下转账，只要他们的转账总额不超过存放的通证数量。

#### 优点和缺点 {#channels-pros-and-cons}

| 优点                                        | 缺点                                                                             |
| ------------------------------------------- | -------------------------------------------------------------------------------- |
| 在主网上即时提款/结算（如果通道的双方合作） | 对于偶尔转账给对方的用户来说，创建和结算通道的时间和经济成本都比较高，不太友好。 |
| 极高的吞吐量是可能的                        | 需要定期监视（有效性要求）或者委托其他人监视网络，从而确保你的资金安全。         |
| 每笔交易成本最低 -- 适合主流的小额支付      | 必须在开启的支付通道中锁定资金                                                   |
|                                             | 不支持开放式参与                                                                 |

#### 使用状态通道 {#use-state-channels}

- [Connext](https://connext.network/)
- [雷电网络（Raiden）](https://raiden.network/)
- [Perun](https://perun.network/)
- [Statechannels.org](https://statechannels.org/)

## 以太坊 Plasma 扩容解决方案 {#plasma}

Plasma 是一条独立的区块链。它锚定在以太坊主链上，并使用欺诈证明（如[Optimistic rollup](#optimistic-rollups)）来仲裁争议。

| 优点                                                                           | 缺点                                                                                                      |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| 高吞吐量，每笔交易成本较低。                                                   | 不支持通用计算。 只支持特定逻辑的基本通证转账、兑换和几种其他交易类型。                                   |
| 适合任意用户之间的交易（如果双方都建立在 Plasma 链上，每个用户都几乎没有成本） | 需要定期监视（有效性要求）或者委托其他人监视网络，从而确保你的资金安全。                                  |
|                                                                                | 依靠一个或多个运营者来存储数据，并根据其需求提供数据。                                                    |
|                                                                                | 为了等待挑战期，提款会延迟几天。 对于可替换的资产，这可以由流动性提供者来缓解，但需要支付相关的资本成本。 |

### 使用 Plasma {#use-plasma}

- [OMG 网络](https://omg.network/)
- [Matic 网络](https://matic.network/)
- [Gluon](https://gluon.network/)
- [Gazelle](https://gzle.io/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Validium {#validium}

使用像[ ZK Rollup ](#zk-rollups)这样的有效性证明，但数据不存储在一层以太坊主网上。 这可以导致每个 validium 链每秒有 1 万个交易，并且多个链可以并行运行。

| 优点                                                             | 缺点                                                                                                          |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 没有提款延迟（对链上/跨链转接没有延迟）；因此，资本效率更高。    | 对一般计算/智能合约的支持有限；需要专门语言。                                                                 |
| 在高价值应用中，不容易受到基于防欺诈的系统所面临的某些经济攻击。 | 生成零知识证明需要很高的计算能力；对于低吞吐量的应用来说不具成本效益。                                        |
|                                                                  | 主观终结时间较慢（生成零知识证明的时间为 10 - 30 分钟）（但由于没有争议时间延迟，所以到完全终结的时间较快）。 |

### 使用 Validium {#use-validium}

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)
- [路印（Loopring）](https://loopring.org/#/)

## 侧链 {#sidechains}

侧链是一个独立的区块链，与主网平行运行，独立运作。 它有自己的共识算法（[权威证明](https://en.wikipedia.org/wiki/Proof_of_authority)、[ 权益委托证明 ](https://en.bitcoinwiki.org/wiki/DPoS)、[拜占庭容错](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)等等）。 它通过一个双向桥与主网相连。

| 优点                     | 缺点                                                            |
| ------------------------ | --------------------------------------------------------------- |
| 既有的技术。             | 不那么去中心化。                                                |
| 支持通用计算，EVM 兼容。 | 采用一个单独的共识机制。 未被一层保护（技术上它不是二层网络）。 |
|                          | 测链验证者达到一定数量可以进行欺诈。                            |

### 使用侧链 {#use-sidechains}

- [Skale](https://skale.network/)
- [POA 网络](https://www.poa.network/)

## 混合解决方案 {#hybrid-solutions}

结合了多种二层技术的最佳部分，并可能提供可配置的折衷方案。

### 使用混合解决方案 {#use-hybrid-solutions}

- [Offchain Labs Arbitrum SCSC](https://offchainlabs.com/arbitrum.pdf)
- [Celer](https://www.celer.network/)

## 延伸阅读 {#further-reading}

- [Validium 和二层二合一，第 99 期](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- \[评估以太坊二层扩展解决方案：一个比较框架\](https://medium.com/matter-labs/evaluating-ethereum-layer 2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [为 Celer 在以太坊上的 Coherent 二层平台添加混合 PoS-Rollup 侧链](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)
- [零知识区块链的可扩展性](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)

**状态通道**

- [状态通道上的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [ 理解以太坊的二层扩展解决方案：状态通道、Plasma 和 Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [ 状态通道 -- 解释](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [ 状态通道的基础知识 ](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**支付通道**

- [支付通道的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

**ZK Rollup**

- [Zkrollup 上的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)

**Optimistic rollup**

- [Optimistic rollup 上的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic-rollups/)
- [深入研究 OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**侧链**

- [侧链上的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [ 通过侧链扩展以太坊的 Dapp ](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_
