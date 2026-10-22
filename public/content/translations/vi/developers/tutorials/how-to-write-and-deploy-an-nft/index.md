---
title: "Cách viết & triển khai một NFT (Phần 1/3 của Chuỗi hướng dẫn về NFT)"
description: "Hướng dẫn này là Phần 1 của chuỗi bài về NFT, sẽ đưa bạn đi từng bước về cách viết và triển khai hợp đồng thông minh Non Fungible Token (token ERC-721) bằng Ethereum và Inter Planetary File System (IPFS)."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "hợp đồng thông minh"]
skill: beginner
breadcrumb: "Viết và triển khai NFT"
lang: vi
published: 2021-04-22
---

Với việc các NFT đưa Chuỗi khối đến với công chúng, giờ đây là một cơ hội tuyệt vời để tự mình hiểu được sự cường điệu này bằng cách xuất bản hợp đồng NFT (Token ERC-721) của riêng bạn trên Chuỗi khối Ethereum!

Trong hướng dẫn này, chúng ta sẽ đi qua việc tạo và triển khai một hợp đồng thông minh ERC-721 trên mạng thử nghiệm Sepolia bằng cách sử dụng [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) và [Alchemy](https://alchemy.com/signup/eth) (đừng lo lắng nếu bạn chưa hiểu bất kỳ điều nào trong số này có nghĩa là gì — chúng tôi sẽ giải thích nó!).

Trong Phần 2 của hướng dẫn này, chúng ta sẽ đi qua cách chúng ta có thể sử dụng hợp đồng thông minh của mình để đúc một NFT, và trong Phần 3, chúng tôi sẽ giải thích cách xem NFT của bạn trên MetaMask.

Và tất nhiên, nếu bạn có câu hỏi ở bất kỳ thời điểm nào, đừng ngần ngại liên hệ trong [Discord của Alchemy](https://discord.gg/gWuC7zB) hoặc truy cập [tài liệu Giao diện Lập trình Ứng dụng (API) NFT của Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Bước 1: Kết nối với mạng lưới Ethereum {#connect-to-ethereum}

Có rất nhiều cách để thực hiện các yêu cầu tới chuỗi khối Ethereum, nhưng để mọi thứ trở nên dễ dàng, chúng ta sẽ sử dụng một tài khoản miễn phí trên [Alchemy](https://alchemy.com/signup/eth), một nền tảng nhà phát triển chuỗi khối và API cho phép chúng ta giao tiếp với chuỗi Ethereum mà không cần phải chạy các nút của riêng mình.

Trong hướng dẫn này, chúng ta cũng sẽ tận dụng các công cụ dành cho nhà phát triển của Alchemy để giám sát và phân tích nhằm hiểu những gì đang diễn ra bên trong việc triển khai hợp đồng thông minh của chúng ta. Nếu bạn chưa có tài khoản Alchemy, bạn có thể đăng ký miễn phí [tại đây](https://alchemy.com/signup/eth).

## Bước 2: Tạo ứng dụng của bạn (và khóa API) {#make-api-key}

Sau khi bạn đã tạo một Tài khoản Alchemy, bạn có thể tạo một khóa Giao diện Lập trình Ứng dụng (API) bằng cách tạo một ứng dụng. Điều này sẽ cho phép chúng ta thực hiện các yêu cầu tới mạng thử nghiệm Sepolia. Hãy xem [hướng dẫn này](https://www.alchemy.com/docs/choosing-a-web3-network) nếu bạn tò mò muốn tìm hiểu thêm về các mạng thử nghiệm.

1. Điều hướng đến trang "Create new app" trong Bảng điều khiển Alchemy của bạn bằng cách chọn "Select an app" trên thanh điều hướng và nhấp vào "Create new app"

![Tạo ứng dụng của bạn](./alchemy-create-new-app.png)

2. Đặt tên cho ứng dụng của bạn (chúng tôi đã chọn “My First NFT!”), cung cấp một mô tả ngắn và chọn một trường hợp sử dụng. Tiếp theo, tìm kiếm "Ethereum" và chọn mạng lưới. Chúng ta sẽ sử dụng Sepolia, mạng thử nghiệm được đề xuất cho việc phát triển ứng dụng (xem [các mạng lưới Ethereum](/developers/docs/networks/#ethereum-testnets)).

3. Nhấp vào "Next" để tiếp tục, sau đó nhấp vào “Create app” và thế là xong! Ứng dụng của bạn sẽ xuất hiện trong menu thả xuống của thanh điều hướng, với một khóa API có sẵn để sao chép.

## Bước 3: Tạo một Tài khoản Ethereum (Địa chỉ) {#create-eth-address}

Chúng ta cần một Tài khoản Ethereum để gửi và nhận các giao dịch. Đối với hướng dẫn này, chúng ta sẽ sử dụng MetaMask, một Ví ảo trong trình duyệt được sử dụng để quản lý Địa chỉ Tài khoản Ethereum của bạn. Nếu bạn muốn hiểu thêm về cách các giao dịch trên Ethereum hoạt động, hãy xem [trang này](/developers/docs/transactions/) từ Tổ chức Ethereum.

Bạn có thể tải xuống và tạo một Tài khoản MetaMask miễn phí [tại đây](https://metamask.io/download). Khi bạn đang tạo một Tài khoản, hoặc nếu bạn đã có một Tài khoản, hãy đảm bảo chuyển sang mạng thử nghiệm "Sepolia" bằng cách sử dụng menu chọn mạng lưới (để chúng ta không phải giao dịch bằng tiền thật). Nếu bạn không thấy Sepolia được liệt kê, hãy mở menu ở góc trên cùng bên phải, chọn "Networks" và bật "Show test networks" (xem [hướng dẫn của MetaMask về cách xem các mạng thử nghiệm](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Đặt Sepolia làm mạng lưới của bạn](./metamask-sepolia.png)

## Bước 4: Thêm ether từ một vòi {#step-4-add-ether-from-a-faucet}

Để triển khai hợp đồng thông minh của chúng ta lên mạng thử nghiệm, chúng ta sẽ cần một ít ETH giả. Để nhận ETH Sepolia, hãy chọn một trong các vòi được liệt kê trong [chi tiết mạng lưới Sepolia](/developers/docs/networks/#sepolia) và nhập Địa chỉ Tài khoản của bạn. Nếu một vòi không hoạt động, hãy thử một vòi khác vì đôi khi chúng có thể cạn kiệt và một số vòi có các quy tắc về tính đủ điều kiện: ví dụ, [vòi Sepolia của Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) yêu cầu Địa chỉ nhận phải giữ ít nhất 0.001 ETH trên Mạng chính Ethereum. Bạn sẽ thấy ETH trong Tài khoản MetaMask của mình ngay sau đó!

## Bước 5: Kiểm tra số dư của bạn {#check-balance}

Để kiểm tra lại xem số dư của chúng ta đã có ở đó chưa, hãy thực hiện một yêu cầu [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) bằng cách sử dụng [công cụ hộp cát của Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Điều này sẽ trả về số lượng ETH trong Ví của chúng ta. Sau khi bạn nhập địa chỉ Tài khoản MetaMask của mình và nhấp vào “Send Request”, bạn sẽ thấy một phản hồi như thế này:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Lưu ý** Kết quả này tính bằng Wei, không phải ETH. Wei được sử dụng làm mệnh giá nhỏ nhất của ether. Việc chuyển đổi từ Wei sang ETH là 1 eth = 10<sup>18</sup> Wei. Vì vậy, nếu chúng ta chuyển đổi 0xde0b6b3a7640000 sang số thập phân, chúng ta sẽ nhận được 1\*10<sup>18</sup> Wei, tương đương với 1 ETH.

Phù! Tiền giả của chúng ta đều ở đó.

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```
## Bước 6: Khởi tạo dự án của chúng ta {#initialize-project}

Đầu tiên, chúng ta sẽ cần tạo một thư mục cho dự án của mình. Điều hướng đến dòng lệnh của bạn và nhập:

```sh
mkdir my-nft
cd my-nft
```

Bây giờ chúng ta đang ở trong thư mục dự án của mình, chúng ta sẽ sử dụng npm init để khởi tạo dự án. Nếu bạn chưa cài đặt npm, hãy làm theo [hướng dẫn cài đặt Node.js](https://nodejs.org/en/download/) (chúng ta sẽ cần Node.js và npm cho hướng dẫn này).

```sh
npm init
```

Việc bạn trả lời các câu hỏi cài đặt như thế nào không thực sự quan trọng; đây là cách chúng tôi đã làm để bạn tham khảo:

```text
package name: (my-nft)
version: (1.0.0)
description: My first NFT!
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

{
  "name": "my-nft",
  "version": "1.0.0",
  "description": "My first NFT!",
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

## Bước 7: Cài đặt [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat là một môi trường phát triển để biên dịch, triển khai, kiểm thử và gỡ lỗi phần mềm Ethereum của bạn. Nó giúp các nhà phát triển khi xây dựng các hợp đồng thông minh và ứng dụng phi tập trung (dapp) cục bộ trước khi triển khai lên Chuỗi trực tiếp.

Hardhat 3 yêu cầu Node.js v22.13.0 trở lên. Bên trong dự án my-nft của chúng ta, hãy chạy:

```sh
npm install --save-dev hardhat
```

Hãy xem trang này để biết thêm chi tiết về [hướng dẫn cài đặt](https://hardhat.org/docs/getting-started).

## Bước 8: Tạo dự án Hardhat {#create-hardhat-project}

Chạy `npx hardhat --init` sẽ tạo ra một dự án mẫu hoàn chỉnh, nhưng đối với hướng dẫn này, chúng ta sẽ thiết lập mọi thứ bằng tay để bạn có thể thấy từng phần. Trong thư mục gốc của dự án của bạn, hãy tạo một tệp có tên `hardhat.config.js` với nội dung sau:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

Đây là nơi chúng ta sẽ chỉ định tất cả các thiết lập cho dự án của mình (ở bước 13). Hiện tại, nó chỉ cho Hardhat biết phiên bản trình biên dịch Solidity nào sẽ được sử dụng.

## Bước 9: Thêm các thư mục dự án {#add-project-folders}

Để giữ cho dự án của chúng ta được tổ chức tốt, chúng ta sẽ tạo hai thư mục mới. Điều hướng đến thư mục gốc của dự án của bạn trong dòng lệnh và nhập:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ là nơi chúng ta sẽ giữ mã hợp đồng thông minh NFT của mình

- scripts/ là nơi chúng ta sẽ giữ các tập lệnh để triển khai và tương tác với hợp đồng thông minh của mình

## Bước 10: Viết hợp đồng của chúng ta {#write-contract}

Bây giờ môi trường của chúng ta đã được thiết lập, hãy chuyển sang những thứ thú vị hơn: _viết mã hợp đồng thông minh của chúng ta!_

Mở dự án my-nft trong trình soạn thảo yêu thích của bạn (chúng tôi thích [VSCode](https://code.visualstudio.com/)). Các hợp đồng thông minh được viết bằng một ngôn ngữ gọi là Solidity, đây là ngôn ngữ chúng ta sẽ sử dụng để viết hợp đồng thông minh MyNFT.sol của mình.‌

1. Điều hướng đến thư mục `contracts` và tạo một tệp mới có tên MyNFT.sol

2. Dưới đây là mã hợp đồng thông minh NFT của chúng ta, dựa trên việc triển khai ERC-721 của Thư viện [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721). Sao chép và dán nội dung bên dưới vào tệp MyNFT.sol của bạn.

   ```solidity
   // Hợp đồng dựa trên https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Bởi vì chúng ta đang kế thừa các lớp từ Thư viện hợp đồng OpenZeppelin, trong dòng lệnh của bạn, hãy chạy `npm install @openzeppelin/contracts` để cài đặt Thư viện vào thư mục của chúng ta. Hướng dẫn này sử dụng OpenZeppelin Contracts 5.x, yêu cầu Solidity 0.8.24 trở lên.

Vậy, mã này _làm gì_ chính xác? Hãy cùng phân tích nó, từng dòng một.

Ở đầu hợp đồng thông minh của chúng ta, chúng ta nhập ba lớp hợp đồng thông minh [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol chứa việc triển khai tiêu chuẩn ERC-721, mà hợp đồng thông minh NFT của chúng ta sẽ kế thừa. (Để trở thành một NFT hợp lệ, hợp đồng thông minh của bạn phải triển khai tất cả các phương thức của tiêu chuẩn ERC-721.) Để tìm hiểu thêm về các hàm ERC-721 được kế thừa, hãy xem định nghĩa giao diện [tại đây](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/access/Ownable.sol thiết lập [kiểm soát truy cập](https://docs.openzeppelin.com/contracts/5.x/access-control) trên hợp đồng thông minh của chúng ta, vì vậy chỉ chủ sở hữu của hợp đồng thông minh (bạn) mới có thể đúc các NFT. Chủ sở hữu là Địa chỉ `initialOwner` được truyền vào hàm khởi tạo. (Lưu ý, việc bao gồm kiểm soát truy cập hoàn toàn là một tùy chọn. Nếu bạn muốn bất kỳ ai cũng có thể đúc một NFT bằng hợp đồng thông minh của bạn, hãy xóa `Ownable` và `Ownable(initialOwner)` khỏi định nghĩa hợp đồng và hàm khởi tạo, và `onlyOwner` khỏi hàm `mintNFT`.)

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol mở rộng ERC-721 để mỗi token có thể lưu trữ URI siêu dữ liệu của riêng nó, mà chúng ta thiết lập khi đúc.

Sau các câu lệnh nhập của chúng ta, chúng ta có hợp đồng thông minh NFT tùy chỉnh của mình, nó ngắn gọn một cách đáng ngạc nhiên — nó chỉ chứa một bộ đếm, một hàm khởi tạo và một hàm duy nhất! Điều này là nhờ các hợp đồng OpenZeppelin được kế thừa của chúng ta, chúng triển khai hầu hết các phương thức chúng ta cần để tạo một NFT, chẳng hạn như `ownerOf` trả về chủ sở hữu của NFT, và `transferFrom`, chuyển quyền sở hữu NFT từ một Tài khoản này sang một Tài khoản khác.

Bộ đếm, `_nextTokenId`, theo dõi tổng số NFT đã được đúc và thiết lập ID duy nhất trên NFT mới của chúng ta. (Mỗi NFT được đúc bằng hợp đồng thông minh phải được gán một ID duy nhất—ở đây ID duy nhất của chúng ta chỉ được xác định bởi tổng số NFT đang tồn tại. `++_nextTokenId` tăng bộ đếm trước khi nó được sử dụng, vì vậy NFT đầu tiên chúng ta đúc bằng hợp đồng thông minh của mình có ID là "1," NFT thứ hai của chúng ta có ID là "2," v.v.)

Trong hàm khởi tạo ERC-721 của chúng ta, bạn sẽ nhận thấy chúng ta truyền 2 chuỗi, “MyNFT” và “NFT.” Biến đầu tiên là tên của hợp đồng thông minh và biến thứ hai là ký hiệu của nó. Bạn có thể đặt tên cho mỗi biến này theo bất kỳ cách nào bạn muốn!

Cuối cùng, chúng ta có hàm `mintNFT(address recipient, string memory tokenURI)` cho phép chúng ta đúc một NFT! Bạn sẽ nhận thấy hàm này nhận vào hai biến:

- `address recipient` chỉ định Địa chỉ sẽ nhận NFT mới được đúc của bạn

- `string memory tokenURI` là một chuỗi sẽ phân giải thành một tài liệu JSON mô tả siêu dữ liệu của NFT. Siêu dữ liệu của một NFT thực sự là thứ mang lại sức sống cho nó, cho phép nó có các thuộc tính có thể định cấu hình, chẳng hạn như tên, mô tả, hình ảnh và các thuộc tính khác. Trong phần 2 của hướng dẫn này, chúng tôi sẽ mô tả cách định cấu hình siêu dữ liệu này.

`mintNFT` gọi một số phương thức từ Thư viện ERC-721 được kế thừa và cuối cùng trả về một số đại diện cho ID của NFT mới được đúc.

## Bước 11: Kết nối MetaMask & Alchemy với dự án của bạn {#connect-metamask-and-alchemy}

Bây giờ chúng ta đã tạo một Ví MetaMask, Tài khoản Alchemy và viết hợp đồng thông minh của mình, đã đến lúc kết nối cả ba.

Mỗi giao dịch được gửi từ Ví ảo của bạn yêu cầu một chữ ký sử dụng khóa riêng tư duy nhất của bạn. Để cung cấp cho chương trình của chúng ta quyền này, chúng ta có thể lưu trữ an toàn khóa riêng tư của mình (và khóa API Alchemy) trong một tệp môi trường.

Để tìm hiểu thêm về việc gửi các giao dịch, hãy xem [tài liệu về giao dịch](/developers/docs/transactions/).

Tạo một tệp `.env` trong thư mục gốc của dự án của chúng ta và thêm khóa riêng tư MetaMask và URL API Alchemy HTTP của bạn vào đó.

- Làm theo [các hướng dẫn này](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) để xuất khóa riêng tư của bạn từ MetaMask

- Xem bên dưới để lấy URL API Alchemy HTTP và sao chép nó vào khay nhớ tạm của bạn

![Sao chép URL API Alchemy của bạn](./copy-alchemy-api-url.mp4#842x480)

Tệp `.env` của bạn bây giờ sẽ trông như thế này:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Để thực sự kết nối những thứ này với mã của chúng ta, chúng ta sẽ tham chiếu các biến này trong tệp hardhat.config.js của mình ở bước 13. Node.js có thể tự đọc các tệp `.env`, vì vậy không cần cài đặt thêm gói nào.

<EnvWarningBanner />

## Bước 12: Cài đặt Ethers.js {#install-ethers}

Ethers.js là một Thư viện giúp việc tương tác và thực hiện các yêu cầu tới Ethereum dễ dàng hơn bằng cách bọc [các phương thức JSON-RPC tiêu chuẩn](/developers/docs/apis/json-rpc/) bằng các phương thức thân thiện với người dùng hơn.

Hardhat giúp việc tích hợp [các Plugin](https://hardhat.org/docs/plugins/official-plugins) cho các công cụ bổ sung và chức năng mở rộng trở nên cực kỳ dễ dàng. Chúng ta sẽ tận dụng [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) cho việc triển khai hợp đồng ([Ethers.js](https://docs.ethers.org/v6/) có một số phương thức triển khai hợp đồng cực kỳ gọn gàng).

Trong thư mục dự án của bạn, hãy nhập:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

Chúng ta cũng sẽ thêm plugin vào tệp hardhat.config.js của mình trong bước tiếp theo.

## Bước 13: Cập nhật hardhat.config.js {#update-hardhat-config}

Cho đến nay, chúng ta đã thêm một số phụ thuộc và plugin, bây giờ chúng ta cần cập nhật hardhat.config.js để dự án của chúng ta biết về tất cả chúng.

Cập nhật tệp hardhat.config.js của bạn để trông như thế này:

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

## Bước 14: Biên dịch hợp đồng của chúng ta {#compile-contract}

Để đảm bảo mọi thứ đang hoạt động cho đến nay, hãy biên dịch hợp đồng của chúng ta. Tác vụ biên dịch là một trong những tác vụ được tích hợp sẵn của hardhat.

Từ dòng lệnh, hãy chạy:

```sh
npx hardhat compile
```

Lần đầu tiên bạn biên dịch, Hardhat sẽ tải xuống trình biên dịch Solidity. Sau đó, bạn sẽ thấy một cái gì đó giống như `Compiled 1 Solidity file with solc 0.8.34`. Nếu không, bạn luôn có thể nhắn tin trong [Discord của Alchemy](https://discord.gg/gWuC7zB).

## Bước 15: Viết tập lệnh triển khai của chúng ta {#write-deploy}

Bây giờ hợp đồng của chúng ta đã được viết và tệp cấu hình của chúng ta đã sẵn sàng, đã đến lúc viết tập lệnh triển khai hợp đồng của chúng ta.

Điều hướng đến thư mục `scripts/` và tạo một tệp mới có tên `deploy.js`, thêm nội dung sau vào đó:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Bắt đầu việc triển khai, trả về một promise giải quyết thành một đối tượng hợp đồng
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Hãy cùng đi qua những gì mỗi dòng mã này thực hiện.

```js
const { ethers } = await network.create()
```

Trong Hardhat 3, một tập lệnh mở một kết nối đến một mạng lưới một cách rõ ràng. `network.create()` kết nối với mạng lưới bạn chọn bằng tùy chọn `--network` khi bạn chạy tập lệnh và plugin `hardhat-ethers` thêm một đối tượng `ethers` vào kết nối đó.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` trả về các Tài khoản được cấu hình cho mạng lưới. Trên Sepolia, đó là Tài khoản có khóa riêng tư mà bạn đã đặt trong `.env`. Chúng ta truyền Địa chỉ của nó vào hàm khởi tạo để bạn trở thành chủ sở hữu của hợp đồng.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

Một ContractFactory trong ethers.js là một sự trừu tượng hóa được sử dụng để triển khai các hợp đồng thông minh mới, vì vậy MyNFT ở đây là một nhà máy cho các phiên bản của hợp đồng NFT của chúng ta. Khi sử dụng plugin hardhat-ethers, các phiên bản ContractFactory và Contract được kết nối với người ký đầu tiên theo mặc định.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Việc gọi deploy() trên một ContractFactory sẽ bắt đầu việc triển khai và trả về một Promise phân giải thành một Contract. Đây là đối tượng có một phương thức cho mỗi hàm hợp đồng thông minh của chúng ta. Các đối số bạn truyền cho deploy() sẽ đi đến hàm khởi tạo của hợp đồng, ở đây là Địa chỉ `initialOwner`.

`waitForDeployment()` đợi cho đến khi giao dịch triển khai được đưa vào một khối và `getAddress()` trả về Địa chỉ của hợp đồng mới. Xem [tài liệu hợp đồng ethers.js](https://docs.ethers.org/v6/api/contract/) để biết thêm chi tiết.

## Bước 16: Triển khai hợp đồng của chúng ta {#deploy-contract}

Cuối cùng chúng ta đã sẵn sàng để triển khai hợp đồng thông minh của mình! Điều hướng trở lại thư mục gốc của dự án của bạn và trong dòng lệnh, hãy chạy:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

Sau đó, bạn sẽ thấy một cái gì đó giống như:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

Nếu chúng ta truy cập [Etherscan Sepolia](https://sepolia.etherscan.io/) và tìm kiếm Địa chỉ hợp đồng của mình, chúng ta sẽ có thể thấy rằng nó đã được triển khai thành công. Nếu bạn không thể thấy nó ngay lập tức, vui lòng đợi một lúc vì có thể mất một chút thời gian. Giao dịch sẽ trông giống như thế này:

![Xem Địa chỉ giao dịch của bạn trên Etherscan](./etherscan-sepoila-contract-creation.png)

Địa chỉ From phải khớp với Địa chỉ Tài khoản MetaMask của bạn và Địa chỉ To sẽ ghi là “Contract Creation”. Nếu chúng ta nhấp vào giao dịch, chúng ta sẽ thấy Địa chỉ hợp đồng của mình trong trường To:

![Xem Địa chỉ hợp đồng của bạn trên Etherscan](./etherscan-sepolia-tx-details.png)

Tuyệt vời! Bạn vừa triển khai hợp đồng thông minh NFT của mình lên Chuỗi (mạng thử nghiệm) Ethereum!

Để hiểu những gì đang diễn ra bên trong, bạn có thể xem các yêu cầu mà ứng dụng của bạn nhận được trong [bảng điều khiển Alchemy](https://dashboard.alchemy.com/) của bạn.

Ở đó, bạn sẽ thấy một số lệnh gọi JSON-RPC mà Hardhat/Ethers đã thực hiện ngầm cho chúng ta khi chúng ta gọi hàm .deploy(). Hai lệnh gọi quan trọng cần nhắc đến ở đây là [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), là yêu cầu để thực sự ghi hợp đồng thông minh của chúng ta lên Chuỗi Sepolia, và [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) là yêu cầu để đọc thông tin về giao dịch của chúng ta dựa trên Mã băm (một mẫu điển hình khi gửi các giao dịch). Để tìm hiểu thêm về việc gửi các giao dịch, hãy xem [tài liệu về giao dịch](/developers/docs/transactions/).

Đó là tất cả cho Phần 1 của hướng dẫn này. Trong [Phần 2, chúng ta sẽ thực sự tương tác với hợp đồng thông minh của mình bằng cách đúc một NFT](/developers/tutorials/how-to-mint-an-nft/), và trong [Phần 3, chúng tôi sẽ chỉ cho bạn cách xem NFT của bạn trong Ví Ethereum của bạn](/developers/tutorials/how-to-view-nft-in-metamask/)!
