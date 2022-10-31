---
title: "The Graph：修复Web3数据查询"
description: 区块链就像一个数据库，但是没有SQL。 所有数据就在那里，但是没有办法访问它。 让我告诉您如何使用The Graph和GraphQL解决这个问题。
author: Markus Waas
lang: zh
tags:
  - "solidity"
  - "智能合约"
  - "查询"
  - "The Graph"
  - "create-eth-app"
  - "react"
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

这一次，我们将更仔细地看一下 The Graph，它在去年基本上成为了开发去中心化应用的标准堆栈的一部分。 让我们先看看我们会如何用传统的方式做事…

## 没有 The Graph... {#without-the-graph}

为了说明起见，让我们举一个简单的例子。 我们都喜欢游戏，所以想象一个用户下注的简单游戏：

```solidity
pragma solidity 0.7.1;

contract Game {
    uint256 totalGamesPlayerWon = 0;
    uint256 totalGamesPlayerLost = 0;
    event BetPlaced(address player, uint256 value, bool hasWon);

    function placeBet() external payable {
        bool hasWon = evaluateBetForPlayer(msg.sender);

        if (hasWon) {
            (bool success, ) = msg.sender.call{ value: msg.value * 2 }('');
            require(success, "Transfer failed");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

现在假设在我们的去中心化应用中，我们想要显示总输/赢游戏数，并在有人再次玩游戏时对其进行更新。 该方法将是：

1. 获取`totalGamesPlayerWon`。
2. 获取`totalGamesPlayerLost`。
3. 订阅`BetPlaced`事件。

我们可以侦听如右侧所示的[Web3 中的事件](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#contract-events)，但它需要处理相当多的情况。

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // event fired
})
.on('changed', function(event) {
    // event was removed again
})
.on('error', function(error, receipt) {
    // tx rejected
});
```

现在，对于我们的简单示例来说，这在某种程度上还是不错的。 但是假设我们现在只想显示当前玩家输/赢的赌注金额。 嗯，我们运气不好，您最好部署一份新的合约来存储这些值，并将它们提取出来。 现在想象一下一个更复杂的智能合约和去中心化应用，事情可能很快就会变得一团糟。

![一个不简单的查询](../../../../../developers/tutorials/the-graph-fixing-web3-data-querying/one-does-not-simply-query.jpg)

您可以看到这并不是最优的：

- 不适用于已经部署的合约。
- 存储这些值需要额外的 gas 成本。
- 需要另一个调用来获取以太坊节点的数据。

![是不够好的](../../../../../developers/tutorials/the-graph-fixing-web3-data-querying/not-good-enough.jpg)

现在让我们看看更好的解决方案。

## 让我向您介绍一下 GraphQL {#let-me-introduce-to-you-graphql}

首先我们来谈谈 GraphQL，它最初是由 Facebook 设计和实现的。 您可能熟悉传统的 Rest API 模型。 现在设想一下，您可以编写一个查询来精确查找您想要的数据：

![GraphQL API与REST API](../../../../../developers/tutorials/the-graph-fixing-web3-data-querying/graphql.jpg)

<img src="https://cdn0.scrvt.com/b095ee27d37b3d7b6b150adba9ac6ec8/42226f4816a77656/bc5c8b270798/graphql-querygif.gif" width="100%" />

这两张图片基本上抓住了 GraphQL 的精髓。 通过右边的查询，我们可以精确地定义我们想要的数据，这样我们就可以在一个请求中得到所有的东西，而不仅仅是我们需要的东西。 GraphQL 服务器处理所有所需数据的获取，因此前端用户端使用起来非常简单。 如果您感兴趣，[这是一个很好的解释](https://www.apollographql.com/blog/graphql-explained-5844742f195e/)，说明服务器是如何处理查询的。

现在有了这些知识，让我们最终进入区块链空间和 The Graph。

## 什么是 The Graph？ {#what-is-the-graph}

![The Graph](../../../../../developers/tutorials/the-graph-fixing-web3-data-querying/thegraph.png)

## 如何创建子图 {#how-to-create-a-subgraph}

1. 清单(subgraph.yaml)
2. 模式(schema.graphql)
3. 映射(mapping.ts)

### 清单(subgraph.yaml) {#manifest}

- 要为哪些智能合约建立索引（地址、网络、ABI...）
- 侦听哪些事件
- 其他要侦听的东西，如函数调用或区块
- 所调用的映射函数（参见下面的 mapping.ts）

为方便起见，您可能还想使用像 mustache 这样的模板工具。 然后您可以创建一个 subgraph.template.yaml，并根据最新的部署插入相应的地址。 有关更高级的示例设置，请参阅这个 [Aave subgraph repo](https://github.com/aave/aave-protocol/tree/master/thegraph) 示例。

```yaml
specVersion: 0.0.1
description: Placing Bets on Ethereum
repository: - GitHub link -
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: GameContract
    network: mainnet
    source:
      address: '0x2E6454...cf77eC'
      abi: GameContract
      startBlock: 6175244
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.1
      language: wasm/assemblyscript
      entities:
        - GameContract
      abis:
        - name: GameContract
          file: ../build/contracts/GameContract.json
      eventHandlers:
        - event: PlacedBet(address,uint256,bool)
          handler: handleNewBet
      file: ./src/mapping.ts
```

### 模式(schema.graphql) {#schema}

您还可以使用实体作为类型来定义关系。 在我们的示例中，我们定义了从玩家到投注的一对多关系。 感叹号(!)

- 字节
- ID
- 字符串
- 布尔值
- 整数
- 大整数
- 大十进制数

The Graph 中的映射文件定义了将传入事件转换为实体的函数。 它是用 AssemblyScript（TypeScript 的子集）编写的。 这意味着它可以编译成 WASM (WebAssembly)，以更高效和可移植的方式执行映射。

```graphql
type Bet @entity {
  id: ID!
  player: Player!
  playerHasWon: Boolean!
  time: Int!
}

type Player @entity {
  id: ID!
  totalPlayedCount: Int
  hasWonCount: Int
  hasLostCount: Int
  bets: [Bet]!
}
```

### 映射(mapping.ts) {#mapping}

您需要定义 subgraph.yaml 文件中命名的每个函数，因此在我们的例子中，我们只需要一个：handleNewBet。 我们首先尝试将发送者地址中的 Player 实体加载为 id。 如果它不存在，我们创建一个新实体并用起始值填充它。

然后我们创建一个新的 Bet 实体。 它的 id 将是 event.transaction.hash.toHex()+“-”+event.logIndex.toString()，确保值始终唯一。 仅使用哈希是不够的，因为有人可能会通过智能合约在一笔交易中多次调用 placeBet 函数。

最后，我们可以更新 Player 实体的所有数据。 数组不能直接推送，需要按如下所示进行更新。 我们使用 id 来引用投注。

完整的文档可以在这里看到：https://thegraph.com/docs/define-a-subgraph#writing-mappings。 您还可以将日志输出添加到映射文件，请参阅[此处](https://thegraph.com/docs/assemblyscript-api#api-reference)。

使用 Apollo Boost 之类的工具，您可以轻松地将 The Graph 集成到您的 React 去中心化应用（或 Apollo-Vue）中。 特别是当使用 React hooks 和 Apollo 这样的工具时，获取数据与在组件中写入单个 GraphQl 查询一样简单。

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // create if doesn't exist yet
    player = new Player(event.transaction.from.toHex())
    player.bets = new Array<string>(0)
    player.totalPlayedCount = 0
    player.hasWonCount = 0
    player.hasLostCount = 0
  }

  let bet = new Bet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  bet.player = player.id
  bet.playerHasWon = event.params.hasWon
  bet.time = event.block.timestamp
  bet.save()

  player.totalPlayedCount++
  if (event.params.hasWon) {
    player.hasWonCount++
  } else {
    player.hasLostCount++
  }

  // update array like this
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## 在前端使用它 {#using-it-in-the-frontend}

现在我们可以编写一个像这样的查询。 这个查询将帮助我们获取如下数据：

```javascript
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "{{ subgraphUrl }}",
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
```

- 当前用户已经赢得游戏多少次
- 当前用户已经输了游戏多少次
- 他之前所有赌注的时间戳清单

```javascript
const myGraphQlQuery = gql`
    players(where: { id: $currentUser }) {
      totalPlayedCount
      hasWonCount
      hasLostCount
      bets {
        time
      }
    }
`

const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

![Magic](../../../../../developers/tutorials/the-graph-fixing-web3-data-querying/magic.jpg)

最简单的方法是使用托管服务。 按照[此处](https://thegraph.com/docs/deploy-a-subgraph)的说明来部署子图。

## The Graph 服务器 {#the-graph-server}

### Graph Explorer：托管服务 {#graph-explorer-the-hosted-service}

![The Graph-Explorer](../../../../../developers/tutorials/the-graph-fixing-web3-data-querying/thegraph-explorer.png)

### 运行您自己的节点 {#running-your-own-node}

GraphQL 也支持新传入事件的流。 The Graph 还没有完全支持这一点，但很快就会发布。

## 去中心化的未来 {#the-decentralized-future}

然而，一个缺失的方面仍然是去中心化。 The Graph 计划最终成为一个完全去中心化的协议。

- https://thegraph.com/blog/the-graph-network-in-depth-part-1
- https://thegraph.com/blog/the-graph-network-in-depth-part-2

1. 用户将为查询支持索引器费用。
2. 索引器将权益质押图形通证(GRT)。
