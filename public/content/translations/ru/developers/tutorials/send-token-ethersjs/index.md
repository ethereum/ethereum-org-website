---
title: "Отправка токенов с помощью ethers.js"
description: "Руководство для начинающих по отправке токенов с помощью ethers.js."
author: "Ким Ёнджун"
tags: ["ETHERS.JS", "ERC-20", "токены"]
skill: beginner
breadcrumb: "Отправка токенов"
lang: ru
published: 2021-04-06
---

## Отправка токенов с помощью ethers.js (5.0) {#send-token}

### В этом руководстве вы узнаете, как {#you-learn-about}

- Импортировать ethers.js
- Переводить токены
- Устанавливать цену газа в зависимости от загруженности сети

### Начало работы {#to-get-started}

Для начала работы необходимо сначала импортировать библиотеку ethers.js в наш JavaScript-код.
Подключите ethers.js v5
### Установка {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 в браузере

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Ваш код здесь...
</script>
```

ES3 (UMD) в браузере

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Параметры {#param}

1. **`contract_address`**: Адрес контракта токена (адрес контракта необходим, если токен, который вы хотите перевести, не является эфиром)
2. **`send_token_amount`**: Сумма, которую вы хотите отправить получателю
3. **`to_address`**: Адрес получателя
4. **`send_account`**: Адрес отправителя
5. **`private_key`**: Приватный ключ отправителя для подписания транзакции и фактического перевода токенов

## Примечание {#notice}

`signTransaction(tx)` удален, так как `sendTransaction()` делает это внутренне.

## Процедура отправки {#procedure}

### 1. Подключение к сети (тестовая сеть) {#connect-to-network}

#### Настройка провайдера (Infura) {#set-provider}

Подключение к тестовой сети Ропстен

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Создание кошелька {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Подключение кошелька к сети {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Получение текущей цены газа {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // цена газа
```

### 5. Определение транзакции {#define-transaction}

Переменные, определенные ниже, зависят от `send_token()`

### Параметры транзакции {#transaction-params}

1. **`send_account`**: адрес отправителя токена
2. **`to_address`**: адрес получателя токена
3. **`send_token_amount`**: количество токенов для отправки
4. **`gas_limit`**: лимит газа
5. **`gas_price`**: цена газа

[Смотрите ниже, как это использовать](#how-to-use)

```javascript
const tx = {
  from: send_account,
  to: to_address,
  value: ethers.utils.parseEther(send_token_amount),
  nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
  gasLimit: ethers.utils.hexlify(gas_limit), // 100000
  gasPrice: gas_price,
}
```

### 6. Перевод {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## Как это использовать {#how-to-use}

```javascript
let private_key =
  "41559d28e936dc92104ff30691519693fc753ffbee6251a611b9aa1878f12a4d"
let send_token_amount = "1"
let to_address = "0x4c10D2734Fb76D3236E522509181CC3Ba8DE0e80"
let send_address = "0xda27a282B5B6c5229699891CfA6b900A716539E6"
let gas_limit = "0x100000"
let wallet = new ethers.Wallet(private_key)
let walletSigner = wallet.connect(window.ethersProvider)
let contract_address = ""
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")

send_token(
  contract_address,
  send_token_amount,
  to_address,
  send_address,
  private_key
)
```

### Успех! {#success}

![image of transaction done successfully](./successful-transaction.png)

## send_token() {#send-token-method}

```javascript
function send_token(
  contract_address,
  send_token_amount,
  to_address,
  send_account,
  private_key
) {
  let wallet = new ethers.Wallet(private_key)
  let walletSigner = wallet.connect(window.ethersProvider)

  window.ethersProvider.getGasPrice().then((currentGasPrice) => {
    let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice))
    console.log(`gas_price: ${gas_price}`)

    if (contract_address) {
      // общая отправка токенов
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Сколько токенов?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Отправить токены
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // отправка эфира
    else {
      const tx = {
        from: send_account,
        to: to_address,
        value: ethers.utils.parseEther(send_token_amount),
        nonce: window.ethersProvider.getTransactionCount(
          send_account,
          "latest"
        ),
        gasLimit: ethers.utils.hexlify(gas_limit), // 100000
        gasPrice: gas_price,
      }
      console.dir(tx)
      try {
        walletSigner.sendTransaction(tx).then((transaction) => {
          console.dir(transaction)
          alert("Send finished!")
        })
      } catch (error) {
        alert("failed to send!!")
      }
    }
  })
}
```
