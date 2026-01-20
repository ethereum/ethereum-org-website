---
title: Отправка токенов с помощью ethers.js
description: Руководство для начинающих по отправке токенов с помощью ethers.js.
author: Ким Ён Джун
tags: [ "ETHERS.JS", "ERC-20", "ТОКЕНЫ" ]
skill: beginner
lang: ru
published: 2021-04-06
---

## Отправка токена с помощью ethers.js (5.0) {#send-token}

### Из этого руководства вы узнаете, как {#you-learn-about}

- Импортировать ethers.js
- Перевести токен
- Установить цену на газ в соответствии с загруженностью сети

### Для начала {#to-get-started}

Для начала мы должны импортировать библиотеку ethers.js в наш javascript
Подключите ethers.js(5.0)

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

ES3(UMD) в браузере

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Параметры {#param}

1. **`contract_address`**: адрес контракта токена (адрес контракта необходим, когда токен, который вы хотите перевести, не является ether)
2. **`send_token_amount`**: сумма, которую вы хотите отправить получателю
3. **`to_address`**: адрес получателя
4. **`send_account`**: адрес отправителя
5. **`private_key`**: приватный ключ отправителя для подписания транзакции и фактической передачи токенов

## Примечание {#notice}

`signTransaction(tx)` удален, потому что `sendTransaction()` выполняет это внутренне.

## Процедуры отправки {#procedure}

### 1. Подключение к сети (тестовой сети) {#connect-to-network}

#### Установить провайдера (Infura) {#set-provider}

Подключение к тестовой сети Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Создать кошелек {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Подключить кошелек к сети {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Получить текущую цену на газ {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Определить транзакцию {#define-transaction}

Переменные, определенные ниже, зависят от `send_token()`

### Параметры транзакции {#transaction-params}

1. **`send_account`**: адрес отправителя токена
2. **`to_address`**: адрес получателя токена
3. **`send_token_amount`**: количество токенов для отправки
4. **`gas_limit`**: лимит газа
5. **`gas_price`**: цена на газ

[О том, как это использовать, см. ниже](#how-to-use)

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
  alert("Отправка завершена!")
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

### Успешно! {#success}

![изображение успешно выполненной транзакции](./successful-transaction.png)

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
      // отправка обычного токена
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
        alert("токен отправлен")
      })
    } // отправка ether
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
          alert("Отправка завершена!")
        })
      } catch (error) {
        alert("не удалось отправить!!")
      }
    }
  })
}
```
