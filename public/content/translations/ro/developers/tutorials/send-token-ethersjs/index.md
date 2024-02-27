---
title: Trimiterea de tokenuri folosind ethers.js
description: Ghid simplu pentru începători de trimitere a tokenurilor folosind ethers.js.
author: Kim YongJun
tags:
  - "ETHERS.JS"
  - "ERC-20"
  - "JETOANE"
skill: beginner
lang: ro
published: 2021-04-06
---

## Trimiterea tokenului folosind ethers.js(5.0) {#send-token}

### În acest tutorial veți învăța cum să {#you-learn-about}

- Importați ethers.js
- Transferați tokenul
- Setați prețul gazului în funcție de situația traficului din rețea

### Pentru-a-începe {#to-get-started}

Pentru a începe, trebuie mai întâi să importăm biblioteca ethers.js în javascript-ul nostru Include ethers.js(5.0)

### Instalarea {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 în browser

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Your code here...
</script>
```

ES3(UMD) în browser

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parametri {#param}

1. **`contract_address`**: Adresa contractului tokenului (adresa contractului este necesară atunci când tokenul pe care doriți să-l transferați nu este ether)
2. **`send_token_amount`**: Suma pe care doriți să o trimiteți destinatarului
3. **`to_address`**: Adresa destinatarului
4. **`send_account`**: Adresa expeditorului
5. **`private_key`**: Cheia privată a expeditorului pentru semnarea tranzacției și transferul efectiv al jetoanelor.

## Notificare {#notice}

S-a eliminat `signTransaction(tx)` deoarece `sendTransaction()` face aceasta în mod intern.

## Proceduri de trimitere {#procedure}

### 1. Conectați-vă la rețea (testnet) {#connect-to-network}

#### Setați furnizorul (Infura) {#set-provider}

Conectați-vă la testnet-ul Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Creați portofelul {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Conectați „Wallet” la rețea {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Obțineți prețul curent al gazului {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Definiți tranzacția {#define-transaction}

Aceste variabile definite mai jos sunt dependente de `send_token()`

### Parametrii tranzacției {#transaction-params}

1. **`send_account`**: adresa expeditorului tokenului
2. **`to_address`**: adresa destinatarului tokenului
3. **`send_token_amount`**: cantitatea de tokenuri de trimis
4. **`gas_limit`**: limita de gaz
5. **`gas_price`**: prețul gazului

[Vedeți mai jos detaliile de utilizare](#how-to-use)

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

### 6. Transfer {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## Cum se utilizează {#how-to-use}

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

### Succes! {#success}

![imaginea unei tranzacții efectuate cu succes](./successful-transaction.png)

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
      // general token send
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // How many tokens?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Send tokens
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // ether send
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
