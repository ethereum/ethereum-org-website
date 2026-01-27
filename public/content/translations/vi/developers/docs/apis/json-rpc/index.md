---
title: API JSON-RPC
description: Một giao thức gọi thủ tục từ xa (RPC) không trạng thái, nhẹ dành cho các máy khách Ethereum.
lang: vi
---

Để một ứng dụng phần mềm có thể tương tác với chuỗi khối Ethereum - bằng cách đọc dữ liệu chuỗi khối hoặc gửi giao dịch tới mạng - nó phải kết nối với một nút Ethereum.

Vì mục đích này, mọi [máy khách Ethereum](/developers/docs/nodes-and-clients/#execution-clients) đều triển khai một [đặc tả JSON-RPC](https://github.com/ethereum/execution-apis), do đó có một bộ phương thức thống nhất mà các ứng dụng có thể dựa vào bất kể việc triển khai nút hoặc máy khách cụ thể nào.

[JSON-RPC](https://www.jsonrpc.org/specification) là một giao thức gọi thủ tục từ xa (RPC) không trạng thái, nhẹ. Nó xác định một số cấu trúc dữ liệu và các quy tắc xung quanh việc xử lý chúng. Nó không phụ thuộc vào phương tiện truyền tải ở chỗ các khái niệm có thể được sử dụng trong cùng một quy trình, qua các ổ cắm, qua HTTP, hoặc trong nhiều môi trường truyền thông điệp khác nhau. Nó sử dụng JSON (RFC 4627) làm định dạng dữ liệu.

## Triển khai máy khách {#client-implementations}

Mỗi máy khách Ethereum có thể sử dụng các ngôn ngữ lập trình khác nhau khi triển khai đặc tả JSON-RPC. Xem [tài liệu tham khảo của từng máy khách](/developers/docs/nodes-and-clients/#execution-clients) để biết thêm chi tiết liên quan đến các ngôn ngữ lập trình cụ thể. Chúng tôi khuyên bạn nên kiểm tra tài liệu tham khảo của từng máy khách để biết thông tin hỗ trợ Giao diện Lập trình Ứng dụng mới nhất.

## Thư viện tiện lợi {#convenience-libraries}

Mặc dù bạn có thể chọn tương tác trực tiếp với các máy khách Ethereum thông qua Giao diện Lập trình Ứng dụng JSON-RPC, nhưng thường có các tùy chọn dễ dàng hơn cho các nhà phát triển ứng dụng phi tập trung. Nhiều thư viện [JavaScript](/developers/docs/apis/javascript/#available-libraries) và [Giao diện Lập trình Ứng dụng backend](/developers/docs/apis/backend/#available-libraries) tồn tại để cung cấp các trình bao bọc trên Giao diện Lập trình Ứng dụng JSON-RPC. Với các thư viện này, các nhà phát triển có thể viết các phương thức trực quan, một dòng bằng ngôn ngữ lập trình mà họ chọn để khởi tạo các yêu cầu JSON-RPC (ngầm) tương tác với Ethereum.

## Các Giao diện Lập trình Ứng dụng của máy khách đồng thuận {#consensus-clients}

Trang này chủ yếu đề cập đến Giao diện Lập trình Ứng dụng JSON-RPC được sử dụng bởi các máy khách thực thi Ethereum. Tuy nhiên, các máy khách đồng thuận cũng có một Giao diện Lập trình Ứng dụng RPC cho phép người dùng truy vấn thông tin về nút, yêu cầu các khối Beacon, trạng thái Beacon và các thông tin khác liên quan đến sự đồng thuận trực tiếp từ một nút. Giao diện Lập trình Ứng dụng này được ghi lại trên [trang web Giao diện Lập trình Ứng dụng Beacon](https://ethereum.github.io/beacon-APIs/#/).

Một Giao diện Lập trình Ứng dụng nội bộ cũng được sử dụng để liên lạc giữa các máy khách trong một nút - nghĩa là nó cho phép máy khách đồng thuận và máy khách thực thi hoán đổi dữ liệu. Đây được gọi là 'Engine API' và các thông số kỹ thuật có sẵn trên [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Đặc tả máy khách thực thi {#spec}

[Đọc toàn bộ đặc tả Giao diện Lập trình Ứng dụng JSON-RPC trên GitHub](https://github.com/ethereum/execution-apis). Giao diện Lập trình Ứng dụng này được ghi lại trên [trang web Giao diện Lập trình Ứng dụng Thực thi](https://ethereum.github.io/execution-apis/) và bao gồm một Trình kiểm tra để dùng thử tất cả các phương thức có sẵn.

## Quy ước {#conventions}

### Mã hóa giá trị hex {#hex-encoding}

Hai loại dữ liệu chính được chuyển qua JSON: mảng byte chưa định dạng và số lượng. Cả hai đều được chuyển bằng mã hóa hex nhưng với các yêu cầu định dạng khác nhau.

#### Số lượng {#quantities-encoding}

Khi mã hóa số lượng (số nguyên, số): mã hóa dưới dạng hex, có tiền tố "0x", dạng biểu diễn nhỏ gọn nhất (ngoại lệ nhỏ: số không phải được biểu diễn dưới dạng "0x0").

Đây là một vài ví dụ:

- 0x41 (65 trong hệ thập phân)
- 0x400 (1024 trong hệ thập phân)
- SAI: 0x (phải luôn có ít nhất một chữ số - số không là "0x0")
- SAI: 0x0400 (không cho phép số không ở đầu)
- SAI: ff (phải có tiền tố 0x)

### Dữ liệu chưa được định dạng {#unformatted-data-encoding}

Khi mã hóa dữ liệu chưa định dạng (mảng byte, địa chỉ tài khoản, hàm băm, mảng bytecode): mã hóa dưới dạng hex, có tiền tố "0x", hai chữ số hex trên mỗi byte.

Đây là một vài ví dụ:

- 0x41 (kích thước 1, "A")
- 0x004200 (kích thước 3, "0B0")
- 0x (kích thước 0, "")
- SAI: 0xf0f0f (phải là số chẵn các chữ số)
- SAI: 004200 (phải có tiền tố 0x)

### Thông số khối {#block-parameter}

Các phương thức sau có thông số khối:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Khi các yêu cầu được thực hiện để truy vấn trạng thái của Ethereum, thông số khối được cung cấp sẽ xác định chiều cao của khối.

Các tùy chọn sau đây có thể có cho thông số khối:

- `Chuỗi HEX` - một số khối nguyên
- `Chuỗi "earliest"` cho khối sớm nhất/khối khởi nguyên
- `Chuỗi "latest"` - cho khối được đề xuất mới nhất
- `Chuỗi "safe"` - cho khối tiêu đề an toàn mới nhất
- `Chuỗi "finalized"` - cho khối đã hoàn tất mới nhất
- `Chuỗi "pending"` - cho trạng thái/giao dịch đang chờ xử lý

## Ví dụ

Trên trang này, chúng tôi cung cấp các ví dụ về cách sử dụng các điểm cuối API JSON_RPC riêng lẻ bằng công cụ dòng lệnh, [curl](https://curl.se). Các ví dụ điểm cuối riêng lẻ này được tìm thấy bên dưới trong phần [Ví dụ về Curl](#curl-examples). Ở phần sau của trang, chúng tôi cũng cung cấp một [ví dụ từ đầu đến cuối](#usage-example) để biên dịch và triển khai một hợp đồng thông minh bằng cách sử dụng một nút Geth, Giao diện Lập trình Ứng dụng JSON_RPC và curl.

## Ví dụ về Curl {#curl-examples}

Các ví dụ về việc sử dụng Giao diện Lập trình Ứng dụng JSON_RPC bằng cách thực hiện các yêu cầu [curl](https://curl.se) tới một nút Ethereum được cung cấp bên dưới. Mỗi ví dụ
bao gồm mô tả về điểm cuối cụ thể, các tham số, loại trả về của nó và một ví dụ đã thực hiện về cách sử dụng nó.

Các yêu cầu curl có thể trả về một thông điệp lỗi liên quan đến loại nội dung. Điều này là do tùy chọn `--data` đặt loại nội dung thành `application/x-www-form-urlencoded`. Nếu nút của bạn phàn nàn về điều này, hãy đặt tiêu đề theo cách thủ công bằng cách đặt `-H "Content-Type: application/json"` ở đầu cuộc gọi. Các ví dụ cũng không bao gồm tổ hợp URL/IP & cổng phải là đối số cuối cùng được cung cấp cho curl (ví dụ: `127.0.0.1:8545`). Một yêu cầu curl hoàn chỉnh bao gồm các dữ liệu bổ sung này có dạng sau:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, Trạng thái, Lịch sử {#gossip-state-history}

Một số phương pháp JSON-RPC cốt lõi yêu cầu dữ liệu từ mạng Ethereum và được phân loại gọn gàng thành ba loại chính: _Gossip, Trạng thái và Lịch sử_. Sử dụng các liên kết trong các phần này để chuyển đến từng phương thức hoặc sử dụng bảng mục lục để khám phá toàn bộ danh sách các phương thức.

### Phương pháp Gossip {#gossip-methods}

> Các phương pháp này theo dõi phần đầu của chuỗi. Đây là cách các giao dịch đi vòng quanh mạng, tìm đường vào các khối và cách các máy khách tìm hiểu về các khối mới.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Phương pháp Trạng thái {#state_methods}

> Các phương pháp báo cáo trạng thái hiện tại của tất cả dữ liệu được lưu trữ. "Trạng thái" giống như một phần RAM lớn được chia sẻ và bao gồm số dư tài khoản, dữ liệu hợp đồng và ước tính gas.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Các phương pháp lịch sử {#history_methods}

> Truy xuất các bản ghi lịch sử của mọi khối trở lại khối khởi nguyên. Đây giống như một tệp chỉ có thể nối thêm lớn và bao gồm tất cả các tiêu đề khối, nội dung khối, khối chú và biên lai giao dịch.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## Sân chơi API JSON-RPC

Bạn có thể sử dụng [công cụ sân chơi](https://ethereum-json-rpc.com) để khám phá và dùng thử các phương thức Giao diện Lập trình Ứng dụng. Nó cũng cho bạn thấy những phương pháp và mạng nào được hỗ trợ bởi các nhà cung cấp nút khác nhau.

## Các phương thức Giao diện Lập trình Ứng dụng JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Trả về phiên bản máy khách hiện tại.

**Tham số**

Không

**Trả về**

`Chuỗi` - Phiên bản máy khách hiện tại

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Kết quả
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Trả về Keccak-256 (_không phải_ SHA3-256 được tiêu chuẩn hóa) của dữ liệu đã cho.

**Tham số**

1. `DATA` - Dữ liệu để chuyển đổi thành một hàm băm SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Trả về**

`DATA` - Kết quả SHA3 của chuỗi đã cho.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Kết quả
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Trả về id mạng hiện tại.

**Tham số**

Không

**Trả về**

`Chuỗi` - Id mạng hiện tại.

Danh sách đầy đủ các ID mạng hiện tại có tại [chainlist.org](https://chainlist.org). Một số cái phổ biến là:

- `1`: Ethereum Mainnet
- `11155111`: Mạng thử nghiệm Sepolia
- `560048`: Mạng thử nghiệm Hoodi

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Kết quả
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

Trả về `true` nếu máy khách đang tích cực lắng nghe các kết nối mạng.

**Tham số**

Không

**Trả về**

`Boolean` - `true` khi đang lắng nghe, nếu không thì là `false`.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Kết quả
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Trả về số lượng peer hiện đang được kết nối với máy khách.

**Tham số**

Không

**Trả về**

`QUANTITY` - số nguyên của số peer đã kết nối.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Kết quả
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Trả về phiên bản giao thức Ethereum hiện tại. Lưu ý rằng phương pháp này [không có sẵn trong Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Tham số**

Không

**Trả về**

`Chuỗi` - Phiên bản giao thức Ethereum hiện tại

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Kết quả
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Trả về một đối tượng có dữ liệu về trạng thái đồng bộ hóa hoặc `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

Không

**Trả về**

Dữ liệu trả về chính xác khác nhau giữa các lần triển khai máy khách. Tất cả các máy khách đều trả về `False` khi nút không đồng bộ hóa và tất cả các máy khách đều trả về các trường sau.

`Object|Boolean`, Một đối tượng có dữ liệu trạng thái đồng bộ hóa hoặc `FALSE`, khi không đồng bộ hóa:

- `startingBlock`: `QUANTITY` - Khối mà tại đó quá trình nhập bắt đầu (sẽ chỉ được đặt lại sau khi quá trình đồng bộ hóa đạt đến phần đầu của nó)
- `currentBlock`: `QUANTITY` - Khối hiện tại, giống như eth_blockNumber
- `highestBlock`: `QUANTITY` - Khối cao nhất ước tính

Tuy nhiên, các máy khách riêng lẻ cũng có thể cung cấp dữ liệu bổ sung. Ví dụ: Geth trả về như sau:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Trong khi đó Besu trả về:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Tham khảo tài liệu tham khảo cho máy khách cụ thể của bạn để biết thêm chi tiết.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Hoặc khi không đồng bộ hóa
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Trả về địa chỉ coinbase của máy khách.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Thử điểm cuối trong sân chơi
</ButtonLink>

> **Lưu ý:** Phương pháp này đã không được dùng nữa kể từ **v1.14.0** và không còn được hỗ trợ. Cố gắng sử dụng phương pháp này sẽ dẫn đến lỗi "Phương pháp không được hỗ trợ".

**Tham số**

Không

**Trả về**

`DATA`, 20 byte - địa chỉ coinbase hiện tại.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Kết quả
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Trả về ID chuỗi được sử dụng để ký các giao dịch được bảo vệ chống phát lại.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

Không

**Trả về**

`chainId`, giá trị thập lục phân dưới dạng một chuỗi đại diện cho số nguyên của id chuỗi hiện tại.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Kết quả
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Trả về `true` nếu máy khách đang tích cực khai thác các khối mới. Điều này chỉ có thể trả về `true` cho các mạng bằng chứng công việc và có thể không có sẵn trong một số máy khách kể từ khi có [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

Không

**Trả về**

`Boolean` - trả về `true` nếu máy khách đang khai thác, ngược lại là `false`.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Trả về số lượng hàm băm mỗi giây mà nút đang khai thác. Điều này chỉ có thể trả về `true` cho các mạng bằng chứng công việc và có thể không có sẵn trong một số máy khách kể từ khi có [The Merge](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

Không

**Trả về**

`QUANTITY` - số lượng hàm băm mỗi giây.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Kết quả
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Trả về ước tính giá hiện tại cho mỗi gas tính bằng wei. Ví dụ, máy khách Besu kiểm tra 100 khối cuối cùng và trả về giá đơn vị gas trung bình theo mặc định.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

Không

**Trả về**

`QUANTITY` - số nguyên của giá gas hiện tại tính bằng wei.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Kết quả
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Trả về một danh sách các địa chỉ thuộc sở hữu của máy khách.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

Không

**Trả về**

`Mảng DATA`, 20 Byte - các địa chỉ thuộc sở hữu của máy khách.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Trả về số của khối gần đây nhất.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

Không

**Trả về**

`QUANTITY` - số nguyên của số khối hiện tại mà máy khách đang ở.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Kết quả
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Trả về số dư của tài khoản tại một địa chỉ nhất định.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `DATA`, 20 Byte - địa chỉ để kiểm tra số dư.
2. `QUANTITY|TAG` - số khối nguyên, hoặc chuỗi `"latest"`, `"earliest"`, `"pending"`, `"safe"`, hoặc `"finalized"`, xem [thông số khối](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Trả về**

`QUANTITY` - số nguyên của số dư hiện tại tính bằng wei.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Trả về giá trị từ một vị trí lưu trữ tại một địa chỉ đã cho.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `DATA`, 20 Byte - địa chỉ của kho lưu trữ.
2. `QUANTITY` - số nguyên của vị trí trong kho lưu trữ.
3. `QUANTITY|TAG` - số khối nguyên, hoặc chuỗi `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, xem [thông số khối](/developers/docs/apis/json-rpc/#block-parameter)

**Trả về**

`DATA` - giá trị tại vị trí lưu trữ này.

**Ví dụ**
Việc tính toán vị trí chính xác phụ thuộc vào kho lưu trữ cần truy xuất. Hãy xem xét hợp đồng sau đây được triển khai tại `0x295a70b2de5e3953354a6a8344e616ed314d7251` bởi địa chỉ `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Việc truy xuất giá trị của pos0 rất đơn giản:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Việc truy xuất một phần tử của bản đồ khó hơn. Vị trí của một phần tử trong bản đồ được tính bằng:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Điều này có nghĩa là để truy xuất kho lưu trữ trên pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"], chúng ta cần tính toán vị trí với:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Bảng điều khiển geth đi kèm với thư viện web3 có thể được sử dụng để thực hiện tính toán:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Bây giờ để tìm nạp kho lưu trữ:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Trả về số lượng giao dịch _đã gửi_ từ một địa chỉ.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `DATA`, 20 Byte - địa chỉ.
2. `QUANTITY|TAG` - số khối nguyên, hoặc chuỗi `"latest"`, `"earliest"`, `"pending"`, `"safe"` hoặc `"finalized"`, xem [thông số khối](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // trạng thái ở khối mới nhất
]
```

**Trả về**

`QUANTITY` - số nguyên của số lượng giao dịch được gửi từ địa chỉ này.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Trả về số lượng giao dịch trong một khối từ một khối khớp với hàm băm khối đã cho.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `DATA`, 32 Byte - hàm băm của một khối

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Trả về**

`QUANTITY` - số nguyên của số lượng giao dịch trong khối này.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Trả về số lượng giao dịch trong một khối khớp với số khối đã cho.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `QUANTITY|TAG` - số nguyên của một số khối, hoặc chuỗi `"earliest"`, `"latest"`, `"pending"`, `"safe"` hoặc `"finalized"`, như trong [thông số khối](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Trả về**

`QUANTITY` - số nguyên của số lượng giao dịch trong khối này.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Trả về số lượng khối chú trong một khối từ một khối khớp với hàm băm khối đã cho.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `DATA`, 32 Byte - hàm băm của một khối

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Trả về**

`QUANTITY` - số nguyên của số lượng khối chú trong khối này.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Trả về số lượng khối chú trong một khối từ một khối khớp với số khối đã cho.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `QUANTITY|TAG` - số nguyên của một số khối, hoặc chuỗi `"latest"`, `"earliest"`, `"pending"`, `"safe"` hoặc `"finalized"`, xem [thông số khối](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Trả về**

`QUANTITY` - số nguyên của số lượng khối chú trong khối này.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Trả về mã tại một địa chỉ đã cho.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `DATA`, 20 Byte - địa chỉ
2. `QUANTITY|TAG` - số khối nguyên, hoặc chuỗi `"latest"`, `"earliest"`, `"pending"`, `"safe"` hoặc `"finalized"`, xem [thông số khối](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Trả về**

`DATA` - mã từ địa chỉ đã cho.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

Phương pháp ký tính toán một chữ ký cụ thể của Ethereum với: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

Bằng cách thêm một tiền tố vào thông điệp, chữ ký được tính toán có thể được nhận dạng là một chữ ký cụ thể của Ethereum. Điều này ngăn chặn việc lạm dụng khi một ứng dụng phi tập trung độc hại có thể ký dữ liệu tùy ý (ví dụ: giao dịch) và sử dụng chữ ký để mạo danh nạn nhân.

Lưu ý: địa chỉ để ký phải được mở khóa.

**Tham số**

1. `DATA`, 20 Byte - địa chỉ
2. `DATA`, N Byte - thông điệp cần ký

**Trả về**

`DATA`: Chữ ký

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Ký một giao dịch có thể được gửi đến mạng sau này bằng [eth_sendRawTransaction](#eth_sendrawtransaction).

**Tham số**

1. `Object` - Đối tượng giao dịch

- `type`:
- `from`: `DATA`, 20 Byte - Địa chỉ mà giao dịch được gửi từ đó.
- `to`: `DATA`, 20 Byte - (tùy chọn khi tạo hợp đồng mới) Địa chỉ mà giao dịch được chuyển đến.
- `gas`: `QUANTITY` - (tùy chọn, mặc định: 90000) Số nguyên của gas được cung cấp cho việc thực hiện giao dịch. Nó sẽ trả lại lượng gas không sử dụng.
- `gasPrice`: `QUANTITY` - (tùy chọn, mặc định: Sẽ được xác định) Số nguyên của gasPrice được sử dụng cho mỗi gas đã thanh toán, tính bằng Wei.
- `value`: `QUANTITY` - (tùy chọn) Số nguyên của giá trị được gửi cùng với giao dịch này, tính bằng Wei.
- `data`: `DATA` - Mã đã biên dịch của hợp đồng HOẶC hàm băm của chữ ký phương thức được gọi và các tham số được mã hóa.
- `nonce`: `QUANTITY` - (tùy chọn) Số nguyên của một nonce. Điều này cho phép ghi đè các giao dịch đang chờ xử lý của chính bạn sử dụng cùng một nonce.

**Trả về**

`DATA`, Đối tượng giao dịch được mã hóa RLP do tài khoản đã chỉ định ký.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Kết quả
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Tạo giao dịch gọi hàm nhắn tin mới hoặc tạo hợp đồng, nếu trường dữ liệu chứa mã và ký bằng tài khoản được chỉ định trong `from`.

**Tham số**

1. `Object` - Đối tượng giao dịch

- `from`: `DATA`, 20 Byte - Địa chỉ mà giao dịch được gửi từ đó.
- `to`: `DATA`, 20 Byte - (tùy chọn khi tạo hợp đồng mới) Địa chỉ mà giao dịch được chuyển đến.
- `gas`: `QUANTITY` - (tùy chọn, mặc định: 90000) Số nguyên của gas được cung cấp cho việc thực hiện giao dịch. Nó sẽ trả lại lượng gas không sử dụng.
- `gasPrice`: `QUANTITY` - (tùy chọn, mặc định: Sẽ được xác định) Số nguyên của gasPrice được sử dụng cho mỗi gas đã thanh toán.
- `value`: `QUANTITY` - (tùy chọn) Số nguyên của giá trị được gửi cùng với giao dịch này.
- `input`: `DATA` - Mã đã biên dịch của hợp đồng HOẶC hàm băm của chữ ký phương thức được gọi và các tham số được mã hóa.
- `nonce`: `QUANTITY` - (tùy chọn) Số nguyên của một nonce. Điều này cho phép ghi đè các giao dịch đang chờ xử lý của chính bạn sử dụng cùng một nonce.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Trả về**

`DATA`, 32 Byte - hàm băm giao dịch hoặc hàm băm không nếu giao dịch chưa có sẵn.

Sử dụng [eth_getTransactionReceipt](#eth_gettransactionreceipt) để lấy địa chỉ hợp đồng, sau khi giao dịch được đề xuất trong một khối, khi bạn tạo một hợp đồng.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Tạo giao dịch gọi hàm nhắn tin mới hoặc tạo hợp đồng cho các giao dịch đã ký.

**Tham số**

1. `DATA`, Dữ liệu giao dịch đã ký.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Trả về**

`DATA`, 32 Byte - hàm băm giao dịch hoặc hàm băm không nếu giao dịch chưa có sẵn.

Sử dụng [eth_getTransactionReceipt](#eth_gettransactionreceipt) để lấy địa chỉ hợp đồng, sau khi giao dịch được đề xuất trong một khối, khi bạn tạo một hợp đồng.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Thực hiện một gọi hàm nhắn tin mới ngay lập tức mà không cần tạo một giao dịch trên chuỗi khối. Thường được sử dụng để thực thi các hàm hợp đồng thông minh chỉ đọc, ví dụ như `balanceOf` cho hợp đồng ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `Object` - Đối tượng gọi giao dịch

- `from`: `DATA`, 20 Byte - (tùy chọn) Địa chỉ mà giao dịch được gửi từ đó.
- `to`: `DATA`, 20 Byte - Địa chỉ mà giao dịch được chuyển đến.
- `gas`: `QUANTITY` - (tùy chọn) Số nguyên của gas được cung cấp cho việc thực hiện giao dịch. eth_call tiêu thụ không gas, nhưng tham số này có thể cần thiết cho một số lần thực hiện.
- `gasPrice`: `QUANTITY` - (tùy chọn) Số nguyên của gasPrice được sử dụng cho mỗi gas đã thanh toán
- `value`: `QUANTITY` - (tùy chọn) Số nguyên của giá trị được gửi cùng với giao dịch này
- `input`: `DATA` - (tùy chọn) Hàm băm của chữ ký phương thức và các tham số được mã hóa. Để biết chi tiết, xem [Giao diện nhị phân ứng dụng Hợp đồng Ethereum trong tài liệu tham khảo Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - số khối nguyên, hoặc chuỗi `"latest"`, `"earliest"`, `"pending"`, `"safe"` hoặc `"finalized"`, xem [thông số khối](/developers/docs/apis/json-rpc/#block-parameter)

**Trả về**

`DATA` - giá trị trả về của hợp đồng đã thực hiện.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Tạo và trả về một ước tính về lượng gas cần thiết để cho phép giao dịch hoàn tất. Giao dịch sẽ không được thêm vào chuỗi khối. Lưu ý rằng ước tính có thể lớn hơn đáng kể so với lượng gas thực sự được sử dụng bởi giao dịch, vì nhiều lý do bao gồm cơ chế Máy chủ ảo Ethereum và hiệu suất nút.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

Xem tham số [eth_call](#eth_call), ngoại trừ tất cả các thuộc tính đều là tùy chọn. Nếu không có giới hạn gas nào được chỉ định, geth sử dụng giới hạn gas khối từ khối đang chờ xử lý làm giới hạn trên. Do đó, ước tính được trả về có thể không đủ để thực hiện lệnh gọi/giao dịch khi lượng gas cao hơn giới hạn gas của khối đang chờ xử lý.

**Trả về**

`QUANTITY` - lượng gas đã sử dụng.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Trả về thông tin về một khối bằng hàm băm.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `DATA`, 32 Byte - Hàm băm của một khối.
2. `Boolean` - Nếu `true`, nó sẽ trả về các đối tượng giao dịch đầy đủ, nếu `false` chỉ trả về hàm băm của các giao dịch.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Trả về**

`Object` - Một đối tượng khối, hoặc `null` khi không tìm thấy khối nào:

- `number`: `QUANTITY` - số khối. `null` khi đó là khối đang chờ xử lý.
- `hash`: `DATA`, 32 Byte - hàm băm của khối. `null` khi đó là khối đang chờ xử lý.
- `parentHash`: `DATA`, 32 Byte - hàm băm của khối cha.
- `nonce`: `DATA`, 8 Byte - hàm băm của bằng chứng công việc được tạo ra. `null` khi đó là khối đang chờ xử lý, `0x0` cho các khối bằng chứng cổ phần (kể từ The Merge)
- `sha3Uncles`: `DATA`, 32 Byte - SHA3 của dữ liệu khối chú trong khối.
- `logsBloom`: `DATA`, 256 Byte - bộ lọc bloom cho nhật ký của khối. `null` khi đó là khối đang chờ xử lý.
- `transactionsRoot`: `DATA`, 32 Byte - gốc của cây trie giao dịch của khối.
- `stateRoot`: `DATA`, 32 Byte - gốc của cây trie trạng thái cuối cùng của khối.
- `receiptsRoot`: `DATA`, 32 Byte - gốc của cây trie biên lai của khối.
- `miner`: `DATA`, 20 Byte - địa chỉ của người hưởng lợi mà phần thưởng khối được trao.
- `difficulty`: `QUANTITY` - số nguyên của độ khó cho khối này.
- `totalDifficulty`: `QUANTITY` - số nguyên của tổng độ khó của chuỗi cho đến khối này.
- `extraData`: `DATA` - trường "dữ liệu bổ sung" của khối này.
- `size`: `QUANTITY` - số nguyên kích thước của khối này tính bằng byte.
- `gasLimit`: `QUANTITY` - lượng gas tối đa được phép trong khối này.
- `gasUsed`: `QUANTITY` - tổng lượng gas được sử dụng bởi tất cả các giao dịch trong khối này.
- `timestamp`: `QUANTITY` - dấu thời gian unix khi khối được đối chiếu.
- `transactions`: `Array` - Mảng các đối tượng giao dịch, hoặc hàm băm giao dịch 32 Byte tùy thuộc vào tham số cuối cùng được đưa ra.
- `uncles`: `Array` - Mảng các hàm băm của khối chú.

**Ví dụ**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

Trả về thông tin về một khối theo số khối.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `QUANTITY|TAG` - số nguyên của một số khối, hoặc chuỗi `"earliest"`, `"latest"`, `"pending"`, `"safe"` hoặc `"finalized"`, như trong [thông số khối](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Nếu `true`, nó sẽ trả về các đối tượng giao dịch đầy đủ, nếu `false` chỉ trả về hàm băm của các giao dịch.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Trả về**
Xem [eth_getBlockByHash](#eth_getblockbyhash)

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Kết quả xem [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Trả về thông tin về một giao dịch được yêu cầu bằng hàm băm giao dịch.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `DATA`, 32 Byte - hàm băm của một giao dịch

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Trả về**

`Object` - Một đối tượng giao dịch, hoặc `null` khi không tìm thấy giao dịch nào:

- `blockHash`: `DATA`, 32 Byte - hàm băm của khối nơi giao dịch này diễn ra. `null` khi đang chờ xử lý.
- `blockNumber`: `QUANTITY` - số khối nơi giao dịch này diễn ra. `null` khi đang chờ xử lý.
- `from`: `DATA`, 20 Byte - địa chỉ của người gửi.
- `gas`: `QUANTITY` - gas do người gửi cung cấp.
- `gasPrice`: `QUANTITY` - giá gas do người gửi cung cấp tính bằng Wei.
- `hash`: `DATA`, 32 Byte - hàm băm của giao dịch.
- `input`: `DATA` - dữ liệu được gửi cùng với giao dịch.
- `nonce`: `QUANTITY` - số lượng giao dịch được thực hiện bởi người gửi trước giao dịch này.
- `to`: `DATA`, 20 Byte - địa chỉ của người nhận. `null` khi đó là một giao dịch tạo hợp đồng.
- `transactionIndex`: `QUANTITY` - số nguyên của vị trí chỉ mục giao dịch trong khối. `null` khi đang chờ xử lý.
- `value`: `QUANTITY` - giá trị được chuyển bằng Wei.
- `v`: `QUANTITY` - id phục hồi ECDSA
- `r`: `QUANTITY` - chữ ký ECDSA r
- `s`: `QUANTITY` - chữ ký ECDSA s

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Kết quả
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Trả về thông tin về một giao dịch theo hàm băm khối và vị trí chỉ mục giao dịch.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `DATA`, 32 Byte - hàm băm của một khối.
2. `QUANTITY` - số nguyên của vị trí chỉ mục giao dịch.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Trả về**
Xem [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Kết quả xem [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Trả về thông tin về một giao dịch theo số khối và vị trí chỉ mục giao dịch.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `QUANTITY|TAG` - một số khối, hoặc chuỗi `"earliest"`, `"latest"`, `"pending"`, `"safe"` hoặc `"finalized"`, như trong [thông số khối](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - vị trí chỉ mục giao dịch.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Trả về**
Xem [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Kết quả xem [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Trả về biên lai của một giao dịch bằng hàm băm giao dịch.

**Lưu ý** Rằng biên lai không có sẵn cho các giao dịch đang chờ xử lý.

**Tham số**

1. `DATA`, 32 Byte - hàm băm của một giao dịch

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Trả về**
`Object` - Một đối tượng biên lai giao dịch, hoặc `null` khi không tìm thấy biên lai nào:

- `transactionHash `: `DATA`, 32 Byte - hàm băm của giao dịch.
- `transactionIndex`: `QUANTITY` - số nguyên của vị trí chỉ mục giao dịch trong khối.
- `blockHash`: `DATA`, 32 Byte - hàm băm của khối nơi giao dịch này diễn ra.
- `blockNumber`: `QUANTITY` - số khối nơi giao dịch này diễn ra.
- `from`: `DATA`, 20 Byte - địa chỉ của người gửi.
- `to`: `DATA`, 20 Byte - địa chỉ của người nhận. null khi đó là một giao dịch tạo hợp đồng.
- `cumulativeGasUsed` : `QUANTITY ` - Tổng lượng gas được sử dụng khi giao dịch này được thực hiện trong khối.
- `effectiveGasPrice` : `QUANTITY` - Tổng của phí cơ bản và tiền boa được trả cho mỗi đơn vị gas.
- `gasUsed `: `QUANTITY ` - Lượng gas chỉ được sử dụng bởi giao dịch cụ thể này.
- `contractAddress `: `DATA`, 20 Byte - Địa chỉ hợp đồng được tạo, nếu giao dịch là tạo hợp đồng, ngược lại là `null`.
- `logs`: `Array` - Mảng các đối tượng nhật ký mà giao dịch này đã tạo.
- `logsBloom`: `DATA`, 256 Byte - Bộ lọc Bloom cho các máy khách chế độ sáng để truy xuất nhanh các nhật ký liên quan.
- `type`: `QUANTITY` - số nguyên của loại giao dịch, `0x0` cho các giao dịch cũ, `0x1` cho các loại danh sách truy cập, `0x2` cho phí động.

Nó cũng trả về _một trong hai_ :

- `root` : `DATA` 32 byte của gốc trạng thái sau giao dịch (trước Byzantium)
- `status`: `QUANTITY` là `1` (thành công) hoặc `0` (thất bại)

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Kết quả
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // chuỗi địa chỉ nếu nó được tạo
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // nhật ký được trả về bởi getFilterLogs, v.v.
    }],
    "logsBloom": "0x00...0", // bộ lọc bloom 256 byte
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Trả về thông tin về một khối uncle của một khối theo hàm băm và vị trí chỉ mục uncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `DATA`, 32 Byte - Hàm băm của một khối.
2. `QUANTITY` - Vị trí chỉ mục của khối chú.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Trả về**
Xem [eth_getBlockByHash](#eth_getblockbyhash)

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Kết quả xem [eth_getBlockByHash](#eth_getblockbyhash)

**Lưu ý**: Một khối chú không chứa các giao dịch riêng lẻ.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Trả về thông tin về một khối uncle của một khối theo số và vị trí chỉ mục uncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Thử điểm cuối trong sân chơi
</ButtonLink>

**Tham số**

1. `QUANTITY|TAG` - một số khối, hoặc chuỗi `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, như trong [thông số khối](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - vị trí chỉ mục của khối chú.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Trả về**
Xem [eth_getBlockByHash](#eth_getblockbyhash)

**Lưu ý**: Một khối chú không chứa các giao dịch riêng lẻ.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Kết quả xem [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Tạo một đối tượng bộ lọc, dựa trên các tùy chọn bộ lọc, để thông báo khi trạng thái thay đổi (nhật ký).
Để kiểm tra xem trạng thái đã thay đổi chưa, hãy gọi [eth_getFilterChanges](#eth_getfilterchanges).

**Lưu ý về việc chỉ định các bộ lọc chủ đề:**
Các chủ đề phụ thuộc vào thứ tự. Một giao dịch với một nhật ký có các chủ đề [A, B] sẽ được khớp bởi các bộ lọc chủ đề sau:

- `[]` "bất cứ điều gì"
- `[A]` "A ở vị trí đầu tiên (và bất cứ điều gì sau đó)"
- `[null, B]` "bất cứ điều gì ở vị trí đầu tiên VÀ B ở vị trí thứ hai (và bất cứ điều gì sau đó)"
- `[A, B]` "A ở vị trí đầu tiên VÀ B ở vị trí thứ hai (và bất cứ điều gì sau đó)"
- `[[A, B], [A, B]]` "(A HOẶC B) ở vị trí đầu tiên VÀ (A HOẶC B) ở vị trí thứ hai (và bất cứ điều gì sau đó)"
- **Tham số**

1. `Object` - Các tùy chọn bộ lọc:

- `fromBlock`: `QUANTITY|TAG` - (tùy chọn, mặc định: `"latest"`) Số khối nguyên, hoặc `"latest"` cho khối được đề xuất cuối cùng, `"safe"` cho khối an toàn cuối cùng, `"finalized"` cho khối đã hoàn tất cuối cùng, hoặc `"pending"`, `"earliest"` cho các giao dịch chưa có trong khối.
- `toBlock`: `QUANTITY|TAG` - (tùy chọn, mặc định: `"latest"`) Số khối nguyên, hoặc `"latest"` cho khối được đề xuất cuối cùng, `"safe"` cho khối an toàn cuối cùng, `"finalized"` cho khối đã hoàn tất cuối cùng, hoặc `"pending"`, `"earliest"` cho các giao dịch chưa có trong khối.
- `address`: `DATA|Array`, 20 Byte - (tùy chọn) Địa chỉ hợp đồng hoặc danh sách các địa chỉ mà từ đó các nhật ký sẽ bắt nguồn.
- `topics`: `Array of DATA`, - (tùy chọn) Mảng 32 Byte `DATA` chủ đề. Các chủ đề phụ thuộc vào thứ tự. Mỗi chủ đề cũng có thể là một mảng DATA với các tùy chọn "hoặc".

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Trả về**
`QUANTITY` - Một id bộ lọc.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Tạo một bộ lọc trong nút, để thông báo khi có một khối mới đến.
Để kiểm tra xem trạng thái đã thay đổi chưa, hãy gọi [eth_getFilterChanges](#eth_getfilterchanges).

**Tham số**
Không có

**Trả về**
`QUANTITY` - Một id bộ lọc.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Kết quả
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Tạo một bộ lọc trong nút, để thông báo khi có các giao dịch đang chờ xử lý mới.
Để kiểm tra xem trạng thái đã thay đổi chưa, hãy gọi [eth_getFilterChanges](#eth_getfilterchanges).

**Tham số**
Không có

**Trả về**
`QUANTITY` - Một id bộ lọc.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Kết quả
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Gỡ cài đặt một bộ lọc với id đã cho. Luôn luôn nên được gọi khi không còn cần theo dõi.
Ngoài ra, Bộ lọc sẽ hết thời gian chờ khi chúng không được yêu cầu với [eth_getFilterChanges](#eth_getfilterchanges) trong một khoảng thời gian.

**Tham số**

1. `QUANTITY` - Id bộ lọc.

```js
params: [
  "0xb", // 11
]
```

**Trả về**
`Boolean` - `true` nếu bộ lọc được gỡ cài đặt thành công, ngược lại là `false`.

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Kết quả
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Phương pháp bỏ phiếu cho một bộ lọc, trả về một mảng các nhật ký đã xảy ra kể từ lần bỏ phiếu cuối cùng.

**Tham số**

1. `QUANTITY` - id bộ lọc.

```js
params: [
  "0x16", // 22
]
```

**Trả về**
`Array` - Mảng các đối tượng nhật ký, hoặc một mảng trống nếu không có gì thay đổi kể từ lần bỏ phiếu cuối cùng.

- Đối với các bộ lọc được tạo bằng `eth_newBlockFilter`, giá trị trả về là các hàm băm khối (`DATA`, 32 Byte), ví dụ: `["0x3454645634534..."]`.

- Đối với các bộ lọc được tạo bằng `eth_newPendingTransactionFilter`, giá trị trả về là các hàm băm giao dịch (`DATA`, 32 Byte), ví dụ: `["0x6345343454645..."]`.

- Đối với các bộ lọc được tạo bằng `eth_newFilter`, nhật ký là các đối tượng có các tham số sau:
  - `removed`: `TAG` - `true` khi nhật ký bị xóa, do tổ chức lại chuỗi. `false` nếu đó là một nhật ký hợp lệ.
  - `logIndex`: `QUANTITY` - số nguyên của vị trí chỉ mục nhật ký trong khối. `null` khi đó là nhật ký đang chờ xử lý.
  - `transactionIndex`: `QUANTITY` - số nguyên của vị trí chỉ mục giao dịch mà nhật ký được tạo từ đó. `null` khi đó là nhật ký đang chờ xử lý.
  - `transactionHash`: `DATA`, 32 Byte - hàm băm của các giao dịch mà nhật ký này được tạo từ đó. `null` khi đó là nhật ký đang chờ xử lý.
  - `blockHash`: `DATA`, 32 Byte - hàm băm của khối nơi nhật ký này diễn ra. `null` khi đang chờ xử lý. `null` khi đó là nhật ký đang chờ xử lý.
  - `blockNumber`: `QUANTITY` - số khối nơi nhật ký này diễn ra. `null` khi đang chờ xử lý. `null` khi đó là nhật ký đang chờ xử lý.
  - `address`: `DATA`, 20 Byte - địa chỉ mà nhật ký này bắt nguồn.
  - `data`: `DATA` - dữ liệu nhật ký không được lập chỉ mục có độ dài thay đổi. (Trong _solidity_: không hoặc nhiều hơn 32 Byte đối số nhật ký không được lập chỉ mục.)
  - `topics`: `Array of DATA` - Mảng từ 0 đến 4 32 Byte `DATA` của các đối số nhật ký được lập chỉ mục. (Trong _solidity_: Chủ đề đầu tiên là _hàm băm_ của chữ ký của sự kiện (ví dụ: `Deposit(address,bytes32,uint256)`), trừ khi bạn đã khai báo sự kiện với bộ chỉ định `anonymous`.)

- **Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Kết quả
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

Trả về một mảng gồm tất cả các nhật ký khớp với bộ lọc có id đã cho.

**Tham số**

1. `QUANTITY` - Id bộ lọc.

```js
params: [
  "0x16", // 22
]
```

**Trả về**
Xem [eth_getFilterChanges](#eth_getfilterchanges)

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Kết quả xem [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Trả về một mảng gồm tất cả các nhật ký khớp với một đối tượng bộ lọc đã cho.

**Tham số**

1. `Object` - Các tùy chọn bộ lọc:

- `fromBlock`: `QUANTITY|TAG` - (tùy chọn, mặc định: `"latest"`) Số khối nguyên, hoặc `"latest"` cho khối được đề xuất cuối cùng, `"safe"` cho khối an toàn cuối cùng, `"finalized"` cho khối đã hoàn tất cuối cùng, hoặc `"pending"`, `"earliest"` cho các giao dịch chưa có trong khối.
- `toBlock`: `QUANTITY|TAG` - (tùy chọn, mặc định: `"latest"`) Số khối nguyên, hoặc `"latest"` cho khối được đề xuất cuối cùng, `"safe"` cho khối an toàn cuối cùng, `"finalized"` cho khối đã hoàn tất cuối cùng, hoặc `"pending"`, `"earliest"` cho các giao dịch chưa có trong khối.
- `address`: `DATA|Array`, 20 Byte - (tùy chọn) Địa chỉ hợp đồng hoặc danh sách các địa chỉ mà từ đó các nhật ký sẽ bắt nguồn.
- `topics`: `Array of DATA`, - (tùy chọn) Mảng 32 Byte `DATA` chủ đề. Các chủ đề phụ thuộc vào thứ tự. Mỗi chủ đề cũng có thể là một mảng DATA với các tùy chọn "hoặc".
- `blockHash`: `DATA`, 32 Byte - (tùy chọn, **tương lai**) Với việc bổ sung EIP-234, `blockHash` sẽ là một tùy chọn bộ lọc mới giới hạn các nhật ký trả về cho một khối duy nhất có hàm băm 32 byte `blockHash`. Việc sử dụng `blockHash` tương đương với `fromBlock` = `toBlock` = số khối có hàm băm `blockHash`. Nếu `blockHash` có trong tiêu chí bộ lọc, thì cả `fromBlock` và `toBlock` đều không được phép.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Trả về**
Xem [eth_getFilterChanges](#eth_getfilterchanges)

**Ví dụ**

```js
// Yêu cầu
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Kết quả xem [eth_getFilterChanges](#eth_getfilterchanges)

## Ví dụ về cách sử dụng {#usage-example}

### Triển khai hợp đồng bằng JSON_RPC {#deploying-contract}

Phần này bao gồm một minh họa về cách triển khai một hợp đồng chỉ bằng giao diện RPC. Có các tuyến thay thế để triển khai các hợp đồng trong đó sự phức tạp này được trừu tượng hóa — ví dụ, sử dụng các thư viện được xây dựng trên giao diện RPC như [web3.js](https://web3js.readthedocs.io/) và [web3.py](https://github.com/ethereum/web3.py). Các bản tóm tắt này thường dễ hiểu hơn và ít bị lỗi hơn, nhưng vẫn hữu ích khi hiểu những gì đang xảy ra bên dưới.

Sau đây là một hợp đồng thông minh đơn giản có tên là `Multiply7` sẽ được triển khai bằng giao diện JSON-RPC cho một nút Ethereum. Hướng dẫn này giả định rằng người đọc đã chạy một nút Geth. Thông tin thêm về các nút và máy khách có tại [đây](/developers/docs/nodes-and-clients/run-a-node). Vui lòng tham khảo tài liệu tham khảo của [máy khách](/developers/docs/nodes-and-clients/) cá nhân để xem cách bắt đầu JSON-RPC HTTP cho các máy khách không phải Geth. Hầu hết các máy khách mặc định phục vụ trên `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

Điều đầu tiên cần làm là đảm bảo giao diện RPC HTTP được bật. Điều này có nghĩa là chúng tôi cung cấp cho Geth cờ `--http` khi khởi động. Trong ví dụ này, chúng tôi sử dụng nút Geth trên một chuỗi phát triển riêng. Sử dụng phương pháp này, chúng ta không cần ether trên mạng thực.

```bash
geth --http --dev console 2>>geth.log
```

Thao tác này sẽ khởi động giao diện HTTP RPC trên `http://localhost:8545`.

Chúng tôi có thể xác minh rằng giao diện đang chạy bằng cách truy xuất địa chỉ coinbase (bằng cách lấy địa chỉ đầu tiên từ mảng tài khoản) và số dư bằng [curl](https://curl.se). Xin lưu ý rằng dữ liệu trong các ví dụ này sẽ khác trên nút cục bộ của bạn. Nếu bạn muốn thử các lệnh này, hãy thay thế các tham số yêu cầu trong yêu cầu curl thứ hai bằng kết quả trả về từ yêu cầu đầu tiên.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Vì các số được mã hóa bằng hex, số dư được trả về bằng wei dưới dạng một chuỗi hex. Nếu chúng ta muốn có số dư bằng ether dưới dạng một con số, chúng ta có thể sử dụng web3 từ bảng điều khiển Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Bây giờ có một số ether trên chuỗi phát triển riêng của chúng tôi, chúng tôi có thể triển khai hợp đồng. Bước đầu tiên là biên dịch hợp đồng Multiply7 thành mã byte có thể được gửi đến EVM. Để cài đặt solc, trình biên dịch Solidity, hãy làm theo [tài liệu tham khảo Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Bạn có thể muốn sử dụng bản phát hành `solc` cũ hơn để khớp với [phiên bản trình biên dịch được sử dụng cho ví dụ của chúng tôi](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

Bước tiếp theo là biên dịch hợp đồng Multiply7 thành mã byte có thể được gửi đến Máy chủ ảo Ethereum.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Bây giờ chúng ta đã có mã đã biên dịch, chúng ta cần xác định chi phí gas để triển khai nó. Giao diện RPC có một phương thức `eth_estimateGas` sẽ cho chúng ta một ước tính.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Và cuối cùng triển khai hợp đồng.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

Giao dịch được chấp nhận bởi nút và một hàm băm giao dịch được trả về. Hàm băm này có thể được sử dụng để theo dõi giao dịch. Bước tiếp theo là xác định địa chỉ nơi hợp đồng của chúng ta được triển khai. Mỗi giao dịch được thực thi sẽ tạo ra một biên nhận. Biên nhận này chứa nhiều thông tin khác nhau về giao dịch, chẳng hạn như giao dịch được bao gồm trong khối nào và Máy chủ ảo Ethereum đã sử dụng bao nhiêu gas. Nếu một giao dịch
tạo ra một hợp đồng, nó cũng sẽ chứa địa chỉ hợp đồng. Chúng ta có thể truy xuất biên nhận bằng phương thức RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Hợp đồng của chúng ta được tạo trên `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Kết quả rỗng thay vì biên nhận có nghĩa là giao dịch chưa được đưa vào một khối. Hãy đợi một lát và kiểm tra xem máy khách đồng thuận của bạn có đang chạy không và thử lại.

#### Tương tác với các hợp đồng thông minh {#interacting-with-smart-contract}

Trong ví dụ này, chúng ta sẽ gửi một giao dịch bằng cách sử dụng `eth_sendTransaction` đến phương thức `multiply` của hợp đồng.

`eth_sendTransaction` yêu cầu một số đối số, cụ thể là `from`, `to` và `data`. `From` là địa chỉ công khai của tài khoản của chúng ta và `to` là địa chỉ hợp đồng. Đối số `data` chứa một tải trọng xác định phương thức nào phải được gọi và với đối số nào. Đây là lúc [ABI (giao diện nhị phân ứng dụng)](https://docs.soliditylang.org/en/latest/abi-spec.html) phát huy tác dụng. ABI là một tệp JSON xác định cách định nghĩa và mã hóa dữ liệu cho Máy chủ ảo Ethereum.

Các byte của tải trọng xác định phương thức nào trong hợp đồng được gọi. Đây là 4 byte đầu tiên từ hàm băm Keccak trên tên hàm và các loại đối số của nó, được mã hóa dưới dạng hex. Hàm nhân chấp nhận một uint là bí danh cho uint256. Điều này cho chúng ta:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Bước tiếp theo là mã hóa các đối số. Chỉ có một uint256, ví dụ, giá trị 6. ABI có một phần chỉ định cách mã hóa các loại uint256.

`int<M>: enc(X)` là mã hóa bù hai của X theo kiểu big-endian, được đệm ở phía bậc cao (bên trái) bằng 0xff cho X âm và bằng các byte không cho X dương sao cho độ dài là bội số của 32 byte.

Giá trị này mã hóa thành `0000000000000000000000000000000000000000000000000000000000000006`.

Kết hợp bộ chọn hàm và đối số đã mã hóa, dữ liệu của chúng ta sẽ là `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Bây giờ có thể gửi giá trị này đến nút:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Vì một giao dịch đã được gửi, một hàm băm giao dịch đã được trả về. Truy xuất biên nhận cho ra kết quả:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

Biên nhận có chứa một nhật ký. Nhật ký này được tạo bởi Máy chủ ảo Ethereum khi thực thi giao dịch và được bao gồm trong biên nhận. Hàm `multiply` cho thấy sự kiện `Print` đã được đưa ra với đầu vào nhân với 7. Vì đối số cho sự kiện `Print` là một uint256, chúng ta có thể giải mã nó theo các quy tắc ABI, điều này sẽ cho chúng ta kết quả thập phân 42 như mong đợi. Ngoài dữ liệu, cần lưu ý rằng các chủ đề có thể được sử dụng để xác định sự kiện nào đã tạo ra nhật ký:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Đây chỉ là một giới thiệu ngắn gọn về một số tác vụ phổ biến nhất, minh họa việc sử dụng trực tiếp JSON-RPC.

## Các chủ đề liên quan {#related-topics}

- [Đặc tả JSON-RPC](http://www.jsonrpc.org/specification)
- [Các nút và client](/developers/docs/nodes-and-clients/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API phụ trợ](/developers/docs/apis/backend/)
- [Các ứng dụng thực thi](/developers/docs/nodes-and-clients/#execution-clients)
