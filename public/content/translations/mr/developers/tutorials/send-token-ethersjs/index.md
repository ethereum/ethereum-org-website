---
title: "ethers.js वापरून टोकन पाठवणे"
description: "ethers.js वापरून टोकन पाठवण्यासाठी नवशिक्यांसाठी अनुकूल मार्गदर्शक."
author: "किम योंग-जुन"
tags:
  - ETHERS.JS
  - ERC-20
  - टोकन्स
skill: beginner
breadcrumb: "टोकन पाठवा"
lang: mr
published: 2021-04-06
---

## ethers.js(5.0) वापरून टोकन पाठवा {#send-token}

### या ट्युटोरियलमध्ये तुम्ही काय शिकाल {#you-learn-about}

- ethers.js इम्पोर्ट करणे
- टोकन हस्तांतरण करणे
- नेटवर्क ट्रॅफिकच्या परिस्थितीनुसार गॅसची किंमत सेट करणे

### सुरुवात करण्यासाठी {#to-get-started}

सुरुवात करण्यासाठी, आपण प्रथम आपल्या JavaScript मध्ये ethers.js लायब्ररी इम्पोर्ट केली पाहिजे.
ethers.js v5 समाविष्ट करा
### इन्स्टॉल करणे {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ब्राउझरमध्ये ES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // तुमचा कोड येथे...
</script>
```

ब्राउझरमध्ये ES3(UMD)

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### पॅरामीटर्स {#param}

1. **`contract_address`**: टोकन कॉन्ट्रॅक्ट पत्ता (जेव्हा तुम्हाला हस्तांतरण करायचे असलेले टोकन इथर नसते तेव्हा कॉन्ट्रॅक्ट पत्ता आवश्यक असतो)
2. **`send_token_amount`**: तुम्हाला प्राप्तकर्त्याला पाठवायची असलेली रक्कम
3. **`to_address`**: प्राप्तकर्त्याचा पत्ता
4. **`send_account`**: प्रेषकाचा पत्ता
5. **`private_key`**: व्यवहारावर स्वाक्षरी करण्यासाठी आणि प्रत्यक्षात टोकन हस्तांतरण करण्यासाठी प्रेषकाची खाजगी की

## सूचना {#notice}

`signTransaction(tx)` काढून टाकले आहे कारण `sendTransaction()` ते अंतर्गतपणे करते.

## पाठवण्याच्या प्रक्रिया {#procedure}

### 1. नेटवर्कशी कनेक्ट करा (टेस्टनेट) {#connect-to-network}

#### प्रोव्हायडर सेट करा (Infura) {#set-provider}

रॉप्स्टन् टेस्टनेटशी कनेक्ट करा

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. वॉलेट तयार करा {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. वॉलेट नेटवर्कशी कनेक्ट करा {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. सध्याची गॅसची किंमत मिळवा {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // गॅसची किंमत
```

### 5. व्यवहार परिभाषित करा {#define-transaction}

खाली परिभाषित केलेले हे व्हेरिएबल्स `send_token()` वर अवलंबून आहेत

### व्यवहार पॅरामीटर्स {#transaction-params}

1. **`send_account`**: टोकन प्रेषकाचा पत्ता
2. **`to_address`**: टोकन प्राप्तकर्त्याचा पत्ता
3. **`send_token_amount`**: पाठवायच्या टोकन्सची रक्कम
4. **`gas_limit`**: गॅस मर्यादा
5. **`gas_price`**: गॅसची किंमत

[कसे वापरावे यासाठी खाली पहा](#how-to-use)

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

### 6. हस्तांतरण {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Send finished!")
})
```

## ते कसे वापरावे {#how-to-use}

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

### यश! {#success}

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
      // सामान्य टोकन पाठवणे
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // किती टोकन?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // टोकन पाठवा
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("sent token")
      })
    } // इथर पाठवणे
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
