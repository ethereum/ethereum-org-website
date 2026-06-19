---
title: "Bắt đầu với việc phát triển Ethereum"
description: "Đây là hướng dẫn dành cho người mới bắt đầu để làm quen với việc phát triển Ethereum. Chúng tôi sẽ đưa bạn từ việc thiết lập một điểm cuối API, thực hiện một yêu cầu dòng lệnh, cho đến việc viết tập lệnh Web3 đầu tiên của bạn! Không yêu cầu kinh nghiệm phát triển Chuỗi khối!"
author: "Elan Halpern"
tags: ["JavaScript", "ethers.js", "nút", "truy vấn", "Alchemy"]
skill: beginner
breadcrumb: "Bắt đầu"
lang: vi
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

Đây là hướng dẫn dành cho người mới bắt đầu để làm quen với việc phát triển Ethereum. Trong hướng dẫn này, chúng ta sẽ sử dụng [Alchemy](https://alchemyapi.io/), nền tảng nhà phát triển Chuỗi khối hàng đầu cung cấp sức mạnh cho hàng triệu người dùng từ 70% các ứng dụng Chuỗi khối hàng đầu, bao gồm Maker, 0x, MyEtherWallet, Dharma và Kyber. Alchemy sẽ cung cấp cho chúng ta quyền truy cập vào một điểm cuối API trên Chuỗi Ethereum để chúng ta có thể đọc và ghi các giao dịch.

Chúng tôi sẽ đưa bạn từ việc đăng ký Alchemy cho đến việc viết tập lệnh Web3 đầu tiên của bạn! Không yêu cầu kinh nghiệm phát triển Chuỗi khối!

## 1. Đăng ký tài khoản Alchemy miễn phí {#sign-up-for-a-free-alchemy-account}

Việc tạo tài khoản với Alchemy rất dễ dàng, [đăng ký miễn phí tại đây](https://auth.alchemy.com/).

## 2. Tạo một ứng dụng Alchemy {#create-an-alchemy-app}

Để giao tiếp với Chuỗi Ethereum và sử dụng các sản phẩm của Alchemy, bạn cần một khóa API để xác thực các yêu cầu của mình.

Bạn có thể [tạo các khóa API từ bảng điều khiển](https://dashboard.alchemy.com/). Để tạo một khóa mới, hãy điều hướng đến “Create App” (Tạo ứng dụng) như hình bên dưới:

Đặc biệt cảm ơn [_ShapeShift_](https://shapeshift.com/) _đã cho phép chúng tôi hiển thị bảng điều khiển của họ!_

![Alchemy dashboard](./alchemy-dashboard.png)

Điền các thông tin chi tiết trong phần “Create App” để nhận khóa mới của bạn. Bạn cũng có thể xem các ứng dụng bạn đã tạo trước đó và các ứng dụng do nhóm của bạn tạo tại đây. Lấy các khóa hiện có bằng cách nhấp vào “View Key” (Xem khóa) cho bất kỳ ứng dụng nào.

![Create app with Alchemy screenshot](./create-app.png)

Bạn cũng có thể lấy các khóa API hiện có bằng cách di chuột qua “Apps” (Ứng dụng) và chọn một ứng dụng. Bạn có thể “View Key” (Xem khóa) tại đây, cũng như “Edit App” (Chỉnh sửa ứng dụng) để đưa các miền cụ thể vào danh sách trắng, xem một số công cụ dành cho nhà phát triển và xem phân tích.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. Thực hiện một yêu cầu từ dòng lệnh {#make-a-request-from-the-command-line}

Tương tác với Chuỗi khối Ethereum thông qua Alchemy bằng cách sử dụng JSON-RPC và curl.

Đối với các yêu cầu thủ công, chúng tôi khuyên bạn nên tương tác với `JSON-RPC` thông qua các yêu cầu `POST`. Chỉ cần truyền vào tiêu đề `Content-Type: application/json` và truy vấn của bạn dưới dạng phần thân `POST` với các trường sau:

- `jsonrpc`: Phiên bản JSON-RPC—hiện tại, chỉ hỗ trợ `2.0`.
- `method`: Phương thức API ETH. [Xem tài liệu tham khảo API.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Danh sách các tham số để truyền vào phương thức.
- `id`: ID yêu cầu của bạn. Sẽ được trả về bởi phản hồi để bạn có thể theo dõi xem phản hồi thuộc về yêu cầu nào.

Dưới đây là một ví dụ bạn có thể chạy từ dòng lệnh để truy xuất giá gas hiện tại:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**LƯU Ý:** Thay thế [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) bằng khóa API của riêng bạn `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Kết quả:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Thiết lập máy khách Web3 của bạn {#set-up-your-web3-client}

**Nếu bạn đã có một máy khách hiện tại,** hãy thay đổi URL nhà cung cấp nút hiện tại của bạn thành URL Alchemy với khóa API của bạn: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_LƯU Ý:_** Các tập lệnh bên dưới cần được chạy trong **môi trường Node** hoặc **được lưu trong một tệp**, không chạy từ dòng lệnh. Nếu bạn chưa cài đặt Node hoặc npm, hãy xem [hướng dẫn thiết lập nhanh cho máy Mac](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) này.

Có rất nhiều [thư viện Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) mà bạn có thể tích hợp với Alchemy, tuy nhiên, chúng tôi khuyên bạn nên sử dụng [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), một giải pháp thay thế trực tiếp cho Web3.js, được xây dựng và cấu hình để hoạt động liền mạch với Alchemy. Điều này mang lại nhiều lợi thế như tự động thử lại và hỗ trợ WebSocket mạnh mẽ.

Để cài đặt AlchemyWeb3.js, **hãy điều hướng đến thư mục dự án của bạn** và chạy:

**Với Yarn:**

```
yarn add @alch/alchemy-web3
```

**Với NPM:**

```
npm install @alch/alchemy-web3
```

Để tương tác với cơ sở hạ tầng nút của Alchemy, hãy chạy trong NodeJS hoặc thêm đoạn mã này vào tệp JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Viết tập lệnh Web3 đầu tiên của bạn! {#write-your-first-web3-script}

Bây giờ, để bắt tay vào thực hành một chút lập trình Web3, chúng ta sẽ viết một tập lệnh đơn giản in ra số khối mới nhất từ Mạng chính Ethereum.

**1. Nếu bạn chưa làm, trong terminal của bạn, hãy tạo một thư mục dự án mới và cd vào đó:**

```
mkdir web3-example
cd web3-example
```

**2. Cài đặt phần phụ thuộc Web3 của Alchemy (hoặc bất kỳ Web3 nào) vào dự án của bạn nếu bạn chưa cài đặt:**

```
npm install @alch/alchemy-web3
```

**3. Tạo một tệp có tên `index.js` và thêm nội dung sau:**

> Cuối cùng, bạn nên thay thế `demo` bằng khóa API HTTP Alchemy của bạn.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

Bạn chưa quen với các khái niệm bất đồng bộ (async)? Hãy xem [bài viết trên Medium](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) này.

**4. Chạy nó trong terminal của bạn bằng node**

```
node index.js
```

**5. Bây giờ bạn sẽ thấy đầu ra số khối mới nhất trong bảng điều khiển của mình!**

```
Số khối mới nhất là 11043912
```

**Tuyệt vời! Chúc mừng! Bạn vừa viết tập lệnh Web3 đầu tiên của mình bằng Alchemy 🎉**

Bạn chưa biết phải làm gì tiếp theo? Hãy thử triển khai hợp đồng thông minh đầu tiên của bạn và bắt tay vào thực hành một chút lập trình Solidity trong [Hướng dẫn Hợp đồng thông minh Hello World](https://www.alchemy.com/docs/hello-world-smart-contract) của chúng tôi, hoặc kiểm tra kiến thức về bảng điều khiển của bạn với [Ứng dụng Demo Bảng điều khiển](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Đăng ký Alchemy miễn phí](https://auth.alchemy.com/), xem [tài liệu](https://www.alchemy.com/docs/) của chúng tôi và để cập nhật những tin tức mới nhất, hãy theo dõi chúng tôi trên [Twitter](https://twitter.com/AlchemyPlatform)_.