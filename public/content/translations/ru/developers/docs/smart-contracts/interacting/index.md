---
title: Взаимодействие со смарт-контрактами
description: Узнайте, как читать данные из смарт-контрактов и записывать их в смарт-контракты, которые уже развернуты в Эфириуме.
lang: ru
---

Вам не всегда нужно писать и развертывать собственный смарт-контракт. Чаще всего, как разработчик, вы будете взаимодействовать со смарт-контрактами, которые другие уже развернули в сети Эфириум.

На этой странице рассматриваются два основных способа взаимодействия со смарт-контрактом — **чтение** данных и **запись** данных, — а также инструменты, необходимые для выполнения обеих задач.

## Предварительные требования {#prerequisites}

Вы должны понимать:

- [Как работают смарт-контракты](/developers/docs/smart-contracts/)
- [Аккаунты Эфириума и как они подписывают транзакции](/developers/docs/accounts/)
- [Что такое транзакция](/developers/docs/transactions/)

## Два способа взаимодействия со смарт-контрактом {#two-ways}

Взаимодействие со смарт-контрактом делится на две категории:

### Чтение из контракта {#reading-from-a-contract}

Чтение — это **бесплатная** операция, которая не создает транзакцию и не изменяет состояние в блокчейне.

Когда вы читаете из контракта, вы просто запрашиваете уже существующие данные. Например:

- Проверка баланса токена ERC-20
- Чтение текущей цены с децентрализованной биржи
- Получение владельца NFT

Поскольку чтение не изменяет состояние, оно не требует затрат [газа](/developers/docs/gas/) и может быть выполнено кем угодно без необходимости иметь ETH.

### Запись в контракт {#writing-to-a-contract}

Запись — это операция, **изменяющая состояние**, которая требует транзакции и затрат газа.

Когда вы записываете в контракт, вы вызываете функцию, которая изменяет состояние блокчейна. Например:

- Перевод токенов
- Обмен токенов на децентрализованной бирже
- Чеканка NFT

Запись всегда требует:

1. [Внешнего аккаунта (EOA)](/developers/docs/accounts/#types-of-account) с достаточным количеством ETH для оплаты газа
2. Транзакции, подписанной приватным ключом аккаунта
3. Майнинга транзакции и включения ее в блок

Благодаря [абстракции учетной записи](/roadmap/account-abstraction/) аккаунт смарт-контракта также может инициировать запись, а пеймейстер может покрыть расходы на газ от имени пользователя — поэтому наличие внешнего аккаунта (EOA) с ETH не является строго обязательным.

## Понимание ABI контракта {#understanding-contract-abis}

Чтобы взаимодействовать со смарт-контрактом, вашему приложению нужно знать, *что* контракт может делать. Здесь на помощь приходит **двоичный интерфейс приложения (ABI)**.

ABI — это JSON-документ, который описывает:

- Каждую функцию, которую предоставляет контракт (имя, входные и выходные данные)
- Каждое событие, которое контракт может генерировать
- Как кодировать и декодировать данные при взаимодействии с контрактом

Думайте об ABI как о руководстве по эксплуатации контракта — без него ваше приложение не знает, какие функции существуют или какие параметры они ожидают.

### Где найти ABI контракта {#where-to-find-abis}

- **Верифицированные контракты на Etherscan** — [Etherscan](https://etherscan.io) автоматически предоставляет ABI для верифицированного исходного кода
- **От разработчика** — многие проекты публикуют свои ABI в документации или npm-пакетах
- **Генерация из исходного кода** — если у вас есть исходный код на Solidity, вы можете [скомпилировать его](/developers/docs/smart-contracts/compiling/) для получения ABI

## Инструменты и библиотеки для взаимодействия с контрактами {#tools-and-libraries}

Разработчики обычно используют библиотеку JavaScript/TypeScript для взаимодействия с контрактами из веб-приложения, бэкенда или скрипта.

### Клиентские библиотеки (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** — современный, легковесный TypeScript-интерфейс для Эфириума с первоклассной безопасностью типов
- **[ethers.js](https://docs.ethers.org/)** — проверенная временем библиотека для взаимодействия с блокчейном Эфириума
- **[web3.js](https://web3js.org/)** — оригинальный JavaScript API для Эфириума

### Бэкенд-библиотеки {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** — также работает в Node.js для серверных скриптов и ботов
- **[Web3.py](https://web3py.readthedocs.io/)** — библиотека Python для взаимодействия с Эфириумом
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** — официальная библиотека Go от команды Geth

### Пример: чтение баланса токена с помощью Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Адрес контракта USDC и ABI (частичный, для balanceOf)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // У USDC 6 десятичных знаков
```

### Пример: отправка транзакции с помощью ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI перевода ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // дождаться майнинга транзакции
console.log(`Transferred! TX: ${tx.hash}`)
```

## События и журналы {#events-and-logs}

Смарт-контракты могут генерировать **события**, чтобы сигнализировать о том, что что-то произошло. Ваше приложение может прослушивать эти события, чтобы реагировать в режиме реального времени.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Отслеживать события перевода USDC
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Симуляция транзакций {#simulating}

Перед отправкой транзакции вы можете **симулировать** ее, чтобы проверить, будет ли она успешной, и увидеть возвращаемое значение без затрат газа. Это полезно для раннего обнаружения ошибок и предварительного просмотра результатов.

Большинство клиентских библиотек поддерживают это через `eth_call`:

```ts
// С помощью Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Кошельки и подписание {#wallets-and-signing}

В децентрализованном приложении (dapp) кошелек пользователя (например, МетаМаск, Rainbow или WalletConnect) обрабатывает подписание. Вы не управляете приватными ключами напрямую.

[Библиотеки кошельков и инструменты подключения](/developers/docs/apis/javascript/) абстрагируют это, чтобы вы могли сосредоточиться на создании логики вашего приложения.

## Связанные руководства {#related-tutorials}

- [Вызов смарт-контракта из JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Отправка транзакций с использованием web3.js и Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Как просмотреть свой NFT в кошельке](/developers/tutorials/how-to-view-nft-in-metamask/)

## Дополнительная литература {#further-reading}

- [Документация Viem: Чтение и запись в контракты](https://viem.sh/docs/contract/readContract)
- [Документация ethers.js: Контракты](https://docs.ethers.org/v6/api/contract/)
- [Спецификация ABI Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [Что такое ABI? — Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Связанные темы {#related-topics}

- [Компиляция смарт-контрактов](/developers/docs/smart-contracts/compiling/)
- [Развертывание смарт-контрактов](/developers/docs/smart-contracts/deploying/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [Бэкенд API](/developers/docs/apis/backend/)