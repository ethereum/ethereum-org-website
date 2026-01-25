---
title: "The Graph: 웹3 데이터 쿼리 문제 해결"
description: 블록체인은 데이터베이스와 같지만 SQL이 없어요. 모든 데이터는 있지만, 접근할 방법이 없어요. The Graph와 GraphQL로 이 문제를 해결하는 방법을 알려드릴게요.
author: Markus Waas
lang: ko
tags: [ "솔리디티", "스마트 계약", "요청", "the graph", "react" ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

이번에는 작년에 탈중앙화앱 개발의 표준 스택으로 자리 잡은 The Graph에 대해 자세히 알아볼게요. 먼저 기존 방식으로는 어떻게 하는지 살펴볼까요?

## The Graph가 없다면... {#without-the-graph}

이해를 돕기 위해 간단한 예시를 들어볼게요. 다들 게임을 좋아하니까 사용자가 베팅하는 간단한 게임을 상상해 보세요.

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
            require(success, "전송 실패");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

이제 우리 탈중앙화앱에서 총 베팅 수, 총 패/승 게임 수를 표시하고, 누군가 다시 플레이할 때마다 업데이트하고 싶다고 해봐요. 접근 방식은 다음과 같아요.

1. `totalGamesPlayerWon` 가져오기.
2. `totalGamesPlayerLost` 가져오기.
3. `BetPlaced` 이벤트 구독하기.

오른쪽에 보이는 것처럼 [웹3의 이벤트](https://docs.web3js.org/api/web3/class/Contract#events)를 수신할 수 있지만, 처리해야 할 사례가 꽤 많아요.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // 이벤트 발생
})
.on('changed', function(event) {
    // 이벤트가 다시 제거됨
})
.on('error', function(error, receipt) {
    // 트랜잭션 거부됨
});
```

이건 우리 간단한 예시에서는 아직 괜찮은 편이에요. 하지만 현재 플레이어의 승패 베팅 금액만 표시하고 싶다고 해볼게요. 음, 운이 없네요. 그 값들을 저장하고 가져오는 새로운 계약을 배포하는 편이 낫겠어요. 이제 훨씬 더 복잡한 스마트 계약과 탈중앙화앱을 상상해보면, 상황이 금방 복잡해질 수 있어요.

![단순히 쿼리할 수는 없다](./one-does-not-simply-query.jpg)

이 방법이 왜 최적이 아닌지 알 수 있어요.

- 이미 배포된 계약에서는 작동하지 않아요.
- 해당 값을 저장하는 데 추가 가스 비용이 들어요.
- 이더리움 노드에서 데이터를 가져오려면 또 다른 호출이 필요해요.

![이것만으로는 충분하지 않아](./not-good-enough.jpg)

이제 더 나은 해결책을 살펴볼게요.

## GraphQL을 소개할게요 {#let-me-introduce-to-you-graphql}

먼저 페이스북에서 처음 설계하고 구현한 GraphQL에 대해 이야기해 볼게요. 기존 REST API 모델에 익숙하실 수도 있겠네요. 대신, 원하는 데이터에 대한 쿼리를 정확하게 작성할 수 있다고 상상해 보세요.

![GraphQL API 대 REST API](./graphql.jpg)

![](./graphql-query.gif)

두 이미지가 GraphQL의 본질을 잘 보여줘요. 오른쪽 쿼리를 사용하면 원하는 데이터를 정확하게 정의할 수 있어요. 그래서 한 번의 요청으로 필요한 것만 정확하게 얻을 수 있죠. GraphQL 서버가 필요한 모든 데이터 가져오기를 처리하기 때문에 프런트엔드 소비자 측에서 사용하기가 정말 쉬워요. 관심이 있다면 서버가 쿼리를 정확히 어떻게 처리하는지에 대한 [좋은 설명](https://www.apollographql.com/blog/graphql-explained)이 여기에 있어요.

이제 이 지식을 바탕으로 드디어 블록체인 분야와 The Graph에 대해 알아볼게요.

## The Graph란 무엇인가요? {#what-is-the-graph}

블록체인은 탈중앙화 데이터베이스이지만, 일반적인 경우와 달리 이 데이터베이스에 대한 쿼리 언어가 없어요. 데이터를 검색하는 솔루션은 어렵거나 완전히 불가능해요. The Graph는 블록체인 데이터를 인덱싱하고 쿼리하기 위한 탈중앙화 프로토콜이에요. 짐작하셨겠지만, 쿼리 언어로 GraphQL을 사용해요.

![The Graph](./thegraph.png)

무언가를 이해하는 데는 예시가 항상 최고죠. GameContract 예시에 The Graph를 사용해 볼게요.

## 서브그래프(Subgraph) 생성 방법 {#how-to-create-a-subgraph}

데이터 인덱싱 방법을 정의하는 것을 서브그래프(subgraph)라고 해요. 세 가지 구성 요소가 필요해요.

1. 매니페스트(`subgraph.yaml`)
2. 스키마(`schema.graphql`)
3. 매핑(`mapping.ts`)

### 매니페스트(`subgraph.yaml`) {#manifest}

매니페스트는 구성 파일이며 다음을 정의해요.

- 인덱싱할 스마트 계약(주소, 네트워크, ABI...)
- 수신할 이벤트
- 함수 호출이나 블록과 같이 수신할 다른 항목
- 호출되는 매핑 함수(아래 `mapping.ts` 참조)

여기에 여러 계약과 핸들러를 정의할 수 있어요. 일반적으로 Hardhat 프로젝트 내에 자체 저장소가 있는 서브그래프 폴더를 두는 방식으로 설정해요. 그러면 ABI를 쉽게 참조할 수 있어요.

편의상 mustache와 같은 템플릿 도구를 사용할 수도 있어요. 그런 다음 `subgraph.template.yaml`을 생성하고 최신 배포를 기반으로 주소를 삽입해요. 더 고급 예제 설정은 예를 들어 [Aave 서브그래프 리포지토리](https://github.com/aave/aave-protocol/tree/master/thegraph)를 참조하세요.

전체 개발 문서는 [여기](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)에서 볼 수 있어요.

```yaml
specVersion: 0.0.1
description: 이더리움에 베팅하기
repository: - GitHub 링크 -
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

### 스키마(`schema.graphql`) {#schema}

스키마는 GraphQL 데이터 정의예요. 스키마를 통해 어떤 엔터티가 존재하고 그 유형은 무엇인지 정의할 수 있어요. The Graph에서 지원하는 유형은 다음과 같아요.

- 바이트
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

엔터티를 유형으로 사용해서 관계를 정의할 수도 있어요. 이 예에서는 플레이어와 베팅 간의 1대다 관계를 정의해요. `!`는 값이 비어 있을 수 없다는 뜻이에요. 전체 개발 문서는 [여기](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)에서 볼 수 있어요.

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

### 매핑(`mapping.ts`) {#mapping}

The Graph의 매핑 파일은 들어오는 이벤트를 엔터티로 변환하는 함수를 정의해요. 이는 TypeScript의 하위 집합인 AssemblyScript로 작성되었어요. 이는 매핑을 더 효율적이고 이식성 있게 실행하기 위해 WASM(WebAssembly)으로 컴파일될 수 있다는 의미예요.

`subgraph.yaml` 파일에 명명된 각 함수를 정의해야 하는데, 우리의 경우 `handleNewBet` 하나만 필요해요. 먼저 발신자 주소를 ID로 사용해서 플레이어 엔터티를 로드하려고 시도해요. 존재하지 않으면 새 엔터티를 만들고 초기값으로 채워요.

그런 다음 새로운 베팅 엔터티를 만들어요. ID는 `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`으로 설정하여 항상 고유한 값을 보장해요. 누군가 스마트 계약을 통해 한 트랜잭션에서 placeBet 함수를 여러 번 호출할 수 있기 때문에 해시만 사용하는 것으로는 충분하지 않아요.

마지막으로 플레이어 엔터티를 모든 데이터로 업데이트할 수 있어요. 배열에는 직접 푸시할 수 없으며, 여기에 보이는 것처럼 업데이트해야 해요. ID를 사용해서 베팅을 참조해요. 그리고 엔터티를 저장하려면 마지막에 `.save()`가 필요해요.

전체 개발 문서는 여기에서 볼 수 있어요: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. 매핑 파일에 로깅 출력을 추가할 수도 있어요. [여기](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference)를 참조하세요.

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // 아직 존재하지 않으면 생성
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

  // 이런 식으로 배열 업데이트
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## 프런트엔드에서 사용하기 {#using-it-in-the-frontend}

Apollo Boost 같은 도구를 사용하면 React 탈중앙화앱(또는 Apollo-Vue)에 The Graph를 쉽게 통합할 수 있어요. 특히 React 후크와 Apollo를 사용하면 컴포넌트에서 GraphQL 쿼리 하나만 작성하는 것만으로 간단하게 데이터를 가져올 수 있어요. 일반적인 설정은 다음과 같아요.

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

이제 예를 들어 이런 쿼리를 작성할 수 있어요. 이 쿼리는 다음을 가져와요.

- 현재 사용자가 몇 번 이겼는지
- 현재 사용자가 몇 번 졌는지
- 이전의 모든 베팅에 대한 타임스탬프 목록

GraphQL 서버에 단 한 번의 요청으로 모든 것을 가져와요.

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

![마법](./magic.jpg)

하지만 퍼즐의 마지막 조각인 서버가 빠졌어요. 직접 실행하거나 호스팅된 서비스를 사용할 수 있어요.

## The Graph 서버 {#the-graph-server}

### Graph Explorer: 호스팅된 서비스 {#graph-explorer-the-hosted-service}

가장 쉬운 방법은 호스팅된 서비스를 사용하는 거예요. [여기](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/)의 지침에 따라 서브그래프를 배포하세요. 많은 프로젝트의 경우 실제로 [탐색기](https://thegraph.com/explorer/)에서 기존 서브그래프를 찾을 수 있어요.

![The Graph 탐색기](./thegraph-explorer.png)

### 자신의 노드 실행 {# running-your-own-node}

또는 자체 노드를 실행할 수도 있어요. 문서는 [여기](https://github.com/graphprotocol/graph-node#quick-start)에 있어요. 이렇게 하는 한 가지 이유는 호스팅된 서비스에서 지원하지 않는 네트워크를 사용하려는 경우일 수 있어요. 현재 지원되는 네트워크는 [여기에서 찾을 수 있어요](https://thegraph.com/docs/en/developing/supported-networks/).

## 탈중앙화된 미래 {#the-decentralized-future}

GraphQL은 새로 들어오는 이벤트에 대해 스트림도 지원해요. 이것들은 현재 오픈 베타 버전인 [서브스트림](https://thegraph.com/docs/en/substreams/)을 통해 그래프에서 지원돼요.

[2021년](https://thegraph.com/blog/mainnet-migration/)에 The Graph는 탈중앙화 인덱싱 네트워크로 전환하기 시작했어요. 이 탈중앙화 인덱싱 네트워크의 아키텍처에 대한 자세한 내용은 [여기](https://thegraph.com/docs/en/network/explorer/)에서 읽을 수 있어요.

두 가지 핵심 측면은 다음과 같아요.

1. 사용자는 쿼리에 대해 인덱서에게 비용을 지불해요.
2. 인덱서는 그래프 토큰(GRT)을 스테이킹해요.
