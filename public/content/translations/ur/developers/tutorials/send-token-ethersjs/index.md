---
title: "ethers.js کا استعمال کرتے ہوئے ٹوکن بھیجنا"
description: "ethers.js کا استعمال کرتے ہوئے ٹوکن بھیجنے کے لیے ابتدائی افراد کے لیے دوستانہ گائیڈ۔"
author: Kim YongJun
tags: [ "ETHERS.JS", "ERC-20", "ٹوکنز" ]
skill: beginner
lang: ur-in
published: 2021-04-06
---

## ethers.js(5.0) کا استعمال کرتے ہوئے ٹوکن بھیجیں {#send-token}

### اس ٹیوٹوریل میں آپ سیکھیں گے کہ کیسے {#you-learn-about}

- ethers.js امپورٹ کریں
- ٹوکن منتقل کریں
- نیٹ ورک ٹریفک کی صورتحال کے مطابق گیس کی قیمت مقرر کریں

### شروع کرنے کے لیے {#to-get-started}

شروع کرنے کے لیے، ہمیں سب سے پہلے اپنے javascript میں ethers.js لائبریری امپورٹ کرنی ہوگی
ethers.js(5.0) شامل کریں

### انسٹال کرنا {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

براؤزر میں ES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // آپ کا کوڈ یہاں...
</script>
```

براؤزر میں ES3(UMD)

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### پیرامیٹرز {#param}

1. **`contract_address`**: ٹوکن کنٹریکٹ کا پتہ (کنٹریکٹ ایڈریس کی ضرورت اس وقت ہوتی ہے جب آپ جو ٹوکن منتقل کرنا چاہتے ہیں وہ ether نہ ہو)
2. **`send_token_amount`**: وہ رقم جو آپ وصول کنندہ کو بھیجنا چاہتے ہیں
3. **`to_address`**: وصول کنندہ کا پتہ
4. **`send_account`**: بھیجنے والے کا پتہ
5. **`private_key`**: ٹرانزیکشن پر دستخط کرنے اور دراصل ٹوکن منتقل کرنے کے لیے بھیجنے والے کی نجی کلید

## نوٹس {#notice}

`signTransaction(tx)` کو ہٹا دیا گیا ہے کیونکہ `sendTransaction()` اسے اندرونی طور پر کرتا ہے۔

## بھیجنے کے طریقہ کار {#procedure}

### 1۔ نیٹ ورک سے جڑیں (ٹیسٹ نیٹ) {#connect-to-network}

#### پرووائڈر سیٹ کریں (Infura) {#set-provider}

Ropsten ٹیسٹ نیٹ سے جڑیں

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2۔ والیٹ بنائیں {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3۔ والیٹ کو نیٹ سے جوڑیں {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. موجودہ گیس کی قیمت حاصل کریں {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // گیس کی قیمت
```

### 5. ٹرانزیکشن کی وضاحت کریں {#define-transaction}

نیچے بیان کردہ یہ متغیرات `send_token()` پر منحصر ہیں

### ٹرانزیکشن پیرامیٹرز {#transaction-params}

1. **`send_account`**: ٹوکن بھیجنے والے کا پتہ
2. **`to_address`**: ٹوکن وصول کرنے والے کا پتہ
3. **`send_token_amount`**: بھیجے جانے والے ٹوکنز کی مقدار
4. **`gas_limit`**: گیس کی حد
5. **`gas_price`**: گیس کی قیمت

[استعمال کرنے کا طریقہ جاننے کے لیے نیچے دیکھیں](#how-to-use)

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

### 6. منتقل کریں {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("بھیجنا مکمل!")
})
```

## اسے کیسے استعمال کریں {#how-to-use}

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

### کامیاب! {#success}

![کامیابی سے مکمل ہوئی ٹرانزیکشن کی تصویر](./successful-transaction.png)

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
      // عام ٹوکن بھیجیں
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // کتنے ٹوکنز؟
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // ٹوکنز بھیجیں
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("ٹوکن بھیج دیا گیا")
      })
    } // ether بھیجیں
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
          alert("بھیجنا مکمل!")
        })
      } catch (error) {
        alert("بھیجنے میں ناکام!!")
      }
    }
  })
}
```
