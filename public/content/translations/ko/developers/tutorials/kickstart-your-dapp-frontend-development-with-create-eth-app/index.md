---
title: create-eth-app으로 탈중앙화 애플리케이션 (dapp) 프론트엔드 개발 시작하기
description: create-eth-app 사용법 및 기능 개요
author: "마르쿠스 바스"
tags:
  ["프론트엔드", "javascript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: ko
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

지난번에는 [Solidity의 전반적인 그림](https://soliditydeveloper.com/solidity-overview-2020)을 살펴보았고, [create-eth-app](https://github.com/PaulRBerg/create-eth-app)에 대해서도 이미 언급했습니다. 이제 이 앱의 사용법, 통합된 기능, 그리고 이를 확장하는 방법에 대한 추가적인 아이디어를 알아보겠습니다. [Sablier](https://sablier.com/)의 창립자인 폴 라즈반 버그(Paul Razvan Berg)가 시작한 이 앱은 프론트엔드 개발을 빠르게 시작할 수 있도록 도와주며, 선택할 수 있는 몇 가지 선택적 통합 기능을 제공합니다.

## 설치 {#installation}

설치하려면 Yarn 0.25 이상(`npm install yarn --global`)이 필요합니다. 다음 명령어를 실행하기만 하면 됩니다.

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

내부적으로는 [create-react-app](https://github.com/facebook/create-react-app)을 사용합니다. 앱을 보려면 `http://localhost:3000/`를 엽니다. 프로덕션 환경에 배포할 준비가 되면 yarn build로 축소된 번들을 생성하세요. 이를 호스팅하는 쉬운 방법 중 하나는 [Netlify](https://www.netlify.com/)를 사용하는 것입니다. GitHub 리포지토리를 생성하고, Netlify에 추가한 다음, 빌드 명령어를 설정하면 모든 준비가 끝납니다! 앱이 호스팅되어 누구나 사용할 수 있게 됩니다. 게다가 이 모든 과정이 무료입니다.

## 기능 {#features}

### React 및 create-react-app {#react--create-react-app}

먼저 앱의 핵심인 React와 _create-react-app_에 포함된 모든 추가 기능입니다. 이더리움을 통합하고 싶지 않다면 이것만 사용하는 것도 훌륭한 선택입니다. [React](https://react.dev/) 자체는 대화형 UI를 매우 쉽게 구축할 수 있게 해줍니다. [Vue](https://vuejs.org/)만큼 초보자에게 친숙하지는 않을 수 있지만, 여전히 가장 많이 사용되고 더 많은 기능을 갖추고 있으며, 무엇보다도 선택할 수 있는 수천 개의 추가 라이브러리가 있습니다. _create-react-app_은 React를 매우 쉽게 시작할 수 있도록 해주며 다음을 포함합니다.

- React, JSX, ES6, TypeScript, Flow 구문 지원.
- 객체 전개 연산자(object spread operator)와 같은 ES6 이상의 추가 언어 기능.
- 자동 접두사가 붙는 CSS로, -webkit-이나 다른 접두사가 필요하지 않음.
- 커버리지 보고를 기본적으로 지원하는 빠르고 대화형인 단위 테스트 러너.
- 일반적인 실수에 대해 경고하는 실시간 개발 서버.
- 해시 및 소스 맵을 포함하여 프로덕션용 JS, CSS 및 이미지를 번들링하는 빌드 스크립트.

특히 _create-eth-app_은 새로운 [훅 효과(hooks effects)](https://legacy.reactjs.org/docs/hooks-effect.html)를 활용합니다. 이는 강력하면서도 매우 작은 이른바 함수형 컴포넌트를 작성하는 방법입니다. _create-eth-app_에서 이것이 어떻게 사용되는지는 아래의 Apollo 섹션을 참조하세요.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)를 사용하면 여러 패키지를 가질 수 있으면서도 루트 폴더에서 모두 관리하고 `yarn install`를 사용하여 한 번에 모든 종속성을 설치할 수 있습니다. 이는 스마트 컨트랙트 주소/ABI 관리(어떤 스마트 컨트랙트를 어디에 배포했고 어떻게 통신하는지에 대한 정보)나 그래프 통합과 같은 소규모 추가 패키지에 특히 유용하며, 두 가지 모두 `create-eth-app`의 일부입니다.

### ethers.js {#ethersjs}

여전히 [Web3](https://docs.web3js.org/)가 가장 많이 사용되지만, 작년부터 [ethers.js](https://docs.ethers.io/)가 대안으로 훨씬 더 많은 주목을 받고 있으며 _create-eth-app_에 통합되어 있습니다. 이를 그대로 사용하거나, Web3로 변경하거나, 베타 버전 종료가 임박한 [ethers.js v5](https://docs.ethers.org/v5/)로 업그레이드하는 것을 고려할 수 있습니다.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/)은 [Restful API](https://restfulapi.net/)와 비교하여 데이터를 처리하는 대안적인 방법입니다. 특히 탈중앙화된 블록체인 데이터의 경우 Restful API보다 몇 가지 장점이 있습니다. 그 이유에 관심이 있다면 [GraphQL이 탈중앙화 웹을 구동할 것이다(GraphQL Will Power the Decentralized Web)](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)를 살펴보세요.

일반적으로는 스마트 컨트랙트에서 직접 데이터를 가져옵니다. 최근 거래 시간을 읽고 싶으신가요? 이더리움 노드에서 탈중앙화 애플리케이션 (dapp)으로 데이터를 가져오는 `MyContract.methods.latestTradeTime().call()`를 호출하기만 하면 됩니다. 하지만 수백 개의 서로 다른 데이터 포인트가 필요하다면 어떨까요? 그러면 노드에서 수백 번의 데이터를 가져와야 하고, 매번 [RTT](https://wikipedia.org/wiki/Round-trip_delay_time)가 필요하여 탈중앙화 애플리케이션 (dapp)이 느려지고 비효율적이게 됩니다. 한 가지 해결책은 한 번에 여러 데이터를 반환하는 컨트랙트 내부의 페처(fetcher) 호출 함수일 수 있습니다. 하지만 이것이 항상 이상적인 것은 아닙니다.

그리고 과거 데이터에도 관심이 있을 수 있습니다. 마지막 거래 시간뿐만 아니라 본인이 직접 했던 모든 거래의 시간을 알고 싶을 것입니다. _create-eth-app_ 서브그래프 패키지를 사용하고, [문서](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph)를 읽고, 자신의 컨트랙트에 맞게 조정하세요. 인기 있는 스마트 컨트랙트를 찾고 있다면 이미 서브그래프가 있을 수도 있습니다. [서브그래프 탐색기](https://thegraph.com/explorer/)를 확인해 보세요.

서브그래프가 있으면 탈중앙화 애플리케이션 (dapp)에서 간단한 쿼리 하나만 작성하여 필요한 과거 데이터를 포함한 모든 중요한 블록체인 데이터를 단 한 번의 가져오기로 검색할 수 있습니다.

### Apollo {#apollo}

[Apollo Boost](https://www.apollographql.com/docs/react/get-started/) 통합 덕분에 React 탈중앙화 애플리케이션 (dapp)에 그래프를 쉽게 통합할 수 있습니다. 특히 [React 훅과 Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks)를 사용할 때, 데이터를 가져오는 것은 컴포넌트에 단일 GraphQL 쿼리를 작성하는 것만큼 간단합니다.

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## 템플릿 {#templates}

게다가 여러 가지 템플릿 중에서 선택할 수 있습니다. 현재까지는 에이브, Compound, 유니스왑 또는 Sablier 통합을 사용할 수 있습니다. 이들은 모두 미리 만들어진 서브그래프 통합과 함께 중요한 서비스 스마트 컨트랙트 주소를 추가합니다. `yarn create eth-app my-eth-app --with-template aave`와 같이 생성 명령어에 템플릿을 추가하기만 하면 됩니다.

### 에이브 {#aave}

[에이브](https://aave.com/)는 탈중앙화된 대출 시장입니다. 예금자는 수동적 수입을 얻기 위해 시장에 유동성을 제공하고, 차입자는 담보를 사용하여 대출을 받을 수 있습니다. 에이브의 독특한 기능 중 하나는 단일 트랜잭션 내에 대출금을 상환하기만 하면 담보 없이 돈을 빌릴 수 있는 [플래시 론](https://aave.com/docs/developers/flash-loans)입니다. 이는 예를 들어 차익 거래 시 추가 현금을 확보하는 데 유용할 수 있습니다.

이자를 얻을 수 있는 거래 토큰을 _aTokens_라고 합니다.

_create-eth-app_과 에이브를 통합하기로 선택하면 [서브그래프 통합](https://docs.aave.com/developers/getting-started/using-graphql)을 얻게 됩니다. 에이브는 The Graph를 사용하며, [롭스텐](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) 및 [메인넷](https://thegraph.com/explorer/subgraph/aave/protocol)에서 [원시(raw)](https://thegraph.com/explorer/subgraph/aave/protocol-raw) 또는 [포맷된(formatted)](https://thegraph.com/explorer/subgraph/aave/protocol) 형태로 바로 사용할 수 있는 여러 서브그래프를 이미 제공합니다.

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/)는 에이브와 유사합니다. 이 통합에는 이미 새로운 [Compound v2 서브그래프](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)가 포함되어 있습니다. 여기서 이자를 얻는 토큰은 놀랍게도 _cTokens_라고 불립니다.

### 유니스왑 {#uniswap}

[유니스왑](https://uniswap.exchange/)은 탈중앙화 거래소(DEX)입니다. 유동성 제공자는 거래의 양측에 필요한 토큰이나 이더를 제공하여 수수료를 얻을 수 있습니다. 널리 사용되고 있으므로 매우 다양한 토큰에 대해 가장 높은 유동성을 자랑합니다. 이를 탈중앙화 애플리케이션 (dapp)에 쉽게 통합하여, 예를 들어 사용자가 ETH를 DAI로 스왑할 수 있도록 할 수 있습니다.

안타깝게도 이 글을 쓰는 시점에서 통합은 유니스왑 v1에 대해서만 지원되며 [방금 출시된 v2](https://uniswap.org/blog/uniswap-v2/)는 지원하지 않습니다.

### Sablier {#sablier}

[Sablier](https://sablier.com/)는 사용자가 스트리밍 방식으로 자금을 결제할 수 있게 해줍니다. 단일 급여일 대신, 초기 설정 후 추가적인 관리 없이 지속적으로 돈을 받게 됩니다. 이 통합에는 [자체 서브그래프](https://thegraph.com/explorer/subgraph/sablierhq/sablier)가 포함되어 있습니다.

## 다음 단계 {#whats-next}

_create-eth-app_에 대한 질문이 있다면 [Sablier 커뮤니티 서버](https://discord.gg/bsS8T47)로 이동하여 _create-eth-app_의 작성자들과 연락할 수 있습니다. 첫 번째 다음 단계로 [Material UI](https://mui.com/material-ui/)와 같은 UI 프레임워크를 통합하고, 실제로 필요한 데이터에 대한 GraphQL 쿼리를 작성하며, 배포를 설정해 볼 수 있습니다.