---
title: "Odesílání tokenů pomocí ethers.js"
description: "Průvodce pro začátečníky odesíláním tokenů pomocí ethers.js."
author: Kim YongJun
tags: ["ETHERS.JS", "ERC-20", "tokeny"]
skill: beginner
breadcrumb: "Odesílání tokenů"
lang: cs
published: 2021-04-06
---

## Odesílání tokenů pomocí ethers.js(5.0) {#send-token}

### V tomto tutoriálu se naučíte, jak {#you-learn-about}

- Importovat ethers.js
- Převést token
- Nastavit cenu plynu podle vytížení sítě

### Jak začít {#to-get-started}

Abychom mohli začít, musíme nejprve importovat knihovnu ethers.js do našeho JavaScriptu.
Zahrnutí ethers.js(5.0)

### Instalace {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 v prohlížeči

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Váš kód zde...
</script>
```

ES3(UMD) v prohlížeči

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parametry {#param}

1. **`contract_address`**: Adresa kontraktu tokenu (adresa kontraktu je nutná, pokud token, který chcete převést, není ether)
2. **`send_token_amount`**: Částka, kterou chcete odeslat příjemci
3. **`to_address`**: Adresa příjemce
4. **`send_account`**: Adresa odesílatele
5. **`private_key`**: Soukromý klíč odesílatele k podepsání transakce a samotnému převodu tokenů

## Upozornění {#notice}

`signTransaction(tx)` je odstraněno, protože `sendTransaction()` to provádí interně.

## Postup odesílání {#procedure}

### 1. Připojení k síti (testnet) {#connect-to-network}

#### Nastavení poskytovatele (Infura) {#set-provider}

Připojení k testnetu Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Vytvoření peněženky {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Připojení peněženky k síti {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Získání aktuální ceny plynu {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Definování transakce {#define-transaction}

Níže definované proměnné závisí na `send_token()`

### Parametry transakce {#transaction-params}

1. **`send_account`**: adresa odesílatele tokenu
2. **`to_address`**: adresa příjemce tokenu
3. **`send_token_amount`**: množství tokenů k odeslání
4. **`gas_limit`**: limit plynu
5. **`gas_price`**: cena plynu

[Níže naleznete návod k použití](#how-to-use)

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

### 6. Převod {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## Jak to použít {#how-to-use}

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

### Úspěch! {#success}

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
      // obecné odeslání tokenu
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Kolik tokenů?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Odeslat tokeny
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // odeslání etheru
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