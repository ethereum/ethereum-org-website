---
title: Inviare token usando ethers.js
description: Guida per principianti all'invio di token usando ethers.js.
author: Kim YongJun
tags: ["ETHERS.JS", "ERC-20", "token"]
skill: beginner
breadcrumb: Inviare token
lang: it
published: 2021-04-06
---

## Inviare token usando ethers.js(5.0) {#send-token}

### In questo tutorial imparerai come {#you-learn-about}

- Importare ethers.js
- Trasferire token
- Impostare il prezzo del gas in base alla situazione del traffico di rete

### Per iniziare {#to-get-started}

Per iniziare, dobbiamo prima importare la libreria ethers.js nel nostro javascript
Includere ethers.js(5.0)

### Installazione {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 nel browser

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Il tuo codice qui...
</script>
```

ES3(UMD) nel browser

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parametri {#param}

1. **`contract_address`**: Indirizzo del contratto del token (l'indirizzo del contratto è necessario quando il token che si desidera trasferire non è ether)
2. **`send_token_amount`**: L'importo che si desidera inviare al destinatario
3. **`to_address`**: L'indirizzo del destinatario
4. **`send_account`**: L'indirizzo del mittente
5. **`private_key`**: Chiave privata del mittente per firmare la transazione e trasferire effettivamente i token

## Avviso {#notice}

`signTransaction(tx)` è stato rimosso perché `sendTransaction()` lo fa internamente.

## Procedure di invio {#procedure}

### 1. Connettersi alla rete (rete di test) {#connect-to-network}

#### Impostare il Provider (Infura) {#set-provider}

Connettersi alla rete di test Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Creare il portafoglio {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Connettere il portafoglio alla rete {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Ottenere il prezzo del gas attuale {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Definire la transazione {#define-transaction}

Queste variabili definite di seguito dipendono da `send_token()`

### Parametri della transazione {#transaction-params}

1. **`send_account`**: indirizzo del mittente del token
2. **`to_address`**: indirizzo del destinatario del token
3. **`send_token_amount`**: la quantità di token da inviare
4. **`gas_limit`**: limite del gas
5. **`gas_price`**: prezzo del gas

[Vedi sotto per come usarlo](#how-to-use)

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

### 6. Trasferimento {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## Come usarlo {#how-to-use}

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

### Successo! {#success}

![immagine della transazione completata con successo](./successful-transaction.png)

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
      // invio generale di token
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Quanti token?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Invia token
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // invio di ether
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