---
title: "使用 create-eth-app 啟動你的去中心化應用程式 (dapp) 前端開發"
description: "create-eth-app 的使用方法及其功能概述"
author: "馬庫斯·瓦斯"
tags:
  - 前端
  - javascript
  - ethers.js
  - the graph
  - defi
skill: beginner
breadcrumb: create-eth-app
lang: zh-tw
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

上次我們探討了 [Solidity 的全貌](https://soliditydeveloper.com/solidity-overview-2020)，並且已經提到了 [create-eth-app](https://github.com/PaulRBerg/create-eth-app)。現在你將了解如何使用它、整合了哪些功能，以及如何擴展它的其他想法。這個應用程式由 [Sablier](https://sablier.com/) 的創辦人 Paul Razvan Berg 發起，將啟動你的前端開發，並提供多個可選的整合方案供你選擇。

## 安裝 {#installation}

安裝需要 Yarn 0.25 或更高版本 (`npm install yarn --global`)。只需執行以下命令即可：

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

它在底層使用了 [create-react-app](https://github.com/facebook/create-react-app)。要查看你的應用程式，請開啟 `http://localhost:3000/`。當你準備好部署到正式環境時，請使用 `yarn build` 建立一個壓縮的套件。一個簡單的託管方式是使用 [Netlify](https://www.netlify.com/)。你可以建立一個 GitHub 儲存庫，將其新增至 Netlify，設定建置命令，這樣就完成了！你的應用程式將被託管並可供所有人使用。而且這一切都是免費的。

## 功能 {#features}

### React 與 create-react-app {#react--create-react-app}

首先是應用程式的核心：React 以及 _create-react-app_ 隨附的所有附加功能。如果你不想整合以太坊，僅使用這個也是一個很好的選擇。[React](https://react.dev/) 本身讓建立互動式使用者介面變得非常容易。它可能不像 [Vue](https://vuejs.org/) 那樣對初學者友善，但它仍然是最常被使用的，擁有更多功能，最重要的是有數千個額外的函式庫可供選擇。_create-react-app_ 也讓入門變得非常容易，並包含：

- 支援 React、JSX、ES6、TypeScript 和 Flow 語法。
- 超越 ES6 的額外語言功能，例如物件展開運算子。
- 自動加上前綴的 CSS，因此你不需要 `-webkit-` 或其他前綴。
- 快速的互動式單元測試執行器，內建支援覆蓋率報告。
- 即時開發伺服器，會針對常見錯誤發出警告。
- 用於將 JS、CSS 和圖片打包至正式環境的建置腳本，包含雜湊值和來源對應。

_create-eth-app_ 特別使用了新的 [hooks effects](https://legacy.reactjs.org/docs/hooks-effect.html)。這是一種編寫強大但非常小巧的所謂函數式元件的方法。請參閱下方關於 Apollo 的章節，了解它們在 _create-eth-app_ 中是如何被使用的。

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) 允許你擁有多個套件，但能夠從根資料夾管理它們，並使用 `yarn install` 一次為所有套件安裝相依性。這對於較小的附加套件特別有意義，例如智能合約地址/ABI 管理（關於你在哪裡部署了哪些智能合約以及如何與它們通訊的資訊）或 The Graph 整合，兩者都是 `create-eth-app` 的一部分。

### ethers.js {#ethersjs}

雖然 [Web3](https://docs.web3js.org/) 仍然是最常被使用的，但 [ethers.js](https://docs.ethers.io/) 作為替代方案在過去一年中獲得了更多的關注，並且是整合到 _create-eth-app_ 中的那一個。你可以使用它、將其更改為 Web3，或者考慮升級到即將結束測試版的 [ethers.js v5](https://docs.ethers.org/v5/)。

### The Graph {#the-graph}

與 [Restful API](https://restfulapi.net/) 相比，[GraphQL](https://graphql.org/) 是一種處理資料的替代方式。它們比 Restful API 有幾個優勢，特別是對於去中心化的區塊鏈資料。如果你對這背後的原因感興趣，請查看 [GraphQL 將推動去中心化網路](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)。

通常你會直接從你的智能合約中擷取資料。想要讀取最新交易的時間嗎？只需呼叫 `MyContract.methods.latestTradeTime().call()`，它就會從以太坊節點將資料擷取到你的去中心化應用程式 (dapp) 中。但如果你需要數百個不同的資料點呢？這將導致對節點進行數百次資料擷取，每次都需要一個 [RTT](https://wikipedia.org/wiki/Round-trip_delay_time)，使你的 dapp 變得緩慢且效率低下。一個解決方法可能是在你的合約中建立一個擷取器呼叫函式，一次回傳多筆資料。不過這並不總是理想的。

然後你可能也會對歷史資料感興趣。你不僅想知道最後一次交易的時間，還想知道你自己做過的所有交易的時間。使用 _create-eth-app_ 的子圖套件，閱讀[文件](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph)並將其調整為適用於你自己的合約。如果你正在尋找熱門的智能合約，甚至可能已經有一個子圖了。查看[子圖瀏覽器](https://thegraph.com/explorer/)。

一旦你有了子圖，它允許你在你的 dapp 中編寫一個簡單的查詢，擷取你需要的所有重要區塊鏈資料（包括歷史資料），只需要一次擷取。

### Apollo {#apollo}

感謝 [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) 的整合，你可以輕鬆地將 The Graph 整合到你的 React dapp 中。特別是當使用 [React hooks 和 Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) 時，擷取資料就像在你的元件中編寫單個 GraphQL 查詢一樣簡單：

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## 範本 {#templates}

此外，你可以從幾個不同的範本中進行選擇。到目前為止，你可以使用 Aave、Compound、尤尼斯瓦普或 Sablier 的整合。它們都加入了重要的服務智能合約地址以及預先製作的子圖整合。只需將範本新增至建立命令中，例如 `yarn create eth-app my-eth-app --with-template aave`。

### Aave {#aave}

[Aave](https://aave.com/) 是一個去中心化的貨幣借貸市場。存款人向市場提供流動性以賺取被動收入，而借款人則能夠使用抵押品進行借貸。Aave 的一個獨特功能是那些[閃電貸](https://aave.com/docs/developers/flash-loans)，它允許你在沒有任何抵押品的情況下借錢，只要你在同一筆交易內償還貸款即可。這可能很有用，例如在套利交易中為你提供額外的現金。

為你賺取利息的交易代幣被稱為 _aTokens_。

當你選擇將 Aave 與 _create-eth-app_ 整合時，你將獲得一個[子圖整合](https://docs.aave.com/developers/getting-started/using-graphql)。Aave 使用 The Graph，並且已經在 [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) 和[主網](https://thegraph.com/explorer/subgraph/aave/protocol)上為你提供了幾個現成的子圖，有[原始](https://thegraph.com/explorer/subgraph/aave/protocol-raw)或[格式化](https://thegraph.com/explorer/subgraph/aave/protocol)的形式。

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) 類似於 Aave。該整合已經包含了新的 [Compound v2 子圖](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)。令人驚訝的是，這裡賺取利息的代幣被稱為 _cTokens_。

### 尤尼斯瓦普 {#uniswap}

[尤尼斯瓦普](https://uniswap.exchange/)是一個去中心化交易所 (DEX)。流動性提供者可以透過為交易雙方提供所需的代幣或以太幣來賺取手續費。它被廣泛使用，因此對於非常廣泛的代幣具有最高的流動性之一。你可以輕鬆地將其整合到你的 dapp 中，例如，允許使用者將他們的 ETH 兌換為 DAI。

不幸的是，在撰寫本文時，該整合僅適用於尤尼斯瓦普 v1，而不適用於[剛發布的 v2](https://uniswap.org/blog/uniswap-v2/)。

### Sablier {#sablier}

[Sablier](https://sablier.com/) 允許使用者進行串流資金支付。與單一發薪日不同，在初始設定之後，你實際上會持續不斷地收到資金，而無需進一步的管理。該整合包含了它[自己的子圖](https://thegraph.com/explorer/subgraph/sablierhq/sablier)。

## 下一步是什麼？ {#whats-next}

如果你對 _create-eth-app_ 有任何疑問，請前往 [Sablier 社群伺服器](https://discord.gg/bsS8T47)，在那裡你可以與 _create-eth-app_ 的作者取得聯繫。作為接下來的第一步，你可能想要整合一個像 [Material UI](https://mui.com/material-ui/) 這樣的使用者介面框架，為你實際需要的資料編寫 GraphQL 查詢，並設定部署。