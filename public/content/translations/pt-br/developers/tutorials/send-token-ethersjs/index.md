---
title: Envio de fichas usando ethers.js
description: Guia amigo para iniciantes enviarem tokens usando ethers.js.
author: Kim YongJun
tags:
  - "ETHERS.JS"
  - "ERC-20"
  - "TOKENS"
skill: beginner
lang: pt-br
published: 2021-04-06
---

## Enviar Token usando ethers.js(5.0) {#send-token}

### Neste tutorial, você aprenderá {#you-learn-about}

- Importar ethers.js
- Transferência de tokens
- Defina o preço do gás de acordo com a situação do tráfego de rede

### Iniciado {#to-get-started}

Para começar, primeiro devemos importar a biblioteca ethers.js para nossa javascript Incluir ethers.js(5.0)

### Instalando {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 no Navegador

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Your code here...
</script>
```

ES3(UMD) no Navegador

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parâmetros {#param}

1. **`contract_address`**: Endereço do contrato do token (o endereço do contrato é necessário quando o token que você deseja transferir não for ether)
2. **`send_token_amount`**: A quantia que você deseja enviar para o destinatário
3. **`to_address`**: O endereço do destinatário
4. **`to_address`**: O endereço do destinatário
5. **`private_key`**: Chave privada do remetente para assinar a transação e realmente transferir os tokens

## Nota {#notice}

`signTransaction(tx)` foi removido porque `sendTransaction()` fez isso internamente.

## Enviando Procedimentos {#procedure}

### 1. Conectar à rede (testnet) {#connect-to-network}

#### Definir Provedor (Infura) {#set-provider}

Conecte-se à rede de teste Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Criar Carteira {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Conectar carteira à rede {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Obter o atual preço do gás {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Definir a Transação {#define-transaction}

Essas variáveis definidas abaixo dependem de `send_token()`

### Parâmetros de transação {#transaction-params}

1. **`send_account`**: endereço do remetente do token
2. **`to_address`**: endereço do receptor do token
3. **`send_token_amount`**: a quantidade de tokens a serem enviados
4. **`gas_limit`**: limite de gas
5. **`gas_price`**: preço do gas

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

![imagem da transação realizada com sucesso](./successful-transaction.png)

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
