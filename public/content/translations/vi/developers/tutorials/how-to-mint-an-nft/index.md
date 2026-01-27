---
title: "Cách Đúc một NFT (Phần 2/3 của Chuỗi Hướng dẫn NFT)"
description: "Hướng dẫn này mô tả cách đúc một NFT trên chuỗi khối Ethereum bằng cách sử dụng hợp đồng thông minh của chúng tôi và Web3."
author: "Sumi Mudgil"
tags:
  [
    "ERC-721",
    "từ Alchemy",
    "solidity",
    "hợp đồng thông minh"
  ]
skill: beginner
lang: vi
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 69 triệu đô la
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 11 triệu đô la
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 6 triệu đô la

Tất cả họ đã đúc các NFT của mình bằng cách sử dụng Giao diện Lập trình Ứng dụng mạnh mẽ của Alchemy. Trong hướng dẫn này, chúng tôi sẽ dạy bạn cách làm điều tương tự trong vòng \<10 phút.

“Đúc một NFT” là hành động xuất bản một phiên bản duy nhất của token ERC-721 của bạn trên chuỗi khối. Sử dụng hợp đồng thông minh của chúng tôi từ [Phần 1 của chuỗi hướng dẫn NFT này](/developers/tutorials/how-to-write-and-deploy-an-nft/), hãy vận dụng các kỹ năng Web3 của chúng ta và đúc một NFT. Khi kết thúc hướng dẫn này, bạn sẽ có thể đúc bao nhiêu NFT tùy thích (và ví của bạn cho phép)!

Bắt đầu ngay!

## Bước 1: Cài đặt Web3 {#install-web3}

Nếu bạn đã làm theo hướng dẫn đầu tiên về việc tạo hợp đồng thông minh NFT của mình, bạn đã có kinh nghiệm sử dụng Ethers.js. Web3 tương tự như Ethers, vì đây là một thư viện được sử dụng để giúp việc tạo các yêu cầu tới chuỗi khối Ethereum dễ dàng hơn. Trong hướng dẫn này, chúng ta sẽ sử dụng [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), một thư viện Web3 nâng cao cung cấp tính năng tự động thử lại và hỗ trợ WebSocket mạnh mẽ.

Trong thư mục chính của dự án của bạn, hãy chạy:

```
npm install @alch/alchemy-web3
```

## Bước 2: Tạo tệp `mint-nft.js` {#create-mintnftjs}

Bên trong thư mục tập lệnh của bạn, hãy tạo một tệp `mint-nft.js` và thêm các dòng mã sau:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## Bước 3: Lấy ABI hợp đồng của bạn {#contract-abi}

ABI (Giao diện nhị phân ứng dụng) hợp đồng của chúng tôi là giao diện để tương tác với hợp đồng thông minh của chúng tôi. Bạn có thể tìm hiểu thêm về ABI của Hợp đồng [tại đây](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat tự động tạo ABI cho chúng tôi và lưu nó trong tệp `MyNFT.json`. Để sử dụng, chúng ta sẽ cần phân tích cú pháp nội dung bằng cách thêm các dòng mã sau vào tệp `mint-nft.js` của mình:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

Nếu bạn muốn xem ABI, bạn có thể in nó ra bảng điều khiển của mình:

```js
console.log(JSON.stringify(contract.abi))
```

Để chạy `mint-nft.js` và xem ABI của bạn được in ra bảng điều khiển, hãy điều hướng đến thiết bị đầu cuối của bạn và chạy:

```js
node scripts/mint-nft.js
```

## Bước 4: Định cấu hình siêu dữ liệu cho NFT của bạn bằng IPFS {#config-meta}

Nếu bạn còn nhớ từ hướng dẫn của chúng tôi trong Phần 1, hàm hợp đồng thông minh `mintNFT` của chúng tôi có một tham số tokenURI sẽ phân giải thành một tài liệu JSON mô tả siêu dữ liệu của NFT—đó thực sự là thứ mang lại sức sống cho NFT, cho phép nó có các thuộc tính có thể định cấu hình, chẳng hạn như tên, mô tả, hình ảnh và các thuộc tính khác.

> _Hệ thống Tệp Liên hành tinh (IPFS) là một giao thức phi tập trung và mạng ngang hàng để lưu trữ và chia sẻ dữ liệu trong một hệ thống tệp phân tán._

Chúng tôi sẽ sử dụng Pinata, một Giao diện Lập trình Ứng dụng và bộ công cụ IPFS tiện lợi, để lưu trữ tài sản NFT và siêu dữ liệu của chúng tôi nhằm đảm bảo NFT của chúng tôi thực sự phi tập trung. Nếu bạn chưa có tài khoản Pinata, hãy đăng ký một tài khoản miễn phí [tại đây](https://app.pinata.cloud) và hoàn thành các bước để xác minh email của bạn.

Sau khi bạn đã tạo tài khoản:

- Điều hướng đến trang “Tệp” và nhấp vào nút "Tải lên" màu xanh lam ở trên cùng bên trái của trang.

- Tải hình ảnh lên Pinata — đây sẽ là tài sản hình ảnh cho NFT của bạn. Bạn có thể đặt tên cho tài sản bất cứ điều gì bạn muốn

- Sau khi bạn tải lên, bạn sẽ thấy thông tin tệp trong bảng trên trang "Tệp". Bạn cũng sẽ thấy một cột CID. Bạn có thể sao chép CID bằng cách nhấp vào nút sao chép bên cạnh nó. Bạn có thể xem nội dung tải lên của mình tại: `https://gateway.pinata.cloud/ipfs/<CID>`. Ví dụ: bạn có thể tìm thấy hình ảnh chúng tôi đã sử dụng trên IPFS [tại đây](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Đối với những người học trực quan hơn, các bước trên được tóm tắt ở đây:

![Cách tải hình ảnh của bạn lên Pinata](./instructionsPinata.gif)

Bây giờ, chúng ta sẽ muốn tải một tài liệu nữa lên Pinata. Nhưng trước khi làm điều đó, chúng ta cần tạo ra nó!

Trong thư mục gốc của bạn, hãy tạo một tệp mới có tên `nft-metadata.json` và thêm mã json sau:

```json
{
  "attributes": [
    {
      "trait_type": "Giống",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Màu mắt",
      "value": "Mocha"
    }
  ],
  "description": "Chú cún đáng yêu và nhạy cảm nhất thế giới.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

Vui lòng thay đổi dữ liệu trong json. Bạn có thể xóa hoặc thêm vào phần thuộc tính. Quan trọng nhất, hãy đảm bảo trường hình ảnh trỏ đến vị trí hình ảnh IPFS của bạn — nếu không, NFT của bạn sẽ bao gồm ảnh của một chú chó (rất dễ thương!) chó.

Sau khi bạn chỉnh sửa xong tệp JSON, hãy lưu và tải nó lên Pinata, theo các bước tương tự như chúng ta đã làm để tải lên hình ảnh.

![Cách tải tệp nft-metadata.json của bạn lên Pinata](./uploadPinata.gif)

## Bước 5: Tạo một phiên bản hợp đồng của bạn {#instance-contract}

Bây giờ, để tương tác với hợp đồng của chúng tôi, chúng ta cần tạo một phiên bản của nó trong mã của mình. Để làm như vậy, chúng ta sẽ cần địa chỉ hợp đồng của mình mà chúng ta có thể lấy từ việc triển khai hoặc [Blockscout](https://eth-sepolia.blockscout.com/) bằng cách tra cứu địa chỉ bạn đã sử dụng để triển khai hợp đồng.

![Xem địa chỉ hợp đồng của bạn trên Etherscan](./view-contract-etherscan.png)

Trong ví dụ trên, địa chỉ hợp đồng của chúng tôi là 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Tiếp theo, chúng ta sẽ sử dụng [phương thức hợp đồng](https://docs.web3js.org/api/web3-eth-contract/class/Contract) Web3 để tạo hợp đồng bằng ABI và địa chỉ. Trong tệp `mint-nft.js` của bạn, hãy thêm những dòng sau:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## Bước 6: Cập nhật tệp `.env` {#update-env}

Bây giờ, để tạo và gửi giao dịch đến chuỗi Ethereum, chúng ta sẽ sử dụng địa chỉ tài khoản Ethereum công khai của bạn để lấy nonce của tài khoản (sẽ giải thích bên dưới).

Thêm khóa công khai của bạn vào tệp `.env` — nếu bạn đã hoàn thành phần 1 của hướng dẫn, tệp `.env` của chúng ta bây giờ sẽ trông như thế này:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## Bước 7: Tạo giao dịch của bạn {#create-txn}

Đầu tiên, hãy xác định một hàm có tên `mintNFT(tokenData)` và tạo giao dịch của chúng ta bằng cách thực hiện như sau:

1. Lấy _PRIVATE_KEY_ và _PUBLIC_KEY_ của bạn từ tệp `.env`.

2. Tiếp theo, chúng ta sẽ cần tìm ra nonce của tài khoản. Thông số kỹ thuật nonce được sử dụng để theo dõi số lượng giao dịch được gửi từ địa chỉ của bạn — điều mà chúng ta cần cho các mục đích bảo mật và để ngăn chặn [các cuộc tấn công phát lại](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Để lấy số lượng giao dịch được gửi từ địa chỉ của bạn, chúng ta sử dụng [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).

3. Cuối cùng, chúng ta sẽ thiết lập giao dịch của mình với các thông tin sau:

- `'from': PUBLIC_KEY` — Nguồn gốc giao dịch của chúng ta là địa chỉ công khai của chúng ta

- `'to': contractAddress` — Hợp đồng mà chúng ta muốn tương tác và gửi giao dịch đến

- `'nonce': nonce` — Nonce của tài khoản với số lượng giao dịch được gửi từ địa chỉ của chúng ta

- `'gas': estimatedGas` — Lượng gas ước tính cần thiết để hoàn thành giao dịch

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — Phép tính mà chúng ta muốn thực hiện trong giao dịch này — trong trường hợp này là đúc một NFT

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

Bây giờ chúng ta đã tạo giao dịch của mình, chúng ta cần ký nó để gửi đi. Đây là nơi chúng ta sẽ sử dụng khóa riêng tư của mình.

`web3.eth.sendSignedTransaction` sẽ cung cấp cho chúng ta hàm băm giao dịch, mà chúng ta có thể sử dụng để đảm bảo giao dịch của mình đã được khai thác và không bị mạng loại bỏ. Bạn sẽ nhận thấy trong phần ký giao dịch, chúng tôi đã thêm một số kiểm tra lỗi để chúng tôi biết liệu giao dịch của mình có thành công hay không.

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
              "Hàm băm của giao dịch của bạn là: ",
              hash,
              "\nHãy kiểm tra Mempool của Alchemy để xem trạng thái giao dịch của bạn!"
            )
          } else {
            console.log(
              "Đã xảy ra lỗi khi gửi giao dịch của bạn:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Lời hứa không thành công:", err)
    })
}
```

## Bước 9: Gọi `mintNFT` và chạy node `mint-nft.js` {#call-mintnft-fn}

Bạn có nhớ tệp `metadata.json` bạn đã tải lên Pinata không? Lấy mã băm của nó từ Pinata và chuyển nội dung sau làm tham số cho hàm `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

Đây là cách để lấy mã băm:

![Cách lấy mã băm siêu dữ liệu nft của bạn trên Pinata](./metadataPinata.gif)_Cách lấy mã băm siêu dữ liệu nft của bạn trên Pinata_

> Kiểm tra kỹ rằng mã băm bạn đã sao chép liên kết đến tệp **metadata.json** của bạn bằng cách tải `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` trong một cửa sổ riêng. Trang sẽ trông tương tự như ảnh chụp màn hình bên dưới:

![Trang của bạn sẽ hiển thị siêu dữ liệu json](./metadataJSON.png)_Trang của bạn sẽ hiển thị siêu dữ liệu json_

Nói chung, mã của bạn sẽ trông giống như sau:

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
              "Hàm băm của giao dịch của bạn là: ",
              hash,
              "\nHãy kiểm tra Mempool của Alchemy để xem trạng thái giao dịch của bạn!"
            )
          } else {
            console.log(
              "Đã xảy ra lỗi khi gửi giao dịch của bạn:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Lời hứa không thành công:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Bây giờ, hãy chạy `node scripts/mint-nft.js` để triển khai NFT của bạn. Sau vài giây, bạn sẽ thấy một phản hồi như thế này trong thiết bị đầu cuối của mình:

    ```
    Hàm băm của giao dịch của bạn là: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Hãy kiểm tra Mempool của Alchemy để xem trạng thái giao dịch của bạn!
    ```

Tiếp theo, hãy truy cập [mempool của Alchemy](https://dashboard.alchemyapi.io/mempool) để xem trạng thái giao dịch của bạn (cho dù nó đang chờ xử lý, đã được khai thác hay đã bị mạng loại bỏ). Nếu giao dịch của bạn bị loại bỏ, sẽ rất hữu ích nếu bạn kiểm tra [Blockscout](https://eth-sepolia.blockscout.com/) và tìm kiếm hàm băm giao dịch của mình.

![Xem hàm băm giao dịch NFT của bạn trên Etherscan](./view-nft-etherscan.png)_Xem hàm băm giao dịch NFT của bạn trên Etherscan_

Vậy là xong! Bây giờ bạn đã triển khai VÀ đúc một NFT trên chuỗi khối Ethereum <Emoji text=":money_mouth_face:" size={1} />

Sử dụng `mint-nft.js`, bạn có thể đúc bao nhiêu NFT tùy thích (và ví của bạn cho phép)! Chỉ cần đảm bảo chuyển một tokenURI mới mô tả siêu dữ liệu của NFT (nếu không, bạn sẽ chỉ tạo ra một loạt các NFT giống hệt nhau với các ID khác nhau).

Có lẽ, bạn muốn có thể khoe NFT của mình trong ví — vì vậy, hãy nhớ xem [Phần 3: Cách xem NFT trong Ví của bạn](/developers/tutorials/how-to-view-nft-in-metamask/)!
