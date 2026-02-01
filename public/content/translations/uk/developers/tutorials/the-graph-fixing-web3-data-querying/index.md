---
title: "The Graph: вирішення проблеми запитів даних Web3"
description: Блокчейн подібний до бази даних, але без SQL. Усі дані є, але немає способу отримати до них доступ. Я продемонструю вам, як це виправити за допомогою The Graph та GraphQL.
author: Markus Waas
lang: uk
tags:
  [
    "мова програмування",
    "Смарт-контракти",
    "запити",
    "the graph",
    "реагування"
  ]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

Цього разу ми детальніше розглянемо The Graph, який по суті став частиною стандартного стеку для розробки dapp за останній рік. Спочатку давайте подивимося, як це робиться традиційним способом...

## Без The Graph... {#without-the-graph}

Отже, давайте розглянемо простий приклад для ілюстрації. Ми всі любимо ігри, тому уявімо просту гру, в якій користувачі роблять ставки:

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

Тепер припустимо, що в нашому dapp ми хочемо відображати загальну кількість ставок, загальну кількість програних/виграних ігор, а також оновлювати ці дані, щоразу, коли хтось грає знову. Підхід буде таким:

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

Для нашого простого прикладу це все ще більш-менш підходить. Але припустимо, що тепер ми хочемо відображати суми програних/виграних ставок лише для поточного гравця. Що ж, нам не пощастило. Краще розгорнути новий контракт, який зберігатиме ці значення, та отримувати їх. А тепер уявіть набагато складніший смартконтракт і dapp, і все може швидко заплутатися.

![Не можна просто так взяти й запитати](./one-does-not-simply-query.jpg)

Ви можете бачити, наскільки це неоптимально:

- Не працює для вже розгорнутих контрактів.
- Додаткові витрати на газ для зберігання цих значень.
- Потребує ще одного виклику для отримання даних з вузла Ethereum.

![Це недостатньо добре](./not-good-enough.jpg)

Тепер давайте розглянемо краще рішення.

## Дозвольте представити вам GraphQL {#let-me-introduce-to-you-graphql}

По-перше, давайте поговоримо про GraphQL, який був розроблений та реалізований соціальною мережею Facebook. Можливо, ви знайомі з традиційною моделлю REST API. А тепер уявіть, що замість цього ви можете написати запит саме для тих даних, які вам потрібні:

![GraphQL API проти REST API](./graphql.jpg)

![](./graphql-query.gif)

Ці два зображення практично передають суть GraphQL. За допомогою запиту праворуч ми можемо точно визначити, які дані нам потрібні, тож ми отримуємо все за один запит і нічого більше, крім того, що нам потрібно. Сервер GraphQL обробляє отримання всіх необхідних даних, тому його неймовірно легко використовувати на стороні клієнта (фронтенду). [Ось гарне пояснення](https://www.apollographql.com/blog/graphql-explained) того, як саме сервер обробляє запит, якщо вам цікаво.

Тепер, маючи ці знання, давайте нарешті зануримося у світ блокчейну та The Graph.

## Що таке The Graph? {#what-is-the-graph}

Блокчейн — це децентралізована база даних, але, на відміну від звичайних баз даних, у нас немає мови запитів для неї. Рішення для отримання даних є складними або взагалі неможливими. The Graph — це децентралізований протокол для індексування та запитів до даних блокчейну. І, як ви могли здогадатися, він використовує GraphQL як мову запитів.

![The Graph](./thegraph.png)

Приклади — це завжди найкращий спосіб щось зрозуміти, тож давайте використаємо The Graph для нашого прикладу з GameContract.

## Як створити Subgraph {#how-to-create-a-subgraph}

Визначення способу індексування даних називається субграфом (subgraph). Він потребує трьох компонентів:

1. Маніфест (`subgraph.yaml`)
2. Схема (`schema.graphql`)
3. Відображення (`mapping.ts`)

### Маніфест (`subgraph.yaml`) {#manifest}

Маніфест — це наш файл конфігурації, і він визначає:

- які смартконтракти індексувати (адреса, мережа, ABI...)
- які події прослуховувати
- інші речі для прослуховування, наприклад виклики функцій або блоки
- функції відображення, що викликаються (див. `mapping.ts` нижче)

Тут можна визначити кілька контрактів та обробників. Типове налаштування передбачає наявність папки субграфа в проєкті Hardhat із власним репозиторієм. Тоді ви зможете легко посилатися на ABI.

Для зручності ви також можете використовувати інструмент для шаблонів, наприклад mustache. Потім ви створюєте `subgraph.template.yaml` і вставляєте адреси на основі останніх розгортань. Для більш просунутого прикладу налаштування дивіться, наприклад, [репозиторій субграфа Aave](https://github.com/aave/aave-protocol/tree/master/thegraph).

А повну документацію можна переглянути [тут](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Схема — це визначення даних GraphQL. Вона дозволить вам визначити, які сутності існують та їхні типи. Підтримувані типи від The Graph:

- Байти
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

Ви також можете використовувати сутності як тип для визначення зв’язків. У нашому прикладі ми визначаємо зв’язок «один-до-багатьох» від гравця до ставок. Символ ! означає, що значення не може бути порожнім. Повну документацію можна переглянути [тут](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest).

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

Вам потрібно буде визначити кожну функцію, названу у файлі `subgraph.yaml`, тож у нашому випадку нам потрібна лише одна: `handleNewBet`. Спочатку ми намагаємося завантажити сутність Player з адреси відправника як id. Якщо її не існує, ми створюємо нову сутність і заповнюємо її початковими значеннями.

Потім ми створюємо нову сутність Bet. Ідентифікатором для цього буде `event.transaction.hash.toHex() + "-" + event.logIndex.toString()`, що завжди забезпечує унікальне значення. Використання лише хешу недостатньо, оскільки хтось може викликати функцію placeBet кілька разів за одну транзакцію через смартконтракт.

Нарешті, ми можемо оновити сутність Player, додавши всі дані. Масиви не можна доповнювати напряму, їх потрібно оновлювати, як показано тут. Ми використовуємо id для посилання на ставку. І `.save()` потрібен наприкінці, щоб зберегти сутність.

Повну документацію можна переглянути тут: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings. Ви також можете додати вивід журналу у файл відображення, див. [тут](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference).

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

  // оновити масив таким чином
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## Використання у фронтенді {#using-it-in-the-frontend}

Використовуючи щось на зразок Apollo Boost, ви можете легко інтегрувати The Graph у свій React dapp (або Apollo-Vue). Особливо при використанні хуків React і Apollo, отримання даних є таким же простим, як написання одного запиту GraphQL у вашому компоненті. Типове налаштування може виглядати так:

```javascript
// Переглянути всі субграфи: https://thegraph.com/explorer/
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

А тепер ми можемо написати, наприклад, такий запит. Це дозволить нам отримати

- скільки разів виграв поточний користувач
- скільки разів програв поточний користувач
- список часових міток з усіма його попередніми ставками

Усе в одному запиті до сервера GraphQL.

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

![Магія](./magic.jpg)

Але нам не вистачає останнього шматочка пазла, і це сервер. Ви можете або запустити його самостійно, або використовувати розміщений сервіс.

## Сервер The Graph {#the-graph-server}

### Graph Explorer: розміщений сервіс {#graph-explorer-the-hosted-service}

Найпростіший спосіб — використовувати розміщений сервіс. Дотримуйтесь інструкцій [тут](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/), щоб розгорнути субграф. Для багатьох проєктів ви можете знайти існуючі субграфи в [провіднику](https://thegraph.com/explorer/).

![The Graph Explorer](./thegraph-explorer.png)

### Запуск власного вузла {#running-your-own-node}

Крім того, ви можете запустити власний вузол. Документація [тут](https://github.com/graphprotocol/graph-node#quick-start). Однією з причин для цього може бути використання мережі, яка не підтримується розміщеним сервісом. Поточні підтримувані мережі [можна знайти тут](https://thegraph.com/docs/en/developing/supported-networks/).

## Децентралізоване майбутнє {#the-decentralized-future}

GraphQL також підтримує потоки для нових вхідних подій. Вони підтримуються в The Graph через [Substreams](https://thegraph.com/docs/en/substreams/), які зараз перебувають у відкритому бета-тестуванні.

У [2021](https://thegraph.com/blog/mainnet-migration/) році The Graph розпочав перехід до децентралізованої мережі індексації. Ви можете прочитати більше про архітектуру цієї децентралізованої мережі індексації [тут](https://thegraph.com/docs/en/network/explorer/).

Два ключові аспекти:

1. Користувачі платять індексаторам за запити.
2. Індексатори роблять ставки в токенах Graph (GRT).
