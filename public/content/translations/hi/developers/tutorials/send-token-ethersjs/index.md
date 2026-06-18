---
title: ethers.js का उपयोग करके टोकन भेजना
description: ethers.js का उपयोग करके टोकन भेजने के लिए शुरुआती लोगों के अनुकूल मार्गदर्शिका।
author: किम योंगजून
tags: ["ETHERS.JS", "ERC-20", "टोकन"]
skill: beginner
breadcrumb: टोकन भेजें
lang: hi
published: 2021-04-06
---

## ethers.js(5.0) का उपयोग करके टोकन भेजें {#send-token}

### इस ट्यूटोरियल में आप सीखेंगे कि कैसे {#you-learn-about}

- ethers.js को इंपोर्ट करें
- टोकन ट्रांसफर करें
- नेटवर्क ट्रैफ़िक की स्थिति के अनुसार गैस मूल्य सेट करें

### शुरुआत करने के लिए {#to-get-started}

शुरुआत करने के लिए, हमें सबसे पहले अपने JavaScript में ethers.js लाइब्रेरी को इंपोर्ट करना होगा
ethers.js(5.0) शामिल करें

### इंस्टॉल करना {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ब्राउज़र में ES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // आपका कोड यहाँ...
</script>
```

ब्राउज़र में ES3(UMD)

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### पैरामीटर {#param}

1. **`contract_address`**: टोकन अनुबंध पता (जब आप जो टोकन ट्रांसफर करना चाहते हैं वह ईथर नहीं है, तो अनुबंध पता आवश्यक है)
2. **`send_token_amount`**: वह राशि जो आप प्राप्तकर्ता को भेजना चाहते हैं
3. **`to_address`**: प्राप्तकर्ता का पता
4. **`send_account`**: प्रेषक का पता
5. **`private_key`**: लेन-देन पर हस्ताक्षर करने और वास्तव में टोकन ट्रांसफर करने के लिए प्रेषक की निजी कुंजी

## ध्यान दें {#notice}

`signTransaction(tx)` को हटा दिया गया है क्योंकि `sendTransaction()` इसे आंतरिक रूप से करता है।

## भेजने की प्रक्रियाएं {#procedure}

### 1. नेटवर्क (टेस्टनेट) से कनेक्ट करें {#connect-to-network}

#### प्रदाता सेट करें (Infura) {#set-provider}

रॉप्स्टन टेस्टनेट से कनेक्ट करें

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. वॉलेट बनाएं {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. वॉलेट को नेट से कनेक्ट करें {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. वर्तमान गैस मूल्य प्राप्त करें {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // गैस मूल्य
```

### 5. लेन-देन परिभाषित करें {#define-transaction}

नीचे परिभाषित ये चर `send_token()` पर निर्भर हैं

### लेन-देन पैरामीटर {#transaction-params}

1. **`send_account`**: टोकन प्रेषक का पता
2. **`to_address`**: टोकन प्राप्तकर्ता का पता
3. **`send_token_amount`**: भेजे जाने वाले टोकन की राशि
4. **`gas_limit`**: गैस सीमा
5. **`gas_price`**: गैस मूल्य

[उपयोग करने का तरीका नीचे देखें](#how-to-use)

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

### 6. ट्रांसफर {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## इसका उपयोग कैसे करें {#how-to-use}

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

### सफलता! {#success}

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
      // सामान्य टोकन भेजना
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // कितने टोकन?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // टोकन भेजें
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // ईथर भेजना
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