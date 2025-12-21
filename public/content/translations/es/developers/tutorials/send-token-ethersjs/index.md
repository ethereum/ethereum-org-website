---
title: Envío de tokens usando ethers.js
description: Guía para principiantes sobre el envío de tokens usando ethers.js.
author: Kim YongJun
tags: [ "ETHERS.JS", "ERC-20", "TOKENS" ]
skill: beginner
lang: es
published: 2021-04-06
---

## Enviar un token usando ethers.js(5.0) {#send-token}

### En este tutorial aprenderá a: {#you-learn-about}

- Importar ethers.js
- Transferir un token
- Establecer el precio del gas según la situación del tráfico de la red

### Para empezar {#to-get-started}

Para empezar, primero debemos importar la biblioteca ethers.js en nuestro JavaScript.
Incluya ethers.js(5.0)

### Instalación {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 en el navegador

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Su código aquí...
</script>
```

ES3(UMD) en el navegador

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parámetros {#param}

1. **`contract_address`**: dirección del contrato del token (la dirección del contrato es necesaria cuando el token que quiere transferir no es ether)
2. **`send_token_amount`**: la cantidad que quiere enviar al receptor
3. **`to_address`**: la dirección del receptor
4. **`send_account`**: la dirección del emisor
5. **`private_key`**: la clave privada del emisor para firmar la transacción y transferir los tokens

## Aviso {#notice}

`signTransaction(tx)` se eliminó porque `sendTransaction()` lo hace internamente.

## Procedimientos de envío {#procedure}

### 1. Conectarse a la red (red de prueba) {#connect-to-network}

#### Establecer el proveedor (Infura) {#set-provider}

Conectarse a la red de prueba Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Crear una billetera {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Conectar la billetera a la red {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Obtener el precio actual del gas {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Definir la transacción {#define-transaction}

Las variables definidas a continuación dependen de `send_token()`

### Parámetros de la transacción {#transaction-params}

1. **`send_account`**: dirección del emisor del token
2. **`to_address`**: dirección del receptor del token
3. **`send_token_amount`**: la cantidad de tokens a enviar
4. **`gas_limit`**: límite de gas
5. **`gas_price`**: precio del gas

[Vea a continuación cómo usarlo](#how-to-use)

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

### 6. Transferencia {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("¡Envío finalizado!")
})
```

## Cómo usarlo {#how-to-use}

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

### ¡Éxito! {#success}

![imagen de la transacción realizada con éxito](./successful-transaction.png)

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
      // envío de token general
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // ¿Cuántos tokens?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Enviar tokens
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("token enviado")
      })
    } // envío de ether
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
          alert("¡Envío finalizado!")
        })
      } catch (error) {
        alert("¡Error al enviar!")
      }
    }
  })
}
```
