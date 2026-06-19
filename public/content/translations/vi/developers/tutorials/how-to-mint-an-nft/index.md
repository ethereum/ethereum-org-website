---
title: Cách đúc một NFT (Phần 2/3 của Chuỗi hướng dẫn về NFT)
description: Hướng dẫn này mô tả cách đúc một NFT trên chuỗi khối Ethereum bằng cách sử dụng hợp đồng thông minh của chúng tôi và Web3.
author: "Sumi Mudgil"
tags: ["ERC-721", "alchemy", "solidity", "hợp đồng thông minh"]
skill: beginner
breadcrumb: Đúc một NFT
lang: vi
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 triệu USD
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 triệu USD
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 triệu USD

Tất cả họ đều đúc NFT của mình bằng cách sử dụng API mạnh mẽ của Alchemy. Trong hướng dẫn này, chúng tôi sẽ chỉ cho bạn cách làm điều tương tự trong \<10 phút.

"Việc đúc một NFT" là hành động xuất bản một phiên bản duy nhất của token ERC-721 của bạn lên chuỗi khối. Sử dụng hợp đồng thông minh của chúng tôi từ [Phần 1 của chuỗi hướng dẫn về NFT này](/developers/tutorials/how-to-write-and-deploy-an-nft/), hãy cùng thể hiện kỹ năng Web3 của chúng ta và đúc một NFT. Vào cuối hướng dẫn này, bạn sẽ có thể đúc bao nhiêu NFT tùy thích (và tùy theo ví của bạn)!

Hãy cùng bắt đầu nào!

## Bước 1: Cài đặt Web3 {#install-web3}

Nếu bạn đã làm theo hướng dẫn đầu tiên về cách tạo hợp đồng thông minh NFT của mình, bạn đã có kinh nghiệm sử dụng Ethers.js. Web3 tương tự như Ethers, vì nó là một thư viện được sử dụng để giúp việc tạo các yêu cầu đến chuỗi khối [Ethereum](/) trở nên dễ dàng hơn. Trong hướng dẫn này, chúng ta sẽ sử dụng [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), đây là một thư viện Web3 nâng cao cung cấp tính năng tự động thử lại và hỗ trợ WebSocket mạnh mẽ.

Trong thư mục gốc của dự án, hãy chạy:

```
npm install @alch/alchemy-web3
```

## Bước 2: Tạo một tệp `mint-nft.js` {#create-mintnftjs}

Bên trong thư mục scripts của bạn, hãy tạo một tệp `mint-nft.js` và thêm các dòng mã sau:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Bước 3: Lấy ABI hợp đồng của bạn {#contract-abi}

ABI (Giao diện nhị phân ứng dụng) hợp đồng của chúng ta là giao diện để tương tác với hợp đồng thông minh. Bạn có thể tìm hiểu thêm về ABI hợp đồng [tại đây](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat tự động tạo một ABI cho chúng ta và lưu nó trong tệp `MyNFT.json`. Để sử dụng tệp này, chúng ta sẽ cần phân tích cú pháp nội dung bằng cách thêm các dòng mã sau vào tệp `mint-nft.js` của mình:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Nếu bạn muốn xem ABI, bạn có thể in nó ra bảng điều khiển (console) của mình:

```js
console.log(JSON.stringify(contract.abi))
```

Để chạy `mint-nft.js` và xem ABI của bạn được in ra bảng điều khiển, hãy điều hướng đến terminal của bạn và chạy:

```js
node scripts/mint-nft.js
```

## Bước 4: Cấu hình siêu dữ liệu cho NFT của bạn bằng IPFS {#config-meta}

Nếu bạn còn nhớ từ hướng dẫn của chúng ta trong Phần 1, hàm hợp đồng thông minh `mintNFT` của chúng ta nhận vào một tham số tokenURI sẽ phân giải thành một tài liệu JSON mô tả siêu dữ liệu của NFT — đây thực sự là thứ mang lại sức sống cho NFT, cho phép nó có các thuộc tính có thể cấu hình, chẳng hạn như tên, mô tả, hình ảnh và các thuộc tính khác.

> _Hệ thống tệp liên hành tinh (IPFS) là một giao thức phi tập trung và mạng lưới ngang hàng để lưu trữ và chia sẻ dữ liệu trong một hệ thống tệp phân tán._

Chúng ta sẽ sử dụng Pinata, một API và bộ công cụ IPFS tiện lợi, để lưu trữ tài sản và siêu dữ liệu NFT của chúng ta nhằm đảm bảo NFT của chúng ta thực sự phi tập trung. Nếu bạn chưa có tài khoản Pinata, hãy đăng ký một tài khoản miễn phí [tại đây](https://app.pinata.cloud) và hoàn thành các bước để xác minh email của bạn.

Sau khi bạn đã tạo tài khoản:

- Điều hướng đến trang "Files" và nhấp vào nút "Upload" màu xanh lam ở trên cùng bên trái của trang.

- Tải một hình ảnh lên Pinata — đây sẽ là tài sản hình ảnh cho NFT của bạn. Bạn có thể thoải mái đặt tên cho tài sản theo ý muốn

- Sau khi tải lên, bạn sẽ thấy thông tin tệp trong bảng trên trang "Files". Bạn cũng sẽ thấy một cột CID. Bạn có thể sao chép CID bằng cách nhấp vào nút sao chép bên cạnh nó. Bạn có thể xem tệp tải lên của mình tại: `https://gateway.pinata.cloud/ipfs/<CID>`. Ví dụ, bạn có thể tìm thấy hình ảnh chúng tôi đã sử dụng trên IPFS [tại đây](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Đối với những người học trực quan hơn, các bước trên được tóm tắt tại đây:

![How to upload your image to Pinata](./instructionsPinata.gif)

Bây giờ, chúng ta sẽ muốn tải thêm một tài liệu nữa lên Pinata. Nhưng trước khi làm điều đó, chúng ta cần tạo nó!

Trong thư mục gốc của bạn, hãy tạo một tệp mới có tên là `nft-metadata.json` và thêm mã json sau:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Bạn có thể thoải mái thay đổi dữ liệu trong json. Bạn có thể xóa hoặc thêm vào phần thuộc tính (attributes). Quan trọng nhất, hãy đảm bảo trường hình ảnh (image) trỏ đến vị trí hình ảnh IPFS của bạn — nếu không, NFT của bạn sẽ bao gồm một bức ảnh của một chú chó (rất dễ thương!).

Sau khi bạn chỉnh sửa xong tệp JSON, hãy lưu nó và tải lên Pinata, làm theo các bước tương tự như chúng ta đã làm để tải hình ảnh lên.

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## Bước 5: Tạo một phiên bản của hợp đồng của bạn {#instance-contract}

Bây giờ, để tương tác với hợp đồng của chúng ta, chúng ta cần tạo một phiên bản của nó trong mã của mình. Để làm như vậy, chúng ta sẽ cần địa chỉ hợp đồng mà chúng ta có thể lấy từ việc triển khai hoặc [Blockscout](https://eth-sepolia.blockscout.com/) bằng cách tra cứu địa chỉ bạn đã sử dụng để triển khai hợp đồng.

![View your contract address on Etherscan](./view-contract-etherscan.png)

Trong ví dụ trên, địa chỉ hợp đồng của chúng ta là 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Tiếp theo, chúng ta sẽ sử dụng [phương thức hợp đồng](https://docs.web3js.org/api/web3-eth-contract/class/Contract) của Web3 để tạo hợp đồng của chúng ta bằng cách sử dụng ABI và địa chỉ. Trong tệp `mint-nft.js` của bạn, hãy thêm đoạn sau:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Bước 6: Cập nhật tệp `.env` {#update-env}

Bây giờ, để tạo và gửi các giao dịch đến chuỗi Ethereum, chúng ta sẽ sử dụng địa chỉ tài khoản Ethereum công khai của bạn để lấy nonce của tài khoản (sẽ giải thích bên dưới).

Thêm khóa công khai của bạn vào tệp `.env` của bạn — nếu bạn đã hoàn thành phần 1 của hướng dẫn, tệp `.env` của chúng ta bây giờ sẽ trông như thế này:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Bước 7: Tạo giao dịch của bạn {#create-txn}

Đầu tiên, hãy định nghĩa một hàm có tên là `mintNFT(tokenData)` và tạo giao dịch của chúng ta bằng cách thực hiện những việc sau:

1. Lấy _PRIVATE_KEY_ và _PUBLIC_KEY_ của bạn từ tệp `.env`.

1. Tiếp theo, chúng ta sẽ cần tìm ra nonce của tài khoản. Đặc tả nonce được sử dụng để theo dõi số lượng giao dịch được gửi từ địa chỉ của bạn — điều mà chúng ta cần cho mục đích bảo mật và để ngăn chặn [các cuộc tấn công phát lại (replay attacks)](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Để lấy số lượng giao dịch được gửi từ địa chỉ của bạn, chúng ta sử dụng [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

1. Cuối cùng, chúng ta sẽ thiết lập giao dịch của mình với các thông tin sau:

- `'from': PUBLIC_KEY` — Nguồn gốc giao dịch của chúng ta là địa chỉ công khai của chúng ta

- `'to': contractAddress` — Hợp đồng mà chúng ta muốn tương tác và gửi giao dịch đến

- `'nonce': nonce` — Nonce của tài khoản với số lượng giao dịch được gửi từ địa chỉ của chúng ta

- `'gas': estimatedGas` — Lượng Gas ước tính cần thiết để hoàn thành giao dịch

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Phép tính mà chúng ta muốn thực hiện trong giao dịch này — trong trường hợp này là việc đúc một NFT

Tệp `mint-nft.js` của bạn bây giờ sẽ trông như thế này:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //lấy nonce mới nhất

   //giao dịch
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## Bước 8: Ký giao dịch {#sign-txn}

Bây giờ chúng ta đã tạo giao dịch của mình, chúng ta cần ký nó để gửi đi. Đây là lúc chúng ta sẽ sử dụng khóa riêng tư của mình.

`web3.eth.sendSignedTransaction` sẽ cung cấp cho chúng ta mã băm giao dịch, mà chúng ta có thể sử dụng để đảm bảo giao dịch của mình đã được khai thác và không bị mạng lưới loại bỏ. Bạn sẽ nhận thấy trong phần ký giao dịch, chúng tôi đã thêm một số kiểm tra lỗi để chúng ta biết liệu giao dịch của mình có được thực hiện thành công hay không.

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //lấy nonce mới nhất

  //giao dịch
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## Bước 9: Gọi `mintNFT` và chạy node `mint-nft.js` {#call-mintnft-fn}

Bạn còn nhớ `metadata.json` mà bạn đã tải lên Pinata không? Lấy mã băm của nó từ Pinata và truyền đoạn sau làm tham số cho hàm `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Dưới đây là cách lấy mã băm:

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_Cách lấy mã băm siêu dữ liệu nft của bạn trên Pinata_

> Kiểm tra kỹ xem mã băm bạn đã sao chép có liên kết đến **metadata.json** của bạn hay không bằng cách tải `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` vào một cửa sổ riêng. Trang sẽ trông giống như ảnh chụp màn hình bên dưới:

![Your page should display the json metadata](./metadataJSON.png)_Trang của bạn sẽ hiển thị siêu dữ liệu json_

Nhìn chung, mã của bạn sẽ trông giống như thế này:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //lấy nonce mới nhất

  //giao dịch
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Bây giờ, hãy chạy `node scripts/mint-nft.js` để triển khai NFT của bạn. Sau vài giây, bạn sẽ thấy một phản hồi như thế này trong terminal của mình:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

Tiếp theo, hãy truy cập [mempool Alchemy](https://dashboard.alchemyapi.io/mempool) của bạn để xem trạng thái giao dịch của bạn (cho dù nó đang chờ xử lý, đã được khai thác hay bị mạng lưới loại bỏ). Nếu giao dịch của bạn bị loại bỏ, việc kiểm tra [Blockscout](https://eth-sepolia.blockscout.com/) và tìm kiếm mã băm giao dịch của bạn cũng rất hữu ích.

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_Xem mã băm giao dịch NFT của bạn trên Etherscan_

Và thế là xong! Bây giờ bạn đã triển khai VÀ đúc một NFT trên chuỗi khối Ethereum <Emoji text=":money_mouth_face:" size={1} />

Sử dụng `mint-nft.js`, bạn có thể đúc bao nhiêu NFT tùy thích (và tùy theo ví của bạn)! Chỉ cần đảm bảo truyền vào một tokenURI mới mô tả siêu dữ liệu của NFT (nếu không, bạn sẽ chỉ tạo ra một loạt các NFT giống hệt nhau với các ID khác nhau).

Có lẽ, bạn muốn có thể khoe NFT trong ví của mình — vì vậy hãy nhớ xem [Phần 3: Cách xem NFT trong Ví của bạn](/developers/tutorials/how-to-view-nft-in-metamask/)!