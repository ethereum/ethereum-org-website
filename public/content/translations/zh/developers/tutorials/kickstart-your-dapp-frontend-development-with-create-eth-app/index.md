---
title: "使用 create-eth-app 启动去中心化应用程序前端开发"
description: "create-eth-app 的用法及其功能概述"
author: "Markus Waas"
tags: [ "前端", "javascript", "ethers.js", "the graph", "DeFi" ]
skill: beginner
lang: zh
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

上次我们探讨了 [Solidity 的宏观概况](https://soliditydeveloper.com/solidity-overview-2020)，并提到了 [create-eth-app](https://github.com/PaulRBerg/create-eth-app)。 现在，你将了解如何使用它，它集成了哪些功能以及如何对其进行扩展等内容。 这个应用程序由 [Sablier](http://sablier.com/) 创始人 Paul Razvan Berg 发起，将帮助你启动前端开发，并提供多种可选集成。

## 安装 {#installation}

安装需要 Yarn 0.25 或更高版本（`npm install yarn --global`）。 操作非常简单，只需运行：

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

它在底层使用了 [create-react-app](https://github.com/facebook/create-react-app)。 要查看你的应用程序，请打开 `http://localhost:3000/`。 当你准备好部署到生产环境中时，使用 yarn build 创建一个精简捆绑包。 一种简单的托管方法是 [Netlify](https://www.netlify.com/)。 你可以创建一个 GitHub 存储库，将其添加到 Netlify，设置构建命令，这样就完成了！ 你的应用程序将被托管并可供所有人使用。 所有这些都是免费的。

## 功能 {#features}

### React 和 create-react-app {#react--create-react-app}

首先，我们来了解应用程序的核心：React 和 _create-react-app_ 带来的所有附加功能。 如果你不想集成以太坊，那么仅使用它是一个很好的选择。 [React](https://react.dev/) 本身使构建交互式用户界面变得非常容易。 它可能不像 [Vue](https://vuejs.org/) 那样对初学者友好，但它仍是主流，功能更丰富，最重要的是有数以千计的附加程序库可供选择。 使用 _create-react-app_ 也很容易上手，其功能包括：

- React、JSX、ES6、TypeScript、Flow 语法支持。
- ES6 之外的语言附加功能，如对象展开运算符。
- 自动添加前缀的 CSS，所以你不需要 -webkit- 或其他前缀。
- 快速交互式单元测试运行程序，内置对覆盖率报告的支持。
- 对常见错误发出警告的实时开发服务器。
- 一个用于捆绑JS、CSS和图片的构建脚本，带有哈希值和源映射。

_create-eth-app_ 特别使用了新的 [effect hook](https://legacy.reactjs.org/docs/hooks-effect.html)。 一种编写功能强大但代码量很小的所谓函数式组件的方法。 要了解它们在 _create-eth-app_ 中的用法，请参阅下文关于 Apollo 的部分。

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) 允许多个包存在，同时能够从根目录管理所有这些包，并使用 `yarn install` 一次性为所有包安装依赖项。 这对于较小的附加包尤其有意义，例如智能合约地址/ABI 管理（关于你将哪个智能合约部署在何处以及如何与其通信的信息）或图谱集成，这两者都是 `create-eth-app` 的一部分。

### ethers.js {#ethersjs}

虽然 [Web3.js](https://docs.web3js.org/) 仍是主流，但 [ethers.js](https://docs.ethers.io/) 在去年作为替代方案获得了更多关注，并被集成到了 _create-eth-app_ 中。 你可以使用这个操作，将它更改为 Web3，或者考虑升级为 [ethers.js v5](https://docs.ethers.org/v5/)，该版本即将完成测试阶段。

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) 是与 [Restful API](https://restfulapi.net/) 相对应的一种处理数据的方式。 与 Restful 应用程序接口相比，它们有几个优势，特别是对于去中心化的区块链数据来说更是如此。 如果你对此背后的原因感兴趣，可以看看 [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)。

通常你会直接从你的智能合约中获取数据。 想要读取最新一笔交易的时间吗？ 只需调用 `MyContract.methods.latestTradeTime().call()`，它会从以太坊节点获取数据并传输到你的去中心化应用程序中。 但如果你需要数百个不同的数据点，该怎么办？ 这将导致在节点上进行数百次数据提取操作，每次都有[往返时延 (RTT)](https://wikipedia.org/wiki/Round-trip_delay_time)，使你的去中心化应用程序缓慢且效率低下。 一个变通方法可能是在你的合约中设置一个获取器调用函数，一次返回多个数据。 但这并不总是理想的。

然后你可能对历史数据也感兴趣。 你不仅想知道上次交易的时间，还想知道自己做过的所有交易的时间。 使用 _create-eth-app_ 子图包，阅读[相关文档](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph)并将其适配到你自己的合约。 如果你正在寻找受欢迎的智能合约，甚至可能已经有了一个子图。 查看[子图浏览器](https://thegraph.com/explorer/)

有了子图后，你可以在去中心化应用程序中编写一个简单的查询来检索所有重要的区块链数据，包括你需要的历史数据，并且只需一次提取操作即可。

### Apollo {#apollo}

借助 [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) 集成，你可以轻松地将子图集成到你的 React 去中心化应用程序中。 特别是在使用 [React hooks 和 Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) 时，获取数据就像在你的组件中写一个 GraphQl 查询一样简单：

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## 模板 {#templates}

在顶部，你可以从几个不同的模板中进行选择。 到目前为止，你可以使用 Aave、Compound、UniSwap 或 sablier 集成。 它们都增加了重要的服务智能合约地址以及预先制作的子图集成。 只需将模板添加到创建命令，例如 `yarn create eth-app my-eth-app --with-template aave`。

### Aave {#aave}

[Aave](https://aave.com/) 是一个去中心化的货币借贷市场。 存款人向市场提供流动性以赚取被动收入，而借款人则可以利用抵押品进行借贷。 Aave 的一个独特功能是[闪电贷](https://aave.com/docs/developers/flash-loans)，让你可以在没有任何抵押品的情况下借钱，只要你在一次交易中返还贷款即可。 例如，这对于在套利交易中为你提供额外的现金很有用。

为你赚取利息的交易代币被称为 _aTokens_。

当你选择将 Aave与 _create-eth-app_ 集成时，你将获得一个[子图集成](https://docs.aave.com/developers/getting-started/using-graphql)。 Aave 使用 The Graph，并已在 [Ropsten 测试网](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten)和[主网](https://thegraph.com/explorer/subgraph/aave/protocol)上以[原始](https://thegraph.com/explorer/subgraph/aave/protocol-raw)或[格式化](https://thegraph.com/explorer/subgraph/aave/protocol)形式为你提供多个即用型子图。

![Aave 闪电贷梗图 – “是啊，如果我的闪电贷能保留超过 1 笔交易，那就太好了”](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) 与 Aave 类似。 该集成已包含新的 [Compound v2 子图](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)。 令人惊讶的是，这里赚取利息的代币被称为 _cTokens_。

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) 是一个去中心化交易所 (DEX)。 流动性供应商可以通过为交易双方提供所需的代币或以太币来赚取费用。 它被广泛使用，因此在众多代币中拥有最高的流动性之一。 例如，你可以轻松地将其集成到你的去中心化应用程序中，让用户可以将他们的 ETH 兑换成 DAI。

遗憾的是，在撰写本文时，集成仅针对 Uniswap v1，而不是[刚刚发布的 v2](https://uniswap.org/blog/uniswap-v2/)。

### Sablier {#sablier}

[Sablier](https://sablier.com/) 允许用户进行流支付。 完成最初的设置后，你实际上是不断地得到你的货币，而不是在某个支付日，并且不需要进行进一步的管理。 该集成包含其[自己的子图](https://thegraph.com/explorer/subgraph/sablierhq/sablier)。

## 接下来该做什么？ {#whats-next}

如果你对 _create-eth-app_ 有任何疑问，请访问 [Sablier 社区服务器](https://discord.gg/bsS8T47)，在那里你可以与 _create-eth-app_ 的作者取得联系。 作为接下来的第一步，你可能希望集成一个 UI 框架，例如 [Material UI](https://mui.com/material-ui/)，为你实际需要的数据编写 GraphQL 查询并设置部署。
