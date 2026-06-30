---
title: "Hợp đồng thông minh Hello World cho người mới bắt đầu - Fullstack"
description: "Hướng dẫn nhập môn về cách viết và triển khai một hợp đồng thông minh đơn giản trên Ethereum."
author: "nstrike2"
breadcrumb: Hello World fullstack
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "hợp đồng thông minh",
    "triển khai",
    "trình khám phá khối",
    "frontend",
    "giao dịch",
    "framework",
  ]
skill: beginner
lang: vi
published: 2021-10-25
---

Hướng dẫn này dành cho bạn nếu bạn mới làm quen với việc phát triển chuỗi khối và không biết bắt đầu từ đâu hoặc làm thế nào để triển khai và tương tác với các hợp đồng thông minh. Chúng ta sẽ cùng nhau tạo và triển khai một hợp đồng thông minh đơn giản trên mạng thử nghiệm Goerli bằng cách sử dụng [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), và [Alchemy](https://alchemy.com/eth).

Bạn sẽ cần một tài khoản Alchemy để hoàn thành hướng dẫn này. [Đăng ký tài khoản miễn phí](https://www.alchemy.com/).

Nếu bạn có câu hỏi ở bất kỳ bước nào, đừng ngần ngại liên hệ trong [Discord của Alchemy](https://discord.gg/gWuC7zB)!

## Phần 1 - Tạo và triển khai hợp đồng thông minh của bạn bằng Hardhat {#part-1}

### Kết nối với mạng lưới Ethereum {#connect-to-the-ethereum-network}

Có nhiều cách để tạo yêu cầu đến chuỗi Ethereum. Để đơn giản, chúng ta sẽ sử dụng một tài khoản miễn phí trên Alchemy, một nền tảng dành cho nhà phát triển chuỗi khối và API cho phép chúng ta giao tiếp với chuỗi Ethereum mà không cần tự chạy một nút. Alchemy cũng có các công cụ dành cho nhà phát triển để giám sát và phân tích; chúng ta sẽ tận dụng những công cụ này trong hướng dẫn này để hiểu những gì đang diễn ra bên trong việc triển khai hợp đồng thông minh của chúng ta.

### Tạo ứng dụng và khóa API của bạn {#create-your-app-and-api-key}

Sau khi bạn đã tạo tài khoản Alchemy, bạn có thể tạo khóa API bằng cách tạo một ứng dụng. Điều này sẽ cho phép bạn tạo các yêu cầu đến mạng thử nghiệm Goerli. Nếu bạn không quen thuộc với các mạng thử nghiệm, bạn có thể [đọc hướng dẫn của Alchemy về cách chọn mạng lưới](https://www.alchemy.com/docs/choosing-a-web3-network).

Trên bảng điều khiển Alchemy, tìm menu thả xuống **Apps** trên thanh điều hướng và nhấp vào **Create App**.

![Hello world create app](./hello-world-create-app.png)

Đặt tên cho ứng dụng của bạn là '_Hello World_' và viết một mô tả ngắn. Chọn **Staging** làm môi trường của bạn và **Goerli** làm mạng lưới của bạn.

![create app view hello world](./create-app-view-hello-world.png)

_Lưu ý: hãy chắc chắn chọn **Goerli**, nếu không hướng dẫn này sẽ không hoạt động._

Nhấp vào **Create app**. Ứng dụng của bạn sẽ xuất hiện trong bảng bên dưới.

### Tạo một tài khoản Ethereum {#create-an-ethereum-account}

Bạn cần một tài khoản Ethereum để gửi và nhận các giao dịch. Chúng ta sẽ sử dụng MetaMask, một ví ảo trên trình duyệt cho phép người dùng quản lý địa chỉ tài khoản Ethereum của họ.

Bạn có thể tải xuống và tạo tài khoản MetaMask miễn phí [tại đây](https://metamask.io/download). Khi bạn đang tạo tài khoản, hoặc nếu bạn đã có tài khoản, hãy đảm bảo chuyển sang “Goerli Test Network” ở góc trên bên phải (để chúng ta không phải giao dịch bằng tiền thật).

### Bước 4: Thêm ether từ một vòi {#step-4-add-ether-from-a-faucet}

Để triển khai hợp đồng thông minh của bạn lên mạng thử nghiệm, bạn sẽ cần một ít ETH giả. Để nhận ETH trên mạng lưới Goerli, hãy truy cập vào một vòi Goerli và nhập địa chỉ tài khoản Goerli của bạn. Lưu ý rằng các vòi Goerli gần đây có thể hơi không ổn định - hãy xem [trang mạng thử nghiệm](/developers/docs/networks/#goerli) để biết danh sách các tùy chọn có thể thử:

_Lưu ý: do tắc nghẽn mạng lưới, quá trình này có thể mất một lúc._
``

### Bước 5: Kiểm tra số dư của bạn {#step-5-check-your-balance}

Để kiểm tra lại xem ETH đã có trong ví của bạn chưa, hãy tạo một yêu cầu [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) bằng cách sử dụng [công cụ sandbox của Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Yêu cầu này sẽ trả về số lượng ETH trong ví của chúng ta. Để tìm hiểu thêm, hãy xem [hướng dẫn ngắn của Alchemy về cách sử dụng công cụ composer](https://youtu.be/r6sjRxBZJuU).

Nhập địa chỉ tài khoản MetaMask của bạn và nhấp vào **Send Request**. Bạn sẽ thấy một phản hồi trông giống như đoạn mã bên dưới.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Lưu ý: Kết quả này tính bằng wei, không phải ETH. Wei được sử dụng làm đơn vị nhỏ nhất của ether._

Phù! Toàn bộ số tiền giả của chúng ta đã ở đó.
### Bước 6: Khởi tạo dự án của chúng ta {#step-6-initialize-our-project}

Đầu tiên, chúng ta sẽ cần tạo một thư mục cho dự án của mình. Điều hướng đến dòng lệnh của bạn và nhập nội dung sau.

```
mkdir hello-world
cd hello-world
```

Bây giờ chúng ta đã ở trong thư mục dự án của mình, chúng ta sẽ sử dụng `npm init` để khởi tạo dự án.

> Nếu bạn chưa cài đặt npm, hãy làm theo [hướng dẫn cài đặt Node.js](https://nodejs.org/en/download/) để cài đặt Node.js và npm.

Đối với mục đích của hướng dẫn này, việc bạn trả lời các câu hỏi khởi tạo như thế nào không quan trọng. Dưới đây là cách chúng tôi đã làm để bạn tham khảo:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Chấp thuận package.json và chúng ta đã sẵn sàng!
### Bước 7: Tải xuống Hardhat {#step-7-download-hardhat}

Hardhat là một môi trường phát triển để biên dịch, triển khai, thử nghiệm và gỡ lỗi phần mềm Ethereum của bạn. Nó giúp các nhà phát triển khi xây dựng các hợp đồng thông minh và ứng dụng phi tập trung (dapp) cục bộ trước khi triển khai lên chuỗi trực tiếp.

Bên trong dự án `hello-world` của chúng ta, hãy chạy:

```
npm install --save-dev hardhat
```

Xem trang này để biết thêm chi tiết về [hướng dẫn cài đặt](https://hardhat.org/getting-started/#overview).

### Bước 8: Tạo dự án Hardhat {#step-8-create-hardhat-project}

Bên trong thư mục dự án `hello-world` của chúng ta, hãy chạy:

```
npx hardhat
```

Sau đó, bạn sẽ thấy một thông điệp chào mừng và tùy chọn để chọn những gì bạn muốn làm. Chọn “create an empty hardhat.config.js”:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Thao tác này sẽ tạo ra một tệp `hardhat.config.js` trong dự án. Chúng ta sẽ sử dụng tệp này sau trong hướng dẫn để chỉ định thiết lập cho dự án của chúng ta.

### Bước 9: Thêm các thư mục dự án {#step-9-add-project-folders}

Để giữ cho dự án được tổ chức tốt, hãy tạo hai thư mục mới. Trong dòng lệnh, điều hướng đến thư mục gốc của dự án `hello-world` của bạn và nhập:

```
mkdir contracts
mkdir scripts
```

- `contracts/` là nơi chúng ta sẽ giữ tệp mã hợp đồng thông minh hello world của mình
- `scripts/` là nơi chúng ta sẽ giữ các tập lệnh để triển khai và tương tác với hợp đồng của mình

### Bước 10: Viết hợp đồng của chúng ta {#step-10-write-our-contract}

Bạn có thể đang tự hỏi, khi nào chúng ta mới viết mã? Đã đến lúc rồi!

Mở dự án hello-world trong trình soạn thảo yêu thích của bạn. Các hợp đồng thông minh phổ biến nhất được viết bằng Solidity, ngôn ngữ mà chúng ta sẽ sử dụng để viết hợp đồng thông minh của mình.‌

1. Điều hướng đến thư mục `contracts` và tạo một tệp mới có tên là `HelloWorld.sol`
2. Dưới đây là một hợp đồng thông minh Hello World mẫu mà chúng ta sẽ sử dụng cho hướng dẫn này. Sao chép nội dung bên dưới vào tệp `HelloWorld.sol`.

_Lưu ý: Hãy chắc chắn đọc các bình luận để hiểu hợp đồng này làm gì._

```
// Chỉ định phiên bản của Solidity, sử dụng phiên bản ngữ nghĩa.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Định nghĩa một hợp đồng có tên là `HelloWorld`.
// Một hợp đồng là một tập hợp các hàm và dữ liệu (trạng thái của nó). Sau khi được triển khai, một hợp đồng nằm ở một địa chỉ cụ thể trên chuỗi khối Ethereum. Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Được phát ra khi hàm update được gọi
   // Các sự kiện của hợp đồng thông minh là một cách để hợp đồng của bạn giao tiếp rằng có điều gì đó đã xảy ra trên chuỗi khối với giao diện người dùng của ứng dụng, giao diện này có thể 'lắng nghe' các sự kiện nhất định và thực hiện hành động khi chúng xảy ra.
   event UpdatedMessages(string oldStr, string newStr);

   // Khai báo một biến trạng thái `message` có kiểu `string`.
   // Các biến trạng thái là các biến có giá trị được lưu trữ vĩnh viễn trong bộ nhớ của hợp đồng. Từ khóa `public` làm cho các biến có thể truy cập được từ bên ngoài hợp đồng và tạo ra một hàm mà các hợp đồng hoặc máy khách khác có thể gọi để truy cập giá trị.
   string public message;

   // Tương tự như nhiều ngôn ngữ hướng đối tượng dựa trên lớp, constructor (hàm tạo) là một hàm đặc biệt chỉ được thực thi khi tạo hợp đồng.
   // Các hàm tạo được sử dụng để khởi tạo dữ liệu của hợp đồng. Tìm hiểu thêm:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Chấp nhận một đối số chuỗi `initMessage` và thiết lập giá trị vào biến lưu trữ `message` của hợp đồng).
      message = initMessage;
   }

   // Một hàm công khai chấp nhận một đối số chuỗi và cập nhật biến lưu trữ `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Đây là một hợp đồng thông minh cơ bản lưu trữ một thông điệp khi được tạo. Nó có thể được cập nhật bằng cách gọi hàm `update`.

### Bước 11: Kết nối MetaMask & Alchemy với dự án của bạn {#step-11-connect-metamask-alchemy-to-your-project}

Chúng ta đã tạo một ví MetaMask, tài khoản Alchemy và viết hợp đồng thông minh của mình, bây giờ là lúc kết nối cả ba.

Mọi giao dịch được gửi từ ví của bạn đều yêu cầu chữ ký bằng khóa riêng tư duy nhất của bạn. Để cung cấp cho chương trình của chúng ta quyền này, chúng ta có thể lưu trữ an toàn khóa riêng tư của mình trong một tệp môi trường. Chúng ta cũng sẽ lưu trữ khóa API cho Alchemy ở đây.

> Để tìm hiểu thêm về việc gửi các giao dịch, hãy xem [hướng dẫn này](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) về cách gửi các giao dịch bằng Web3.

Đầu tiên, hãy cài đặt gói dotenv trong thư mục dự án của bạn:

```
npm install dotenv --save
```

Sau đó, tạo một tệp `.env` trong thư mục gốc của dự án. Thêm khóa riêng tư MetaMask và URL API HTTP Alchemy của bạn vào đó.

Tệp môi trường của bạn phải được đặt tên là `.env` nếu không nó sẽ không được nhận dạng là tệp môi trường.

Không đặt tên nó là `process.env` hoặc `.env-custom` hoặc bất kỳ tên nào khác.

- Làm theo [các hướng dẫn này](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) để xuất khóa riêng tư của bạn
- Xem bên dưới để lấy URL API HTTP Alchemy

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

Tệp `.env` của bạn sẽ trông giống như thế này:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Để thực sự kết nối những thứ này với mã của chúng ta, chúng ta sẽ tham chiếu các biến này trong tệp `hardhat.config.js` ở bước 13.

### Bước 12: Cài đặt Ethers.js {#step-12-install-ethersjs}

Ethers.js là một thư viện giúp tương tác và tạo các yêu cầu đến Ethereum dễ dàng hơn bằng cách bọc [các phương thức JSON-RPC tiêu chuẩn](/developers/docs/apis/json-rpc/) bằng các phương thức thân thiện với người dùng hơn.

Hardhat cho phép chúng ta tích hợp [các plugin](https://hardhat.org/plugins/) để có thêm công cụ và chức năng mở rộng. Chúng ta sẽ tận dụng [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) cho việc triển khai hợp đồng.

Trong thư mục dự án của bạn, hãy nhập:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Bước 13: Cập nhật hardhat.config.js {#step-13-update-hardhat-configjs}

Cho đến nay, chúng ta đã thêm một số phần phụ thuộc và plugin, bây giờ chúng ta cần cập nhật `hardhat.config.js` để dự án của chúng ta biết về tất cả chúng.

Cập nhật tệp `hardhat.config.js` của bạn để trông giống như thế này:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### Bước 14: Biên dịch hợp đồng của chúng ta {#step-14-compile-our-contract}

Để đảm bảo mọi thứ đang hoạt động tốt cho đến nay, hãy biên dịch hợp đồng của chúng ta. Tác vụ `compile` là một trong những tác vụ được tích hợp sẵn của hardhat.

Từ dòng lệnh, hãy chạy:

```bash
npx hardhat compile
```

Bạn có thể nhận được cảnh báo về `SPDX license identifier not provided in source file`, nhưng không cần phải lo lắng về điều đó — hy vọng mọi thứ khác đều ổn! Nếu không, bạn luôn có thể nhắn tin trong [Discord của Alchemy](https://discord.gg/u72VCg3).

### Bước 15: Viết tập lệnh triển khai của chúng ta {#step-15-write-our-deploy-script}

Bây giờ hợp đồng của chúng ta đã được viết và tệp cấu hình của chúng ta đã sẵn sàng, đã đến lúc viết tập lệnh triển khai hợp đồng của chúng ta.

Điều hướng đến thư mục `scripts/` và tạo một tệp mới có tên là `deploy.js` , thêm nội dung sau vào đó:

```javascript
async function main() {
  const HelloWorld = await ethers.getHợp đồngFactory("HelloWorld")

  // Bắt đầu việc triển khai, trả về một promise giải quyết thành một đối tượng hợp đồng
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat làm rất tốt việc giải thích chức năng của từng dòng mã này trong [hướng dẫn về Hợp đồng](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) của họ, chúng tôi đã áp dụng các giải thích của họ ở đây.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Một `ContractFactory` trong ethers.js là một sự trừu tượng hóa được sử dụng để triển khai các hợp đồng thông minh mới, vì vậy `HelloWorld` ở đây là một [nhà máy (factory)](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) cho các phiên bản của hợp đồng hello world của chúng ta. Khi sử dụng plugin `hardhat-ethers` `ContractFactory` và `Contract`, các phiên bản được kết nối với người ký đầu tiên (chủ sở hữu) theo mặc định.

```javascript
const hello_world = await HelloWorld.deploy()
```

Việc gọi `deploy()` trên một `ContractFactory` sẽ bắt đầu việc triển khai và trả về một `Promise` phân giải thành một đối tượng `Contract`. Đây là đối tượng có một phương thức cho mỗi hàm hợp đồng thông minh của chúng ta.

### Bước 16: Triển khai hợp đồng của chúng ta {#step-16-deploy-our-contract}

Cuối cùng chúng ta đã sẵn sàng để triển khai hợp đồng thông minh của mình! Điều hướng đến dòng lệnh và chạy:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Sau đó, bạn sẽ thấy một cái gì đó giống như:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Vui lòng lưu địa chỉ này**. Chúng ta sẽ sử dụng nó sau trong hướng dẫn.

Nếu chúng ta truy cập [Etherscan của Goerli](https://goerli.etherscan.io) và tìm kiếm địa chỉ hợp đồng của mình, chúng ta sẽ có thể thấy rằng nó đã được triển khai thành công. Giao dịch sẽ trông giống như thế này:

![](./etherscan-contract.png)

Địa chỉ `From` phải khớp với địa chỉ tài khoản MetaMask của bạn và địa chỉ `To` sẽ hiển thị **Contract Creation**. Nếu chúng ta nhấp vào giao dịch, chúng ta sẽ thấy địa chỉ hợp đồng của mình trong trường `To`.

![](./etherscan-transaction.png)

Chúc mừng! Bạn vừa triển khai một hợp đồng thông minh lên một mạng thử nghiệm Ethereum.

Để hiểu những gì đang diễn ra bên trong, hãy điều hướng đến tab Explorer trong [bảng điều khiển Alchemy](https://dashboard.alchemy.com/explorer) của chúng ta. Nếu bạn có nhiều ứng dụng Alchemy, hãy đảm bảo lọc theo ứng dụng và chọn **Hello World**.

![](./hello-world-explorer.png)

Tại đây, bạn sẽ thấy một số phương thức JSON-RPC mà Hardhat/Ethers đã thực hiện ngầm cho chúng ta khi chúng ta gọi hàm `.deploy()`. Hai phương thức quan trọng ở đây là [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), là yêu cầu ghi hợp đồng của chúng ta lên chuỗi Goerli, và [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash), là yêu cầu đọc thông tin về giao dịch của chúng ta dựa trên hàm băm. Để tìm hiểu thêm về việc gửi các giao dịch, hãy xem [hướng dẫn của chúng tôi về cách gửi các giao dịch bằng Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Phần 2: Tương tác với Hợp đồng thông minh của bạn {#part-2-interact-with-your-smart-contract}

Bây giờ chúng ta đã triển khai thành công một hợp đồng thông minh lên mạng lưới Goerli, hãy cùng tìm hiểu cách tương tác với nó.

### Tạo tệp interact.js {#create-a-interactjs-file}

Đây là tệp mà chúng ta sẽ viết tập lệnh tương tác của mình. Chúng ta sẽ sử dụng thư viện Ethers.js mà bạn đã cài đặt trước đó trong Phần 1.

Bên trong thư mục `scripts/`, hãy tạo một tệp mới có tên `interact.js` và thêm đoạn mã sau:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Cập nhật tệp .env của bạn {#update-your-env-file}

Chúng ta sẽ sử dụng các biến môi trường mới, vì vậy chúng ta cần định nghĩa chúng trong tệp `.env` mà [chúng ta đã tạo trước đó](#step-11-connect-metamask-alchemy-to-your-project).

Chúng ta sẽ cần thêm định nghĩa cho `API_KEY` Alchemy của chúng ta và `CONTRACT_ADDRESS` nơi hợp đồng thông minh của bạn đã được triển khai.

Tệp `.env` của bạn sẽ trông giống như thế này:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Lấy ABI hợp đồng của bạn {#grab-your-contract-abi}

[ABI (Giao diện nhị phân ứng dụng)](/glossary/#abi) hợp đồng của chúng ta là giao diện để tương tác với hợp đồng thông minh. Hardhat tự động tạo một ABI và lưu nó trong `HelloWorld.json`. Để sử dụng ABI, chúng ta sẽ cần phân tích cú pháp nội dung bằng cách thêm các dòng mã sau vào tệp `interact.js` của chúng ta:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Nếu bạn muốn xem ABI, bạn có thể in nó ra bảng điều khiển (console) của mình:

```javascript
console.log(JSON.stringify(contract.abi))
```

Để xem ABI của bạn được in ra bảng điều khiển, hãy điều hướng đến terminal của bạn và chạy:

```bash
npx hardhat run scripts/interact.js
```

### Tạo một phiên bản (instance) cho hợp đồng của bạn {#create-an-instance-of-your-contract}

Để tương tác với hợp đồng của chúng ta, chúng ta cần tạo một phiên bản hợp đồng trong mã của mình. Để làm như vậy với Ethers.js, chúng ta sẽ cần làm việc với ba khái niệm:

1. Provider (Nhà cung cấp) - một nhà cung cấp nút cung cấp cho bạn quyền truy cập đọc và ghi vào Chuỗi khối
2. Người ký (Người ký) - đại diện cho một tài khoản Ethereum có thể ký các giao dịch
3. Contract (Hợp đồng) - một đối tượng Ethers.js đại diện cho một hợp đồng cụ thể được triển khai trên chuỗi (onchain)

Chúng ta sẽ sử dụng ABI hợp đồng từ bước trước để tạo phiên bản hợp đồng của mình:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Tìm hiểu thêm về Provider, Signer và Contract trong [tài liệu ethers.js](https://docs.ethers.io/v5/).

### Đọc thông điệp khởi tạo (init message) {#read-the-init-message}

Bạn có nhớ khi chúng ta triển khai hợp đồng của mình với `initMessage = "Hello world!"` không? Bây giờ chúng ta sẽ đọc thông điệp đó được lưu trữ trong hợp đồng thông minh của chúng ta và in nó ra bảng điều khiển.

Trong JavaScript, các hàm bất đồng bộ (asynchronous functions) được sử dụng khi tương tác với các mạng lưới. Để tìm hiểu thêm về các hàm bất đồng bộ, [hãy đọc bài viết này trên Medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Sử dụng đoạn mã bên dưới để gọi hàm `message` trong hợp đồng thông minh của chúng ta và đọc thông điệp khởi tạo:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

Sau khi chạy tệp bằng `npx hardhat run scripts/interact.js` trong terminal, chúng ta sẽ thấy phản hồi này:

```
Thông điệp là: Hello world!
```

Chúc mừng! Bạn vừa đọc thành công dữ liệu hợp đồng thông minh từ Chuỗi khối Ethereum, làm tốt lắm!

### Cập nhật thông điệp {#update-the-message}

Thay vì chỉ đọc thông điệp, chúng ta cũng có thể cập nhật thông điệp được lưu trong hợp đồng thông minh của mình bằng cách sử dụng hàm `update`! Khá tuyệt phải không?

Để cập nhật thông điệp, chúng ta có thể gọi trực tiếp hàm `update` trên đối tượng Contract đã được khởi tạo của mình:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

Lưu ý rằng ở dòng 11, chúng ta thực hiện lệnh gọi `.wait()` trên đối tượng giao dịch được trả về. Điều này đảm bảo rằng tập lệnh của chúng ta sẽ đợi giao dịch được khai thác trên Chuỗi khối trước khi thoát khỏi hàm. Nếu không bao gồm lệnh gọi `.wait()`, tập lệnh có thể không thấy giá trị `message` đã được cập nhật trong hợp đồng.

### Đọc thông điệp mới {#read-the-new-message}

Bạn có thể lặp lại [bước trước](#read-the-init-message) để đọc giá trị `message` đã cập nhật. Hãy dành một chút thời gian và xem liệu bạn có thể thực hiện các thay đổi cần thiết để in ra giá trị mới đó không!

Nếu bạn cần một gợi ý, đây là những gì tệp `interact.js` của bạn sẽ trông giống như ở thời điểm này:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - bạn
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// phiên bản hợp đồng
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

Bây giờ chỉ cần chạy tập lệnh và bạn sẽ có thể thấy thông điệp cũ, trạng thái cập nhật và thông điệp mới được in ra terminal của bạn!

`npx hardhat run scripts/interact.js --network goerli`

```
Thông điệp là: Hello World!
Đang cập nhật thông điệp...
Thông điệp mới là: This is the new message.
```

Trong khi chạy tập lệnh đó, bạn có thể nhận thấy rằng bước `Updating the message...` mất một lúc để tải trước khi thông điệp mới được tải. Đó là do quá trình khai thác; nếu bạn tò mò về việc theo dõi các giao dịch trong khi chúng đang được khai thác, hãy truy cập [mempool của Alchemy](https://dashboard.alchemy.com/mempool) để xem trạng thái của một giao dịch. Nếu giao dịch bị hủy, việc kiểm tra [Goerli Etherscan](https://goerli.etherscan.io) và tìm kiếm hàm băm giao dịch (transaction hash) của bạn cũng rất hữu ích.

## Phần 3: Xuất bản Hợp đồng thông minh của bạn lên Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Bạn đã làm tất cả những công việc khó khăn để đưa hợp đồng thông minh của mình vào hoạt động; bây giờ là lúc chia sẻ nó với thế giới!

Bằng cách xác minh hợp đồng thông minh của bạn trên Etherscan, bất kỳ ai cũng có thể xem mã nguồn và tương tác với hợp đồng thông minh của bạn. Hãy bắt đầu nào!

### Bước 1: Tạo Khóa API trên tài khoản Etherscan của bạn {#step-1-generate-an-api-key-on-your-etherscan-account}

Khóa API Etherscan là cần thiết để xác minh rằng bạn sở hữu hợp đồng thông minh mà bạn đang cố gắng xuất bản.

Nếu bạn chưa có tài khoản Etherscan, [hãy đăng ký một tài khoản](https://etherscan.io/register).

Sau khi đăng nhập, hãy tìm tên người dùng của bạn trên thanh điều hướng, di chuột qua nó và chọn nút **My profile**.

Trên trang hồ sơ của bạn, bạn sẽ thấy một thanh điều hướng bên. Từ thanh điều hướng bên, chọn **API Keys**. Tiếp theo, nhấn nút "Add" để tạo khóa API mới, đặt tên cho ứng dụng của bạn là **hello-world** và nhấn nút **Create New API Key**.

Khóa API mới của bạn sẽ xuất hiện trong bảng khóa API. Sao chép khóa API vào khay nhớ tạm của bạn.

Tiếp theo, chúng ta cần thêm khóa API Etherscan vào tệp `.env` của mình.

Sau khi thêm, tệp `.env` của bạn sẽ trông như thế này:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Các hợp đồng thông minh được triển khai bằng Hardhat {#hardhat-deployed-smart-contracts}

#### Cài đặt hardhat-etherscan {#install-hardhat-etherscan}

Việc xuất bản hợp đồng của bạn lên Etherscan bằng Hardhat rất đơn giản. Trước tiên, bạn sẽ cần cài đặt plugin `hardhat-etherscan` để bắt đầu. `hardhat-etherscan` sẽ tự động xác minh mã nguồn và ABI của hợp đồng thông minh trên Etherscan. Để thêm plugin này, trong thư mục `hello-world`, hãy chạy:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Sau khi cài đặt, hãy bao gồm câu lệnh sau ở đầu `hardhat.config.js` của bạn và thêm các tùy chọn cấu hình Etherscan:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Khóa API của bạn cho Etherscan
    // Nhận một khóa tại https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Xác minh hợp đồng thông minh của bạn trên Etherscan {#verify-your-smart-contract-on-etherscan}

Đảm bảo tất cả các tệp đã được lưu và tất cả các biến `.env` được cấu hình chính xác.

Chạy tác vụ `verify`, truyền vào địa chỉ hợp đồng và mạng lưới nơi nó được triển khai:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Đảm bảo rằng `DEPLOYED_CONTRACT_ADDRESS` là địa chỉ của hợp đồng thông minh đã triển khai của bạn trên mạng thử nghiệm Goerli. Ngoài ra, đối số cuối cùng (`'Hello World!'`) phải là cùng một giá trị chuỗi được sử dụng [trong bước triển khai ở phần 1](#step-15-write-our-deploy-script).

Nếu mọi việc suôn sẻ, bạn sẽ thấy thông điệp sau trong terminal của mình:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Chúc mừng! Mã hợp đồng thông minh của bạn đã có trên Etherscan!

### Kiểm tra hợp đồng thông minh của bạn trên Etherscan! {#check-out-your-smart-contract-on-etherscan}

Khi bạn điều hướng đến liên kết được cung cấp trong terminal của mình, bạn sẽ có thể thấy mã hợp đồng thông minh và ABI của mình được xuất bản trên Etherscan!

**Tuyệt vời - bạn đã làm được rồi nhà vô địch! Bây giờ bất kỳ ai cũng có thể gọi hoặc ghi vào hợp đồng thông minh của bạn! Chúng tôi rất nóng lòng muốn xem bạn sẽ xây dựng gì tiếp theo!**

## Phần 4 - Tích hợp hợp đồng thông minh của bạn với frontend {#part-4-integrating-your-smart-contract-with-the-frontend}

Đến cuối hướng dẫn này, bạn sẽ biết cách:

- Kết nối ví MetaMask với ứng dụng phi tập trung (dapp) của bạn
- Đọc dữ liệu từ hợp đồng thông minh của bạn bằng API [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Ký các giao dịch Ethereum bằng MetaMask

Đối với dapp này, chúng ta sẽ sử dụng [React](https://react.dev/) làm framework frontend; tuy nhiên, điều quan trọng cần lưu ý là chúng ta sẽ không dành nhiều thời gian để phân tích các nguyên tắc cơ bản của nó, vì chúng ta sẽ chủ yếu tập trung vào việc đưa chức năng Web3 vào dự án của mình.

Như một điều kiện tiên quyết, bạn nên có hiểu biết ở mức độ người mới bắt đầu về React. Nếu không, chúng tôi khuyên bạn nên hoàn thành [hướng dẫn Giới thiệu về React](https://react.dev/learn) chính thức.

### Sao chép các tệp khởi đầu {#clone-the-starter-files}

Đầu tiên, hãy truy cập [kho lưu trữ GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) để lấy các tệp khởi đầu cho dự án này và sao chép (clone) kho lưu trữ này về máy tính cục bộ của bạn.

Mở kho lưu trữ đã sao chép trên máy cục bộ. Lưu ý rằng nó chứa hai thư mục: `starter-files` và `completed`.

- `starter-files`- **chúng ta sẽ làm việc trong thư mục này**, chúng ta sẽ kết nối giao diện người dùng (UI) với ví Ethereum của bạn và hợp đồng thông minh mà chúng ta đã xuất bản lên Etherscan trong [Phần 3](#part-3-publish-your-smart-contract-to-etherscan).
- `completed` chứa toàn bộ hướng dẫn đã hoàn thành và chỉ nên được sử dụng làm tài liệu tham khảo nếu bạn gặp khó khăn.

Tiếp theo, mở bản sao `starter-files` của bạn trong trình soạn thảo mã yêu thích của bạn, sau đó điều hướng vào thư mục `src`.

Tất cả mã chúng ta sẽ viết sẽ nằm trong thư mục `src`. Chúng ta sẽ chỉnh sửa thành phần `HelloWorld.js` và các tệp JavaScript `util/interact.js` để cung cấp chức năng Web3 cho dự án của chúng ta.

### Kiểm tra các tệp khởi đầu {#check-out-the-starter-files}

Trước khi bắt đầu viết mã, hãy khám phá những gì được cung cấp cho chúng ta trong các tệp khởi đầu.

#### Chạy dự án react của bạn {#get-your-react-project-running}

Hãy bắt đầu bằng cách chạy dự án React trong trình duyệt của chúng ta. Vẻ đẹp của React là một khi chúng ta có dự án đang chạy trong trình duyệt, bất kỳ thay đổi nào chúng ta lưu sẽ được cập nhật trực tiếp trong trình duyệt.

Để chạy dự án, hãy điều hướng đến thư mục gốc của thư mục `starter-files` và chạy `npm install` trong terminal của bạn để cài đặt các phần phụ thuộc của dự án:

```bash
cd starter-files
npm install
```

Sau khi cài đặt xong, hãy chạy `npm start` trong terminal của bạn:

```bash
npm start
```

Làm như vậy sẽ mở [http://localhost:3000/](http://localhost:3000/) trong trình duyệt của bạn, nơi bạn sẽ thấy frontend cho dự án của chúng ta. Nó sẽ bao gồm một trường \(nơi để cập nhật thông điệp được lưu trữ trong hợp đồng thông minh của bạn\), một nút "Connect Wallet" (Kết nối Ví) và một nút "Update" (Cập nhật).

Nếu bạn thử nhấp vào một trong hai nút, bạn sẽ nhận thấy rằng chúng không hoạt động—đó là vì chúng ta vẫn cần lập trình chức năng cho chúng.

#### Thành phần `HelloWorld.js` {#the-helloworld-js-component}

Hãy quay lại thư mục `src` trong trình soạn thảo của chúng ta và mở tệp `HelloWorld.js`. Việc chúng ta hiểu mọi thứ trong tệp này là cực kỳ quan trọng, vì đây là thành phần React chính mà chúng ta sẽ làm việc.

Ở đầu tệp này, bạn sẽ nhận thấy chúng ta có một số câu lệnh import cần thiết để chạy dự án, bao gồm thư viện React, các hook useEffect và useState, một số mục từ `./util/interact.js` (chúng ta sẽ mô tả chi tiết hơn về chúng ngay sau đây!) và logo Alchemy.

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

Tiếp theo, chúng ta có các biến trạng thái mà chúng ta sẽ cập nhật sau các sự kiện cụ thể.

```javascript
// HelloWorld.js

//Các biến trạng thái
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

Dưới đây là ý nghĩa của từng biến:

- `walletAddress` - một chuỗi lưu trữ địa chỉ ví của người dùng
- `status`- một chuỗi lưu trữ một thông điệp hữu ích hướng dẫn người dùng cách tương tác với dapp
- `message` - một chuỗi lưu trữ thông điệp hiện tại trong hợp đồng thông minh
- `newMessage` - một chuỗi lưu trữ thông điệp mới sẽ được ghi vào hợp đồng thông minh

Sau các biến trạng thái, bạn sẽ thấy năm hàm chưa được triển khai: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed` và `onUpdatePressed`. Chúng tôi sẽ giải thích chức năng của chúng dưới đây:

```javascript
// HelloWorld.js

//chỉ được gọi một lần
useEffect(async () => {
  //TODO: thực hiện
}, [])

function addSmartContractListener() {
  //TODO: thực hiện
}

function addWalletListener() {
  //TODO: thực hiện
}

const connectWalletPressed = async () => {
  //TODO: thực hiện
}

const onUpdatePressed = async () => {
  //TODO: thực hiện
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- đây là một React hook được gọi sau khi thành phần của bạn được hiển thị (render). Bởi vì nó có một mảng rỗng `[]` được truyền vào \(xem dòng 4\), nó sẽ chỉ được gọi trong lần hiển thị _đầu tiên_ của thành phần. Tại đây, chúng ta sẽ tải thông điệp hiện tại được lưu trữ trong hợp đồng thông minh của mình, gọi các trình lắng nghe (listener) hợp đồng thông minh và ví, đồng thời cập nhật UI để phản ánh xem ví đã được kết nối hay chưa.
- `addSmartContractListener`- hàm này thiết lập một trình lắng nghe sẽ theo dõi sự kiện `UpdatedMessages` của hợp đồng HelloWorld và cập nhật UI của chúng ta khi thông điệp bị thay đổi trong hợp đồng thông minh.
- `addWalletListener`- hàm này thiết lập một trình lắng nghe phát hiện các thay đổi trong trạng thái ví MetaMask của người dùng, chẳng hạn như khi người dùng ngắt kết nối ví của họ hoặc chuyển đổi địa chỉ.
- `connectWalletPressed`- hàm này sẽ được gọi để kết nối ví MetaMask của người dùng với dapp của chúng ta.
- `onUpdatePressed` - hàm này sẽ được gọi khi người dùng muốn cập nhật thông điệp được lưu trữ trong hợp đồng thông minh.

Gần cuối tệp này, chúng ta có UI của thành phần.

```javascript
// HelloWorld.js

//UI của thành phần của chúng ta
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

Nếu bạn xem xét kỹ đoạn mã này, bạn sẽ nhận thấy nơi chúng ta sử dụng các biến trạng thái khác nhau trong UI của mình:

- Ở các dòng 6-12, nếu ví của người dùng được kết nối \(tức là `walletAddress.length > 0`\), chúng ta hiển thị một phiên bản rút gọn của `walletAddress` người dùng trong nút có ID "walletButton;" nếu không, nó chỉ hiển thị "Connect Wallet".
- Ở dòng 17, chúng ta hiển thị thông điệp hiện tại được lưu trữ trong hợp đồng thông minh, được ghi lại trong chuỗi `message`.
- Ở các dòng 23-26, chúng ta sử dụng một [thành phần được kiểm soát (controlled component)](https://legacy.reactjs.org/docs/forms.html#controlled-components) để cập nhật biến trạng thái `newMessage` khi đầu vào trong trường văn bản thay đổi.

Ngoài các biến trạng thái, bạn cũng sẽ thấy rằng các hàm `connectWalletPressed` và `onUpdatePressed` được gọi khi các nút có ID `publishButton` và `walletButton` được nhấp tương ứng.

Cuối cùng, hãy giải quyết xem thành phần `HelloWorld.js` này được thêm vào đâu.

Nếu bạn đi tới tệp `App.js`, đây là thành phần chính trong React hoạt động như một vùng chứa cho tất cả các thành phần khác, bạn sẽ thấy rằng thành phần `HelloWorld.js` của chúng ta được chèn vào ở dòng 7.

Cuối cùng nhưng không kém phần quan trọng, hãy kiểm tra thêm một tệp được cung cấp cho bạn, tệp `interact.js`.

#### Tệp `interact.js` {#the-interact-js-file}

Bởi vì chúng ta muốn tuân theo mô hình [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), chúng ta sẽ muốn có một tệp riêng biệt chứa tất cả các hàm để quản lý logic, dữ liệu và quy tắc của dapp, sau đó có thể xuất (export) các hàm đó sang frontend của chúng ta \(thành phần `HelloWorld.js`\).

👆🏽Đây chính xác là mục đích của tệp `interact.js` của chúng ta!

Điều hướng đến thư mục `util` trong thư mục `src` của bạn và bạn sẽ nhận thấy chúng tôi đã bao gồm một tệp có tên `interact.js` sẽ chứa tất cả các hàm và biến tương tác với hợp đồng thông minh và ví của chúng ta.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Bạn sẽ nhận thấy ở đầu tệp rằng chúng ta đã chú thích (comment out) đối tượng `helloWorldContract`. Ở phần sau của hướng dẫn này, chúng ta sẽ bỏ chú thích đối tượng này và khởi tạo hợp đồng thông minh của mình trong biến này, sau đó chúng ta sẽ xuất nó vào thành phần `HelloWorld.js`.

Bốn hàm chưa được triển khai sau đối tượng `helloWorldContract` của chúng ta thực hiện những việc sau:

- `loadCurrentMessage` - hàm này xử lý logic tải thông điệp hiện tại được lưu trữ trong hợp đồng thông minh. Nó sẽ thực hiện một lệnh gọi _đọc_ tới hợp đồng thông minh Hello World bằng cách sử dụng [API Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - hàm này sẽ kết nối MetaMask của người dùng với dapp của chúng ta.
- `getCurrentWalletConnected` - hàm này sẽ kiểm tra xem một tài khoản Ethereum đã được kết nối với dapp của chúng ta khi tải trang hay chưa và cập nhật UI cho phù hợp.
- `updateMessage` - hàm này sẽ cập nhật thông điệp được lưu trữ trong hợp đồng thông minh. Nó sẽ thực hiện một lệnh gọi _ghi_ tới hợp đồng thông minh Hello World, vì vậy ví MetaMask của người dùng sẽ phải ký một giao dịch Ethereum để cập nhật thông điệp.

Bây giờ chúng ta đã hiểu những gì mình đang làm việc, hãy tìm hiểu cách đọc từ hợp đồng thông minh của chúng ta!

### Bước 3: Đọc từ hợp đồng thông minh của bạn {#step-3-read-from-your-smart-contract}

Để đọc từ hợp đồng thông minh của bạn, bạn sẽ cần thiết lập thành công:

- Một kết nối API tới chuỗi Ethereum
- Một phiên bản (instance) đã tải của hợp đồng thông minh của bạn
- Một hàm để gọi tới hàm hợp đồng thông minh của bạn
- Một trình lắng nghe để theo dõi các bản cập nhật khi dữ liệu bạn đang đọc từ hợp đồng thông minh thay đổi

Điều này nghe có vẻ như rất nhiều bước, nhưng đừng lo lắng! Chúng tôi sẽ hướng dẫn bạn cách thực hiện từng bước một! :\)

#### Thiết lập kết nối API với chuỗi Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Bạn có nhớ trong Phần 2 của hướng dẫn này, chúng ta đã sử dụng khóa Alchemy Web3 của mình để đọc từ hợp đồng thông minh không? Bạn cũng sẽ cần một khóa Alchemy Web3 trong ứng dụng phi tập trung (dapp) của mình để đọc từ chuỗi.

Nếu bạn chưa có, trước tiên hãy cài đặt [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) bằng cách điều hướng đến thư mục gốc của `starter-files` và chạy lệnh sau trong terminal của bạn:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) là một trình bao bọc (wrapper) xung quanh [Web3.js](https://docs.web3js.org/), cung cấp các phương thức API nâng cao và các lợi ích quan trọng khác để giúp cuộc sống của bạn với tư cách là một nhà phát triển Web3 trở nên dễ dàng hơn. Nó được thiết kế để yêu cầu cấu hình tối thiểu để bạn có thể bắt đầu sử dụng nó trong ứng dụng của mình ngay lập tức!

Sau đó, cài đặt gói [dotenv](https://www.npmjs.com/package/dotenv) trong thư mục dự án của bạn, để chúng ta có một nơi an toàn để lưu trữ khóa API của mình sau khi lấy nó.

```text
npm install dotenv --save
```

Đối với dapp của chúng ta, **chúng ta sẽ sử dụng khóa API Websockets** thay vì khóa API HTTP, vì nó sẽ cho phép chúng ta thiết lập một trình lắng nghe (listener) phát hiện khi thông điệp được lưu trữ trong hợp đồng thông minh thay đổi.

Khi bạn đã có khóa API của mình, hãy tạo một tệp `.env` trong thư mục gốc của bạn và thêm URL Alchemy Websockets của bạn vào đó. Sau đó, tệp `.env` của bạn sẽ trông giống như thế này:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Bây giờ, chúng ta đã sẵn sàng thiết lập điểm cuối (endpoint) Alchemy Web3 trong dapp của mình! Hãy quay lại tệp `interact.js` của chúng ta, tệp này nằm trong thư mục `util` và thêm đoạn mã sau vào đầu tệp:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Ở trên, trước tiên chúng ta đã nhập khóa Alchemy từ tệp `.env` của mình và sau đó truyền `alchemyKey` của chúng ta cho `createAlchemyWeb3` để thiết lập điểm cuối Alchemy Web3 của chúng ta.

Với điểm cuối này đã sẵn sàng, đã đến lúc tải hợp đồng thông minh của chúng ta!
#### Tải hợp đồng thông minh Hello World của bạn {#loading-your-hello-world-smart-contract}

Để tải hợp đồng thông minh Hello World của bạn, bạn sẽ cần địa chỉ hợp đồng và ABI của nó, cả hai đều có thể được tìm thấy trên Etherscan nếu bạn đã hoàn thành [Phần 3 của hướng dẫn này.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Cách lấy ABI hợp đồng của bạn từ Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Nếu bạn đã bỏ qua Phần 3 của hướng dẫn này, bạn có thể sử dụng hợp đồng HelloWorld với địa chỉ [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). ABI của nó có thể được tìm thấy [tại đây](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

ABI hợp đồng là cần thiết để chỉ định hàm nào mà hợp đồng sẽ gọi cũng như đảm bảo rằng hàm sẽ trả về dữ liệu theo định dạng bạn mong đợi. Khi chúng ta đã sao chép ABI hợp đồng của mình, hãy lưu nó dưới dạng tệp JSON có tên `contract-abi.json` trong thư mục `src` của bạn.

Tệp contract-abi.json của bạn nên được lưu trữ trong thư mục src.

Được trang bị địa chỉ hợp đồng, ABI và điểm cuối Alchemy Web3, chúng ta có thể sử dụng [phương thức hợp đồng](https://docs.web3js.org/api/web3-eth-contract/class/Contract) để tải một phiên bản của hợp đồng thông minh. Nhập ABI hợp đồng của bạn vào tệp `interact.js` và thêm địa chỉ hợp đồng của bạn.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Bây giờ cuối cùng chúng ta có thể bỏ chú thích biến `helloWorldContract` của mình và tải hợp đồng thông minh bằng điểm cuối AlchemyWeb3 của chúng ta:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Tóm lại, 12 dòng đầu tiên của `interact.js` của bạn bây giờ sẽ trông như thế này:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Bây giờ chúng ta đã tải xong hợp đồng của mình, chúng ta có thể triển khai hàm `loadCurrentMessage`!

#### Triển khai `loadCurrentMessage` trong tệp `interact.js` của bạn {#implementing-loadcurrentmessage-in-your-interact-js-file}

Hàm này cực kỳ đơn giản. Chúng ta sẽ thực hiện một lệnh gọi web3 bất đồng bộ (async) đơn giản để đọc từ hợp đồng của mình. Hàm của chúng ta sẽ trả về thông điệp được lưu trữ trong hợp đồng thông minh:

Cập nhật `loadCurrentMessage` trong tệp `interact.js` của bạn thành như sau:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Vì chúng ta muốn hiển thị hợp đồng thông minh này trong UI của mình, hãy cập nhật hàm `useEffect` trong thành phần `HelloWorld.js` của chúng ta thành như sau:

```javascript
// HelloWorld.js

//chỉ được gọi một lần
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Lưu ý, chúng ta chỉ muốn `loadCurrentMessage` của mình được gọi một lần trong lần hiển thị đầu tiên của thành phần. Chúng ta sẽ sớm triển khai `addSmartContractListener` để tự động cập nhật UI sau khi thông điệp trong hợp đồng thông minh thay đổi.

Trước khi đi sâu vào trình lắng nghe của chúng ta, hãy kiểm tra những gì chúng ta có cho đến nay! Lưu các tệp `HelloWorld.js` và `interact.js` của bạn, sau đó truy cập [http://localhost:3000/](http://localhost:3000/)

Bạn sẽ nhận thấy rằng thông điệp hiện tại không còn hiển thị "No connection to the network" (Không có kết nối với mạng lưới). Thay vào đó, nó phản ánh thông điệp được lưu trữ trong hợp đồng thông minh. Thật tuyệt vời!

#### UI của bạn bây giờ sẽ phản ánh thông điệp được lưu trữ trong hợp đồng thông minh {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

Bây giờ nói về trình lắng nghe đó...

#### Triển khai `addSmartContractListener` {#implement-addsmartcontractlistener}

Nếu bạn nhớ lại tệp `HelloWorld.sol` mà chúng ta đã viết trong [Phần 1 của loạt bài hướng dẫn này](#step-10-write-our-contract), bạn sẽ nhớ lại rằng có một sự kiện hợp đồng thông minh được gọi là `UpdatedMessages` được phát ra sau khi hàm `update` của hợp đồng thông minh của chúng ta được gọi \(xem dòng 9 và 27\):

```javascript
// HelloWorld.sol

// Chỉ định phiên bản của Solidity, sử dụng lập phiên bản theo ngữ nghĩa.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Định nghĩa một hợp đồng có tên là `HelloWorld`.
// Một hợp đồng là một tập hợp các hàm và dữ liệu (trạng thái của nó). Sau khi được triển khai, một hợp đồng nằm tại một Địa chỉ cụ thể trên Chuỗi khối Ethereum. Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Được phát ra khi hàm update được gọi
   //Các sự kiện của hợp đồng thông minh là một cách để hợp đồng của bạn giao tiếp rằng có điều gì đó đã xảy ra trên Chuỗi khối với front-end của ứng dụng của bạn, front-end này có thể đang 'lắng nghe' các sự kiện nhất định và thực hiện hành động khi chúng xảy ra.
   event UpdatedMessages(string oldStr, string newStr);

   // Khai báo một biến trạng thái `message` có kiểu `string`.
   // Các biến trạng thái là các biến mà giá trị của chúng được lưu trữ vĩnh viễn trong bộ nhớ của hợp đồng. Từ khóa `public` làm cho các biến có thể truy cập được từ bên ngoài một hợp đồng và tạo ra một hàm mà các hợp đồng hoặc máy khách khác có thể gọi để truy cập giá trị.
   string public message;

   // Tương tự như nhiều ngôn ngữ hướng đối tượng dựa trên lớp, constructor (hàm khởi tạo) là một hàm đặc biệt chỉ được thực thi khi tạo hợp đồng.
   // Các constructor được sử dụng để khởi tạo dữ liệu của hợp đồng. Tìm hiểu thêm:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Chấp nhận một đối số chuỗi `initMessage` và thiết lập giá trị vào biến lưu trữ `message` của hợp đồng).
      message = initMessage;
   }

   // Một hàm public chấp nhận một đối số chuỗi và cập nhật biến lưu trữ `message`.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

Các sự kiện hợp đồng thông minh là một cách để hợp đồng của bạn thông báo rằng có điều gì đó đã xảy ra \(tức là có một _sự kiện_\) trên chuỗi khối cho ứng dụng front-end của bạn, ứng dụng này có thể 'lắng nghe' các sự kiện cụ thể và thực hiện hành động khi chúng xảy ra.

Hàm `addSmartContractListener` sẽ đặc biệt lắng nghe sự kiện `UpdatedMessages` của hợp đồng thông minh Hello World của chúng ta và cập nhật UI của chúng ta để hiển thị thông điệp mới.

Sửa đổi `addSmartContractListener` thành như sau:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Hãy phân tích những gì xảy ra khi trình lắng nghe phát hiện một sự kiện:

- Nếu có lỗi xảy ra khi sự kiện được phát ra, nó sẽ được phản ánh trong UI thông qua biến trạng thái `status` của chúng ta.
- Nếu không, chúng ta sẽ sử dụng đối tượng `data` được trả về. `data.returnValues` là một mảng được lập chỉ mục tại 0, trong đó phần tử đầu tiên trong mảng lưu trữ thông điệp trước đó và phần tử thứ hai lưu trữ thông điệp đã cập nhật. Tóm lại, khi có một sự kiện thành công, chúng ta sẽ đặt chuỗi `message` của mình thành thông điệp đã cập nhật, xóa chuỗi `newMessage` và cập nhật biến trạng thái `status` của chúng ta để phản ánh rằng một thông điệp mới đã được xuất bản trên hợp đồng thông minh của chúng ta.

Cuối cùng, hãy gọi trình lắng nghe của chúng ta trong hàm `useEffect` để nó được khởi tạo trong lần hiển thị đầu tiên của thành phần `HelloWorld.js`. Tóm lại, hàm `useEffect` của bạn sẽ trông như thế này:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Bây giờ chúng ta đã có thể đọc từ hợp đồng thông minh của mình, sẽ thật tuyệt nếu tìm ra cách ghi vào nó! Tuy nhiên, để ghi vào dapp của chúng ta, trước tiên chúng ta phải có một ví Ethereum được kết nối với nó.

Vì vậy, tiếp theo chúng ta sẽ giải quyết việc thiết lập ví Ethereum của mình \(MetaMask\) và sau đó kết nối nó với dapp của chúng ta!

### Bước 4: Thiết lập ví Ethereum của bạn {#step-4-set-up-your-ethereum-wallet}

Để ghi bất cứ thứ gì vào chuỗi Ethereum, người dùng phải ký các giao dịch bằng khóa riêng tư của ví ảo của họ. Đối với hướng dẫn này, chúng ta sẽ sử dụng [MetaMask](https://metamask.io/), một ví ảo trong trình duyệt được sử dụng để quản lý địa chỉ tài khoản Ethereum của bạn, vì nó giúp việc ký giao dịch này trở nên cực kỳ dễ dàng đối với người dùng cuối.

Nếu bạn muốn hiểu thêm về cách các giao dịch trên Ethereum hoạt động, hãy xem [trang này](/developers/docs/transactions/) từ Ethereum Foundation.

#### Tải xuống MetaMask {#download-metamask}

Bạn có thể tải xuống và tạo tài khoản MetaMask miễn phí [tại đây](https://metamask.io/download). Khi bạn đang tạo tài khoản hoặc nếu bạn đã có tài khoản, hãy đảm bảo chuyển sang “Goerli Test Network” ở phía trên bên phải \(để chúng ta không giao dịch bằng tiền thật\).

#### Thêm ether từ một vòi {#add-ether-from-a-faucet}

Để ký một giao dịch trên chuỗi khối Ethereum, chúng ta sẽ cần một số ETH giả. Để nhận ETH, bạn có thể truy cập [FaucETH](https://fauceth.komputing.org) và nhập địa chỉ tài khoản Goerli của bạn, nhấp vào “Request funds” (Yêu cầu tiền), sau đó chọn “Ethereum Testnet Goerli” trong menu thả xuống và cuối cùng nhấp lại vào nút “Request funds”. Bạn sẽ thấy ETH trong tài khoản MetaMask của mình ngay sau đó!

#### Kiểm tra số dư của bạn {#check-your-balance}

Để kiểm tra lại xem số dư của chúng ta đã có ở đó chưa, hãy tạo một yêu cầu [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) bằng cách sử dụng [công cụ sandbox của Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Thao tác này sẽ trả về số lượng ETH trong ví của chúng ta. Sau khi bạn nhập địa chỉ tài khoản MetaMask của mình và nhấp vào “Send Request”, bạn sẽ thấy một phản hồi giống như thế này:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**LƯU Ý:** Kết quả này tính bằng wei chứ không phải ETH. Wei được sử dụng làm mệnh giá nhỏ nhất của ether. Tỷ lệ chuyển đổi từ wei sang ETH là: 1 ETH = 10¹⁸ wei. Vì vậy, nếu chúng ta chuyển đổi 0xde0b6b3a7640000 sang hệ thập phân, chúng ta sẽ nhận được 1\*10¹⁸, tương đương với 1 ETH.

Phù! Tiền giả của chúng ta đều ở đó! 🤑
### Bước 5: Kết nối MetaMask với UI của bạn {#step-5-connect-metamask-to-your-ui}

Bây giờ ví MetaMask của chúng ta đã được thiết lập, hãy kết nối dapp của chúng ta với nó!

#### Hàm `connectWallet` {#the-connectwallet-function}

Trong tệp `interact.js` của chúng ta, hãy triển khai hàm `connectWallet`, sau đó chúng ta có thể gọi hàm này trong thành phần `HelloWorld.js` của mình.

Hãy sửa đổi `connectWallet` thành như sau:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Vậy chính xác thì khối mã khổng lồ này làm gì?

Chà, đầu tiên, nó kiểm tra xem `window.ethereum` có được bật trong trình duyệt của bạn hay không.

`window.ethereum` là một API toàn cục được MetaMask và các nhà cung cấp ví khác chèn vào, cho phép các trang web yêu cầu tài khoản Ethereum của người dùng. Nếu được chấp thuận, nó có thể đọc dữ liệu từ các chuỗi khối mà người dùng được kết nối và đề xuất người dùng ký các thông điệp và giao dịch. Hãy xem [tài liệu MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) để biết thêm thông tin!

Nếu `window.ethereum` _không_ hiện diện, thì điều đó có nghĩa là MetaMask chưa được cài đặt. Điều này dẫn đến một đối tượng JSON được trả về, trong đó `address` được trả về là một chuỗi rỗng và đối tượng JSX `status` chuyển tiếp thông báo rằng người dùng phải cài đặt MetaMask.

Bây giờ nếu `window.ethereum` _có_ hiện diện, thì đó là lúc mọi thứ trở nên thú vị.

Sử dụng vòng lặp try/catch, chúng ta sẽ cố gắng kết nối với MetaMask bằng cách gọi [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Việc gọi hàm này sẽ mở MetaMask trong trình duyệt, theo đó người dùng sẽ được nhắc kết nối ví của họ với dapp của bạn.

- Nếu người dùng chọn kết nối, `method: "eth_requestAccounts"` sẽ trả về một mảng chứa tất cả các địa chỉ tài khoản của người dùng đã kết nối với dapp. Tóm lại, hàm `connectWallet` của chúng ta sẽ trả về một đối tượng JSON chứa `address` _đầu tiên_ trong mảng này \(xem dòng 9\) và một thông điệp `status` nhắc người dùng ghi một thông điệp vào hợp đồng thông minh.
- Nếu người dùng từ chối kết nối, thì đối tượng JSON sẽ chứa một chuỗi rỗng cho `address` được trả về và một thông điệp `status` phản ánh rằng người dùng đã từ chối kết nối.

Bây giờ chúng ta đã viết hàm `connectWallet` này, bước tiếp theo là gọi nó vào thành phần `HelloWorld.js` của chúng ta.

#### Thêm hàm `connectWallet` vào Thành phần UI `HelloWorld.js` của bạn {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

Điều hướng đến hàm `connectWalletPressed` trong `HelloWorld.js` và cập nhật nó thành như sau:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Bạn có nhận thấy hầu hết các chức năng của chúng ta được trừu tượng hóa khỏi thành phần `HelloWorld.js` từ tệp `interact.js` như thế nào không? Điều này là để chúng ta tuân thủ mô hình M-V-C!

Trong `connectWalletPressed`, chúng ta chỉ cần thực hiện một lệnh gọi await tới hàm `connectWallet` đã nhập của mình và sử dụng phản hồi của nó, chúng ta cập nhật các biến `status` và `walletAddress` thông qua các state hook của chúng.

Bây giờ, hãy lưu cả hai tệp \(`HelloWorld.js` và `interact.js`\) và kiểm tra UI của chúng ta cho đến nay.

Mở trình duyệt của bạn trên trang [http://localhost:3000/](http://localhost:3000/) và nhấn nút "Connect Wallet" ở trên cùng bên phải của trang.

Nếu bạn đã cài đặt MetaMask, bạn sẽ được nhắc kết nối ví với dapp của mình. Chấp nhận lời mời kết nối.

Bạn sẽ thấy rằng nút ví bây giờ phản ánh rằng địa chỉ của bạn đã được kết nối! Tuyệt vời 🔥

Tiếp theo, hãy thử làm mới trang... điều này thật kỳ lạ. Nút ví của chúng ta đang nhắc chúng ta kết nối MetaMask, mặc dù nó đã được kết nối...

Tuy nhiên, đừng sợ! Chúng ta có thể dễ dàng giải quyết vấn đề đó bằng cách triển khai `getCurrentWalletConnected`, hàm này sẽ kiểm tra xem một địa chỉ đã được kết nối với dapp của chúng ta hay chưa và cập nhật UI của chúng ta cho phù hợp!

#### Hàm `getCurrentWalletConnected` {#the-getcurrentwalletconnected-function}

Cập nhật hàm `getCurrentWalletConnected` của bạn trong tệp `interact.js` thành như sau:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Mã này _rất_ giống với hàm `connectWallet` mà chúng ta vừa viết ở bước trước.

Sự khác biệt chính là thay vì gọi phương thức `eth_requestAccounts`, phương thức này mở MetaMask để người dùng kết nối ví của họ, ở đây chúng ta gọi phương thức `eth_accounts`, phương thức này chỉ trả về một mảng chứa các địa chỉ MetaMask hiện đang được kết nối với dapp của chúng ta.

Để xem hàm này hoạt động, hãy gọi nó trong hàm `useEffect` của thành phần `HelloWorld.js` của chúng ta:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Lưu ý, chúng ta sử dụng phản hồi của lệnh gọi tới `getCurrentWalletConnected` để cập nhật các biến trạng thái `walletAddress` và `status` của mình.

Bây giờ bạn đã thêm mã này, hãy thử làm mới cửa sổ trình duyệt của chúng ta.

Tuyệt vời! Nút sẽ cho biết rằng bạn đã được kết nối và hiển thị bản xem trước địa chỉ ví được kết nối của bạn - ngay cả sau khi bạn làm mới!

#### Triển khai `addWalletListener` {#implement-addwalletlistener}

Bước cuối cùng trong quá trình thiết lập ví dapp của chúng ta là triển khai trình lắng nghe ví để UI của chúng ta cập nhật khi trạng thái ví của chúng ta thay đổi, chẳng hạn như khi người dùng ngắt kết nối hoặc chuyển đổi tài khoản.

Trong tệp `HelloWorld.js` của bạn, hãy sửa đổi hàm `addWalletListener` của bạn như sau:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Tôi cá là bạn thậm chí không cần sự trợ giúp của chúng tôi để hiểu những gì đang diễn ra ở đây vào lúc này, nhưng vì mục đích kỹ lưỡng, hãy nhanh chóng phân tích nó:

- Đầu tiên, hàm của chúng ta kiểm tra xem `window.ethereum` có được bật hay không \(tức là MetaMask đã được cài đặt\).
  - Nếu không, chúng ta chỉ cần đặt biến trạng thái `status` của mình thành một chuỗi JSX nhắc người dùng cài đặt MetaMask.
  - Nếu nó được bật, chúng ta thiết lập trình lắng nghe `window.ethereum.on("accountsChanged")` ở dòng 3 để lắng nghe các thay đổi trạng thái trong ví MetaMask, bao gồm khi người dùng kết nối thêm một tài khoản với dapp, chuyển đổi tài khoản hoặc ngắt kết nối tài khoản. Nếu có ít nhất một tài khoản được kết nối, biến trạng thái `walletAddress` được cập nhật thành tài khoản đầu tiên trong mảng `accounts` do trình lắng nghe trả về. Nếu không, `walletAddress` được đặt thành một chuỗi rỗng.

Cuối cùng nhưng không kém phần quan trọng, chúng ta phải gọi nó trong hàm `useEffect` của mình:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Và thế là xong! Chúng ta đã hoàn thành thành công việc lập trình tất cả các chức năng ví của mình! Bây giờ chuyển sang nhiệm vụ cuối cùng của chúng ta: cập nhật thông điệp được lưu trữ trong hợp đồng thông minh của chúng ta!

### Bước 6: Triển khai hàm `updateMessage` {#step-6-implement-the-updatemessage-function}

Được rồi mọi người, chúng ta đã đến chặng cuối cùng! Trong `updateMessage` của tệp `interact.js` của bạn, chúng ta sẽ thực hiện những việc sau:

1. Đảm bảo thông điệp chúng ta muốn xuất bản trong hợp đồng thông minh của mình là hợp lệ
2. Ký giao dịch của chúng ta bằng MetaMask
3. Gọi hàm này từ thành phần frontend `HelloWorld.js` của chúng ta

Việc này sẽ không mất nhiều thời gian; hãy hoàn thành dapp này!

#### Xử lý lỗi đầu vào {#input-error-handling}

Đương nhiên, việc có một số loại xử lý lỗi đầu vào ở đầu hàm là điều hợp lý.

Chúng ta sẽ muốn hàm của mình trả về sớm nếu không có tiện ích mở rộng MetaMask nào được cài đặt, không có ví nào được kết nối \(tức là `address` được truyền vào là một chuỗi rỗng\) hoặc `message` là một chuỗi rỗng. Hãy thêm xử lý lỗi sau vào `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

Bây giờ nó đã có xử lý lỗi đầu vào thích hợp, đã đến lúc ký giao dịch thông qua MetaMask!

#### Ký giao dịch của chúng ta {#signing-our-transaction}

Nếu bạn đã quen thuộc với các giao dịch Ethereum web3 truyền thống, mã chúng ta viết tiếp theo sẽ rất quen thuộc. Bên dưới mã xử lý lỗi đầu vào của bạn, hãy thêm phần sau vào `updateMessage`:

```javascript
// interact.js

//thiết lập các tham số giao dịch
const transactionParameters = {
  to: contractAddress, // Bắt buộc ngoại trừ trong quá trình xuất bản hợp đồng.
  from: address, // phải khớp với Địa chỉ đang hoạt động của người dùng.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//ký giao dịch
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Hãy phân tích những gì đang xảy ra. Đầu tiên, chúng ta thiết lập các tham số giao dịch của mình, trong đó:

- `to` chỉ định địa chỉ người nhận \(hợp đồng thông minh của chúng ta\)
- `from` chỉ định người ký giao dịch, biến `address` mà chúng ta đã truyền vào hàm của mình
- `data` chứa lệnh gọi tới phương thức `update` của hợp đồng thông minh Hello World của chúng ta, nhận biến chuỗi `message` của chúng ta làm đầu vào

Sau đó, chúng ta thực hiện một lệnh gọi await, `window.ethereum.request`, trong đó chúng ta yêu cầu MetaMask ký giao dịch. Lưu ý, ở các dòng 11 và 12, chúng ta đang chỉ định phương thức eth của mình, `eth_sendTransaction` và truyền vào `transactionParameters` của chúng ta.

Tại thời điểm này, MetaMask sẽ mở ra trong trình duyệt và nhắc người dùng ký hoặc từ chối giao dịch.

- Nếu giao dịch thành công, hàm sẽ trả về một đối tượng JSON trong đó chuỗi JSX `status` nhắc người dùng kiểm tra Etherscan để biết thêm thông tin về giao dịch của họ.
- Nếu giao dịch thất bại, hàm sẽ trả về một đối tượng JSON trong đó chuỗi `status` chuyển tiếp thông báo lỗi.

Tóm lại, hàm `updateMessage` của chúng ta sẽ trông như thế này:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //xử lý lỗi đầu vào
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //thiết lập các tham số giao dịch
  const transactionParameters = {
    to: contractAddress, // Bắt buộc ngoại trừ trong quá trình xuất bản hợp đồng.
    from: address, // phải khớp với Địa chỉ đang hoạt động của người dùng.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //ký giao dịch
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

Cuối cùng nhưng không kém phần quan trọng, chúng ta cần kết nối hàm `updateMessage` của mình với thành phần `HelloWorld.js` của chúng ta.

#### Kết nối `updateMessage` với frontend `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Hàm `onUpdatePressed` của chúng ta sẽ thực hiện một lệnh gọi await tới hàm `updateMessage` đã nhập và sửa đổi biến trạng thái `status` để phản ánh xem giao dịch của chúng ta đã thành công hay thất bại:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Nó cực kỳ rõ ràng và đơn giản. Và đoán xem... DAPP CỦA BẠN ĐÃ HOÀN THÀNH!!!

Hãy tiếp tục và kiểm tra nút **Update** (Cập nhật)!

### Tạo dapp tùy chỉnh của riêng bạn {#make-your-own-custom-dapp}

Wooooo, bạn đã đi đến cuối hướng dẫn! Tóm lại, bạn đã học được cách:

- Kết nối ví MetaMask với dự án dapp của bạn
- Đọc dữ liệu từ hợp đồng thông minh của bạn bằng API [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)
- Ký các giao dịch Ethereum bằng MetaMask

Bây giờ bạn đã được trang bị đầy đủ để áp dụng các kỹ năng từ hướng dẫn này nhằm xây dựng dự án dapp tùy chỉnh của riêng bạn! Như mọi khi, nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi để được trợ giúp trong [Discord của Alchemy](https://discord.gg/gWuC7zB). 🧙‍♂️

Sau khi bạn hoàn thành hướng dẫn này, hãy cho chúng tôi biết trải nghiệm của bạn như thế nào hoặc nếu bạn có bất kỳ phản hồi nào bằng cách gắn thẻ chúng tôi trên Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
