---
title: "Серверні компоненти та агенти для web3-додатків"
description: "Після прочитання цього посібника ви зможете писати сервери на TypeScript, які прослуховують події в блокчейні та реагують на них власними транзакціями. Це дозволить вам писати централізовані додатки (оскільки сервер є точкою відмови), які можуть взаємодіяти з web3-сутностями. Ці ж методи можна використовувати для написання агента, який реагує на події в ланцюжку без участі людини."

author: "Орі Померанц"
lang: uk
tags: [ "агент", "сервер", "поза ланцюжком" ]
skill: beginner
published: 15.07.2024
---

## Вступ {#introduction}

У більшості випадків децентралізований додаток використовує сервер для розповсюдження програмного забезпечення, але вся фактична взаємодія відбувається між клієнтом (зазвичай веб-браузером) і блокчейном.

![Звичайна взаємодія між веб-сервером, клієнтом і блокчейном](./fig-1.svg)

Однак є випадки, коли додатку буде корисно мати серверний компонент, який працює незалежно. Такий сервер зможе реагувати на події та запити з інших джерел, наприклад, API, шляхом випуску транзакцій.

![Взаємодія з додаванням сервера](./fig-2.svg)

Є кілька можливих завдань, які такий сервер міг би виконувати.

- Зберігач таємного стану. В іграх часто буває корисно, щоб не вся інформація, якою володіє гра, була доступною гравцям. Однак _у блокчейні немає секретів_, будь-яку інформацію в блокчейні будь-хто може легко дізнатися. Тому, якщо частина ігрового стану має зберігатися в секреті, її потрібно зберігати деінде (і, можливо, перевіряти наслідки цього стану за допомогою [доказів із нульовим розголошенням](/zero-knowledge-proofs)).

- Централізований оракул. Якщо ставки досить низькі, зовнішній сервер, який зчитує певну інформацію онлайн, а потім публікує її в ланцюжку, може бути достатньо хорошим для використання як [оракул](/developers/docs/oracles/).

- Агент. У блокчейні нічого не відбувається без транзакції, яка б це активувала. Сервер може діяти від імені користувача, щоб виконувати такі дії, як [арбітраж](/developers/docs/mev/#mev-examples-dex-arbitrage), коли з’являється така можливість.

## Приклад програми {#sample-program}

Ви можете побачити приклад сервера [на Github](https://github.com/qbzzt/20240715-server-component). Цей сервер прослуховує події, що надходять від [цього контракту](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), модифікованої версії Hardhat Greeter. Коли привітання змінюється, він змінює його назад.

Щоб запустити її:

1. Клонуйте репозиторій.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Встановіть необхідні пакети. Якщо у вас його ще немає, [спочатку встановіть Node](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Відредагуйте `.env`, щоб вказати приватний ключ облікового запису, який має ETH у тестовій мережі Holesky. Якщо у вас немає ETH у мережі Holesky, ви можете [скористатися цим краном](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <тут ваш приватний ключ>
   ```

4. Запустіть сервер.

   ```sh copy
   npm start
   ```

5. Перейдіть до [оглядача блоків](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) і, використовуючи іншу адресу, ніж та, що має приватний ключ, змініть привітання. Переконайтеся, що привітання автоматично змінюється назад.

### Як це працює? {#how-it-works}

Найпростіший спосіб зрозуміти, як написати серверний компонент, — це розібрати приклад рядок за рядком.

#### `src/app.ts` {#src-app-ts}

Переважна більшість програми міститься в [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Створення необхідних об'єктів

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Це сутності [Viem](https://viem.sh/), які нам потрібні, функції та [тип `Address`](https://viem.sh/docs/glossary/types#address). Цей сервер написаний на [TypeScript](https://www.typescriptlang.org/), який є розширенням JavaScript, що робить його [сильно типізованим](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Ця функція](https://viem.sh/docs/accounts/privateKey) дозволяє нам генерувати інформацію про гаманець, включно з адресою, що відповідає приватному ключу.

```typescript
import { holesky } from "viem/chains"
```

Щоб використовувати блокчейн у Viem, вам потрібно імпортувати його визначення. У цьому випадку ми хочемо підключитися до тестового блокчейну [Holesky](https://github.com/eth-clients/holesky).

```typescript
// Так ми додаємо визначення з .env до process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

Так ми зчитуємо `.env` у середовище. Це потрібно нам для приватного ключа (див. далі).

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

Щоб використовувати контракт, нам потрібна його адреса та [ABI](/glossary/#abi) для нього. Ми надаємо обидва тут.

У JavaScript (а отже, і в TypeScript) не можна присвоїти нове значення константі, але _можна_ змінити об'єкт, який у ній зберігається. Використовуючи суфікс `as const`, ми повідомляємо TypeScript, що сам список є константою і не може бути змінений.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Створюємо [публічний клієнт](https://viem.sh/docs/clients/public.html) Viem. Публічні клієнти не мають прикріпленого приватного ключа, а отже, не можуть надсилати транзакції. Вони можуть викликати [`view` функції](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), зчитувати баланси облікових записів тощо.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Змінні середовища доступні в [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Однак TypeScript є сильно типізованим. Змінна середовища може бути будь-яким рядком або порожньою, тому тип для змінної середовища — `string | undefined`. Однак ключ у Viem визначається як `0x${string}` (`0x` з подальшим рядком). Тут ми повідомляємо TypeScript, що змінна середовища `PRIVATE_KEY` буде цього типу. Якщо це не так, ми отримаємо помилку виконання.

Функція [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) потім використовує цей приватний ключ для створення повного об'єкта облікового запису.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Далі ми використовуємо об'єкт облікового запису для створення [клієнта гаманця](https://viem.sh/docs/clients/wallet). Цей клієнт має приватний ключ та адресу, тому його можна використовувати для надсилання транзакцій.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Тепер, коли ми маємо всі необхідні умови, ми нарешті можемо створити [екземпляр контракту](https://viem.sh/docs/contract/getContract). Ми будемо використовувати цей екземпляр контракту для зв'язку з контрактом у ланцюжку.

##### Читання з блокчейну

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Функції контракту, які доступні лише для читання ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) та [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)), доступні під `read`. У цьому випадку ми використовуємо його для доступу до функції [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), яка повертає привітання.

JavaScript є однопотоковим, тому, коли ми запускаємо тривалий процес, нам потрібно [вказати, що ми робимо це асинхронно](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Виклик блокчейну, навіть для операції лише для читання, вимагає обміну даними між комп'ютером і вузлом блокчейну. Ось чому ми вказуємо тут, що код повинен `await` (очікувати) на результат.

Якщо вас цікавить, як це працює, ви можете [прочитати про це тут](https://www.w3schools.com/js/js_promise.asp), але з практичної точки зору все, що вам потрібно знати, це те, що ви `await` (очікуєте) результатів, якщо ви починаєте операцію, яка займає багато часу, і що будь-яка функція, яка це робить, має бути оголошена як `async`.

##### Випуск транзакцій

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Це функція, яку ви викликаєте, щоб випустити транзакцію, яка змінює привітання. Оскільки це тривала операція, функція оголошена як `async`. Через внутрішню реалізацію будь-яка `async` функція повинна повертати об'єкт `Promise`. У цьому випадку `Promise<any>` означає, що ми не вказуємо, що саме буде повернуто в `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Поле `write` екземпляра контракту має всі функції, що записують у стан блокчейну (ті, що вимагають надсилання транзакції), наприклад [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Параметри, якщо вони є, надаються у вигляді списку, і функція повертає хеш транзакції.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Повідомте хеш транзакції (як частину URL-адреси до оглядача блоків для її перегляду) і поверніть його.

##### Реагування на події

```typescript
greeter.watchEvent.SetGreeting({
```

[Функція `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) дозволяє вказати, що функція має виконуватися, коли виникає подія. Якщо вас цікавить лише один тип подій (у цьому випадку `SetGreeting`), ви можете використовувати цей синтаксис, щоб обмежитися цим типом подій.

```typescript
    onLogs: logs => {
```

Функція `onLogs` викликається, коли є записи в журналі. У Ethereum `log` (журнал) і `event` (подія) зазвичай є взаємозамінними.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Може бути кілька подій, але для простоти нас цікавить лише перша. `logs[0].args` — це аргументи події, у цьому випадку `sender` і `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Якщо відправником є _не_ цей сервер, використовуйте `setGreeting`, щоб змінити привітання.

#### `package.json` {#package-json}

[Цей файл](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) керує конфігурацією [Node.js](https://nodejs.org/en). У цій статті пояснюються лише важливі визначення.

```json
{
  "main": "dist/index.js",
```

Це визначення вказує, який файл JavaScript запускати.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Скрипти — це різні дії програми. У цьому випадку єдиний, що ми маємо, це `start`, який компілює, а потім запускає сервер. Команда `tsc` є частиною пакета `typescript` і компілює TypeScript у JavaScript. Якщо ви хочете запустити його вручну, він знаходиться в `node_modules/.bin`. Друга команда запускає сервер.

```json
  "type": "module",
```

Існує кілька типів додатків вузлів JavaScript. Тип `module` дозволяє нам мати `await` у коді верхнього рівня, що важливо, коли ви виконуєте повільні (і тому асинхронні) операції.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Це пакети, які потрібні лише для розробки. Тут нам потрібен `typescript`, і оскільки ми використовуємо його з Node.js, ми також отримуємо типи для змінних і об’єктів вузла, наприклад `process`. [Нотація `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) означає цю версію або вищу версію, яка не має кардинальних змін. Див. [тут](https://semver.org) для отримання додаткової інформації про значення номерів версій.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Це пакети, які потрібні під час виконання, під час запуску `dist/app.js`.

## Висновок {#conclusion}

Централізований сервер, який ми тут створили, виконує свою роботу, яка полягає в тому, щоб діяти як агент для користувача. Будь-хто інший, хто хоче, щоб dapp продовжував функціонувати, і готовий витрачати газ, може запустити новий екземпляр сервера зі своєю власною адресою.

Однак це працює лише тоді, коли дії централізованого сервера можна легко перевірити. Якщо централізований сервер має будь-яку секретну інформацію про стан або виконує складні обчислення, це централізована сутність, якій потрібно довіряти, щоб використовувати додаток, а саме цього намагаються уникнути блокчейни. У наступній статті я планую показати, як використовувати [докази з нульовим розголошенням](/zero-knowledge-proofs), щоб обійти цю проблему.

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).
