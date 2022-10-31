---
title: 状态通道
description: 介绍了状态通道和付款渠道，作为以太坊社区目前使用的扩容解决方案。
lang: zh
incomplete: true
sidebarDepth: 3
---

通道允许参与者在链下进行`x`次交易，而在链上只能向网络提交两次交易。 这允许极高的交易吞吐量.

## 先决条件 {#prerequisites}

您应对所有基础性课题有很好的了解，并且对[以太坊扩容](/developers/docs/scaling/)有深入的了解。 实现诸如渠道之类的扩展解决方案是一个高级主题，因为该技术没有经过多少实战测试，而且还在继续研究和开发。

## 通道 {#channels}

参与者必须将以太坊的一部分状态，如 ETH 存款，锁定在一个多签合约中。 多签合约是一种需要多个私钥的签名（从而达成一致）才能执行的合约。

以这种方式锁定状态是第一个交易，并打开了通道。 然后参与者可以在链下快速自由地进行交易。 当互动结束后，提交最后一笔链上交易，解锁状态。

**适用于**：

- 需要大量状态更新
- 当参与者数量为公开时
- 当参与者始终在线时

现在有两种通道：状态通道和支付通道。

## 状态通道 {#state-channels}

状态通道或许最好通过示例进行解释，比如井字棋：

1. 在以太坊主链上创建一个井字游戏智能合约 "法官"，它了解井字游戏的规则，并能识别爱丽丝和鲍勃是我们游戏中的两个玩家。 该合约持有 1 个 ETH 的奖励。

2. 然后，Alice 和 Bob 开始玩游戏，打开状态通道。 每一个动作都会创建一个包含“nonce”的链下交易，nonce 代表这些动作发生的顺序。

3. 当有赢家时，他们通过向审判合约提交最终状态（如交易清单）来关闭通道，这时候只需要支付一笔交易费用。 审判者确保双方签署这一“最后状态”，并等待一段时间以确保没有人合法地对结果提出质疑，然后向 Alice 支付 1 ETH 的奖励。

## 支付通道 {#payment-channels}

仅处理支付的简化状态通道（例如 ETH 转账）。 允许两个参与者之间的链下转账，只要他们的转账总额不超过存入的代币数量。

## 优点和缺点 {#channels-pros-and-cons}

| 优点                                          | 缺点                                                                             |
| --------------------------------------------- | -------------------------------------------------------------------------------- |
| 在主网上即时提款/结算（如果通道的双方合作）。 | 对于偶尔转账给对方的用户来说，创建和结算通道的时间和经济成本都比较高，不太友好。 |
| 可能出现极高的吞吐量                          | 需要定期监视（有效性要求）或者委托其他人监视网络，从而确保你的资金安全。         |
| 每笔交易成本最低 - 适合主流的小额支付         | 必须在开启的支付通道中锁定资金                                                   |
|                                               | 不支持开放式参与                                                                 |

## 使用状态通道 {#use-state-channels}

多个项目提供了您可以整合到您的 dapp 的状态频道的实现方式：

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## 延伸阅读 {#further-reading}

**状态通道**

- [状态通道上的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit（理解以太坊的第二层扩容解决方案：状态通道、Plasma 和 Truebit）](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [State Channels - an explanation（状态通道）- 解释](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [状态通道的基础知识](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**支付通道**

- [支付通道的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

_还有哪些社区资源对您有所帮助？ 请编辑本页面并添加！_
