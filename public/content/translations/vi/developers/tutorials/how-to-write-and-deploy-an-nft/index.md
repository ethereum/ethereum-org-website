---
title: Cách viết và triển khai một NFT (Phần 1/3 trong Loạt bài hướng dẫn về NFT)
description: Hướng dẫn này là phần 1 của chuỗi hướng dẫn về NFT mà sẽ đưa bạn từng bước viết và triển khai một hợp đồng thông minh cho mã thông báo không thể thay thế (mã ERC-721) sử dụng Ethereum và Hệ thống tệp liên hành tinh (IPFS).
author: "Sumi Mudgil"
tags:
  [
    "ERC-721",
    "Từ Alchemy",
    "Solidity",
    "hợp đồng thông minh"
  ]
skill: beginner
lang: vi
published: 2021-04-22
---

Với việc NFT đưa blockchain ra mắt công chúng, đây là một cơ hội tuyệt vời để tự mình tìm hiểu về cơn sốt này bằng cách xuất bản hợp đồng NFT (Mã thông báo ERC-721) của riêng bạn trên blockchain Ethereum!

Alchemy vô cùng tự hào khi cung cấp sức mạnh cho những tên tuổi lớn nhất trong không gian NFT, bao gồm Makersplace (gần đây đã lập kỷ lục bán tác phẩm nghệ thuật kỹ thuật số tại Christie's với giá 69 triệu đô la), Dapper Labs (những người tạo ra NBA Top Shot & Crypto Kitties), OpenSea (thị trường NFT lớn nhất thế giới), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable, và nhiều hơn nữa.

Trong bài hướng dẫn này, chúng ta sẽ thực hiện từng bước tạo và triển khai hợp đồng thông minh ERC-721 trên mạng thử nghiệm Sepolia bằng [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) và [Alchemy](https://alchemy.com/signup/eth) (đừng lo lắng nếu bạn chưa hiểu bất kỳ điều gì trong số này — chúng tôi sẽ giải thích!).

Trong Phần 2 của hướng dẫn này, chúng ta sẽ xem xét cách chúng ta có thể sử dụng hợp đồng thông minh của mình để tạo NFT và trong Phần 3, chúng ta sẽ giải thích cách xem NFT của bạn trên MetaMask.

Và tất nhiên, nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ trong [Alchemy Discord](https://discord.gg/gWuC7zB) hoặc truy cập [tài liệu API NFT của Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)!

## Bước 1: Kết nối với mạng Ethereum {#connect-to-ethereum}

Có nhiều cách để gửi yêu cầu đến blockchain Ethereum, nhưng để mọi thứ dễ dàng hơn, chúng ta sẽ sử dụng một tài khoản miễn phí trên [Alchemy](https://alchemy.com/signup/eth), một nền tảng nhà phát triển blockchain và API cho phép chúng ta giao tiếp với chuỗi Ethereum mà không cần phải chạy các nút của riêng mình.

Trong hướng dẫn này, chúng ta cũng sẽ tận dụng các công cụ dành cho nhà phát triển của Alchemy để theo dõi và phân tích để hiểu những gì đang diễn ra trong quá trình triển khai hợp đồng thông minh của chúng ta. Nếu bạn chưa có tài khoản Alchemy, bạn có thể đăng ký miễn phí [tại đây](https://alchemy.com/signup/eth).

## Bước 2: Tạo ứng dụng của bạn (và khóa API) {#make-api-key}

Khi bạn đã tạo tài khoản Alchemy, bạn có thể tạo một khoá API bằng cách tạo một ứng dụng. Điều này sẽ cho phép chúng ta gửi yêu cầu đến mạng thử nghiệm Sepolia. Hãy xem [hướng dẫn này](https://docs.alchemyapi.io/guides/choosing-a-network) nếu bạn muốn tìm hiểu thêm về các mạng thử nghiệm.

1. Đi đến trang "Tạo ứng dụng" trong bảng điều khiển Alchemy của bạn bằng cách di chuột qua "Các ứng dụng" trong thanh điều hướng và bấm vàp "Tạo ứng dụng"

![Tạo ứng dụng của bạn](./create-your-app.png)

2. Đặt tên cho ứng dụng của bạn (chúng tôi đã chọn “My First NFT!”), cung cấp mô tả ngắn, chọn “Ethereum” cho Chuỗi và chọn “Sepolia” cho mạng của bạn. Kể từ The Merge, các mạng thử nghiệm khác đã không còn được dùng nữa.

![Định cấu hình và xuất bản ứng dụng của bạn](./alchemy-explorer-sepolia.png)

3. Nhấp vào "Create app" và thế là xong! Ứng dụng của bạn sẽ xuất hiện trong bảng dưới đây.

## Bước 3: Tạo một tài khoản Ethereum (địa chỉ) {#create-eth-address}

Chúng ta cần một tài khoản Ethereum để gửi và nhận giao dịch. Trong bài hướng dẫn này, chúng ta sẽ sử dụng MetaMask, một ví ảo trong trình duyệt dùng để quản lý địa chỉ tài khoản Ethereum của bạn. Nếu bạn muốn tìm hiểu thêm về cách thức hoạt động của các giao dịch trên Ethereum, hãy xem [trang này](/developers/docs/transactions/) từ Ethereum Foundation.

Bạn có thể tải xuống và tạo tài khoản MetaMask miễn phí [tại đây](https://metamask.io/download). Khi bạn tạo tài khoản, hoặc nếu bạn đã có tài khoản, hãy đảm bảo chuyển sang “Sepolia Test Network” ở góc trên bên phải (để chúng ta không giao dịch bằng tiền thật).

![Đặt Sepolia làm mạng của bạn](./metamask-goerli.png)

## Bước 4: Thêm ether từ Faucet {#step-4-add-ether-from-a-faucet}

Để triển khai hợp đồng thông minh của chúng ta lên mạng thử nghiệm, chúng ta sẽ cần một ít ETH giả. Để nhận ETH, bạn có thể truy cập [Sepolia Faucet](https://sepoliafaucet.com/) do Alchemy cung cấp, đăng nhập và nhập địa chỉ tài khoản của bạn, rồi nhấp vào “Send Me ETH”. Bạn sẽ sớm thấy ETH trong tài khoản MetaMask của mình ngay sau đó!

## Bước 5: Kiểm tra số dư {#check-balance}

Để kiểm tra lại số dư, chúng ta hãy tạo một yêu cầu [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) bằng cách sử dụng [công cụ soạn thảo của Alchemy](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Thao tác này sẽ trả về lượng ETH có trong ví của chúng ta. Sau khi bạn nhập địa chỉ tài khoản MetaMask của mình và nhấp vào “Send Request”, bạn sẽ thấy một phản hồi như sau:

    ```
    `{\"jsonrpc\": \"2.0\", \"id\": 0, \"result\": \"0xde0b6b3a7640000\"}`
    ```

> **Lưu ý** Kết quả này được tính bằng wei, không phải ETH. Wei được sử dụng làm mệnh giá nhỏ nhất của ether. Tỷ lệ chuyển đổi từ wei sang ETH là 1 eth = 10<sup>18</sup> wei. Vì vậy, nếu chúng ta chuyển đổi 0xde0b6b3a7640000 sang hệ thập phân, chúng ta sẽ nhận được 1\*10<sup>18</sup> wei, tương đương 1 ETH.

Phù! Tiền giả của chúng ta đã có đủ.

## Bước 6: Khởi tạo dự án của chúng ta {#initialize-project}

Đầu tiên, chúng ta sẽ cần tạo một thư mục cho dự án của mình. Điều hướng đến dòng lệnh của bạn và gõ:

    ```
    mkdir my-nft
    cd my-nft
    ```

Bây giờ chúng ta đang ở trong thư mục dự án của mình, chúng ta sẽ sử dụng npm init để khởi tạo dự án. Nếu bạn chưa cài đặt npm, hãy làm theo [các hướng dẫn này](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (chúng ta cũng sẽ cần [Node.js](https://nodejs.org/en/download/), vì vậy hãy tải xuống luôn nhé!).

    ```
    npm init
    ```

Việc bạn trả lời các câu hỏi cài đặt như thế nào không thực sự quan trọng; đây là cách chúng tôi đã làm để bạn tham khảo:

```json
    tên gói: (my-nft)
    phiên bản: (1.0.0)
    mô tả: NFT đầu tiên của tôi!
    điểm vào: (index.js)
    lệnh kiểm tra:
    kho lưu trữ git:
    từ khóa:
    tác giả:
    giấy phép: (ISC)
    Sắp ghi vào /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "NFT đầu tiên của tôi!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Lỗi: không có bài kiểm tra nào được chỉ định\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

Phê duyệt package.json và chúng ta đã sẵn sàng!

## Bước 7: Cài đặt [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat là một môi trường phát triển để biên dịch, triển khai, kiểm thử và gỡ lỗi phần mềm Ethereum của bạn. Nó giúp các nhà phát triển khi xây dựng hợp đồng thông minh và các ứng dụng phi tập trung cục bộ trước khi triển khai lên chuỗi chính.

Bên trong dự án my-nft của chúng ta, hãy chạy:

    ```
    npm install --save-dev hardhat
    ```

Hãy xem trang này để biết thêm chi tiết về [hướng dẫn cài đặt](https://hardhat.org/getting-started/#overview).

## Bước 8: Tạo dự án Hardhat {#create-hardhat-project}

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
    👷 Chào mừng đến với Hardhat v2.0.11 👷‍
    ? Bạn muốn làm gì? …
    Tạo một dự án mẫu
    ❯ Tạo một tệp hardhat.config.js trống
    Thoát
    ```

Thao tác này sẽ tạo ra một tệp hardhat.config.js cho chúng ta, đây là nơi chúng ta sẽ chỉ định tất cả các thiết lập cho dự án của mình (ở bước 13).

## Bước 9: Thêm các thư mục dự án {#add-project-folders}

Để giữ cho dự án của chúng ta được ngăn nắp, chúng ta sẽ tạo hai thư mục mới. Điều hướng đến thư mục gốc của dự án của bạn trong dòng lệnh và gõ:

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ là nơi chúng ta sẽ lưu giữ mã hợp đồng thông minh NFT của mình

- scripts/ là nơi chúng ta sẽ lưu giữ các tập lệnh để triển khai và tương tác với hợp đồng thông minh của mình

## Bước 10: Viết hợp đồng của chúng ta {#write-contract}

Bây giờ môi trường của chúng ta đã được thiết lập, hãy đến với những thứ thú vị hơn: _viết mã hợp đồng thông minh của chúng ta!_

Mở dự án my-nft trong trình chỉnh sửa yêu thích của bạn (chúng tôi thích [VSCode](https://code.visualstudio.com/)). Các hợp đồng thông minh được viết bằng một ngôn ngữ gọi là Solidity và đây là ngôn ngữ chúng ta sẽ sử dụng để viết hợp đồng thông minh MyNFT.sol của mình.‌

1. Điều hướng đến thư mục `contracts` và tạo một tệp mới có tên là MyNFT.sol

2. Dưới đây là mã hợp đồng thông minh NFT của chúng tôi, dựa trên việc triển khai ERC-721 của thư viện [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Sao chép và dán nội dung bên dưới vào tệp MyNFT.sol của bạn.

   ```solidity
   //Hợp đồng dựa trên [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Bởi vì chúng ta đang kế thừa các lớp từ thư viện hợp đồng OpenZeppelin, hãy chạy `npm install @openzeppelin/contracts^4.0.0` trong dòng lệnh của bạn để cài đặt thư viện vào thư mục của chúng ta.

Vậy, chính xác thì đoạn mã này _làm_ gì? Hãy cùng phân tích nó, từng dòng một.

Ở đầu hợp đồng thông minh của chúng ta, chúng ta nhập ba lớp hợp đồng thông minh [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol chứa phần triển khai của tiêu chuẩn ERC-721, mà hợp đồng thông minh NFT của chúng ta sẽ kế thừa. (Để là một NFT hợp lệ, hợp đồng thông minh của bạn phải triển khai tất cả các phương thức của tiêu chuẩn ERC-721.) Để tìm hiểu thêm về các hàm ERC-721 được kế thừa, hãy xem định nghĩa giao diện [tại đây](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol cung cấp các bộ đếm chỉ có thể tăng hoặc giảm một đơn vị. Hợp đồng thông minh của chúng ta sử dụng một bộ đếm để theo dõi tổng số NFT được đúc và đặt ID duy nhất trên NFT mới của chúng ta. (Mỗi NFT được đúc bằng hợp đồng thông minh phải được gán một ID duy nhất — ở đây, ID duy nhất của chúng ta chỉ được xác định bằng tổng số NFT đang tồn tại. Ví dụ: NFT đầu tiên chúng ta đúc bằng hợp đồng thông minh của mình có ID là "1," NFT thứ hai của chúng ta có ID là "2," v.v.)

- @openzeppelin/contracts/access/Ownable.sol thiết lập [kiểm soát truy cập](https://docs.openzeppelin.com/contracts/3.x/access-control) trên hợp đồng thông minh của chúng ta, vì vậy chỉ chủ sở hữu của hợp đồng thông minh (bạn) mới có thể đúc NFT. (Lưu ý, việc bao gồm kiểm soát truy cập hoàn toàn là một tùy chọn. Nếu bạn muốn bất kỳ ai cũng có thể đúc một NFT bằng hợp đồng thông minh của mình, hãy xóa từ Ownable ở dòng 10 và onlyOwner ở dòng 17.)

Sau các câu lệnh nhập của chúng ta, chúng ta có hợp đồng thông minh NFT tùy chỉnh, ngắn một cách đáng ngạc nhiên — nó chỉ chứa một bộ đếm, một hàm khởi tạo và một hàm duy nhất! Điều này là nhờ các hợp đồng OpenZeppelin được kế thừa của chúng ta, vốn triển khai hầu hết các phương thức chúng ta cần để tạo một NFT, chẳng hạn như `ownerOf` trả về chủ sở hữu của NFT, và `transferFrom` chuyển quyền sở hữu NFT từ tài khoản này sang tài khoản khác.

Trong hàm khởi tạo ERC-721, bạn sẽ nhận thấy chúng ta truyền 2 chuỗi, “MyNFT” và “NFT.” Biến đầu tiên là tên của hợp đồng thông minh và biến thứ hai là ký hiệu của nó. Bạn có thể đặt tên cho mỗi biến này theo bất cứ điều gì bạn muốn!

Cuối cùng, chúng ta có hàm `mintNFT(address recipient, string memory tokenURI)` cho phép chúng ta đúc một NFT! Bạn sẽ nhận thấy hàm này có hai biến:

- `address recipient` chỉ định địa chỉ sẽ nhận NFT mới được đúc của bạn

- `string memory tokenURI` là một chuỗi sẽ phân giải thành một tài liệu JSON mô tả siêu dữ liệu của NFT. Siêu dữ liệu của NFT thực sự là thứ mang lại sự sống cho nó, cho phép nó có các thuộc tính có thể định cấu hình, chẳng hạn như tên, mô tả, hình ảnh và các thuộc tính khác. Trong phần 2 của bài hướng dẫn này, chúng tôi sẽ mô tả cách định cấu hình siêu dữ liệu này.

`mintNFT` gọi một số phương thức từ thư viện ERC-721 được kế thừa, và cuối cùng trả về một số đại diện cho ID của NFT mới được đúc.

## Bước 11: Kết nối MetaMask & Alchemy với dự án của bạn {#connect-metamask-and-alchemy}

Bây giờ chúng ta đã tạo ví MetaMask, tài khoản Alchemy và viết hợp đồng thông minh của mình, đã đến lúc kết nối cả ba.

Mọi giao dịch được gửi từ ví ảo của bạn đều yêu cầu chữ ký bằng khóa riêng tư duy nhất của bạn. Để cấp quyền này cho chương trình của chúng ta, chúng ta có thể lưu trữ khóa riêng tư (và khóa API Alchemy) một cách an toàn trong một tệp môi trường.

Để tìm hiểu thêm về việc gửi giao dịch, hãy xem [bài hướng dẫn này](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) về việc gửi giao dịch bằng web3.

Đầu tiên, cài đặt gói dotenv trong thư mục dự án của bạn:

    ```
    npm install dotenv --save
    ```

Sau đó, tạo một tệp `.env` trong thư mục gốc của dự án và thêm khóa riêng tư MetaMask và URL API HTTP Alchemy của bạn vào đó.

- Làm theo [các hướng dẫn này](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) để xuất khóa riêng tư của bạn từ MetaMask

- Xem bên dưới để lấy URL API HTTP Alchemy và sao chép nó vào clipboard của bạn

![Sao chép URL API Alchemy của bạn](./copy-alchemy-api-url.gif)

Tệp `.env` của bạn bây giờ sẽ trông như thế này:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

Để thực sự kết nối chúng với mã của chúng ta, chúng ta sẽ tham chiếu các biến này trong tệp hardhat.config.js ở bước 13.

<EnvWarningBanner />

## Bước 12: Cài đặt Ethers.js {#install-ethers}

Ethers.js là một thư viện giúp tương tác và gửi yêu cầu đến Ethereum dễ dàng hơn bằng cách gói [các phương thức JSON-RPC tiêu chuẩn](/developers/docs/apis/json-rpc/) với các phương thức thân thiện hơn với người dùng.

Hardhat giúp tích hợp [Plugin](https://hardhat.org/plugins/) cho các công cụ bổ sung và chức năng mở rộng trở nên siêu dễ dàng. Chúng tôi sẽ tận dụng [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) để triển khai hợp đồng ([Ethers.js](https://github.com/ethers-io/ethers.js/) có một số phương pháp triển khai hợp đồng siêu gọn gàng).

Trong thư mục dự án của bạn, hãy gõ:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

Chúng ta cũng sẽ cần ethers trong tệp hardhat.config.js ở bước tiếp theo.

## Bước 13: Cập nhật hardhat.config.js {#update-hardhat-config}

Chúng ta đã thêm một số phụ thuộc và plugin cho đến nay, bây giờ chúng ta cần cập nhật hardhat.config.js để dự án của chúng ta biết về tất cả chúng.

Cập nhật tệp hardhat.config.js của bạn để trông như thế này:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## Bước 14: Biên dịch hợp đồng của chúng ta {#compile-contract}

Để đảm bảo mọi thứ đều hoạt động cho đến nay, hãy biên dịch hợp đồng của chúng ta. Tác vụ biên dịch là một trong những tác vụ có sẵn của hardhat.

Từ dòng lệnh, hãy chạy:

    ```
    npx hardhat compile
    ```

Bạn có thể nhận được cảnh báo về mã định danh giấy phép SPDX không được cung cấp trong tệp nguồn, nhưng không cần phải lo lắng về điều đó — hy vọng mọi thứ khác đều ổn! Nếu không, bạn luôn có thể nhắn tin trong [Alchemy discord](https://discord.gg/u72VCg3).

## Bước 15: Viết tập lệnh triển khai của chúng ta {#write-deploy}

Bây giờ hợp đồng của chúng ta đã được viết và tệp cấu hình đã sẵn sàng, đã đến lúc viết tập lệnh triển khai hợp đồng của chúng ta.

Điều hướng đến thư mục `scripts/` và tạo một tệp mới có tên `deploy.js`, thêm nội dung sau vào đó:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Bắt đầu triển khai, trả về một promise phân giải thành một đối tượng hợp đồng
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Hợp đồng được triển khai đến địa chỉ:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat đã làm rất tốt việc giải thích mỗi dòng mã này làm gì trong [Bài hướng dẫn về Hợp đồng](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) của họ, chúng tôi đã áp dụng các giải thích của họ ở đây.

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

Một ContractFactory trong ethers.js là một sự trừu tượng được sử dụng để triển khai các hợp đồng thông minh mới, vì vậy MyNFT ở đây là một nhà máy cho các phiên bản của hợp đồng NFT của chúng ta. Khi sử dụng plugin hardhat-ethers, các phiên bản ContractFactory và Contract được kết nối với người ký đầu tiên theo mặc định.

    ```
    const myNFT = await MyNFT.deploy();
    ```

Việc gọi deploy() trên một ContractFactory sẽ bắt đầu quá trình triển khai và trả về một Promise phân giải thành một Hợp đồng. Đây là đối tượng có một phương thức cho mỗi chức năng hợp đồng thông minh của chúng ta.

## Bước 16: Triển khai hợp đồng của chúng ta {#deploy-contract}

Cuối cùng, chúng ta đã sẵn sàng để triển khai hợp đồng thông minh của mình! Điều hướng trở lại thư mục gốc của dự án của bạn và trong dòng lệnh, hãy chạy:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

Sau đó, bạn sẽ thấy một cái gì đó như thế này:

    ```
    Hợp đồng được triển khai đến địa chỉ: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

Nếu chúng ta truy cập [Sepolia etherscan](https://sepolia.etherscan.io/) và tìm kiếm địa chỉ hợp đồng của mình, chúng ta sẽ có thể thấy rằng nó đã được triển khai thành công. Nếu bạn không thể nhìn thấy nó ngay lập tức, vui lòng đợi một lát vì có thể mất một chút thời gian. Giao dịch sẽ trông giống như thế này:

![Xem địa chỉ giao dịch của bạn trên Etherscan](./etherscan-sepoila-contract-creation.png)

Địa chỉ Từ sẽ khớp với địa chỉ tài khoản MetaMask của bạn và địa chỉ Đến sẽ hiển thị “Tạo Hợp đồng”. Nếu chúng ta nhấp vào giao dịch, chúng ta sẽ thấy địa chỉ hợp đồng của mình trong trường Đến:

![Xem địa chỉ hợp đồng của bạn trên Etherscan](./etherscan-sepolia-tx-details.png)

Tuyệt vời! Bạn vừa triển khai hợp đồng thông minh NFT của mình lên chuỗi Ethereum (mạng thử nghiệm)!

Để hiểu những gì đang diễn ra ở hậu trường, hãy điều hướng đến tab Explorer trong [bảng điều khiển Alchemy](https://dashboard.alchemyapi.io/explorer) của chúng ta. Nếu bạn có nhiều ứng dụng Alchemy, hãy đảm bảo lọc theo ứng dụng và chọn “MyNFT”.

![Xem các lệnh gọi được thực hiện “ở hậu trường” với Bảng điều khiển Explorer của Alchemy](./alchemy-explorer-goerli.png)

Ở đây, bạn sẽ thấy một số lệnh gọi JSON-RPC mà Hardhat/Ethers đã thực hiện ở hậu trường cho chúng ta khi chúng ta gọi hàm .deploy(). Hai điều quan trọng cần đề cập ở đây là [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), là yêu cầu thực sự ghi hợp đồng thông minh của chúng ta vào chuỗi Sepolia, và [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash), là yêu cầu đọc thông tin về giao dịch của chúng ta dựa trên hàm băm (một mẫu điển hình khi gửi giao dịch). Để tìm hiểu thêm về việc gửi giao dịch, hãy xem bài hướng dẫn này về [việc gửi giao dịch bằng Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Đó là tất cả cho Phần 1 của bài hướng dẫn này. Trong [Phần 2, chúng ta sẽ thực sự tương tác với hợp đồng thông minh của mình bằng cách đúc một NFT](/developers/tutorials/how-to-mint-an-nft/), và trong [Phần 3, chúng tôi sẽ chỉ cho bạn cách xem NFT của mình trong ví Ethereum của bạn](/developers/tutorials/how-to-view-nft-in-metamask/)!
