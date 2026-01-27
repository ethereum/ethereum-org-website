---
title: Thư viện API Javascript
description: Một giới thiệu về các thư viện client JavaScript cho phép bạn tương tác với blockchain từ ứng dụng của bạn.
lang: vi
---

Để một ứng dụng web có thể tương tác với chuỗi khối Ethereum (tức là đọc dữ liệu chuỗi khối và/hoặc gửi giao dịch đến mạng), nó phải kết nối với một nút Ethereum.

Vì mục đích này, mọi máy khách Ethereum đều triển khai đặc tả [JSON-RPC](/developers/docs/apis/json-rpc/), vì vậy có một bộ [phương thức](/developers/docs/apis/json-rpc/#json-rpc-methods) thống nhất mà các ứng dụng có thể dựa vào.

Nếu bạn muốn sử dụng JavaScript để kết nối với một nút Ethereum, bạn có thể dùng JavaScript thuần, nhưng có nhiều thư viện tiện lợi trong hệ sinh thái giúp việc này dễ dàng hơn nhiều. Với các thư viện này, các nhà phát triển có thể viết các phương thức trực quan, chỉ với một dòng mã để khởi tạo các yêu cầu JSON-RPC (dưới lớp ngoài) tương tác với Ethereum.

Xin lưu ý rằng kể từ [The Merge](/roadmap/merge/), cần có hai phần mềm Ethereum được kết nối - một máy khách thực thi và một máy khách đồng thuận - để chạy một nút. Hãy chắc chắn rằng nút của bạn có cả client thực thi và client đồng thuận. Nếu nút của bạn không có trên máy cục bộ (ví dụ: nút của bạn đang chạy trên một phiên bản AWS), hãy cập nhật các địa chỉ IP trong hướng dẫn cho phù hợp. Để biết thêm thông tin, vui lòng xem trang của chúng tôi về [chạy một nút](/developers/docs/nodes-and-clients/run-a-node/).

## Điều kiện tiên quyết {#prerequisites}

Cũng như việc hiểu về JavaScript, sẽ rất hữu ích nếu bạn hiểu về [ngăn xếp Ethereum](/developers/docs/ethereum-stack/) và [các máy khách Ethereum](/developers/docs/nodes-and-clients/).

## Tại sao lại sử dụng thư viện {#why-use-a-library}

Những thư viện này giúp đơn giản hóa nhiều phần phức tạp khi bạn tương tác trực tiếp với một nút Ethereum. Chúng cũng cung cấp các hàm tiện ích (ví dụ: chuyển đổi ETH sang Gwei) để với tư cách là nhà phát triển, bạn có thể tốn ít thời gian hơn để xử lý những phức tạp của các client Ethereum và tập trung nhiều thời gian hơn vào chức năng độc đáo của ứng dụng.

## Các tính năng của thư viện {#library-features}

### Kết nối với các nút Ethereum {#connect-to-ethereum-nodes}

Với việc sử dụng chúng, những thư viện này cho phép bạn kết nối với Ethereum và đọc dữ liệu của nó, bất kể đó là qua JSON-RPC, INFURA, Etherscan, Alchemy hay MetaMask.

> **Cảnh báo:** Web3.js đã được lưu trữ vào ngày 4 tháng 3 năm 2025. [Đọc thông báo](https://blog.chainsafe.io/web3-js-sunset/). Hãy cân nhắc sử dụng các thư viện thay thế như [ethers.js](https://ethers.org) hoặc [viem](https://viem.sh) cho các dự án mới.

**Ví dụ về Ethers**

```js
// BrowserProvider bao bọc một nhà cung cấp Web3 tiêu chuẩn, đó là
// những gì MetaMask đưa vào dưới dạng window.ethereum trong mỗi trang
const provider = new ethers.BrowserProvider(window.ethereum)

// Plugin MetaMask cũng cho phép ký các giao dịch để
// gửi ether và thanh toán để thay đổi trạng thái trong blockchain.
// Đối với việc này, chúng ta cần người ký tài khoản...
const signer = provider.getSigner()
```

**Ví dụ về Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// hoặc
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// thay đổi nhà cung cấp
web3.setProvider("ws://localhost:8546")
// hoặc
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Sử dụng nhà cung cấp IPC trong node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // đường dẫn mac os
// hoặc
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // đường dẫn mac os
// trên windows, đường dẫn là: "\\\\.\\pipe\\geth.ipc"
// trên linux, đường dẫn là: "/users/myuser/.ethereum/geth.ipc"
```

Khi đã thiết lập xong, bạn sẽ có thể truy vấn blockchain cho:

- Số khối
- Ước lượng phí gas
- Sự kiện hợp đồng thông minh
- ID mạng lưới
- và nhiều thứ khác

### Chức năng của ví {#wallet-functionality}

Những thư viện này giúp bạn tạo ví, quản lý khóa và ký giao dịch.

Dưới đây là một vài ví dụ về Ethers

```js
// Tạo một thực thể ví từ một chuỗi gợi nhớ...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...hoặc từ một khóa riêng tư
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// đúng

// Địa chỉ dưới dạng một Promise theo API Signer
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Địa chỉ Ví cũng có sẵn một cách đồng bộ
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Các thành phần mật mã nội bộ
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Chuỗi gợi nhớ của ví
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Lưu ý: Một ví được tạo bằng khóa riêng tư sẽ không
//       có chuỗi gợi nhớ (việc dẫn xuất đã ngăn chặn điều đó)
walletPrivateKey.mnemonic
// rỗng

// Ký một tin nhắn
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// Ký một giao dịch
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// Phương thức kết nối trả về một thực thể mới của
// Ví được kết nối với một nhà cung cấp
wallet = walletMnemonic.connect(provider)

// Truy vấn mạng
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Gửi ether
wallet.sendTransaction(tx)
```

[Đọc tài liệu đầy đủ](https://docs.ethers.io/v5/api/signer/#Wallet)

Khi đã thiết lập xong, bạn sẽ có thể:

- Tạo tài khoản
- Gửi đi các giao dịch
- Ký các giao dịch
- và nhiều thứ khác

### Tương tác với các hàm của hợp đồng thông minh {#interact-with-smart-contract-functions}

Thư viện client JavaScript cho phép ứng dụng của bạn gọi các hàm hợp đồng thông minh bằng cách đọc Ứng dụng Giao diện Nhị phân (ABI) từ một hợp đồng đã được biên dịch.

Về cơ bản ABI giải thích các chức năng của hợp đồng trong định dạng JSON và cho phép bạn sử dụng nó như một đối tượng JavaScript bình thường.

Vì vậy, hợp đồng Solidity dưới đây:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

JSON được viết ra như sau:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Có nghĩa là bạn có thể:

- Gửi một giao dịch đến hợp đồng thông minh và thực thi phương thức của nó
- Lệnh gọi để ước lượng lượng gas mà một phương thức sẽ tiêu tốn khi được thực thi trong EVM
- Triển khai một hợp đồng
- Thêm nữa...

### Các hàm tiện ích {#utility-functions}

Các hàm hữu dụng cung cấp cho bạn các phím tắt hữu ích giúp việc xây dựng với Ethereum trở nên dễ dàng hơn một chút.

Giá trị ETH mặc định được biểu diễn bằng đơn vị Wei. 1 ETH = 1.000.000.000.000.000.000 WEI – điều này có nghĩa là bạn đang làm việc với rất nhiều con số! `web3.utils.toWei` chuyển đổi ether sang Wei cho bạn.

Và trong ethers, nó trông như thế này:

```js
// Lấy số dư của một tài khoản (bằng địa chỉ hoặc tên ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Thông thường bạn sẽ cần định dạng đầu ra cho người dùng
// những người thích xem các giá trị bằng ether (thay vì wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Các hàm tiện ích của Web3js](https://docs.web3js.org/api/web3-utils)
- [Các hàm tiện ích của Ethers](https://docs.ethers.org/v6/api/utils/)

## Các thư viện hiện có {#available-libraries}

**Web3.js -** **_API JavaScript của Ethereum._**

- [Tài liệu tham khảo](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Triển khai ví Ethereum hoàn chỉnh và các tiện ích bằng JavaScript và TypeScript._**

- [Trang chủ Ethers.js](https://ethers.org/)
- [Tài liệu tham khảo](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Một giao thức để lập chỉ mục dữ liệu Ethereum và IPFS và truy vấn dữ liệu đó bằng GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Tài liệu tham khảo](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Trình bao bọc Ethers.js với các API nâng cao._**

- [Tài liệu tham khảo](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Giao diện TypeScript cho Ethereum._**

- [Tài liệu tham khảo](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_Siêu thư viện TypeScript với bộ nhớ đệm, hook và các mock thử nghiệm tích hợp sẵn._**

- [Tài liệu tham khảo](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Các nút và client](/developers/docs/nodes-and-clients/)
- [Các khung phát triển](/developers/docs/frameworks/)

## Các hướng dẫn liên quan {#related-tutorials}

- [Thiết lập Web3js để sử dụng chuỗi khối Ethereum trong JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Hướng dẫn thiết lập web3.js trong dự án của bạn._
- [Gọi một hợp đồng thông minh từ JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Sử dụng token DAI, hãy xem cách gọi hàm hợp đồng bằng JavaScript._
- [Gửi giao dịch bằng web3 và Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Hướng dẫn từng bước để gửi giao dịch từ backend._
