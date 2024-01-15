---
title: 使用 create-eth-app 启动去中心化应用程序前端开发
description: 如何使用 create-eth-app 及其功能的概述
author: "Markus Waas"
tags:
  - "create-eth-app"
  - "前端"
  - "javascript"
  - "ethers.js"
  - "图表"
  - "defi"
skill: beginner
lang: zh
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

上一次，我们了解 [Solidity](https://soliditydeveloper.com/solidity-overview-2020) 大的框架时，已经提到了 [create-eth-app](https://github.com/PaulRBerg/create-eth-app)。 现在，您将了解如何使用它，它集成了哪些功能以及如何对其进行扩展等内容。 这个应用程序由 [Sablier](http://sablier.com/)创始人 Paul Razvan Berg 启动，它将启动您的前端开发，并且具有多个可选集成供您选择。

## 安装 {#installation}

安装需要 Yarn 0.25 或更高版本 (`npm install yarn --global`)。 安装就像运行程序一样简单：

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

这是正后台使用 [create-react-app](https://github.com/facebook/create-react-app)。 要查看您的应用程序，请打开 `http://localhost:3000/`。 当您准备好部署到生产环境中时，使用 yarn build 创建一个缩小的捆绑包。 一个简单的托管它的方法是使用 [ Netlify](https://www.netlify.com/)。 您可以创建一个 GitHub 存储库，将其添加到 Netlify，设置构建命令，这样就完成了！ 您的应用程序将被托管并可供所有人使用。 所有这些都是免费的。

## 功能 {#features}

### React 和 create-react-app {#react--create-react-app}

首先，我们来了解应用程序的核心：React 和 _create-react-app_ 带来的所有附加功能。 如果您不想集成以太坊，那么仅使用它是一个很好的选择。 [React](https://reactjs.org/) 本身使构建交互式 UI 变得非常容易。 它可能不像 [Vue](https://vuejs.org/) 那样方便初学者，但仍然被广泛使用。 它具有更多的功能，最重要的是还有数千个附加库可供选择。 _create-react-app_ 也使它非常容易开始使用，具有的功能包括：

- React、JSX、ES6、TypeScript、Flow 语法支持。
- ES6 之外的语言附加功能，如对象扩展运算符。
- 自动添加前缀的 CSS，所以您不需要 -webkit- 或其他前缀。
- 快速交互式单元测试运行程序，内置对覆盖率报告的支持。
- 对常见错误发出警告的实时开发服务器。
- 一个用于捆绑 JS、CSS 和图片的构建脚本，带有哈希值和资源映射。

尤其是 _create-eth-app_ 正在使用新的 [hooks effect](https://reactjs.org/docs/hooks-effect.html)。 这是一种编写强大而又非常小巧的所谓功能组件的方法。 关于如何在 _create-eth-app_ 中使用 Apollo，请看下面关于 Apollo 的部分。

### Yarn Workspace {#yarn-workspaces}

[Yarn Workspace](https://classic.yarnpkg.com/en/docs/workspaces/)允许您拥有多个包， 但可以从根目录对他们进行管理，而且可以使用 `yarn install` 一次性安装所有依赖项。 这对于较小的附加包，例如智能合约地址/ABI 管理（关于您在哪里部署了哪些智能合约以及如何与它们通信的信息）或图集成等，尤其有意义，这两个包都是 `create-eth-app` 的一部分。

### ethers.js {#ethersjs}

虽然 [Web3](https://docs.web3js.org/) 仍被广泛使用，但 [ethers.js](https://docs.ethers.io/) 作为一种替代方案，在过去一年中获得了更多的关注，并且已集成到 _create-eth-app_ 中。 您可以使用这个操作，将它更改为 Web3，或者考虑升级为 [ethers.js v5](https://docs-beta.ethers.io/)，该版本即将完成测试阶段。

### 图表 {#the-graph}

与 [Restful API](https://restfulapi.net/) 相比，[GraphQL](https://graphql.org/) 是处理数据的另一种方式。 与 Restful Api 相比，它们有几个优势，特别是对于去中心化的区块链数据来说更是如此。 如果您对这背后的原因感兴趣，可以看看 [GraphQL 将为去中心化网络提供动力](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)。

通常您会直接从您的智能合约中获取数据。 想要读取上次交易的时间吗？ 只需调用 `MyContract.methods.latestTradeTime().call()`，它将数据从以太坊节点（如 Infura）提取到你的去中心化应用程序。 但如果您需要数百个不同的数据点，该怎么办？ 这将导致在节点上进行数百次数据提取操作，每次都有[往返延时](https://wikipedia.org/wiki/Round-trip_delay_time)，使你的去中心化应用程序缓慢且效率低下。 一个变通的办法是在您的合约中设置一个取数器调用函数，一次性返回多个数据。 但这并不总是理想的。

然后您可能对历史数据也感兴趣。 您不仅想知道上次交易的时间，还想知道自己做过的所有交易的时间。 使用 _create-eth-app_ 子图包，阅读[文档](https://thegraph.com/docs/define-a-subgraph)并使其适合您自己的合约。 如果您正在寻找受欢迎的智能合约，甚至可能已经有了一个子图。 可以查看[子图浏览器](https://thegraph.com/explorer/)。

有了子图后，你可以在去中心化应用程序中编写一个简单的查询来检索所有重要的区块链数据，包括你需要的历史数据，并且只需一次提取操作即可。

### Apollo {#apollo}

由于 [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) 集成，你可以轻松将图集成到 React 去中心化应用程序中。 特别是在使用 [React hooks 和 Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks-676d116eeae2) 时，获取数据就像在您的组件中写一个 GraphQl 查询一样简单：

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## 模板 {#templates}

在顶部，您可以从几个不同的模板中进行选择。 到目前为止，您可以使用 Aave、Comp、UniSwap 或 sablier 集成。 它们都增加了重要的服务智能合约地址以及预先制作的子图集成。 只需将模板添加到创建命令，例如 `yarn create eth-app my-eth-app --with-template aave`。

### Aave {#aave}

[Aave](https://aave.com/) 是一个去中心化的货币借贷市场。 存款人向市场提供流动性以赚取被动收入，而借款人则可以利用抵押物进行借贷。 Aave 的一个独特功能是那些[闪电贷](https://docs.aave.com/developers/guides/flash-loans)，让您可以在没有任何抵押品的情况下借钱，只要您在一次交易中返还贷款即可。 例如，这对于在套利交易中为您提供额外的现金很有用。

为您赢得利益的交易代币被称为 _aTokens_。

当您选择将 Aave 与 _create-eth-app_ 集成时，您将获得[子图集成](https://docs.aave.com/developers/getting-started/using-graphql)。 Aave 使用 The Graph，并且已经在 [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) 和 [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) 上以[原始](https://thegraph.com/explorer/subgraph/aave/protocol-raw)或[格式化](https://thegraph.com/explorer/subgraph/aave/protocol)形式为您提供了几个现成的子图。

![Aave 闪电贷备忘录 – “是啊，如果我的闪电贷可以保留超过 1 笔交易，那就太好了”](./flashloan-meme.png)

### Compound {#compound}

[ Compound ](https://compound.finance/) 类似于 Aave。 集成中已包含新的 [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)。 在这里，赚取利益的代币竟然被称为* cTokens*。

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) 是一个去中心化的交易所 (DEX)。 流动性供应商可以通过为交易双方提供所需的代币或以太币来赚取费用。 它正在被广泛使用，因此对于非常多的各种代币来说，它的流动性是最高的当中的一个。 例如，你可以轻松地将其集成到你的去中心化应用程序中，让用户可以将他们的以太币换成 DAI 币。

遗憾的是，在撰写本文时，集成仅针对 Uniswap v1，而不是 [刚刚发布的 v2](https://uniswap.org/blog/uniswap-v2/)。

### Sablier {#sablier}

[Sablier](https://sablier.com/) 允许用户进行流支付。 完成最初的设置后，您实际上是不断地得到您的货币，而不是在某个支付日，并且不需要进行进一步的管理。 该集成包含了它[自己的子图](https://thegraph.com/explorer/subgraph/sablierhq/sablier)。

## 接下来是什么？ {#whats-next}

如果您对 _create-eth-app_ 有任何疑问，请访问 [Sablier 社区服务器](https://discord.gg/bsS8T47)，在那里您可以与 _create-eth-app_ 的作者取得联系。 作为接下来的第一步，您可能希望集成一个 UI 框架，例如 [Material UI](https://material-ui.com/)，为您实际需要的数据编写 GraphQL 查询并设置部署。
