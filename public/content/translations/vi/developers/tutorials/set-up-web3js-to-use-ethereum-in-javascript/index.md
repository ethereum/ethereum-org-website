---
title: Thiết lập web3.js để sử dụng chuỗi khối Ethereum trong JavaScript
description: Tìm hiểu cách thiết lập và cấu hình thư viện web3.js để tương tác với chuỗi khối Ethereum từ các ứng dụng JavaScript.
author: "jdourlens"
tags: [ "web3.js", "javascript" ]
skill: beginner
lang: vi
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Trong hướng dẫn này, chúng ta sẽ xem cách bắt đầu với [web3.js](https://web3js.readthedocs.io/) để tương tác với chuỗi khối Ethereum. Web3.js có thể được sử dụng trong cả frontend và backend để đọc dữ liệu từ chuỗi khối hoặc thực hiện giao dịch và thậm chí triển khai các hợp đồng thông minh.

Bước đầu tiên là thêm web3.js vào dự án của bạn. Để sử dụng trong một trang web, bạn có thể nhập thư viện trực tiếp bằng cách sử dụng một CDN như JSDeliver.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

Nếu bạn muốn cài đặt thư viện để sử dụng trong backend hoặc một dự án frontend có sử dụng bản dựng, bạn có thể cài đặt nó bằng npm:

```bash
npm install web3 --save
```

Sau đó, để nhập Web3.js vào một kịch bản Node.js hoặc một dự án frontend Browserify, bạn có thể sử dụng dòng JavaScript sau:

```js
const Web3 = require("web3")
```

Bây giờ chúng ta đã thêm thư viện vào dự án, chúng ta cần khởi tạo nó. Dự án của bạn cần có khả năng giao tiếp với chuỗi khối. Hầu hết các thư viện Ethereum giao tiếp với một [nút](/developers/docs/nodes-and-clients/) thông qua các lệnh gọi RPC. Để khởi tạo nhà cung cấp Web3 của chúng ta, chúng ta sẽ khởi tạo một thực thể Web3 bằng cách chuyển URL của nhà cung cấp làm hàm tạo. Nếu bạn có một nút hoặc [một thực thể ganache đang chạy trên máy tính của bạn](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/), nó sẽ trông như thế này:

```js
const web3 = new Web3("http://localhost:8545")
```

Nếu bạn muốn truy cập trực tiếp vào một nút được lưu trữ, bạn có thể tìm các tùy chọn trên [các nút dưới dạng dịch vụ](/developers/docs/nodes-and-clients/nodes-as-a-service).

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Để kiểm tra xem chúng ta đã cấu hình chính xác thực thể Web3 của mình chưa, chúng ta sẽ cố gắng truy xuất số khối mới nhất bằng cách sử dụng hàm `getBlockNumber`. Hàm này chấp nhận một lệnh gọi lại làm tham số và trả về số khối dưới dạng một số nguyên.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

Nếu bạn thực thi chương trình này, nó sẽ chỉ in ra số khối mới nhất: đỉnh của chuỗi khối. Bạn cũng có thể sử dụng các lệnh gọi hàm `await/async` để tránh lồng các lệnh gọi lại trong mã của bạn:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Bạn có thể xem tất cả các hàm có sẵn trên thực thể Web3 trong [tài liệu tham khảo chính thức của web3.js](https://docs.web3js.org/).

Hầu hết các thư viện Web3 đều không đồng bộ vì trong nền, thư viện thực hiện các lệnh gọi JSON-RPC đến nút, nơi sẽ gửi lại kết quả.

<Divider />

Nếu bạn đang làm việc trong trình duyệt, một số ví trực tiếp chèn một thực thể Web3 và bạn nên cố gắng sử dụng nó bất cứ khi nào có thể, đặc biệt nếu bạn có kế hoạch tương tác với địa chỉ Ethereum của người dùng để thực hiện giao dịch.

Đây là đoạn mã để phát hiện xem có ví MetaMask hay không và cố gắng kích hoạt nó nếu có. Sau đó, nó sẽ cho phép bạn đọc số dư của người dùng và cho phép họ xác thực các giao dịch bạn muốn họ thực hiện trên chuỗi khối Ethereum:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Yêu cầu quyền truy cập tài khoản nếu cần
    await window.ethereum.enable()
    // Tài khoản hiện đã được hiển thị
  } catch (error) {
    // Người dùng từ chối quyền truy cập tài khoản...
  }
}
```

Các lựa chọn thay thế cho web3.js như [Ethers.js](https://docs.ethers.io/) có tồn tại và cũng được sử dụng phổ biến. Trong hướng dẫn tiếp theo, chúng ta sẽ xem [cách dễ dàng lắng nghe các khối mới đến trên chuỗi khối và xem chúng chứa gì](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).
