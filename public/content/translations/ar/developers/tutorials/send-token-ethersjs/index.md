---
title: "إرسال الرموز باستخدام ethers.js"
description: "دليل سهل للمبتدئين لإرسال الرموز باستخدام ethers.js."
author: Kim YongJun
tags: [ "ETHERS.JS", "ايه آر سي-20", "الرموز" ]
skill: beginner
lang: ar
published: 2021-04-06
---

## إرسال الرمز باستخدام ethers.js(5.0) {#send-token}

### في هذا البرنامج التعليمي سوف تتعلم كيفية {#you-learn-about}

- استيراد ethers.js
- تحويل الرمز
- تحديد سعر الغاز وفقاً لحالة ازدحام الشبكة

### للبدء {#to-get-started}

للبدء، يجب علينا أولاً استيراد مكتبة ethers.js إلى جافا سكريبت الخاص بنا
تضمين ethers.js(5.0)

### التثبيت {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 in the Browser

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // أدخل الكود الخاص بك هنا...
</script>
```

ES3(UMD) in the Browser

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### المعلمات {#param}

1. **`contract_address`**: عنوان عقد الرمز (يلزم عنوان العقد عندما لا يكون الرمز الذي تريد تحويله هو إيثر)
2. **`send_token_amount`**: المبلغ الذي تريد إرساله إلى المستلم
3. **`to_address`**: عنوان المستلم
4. **`send_account`**: عنوان المرسل
5. **`private_key`**: المفتاح الخاص للمرسل لتوقيع المعاملة وتحويل الرموز فعليًا

## ملاحظة {#notice}

تمت إزالة `signTransaction(tx)` لأن `sendTransaction()` تقوم بذلك داخلياً.

## إجراءات الإرسال {#procedure}

### ١. الاتصال بالشبكة (شبكة الاختبار) {#connect-to-network}

#### تعيين الموفر (Infura) {#set-provider}

الاتصال بشبكة الاختبار Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### ٢. إنشاء محفظة {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. ربط المحفظة بالشبكة {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. الحصول على سعر الغاز الحالي {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // سعر الغاز
```

### 5. تحديد المعاملة {#define-transaction}

المتغيرات المحددة أدناه تعتمد على `send_token()`

### معلمات المعاملة {#transaction-params}

1. **`send_account`**: عنوان مرسل الرمز
2. **`to_address`**: عنوان مستلم الرمز
3. **`send_token_amount`**: كمية الرموز المراد إرسالها
4. **`gas_limit`**: حد الغاز
5. **`gas_price`**: سعر الغاز

[انظر أدناه لمعرفة كيفية الاستخدام](#how-to-use)

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

### 6. تحويل {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("اكتمل الإرسال!")
})
```

## كيفية استخدامه {#how-to-use}

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

### نجاح! {#success}

![صورة معاملة تمت بنجاح](./successful-transaction.png)

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
      // إرسال رمز عام
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // كم عدد الرموز؟
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // إرسال الرموز
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("تم إرسال الرمز")
      })
    } // إرسال إيثر
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
          alert("اكتمل الإرسال!")
        })
      } catch (error) {
        alert("فشل الإرسال!!")
      }
    }
  })
}
```
