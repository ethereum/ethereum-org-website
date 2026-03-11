---
title: "Gửi Token bằng ethers.js"
description: "Hướng dẫn thân thiện với người mới bắt đầu về việc gửi token bằng ethers.js."
author: Kim YongJun
tags: [ "ETHERS.JS", "ERC-20", "TOKEN" ]
skill: beginner
lang: vi
published: 2021-04-06
---

## Gửi Token bằng ethers.js(5.0) {#send-token}

### Trong Hướng dẫn này, bạn sẽ học cách {#you-learn-about}

- Nhập ethers.js
- Chuyển token
- Đặt giá gas theo tình hình lưu lượng truy cập của mạng

### Để Bắt đầu {#to-get-started}

Để bắt đầu, trước tiên chúng ta phải nhập thư viện ethers.js vào javascript của mình
Bao gồm ethers.js(5.0)

### Cài đặt {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 trong trình duyệt

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Mã của bạn ở đây...
</script>
```

ES3(UMD) trong trình duyệt

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Các tham số {#param}

1. **`contract_address`**: Địa chỉ hợp đồng token (cần địa chỉ hợp đồng khi token bạn muốn chuyển không phải là ether)
2. **`send_token_amount`**: Số tiền bạn muốn gửi cho người nhận
3. **`to_address`**: Địa chỉ của người nhận
4. **`send_account`**: Địa chỉ của người gửi
5. **`private_key`**: Khóa riêng tư của người gửi để ký giao dịch và thực sự chuyển token

## Lưu ý {#notice}

`signTransaction(tx)` bị xóa vì `sendTransaction()` thực hiện điều đó trong nội bộ.

## Thủ tục gửi {#procedure}

### 1. Kết nối với mạng (mạng thử nghiệm) {#connect-to-network}

#### Thiết lập nhà cung cấp (Infura) {#set-provider}

Kết nối với mạng thử nghiệm Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Tạo ví {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Kết nối Ví với mạng {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Lấy giá gas hiện tại {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // gasPrice
```

### 5. Xác định Giao dịch {#define-transaction}

Các biến được định nghĩa dưới đây phụ thuộc vào `send_token()`

### Các tham số giao dịch {#transaction-params}

1. **`send_account`**: địa chỉ của người gửi token
2. **`to_address`**: địa chỉ của người nhận token
3. **`send_token_amount`**: số lượng token cần gửi
4. **`gas_limit`**: giới hạn gas
5. **`gas_price`**: giá gas

[Xem bên dưới để biết cách sử dụng](#how-to-use)

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

### 6. Chuyển {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Gửi xong!")
})
```

## Cách sử dụng {#how-to-use}

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

### Thành công! {#success}

![hình ảnh giao dịch được thực hiện thành công](./successful-transaction.png)

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
      // gửi token chung
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Bao nhiêu token?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Gửi token
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("đã gửi token")
      })
    } // gửi ether
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
          alert("Gửi xong!")
        })
      } catch (error) {
        alert("gửi thất bại!!")
      }
    }
  })
}
```
