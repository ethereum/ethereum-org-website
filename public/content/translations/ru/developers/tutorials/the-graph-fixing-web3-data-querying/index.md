---
title: "The Graph: Исправление запросов данных в Web3"
description: "Блокчейн — это как база данных, но без SQL. Все данные есть, но нет способа получить к ним доступ. Я покажу вам, как это исправить с помощью The Graph и GraphQL."
author: Markus Waas
lang: ru
tags:
  [
    "твердость",
    "Умные контракты",
    "запросы",
    "the graph",
    "react"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

На этот раз мы подробнее рассмотрим The Graph, который за последний год по сути стал частью стандартного стека для разработки децентрализованных приложений. Давайте сначала посмотрим, как бы мы делали это традиционным способом...

## Без The Graph... {#without-the-graph}

Итак, давайте для наглядности рассмотрим простой пример. Мы все любим игры, поэтому представьте себе простую игру, в которой пользователи делают ставки:

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
            require(success, "Перевод не удался");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

Теперь предположим, что в нашем децентрализованном приложении мы хотим отображать общее количество ставок, общее количество проигранных/выигранных игр, а также обновлять его, когда кто-то играет снова. Подход будет таким:

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
    // событие было снова удалено
})
.on('error', function(error, receipt) {
    // транзакция отклонена
});
```

Для нашего простого примера это все еще приемлемо. Но предположим, что мы хотим отображать суммы проигранных/выигранных ставок только для текущего игрока. Что ж, нам не повезло, вам лучше развернуть новый контракт, который хранит эти значения, и получать их. А теперь представьте себе гораздо более сложный смарт-контракт и децентрализованное приложение, все может быстро запутаться.

![Нельзя просто так взять и сделать запрос](./one-does-not-simply-query.jpg)

Вы можете видеть, что это не оптимально:

- Не работает для уже развернутых контрактов.
- Дополнительные расходы на газ для хранения этих значений.
- Требуется еще один вызов для получения данных для узла Ethereum.

![Этого недостаточно](./not-good-enough.jpg)

Теперь давайте рассмотрим лучшее решение.

## Позвольте мне представить вам GraphQL {#let-me-introduce-to-you-graphql}

Сначала поговорим о GraphQL, первоначально разработанном и внедренном Facebook. Возможно, вы знакомы с традиционной моделью REST API. Теперь представьте, что вместо этого вы можете написать запрос именно для тех данных, которые вам нужны:

![GraphQL API против REST API](./graphql.jpg)

![](./graphql-query.gif)

Эти два изображения в значительной степени отражают суть GraphQL. С помощью запроса справа мы можем точно определить, какие данные мы хотим, поэтому мы получаем все в одном запросе и ничего лишнего. Сервер GraphQL обрабатывает получение всех необходимых данных, поэтому он невероятно прост в использовании для фронтенд-потребителя. [Здесь есть хорошее объяснение](https://www.apollographql.com/blog/graphql-explained) того, как именно сервер обрабатывает запрос, если вам интересно.

Теперь, обладая этими знаниями, давайте наконец-то погрузимся в мир блокчейна и The Graph.

## Что такое The Graph? {#what-is-the-graph}

Блокчейн — это децентрализованная база данных, но в отличие от обычного случая у нас нет языка запросов для этой базы данных. Решения для извлечения данных являются трудоемкими или совершенно невозможными. The Graph — это децентрализованный протокол для индексации и запроса данных блокчейна. И, как вы могли догадаться, он использует GraphQL в качестве языка запросов.

![The Graph](./thegraph.png)

Примеры — это всегда лучший способ что-то понять, поэтому давайте используем The Graph для нашего примера GameContract.

## Как создать подграф {#how-to-create-a-subgraph}

Определение того, как индексировать данные, называется подграфом. Для этого требуются три компонента:

1. Манифест (`subgraph.yaml`)
2. Схема (`schema.graphql`)
3. Сопоставление (`mapping.ts`)

### Манифест (`subgraph.yaml`) {#manifest}

Манифест — это наш файл конфигурации, который определяет:

- какие смарт-контракты индексировать (адрес, сеть, ABI...)
- какие события прослушивать
- другие элементы для прослушивания, например вызовы функций или блоки
- вызываемые функции сопоставления (см. `mapping.ts` ниже)

Здесь вы можете определить несколько контрактов и обработчиков. Типичная настройка будет включать папку подграфа внутри проекта Hardhat с собственным репозиторием. Тогда вы сможете легко ссылаться на ABI.

Для удобства вы также можете использовать инструмент для создания шаблонов, например mustache. Затем вы создаете `subgraph.template.yaml` и вставляете адреса на основе последних развертываний. Более продвинутый пример настройки см., например, в [репозитории подграфа Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

А полную документацию можно посмотреть [здесь](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

```yaml
specVersion: 0.0.1
description: Размещение ставок в Ethereum
repository: - Ссылка на GitHub -
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

Схема — это определение данных GraphQL. Она позволит вам определить, какие сущности существуют и каковы их типы. Поддерживаемые типы в The Graph:

- Байты
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Вы также можете использовать сущности в качестве типа для определения отношений. В нашем примере мы определяем отношение «один ко многим» от игрока к ставкам. Символ ! означает, что значение не может быть пустым. Полную документацию можно посмотреть [здесь](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Файл сопоставления в The Graph определяет наши функции, которые преобразуют входящие события в сущности. Он написан на AssemblyScript, подмножестве Typescript. Это означает, что он может быть скомпилирован в WASM (WebAssembly) для более эффективного и переносимого выполнения сопоставления.

Вам нужно будет определить каждую функцию, названную в файле `subgraph.yaml`, поэтому в нашем случае нам нужна только одна: `handleNewBet`. Сначала мы пытаемся загрузить сущность Player из адреса отправителя в качестве id. Если она не существует, мы создаем новую сущность и заполняем ее начальными значениями.

Затем мы создаем новую сущность Bet. Идентификатором для нее будет `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, что всегда обеспечивает уникальное значение. Использования только хэша недостаточно, так как кто-то может вызывать функцию placeBet несколько раз в одной транзакции через смарт-контракт.

Наконец, мы можем обновить сущность Player, добавив в нее все данные. Массивы нельзя пополнять напрямую, они должны быть обновлены, как показано здесь. Мы используем id для ссылки на ставку. И `.save()` требуется в конце для сохранения сущности.

Полную документацию можно посмотреть здесь: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Вы также можете добавить вывод журнала в файл сопоставления, см. [здесь](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

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

  // обновить массив вот так
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Использование во фронтенде {#using-it-in-the-frontend}

Используя что-то вроде Apollo Boost, вы можете легко интегрировать The Graph в свое децентрализованное приложение на React (или Apollo-Vue). Особенно при использовании хуков React и Apollo, получение данных сводится к написанию одного запроса GraphQL в вашем компоненте. Типичная настройка может выглядеть так:

```javascript
// Посмотреть все подграфы: https://thegraph.com/explorer/
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

И теперь мы можем написать, например, такой запрос. Это позволит нам получить

- сколько раз текущий пользователь выиграл
- сколько раз текущий пользователь проиграл
- список временных меток всех его предыдущих ставок

Все в одном запросе к серверу GraphQL.

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

![Магия](./magic.jpg)

Но нам не хватает последней части головоломки, и это сервер. Вы можете либо запустить его самостоятельно, либо использовать хостинговый сервис.

## Сервер The Graph {#the-graph-server}

### Graph Explorer: хостинговый сервис {#graph-explorer-the-hosted-service}

Самый простой способ — использовать хостинговый сервис. Следуйте инструкциям [здесь](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/), чтобы развернуть подграф. Для многих проектов вы можете найти существующие подграфы в [обозревателе](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Запуск собственного узла {#running-your-own-node}

В качестве альтернативы вы можете запустить свой собственный узел. Документация [здесь](https://github.com/graphprotocol/graph-node#quick-start). Одной из причин для этого может быть использование сети, которая не поддерживается хостинговым сервисом. Текущие поддерживаемые сети [можно найти здесь](https://thegraph.com/docs/en/developing/supported-networks/).

## Децентрализованное будущее {#the-decentralized-future}

GraphQL также поддерживает потоки для новых входящих событий. Они поддерживаются на графе через [Substreams](https://thegraph.com/docs/en/substreams/), которые в настоящее время находятся в стадии открытого бета-тестирования.

В [2021 году](https://thegraph.com/blog/mainnet-migration/) The Graph начал свой переход к децентрализованной сети индексации. Подробнее об архитектуре этой децентрализованной сети индексации можно прочитать [здесь](https://thegraph.com/docs/en/network/explorer/).

Два ключевых аспекта:

1. Пользователи платят индексаторам за запросы.
2. Индексаторы размещают в стейкинге токены Graph (GRT).
