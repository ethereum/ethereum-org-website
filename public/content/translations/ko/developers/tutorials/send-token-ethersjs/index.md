---
title: ethers.js를 사용하여 토큰 전송하기
description: ethers.js를 사용한 토큰 전송 초보자 가이드.
author: 김용준
tags: [ "ETHERS.JS", "ERC-20", "토큰" ]
skill: beginner
lang: ko
published: 2021-04-06
---

## ethers.js(5.0)를 사용하여 토큰 전송하기 {#send-token}

### 이 튜토리얼에서 배울 내용 {#you-learn-about}

- ethers.js 가져오기
- 토큰 전송
- 네트워크 트래픽 상황에 따라 가스 요금 설정하기

### 시작하기 {#to-get-started}

시작하려면 먼저 자바스크립트에 ethers.js 라이브러리를 가져와야 합니다.
ethers.js(5.0) 포함하기

### 설치하기 {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

브라우저에서 ES6 사용

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // 여기에 코드를 작성하세요...
</script>
```

브라우저에서 ES3(UMD) 사용

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### 매개변수 {#param}

1. **`contract_address`**: 토큰 컨트랙트 주소(전송하려는 토큰이 이더가 아닐 경우 컨트랙트 주소가 필요합니다)
2. **`send_token_amount`**: 수신자에게 보낼 금액
3. **`to_address`**: 수신자 주소
4. **`send_account`**: 발신자 주소
5. **`private_key`**: 트랜잭션에 서명하고 토큰을 실제로 전송하기 위한 발신자의 개인 키

## 참고 {#notice}

`sendTransaction()`이 내부적으로 처리하므로 `signTransaction(tx)`는 제거되었습니다.

## 전송 절차 {#procedure}

### 1. 네트워크(테스트넷)에 연결하기 {#connect-to-network}

#### 프로바이더(Infura) 설정 {#set-provider}

Ropsten 테스트넷에 연결하기

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. 지갑 생성하기 {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. 지갑을 네트워크에 연결하기 {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. 현재 가스 요금 가져오기 {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. 트랜잭션 정의하기 {#define-transaction}

아래에 정의된 변수들은 `send_token()`에 의존합니다.

### 트랜잭션 매개변수 {#transaction-params}

1. **`send_account`**: 토큰 발신자 주소
2. **`to_address`**: 토큰 수신자 주소
3. **`send_token_amount`**: 전송할 토큰의 양
4. **`gas_limit`**: 가스 한도
5. **`gas_price`**: 가스 요금

[사용 방법은 아래를 참조하세요](#how-to-use)

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

### 6. 전송 {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("전송 완료!")
})
```

## 사용 방법 {#how-to-use}

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

### 성공! {#success}

![성공적으로 완료된 트랜잭션 이미지](./successful-transaction.png)

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
    console.log(`가스 요금: ${gas_price}`)

    if (contract_address) {
      // 일반 토큰 전송
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // 토큰 수량
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`토큰 수량: ${numberOfTokens}`)

      // 토큰 전송
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("토큰 전송됨")
      })
    } // 이더 전송
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
          alert("전송 완료!")
        })
      } catch (error) {
        alert("전송 실패!!")
      }
    }
  })
}
```
