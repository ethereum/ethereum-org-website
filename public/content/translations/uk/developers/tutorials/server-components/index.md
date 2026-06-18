---
title: "Серверні компоненти та агенти для web3-застосунків"
description: Після прочитання цього посібника ви зможете писати сервери на TypeScript, які прослуховують події в блокчейні та відповідно реагують на них власними транзакціями. Це дозволить вам створювати централізовані застосунки (оскільки сервер є точкою відмови), які можуть взаємодіяти з web3-сутностями. Ті ж самі методи можна використовувати для написання агента, який реагує на ончейн-події без участі людини.
author: Орі Померанц
lang: uk
tags: ["агент", "сервер", "офчейн", "dapps"]
skill: beginner
breadcrumb: Серверні компоненти
published: 2024-07-15
---

## Вступ {#introduction}

У більшості випадків децентралізований застосунок (dapp) використовує сервер для розповсюдження програмного забезпечення, але вся фактична взаємодія відбувається між клієнтом (зазвичай веббраузером) та блокчейном.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

Однак існують випадки, коли застосунку було б корисно мати серверний компонент, який працює незалежно. Такий сервер міг би реагувати на події та на запити, що надходять з інших джерел, таких як API, шляхом надсилання транзакцій.

![The interaction with the addition of a server](./fig-2.svg)

Існує кілька можливих завдань, які міг би виконувати такий сервер.

- Зберігач секретного стану. В іграх часто корисно, щоб не вся інформація, відома грі, була доступна гравцям. Однак _у блокчейні немає секретів_, будь-яку інформацію, що знаходиться в блокчейні, легко дізнатися будь-кому. Тому, якщо частину стану гри потрібно тримати в таємниці, її слід зберігати в іншому місці (і, можливо, перевіряти наслідки цього стану за допомогою [доведень з нульовим розголошенням](/zero-knowledge-proofs)).

- Централізований оракул. Якщо ставки достатньо низькі, зовнішній сервер, який зчитує певну інформацію в інтернеті, а потім публікує її в ланцюзі, може бути цілком придатним для використання як [оракул](/developers/docs/oracles/).

- Агент. У блокчейні нічого не відбувається без транзакції, яка б це активувала. Сервер може діяти від імені користувача для виконання таких дій, як [арбітраж](/developers/docs/mev/#mev-examples-dex-arbitrage), коли з'являється така можливість.

## Приклад програми {#sample-program}

Ви можете переглянути приклад сервера [на GitHub](https://github.com/qbzzt/20240715-server-component). Цей сервер прослуховує події, що надходять від [цього контракту](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), модифікованої версії Greeter від Hardhat. Коли привітання змінюється, він змінює його назад.

Щоб запустити його:

1. Клонуйте репозиторій.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Встановіть необхідні пакети. Якщо у вас його ще немає, [спочатку встановіть Node.js](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Відредагуйте `.env`, щоб вказати приватний ключ акаунта, який має ETH у тестовій мережі Голескі. Якщо у вас немає ETH у Голескі, ви можете [скористатися цим краном](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. Запустіть сервер.

   ```sh copy
   npm start
   ```

5. Перейдіть до [оглядача блоків](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) і, використовуючи іншу адресу (не ту, від якої у вас є приватний ключ), змініть привітання. Переконайтеся, що привітання автоматично змінюється назад.

### Як це працює? {#how-it-works}

Найпростіший спосіб зрозуміти, як написати серверний компонент — це розібрати приклад рядок за рядком.

#### `src/app.ts` {#src-app-ts}

Переважна більшість програми міститься у [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Створення необхідних об'єктів {#package-json}

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Це сутності [Viem](https://viem.sh/), які нам потрібні: функції та [тип `Address`](https://viem.sh/docs/glossary/types#address). Цей сервер написаний на [TypeScript](https://www.typescriptlang.org/), який є розширенням JavaScript, що робить його [строго типізованим](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Ця функція](https://viem.sh/docs/accounts/privateKey) дозволяє нам генерувати інформацію про гаманець, включно з адресою, що відповідає приватному ключу.

```typescript
import { holesky } from "viem/chains"
```

Щоб використовувати блокчейн у Viem, потрібно імпортувати його визначення. У цьому випадку ми хочемо підключитися до тестового блокчейну [Голескі](https://github.com/eth-clients/holesky).

```typescript
// Ось як ми додаємо визначення з .env до process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

Ось як ми зчитуємо `.env` у середовище. Це потрібно нам для приватного ключа (див. далі).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Щоб використовувати контракт, нам потрібна його адреса та [ABI](/glossary/#abi) для нього. Ми надаємо і те, і інше тут.

У JavaScript (а отже, і в TypeScript) ви не можете призначити нове значення константі, але ви _можете_ змінити об'єкт, який у ній зберігається. Використовуючи суфікс `as const`, ми повідомляємо TypeScript, що сам список є константою і не може бути змінений.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Створіть [публічний клієнт](https://viem.sh/docs/clients/public.html) Viem. Публічні клієнти не мають прив'язаного приватного ключа, а тому не можуть надсилати транзакції. Вони можуть викликати [функції `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), зчитувати баланси акаунтів тощо.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Змінні середовища доступні в [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Однак TypeScript є строго типізованим. Змінна середовища може бути будь-яким рядком або порожньою, тому тип для змінної середовища — `string | undefined`. Проте ключ у Viem визначається як `0x${string}` (`0x` з наступним рядком). Тут ми повідомляємо TypeScript, що змінна середовища `PRIVATE_KEY` матиме саме цей тип. Якщо це не так, ми отримаємо помилку під час виконання.

Потім функція [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) використовує цей приватний ключ для створення повноцінного об'єкта акаунта.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Далі ми використовуємо об'єкт акаунта для створення [клієнта гаманця](https://viem.sh/docs/clients/wallet). Цей клієнт має приватний ключ та адресу, тому його можна використовувати для надсилання транзакцій.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Тепер, коли у нас є всі необхідні компоненти, ми нарешті можемо створити [екземпляр контракту](https://viem.sh/docs/contract/getContract). Ми будемо використовувати цей екземпляр контракту для зв'язку з ончейн-контрактом.

##### Зчитування з блокчейну {#conclusion}

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Функції контракту, які призначені лише для зчитування ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) та [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)), доступні в `read`. У цьому випадку ми використовуємо його для доступу до функції [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), яка повертає привітання.

JavaScript є однопотоковим, тому, коли ми запускаємо тривалий процес, нам потрібно [вказати, що ми робимо це асинхронно](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Звернення до блокчейну, навіть для операції зчитування, вимагає двостороннього зв'язку між комп'ютером і вузлом блокчейну. Саме тому ми вказуємо тут, що код повинен очікувати (`await`) на результат.

Якщо вам цікаво, як це працює, ви можете [прочитати про це тут](https://www.w3schools.com/js/js_promise.asp), але на практиці все, що вам потрібно знати, це те, що ви використовуєте `await` для результатів, якщо починаєте операцію, яка займає багато часу, і що будь-яка функція, яка це робить, має бути оголошена як `async`.

##### Надсилання транзакцій

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Це функція, яку ви викликаєте для надсилання транзакції, що змінює привітання. Оскільки це тривала операція, функція оголошена як `async`. Через внутрішню реалізацію будь-яка функція `async` повинна повертати об'єкт `Promise`. У цьому випадку `Promise<any>` означає, що ми не вказуємо, що саме буде повернуто в `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Поле `write` екземпляра контракту містить усі функції, які записують у стан блокчейну (ті, що вимагають надсилання транзакції), наприклад [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Параметри, якщо такі є, надаються у вигляді списку, а функція повертає хеш транзакції.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Повідомте хеш транзакції (як частину URL-адреси до оглядача блоків для її перегляду) та поверніть його.

##### Реагування на події

```typescript
greeter.watchEvent.SetGreeting({
```

[Функція `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) дозволяє вказати, що функція має виконуватися під час випромінювання події. Якщо вас цікавить лише один тип події (у цьому випадку `SetGreeting`), ви можете використати цей синтаксис, щоб обмежитися цим типом події.

```typescript
    onLogs: logs => {
```

Функція `onLogs` викликається, коли є записи логів. В Етеріумі «лог» та «подія» зазвичай є взаємозамінними поняттями.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Може бути кілька подій, але для простоти нас цікавить лише перша. `logs[0].args` — це аргументи події, у цьому випадку `sender` та `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Якщо відправником є _не_ цей сервер, використовуйте `setGreeting` для зміни привітання.

#### `package.json`

[Цей файл](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) керує конфігурацією [Node.js](https://nodejs.org/en). У цій статті пояснюються лише важливі визначення.

```json
{
  "main": "dist/index.js",
```

Це визначення вказує, який файл JavaScript потрібно запустити.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Скрипти — це різні дії застосунку. У цьому випадку єдиний скрипт, який у нас є, це `start`, який компілює, а потім запускає сервер. Команда `tsc` є частиною пакета `typescript` і компілює TypeScript у JavaScript. Якщо ви хочете запустити її вручну, вона знаходиться в `node_modules/.bin`. Друга команда запускає сервер.

```json
  "type": "module",
```

Існує кілька типів застосунків Node.js на JavaScript. Тип `module` дозволяє нам використовувати `await` у коді верхнього рівня, що важливо, коли ви виконуєте повільні (і тому асинхронні) операції.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Це пакети, які потрібні лише для розробки. Тут нам потрібен `typescript`, і оскільки ми використовуємо його з Node.js, ми також отримуємо типи для змінних та об'єктів Node, таких як `process`. [Нотація `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) означає цю версію або вищу версію, яка не має критичних змін. Дивіться [тут](https://semver.org) для отримання додаткової інформації про значення номерів версій.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Це пакети, які потрібні під час виконання, коли запускається `dist/app.js`.

## Висновок

Централізований сервер, який ми тут створили, виконує свою роботу, яка полягає в тому, щоб діяти як агент для користувача. Будь-хто інший, хто хоче, щоб децентралізований застосунок (dapp) продовжував функціонувати, і готовий витрачати газ, може запустити новий екземпляр сервера зі своєю власною адресою.

Однак це працює лише тоді, коли дії централізованого сервера можна легко перевірити. Якщо централізований сервер має будь-яку секретну інформацію про стан або виконує складні обчислення, він є централізованою сутністю, якій потрібно довіряти для використання застосунку, а це саме те, чого блокчейни намагаються уникнути. У майбутній статті я планую показати, як використовувати [доведення з нульовим розголошенням](/zero-knowledge-proofs), щоб обійти цю проблему.

[Дивіться тут більше моїх робіт](https://cryptodocguy.pro/).