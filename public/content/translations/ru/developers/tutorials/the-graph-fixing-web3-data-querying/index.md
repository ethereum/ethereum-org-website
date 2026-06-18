---
title: "The Graph: исправление запросов данных в Web3"
description: Блокчейн похож на базу данных, но без SQL. Все данные там, но к ним нет доступа. Позвольте мне показать вам, как это исправить с помощью The Graph и GraphQL.
author: Маркус Ваас
lang: ru
tags: ["solidity", "смарт-контракты", "запросы", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

В этот раз мы подробнее рассмотрим The Graph, который за последний год по сути стал частью стандартного стека для разработки децентрализованных приложений (dapp). Давайте сначала посмотрим, как бы мы сделали это традиционным способом...

## Без The Graph... {#without-the-graph}

Итак, давайте рассмотрим простой пример для наглядности. Мы все любим игры, поэтому представьте себе простую игру, в которой пользователи делают ставки:

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

Теперь, допустим, в нашем децентрализованном приложении (dapp) мы хотим отображать общее количество ставок, общее количество проигранных/выигранных игр, а также обновлять эти данные каждый раз, когда кто-то снова играет. Подход будет следующим:

1. Получить `totalGamesPlayerWon`.
2. Получить `totalGamesPlayerLost`.
3. Подписаться на события `BetPlaced`.

Мы можем прослушивать [событие в Web3](https://docs.web3js.org/api/web3/class/Contract#events), как показано справа, но это требует обработки довольно большого количества случаев.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // событие сработало
})
.on('changed', function(event) {
    // событие снова удалено
})
.on('error', function(error, receipt) {
    // транзакция отклонена
});
```

Для нашего простого примера это еще куда ни шло. Но, допустим, теперь мы хотим отображать количество проигранных/выигранных ставок только для текущего игрока. Что ж, нам не повезло: вам лучше развернуть новый контракт, который будет хранить эти значения, и извлекать их оттуда. А теперь представьте себе гораздо более сложный смарт-контракт и dapp — все может быстро запутаться.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Вы можете видеть, что это не оптимально:

- Не работает для уже развернутых контрактов.
- Дополнительные затраты газа на хранение этих значений.
- Требует еще одного вызова для получения данных с узла Эфириума.

![Thats not good enough](./not-good-enough.jpg)

Теперь давайте рассмотрим лучшее решение.

## Позвольте представить вам GraphQL {#let-me-introduce-to-you-graphql}

Сначала давайте поговорим о GraphQL, изначально разработанном и реализованном Фейсбуком. Возможно, вы знакомы с традиционной моделью REST API. А теперь представьте, что вместо этого вы могли бы написать запрос именно на те данные, которые вам нужны:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

Эти два изображения в значительной степени отражают суть GraphQL. С помощью запроса справа мы можем точно определить, какие данные нам нужны, поэтому мы получаем все в одном запросе и ничего лишнего. Сервер GraphQL обрабатывает получение всех необходимых данных, поэтому его невероятно легко использовать на стороне фронтенда. [Здесь есть хорошее объяснение](https://www.apollographql.com/blog/graphql-explained) того, как именно сервер обрабатывает запрос, если вам интересно.

Теперь, обладая этими знаниями, давайте наконец перейдем к пространству блокчейна и The Graph.

## Что такое The Graph? {#what-is-the-graph}

Блокчейн — это децентрализованная база данных, но, в отличие от обычных случаев, у нас нет языка запросов для этой базы данных. Решения для извлечения данных болезненны или совершенно невозможны. The Graph — это децентрализованный протокол для индексирования и запроса данных блокчейна. И, как вы уже догадались, он использует GraphQL в качестве языка запросов.

![The Graph](./thegraph.png)

Примеры всегда лучше всего помогают что-то понять, поэтому давайте используем The Graph для нашего примера с GameContract.

## Как создать подграф {#how-to-create-a-subgraph}

Определение того, как индексировать данные, называется подграфом. Для него требуются три компонента:

1. Манифест (`subgraph.yaml`)
2. Схема (`schema.graphql`)
3. Сопоставление (Mapping) (`mapping.ts`)

### Манифест (`subgraph.yaml`) {#manifest}

Манифест — это наш конфигурационный файл, который определяет:

- какие смарт-контракты индексировать (адрес, сеть, ABI...)
- какие события прослушивать
- другие элементы для прослушивания, такие как вызовы функций или блоки
- вызываемые функции сопоставления (см. `mapping.ts` ниже)

Здесь вы можете определить несколько контрактов и обработчиков. Типичная настройка будет иметь папку подграфа внутри проекта Hardhat со своим собственным репозиторием. Тогда вы сможете легко ссылаться на ABI.

Для удобства вы также можете использовать инструмент шаблонов, такой как mustache. Затем вы создаете `subgraph.template.yaml` и вставляете адреса на основе последних развертываний. Для более сложного примера настройки см., например, [репозиторий подграфа Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

А полную документацию можно посмотреть [здесь](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Схема (`schema.graphql`) {#schema}

Схема — это определение данных GraphQL. Она позволит вам определить, какие сущности существуют и их типы. Поддерживаемые типы в The Graph:

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Вы также можете использовать сущности в качестве типа для определения связей. В нашем примере мы определяем связь «один ко многим» от игрока к ставкам. Знак ! означает, что значение не может быть пустым. Полную документацию можно посмотреть [здесь](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Сопоставление (`mapping.ts`) {#mapping}

Файл сопоставления в The Graph определяет наши функции, которые преобразуют входящие события в сущности. Он написан на AssemblyScript, подмножестве TypeScript. Это означает, что он может быть скомпилирован в WASM (WebAssembly) для более эффективного и переносимого выполнения сопоставления.

Вам нужно будет определить каждую функцию, названную в файле `subgraph.yaml`, поэтому в нашем случае нам нужна только одна: `handleNewBet`. Сначала мы пытаемся загрузить сущность Player из адреса отправителя в качестве id. Если она не существует, мы создаем новую сущность и заполняем ее начальными значениями.

Затем мы создаем новую сущность Bet. Идентификатором (id) для нее будет `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, что гарантирует всегда уникальное значение. Использования только хеша недостаточно, так как кто-то может вызвать функцию placeBet несколько раз в одной транзакции через смарт-контракт.

Наконец, мы можем обновить сущность Player всеми данными. В массивы нельзя добавлять элементы напрямую (push), их нужно обновлять, как показано здесь. Мы используем id для ссылки на ставку. И в конце требуется `.save()` для сохранения сущности.

Полную документацию можно посмотреть здесь: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Вы также можете добавить вывод журнала (логирование) в файл сопоставления, см. [здесь](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // создать, если еще не существует
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

  // обновить массив таким образом
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Использование во фронтенде {#using-it-in-the-frontend}

Используя что-то вроде Apollo Boost, вы можете легко интегрировать The Graph в свое децентрализованное приложение (dapp) на React (или Apollo-Vue). Особенно при использовании хуков React и Apollo получение данных становится таким же простым, как написание одного запроса GraphQL в вашем компоненте. Типичная настройка может выглядеть так:

```javascript
// Смотреть все подграфы: https://thegraph.com/explorer/
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

И теперь мы можем написать, например, такой запрос. Это позволит нам получить:

- сколько раз текущий пользователь выиграл
- сколько раз текущий пользователь проиграл
- список временных меток со всеми его предыдущими ставками

И все это в одном единственном запросе к серверу GraphQL.

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

Но нам не хватает последней части головоломки — сервера. Вы можете либо запустить его самостоятельно, либо использовать хостинговый сервис.

## Сервер The Graph {#the-graph-server}

### Graph Explorer: хостинговый сервис {#graph-explorer-the-hosted-service}

Самый простой способ — использовать хостинговый сервис. Следуйте инструкциям [здесь](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/), чтобы развернуть подграф. Для многих проектов вы можете найти уже существующие подграфы в [проводнике (explorer)](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Запуск собственного узла {#running-your-own-node}

В качестве альтернативы вы можете запустить свой собственный узел. Документация [здесь](https://github.com/graphprotocol/graph-node#quick-start). Одной из причин для этого может быть использование сети, которая не поддерживается хостинговым сервисом. В настоящее время поддерживаемые сети [можно найти здесь](https://thegraph.com/docs/en/developing/supported-networks/).

## Децентрализованное будущее {#the-decentralized-future}

GraphQL также поддерживает потоки для новых входящих событий. Они поддерживаются в The Graph через [Substreams](https://thegraph.com/docs/en/substreams/), которые в настоящее время находятся в стадии открытого бета-тестирования.

В [2021 году](https://thegraph.com/blog/mainnet-migration/) The Graph начал переход к децентрализованной сети индексирования. Вы можете прочитать больше об архитектуре этой децентрализованной сети индексирования [здесь](https://thegraph.com/docs/en/network/explorer/).

Два ключевых аспекта:

1. Пользователи платят индексаторам за запросы.
2. Индексаторы стейкают токены Graph (GRT).