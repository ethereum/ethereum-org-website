---
title: "Hợp đồng thông minh Hello World dành cho người mới bắt đầu"
description: "Hướng dẫn giới thiệu về cách viết và triển khai một hợp đồng thông minh đơn giản trên Ethereum."
author: "elanh"
tags:
  [
    "solidity",
    "hardhat",
    "từ Alchemy",
    "hợp đồng thông minh",
    "triển khai"
  ]
skill: beginner
lang: vi
published: 2021-03-31
---

Nếu bạn mới bắt đầu phát triển chuỗi khối và không biết bắt đầu từ đâu, hoặc nếu bạn chỉ muốn hiểu cách triển khai và tương tác với các hợp đồng thông minh, thì hướng dẫn này là dành cho bạn. Chúng tôi sẽ hướng dẫn từng bước tạo và triển khai một hợp đồng thông minh đơn giản trên mạng thử nghiệm Sepolia bằng ví ảo [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/) và [Alchemy](https://www.alchemy.com/eth) (đừng lo lắng nếu bạn chưa hiểu bất kỳ điều gì trong số này, chúng tôi sẽ giải thích).

Trong [phần 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) của hướng dẫn này, chúng tôi sẽ trình bày cách chúng tôi có thể tương tác với hợp đồng thông minh của mình sau khi nó được triển khai tại đây và trong [phần 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan), chúng tôi sẽ đề cập đến cách xuất bản nó trên Etherscan.

Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ trong [Alchemy Discord](https://discord.gg/gWuC7zB)!

## Bước 1: Kết nối với mạng Ethereum {#step-1}

Có nhiều cách để thực hiện yêu cầu đến chuỗi Ethereum. Để đơn giản, chúng tôi sẽ sử dụng một tài khoản miễn phí trên Alchemy, một nền tảng và API dành cho nhà phát triển chuỗi khối cho phép chúng tôi giao tiếp với chuỗi Ethereum mà không cần phải chạy các nút của riêng mình. Nền tảng này cũng có các công cụ dành cho nhà phát triển để giám sát và phân tích mà chúng tôi sẽ tận dụng trong hướng dẫn này để hiểu cơ chế hoạt động bên trong việc triển khai hợp đồng thông minh của chúng tôi. Nếu bạn chưa có tài khoản Alchemy, [bạn có thể đăng ký miễn phí tại đây](https://dashboard.alchemy.com/signup).

## Bước 2: Tạo ứng dụng của bạn (và khóa API) {#step-2}

Khi bạn đã tạo tài khoản Alchemy, bạn có thể tạo một khoá API bằng cách tạo một ứng dụng. Điều này sẽ cho phép chúng ta gửi yêu cầu đến mạng thử nghiệm Sepolia. Nếu bạn không quen thuộc với các mạng thử nghiệm, hãy xem [trang này](/developers/docs/networks/).

1. Điều hướng đến trang "Tạo ứng dụng mới" trong Trang tổng quan Alchemy của bạn bằng cách chọn "Chọn một ứng dụng" trong thanh điều hướng và nhấp vào "Tạo ứng dụng mới"

![Tạo ứng dụng Hello world](./hello-world-create-app.png)

2. Đặt tên cho ứng dụng của bạn là “Hello World”, cung cấp một mô tả ngắn và chọn một trường hợp sử dụng, ví dụ: "Cơ sở hạ tầng & Công cụ." Tiếp theo, tìm kiếm "Ethereum" và chọn mạng.

![tạo chế độ xem ứng dụng hello world](./create-app-view-hello-world.png)

3. Nhấp vào "Tiếp theo" để tiếp tục, sau đó nhấp vào “Tạo ứng dụng” và thế là xong! Ứng dụng của bạn sẽ xuất hiện trong menu thả xuống của thanh điều hướng, với Khóa API có sẵn để sao chép.

## Bước 3: Tạo một tài khoản Ethereum (địa chỉ) {#step-3}

Chúng ta cần một tài khoản Ethereum để gửi và nhận giao dịch. Trong bài hướng dẫn này, chúng ta sẽ sử dụng MetaMask, một ví ảo trong trình duyệt dùng để quản lý địa chỉ tài khoản Ethereum của bạn. Thông tin thêm về [giao dịch](/developers/docs/transactions/).

Bạn có thể tải xuống MetaMask và tạo một tài khoản Ethereum miễn phí [tại đây](https://metamask.io/download). Khi bạn đang tạo một tài khoản, hoặc nếu bạn đã có tài khoản, hãy đảm bảo chuyển sang mạng thử nghiệm "Sepolia" bằng menu thả xuống của mạng (để chúng ta không phải xử lý tiền thật).

Nếu bạn không thấy Sepolia được liệt kê, hãy vào menu, sau đó chọn Nâng cao và cuộn xuống để bật "Hiển thị các mạng thử nghiệm". Trong menu lựa chọn mạng, chọn tab "Tùy chỉnh" để tìm danh sách các mạng thử nghiệm và chọn "Sepolia."

![ví dụ metamask sepolia](./metamask-sepolia-example.png)

## Bước 4: Thêm ether từ một vòi {#step-4}

Để triển khai hợp đồng thông minh của chúng ta trên mạng thử nghiệm, chúng ta sẽ cần một ít Eth giả. Để nhận Sepolia ETH, bạn có thể truy cập [chi tiết mạng Sepolia](/developers/docs/networks/#sepolia) để xem danh sách các vòi khác nhau. Nếu một vòi không hoạt động, hãy thử một vòi khác vì đôi khi chúng có thể cạn kiệt. Có thể mất một chút thời gian để nhận được ETH giả của bạn do lưu lượng mạng. Bạn sẽ sớm thấy ETH trong tài khoản Metamask của mình!

## Bước 5: Kiểm tra Số dư của bạn {#step-5}

Để kiểm tra lại số dư của chúng ta, hãy thực hiện một yêu cầu [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) bằng cách sử dụng [công cụ soạn thảo của Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Thao tác này sẽ trả về lượng ETH có trong ví của chúng ta. Sau khi bạn nhập địa chỉ tài khoản MetaMask của mình và nhấp vào “Send Request”, bạn sẽ thấy một phản hồi như sau:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **LƯU Ý:** Kết quả này tính bằng wei chứ không phải ETH. Wei được sử dụng làm mệnh giá nhỏ nhất của ether. Việc chuyển đổi từ wei sang ETH là: 1 eth = 10<sup>18</sup> wei. Vì vậy, nếu chúng ta chuyển 0x2B5E3AF16B1880000 sang hệ thập phân, chúng ta sẽ nhận được 5\*10¹⁸ tương đương với 5 ETH.
>
> Phù! Tiền giả của chúng ta đã có đủ <Emoji text=":money_mouth_face:" size={1} />.

## Bước 6: Khởi tạo dự án của chúng ta {#step-6}

Đầu tiên, chúng ta sẽ cần tạo một thư mục cho dự án của mình. Điều hướng đến dòng lệnh của bạn và gõ:

```
mkdir hello-world
cd hello-world
```

Bây giờ chúng ta đang ở trong thư mục dự án của mình, chúng ta sẽ sử dụng `npm init` để khởi tạo dự án. Nếu bạn chưa cài đặt npm, hãy làm theo [các hướng dẫn sau](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (chúng ta cũng sẽ cần Node.js vì vậy hãy tải nó xuống luôn nhé!).

```
npm init
```

Việc bạn trả lời các câu hỏi cài đặt như thế nào không thực sự quan trọng, sau đây là cách chúng tôi đã làm để bạn tham khảo:

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Phê duyệt package.json và chúng ta đã sẵn sàng!

## Bước 7: Tải xuống [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat là một môi trường phát triển để biên dịch, triển khai, kiểm thử và gỡ lỗi phần mềm Ethereum của bạn. Nó giúp các nhà phát triển khi xây dựng hợp đồng thông minh và các ứng dụng phi tập trung cục bộ trước khi triển khai lên chuỗi chính.

Bên trong dự án `hello-world` của chúng ta, chạy:

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

👷 Chào mừng đến với Hardhat v2.0.11 👷‍?

Bạn muốn làm gì? …
Tạo một dự án mẫu
❯ Tạo một tệp hardhat.config.js trống
Thoát
```

Thao tác này sẽ tạo một tệp `hardhat.config.js` cho chúng ta, đây là nơi chúng ta sẽ chỉ định tất cả các thiết lập cho dự án của mình (ở bước 13).

## Bước 9: Thêm thư mục dự án {#step-9}

Để giữ cho dự án của chúng ta được sắp xếp có tổ chức, chúng ta sẽ tạo hai thư mục mới. Điều hướng đến thư mục gốc của dự án của bạn trong dòng lệnh và gõ:

```
mkdir contracts
mkdir scripts
```

- `contracts/` là nơi chúng ta sẽ lưu tệp mã hợp đồng thông minh hello world
- `scripts/` là nơi chúng ta sẽ lưu giữ các tập lệnh để triển khai và tương tác với hợp đồng của mình

## Bước 10: Viết hợp đồng của chúng ta {#step-10}

Bạn có thể đang tự hỏi, khi nào chúng ta mới bắt đầu viết mã đây?? Vâng, chúng ta đây rồi, ở bước 10.

Mở dự án hello-world trong trình chỉnh sửa yêu thích của bạn (chúng tôi thích [VSCode](https://code.visualstudio.com/)). Các hợp đồng thông minh được viết bằng một ngôn ngữ gọi là Solidity, đây là ngôn ngữ chúng tôi sẽ sử dụng để viết hợp đồng thông minh HelloWorld.sol của mình.‌

1. Điều hướng đến thư mục “contracts” và tạo một tệp mới có tên HelloWorld.sol
2. Dưới đây là một hợp đồng thông minh Hello World mẫu từ Ethereum Foundation mà chúng tôi sẽ sử dụng cho hướng dẫn này. Sao chép và dán nội dung bên dưới vào tệp HelloWorld.sol của bạn, và hãy nhớ đọc các nhận xét để hiểu hợp đồng này làm gì:

```solidity
// Chỉ định phiên bản Solidity, sử dụng phiên bản ngữ nghĩa.
// Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Định nghĩa một hợp đồng có tên là `HelloWorld`.
// Hợp đồng là một tập hợp các hàm và dữ liệu (trạng thái của nó). Sau khi được triển khai, một hợp đồng sẽ nằm ở một địa chỉ cụ thể trên chuỗi khối Ethereum. Tìm hiểu thêm: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // Khai báo một biến trạng thái `message` kiểu `string`.
   // Các biến trạng thái là các biến có giá trị được lưu trữ vĩnh viễn trong bộ nhớ hợp đồng. Từ khóa `public` làm cho các biến có thể truy cập được từ bên ngoài hợp đồng và tạo ra một hàm mà các hợp đồng hoặc ứng dụng khách khác có thể gọi để truy cập giá trị.
   string public message;

   // Tương tự như nhiều ngôn ngữ lập trình hướng đối tượng dựa trên lớp, hàm khởi tạo là một hàm đặc biệt chỉ được thực thi khi tạo hợp đồng.
   // Các hàm khởi tạo được sử dụng để khởi tạo dữ liệu của hợp đồng. Tìm hiểu thêm:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Chấp nhận một đối số chuỗi `initMessage` và đặt giá trị vào biến lưu trữ `message` của hợp đồng).
      message = initMessage;
   }

   // Một hàm công khai chấp nhận một đối số chuỗi và cập nhật biến lưu trữ `message`.
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

Đây là một hợp đồng thông minh siêu đơn giản, lưu trữ một thông điệp khi được tạo và có thể được cập nhật bằng cách gọi hàm `update`.

## Bước 11: Kết nối MetaMask & Alchemy với dự án của bạn {#step-11}

Chúng ta đã tạo một ví MetaMask, tài khoản Alchemy và viết hợp đồng thông minh của mình, giờ là lúc kết nối cả ba.

Mọi giao dịch được gửi từ ví ảo của bạn đều yêu cầu chữ ký bằng khóa riêng tư duy nhất của bạn. Để cấp quyền này cho chương trình của chúng ta, chúng ta có thể lưu trữ khóa riêng tư (và khóa API Alchemy) một cách an toàn trong một tệp môi trường.

> Để tìm hiểu thêm về việc gửi giao dịch, hãy xem [bài hướng dẫn này](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) về việc gửi giao dịch bằng web3.

Đầu tiên, cài đặt gói dotenv trong thư mục dự án của bạn:

```
npm install dotenv --save
```

Sau đó, tạo một tệp `.env` trong thư mục gốc của dự án và thêm khóa riêng tư MetaMask và URL API HTTP Alchemy của bạn vào đó.

- Làm theo [các hướng dẫn này](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) để xuất khóa riêng tư của bạn
- Xem bên dưới để lấy URL API HTTP của Alchemy

![lấy khóa api alchemy](./get-alchemy-api-key.png)

Sao chép URL API của Alchemy

Tệp `.env` của bạn sẽ trông như thế này:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/khoa-api-cua-ban"
PRIVATE_KEY = "khoa-rieng-tu-metamask-cua-ban"
```

Để thực sự kết nối những thứ này với mã của chúng ta, chúng ta sẽ tham chiếu các biến này trong tệp `hardhat.config.js` của mình ở bước 13.

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Đừng commit tệp <code>.env</code>! Vui lòng đảm bảo không bao giờ chia sẻ hoặc tiết lộ tệp <code>.env</code> của bạn với bất kỳ ai, vì làm như vậy bạn đang làm lộ bí mật của mình. Nếu bạn đang sử dụng kiểm soát phiên bản, hãy thêm tệp <code>.env</code> của bạn vào tệp <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Bước 12: Cài đặt Ethers.js {#step-12-install-ethersjs}

Ethers.js là một thư viện giúp tương tác và gửi yêu cầu đến Ethereum dễ dàng hơn bằng cách gói [các phương thức JSON-RPC tiêu chuẩn](/developers/docs/apis/json-rpc/) với các phương thức thân thiện hơn với người dùng.

Hardhat giúp tích hợp [Plugin](https://hardhat.org/plugins/) cho các công cụ bổ sung và chức năng mở rộng trở nên siêu dễ dàng. Chúng tôi sẽ tận dụng [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) để triển khai hợp đồng ([Ethers.js](https://github.com/ethers-io/ethers.js/) có một số phương pháp triển khai hợp đồng siêu gọn gàng).

Trong thư mục dự án của bạn, hãy gõ:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Chúng ta cũng sẽ nhúng ethers vào tệp `hardhat.config.js` của mình trong bước tiếp theo.

## Bước 13: Cập nhật hardhat.config.js {#step-13-update-hardhatconfigjs}

Cho đến nay, chúng ta đã thêm một số phần phụ thuộc và plugin, bây giờ chúng ta cần cập nhật `hardhat.config.js` để dự án của chúng ta biết về tất cả chúng.

Cập nhật tệp `hardhat.config.js` của bạn để trông như thế này:

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

Để đảm bảo mọi thứ đều hoạt động cho đến nay, hãy biên dịch hợp đồng của chúng ta. Tác vụ `compile` là một trong những tác vụ có sẵn của hardhat.

Từ dòng lệnh, hãy chạy:

```
npx hardhat compile
```

Bạn có thể nhận được cảnh báo về `SPDX license identifier not provided in source file` , nhưng không cần phải lo lắng về điều đó — hy vọng mọi thứ khác đều ổn! Nếu không, bạn luôn có thể nhắn tin trong [Alchemy discord](https://discord.gg/u72VCg3).

## Bước 15: Viết tập lệnh triển khai của chúng ta {#step-15-write-our-deploy-scripts}

Bây giờ hợp đồng của chúng ta đã được viết và tệp cấu hình đã sẵn sàng, đã đến lúc viết tập lệnh triển khai hợp đồng của chúng ta.

Điều hướng đến thư mục `scripts/` và tạo một tệp mới có tên `deploy.js`, thêm nội dung sau vào đó:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Bắt đầu triển khai, trả về một promise phân giải thành một đối tượng hợp đồng
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Hợp đồng được triển khai đến địa chỉ:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat đã làm rất tốt việc giải thích mỗi dòng mã này làm gì trong [Bài hướng dẫn về Hợp đồng](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) của họ, chúng tôi đã áp dụng các giải thích của họ ở đây.

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

`ContractFactory` trong ethers.js là một sự trừu tượng hóa được sử dụng để triển khai các hợp đồng thông minh mới, vì vậy `HelloWorld` ở đây là một nhà máy cho các phiên bản của hợp đồng hello world của chúng ta. Khi sử dụng plugin `hardhat-ethers`, các phiên bản `ContractFactory` và `Contract` được kết nối với người ký đầu tiên theo mặc định.

```
const hello_world = await HelloWorld.deploy();
```

Việc gọi `deploy()` trên một `ContractFactory` sẽ bắt đầu việc triển khai và trả về một `Promise` phân giải thành một `Contract`. Đây là đối tượng có một phương thức cho mỗi chức năng hợp đồng thông minh của chúng ta.

## Bước 16: Triển khai hợp đồng của chúng ta {#step-16-deploy-our-contract}

Cuối cùng, chúng ta đã sẵn sàng để triển khai hợp đồng thông minh của mình! Điều hướng đến dòng lệnh và chạy:

```
npx hardhat run scripts/deploy.js --network sepolia
```

Sau đó, bạn sẽ thấy một cái gì đó như thế này:

```
Hợp đồng được triển khai đến địa chỉ: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

Nếu chúng ta truy cập [Etherscan của Sepolia](https://sepolia.etherscan.io/) và tìm kiếm địa chỉ hợp đồng của mình, chúng ta sẽ có thể thấy rằng nó đã được triển khai thành công. Giao dịch sẽ trông giống như thế này:

![hợp đồng etherscan](./etherscan-contract.png)

Địa chỉ `From` phải khớp với địa chỉ tài khoản MetaMask của bạn và địa chỉ To sẽ ghi là “Tạo Hợp đồng” nhưng nếu chúng ta nhấp vào giao dịch, chúng ta sẽ thấy địa chỉ hợp đồng của mình trong trường `To`:

![giao dịch etherscan](./etherscan-transaction.png)

Xin chúc mừng! Bạn vừa triển khai một hợp đồng thông minh trên chuỗi Ethereum 🎉

Để hiểu những gì đang diễn ra ở hậu trường, hãy điều hướng đến tab Explorer trong [bảng điều khiển Alchemy](https://dashboard.alchemyapi.io/explorer) của chúng ta. Nếu bạn có nhiều ứng dụng Alchemy, hãy đảm bảo lọc theo ứng dụng và chọn “Hello World”.
![trình khám phá hello world](./hello-world-explorer.png)

Tại đây, bạn sẽ thấy một vài lệnh gọi JSON-RPC mà Hardhat/Ethers đã thực hiện ngầm cho chúng ta khi chúng ta gọi hàm `.deploy()`. Hai lệnh gọi quan trọng cần đề cập ở đây là [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction), là yêu cầu để thực sự ghi hợp đồng của chúng ta lên chuỗi Sepolia, và [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash), là yêu cầu để đọc thông tin về giao dịch của chúng ta với hàm băm đã cho (một mẫu điển hình khi có
các giao dịch). Để tìm hiểu thêm về việc gửi giao dịch, hãy xem hướng dẫn này về [gửi giao dịch bằng Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

Đó là tất cả cho phần 1 của hướng dẫn này, trong phần 2, chúng ta sẽ thực sự [tương tác với hợp đồng thông minh của mình](https://www.alchemy.com/docs/interacting-with-a-smart-contract) bằng cách cập nhật thông điệp ban đầu của chúng ta và trong phần 3, chúng ta sẽ [xuất bản hợp đồng thông minh của mình lên Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) để mọi người sẽ biết cách tương tác với nó.

**Bạn muốn tìm hiểu thêm về Alchemy?** Hãy xem [trang web](https://www.alchemy.com/eth) của chúng tôi. Bạn không muốn bỏ lỡ bất kỳ bản cập nhật nào? Đăng ký nhận bản tin của chúng tôi [tại đây](https://www.alchemy.com/newsletter)! Hãy chắc chắn cũng tham gia [Discord](https://discord.gg/u72VCg3) của chúng tôi.\*\*.
