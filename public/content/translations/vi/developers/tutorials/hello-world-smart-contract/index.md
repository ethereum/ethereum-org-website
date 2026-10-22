---
title: "Hợp đồng thông minh Hello World cho người mới bắt đầu"
description: "Hướng dẫn nhập môn về cách viết và triển khai một hợp đồng thông minh đơn giản trên Ethereum."
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "hợp đồng thông minh", "triển khai"]
skill: beginner
breadcrumb: "Hợp đồng Hello World"
lang: vi
published: 2021-03-31
---

Nếu bạn mới làm quen với việc phát triển Chuỗi khối và không biết bắt đầu từ đâu, hoặc nếu bạn chỉ muốn hiểu cách triển khai và tương tác với các hợp đồng thông minh, thì hướng dẫn này là dành cho bạn. Chúng ta sẽ cùng nhau tạo và triển khai một hợp đồng thông minh đơn giản trên mạng lưới thử nghiệm Sepolia bằng cách sử dụng Ví ảo [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/) và [Alchemy](https://www.alchemy.com/eth) (đừng lo lắng nếu bạn chưa hiểu bất kỳ điều nào trong số này, chúng tôi sẽ giải thích).

Sau khi hợp đồng của bạn được triển khai, bạn có thể [xây dựng giao diện người dùng cho nó](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Nếu bạn có thắc mắc ở bất kỳ thời điểm nào, đừng ngần ngại liên hệ trong [Discord của Alchemy](https://discord.gg/gWuC7zB)!

## Bước 1: Kết nối với mạng lưới Ethereum {#step-1}

Có nhiều cách để tạo yêu cầu đến chuỗi Ethereum. Để đơn giản, chúng ta sẽ sử dụng một tài khoản miễn phí trên Alchemy, một nền tảng phát triển chuỗi khối và API cho phép chúng ta giao tiếp với chuỗi Ethereum mà không cần phải chạy các nút của riêng mình. Nền tảng này cũng có các công cụ dành cho nhà phát triển để giám sát và phân tích mà chúng ta sẽ tận dụng trong hướng dẫn này để hiểu những gì đang diễn ra bên trong (under the hood) việc triển khai hợp đồng thông minh của chúng ta. Nếu bạn chưa có tài khoản Alchemy, [bạn có thể đăng ký miễn phí tại đây](https://dashboard.alchemy.com/signup).

## Bước 2: Tạo ứng dụng của bạn (và khóa API) {#step-2}

Sau khi bạn đã tạo tài khoản Alchemy, bạn có thể tạo khóa API bằng cách tạo một ứng dụng. Điều này sẽ cho phép chúng ta tạo các yêu cầu đến mạng lưới thử nghiệm Sepolia. Nếu bạn chưa quen với các mạng lưới thử nghiệm (testnet), hãy xem [trang này](/developers/docs/networks/).

1.  Điều hướng đến trang "Create new app" (Tạo ứng dụng mới) trong Bảng điều khiển Alchemy của bạn bằng cách chọn "Select an app" (Chọn một ứng dụng) trên thanh điều hướng và nhấp vào "Create new app"

![Hello world create app](./hello-world-create-app.png)

2. Đặt tên cho ứng dụng của bạn là “Hello World”, cung cấp một mô tả ngắn và chọn một trường hợp sử dụng, ví dụ: "Infra & Tooling". Tiếp theo, tìm kiếm "Ethereum" và chọn mạng lưới.

![create app view hello world](./create-app-view-hello-world.png)

3. Nhấp vào "Next" (Tiếp theo) để tiếp tục, sau đó nhấp vào “Create app” (Tạo ứng dụng) và thế là xong! Ứng dụng của bạn sẽ xuất hiện trong menu thả xuống của thanh điều hướng, với một Khóa API có sẵn để sao chép.

## Bước 3: Tạo Tài khoản Ethereum (Địa chỉ) {#step-3}

Chúng ta cần một Tài khoản Ethereum để gửi và nhận các giao dịch. Đối với hướng dẫn này, chúng ta sẽ sử dụng MetaMask, một Ví ảo trên trình duyệt được sử dụng để quản lý Địa chỉ Tài khoản Ethereum của bạn. Tìm hiểu thêm về [các giao dịch](/developers/docs/transactions/).

Bạn có thể tải xuống MetaMask và tạo một Tài khoản Ethereum miễn phí [tại đây](https://metamask.io/download). Khi bạn đang tạo Tài khoản, hoặc nếu bạn đã có Tài khoản, hãy đảm bảo chuyển sang mạng lưới thử nghiệm "Sepolia" bằng menu thả xuống của mạng lưới (để chúng ta không phải giao dịch bằng tiền thật).

Nếu bạn không thấy Sepolia trong danh sách, hãy mở menu ở góc trên cùng bên phải, chọn "Networks" (Mạng lưới) và bật "Show test networks" (Hiển thị mạng lưới thử nghiệm) ở cuối danh sách mạng lưới (xem [hướng dẫn của MetaMask về cách xem các mạng lưới thử nghiệm](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)). Sau đó chọn "Sepolia" trong menu chọn mạng lưới.

![metamask sepolia example](./metamask-sepolia-example.png)

## Bước 4: Thêm ether từ một vòi {#step-4}

Để triển khai hợp đồng thông minh của chúng ta lên mạng lưới thử nghiệm, chúng ta sẽ cần một ít ETH giả. Để nhận ETH Sepolia, bạn có thể truy cập [chi tiết mạng lưới Sepolia](/developers/docs/networks/#sepolia) để xem danh sách các vòi khác nhau. Nếu một vòi không hoạt động, hãy thử vòi khác vì đôi khi chúng có thể cạn kiệt. Một số vòi có các quy tắc về điều kiện; ví dụ: vòi Sepolia của Alchemy yêu cầu Địa chỉ nhận phải giữ ít nhất 0.001 ETH trên Mạng chính Ethereum. Có thể mất một chút thời gian để nhận được ETH giả của bạn do lưu lượng truy cập mạng lưới. Bạn sẽ thấy ETH trong Tài khoản MetaMask của mình ngay sau đó!

## Bước 5: Kiểm tra số dư của bạn {#step-5}

Để kiểm tra lại xem số dư của chúng ta đã có ở đó chưa, hãy tạo một yêu cầu [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) bằng cách sử dụng [công cụ composer của Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Điều này sẽ trả về số lượng ETH trong ví của chúng ta. Sau khi bạn nhập địa chỉ tài khoản MetaMask của mình và nhấp vào “Send Request” (Gửi yêu cầu), bạn sẽ thấy một phản hồi như thế này:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **LƯU Ý:** Kết quả này tính bằng wei chứ không phải ETH. Wei được sử dụng làm mệnh giá nhỏ nhất của ether. Tỷ lệ chuyển đổi từ wei sang ETH là: 1 eth = 10<sup>18</sup> wei. Vì vậy, nếu chúng ta chuyển đổi 0x2B5E3AF16B1880000 sang hệ thập phân, chúng ta nhận được 5\*10¹⁸, tương đương với 5 ETH.
>
> Phù! Tiền giả của chúng ta đã ở đó <Emoji text=":money_mouth_face:" size={1} />.

## Bước 6: Khởi tạo dự án của chúng ta {#step-6}

Đầu tiên, chúng ta sẽ cần tạo một thư mục cho dự án của mình. Điều hướng đến dòng lệnh của bạn và nhập:

```sh
mkdir hello-world
cd hello-world
```

Bây giờ chúng ta đang ở trong thư mục dự án của mình, chúng ta sẽ sử dụng `npm init` để khởi tạo dự án. Nếu bạn chưa cài đặt npm, hãy làm theo [hướng dẫn cài đặt Node.js](https://nodejs.org/en/download/) (chúng ta sẽ cần Node.js và npm cho hướng dẫn này).

```sh
npm init
```

Cách bạn trả lời các câu hỏi cài đặt không thực sự quan trọng, đây là cách chúng tôi đã làm để bạn tham khảo:

```text
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

Chấp thuận tệp package.json. Hardhat 3, mà chúng ta sẽ cài đặt tiếp theo, chỉ hỗ trợ các dự án ES module, vì vậy hãy đánh dấu dự án là một ES module:

```sh
npm pkg set type=module
```

Và chúng ta đã sẵn sàng!

## Bước 7: Tải xuống [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

Hardhat là một môi trường phát triển để biên dịch, triển khai, kiểm thử và gỡ lỗi phần mềm Ethereum của bạn. Nó giúp các nhà phát triển khi xây dựng các hợp đồng thông minh và ứng dụng phi tập trung (dapp) cục bộ trước khi triển khai lên Chuỗi trực tiếp.

Hardhat 3 yêu cầu Node.js v22.13.0 trở lên. Bên trong dự án `hello-world` của chúng ta, hãy chạy:

```sh
npm install --save-dev hardhat
```

Hãy xem trang này để biết thêm chi tiết về [hướng dẫn cài đặt](https://hardhat.org/docs/getting-started).

## Bước 8: Tạo dự án Hardhat {#step-8}

Chạy `npx hardhat --init` sẽ tạo ra một dự án mẫu hoàn chỉnh, nhưng đối với hướng dẫn này, chúng ta sẽ thiết lập mọi thứ theo cách thủ công để bạn có thể thấy từng phần. Trong thư mục gốc của dự án, hãy tạo một tệp có tên `hardhat.config.js` với nội dung sau:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Đây là nơi chúng ta sẽ chỉ định tất cả các thiết lập cho dự án của mình (ở bước 13). Hiện tại, nó chỉ cho Hardhat biết phiên bản trình biên dịch Solidity nào sẽ được sử dụng.

## Bước 9: Thêm các thư mục dự án {#step-9}

Để giữ cho dự án của chúng ta được tổ chức tốt, chúng ta sẽ tạo hai thư mục mới. Điều hướng đến thư mục gốc của dự án trong dòng lệnh của bạn và nhập:

```
mkdir contracts
mkdir scripts
```

- `contracts/` là nơi chúng ta sẽ lưu giữ tệp mã hợp đồng thông minh hello world của mình
- `scripts/` là nơi chúng ta sẽ lưu giữ các tập lệnh để triển khai và tương tác với hợp đồng của mình

## Bước 10: Viết hợp đồng của chúng ta {#step-10}

Bạn có thể đang tự hỏi, rốt cuộc thì khi nào chúng ta mới viết mã?? Chà, chúng ta đang ở đây, ở bước 10.

Mở dự án hello-world trong trình soạn thảo yêu thích của bạn (chúng tôi thích [VSCode](https://code.visualstudio.com/)). Các hợp đồng thông minh được viết bằng một ngôn ngữ gọi là Solidity, đây là ngôn ngữ chúng ta sẽ sử dụng để viết hợp đồng thông minh HelloWorld.sol của mình.‌

1.  Điều hướng đến thư mục “contracts” và tạo một tệp mới có tên HelloWorld.sol
2.  Dưới đây là một hợp đồng thông minh Hello World mẫu từ Tổ chức Ethereum mà chúng ta sẽ sử dụng cho hướng dẫn này. Sao chép và dán nội dung bên dưới vào tệp HelloWorld.sol của bạn và đảm bảo đọc các bình luận để hiểu hợp đồng này làm gì:

```solidity
// SPDX-License-Identifier: MIT
// Chỉ định phiên bản của Solidity, sử dụng lập phiên bản theo ngữ nghĩa.
// Tìm hiểu thêm: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// Định nghĩa một hợp đồng có tên là `HelloWorld`.
// Một hợp đồng là một tập hợp các hàm và dữ liệu (trạng thái của nó). Sau khi được triển khai, một hợp đồng nằm tại một Địa chỉ cụ thể trên Chuỗi khối Ethereum. Tìm hiểu thêm: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // Khai báo một biến trạng thái `message` có kiểu `string`.
   // Các biến trạng thái là các biến mà giá trị của chúng được lưu trữ vĩnh viễn trong bộ nhớ của hợp đồng. Từ khóa `public` làm cho các biến có thể truy cập được từ bên ngoài một hợp đồng và tạo ra một hàm mà các hợp đồng hoặc máy khách khác có thể gọi để truy cập giá trị.
   string public message;

   // Tương tự như nhiều ngôn ngữ lập trình hướng đối tượng dựa trên lớp, một hàm khởi tạo là một hàm đặc biệt chỉ được thực thi khi tạo hợp đồng.
   // Các hàm khởi tạo được sử dụng để khởi tạo dữ liệu của hợp đồng. Tìm hiểu thêm: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // Chấp nhận một đối số chuỗi `initMessage` và thiết lập giá trị vào biến lưu trữ `message` của hợp đồng).
      message = initMessage;
   }

   // Một hàm công khai chấp nhận một đối số chuỗi và cập nhật biến lưu trữ `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Đây là một hợp đồng thông minh cực kỳ đơn giản lưu trữ một thông điệp khi được tạo và có thể được cập nhật bằng cách gọi hàm `update`.

## Bước 11: Kết nối MetaMask & Alchemy với dự án của bạn {#step-11}

Chúng ta đã tạo một Ví MetaMask, Tài khoản Alchemy và viết hợp đồng thông minh của mình, bây giờ là lúc kết nối cả ba.

Mỗi giao dịch được gửi từ Ví ảo của bạn đều yêu cầu một chữ ký sử dụng khóa riêng tư duy nhất của bạn. Để cung cấp cho chương trình của chúng ta quyền này, chúng ta có thể lưu trữ an toàn khóa riêng tư (và khóa API Alchemy) trong một tệp môi trường.

> Để tìm hiểu thêm về việc gửi các giao dịch, hãy xem [tài liệu về giao dịch](/developers/docs/transactions/).

Tạo một tệp `.env` trong thư mục gốc của dự án và thêm khóa riêng tư MetaMask cũng như URL API Alchemy HTTP của bạn vào đó.

- Làm theo [các hướng dẫn này](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) để xuất khóa riêng tư của bạn
- Xem bên dưới để lấy URL API Alchemy HTTP

![get alchemy api key](./get-alchemy-api-key.png)

Sao chép URL API Alchemy

Tệp `.env` của bạn sẽ trông như thế này:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Để thực sự kết nối những thứ này với mã của chúng ta, chúng ta sẽ tham chiếu các biến này trong tệp `hardhat.config.js` ở bước 13. Node.js có thể tự đọc các tệp `.env`, vì vậy không cần cài đặt thêm gói nào.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Đừng commit <code>.env</code>! Vui lòng đảm bảo không bao giờ chia sẻ hoặc để lộ tệp <code>.env</code> của bạn với bất kỳ ai, vì làm như vậy bạn đang làm lộ các bí mật của mình. Nếu bạn đang sử dụng quản lý phiên bản, hãy thêm <code>.env</code> của bạn vào tệp <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Bước 12: Cài đặt Ethers.js {#step-12-install-ethersjs}

Ethers.js là một Thư viện giúp việc tương tác và tạo các yêu cầu đến Ethereum dễ dàng hơn bằng cách bao bọc [các phương thức JSON-RPC tiêu chuẩn](/developers/docs/apis/json-rpc/) bằng các phương thức thân thiện với người dùng hơn.

Hardhat giúp việc tích hợp [các Plugin](https://hardhat.org/docs/plugins/official-plugins) cho các công cụ bổ sung và chức năng mở rộng trở nên cực kỳ dễ dàng. Chúng ta sẽ tận dụng [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) cho việc triển khai hợp đồng ([Ethers.js](https://docs.ethers.org/v6/) có một số phương thức triển khai hợp đồng cực kỳ gọn gàng).

Trong thư mục dự án của bạn, hãy nhập:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Chúng ta cũng sẽ thêm plugin vào `hardhat.config.js` của mình trong bước tiếp theo.

## Bước 13: Cập nhật hardhat.config.js {#step-13-update-hardhatconfigjs}

Cho đến nay, chúng ta đã thêm một số phần phụ thuộc và plugin, bây giờ chúng ta cần cập nhật `hardhat.config.js` để dự án của chúng ta biết về tất cả chúng.

Cập nhật `hardhat.config.js` của bạn để trông như thế này:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Tải API_URL và PRIVATE_KEY từ tệp .env vào process.env, nếu nó tồn tại
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` yêu cầu Hardhat chỉ đọc từng giá trị từ một biến môi trường khi cần thiết, vì vậy các lệnh như `compile` vẫn hoạt động ngay cả trước khi các giá trị được thiết lập. Nếu bạn không muốn giữ khóa riêng tư của mình trong một tệp văn bản thuần túy, Hardhat cũng có thể đọc [các biến cấu hình từ một kho khóa được mã hóa](https://hardhat.org/docs/guides/configuration-variables).

## Bước 14: Biên dịch hợp đồng của chúng ta {#step-14-compile-our-contracts}

Để đảm bảo mọi thứ hoạt động tốt cho đến nay, hãy biên dịch hợp đồng của chúng ta. Tác vụ `compile` là một trong những tác vụ được tích hợp sẵn của Hardhat.

Từ dòng lệnh, hãy chạy:

```sh
npx hardhat compile
```

Lần đầu tiên bạn biên dịch, Hardhat sẽ tải xuống trình biên dịch Solidity. Sau đó, bạn sẽ thấy một cái gì đó giống như `Compiled 1 Solidity file with solc 0.8.34`. Nếu không, bạn luôn có thể nhắn tin trong [Discord của Alchemy](https://discord.gg/gWuC7zB).

## Bước 15: Viết tập lệnh triển khai của chúng ta {#step-15-write-our-deploy-scripts}

Bây giờ hợp đồng của chúng ta đã được viết và tệp cấu hình của chúng ta đã sẵn sàng, đã đến lúc viết tập lệnh triển khai hợp đồng của chúng ta.

Điều hướng đến thư mục `scripts/` và tạo một tệp mới có tên `deploy.js`, thêm nội dung sau vào đó:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// Bắt đầu việc triển khai, trả về một promise phân giải thành một đối tượng hợp đồng
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

Hãy cùng xem qua từng dòng mã này làm gì.

```js
const { ethers } = await network.create()
```

Trong Hardhat 3, một tập lệnh mở kết nối đến một mạng lưới một cách rõ ràng. `network.create()` kết nối với mạng lưới bạn chọn bằng tùy chọn `--network` khi bạn chạy tập lệnh và plugin `hardhat-ethers` thêm một đối tượng `ethers` vào kết nối đó.

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Một `ContractFactory` trong ethers.js là một sự trừu tượng hóa được sử dụng để triển khai các hợp đồng thông minh mới, vì vậy `HelloWorld` ở đây là một nhà máy (factory) cho các phiên bản của hợp đồng hello world của chúng ta. Khi sử dụng plugin `hardhat-ethers`, các phiên bản `ContractFactory` và `Contract` được kết nối với người ký đầu tiên theo mặc định.

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

Việc gọi `deploy()` trên một `ContractFactory` sẽ bắt đầu việc triển khai và trả về một `Promise` giải quyết thành một `Contract`. Đây là đối tượng có một phương thức cho mỗi hàm hợp đồng thông minh của chúng ta. Các đối số bạn truyền cho `deploy()` sẽ đi đến hàm khởi tạo của hợp đồng, ở đây là thông điệp ban đầu.

`waitForDeployment()` đợi cho đến khi giao dịch triển khai được đưa vào một khối và `getAddress()` trả về Địa chỉ của hợp đồng mới. Xem [tài liệu hợp đồng ethers.js](https://docs.ethers.org/v6/api/contract/) để biết thêm chi tiết.

## Bước 16: Triển khai hợp đồng của chúng ta {#step-16-deploy-our-contract}

Cuối cùng chúng ta đã sẵn sàng để triển khai hợp đồng thông minh của mình! Điều hướng đến dòng lệnh và chạy:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Sau đó, bạn sẽ thấy một cái gì đó giống như:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Nếu chúng ta truy cập [Etherscan Sepolia](https://sepolia.etherscan.io/) và tìm kiếm Địa chỉ hợp đồng của mình, chúng ta sẽ có thể thấy rằng nó đã được triển khai thành công. Giao dịch sẽ trông giống như thế này:

![etherscan contract](./etherscan-contract.png)

Địa chỉ `From` phải khớp với Địa chỉ Tài khoản MetaMask của bạn và Địa chỉ `To` sẽ ghi là “Contract Creation” (Tạo hợp đồng) nhưng nếu chúng ta nhấp vào giao dịch, chúng ta sẽ thấy Địa chỉ hợp đồng của mình trong trường `To`:

![etherscan transaction](./etherscan-transaction.png)

Chúc mừng! Bạn vừa triển khai một hợp đồng thông minh lên Chuỗi Ethereum 🎉

Để hiểu những gì đang diễn ra bên trong (under the hood), bạn có thể xem các yêu cầu mà ứng dụng "Hello World" của bạn nhận được trong [bảng điều khiển Alchemy](https://dashboard.alchemy.com/) của bạn.

Ở đó, bạn sẽ thấy một số lệnh gọi JSON-RPC mà Hardhat/Ethers đã thực hiện ngầm cho chúng ta khi chúng ta gọi hàm `.deploy()`. Hai lệnh gọi quan trọng cần nhắc đến ở đây là [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), là yêu cầu thực sự ghi hợp đồng của chúng ta lên Chuỗi Sepolia và [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) là yêu cầu đọc thông tin về giao dịch của chúng ta dựa trên Mã băm (một mẫu điển hình khi gửi các giao dịch). Để tìm hiểu thêm về việc gửi các giao dịch, hãy xem [tài liệu về giao dịch](/developers/docs/transactions/).

Đó là tất cả cho hướng dẫn này. Tiếp theo, bạn có thể [xây dựng giao diện người dùng cho hợp đồng của mình](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).
