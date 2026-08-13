---
title: Взаємодія зі смарт-контрактами
description: Дізнайтеся, як зчитувати та записувати дані у смарт-контракти, які вже розгорнуті в Етеріумі.
lang: uk
---

Вам не завжди потрібно писати та розгортати власний смарт-контракт. Здебільшого, як розробник, ви захочете взаємодіяти зі смарт-контрактами, які інші вже розгорнули в мережі Етеріум.

На цій сторінці розглядаються два основні способи взаємодії зі смарт-контрактом — **зчитування** даних і **запис** даних — а також інструменти, необхідні для обох дій.

## Передумови {#prerequisites}

Ви повинні розуміти:

- [Як працюють смарт-контракти](/developers/docs/smart-contracts/)
- [Акаунти Етеріуму та як вони підписують транзакції](/developers/docs/accounts/)
- [Що таке транзакція](/developers/docs/transactions/)

## Два способи взаємодії зі смарт-контрактом {#two-ways}

Взаємодія зі смарт-контрактом поділяється на дві категорії:

### Зчитування з контракту {#reading-from-a-contract}

Зчитування — це **безкоштовна** операція, яка не створює транзакцію і не змінює жодного стану в блокчейні.

Коли ви зчитуєте дані з контракту, ви просто запитуєте дані, які вже існують. Наприклад:

- Перевірка балансу токенів ERC-20
- Зчитування поточної ціни з децентралізованої біржі
- Отримання власника NFT

Оскільки зчитування не змінює стан, воно не потребує витрат на [газ](/developers/docs/gas/) і може бути виконане будь-ким без необхідності мати ETH.

### Запис у контракт {#writing-to-a-contract}

Запис — це операція, що **змінює стан**, яка вимагає транзакції та витрат на газ.

Коли ви записуєте дані в контракт, ви викликаєте функцію, яка змінює стан блокчейну. Наприклад:

- Переказ токенів
- Обмін токенів на децентралізованій біржі
- Карбування NFT

Запис завжди вимагає:

1. [Зовнішній акаунт (EOA)](/developers/docs/accounts/#types-of-account) з достатньою кількістю ETH для оплати газу
2. Транзакцію, підписану приватним ключем акаунта
3. Щоб транзакція була видобута та включена в блок

Завдяки [абстракції облікового запису](/roadmap/account-abstraction/), акаунт смарт-контракту також може ініціювати запис, а пеймайстер може покрити витрати на газ від імені користувача — тому EOA з ETH не є суворо обов'язковим.

## Розуміння ABI контракту {#understanding-contract-abis}

Щоб взаємодіяти зі смарт-контрактом, ваш застосунок повинен знати, *що* контракт може робити. Саме тут на допомогу приходить **двійковий інтерфейс застосунку (ABI)**.

ABI — це JSON-документ, який описує:

- Кожну функцію, яку надає контракт (ім'я, вхідні та вихідні дані)
- Кожну подію, яку контракт може генерувати
- Як кодувати та декодувати дані під час взаємодії з контрактом

Уявіть ABI як інструкцію до контракту — без неї ваш застосунок не знатиме, які функції існують або які параметри вони очікують.

### Де знайти ABI контракту {#where-to-find-abis}

- **Верифіковані контракти на Etherscan** — [Etherscan](https://etherscan.io) автоматично надає ABI для верифікованого вихідного коду
- **Від розробника** — багато проєктів публікують свої ABI у документації або npm-пакетах
- **Згенерувати з вихідного коду** — якщо у вас є вихідний код Solidity, ви можете [скомпілювати його](/developers/docs/smart-contracts/compiling/), щоб отримати ABI

## Інструменти та бібліотеки для взаємодії з контрактами {#tools-and-libraries}

Розробники зазвичай використовують бібліотеку JavaScript/TypeScript для взаємодії з контрактами з вебзастосунку, бекенду або скрипту.

### Клієнтські бібліотеки (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** — сучасний, легкий інтерфейс TypeScript для Етеріуму з першокласною безпекою типів
- **[Ethers.js](https://docs.ethers.org/)** — перевірена часом бібліотека для взаємодії з блокчейном Етеріуму
- **[Web3.js](https://web3js.org/)** — оригінальний JavaScript API для Етеріуму

### Бекенд-бібліотеки {#backend-libraries}

- **[Ethers.js](https://docs.ethers.org/)** — також працює в Node.js для серверних скриптів і ботів
- **[Web3.py](https://web3py.readthedocs.io/)** — бібліотека Python для взаємодії з Етеріумом
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** — офіційна бібліотека Go від команди Geth

### Приклад: зчитування балансу токенів за допомогою Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Адреса контракту USDC та ABI (частковий, для balanceOf)
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

console.log(formatUnits(balance, 6)) // USDC має 6 десяткових знаків
```

### Приклад: надсилання транзакції за допомогою Ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI переказу ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // зачекайте, поки транзакція буде видобута
console.log(`Transferred! TX: ${tx.hash}`)
```

## Події та журнали {#events-and-logs}

Смарт-контракти можуть генерувати **події**, щоб сигналізувати про те, що щось сталося. Ваш застосунок може прослуховувати ці події, щоб реагувати в режимі реального часу.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Відстежувати події USDC Transfer
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Симуляція транзакцій {#simulating}

Перед надсиланням транзакції ви можете **симулювати** її, щоб перевірити, чи буде вона успішною, і побачити її значення, що повертається, без витрат на газ. Це корисно для раннього виявлення помилок і попереднього перегляду результатів.

Більшість клієнтських бібліотек підтримують це через `eth_call`:

```ts
// З Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Гаманці та підписання {#wallets-and-signing}

У децентралізованому застосунку (dapp) гаманець користувача (наприклад, МетаМаск, Rainbow або WalletConnect) обробляє підписання. Ви не керуєте приватними ключами безпосередньо.

[Бібліотеки гаманців та інструменти підключення](/developers/docs/apis/javascript/) абстрагують це, щоб ви могли зосередитися на створенні логіки вашого застосунку.

## Пов'язані посібники {#related-tutorials}

- [Виклик смарт-контракту з JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Надсилання транзакцій за допомогою Web3.js та Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Як переглянути свій NFT у гаманці](/developers/tutorials/how-to-view-nft-in-metamask/)

## Додаткові матеріали {#further-reading}

- [Документація Viem: Зчитування та запис у контракти](https://viem.sh/docs/contract/readContract)
- [Документація Ethers.js: Контракти](https://docs.ethers.org/v6/api/contract/)
- [Специфікація ABI Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [Що таке ABI? — Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Пов'язані теми {#related-topics}

- [Компіляція смарт-контрактів](/developers/docs/smart-contracts/compiling/)
- [Розгортання смарт-контрактів](/developers/docs/smart-contracts/deploying/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [Бекенд API](/developers/docs/apis/backend/)