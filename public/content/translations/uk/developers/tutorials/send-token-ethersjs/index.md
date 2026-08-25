---
title: "Надсилання токенів за допомогою ethers.js"
description: "Посібник для початківців з надсилання токенів за допомогою ethers.js."
author: "Кім Йон Джун"
tags: ["ETHERS.JS", "ERC-20", "токени"]
skill: beginner
breadcrumb: "Надіслати токени"
lang: uk
published: 2021-04-06
---

## Надсилання токенів за допомогою ethers.js(5.0) {#send-token}

### У цьому посібнику ви дізнаєтеся, як {#you-learn-about}

- Імпортувати ethers.js
- Переказувати токени
- Встановлювати ціну газу відповідно до завантаженості мережі

### Початок роботи {#to-get-started}

Щоб почати, ми повинні спочатку імпортувати бібліотеку ethers.js у наш JavaScript
Підключіть ethers.js v5
### Встановлення {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 у браузері

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Ваш код тут...
</script>
```

ES3(UMD) у браузері

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Параметри {#param}

1. **`contract_address`**: Адреса контракту токена (адреса контракту потрібна, коли токен, який ви хочете переказати, не є етером)
2. **`send_token_amount`**: Сума, яку ви хочете надіслати одержувачу
3. **`to_address`**: Адреса одержувача
4. **`send_account`**: Адреса відправника
5. **`private_key`**: Приватний ключ відправника для підписання транзакції та фактичного переказу токенів

## Примітка {#notice}

`signTransaction(tx)` видалено, оскільки `sendTransaction()` робить це внутрішньо.

## Процедура надсилання {#procedure}

### 1. Підключення до мережі (тестова мережа) {#connect-to-network}

#### Налаштування провайдера (Infura) {#set-provider}

Підключення до тестової мережі Ропстен

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Створення гаманця {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Підключення гаманця до мережі {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Отримання поточної ціни газу {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // ціна газу
```

### 5. Визначення транзакції {#define-transaction}

Ці змінні, визначені нижче, залежать від `send_token()`

### Параметри транзакції {#transaction-params}

1. **`send_account`**: адреса відправника токена
2. **`to_address`**: адреса одержувача токена
3. **`send_token_amount`**: кількість токенів для надсилання
4. **`gas_limit`**: ліміт газу
5. **`gas_price`**: ціна газу

[Дивіться нижче, як це використовувати](#how-to-use)

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

### 6. Переказ {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## Як це використовувати {#how-to-use}

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

### Успіх! {#success}

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
      // загальна відправка токенів
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Скільки токенів?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Відправити токени
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // відправка етеру
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
