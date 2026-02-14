---
title: "Posílání tokenů pomocí ethers.js"
description: "Návod pro začátečníky k posílání tokenů pomocí ethers.js."
author: Kim YongJun
tags: [ "ETHERS.JS", "ERC-20", "TOKENY" ]
skill: beginner
lang: cs
published: 2021-04-06
---

## Odeslání tokenu pomocí ethers.js(5.0) {#send-token}

### V tomto tutoriálu se naučíte {#you-learn-about}

- Importovat ethers.js
- Převést token
- Nastavit cenu transakčních poplatků podle situace v síti

### Než začnete {#to-get-started}

Abyste mohli začít, musíme nejprve importovat knihovnu ethers.js do našeho javascriptu
Zahrňte ethers.js(5.0)

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

1. **`contract_address`**: Adresa kontraktu tokenu (adresa kontraktu je potřeba, když token, který chcete převést, není ether)
2. **`send_token_amount`**: Částka, kterou chcete poslat příjemci
3. **`to_address`**: Adresa příjemce
4. **`send_account`**: Adresa odesílatele
5. **`private_key`**: Soukromý klíč odesílatele k podepsání transakce a skutečnému převodu tokenů

## Upozornění {#notice}

`signTransaction(tx)` je odstraněno, protože `sendTransaction()` to dělá interně.

## Postupy odesílání {#procedure}

### 1. Připojit se k síti (testnet) {#connect-to-network}

#### Nastavit poskytovatele (Infura) {#set-provider}

Připojit se k Ropsten testnetu

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Vytvořit peněženku {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Připojit peněženku k síti {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Získat aktuální cenu transakčních poplatků {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // cena transakčních poplatků
```

### 5. Definovat transakci {#define-transaction}

Níže definované proměnné jsou závislé na `send_token()`

### Parametry transakce {#transaction-params}

1. **`send_account`**: adresa odesílatele tokenu
2. **`to_address`**: adresa příjemce tokenu
3. **`send_token_amount`**: počet tokenů k odeslání
4. **`gas_limit`**: limit transakčních poplatků
5. **`gas_price`**: cena transakčních poplatků

[Jak používat, viz níže](#how-to-use)

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
  alert("Odesílání dokončeno!")
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

![obrázek úspěšně dokončené transakce](./successful-transaction.png)

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
        alert("token odeslán")
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
          alert("Odesílání dokončeno!")
        })
      } catch (error) {
        alert("odeslání se nezdařilo!!")
      }
    }
  })
}
```
