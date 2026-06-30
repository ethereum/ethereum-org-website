---
title: "ethers.js ব্যবহার করে টোকেন পাঠানো"
description: "ethers.js ব্যবহার করে টোকেন পাঠানোর জন্য নতুনদের উপযোগী গাইড।"
author: "কিম ইয়ংজুন"
tags:
  - ETHERS.JS
  - ERC-20
  - টোকেন
skill: beginner
breadcrumb: "টোকেন পাঠানো"
lang: bn
published: 2021-04-06
---

## ethers.js(5.0) ব্যবহার করে টোকেন পাঠানো {#send-token}

### এই টিউটোরিয়ালে আপনি যা শিখবেন {#you-learn-about}

- ethers.js ইমপোর্ট করা
- টোকেন হস্তান্তর করা
- নেটওয়ার্ক ট্রাফিকের অবস্থা অনুযায়ী গ্যাস প্রাইস সেট করা

### শুরু করতে
শুরু করতে, আমাদের প্রথমে আমাদের JavaScript-এ ethers.js লাইব্রেরি ইমপোর্ট করতে হবে।
ethers.js v5 অন্তর্ভুক্ত করুন
### ইনস্টলেশন {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ব্রাউজারে ES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // আপনার কোড এখানে...
</script>
```

ব্রাউজারে ES3(UMD)

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### প্যারামিটার {#param}

1. **`contract_address`**: টোকেন কন্ট্রাক্ট ঠিকানা (আপনি যে টোকেনটি হস্তান্তর করতে চান তা ইথার না হলে কন্ট্রাক্ট ঠিকানা প্রয়োজন)
2. **`send_token_amount`**: আপনি প্রাপককে যে পরিমাণ পাঠাতে চান
3. **`to_address`**: প্রাপকের ঠিকানা
4. **`send_account`**: প্রেরকের ঠিকানা
5. **`private_key`**: ট্রানজ্যাকশন সাইন করতে এবং প্রকৃতপক্ষে টোকেন হস্তান্তর করতে প্রেরকের প্রাইভেট কী

## লক্ষ্য করুন {#notice}

`signTransaction(tx)` সরিয়ে দেওয়া হয়েছে কারণ `sendTransaction()` এটি অভ্যন্তরীণভাবে করে।

## পাঠানোর প্রক্রিয়া {#procedure}

### 1. নেটওয়ার্ক (টেস্টনেট)-এর সাথে কানেক্ট করুন {#connect-to-network}

#### প্রোভাইডার সেট করুন (Infura) {#set-provider}

Ropsten টেস্টনেট-এর সাথে কানেক্ট করুন

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. ওয়ালেট তৈরি করুন {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. ওয়ালেটকে নেটওয়ার্ক-এর সাথে কানেক্ট করুন {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. বর্তমান গ্যাস প্রাইস পান {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // গ্যাস প্রাইস
```

### 5. ট্রানজ্যাকশন সংজ্ঞায়িত করুন {#define-transaction}

নিচে সংজ্ঞায়িত এই ভেরিয়েবলগুলো `send_token()`-এর উপর নির্ভরশীল

### ট্রানজ্যাকশন প্যারামিটার {#transaction-params}

1. **`send_account`**: টোকেন প্রেরকের ঠিকানা
2. **`to_address`**: টোকেন প্রাপকের ঠিকানা
3. **`send_token_amount`**: পাঠানোর জন্য টোকেনের পরিমাণ
4. **`gas_limit`**: গ্যাস লিমিট
5. **`gas_price`**: গ্যাস প্রাইস

[কীভাবে ব্যবহার করবেন তা নিচে দেখুন](#how-to-use)

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

### 6. হস্তান্তর {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## এটি কীভাবে ব্যবহার করবেন {#how-to-use}

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

### সফল! {#success}

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
      // সাধারণ টোকেন পাঠানো
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // কতগুলো টোকেন?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // টোকেন পাঠান
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // ইথার পাঠানো
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
