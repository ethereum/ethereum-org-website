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

Với việc NFT đưa chuỗi khối đến với công chúng, bây giờ là một cơ hội tuyệt vời để tự mình hiểu được sự cường điệu này bằng cách xuất bản hợp đồng NFT (Token ERC-721) của riêng bạn trên chuỗi khối Ethereum!

Alchemy vô cùng tự hào khi cung cấp sức mạnh cho những tên tuổi lớn nhất trong không gian NFT, bao gồm Makersplace (gần đây đã lập kỷ lục bán tác phẩm nghệ thuật kỹ thuật số tại Christie’s với giá 69 triệu đô la), Dapper Labs (nhà sáng tạo của NBA Top Shot & Crypto Kitties), OpenSea (thị trường NFT lớn nhất thế giới), Zora, Super Rare, NFTfi, Foundation, Enjin, Origin Protocol, Immutable, và nhiều hơn nữa.

Trong hướng dẫn này, chúng ta sẽ đi qua việc tạo và triển khai một hợp đồng thông minh ERC-721 trên mạng thử nghiệm Sepolia bằng cách sử dụng [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) và [Alchemy](https://alchemy.com/signup/eth) (đừng lo lắng nếu bạn chưa hiểu bất kỳ điều nào trong số này có nghĩa là gì — chúng tôi sẽ giải thích nó!).

Trong Phần 2 của hướng dẫn này, chúng ta sẽ đi qua cách chúng ta có thể sử dụng hợp đồng thông minh của mình để đúc một NFT, và trong Phần 3, chúng tôi sẽ giải thích cách xem NFT của bạn trên MetaMask.

Và tất nhiên, nếu bạn có câu hỏi ở bất kỳ thời điểm nào, đừng ngần ngại liên hệ trong [Discord của Alchemy](https://discord.gg/gWuC7zB) hoặc truy cập [tài liệu API NFT của Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Bước 1: Kết nối với mạng lưới Ethereum {#connect-to-ethereum}

Có rất nhiều cách để thực hiện các yêu cầu tới chuỗi khối Ethereum, nhưng để mọi thứ trở nên dễ dàng, chúng ta sẽ sử dụng một tài khoản miễn phí trên [Alchemy](https://alchemy.com/signup/eth), một nền tảng nhà phát triển chuỗi khối và API cho phép chúng ta giao tiếp với chuỗi Ethereum mà không cần phải chạy các nút của riêng mình.

Trong hướng dẫn này, chúng ta cũng sẽ tận dụng các công cụ dành cho nhà phát triển của Alchemy để giám sát và phân tích nhằm hiểu những gì đang diễn ra bên trong việc triển khai hợp đồng thông minh của chúng ta. Nếu bạn chưa có tài khoản Alchemy, bạn có thể đăng ký miễn phí [tại đây](https://alchemy.com/signup/eth).

## Bước 2: Tạo ứng dụng của bạn (và khóa API) {#make-api-key}

Sau khi bạn đã tạo tài khoản Alchemy, bạn có thể tạo khóa API bằng cách tạo một ứng dụng. Điều này sẽ cho phép chúng ta thực hiện các yêu cầu tới mạng thử nghiệm Sepolia. Hãy xem [hướng dẫn này](https://www.alchemy.com/docs/choosing-a-web3-network) nếu bạn tò mò muốn tìm hiểu thêm về các mạng thử nghiệm.

1. Điều hướng đến trang “Create App” trong Bảng điều khiển Alchemy của bạn bằng cách di chuột qua “Apps” trên thanh điều hướng và nhấp vào “Create App”

![Create your app](./create-your-app.png)

2. Đặt tên cho ứng dụng của bạn (chúng tôi đã chọn “My First NFT!”), cung cấp một mô tả ngắn, chọn “Ethereum” cho Chuỗi và chọn “Sepolia” cho mạng lưới của bạn. Kể từ The Merge, các mạng thử nghiệm khác đã bị ngừng sử dụng.

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. Nhấp vào “Create app” và thế là xong! Ứng dụng của bạn sẽ xuất hiện trong bảng bên dưới.

## Bước 3: Tạo một tài khoản Ethereum (địa chỉ) {#create-eth-address}

Chúng ta cần một tài khoản Ethereum để gửi và nhận các giao dịch. Đối với hướng dẫn này, chúng ta sẽ sử dụng MetaMask, một ví ảo trên trình duyệt được sử dụng để quản lý địa chỉ tài khoản Ethereum của bạn. Nếu bạn muốn hiểu thêm về cách các giao dịch trên Ethereum hoạt động, hãy xem [trang này](/developers/docs/transactions/) từ Tổ chức Ethereum.

Bạn có thể tải xuống và tạo tài khoản MetaMask miễn phí [tại đây](https://metamask.io/download). Khi bạn đang tạo tài khoản, hoặc nếu bạn đã có tài khoản, hãy đảm bảo chuyển sang “Sepolia Test Network” ở phía trên bên phải (để chúng ta không giao dịch bằng tiền thật).

![Set Sepolia as your network](./metamask-goerli.png)

## Bước 4: Thêm ether từ một vòi {#step-4-add-ether-from-a-faucet}

Để triển khai hợp đồng thông minh của chúng ta lên mạng thử nghiệm, chúng ta sẽ cần một số ETH giả. Để nhận ETH, bạn có thể truy cập [vòi Sepolia](https://sepoliafaucet.com/) do Alchemy lưu trữ, đăng nhập và nhập địa chỉ tài khoản của bạn, nhấp vào “Send Me ETH”. Bạn sẽ thấy ETH trong tài khoản MetaMask của mình ngay sau đó!

## Bước 5: Kiểm tra số dư của bạn {#check-balance}

Để kiểm tra lại xem số dư của chúng ta đã có ở đó chưa, hãy thực hiện một yêu cầu [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) bằng cách sử dụng [công cụ hộp cát của Alchemy](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). Điều này sẽ trả về số lượng ETH trong Ví của chúng ta. Sau khi bạn nhập địa chỉ Tài khoản MetaMask của mình và nhấp vào “Send Request”, bạn sẽ thấy một phản hồi như thế này:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **Lưu ý** Kết quả này tính bằng Wei, không phải ETH. Wei được sử dụng làm mệnh giá nhỏ nhất của ether. Việc chuyển đổi từ Wei sang ETH là 1 eth = 10<sup>18</sup> Wei. Vì vậy, nếu chúng ta chuyển đổi 0xde0b6b3a7640000 sang số thập phân, chúng ta sẽ nhận được 1\*10<sup>18</sup> Wei, tương đương với 1 ETH.

Phù! Tiền giả của chúng ta đều ở đó.
## Bước 6: Khởi tạo dự án của chúng ta {#initialize-project}

Đầu tiên, chúng ta sẽ cần tạo một thư mục cho dự án của mình. Điều hướng đến dòng lệnh của bạn và nhập:

    mkdir my-nft
    cd my-nft

Bây giờ chúng ta đã ở trong thư mục dự án của mình, chúng ta sẽ sử dụng npm init để khởi tạo dự án. Nếu bạn chưa cài đặt npm, hãy làm theo [hướng dẫn cài đặt Node.js](https://nodejs.org/en/download/) (chúng ta sẽ cần Node.js và npm cho hướng dẫn này).

    npm init

Cách bạn trả lời các câu hỏi cài đặt không thực sự quan trọng; đây là cách chúng tôi đã làm để tham khảo:

```json
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

Chấp thuận package.json và chúng ta đã sẵn sàng!
## Bước 7: Cài đặt [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat là một môi trường phát triển để biên dịch, triển khai, thử nghiệm và gỡ lỗi phần mềm Ethereum của bạn. Nó giúp các nhà phát triển khi xây dựng các hợp đồng thông minh và ứng dụng phi tập trung (dapp) cục bộ trước khi triển khai lên chuỗi trực tiếp.

Bên trong dự án my-nft của chúng ta, hãy chạy:

    npm install --save-dev hardhat

Hãy xem trang này để biết thêm chi tiết về [hướng dẫn cài đặt](https://hardhat.org/getting-started/#overview).

## Bước 8: Tạo dự án Hardhat {#create-hardhat-project}

Bên trong thư mục dự án của chúng ta, hãy chạy:

    npx hardhat

Sau đó, bạn sẽ thấy một thông báo chào mừng và tùy chọn để chọn những gì bạn muốn làm. Chọn “create an empty hardhat.config.js”:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

Điều này sẽ tạo ra một tệp hardhat.config.js cho chúng ta, đây là nơi chúng ta sẽ chỉ định tất cả các thiết lập cho dự án của mình (ở bước 13).

## Bước 9: Thêm các thư mục dự án {#add-project-folders}

Để giữ cho dự án của chúng ta được tổ chức, chúng ta sẽ tạo hai thư mục mới. Điều hướng đến thư mục gốc của dự án trong dòng lệnh của bạn và nhập:

    mkdir contracts
    mkdir scripts

- contracts/ là nơi chúng ta sẽ giữ mã hợp đồng thông minh NFT của mình

- scripts/ là nơi chúng ta sẽ giữ các tập lệnh để triển khai và tương tác với hợp đồng thông minh của mình

## Bước 10: Viết hợp đồng của chúng ta {#write-contract}

Bây giờ môi trường của chúng ta đã được thiết lập, hãy chuyển sang những thứ thú vị hơn: _viết mã hợp đồng thông minh của chúng ta!_

Mở dự án my-nft trong trình soạn thảo yêu thích của bạn (chúng tôi thích [VSCode](https://code.visualstudio.com/)). Các hợp đồng thông minh được viết bằng một ngôn ngữ gọi là Solidity, đây là ngôn ngữ chúng ta sẽ sử dụng để viết hợp đồng thông minh MyNFT.sol của mình.‌

1. Điều hướng đến thư mục `contracts` và tạo một tệp mới có tên là MyNFT.sol

2. Dưới đây là mã hợp đồng thông minh NFT của chúng ta, mà chúng tôi dựa trên việc triển khai ERC-721 của thư viện [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721). Sao chép và dán nội dung bên dưới vào tệp MyNFT.sol của bạn.

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

3. Bởi vì chúng ta đang kế thừa các lớp từ thư viện hợp đồng OpenZeppelin, trong dòng lệnh của bạn, hãy chạy `npm install @openzeppelin/contracts^4.0.0` để cài đặt thư viện vào thư mục của chúng ta.

Vậy, mã này _làm gì_ chính xác? Hãy chia nhỏ nó ra, từng dòng một.

Ở đầu hợp đồng thông minh của chúng ta, chúng ta nhập ba lớp hợp đồng thông minh [OpenZeppelin](https://openzeppelin.com/):

- @openzeppelin/contracts/token/ERC721/ERC721.sol chứa việc triển khai tiêu chuẩn ERC-721, mà hợp đồng thông minh NFT của chúng ta sẽ kế thừa. (Để trở thành một NFT hợp lệ, hợp đồng thông minh của bạn phải triển khai tất cả các phương thức của tiêu chuẩn ERC-721.) Để tìm hiểu thêm về các hàm ERC-721 được kế thừa, hãy xem định nghĩa giao diện [tại đây](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/utils/Counters.sol cung cấp các bộ đếm chỉ có thể tăng hoặc giảm một đơn vị. Hợp đồng thông minh của chúng ta sử dụng một bộ đếm để theo dõi tổng số NFT đã được đúc và đặt ID duy nhất trên NFT mới của chúng ta. (Mỗi NFT được đúc bằng hợp đồng thông minh phải được gán một ID duy nhất—ở đây ID duy nhất của chúng ta chỉ được xác định bởi tổng số NFT đang tồn tại. Ví dụ: NFT đầu tiên chúng ta đúc bằng hợp đồng thông minh của mình có ID là "1", NFT thứ hai của chúng ta có ID là "2", v.v.)

- @openzeppelin/contracts/access/Ownable.sol thiết lập [kiểm soát truy cập](https://docs.openzeppelin.com/contracts/3.x/access-control) trên hợp đồng thông minh của chúng ta, vì vậy chỉ chủ sở hữu của hợp đồng thông minh (bạn) mới có thể đúc NFT. (Lưu ý, việc bao gồm kiểm soát truy cập hoàn toàn là một tùy chọn. Nếu bạn muốn bất kỳ ai cũng có thể đúc một NFT bằng hợp đồng thông minh của bạn, hãy xóa từ Ownable ở dòng 10 và onlyOwner ở dòng 17.)

Sau các câu lệnh nhập của chúng ta, chúng ta có hợp đồng thông minh NFT tùy chỉnh của mình, nó ngắn gọn một cách đáng ngạc nhiên — nó chỉ chứa một bộ đếm, một hàm khởi tạo và một hàm duy nhất! Điều này là nhờ các hợp đồng OpenZeppelin được kế thừa của chúng ta, chúng triển khai hầu hết các phương thức chúng ta cần để tạo một NFT, chẳng hạn như `ownerOf` trả về chủ sở hữu của NFT và `transferFrom`, chuyển quyền sở hữu NFT từ tài khoản này sang tài khoản khác.

Trong hàm khởi tạo ERC-721 của chúng ta, bạn sẽ nhận thấy chúng ta truyền 2 chuỗi, “MyNFT” và “NFT.” Biến đầu tiên là tên của hợp đồng thông minh và biến thứ hai là ký hiệu của nó. Bạn có thể đặt tên cho mỗi biến này theo bất kỳ cách nào bạn muốn!

Cuối cùng, chúng ta có hàm `mintNFT(address recipient, string memory tokenURI)` cho phép chúng ta đúc một NFT! Bạn sẽ nhận thấy hàm này nhận vào hai biến:

- `address recipient` chỉ định địa chỉ sẽ nhận NFT mới được đúc của bạn

- `string memory tokenURI` là một chuỗi sẽ phân giải thành một tài liệu JSON mô tả siêu dữ liệu của NFT. Siêu dữ liệu của một NFT thực sự là thứ mang lại sức sống cho nó, cho phép nó có các thuộc tính có thể định cấu hình, chẳng hạn như tên, mô tả, hình ảnh và các thuộc tính khác. Trong phần 2 của hướng dẫn này, chúng tôi sẽ mô tả cách định cấu hình siêu dữ liệu này.

`mintNFT` gọi một số phương thức từ thư viện ERC-721 được kế thừa và cuối cùng trả về một số đại diện cho ID của NFT mới được đúc.

## Bước 11: Kết nối MetaMask & Alchemy với dự án của bạn {#connect-metamask-and-alchemy}

Bây giờ chúng ta đã tạo ví MetaMask, tài khoản Alchemy và viết hợp đồng thông minh của mình, đã đến lúc kết nối cả ba.

Mỗi giao dịch được gửi từ ví ảo của bạn đều yêu cầu một chữ ký bằng cách sử dụng khóa riêng tư duy nhất của bạn. Để cung cấp cho chương trình của chúng ta quyền này, chúng ta có thể lưu trữ an toàn khóa riêng tư (và khóa API Alchemy) của mình trong một tệp môi trường.

Để tìm hiểu thêm về việc gửi các giao dịch, hãy xem [hướng dẫn này](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) về việc gửi các giao dịch bằng Web3.

Đầu tiên, hãy cài đặt gói dotenv trong thư mục dự án của bạn:

    npm install dotenv --save

Sau đó, tạo một tệp `.env` trong thư mục gốc của dự án của chúng ta và thêm khóa riêng tư MetaMask và URL API Alchemy HTTP của bạn vào đó.

- Làm theo [các hướng dẫn này](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) để xuất khóa riêng tư của bạn từ MetaMask

- Xem bên dưới để lấy URL API Alchemy HTTP và sao chép nó vào khay nhớ tạm của bạn

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

Tệp `.env` của bạn bây giờ sẽ trông như thế này:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

Để thực sự kết nối những thứ này với mã của chúng ta, chúng ta sẽ tham chiếu các biến này trong tệp hardhat.config.js của mình ở bước 13.

<EnvWarningBanner />

## Bước 12: Cài đặt Ethers.js {#install-ethers}

Ethers.js là một thư viện giúp dễ dàng tương tác và thực hiện các yêu cầu tới Ethereum bằng cách bọc [các phương thức JSON-RPC tiêu chuẩn](/developers/docs/apis/json-rpc/) bằng các phương thức thân thiện với người dùng hơn.

Hardhat giúp việc tích hợp [các Plugin](https://hardhat.org/plugins/) trở nên cực kỳ dễ dàng để có thêm công cụ và chức năng mở rộng. Chúng ta sẽ tận dụng [plugin Ethers](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) cho việc triển khai hợp đồng ([Ethers.js](https://github.com/ethers-io/ethers.js/) có một số phương thức triển khai hợp đồng cực kỳ gọn gàng).

Trong thư mục dự án của bạn, hãy nhập:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

Chúng ta cũng sẽ yêu cầu ethers trong tệp hardhat.config.js của mình ở bước tiếp theo.

## Bước 13: Cập nhật hardhat.config.js {#update-hardhat-config}

Cho đến nay, chúng ta đã thêm một số phần phụ thuộc và plugin, bây giờ chúng ta cần cập nhật hardhat.config.js để dự án của chúng ta biết về tất cả chúng.

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

Để đảm bảo mọi thứ đang hoạt động cho đến nay, hãy biên dịch hợp đồng của chúng ta. Tác vụ biên dịch là một trong những tác vụ được tích hợp sẵn của hardhat.

Từ dòng lệnh, hãy chạy:

    npx hardhat compile

Bạn có thể nhận được cảnh báo về việc mã định danh giấy phép SPDX không được cung cấp trong tệp nguồn, nhưng không cần phải lo lắng về điều đó — hy vọng mọi thứ khác đều ổn! Nếu không, bạn luôn có thể nhắn tin trong [Discord của Alchemy](https://discord.gg/u72VCg3).

## Bước 15: Viết tập lệnh triển khai của chúng ta {#write-deploy}

Bây giờ hợp đồng của chúng ta đã được viết và tệp cấu hình của chúng ta đã sẵn sàng, đã đến lúc viết tập lệnh triển khai hợp đồng của chúng ta.

Điều hướng đến thư mục `scripts/` và tạo một tệp mới có tên là `deploy.js`, thêm nội dung sau vào đó:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Bắt đầu việc triển khai, trả về một promise phân giải thành một đối tượng hợp đồng
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat làm một công việc tuyệt vời trong việc giải thích những gì mỗi dòng mã này thực hiện trong [hướng dẫn Hợp đồng](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) của họ, chúng tôi đã áp dụng các giải thích của họ ở đây.

    const MyNFT = await ethers.getContractFactory("MyNFT");

Một ContractFactory trong ethers.js là một sự trừu tượng hóa được sử dụng để triển khai các hợp đồng thông minh mới, vì vậy MyNFT ở đây là một nhà máy cho các phiên bản của hợp đồng NFT của chúng ta. Khi sử dụng plugin hardhat-ethers, các phiên bản ContractFactory và Contract được kết nối với người ký đầu tiên theo mặc định.

    const myNFT = await MyNFT.deploy();

Việc gọi deploy() trên một ContractFactory sẽ bắt đầu việc triển khai và trả về một Promise phân giải thành một Contract. Đây là đối tượng có một phương thức cho mỗi hàm hợp đồng thông minh của chúng ta.

## Bước 16: Triển khai hợp đồng của chúng ta {#deploy-contract}

Cuối cùng chúng ta đã sẵn sàng để triển khai hợp đồng thông minh của mình! Điều hướng trở lại thư mục gốc của dự án của bạn và trong dòng lệnh, hãy chạy:

    npx hardhat --network sepolia run scripts/deploy.js

Sau đó, bạn sẽ thấy một cái gì đó giống như:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

Nếu chúng ta truy cập [Etherscan Sepolia](https://sepolia.etherscan.io/) và tìm kiếm địa chỉ hợp đồng của mình, chúng ta sẽ có thể thấy rằng nó đã được triển khai thành công. Nếu bạn không thể thấy nó ngay lập tức, vui lòng đợi một lúc vì có thể mất một chút thời gian. Giao dịch sẽ trông giống như thế này:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

Địa chỉ From phải khớp với địa chỉ tài khoản MetaMask của bạn và địa chỉ To sẽ ghi là “Contract Creation”. Nếu chúng ta nhấp vào giao dịch, chúng ta sẽ thấy địa chỉ hợp đồng của mình trong trường To:

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

Tuyệt vời! Bạn vừa triển khai hợp đồng thông minh NFT của mình lên chuỗi Ethereum (mạng thử nghiệm)!

Để hiểu những gì đang diễn ra bên trong, hãy điều hướng đến tab Explorer trong [bảng điều khiển Alchemy](https://dashboard.alchemy.com/explorer) của chúng ta. Nếu bạn có nhiều ứng dụng Alchemy, hãy đảm bảo lọc theo ứng dụng và chọn “MyNFT”.

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

Tại đây, bạn sẽ thấy một số lệnh gọi JSON-RPC mà Hardhat/Ethers đã thực hiện ngầm cho chúng ta khi chúng ta gọi hàm .deploy(). Hai lệnh gọi quan trọng cần nhắc đến ở đây là [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction), đây là yêu cầu thực sự ghi hợp đồng thông minh của chúng ta lên chuỗi Sepolia và [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) là yêu cầu đọc thông tin về giao dịch của chúng ta dựa trên mã băm (một mẫu điển hình khi gửi các giao dịch). Để tìm hiểu thêm về việc gửi các giao dịch, hãy xem hướng dẫn này về việc [gửi các giao dịch bằng Web3](/developers/tutorials/sending-transactions-using-web3-and-alchemy/).

Đó là tất cả cho Phần 1 của hướng dẫn này. Trong [Phần 2, chúng ta sẽ thực sự tương tác với hợp đồng thông minh của mình bằng cách đúc một NFT](/developers/tutorials/how-to-mint-an-nft/), và trong [Phần 3, chúng tôi sẽ chỉ cho bạn cách xem NFT của bạn trong ví Ethereum của bạn](/developers/tutorials/how-to-view-nft-in-metamask/)!
