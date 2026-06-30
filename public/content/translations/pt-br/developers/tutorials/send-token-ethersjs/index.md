---
title: Enviando tokens usando ethers.js
description: Guia para iniciantes sobre como enviar tokens usando ethers.js.
author: Kim YongJun
tags: ["ETHERS.JS", "ERC-20", "TOKENS"]
skill: beginner
breadcrumb: Enviar tokens
lang: pt-br
published: 2021-04-06
---

## Enviar token usando ethers.js(5.0) {#send-token}

### Neste tutorial você aprenderá como {#you-learn-about}

- Importar o ethers.js
- Transferir token
- Definir o preço do gás de acordo com a situação do tráfego da rede

### Para começar {#to-get-started}

Para começar, devemos primeiro importar a biblioteca ethers.js em nosso JavaScript
Incluir o ethers.js v5
### Instalando {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 no navegador

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Seu código aqui...
</script>
```

ES3(UMD) no navegador

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parâmetros {#param}

1. **`contract_address`**: Endereço do contrato do token (o endereço do contrato é necessário quando o token que você deseja transferir não é ether)
2. **`send_token_amount`**: A quantia que você deseja enviar ao destinatário
3. **`to_address`**: O endereço do destinatário
4. **`send_account`**: O endereço do remetente
5. **`private_key`**: Chave privada do remetente para assinar a transação e efetivamente transferir os tokens

## Aviso {#notice}

`signTransaction(tx)` foi removido porque `sendTransaction()` faz isso internamente.

## Procedimentos de envio {#procedure}

### 1. Conectar à rede (rede de teste) {#connect-to-network}

#### Definir provedor (Infura) {#set-provider}

Conectar à rede de teste Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Criar carteira {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Conectar carteira à rede {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Obter o preço do gás atual {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Definir transação {#define-transaction}

Estas variáveis definidas abaixo dependem de `send_token()`

### Parâmetros da transação {#transaction-params}

1. **`send_account`**: endereço do remetente do token
2. **`to_address`**: endereço do destinatário do token
3. **`send_token_amount`**: a quantia de tokens a enviar
4. **`gas_limit`**: limite de gas
5. **`gas_price`**: preço do gás

[Veja abaixo como usar](#how-to-use)

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

### 6. Transferir {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## Como usar {#how-to-use}

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

### Sucesso! {#success}

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
      // envio geral de token
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Quantos tokens?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Enviar tokens
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // envio de ether
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
