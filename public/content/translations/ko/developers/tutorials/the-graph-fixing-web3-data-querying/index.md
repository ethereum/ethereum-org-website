---
title: "The Graph: Web3 데이터 쿼리 문제 해결하기"
description: 블록체인은 SQL이 없는 데이터베이스와 같습니다. 모든 데이터가 존재하지만 접근할 방법이 없습니다. The Graph와 GraphQL을 사용하여 이 문제를 해결하는 방법을 보여드리겠습니다.
author: 마르쿠스 바스
lang: ko
tags: ["solidity", "스마트 컨트랙트", "쿼리", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

이번에는 작년부터 탈중앙화 애플리케이션 (dapp) 개발을 위한 표준 스택의 일부로 자리 잡은 The Graph에 대해 자세히 살펴보겠습니다. 먼저 전통적인 방식으로는 어떻게 처리했는지 알아보겠습니다...

## The Graph가 없다면... {#without-the-graph}

이해를 돕기 위해 간단한 예시를 들어보겠습니다. 우리 모두 게임을 좋아하므로, 사용자가 베팅을 하는 간단한 게임을 상상해 보세요.

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

이제 우리의 dapp에서 총 베팅 횟수, 승패가 결정된 총 게임 수를 표시하고, 누군가 다시 플레이할 때마다 이를 업데이트하고 싶다고 가정해 보겠습니다. 접근 방식은 다음과 같습니다.

1. `totalGamesPlayerWon`를 가져옵니다.
2. `totalGamesPlayerLost`를 가져옵니다.
3. `BetPlaced` 이벤트를 구독합니다.

오른쪽에 표시된 것처럼 [Web3에서 이벤트를](https://docs.web3js.org/api/web3/class/Contract#events) 수신할 수 있지만, 꽤 많은 경우를 처리해야 합니다.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // 이벤트 발생함
})
.on('changed', function(event) {
    // 이벤트가 다시 제거됨
})
.on('error', function(error, receipt) {
    // 트랜잭션 거부됨
});
```

간단한 예시에서는 이 정도도 괜찮습니다. 하지만 이제 현재 플레이어의 승패 베팅 금액만 표시하고 싶다고 가정해 보겠습니다. 안타깝게도 운이 나쁘네요. 해당 값을 저장하는 새로운 컨트랙트를 배포하고 가져오는 것이 좋습니다. 이제 훨씬 더 복잡한 스마트 컨트랙트와 dapp을 상상해 보세요. 상황은 금방 복잡해질 수 있습니다.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

이 방식이 왜 최적이 아닌지 알 수 있습니다.

- 이미 배포된 컨트랙트에는 작동하지 않습니다.
- 해당 값을 저장하기 위한 추가 가스 비용이 발생합니다.
- 이더리움 노드에서 데이터를 가져오기 위해 또 다른 호출이 필요합니다.

![Thats not good enough](./not-good-enough.jpg)

이제 더 나은 해결책을 살펴보겠습니다.

## GraphQL을 소개합니다 {#let-me-introduce-to-you-graphql}

먼저 페이스북이 처음 설계하고 구현한 GraphQL에 대해 이야기해 보겠습니다. 전통적인 REST API 모델에 익숙하실 것입니다. 이제 그 대신 원하는 데이터에 대해서만 정확히 쿼리를 작성할 수 있다고 상상해 보세요.

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

이 두 이미지는 GraphQL의 핵심을 잘 보여줍니다. 오른쪽의 쿼리를 사용하면 원하는 데이터를 정확히 정의할 수 있으므로, 단일 요청으로 필요한 모든 것을 가져오고 불필요한 데이터는 받지 않습니다. GraphQL 서버가 필요한 모든 데이터를 가져오는 작업을 처리하므로 프론트엔드 소비자 측에서 사용하기가 매우 쉽습니다. 관심이 있으시다면 서버가 쿼리를 정확히 어떻게 처리하는지에 대한 [좋은 설명](https://www.apollographql.com/blog/graphql-explained)을 참고하세요.

이제 이러한 지식을 바탕으로 본격적으로 블록체인 공간과 The Graph에 대해 알아보겠습니다.

## The Graph란 무엇인가요? {#what-is-the-graph}

블록체인은 탈중앙화된 데이터베이스이지만, 일반적인 경우와 달리 이 데이터베이스를 위한 쿼리 언어가 없습니다. 데이터를 검색하기 위한 솔루션은 고통스럽거나 아예 불가능합니다. The Graph는 블록체인 데이터를 인덱싱하고 쿼리하기 위한 탈중앙화된 프로토콜입니다. 짐작하셨겠지만, 쿼리 언어로 GraphQL을 사용합니다.

![The Graph](./thegraph.png)

무언가를 이해하는 데는 예시가 항상 가장 좋으므로, GameContract 예시에 The Graph를 사용해 보겠습니다.

## 서브그래프 생성 방법 {#how-to-create-a-subgraph}

데이터를 인덱싱하는 방법에 대한 정의를 서브그래프라고 합니다. 여기에는 세 가지 구성 요소가 필요합니다.

1. 매니페스트 (`subgraph.yaml`)
2. 스키마 (`schema.graphql`)
3. 매핑 (`mapping.ts`)

### 매니페스트 (`subgraph.yaml`) {#manifest}

매니페스트는 구성 파일이며 다음을 정의합니다.

- 인덱싱할 스마트 컨트랙트 (주소, 네트워크, ABI 등)
- 수신할 이벤트
- 함수 호출이나 블록과 같이 수신할 기타 항목
- 호출되는 매핑 함수 (아래 `mapping.ts` 참조)

여기에서 여러 컨트랙트와 핸들러를 정의할 수 있습니다. 일반적인 설정은 Hardhat 프로젝트 내에 자체 리포지토리가 있는 서브그래프 폴더를 두는 것입니다. 그러면 ABI를 쉽게 참조할 수 있습니다.

편의를 위해 mustache와 같은 템플릿 도구를 사용할 수도 있습니다. 그런 다음 `subgraph.template.yaml`를 생성하고 최신 배포를 기반으로 주소를 삽입합니다. 더 고급 예시 설정은 [에이브 서브그래프 리포지토리](https://github.com/aave/aave-protocol/tree/master/thegraph)를 참조하세요.

전체 문서는 [여기](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)에서 볼 수 있습니다.

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

### 스키마 (`schema.graphql`) {#schema}

스키마는 GraphQL 데이터 정의입니다. 이를 통해 어떤 엔티티가 존재하고 그 유형이 무엇인지 정의할 수 있습니다. The Graph에서 지원하는 유형은 다음과 같습니다.

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

엔티티를 유형으로 사용하여 관계를 정의할 수도 있습니다. 이 예시에서는 플레이어와 베팅 간의 1대다 관계를 정의합니다. !는 값이 비어 있을 수 없음을 의미합니다. 전체 문서는 [여기](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)에서 볼 수 있습니다.

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

### 매핑 (`mapping.ts`) {#mapping}

The Graph의 매핑 파일은 들어오는 이벤트를 엔티티로 변환하는 함수를 정의합니다. 이는 TypeScript의 하위 집합인 AssemblyScript로 작성됩니다. 즉, 매핑을 더 효율적이고 이식성 있게 실행하기 위해 WASM(WebAssembly)으로 컴파일할 수 있습니다.

`subgraph.yaml` 파일에 명명된 각 함수를 정의해야 하므로, 이 경우에는 `handleNewBet` 하나만 필요합니다. 먼저 발신자 주소를 id로 사용하여 Player 엔티티를 로드하려고 시도합니다. 존재하지 않으면 새 엔티티를 만들고 시작 값으로 채웁니다.

그런 다음 새 Bet 엔티티를 만듭니다. 이것의 id는 항상 고유한 값을 보장하는 `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`가 됩니다. 누군가 스마트 컨트랙트를 통해 하나의 트랜잭션에서 placeBet 함수를 여러 번 호출할 수 있으므로 해시만 사용하는 것으로는 충분하지 않습니다.

마지막으로 모든 데이터로 Player 엔티티를 업데이트할 수 있습니다. 배열은 직접 푸시할 수 없으며 여기에 표시된 대로 업데이트해야 합니다. id를 사용하여 베팅을 참조합니다. 그리고 엔티티를 저장하려면 마지막에 `.save()`가 필요합니다.

전체 문서는 https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings 에서 볼 수 있습니다. 매핑 파일에 로깅 출력을 추가할 수도 있습니다. [여기](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference)를 참조하세요.

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // 아직 존재하지 않는 경우 생성
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

  // 이와 같이 배열 업데이트
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## 프론트엔드에서 사용하기 {#using-it-in-the-frontend}

Apollo Boost와 같은 도구를 사용하면 React dapp(또는 Apollo-Vue)에 The Graph를 쉽게 통합할 수 있습니다. 특히 React 훅과 Apollo를 사용할 때 데이터를 가져오는 것은 컴포넌트에 단일 GraphQL 쿼리를 작성하는 것만큼 간단합니다. 일반적인 설정은 다음과 같습니다.

```javascript
// 모든 서브그래프 보기: https://thegraph.com/explorer/
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

이제 예를 들어 다음과 같은 쿼리를 작성할 수 있습니다. 이를 통해 다음을 가져올 수 있습니다.

- 현재 사용자가 승리한 횟수
- 현재 사용자가 패배한 횟수
- 이전의 모든 베팅에 대한 타임스탬프 목록

이 모든 것을 GraphQL 서버에 대한 단일 요청으로 처리합니다.

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

하지만 퍼즐의 마지막 조각인 서버가 빠져 있습니다. 직접 실행하거나 호스팅된 서비스를 사용할 수 있습니다.

## The Graph 서버 {#the-graph-server}

### Graph Explorer: 호스팅된 서비스 {#graph-explorer-the-hosted-service}

가장 쉬운 방법은 호스팅된 서비스를 사용하는 것입니다. 서브그래프를 배포하려면 [여기](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/)의 지침을 따르세요. 많은 프로젝트의 경우 실제로 [탐색기](https://thegraph.com/explorer/)에서 기존 서브그래프를 찾을 수 있습니다.

![The Graph-Explorer](./thegraph-explorer.png)

### 자체 노드 실행하기 {#running-your-own-node}

또는 자체 노드를 실행할 수 있습니다. 문서는 [여기](https://github.com/graphprotocol/graph-node#quick-start)에 있습니다. 이렇게 하는 한 가지 이유는 호스팅된 서비스에서 지원하지 않는 네트워크를 사용하기 위해서일 수 있습니다. 현재 지원되는 네트워크는 [여기에서 찾을 수 있습니다](https://thegraph.com/docs/en/developing/supported-networks/).

## 탈중앙화된 미래 {#the-decentralized-future}

GraphQL은 새로 들어오는 이벤트에 대한 스트림도 지원합니다. 이는 현재 오픈 베타 버전인 [서브스트림(Substreams)](https://thegraph.com/docs/en/substreams/)을 통해 The Graph에서 지원됩니다.

[2021년](https://thegraph.com/blog/mainnet-migration/)에 The Graph는 탈중앙화된 인덱싱 네트워크로의 전환을 시작했습니다. 이 탈중앙화된 인덱싱 네트워크의 아키텍처에 대한 자세한 내용은 [여기](https://thegraph.com/docs/en/network/explorer/)에서 읽을 수 있습니다.

두 가지 핵심 측면은 다음과 같습니다.

1. 사용자는 쿼리에 대해 인덱서에게 비용을 지불합니다.
2. 인덱서는 Graph 토큰(GRT)을 스테이킹합니다.