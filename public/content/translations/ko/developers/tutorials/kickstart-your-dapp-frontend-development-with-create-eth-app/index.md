---
title: create-eth-app으로 탈중앙화앱 프론트엔드 개발 시작하기
description: create-eth-app 사용 방법 및 기능 개요
author: "Markus Waas"
tags: [ "프론트엔드", "자바스크립트", "ethers.js", "the graph", "디파이" ]
skill: beginner
lang: ko
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

지난번에 우리는 [솔리디티의 큰 그림](https://soliditydeveloper.com/solidity-overview-2020)을 살펴보고 [create-eth-app](https://github.com/PaulRBerg/create-eth-app)에 대해 이미 언급했습니다. 이제부터 사용 방법, 통합된 기능, 그리고 이를 확장하기 위한 추가적인 아이디어에 대해 알아보겠습니다. [Sablier](http://sablier.com/)의 창립자인 Paul Razvan Berg가 시작한 이 앱은 프론트엔드 개발을 시작하는 데 도움을 주며, 선택할 수 있는 몇 가지 선택적 통합 기능을 제공합니다.

## 설치 {#installation}

설치를 위해서는 Yarn 0.25 이상이 필요합니다(`npm install yarn --global`). 다음과 같이 간단하게 실행할 수 있습니다:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

내부적으로 [create-react-app](https://github.com/facebook/create-react-app)을 사용합니다. 앱을 보려면 `http://localhost:3000/`을 여세요. 프로덕션에 배포할 준비가 되면, yarn build를 사용하여 축소된 번들을 생성하세요. 이를 호스팅하는 한 가지 쉬운 방법은 [Netlify](https://www.netlify.com/)입니다. GitHub 저장소를 만들고 Netlify에 추가한 다음 빌드 명령을 설정하면 끝입니다! 앱이 호스팅되어 모든 사람이 사용할 수 있게 됩니다. 이 모든 것이 무료입니다.

## 기능 {#features}

### React & create-react-app {#react--create-react-app}

무엇보다도 이 앱의 핵심은 React와 _create-react-app_이 제공하는 모든 추가 기능입니다. 이더리움을 통합하고 싶지 않다면 이것만 사용하는 것도 좋은 방법입니다. [React](https://react.dev/) 자체는 인터랙티브 UI를 정말 쉽게 구축할 수 있도록 해줍니다. [Vue](https://vuejs.org/)만큼 초보자에게 친숙하지는 않을 수 있지만, 여전히 가장 많이 사용되며 더 많은 기능을 갖추고 있으며, 무엇보다도 선택할 수 있는 수천 개의 추가 라이브러리가 있습니다. _create-react-app_은 시작을 정말 쉽게 만들어주며 다음을 포함합니다:

- React, JSX, ES6, TypeScript, Flow 구문 지원.
- 객체 전개 연산자와 같은 ES6 이상의 언어 추가 기능.
- 자동으로 접두사가 붙는 CSS이므로 -webkit- 또는 다른 접두사가 필요하지 않습니다.
- 커버리지 보고를 위한 내장 지원 기능이 있는 빠른 대화형 단위 테스트 실행기.
- 일반적인 실수에 대해 경고하는 라이브 개발 서버.
- 프로덕션을 위해 JS, CSS, 이미지를 해시 및 소스맵과 함께 번들로 묶는 빌드 스크립트.

특히 _create-eth-app_은 새로운 [훅 효과](https://legacy.reactjs.org/docs/hooks-effect.html)를 사용하고 있습니다. 강력하면서도 매우 작은 소위 함수형 컴포넌트를 작성하는 방법입니다. _create-eth-app_에서 어떻게 사용되는지에 대해서는 아래의 Apollo 섹션을 참조하세요.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)를 사용하면 여러 패키지를 가질 수 있지만, 루트 폴더에서 모든 패키지를 관리하고 `yarn install`을 사용하여 모든 종속성을 한 번에 설치할 수 있습니다. 이는 특히 스마트 계약 주소/ABI 관리(어떤 스마트 계약을 어디에 배포했는지, 그리고 어떻게 통신하는지에 대한 정보)나 그래프 통합과 같은 `create-eth-app`의 일부인 더 작은 추가 패키지에 특히 유용합니다.

### ethers.js {#ethersjs}

[Web3](https://docs.web3js.org/)가 여전히 주로 사용되지만, [ethers.js](https://docs.ethers.io/)는 지난 한 해 동안 대안으로 많은 주목을 받았으며 _create-eth-app_에 통합된 라이브러리입니다. 이것으로 작업하거나 Web3로 변경하거나 베타 테스트가 거의 끝난 [ethers.js v5](https://docs.ethers.org/v5/)로 업그레이드하는 것을 고려할 수 있습니다.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/)은 [Restful API](https://restfulapi.net/)에 비해 데이터를 처리하는 대안적인 방법입니다. Restful API에 비해 몇 가지 장점이 있으며, 특히 탈중앙화 블록체인 데이터에 유용합니다. 이러한 이유에 관심이 있다면 [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)을 살펴보세요.

일반적으로 스마트 계약에서 직접 데이터를 가져옵니다. 최신 거래 시간을 읽고 싶으신가요? 이더리움 노드에서 탈중앙화앱으로 데이터를 가져오는 `MyContract.methods.latestTradeTime().call()`을 호출하기만 하면 됩니다. 하지만 수백 개의 다른 데이터 포인트가 필요하다면 어떨까요? 이는 노드로 수백 번의 데이터 가져오기를 초래하며, 매번 [RTT](https://wikipedia.org/wiki/Round-trip_delay_time)가 필요하여 탈중앙화앱이 느리고 비효율적으로 됩니다. 한 가지 해결 방법은 계약 내에서 여러 데이터를 한 번에 반환하는 페처 호출 함수를 사용하는 것입니다. 하지만 이것이 항상 이상적인 것은 아닙니다.

그리고 과거 데이터에도 관심이 있을 수 있습니다. 마지막 거래 시간뿐만 아니라 직접 했던 모든 거래의 시간도 알고 싶을 것입니다. _create-eth-app_ 서브그래프 패키지를 사용하고, [문서](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph)를 읽고 자신의 계약에 맞게 수정하세요. 유명한 스마트 계약을 찾고 있다면 이미 서브그래프가 있을 수도 있습니다. [서브그래프 탐색기](https://thegraph.com/explorer/)를 확인해 보세요.

서브그래프가 있으면, 탈중앙화앱에서 필요한 과거 데이터를 포함한 모든 중요한 블록체인 데이터를 검색하는 간단한 쿼리 하나를 작성할 수 있으며, 한 번의 가져오기만 필요합니다.

### Apollo {#apollo}

[Apollo Boost](https://www.apollographql.com/docs/react/get-started/) 통합 덕분에 React 탈중앙화앱에 그래프를 쉽게 통합할 수 있습니다. 특히 [React 훅과 Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks)를 사용할 때, 데이터를 가져오는 것은 컴포넌트에 단일 GraphQL 쿼리를 작성하는 것만큼 간단합니다:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## 템플릿 {#templates}

게다가 여러 다른 템플릿 중에서 선택할 수 있습니다. 지금까지 Aave, Compound, UniSwap 또는 sablier 통합을 사용할 수 있습니다. 이들은 모두 미리 만들어진 서브그래프 통합과 함께 중요한 서비스 스마트 계약 주소를 추가합니다. `yarn create eth-app my-eth-app --with-template aave`와 같이 생성 명령어에 템플릿을 추가하기만 하면 됩니다.

### Aave {#aave}

[Aave](https://aave.com/)는 탈중앙화 대출 시장입니다. 예금자는 시장에 유동성을 공급하여 패시브 인컴을 얻고, 대출자는 담보를 사용하여 대출할 수 있습니다. Aave의 독특한 기능 중 하나는 [플래시 론](https://aave.com/docs/developers/flash-loans)으로, 하나의 트랜잭션 내에서 대출을 상환하는 한 담보 없이 돈을 빌릴 수 있습니다. 예를 들어, 이는 차익 거래 시 추가 현금을 확보하는 데 유용할 수 있습니다.

이자를 버는 거래 토큰을 _aToken_이라고 합니다.

_create-eth-app_에 Aave를 통합하도록 선택하면 [서브그래프 통합](https://docs.aave.com/developers/getting-started/using-graphql)을 얻게 됩니다. Aave는 The Graph를 사용하며 [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten)과 [메인넷](https://thegraph.com/explorer/subgraph/aave/protocol)에서 [원시(raw)](https://thegraph.com/explorer/subgraph/aave/protocol-raw) 또는 [형식이 지정된(formatted)](https://thegraph.com/explorer/subgraph/aave/protocol) 형태로 바로 사용할 수 있는 여러 서브그래프를 이미 제공합니다.

![Aave 플래시 론 밈 – "네, 플래시 론을 한 트랜잭션보다 오래 유지할 수 있다면 정말 좋겠네요"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/)는 Aave와 유사합니다. 이 통합에는 이미 새로운 [Compound v2 서브그래프](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)가 포함되어 있습니다. 여기서 이자를 버는 토큰은 놀랍게도 _cToken_이라고 불립니다.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/)은 탈중앙화 거래소(DEX)입니다. 유동성 공급자는 거래의 양쪽에 필요한 토큰이나 이더를 제공하여 수수료를 벌 수 있습니다. 이는 널리 사용되므로 매우 광범위한 토큰에 대해 가장 높은 유동성 중 하나를 가지고 있습니다. 예를 들어, 사용자가 ETH를 DAI로 교환할 수 있도록 탈중앙화앱에 쉽게 통합할 수 있습니다.

안타깝게도, 이 글을 쓰는 시점에서 이 통합은 Uniswap v1만을 위한 것이며, [막 출시된 v2](https://uniswap.org/blog/uniswap-v2/)는 지원하지 않습니다.

### Sablier {#sablier}

[Sablier](https://sablier.com/)는 사용자가 스트리밍 방식으로 자금을 결제할 수 있도록 합니다. 한 번의 월급날 대신, 초기 설정 후 추가적인 관리 없이 지속적으로 돈을 받을 수 있습니다. 이 통합에는 [자체 서브그래프](https://thegraph.com/explorer/subgraph/sablierhq/sablier)가 포함됩니다.

## 다음 단계는 무엇일까요? {#whats-next}

_create-eth-app_에 대해 질문이 있다면 [Sablier 커뮤니티 서버](https://discord.gg/bsS8T47)로 가서 _create-eth-app_의 저자들과 연락할 수 있습니다. 다음 초기 단계로 [Material UI](https://mui.com/material-ui/)와 같은 UI 프레임워크를 통합하고, 실제로 필요한 데이터에 대한 GraphQL 쿼리를 작성하고, 배포를 설정할 수 있습니다.
