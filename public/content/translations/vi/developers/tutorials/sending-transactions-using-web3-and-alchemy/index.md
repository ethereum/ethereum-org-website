---
title: "Gửi giao dịch bằng viem"
description: "Đây là hướng dẫn thân thiện với người mới bắt đầu về cách gửi các giao dịch Ethereum bằng thư viện viem. Có ba bước chính để gửi một giao dịch lên Chuỗi khối Ethereum: tạo, ký và phát sóng. Chúng ta sẽ đi qua cả ba bước này."
author: "Elan Halpern"
tags: ["giao dịch", "viem", "Alchemy"]
skill: beginner
breadcrumb: "Gửi giao dịch"
lang: vi
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Đây là hướng dẫn thân thiện với người mới bắt đầu về cách gửi các giao dịch Ethereum bằng thư viện [viem](https://viem.sh/). Có ba bước chính để gửi một giao dịch lên Chuỗi khối Ethereum: tạo, ký và phát sóng. Chúng ta sẽ đi qua cả ba bước này, hy vọng sẽ giải đáp được mọi thắc mắc của bạn! Trong hướng dẫn này, chúng ta sẽ sử dụng [Alchemy](https://www.alchemy.com/) để gửi các giao dịch của mình lên Chuỗi Ethereum. Bạn có thể [tạo một tài khoản Alchemy miễn phí tại đây](https://auth.alchemy.com/signup).

**LƯU Ý:** Hướng dẫn này dành cho việc ký các giao dịch của bạn trên _backend_ cho ứng dụng của bạn. Nếu bạn muốn tích hợp việc ký các giao dịch của mình trên frontend, hãy xem [API nhà cung cấp MetaMask](https://docs.metamask.io/wallet/reference/provider-api/).

## Những điều cơ bản {#the-basics}

Giống như hầu hết các nhà phát triển chuỗi khối khi mới bắt đầu, bạn có thể đã tìm hiểu về cách gửi một giao dịch (một việc đáng lẽ ra khá đơn giản) và bắt gặp vô số hướng dẫn, mỗi hướng dẫn lại nói một kiểu khác nhau khiến bạn cảm thấy hơi choáng ngợp và bối rối. Nếu bạn đang ở trong tình cảnh đó, đừng lo lắng; tất cả chúng ta đều từng như vậy! Vì vậy, trước khi bắt đầu, hãy làm rõ một vài điều:

### 1\. Alchemy không lưu trữ các khóa riêng tư của bạn {#alchemy-does-not-store-your-private-keys}

- Điều này có nghĩa là Alchemy không thể thay mặt bạn ký và gửi các giao dịch. Lý do cho việc này là vì mục đích bảo mật. Alchemy sẽ không bao giờ yêu cầu bạn chia sẻ khóa riêng tư của mình và bạn cũng không bao giờ nên chia sẻ khóa riêng tư của mình với một nút được lưu trữ (hoặc với bất kỳ ai khác).
- Bạn có thể đọc từ chuỗi khối bằng cách sử dụng API cốt lõi của Alchemy, nhưng để ghi vào đó, bạn sẽ cần sử dụng một công cụ khác để ký các giao dịch của mình trước khi gửi chúng qua Alchemy (điều này cũng tương tự đối với bất kỳ [dịch vụ nút](/developers/docs/nodes-and-clients/nodes-as-a-service/) nào khác).

### 2\. "Người ký" (signer) là gì? {#what-is-a-signer}

- Người ký sẽ ký các giao dịch cho bạn bằng khóa riêng tư của bạn. Trong hướng dẫn này, chúng ta sẽ sử dụng [viem](https://viem.sh/) để ký giao dịch của mình, nhưng bạn cũng có thể sử dụng bất kỳ thư viện Web3 nào khác.
- Trên frontend, một ví dụ điển hình về người ký sẽ là [MetaMask](https://metamask.io/), nó sẽ thay mặt bạn ký và gửi các giao dịch.

### 3\. Tại sao tôi cần phải ký các giao dịch của mình? {#why-do-i-need-to-sign-my-transactions}

- Mọi người dùng muốn gửi một giao dịch trên mạng lưới Ethereum đều phải ký giao dịch đó (bằng khóa riêng tư của họ), nhằm xác thực rằng nguồn gốc của giao dịch đúng là từ người mà nó tuyên bố.
- Việc bảo vệ khóa riêng tư này là cực kỳ quan trọng, vì việc có quyền truy cập vào nó sẽ cấp toàn quyền kiểm soát tài khoản Ethereum của bạn, cho phép bạn (hoặc bất kỳ ai có quyền truy cập) thực hiện các giao dịch thay mặt bạn.

### 4\. Làm cách nào để bảo vệ khóa riêng tư của tôi? {#how-do-i-protect-my-private-key}

- Có nhiều cách để bảo vệ khóa riêng tư của bạn và sử dụng nó để gửi các giao dịch. Trong hướng dẫn này, chúng ta sẽ sử dụng một tệp `.env`. Tuy nhiên, bạn cũng có thể sử dụng một nhà cung cấp riêng biệt lưu trữ các khóa riêng tư, sử dụng một tệp kho khóa, hoặc các tùy chọn khác.

### 5\. Sự khác biệt giữa `eth_sendTransaction` và `eth_sendRawTransaction` là gì? {#difference-between-send-and-send-raw}

`eth_sendTransaction` và `eth_sendRawTransaction` đều là các hàm API của Ethereum dùng để phát sóng một giao dịch lên mạng lưới Ethereum để nó được thêm vào một khối trong tương lai. Chúng khác nhau ở cách xử lý việc ký các giao dịch.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) được sử dụng để gửi các giao dịch _chưa được ký_, điều này có nghĩa là nút mà bạn đang gửi tới phải quản lý khóa riêng tư của bạn để nó có thể ký giao dịch trước khi phát sóng lên Chuỗi. Vì Alchemy không giữ các khóa riêng tư của người dùng, họ không hỗ trợ phương thức này.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) được sử dụng để phát sóng các giao dịch đã được ký. Điều này có nghĩa là trước tiên bạn phải ký giao dịch bằng khóa riêng tư của mình (trong viem, sử dụng [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) với một [tài khoản cục bộ](https://viem.sh/docs/accounts/local/privateKeyToAccount)), sau đó truyền kết quả vào `eth_sendRawTransaction`.

Khi sử dụng viem, `eth_sendRawTransaction` được truy cập bằng cách gọi hàm [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

Đây là những gì chúng ta sẽ sử dụng trong hướng dẫn này.

### 6\. Thư viện Web3 là gì? {#what-is-the-web3-library}

- Thư viện Web3 là một trình bao bọc xung quanh các [lệnh gọi JSON-RPC](/developers/docs/apis/json-rpc/) tiêu chuẩn khá phổ biến để sử dụng trong phát triển Ethereum.
- Có nhiều thư viện Web3 cho các ngôn ngữ khác nhau. Trong hướng dẫn này, chúng ta sẽ sử dụng [viem](https://viem.sh/), được viết bằng TypeScript và hoạt động trong bất kỳ dự án JavaScript nào. Bạn có thể xem các tùy chọn khác [tại đây](/developers/docs/apis/javascript/) như [Ethers.js](https://docs.ethers.org/v6/).

Được rồi, bây giờ chúng ta đã giải quyết xong một vài câu hỏi này, hãy chuyển sang phần hướng dẫn. Đừng ngần ngại đặt câu hỏi bất cứ lúc nào trong [Discord](https://discord.gg/gWuC7zB) của Alchemy!

### 7\. Làm cách nào để gửi các giao dịch an toàn, tối ưu hóa Gas và riêng tư? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy có một bộ tài nguyên giao dịch](https://www.alchemy.com/docs/sending-transactions). Bạn có thể sử dụng chúng để gửi các giao dịch, mô phỏng các giao dịch trước khi chúng diễn ra, gửi các giao dịch riêng tư và gửi các giao dịch được tối ưu hóa Gas
- Bạn cũng có thể sử dụng [webhook của Alchemy](https://www.alchemy.com/docs/reference/webhooks-overview) để được cảnh báo khi giao dịch của bạn được lấy ra khỏi mempool và thêm vào Chuỗi

**LƯU Ý:** Hướng dẫn này yêu cầu một tài khoản Alchemy, một Địa chỉ Ethereum hoặc Ví MetaMask, Node.js và npm đã được cài đặt. Nếu chưa có, hãy làm theo các bước sau:

1.  [Tạo một tài khoản Alchemy miễn phí](https://auth.alchemy.com/signup)
2.  [Tạo tài khoản MetaMask](https://metamask.io/) (hoặc lấy một Địa chỉ Ethereum)
3.  [Cài đặt Node.js và npm](https://nodejs.org/en/download/)
## Các bước để gửi giao dịch của bạn {#steps-to-sending-your-transaction}

### 1\. Tạo một ứng dụng Alchemy trên mạng thử nghiệm Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Điều hướng đến [Bảng điều khiển Alchemy](https://dashboard.alchemy.com/) của bạn và tạo một ứng dụng mới, chọn Sepolia (hoặc bất kỳ mạng thử nghiệm nào khác) cho mạng lưới của bạn.

### 2\. Yêu cầu ETH từ vòi Sepolia {#request-eth-from-sepolia-faucet}

Làm theo các hướng dẫn trên [vòi Sepolia của Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) để nhận ETH, hoặc sử dụng một trong các [vòi Sepolia](/developers/docs/networks/#sepolia) khác. Các vòi cung cấp một lượng nhỏ (vòi Alchemy cung cấp 0,1 ETH mỗi ngày), như vậy là quá đủ cho hướng dẫn này. Đảm bảo bao gồm Địa chỉ Ethereum **Sepolia** của bạn (từ MetaMask) chứ không phải mạng lưới khác. Sau khi làm theo các hướng dẫn, hãy kiểm tra lại xem bạn đã nhận được ETH trong Ví của mình chưa.

### 3\. Tạo một thư mục dự án mới và `cd` vào đó {#create-a-new-project-direction}

Tạo một thư mục dự án mới từ dòng lệnh (terminal đối với máy Mac) và điều hướng vào đó:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Cài đặt viem (hoặc bất kỳ thư viện Web3 nào) {#install-alchemy-web3}

Chạy lệnh sau trong thư mục dự án của bạn để cài đặt [viem](https://viem.sh/):

Lưu ý, nếu bạn muốn sử dụng thư viện Ethers.js, hãy [làm theo các hướng dẫn tại đây](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Cài đặt dotenv {#install-dotenv}

Chúng ta sẽ sử dụng một tệp `.env` để lưu trữ an toàn khóa API và khóa riêng tư của mình.

```
npm install dotenv --save
```

### 6\. Tạo tệp `.env` {#create-the-dotenv-file}

Tạo một tệp `.env` trong thư mục dự án của bạn và thêm nội dung sau (thay thế "`your-api-url`" và "`your-private-key`")

- Để tìm URL API Alchemy của bạn, hãy điều hướng đến trang chi tiết ứng dụng của ứng dụng bạn vừa tạo trên bảng điều khiển của mình, nhấp vào "View Key" ở góc trên cùng bên phải và lấy URL HTTP.
- Để tìm khóa riêng tư của bạn bằng MetaMask, hãy xem [hướng dẫn](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) này. Sử dụng một Tài khoản chỉ chứa ETH mạng thử nghiệm.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Đừng commit <code>.env</code>! Vui lòng đảm bảo không bao giờ chia sẻ hoặc để lộ tệp <code>.env</code> của bạn với bất kỳ ai, vì làm như vậy là bạn đang làm lộ các bí mật của mình. Nếu bạn đang sử dụng hệ thống kiểm soát phiên bản, hãy thêm <code>.env</code> của bạn vào tệp <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Tạo tệp `sendTx.js` {#create-sendtx-js}

Tuyệt vời, bây giờ chúng ta đã bảo vệ dữ liệu nhạy cảm của mình trong tệp `.env`, hãy bắt đầu viết mã. Đối với ví dụ gửi giao dịch của chúng ta, chúng ta sẽ gửi 0,001 ETH đến một Địa chỉ khác mà bạn kiểm soát, chẳng hạn như Tài khoản thứ hai trong MetaMask.

Tạo một tệp `sendTx.js`, đây là nơi chúng ta sẽ cấu hình và gửi giao dịch ví dụ của mình, và thêm các dòng mã sau vào đó:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // nonce bắt đầu đếm từ 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: thay thế bằng Địa chỉ mà bạn muốn gửi ETH đến
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // trường dữ liệu tùy chọn để gửi tin nhắn hoặc thực thi hợp đồng thông minh
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Đảm bảo thay thế `0xYourSecondAddress` bằng Địa chỉ bạn muốn gửi ETH đến. Tập lệnh lấy Địa chỉ (gửi) của riêng bạn từ `PRIVATE_KEY`, vì vậy bạn không cần phải nhập nó.

Bây giờ, trước khi chúng ta bắt đầu chạy mã này, hãy nói về một số thành phần ở đây.

- `account`: Một Tài khoản cục bộ được tạo từ khóa riêng tư của bạn bằng [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). Việc ký diễn ra trên máy của bạn và khóa riêng tư không bao giờ được gửi đến Alchemy.
- `publicClient` và `walletClient`: các máy khách viem gửi các yêu cầu JSON-RPC đến URL Alchemy của bạn. Máy khách công khai đọc từ Chuỗi và máy khách ví chuẩn bị và ký các giao dịch cho Tài khoản của bạn.
- `nonce` : Đặc tả nonce được sử dụng để theo dõi số lượng giao dịch được gửi từ Địa chỉ của bạn. Chúng ta cần điều này cho mục đích bảo mật và để ngăn chặn các cuộc tấn công phát lại. Để lấy số lượng giao dịch được gửi từ Địa chỉ của bạn, chúng ta sử dụng [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). viem cũng sẽ điền thông tin này cho bạn, nhưng chúng ta tìm nạp nó một cách rõ ràng ở đây để cho thấy nó đến từ đâu.
- `transaction`: Đối tượng giao dịch có một vài khía cạnh mà chúng ta cần chỉ định. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) điền phần còn lại cho chúng ta, bao gồm `chainId` và các trường phí [EIP-1559](/developers/docs/gas/) `maxFeePerGas` và `maxPriorityFeePerGas`, dựa trên các điều kiện mạng lưới hiện tại
  - `to`: Đây là Địa chỉ chúng ta muốn gửi ETH đến.
  - `value`: Đây là số tiền chúng ta muốn gửi, được chỉ định bằng Wei trong đó 10^18 Wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) chuyển đổi số lượng ETH thành Wei cho chúng ta. Tài khoản của bạn cần nhiều hơn một chút so với mức này, vì nó cũng phải trả phí Gas
  - `gas`: Có nhiều cách để xác định lượng Gas phù hợp để đưa vào giao dịch của bạn. Alchemy hỗ trợ [webhook](https://www.alchemy.com/docs/reference/webhooks-overview) có thể thông báo cho bạn về hoạt động trên chuỗi. Đối với các giao dịch trên Mạng chính, một thực tiễn tốt là kiểm tra các điều kiện Gas hiện tại để xác định lượng Gas phù hợp cần đưa vào. Một giao dịch chuyển ETH thông thường đến một Địa chỉ thông thường luôn sử dụng chính xác 21000 Gas, đây là mức tối thiểu cho bất kỳ giao dịch nào, vì vậy chúng ta đặt 21000 ở đây. Nếu bạn bỏ qua `gas`, viem sẽ ước tính nó cho bạn.
  - `nonce`: xem định nghĩa nonce ở trên. Nonce bắt đầu đếm từ số không.
  - [TÙY CHỌN] data: Được sử dụng để gửi thông tin bổ sung cùng với giao dịch chuyển của bạn, hoặc gọi một hợp đồng thông minh, không bắt buộc đối với các giao dịch chuyển số dư, hãy xem lưu ý bên dưới.
- `signedTx`: Để ký đối tượng giao dịch của chúng ta, chúng ta sẽ sử dụng phương thức `signTransaction`, phương thức này ký nó cục bộ bằng Tài khoản được tạo từ `PRIVATE_KEY` của chúng ta
- `sendRawTransaction`: Khi chúng ta có một giao dịch đã được ký, chúng ta có thể gửi nó đi để được đưa vào một khối tiếp theo bằng cách sử dụng `sendRawTransaction`, phương thức này gọi `eth_sendRawTransaction`
- `waitForTransactionReceipt`: Đợi cho đến khi giao dịch được đưa vào một khối và trả về biên lai của nó

**Lưu ý về data**
Có hai loại giao dịch chính có thể được gửi trong Ethereum.

- Chuyển số dư: Gửi ETH từ Địa chỉ này sang Địa chỉ khác. Không yêu cầu trường data, tuy nhiên, nếu bạn muốn gửi thông tin bổ sung cùng với giao dịch của mình, bạn có thể đưa thông tin đó ở định dạng HEX vào trường này.
  - Ví dụ: giả sử chúng ta muốn ghi Mã băm của một tài liệu IPFS lên Chuỗi Ethereum để cung cấp cho nó một dấu thời gian bất biến. Trường data của chúng ta sau đó sẽ trông giống như `data: toHex("IPFS hash")`, sử dụng [`toHex`](https://viem.sh/docs/utilities/toHex) của viem. Và bây giờ bất kỳ ai cũng có thể truy vấn Chuỗi và xem khi nào tài liệu đó được thêm vào.
- Giao dịch hợp đồng thông minh: Thực thi một số mã hợp đồng thông minh trên Chuỗi. Trong trường hợp này, trường data phải chứa hàm thông minh mà bạn muốn thực thi, cùng với bất kỳ tham số nào.
  - Để có một ví dụ thực tế, hãy xem [hướng dẫn Hợp đồng thông minh Hello World](/developers/tutorials/hello-world-smart-contract/).

### 8\. Chạy mã bằng cách sử dụng `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Điều hướng trở lại terminal hoặc dòng lệnh của bạn và chạy:

```
node sendTx.js
```

### 9\. Xem giao dịch của bạn trên trình khám phá khối {#see-your-transaction-in-the-mempool}

Tập lệnh in mã băm giao dịch ngay khi nút chấp nhận giao dịch, sau đó đợi cho đến khi nó được đưa vào một khối (thường trong vòng vài giây) và in kết quả. Để xem chi tiết, hãy dán Mã băm vào một trình khám phá khối Sepolia chẳng hạn như [Sepolia Etherscan](https://sepolia.etherscan.io/) hoặc [Blockscout](https://eth-sepolia.blockscout.com/). Ở đó, bạn có thể theo dõi giao dịch đi từ trạng thái chờ xử lý đến khi được đưa vào, và xem số tiền, phí và khối mà nó đã hạ cánh.

Nếu bạn thấy lỗi `insufficient funds` thay vào đó, Tài khoản của bạn không có đủ ETH Sepolia để trang trải giá trị cộng với Gas. Quay lại bước 2 và yêu cầu thêm từ một vòi.

**Tuyệt vời! Bạn vừa gửi giao dịch Ethereum đầu tiên của mình bằng Alchemy 🎉**

_Để phản hồi và đóng góp ý kiến về hướng dẫn này, vui lòng nhắn tin cho Elan trên [Discord](https://discord.gg/gWuC7zB) của Alchemy!_

_Được xuất bản lần đầu bởi Alchemy._
