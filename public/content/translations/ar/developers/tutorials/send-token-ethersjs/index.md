---
title: "إرسال الرموز المميزة باستخدام ⁦ethers.js⁩"
description: "دليل مبسط للمبتدئين لإرسال الرموز المميزة باستخدام ⁦ethers.js⁩."
author: كيم يونغ جون
tags: ["ETHERS.JS", "ERC-20", "رموز مميزة"]
skill: beginner
breadcrumb: "إرسال الرموز المميزة"
lang: ar
published: 2021-04-06
---

## إرسال رمز مميز باستخدام <span dir="ltr">ethers.js(5.0)</span> {#send-token}

### في هذا البرنامج التعليمي ستتعلم كيفية {#you-learn-about}

- استيراد <span dir="ltr">ethers.js</span>
- تحويل رمز مميز
- تعيين سعر الغاز وفقًا لحالة حركة المرور في الشبكة

### للبدء {#to-get-started}

للبدء، يجب علينا أولاً استيراد مكتبة <span dir="ltr">ethers.js</span> في <span dir="ltr">JavaScript</span> الخاصة بنا
تضمين <span dir="ltr">ethers.js(5.0)</span>

### التثبيت {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

<span dir="ltr">ES6</span> في المتصفح

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // الكود الخاص بك هنا...
</script>
```

<span dir="ltr">ES3(UMD)</span> في المتصفح

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### المعلمات {#param}

1. **`contract_address`**: عنوان عقد الرمز المميز (عنوان العقد مطلوب عندما يكون الرمز المميز الذي تريد تحويله ليس إيثر)
2. **`send_token_amount`**: المبلغ الذي تريد إرساله إلى المستلم
3. **`to_address`**: عنوان المستلم
4. **`send_account`**: عنوان المرسل
5. **`private_key`**: مفتاح خاص للمرسل لتوقيع المعاملة وتحويل الرموز المميزة فعليًا

## ملاحظة {#notice}

تمت إزالة `signTransaction(tx)` لأن `sendTransaction()` يقوم بذلك داخليًا.

## إجراءات الإرسال {#procedure}

### 1. الاتصال بالشبكة (شبكة اختبار) {#connect-to-network}

#### تعيين المزود (Infura) {#set-provider}

الاتصال بشبكة اختبار روبستن

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. إنشاء محفظة {#create-wallet}

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

تعتمد هذه المتغيرات المحددة أدناه على `send_token()`

### معلمات المعاملة {#transaction-params}

1. **`send_account`**: عنوان مرسل الرمز المميز
2. **`to_address`**: عنوان مستلم الرمز المميز
3. **`send_token_amount`**: كمية الرموز المميزة المراد إرسالها
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

### 6. التحويل {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## كيفية الاستخدام {#how-to-use}

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

![image of transaction done successfully](./successful-transaction.png)

## <span dir="ltr">send_token()</span> {#send-token-method}

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
      // إرسال عام للرمز المميز
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // كم عدد الرموز المميزة؟
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // إرسال الرموز المميزة
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
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
          alert("Send finished!")
        })
      } catch (error) {
        alert("failed to send!!")
      }
    }
  })
}
```