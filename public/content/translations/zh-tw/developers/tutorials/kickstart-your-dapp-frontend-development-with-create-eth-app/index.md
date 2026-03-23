---
title: "使用 create-eth-app 快速啟動您的去中心化應用程式前端開發"
description: "create-eth-app 使用方法及其功能概覽"
author: "Markus Waas"
tags: [ "frontend", "javascript", "ethers.js", "the graph", "defi" ]
skill: beginner
lang: zh-tw
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

上次我們看過了 [Solidity 的整體概況](https://soliditydeveloper.com/solidity-overview-2020)，並且已經提到了 [create-eth-app](https://github.com/PaulRBerg/create-eth-app)。 現在您將了解如何使用它、整合了哪些功能，以及關於如何擴展它的額外想法。 此應用程式由 [Sablier](http://sablier.com/) 的創辦人 Paul Razvan Berg 發起，它能快速啟動您的前端開發，並提供數個可選的整合選項。

## 安裝 {#installation}

安裝需要 Yarn 0.25 或更高版本 (`npm install yarn --global`)。 執行方法很簡單：

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

它在底層使用 [create-react-app](https://github.com/facebook/create-react-app)。 若要檢視您的應用程式，請開啟 `http://localhost:3000/`。 當您準備好部署到生產環境時，請使用 yarn build 建立一個最小化的套件。 一個簡單的託管方法是使用 [Netlify](https://www.netlify.com/)。 您可以建立一個 GitHub repo，將其新增至 Netlify，設定建置指令，就完成了！ 您的應用程式將會被託管，且所有人都能使用。 而且完全免費。

## 功能 {#features}

### React & create-react-app {#react--create-react-app}

首先是此應用程式的核心：React 以及 _create-react-app_ 附帶的所有額外功能。 如果您不想整合以太坊，只使用這個也是個絕佳的選擇。 [React](https://react.dev/) 本身讓建置互動式使用者介面 (UI) 變得非常簡單。 它可能不像 [Vue](https://vuejs.org/) 那樣對初學者友善，但它仍然是主流，擁有更多功能，而且最重要的是有數以千計的額外函式庫可供選擇。 _create-react-app_ 同樣讓入門變得非常簡單，它包含：

- 支援 React、JSX、ES6、TypeScript 和 Flow 語法。
- ES6 以外的額外語言功能，例如物件展開運算子。
- 自動加上前綴的 CSS，所以您不需要 -webkit- 或其他前綴。
- 一個快速的互動式單元測試執行器，內建支援覆蓋率報告。
- 一個即時開發伺服器，會對常見錯誤發出警告。
- 一個建置腳本，可將 JS、CSS 和圖片打包用於生產，並附有哈希和來源對應檔。

特別是 _create-eth-app_ 利用了新的 [Hook 特效](https://legacy.reactjs.org/docs/hooks-effect.html)。 這是一種撰寫功能強大但體積極小的所謂「函式元件」的方法。 請參閱下文關於 Apollo 的章節，以了解它們在 _create-eth-app_ 中的使用方式。

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) 讓您擁有多個套件，但能夠從根目錄管理所有套件，並使用 `yarn install` 一次為所有套件安裝依賴項。 這對於像智慧合約地址/ABI 管理 (關於您部署了哪些智慧合約以及如何與它們通訊的資訊) 或 The Graph 整合等較小的附加套件特別有意義，這兩者都是 `create-eth-app` 的一部分。

### ethers.js {#ethersjs}

雖然 [Web3](https://docs.web3js.org/) 仍是主流，但 [ethers.js](https://docs.ethers.io/) 在去年作為替代方案獲得了更多關注，並且是整合到 _create-eth-app_ 中的函式庫。 您可以使用這個函式庫，也可以將其更換為 Web3，或考慮升級到幾乎脫離測試版的 [ethers.js v5](https://docs.ethers.org/v5/)。

### The Graph {#the-graph}

與 [RESTful API](https://restfulapi.net/) 相比，[GraphQL](https://graphql.org/) 是另一種處理資料的方式。 與 RESTful API 相比，它們有幾個優勢，特別是對於去中心化區塊鏈資料而言。 如果您對這背後的原因感興趣，可以看看 [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)。

通常，您會直接從您的智慧合約中獲取資料。 想要讀取最新一筆交易的時間嗎？ 只需呼叫 `MyContract.methods.latestTradeTime().call()`，它會從一個以太坊節點將資料擷取到您的去中心化應用程式中。 但如果您需要數百個不同的資料點呢？ 這將導致對節點進行數百次的資料擷取，每次都需要一次 [往返時延 (RTT)](https://wikipedia.org/wiki/Round-trip_delay_time)，從而使您的去中心化應用程式變得緩慢且效率低下。 一個變通方法可能是在您的合約內部設置一個擷取器呼叫函式，一次傳回多筆資料。 不過，這並非總是理想的解決方案。

此外，您可能也會對歷史資料感興趣。 您不僅想知道最後一次交易的時間，還想知道您自己進行過的所有交易的時間。 使用 _create-eth-app_ 的子圖套件，閱讀 [文件](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) 並將其應用於您自己的合約。 如果您正在尋找熱門的智慧合約，甚至可能已經有現成的子圖了。 查看 [子圖瀏覽器](https://thegraph.com/explorer/)。

一旦您有了子圖，您就可以在您的去中心化應用程式中編寫一個簡單的查詢，以擷取所有您需要的重要的區塊鏈資料，包括歷史資料，而只需要一次擷取。

### Apollo {#apollo}

多虧了 [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) 整合，您可以輕鬆地將 The Graph 整合到您的 React 去中心化應用程式中。 特別是當使用 [React Hook 和 Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) 時，擷取資料就像在您的元件中編寫單一 GraphQL 查詢一樣簡單：

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## 範本 {#templates}

此外，您可以從數個不同的範本中進行選擇。 目前，您可以使用 Aave、Compound、UniSwap 或 Sablier 整合。 它們都添加了重要的服務智慧合約地址以及預製的子圖整合。 只需將範本添加到創建指令中即可，例如 `yarn create eth-app my-eth-app --with-template aave`。

### Aave {#aave}

[Aave](https://aave.com/) 是一個去中心化的貨幣借貸市場。 存款人向市場提供流動性以賺取被動收入，而借款人則能夠使用抵押品進行借款。 Aave 的一個獨特功能是 [閃電貸](https://aave.com/docs/developers/flash-loans)，它允許您在沒有任何抵押品的情況下借款，只要您在單一交易內歸還貸款即可。 這在某些情況下可能很有用，例如在進行套利交易時為您提供額外現金。

可以賺取利息的交易代幣稱為 _aTokens_。

當您選擇將 Aave 與 _create-eth-app_ 整合時，您將獲得一個 [子圖整合](https://docs.aave.com/developers/getting-started/using-graphql)。 Aave 使用 The Graph，並已在 [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) 和 [主網](https://thegraph.com/explorer/subgraph/aave/protocol)上以 [原始](https://thegraph.com/explorer/subgraph/aave/protocol-raw) 或 [格式化](https://thegraph.com/explorer/subgraph/aave/protocol) 形式為您提供了數個即用型子圖。

![Aave 閃電貸迷因 – "是啊，如果我的閃電貸能維持超過 1 筆交易，那就太棒了"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) 與 Aave 類似。 該整合已經包含了新的 [Compound v2 子圖](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)。 可想而知，這裡賺取利息的代幣稱為 _cTokens_。

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) 是一個去中心化交易所 (DEX)。 流動性提供者可以透過為交易雙方提供所需的代幣或以太幣來賺取費用。 它被廣泛使用，因此在眾多代幣中擁有最高的流動性之一。 您可以輕鬆地將其整合到您的去中心化應用程式中，例如，允許使用者將他們的 ETH 兌換成 DAI。

可惜的是，在撰寫本文時，該整合僅適用於 Uniswap v1，而不適用於 [剛發布的 v2](https://uniswap.org/blog/uniswap-v2/)。

### Sablier {#sablier}

[Sablier](https://sablier.com/) 允許使用者進行串流式金錢支付。 在初始設定後，您實際上可以持續收到款項，而無需進一步管理，而不是一次性的發薪日。 該整合包含了它 [自己的子圖](https://thegraph.com/explorer/subgraph/sablierhq/sablier)。

## 下一步？ {#whats-next}

如果您對 _create-eth-app_ 有任何疑問，請前往 [Sablier 社群伺服器](https://discord.gg/bsS8T47)，您可以在那裡與 _create-eth-app_ 的作者聯繫。 作為接下來的初步步驟，您可能需要整合一個 UI 框架，如 [Material UI](https://mui.com/material-ui/)，為您實際需要的資料編寫 GraphQL 查詢，並設定部署。
