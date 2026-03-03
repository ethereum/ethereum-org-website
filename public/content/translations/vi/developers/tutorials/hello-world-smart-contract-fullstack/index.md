---
title: "Hợp đồng thông minh Hello World dành cho người mới bắt đầu - Fullstack"
description: "Hướng dẫn giới thiệu về cách viết và triển khai một hợp đồng thông minh đơn giản trên Ethereum."
author: "nstrike2"
tags:
  [
    "solidity",
    "hardhat",
    "từ Alchemy",
    "hợp đồng thông minh",
    "triển khai",
    "trình duyệt khối",
    "frontend",
    "các giao dịch"
  ]
skill: beginner
breadcrumb: "Hello World fullstack"
lang: vi
published: 2021-10-25
---

Hướng dẫn này dành cho bạn nếu bạn là người mới tìm hiểu về phát triển chuỗi khối và không biết bắt đầu từ đâu hoặc cách triển khai và tương tác với các hợp đồng thông minh. Chúng tôi sẽ hướng dẫn cách tạo và triển khai một hợp đồng thông minh đơn giản trên mạng thử nghiệm Goerli bằng cách sử dụng [MetaMask](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) và [Alchemy](https://alchemy.com/eth).

Bạn sẽ cần một tài khoản Alchemy để hoàn thành hướng dẫn này. [Đăng ký tài khoản miễn phí](https://www.alchemy.com/).

Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ trong [Alchemy Discord](https://discord.gg/gWuC7zB)!

## Phần 1 - Tạo và triển khai hợp đồng thông minh của bạn bằng Hardhat {#part-1}

### Kết nối với mạng Ethereum {#connect-to-the-ethereum-network}

Có nhiều cách để thực hiện yêu cầu đến chuỗi Ethereum. Để đơn giản, chúng tôi sẽ sử dụng tài khoản miễn phí trên Alchemy, một nền tảng và Giao diện Lập trình Ứng dụng dành cho nhà phát triển chuỗi khối, cho phép chúng tôi giao tiếp với chuỗi Ethereum mà không cần tự chạy một nút. Alchemy cũng có các công cụ dành cho nhà phát triển để theo dõi và phân tích; chúng tôi sẽ tận dụng những công cụ này trong hướng dẫn này để hiểu những gì đang diễn ra trong quá trình triển khai hợp đồng thông minh của chúng tôi.

### Tạo ứng dụng và khóa Giao diện Lập trình Ứng dụng của bạn {#create-your-app-and-api-key}

Sau khi tạo tài khoản Alchemy, bạn có thể tạo một khóa Giao diện Lập trình Ứng dụng bằng cách tạo một ứng dụng. Điều này sẽ cho phép bạn thực hiện các yêu cầu đến mạng thử nghiệm Goerli. Nếu bạn không quen thuộc với các mạng thử nghiệm, bạn có thể [đọc hướng dẫn của Alchemy về cách chọn mạng](https://www.alchemy.com/docs/choosing-a-web3-network).

Trên bảng điều khiển Alchemy, tìm menu thả xuống **Apps** trong thanh điều hướng và nhấp vào **Create App**.

![Tạo ứng dụng Hello world](./hello-world-create-app.png)

Đặt tên cho ứng dụng của bạn là '_Hello World_' và viết một mô tả ngắn. Chọn **Staging** làm môi trường và **Goerli** làm mạng của bạn.

![tạo chế độ xem ứng dụng hello world](./create-app-view-hello-world.png)

_Lưu ý: hãy chắc chắn chọn **Goerli**, nếu không hướng dẫn này sẽ không hoạt động._

Nhấp vào **Create app**. Ứng dụng của bạn sẽ xuất hiện trong bảng dưới đây.

### Tạo tài khoản Ethereum {#create-an-ethereum-account}

Bạn cần có tài khoản Ethereum để gửi và nhận các giao dịch. Chúng tôi sẽ sử dụng MetaMask, một ví ảo trong trình duyệt cho phép người dùng quản lý địa chỉ tài khoản Ethereum của họ.

Bạn có thể tải xuống và tạo tài khoản MetaMask miễn phí [tại đây](https://metamask.io/download). Khi bạn tạo tài khoản, hoặc nếu bạn đã có tài khoản, hãy đảm bảo chuyển sang “Mạng thử nghiệm Goerli” ở phía trên bên phải (để chúng ta không phải giao dịch bằng tiền thật).

### Bước 4: Thêm ether từ Faucet {#step-4-add-ether-from-a-faucet}

Để triển khai hợp đồng thông minh của bạn trên mạng thử nghiệm, bạn sẽ cần một ít ETH giả. Để nhận ETH trên mạng Goerli, hãy truy cập vào một vòi Goerli và nhập địa chỉ tài khoản Goerli của bạn. Lưu ý rằng các vòi Goerli gần đây có thể hơi không đáng tin cậy - xem [trang các mạng thử nghiệm](/developers/docs/networks/#goerli) để biết danh sách các tùy chọn để thử:

_Lưu ý: do tắc nghẽn mạng, việc này có thể mất một lúc._
``

### Bước 5: Kiểm tra số dư của bạn {#step-5-check-your-balance}

Để kiểm tra lại xem ETH đã có trong ví của bạn chưa, chúng ta hãy thực hiện một yêu cầu [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) bằng cách sử dụng [công cụ soạn thảo của Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Thao tác này sẽ trả về lượng ETH có trong ví của chúng ta. Để tìm hiểu thêm, hãy xem [hướng dẫn ngắn của Alchemy về cách sử dụng công cụ soạn thảo](https://youtu.be/r6sjRxBZJuU).

Nhập địa chỉ tài khoản MetaMask của bạn và nhấp vào **Send Request**. Bạn sẽ thấy một phản hồi trông giống như đoạn mã dưới đây.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _Lưu ý: Kết quả này tính bằng wei, không phải ETH. Wei được sử dụng làm mệnh giá nhỏ nhất của ether._

Phù! Tiền giả của chúng ta đã có đủ.

### Bước 6: Khởi tạo dự án của chúng ta {#step-6-initialize-our-project}

Đầu tiên, chúng ta sẽ cần tạo một thư mục cho dự án của mình. Điều hướng đến dòng lệnh của bạn và nhập nội dung sau.

```
mkdir hello-world
cd hello-world
```

Bây giờ chúng ta đang ở trong thư mục dự án của mình, chúng ta sẽ sử dụng `npm init` để khởi tạo dự án.

> Nếu bạn chưa cài đặt npm, hãy làm theo [các hướng dẫn sau để cài đặt Node.js và npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm).

Đối với mục đích của hướng dẫn này, việc bạn trả lời các câu hỏi khởi tạo như thế nào không quan trọng. Đây là cách chúng tôi đã làm để bạn tham khảo:

```
tên gói: (hello-world)
phiên bản: (1.0.0)
mô tả: hợp đồng thông minh hello world
điểm vào: (index.js)
lệnh kiểm tra:
kho lưu trữ git:
từ khóa:
tác giả:
giấy phép: (ISC)

Sắp ghi vào /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hợp đồng thông minh hello world",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Lỗi: không có bài kiểm tra nào được chỉ định\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Phê duyệt package.json và chúng ta đã sẵn sàng!

### Bước 7: Tải xuống Hardhat {#step-7-download-hardhat}

Hardhat là một môi trường phát triển để biên dịch, triển khai, kiểm thử và gỡ lỗi phần mềm Ethereum của bạn. Nó giúp các nhà phát triển khi xây dựng hợp đồng thông minh và các ứng dụng phi tập trung cục bộ trước khi triển khai lên chuỗi chính.

Bên trong dự án `hello-world` của chúng ta, chạy:

```
npm install --save-dev hardhat
```

Hãy xem trang này để biết thêm chi tiết về [hướng dẫn cài đặt](https://hardhat.org/getting-started/#overview).

### Bước 8: Tạo dự án Hardhat {#step-8-create-hardhat-project}

Bên trong thư mục dự án `hello-world` của chúng ta, chạy:

```
npx hardhat
```

Sau đó, bạn sẽ thấy một thông báo chào mừng và tùy chọn để chọn những gì bạn muốn làm. Chọn “create an empty hardhat.config.js”:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Chào mừng đến với Hardhat v2.0.11 👷‍

Bạn muốn làm gì? …
Tạo một dự án mẫu
❯ Tạo một tệp hardhat.config.js trống
Thoát
```

Thao tác này sẽ tạo một tệp `hardhat.config.js` trong dự án. Chúng ta sẽ sử dụng tệp này sau trong hướng dẫn để chỉ định thiết lập cho dự án của mình.

### Bước 9: Thêm thư mục dự án {#step-9-add-project-folders}

Để giữ cho dự án được tổ chức, chúng ta hãy tạo hai thư mục mới. Trong dòng lệnh, điều hướng đến thư mục gốc của dự án `hello-world` của bạn và nhập:

```
mkdir contracts
mkdir scripts
```

- `contracts/` là nơi chúng ta sẽ lưu tệp mã hợp đồng thông minh hello world
- `scripts/` là nơi chúng ta sẽ lưu giữ các tập lệnh để triển khai và tương tác với hợp đồng của mình

### Bước 10: Viết hợp đồng của chúng ta {#step-10-write-our-contract}

Bạn có thể đang tự hỏi, khi nào chúng ta sẽ viết mã? Đã đến lúc!

Mở dự án hello-world trong trình chỉnh sửa yêu thích của bạn. Các hợp đồng thông minh thường được viết bằng Solidity, ngôn ngữ mà chúng ta sẽ sử dụng để viết hợp đồng thông minh của mình.‌

1. Điều hướng đến thư mục `contracts` và tạo một tệp mới có tên `HelloWorld.sol`
2. Dưới đây là một hợp đồng thông minh Hello World mẫu mà chúng ta sẽ sử dụng cho hướng dẫn này. Sao chép nội dung bên dưới vào tệp `HelloWorld.sol`.

_Lưu ý: Hãy chắc chắn đọc các bình luận để hiểu hợp đồng này làm gì._

```
// Chỉ định phiên bản của Solidity, sử dụng lập phiên bản ngữ nghĩa.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Định nghĩa một hợp đồng có tên là `HelloWorld`.
// Một hợp đồng là một tập hợp các hàm và dữ liệu (trạng thái của nó). Sau khi được triển khai, một hợp đồng nằm ở một địa chỉ cụ thể trên chuỗi khối Ethereum. Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Phát ra khi hàm cập nhật được gọi
   //Các sự kiện hợp đồng thông minh là một cách để hợp đồng của bạn giao tiếp rằng điều gì đó đã xảy ra trên chuỗi khối với giao diện người dùng ứng dụng của bạn, giao diện này có thể 'lắng nghe' các sự kiện nhất định và thực hiện hành động khi chúng xảy ra.
   event UpdatedMessages(string oldStr, string newStr);

   // Khai báo một biến trạng thái `message` thuộc loại `string`.
   // Các biến trạng thái là các biến có giá trị được lưu trữ vĩnh viễn trong bộ lưu trữ hợp đồng. Từ khóa `public` giúp các biến có thể truy cập được từ bên ngoài hợp đồng và tạo ra một hàm mà các hợp đồng hoặc ứng dụng khách khác có thể gọi để truy cập giá trị.
   string public message;

   // Tương tự như nhiều ngôn ngữ lập trình hướng đối tượng dựa trên lớp, một hàm tạo là một hàm đặc biệt chỉ được thực thi khi tạo hợp đồng.
   // Hàm tạo được sử dụng để khởi tạo dữ liệu của hợp đồng. Tìm hiểu thêm:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Chấp nhận một đối số chuỗi `initMessage` và đặt giá trị vào biến lưu trữ `message` của hợp đồng).
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

Chúng ta đã tạo một ví MetaMask, tài khoản Alchemy và viết hợp đồng thông minh của mình, giờ là lúc kết nối cả ba.

Mỗi giao dịch được gửi từ ví của bạn đều yêu cầu một chữ ký sử dụng khóa riêng tư duy nhất của bạn. Để cung cấp cho chương trình của chúng tôi quyền này, chúng tôi có thể lưu trữ khóa riêng tư của mình một cách an toàn trong một tệp môi trường. Chúng tôi cũng sẽ lưu trữ một khóa Giao diện Lập trình Ứng dụng cho Alchemy tại đây.

> Để tìm hiểu thêm về việc gửi giao dịch, hãy xem [hướng dẫn này](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) về việc gửi giao dịch bằng web3.

Đầu tiên, cài đặt gói dotenv trong thư mục dự án của bạn:

```
npm install dotenv --save
```

Sau đó, tạo một tệp `.env` trong thư mục gốc của dự án. Thêm khóa riêng tư MetaMask và URL Giao diện Lập trình Ứng dụng HTTP của Alchemy vào đó.

Tệp môi trường của bạn phải được đặt tên là `.env` nếu không nó sẽ không được nhận dạng là tệp môi trường.

Không đặt tên là `process.env` hoặc `.env-custom` hoặc bất kỳ tên nào khác.

- Làm theo [các hướng dẫn sau](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) để xuất khóa riêng tư của bạn
- Xem bên dưới để lấy URL API HTTP của Alchemy

![](./get-alchemy-api-key.gif)

Tệp `.env` của bạn sẽ trông như thế này:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Để thực sự kết nối những thứ này với mã của chúng ta, chúng ta sẽ tham chiếu các biến này trong tệp `hardhat.config.js` của mình ở bước 13.

### Bước 12: Cài đặt Ethers.js {#step-12-install-ethersjs}

Ethers.js là một thư viện giúp tương tác và thực hiện các yêu cầu đến Ethereum dễ dàng hơn bằng cách gói [các phương thức JSON-RPC tiêu chuẩn](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) bằng các phương thức thân thiện với người dùng hơn.

Hardhat cho phép chúng ta tích hợp các [plugin](https://hardhat.org/plugins/) để có thêm bộ công cụ và chức năng mở rộng. Chúng ta sẽ tận dụng [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) để triển khai hợp đồng.

Trong thư mục dự án của bạn, hãy gõ:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### Bước 13: Cập nhật hardhat.config.js {#step-13-update-hardhat-configjs}

Cho đến nay, chúng ta đã thêm một số phần phụ thuộc và plugin, bây giờ chúng ta cần cập nhật `hardhat.config.js` để dự án của chúng ta biết về tất cả chúng.

Cập nhật tệp `hardhat.config.js` của bạn để trông như thế này:

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

Để đảm bảo mọi thứ đều hoạt động cho đến nay, hãy biên dịch hợp đồng của chúng ta. Tác vụ `compile` là một trong những tác vụ có sẵn của hardhat.

Từ dòng lệnh, hãy chạy:

```bash
npx hardhat compile
```

Bạn có thể nhận được cảnh báo về `SPDX license identifier not provided in source file`, nhưng không cần phải lo lắng về điều đó — hy vọng mọi thứ khác đều ổn! Nếu không, bạn luôn có thể nhắn tin trong [Alchemy discord](https://discord.gg/u72VCg3).

### Bước 15: Viết tập lệnh triển khai của chúng ta {#step-15-write-our-deploy-script}

Bây giờ hợp đồng của chúng ta đã được viết và tệp cấu hình đã sẵn sàng, đã đến lúc viết tập lệnh triển khai hợp đồng của chúng ta.

Điều hướng đến thư mục `scripts/` và tạo một tệp mới có tên `deploy.js`, thêm nội dung sau vào đó:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Bắt đầu triển khai, trả về một promise phân giải thành một đối tượng hợp đồng
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Hợp đồng đã được triển khai đến địa chỉ:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat đã làm rất tốt việc giải thích mỗi dòng mã này làm gì trong [Bài hướng dẫn về Hợp đồng](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) của họ, chúng tôi đã áp dụng các giải thích của họ ở đây.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

`ContractFactory` trong ethers.js là một lớp trừu tượng được sử dụng để triển khai các hợp đồng thông minh mới, vì vậy `HelloWorld` ở đây là một [nhà máy](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) cho các phiên bản của hợp đồng hello world của chúng ta. Khi sử dụng plugin `hardhat-ethers`, các phiên bản `ContractFactory` và `Contract` được kết nối với người ký đầu tiên (chủ sở hữu) theo mặc định.

```javascript
const hello_world = await HelloWorld.deploy()
```

Việc gọi `deploy()` trên `ContractFactory` sẽ bắt đầu việc triển khai và trả về một `Promise` phân giải thành một đối tượng `Contract`. Đây là đối tượng có một phương thức cho mỗi chức năng hợp đồng thông minh của chúng ta.

### Bước 16: Triển khai hợp đồng của chúng ta {#step-16-deploy-our-contract}

Cuối cùng, chúng ta đã sẵn sàng để triển khai hợp đồng thông minh của mình! Điều hướng đến dòng lệnh và chạy:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Sau đó, bạn sẽ thấy một cái gì đó như thế này:

```bash
Hợp đồng được triển khai đến địa chỉ: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Vui lòng lưu địa chỉ này**. Chúng tôi sẽ sử dụng nó sau trong hướng dẫn.

Nếu chúng ta truy cập [Goerli etherscan](https://goerli.etherscan.io) và tìm kiếm địa chỉ hợp đồng của mình, chúng ta sẽ có thể thấy rằng nó đã được triển khai thành công. Giao dịch sẽ trông giống như thế này:

![](./etherscan-contract.png)

Địa chỉ `From` phải khớp với địa chỉ tài khoản MetaMask của bạn và địa chỉ `To` sẽ ghi là **Contract Creation**. Nếu chúng ta nhấp vào giao dịch, chúng ta sẽ thấy địa chỉ hợp đồng của mình trong trường `To`.

![](./etherscan-transaction.png)

Xin chúc mừng! Bạn vừa triển khai một hợp đồng thông minh đến một mạng thử nghiệm Ethereum.

Để hiểu những gì đang diễn ra bên trong, hãy điều hướng đến tab Explorer trong [bảng điều khiển Alchemy](https://dashboard.alchemy.com/explorer) của chúng ta. Nếu bạn có nhiều ứng dụng Alchemy, hãy đảm bảo lọc theo ứng dụng và chọn **Hello World**.

![](./hello-world-explorer.png)

Ở đây, bạn sẽ thấy một số phương thức JSON-RPC mà Hardhat/Ethers đã thực hiện cho chúng ta khi chúng ta gọi hàm `.deploy()`. Hai phương thức quan trọng ở đây là [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), là yêu cầu ghi hợp đồng của chúng ta lên chuỗi Goerli, và [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), là yêu cầu đọc thông tin về giao dịch của chúng ta với hàm băm đã cho. Để tìm hiểu thêm về việc gửi giao dịch, hãy xem [hướng dẫn của chúng tôi về việc gửi giao dịch bằng Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

## Phần 2: Tương tác với hợp đồng thông minh của bạn {#part-2-interact-with-your-smart-contract}

Bây giờ chúng ta đã triển khai thành công một hợp đồng thông minh trên mạng Goerli, hãy cùng tìm hiểu cách tương tác với nó.

### Tạo một tệp interact.js {#create-a-interactjs-file}

Đây là tệp mà chúng ta sẽ viết tập lệnh tương tác của mình. Chúng tôi sẽ sử dụng thư viện Ethers.js mà bạn đã cài đặt trước đó trong Phần 1.

Bên trong thư mục `scripts/`, tạo một tệp mới có tên `interact.js` và thêm mã sau:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### Cập nhật tệp .env của bạn {#update-your-env-file}

Chúng tôi sẽ sử dụng các biến môi trường mới, vì vậy chúng tôi cần định nghĩa chúng trong tệp `.env` mà [chúng tôi đã tạo trước đó](#step-11-connect-metamask-&-alchemy-to-your-project).

Chúng ta sẽ cần thêm một định nghĩa cho `API_KEY` của Alchemy và `CONTRACT_ADDRESS` nơi hợp đồng thông minh của bạn được triển khai.

Tệp `.env` của bạn sẽ trông giống như sau:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Lấy Giao diện nhị phân ứng dụng hợp đồng của bạn {#grab-your-contract-ABI}

[Giao diện nhị phân ứng dụng (ABI)](/glossary/#abi) của hợp đồng của chúng tôi là giao diện để tương tác với hợp đồng thông minh của chúng tôi. Hardhat tự động tạo Giao diện nhị phân ứng dụng (ABI) và lưu nó trong `HelloWorld.json`. Để sử dụng Giao diện nhị phân ứng dụng, chúng ta sẽ cần phân tích cú pháp nội dung bằng cách thêm các dòng mã sau vào tệp `interact.js` của mình:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

Nếu bạn muốn xem ABI, bạn có thể in nó ra bảng điều khiển của mình:

```javascript
console.log(JSON.stringify(contract.abi))
```

Để xem Giao diện nhị phân ứng dụng (ABI) của bạn được in ra bảng điều khiển, hãy điều hướng đến thiết bị đầu cuối của bạn và chạy:

```bash
npx hardhat run scripts/interact.js
```

### Tạo một phiên bản của hợp đồng của bạn {#create-an-instance-of-your-contract}

Để tương tác với hợp đồng của mình, chúng ta cần tạo một phiên bản hợp đồng trong mã của mình. Để làm như vậy với Ethers.js, chúng ta sẽ cần làm việc với ba khái niệm:

1. Nhà cung cấp - một nhà cung cấp nút cung cấp cho bạn quyền truy cập đọc và ghi vào chuỗi khối
2. Người ký - đại diện cho một tài khoản Ethereum có thể ký các giao dịch
3. Hợp đồng - một đối tượng Ethers.js đại diện cho một hợp đồng cụ thể được triển khai trên chuỗi

Chúng ta sẽ sử dụng Giao diện nhị phân ứng dụng (ABI) của hợp đồng từ bước trước để tạo phiên bản hợp đồng của mình:

```javascript
// interact.js

// Nhà cung cấp
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Người ký
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Hợp đồng
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Tìm hiểu thêm về Nhà cung cấp, Người ký và Hợp đồng trong [tài liệu tham khảo của ethers.js](https://docs.ethers.io/v5/).

### Đọc thông điệp khởi tạo {#read-the-init-message}

Bạn có nhớ khi chúng ta triển khai hợp đồng của mình với `initMessage = "Hello world!"` không? Bây giờ chúng ta sẽ đọc thông điệp đó được lưu trữ trong hợp đồng thông minh của mình và in nó ra bảng điều khiển.

Trong JavaScript, các hàm bất đồng bộ được sử dụng khi tương tác với các mạng. Để tìm hiểu thêm về các hàm không đồng bộ, [hãy đọc bài viết này trên medium](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff).

Sử dụng mã bên dưới để gọi hàm `message` trong hợp đồng thông minh của chúng ta và đọc thông điệp khởi tạo:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Thông điệp là: " + message)
}
main()
```

Sau khi chạy tệp bằng `npx hardhat run scripts/interact.js` trong thiết bị đầu cuối, chúng ta sẽ thấy phản hồi này:

```
Thông điệp là: Hello world!
```

Xin chúc mừng! Bạn vừa đọc thành công dữ liệu hợp đồng thông minh từ chuỗi khối Ethereum, làm tốt lắm!

### Cập nhật thông điệp {#update-the-message}

Thay vì chỉ đọc thông điệp, chúng ta cũng có thể cập nhật thông điệp được lưu trong hợp đồng thông minh của mình bằng hàm `update`! Tuyệt vời, phải không?

Để cập nhật thông điệp, chúng ta có thể gọi trực tiếp hàm `update` trên đối tượng Hợp đồng được khởi tạo của mình:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("Thông điệp là: " + message)

  console.log("Đang cập nhật thông điệp...")
  const tx = await helloWorldContract.update("Đây là thông điệp mới.")
  await tx.wait()
}
main()
```

Lưu ý rằng ở dòng 11, chúng ta thực hiện một lệnh gọi đến `.wait()` trên đối tượng giao dịch được trả về. Điều này đảm bảo rằng tập lệnh của chúng ta đợi giao dịch được khai thác trên chuỗi khối trước khi thoát khỏi hàm. Nếu lệnh gọi `.wait()` không được bao gồm, tập lệnh có thể không thấy giá trị `message` được cập nhật trong hợp đồng.

### Đọc thông điệp mới {#read-the-new-message}

Bạn có thể lặp lại [bước trước đó](#read-the-init-message) để đọc giá trị `message` đã được cập nhật. Hãy dành một chút thời gian và xem liệu bạn có thể thực hiện những thay đổi cần thiết để in ra giá trị mới đó không!

Nếu bạn cần gợi ý, đây là tệp `interact.js` của bạn sẽ trông như thế nào vào thời điểm này:

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

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("Thông điệp là: " + message)

  console.log("Đang cập nhật thông điệp...")
  const tx = await helloWorldContract.update("đây là thông điệp mới")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("Thông điệp mới là: " + newMessage)
}

main()
```

Bây giờ chỉ cần chạy tập lệnh và bạn sẽ có thể thấy thông điệp cũ, trạng thái cập nhật và thông điệp mới được in ra thiết bị đầu cuối của bạn!

`npx hardhat run scripts/interact.js --network goerli`

```
Thông điệp là: Hello World!
Đang cập nhật thông điệp...
Thông điệp mới là: Đây là thông điệp mới.
```

Trong khi chạy tập lệnh đó, bạn có thể nhận thấy rằng bước `Updating the message...` mất một lúc để tải trước khi thông điệp mới tải. Đó là do quá trình khai thác; nếu bạn tò mò về việc theo dõi các giao dịch trong khi chúng đang được khai thác, hãy truy cập [bể ghi nhớ của Alchemy](https://dashboard.alchemyapi.io/mempool) để xem trạng thái của một giao dịch. Nếu giao dịch bị hủy, bạn cũng nên kiểm tra [Goerli Etherscan](https://goerli.etherscan.io) và tìm kiếm hàm băm giao dịch của mình.

## Phần 3: Xuất bản hợp đồng thông minh của bạn lên Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

Bạn đã làm tất cả công việc khó khăn để đưa hợp đồng thông minh của mình vào cuộc sống; bây giờ là lúc chia sẻ nó với thế giới!

Bằng cách xác minh hợp đồng thông minh của bạn trên Etherscan, bất kỳ ai cũng có thể xem mã nguồn của bạn và tương tác với hợp đồng thông minh của bạn. Bắt đầu ngay!

### Bước 1: Tạo khóa Giao diện Lập trình Ứng dụng trên tài khoản Etherscan của bạn {#step-1-generate-an-api-key-on-your-etherscan-account}

Cần có khóa Giao diện Lập trình Ứng dụng Etherscan để xác minh rằng bạn sở hữu hợp đồng thông minh mà bạn đang cố gắng xuất bản.

Nếu bạn chưa có tài khoản Etherscan, [hãy đăng ký một tài khoản](https://etherscan.io/register).

Sau khi đăng nhập, tìm tên người dùng của bạn trong thanh điều hướng, di chuột qua nó và chọn nút **Hồ sơ của tôi**.

Trên trang hồ sơ của bạn, bạn sẽ thấy một thanh điều hướng bên cạnh. Từ thanh điều hướng bên cạnh, chọn **Khóa Giao diện Lập trình Ứng dụng**. Tiếp theo, nhấn nút "Thêm" để tạo một khóa Giao diện Lập trình Ứng dụng mới, đặt tên cho ứng dụng của bạn là **hello-world** và nhấn nút **Tạo Khóa Giao diện Lập trình Ứng dụng Mới**.

Khóa Giao diện Lập trình Ứng dụng mới của bạn sẽ xuất hiện trong bảng khóa Giao diện Lập trình Ứng dụng. Sao chép khóa Giao diện Lập trình Ứng dụng vào khay nhớ tạm của bạn.

Tiếp theo, chúng ta cần thêm khóa Giao diện Lập trình Ứng dụng Etherscan vào tệp `.env` của mình.

Sau khi thêm nó, tệp `.env` của bạn sẽ trông như thế này:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Các hợp đồng thông minh được triển khai bởi Hardhat {#hardhat-deployed-smart-contracts}

#### Cài đặt hardhat-etherscan {#install-hardhat-etherscan}

Việc xuất bản hợp đồng của bạn lên Etherscan bằng Hardhat rất đơn giản. Trước tiên, bạn sẽ cần cài đặt plugin `hardhat-etherscan` để bắt đầu. `hardhat-etherscan` sẽ tự động xác minh mã nguồn và Giao diện nhị phân ứng dụng (ABI) của hợp đồng thông minh trên Etherscan. Để thêm điều này, trong thư mục `hello-world`, hãy chạy:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Sau khi cài đặt, bao gồm câu lệnh sau ở đầu `hardhat.config.js` của bạn và thêm các tùy chọn cấu hình Etherscan:

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
    // Khóa Giao diện Lập trình Ứng dụng của bạn cho Etherscan
    // Lấy một khóa tại https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Xác minh hợp đồng thông minh của bạn trên Etherscan {#verify-your-smart-contract-on-etherscan}

Đảm bảo tất cả các tệp được lưu và tất cả các biến `.env` được cấu hình chính xác.

Chạy tác vụ `verify`, truyền địa chỉ hợp đồng và mạng nơi nó được triển khai:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

Đảm bảo rằng `DEPLOYED_CONTRACT_ADDRESS` là địa chỉ của hợp đồng thông minh đã được triển khai của bạn trên mạng thử nghiệm Goerli. Ngoài ra, đối số cuối cùng (`'Hello World!'`) phải có cùng giá trị chuỗi được sử dụng [trong bước triển khai ở phần 1](#write-our-deploy-script).

Nếu mọi việc suôn sẻ, bạn sẽ thấy thông điệp sau trong thiết bị đầu cuối của mình:

```text
Đã gửi thành công mã nguồn cho hợp đồng
contracts/HelloWorld.sol:HelloWorld tại 0xdeployed-contract-address
để xác minh trên Etherscan. Đang chờ kết quả xác minh...


Đã xác minh thành công hợp đồng HelloWorld trên Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

Xin chúc mừng! Mã hợp đồng thông minh của bạn đã có trên Etherscan!

### Kiểm tra hợp đồng thông minh của bạn trên Etherscan! {#check-out-your-smart-contract-on-etherscan}

Khi bạn điều hướng đến liên kết được cung cấp trong thiết bị đầu cuối của mình, bạn sẽ có thể thấy mã hợp đồng thông minh và Giao diện nhị phân ứng dụng (ABI) của mình được xuất bản trên Etherscan!

**Wahooo - bạn đã làm được rồi, nhà vô địch! Bây giờ bất kỳ ai cũng có thể gọi hoặc ghi vào hợp đồng thông minh của bạn! Chúng tôi rất mong được xem bạn sẽ xây dựng gì tiếp theo!**

## Phần 4 - Tích hợp hợp đồng thông minh của bạn với giao diện người dùng {#part-4-integrating-your-smart-contract-with-the-frontend}

Vào cuối hướng dẫn này, bạn sẽ biết cách:

- Kết nối ví MetaMask với dự án ứng dụng phi tập trung của bạn
- Đọc dữ liệu từ hợp đồng thông minh của bạn bằng cách sử dụng Giao diện Lập trình Ứng dụng [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Ký các giao dịch Ethereum bằng MetaMask

Đối với ứng dụng phi tập trung này, chúng tôi sẽ sử dụng [React](https://react.dev/) làm khuôn khổ giao diện người dùng của mình; tuy nhiên, điều quan trọng cần lưu ý là chúng tôi sẽ không dành nhiều thời gian để phân tích các nguyên tắc cơ bản của nó, vì chúng tôi sẽ chủ yếu tập trung vào việc đưa chức năng Web3 vào dự án của mình.

Như một điều kiện tiên quyết, bạn nên có một sự hiểu biết ở mức độ sơ cấp về React. Nếu không, chúng tôi khuyên bạn nên hoàn thành [hướng dẫn Giới thiệu về React](https://react.dev/learn) chính thức.

### Sao chép các tệp khởi đầu {#clone-the-starter-files}

Đầu tiên, hãy truy cập [kho lưu trữ GitHub hello-world-part-four](https://github.com/alchemyplatform/hello-world-part-four-tutorial) để lấy các tệp khởi đầu cho dự án này và sao chép kho lưu trữ này vào máy cục bộ của bạn.

Mở kho lưu trữ đã sao chép cục bộ. Lưu ý rằng nó chứa hai thư mục: `starter-files` và `completed`.

- `starter-files`- **chúng ta sẽ làm việc trong thư mục này**, chúng ta sẽ kết nối giao diện người dùng với ví Ethereum của bạn và hợp đồng thông minh mà chúng ta đã xuất bản lên Etherscan trong [Phần 3](#part-3).
- `completed` chứa toàn bộ hướng dẫn đã hoàn thành và chỉ nên được sử dụng làm tài liệu tham khảo nếu bạn gặp khó khăn.

Tiếp theo, mở bản sao `starter-files` của bạn vào trình soạn thảo mã yêu thích của bạn, sau đó điều hướng vào thư mục `src`.

Tất cả mã chúng ta sẽ viết sẽ nằm trong thư mục `src`. Chúng ta sẽ chỉnh sửa thành phần `HelloWorld.js` và các tệp JavaScript `util/interact.js` để cung cấp cho dự án của chúng ta chức năng Web3.

### Kiểm tra các tệp khởi đầu {#check-out-the-starter-files}

Trước khi bắt đầu viết mã, hãy cùng khám phá những gì được cung cấp cho chúng ta trong các tệp khởi đầu.

#### Chạy dự án react của bạn {#get-your-react-project-running}

Hãy bắt đầu bằng cách chạy dự án React trong trình duyệt của chúng ta. Vẻ đẹp của React là một khi chúng ta có dự án đang chạy trong trình duyệt, bất kỳ thay đổi nào chúng ta lưu sẽ được cập nhật trực tiếp trong trình duyệt của chúng ta.

Để chạy dự án, hãy điều hướng đến thư mục gốc của thư mục `starter-files` và chạy `npm install` trong thiết bị đầu cuối của bạn để cài đặt các phụ thuộc của dự án:

```bash
cd starter-files
npm install
```

Sau khi chúng đã cài đặt xong, hãy chạy `npm start` trong terminal của bạn:

```bash
npm start
```

Làm như vậy sẽ mở [http://localhost:3000/](http://localhost:3000/) trong trình duyệt của bạn, nơi bạn sẽ thấy giao diện người dùng cho dự án của chúng ta. Nó sẽ bao gồm một trường (một nơi để cập nhật thông điệp được lưu trữ trong hợp đồng thông minh của bạn), một nút "Kết nối Ví" và một nút "Cập nhật".

Nếu bạn thử nhấp vào một trong hai nút, bạn sẽ nhận thấy rằng chúng không hoạt động—đó là vì chúng ta vẫn cần lập trình chức năng của chúng.

#### Thành phần `HelloWorld.js` {#the-helloworld-js-component}

Hãy quay lại thư mục `src` trong trình chỉnh sửa của chúng ta và mở tệp `HelloWorld.js`. Việc hiểu mọi thứ trong tệp này là cực kỳ quan trọng, vì đây là thành phần React chính mà chúng ta sẽ làm việc.

Ở đầu tệp này, bạn sẽ nhận thấy chúng ta có một số câu lệnh nhập cần thiết để chạy dự án của mình, bao gồm thư viện React, các hook useEffect và useState, một số mục từ `./util/interact.js` (chúng ta sẽ mô tả chúng chi tiết hơn ngay sau đây!), và logo Alchemy.

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
const [message, setMessage] = useState("Không có kết nối với mạng.")
const [newMessage, setNewMessage] = useState("")
```

Đây là những gì mỗi biến đại diện:

- `walletAddress` - một chuỗi lưu trữ địa chỉ ví của người dùng
- `status`- một chuỗi lưu trữ một thông điệp hữu ích hướng dẫn người dùng cách tương tác với ứng dụng phi tập trung
- `message` - một chuỗi lưu trữ thông điệp hiện tại trong hợp đồng thông minh
- `newMessage` - một chuỗi lưu trữ thông điệp mới sẽ được ghi vào hợp đồng thông minh

Sau các biến trạng thái, bạn sẽ thấy năm hàm chưa được triển khai: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, và `onUpdatePressed`. Chúng tôi sẽ giải thích những gì chúng làm dưới đây:

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- đây là một hook của React được gọi sau khi thành phần của bạn được kết xuất. Bởi vì nó có một mảng trống `[]` được truyền vào (xem dòng 4), nó sẽ chỉ được gọi trong lần kết xuất _đầu tiên_ của thành phần. Ở đây chúng ta sẽ tải thông điệp hiện tại được lưu trữ trong hợp đồng thông minh của mình, gọi các trình lắng nghe hợp đồng thông minh và ví của chúng ta, và cập nhật giao diện người dùng của chúng ta để phản ánh liệu một ví đã được kết nối hay chưa.
- `addSmartContractListener`- hàm này thiết lập một trình lắng nghe sẽ theo dõi sự kiện `UpdatedMessages` của hợp đồng HelloWorld của chúng ta và cập nhật giao diện người dùng của chúng ta khi thông điệp được thay đổi trong hợp đồng thông minh của chúng ta.
- `addWalletListener`- hàm này thiết lập một trình lắng nghe phát hiện các thay đổi trong trạng thái ví MetaMask của người dùng, chẳng hạn như khi người dùng ngắt kết nối ví của họ hoặc chuyển đổi địa chỉ.
- `connectWalletPressed`- hàm này sẽ được gọi để kết nối ví MetaMask của người dùng với ứng dụng phi tập trung của chúng tôi.
- `onUpdatePressed` - hàm này sẽ được gọi khi người dùng muốn cập nhật thông điệp được lưu trữ trong hợp đồng thông minh.

Gần cuối tệp này, chúng ta có UI của thành phần của mình.

```javascript
// HelloWorld.js

//giao diện người dùng của thành phần của chúng ta
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Đã kết nối: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Kết nối Ví</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Thông điệp Hiện tại:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>Thông điệp Mới:</h2>

    <div>
      <input
        type="text"
        placeholder="Cập nhật thông điệp trong hợp đồng thông minh của bạn."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Cập nhật
      </button>
</div>
 
</div>
)
```

Nếu bạn quét mã này một cách cẩn thận, bạn sẽ nhận thấy nơi chúng ta sử dụng các biến trạng thái khác nhau trong giao diện người dùng của mình:

- Ở các dòng 6-12, nếu ví của người dùng được kết nối (tức là `walletAddress.length > 0`), chúng ta sẽ hiển thị một phiên bản rút gọn của `walletAddress` của người dùng trong nút có ID "walletButton;" nếu không, nó chỉ đơn giản là "Kết nối Ví."
- Trên dòng 17, chúng ta hiển thị thông điệp hiện tại được lưu trữ trong hợp đồng thông minh, được ghi lại trong chuỗi `message`.
- Trên các dòng 23-26, chúng tôi sử dụng một [thành phần được kiểm soát](https://legacy.reactjs.org/docs/forms.html#controlled-components) để cập nhật biến trạng thái `newMessage` của mình khi đầu vào trong trường văn bản thay đổi.

Ngoài các biến trạng thái của chúng ta, bạn cũng sẽ thấy rằng các hàm `connectWalletPressed` và `onUpdatePressed` được gọi khi các nút có ID `publishButton` và `walletButton` được nhấp tương ứng.

Cuối cùng, hãy giải quyết vấn đề thành phần `HelloWorld.js` này được thêm vào đâu.

Nếu bạn vào tệp `App.js`, là thành phần chính trong React hoạt động như một vùng chứa cho tất cả các thành phần khác, bạn sẽ thấy rằng thành phần `HelloWorld.js` của chúng ta được chèn vào dòng 7.

Cuối cùng nhưng không kém phần quan trọng, hãy kiểm tra thêm một tệp nữa được cung cấp cho bạn, tệp `interact.js`.

#### Tệp `interact.js` {#the-interact-js-file}

Bởi vì chúng tôi muốn tuân theo mô hình [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), chúng tôi sẽ muốn có một tệp riêng chứa tất cả các hàm của mình để quản lý logic, dữ liệu và quy tắc của ứng dụng phi tập trung của mình, và sau đó có thể xuất các hàm đó sang giao diện người dùng của chúng tôi (thành phần `HelloWorld.js` của chúng tôi).

👆🏽Đây chính là mục đích của tệp `interact.js` của chúng ta!

Điều hướng đến thư mục `util` trong thư mục `src` của bạn, và bạn sẽ nhận thấy chúng tôi đã bao gồm một tệp có tên `interact.js` sẽ chứa tất cả các hàm và biến tương tác hợp đồng thông minh và ví của chúng tôi.

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

Bạn sẽ nhận thấy ở đầu tệp rằng chúng tôi đã chú thích đối tượng `helloWorldContract`. Sau này trong hướng dẫn này, chúng tôi sẽ bỏ chú thích đối tượng này và khởi tạo hợp đồng thông minh của mình trong biến này, sau đó chúng tôi sẽ xuất nó vào thành phần `HelloWorld.js` của mình.

Bốn hàm chưa được triển khai sau đối tượng `helloWorldContract` của chúng ta thực hiện những việc sau:

- `loadCurrentMessage` - hàm này xử lý logic tải thông điệp hiện tại được lưu trữ trong hợp đồng thông minh. Nó sẽ thực hiện một lệnh gọi _đọc_ đến hợp đồng thông minh Hello World bằng cách sử dụng [Giao diện Lập trình Ứng dụng Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).
- `connectWallet` - hàm này sẽ kết nối MetaMask của người dùng với ứng dụng phi tập trung của chúng tôi.
- `getCurrentWalletConnected` - hàm này sẽ kiểm tra xem một tài khoản Ethereum đã được kết nối với ứng dụng phi tập trung của chúng ta khi tải trang hay chưa và cập nhật giao diện người dùng của chúng ta cho phù hợp.
- `updateMessage` - hàm này sẽ cập nhật thông điệp được lưu trữ trong hợp đồng thông minh. Nó sẽ thực hiện một lệnh gọi _ghi_ đến hợp đồng thông minh Hello World, vì vậy ví MetaMask của người dùng sẽ phải ký một giao dịch Ethereum để cập nhật thông điệp.

Bây giờ chúng ta đã hiểu những gì chúng ta đang làm việc, hãy cùng tìm hiểu cách đọc từ hợp đồng thông minh của chúng ta!

### Bước 3: Đọc từ hợp đồng thông minh của bạn {#step-3-read-from-your-smart-contract}

Để đọc từ hợp đồng thông minh của bạn, bạn sẽ cần thiết lập thành công:

- Kết nối Giao diện Lập trình Ứng dụng với chuỗi Ethereum
- Một phiên bản đã tải của hợp đồng thông minh của bạn
- Một hàm để gọi đến hàm hợp đồng thông minh của bạn
- Một trình lắng nghe để theo dõi các cập nhật khi dữ liệu bạn đang đọc từ hợp đồng thông minh thay đổi

Điều này nghe có vẻ như rất nhiều bước, nhưng đừng lo lắng! Chúng tôi sẽ hướng dẫn bạn cách thực hiện từng bước một! :\)

#### Thiết lập kết nối Giao diện Lập trình Ứng dụng với chuỗi Ethereum {#establish-an-api-connection-to-the-ethereum-chain}

Vậy bạn có nhớ trong Phần 2 của hướng dẫn này, chúng ta đã sử dụng khóa Alchemy Web3 để đọc từ hợp đồng thông minh của mình không ([https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library))? Bạn cũng sẽ cần một khóa Alchemy Web3 trong ứng dụng phi tập trung của mình để đọc từ chuỗi.

Nếu bạn chưa có, trước tiên hãy cài đặt [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) bằng cách điều hướng đến thư mục gốc của `starter-files` và chạy lệnh sau trong thiết bị đầu cuối của bạn:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) là một trình bao bọc xung quanh [Web3.js](https://docs.web3js.org/), cung cấp các phương thức Giao diện Lập trình Ứng dụng nâng cao và các lợi ích quan trọng khác để giúp cuộc sống của bạn với tư cách là một nhà phát triển web3 dễ dàng hơn. Nó được thiết kế để yêu cầu cấu hình tối thiểu để bạn có thể bắt đầu sử dụng nó trong ứng dụng của mình ngay lập tức!

Sau đó, cài đặt gói [dotenv](https://www.npmjs.com/package/dotenv) trong thư mục dự án của bạn, để chúng ta có một nơi bảo mật để lưu trữ khóa Giao diện Lập trình Ứng dụng của mình sau khi chúng ta lấy nó.

```text
npm install dotenv --save
```

Đối với ứng dụng phi tập trung của chúng ta, **chúng ta sẽ sử dụng khóa Giao diện Lập trình Ứng dụng Websockets** thay vì khóa Giao diện Lập trình Ứng dụng HTTP của mình, vì nó sẽ cho phép chúng ta thiết lập một trình lắng nghe phát hiện khi thông điệp được lưu trữ trong hợp đồng thông minh thay đổi.

Sau khi có khóa Giao diện Lập trình Ứng dụng, hãy tạo tệp `.env` trong thư mục gốc của bạn và thêm url Alchemy Websockets của bạn vào đó. Sau đó, tệp `.env` của bạn sẽ trông như sau:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

Bây giờ, chúng ta đã sẵn sàng để thiết lập điểm cuối Alchemy Web3 trong ứng dụng phi tập trung của mình! Hãy quay lại `interact.js` của chúng ta, nằm trong thư mục `util` của chúng ta và thêm mã sau vào đầu tệp:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

Ở trên, chúng tôi đã nhập khóa Alchemy từ tệp `.env` của mình và sau đó truyền `alchemyKey` của mình cho `createAlchemyWeb3` để thiết lập điểm cuối Alchemy Web3 của mình.

Với điểm cuối này đã sẵn sàng, đã đến lúc tải hợp đồng thông minh của chúng ta!

#### Tải hợp đồng thông minh Hello World của bạn {#loading-your-hello-world-smart-contract}

Để tải hợp đồng thông minh Hello World của bạn, bạn sẽ cần địa chỉ hợp đồng và Giao diện nhị phân ứng dụng (ABI) của nó, cả hai đều có thể được tìm thấy trên Etherscan nếu bạn đã hoàn thành [Phần 3 của hướng dẫn này.](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)

#### Cách lấy Giao diện nhị phân ứng dụng (ABI) của hợp đồng của bạn từ Etherscan {#how-to-get-your-contract-abi-from-etherscan}

Nếu bạn bỏ qua Phần 3 của hướng dẫn này, bạn có thể sử dụng hợp đồng HelloWorld với địa chỉ [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code). Giao diện nhị phân ứng dụng (ABI) của nó có thể được tìm thấy [tại đây](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code).

Giao diện nhị phân ứng dụng (ABI) của hợp đồng là cần thiết để chỉ định hàm mà hợp đồng sẽ gọi cũng như đảm bảo rằng hàm sẽ trả về dữ liệu ở định dạng bạn mong đợi. Sau khi chúng ta đã sao chép Giao diện nhị phân ứng dụng (ABI) của hợp đồng, hãy lưu nó dưới dạng tệp JSON có tên `contract-abi.json` trong thư mục `src` của bạn.

contract-abi.json của bạn nên được lưu trữ trong thư mục src của bạn.

Với địa chỉ hợp đồng, Giao diện nhị phân ứng dụng (ABI) và điểm cuối Alchemy Web3, chúng ta có thể sử dụng [phương thức hợp đồng](https://docs.web3js.org/api/web3-eth-contract/class/Contract) để tải một phiên bản của hợp đồng thông minh của mình. Nhập Giao diện nhị phân ứng dụng (ABI) của hợp đồng vào tệp `interact.js` và thêm địa chỉ hợp đồng của bạn.

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

Bây giờ chúng ta có thể cuối cùng bỏ chú thích biến `helloWorldContract` của mình và tải hợp đồng thông minh bằng điểm cuối AlchemyWeb3 của chúng ta:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

Để tóm tắt, 12 dòng đầu tiên của `interact.js` của bạn bây giờ sẽ trông như thế này:

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

Bây giờ chúng ta đã tải hợp đồng của mình, chúng ta có thể triển khai hàm `loadCurrentMessage` của mình!

#### Triển khai `loadCurrentMessage` trong tệp `interact.js` của bạn {#implementing-loadCurrentMessage-in-your-interact-js-file}

Hàm này cực kỳ đơn giản. Chúng ta sẽ thực hiện một lệnh gọi web3 không đồng bộ đơn giản để đọc từ hợp đồng của mình. Hàm của chúng ta sẽ trả về thông điệp được lưu trữ trong hợp đồng thông minh:

Cập nhật `loadCurrentMessage` trong tệp `interact.js` của bạn thành như sau:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

Vì chúng tôi muốn hiển thị hợp đồng thông minh này trong giao diện người dùng của mình, hãy cập nhật hàm `useEffect` trong thành phần `HelloWorld.js` của chúng tôi thành như sau:

```javascript
// HelloWorld.js

//chỉ được gọi một lần
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

Lưu ý, chúng ta chỉ muốn `loadCurrentMessage` được gọi một lần trong lần kết xuất đầu tiên của thành phần. Chúng tôi sẽ sớm triển khai `addSmartContractListener` để tự động cập nhật giao diện người dùng sau khi thông điệp trong hợp đồng thông minh thay đổi.

Trước khi đi sâu vào trình lắng nghe của chúng ta, hãy kiểm tra những gì chúng ta đã có cho đến nay! Lưu các tệp `HelloWorld.js` và `interact.js` của bạn, sau đó truy cập [http://localhost:3000/](http://localhost:3000/)

Bạn sẽ nhận thấy rằng thông điệp hiện tại không còn ghi "Không có kết nối với mạng." Thay vào đó, nó phản ánh thông điệp được lưu trữ trong hợp đồng thông minh. Tuyệt!

#### Giao diện người dùng của bạn bây giờ sẽ phản ánh thông điệp được lưu trữ trong hợp đồng thông minh {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

Bây giờ nói về trình lắng nghe đó...

#### Triển khai `addSmartContractListener` {#implement-addsmartcontractlistener}

Nếu bạn nghĩ lại về tệp `HelloWorld.sol` mà chúng ta đã viết trong [Phần 1 của loạt hướng dẫn này](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract), bạn sẽ nhớ lại rằng có một sự kiện hợp đồng thông minh được gọi là `UpdatedMessages` được phát ra sau khi hàm `update` của hợp đồng thông minh của chúng ta được gọi (xem các dòng 9 và 27):

```javascript
// HelloWorld.sol

// Chỉ định phiên bản của Solidity, sử dụng lập phiên bản ngữ nghĩa.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Định nghĩa một hợp đồng có tên là `HelloWorld`.
// Một hợp đồng là một tập hợp các hàm và dữ liệu (trạng thái của nó). Sau khi được triển khai, một hợp đồng nằm ở một địa chỉ cụ thể trên chuỗi khối Ethereum. Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Phát ra khi hàm cập nhật được gọi
   //Các sự kiện hợp đồng thông minh là một cách để hợp đồng của bạn giao tiếp rằng điều gì đó đã xảy ra trên chuỗi khối với giao diện người dùng ứng dụng của bạn, giao diện này có thể 'lắng nghe' các sự kiện nhất định và thực hiện hành động khi chúng xảy ra.
   event UpdatedMessages(string oldStr, string newStr);

   // Khai báo một biến trạng thái `message` thuộc loại `string`.
   // Các biến trạng thái là các biến có giá trị được lưu trữ vĩnh viễn trong bộ lưu trữ hợp đồng. Từ khóa `public` giúp các biến có thể truy cập được từ bên ngoài hợp đồng và tạo ra một hàm mà các hợp đồng hoặc ứng dụng khách khác có thể gọi để truy cập giá trị.
   string public message;

   // Tương tự như nhiều ngôn ngữ lập trình hướng đối tượng dựa trên lớp, một hàm tạo là một hàm đặc biệt chỉ được thực thi khi tạo hợp đồng.
   // Hàm tạo được sử dụng để khởi tạo dữ liệu của hợp đồng. Tìm hiểu thêm:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Chấp nhận một đối số chuỗi `initMessage` và đặt giá trị vào biến lưu trữ `message` của hợp đồng).
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

Các sự kiện hợp đồng thông minh là một cách để hợp đồng của bạn giao tiếp rằng điều gì đó đã xảy ra (tức là có một _sự kiện_) trên chuỗi khối với ứng dụng giao diện người dùng của bạn, ứng dụng này có thể 'lắng nghe' các sự kiện cụ thể và thực hiện hành động khi chúng xảy ra.

Hàm `addSmartContractListener` sẽ lắng nghe cụ thể sự kiện `UpdatedMessages` của hợp đồng thông minh Hello World của chúng ta và cập nhật giao diện người dùng của chúng ta để hiển thị thông điệp mới.

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
      setStatus("🎉 Thông điệp của bạn đã được cập nhật!")
    }
  })
}
```

Hãy cùng phân tích những gì xảy ra khi trình lắng nghe phát hiện một sự kiện:

- Nếu có lỗi xảy ra khi sự kiện được phát ra, nó sẽ được phản ánh trong giao diện người dùng thông qua biến trạng thái `status` của chúng ta.
- Nếu không, chúng ta sẽ sử dụng đối tượng `data` được trả về. `data.returnValues` là một mảng được lập chỉ mục tại 0, trong đó phần tử đầu tiên trong mảng lưu trữ thông điệp trước đó và phần tử thứ hai lưu trữ thông điệp đã cập nhật. Nói chung, trong một sự kiện thành công, chúng ta sẽ đặt chuỗi `message` của mình thành thông điệp đã cập nhật, xóa chuỗi `newMessage`, và cập nhật biến trạng thái `status` của mình để phản ánh rằng một thông điệp mới đã được xuất bản trên hợp đồng thông minh của chúng ta.

Cuối cùng, hãy gọi trình lắng nghe của chúng ta trong hàm `useEffect` để nó được khởi tạo trong lần kết xuất đầu tiên của thành phần `HelloWorld.js`. Nói chung, hàm `useEffect` của bạn sẽ trông như thế này:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Bây giờ chúng ta đã có thể đọc từ hợp đồng thông minh của mình, sẽ rất tuyệt nếu tìm ra cách viết vào nó nữa! Tuy nhiên, để ghi vào ứng dụng phi tập trung của mình, trước tiên chúng ta phải có một ví Ethereum được kết nối với nó.

Vì vậy, tiếp theo chúng ta sẽ giải quyết việc thiết lập ví Ethereum của mình (MetaMask) và sau đó kết nối nó với ứng dụng phi tập trung của mình!

### Bước 4: Thiết lập ví Ethereum của bạn {#step-4-set-up-your-ethereum-wallet}

Để viết bất cứ điều gì lên chuỗi Ethereum, người dùng phải ký các giao dịch bằng khóa riêng tư của ví ảo của họ. Đối với hướng dẫn này, chúng tôi sẽ sử dụng [MetaMask](https://metamask.io/), một ví ảo trong trình duyệt được sử dụng để quản lý địa chỉ tài khoản Ethereum của bạn, vì nó giúp việc ký giao dịch này trở nên siêu dễ dàng cho người dùng cuối.

Nếu bạn muốn tìm hiểu thêm về cách thức hoạt động của các giao dịch trên Ethereum, hãy xem [trang này](/developers/docs/transactions/) từ Ethereum Foundation.

#### Tải xuống MetaMask {#download-metamask}

Bạn có thể tải xuống và tạo tài khoản MetaMask miễn phí [tại đây](https://metamask.io/download). Khi bạn tạo tài khoản, hoặc nếu bạn đã có tài khoản, hãy đảm bảo chuyển sang “Mạng thử nghiệm Goerli” ở phía trên bên phải (để chúng ta không phải giao dịch bằng tiền thật).

#### Thêm ether từ một Faucet {#add-ether-from-a-faucet}

Để ký một giao dịch trên chuỗi khối Ethereum, chúng ta sẽ cần một ít Eth giả. Để nhận Eth, bạn có thể vào [FaucETH](https://fauceth.komputing.org) và nhập địa chỉ tài khoản Goerli của bạn, nhấp vào “Request funds”, sau đó chọn “Ethereum Testnet Goerli” trong menu thả xuống và cuối cùng nhấp lại vào nút “Request funds”. Bạn sẽ sớm thấy Eth trong tài khoản MetaMask của mình!

#### Kiểm tra số dư của bạn {#check-your-balance}

Để kiểm tra lại số dư của chúng ta, hãy thực hiện một yêu cầu [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) bằng cách sử dụng [công cụ soạn thảo của Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Thao tác này sẽ trả về số lượng Eth trong ví của chúng ta. Sau khi bạn nhập địa chỉ tài khoản MetaMask của mình và nhấp vào “Send Request”, bạn sẽ thấy một phản hồi như sau:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**LƯU Ý:** Kết quả này tính bằng wei chứ không phải eth. Wei được sử dụng làm mệnh giá nhỏ nhất của ether. Việc chuyển đổi từ wei sang eth là: 1 eth = 10¹⁸ wei. Vì vậy, nếu chúng ta chuyển đổi 0xde0b6b3a7640000 sang hệ thập phân, chúng ta sẽ nhận được 1\*10¹⁸, tương đương với 1 eth.

Phù! Tiền giả của chúng ta đã có đủ! 🤑

### Bước 5: Kết nối MetaMask với giao diện người dùng của bạn {#step-5-connect-metamask-to-your-UI}

Bây giờ ví MetaMask của chúng ta đã được thiết lập, hãy kết nối ứng dụng phi tập trung của chúng ta với nó!

#### Hàm `connectWallet` {#the-connectWallet-function}

Trong tệp `interact.js` của chúng ta, hãy triển khai hàm `connectWallet`, sau đó chúng ta có thể gọi nó trong thành phần `HelloWorld.js` của mình.

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
        status: "👆🏽 Viết một thông điệp vào trường văn bản ở trên.",
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
              Bạn phải cài đặt MetaMask, một ví Ethereum ảo, trong trình duyệt của bạn.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Vậy khối mã khổng lồ này chính xác làm gì?

Chà, đầu tiên, nó kiểm tra xem `window.ethereum` có được bật trong trình duyệt của bạn hay không.

`window.ethereum` là một API toàn cầu được chèn bởi MetaMask và các nhà cung cấp ví khác cho phép các trang web yêu cầu tài khoản Ethereum của người dùng. Nếu được chấp thuận, nó có thể đọc dữ liệu từ các chuỗi khối mà người dùng được kết nối và đề nghị người dùng ký các thông điệp và giao dịch. Hãy xem [tài liệu MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) để biết thêm thông tin!

Nếu `window.ethereum` _không_ có mặt, điều đó có nghĩa là MetaMask chưa được cài đặt. Điều này dẫn đến một đối tượng JSON được trả về, trong đó `address` được trả về là một chuỗi rỗng và đối tượng `status` JSX chuyển tiếp rằng người dùng phải cài đặt MetaMask.

Bây giờ nếu `window.ethereum` _có_ mặt, thì đó là lúc mọi thứ trở nên thú vị.

Sử dụng vòng lặp try/catch, chúng ta sẽ cố gắng kết nối với MetaMask bằng cách gọi [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Việc gọi hàm này sẽ mở MetaMask trong trình duyệt, qua đó người dùng sẽ được nhắc kết nối ví của họ với ứng dụng phi tập trung của bạn.

- Nếu người dùng chọn kết nối, `method: "eth_requestAccounts"` sẽ trả về một mảng chứa tất cả các địa chỉ tài khoản của người dùng đã kết nối với ứng dụng phi tập trung. Nói chung, hàm `connectWallet` của chúng ta sẽ trả về một đối tượng JSON chứa `address` _đầu tiên_ trong mảng này (xem dòng 9) và một thông báo `status` nhắc người dùng viết một tin nhắn cho hợp đồng thông minh.
- Nếu người dùng từ chối kết nối, thì đối tượng JSON sẽ chứa một chuỗi rỗng cho `address` được trả về và một thông báo `status` phản ánh rằng người dùng đã từ chối kết nối.

Bây giờ chúng ta đã viết hàm `connectWallet` này, bước tiếp theo là gọi nó đến thành phần `HelloWorld.js` của chúng ta.

#### Thêm hàm `connectWallet` vào Thành phần giao diện người dùng `HelloWorld.js` của bạn {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

Điều hướng đến hàm `connectWalletPressed` trong `HelloWorld.js` và cập nhật nó thành như sau:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Lưu ý cách hầu hết các chức năng của chúng ta được trừu tượng hóa khỏi thành phần `HelloWorld.js` từ tệp `interact.js`? Điều này là để chúng ta tuân thủ mô hình M-V-C!

Trong `connectWalletPressed`, chúng ta chỉ cần thực hiện một lệnh gọi await đến hàm `connectWallet` đã nhập của mình, và sử dụng phản hồi của nó, chúng ta cập nhật các biến `status` và `walletAddress` của mình thông qua các hook trạng thái của chúng.

Bây giờ, hãy lưu cả hai tệp (`HelloWorld.js` và `interact.js`) và kiểm tra giao diện người dùng của chúng ta cho đến nay.

Mở trình duyệt của bạn trên trang [http://localhost:3000/](http://localhost:3000/) và nhấn nút "Kết nối Ví" ở trên cùng bên phải của trang.

Nếu bạn đã cài đặt MetaMask, bạn sẽ được nhắc kết nối ví của mình với ứng dụng phi tập trung của bạn. Chấp nhận lời mời kết nối.

Bạn sẽ thấy rằng nút ví bây giờ phản ánh rằng địa chỉ của bạn đã được kết nối! Tuyệt vời 🔥

Tiếp theo, hãy thử làm mới trang... Điều này thật lạ. Nút ví của chúng ta đang nhắc chúng ta kết nối MetaMask, mặc dù nó đã được kết nối...

Tuy nhiên, đừng sợ! Chúng ta có thể dễ dàng giải quyết vấn đề đó (bạn hiểu chứ?) bằng cách triển khai `getCurrentWalletConnected`, sẽ kiểm tra xem một địa chỉ đã được kết nối với ứng dụng phi tập trung của chúng ta hay chưa và cập nhật giao diện người dùng của chúng ta cho phù hợp!

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
          status: "👆🏽 Viết một thông điệp vào trường văn bản ở trên.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Kết nối với MetaMask bằng nút trên cùng bên phải.",
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
              Bạn phải cài đặt MetaMask, một ví Ethereum ảo, trong trình duyệt của bạn.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Mã này _rất_ tương tự như hàm `connectWallet` mà chúng ta vừa viết ở bước trước.

Sự khác biệt chính là thay vì gọi phương thức `eth_requestAccounts`, phương thức này sẽ mở MetaMask để người dùng kết nối ví của họ, ở đây chúng ta gọi phương thức `eth_accounts`, phương thức này chỉ đơn giản trả về một mảng chứa các địa chỉ MetaMask hiện đang được kết nối với ứng dụng phi tập trung của chúng ta.

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

Lưu ý, chúng ta sử dụng phản hồi của lệnh gọi đến `getCurrentWalletConnected` để cập nhật các biến trạng thái `walletAddress` và `status` của mình.

Bây giờ bạn đã thêm mã này, hãy thử làm mới cửa sổ trình duyệt của chúng ta.

Tuyệt vời! Nút sẽ hiển thị rằng bạn đã kết nối và hiển thị bản xem trước địa chỉ ví đã kết nối của bạn - ngay cả sau khi bạn làm mới!

#### Triển khai `addWalletListener` {#implement-addwalletlistener}

Bước cuối cùng trong quá trình thiết lập ví ứng dụng phi tập trung của chúng ta là triển khai trình nghe ví để UI của chúng ta cập nhật khi trạng thái ví thay đổi, chẳng hạn như khi người dùng ngắt kết nối hoặc chuyển đổi tài khoản.

Trong tệp `HelloWorld.js` của bạn, sửa đổi hàm `addWalletListener` của bạn như sau:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Viết một thông điệp vào trường văn bản ở trên.")
      } else {
        setWallet("")
        setStatus("🦊 Kết nối với MetaMask bằng nút trên cùng bên phải.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Bạn phải cài đặt MetaMask, một ví Ethereum ảo, trong trình duyệt của bạn.
        </a>
      </p>
    )
  }
}
```

Tôi cá là bạn thậm chí không cần sự trợ giúp của chúng tôi để hiểu những gì đang diễn ra ở đây vào thời điểm này, nhưng vì mục đích kỹ lưỡng, hãy nhanh chóng phân tích nó:

- Đầu tiên, hàm của chúng ta kiểm tra xem `window.ethereum` có được bật hay không (tức là MetaMask đã được cài đặt).
  - Nếu không, chúng ta chỉ cần thiết lập biến trạng thái `status` của mình thành một chuỗi JSX nhắc người dùng cài đặt MetaMask.
  - Nếu nó được bật, chúng ta sẽ thiết lập trình nghe `window.ethereum.on("accountsChanged")` trên dòng 3 để lắng nghe các thay đổi trạng thái trong ví MetaMask, bao gồm khi người dùng kết nối thêm một tài khoản vào ứng dụng phi tập trung, chuyển đổi tài khoản hoặc ngắt kết nối một tài khoản. Nếu có ít nhất một tài khoản được kết nối, biến trạng thái `walletAddress` sẽ được cập nhật thành tài khoản đầu tiên trong mảng `accounts` được trả về bởi trình nghe. Ngược lại, `walletAddress` được đặt thành một chuỗi rỗng.

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

Vậy là xong! Chúng ta đã hoàn thành thành công việc lập trình tất cả các chức năng ví của mình! Bây giờ đến nhiệm vụ cuối cùng của chúng ta: cập nhật thông điệp được lưu trữ trong hợp đồng thông minh của chúng ta!

### Bước 6: Triển khai hàm `updateMessage` {#step-6-implement-the-updateMessage-function}

Được rồi các bạn, chúng ta đã đến chặng cuối cùng! Trong `updateMessage` của tệp `interact.js` của bạn, chúng ta sẽ làm những việc sau:

1. Đảm bảo thông điệp chúng ta muốn xuất bản trong liên hệ thông minh của mình là hợp lệ
2. Ký giao dịch của chúng ta bằng MetaMask
3. Gọi hàm này từ thành phần giao diện người dùng `HelloWorld.js` của chúng ta

Điều này sẽ không mất nhiều thời gian; hãy hoàn thành ứng dụng phi tập trung này!

#### Xử lý lỗi đầu vào {#input-error-handling}

Đương nhiên, việc có một số loại xử lý lỗi đầu vào ở đầu hàm là hợp lý.

Chúng ta sẽ muốn hàm của mình trả về sớm nếu không có tiện ích mở rộng MetaMask nào được cài đặt, không có ví nào được kết nối (tức là `address` được truyền vào là một chuỗi trống), hoặc `message` là một chuỗi trống. Hãy thêm xử lý lỗi sau vào `updateMessage`:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Kết nối ví MetaMask của bạn để cập nhật thông điệp trên chuỗi khối.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Thông điệp của bạn không thể là một chuỗi trống.",
    }
  }
}
```

Bây giờ nó đã có xử lý lỗi đầu vào phù hợp, đã đến lúc ký giao dịch qua MetaMask!

#### Ký giao dịch của chúng ta {#signing-our-transaction}

Nếu bạn đã quen thuộc với các giao dịch Ethereum web3 truyền thống, mã chúng ta viết tiếp theo sẽ rất quen thuộc. Bên dưới mã xử lý lỗi đầu vào của bạn, thêm nội dung sau vào `updateMessage`:

```javascript
// interact.js

//thiết lập các tham số giao dịch
const transactionParameters = {
  to: contractAddress, // Bắt buộc trừ khi xuất bản hợp đồng.
  from: address, // phải khớp với địa chỉ đang hoạt động của người dùng.
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
          Xem trạng thái giao dịch của bạn trên Etherscan!
        </a>
        <br />
        ℹ️ Sau khi giao dịch được mạng xác minh, thông điệp sẽ được
        cập nhật tự động.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

Hãy cùng phân tích xem điều gì đang xảy ra. Đầu tiên, chúng ta thiết lập các tham số giao dịch của mình, trong đó:

- `to` chỉ định địa chỉ người nhận (hợp đồng thông minh của chúng ta)
- `from` chỉ định người ký giao dịch, biến `address` mà chúng ta đã truyền vào hàm của mình
- `data` chứa lệnh gọi đến phương thức `update` của hợp đồng thông minh Hello World của chúng ta, nhận biến chuỗi `message` của chúng ta làm đầu vào

Sau đó, chúng tôi thực hiện một lệnh gọi await, `window.ethereum.request`, trong đó chúng tôi yêu cầu MetaMask ký giao dịch. Lưu ý, ở dòng 11 và 12, chúng ta đang chỉ định phương thức eth của mình, `eth_sendTransaction` và truyền vào `transactionParameters` của chúng ta.

Tại thời điểm này, MetaMask sẽ mở ra trong trình duyệt và nhắc người dùng ký hoặc từ chối giao dịch.

- Nếu giao dịch thành công, hàm sẽ trả về một đối tượng JSON trong đó chuỗi JSX `status` nhắc người dùng kiểm tra Etherscan để biết thêm thông tin về giao dịch của họ.
- Nếu giao dịch thất bại, hàm sẽ trả về một đối tượng JSON trong đó chuỗi `status` chuyển tiếp thông điệp lỗi.

Nói chung, hàm `updateMessage` của chúng ta sẽ trông như thế này:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //xử lý lỗi đầu vào
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Kết nối ví MetaMask của bạn để cập nhật thông điệp trên chuỗi khối.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Thông điệp của bạn không thể là một chuỗi trống.",
    }
  }

  //thiết lập các tham số giao dịch
  const transactionParameters = {
    to: contractAddress, // Bắt buộc trừ khi xuất bản hợp đồng.
    from: address, // phải khớp với địa chỉ đang hoạt động của người dùng.
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
            Xem trạng thái giao dịch của bạn trên Etherscan!
          </a>
          <br />
          ℹ️ Sau khi giao dịch được mạng xác minh, thông điệp sẽ được
          cập nhật tự động.
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

Cuối cùng nhưng không kém phần quan trọng, chúng ta cần kết nối hàm `updateMessage` của mình với thành phần `HelloWorld.js`.

#### Kết nối `updateMessage` với giao diện người dùng `HelloWorld.js` {#connect-updatemessage-to-the-helloworld-js-frontend}

Hàm `onUpdatePressed` của chúng ta sẽ thực hiện một lệnh gọi await đến hàm `updateMessage` được nhập và sửa đổi biến trạng thái `status` để phản ánh xem giao dịch của chúng ta đã thành công hay thất bại:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

Nó siêu gọn gàng và đơn giản. Và đoán xem... ỨNG DỤNG PHI TẬP TRUNG CỦA BẠN ĐÃ HOÀN THÀNH!!!

Hãy tiếp tục và kiểm tra nút **Cập nhật**!

### Tạo ứng dụng phi tập trung tùy chỉnh của riêng bạn {#make-your-own-custom-dapp}

Wooooo, bạn đã đi đến cuối hướng dẫn! Để tóm tắt, bạn đã học cách:

- Kết nối ví MetaMask với dự án ứng dụng phi tập trung của bạn
- Đọc dữ liệu từ hợp đồng thông minh của bạn bằng cách sử dụng Giao diện Lập trình Ứng dụng [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3)
- Ký các giao dịch Ethereum bằng MetaMask

Bây giờ bạn đã được trang bị đầy đủ để áp dụng các kỹ năng từ hướng dẫn này để xây dựng dự án ứng dụng phi tập trung tùy chỉnh của riêng bạn! Như mọi khi, nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi để được trợ giúp trong [Alchemy Discord](https://discord.gg/gWuC7zB). 🧙‍♂️

Sau khi hoàn thành hướng dẫn này, hãy cho chúng tôi biết trải nghiệm của bạn như thế nào hoặc nếu bạn có bất kỳ phản hồi nào bằng cách gắn thẻ chúng tôi trên Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
