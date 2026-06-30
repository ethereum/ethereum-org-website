---
title: "Дозвіл вашим користувачам без газу зберігати токени та викликати контракти"
description: "Використовуючи абстракцію облікового запису, ми можемо створювати гаманці смарт-контрактів, які приймають транзакції, надіслані певним EOA або підписані цим EOA. Ці смарт-контракти можуть володіти токенами, які перебувають під контролем EOA."
author: "Орі Померанц"
tags:
  - без газу
  - ERC-20
  - абстракція облікового запису
skill: intermediate
breadcrumb: "Токен без газу"
lang: uk
published: 2026-04-01
---

## Вступ {#introduction}

У [попередній статті](/developers/tutorials/gasless/) обговорювалося використання доступу без газу до вашого власного застосунку за допомогою підписів EIP-712, але це обмежується вашими власними смарт-контрактами. Використовуючи [абстракцію облікового запису](/roadmap/account-abstraction/), ми можемо створювати гаманці смарт-контрактів, які приймають два типи транзакцій і ретранслюють їх до запитаного місця призначення:

- Транзакції, надіслані певним EOA (що вимагає наявності ETH на цьому EOA)
- Транзакції, надіслані звідки завгодно, але підписані тим самим EOA.

Таким чином, ми можемо надати акаунту спосіб без газу зберігати активи (токени тощо) і виконувати всі функції, які може виконувати EOA з газом.

### Чому ми не можемо просто ретранслювати запит? {#why-no-tx-origin}

У стандартах ERC-20 та пов'язаних з ними власником акаунта є [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), адреса, яка викликала контракт токена, що не обов'язково є ініціатором транзакції, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). Це необхідно з [міркувань безпеки](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). Це означає, що якщо ми ретранслюємо запити на переказ токенів, вони спробують переказати токени з адреси ретранслятора, а не з адреси, яку контролює користувач.

Існує рішення, яке дозволяє використовувати адресу EOA через [EIP-7702](https://eip7702.io/), але воно вимагає підписання потенційно небезпечного делегування, тому ви можете використовувати його лише для делегування смарт-контракту, який схвалює провайдер гаманця. Для цього посібника я віддаю перевагу набагато простішому методу створення смарт-контракту як проксі для користувача.

## Як це працює на практиці {#in-action}

1. Переконайтеся, що у вас встановлені [Node](https://nodejs.org/en/download) та [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Клонуйте застосунок і встановіть необхідне програмне забезпечення.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Відредагуйте `.env`, щоб встановити `SEPOLIA_PRIVATE_KEY` на гаманець, який має ETH у мережі Sepolia. Якщо вам потрібні Sepolia ETH, [скористайтеся краном](/developers/docs/networks/#sepolia), щоб отримати їх. В ідеалі цей приватний ключ має відрізнятися від того, який ви використовуєте у своєму браузерному гаманці.

4. Запустіть сервер.

   ```sh
   npm run dev
   ```

5. Перейдіть до застосунку за URL-адресою [`http://localhost:5173`](http://localhost:5173).

6. Натисніть **Connect with Injected**, щоб підключитися до гаманця. Схваліть у гаманці та схваліть зміну мережі на Sepolia, якщо це необхідно.

7. Прокрутіть униз і натисніть **Deploy UserProxy (slow process)**.

8. Ви можете побачити, коли проксі користувача розгорнуто, оскільки поруч із **UserProxy access** з'явиться адреса. Якщо ви зачекали 24 секунди (2 блоки), а цього все ще не сталося, можливо, виникла проблема з виявленням змін.

   Якщо це так, перейдіть до [оглядача блоків Sepolia](https://eth-sepolia.blockscout.com/) і введіть хеш транзакції розгортання, який ви бачите у виводі сервера в `npm run dev`. Натисніть на створений контракт, щоб переглянути його адресу, а потім скопіюйте її. Вставте адресу в поле _Or enter existing proxy address_, а потім натисніть **Set proxy address**.

9. Натисніть **Request more tokens for proxy**, щоб надіслати виклик до функції [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) контракту ERC-20 для отримання токенів. **Підтвердьте** підпис у гаманці. Звісно, токени надходять на адресу проксі, а не користувача.

10. Прокрутіть униз і натисніть посилання під _Last transaction:_. Це відкриє браузер, щоб показати вам транзакцію `faucet`.

11. У полі _amount to transfer_ введіть число від одного до тисячі. Натисніть **Transfer**, щоб переказати токени на власну адресу. Перш ніж натиснути **Confirm** для запиту, зверніть увагу, що дані, які підписуються, є непрозорими. Користувачам було б важко зрозуміти, що вони підписують. Пам'ятайте, що ми обговоримо це [нижче](#vulnerabilities).

12. Після підтвердження транзакції зачекайте, щоб побачити зміни як у _your balance_, так і в _proxy balance_. Зверніть увагу, що це також займе деякий час, оскільки час блоку в Sepolia становить 12 секунд.

## Як це працює {#how-work}

Для роботи без газу нам потрібен інтерфейс користувача, сервер для маршрутизації повідомлень від інтерфейсу користувача до ланцюга та смарт-контракт для їх отримання та перевірки.

### Смарт-контракт гаманця {#wallet-smart-contract}

Це [смарт-контракт](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Його мета — виконувати все, що просить справжній власник, незалежно від каналу, який використовується для запиту, та ігнорувати все інше. Для цього його функції отримують цільову адресу для виклику та дані, які слід використовувати для її виклику.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

Особа власника та [нонс](https://en.wikipedia.org/wiki/Cryptographic_nonce) для запобігання повторенню повідомлень. Оскільки нонс є змінною `public`, компілятор Solidity також створює функцію перегляду (view function), [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), яка дозволяє позамережевому коду зчитувати його значення.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

Інформація, необхідна для перевірки [підписів EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

`UserProxy` прив'язаний до однієї адреси власника. Це необхідно, оскільки він може володіти активами (токенами ERC-20, NFT тощо). Ми не хочемо змішувати активи, що належать різним власникам.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[Роздільник домену](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Його неможливо обчислити під час компіляції, оскільки він залежить від ідентифікатора ланцюга та адреси контракту. Це унеможливлює обман UserProxy повідомленням, підготовленим для іншого.

```solidity
    event CallResult(address target, bytes returnData);
```

Лог результатів виклику.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Цю функцію може викликати безпосередньо власник. Якщо ретранслятори недоступні, власник все одно може отримати доступ до активів безпосередньо в блокчейні (якщо користувач має ETH).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Якщо нас викликає _безпосередньо_ власник, викликаємо ціль із наданими даними виклику.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

Це основна функція `UserProxy`. Вона отримує `target` та `data`, а також підпис.

```solidity
    external returns (bytes memory) {
        // Обчислити дайджест EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

Дайджест також містить нонс, але нам не потрібно отримувати його з транзакції; ми вже знаємо правильне значення. Підпис із неправильним нонсом буде відхилено.

```solidity

    // Відновити підписанта
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Якщо підпис недійсний, `ecrecover` зазвичай повертає іншу адресу, і його не буде прийнято.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Викликаємо контракт, який користувач наказав нам викликати, і скасовуємо, якщо виклик неуспішний.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Збільшити нонс для запобігання повторному відтворенню

    return returnData;
}
```

У разі успіху генеруємо подію логу та збільшуємо нонс.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

Це майже ідентичні варіанти, які також дозволяють переказувати ETH з контракту.

### Ретранслятор {#relayer}

Ретранслятор — це [серверний компонент](/developers/tutorials/server-components/). Він написаний на JavaScript; ви можете переглянути вихідний код [тут](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

Бібліотеки, які нам потрібні. Це сервер [Express](https://expressjs.com/), який використовує [Vite](https://vite.dev/) для обслуговування коду інтерфейсу користувача. Ми використовуємо [Viem](https://viem.sh/) для зв'язку з блокчейном і [dotenv](https://www.dotenv.org/) для зчитування приватного ключа адреси, яка надсилає транзакцію.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Це простий спосіб зчитати скомпільований `UserProxy`. Нам потрібен ABI, щоб мати можливість викликати `UserProxy`, і скомпільований код, щоб мати можливість розгорнути його для користувача.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Зчитуємо файл `.env`, витягуємо адресу та виводимо її в консоль.

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Клієнти Viem, які взаємодіють із блокчейном.

```js
const start = async () => {
  const app = express()
```

Запускаємо сервер Express.

```js
  app.use(express.json())
```

Вказуємо Express зчитувати тіло запиту, і якщо це JSON, аналізувати його.

```js
  app.post("/server/deploy", async (req, res) => {
```

Це код, який обробляє запити на розгортання проксі. Зверніть увагу, що тут ми вразливі до атак [відмови в обслуговуванні (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack), оскільки зловмисник може спамити нас запитами на розгортання проксі, доки наші ETH не вичерпаються. У виробничій системі ми, ймовірно, вимагали б, щоб запит на розгортання проксі був підписаний, а підписантом був існуючий клієнт.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Отримуємо адресу власника із запиту.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[Розгортаємо контракт](https://viem.sh/docs/contract/deployContract#deploycontract) і [чекаємо, поки він буде розгорнутий](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Якщо все добре, повертаємо адресу проксі до інтерфейсу користувача.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Якщо виникла проблема, повідомляємо про неї.

```js
  app.post("/server/message", async (req, res) => {
```

Це код, який обробляє повідомлення користувача для контракту `UserProxy`. Це ще одна точка, вразлива до атаки відмови в обслуговуванні.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

Отримуємо дані запиту та використовуємо їх для виклику `signedAccess` на проксі.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Повертаємо хеш транзакції. Це дозволяє інтерфейсу користувача відображати URL-адресу, щоб користувач міг перевірити транзакцію.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Знову ж таки, якщо виникла проблема, повідомляємо про неї.

```js
  // Нехай Vite обробить все інше
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

Для всього іншого використовуємо Vite, який обробляє обслуговування інтерфейсу користувача для нас.

### Інтерфейс користувача {#user-interface}

[Це код інтерфейсу користувача](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). Більша частина коду майже ідентична тій, що задокументована в [цій статті](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through), за винятком [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Частини [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) схожі на [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) у [цій статті](/developers/tutorials/gasless/#ui-changes). Ось нові частини.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Ця функція](https://viem.sh/docs/contract/encodeFunctionData) створює дані виклику для виклику функції EVM. Це необхідно, щоб користувач міг підписати дані виклику.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`, пояснений вище.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Цей контракт](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) здебільшого є звичайним контрактом ERC-20, з додаванням однієї важливої функції, `faucet()`. Ця функція надає токени будь-кому, хто їх просить, для цілей тестування.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

Адреса для `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Цей компонент виводить адресу з посиланням на контракт в оглядачі блоків.

```js
const Token = () => {
    ...
```

Це основний компонент, який виконує більшу частину роботи.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

Баланс токенів адреси користувача.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

Адреса проксі, що належить користувачеві.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

Баланс токенів проксі.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Це поле використовується, коли користувач вручну встановлює адресу проксі. Можливість встановлювати адресу проксі вручну дозволяє користувачеві використовувати існуючий проксі замість того, щоб щоразу розгортати новий (і втрачати всі токени, якими володів старий проксі).

```js
  const [ txHash, setTxHash ] = useState(null)
```

Хеш останньої транзакції, який використовується для відображення посилання на оглядач, щоб користувач міг перевірити цю транзакцію.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Усі ці поля використовуються для надсилання команд переказу токенів до контракту ERC-20. Це може бути `FaucetToken`, але не обов'язково. Функція [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) є частиною стандарту ERC-20.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Зчитуємо два баланси токенів, які нас цікавлять: скільки належить користувачеві та скільки належить проксі.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Щоб запобігти атакам повторного відтворення (наприклад, продавець повторно відтворює транзакцію, яка дає йому гроші), ми використовуємо [нонс](https://en.wikipedia.org/wiki/Cryptographic_nonce). Нам потрібно знати поточне значення, щоб додати його до даних, які ми підписуємо.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

Використовуйте [`useEffect`](https://react.dev/reference/react/useEffect), щоб оновити баланс, який відображається користувачеві, коли інформація, зчитана з блокчейну, змінюється.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

За замовчуванням токени `FaucetToken` переказуються на власний акаунт користувача. Тут ми встановлюємо ці значення, коли отримуємо їх від Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Обробники подій для випадків, коли текстові поля змінюються.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Просимо сервер розгорнути проксі для цього користувача.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Підписуємо повідомлення перед надсиланням його на сервер для відправки до `UserProxy` ончейн. Це пояснюється [тут](/developers/tutorials/gasless/#ui-changes). Нам потрібно підписати повідомлення як із цільовою адресою (адресою токена, який ми викликаємо), так і з даними виклику для надсилання.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Надсилаємо підписане повідомлення до `UserProxy`, який перевірить підпис, а потім надішле його до `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // обидві адреси
          data,           // дані виклику для відправки цілі
          v, r, s         // підпис
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Надсилаємо запит на сервер, і коли ви отримаєте відповідь, отримуємо хеш транзакції.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Імітуємо виклик функції `faucet`. Ми вмикаємо кнопку крана, лише якщо це успішно.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

Щоб викликати функцію через сервер і `UserProxy`, ми виконуємо три кроки:

1. Створюємо дані виклику для підписання та надсилання за допомогою [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Підписуємо повідомлення (цільова адреса, дані виклику та нонс).

3. Надсилаємо повідомлення на сервер.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

Ця частина компонента дозволяє використовувати `FaucetToken` безпосередньо з браузера. Її основна мета — полегшити налагодження.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Дозволяємо користувачеві розгорнути новий `UserProxy`.

```js
         <br /><br />
         <input type="text" placeholder="Або введіть існуючу проксі-адресу" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Дозволяємо користувачам натискати **Set proxy address** лише тоді, коли вони вводять легітимну адресу. Зверніть увагу, що це не гарантує, що ця адреса дійсно є контрактом `UserProxy`. Можна додати таку перевірку, але це буде набагато повільніше (гірший досвід користувача) і не покращить безпеку (зловмисники завжди можуть використовувати власний код для інтерфейсу користувача).

```js
         <br /><br />
         { proxyAddr && (
```

Показуємо решту _лише_ за наявності легітимної адреси проксі.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

Користувачеві не потрібно знати нонс; це лише для цілей налагодження.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Ми не можемо імітувати виклик `faucet()` через проксі. Однак ми можемо принаймні переконатися, що у нас є проксі і що проксі повідомив нам нонс.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

Дозволяємо користувачеві видавати транзакції переказу ERC-20.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

Якщо є хеш останньої транзакції, показуємо посилання, щоб користувач міг переглянути його в оглядачі блоків.

```js
 
</div>
    </>
  )
}

export {Token}
```

Це просто шаблонний код React.

## Вразливості {#vulnerabilities}

Наш сервер вразливий до атак відмови в обслуговуванні. Ця атака пояснюється [у попередній статті серії](/developers/tutorials/gasless/#dos-on-server).

Крім того, ми заохочуємо погану поведінку користувачів. Ось що ми просимо користувача підписати:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_Ми_ знаємо, що це легітимний переказ ERC-20 для токена, суми та адреси призначення, які користувач хоче переказати. Але більшість користувачів не знають, як інтерпретувати дані виклику, і не мають уявлення, що вони підписують. Це поганий дизайн з двох причин:

- Деякі користувачі не будуть використовувати нас, оскільки вони не довіряють даним, які ми просимо їх підписати.
- Інші користувачі _будуть_ довіряти нам і засвоять, що їм слід просто підписувати дані виклику, не розуміючи, що це таке. Це означає, що якщо зловмиснику Адаму вдасться перенаправити їх на свій вебсайт, він зможе змусити їх підписати транзакцію, яка надасть йому всі USDC (або DAI, або будь-які інші ERC-20), якими володіє користувач.

Рішення полягає в тому, щоб мати окремі функції в `UserProxy` для часто використовуваних функцій, таких як переказ. Тоді користувачі зможуть підписувати те, що вони розуміють.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Примітка:** Хоча користувачі можуть використовувати будь-який гаманець, який вони хочуть, настійно рекомендується, щоб застосунки, які використовують EIP-712, заохочували їх використовувати гаманець, який [показує всі дані підпису](https://rabby.io/). Деякі гаманці обрізають адресу, що є небезпечним. Зловмисник може створити адресу, яка має однакові початкові та кінцеві символи, але відрізняється посередині.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Висновок {#conclusion}

Окрім вищезазначених вразливостей, рішення в цьому посібнику має кілька недоліків, які Етеріум може допомогти нам усунути.

- _Стійкість до цензури_. Наразі користувачі можуть використовувати ваш сервер, конкуруючий сервер, налаштований кимось іншим, або підключатися до Етеріуму безпосередньо, що тягне за собою витрати на газ. Використання [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) дозволяє користувачам пропонувати свою транзакцію великому пулу серверів, зменшуючи ймовірність того, що їхні транзакції будуть піддані цензурі.
- _Активи, що належать EOA_. Як зазначалося вище, [EIP-7702](https://eip7702.io/) можна використовувати для управління активами, які вже належать адресі EOA. Це має свої труднощі, але іноді це необхідно.

Я сподіваюся опублікувати посібники про додавання цих функцій найближчим часом.

[Дивіться тут більше моїх робіт](https://cryptodocguy.pro/).
