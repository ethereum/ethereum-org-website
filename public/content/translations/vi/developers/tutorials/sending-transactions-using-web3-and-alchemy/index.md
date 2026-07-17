---
title: "Gửi giao dịch bằng Web3"
description: "Đây là hướng dẫn thân thiện với người mới bắt đầu về cách gửi giao dịch Ethereum bằng Web3. Có ba bước chính để gửi một giao dịch lên chuỗi khối Ethereum: tạo, ký và phát sóng. Chúng ta sẽ đi qua cả ba bước này."
author: "Elan Halpern"
tags: ["giao dịch", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: "Gửi giao dịch"
lang: vi
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Đây là hướng dẫn thân thiện với người mới bắt đầu về cách gửi giao dịch Ethereum bằng Web3. Có ba bước chính để gửi một giao dịch lên chuỗi khối Ethereum: tạo, ký và phát sóng. Chúng ta sẽ đi qua cả ba bước này, hy vọng sẽ giải đáp được mọi thắc mắc của bạn! Trong hướng dẫn này, chúng ta sẽ sử dụng [Alchemy](https://www.alchemy.com/) để gửi các giao dịch của mình lên chuỗi Ethereum. Bạn có thể [tạo một tài khoản Alchemy miễn phí tại đây](https://auth.alchemy.com/signup).

**LƯU Ý:** Hướng dẫn này dành cho việc ký các giao dịch của bạn ở _backend_ cho ứng dụng của bạn. Nếu bạn muốn tích hợp việc ký các giao dịch của mình ở frontend, hãy xem cách tích hợp [Web3 với một nhà cung cấp trình duyệt](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Những điều cơ bản {#the-basics}

Giống như hầu hết các nhà phát triển chuỗi khối khi mới bắt đầu, bạn có thể đã tìm hiểu về cách gửi một giao dịch (một việc đáng lẽ ra khá đơn giản) và bắt gặp vô số hướng dẫn, mỗi hướng dẫn lại nói một kiểu khác nhau khiến bạn cảm thấy hơi choáng ngợp và bối rối. Nếu bạn đang ở trong tình cảnh đó, đừng lo lắng; tất cả chúng ta đều từng như vậy! Vì vậy, trước khi bắt đầu, hãy làm rõ một vài điều:

### 1\. Alchemy không lưu trữ các khóa riêng tư của bạn {#alchemy-does-not-store-your-private-keys}

- Điều này có nghĩa là Alchemy không thể thay mặt bạn ký và gửi các giao dịch. Lý do cho việc này là vì mục đích bảo mật. Alchemy sẽ không bao giờ yêu cầu bạn chia sẻ khóa riêng tư của mình và bạn cũng không bao giờ nên chia sẻ khóa riêng tư của mình với một nút được lưu trữ (hoặc với bất kỳ ai khác).
- Bạn có thể đọc từ chuỗi khối bằng cách sử dụng API cốt lõi của Alchemy, nhưng để ghi vào đó, bạn sẽ cần sử dụng một công cụ khác để ký các giao dịch của mình trước khi gửi chúng qua Alchemy (điều này cũng tương tự đối với bất kỳ [dịch vụ nút](/developers/docs/nodes-and-clients/nodes-as-a-service/) nào khác).

### 2\. "Trình ký" (signer) là gì? {#what-is-a-signer}

- Các trình ký sẽ ký các giao dịch thay cho bạn bằng cách sử dụng khóa riêng tư của bạn. Trong hướng dẫn này, chúng ta sẽ sử dụng [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) để ký giao dịch của mình, nhưng bạn cũng có thể sử dụng bất kỳ thư viện Web3 nào khác.
- Ở frontend, một ví dụ điển hình về trình ký là [MetaMask](https://metamask.io/), nó sẽ ký và gửi các giao dịch thay mặt bạn.
### 3\. Tại sao tôi cần phải ký các giao dịch của mình? {#why-do-i-need-to-sign-my-transactions}

- Mọi người dùng muốn gửi một giao dịch trên mạng lưới Ethereum đều phải ký giao dịch đó (bằng khóa riêng tư của họ), nhằm xác thực rằng nguồn gốc của giao dịch đúng là từ người mà nó tuyên bố.
- Việc bảo vệ khóa riêng tư này là cực kỳ quan trọng, vì việc có quyền truy cập vào nó sẽ cấp toàn quyền kiểm soát tài khoản Ethereum của bạn, cho phép bạn (hoặc bất kỳ ai có quyền truy cập) thực hiện các giao dịch thay mặt bạn.

### 4\. Làm cách nào để bảo vệ khóa riêng tư của tôi? {#how-do-i-protect-my-private-key}

- Có nhiều cách để bảo vệ khóa riêng tư của bạn và sử dụng nó để gửi các giao dịch. Trong hướng dẫn này, chúng ta sẽ sử dụng một tệp `.env`. Tuy nhiên, bạn cũng có thể sử dụng một nhà cung cấp riêng biệt lưu trữ các khóa riêng tư, sử dụng một tệp kho khóa, hoặc các tùy chọn khác.

### 5\. Sự khác biệt giữa `eth_sendTransaction` và `eth_sendRawTransaction` là gì? {#difference-between-send-and-send-raw}

`eth_sendTransaction` và `eth_sendRawTransaction` đều là các hàm API của Ethereum dùng để phát sóng một giao dịch lên mạng lưới Ethereum để nó được thêm vào một khối trong tương lai. Chúng khác nhau ở cách xử lý việc ký các giao dịch.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) được sử dụng để gửi các giao dịch _chưa được ký_, điều này có nghĩa là nút mà bạn đang gửi tới phải quản lý khóa riêng tư của bạn để nó có thể ký giao dịch trước khi phát sóng lên chuỗi. Vì Alchemy không giữ các khóa riêng tư của người dùng, họ không hỗ trợ phương thức này.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) được sử dụng để phát sóng các giao dịch đã được ký. Điều này có nghĩa là trước tiên bạn phải sử dụng [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), sau đó truyền kết quả vào `eth_sendRawTransaction`.

Khi sử dụng Web3, `eth_sendRawTransaction` được truy cập bằng cách gọi hàm [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Đây là những gì chúng ta sẽ sử dụng trong hướng dẫn này.

### 6\. Thư viện Web3 là gì? {#what-is-the-web3-library}

- Web3.js là một thư viện bao bọc xung quanh các lệnh gọi JSON-RPC tiêu chuẩn, khá phổ biến để sử dụng trong phát triển Ethereum.
- Có nhiều thư viện Web3 cho các ngôn ngữ khác nhau. Trong hướng dẫn này, chúng ta sẽ sử dụng [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) được viết bằng JavaScript. Bạn có thể xem các tùy chọn khác [tại đây](/developers/docs/apis/javascript/) như [ethers.js](https://docs.ethers.org/v5/).

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

Làm theo các hướng dẫn trên [vòi Sepolia của Alchemy](https://www.sepoliafaucet.com/) để nhận ETH. Đảm bảo bao gồm địa chỉ Ethereum **Sepolia** của bạn (từ MetaMask) chứ không phải một mạng lưới khác. Sau khi làm theo các hướng dẫn, hãy kiểm tra lại xem bạn đã nhận được ETH trong ví của mình chưa.

### 3\. Tạo một thư mục dự án mới và `cd` vào đó {#create-a-new-project-direction}

Tạo một thư mục dự án mới từ dòng lệnh (terminal đối với máy Mac) và điều hướng vào đó:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Cài đặt Alchemy Web3 (hoặc bất kỳ thư viện Web3 nào) {#install-alchemy-web3}

Chạy lệnh sau trong thư mục dự án của bạn để cài đặt [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3):

Lưu ý, nếu bạn muốn sử dụng thư viện ethers.js, [hãy làm theo các hướng dẫn tại đây](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Cài đặt dotenv {#install-dotenv}

Chúng ta sẽ sử dụng một tệp `.env` để lưu trữ an toàn khóa API và khóa riêng tư của mình.

```
npm install dotenv --save
```

### 6\. Tạo tệp `.env` {#create-the-dotenv-file}

Tạo một tệp `.env` trong thư mục dự án của bạn và thêm nội dung sau (thay thế "`your-api-url`" và "`your-private-key`")

- Để tìm URL API Alchemy của bạn, hãy điều hướng đến trang chi tiết ứng dụng của ứng dụng bạn vừa tạo trên bảng điều khiển, nhấp vào "View Key" ở góc trên cùng bên phải và lấy URL HTTP.
- Để tìm khóa riêng tư của bạn bằng MetaMask, hãy xem [hướng dẫn](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) này.

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Đừng commit <code>.env</code>! Vui lòng đảm bảo không bao giờ chia sẻ hoặc để lộ tệp <code>.env</code> của bạn với bất kỳ ai, vì làm như vậy là bạn đang làm lộ các bí mật của mình. Nếu bạn đang sử dụng hệ thống kiểm soát phiên bản, hãy thêm <code>.env</code> của bạn vào tệp <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Tạo tệp `sendTx.js` {#create-sendtx-js}

Tuyệt vời, bây giờ chúng ta đã bảo vệ dữ liệu nhạy cảm của mình trong tệp `.env`, hãy bắt đầu viết mã. Đối với ví dụ gửi giao dịch của chúng ta, chúng ta sẽ chuyển ETH trở lại vòi Sepolia.

Tạo một tệp `sendTx.js`, đây là nơi chúng ta sẽ cấu hình và gửi giao dịch ví dụ của mình, và thêm các dòng mã sau vào đó:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: thay thế Địa chỉ này bằng Địa chỉ công khai của riêng bạn

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce bắt đầu đếm từ 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // Địa chỉ vòi để trả lại eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // trường dữ liệu tùy chọn để gửi thông điệp hoặc thực thi hợp đồng thông minh
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

Đảm bảo thay thế Địa chỉ ở **dòng 6** bằng Địa chỉ công khai của riêng bạn.

Bây giờ, trước khi chúng ta bắt đầu chạy đoạn mã này, hãy nói về một số thành phần ở đây.

- `nonce` : Đặc tả nonce được sử dụng để theo dõi số lượng giao dịch được gửi từ Địa chỉ của bạn. Chúng ta cần điều này cho mục đích bảo mật và để ngăn chặn các cuộc tấn công phát lại (replay attack). Để lấy số lượng giao dịch được gửi từ Địa chỉ của bạn, chúng ta sử dụng [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).
- `transaction`: Đối tượng giao dịch có một vài khía cạnh mà chúng ta cần chỉ định
  - `to`: Đây là Địa chỉ mà chúng ta muốn gửi ETH đến. Trong trường hợp này, chúng ta đang gửi ETH trở lại [vòi Sepolia](https://sepoliafaucet.com/) mà chúng ta đã yêu cầu ban đầu.
  - `value`: Đây là số lượng chúng ta muốn gửi, được chỉ định bằng Wei trong đó 10^18 Wei = 1 ETH
  - `gas`: Có nhiều cách để xác định lượng Gas phù hợp để đưa vào giao dịch của bạn. Alchemy hỗ trợ các [webhook](https://www.alchemy.com/docs/reference/webhooks-overview) có thể thông báo cho bạn về hoạt động trên chuỗi. Đối với các giao dịch trên Mạng chính, một thực hành tốt là kiểm tra các điều kiện Gas hiện tại để xác định lượng Gas phù hợp cần đưa vào. 21000 là lượng Gas tối thiểu mà một thao tác trên Ethereum sẽ sử dụng, vì vậy để đảm bảo giao dịch của chúng ta sẽ được thực thi, chúng ta đặt 30000 ở đây.
  - `nonce`: xem định nghĩa nonce ở trên. Nonce bắt đầu đếm từ 0.
  - [TÙY CHỌN] data: Được sử dụng để gửi thông tin bổ sung cùng với việc chuyển của bạn, hoặc gọi một hợp đồng thông minh, không bắt buộc đối với việc chuyển số dư, hãy xem lưu ý bên dưới.
- `signedTx`: Để ký đối tượng giao dịch của chúng ta, chúng ta sẽ sử dụng phương thức `signTransaction` với `PRIVATE_KEY` của mình
- `sendSignedTransaction`: Khi chúng ta đã có một giao dịch được ký, chúng ta có thể gửi nó đi để được đưa vào một khối tiếp theo bằng cách sử dụng `sendSignedTransaction`

**Lưu ý về data (dữ liệu)**
Có hai loại giao dịch chính có thể được gửi trên Ethereum.

- Chuyển số dư: Chuyển ETH từ một Địa chỉ này sang một Địa chỉ khác. Không yêu cầu trường dữ liệu, tuy nhiên, nếu bạn muốn gửi thông tin bổ sung cùng với giao dịch của mình, bạn có thể đưa thông tin đó ở định dạng HEX vào trường này.
  - Ví dụ, giả sử chúng ta muốn ghi Mã băm của một tài liệu IPFS lên Chuỗi Ethereum để cung cấp cho nó một dấu thời gian bất biến. Trường dữ liệu của chúng ta sau đó sẽ trông giống như data: `web3.utils.toHex(‘IPFS hash‘)`. Và bây giờ bất kỳ ai cũng có thể truy vấn Chuỗi và xem tài liệu đó được thêm vào khi nào.
- Giao dịch hợp đồng thông minh: Thực thi một số mã hợp đồng thông minh trên Chuỗi. Trong trường hợp này, trường dữ liệu phải chứa hàm thông minh mà bạn muốn thực thi, cùng với bất kỳ tham số nào.
  - Để có một ví dụ thực tế, hãy xem [hướng dẫn Hợp đồng thông minh Hello World](/developers/tutorials/hello-world-smart-contract/).
### 8\. Chạy mã bằng cách sử dụng `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Điều hướng trở lại terminal hoặc dòng lệnh của bạn và chạy:

```
node sendTx.js
```

### 9\. Xem giao dịch của bạn trong mempool {#see-your-transaction-in-the-mempool}

Mở [trang Mempool](https://dashboard.alchemy.com/mempool) trong bảng điều khiển Alchemy của bạn và lọc theo ứng dụng bạn đã tạo để tìm giao dịch của mình. Đây là nơi chúng ta có thể theo dõi giao dịch của mình chuyển từ trạng thái chờ xử lý (pending) sang trạng thái đã được khai thác (mined) (nếu thành công) hoặc trạng thái bị loại bỏ (dropped) nếu không thành công. Đảm bảo giữ nó ở mức “All” (Tất cả) để bạn nắm bắt được các giao dịch “mined”, “pending” và “dropped”. Bạn cũng có thể tìm kiếm giao dịch của mình bằng cách tìm các giao dịch được gửi đến Địa chỉ `0x31b98d14007bdee637298086988a0bbd31184523` .

Để xem chi tiết giao dịch của bạn sau khi bạn đã tìm thấy nó, hãy chọn Mã băm giao dịch (tx hash), thao tác này sẽ đưa bạn đến một chế độ xem trông giống như thế này:

![Ảnh chụp màn hình trình theo dõi mempool](./mempool.png)

Từ đó, bạn có thể xem giao dịch của mình trên Etherscan bằng cách nhấp vào biểu tượng được khoanh tròn màu đỏ!

**Tuyệt vời! Bạn vừa gửi giao dịch Ethereum đầu tiên của mình bằng Alchemy 🎉**

_Để có phản hồi và đề xuất về hướng dẫn này, vui lòng nhắn tin cho Elan trên [Discord](https://discord.gg/A39JVCM) của Alchemy!_

_Được xuất bản ban đầu bởi Alchemy._
