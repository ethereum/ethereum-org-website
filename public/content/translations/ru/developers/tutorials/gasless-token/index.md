---
title: "Позвольте вашим пользователям без газа хранить токены и вызывать контракты"
description: "Используя абстракцию учетной записи, мы можем создавать кошельки на базе смарт-контрактов, которые принимают транзакции, отправленные определенным EOA или подписанные им. Затем эти смарт-контракты могут владеть токенами, которые находятся под контролем EOA."
author: "Ори Померанц"
tags: ["без газа", "ERC-20", "абстракция учетной записи"]
skill: intermediate
breadcrumb: "Токен без газа"
lang: ru
published: 2026-04-01
---

## Введение {#introduction}

В [предыдущей статье](/developers/tutorials/gasless/) обсуждалось использование доступа без газа к вашему собственному приложению с помощью подписей EIP-712, но это ограничено вашими собственными смарт-контрактами. Используя [абстракцию учетной записи](/roadmap/account-abstraction/), мы можем создавать кошельки на базе смарт-контрактов, которые принимают два типа транзакций и ретранслируют их в запрошенное место назначения:

- Транзакции, отправленные определенным внешне принадлежащим аккаунтом (EOA) (что требует наличия ETH на этом EOA)
- Транзакции, отправленные откуда угодно, но подписанные тем же EOA.

Таким образом, мы можем предоставить аккаунту способ без газа хранить активы (токены и т. д.) и выполнять все функции, которые может выполнять EOA с газом.

### Почему мы не можем просто ретранслировать запрос? {#why-no-tx-origin}

В ERC-20 и связанных стандартах владельцем аккаунта является [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) — адрес, который вызвал контракт токена, что не обязательно совпадает с инициатором транзакции, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). Это необходимо по [соображениям безопасности](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). Это означает, что если мы будем ретранслировать запросы на перевод токенов, они попытаются перевести токены с адреса ретранслятора, а не с адреса, контролируемого пользователем.

Существует решение, позволяющее использовать адрес EOA через [EIP-7702](https://eip7702.io/), но оно требует подписания потенциально опасного делегирования, поэтому вы можете использовать его только для делегирования смарт-контракту, который одобряет провайдер кошелька. Для этого руководства я предпочитаю гораздо более простой метод создания смарт-контракта в качестве прокси для пользователя.

## Как это работает на практике {#in-action}

1. Убедитесь, что у вас установлены [Node](https://nodejs.org/en/download) и [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Клонируйте приложение и установите необходимое программное обеспечение.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Отредактируйте `.env`, чтобы установить для `SEPOLIA_PRIVATE_KEY` кошелек, на котором есть ETH в сети Sepolia. Если вам нужны Sepolia ETH, [используйте кран](/developers/docs/networks/#sepolia), чтобы получить их. В идеале этот приватный ключ должен отличаться от того, который вы используете в своем браузерном кошельке.

4. Запустите сервер.

   ```sh
   npm run dev
   ```

5. Перейдите к приложению по URL-адресу [`http://localhost:5173`](http://localhost:5173).

6. Нажмите **Connect with Injected**, чтобы подключиться к кошельку. Одобрите действие в кошельке и при необходимости одобрите переключение на сеть Sepolia.

7. Прокрутите вниз и нажмите **Deploy UserProxy (slow process)**.

8. Вы можете увидеть, когда пользовательский прокси развернут, так как рядом с **UserProxy access** появится адрес. Если вы подождали 24 секунды (2 блока), и этого все еще не произошло, возможно, возникла проблема с обнаружением изменений.

   В таком случае перейдите в [обозреватель блоков Sepolia](https://eth-sepolia.blockscout.com/) и введите хеш транзакции развертывания, который вы видите в выводе сервера в `npm run dev`. Нажмите на созданный контракт, чтобы просмотреть его адрес, затем скопируйте его. Вставьте адрес в поле _Or enter existing proxy address_, затем нажмите **Set proxy address**.

9. Нажмите **Request more tokens for proxy**, чтобы отправить вызов функции [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) контракта ERC-20 для получения токенов. **Подтвердите** подпись в кошельке. Конечно, токены поступают на адрес прокси, а не пользователя.

10. Прокрутите вниз и нажмите на ссылку под _Last transaction:_. Откроется браузер, в котором будет показана транзакция `faucet`.

11. В поле _amount to transfer_ введите число от одного до тысячи. Нажмите **Transfer**, чтобы перевести токены на свой собственный адрес. Прежде чем нажать **Confirm** для запроса, обратите внимание, что подписываемые данные непрозрачны. Пользователям было бы трудно понять, что они подписывают. Помните, что мы обсудим это [ниже](#vulnerabilities).

12. После подтверждения транзакции подождите, пока не увидите изменения как в _your balance_, так и в _proxy balance_. Обратите внимание, что это также займет некоторое время, поскольку время блока в Sepolia составляет 12 секунд.

## Как это работает {#how-work}

Для работы без газа нам нужен пользовательский интерфейс для пользователя, сервер для маршрутизации сообщений от пользовательского интерфейса в цепь и смарт-контракт для их получения и проверки.

### Смарт-контракт кошелька {#wallet-smart-contract}

Это [смарт-контракт](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Его цель — выполнять все, что запрашивает реальный владелец, независимо от канала, используемого для запроса, и игнорировать все остальное. Для этого его функции получают целевой адрес для вызова и данные для его вызова.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

Личность владельца и [нонс](https://en.wikipedia.org/wiki/Cryptographic_nonce) для предотвращения повторения сообщений. Поскольку нонс является переменной `public`, компилятор Solidity также создает функцию просмотра [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), которая позволяет офчейн-коду считывать ее значение.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

Информация, необходимая для проверки [подписей EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

`UserProxy` привязан к одному адресу владельца. Это необходимо, поскольку он может владеть активами (токенами ERC-20, NFT и т. д.). Мы не хотим смешивать активы, принадлежащие разным владельцам.

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

[Разделитель домена](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Его нельзя вычислить во время компиляции, поскольку он зависит от идентификатора цепи и адреса контракта. Это делает невозможным обман UserProxy сообщением, подготовленным для другого.

```solidity
    event CallResult(address target, bytes returnData);
```

Записать в лог результаты вызова.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Эта функция может быть вызвана непосредственно владельцем. Если ретрансляторы недоступны, владелец все равно может получить доступ к активами напрямую в блокчейне (если у пользователя есть ETH).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Если нас вызывает _напрямую_ владелец, вызываем цель с предоставленными данными вызова.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

Это основная функция `UserProxy`. Она получает `target` и `data`, а также подпись.

```solidity
    external returns (bytes memory) {
        // Вычислить дайджест EIP-712
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

Дайджест также включает нонс, но нам не нужно получать его из транзакции; мы уже знаем правильное значение. Подпись с неправильным нонсом будет отклонена.

```solidity

    // Восстановить подписанта
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Если подпись недействительна, `ecrecover` обычно возвращает другой адрес, и она не будет принята.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Вызываем контракт, который пользователь указал нам вызвать, и выполняем откат в случае неудачи.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Увеличить нонс для предотвращения повторного воспроизведения

    return returnData;
}
```

В случае успеха генерируем событие в лог и увеличиваем нонс.

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

Это почти идентичные варианты, которые также позволяют вам переводить ETH из контракта.

### Ретранслятор {#relayer}

Ретранслятор — это [серверный компонент](/developers/tutorials/server-components/). Он написан на JavaScript; вы можете посмотреть исходный код [здесь](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

Необходимые нам библиотеки. Это сервер [Express](https://expressjs.com/), который использует [Vite](https://vite.dev/) для обслуживания кода пользовательского интерфейса. Мы используем [Viem](https://viem.sh/) для связи с блокчейном и [dotenv](https://www.dotenv.org/) для чтения приватного ключа адреса, который отправляет транзакцию.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Это простой способ прочитать скомпилированный `UserProxy`. Нам нужен ABI, чтобы иметь возможность вызывать `UserProxy`, и скомпилированный код, чтобы иметь возможность развернуть его для пользователя.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Читаем файл `.env`, извлекаем адрес и выводим его в консоль.

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

Клиенты Viem, которые взаимодействуют с блокчейном.

```js
const start = async () => {
  const app = express()
```

Запускаем сервер Express.

```js
  app.use(express.json())
```

Указываем Express прочитать тело запроса и, если это JSON, проанализировать его.

```js
  app.post("/server/deploy", async (req, res) => {
```

Это код, который обрабатывает запросы на развертывание прокси. Обратите внимание, что здесь мы уязвимы для атак [отказа в обслуживании (DoS)](https://en.wikipedia.org/wiki/Denial-of-service_attack), поскольку злоумышленник может заспамить нас запросами на развертывание прокси, пока наши ETH не будут исчерпаны. В производственной системе мы, вероятно, потребовали бы, чтобы запрос на развертывание прокси был подписан, а подписавший был существующим клиентом.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Получаем адрес владельца из запроса.

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

[Развертываем контракт](https://viem.sh/docs/contract/deployContract#deploycontract) и [ждем, пока он не будет развернут](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Если все в порядке, возвращаем адрес прокси в пользовательский интерфейс.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Если возникла проблема, сообщаем о ней.

```js
  app.post("/server/message", async (req, res) => {
```

Это код, который обрабатывает сообщения пользователя для контракта `UserProxy`. Это еще одна точка, уязвимая для атаки отказа в обслуживании.

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

Получаем данные запроса и используем их для вызова `signedAccess` на прокси.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Сообщаем хеш транзакции. Это позволяет пользовательскому интерфейсу отображать URL-адрес, чтобы пользователь мог проверить транзакцию.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Опять же, если есть проблема, сообщаем о ней.

```js
  // Пусть Vite обрабатывает все остальное
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

Для всего остального используем Vite, который занимается обслуживанием пользовательского интерфейса для нас.

### Пользовательский интерфейс {#user-interface}

[Это код пользовательского интерфейса](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). Большая часть кода почти идентична той, что задокументирована в [этой статье](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through), за исключением [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Части [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) похожи на [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) в [этой статье](/developers/tutorials/gasless/#ui-changes). Вот новые части.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Эта функция](https://viem.sh/docs/contract/encodeFunctionData) создает данные вызова для вызова функции EVM. Это необходимо, чтобы пользователь мог подписать данные вызова.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`, объясненный выше.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Этот контракт](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) в основном является обычным контрактом ERC-20, с добавлением одной важной функции — `faucet()`. Эта функция предоставляет токены любому, кто их запрашивает, в целях тестирования.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

Адрес для `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Этот компонент выводит адрес со ссылкой на контракт в обозревателе блоков.

```js
const Token = () => {
    ...
```

Это основной компонент, который выполняет большую часть работы.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

Баланс токенов на адресе пользователя.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

Адрес прокси, принадлежащего пользователю.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

Баланс токенов прокси.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Это поле используется, когда пользователь вручную устанавливает адрес прокси. Возможность установить адрес прокси вручную позволяет пользователю использовать существующий прокси вместо того, чтобы каждый раз развертывать новый (и терять все токены, принадлежащие старому прокси).

```js
  const [ txHash, setTxHash ] = useState(null)
```

Хеш последней транзакции, используемый для отображения ссылки на обозреватель, чтобы пользователь мог проверить эту транзакцию.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Все эти поля используются для отправки команд перевода токенов в контракт ERC-20. Это может быть `FaucetToken`, но не обязательно. Функция [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) является частью стандарта ERC-20.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Считываем два интересующих нас баланса токенов: сколько принадлежит пользователю и сколько принадлежит прокси.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Для предотвращения атак повторного воспроизведения (например, когда продавец повторяет транзакцию, которая приносит ему деньги), мы используем [нонс](https://en.wikipedia.org/wiki/Cryptographic_nonce). Нам нужно знать текущее значение, чтобы добавить его к подписываемым данным.

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

Используйте [`useEffect`](https://react.dev/reference/react/useEffect) для обновления баланса, отображаемого пользователю, когда информация, считанная из блокчейна, изменяется.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

По умолчанию токены `FaucetToken` переводятся на собственный аккаунт пользователя. Здесь мы устанавливаем эти значения, когда получаем их от Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Обработчики событий для изменения текстовых полей.

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

Просим сервер развернуть прокси для этого пользователя.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Подписываем сообщение перед отправкой его на сервер для отправки в `UserProxy` ончейн. Это объясняется [здесь](/developers/tutorials/gasless/#ui-changes). Нам нужно подписать сообщение как с целевым адресом (адресом токена, который мы вызываем), так и с данными вызова для отправки.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Отправляем подписанное сообщение в `UserProxy`, который проверит подпись, а затем отправит его на `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // оба адреса
          data,           // данные вызова для отправки цели
          v, r, s         // подпись
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Отправляем запрос на сервер и, когда получаем ответ, извлекаем хеш транзакции.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Симулируем вызов функции `faucet`. Мы включаем кнопку крана только в случае успеха.

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

Чтобы вызвать функцию через сервер и `UserProxy`, мы выполняем три шага:

1. Создаем данные вызова для подписания и отправки с помощью [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Подписываем сообщение (целевой адрес, данные вызова и нонс).

3. Отправляем сообщение на сервер.

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

Эта часть компонента позволяет вам использовать `FaucetToken` прямо из браузера. Ее основная цель — облегчить отладку.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Позволяем пользователю развернуть новый `UserProxy`.

```js
         <br /><br />
         <input type="text" placeholder="Или введите существующий адрес прокси" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Позволяем пользователям нажимать **Set proxy address** только тогда, когда они вводят правильный адрес. Обратите внимание, что это не гарантирует, что рассматриваемый адрес действительно является контрактом `UserProxy`. Можно добавить такую проверку, но это будет намного медленнее (худший пользовательский опыт) и не улучшит безопасность (злоумышленники всегда могут использовать свой собственный код для пользовательского интерфейса).

```js
         <br /><br />
         { proxyAddr && (
```

Показываем остальное _только_ в том случае, если есть правильный адрес прокси.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

Пользователю не нужно знать нонс; это только для целей отладки.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Мы не можем симулировать вызов `faucet()` через прокси. Однако мы можем по крайней мере убедиться, что у нас есть прокси и что прокси сообщил нам нонс.

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

Позволяем пользователю инициировать транзакции перевода ERC-20.

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

Если есть хеш последней транзакции, показываем ссылку, чтобы пользователь мог просмотреть ее в обозревателе блоков.

```js
 
</div>
    </>
  )
}

export {Token}
```

Это просто шаблонный код React.

## Уязвимости {#vulnerabilities}

Наш сервер уязвим для атак отказа в обслуживании. Эта атака объясняется [в предыдущей статье серии](/developers/tutorials/gasless/#dos-on-server).

Кроме того, мы поощряем плохое поведение пользователей. Вот что мы просим пользователя подписать:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_Мы_ знаем, что это законный перевод ERC-20 для токена, суммы и адреса назначения, которые пользователь хочет перевести. Но большинство пользователей не знают, как интерпретировать данные вызова, и понятия не имеют, что они подписывают. Это плохой дизайн по двум причинам:

- Некоторые пользователи не будут использовать нас, потому что они не доверяют данным, которые мы просим их подписать.
- Другие пользователи _будут_ доверять нам и усвоят, что им следует просто подписывать данные вызова, не понимая, что это такое. Это означает, что если злоумышленнику Адаму удастся перенаправить их на свой веб-сайт, он сможет заставить их подписать транзакцию, которая предоставит ему все USDC (или DAI, или любой другой ERC-20), которыми владеет пользователь.

Решение состоит в том, чтобы иметь отдельные функции в `UserProxy` для часто используемых функций, таких как перевод. Тогда пользователи смогут подписывать то, что они понимают.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Примечание:** Хотя пользователи могут использовать любой кошелек, который они хотят, настоятельно рекомендуется, чтобы приложения, использующие EIP-712, поощряли их использовать кошелек, который [показывает все данные подписи](https://rabby.io/). Некоторые кошельки усекают адрес, что небезопасно. Злоумышленник может создать адрес, который имеет те же начальные и конечные символы, но отличается в середине.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Заключение {#conclusion}

В дополнение к вышеупомянутым уязвимостям, решение в этом руководстве имеет несколько недостатков, которые Эфириум может помочь нам устранить.

- _Устойчивость к цензуре_. В настоящее время пользователи могут использовать ваш сервер, конкурирующий сервер, настроенный кем-то другим, или подключаться к Эфириуму напрямую, что влечет за собой затраты на газ. Использование [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) позволяет пользователям предлагать свою транзакцию большому пулу серверов, снижая вероятность того, что их транзакции будут подвергнуты цензуре.
- _Активы, принадлежащие EOA_. Как отмечалось выше, [EIP-7702](https://eip7702.io/) можно использовать для управления активами, уже принадлежащими адресу EOA. В этом есть свои трудности, но иногда это необходимо.

Я надеюсь опубликовать руководства по добавлению этих функций в ближайшем будущем.

[Смотрите здесь больше моих работ](https://cryptodocguy.pro/).
