---
title: Kutuma Tokeni Kwa Kutumia ethers.js
description: Mwongozo rahisi kwa wanaoanza wa kutuma tokeni kwa kutumia ethers.js.
author: Kim YongJun
tags: ["ETHERS.JS", "ERC-20", "TOKENS"]
skill: beginner
lang: sw
published: 2021-04-06
---

## Tuma Tokeni Kwa Kutumia ethers.js(5.0) {#send-token}

### Katika Somo Hili Utajifunza Jinsi ya {#you-learn-about}

- Ingiza ethers.js
- Hamisha tokeni
- Weka bei ya gesi kulingana na hali ya msongamano wa mtandao

### Ili Kuanza {#to-get-started}

Ili kuanza, ni lazima kwanza tuingize maktaba ya ethers.js kwenye javascript yetu
Jumuisha ethers.js(5.0)

### Kusakinisha {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 katika Kivinjari

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Msimbo wako hapa...
</script>
```

ES3(UMD) katika Kivinjari

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Vigezo {#param}

1. **`contract_address`**: Anwani ya mkataba wa Tokeni (anwani ya mkataba inahitajika wakati tokeni unayotaka kuhamisha si ether)
2. **`send_token_amount`**: Kiasi unachotaka kutuma kwa mpokeaji
3. **`to_address`**: Anwani ya mpokeaji
4. **`send_account`**: Anwani ya mtumaji
5. **`private_key`**: Ufunguo binafsi wa mtumaji ili kusaini muamala na kuhamisha tokeni

## Tangazo {#notice}

`signTransaction(tx)` imeondolewa kwa sababu `sendTransaction()` inaifanya ndani kwa ndani.

## Taratibu za Kutuma {#procedure}

### 1. Unganisha na mtandao (testnet) {#connect-to-network}

#### Weka Mtoa Huduma (Infura) {#set-provider}

Unganisha na Ropsten testnet

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Tengeneza mkoba {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Unganisha Mkoba na mtandao {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Pata bei ya sasa ya gesi {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // bei ya gesi
```

### 5. Bainisha Muamala {#define-transaction}

Vigezo hivi vilivyobainishwa hapa chini vinategemea `send_token()`

### Vigezo vya muamala {#transaction-params}

1. **`send_account`**: anwani ya mtumaji wa tokeni
2. **`to_address`**: anwani ya mpokeaji wa tokeni
3. **`send_token_amount`**: kiasi cha tokeni za kutuma
4. **`gas_limit`**: kikomo cha gesi
5. **`gas_price`**: bei ya gesi

[Tazama hapa chini jinsi ya kutumia](#how-to-use)

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

### 6. Hamisha {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Kutuma kumekamilika!")
})
```

## Jinsi ya kuitumia {#how-to-use}

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

### Imefanikiwa! {#success}

![picha ya muamala uliofanywa kwa mafanikio](./successful-transaction.png)

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
      // utumaji wa tokeni wa jumla
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Tokeni ngapi?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Tuma tokeni
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("tokeni imetumwa")
      })
    } // utumaji wa ether
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
          alert("Kutuma kumekamilika!")
        })
      } catch (error) {
        alert("imeshindwa kutuma!!")
      }
    }
  })
}
```
