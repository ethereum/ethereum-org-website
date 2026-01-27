---
title: Sử dụng WebSocket
description: Hướng dẫn sử dụng WebSocket và Alchemy để thực hiện các yêu cầu JSON-RPC và đăng ký các sự kiện.
author: "Elan Halpern"
lang: vi
tags: [ "từ Alchemy", "websockets", "truy vấn", "javascript" ]
skill: beginner
source: Tài liệu Alchemy
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Đây là hướng dẫn ở cấp độ cơ bản về cách sử dụng WebSocket và Alchemy để gửi yêu cầu đến chuỗi khối Ethereum.

## WebSocket so với HTTP {#websockets-vs-http}

Không giống như HTTP, với WebSocket, bạn không cần phải liên tục đưa ra yêu cầu khi muốn có thông tin cụ thể. WebSocket duy trì kết nối mạng cho bạn (nếu được thực hiện đúng) và lắng nghe các thay đổi.

Như với bất kỳ kết nối mạng nào, bạn không nên cho rằng một WebSocket sẽ duy trì mở mãi mãi mà không bị gián đoạn, nhưng việc xử lý chính xác các kết nối bị rớt và kết nối lại bằng tay có thể là một thách thức để làm đúng. Một nhược điểm khác của WebSocket là bạn không nhận được mã trạng thái HTTP trong phản hồi mà chỉ có thông báo lỗi.

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) tự động thêm xử lý cho các lỗi WebSocket và thử lại mà không cần cấu hình.

## Hãy dùng thử {#try-it-out}

Cách dễ nhất để thử nghiệm WebSocket là cài đặt một công cụ dòng lệnh để thực hiện các yêu cầu WebSocket như [wscat](https://github.com/websockets/wscat). Sử dụng wscat, bạn có thể gửi yêu cầu như sau:

_Lưu ý: nếu bạn có tài khoản Alchemy, bạn có thể thay thế `demo` bằng khóa API của riêng mình._ [Đăng ký tài khoản Alchemy miễn phí tại đây!](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## Cách sử dụng WebSocket {#how-to-use-websockets}

Để bắt đầu, hãy mở một WebSocket bằng URL WebSocket cho ứng dụng của bạn. Bạn có thể tìm URL WebSocket của ứng dụng bằng cách mở trang của ứng dụng trong [bảng điều khiển của bạn](https://dashboard.alchemy.com/) và nhấp vào "View Key". Lưu ý rằng URL của ứng dụng cho WebSocket khác với URL cho các yêu cầu HTTP, nhưng cả hai đều có thể được tìm thấy bằng cách nhấp vào "View Key".

![Nơi tìm URL WebSocket của bạn trong bảng điều khiển Alchemy](./use-websockets.gif)

Bất kỳ API nào được liệt kê trong [Tài liệu tham khảo API của Alchemy](https://www.alchemy.com/docs/reference/api-overview) đều có thể được sử dụng qua WebSocket. Để làm như vậy, hãy sử dụng cùng một tải trọng sẽ được gửi dưới dạng phần thân của yêu cầu HTTP POST, nhưng thay vào đó hãy gửi tải trọng đó qua WebSocket.

## Với Web3 {#with-web3}

Chuyển sang WebSocket trong khi sử dụng thư viện ứng dụng khách như Web3 rất đơn giản. Chỉ cần chuyển URL WebSocket thay vì URL HTTP khi khởi tạo ứng dụng khách Web3 của bạn. Ví dụ:

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API đăng ký {#subscription-api}

Khi được kết nối thông qua WebSocket, bạn có thể sử dụng hai phương thức bổ sung: `eth_subscribe` và `eth_unsubscribe`. Các phương pháp này sẽ cho phép bạn lắng nghe các sự kiện cụ thể và được thông báo ngay lập tức.

### `eth_subscribe` {#eth-subscribe}

Tạo một đăng ký mới cho các sự kiện được chỉ định. [Tìm hiểu thêm về `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Các tham số {#parameters}

1. Các loại đăng ký
2. Tham số tùy chọn

Đối số đầu tiên chỉ định loại sự kiện cần lắng nghe. Đối số thứ hai chứa các tùy chọn bổ sung phụ thuộc vào đối số đầu tiên. Các loại mô tả khác nhau, các tùy chọn và tải trọng sự kiện của chúng được mô tả dưới đây.

#### Giá trị trả về {#returns}

ID đăng ký: ID này sẽ được đính kèm với bất kỳ sự kiện nào nhận được và cũng có thể được sử dụng để hủy đăng ký bằng `eth_unsubscribe`.

#### Sự kiện đăng ký {#subscription-events}

Trong khi đăng ký đang hoạt động, bạn sẽ nhận được các sự kiện là các đối tượng có các trường sau:

- `jsonrpc`: Luôn là "2.0"
- `method`: Luôn là "eth_subscription"
- `params`: Một đối tượng có các trường sau:
  - `subscription`: ID đăng ký được trả về bởi lệnh gọi `eth_subscribe` đã tạo đăng ký này.
  - `result`: Một đối tượng có nội dung thay đổi tùy thuộc vào loại đăng ký.

#### Các loại đăng ký {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Trả về thông tin giao dịch cho tất cả các giao dịch được thêm vào trạng thái đang chờ xử lý. Loại đăng ký này đăng ký các giao dịch đang chờ xử lý, tương tự như lệnh gọi Web3 tiêu chuẩn `web3.eth.subscribe("pendingTransactions")`, nhưng khác ở chỗ nó phát ra _thông tin giao dịch đầy đủ_ thay vì chỉ các hàm băm giao dịch.

Ví dụ:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

Phát ra một sự kiện bất cứ khi nào một tiêu đề mới được thêm vào chuỗi, kể cả trong quá trình tái tổ chức chuỗi.

Khi xảy ra tái tổ chức chuỗi, đăng ký này sẽ phát ra một sự kiện chứa tất cả các tiêu đề mới cho chuỗi mới. Cụ thể, điều này có nghĩa là bạn có thể thấy nhiều tiêu đề được phát ra có cùng chiều cao và khi điều này xảy ra, tiêu đề sau nên được coi là tiêu đề chính xác sau khi tái tổ chức.

Ví dụ:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

Phát ra các nhật ký là một phần của các khối mới được thêm vào khớp với tiêu chí bộ lọc đã chỉ định.

Khi xảy ra tái tổ chức chuỗi, các nhật ký là một phần của các khối trên chuỗi cũ sẽ được phát ra lại với thuộc tính `removed` được đặt thành `true`. Hơn nữa, các nhật ký là một phần của các khối trên chuỗi mới được phát ra, có nghĩa là có thể thấy các nhật ký cho cùng một giao dịch nhiều lần trong trường hợp tái tổ chức.

Tham số

1. Một đối tượng có các trường sau:
   - `address` (tùy chọn): một chuỗi đại diện cho một địa chỉ hoặc một mảng các chuỗi như vậy.
     - Chỉ các nhật ký được tạo từ một trong những địa chỉ này mới được phát ra.
   - `topics`: một mảng các bộ chỉ định chủ đề.
     - Mỗi bộ chỉ định chủ đề là `null`, một chuỗi đại diện cho một chủ đề hoặc một mảng các chuỗi.
     - Mỗi vị trí trong mảng không phải là `null` sẽ hạn chế các nhật ký được phát ra chỉ với những nhật ký có một trong các chủ đề đã cho ở vị trí đó.

Một số ví dụ về thông số kỹ thuật chủ đề:

- `[]`: Mọi chủ đề đều được cho phép.
- `[A]`: A ở vị trí đầu tiên (và bất kỳ thứ gì sau đó).
- `[null, B]`: Bất kỳ thứ gì ở vị trí đầu tiên và B ở vị trí thứ hai (và bất kỳ thứ gì sau đó).
- `[A, B]`: A ở vị trí đầu tiên và B ở vị trí thứ hai (và bất kỳ thứ gì sau đó).
- `[[A, B], [A, B]]`: (A hoặc B) ở vị trí đầu tiên và (A hoặc B) ở vị trí thứ hai (và bất kỳ thứ gì sau đó).

Ví dụ:

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

Hủy một đăng ký hiện có để không có sự kiện nào được gửi thêm.

Tham số

1. ID đăng ký, như đã được trả về trước đó từ một lệnh gọi `eth_subscribe`.

Giá trị trả về

`true` nếu đăng ký được hủy thành công, hoặc `false` nếu không có đăng ký nào tồn tại với ID đã cho.

Ví dụ:

**Yêu cầu**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'


```

**Kết quả**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[Đăng ký miễn phí với Alchemy](https://auth.alchemy.com), xem [tài liệu của chúng tôi](https://www.alchemy.com/docs/) và để biết những tin tức mới nhất, hãy theo dõi chúng tôi trên [Twitter](https://x.com/AlchemyPlatform).
