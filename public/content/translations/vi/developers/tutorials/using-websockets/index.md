---
title: "Sử dụng WebSockets"
description: "Hướng dẫn sử dụng WebSockets để thực hiện các yêu cầu JSON-RPC và đăng ký các sự kiện, với bất kỳ nhà cung cấp nút Ethereum nào."
author: "Elan Halpern"
lang: vi
tags: ["Alchemy", "websockets", "truy vấn", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Đây là hướng dẫn cơ bản về cách sử dụng WebSockets để thực hiện các yêu cầu đến Chuỗi khối Ethereum. Các ví dụ sử dụng các phương thức JSON-RPC tiêu chuẩn, vì vậy chúng hoạt động với bất kỳ nút hoặc nhà cung cấp nút nào cung cấp điểm cuối WebSocket, bao gồm cả Alchemy.

## WebSockets so với HTTP {#websockets-vs-http}

Khác với HTTP, với WebSockets, bạn không cần phải liên tục thực hiện các yêu cầu khi muốn có thông tin cụ thể. WebSockets duy trì một kết nối mạng lưới cho bạn (nếu được thực hiện đúng cách) và lắng nghe các thay đổi.

Giống như bất kỳ kết nối mạng lưới nào, bạn không nên cho rằng một WebSocket sẽ luôn mở mãi mãi mà không bị gián đoạn, nhưng việc xử lý thủ công các kết nối bị rớt và kết nối lại một cách chính xác có thể khá khó khăn. Một nhược điểm khác của WebSockets là bạn không nhận được mã trạng thái HTTP trong phản hồi, mà chỉ nhận được thông điệp lỗi.

Các thư viện máy khách có thể xử lý việc này cho bạn. Ví dụ: [phương thức truyền tải WebSocket của Viem](https://viem.sh/docs/clients/transports/websocket) sẽ tự động kết nối lại khi socket bị lỗi và gửi các ping duy trì kết nối theo mặc định.

## Dùng thử {#try-it-out}

Bạn cần một URL WebSocket cho một nút Ethereum. Các nhà cung cấp nút sẽ cấp cho bạn một URL khi bạn tạo một khóa Giao diện Lập trình Ứng dụng (API), thường có dạng `wss://<provider-host>/<your-api-key>`. Ví dụ: một URL Mạng chính Ethereum của Alchemy trông giống như `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([đăng ký tài khoản Alchemy miễn phí](https://auth.alchemy.com/signup)). Xem [nút như một dịch vụ](/developers/docs/nodes-and-clients/nodes-as-a-service/) để biết các nhà cung cấp khác, hoặc sử dụng điểm cuối WebSocket của [nút của riêng bạn](/developers/docs/nodes-and-clients/run-a-node/). Các điểm cuối công khai như `wss://ethereum-rpc.publicnode.com` cũng hoạt động cho các thử nghiệm nhanh, nhưng chúng bị giới hạn tốc độ và có thể không hỗ trợ mọi loại đăng ký.

Cách dễ nhất để kiểm tra WebSockets là cài đặt một công cụ dòng lệnh để thực hiện các yêu cầu WebSocket như [wscat](https://github.com/websockets/wscat). Sử dụng wscat, bạn có thể gửi các yêu cầu như sau:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Các dòng bắt đầu bằng `>` là những gì bạn nhập và các dòng bắt đầu bằng `<` là những gì nút gửi lại.

## Cách sử dụng WebSockets {#how-to-use-websockets}

Để bắt đầu, hãy mở một WebSocket bằng URL WebSocket của nhà cung cấp của bạn. Với Alchemy, bạn có thể tìm thấy nó bằng cách mở ứng dụng của mình trong [bảng điều khiển](https://dashboard.alchemy.com/) và xem khóa Giao diện Lập trình Ứng dụng (API) của nó. Lưu ý rằng URL cho WebSockets (`wss://`) khác với URL cho các yêu cầu HTTP (`https://`), mặc dù hầu hết các nhà cung cấp đều sử dụng cùng một khóa API cho cả hai.

![Nơi tìm URL WebSocket của bạn trong bảng điều khiển Alchemy](./use-websockets.mp4#602x280)

Bất kỳ [phương thức JSON-RPC](/developers/docs/apis/json-rpc/) nào mà nhà cung cấp của bạn hỗ trợ đều có thể được sử dụng thông qua WebSocket. Để làm như vậy, hãy sử dụng cùng một payload sẽ được gửi dưới dạng phần thân của yêu cầu HTTP POST, nhưng thay vào đó hãy gửi payload đó thông qua WebSocket.

## Với Web3 {#with-web3}

Việc chuyển đổi sang WebSockets trong khi sử dụng một thư viện máy khách như [Viem](https://viem.sh/) rất đơn giản. Sử dụng phương thức truyền tải `webSocket` với URL WebSocket của bạn thay vì phương thức truyền tải `http`. Ví dụ: sau khi chạy `npm install viem`, hãy lưu tệp này dưới dạng `index.mjs` và chạy `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Đăng ký theo dõi các khối mới qua cùng một WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API Đăng ký (Subscription API) {#subscription-api}

Khi được kết nối thông qua WebSocket, bạn có thể sử dụng thêm hai phương thức: `eth_subscribe` và `eth_unsubscribe`. Các phương thức này sẽ cho phép bạn lắng nghe các sự kiện cụ thể và được thông báo ngay lập tức.

### `eth_subscribe` {#eth-subscribe}

Tạo một đăng ký mới cho các sự kiện được chỉ định. [Tìm hiểu thêm về `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### Tham số {#parameters}

1. Các loại đăng ký
2. Các tham số tùy chọn

Đối số đầu tiên chỉ định loại sự kiện cần lắng nghe. Đối số thứ hai chứa các tùy chọn bổ sung phụ thuộc vào đối số đầu tiên. Các loại mô tả khác nhau, các tùy chọn của chúng và payload sự kiện của chúng được mô tả bên dưới.

#### Kết quả trả về {#returns}

ID đăng ký: ID này sẽ được đính kèm vào bất kỳ sự kiện nào nhận được và cũng có thể được sử dụng để hủy đăng ký bằng cách sử dụng `eth_unsubscribe`.

#### Các sự kiện đăng ký {#subscription-events}

Trong khi đăng ký đang hoạt động, bạn sẽ nhận được các sự kiện là các đối tượng có các trường sau:

- `jsonrpc`: Luôn là "2.0"
- `method`: Luôn là "eth_subscription"
- `params`: Một đối tượng có các trường sau:
  - `subscription`: ID đăng ký được trả về bởi lệnh gọi `eth_subscribe` đã tạo đăng ký này.
  - `result`: Một đối tượng có nội dung thay đổi tùy thuộc vào loại đăng ký.

#### Các loại đăng ký {#subscription-types}

1. `newHeads`

Phát ra một sự kiện bất cứ khi nào một header mới được thêm vào Chuỗi, bao gồm cả trong quá trình tái tổ chức Chuỗi.

Khi xảy ra tái tổ chức Chuỗi, đăng ký này sẽ phát ra một sự kiện chứa tất cả các header mới cho Chuỗi mới. Cụ thể, điều này có nghĩa là bạn có thể thấy nhiều header được phát ra với cùng một chiều cao và khi điều này xảy ra, header sau đó nên được coi là header chính xác sau khi tái tổ chức.

Ví dụ:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

Phát ra các nhật ký (log) là một phần của các khối mới được thêm vào khớp với các tiêu chí bộ lọc được chỉ định.

Khi xảy ra tái tổ chức Chuỗi, các nhật ký thuộc về các khối trên Chuỗi cũ sẽ được phát lại với thuộc tính `removed` được đặt thành `true`. Hơn nữa, các nhật ký thuộc về các khối trên Chuỗi mới sẽ được phát ra, nghĩa là có thể thấy các nhật ký cho cùng một giao dịch nhiều lần trong trường hợp tái tổ chức.

Các tham số

1. Một đối tượng có các trường sau:
   - `address` (tùy chọn): một chuỗi đại diện cho một địa chỉ hoặc một mảng các chuỗi như vậy.
     - Chỉ các nhật ký được tạo từ một trong những địa chỉ này mới được phát ra.
   - `topics`: một mảng các bộ chỉ định chủ đề.
     - Mỗi bộ chỉ định chủ đề có thể là `null`, một chuỗi đại diện cho một chủ đề hoặc một mảng các chuỗi.
     - Mỗi vị trí trong mảng không phải là `null` sẽ giới hạn các nhật ký được phát ra chỉ ở những nhật ký có một trong các chủ đề đã cho ở vị trí đó.

Một số ví dụ về thông số kỹ thuật của chủ đề:

- `[]`: Bất kỳ chủ đề nào cũng được phép.
- `[A]`: A ở vị trí đầu tiên (và bất kỳ thứ gì sau đó).
- `[null, B]`: Bất kỳ thứ gì ở vị trí đầu tiên và B ở vị trí thứ hai (và bất kỳ thứ gì sau đó).
- `[A, B]`: A ở vị trí đầu tiên và B ở vị trí thứ hai (và bất kỳ thứ gì sau đó).
- `[[A, B], [A, B]]`: (A hoặc B) ở vị trí đầu tiên và (A hoặc B) ở vị trí thứ hai (và bất kỳ thứ gì sau đó).

Ví dụ:

Ví dụ này lắng nghe các sự kiện `Deposit` từ [hợp đồng Ether được bọc (WETH)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) trên Mạng chính Ethereum:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

Phát ra mã băm của mỗi giao dịch được thêm vào trạng thái chờ xử lý của nút (mempool của nó).

Ví dụ:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Một số nhà cung cấp cũng cung cấp các loại đăng ký của riêng họ. Ví dụ: [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) của Alchemy phát ra _các đối tượng giao dịch đầy đủ_ thay vì chỉ các mã băm và chấp nhận các bộ lọc `fromAddress`, `toAddress` và `hashesOnly` tùy chọn. Đây không phải là một phần của Giao diện Lập trình Ứng dụng (API) JSON-RPC tiêu chuẩn, vì vậy chúng chỉ hoạt động với nhà cung cấp đó.

### `eth_unsubscribe` {#eth-unsubscribe}

Hủy một đăng ký hiện có để không có thêm sự kiện nào được gửi.

Các tham số

1. ID đăng ký, như đã được trả về trước đó từ một lệnh gọi `eth_subscribe`.

Kết quả trả về

`true` nếu một đăng ký đã được hủy thành công, hoặc `false` nếu không có đăng ký nào tồn tại với ID đã cho.

Một đăng ký chỉ tồn tại trên kết nối WebSocket đã tạo ra nó, vì vậy `eth_unsubscribe` phải được gửi qua cùng một kết nối đó. Nó không thể được gửi dưới dạng một yêu cầu HTTP riêng biệt. Việc đóng kết nối cũng sẽ hủy tất cả các đăng ký của nó.

Ví dụ:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Đăng ký với Alchemy](https://auth.alchemy.com) miễn phí, xem [tài liệu của Alchemy](https://www.alchemy.com/docs/) và để biết tin tức mới nhất, hãy theo dõi Alchemy trên [Twitter](https://x.com/Alchemy).
