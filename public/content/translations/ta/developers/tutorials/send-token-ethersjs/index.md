---
title: "ethers.js ஐப் பயன்படுத்தி டோக்கன்களை அனுப்புதல்"
description: "ethers.js ஐப் பயன்படுத்தி டோக்கன்களை அனுப்புவதற்கான தொடக்கநிலையாளர் வழிகாட்டி."
author: "கிம் யோங்ஜுன்"
tags: ["ETHERS.JS", "ERC-20", "TOKENS"]
skill: beginner
breadcrumb: "டோக்கன்களை அனுப்புதல்"
lang: ta
published: 2021-04-06
---

## ethers.js(5.0) ஐப் பயன்படுத்தி டோக்கனை அனுப்புதல் {#send-token}

### இந்த டுடோரியலில் நீங்கள் கற்றுக்கொள்வது {#you-learn-about}

- ethers.js ஐ இறக்குமதி செய்வது எப்படி
- டோக்கனைப் பரிமாற்றுவது எப்படி
- நெட்வொர்க் டிராஃபிக் நிலைமைக்கு ஏற்ப கேஸ் விலையை அமைப்பது எப்படி

### தொடங்குவதற்கு {#to-get-started}

தொடங்குவதற்கு, முதலில் நமது ஜாவாஸ்கிரிப்ட்டில் ethers.js லைப்ரரியை இறக்குமதி செய்ய வேண்டும்
ethers.js(5.0) ஐச் சேர்க்கவும்

### நிறுவுதல் {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

உலாவியில் ES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // உங்கள் குறியீடு இங்கே...
</script>
```

உலாவியில் ES3(UMD)

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### அளவுருக்கள் (Parameters) {#param}

1. **`contract_address`**: டோக்கன் ஒப்பந்த முகவரி (நீங்கள் பரிமாற்ற விரும்பும் டோக்கன் ஈதர் அல்லாத போது ஒப்பந்த முகவரி தேவை)
2. **`send_token_amount`**: பெறுநருக்கு நீங்கள் அனுப்ப விரும்பும் தொகை
3. **`to_address`**: பெறுநரின் முகவரி
4. **`send_account`**: அனுப்புநரின் முகவரி
5. **`private_key`**: பரிவர்த்தனையில் கையொப்பமிடவும், டோக்கன்களை உண்மையில் பரிமாற்றவும் அனுப்புநரின் தனிப்பட்ட விசை (Private key)

## அறிவிப்பு {#notice}

`sendTransaction()` அதை உள்ளமைவாகவே செய்வதால் `signTransaction(tx)` நீக்கப்பட்டுள்ளது.

## அனுப்பும் நடைமுறைகள் {#procedure}

### 1. நெட்வொர்க்குடன் இணைக்கவும் (டெஸ்ட்நெட்) {#connect-to-network}

#### வழங்குநரை அமைக்கவும் (Infura) {#set-provider}

Ropsten டெஸ்ட்நெட்டுடன் இணைக்கவும்

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. வாலட்டை உருவாக்கவும் {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. வாலட்டை நெட்வொர்க்குடன் இணைக்கவும் {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. தற்போதைய கேஸ் விலையைப் பெறவும் {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // கேஸ் விலை
```

### 5. பரிவர்த்தனையை வரையறுக்கவும் {#define-transaction}

கீழே வரையறுக்கப்பட்டுள்ள இந்த மாறிகள் `send_token()` ஐச் சார்ந்துள்ளன

### பரிவர்த்தனை அளவுருக்கள் {#transaction-params}

1. **`send_account`**: டோக்கன் அனுப்புநரின் முகவரி
2. **`to_address`**: டோக்கன் பெறுநரின் முகவரி
3. **`send_token_amount`**: அனுப்ப வேண்டிய டோக்கன்களின் அளவு
4. **`gas_limit`**: கேஸ் வரம்பு
5. **`gas_price`**: கேஸ் விலை

[எப்படிப் பயன்படுத்துவது என்பதற்குக் கீழே பார்க்கவும்](#how-to-use)

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

### 6. பரிமாற்றம் {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## இதை எப்படிப் பயன்படுத்துவது {#how-to-use}

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

### வெற்றி! {#success}

![வெற்றிகரமாகச் செய்யப்பட்ட பரிவர்த்தனையின் படம்](./successful-transaction.png)

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
      // பொதுவான டோக்கன் அனுப்புதல்
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // எத்தனை டோக்கன்கள்?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // டோக்கன்களை அனுப்பவும்
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // ஈதர் அனுப்புதல்
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