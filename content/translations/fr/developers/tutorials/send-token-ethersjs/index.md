---
title: Envoyer des jetons avec ethers.js
description: Guide à l'intention des débutants sur l'envoi de jetons à l'aide d'ether.js.
author: Kim YongJun
tags:
  - "ETHERS.JS"
  - "ERC-20"
  - "JETONS"
skill: beginner
lang: fr
published: 2021-04-06
---

## Envoyer un jeton avec ethers.js (5.0) {#send-token}

### Dans ce tutoriel, vous allez apprendre à {#you-learn-about}

- Importer ethers.js
- Transférer un jeton
- Définir le prix du gaz en fonction de l'état du trafic réseau

### Pour commencer {#to-get-started}

Pour commencer, nous devons d'abord importer la bibliothèque ethers.js dans notre JavaScript en intégrant ethers.js (5.0)

### Installation {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 dans le navigateur :

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Your code here...
</script>
```

ES3 (UMD) dans le navigateur :

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Paramètres {#param}

1. **`contract_address`** : l'adresse du contrat du jeton (l'adresse du contrat est nécessaire lorsque le jeton que vous voulez transférer n'est pas de l'ether)
2. **`send_token_amount`** : le montant que vous désirez envoyer au destinataire
3. **`to_address`** : l'adresse du destinataire
4. **`send_account`** : l'adresse de l'expéditeur
5. **`private_key`** : clé privée de l'expéditeur afin de signer la transaction et de transférer véritablement les jetons

## Remarque {#notice}

`signTransaction(tx)` est retiré car `sendTransaction()` le fait en interne.

## Procédure d'envoi {#procedure}

### 1. Se connecter au réseau (testnet) {#connect-to-network}

#### Définir le fournisseur (Infura) {#set-provider}

Se connecter au réseau de test Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Créer un portefeuille {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Connecter le portefeuille au réseau {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Obtenir le prix actuel du gaz {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Définir la transaction {#define-transaction}

Les variables définies ci-dessous sont dépendantes de `send_token()`

### Paramètres de la transaction {#transaction-params}

1. **`send_account`** : adresse de l'expéditeur du jeton
2. **`to_address`** : adresse du destinataire du jeton
3. **`send_token_amount`** : nombre de jetons à envoyer
4. **`gas_limit`** : limite de gaz
5. **`gas_price`** : prix du gaz

[Voir ci-dessous pour savoir comment les utiliser](#how-to-use)

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

### 6. Transférer {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## Comment l’utiliser  {#how-to-use}

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

### Réussi ! {#success}

![image de la transaction effectuée avec succès](./successful-transaction.png)

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
