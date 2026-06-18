---
title: "The Graph: Виправлення запитів до даних Web3"
description: "Блокчейн схожий на базу даних, але без SQL. Усі дані там є, але немає способу отримати до них доступ. Дозвольте мені показати, як це виправити за допомогою The Graph та GraphQL."
author: "Маркус Ваас"
lang: uk
tags:
  - solidity
  - смарт-контракти
  - запити
  - the graph
  - react
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Цього разу ми детальніше розглянемо The Graph, який за останній рік фактично став частиною стандартного стека для розробки децентралізованих застосунків (dapp). Спочатку подивімося, як би ми робили це традиційним способом...

## Без The Graph... {#without-the-graph}

Отже, розглянемо простий приклад для ілюстрації. Ми всі любимо ігри, тому уявіть просту гру, де користувачі роблять ставки:

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

Тепер припустімо, що в нашому децентралізованому застосунку (dapp) ми хочемо відображати загальну кількість ставок, загальну кількість програних/виграних ігор, а також оновлювати ці дані щоразу, коли хтось знову грає. Підхід був би таким:

1. Отримати `totalGamesPlayerWon`.
2. Отримати `totalGamesPlayerLost`.
3. Підписатися на події `BetPlaced`.

Ми можемо прослуховувати [подію у Web3](https://docs.web3js.org/api/web3/class/Contract#events), як показано праворуч, але це вимагає обробки чималої кількості випадків.

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // подія спрацювала
})
.on('changed', function(event) {
    // подію знову видалено
})
.on('error', function(error, receipt) {
    // транзакцію відхилено
});
```

Для нашого простого прикладу це ще більш-менш нормально. Але припустімо, що тепер ми хочемо відображати кількість програних/виграних ставок лише для поточного гравця. Що ж, нам не пощастило, краще розгорнути новий контракт, який зберігатиме ці значення, і отримувати їх. А тепер уявіть набагато складніший смарт-контракт і dapp — усе може швидко заплутатися.

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

Ви бачите, що це не оптимально:

- Не працює для вже розгорнутих контрактів.
- Додаткові витрати газу на зберігання цих значень.
- Вимагає ще одного виклику для отримання даних з вузла Етеріуму.

![Thats not good enough](./not-good-enough.jpg)

Тепер розглянемо краще рішення.

## Дозвольте познайомити вас із GraphQL {#let-me-introduce-to-you-graphql}

Спочатку поговоримо про GraphQL, який спочатку був розроблений і реалізований Facebook. Можливо, ви знайомі з традиційною моделлю REST API. А тепер уявіть, що замість цього ви можете написати запит саме на ті дані, які вам потрібні:

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

Ці два зображення чудово передають суть GraphQL. За допомогою запиту праворуч ми можемо точно визначити, які дані нам потрібні, тому ми отримуємо все в одному запиті й нічого зайвого. Сервер GraphQL обробляє отримання всіх необхідних даних, тому його неймовірно легко використовувати на стороні фронтенду. [Ось гарне пояснення](https://www.apollographql.com/blog/graphql-explained) того, як саме сервер обробляє запит, якщо вам цікаво.

Тепер, маючи ці знання, давайте нарешті перейдемо до простору блокчейну та The Graph.

## Що таке The Graph? {#what-is-the-graph}

Блокчейн — це децентралізована база даних, але, на відміну від звичайних випадків, у нас немає мови запитів для цієї бази даних. Рішення для отримання даних є болісними або взагалі неможливими. The Graph — це децентралізований протокол для індексування та виконання запитів до даних блокчейну. І, як ви вже здогадалися, він використовує GraphQL як мову запитів.

![The Graph](./thegraph.png)

Приклади завжди найкраще допомагають щось зрозуміти, тому давайте використаємо The Graph для нашого прикладу з GameContract.

## Як створити підграф {#how-to-create-a-subgraph}

Визначення того, як індексувати дані, називається підграфом. Він вимагає трьох компонентів:

1. Маніфест (`subgraph.yaml`)
2. Схема (`schema.graphql`)
3. Відображення (`mapping.ts`)

### Маніфест (`subgraph.yaml`) {#manifest}

Маніфест — це наш файл конфігурації, який визначає:

- які смарт-контракти індексувати (адреса, мережа, ABI...)
- які події прослуховувати
- інші речі для прослуховування, як-от виклики функцій або блоки
- функції відображення, що викликаються (див. `mapping.ts` нижче)

Тут ви можете визначити кілька контрактів і обробників. Типове налаштування передбачає наявність папки підграфа всередині проєкту Hardhat із власним репозиторієм. Тоді ви зможете легко посилатися на ABI.

Для зручності ви також можете використовувати інструмент шаблонів, як-от mustache. Тоді ви створюєте `subgraph.template.yaml` і вставляєте адреси на основі останніх розгортань. Для більш просунутого прикладу налаштування див., наприклад, [репозиторій підграфа Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

Повну документацію можна переглянути [тут](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Схема — це визначення даних GraphQL. Вона дозволить вам визначити, які сутності існують та їхні типи. The Graph підтримує такі типи:

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Ви також можете використовувати сутності як тип для визначення зв'язків. У нашому прикладі ми визначаємо зв'язок «один до багатьох» від гравця до ставок. Знак ! означає, що значення не може бути порожнім. Повну документацію можна переглянути [тут](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

### Відображення (`mapping.ts`) {#mapping}

Файл відображення в The Graph визначає наші функції, які перетворюють вхідні події на сутності. Він написаний на AssemblyScript, підмножині TypeScript. Це означає, що його можна скомпілювати у WASM (WebAssembly) для більш ефективного та портативного виконання відображення.

Вам потрібно буде визначити кожну функцію, названу у файлі `subgraph.yaml`, тому в нашому випадку потрібна лише одна: `handleNewBet`. Спочатку ми намагаємося завантажити сутність Player з адреси відправника як id. Якщо вона не існує, ми створюємо нову сутність і заповнюємо її початковими значеннями.

Потім ми створюємо нову сутність Bet. Її id буде `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, що гарантує завжди унікальне значення. Використання лише хешу недостатньо, оскільки хтось може викликати функцію placeBet кілька разів в одній транзакції через смарт-контракт.

Нарешті, ми можемо оновити сутність Player усіма даними. В масиви не можна додавати елементи безпосередньо (push), їх потрібно оновлювати, як показано тут. Ми використовуємо id для посилання на ставку. А `.save()` потрібен у кінці для збереження сутності.

Повну документацію можна переглянути тут: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Ви також можете додати вивід журналу (logging) у файл відображення, див. [тут](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // створити, якщо ще не існує
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

  // оновити масив ось так
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Використання у фронтенді {#using-it-in-the-frontend}

Використовуючи щось на кшталт Apollo Boost, ви можете легко інтегрувати The Graph у свій децентралізований застосунок (dapp) на React (або Apollo-Vue). Особливо при використанні хуків React та Apollo, отримання даних стає таким же простим, як написання одного запиту GraphQL у вашому компоненті. Типове налаштування може виглядати так:

```javascript
// Переглянути всі підграфи: https://thegraph.com/explorer/
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

А тепер ми можемо написати, наприклад, такий запит. Це дозволить нам отримати:

- скільки разів поточний користувач виграв
- скільки разів поточний користувач програв
- список часових міток з усіма його попередніми ставками

Усе це в одному запиті до сервера GraphQL.

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

Але нам не вистачає останнього елемента пазла — сервера. Ви можете або запустити його самостійно, або скористатися розміщеним (hosted) сервісом.

## Сервер The Graph {#the-graph-server}

### Graph Explorer: Розміщений сервіс {#graph-explorer-the-hosted-service}

Найпростіший спосіб — скористатися розміщеним сервісом. Дотримуйтесь інструкцій [тут](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/), щоб розгорнути підграф. Для багатьох проєктів ви можете знайти вже існуючі підграфи в [провіднику (explorer)](https://thegraph.com/explorer/).

![The Graph-Explorer](./thegraph-explorer.png)

### Запуск власного вузла {#running-your-own-node}

Як альтернативу, ви можете запустити власний вузол. Документація [тут](https://github.com/graphprotocol/graph-node#quick-start). Однією з причин для цього може бути використання мережі, яка не підтримується розміщеним сервісом. Наразі підтримувані мережі [можна знайти тут](https://thegraph.com/docs/en/developing/supported-networks/).

## Децентралізоване майбутнє {#the-decentralized-future}

GraphQL також підтримує потоки (streams) для нових вхідних подій. Вони підтримуються в The Graph через [Substreams](https://thegraph.com/docs/en/substreams/), які наразі перебувають у відкритій бета-версії.

У [2021](https://thegraph.com/blog/mainnet-migration/) році The Graph розпочав перехід до децентралізованої мережі індексування. Ви можете прочитати більше про архітектуру цієї децентралізованої мережі індексування [тут](https://thegraph.com/docs/en/network/explorer/).

Два ключові аспекти:

1. Користувачі платять індексаторам за запити.
2. Індексатори стейкають токени Graph (GRT).