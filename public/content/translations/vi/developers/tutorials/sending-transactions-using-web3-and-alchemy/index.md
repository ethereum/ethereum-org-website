---
title: "Gửi Giao dịch bằng Web3"
description: "Đây là hướng dẫn thân thiện với người mới bắt đầu về cách gửi giao dịch Ethereum bằng Web3. Có ba bước chính để gửi một giao dịch đến chuỗi khối Ethereum: tạo, ký và quảng bá. Chúng ta sẽ đi qua cả ba bước."
author: "Elan Halpern"
tags: [ "các giao dịch", "web3.js", "Alchemy" ]
skill: beginner
lang: vi
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Đây là hướng dẫn thân thiện với người mới bắt đầu về cách gửi giao dịch Ethereum bằng Web3. Có ba bước chính để gửi một giao dịch đến chuỗi khối Ethereum: tạo, ký và quảng bá. Chúng ta sẽ đi qua cả ba bước và hy vọng sẽ trả lời được bất kỳ câu hỏi nào bạn có thể có! Trong hướng dẫn này, chúng ta sẽ sử dụng [Alchemy](https://www.alchemy.com/) để gửi các giao dịch của mình đến chuỗi Ethereum. Bạn có thể [tạo tài khoản Alchemy miễn phí tại đây](https://auth.alchemyapi.io/signup).

**LƯU Ý:** Hướng dẫn này dành cho việc ký các giao dịch của bạn trên _backend_ cho ứng dụng của bạn. Nếu bạn muốn tích hợp việc ký các giao dịch của mình trên frontend, hãy xem cách tích hợp [Web3 với một nhà cung cấp trình duyệt](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Những điều cơ bản {#the-basics}

Giống như hầu hết các nhà phát triển chuỗi khối khi họ mới bắt đầu, bạn có thể đã thực hiện một số nghiên cứu về cách gửi một giao dịch (một việc đáng lẽ phải khá đơn giản) và đã gặp phải vô số hướng dẫn, mỗi hướng dẫn lại nói những điều khác nhau và khiến bạn hơi choáng ngợp và bối rối. Nếu bạn đang ở trong tình huống đó, đừng lo lắng; tất cả chúng ta đều đã từng ở một thời điểm nào đó! Vì vậy, trước khi chúng ta bắt đầu, hãy làm rõ một vài điều:

### 1. Alchemy không lưu trữ các khóa riêng tư của bạn {#alchemy-does-not-store-your-private-keys}

- Điều này có nghĩa là Alchemy không thể ký và gửi giao dịch thay cho bạn. Lý do cho điều này là vì mục đích bảo mật. Alchemy sẽ không bao giờ yêu cầu bạn chia sẻ khóa riêng tư của mình, và bạn không bao giờ nên chia sẻ khóa riêng tư của mình với một nút được lưu trữ (hoặc bất kỳ ai khác).
- Bạn có thể đọc từ chuỗi khối bằng API lõi của Alchemy, nhưng để ghi vào đó, bạn sẽ cần sử dụng một thứ khác để ký các giao dịch của mình trước khi gửi chúng qua Alchemy (điều này cũng tương tự đối với bất kỳ [dịch vụ nút](/developers/docs/nodes-and-clients/nodes-as-a-service/) nào khác).

### 2. “Người ký” là gì? {#what-is-a-signer}

- Người ký sẽ ký các giao dịch cho bạn bằng khóa riêng tư của bạn. Trong hướng dẫn này, chúng tôi sẽ sử dụng [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) để ký giao dịch của mình, nhưng bạn cũng có thể sử dụng bất kỳ thư viện web3 nào khác.
- Trên frontend, một ví dụ điển hình về người ký là [MetaMask](https://metamask.io/), nó sẽ ký và gửi các giao dịch thay cho bạn.

### 3. Tại sao tôi cần ký các giao dịch của mình? {#why-do-i-need-to-sign-my-transactions}

- Mọi người dùng muốn gửi một giao dịch trên mạng Ethereum đều phải ký giao dịch đó (bằng khóa riêng tư của họ), để xác thực rằng người khởi tạo giao dịch chính là người mà họ tuyên bố.
- Việc bảo vệ khóa riêng tư này là cực kỳ quan trọng, vì việc có quyền truy cập vào nó sẽ cấp toàn quyền kiểm soát tài khoản Ethereum của bạn, cho phép bạn (hoặc bất kỳ ai có quyền truy cập) thực hiện các giao dịch thay cho bạn.

### 4. Làm cách nào để bảo vệ khóa riêng tư của tôi? {#how-do-i-protect-my-private-key}

- Có nhiều cách để bảo vệ khóa riêng tư của bạn và sử dụng nó để gửi đi các giao dịch. Trong hướng dẫn này, chúng tôi sẽ sử dụng tệp `.env`. Tuy nhiên, bạn cũng có thể sử dụng một nhà cung cấp riêng biệt lưu trữ khóa riêng tư, sử dụng tệp keystore hoặc các tùy chọn khác.

### 5. Sự khác biệt giữa `eth_sendTransaction` và `eth_sendRawTransaction` là gì? {#difference-between-send-and-send-raw}

`eth_sendTransaction` và `eth_sendRawTransaction` đều là các hàm API của Ethereum có chức năng quảng bá một giao dịch đến mạng Ethereum để nó sẽ được thêm vào một khối trong tương lai. Chúng khác nhau ở cách chúng xử lý việc ký các giao dịch.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) được sử dụng để gửi các giao dịch _chưa được ký_, điều đó có nghĩa là nút mà bạn đang gửi đến phải quản lý khóa riêng tư của bạn để nó có thể ký giao dịch trước khi quảng bá nó lên chuỗi. Vì Alchemy không giữ khóa riêng tư của người dùng, nên họ không hỗ trợ phương thức này.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) được sử dụng để quảng bá các giao dịch đã được ký. Điều này có nghĩa là trước tiên bạn phải sử dụng [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), sau đó chuyển kết quả vào `eth_sendRawTransaction`.

Khi sử dụng web3, `eth_sendRawTransaction` được truy cập bằng cách gọi hàm [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Đây là những gì chúng ta sẽ sử dụng trong hướng dẫn này.

### 6. Thư viện web3 là gì? {#what-is-the-web3-library}

- Web3.js là một thư viện bao bọc các lệnh gọi JSON-RPC tiêu chuẩn khá phổ biến để sử dụng trong quá trình phát triển Ethereum.
- Có nhiều thư viện web3 cho các ngôn ngữ khác nhau. Trong hướng dẫn này, chúng ta sẽ sử dụng [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) được viết bằng JavaScript. Bạn có thể xem các tùy chọn khác [tại đây](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) như [ethers.js](https://docs.ethers.org/v5/).

Được rồi, bây giờ chúng ta đã giải quyết xong một vài câu hỏi này, hãy chuyển sang phần hướng dẫn. Vui lòng đặt câu hỏi bất cứ lúc nào trong [discord](https://discord.gg/gWuC7zB) của Alchemy!

### 7. Làm thế nào để gửi các giao dịch bảo mật, tối ưu hóa gas và riêng tư? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy có một bộ API Giao dịch](https://docs.alchemy.com/reference/transact-api-quickstart). Bạn có thể sử dụng những API này để gửi các giao dịch được củng cố, mô phỏng các giao dịch trước khi chúng xảy ra, gửi các giao dịch riêng tư và gửi các giao dịch được tối ưu hóa gas
- Bạn cũng có thể sử dụng [API Thông báo](https://docs.alchemy.com/docs/alchemy-notify) để được cảnh báo khi giao dịch của bạn được lấy từ mempool và thêm vào chuỗi

**LƯU Ý:** Hướng dẫn này yêu cầu có tài khoản Alchemy, địa chỉ Ethereum hoặc ví MetaMask, đã cài đặt NodeJs và npm. Nếu chưa, hãy làm theo các bước sau:

1. [Tạo một tài khoản Alchemy miễn phí](https://auth.alchemyapi.io/signup)
2. [Tạo tài khoản MetaMask](https://metamask.io/) (hoặc lấy địa chỉ Ethereum)
3. [Làm theo các bước sau để cài đặt NodeJs và NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Các bước để gửi giao dịch của bạn {#steps-to-sending-your-transaction}

### 1. Tạo một ứng dụng Alchemy trên mạng thử nghiệm Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Điều hướng đến [Bảng điều khiển Alchemy](https://dashboard.alchemyapi.io/) của bạn và tạo một ứng dụng mới, chọn Sepolia (hoặc bất kỳ mạng thử nghiệm nào khác) cho mạng của bạn.

### 2. Yêu cầu ETH từ faucet Sepolia {#request-eth-from-sepolia-faucet}

Làm theo hướng dẫn trên [faucet Sepolia của Alchemy](https://www.sepoliafaucet.com/) để nhận ETH. Hãy chắc chắn bao gồm địa chỉ Ethereum **Sepolia** của bạn (từ MetaMask) chứ không phải mạng khác. Sau khi làm theo hướng dẫn, hãy kiểm tra lại để chắc chắn rằng bạn đã nhận được ETH trong ví của mình.

### 3. Tạo một thư mục dự án mới và `cd` vào đó {#create-a-new-project-direction}

Tạo một thư mục dự án mới từ dòng lệnh (terminal cho mac) và điều hướng vào đó:

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Cài đặt Alchemy Web3 (hoặc bất kỳ thư viện web3 nào) {#install-alchemy-web3}

Chạy lệnh sau trong thư mục dự án của bạn để cài đặt [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Lưu ý, nếu bạn muốn sử dụng thư viện ethers.js, [hãy làm theo hướng dẫn tại đây](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5. Cài đặt dotenv {#install-dotenv}

Chúng ta sẽ sử dụng tệp `.env` để lưu trữ an toàn khóa API và khóa riêng tư của mình.

```
npm install dotenv --save
```

### 6. Tạo tệp `.env` {#create-the-dotenv-file}

Tạo tệp `.env` trong thư mục dự án của bạn và thêm nội dung sau (thay thế “`your-api-url`" và "`your-private-key`")

- Để tìm URL API Alchemy của bạn, hãy điều hướng đến trang chi tiết ứng dụng của ứng dụng bạn vừa tạo trên bảng điều khiển của mình, nhấp vào “Xem khóa” ở góc trên cùng bên phải và lấy URL HTTP.
- Để tìm khóa riêng tư của bạn bằng MetaMask, hãy xem [hướng dẫn](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) này.

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Đừng commit tệp <code>.env</code>! Vui lòng đảm bảo không bao giờ chia sẻ hoặc tiết lộ tệp <code>.env</code> của bạn với bất kỳ ai, vì làm như vậy bạn đang làm lộ bí mật của mình. Nếu bạn đang sử dụng kiểm soát phiên bản, hãy thêm tệp <code>.env</code> của bạn vào tệp <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7. Tạo tệp `sendTx.js` {#create-sendtx-js}

Tuyệt vời, bây giờ chúng ta đã bảo vệ dữ liệu nhạy cảm của mình trong tệp `.env`, hãy bắt đầu lập trình. Đối với ví dụ gửi giao dịch của chúng ta, chúng ta sẽ gửi ETH trở lại faucet Sepolia.

Tạo tệp `sendTx.js`, đây là nơi chúng ta sẽ định cấu hình và gửi giao dịch ví dụ của mình, và thêm các dòng mã sau vào đó:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: thay thế địa chỉ này bằng địa chỉ công khai của riêng bạn

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce bắt đầu đếm từ 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // địa chỉ faucet để trả lại eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // trường dữ liệu tùy chọn để gửi tin nhắn hoặc thực thi hợp đồng thông minh
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 Hàm băm của giao dịch của bạn là: ", hash, "\n Kiểm tra Mempool của Alchemy để xem trạng thái giao dịch của bạn!");
    } else {
      console.log("❗Đã xảy ra lỗi khi gửi giao dịch của bạn:", error)
    }
   });
}

main();
```

Hãy chắc chắn thay thế địa chỉ ở **dòng 6** bằng địa chỉ công khai của riêng bạn.

Bây giờ, trước khi chúng ta bắt đầu chạy mã này, hãy nói về một số thành phần ở đây.

- `nonce` : Đặc tả nonce được sử dụng để theo dõi số lượng giao dịch được gửi từ địa chỉ của bạn. Chúng ta cần điều này vì mục đích bảo mật và để ngăn chặn [các cuộc tấn công phát lại](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Để lấy số lượng giao dịch được gửi từ địa chỉ của bạn, chúng tôi sử dụng [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: Đối tượng giao dịch có một vài khía cạnh chúng ta cần chỉ định
  - `to`: Đây là địa chỉ chúng tôi muốn gửi ETH đến. Trong trường hợp này, chúng tôi đang gửi ETH trở lại [faucet Sepolia](https://sepoliafaucet.com/) mà chúng tôi đã yêu cầu ban đầu.
  - `value`: Đây là số tiền chúng tôi muốn gửi, được chỉ định bằng Wei trong đó 10^18 Wei = 1 ETH
  - `gas`: Có nhiều cách để xác định lượng gas phù hợp để đưa vào giao dịch của bạn. Alchemy thậm chí còn có một [webhook giá gas](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) để thông báo cho bạn khi giá gas giảm xuống trong một ngưỡng nhất định. Đối với các giao dịch trên Mạng chính, bạn nên kiểm tra một công cụ ước tính gas như [ETH Gas Station](https://ethgasstation.info/) để xác định lượng gas phù hợp cần đưa vào. 21000 là lượng gas tối thiểu mà một hoạt động trên Ethereum sẽ sử dụng, vì vậy để đảm bảo giao dịch của chúng ta sẽ được thực thi, chúng ta đặt 30000 ở đây.
  - `nonce`: xem định nghĩa nonce ở trên. Nonce bắt đầu đếm từ 0.
  - [TÙY CHỌN] dữ liệu: Được sử dụng để gửi thêm thông tin cùng với việc chuyển khoản của bạn, hoặc gọi một hợp đồng thông minh, không bắt buộc đối với việc chuyển số dư, hãy xem ghi chú bên dưới.
- `signedTx`: Để ký đối tượng giao dịch của chúng ta, chúng ta sẽ sử dụng phương thức `signTransaction` với `PRIVATE_KEY` của mình
- `sendSignedTransaction`: Khi chúng ta có một giao dịch đã ký, chúng ta có thể gửi nó đi để được đưa vào một khối tiếp theo bằng cách sử dụng `sendSignedTransaction`

**Lưu ý về dữ liệu**
Có hai loại giao dịch chính có thể được gửi trong Ethereum.

- Chuyển số dư: Gửi ETH từ địa chỉ này sang địa chỉ khác. Không yêu cầu trường dữ liệu, tuy nhiên, nếu bạn muốn gửi thêm thông tin cùng với giao dịch của mình, bạn có thể bao gồm thông tin đó ở định dạng HEX trong trường này.
  - Ví dụ, giả sử chúng ta muốn ghi hàm băm của một tài liệu IPFS vào chuỗi Ethereum để cung cấp cho nó một dấu thời gian bất biến. Trường dữ liệu của chúng ta sau đó sẽ trông giống như dữ liệu: `web3.utils.toHex(‘hàm băm IPFS‘)`. Và bây giờ bất kỳ ai cũng có thể truy vấn chuỗi và xem tài liệu đó được thêm vào khi nào.
- Giao dịch hợp đồng thông minh: Thực thi một số mã hợp đồng thông minh trên chuỗi. Trong trường hợp này, trường dữ liệu phải chứa hàm thông minh bạn muốn thực thi, cùng với bất kỳ tham số nào.
  - Để có một ví dụ thực tế, hãy xem Bước 8 trong [Hướng dẫn Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction) này.

### 8. Chạy mã bằng `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Điều hướng trở lại terminal hoặc dòng lệnh của bạn và chạy:

```
node sendTx.js
```

### 9. Xem giao dịch của bạn trong Mempool {#see-your-transaction-in-the-mempool}

Mở [trang Mempool](https://dashboard.alchemyapi.io/mempool) trong bảng điều khiển Alchemy của bạn và lọc theo ứng dụng bạn đã tạo để tìm giao dịch của mình. Đây là nơi chúng ta có thể xem quá trình chuyển đổi giao dịch của mình từ trạng thái chờ xử lý sang trạng thái đã khai thác (nếu thành công) hoặc trạng thái đã bị hủy bỏ nếu không thành công. Hãy chắc chắn giữ nó ở chế độ “Tất cả” để bạn có thể nắm bắt được các giao dịch “đã khai thác”, “đang chờ xử lý” và “đã bị hủy bỏ”. Bạn cũng có thể tìm kiếm giao dịch của mình bằng cách tìm các giao dịch được gửi đến địa chỉ `0x31b98d14007bdee637298086988a0bbd31184523`.

Để xem chi tiết giao dịch của bạn sau khi tìm thấy, hãy chọn hàm băm tx, thao tác này sẽ đưa bạn đến một giao diện trông như thế này:

![Ảnh chụp màn hình trình theo dõi Mempool](./mempool.png)

Từ đó, bạn có thể xem giao dịch của mình trên Etherscan bằng cách nhấp vào biểu tượng được khoanh tròn màu đỏ!

**Yippieeee! Bạn vừa gửi giao dịch Ethereum đầu tiên của mình bằng Alchemy 🎉**

_Để có phản hồi và đề xuất về hướng dẫn này, vui lòng nhắn tin cho Elan trên [Discord](https://discord.gg/A39JVCM) của Alchemy!_

_Được xuất bản lần đầu tại [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
