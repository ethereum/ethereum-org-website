---
title: "Các thư viện API JavaScript"
description: "Giới thiệu về các thư viện máy khách JavaScript cho phép bạn tương tác với chuỗi khối từ ứng dụng của mình."
lang: vi
---

Để một ứng dụng web tương tác với chuỗi khối Ethereum (tức là đọc dữ liệu chuỗi khối và/hoặc gửi giao dịch đến mạng lưới), nó phải kết nối với một nút Ethereum.

Vì mục đích này, mọi máy khách Ethereum đều triển khai đặc tả [JSON-RPC](/developers/docs/apis/json-rpc/), do đó có một tập hợp các [phương thức](/developers/docs/apis/json-rpc/#json-rpc-methods) đồng nhất mà các ứng dụng có thể dựa vào.

Nếu bạn muốn sử dụng JavaScript để kết nối với một nút Ethereum, bạn có thể sử dụng JavaScript thuần túy nhưng có một số thư viện tiện lợi tồn tại trong hệ sinh thái giúp việc này dễ dàng hơn nhiều. Với các thư viện này, các nhà phát triển có thể viết các phương thức một dòng, trực quan để khởi tạo các yêu cầu JSON-RPC (ở bên trong) tương tác với Ethereum.

Xin lưu ý rằng kể từ [The Merge](/roadmap/merge/), cần có hai phần mềm Ethereum được kết nối - một máy khách thực thi và một ứng dụng khách đồng thuận - để chạy một nút. Vui lòng đảm bảo nút của bạn bao gồm cả máy khách thực thi và ứng dụng khách đồng thuận. Nếu nút của bạn không nằm trên máy cục bộ (ví dụ: nút của bạn đang chạy trên một phiên bản AWS), hãy cập nhật địa chỉ IP trong hướng dẫn cho phù hợp. Để biết thêm thông tin, vui lòng xem trang của chúng tôi về [chạy một nút](/developers/docs/nodes-and-clients/run-a-node/).

## Điều kiện tiên quyết {#prerequisites}

Cùng với việc hiểu JavaScript, có thể sẽ hữu ích nếu bạn hiểu [ngăn xếp Ethereum](/developers/docs/ethereum-stack/) và [các máy khách Ethereum](/developers/docs/nodes-and-clients/).

## Tại sao nên sử dụng thư viện? {#why-use-a-library}

Các thư viện này trừu tượng hóa phần lớn sự phức tạp của việc tương tác trực tiếp với một nút Ethereum. Chúng cũng cung cấp các hàm tiện ích (ví dụ: chuyển đổi ETH sang Gwei) để với tư cách là một nhà phát triển, bạn có thể dành ít thời gian hơn để giải quyết những rắc rối của các máy khách Ethereum và dành nhiều thời gian hơn để tập trung vào chức năng độc đáo của ứng dụng của bạn.

## Các tính năng của thư viện {#library-features}

### Kết nối với các nút Ethereum {#connect-to-ethereum-nodes}

Sử dụng các nhà cung cấp (providers), các thư viện này cho phép bạn kết nối với Ethereum và đọc dữ liệu của nó, cho dù đó là qua JSON-RPC, Infura, Etherscan, Alchemy hay MetaMask.

> **Cảnh báo:** Web3.js đã được lưu trữ vào ngày 4 tháng 3 năm 2025. [Đọc thông báo](https://blog.chainsafe.io/web3-js-sunset/). Cân nhắc sử dụng các thư viện thay thế như [ethers.js](https://ethers.org) hoặc [viem](https://viem.sh) cho các dự án mới.

**Ví dụ về Ethers**

```js
// Một BrowserProvider bao bọc một nhà cung cấp Web3 tiêu chuẩn, đó là
// những gì MetaMask tiêm vào dưới dạng window.ethereum trong mỗi trang
const provider = new ethers.BrowserProvider(window.ethereum)

// Plugin MetaMask cũng cho phép ký các giao dịch để
// gửi ether và trả tiền để thay đổi trạng thái trong Chuỗi khối.
// Đối với điều này, chúng ta cần người ký tài khoản...
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
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // đường dẫn mac os
// trên windows đường dẫn là: "\\\\.\\pipe\\geth.ipc"
// trên linux đường dẫn là: "/users/myuser/.ethereum/geth.ipc"
```

Sau khi thiết lập, bạn sẽ có thể truy vấn chuỗi khối cho:

- số khối
- ước tính Gas
- các sự kiện của hợp đồng thông minh
- id mạng lưới
- và hơn thế nữa...

### Chức năng ví {#wallet-functionality}

Các thư viện này cung cấp cho bạn chức năng để tạo ví, quản lý khóa và ký các giao dịch.

Dưới đây là một ví dụ từ Ethers

```js
// Tạo một phiên bản Ví từ một cụm từ ghi nhớ...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...hoặc từ một khóa riêng tư
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Địa chỉ dưới dạng một Promise theo API Signer
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Một địa chỉ Ví cũng có sẵn một cách đồng bộ
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Các thành phần mật mã nội bộ
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// Cụm từ ghi nhớ của Ví
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// Lưu ý: Một Ví được tạo bằng khóa riêng tư không
//       có cụm từ ghi nhớ (việc dẫn xuất ngăn cản điều đó)
walletPrivateKey.mnemonic
// null

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

// Phương thức connect trả về một phiên bản mới của
// Ví được kết nối với một nhà cung cấp
wallet = walletMnemonic.connect(provider)

// Truy vấn mạng lưới
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Gửi ether
wallet.sendTransaction(tx)
```

[Đọc toàn bộ tài liệu](https://docs.ethers.io/v5/api/signer/#Wallet)

Sau khi thiết lập, bạn sẽ có thể:

- tạo tài khoản
- gửi giao dịch
- ký giao dịch
- và hơn thế nữa...

### Tương tác với các hàm của hợp đồng thông minh {#interact-with-smart-contract-functions}

Các thư viện máy khách JavaScript cho phép ứng dụng của bạn gọi các hàm của hợp đồng thông minh bằng cách đọc Giao diện nhị phân ứng dụng (ABI) của một hợp đồng đã được biên dịch.

ABI về cơ bản giải thích các hàm của hợp đồng ở định dạng JSON và cho phép bạn sử dụng nó giống như một đối tượng JavaScript bình thường.

Vì vậy, hợp đồng Solidity sau:

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

Sẽ tạo ra JSON sau:

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

Điều này có nghĩa là bạn có thể:

- Gửi một giao dịch đến hợp đồng thông minh và thực thi phương thức của nó
- Gọi để ước tính Gas mà việc thực thi một phương thức sẽ tiêu tốn khi được thực thi trong EVM
- Triển khai một hợp đồng
- Và hơn thế nữa...

### Các hàm tiện ích {#utility-functions}

Các hàm tiện ích cung cấp cho bạn các phím tắt tiện lợi giúp việc xây dựng với Ethereum dễ dàng hơn một chút.

Các giá trị ETH mặc định tính bằng Wei. 1 ETH = 1.000.000.000.000.000.000 WEI – điều này có nghĩa là bạn đang phải xử lý rất nhiều con số! `web3.utils.toWei` sẽ chuyển đổi ether sang Wei cho bạn.

Và trong ethers, nó trông như thế này:

```js
// Lấy số dư của một tài khoản (theo địa chỉ hoặc tên ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Thường thì bạn sẽ cần định dạng đầu ra cho người dùng
// những người thích xem các giá trị bằng ether (thay vì Wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Các hàm tiện ích của Web3js](https://docs.web3js.org/api/web3-utils)
- [Các hàm tiện ích của Ethers](https://docs.ethers.org/v6/api/utils/)

## Các thư viện có sẵn {#available-libraries}

**Web3.js -** **_API JavaScript của Ethereum._**

- [Tài liệu](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_Triển khai ví Ethereum hoàn chỉnh và các tiện ích bằng JavaScript và TypeScript._**

- [Trang chủ Ethers.js](https://ethers.org/)
- [Tài liệu](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_Một giao thức để lập chỉ mục dữ liệu Ethereum và IPFS và truy vấn nó bằng GraphQL._**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [Tài liệu](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Trình bao bọc xung quanh Ethers.js với các API được nâng cao._**

- [Tài liệu](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_Giao diện TypeScript cho Ethereum._**

- [Tài liệu](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_API dữ liệu chuỗi khối được làm phong phú, theo thời gian thực trên hàng chục chuỗi._**

- [Tài liệu](https://docs.codex.io)
- [Trình khám phá](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_Siêu thư viện TypeScript với bộ nhớ đệm, hook và test mock được tích hợp sẵn._**

- [Tài liệu](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Các chủ đề liên quan {#related-topics}

- [Các nút và máy khách](/developers/docs/nodes-and-clients/)
- [Các framework phát triển](/developers/docs/frameworks/)

## Các hướng dẫn liên quan {#related-tutorials}

- [Thiết lập Web3js để sử dụng chuỗi khối Ethereum trong JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Hướng dẫn thiết lập web3.js trong dự án của bạn._
- [Gọi một hợp đồng thông minh từ JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Sử dụng token DAI, xem cách gọi hàm của hợp đồng bằng JavaScript._
- [Gửi giao dịch bằng web3 và Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– Hướng dẫn từng bước để gửi giao dịch từ backend._

## Hướng dẫn: API JavaScript & WebSocket trên Ethereum {#tutorials}

- [Sử dụng WebSocket](/developers/tutorials/using-websockets/) _– Cách sử dụng WebSocket với Alchemy để đăng ký các sự kiện Ethereum và thực hiện các yêu cầu JSON-RPC theo thời gian thực._