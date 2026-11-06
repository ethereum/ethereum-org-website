---
title: "Cách đúc một NFT (Phần 2/3 của Chuỗi hướng dẫn về NFT)"
description: "Hướng dẫn này mô tả cách đúc một token không thể thay thế (NFT) trên Chuỗi khối Ethereum bằng cách sử dụng hợp đồng thông minh của chúng tôi, Hardhat và ethers.js."
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "hợp đồng thông minh"]
skill: beginner
breadcrumb: "Đúc một NFT"
lang: vi
published: 2021-04-22
---

“Việc đúc một token không thể thay thế (NFT)” là hành động xuất bản một phiên bản duy nhất của token ERC-721 của bạn trên Chuỗi khối. Sử dụng hợp đồng thông minh của chúng tôi từ [Phần 1 của chuỗi hướng dẫn về NFT này](/developers/tutorials/how-to-write-and-deploy-an-nft/), hãy cùng thể hiện các kỹ năng Web3 của chúng ta và đúc một NFT. Vào cuối hướng dẫn này, bạn sẽ có thể đúc bao nhiêu NFT tùy theo mong muốn của bạn (và Ví của bạn)!

Hãy cùng bắt đầu nào!

## Bước 1: Kiểm tra thiết lập của bạn {#install-web3}

Nếu bạn đã làm theo hướng dẫn đầu tiên về việc tạo hợp đồng thông minh cho token không thể thay thế (NFT) của mình, bạn đã có mọi thứ mình cần: một dự án Hardhat 3 với [plugin Ethers](https://hardhat.org/docs/plugins/hardhat-ethers) và [ethers.js](https://docs.ethers.org/v6/), một Thư viện được sử dụng để giúp việc tạo các yêu cầu tới Chuỗi khối [Ethereum](/) trở nên dễ dàng hơn. Chúng ta sẽ viết mã cho việc đúc của mình dưới dạng một tập lệnh Hardhat, vì vậy nó sẽ sử dụng lại các cài đặt mạng lưới Sepolia và các giá trị `API_URL` và `PRIVATE_KEY` từ Phần 1 — không có gì mới để cài đặt.

## Bước 2: Tạo tệp `mint-nft.js` {#create-mintnftjs}

Bên trong thư mục scripts của bạn, hãy tạo một tệp `mint-nft.js` và thêm các dòng mã sau:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

Giống như trong tập lệnh triển khai của chúng ta, `network.create()` kết nối với mạng lưới mà bạn chọn bằng `--network` khi bạn chạy tập lệnh, và cung cấp cho chúng ta một đối tượng `ethers` cho mạng lưới đó.

## Bước 3: Lấy ABI hợp đồng của bạn {#contract-abi}

Giao diện nhị phân ứng dụng (ABI) hợp đồng của chúng ta là giao diện để tương tác với hợp đồng thông minh của chúng ta. Bạn có thể tìm hiểu thêm về [ABI hợp đồng](/glossary/#abi). Hardhat tự động tạo một ABI cho chúng ta khi nó biên dịch hợp đồng và lưu nó trong tệp `artifacts/contracts/MyNFT.sol/MyNFT.json`. Plugin Hardhat Ethers đọc nó từ đó cho chúng ta khi chúng ta tạo phiên bản hợp đồng của mình ở bước 5, vì vậy chúng ta không cần phải tự tải nó.

Nếu bạn muốn xem ABI, bạn có thể in nó ra bảng điều khiển của mình. Từ thư mục gốc của dự án của bạn, hãy chạy:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## Bước 4: Cấu hình siêu dữ liệu cho NFT của bạn bằng IPFS {#config-meta}

Nếu bạn còn nhớ từ hướng dẫn của chúng ta trong Phần 1, hàm hợp đồng thông minh `mintNFT` của chúng ta nhận vào một tham số tokenURI sẽ phân giải thành một tài liệu JSON mô tả siêu dữ liệu của token không thể thay thế (NFT)— đây thực sự là thứ mang lại sức sống cho NFT, cho phép nó có các thuộc tính có thể cấu hình, chẳng hạn như tên, mô tả, hình ảnh và các thuộc tính khác.

> _Hệ thống tệp liên hành tinh (IPFS) là một Giao thức phi tập trung và mạng lưới ngang hàng để lưu trữ và chia sẻ dữ liệu trong một hệ thống tệp phân tán._

Chúng ta sẽ sử dụng Pinata, một Giao diện Lập trình Ứng dụng (API) IPFS và bộ công cụ tiện lợi, để lưu trữ tài sản và siêu dữ liệu NFT của chúng ta nhằm đảm bảo NFT của chúng ta thực sự phi tập trung. Nếu bạn chưa có Tài khoản Pinata, hãy đăng ký một Tài khoản miễn phí [tại đây](https://app.pinata.cloud) và hoàn thành các bước để xác minh email của bạn.

Sau khi bạn đã tạo một Tài khoản:

- Điều hướng đến [trang Files](https://app.pinata.cloud/ipfs/files) và nhấp vào nút "Add" ở góc trên cùng bên phải của trang.

- Tải một hình ảnh lên Pinata — đây sẽ là tài sản hình ảnh cho NFT của bạn. Hãy thoải mái đặt tên cho tài sản theo bất kỳ cách nào bạn muốn. Đảm bảo bạn tải nó lên IPFS công khai: các tệp trên [Private IPFS](https://docs.pinata.cloud/files/private-ipfs) không thể được lấy bởi các Ví và thị trường hiển thị NFT của bạn.

- Sau khi tải lên, bạn sẽ thấy tệp được liệt kê trên trang Files cùng với CID (mã định danh nội dung) của nó. Sao chép CID. Bạn có thể xem tệp tải lên của mình tại: `https://gateway.pinata.cloud/ipfs/<CID>`, hoặc thông qua cổng chuyên dụng được liệt kê dưới mục "Gateways" trong thanh bên của Pinata. Ví dụ, bạn có thể tìm thấy hình ảnh chúng tôi đã sử dụng trên IPFS [tại đây](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5).

Bây giờ, chúng ta sẽ muốn tải lên một tài liệu nữa lên Pinata. Nhưng trước khi làm điều đó, chúng ta cần tạo nó!

Trong thư mục gốc của bạn, hãy tạo một tệp mới có tên `nft-metadata.json` và thêm mã json sau:

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

Hãy thoải mái thay đổi dữ liệu trong json. Bạn có thể xóa hoặc thêm vào phần thuộc tính. Quan trọng nhất, hãy đảm bảo trường hình ảnh trỏ đến vị trí hình ảnh IPFS của bạn, dưới dạng `ipfs://<image-CID>` — nếu không, NFT của bạn sẽ bao gồm một bức ảnh của một chú chó (rất dễ thương!).

Khi bạn đã chỉnh sửa xong tệp JSON, hãy lưu nó và tải nó lên Pinata, làm theo các bước tương tự như chúng ta đã làm để tải hình ảnh lên. Sao chép cả CID của `nft-metadata.json`; chúng ta sẽ cần nó ở bước 9.

## Bước 5: Tạo một phiên bản hợp đồng của bạn {#instance-contract}

Bây giờ, để tương tác với hợp đồng của chúng ta, chúng ta cần tạo một phiên bản của nó trong mã của mình. Để làm như vậy, chúng ta sẽ cần Địa chỉ hợp đồng của mình, mà tập lệnh triển khai của chúng ta đã in ra trong Phần 1. Bạn cũng có thể tìm thấy nó trên [Etherscan](https://sepolia.etherscan.io/) hoặc [Blockscout](https://eth-sepolia.blockscout.com/) bằng cách tra cứu Địa chỉ mà bạn đã sử dụng để triển khai hợp đồng.

![Xem Địa chỉ hợp đồng của bạn trên Etherscan](./view-contract-etherscan.png)

Trong ví dụ trên, Địa chỉ hợp đồng của chúng ta là 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778.

Tiếp theo, chúng ta sẽ sử dụng phương thức `getContractAt` của plugin Hardhat Ethers để tạo hợp đồng của chúng ta bằng cách sử dụng tên của nó (cho nó biết nên sử dụng Giao diện nhị phân ứng dụng (ABI) nào) và Địa chỉ của nó. Trong tệp `mint-nft.js` của bạn, hãy thêm phần sau, thay thế Địa chỉ bằng Địa chỉ của riêng bạn:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## Bước 6: Kiểm tra tệp `.env` {#update-env}

Mỗi giao dịch mà chúng ta gửi phải được ký bằng khóa riêng tư của Tài khoản của bạn. Nếu bạn đã hoàn thành phần 1 của hướng dẫn, tệp `.env` của chúng ta sẽ trông giống như thế này:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

Không cần phải thêm Địa chỉ công khai của bạn: ethers sẽ tự tính toán nó từ khóa riêng tư.

## Bước 7: Tạo giao dịch của bạn {#create-txn}

Đầu tiên, hãy định nghĩa một hàm có tên `mintNFT(tokenURI)` và tạo giao dịch của chúng ta bằng cách thực hiện những việc sau:

1. Lấy Tài khoản mà chúng ta gửi giao dịch từ đó. `ethers.getSigners()` trả về các Tài khoản được cấu hình cho mạng lưới, trên Sepolia là Tài khoản có khóa riêng tư nằm trong `.env`. Vì `mintNFT` là `onlyOwner`, đây phải là cùng một Tài khoản đã triển khai hợp đồng.

1. Gọi hàm `mintNFT` trên phiên bản hợp đồng của chúng ta, với Địa chỉ của chính chúng ta làm người nhận và URI siêu dữ liệu. Đây là phép tính mà chúng ta muốn thực hiện trong giao dịch này — trong trường hợp này là việc đúc một token không thể thay thế (NFT).

Bạn không cần phải tự tính toán nonce (số lượng giao dịch được gửi từ Địa chỉ của bạn, giúp ngăn chặn các cuộc tấn công phát lại), giới hạn gas, hoặc các khoản phí: ethers sẽ lấy hoặc ước tính chúng trước khi gửi giao dịch.

Tệp `mint-nft.js` của bạn bây giờ sẽ trông giống như thế này:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // Gửi giao dịch. ethers sẽ điền nonce, giới hạn gas và phí cho chúng ta.
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## Bước 8: Ký giao dịch {#sign-txn}

Bởi vì mạng lưới được cấu hình với khóa riêng tư của chúng ta, ethers sẽ tự động ký giao dịch bằng khóa đó trước khi gửi nó.

Việc gọi `mintNFT` sẽ trả về kết quả sau khi giao dịch đã được gửi, và cung cấp cho chúng ta mã băm giao dịch, mà chúng ta có thể sử dụng để đảm bảo giao dịch của mình đã được khai thác và không bị mạng lưới loại bỏ. `tx.wait()` sau đó sẽ đợi cho đến khi giao dịch được đưa vào một khối. Chúng tôi cũng đã thêm một số kiểm tra lỗi để chúng ta biết liệu giao dịch của mình có được thực hiện thành công hay không.

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Gửi giao dịch. ethers sẽ điền nonce, giới hạn gas và phí cho chúng ta.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Đợi giao dịch được đưa vào một khối
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## Bước 9: Gọi `mintNFT` và chạy `mint-nft.js` {#call-mintnft-fn}

Bạn còn nhớ `nft-metadata.json` mà bạn đã tải lên Pinata không? Lấy CID của nó từ Pinata và truyền `ipfs://<metadata-CID>` làm tham số cho hàm `mintNFT`. Các Ví và thị trường phân giải các URI `ipfs://` thông qua một cổng IPFS mà họ chọn, vì vậy token không thể thay thế (NFT) của bạn không phụ thuộc vào bất kỳ cổng đơn lẻ nào.

> Kiểm tra kỹ xem CID mà bạn đã sao chép có liên kết đến **nft-metadata.json** của bạn hay không bằng cách tải `https://gateway.pinata.cloud/ipfs/<metadata-CID>` vào một cửa sổ riêng. Trang sẽ trông giống như ảnh chụp màn hình bên dưới:

![Trang của bạn sẽ hiển thị siêu dữ liệu json](./metadataJSON.png)_Trang của bạn sẽ hiển thị siêu dữ liệu json_

Nhìn chung, mã của bạn sẽ trông giống như thế này:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // Gửi giao dịch. ethers sẽ điền nonce, giới hạn gas và phí cho chúng ta.
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // Đợi giao dịch được đưa vào một khối
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

Bây giờ, hãy chạy tập lệnh trên Sepolia để đúc NFT của bạn:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

Sau vài giây, bạn sẽ thấy một phản hồi như thế này trong thiết bị đầu cuối của mình:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

Để xem chi tiết giao dịch của bạn, hãy tìm kiếm Mã băm của nó trên [Etherscan](https://sepolia.etherscan.io/) hoặc [Blockscout](https://eth-sepolia.blockscout.com/).

![Xem mã băm giao dịch NFT của bạn trên Etherscan](./view-nft-etherscan.png)_Xem mã băm giao dịch NFT của bạn trên Etherscan_

Và thế là xong! Bây giờ bạn đã triển khai VÀ đúc một NFT trên Chuỗi khối Ethereum <Emoji text=":money_mouth_face:" size={1} />

Sử dụng `mint-nft.js`, bạn có thể đúc bao nhiêu NFT tùy theo mong muốn của bạn (và Ví của bạn)! Chỉ cần đảm bảo truyền vào một tokenURI mới mô tả siêu dữ liệu của NFT (nếu không, bạn sẽ chỉ tạo ra một loạt các NFT giống hệt nhau với các ID khác nhau).

Có lẽ, bạn muốn có thể khoe NFT trong Ví của mình — vì vậy hãy chắc chắn xem qua [Phần 3: Cách xem NFT của bạn trong Ví của bạn](/developers/tutorials/how-to-view-nft-in-metamask/)!
