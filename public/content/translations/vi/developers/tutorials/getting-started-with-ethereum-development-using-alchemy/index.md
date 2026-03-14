---
title: "Bắt đầu phát triển Ethereum"
description: "Đây là hướng dẫn cho người mới bắt đầu phát triển Ethereum. Chúng tôi sẽ hướng dẫn bạn từ việc tạo điểm cuối Giao diện Lập trình Ứng dụng, đến việc thực hiện yêu cầu dòng lệnh, đến việc viết tập lệnh web3 đầu tiên của bạn! Không yêu cầu kinh nghiệm phát triển chuỗi khối!"
author: "Elan Halpern"
tags:
  [
    "JavaScript",
    "ethers.js",
    "nút",
    "truy vấn",
    "Alchemy"
  ]
skill: beginner
breadcrumb: "Bắt đầu"
lang: vi
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Logo của Ethereum và Alchemy](./ethereum-alchemy.png)

Đây là hướng dẫn cho người mới bắt đầu phát triển Ethereum. Trong hướng dẫn này, chúng tôi sẽ sử dụng [Alchemy](https://alchemyapi.io/), nền tảng phát triển chuỗi khối hàng đầu cung cấp năng lượng cho hàng triệu người dùng từ 70% các ứng dụng chuỗi khối hàng đầu, bao gồm Maker, 0x, MyEtherWallet, Dharma và Kyber. Alchemy sẽ cấp cho chúng tôi quyền truy cập vào điểm cuối Giao diện Lập trình Ứng dụng trên chuỗi Ethereum để chúng tôi có thể đọc và ghi giao dịch.

Chúng tôi sẽ hướng dẫn bạn từ việc đăng ký với Alchemy đến việc viết tập lệnh web3 đầu tiên của bạn! Không yêu cầu kinh nghiệm phát triển chuỗi khối!

## 1. Đăng ký Tài khoản Alchemy Miễn phí {#sign-up-for-a-free-alchemy-account}

Việc tạo một tài khoản với Alchemy rất dễ dàng, [đăng ký miễn phí tại đây](https://auth.alchemy.com/).

## 2. Tạo một Ứng dụng Alchemy {#create-an-alchemy-app}

Để giao tiếp với chuỗi Ethereum và sử dụng các sản phẩm của Alchemy, bạn cần có khóa Giao diện Lập trình Ứng dụng để xác thực các yêu cầu của mình.

Bạn có thể [tạo khóa Giao diện Lập trình Ứng dụng từ bảng điều khiển](https://dashboard.alchemy.com/). Để tạo một khóa mới, hãy điều hướng đến “Tạo ứng dụng” như được hiển thị bên dưới:

Đặc biệt cảm ơn [_ShapeShift_](https://shapeshift.com/) _vì đã cho chúng tôi hiển thị bảng điều khiển của họ!_

![Bảng điều khiển Alchemy](./alchemy-dashboard.png)

Điền vào các chi tiết bên dưới “Tạo ứng dụng” để nhận khóa mới của bạn. Bạn cũng có thể xem các ứng dụng bạn đã tạo trước đây và những ứng dụng do nhóm của bạn tạo ở đây. Lấy các khóa hiện có bằng cách nhấp vào “Xem khóa” cho bất kỳ ứng dụng nào.

![Ảnh chụp màn hình tạo ứng dụng với Alchemy](./create-app.png)

Bạn cũng có thể lấy các khóa Giao diện Lập trình Ứng dụng hiện có bằng cách di chuột qua “Ứng dụng” và chọn một khóa. Bạn có thể “Xem khóa” ở đây, cũng như “Chỉnh sửa ứng dụng” để đưa vào danh sách trắng các miền cụ thể, xem một số công cụ dành cho nhà phát triển và xem các phân tích.

![Gif cho thấy cách người dùng lấy khóa Giao diện Lập trình Ứng dụng](./pull-api-keys.gif)

## 3. Thực hiện yêu cầu từ dòng lệnh {#make-a-request-from-the-command-line}

Tương tác với chuỗi khối Ethereum thông qua Alchemy bằng JSON-RPC và curl.

Đối với các yêu cầu thủ công, chúng tôi khuyên bạn nên tương tác với `JSON-RPC` thông qua các yêu cầu `POST`. Chỉ cần chuyển vào tiêu đề `Content-Type: application/json` và truy vấn của bạn dưới dạng nội dung `POST` với các trường sau:

- `jsonrpc`: Phiên bản JSON-RPC—hiện tại, chỉ `2.0` được hỗ trợ.
- `method`: Phương thức Giao diện Lập trình Ứng dụng ETH. [Xem tham chiếu Giao diện Lập trình Ứng dụng.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: Một danh sách các tham số để chuyển đến phương thức.
- `id`: ID của yêu cầu của bạn. Sẽ được trả về bởi phản hồi để bạn có thể theo dõi xem phản hồi thuộc về yêu cầu nào.

Đây là một ví dụ bạn có thể chạy từ dòng lệnh để lấy giá gas hiện tại:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**LƯU Ý:** Thay thế [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) bằng khóa Giao diện Lập trình Ứng dụng của riêng bạn `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`._

**Kết quả:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Thiết lập ứng dụng khách Web3 của bạn {#set-up-your-web3-client}

**Nếu bạn có một ứng dụng khách hiện có,** hãy thay đổi URL nhà cung cấp nút hiện tại của bạn thành URL của Alchemy với khóa Giao diện Lập trình Ứng dụng của bạn: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key\"`

**_LƯU Ý:_** Các tập lệnh bên dưới cần được chạy trong **ngữ cảnh nút** hoặc **được lưu trong một tệp**, không phải chạy từ dòng lệnh. Nếu bạn chưa cài đặt Node hoặc npm, hãy xem [hướng dẫn thiết lập nhanh cho máy Mac] này(https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs).

Có rất nhiều [thư viện Web3](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) mà bạn có thể tích hợp với Alchemy, tuy nhiên, chúng tôi khuyên bạn nên sử dụng [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), một trình thay thế cho web3.js, được xây dựng và định cấu hình để hoạt động liền mạch với Alchemy. Điều này cung cấp nhiều lợi thế như tự động thử lại và hỗ trợ WebSocket mạnh mẽ.

Để cài đặt AlchemyWeb3.js, **điều hướng đến thư mục dự án của bạn** và chạy:

**Với Yarn:**

```
yarn add @alch/alchemy-web3
```

**Với NPM:**

```
npm install @alch/alchemy-web3
```

Để tương tác với cơ sở hạ tầng nút của Alchemy, hãy chạy trong NodeJS hoặc thêm phần này vào tệp JavaScript:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. Viết tập lệnh Web3 đầu tiên của bạn! {#write-your-first-web3-script}

Bây giờ để thực hành với một chút lập trình web3, chúng ta sẽ viết một tập lệnh đơn giản in ra số khối mới nhất từ Mạng chính Ethereum.

**1. Nếu bạn chưa có, trong thiết bị đầu cuối của bạn, hãy tạo một thư mục dự án mới và cd vào đó:**

```
mkdir web3-example
cd web3-example
```

**2. Cài đặt phần phụ thuộc Alchemy web3 (hoặc bất kỳ web3 nào) vào dự án của bạn nếu bạn chưa cài đặt:**

```
npm install @alch/alchemy-web3
```

**3. Tạo một tệp có tên `index.js` và thêm nội dung sau:**

> Cuối cùng, bạn nên thay thế `demo` bằng khóa Giao diện Lập trình Ứng dụng HTTP Alchemy của mình.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("Số khối mới nhất là " + blockNumber)
}
main()
```

Bạn không quen thuộc với async? Hãy xem [bài đăng trên Medium] này(https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c).

**4. Chạy nó trong thiết bị đầu cuối của bạn bằng cách sử dụng node**

```
node index.js
```

**5. Bây giờ bạn sẽ thấy số khối mới nhất được xuất ra trong bảng điều khiển của mình!**

```
Số khối mới nhất là 11043912
```

**Tuyệt vời!** Xin chúc mừng! Bạn vừa viết tập lệnh web3 đầu tiên của mình bằng Alchemy 🎉\*\*

Bạn không chắc phải làm gì tiếp theo? Hãy thử triển khai hợp đồng thông minh đầu tiên của bạn và thực hành với một số lập trình solidity trong [Hướng dẫn Hợp đồng thông minh Hello World] của chúng tôi(https://www.alchemy.com/docs/hello-world-smart-contract), hoặc kiểm tra kiến thức về bảng điều khiển của bạn với [Ứng dụng demo bảng điều khiển](https://docs.alchemyapi.io/tutorials/demo-app)!

_[Đăng ký với Alchemy miễn phí](https://auth.alchemy.com/), xem [tài liệu tham khảo] của chúng tôi(https://www.alchemy.com/docs/), và để biết tin tức mới nhất, hãy theo dõi chúng tôi trên [Twitter](https://twitter.com/AlchemyPlatform)_.
