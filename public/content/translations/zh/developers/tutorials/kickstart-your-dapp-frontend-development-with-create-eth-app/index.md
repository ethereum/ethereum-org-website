---
title: "使用 create-eth-app 快速启动你的去中心化应用 (dapp) 前端开发"
description: "概述如何使用 create-eth-app 及其功能"
author: "马库斯·瓦斯"
tags:
  ["前端", "JavaScript", "Ethers.js", "The Graph", "DeFi"]
skill: beginner
breadcrumb: create-eth-app
lang: zh
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

上次我们探讨了 [Solidity 的全局](https://soliditydeveloper.com/solidity-overview-2020)，并且已经提到了 [create-eth-app](https://github.com/PaulRBerg/create-eth-app)。现在你将了解如何使用它、它集成了哪些功能，以及关于如何扩展它的一些额外想法。这个应用由 [Sablier](https://sablier.com/) 创始人 Paul Razvan Berg 发起，它将快速启动你的前端开发，并附带几个可选的集成供你选择。

## 安装 {#installation}

安装需要 Yarn 0.25 或更高版本 (`npm install yarn --global`)。只需运行以下命令即可：

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

它在底层使用了 [create-react-app](https://github.com/facebook/create-react-app)。要查看你的应用，请打开 `http://localhost:3000/`。当你准备好部署到生产环境时，使用 yarn build 创建一个压缩包。托管它的一个简单方法是使用 [Netlify](https://www.netlify.com/)。你可以创建一个 GitHub 仓库，将其添加到 Netlify，设置构建命令，然后就大功告成了！你的应用将被托管并可供所有人使用。而且这一切都是免费的。

## 功能 {#features}

### React 与 create-react-app {#react--create-react-app}

首先是应用的核心：React 以及随 _create-react-app_ 提供的所有附加功能。如果你不想集成以太坊，仅使用它也是一个很好的选择。[React](https://react.dev/) 本身使得构建交互式用户界面变得非常容易。它可能不如 [Vue](https://vuejs.org/) 那样对初学者友好，但它仍然是使用最广泛的，拥有更多功能，最重要的是有数千个额外的库可供选择。_create-react-app_ 也使得上手变得非常容易，它包括：

- React、JSX、ES6、TypeScript、Flow 语法支持。
- 超越 ES6 的语言附加功能，如对象展开运算符。
- 自动添加前缀的 CSS，因此你不需要 -webkit- 或其他前缀。
- 一个快速的交互式单元测试运行器，内置对覆盖率报告的支持。
- 一个实时开发服务器，会针对常见错误发出警告。
- 一个构建脚本，用于为生产环境打包 JS、CSS 和图像，并带有哈希和源映射 (sourcemaps)。

_create-eth-app_ 特别利用了新的 [hooks effects](https://legacy.reactjs.org/docs/hooks-effect.html)。这是一种编写强大但非常小巧的所谓函数式组件的方法。请参阅下面关于 Apollo 的部分，了解它们在 _create-eth-app_ 中是如何使用的。

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) 允许你拥有多个包，但能够从根文件夹管理它们，并使用 `yarn install` 一次性为所有包安装依赖项。这对于较小的附加包特别有意义，例如智能合约地址/ABI 管理（关于你在哪里部署了哪些智能合约以及如何与它们通信的信息）或 The Graph 集成，这两者都是 `create-eth-app` 的一部分。

### Ethers.js {#ethersjs}

虽然 [Web3](https://docs.web3js.org/) 仍然是使用最广泛的，但 [Ethers.js](https://docs.ethers.io/) 作为一种替代方案在过去一年中获得了更多的关注，并且它被集成到了 _create-eth-app_ 中。你可以使用它，将其更改为 Web3，或者考虑升级到即将结束测试版的 [Ethers.js v5](https://docs.ethers.org/v5/)。

### The Graph {#the-graph}

与 [Restful API](https://restfulapi.net/) 相比，[GraphQL](https://graphql.org/) 是一种处理数据的替代方法。它们比 Restful API 有几个优势，特别是对于去中心化的区块链数据。如果你对这背后的原因感兴趣，请查看 [GraphQL 将为去中心化网络提供动力](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)。

通常你会直接从你的智能合约中获取数据。想要读取最新交易的时间？只需调用 `MyContract.methods.latestTradeTime().call()`，它就会从以太坊节点将数据获取到你的去中心化应用 (dapp) 中。但是如果你需要数百个不同的数据点怎么办？这将导致向节点进行数百次数据获取，每次都需要一个 [RTT](https://wikipedia.org/wiki/Round-trip_delay_time)，从而使你的 dapp 变得缓慢且低效。一种解决方法可能是在你的合约中编写一个获取器调用函数，一次返回多个数据。但这并不总是理想的。

然后你可能也会对历史数据感兴趣。你不仅想知道最后一次交易的时间，还想知道你自己做过的所有交易的时间。使用 _create-eth-app_ 子图包，阅读[文档](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph)并将其调整为适用于你自己的合约。如果你正在寻找流行的智能合约，甚至可能已经有一个子图了。查看[子图浏览器](https://thegraph.com/explorer/)。

一旦你有了子图，它就允许你在你的 dapp 中编写一个简单的查询，检索你需要的所有重要区块链数据（包括历史数据），只需要一次获取。

### Apollo {#apollo}

得益于 [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) 集成，你可以轻松地在你的 React dapp 中集成 The Graph。特别是在使用 [React hooks 和 Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) 时，获取数据就像在你的组件中编写一个 GraphQL 查询一样简单：

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## 模板 {#templates}

此外，你可以从几个不同的模板中进行选择。到目前为止，你可以使用 Aave、Compound、尤尼斯瓦普或 Sablier 集成。它们都添加了重要的服务智能合约地址以及预制的子图集成。只需将模板添加到创建命令中，例如 `yarn create eth-app my-eth-app --with-template aave`。

### Aave {#aave}

[Aave](https://aave.com/) 是一个去中心化的货币借贷市场。存款人向市场提供流动性以赚取被动收入，而借款人则能够使用抵押品进行借贷。Aave 的一个独特功能是那些[闪电贷](https://aave.com/docs/developers/flash-loans)，它允许你在没有任何抵押品的情况下借款，只要你在一次交易内偿还贷款即可。这可能很有用，例如在套利交易中为你提供额外的现金。

为你赚取利息的交易代币被称为 _aTokens_。

当你选择将 Aave 与 _create-eth-app_ 集成时，你将获得一个[子图集成](https://docs.aave.com/developers/getting-started/using-graphql)。Aave 使用 The Graph，并且已经在 [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) 和[主网](https://thegraph.com/explorer/subgraph/aave/protocol)上为你提供了几个现成的子图，有[原始](https://thegraph.com/explorer/subgraph/aave/protocol-raw)或[格式化](https://thegraph.com/explorer/subgraph/aave/protocol)的形式。

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) 与 Aave 类似。该集成已经包含了新的 [Compound v2 子图](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)。令人惊讶的是，这里赚取利息的代币被称为 _cTokens_。

### 尤尼斯瓦普 {#uniswap}

[尤尼斯瓦普](https://uniswap.exchange/)是一个去中心化交易所 (DEX)。流动性提供者可以通过为交易双方提供所需的代币或以太币来赚取费用。它被广泛使用，因此对于非常广泛的代币具有最高的流动性之一。你可以轻松地将其集成到你的 dapp 中，例如，允许用户将他们的 ETH 兑换为 DAI。

不幸的是，在撰写本文时，该集成仅适用于尤尼斯瓦普 v1，而不适用于[刚刚发布的 v2](https://uniswap.org/blog/uniswap-v2/)。

### Sablier {#sablier}

[Sablier](https://sablier.com/) 允许用户进行流式资金支付。与单一的发薪日不同，在初始设置之后，你实际上会不断地收到钱，而无需进一步的管理。该集成包括其[自己的子图](https://thegraph.com/explorer/subgraph/sablierhq/sablier)。

## 下一步是什么？ {#whats-next}

如果你对 _create-eth-app_ 有疑问，请访问 [Sablier 社区服务器](https://discord.gg/bsS8T47)，在那里你可以与 _create-eth-app_ 的作者取得联系。作为接下来的第一步，你可能想要集成一个 UI 框架（如 [Material UI](https://mui.com/material-ui/)），为你实际需要的数据编写 GraphQL 查询，并设置部署。