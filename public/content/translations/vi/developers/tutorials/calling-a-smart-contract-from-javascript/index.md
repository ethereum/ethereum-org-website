---
title: Gọi một hợp đồng thông minh từ JavaScript
description: Cách gọi một hàm của hợp đồng thông minh từ JavaScript bằng cách sử dụng ví dụ về token Dai
author: jdourlens
tags:
  - giao dịch
  - frontend
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: Gọi hợp đồng từ JS
lang: vi
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Trong hướng dẫn này, chúng ta sẽ tìm hiểu cách gọi một hàm của [hợp đồng thông minh](/developers/docs/smart-contracts/) từ JavaScript. Đầu tiên là đọc trạng thái của một hợp đồng thông minh (ví dụ: số dư của một người nắm giữ ERC-20), sau đó chúng ta sẽ sửa đổi trạng thái của chuỗi khối bằng cách thực hiện chuyển token. Bạn nên làm quen với việc [thiết lập môi trường JS để tương tác với chuỗi khối](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) từ trước.

Trong ví dụ này, chúng ta sẽ thử nghiệm với token DAI. Cho mục đích thử nghiệm, chúng ta sẽ phân nhánh chuỗi khối bằng cách sử dụng ganache-cli và mở khóa một địa chỉ đã có sẵn nhiều DAI:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Để tương tác với một hợp đồng thông minh, chúng ta sẽ cần địa chỉ và ABI của nó:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

Đối với dự án này, chúng tôi đã rút gọn ABI ERC-20 hoàn chỉnh để chỉ giữ lại hàm `balanceOf` và `transfer` nhưng bạn có thể tìm thấy [toàn bộ ABI ERC-20 tại đây](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Sau đó, chúng ta cần khởi tạo hợp đồng thông minh của mình:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Chúng ta cũng sẽ thiết lập hai địa chỉ:

- địa chỉ sẽ nhận giao dịch chuyển và
- địa chỉ chúng ta đã mở khóa sẽ gửi nó:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Trong phần tiếp theo, chúng ta sẽ gọi hàm `balanceOf` để lấy số lượng token hiện tại mà cả hai địa chỉ đang nắm giữ.

## Call: Đọc giá trị từ một hợp đồng thông minh {#call-reading-value-from-a-smart-contract}

Ví dụ đầu tiên sẽ gọi một phương thức "constant" (hằng số) và thực thi phương thức hợp đồng thông minh của nó trong EVM mà không gửi bất kỳ giao dịch nào. Để làm điều này, chúng ta sẽ đọc số dư ERC-20 của một địa chỉ. [Đọc bài viết của chúng tôi về token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Bạn có thể truy cập các phương thức của hợp đồng thông minh đã được khởi tạo mà bạn đã cung cấp ABI như sau: `yourContract.methods.methodname`. Bằng cách sử dụng hàm `call`, bạn sẽ nhận được kết quả thực thi của hàm.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

Hãy nhớ rằng DAI ERC-20 có 18 chữ số thập phân, điều đó có nghĩa là bạn cần loại bỏ 18 số không để có được số lượng chính xác. uint256 được trả về dưới dạng chuỗi vì JavaScript không xử lý các giá trị số lớn. Nếu bạn không chắc chắn [cách xử lý các số lớn trong JS, hãy xem hướng dẫn của chúng tôi về bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Send: Gửi một giao dịch đến một hàm của hợp đồng thông minh {#send-sending-a-transaction-to-a-smart-contract-function}

Đối với ví dụ thứ hai, chúng ta sẽ gọi hàm chuyển (transfer) của hợp đồng thông minh DAI để gửi 10 DAI đến địa chỉ thứ hai của chúng ta. Hàm chuyển chấp nhận hai tham số: địa chỉ người nhận và số lượng token cần chuyển:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

Hàm gọi trả về mã băm của giao dịch sẽ được khai thác vào chuỗi khối. Trên Ethereum, các mã băm giao dịch có thể dự đoán được - đó là cách chúng ta có thể lấy mã băm của giao dịch trước khi nó được thực thi ([tìm hiểu cách tính toán mã băm tại đây](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Vì hàm chỉ gửi giao dịch lên chuỗi khối, chúng ta không thể thấy kết quả cho đến khi biết khi nào nó được khai thác và đưa vào chuỗi khối. Trong hướng dẫn tiếp theo, chúng ta sẽ tìm hiểu [cách chờ một giao dịch được thực thi trên chuỗi khối bằng cách biết mã băm của nó](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).