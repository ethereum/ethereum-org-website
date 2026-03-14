---
title: "ethers.js ব্যবহার করে টোকেন পাঠানো"
description: "ethers.js ব্যবহার করে টোকেন পাঠানোর জন্য একটি শিক্ষানবিস-বান্ধব নির্দেশিকা।"
author: Kim YongJun
tags: [ "ETHERS.JS", "ERC-20", "টোকেন" ]
skill: beginner
lang: bn
published: 2021-04-06
---

## ethers.js(5.0) ব্যবহার করে টোকেন পাঠান {#send-token}

### এই টিউটোরিয়ালে আপনি যেভাবে শিখবেন {#you-learn-about}

- ethers.js ইমপোর্ট করুন
- টোকেন ট্রান্সফার করুন
- নেটওয়ার্ক ট্র্যাফিকের অবস্থা অনুযায়ী গ্যাসের মূল্য নির্ধারণ করুন

### শুরু করতে {#to-get-started}

শুরু করার জন্য, আমাদের প্রথমে আমাদের জাভাস্ক্রিপ্টে ethers.js লাইব্রেরিটি ইমপোর্ট করতে হবে
ethers.js(5.0) অন্তর্ভুক্ত করুন

### ইনস্টল করা হচ্ছে {#install-ethersjs}

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

1. **`contract_address`**: টোকেন চুক্তির ঠিকানা (চুক্তির ঠিকানা প্রয়োজন যখন আপনি যে টোকেনটি ট্রান্সফার করতে চান তা ইথার নয়)
2. **`send_token_amount`**: আপনি প্রাপকের কাছে যে পরিমাণ পাঠাতে চান
3. **`to_address`**: প্রাপকের ঠিকানা
4. **`send_account`**: প্রেরকের ঠিকানা
5. **`private_key`**: লেনদেনে স্বাক্ষর করতে এবং প্রকৃতপক্ষে টোকেন ট্রান্সফার করতে প্রেরকের প্রাইভেট কী

## বিজ্ঞপ্তি {#notice}

`signTransaction(tx)` সরানো হয়েছে কারণ `sendTransaction()` এটি অভ্যন্তরীণভাবে করে।

## পাঠানোর পদ্ধতি {#procedure}

### ১. নেটওয়ার্কের সাথে সংযোগ করুন (টেস্টনেট) {#connect-to-network}

#### প্রোভাইডার সেট করুন (Infura) {#set-provider}

Ropsten টেস্টনেটের সাথে সংযোগ করুন

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. ওয়ালেট তৈরি করুন {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. ওয়ালেটকে নেটের সাথে সংযোগ করুন {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### ৪. বর্তমান গ্যাসের মূল্য জানুন {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### ৫। লেনদেন সংজ্ঞায়িত করুন {#define-transaction}

নীচে সংজ্ঞায়িত এই ভেরিয়েবলগুলো `send_token()` এর উপর নির্ভরশীল

### লেনদেনের প্যারামিটার {#transaction-params}

1. **`send_account`**: টোকেন প্রেরকের ঠিকানা
2. **`to_address`**: টোকেন প্রাপকের ঠিকানা
3. **`send_token_amount`**: পাঠানোর জন্য টোকেনের পরিমাণ
4. **`gas_limit`**: গ্যাস লিমিট
5. **`gas_price`**: গ্যাসের মূল্য

[কীভাবে ব্যবহার করতে হয় তার জন্য নীচে দেখুন](#how-to-use)

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

### ৬. ট্রান্সফার {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("পাঠানো সম্পন্ন হয়েছে!")
})
```

## কীভাবে এটি ব্যবহার করবেন {#how-to-use}

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

### সাফল্য! {#success}

![সফলভাবে সম্পন্ন লেনদেনের ছবি](./successful-transaction.png)

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
      // সাধারণ টোকেন পাঠান
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
        alert("টোকেন পাঠানো হয়েছে")
      })
    } // ইথার পাঠান
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
          alert("পাঠানো সম্পন্ন হয়েছে!")
        })
      } catch (error) {
        alert("পাঠাতে ব্যর্থ!!")
      }
    }
  })
}
```
