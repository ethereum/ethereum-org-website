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

Nếu bạn mới làm quen với việc phát triển chuỗi khối và không biết bắt đầu từ đâu, hoặc nếu bạn chỉ muốn hiểu cách triển khai và tương tác với các hợp đồng thông minh, thì hướng dẫn này là dành cho bạn. Chúng ta sẽ cùng nhau tạo và triển khai một hợp đồng thông minh đơn giản trên mạng lưới thử nghiệm Sepolia bằng cách sử dụng ví ảo [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), và [Alchemy](https://www.alchemy.com/eth) (đừng lo lắng nếu bạn chưa hiểu bất kỳ điều nào trong số này, chúng tôi sẽ giải thích).

Trong [phần 2](/developers/tutorials/hello-world-smart-contract-fullstack/#part-2-interact-with-your-smart-contract) của hướng dẫn này, chúng ta sẽ tìm hiểu cách tương tác với hợp đồng thông minh của mình sau khi nó được triển khai tại đây, và trong [phần 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan), chúng ta sẽ đề cập đến cách xuất bản nó trên Etherscan.

Nếu bạn có câu hỏi ở bất kỳ thời điểm nào, đừng ngần ngại liên hệ trong [Discord của Alchemy](https://discord.gg/gWuC7zB)!

## Bước 1: Kết nối với mạng lưới Ethereum {#step-1}

Có nhiều cách để tạo yêu cầu đến chuỗi Ethereum. Để đơn giản, chúng ta sẽ sử dụng một tài khoản miễn phí trên Alchemy, một nền tảng phát triển chuỗi khối và API cho phép chúng ta giao tiếp với chuỗi Ethereum mà không cần phải chạy các nút của riêng mình. Nền tảng này cũng có các công cụ dành cho nhà phát triển để giám sát và phân tích mà chúng ta sẽ tận dụng trong hướng dẫn này để hiểu những gì đang diễn ra bên trong (under the hood) việc triển khai hợp đồng thông minh của chúng ta. Nếu bạn chưa có tài khoản Alchemy, [bạn có thể đăng ký miễn phí tại đây](https://dashboard.alchemy.com/signup).

## Bước 2: Tạo ứng dụng của bạn (và khóa API) {#step-2}

Sau khi bạn đã tạo tài khoản Alchemy, bạn có thể tạo khóa API bằng cách tạo một ứng dụng. Điều này sẽ cho phép chúng ta tạo các yêu cầu đến mạng lưới thử nghiệm Sepolia. Nếu bạn chưa quen với các mạng lưới thử nghiệm (testnet), hãy xem [trang này](/developers/docs/networks/).

1.  Điều hướng đến trang "Create new app" (Tạo ứng dụng mới) trong Bảng điều khiển Alchemy của bạn bằng cách chọn "Select an app" (Chọn một ứng dụng) trên thanh điều hướng và nhấp vào "Create new app"

![Hello world create app](./hello-world-create-app.png)

2. Đặt tên cho ứng dụng của bạn là “Hello World”, cung cấp một mô tả ngắn và chọn một trường hợp sử dụng, ví dụ: "Infra & Tooling". Tiếp theo, tìm kiếm "Ethereum" và chọn mạng lưới.

![create app view hello world](./create-app-view-hello-world.png)

3. Nhấp vào "Next" (Tiếp theo) để tiếp tục, sau đó nhấp vào “Create app” (Tạo ứng dụng) và thế là xong! Ứng dụng của bạn sẽ xuất hiện trong menu thả xuống của thanh điều hướng, với một Khóa API có sẵn để sao chép.

## Bước 3: Tạo một tài khoản Ethereum (địa chỉ) {#step-3}

Chúng ta cần một tài khoản Ethereum để gửi và nhận các giao dịch. Đối với hướng dẫn này, chúng ta sẽ sử dụng MetaMask, một ví ảo trên trình duyệt được sử dụng để quản lý địa chỉ tài khoản Ethereum của bạn. Tìm hiểu thêm về [các giao dịch](/developers/docs/transactions/).

Bạn có thể tải xuống MetaMask và tạo một tài khoản Ethereum miễn phí [tại đây](https://metamask.io/download). Khi bạn đang tạo tài khoản, hoặc nếu bạn đã có tài khoản, hãy đảm bảo chuyển sang mạng lưới thử nghiệm "Sepolia" bằng cách sử dụng menu thả xuống của mạng lưới (để chúng ta không phải giao dịch bằng tiền thật).

Nếu bạn không thấy Sepolia được liệt kê, hãy vào menu, sau đó chọn Advanced (Nâng cao) và cuộn xuống để bật "Show test networks" (Hiển thị mạng lưới thử nghiệm). Trong menu chọn mạng lưới, hãy chọn tab "Custom" (Tùy chỉnh) để tìm danh sách các mạng lưới thử nghiệm và chọn "Sepolia."

![metamask sepolia example](./metamask-sepolia-example.png)

## Bước 4: Thêm ether từ một vòi {#step-4}

Để triển khai hợp đồng thông minh của chúng ta lên mạng lưới thử nghiệm, chúng ta sẽ cần một ít ETH giả. Để nhận Sepolia ETH, bạn có thể truy cập [chi tiết mạng lưới Sepolia](/developers/docs/networks/#sepolia) để xem danh sách các vòi khác nhau. Nếu một vòi không hoạt động, hãy thử vòi khác vì đôi khi chúng có thể cạn kiệt. Có thể mất một chút thời gian để nhận được ETH giả của bạn do lưu lượng truy cập mạng lưới. Bạn sẽ thấy ETH trong tài khoản MetaMask của mình ngay sau đó!

## Bước 5: Kiểm tra số dư của bạn {#step-5}

Để kiểm tra lại xem số dư của chúng ta đã có ở đó chưa, hãy tạo một yêu cầu [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) bằng cách sử dụng [công cụ composer của Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Điều này sẽ trả về số lượng ETH trong ví của chúng ta. Sau khi bạn nhập địa chỉ tài khoản MetaMask của mình và nhấp vào “Send Request” (Gửi yêu cầu), bạn sẽ thấy một phản hồi như thế này:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **LƯU Ý:** Kết quả này tính bằng wei chứ không phải ETH. Wei được sử dụng làm mệnh giá nhỏ nhất của ether. Tỷ lệ chuyển đổi từ wei sang ETH là: 1 eth = 10<sup>18</sup> wei. Vì vậy, nếu chúng ta chuyển đổi 0x2B5E3AF16B1880000 sang hệ thập phân, chúng ta nhận được 5\*10¹⁸, tương đương với 5 ETH.
>
> Phù! Tiền giả của chúng ta đã ở đó <Emoji text=":money_mouth_face:" size={1} />.

## Bước 6: Khởi tạo dự án của chúng ta

Đầu tiên, chúng ta sẽ cần tạo một thư mục cho dự án của mình. Điều hướng đến dòng lệnh của bạn và nhập:

```
mkdir hello-world
cd hello-world
```

Bây giờ chúng ta đã ở trong thư mục dự án của mình, chúng ta sẽ sử dụng `npm init` để khởi tạo dự án. Nếu bạn chưa cài đặt npm, hãy làm theo [hướng dẫn cài đặt Node.js](https://nodejs.org/en/download/) (chúng ta sẽ cần Node.js và npm cho hướng dẫn này).

```
npm init
```

Cách bạn trả lời các câu hỏi cài đặt không thực sự quan trọng, đây là cách chúng tôi đã làm để bạn tham khảo:

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Chấp thuận package.json và chúng ta đã sẵn sàng!
## Bước 7: Tải xuống [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat là một môi trường phát triển để biên dịch, triển khai, thử nghiệm và gỡ lỗi phần mềm Ethereum của bạn. Nó giúp các nhà phát triển khi xây dựng các hợp đồng thông minh và ứng dụng phi tập trung (dapp) cục bộ trước khi triển khai lên chuỗi trực tiếp.

Bên trong dự án `hello-world` của chúng ta, hãy chạy:

```
npm install --save-dev hardhat
```

Hãy xem trang này để biết thêm chi tiết về [hướng dẫn cài đặt](https://hardhat.org/getting-started/#overview).

## Bước 8: Tạo dự án Hardhat {#step-8}

Bên trong thư mục dự án của chúng ta, hãy chạy:

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Điều này sẽ tạo ra một tệp `hardhat.config.js` cho chúng ta, đây là nơi chúng ta sẽ chỉ định tất cả các thiết lập cho dự án của mình (ở bước 13).

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

1.  Điều hướng đến thư mục “contracts” và tạo một tệp mới có tên là HelloWorld.sol
2.  Dưới đây là một hợp đồng thông minh Hello World mẫu từ Tổ chức Ethereum mà chúng ta sẽ sử dụng cho hướng dẫn này. Sao chép và dán nội dung bên dưới vào tệp HelloWorld.sol của bạn và đảm bảo đọc các nhận xét để hiểu hợp đồng này làm gì:

```solidity
// Chỉ định phiên bản của Solidity, sử dụng lập phiên bản theo ngữ nghĩa.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Định nghĩa một hợp đồng có tên là `HelloWorld`.
// Một hợp đồng là một tập hợp các hàm và dữ liệu (trạng thái của nó). Sau khi được triển khai, một hợp đồng nằm tại một Địa chỉ cụ thể trên Chuỗi khối Ethereum. Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Khai báo một biến trạng thái `message` có kiểu `string`.
   // Các biến trạng thái là các biến mà giá trị của chúng được lưu trữ vĩnh viễn trong bộ nhớ của hợp đồng. Từ khóa `public` làm cho các biến có thể được truy cập từ bên ngoài một hợp đồng và tạo ra một hàm mà các hợp đồng hoặc máy khách khác có thể gọi để truy cập giá trị.
   string public message;

   // Tương tự như nhiều ngôn ngữ hướng đối tượng dựa trên lớp, hàm khởi tạo là một hàm đặc biệt chỉ được thực thi khi tạo hợp đồng.
   // Các hàm khởi tạo được sử dụng để khởi tạo dữ liệu của hợp đồng. Tìm hiểu thêm:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
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

Đây là một hợp đồng thông minh cực kỳ đơn giản, lưu trữ một thông điệp khi được tạo và có thể được cập nhật bằng cách gọi hàm `update`.

## Bước 11: Kết nối MetaMask & Alchemy với dự án của bạn {#step-11}

Chúng ta đã tạo một ví MetaMask, tài khoản Alchemy và viết hợp đồng thông minh của mình, bây giờ là lúc kết nối cả ba.

Mọi giao dịch được gửi từ ví ảo của bạn đều yêu cầu một chữ ký sử dụng khóa riêng tư duy nhất của bạn. Để cung cấp cho chương trình của chúng ta quyền này, chúng ta có thể lưu trữ an toàn khóa riêng tư (và khóa API Alchemy) của mình trong một tệp môi trường.

> Để tìm hiểu thêm về việc gửi các giao dịch, hãy xem [hướng dẫn này](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) về cách gửi các giao dịch bằng Web3.

Đầu tiên, hãy cài đặt gói dotenv trong thư mục dự án của bạn:

```
npm install dotenv --save
```

Sau đó, tạo một tệp `.env` trong thư mục gốc của dự án của chúng ta và thêm khóa riêng tư MetaMask cũng như URL API HTTP Alchemy của bạn vào đó.

- Làm theo [các hướng dẫn này](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) để xuất khóa riêng tư của bạn
- Xem bên dưới để lấy URL API HTTP Alchemy

![get alchemy api key](./get-alchemy-api-key.png)

Sao chép URL API Alchemy

Tệp `.env` của bạn sẽ trông như thế này:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Để thực sự kết nối những thứ này với mã của chúng ta, chúng ta sẽ tham chiếu các biến này trong tệp `hardhat.config.js` của mình ở bước 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Đừng commit <code>.env</code>! Vui lòng đảm bảo không bao giờ chia sẻ hoặc để lộ tệp <code>.env</code> của bạn với bất kỳ ai, vì làm như vậy là bạn đang làm lộ các bí mật của mình. Nếu bạn đang sử dụng hệ thống kiểm soát phiên bản, hãy thêm <code>.env</code> của bạn vào tệp <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Bước 12: Cài đặt Ethers.js {#step-12-install-ethersjs}

Ethers.js là một thư viện giúp việc tương tác và tạo các yêu cầu đến Ethereum dễ dàng hơn bằng cách bao bọc [các phương thức JSON-RPC tiêu chuẩn](/developers/docs/apis/json-rpc/) bằng các phương thức thân thiện với người dùng hơn.

Hardhat giúp việc tích hợp [các Plugin](https://hardhat.org/plugins/) trở nên cực kỳ dễ dàng để có thêm công cụ và chức năng mở rộng. Chúng ta sẽ tận dụng [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) cho việc triển khai hợp đồng ([Ethers.js](https://github.com/ethers-io/ethers.js/) có một số phương thức triển khai hợp đồng cực kỳ gọn gàng).

Trong thư mục dự án của bạn, hãy nhập:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Chúng ta cũng sẽ yêu cầu ethers trong `hardhat.config.js` của mình ở bước tiếp theo.

## Bước 13: Cập nhật hardhat.config.js {#step-13-update-hardhatconfigjs}

Cho đến nay, chúng ta đã thêm một số phần phụ thuộc và plugin, bây giờ chúng ta cần cập nhật `hardhat.config.js` để dự án của chúng ta biết về tất cả chúng.

Cập nhật `hardhat.config.js` của bạn để trông như thế này:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## Bước 14: Biên dịch hợp đồng của chúng ta {#step-14-compile-our-contracts}

Để đảm bảo mọi thứ đang hoạt động tốt cho đến nay, hãy biên dịch hợp đồng của chúng ta. Tác vụ `compile` là một trong những tác vụ được tích hợp sẵn của hardhat.

Từ dòng lệnh, hãy chạy:

```
npx hardhat compile
```

Bạn có thể nhận được cảnh báo về `SPDX license identifier not provided in source file` , nhưng không cần phải lo lắng về điều đó — hy vọng mọi thứ khác đều ổn! Nếu không, bạn luôn có thể nhắn tin trong [Discord của Alchemy](https://discord.gg/u72VCg3).

## Bước 15: Viết tập lệnh triển khai của chúng ta {#step-15-write-our-deploy-scripts}

Bây giờ hợp đồng của chúng ta đã được viết và tệp cấu hình của chúng ta đã sẵn sàng, đã đến lúc viết tập lệnh triển khai hợp đồng của chúng ta.

Điều hướng đến thư mục `scripts/` và tạo một tệp mới có tên là `deploy.js` , thêm nội dung sau vào đó:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Bắt đầu triển khai, trả về một promise phân giải thành một đối tượng hợp đồng
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat làm rất tốt việc giải thích chức năng của từng dòng mã này trong [hướng dẫn về Hợp đồng](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) của họ, chúng tôi đã áp dụng các giải thích của họ ở đây.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Một `ContractFactory` trong ethers.js là một sự trừu tượng hóa được sử dụng để triển khai các hợp đồng thông minh mới, vì vậy `HelloWorld` ở đây là một nhà máy (factory) cho các phiên bản của hợp đồng hello world của chúng ta. Khi sử dụng plugin `hardhat-ethers`, các phiên bản `ContractFactory` và `Contract` được kết nối với người ký đầu tiên theo mặc định.

```
const hello_world = await HelloWorld.deploy();
```

Việc gọi `deploy()` trên một `ContractFactory` sẽ bắt đầu việc triển khai và trả về một `Promise` phân giải thành một `Contract`. Đây là đối tượng có một phương thức cho từng hàm hợp đồng thông minh của chúng ta.

## Bước 16: Triển khai hợp đồng của chúng ta {#step-16-deploy-our-contract}

Cuối cùng chúng ta đã sẵn sàng để triển khai hợp đồng thông minh của mình! Điều hướng đến dòng lệnh và chạy:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Sau đó, bạn sẽ thấy một cái gì đó giống như:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Nếu chúng ta truy cập [Etherscan của Sepolia](https://sepolia.etherscan.io/) và tìm kiếm địa chỉ hợp đồng của mình, chúng ta sẽ có thể thấy rằng nó đã được triển khai thành công. Giao dịch sẽ trông giống như thế này:

![etherscan contract](./etherscan-contract.png)

Địa chỉ `From` phải khớp với địa chỉ tài khoản MetaMask của bạn và địa chỉ To (Đến) sẽ ghi là “Contract Creation” (Tạo hợp đồng) nhưng nếu chúng ta nhấp vào giao dịch, chúng ta sẽ thấy địa chỉ hợp đồng của mình trong trường `To`:

![etherscan transaction](./etherscan-transaction.png)

Chúc mừng! Bạn vừa triển khai một hợp đồng thông minh lên chuỗi Ethereum 🎉

Để hiểu những gì đang diễn ra bên trong, hãy điều hướng đến tab Explorer (Trình khám phá) trong [bảng điều khiển Alchemy](https://dashboard.alchemy.com/explorer) của chúng ta. Nếu bạn có nhiều ứng dụng Alchemy, hãy đảm bảo lọc theo ứng dụng và chọn “Hello World”.
![hello world explorer](./hello-world-explorer.png)

Tại đây, bạn sẽ thấy một số lệnh gọi JSON-RPC mà Hardhat/Ethers đã thực hiện ngầm cho chúng ta khi chúng ta gọi hàm `.deploy()`. Hai lệnh gọi quan trọng cần nhắc đến ở đây là [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction), đây là yêu cầu thực sự ghi hợp đồng của chúng ta lên chuỗi Sepolia, và [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash) là yêu cầu đọc thông tin về giao dịch của chúng ta dựa trên mã băm (một mẫu điển hình khi thực hiện các giao dịch). Để tìm hiểu thêm về việc gửi các giao dịch, hãy xem hướng dẫn này về [cách gửi các giao dịch bằng Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Đó là tất cả cho phần 1 của hướng dẫn này, trong phần 2, chúng ta sẽ thực sự [tương tác với hợp đồng thông minh của mình](/developers/tutorials/hello-world-smart-contract-fullstack/#part-2-interact-with-your-smart-contract) bằng cách cập nhật thông điệp ban đầu của chúng ta, và trong phần 3, chúng ta sẽ [xuất bản hợp đồng thông minh của mình lên Etherscan](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan) để mọi người đều biết cách tương tác với nó.

**Bạn muốn tìm hiểu thêm về Alchemy? Hãy xem [trang web](https://www.alchemy.com/eth) của chúng tôi. Không bao giờ muốn bỏ lỡ một bản cập nhật nào? Đăng ký nhận bản tin của chúng tôi [tại đây](https://www.alchemy.com/newsletter)! Đảm bảo cũng tham gia [Discord](https://discord.gg/u72VCg3) của chúng tôi.**.
