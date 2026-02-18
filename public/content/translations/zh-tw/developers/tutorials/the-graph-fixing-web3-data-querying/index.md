---
title: "The Graph：解決 Web3 資料查詢的問題"
description: "區塊鏈就像一個資料庫，但沒有 SQL。 所有資料都在那裡，但卻沒有方法可以存取。 讓我為您示範如何使用 The Graph 和 GraphQL 解決這個問題。"
author: Markus Waas
lang: zh-tw
tags: [ "solidity", "smart contracts", "querying", "the graph", "react" ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

這次，我們將深入探討 The Graph，它在去年已然成為開發去中心化應用程式 (dapp) 的標準技術堆疊之一。 讓我們先來看看傳統的做法......

## 不使用 The Graph...... {#without-the-graph}

為了方便說明，讓我們先看一個簡單的範例。 我們都喜歡玩遊戲，所以想像一下有個讓使用者可以下注的簡單遊戲：

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

現在假設在我們的去中心化應用程式中，我們想要顯示總下注次數、輸贏的總場次，並且在有玩家再次遊玩時更新這些資訊。 做法會是：

1. 擷取 `totalGamesPlayerWon`。
2. 擷取 `totalGamesPlayerLost`。
3. 訂閱 `BetPlaced` 事件。

我們可以如右方所示，在 Web3 中監聽 [事件](https://docs.web3js.org/api/web3/class/Contract#events)，但這需要處理好幾種情況。

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // 事件觸發
})
.on('changed', function(event) {
    // 事件再次被移除
})
.on('error', function(error, receipt) {
    // 交易被拒絕
});
```

就我們這個簡單的範例而言，這樣做還算可以。 但假設我們現在只想顯示當前玩家輸/贏的下注總額。 這樣的話我們就沒輒了，你最好部署一份新合約來儲存並擷取那些數值。 現在想像一下更複雜的智能合約和去中心化應用程式，情況很快就會變得一團亂。

![可不是簡簡單單就能查詢的](./one-does-not-simply-query.jpg)

你可以看到為何這不是最佳做法：

- 對已經部署的合約不管用。
- 儲存這些數值會產生額外的 gas 費用。
- 需要另一次呼叫才能從以太坊節點擷取資料。

![那樣不夠好](./not-good-enough.jpg)

現在讓我們來看看一個更好的解決方案。

## 為您介紹 GraphQL {#let-me-introduce-to-you-graphql}

首先我們來談談 GraphQL，它最初是由 Facebook 設計和實作的。 您可能熟悉傳統的 REST API 模型。 現在，想像一下，您可以編寫一個查詢，精準地取得您想要的資料：

![GraphQL API 與 REST API 的比較](./graphql.jpg)

![](./graphql-query.gif)

這兩張圖幾乎掌握了 GraphQL 的精髓。 透過右方的查詢，我們可以精確定義我們想要的資料，因此我們可以在一次請求中得到所有東西，而且不多不少，正好是我們需要的。 GraphQL 伺服器會處理所有必要資料的擷取，因此對於前端取用方來說，使用上非常簡單。 如果您有興趣，可以[在這裡](https://www.apollographql.com/blog/graphql-explained)找到關於伺服器如何處理查詢的詳細說明。

了解了這些知識之後，讓我們終於可以進入區塊鏈領域和 The Graph 的世界了。

## 什麼是 The Graph？ {#what-is-the-graph}

區塊鏈是一種去中心化資料庫，但與通常情況不同的是，我們沒有用於此資料庫的查詢語言。 檢索資料的解決方案既痛苦又或者完全不可能。 The Graph 是一種用於索引和查詢區塊鏈資料的去中心化協定。 您可能已經猜到了，它使用 GraphQL 作為查詢語言。

![The Graph](./thegraph.png)

範例永遠是理解事物的最好方法，所以讓我們在 `GameContract` 範例中使用 The Graph。

## 如何建立子圖 {#how-to-create-a-subgraph}

關於如何索引資料的定義被稱為「子圖」。 它需要三個元件：

1. 資訊清單 (`subgraph.yaml`)
2. 結構 (`schema.graphql`)
3. 映射 (`mapping.ts`)

### 資訊清單 (`subgraph.yaml`) {#manifest}

資訊清單是我們的設定檔，它定義了：

- 要索引哪些智能合約（位址、網路、ABI......）
- 要監聽哪些事件
- 其他要監聽的東西，例如函式呼叫或區塊
- 被呼叫的映射函式（請見下方的 `mapping.ts`）

您可以在這裡定義多個合約和處理常式。 一個典型的設定，會在 Hardhat 專案中，有一個 subgraph 資料夾，並有自己的儲存庫。 然後您就可以輕易地引用 ABI。

為了方便起見，您可能也會想使用像是 mustache 這樣的樣板工具。 然後您可以建立一個 `subgraph.template.yaml`，並根據最新的部署插入位址。 如需更進階的設定範例，請參考 [Aave 子圖儲存庫](https://github.com/aave/aave-protocol/tree/master/thegraph)。

完整的說明文件可以在[這裡](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)查看。

```yaml
specVersion: 0.0.1
description: 在以太坊上下注
repository: - GitHub 連結 -
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

### 結構 (`schema.graphql`) {#schema}

結構是 GraphQL 的資料定義。 它能讓您定義有哪些實體存在及其型別。 The Graph 支援的型別有

- 位元組
- ID
- 字串
- 布林值
- 整數
- 大整數
- 大十進位數

您也可以使用實體作為型別來定義關聯。 在我們的範例中，我們定義了從玩家到下注的一對多關聯。 驚嘆號 (`!`)  代表該值不可為空。 完整的說明文件可以在[這裡](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)查看。

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

The Graph 中的映射檔案定義了我們的函式，用以將傳入的事件轉換為實體。 它以 AssemblyScript（Typescript 的一個子集）撰寫。 這代表它可以被編譯成 WASM (WebAssembly)，讓映射的執行更有效率且具可攜性。

您將需要定義 `subgraph.yaml` 檔案中命名的每個函式，所以在我們的例子中，我們只需要一個：`handleNewBet`。 我們首先嘗試從傳送者位址載入 Player 實體作為 ID。 如果它不存在，我們就建立一個新的實體，並填入初始值。

然後我們建立一個新的 Bet 實體。 這個實體的 ID 會是 `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`，以確保其值永遠是唯一的。 只使用哈希是不夠的，因為有人可能會透過一份智能合約，在單一筆交易中多次呼叫 `placeBet` 函式。

最後，我們可以用所有資料來更新 Player 實體。 陣列無法直接推送，而需要如此處所示來更新。 我們使用 ID 來引用該筆下注。 最後需要使用 `.save()` 來儲存實體。

完整的說明文件可以在這裡查看：https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings。 您也可以在映射檔案中加入紀錄輸出，請見[這裡](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference)。

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // 如果還不存在就建立
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

## 在前端使用 {#using-it-in-the-frontend}

使用像是 Apollo Boost 的工具，您可以輕易地將 The Graph 整合進您的 React 去中心化應用程式（或 Apollo-Vue）。 特別是使用 React hooks 和 Apollo 時，擷取資料就跟在您的元件中寫一個 GraphQL 查詢一樣簡單。 一個典型的設定可能像這樣：

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

現在我們就可以寫一個像這樣的查詢。 這樣我們就能擷取到

- 目前使用者贏了幾次
- 目前使用者輸了幾次
- 所有先前下注的時間戳清單

全部都在對 GraphQL 伺服器的一次請求中完成。

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

![魔法](./magic.jpg)

但我們還缺最後一塊拼圖，那就是伺服器。 您可以自行執行，或使用託管服務。

## The Graph 伺服器 {#the-graph-server}

### Graph Explorer：託管服務 {#graph-explorer-the-hosted-service}

最簡單的方法是使用託管服務。 請遵循[這裡](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/)的指示來部署子圖。 對於許多專案，您其實可以在 [explorer](https://thegraph.com/explorer/) 中找到現有的子圖。

![The Graph Explorer](./thegraph-explorer.png)

### 執行你自己的節點 {#running-your-own-node}

或者，您也可以執行您自己的節點。 文件在[這裡](https://github.com/graphprotocol/graph-node#quick-start)。 這樣做的一個原因可能是，您使用的網路不受託管服務支援。 目前支援的網路[可在此處找到](https://thegraph.com/docs/en/developing/supported-networks/)。

## 去中心化的未來 {#the-decentralized-future}

GraphQL 也支援用於新傳入事件的串流。 The Graph 透過 [Substreams](https://thegraph.com/docs/en/substreams/) 支援這些功能，目前正在公開測試中。

在 [2021 年](https://thegraph.com/blog/mainnet-migration/)，The Graph 開始轉型為去中心化索引網路。 您可以在[此處](https://thegraph.com/docs/en/network/explorer/)閱讀更多關於此去中心化索引網路的架構。

兩個關鍵面向是：

1. 使用者為查詢向索引者付費。
2. 索引者質押 Graph 代幣 (GRT)。
