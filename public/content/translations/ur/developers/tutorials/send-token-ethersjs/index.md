---
title: "ethers.js کا استعمال کرتے ہوئے ٹوکنز بھیجنا"
description: "ethers.js کا استعمال کرتے ہوئے ٹوکنز بھیجنے کے لیے ابتدائی افراد کے لیے گائیڈ۔"
author: "کم یونگ جون"
tags: ["ETHERS.JS", "ERC-20", "ٹوکنز"]
skill: beginner
breadcrumb: "ٹوکنز بھیجیں"
lang: ur
published: 2021-04-06
---

## ethers.js(5.0) کا استعمال کرتے ہوئے ٹوکن بھیجیں {#send-token}

### اس ٹیوٹوریل میں آپ سیکھیں گے کہ کیسے {#you-learn-about}

- ethers.js کو امپورٹ کریں
- ٹوکن ٹرانسفر کریں
- نیٹ ورک ٹریفک کی صورتحال کے مطابق گیس کی قیمت مقرر کریں

### شروع کرنے کے لیے {#to-get-started}

شروع کرنے کے لیے، ہمیں سب سے پہلے ethers.js لائبریری کو اپنی جاوا اسکرپٹ میں امپورٹ کرنا ہوگا۔
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

1. **`contract_address`**: ٹوکن کانٹریکٹ ایڈریس (جب آپ جو ٹوکن ٹرانسفر کرنا چاہتے ہیں وہ ایتھر نہ ہو تو کانٹریکٹ ایڈریس کی ضرورت ہوتی ہے)
2. **`send_token_amount`**: وہ رقم جو آپ وصول کنندہ کو بھیجنا چاہتے ہیں
3. **`to_address`**: وصول کنندہ کا ایڈریس
4. **`send_account`**: بھیجنے والے کا ایڈریس
5. **`private_key`**: ٹرانزیکشن پر دستخط کرنے اور اصل میں ٹوکنز ٹرانسفر کرنے کے لیے بھیجنے والے کی پرائیویٹ کی (private key)

## نوٹس {#notice}

`signTransaction(tx)` کو ہٹا دیا گیا ہے کیونکہ `sendTransaction()` اسے اندرونی طور پر کرتا ہے۔

## بھیجنے کا طریقہ کار {#procedure}

### 1. نیٹ ورک (ٹیسٹ نیٹ) سے جڑیں {#connect-to-network}

#### پرووائیڈر سیٹ کریں (Infura) {#set-provider}

Ropsten ٹیسٹ نیٹ سے جڑیں

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. والیٹ بنائیں {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. والیٹ کو نیٹ سے جڑیں {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. موجودہ گیس کی قیمت حاصل کریں {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // گیس کی قیمت
```

### 5. ٹرانزیکشن کی وضاحت کریں {#define-transaction}

نیچے بیان کیے گئے یہ متغیرات (variables) `send_token()` پر منحصر ہیں

### ٹرانزیکشن کے پیرامیٹرز {#transaction-params}

1. **`send_account`**: ٹوکن بھیجنے والے کا ایڈریس
2. **`to_address`**: ٹوکن وصول کنندہ کا ایڈریس
3. **`send_token_amount`**: بھیجے جانے والے ٹوکنز کی مقدار
4. **`gas_limit`**: گیس کی حد (gas limit)
5. **`gas_price`**: گیس کی قیمت (gas price)

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

### 6. ٹرانسفر {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
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

### کامیابی! {#success}

![کامیابی سے مکمل ہونے والی ٹرانزیکشن کی تصویر](./successful-transaction.png)

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

      // کتنے ٹوکن؟
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // ٹوکن بھیجیں
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // ایتھر بھیجیں
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