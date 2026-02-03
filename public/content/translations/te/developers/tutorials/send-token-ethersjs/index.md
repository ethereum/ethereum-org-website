---
title: "ethers.js ఉపయోగించి టోకెన్‌లను పంపడం"
description: "ethers.js ఉపయోగించి టోకెన్‌లను పంపడానికి ప్రారంభకులకు అనుకూలమైన మార్గదర్శి."
author: Kim YongJun
tags: [ "ETHERS.JS", "ERC-20", "టోకెన్లు" ]
skill: "ఆరంభకులు"
lang: te
published: 2021-04-06
---

## ethers.js(5.0) ఉపయోగించి టోకెన్‌ను పంపండి {#send-token}

### ఈ ట్యుటోరియల్‌లో మీరు ఎలాగో నేర్చుకుంటారు {#you-learn-about}

- ethers.js ను దిగుమతి చేయండి
- టోకెన్ బదిలీ
- నెట్‌వర్క్ ట్రాఫిక్ పరిస్థితి ప్రకారం గ్యాస్ ధరను సెట్ చేయండి

### ప్రారంభించడానికి {#to-get-started}

ప్రారంభించడానికి, మనము మొదట మన జావాస్క్రిప్ట్‌లో ethers.js లైబ్రరీని దిగుమతి చేసుకోవాలి
ethers.js(5.0)ను చేర్చండి

### ఇన్‌స్టాల్ చేస్తోంది {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

బ్రౌజర్‌లో ES6

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // మీ కోడ్ ఇక్కడ...
</script>
```

బ్రౌజర్‌లో ES3(UMD)

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### పరామితులు {#param}

1. **`contract_address`**: టోకెన్ కాంట్రాక్టు చిరునామా (మీరు బదిలీ చేయాలనుకుంటున్న టోకెన్ ఈథర్ కానప్పుడు కాంట్రాక్టు చిరునామా అవసరం)
2. **`send_token_amount`**: మీరు రిసీవర్‌కు పంపాలనుకుంటున్న మొత్తం
3. **`to_address`**: రిసీవర్ చిరునామా
4. **`send_account`**: పంపినవారి చిరునామా
5. **`private_key`**: లావాదేవీపై సంతకం చేయడానికి మరియు వాస్తవానికి టోకెన్‌లను బదిలీ చేయడానికి పంపినవారి ప్రైవేట్ కీ

## గమనిక {#notice}

`signTransaction(tx)` తీసివేయబడింది ఎందుకంటే `sendTransaction()` దానిని అంతర్గతంగా చేస్తుంది.

## పంపే విధానాలు {#procedure}

### 1. నెట్‌వర్క్‌కు కనెక్ట్ అవ్వండి (టెస్టునెట్) {#connect-to-network}

#### ప్రొవైడర్‌ను సెట్ చేయండి (Infura) {#set-provider}

Ropsten టెస్టునెట్‌కు కనెక్ట్ అవ్వండి

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. వాలెట్‌ను సృష్టించండి {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. వాలెట్‌ను నెట్‌కు కనెక్ట్ చేయండి {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. ప్రస్తుత గ్యాస్ ధరను పొందండి {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. లావాదేవీని నిర్వచించండి {#define-transaction}

క్రింద నిర్వచించబడిన ఈ వేరియబుల్స్ `send_token()` పై ఆధారపడి ఉంటాయి

### లావాదేవీ పరామితులు {#transaction-params}

1. **`send_account`**: టోకెన్ పంపినవారి చిరునామా
2. **`to_address`**: టోకెన్ రిసీవర్ చిరునామా
3. **`send_token_amount`**: పంపాల్సిన టోకెన్ల మొత్తం
4. **`gas_limit`**: గ్యాస్ పరిమితి
5. **`gas_price`**: గ్యాస్ ధర

[ఎలా ఉపయోగించాలో క్రింద చూడండి](#how-to-use)

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

### 6. బదిలీ {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("పంపడం పూర్తయింది!")
})
```

## దీన్ని ఎలా ఉపయోగించాలి {#how-to-use}

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

### విజయం! {#success}

![లావాదేవీ విజయవంతంగా జరిగిన చిత్రం](./successful-transaction.png)

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
      // సాధారణ టోకెన్ పంపడం
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // ఎన్ని టోకెన్లు?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // టోకెన్లను పంపండి
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("టోకెన్ పంపబడింది")
      })
    } // ఈథర్ పంపడం
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
          alert("పంపడం పూర్తయింది!")
        })
      } catch (error) {
        alert("పంపడంలో విఫలమైంది!!")
      }
    }
  })
}
```
