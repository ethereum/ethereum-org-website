---
title: 节点架构
description: 以太坊节点组织方式简介。
lang: zh
---

一个以太坊节点由两个客户端组成：[执行客户端](/developers/docs/nodes-and-clients/#execution-clients)和[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)。为了让节点能够提议新区块，它还必须运行一个[验证者客户端](#validators)。

当以太坊使用[工作量证明 (PoW)](/developers/docs/consensus-mechanisms/pow/)时，一个执行客户端就足以运行一个完整的以太坊节点。然而，自从实施[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos/)以来，执行客户端必须与另一个称为[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)的软件一起使用。

下图展示了这两个以太坊客户端之间的关系。这两个客户端连接到各自的点对点 (P2P) 网络。需要独立的 P2P 网络，因为执行客户端在其 P2P 网络上广播交易，从而使它们能够管理本地交易池，而共识客户端在其 P2P 网络上广播区块，从而实现共识和链的增长。

![Diagram of Ethereum node architecture showing execution and consensus layers](node-architecture-text-background.png)

_执行客户端有多种选择，包括埃里贡 (Erigon)、奈瑟曼德 (Nethermind) 和 Besu_。

为了使这种双客户端结构发挥作用，共识客户端必须将打包的交易传递给执行客户端。执行客户端在本地执行这些交易，以验证交易没有违反任何以太坊规则，并且提议的以太坊状态更新是正确的。当一个节点被选为区块生产者时，其共识客户端实例会向执行客户端请求打包的交易，以将其包含在新区块中并执行它们以更新全局状态。共识客户端通过使用 [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 的本地 RPC 连接来驱动执行客户端。

## 执行客户端的作用是什么？ {#execution-client}

执行客户端负责交易验证、处理和广播，以及状态管理和支持以太坊虚拟机 ([EVM](/developers/docs/evm/))。它**不**负责区块构建、区块广播或处理共识逻辑。这些属于共识客户端的职责范围。

执行客户端创建执行负载——交易列表、更新的状态树以及其他与执行相关的数据。共识客户端将执行负载包含在每个区块中。执行客户端还负责重新执行新区块中的交易，以确保它们是有效的。执行交易是在执行客户端的嵌入式计算机上完成的，该计算机被称为[以太坊虚拟机 (EVM)](/developers/docs/evm)。

执行客户端还通过 [RPC 方法](/developers/docs/apis/json-rpc)提供以太坊的用户接口，使用户能够查询以太坊区块链、提交交易和部署智能合约。RPC 调用通常由 [Web3js](https://docs.web3js.org/)、[Web3py](https://web3py.readthedocs.io/en/v5/) 等库或浏览器钱包等用户界面来处理。

总而言之，执行客户端是：

- 用户访问以太坊的网关
- 以太坊虚拟机、以太坊状态和交易池的所在地。

## 共识客户端的作用是什么？ {#consensus-client}

共识客户端处理使节点能够与以太坊网络保持同步的所有逻辑。这包括从对等节点接收区块并运行分叉选择算法，以确保节点始终遵循积累了最多证明（按验证者有效余额加权）的链。与执行客户端类似，共识客户端拥有自己的 P2P 网络，通过该网络共享区块和证明。

共识客户端不参与证明或提议区块——这是由验证者完成的，验证者是共识客户端的可选附加组件。没有验证者的共识客户端只跟进链的头部，使节点保持同步。这使用户能够使用其执行客户端与以太坊进行交易，并确信他们处于正确的链上。

## 验证者 {#validators}

质押并运行验证者软件使节点有资格被选中提议新区块。节点运营商可以通过在存款合约中存入 32 ETH，将验证者添加到其共识客户端中。验证者客户端与共识客户端捆绑在一起，可以随时添加到节点中。验证者处理证明和区块提案。它还使节点能够累积奖励，或因惩罚或罚没而损失 ETH。

[了解更多关于质押的信息](/staking/)。

## 节点组件比较 {#node-comparison}

| 执行客户端                                         | 共识客户端                                                                                                                | 验证者                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 在其 P2P 网络上广播交易                            | 在其 P2P 网络上广播区块和证明                                                                                             | 提议区块                     |
| 执行/重新执行交易                                  | 运行分叉选择算法                                                                                                          | 累积奖励/惩罚                |
| 验证传入的状态变更                                 | 跟踪链的头部                                                                                                              | 进行证明                     |
| 管理状态树和收据树                                 | 管理信标状态（包含共识和执行信息）                                                                                        | 需要质押 32 ETH              |
| 创建执行负载                                       | 跟踪 RANDAO（一种为验证者选择和其他共识操作提供可验证随机性的算法）中累积的随机性                                         | 可能会被罚没                 |
| 暴露用于与以太坊交互的 JSON-RPC API                | 跟踪合理化和最终确定性                                                                                                    |                              |

## 延伸阅读 {#further-reading}

- [权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos)
- [区块提案](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [验证者奖励和惩罚](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)