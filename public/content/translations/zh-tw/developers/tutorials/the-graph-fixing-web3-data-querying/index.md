---
title: "The Graph：解決 Web3 資料查詢問題"
description: 區塊鏈就像一個沒有 SQL 的資料庫。所有資料都在那裡，但無法存取。讓我向你展示如何使用 The Graph 和 GraphQL 來解決這個問題。
author: 馬庫斯·瓦斯
lang: zh-tw
tags: ["solidity", "智能合約", "查詢", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

這次我們將深入探討 The Graph，它在過去一年中基本上已成為開發去中心化應用程式 (dapp) 的標準技術堆疊之一。讓我們先看看傳統上我們會怎麼做……

## 如果沒有 The Graph…… {#without-the-graph}

為了方便說明，我們來看一個簡單的例子。我們都喜歡遊戲，所以想像一個讓使用者下注的簡單遊戲：

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

現在假設在我們的 dapp 中，我們想要顯示總下注次數、輸贏的總場數，並且在有人再次遊玩時更新這些數據。做法將會是：

1. 獲取 `totalGamesPlayerWon`。
2. 獲取 `totalGamesPlayerLost`。
3. 訂閱 `BetPlaced` 事件。

如右圖所示，我們可以監聽 [Web3 中的事件](https://docs.web3js.org/api/web3/class/Contract#events)，但這需要處理相當多的情況。

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // 事件已觸發
})
.on('changed', function(event) {
    // 事件再次被移除
})
.on('error', function(error, receipt) {
    // 交易被拒絕
});
```

對於我們這個簡單的例子來說，這還算可以接受。但假設我們現在只想顯示目前玩家輸贏的下注金額。那我們就倒楣了，你最好部署一個新的合約來儲存並獲取這些值。現在想像一個複雜得多的智能合約和 dapp，情況很快就會變得一團糟。

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

你可以看出這並非最佳方案：

- 對已部署的合約無效。
- 儲存這些值需要額外的燃料 (gas) 成本。
- 需要對以太坊節點進行另一次呼叫來獲取資料。

![Thats not good enough](./not-good-enough.jpg)

現在讓我們來看一個更好的解決方案。

## 讓我向你介紹 GraphQL {#let-me-introduce-to-you-graphql}

首先我們來談談 GraphQL，它最初是由臉書 (Facebook) 設計和實作的。你可能對傳統的 REST API 模型很熟悉。現在想像一下，你可以精確地為你想要的資料撰寫查詢：

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

這兩張圖片幾乎捕捉了 GraphQL 的精髓。透過右邊的查詢，我們可以精確定義我們想要的資料，因此我們可以在一次請求中獲得所有內容，而且不多不少正是我們需要的。GraphQL 伺服器會處理所有所需資料的獲取，因此對於前端消費者來說非常容易使用。如果你有興趣，[這裡有一個很好的解釋](https://www.apollographql.com/blog/graphql-explained)，說明伺服器究竟是如何處理查詢的。

現在有了這些知識，讓我們終於進入區塊鏈領域和 The Graph。

## 什麼是 The Graph？ {#what-is-the-graph}

區塊鏈是一個去中心化的資料庫，但與通常情況相反，我們沒有用於這個資料庫的查詢語言。檢索資料的解決方案要麼令人痛苦，要麼完全不可能。The Graph 是一個用於索引和查詢區塊鏈資料的去中心化協定。你可能已經猜到了，它使用 GraphQL 作為查詢語言。

![The Graph](./thegraph.png)

範例總是理解事物的最佳方式，所以讓我們將 The Graph 用於我們的 GameContract 範例。

## 如何建立子圖 (Subgraph) {#how-to-create-a-subgraph}

定義如何索引資料的配置稱為子圖 (subgraph)。它需要三個元件：

1. 清單 (Manifest) (`subgraph.yaml`)
2. 結構描述 (Schema) (`schema.graphql`)
3. 映射 (Mapping) (`mapping.ts`)

### 清單 (Manifest) (`subgraph.yaml`) {#manifest}

清單是我們的設定檔，它定義了：

- 要索引哪些智能合約（地址、網路、ABI 等）
- 要監聽哪些事件
- 要監聽的其他事物，例如函式呼叫或區塊
- 被呼叫的映射函式（請參閱下方的 `mapping.ts`）

你可以在這裡定義多個合約和處理常式 (handler)。典型的設定是在 Hardhat 專案內有一個帶有自己儲存庫的 subgraph 資料夾。這樣你就可以輕鬆地參考 ABI。

為了方便起見，你可能還會想使用像 mustache 這樣的模板工具。然後你建立一個 `subgraph.template.yaml`，並根據最新的部署插入地址。如需更進階的範例設定，請參閱 [Aave 子圖儲存庫](https://github.com/aave/aave-protocol/tree/master/thegraph)。

完整的說明文件可以[在此](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)查看。

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

### 結構描述 (Schema) (`schema.graphql`) {#schema}

結構描述是 GraphQL 的資料定義。它將允許你定義存在哪些實體 (entities) 及其類型。The Graph 支援的類型有：

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

你也可以使用實體作為類型來定義關聯性。在我們的範例中，我們定義了從玩家到下注的一對多關聯。! 表示該值不能為空。完整的說明文件可以[在此](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)查看。

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

### 映射 (Mapping) (`mapping.ts`) {#mapping}

The Graph 中的映射檔定義了我們將傳入事件轉換為實體的函式。它是用 AssemblyScript（TypeScript 的一個子集）撰寫的。這意味著它可以被編譯成 WASM (WebAssembly)，以便更有效率且可攜地執行映射。

你需要定義在 `subgraph.yaml` 檔案中命名的每個函式，所以在我們的例子中只需要一個：`handleNewBet`。我們首先嘗試從發送者地址作為 id 來載入 Player 實體。如果它不存在，我們就建立一個新實體並填入初始值。

然後我們建立一個新的 Bet 實體。它的 id 將會是 `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`，以確保永遠是一個唯一值。僅使用雜湊 (hash) 是不夠的，因為有人可能會透過智能合約在一次交易中多次呼叫 placeBet 函式。

最後，我們可以使用所有資料來更新 Player 實體。陣列不能直接推送 (push)，而是需要如這裡所示進行更新。我們使用 id 來參考該次下注。最後需要 `.save()` 來儲存實體。

完整的說明文件可以在此查看：https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings。你也可以在映射檔中加入日誌輸出，請參閱[這裡](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference)。

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // 如果尚未存在則建立
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

  // 像這樣更新陣列
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## 在前端中使用 {#using-it-in-the-frontend}

使用像 Apollo Boost 這樣的工具，你可以輕鬆地將 The Graph 整合到你的 React dapp（或 Apollo-Vue）中。特別是在使用 React hooks 和 Apollo 時，獲取資料就像在你的元件中撰寫單一 GraphQL 查詢一樣簡單。典型的設定可能如下所示：

```javascript
// 查看所有子圖：https://thegraph.com/explorer/
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

現在我們可以撰寫例如這樣的查詢。這將為我們獲取：

- 目前使用者贏了多少次
- 目前使用者輸了多少次
- 包含他所有過往記錄的時間戳記清單

所有這些都在對 GraphQL 伺服器的單次請求中完成。

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

但我們還缺少最後一塊拼圖，那就是伺服器。你可以自己執行它，或者使用託管服務。

## The Graph 伺服器 {#the-graph-server}

### Graph 瀏覽器：託管服務 {#graph-explorer-the-hosted-service}

最簡單的方法是使用託管服務。按照[這裡](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/)的指示來部署子圖。對於許多專案，你實際上可以在[瀏覽器](https://thegraph.com/explorer/)中找到現有的子圖。

![The Graph-Explorer](./thegraph-explorer.png)

### 執行你自己的節點 {#running-your-own-node}

或者，你可以執行自己的節點。說明文件在[這裡](https://github.com/graphprotocol/graph-node#quick-start)。這樣做的一個原因可能是使用了託管服務不支援的網路。目前支援的網路可以[在這裡找到](https://thegraph.com/docs/en/developing/supported-networks/)。

## 去中心化的未來 {#the-decentralized-future}

GraphQL 也支援針對新傳入事件的串流 (streams)。The Graph 透過目前處於公開測試階段的 [Substreams](https://thegraph.com/docs/en/substreams/) 來支援這些功能。

在 [2021 年](https://thegraph.com/blog/mainnet-migration/)，The Graph 開始過渡到去中心化的索引網路。你可以[在此](https://thegraph.com/docs/en/network/explorer/)閱讀更多關於這個去中心化索引網路架構的資訊。

兩個關鍵方面是：

1. 使用者向索引器 (indexer) 支付查詢費用。
2. 索引器質押 Graph 代幣 (GRT)。