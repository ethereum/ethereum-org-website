---
title: "The Graph：修复 Web3 数据查询"
description: 区块链就像一个没有 SQL 的数据库。所有数据都在那里，但无法访问。让我向你展示如何使用 The Graph 和 GraphQL 来解决这个问题。
author: 马库斯·瓦斯
lang: zh
tags: ["solidity", "智能合约", "查询", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

这次我们将深入探讨 The Graph，它在过去一年中基本上已成为开发去中心化应用 (dapp) 的标准技术栈的一部分。让我们首先看看传统方式是如何处理的……

## 如果没有 The Graph…… {#without-the-graph}

为了方便说明，我们来看一个简单的例子。我们都喜欢游戏，所以想象一个用户可以下注的简单游戏：

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

现在假设在我们的 dapp 中，我们想要显示总下注数、输赢的总局数，并在有人再次玩游戏时更新这些数据。传统的方法将是：

1. 获取 `totalGamesPlayerWon`。
2. 获取 `totalGamesPlayerLost`。
3. 订阅 `BetPlaced` 事件。

如右图所示，我们可以监听 [Web3 中的事件](https://docs.web3js.org/api/web3/class/Contract#events)，但这需要处理相当多的情况。

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // 事件已触发
})
.on('changed', function(event) {
    // 事件再次被移除
})
.on('error', function(error, receipt) {
    // 交易被拒绝
});
```

对于我们这个简单的例子来说，这还算可以接受。但假设我们现在只想显示当前玩家输赢的下注金额。那我们就倒霉了，你最好部署一个新合约来存储这些值并获取它们。现在想象一个复杂得多的智能合约和 dapp，事情很快就会变得一团糟。

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

你可以看出这并不是最优解：

- 对已经部署的合约不起作用。
- 存储这些值需要额外的 Gas 成本。
- 需要对以太坊节点进行另一次调用来获取数据。

![Thats not good enough](./not-good-enough.jpg)

现在让我们来看一个更好的解决方案。

## 让我向你介绍 GraphQL {#let-me-introduce-to-you-graphql}

首先我们来谈谈 GraphQL，它最初由脸书设计和实现。你可能熟悉传统的 REST API 模型。现在想象一下，你可以准确地为你想要的数据编写查询：

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

这两张图片很好地捕捉了 GraphQL 的本质。通过右侧的查询，我们可以准确定义我们想要的数据，因此我们在一个请求中获得了所有内容，并且不多不少正是我们需要的。GraphQL 服务器处理所有所需数据的获取，因此前端消费者使用起来极其简单。如果你感兴趣，[这里有一个很好的解释](https://www.apollographql.com/blog/graphql-explained)，说明了服务器究竟是如何处理查询的。

现在有了这些知识，让我们终于进入区块链领域和 The Graph。

## 什么是 The Graph？ {#what-is-the-graph}

区块链是一个去中心化的数据库，但与通常情况相反，我们没有用于这个数据库的查询语言。检索数据的解决方案要么令人痛苦，要么完全不可能。The Graph 是一个用于索引和查询区块链数据的去中心化协议。你可能已经猜到了，它使用 GraphQL 作为查询语言。

![The Graph](./thegraph.png)

例子总是理解事物的最佳方式，所以让我们在 GameContract 示例中使用 The Graph。

## 如何创建子图 {#how-to-create-a-subgraph}

关于如何索引数据的定义被称为子图。它需要三个组件：

1. 清单 (`subgraph.yaml`)
2. 模式 (`schema.graphql`)
3. 映射 (`mapping.ts`)

### 清单 (`subgraph.yaml`) {#manifest}

清单是我们的配置文件，它定义了：

- 要索引哪些智能合约（地址、网络、ABI 等）
- 要监听哪些事件
- 要监听的其他内容，如函数调用或区块
- 被调用的映射函数（见下文的 `mapping.ts`）

你可以在这里定义多个合约和处理程序。一个典型的设置是在 Hardhat 项目中有一个带有自己代码库的子图文件夹。这样你就可以轻松引用 ABI。

为了方便起见，你可能还想使用像 mustache 这样的模板工具。然后你创建一个 `subgraph.template.yaml` 并根据最新的部署插入地址。有关更高级的示例设置，请参阅 [Aave 子图代码库](https://github.com/aave/aave-protocol/tree/master/thegraph)。

完整的文档可以在[这里](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)查看。

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

### 模式 (`schema.graphql`) {#schema}

模式是 GraphQL 数据定义。它将允许你定义存在哪些实体及其类型。The Graph 支持的类型有：

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

你也可以使用实体作为类型来定义关系。在我们的例子中，我们定义了从玩家到下注的一对多关系。! 表示该值不能为空。完整的文档可以在[这里](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)查看。

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

### 映射 (`mapping.ts`) {#mapping}

The Graph 中的映射文件定义了我们将传入事件转换为实体的函数。它是用 AssemblyScript（TypeScript 的一个子集）编写的。这意味着它可以编译成 WASM (WebAssembly)，以便更高效、更可移植地执行映射。

你需要定义在 `subgraph.yaml` 文件中命名的每个函数，所以在我们的例子中只需要一个：`handleNewBet`。我们首先尝试从作为 ID 的发送者地址加载 Player 实体。如果它不存在，我们创建一个新实体并用初始值填充它。

然后我们创建一个新的 Bet 实体。它的 ID 将是 `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`，以确保始终是一个唯一值。仅仅使用哈希是不够的，因为有人可能会通过智能合约在一次交易中多次调用 placeBet 函数。

最后，我们可以用所有数据更新 Player 实体。数组不能直接推送，而是需要像这里显示的那样进行更新。我们使用 ID 来引用下注。并且在最后需要 `.save()` 来存储实体。

完整的文档可以在这里查看：https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings。你也可以在映射文件中添加日志输出，请参见[这里](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference)。

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // 如果尚不存在则创建
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

  // 像这样更新数组
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## 在前端中使用 {#using-it-in-the-frontend}

使用像 Apollo Boost 这样的工具，你可以轻松地将 The Graph 集成到你的 React dapp（或 Apollo-Vue）中。特别是在使用 React hooks 和 Apollo 时，获取数据就像在组件中编写单个 GraphQL 查询一样简单。一个典型的设置可能如下所示：

```javascript
// 查看所有子图：https://thegraph.com/explorer/
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

现在我们可以编写例如这样的查询。这将为我们获取：

- 当前用户赢了多少次
- 当前用户输了多少次
- 包含他之前所有下注的时间戳列表

所有这些都在对 GraphQL 服务器的单个请求中完成。

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

![Magic](./magic.jpg)

但我们还缺少最后一块拼图，那就是服务器。你可以自己运行它，也可以使用托管服务。

## The Graph 服务器 {#the-graph-server}

### Graph 浏览器：托管服务 {#graph-explorer-the-hosted-service}

最简单的方法是使用托管服务。按照[这里](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/)的说明部署子图。对于许多项目，你实际上可以在[浏览器](https://thegraph.com/explorer/)中找到现有的子图。

![The Graph-Explorer](./thegraph-explorer.png)

### 运行你自己的节点 {#running-your-own-node}

或者，你可以运行自己的节点。文档在[这里](https://github.com/graphprotocol/graph-node#quick-start)。这样做的一个原因可能是使用了托管服务不支持的网络。当前支持的网络可以[在这里找到](https://thegraph.com/docs/en/developing/supported-networks/)。

## 去中心化的未来 {#the-decentralized-future}

GraphQL 也支持针对新传入事件的流。这些在 The Graph 上通过目前处于公开测试阶段的 [Substreams](https://thegraph.com/docs/en/substreams/) 得到支持。

在 [2021](https://thegraph.com/blog/mainnet-migration/) 年，The Graph 开始向去中心化索引网络过渡。你可以[在这里](https://thegraph.com/docs/en/network/explorer/)阅读更多关于这个去中心化索引网络架构的信息。

两个关键方面是：

1. 用户向索引器支付查询费用。
2. 索引器质押 Graph 代币 (GRT)。