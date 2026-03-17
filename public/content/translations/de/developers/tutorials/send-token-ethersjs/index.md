---
title: Senden von Token mit ethers.js
description: Einsteigerfreundliche Anleitung zum Senden von Token mit ethers.js.
author: Kim YongJun
tags: [ "ETHERS.JS", "ERC-20", "TOKENS" ]
skill: beginner
lang: de
published: 2021-04-06
---

## Token senden mit ethers.js (5.0) {#send-token}

### In diesem Tutorial erfahren Sie, wie Sie {#you-learn-about}

- Ethers.js importieren
- Token transferieren
- Gas-Preis entsprechend der Netzwerkauslastung festlegen

### Erste Schritte {#to-get-started}

Zu Beginn müssen wir zunächst die ethers.js-Bibliothek in unser Javascript importieren
Binden Sie ethers.js (5.0) ein

### Installation {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 im Browser

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Ihr Code hier...
</script>
```

ES3(UMD) im Browser

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parameter {#param}

1. **`contract_address`**: Token-Vertragsadresse (die Vertragsadresse wird benötigt, wenn der Token, den Sie übertragen möchten, nicht Ether ist)
2. **`send_token_amount`**: Der Betrag, den Sie an den Empfänger senden möchten
3. **`to_address`**: Die Adresse des Empfängers
4. **`send_account`**: Die Adresse des Absenders
5. **`private_key`**: Privater Schlüssel des Absenders, um die Transaktion zu signieren und die Token tatsächlich zu übertragen

## Hinweis {#notice}

`signTransaction(tx)` wird entfernt, da `sendTransaction()` dies intern erledigt.

## Sendeablauf {#procedure}

### 1. Mit dem Netzwerk (Testnet) verbinden {#connect-to-network}

#### Provider festlegen (Infura) {#set-provider}

Mit dem Ropsten-Testnet verbinden

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Wallet erstellen {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Wallet mit dem Netzwerk verbinden {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Aktuellen Gas-Preis abrufen {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Transaktion definieren {#define-transaction}

Die unten definierten Variablen sind von `send_token()` abhängig

### Transaktionsparameter {#transaction-params}

1. **`send_account`**: Adresse des Token-Absenders
2. **`to_address`**: Adresse des Token-Empfängers
3. **`send_token_amount`**: die Anzahl der zu sendenden Token
4. **`gas_limit`**: Gaslimit
5. **`gas_price`**: Gas-Preis

[Siehe unten zur Verwendung](#how-to-use)

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

### 6. Übertragung {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Senden abgeschlossen!")
})
```

## Verwendung {#how-to-use}

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

### Erfolg! {#success}

![Bild einer erfolgreich durchgeführten Transaktion](./successful-transaction.png)

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
      // allgemeiner Token-Versand
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Wie viele Token?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Token senden
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("Token gesendet")
      })
    } // Ether senden
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
          alert("Senden abgeschlossen!")
        })
      } catch (error) {
        alert("Senden fehlgeschlagen!!")
      }
    }
  })
}
```
