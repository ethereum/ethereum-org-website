---
title: "Hướng dẫn về NFT Minter"
description: "Trong hướng dẫn này, bạn sẽ xây dựng một NFT minter và tìm hiểu cách tạo một ứng dụng phi tập trung full stack bằng cách kết nối hợp đồng thông minh của bạn với một frontend React bằng các công cụ MetaMask và Web3."
author: "smudgil"
tags:
  [
    "solidity",
    "Token không phân tách (NFT)",
    "từ Alchemy",
    "hợp đồng thông minh",
    "frontend",
    "Pinata"
  ]
skill: intermediate
breadcrumb: "Dapp đúc NFT"
lang: vi
published: 2021-10-06
---

Một trong những thách thức lớn nhất đối với các nhà phát triển đến từ nền tảng Web2 là tìm ra cách kết nối hợp đồng thông minh của bạn với một dự án frontend và tương tác với nó.

Bằng cách xây dựng một NFT minter — một UI đơn giản nơi bạn có thể nhập liên kết đến tài sản kỹ thuật số, một tiêu đề và một mô tả — bạn sẽ học được cách:

- Kết nối với MetaMask thông qua dự án frontend của bạn
- Gọi các phương thức hợp đồng thông minh từ frontend của bạn
- Ký các giao dịch bằng MetaMask

Trong hướng dẫn này, chúng tôi sẽ sử dụng [React](https://react.dev/) làm framework frontend. Bởi vì hướng dẫn này chủ yếu tập trung vào phát triển Web3, chúng tôi sẽ không dành nhiều thời gian để phân tích các kiến thức cơ bản về React. Thay vào đó, chúng tôi sẽ tập trung vào việc mang lại chức năng cho dự án của mình.

Là một điều kiện tiên quyết, bạn nên có một sự hiểu biết ở cấp độ người mới bắt đầu về React—biết cách các thành phần, props, useState/useEffect và cách gọi hàm cơ bản hoạt động. Nếu bạn chưa bao giờ nghe về bất kỳ thuật ngữ nào trước đây, bạn có thể muốn xem [hướng dẫn Giới thiệu về React] này(https://react.dev/learn/tutorial-tic-tac-toe). Đối với những người học bằng hình ảnh, chúng tôi đặc biệt đề xuất chuỗi video tuyệt vời này [Hướng dẫn React hiện đại đầy đủ](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) của Net Ninja.

Và nếu bạn chưa có, bạn chắc chắn sẽ cần một tài khoản Alchemy để hoàn thành hướng dẫn này cũng như xây dựng bất cứ thứ gì trên chuỗi khối. Đăng ký một tài khoản miễn phí [tại đây](https://alchemy.com/).

Không chần chừ gì nữa, hãy bắt đầu nào!

## Kiến thức cơ bản về tạo NFT {#making-nfts-101}

Trước khi chúng ta bắt đầu xem xét bất kỳ mã nào, điều quan trọng là phải hiểu cách tạo NFT hoạt động. Nó bao gồm hai bước:

### Công bố một hợp đồng thông minh NFT trên chuỗi khối Ethereum {#publish-nft}

Sự khác biệt lớn nhất giữa hai tiêu chuẩn hợp đồng thông minh NFT là ERC-1155 là một tiêu chuẩn đa token và bao gồm chức năng hàng loạt, trong khi ERC-721 là một tiêu chuẩn token đơn và do đó chỉ hỗ trợ chuyển một token tại một thời điểm.

### Gọi hàm đúc {#minting-function}

Thông thường, hàm đúc này yêu cầu bạn chuyển vào hai biến làm tham số, đầu tiên là `recipient`, chỉ định địa chỉ sẽ nhận NFT mới đúc của bạn, và thứ hai là `tokenURI` của NFT, một chuỗi phân giải thành một tài liệu JSON mô tả siêu dữ liệu của NFT.

Siêu dữ liệu của NFT thực sự là thứ mang lại sức sống cho nó, cho phép nó có các thuộc tính, chẳng hạn như tên, mô tả, hình ảnh (hoặc tài sản kỹ thuật số khác) và các thuộc tính khác. Đây là [một ví dụ về tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), chứa siêu dữ liệu của một NFT.

Trong hướng dẫn này, chúng ta sẽ tập trung vào phần 2, gọi hàm đúc hợp đồng thông minh của một NFT hiện có bằng cách sử dụng UI React của chúng ta.

[Đây là liên kết](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) đến hợp đồng thông minh NFT ERC-721 mà chúng ta sẽ gọi trong hướng dẫn này. Nếu bạn muốn tìm hiểu cách chúng tôi đã tạo ra nó, chúng tôi thực sự khuyên bạn nên xem hướng dẫn khác của chúng tôi, ["Cách tạo một NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

Tuyệt vời, bây giờ chúng ta đã hiểu cách tạo NFT hoạt động, hãy sao chép các tệp khởi đầu của chúng ta!

## Sao chép các tệp khởi đầu {#clone-the-starter-files}

Đầu tiên, hãy truy cập [kho lưu trữ GitHub của nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) để lấy các tệp khởi đầu cho dự án này. Sao chép kho lưu trữ này vào môi trường cục bộ của bạn.

Khi bạn mở kho lưu trữ `nft-minter-tutorial` đã sao chép này, bạn sẽ nhận thấy rằng nó chứa hai thư mục: `minter-starter-files` và `nft-minter`.

- `minter-starter-files` chứa các tệp khởi đầu (chủ yếu là UI React) cho dự án này. Trong hướng dẫn này, **chúng ta sẽ làm việc trong thư mục này**, khi bạn tìm hiểu cách làm cho UI này trở nên sống động bằng cách kết nối nó với ví Ethereum của bạn và một hợp đồng thông minh NFT.
- `nft-minter` chứa toàn bộ hướng dẫn đã hoàn thành và có sẵn cho bạn như một tài liệu **tham khảo** **nếu bạn gặp khó khăn.**

Tiếp theo, mở bản sao của `minter-starter-files` trong trình chỉnh sửa mã của bạn, và sau đó điều hướng vào thư mục `src` của bạn.

Tất cả mã chúng ta sẽ viết sẽ nằm trong thư mục `src`. Chúng ta sẽ chỉnh sửa thành phần `Minter.js` và viết các tệp javascript bổ sung để cung cấp cho dự án của chúng ta chức năng Web3.

## Bước 2: Kiểm tra các tệp khởi đầu của chúng ta {#step-2-check-out-our-starter-files}

Trước khi bắt đầu viết mã, điều quan trọng là phải kiểm tra những gì đã được cung cấp cho chúng ta trong các tệp khởi đầu.

### Chạy dự án react của bạn {#get-your-react-project-running}

Hãy bắt đầu bằng cách chạy dự án React trong trình duyệt của chúng ta. Vẻ đẹp của React là một khi chúng ta có dự án đang chạy trong trình duyệt, bất kỳ thay đổi nào chúng ta lưu sẽ được cập nhật trực tiếp trong trình duyệt của chúng ta.

Để chạy dự án, điều hướng đến thư mục gốc của thư mục `minter-starter-files`, và chạy `npm install` trong terminal của bạn để cài đặt các phụ thuộc của dự án:

```bash
cd minter-starter-files
npm install
```

Sau khi chúng đã cài đặt xong, hãy chạy `npm start` trong terminal của bạn:

```bash
npm start
```

Làm như vậy sẽ mở http://localhost:3000/ trong trình duyệt của bạn, nơi bạn sẽ thấy frontend cho dự án của chúng ta. Nó sẽ bao gồm 3 trường: một nơi để nhập liên kết đến tài sản NFT của bạn, nhập tên NFT của bạn và cung cấp một mô tả.

Nếu bạn thử nhấp vào các nút "Kết nối Ví" hoặc "Đúc NFT", bạn sẽ nhận thấy chúng không hoạt động—đó là vì chúng ta vẫn cần lập trình chức năng của chúng! :\)

### Thành phần Minter.js {#minter-js}

**LƯU Ý:** Hãy chắc chắn rằng bạn đang ở trong thư mục `minter-starter-files` chứ không phải thư mục `nft-minter`!

Hãy quay lại thư mục `src` trong trình chỉnh sửa của chúng ta và mở tệp `Minter.js`. Việc hiểu mọi thứ trong tệp này là cực kỳ quan trọng, vì đây là thành phần React chính mà chúng ta sẽ làm việc.

Ở đầu tệp này, chúng ta có các biến trạng thái mà chúng ta sẽ cập nhật sau các sự kiện cụ thể.

```javascript
//Biến trạng thái
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Chưa bao giờ nghe về biến trạng thái hoặc hook trạng thái của React? Hãy xem các tài liệu [này](https://legacy.reactjs.org/docs/hooks-state.html).

Đây là ý nghĩa của từng biến:

- `walletAddress` - một chuỗi lưu trữ địa chỉ ví của người dùng
- `status` - một chuỗi chứa thông báo để hiển thị ở cuối UI
- `name` - một chuỗi lưu trữ tên của NFT
- `description` - một chuỗi lưu trữ mô tả của NFT
- `url` - một chuỗi là liên kết đến tài sản kỹ thuật số của NFT

Sau các biến trạng thái, bạn sẽ thấy ba hàm chưa được triển khai: `useEffect`, `connectWalletPressed` và `onMintPressed`. Bạn sẽ nhận thấy rằng tất cả các hàm này đều là `async`, đó là bởi vì chúng ta sẽ thực hiện các lệnh gọi API bất đồng bộ trong chúng! Tên của chúng đồng nghĩa với chức năng của chúng:

```javascript
useEffect(async () => {
  //TODO: triển khai
}, [])

const connectWalletPressed = async () => {
  //TODO: triển khai
}

const onMintPressed = async () => {
  //TODO: triển khai
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - đây là một hook của React được gọi sau khi thành phần của bạn được hiển thị. Bởi vì nó có một prop mảng rỗng `[]` được truyền vào (xem dòng 3), nó sẽ chỉ được gọi trong lần hiển thị _đầu tiên_ của thành phần. Ở đây, chúng ta sẽ gọi trình nghe ví của mình và một hàm ví khác để cập nhật UI của chúng ta để phản ánh xem một ví đã được kết nối hay chưa.
- `connectWalletPressed` - hàm này sẽ được gọi để kết nối ví MetaMask của người dùng với ứng dụng phi tập trung của chúng ta.
- `onMintPressed` - hàm này sẽ được gọi để đúc NFT của người dùng.

Gần cuối tệp này, chúng ta có UI của thành phần của mình. Nếu bạn xem xét kỹ mã này, bạn sẽ nhận thấy rằng chúng ta cập nhật các biến trạng thái `url`, `name`, và `description` của mình khi đầu vào trong các trường văn bản tương ứng của chúng thay đổi.

Bạn cũng sẽ thấy rằng `connectWalletPressed` và `onMintPressed` được gọi khi các nút có ID `mintButton` và `walletButton` được nhấp tương ứng.

```javascript
//UI của thành phần của chúng ta
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Đã kết nối: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Kết nối Ví</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Chỉ cần thêm liên kết, tên và mô tả tài sản của bạn, sau đó nhấn "Đúc".
    </p>
    <form>
      <h2>🖼 Liên kết đến tài sản: </h2>
      <input
        type="text"
        placeholder="ví dụ: https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Tên: </h2>
      <input
        type="text"
        placeholder="ví dụ: NFT đầu tiên của tôi!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Mô tả: </h2>
      <input
        type="text"
        placeholder="ví dụ: Thậm chí còn tuyệt hơn cả cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Đúc NFT
    </button>
    <p id="status">{status}</p>
</div>
)
```

Cuối cùng, hãy xem xét nơi thành phần Minter này được thêm vào.

Nếu bạn vào tệp `App.js`, là thành phần chính trong React hoạt động như một vùng chứa cho tất cả các thành phần khác, bạn sẽ thấy thành phần Minter của chúng ta được chèn vào dòng 7.

**Trong hướng dẫn này, chúng ta sẽ chỉ chỉnh sửa tệp `Minter.js` và thêm các tệp vào thư mục `src` của chúng ta.**

Bây giờ chúng ta đã hiểu những gì chúng ta đang làm việc, hãy thiết lập ví Ethereum của chúng ta!

## Thiết lập ví Ethereum của bạn {#set-up-your-ethereum-wallet}

Để người dùng có thể tương tác với hợp đồng thông minh của bạn, họ sẽ cần kết nối ví Ethereum của họ với ứng dụng phi tập trung của bạn.

### Tải xuống MetaMask {#download-metamask}

Trong bài hướng dẫn này, chúng ta sẽ sử dụng MetaMask, một ví ảo trong trình duyệt dùng để quản lý địa chỉ tài khoản Ethereum của bạn. Nếu bạn muốn hiểu thêm về cách thức hoạt động của các giao dịch trên Ethereum, hãy xem [trang này](/developers/docs/transactions/).

Bạn có thể tải xuống và tạo tài khoản MetaMask miễn phí [tại đây](https://metamask.io/download). Khi bạn đang tạo tài khoản, hoặc nếu bạn đã có tài khoản, hãy đảm bảo chuyển sang “Mạng thử nghiệm Ropsten” ở phía trên bên phải (để chúng ta không phải giao dịch bằng tiền thật).

### Thêm ether từ một Vòi {#add-ether-from-faucet}

Để đúc NFT của chúng ta (hoặc ký bất kỳ giao dịch nào trên chuỗi khối Ethereum), chúng ta sẽ cần một ít Eth giả. Để nhận Eth, bạn có thể truy cập [vòi Ropsten](https://faucet.ropsten.be/) và nhập địa chỉ tài khoản Ropsten của bạn, sau đó nhấp vào “Gửi Ropsten Eth”. Bạn sẽ sớm thấy Eth trong tài khoản MetaMask của mình!

### Kiểm tra số dư của bạn {#check-your-balance}

Để kiểm tra lại số dư của chúng ta, hãy thực hiện một yêu cầu [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) bằng cách sử dụng [công cụ soạn thảo của Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Thao tác này sẽ trả về số lượng Eth trong ví của chúng ta. Sau khi bạn nhập địa chỉ tài khoản MetaMask của mình và nhấp vào “Send Request”, bạn sẽ thấy một phản hồi như sau:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**LƯU Ý:** Kết quả này tính bằng wei chứ không phải eth. Wei được sử dụng làm mệnh giá nhỏ nhất của ether. Việc chuyển đổi từ wei sang eth là: 1 eth = 10¹⁸ wei. Vì vậy, nếu chúng ta chuyển đổi 0xde0b6b3a7640000 sang hệ thập phân, chúng ta sẽ nhận được 1\*10¹⁸, tương đương với 1 eth.

Phù! Tiền giả của chúng ta đã có đủ! <Emoji text=":money_mouth_face:" size={1} />

## Kết nối MetaMask với UI của bạn {#connect-metamask-to-your-UI}

Bây giờ ví MetaMask của chúng ta đã được thiết lập, hãy kết nối ứng dụng phi tập trung của chúng ta với nó!

Bởi vì chúng ta muốn tuân theo mô hình [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), chúng ta sẽ tạo một tệp riêng chứa các hàm của mình để quản lý logic, dữ liệu và các quy tắc của ứng dụng phi tập trung của chúng ta, và sau đó chuyển các hàm đó đến frontend của chúng ta (thành phần Minter.js của chúng ta).

### Hàm `connectWallet` {#connect-wallet-function}

Để làm điều đó, hãy tạo một thư mục mới có tên `utils` trong thư mục `src` của bạn và thêm một tệp có tên `interact.js` vào bên trong, tệp này sẽ chứa tất cả các hàm tương tác với ví và hợp đồng thông minh của chúng ta.

Trong tệp `interact.js` của chúng ta, chúng ta sẽ viết một hàm `connectWallet`, sau đó chúng ta sẽ nhập và gọi trong thành phần `Minter.js` của mình.

Trong tệp `interact.js` của bạn, hãy thêm những nội dung sau

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Viết một tin nhắn vào trường văn bản ở trên.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              Bạn phải cài đặt MetaMask, một ví Ethereum ảo, trong trình duyệt
              của bạn.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Hãy cùng phân tích mã này làm gì:

Đầu tiên, hàm của chúng ta kiểm tra xem `window.ethereum` có được bật trong trình duyệt của bạn không.

`window.ethereum` là một API toàn cầu được chèn bởi MetaMask và các nhà cung cấp ví khác cho phép các trang web yêu cầu tài khoản Ethereum của người dùng. Nếu được chấp thuận, nó có thể đọc dữ liệu từ các chuỗi khối mà người dùng đang kết nối và đề xuất người dùng ký các tin nhắn và giao dịch. Hãy xem [tài liệu MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) để biết thêm thông tin!

Nếu `window.ethereum` _không_ có mặt, điều đó có nghĩa là MetaMask chưa được cài đặt. Điều này dẫn đến một đối tượng JSON được trả về, trong đó `address` được trả về là một chuỗi rỗng và đối tượng `status` JSX chuyển tiếp rằng người dùng phải cài đặt MetaMask.

**Hầu hết các hàm chúng ta viết sẽ trả về các đối tượng JSON mà chúng ta có thể sử dụng để cập nhật các biến trạng thái và UI của mình.**

Bây giờ nếu `window.ethereum` _có_ mặt, thì đó là lúc mọi thứ trở nên thú vị.

Sử dụng vòng lặp try/catch, chúng ta sẽ cố gắng kết nối với MetaMask bằng cách gọi [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). Việc gọi hàm này sẽ mở MetaMask trong trình duyệt, qua đó người dùng sẽ được nhắc kết nối ví của họ với ứng dụng phi tập trung của bạn.

- Nếu người dùng chọn kết nối, `method: "eth_requestAccounts"` sẽ trả về một mảng chứa tất cả các địa chỉ tài khoản của người dùng đã được kết nối với ứng dụng phi tập trung. Nói chung, hàm `connectWallet` của chúng ta sẽ trả về một đối tượng JSON chứa `address` _đầu tiên_ trong mảng này (xem dòng 9) và một thông báo `status` nhắc người dùng viết một tin nhắn cho hợp đồng thông minh.
- Nếu người dùng từ chối kết nối, thì đối tượng JSON sẽ chứa một chuỗi rỗng cho `address` được trả về và một thông báo `status` phản ánh rằng người dùng đã từ chối kết nối.

### Thêm hàm connectWallet vào thành phần UI Minter.js của bạn {#add-connect-wallet}

Bây giờ chúng ta đã viết hàm `connectWallet` này, hãy kết nối nó với thành phần `Minter.js` của chúng ta.

Đầu tiên, chúng ta sẽ phải nhập hàm của mình vào tệp `Minter.js` bằng cách thêm `import { connectWallet } from "./utils/interact.js";` vào đầu tệp `Minter.js`. 11 dòng đầu tiên của `Minter.js` của bạn bây giờ sẽ trông như thế này:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Biến trạng thái
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Sau đó, bên trong hàm `connectWalletPressed` của chúng ta, chúng ta sẽ gọi hàm `connectWallet` đã nhập, như sau:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Bạn có nhận thấy hầu hết các chức năng của chúng ta được trừu tượng hóa khỏi thành phần `Minter.js` của chúng ta từ tệp `interact.js` không? Điều này là để chúng ta tuân thủ mô hình M-V-C!

Trong `connectWalletPressed`, chúng ta chỉ cần thực hiện một lệnh gọi await đến hàm `connectWallet` đã nhập của mình, và sử dụng phản hồi của nó, chúng ta cập nhật các biến `status` và `walletAddress` của mình thông qua các hook trạng thái của chúng.

Bây giờ, hãy lưu cả hai tệp `Minter.js` và `interact.js` và thử nghiệm UI của chúng ta cho đến nay.

Mở trình duyệt của bạn trên localhost:3000 và nhấn nút "Kết nối Ví" ở góc trên cùng bên phải của trang.

Nếu bạn đã cài đặt MetaMask, bạn sẽ được nhắc kết nối ví của mình với ứng dụng phi tập trung của bạn. Chấp nhận lời mời kết nối.

Bạn sẽ thấy rằng nút ví bây giờ phản ánh rằng địa chỉ của bạn đã được kết nối.

Tiếp theo, hãy thử làm mới trang... Điều này thật lạ. Nút ví của chúng ta đang nhắc chúng ta kết nối MetaMask, mặc dù nó đã được kết nối...

Tuy nhiên, đừng lo lắng! Chúng ta có thể dễ dàng khắc phục điều đó bằng cách triển khai một hàm có tên `getCurrentWalletConnected`, hàm này sẽ kiểm tra xem một địa chỉ đã được kết nối với ứng dụng phi tập trung của chúng ta hay chưa và cập nhật UI của chúng ta cho phù hợp!

### Hàm getCurrentWalletConnected {#get-current-wallet}

Trong tệp `interact.js` của bạn, hãy thêm hàm `getCurrentWalletConnected` sau:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Viết một tin nhắn vào trường văn bản ở trên.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Kết nối với MetaMask bằng nút trên cùng bên phải.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              Bạn phải cài đặt MetaMask, một ví Ethereum ảo, trong trình duyệt
              của bạn.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Mã này _rất_ tương tự với hàm `connectWallet` mà chúng ta vừa viết trước đó.

Sự khác biệt chính là thay vì gọi phương thức `eth_requestAccounts`, phương thức này sẽ mở MetaMask để người dùng kết nối ví của họ, ở đây chúng ta gọi phương thức `eth_accounts`, phương thức này chỉ đơn giản trả về một mảng chứa các địa chỉ MetaMask hiện đang được kết nối với ứng dụng phi tập trung của chúng ta.

Để xem hàm này hoạt động, hãy gọi nó trong hàm `useEffect` của thành phần `Minter.js` của chúng ta.

Giống như chúng ta đã làm với `connectWallet`, chúng ta phải nhập hàm này từ tệp `interact.js` vào tệp `Minter.js` của mình như sau:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //nhập tại đây
} from "./utils/interact.js"
```

Bây giờ, chúng ta chỉ cần gọi nó trong hàm `useEffect` của mình:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Lưu ý, chúng ta sử dụng phản hồi của lệnh gọi đến `getCurrentWalletConnected` để cập nhật các biến trạng thái `walletAddress` và `status` của mình.

Sau khi bạn đã thêm mã này, hãy thử làm mới cửa sổ trình duyệt của chúng ta. Nút sẽ hiển thị rằng bạn đã kết nối và hiển thị bản xem trước địa chỉ ví đã kết nối của bạn - ngay cả sau khi bạn làm mới!

### Triển khai addWalletListener {#implement-add-wallet-listener}

Bước cuối cùng trong quá trình thiết lập ví ứng dụng phi tập trung của chúng ta là triển khai trình nghe ví để UI của chúng ta cập nhật khi trạng thái ví thay đổi, chẳng hạn như khi người dùng ngắt kết nối hoặc chuyển đổi tài khoản.

Trong tệp `Minter.js` của bạn, hãy thêm một hàm `addWalletListener` trông như sau:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Viết một tin nhắn vào trường văn bản ở trên.")
      } else {
        setWallet("")
        setStatus("🦊 Kết nối với MetaMask bằng nút trên cùng bên phải.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Bạn phải cài đặt MetaMask, một ví Ethereum ảo, trong trình duyệt của bạn.
        </a>
      </p>
    )
  }
}
```

Hãy nhanh chóng phân tích những gì đang xảy ra ở đây:

- Đầu tiên, hàm của chúng ta kiểm tra xem `window.ethereum` có được bật hay không (tức là MetaMask đã được cài đặt).
  - Nếu không, chúng ta chỉ cần thiết lập biến trạng thái `status` của mình thành một chuỗi JSX nhắc người dùng cài đặt MetaMask.
  - Nếu nó được bật, chúng ta sẽ thiết lập trình nghe `window.ethereum.on("accountsChanged")` trên dòng 3 để lắng nghe các thay đổi trạng thái trong ví MetaMask, bao gồm khi người dùng kết nối thêm một tài khoản vào ứng dụng phi tập trung, chuyển đổi tài khoản hoặc ngắt kết nối một tài khoản. Nếu có ít nhất một tài khoản được kết nối, biến trạng thái `walletAddress` sẽ được cập nhật thành tài khoản đầu tiên trong mảng `accounts` được trả về bởi trình nghe. Ngược lại, `walletAddress` được đặt thành một chuỗi rỗng.

Cuối cùng, chúng ta phải gọi nó trong hàm `useEffect` của mình:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Và thế là xong! Chúng ta đã hoàn thành việc lập trình tất cả các chức năng ví của mình! Bây giờ ví của chúng ta đã được thiết lập, hãy cùng tìm hiểu cách đúc NFT của chúng ta!

## Kiến thức cơ bản về siêu dữ liệu NFT {#nft-metadata-101}

Vì vậy, hãy nhớ lại siêu dữ liệu NFT mà chúng ta vừa nói đến trong Bước 0 của hướng dẫn này—nó mang lại sức sống cho NFT, cho phép nó có các thuộc tính, chẳng hạn như tài sản kỹ thuật số, tên, mô tả và các thuộc tính khác.

Chúng ta sẽ cần phải cấu hình siêu dữ liệu này dưới dạng một đối tượng JSON và lưu trữ nó, để chúng ta có thể chuyển nó vào làm tham số `tokenURI` khi gọi hàm `mintNFT` của hợp đồng thông minh của chúng ta.

Văn bản trong các trường "Liên kết đến tài sản", "Tên", "Mô tả" sẽ bao gồm các thuộc tính khác nhau của siêu dữ liệu NFT của chúng ta. Chúng ta sẽ định dạng siêu dữ liệu này dưới dạng một đối tượng JSON, nhưng có một vài tùy chọn về nơi chúng ta có thể lưu trữ đối tượng JSON này:

- Chúng ta có thể lưu trữ nó trên chuỗi khối Ethereum; tuy nhiên, làm như vậy sẽ rất tốn kém.
- Chúng ta có thể lưu trữ nó trên một máy chủ tập trung, như AWS hoặc Firebase. Nhưng điều đó sẽ đi ngược lại với đặc tính phi tập trung của chúng ta.
- Chúng ta có thể sử dụng IPFS, một giao thức phi tập trung và mạng ngang hàng để lưu trữ và chia sẻ dữ liệu trong một hệ thống tệp phân tán. Vì giao thức này là phi tập trung và miễn phí, nó là lựa chọn tốt nhất của chúng ta!

Để lưu trữ siêu dữ liệu của chúng ta trên IPFS, chúng ta sẽ sử dụng [Pinata](https://pinata.cloud/), một API và bộ công cụ IPFS tiện lợi. Trong bước tiếp theo, chúng ta sẽ giải thích chính xác cách thực hiện điều này!

## Sử dụng Pinata để ghim siêu dữ liệu của bạn vào IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Nếu bạn chưa có tài khoản [Pinata](https://pinata.cloud/), hãy đăng ký một tài khoản miễn phí [tại đây](https://app.pinata.cloud/auth/signup) và hoàn thành các bước để xác minh email và tài khoản của bạn.

### Tạo khóa API Pinata của bạn {#create-pinata-api-key}

Điều hướng đến trang [https://pinata.cloud/keys](https://pinata.cloud/keys), sau đó chọn nút "New Key" ở trên cùng, đặt widget Admin thành bật và đặt tên cho khóa của bạn.

Sau đó, bạn sẽ thấy một cửa sổ bật lên với thông tin API của mình. Hãy chắc chắn rằng bạn đặt nó ở một nơi an toàn.

Bây giờ khóa của chúng ta đã được thiết lập, hãy thêm nó vào dự án của chúng ta để có thể sử dụng.

### Tạo tệp .env {#create-a-env}

Chúng ta có thể lưu trữ khóa và mã bí mật Pinata của mình một cách an toàn trong một tệp môi trường. Hãy cài đặt [gói dotenv](https://www.npmjs.com/package/dotenv) trong thư mục dự án của bạn.

Mở một tab mới trong terminal của bạn (riêng biệt với tab đang chạy local host) và đảm bảo bạn đang ở trong thư mục `minter-starter-files`, sau đó chạy lệnh sau trong terminal của bạn:

```text
npm install dotenv --save
```

Tiếp theo, tạo tệp `.env` trong thư mục gốc của `minter-starter-files` bằng cách nhập nội dung sau vào dòng lệnh của bạn:

```javascript
vim.env
```

Thao tác này sẽ mở tệp `.env` của bạn trong vim (một trình soạn thảo văn bản). Để lưu nó, hãy nhấn "esc" + ":" + "q" trên bàn phím của bạn theo thứ tự đó.

Tiếp theo, trong VSCode, điều hướng đến tệp `.env` của bạn và thêm khóa API và mã bí mật API Pinata của bạn vào đó, như sau:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Lưu tệp, và sau đó bạn đã sẵn sàng để bắt đầu viết hàm để tải siêu dữ liệu JSON của mình lên IPFS!

### Triển khai pinJSONToIPFS {#pin-json-to-ipfs}

May mắn cho chúng ta, Pinata có một [API dành riêng cho việc tải dữ liệu JSON lên IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) và một ví dụ JavaScript tiện lợi với axios mà chúng ta có thể sử dụng, với một số sửa đổi nhỏ.

Trong thư mục `utils` của bạn, hãy tạo một tệp khác có tên `pinata.js` và sau đó nhập mã bí mật và khóa Pinata của chúng ta từ tệp .env như sau:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Tiếp theo, dán mã bổ sung từ bên dưới vào tệp `pinata.js` của bạn. Đừng lo lắng, chúng ta sẽ phân tích ý nghĩa của mọi thứ!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Vậy mã này làm gì chính xác?

Đầu tiên, nó nhập [axios](https://www.npmjs.com/package/axios), một ứng dụng HTTP dựa trên promise cho trình duyệt và node.js, mà chúng ta sẽ sử dụng để thực hiện một yêu cầu đến Pinata.

Sau đó, chúng ta có hàm bất đồng bộ `pinJSONToIPFS`, nhận `JSONBody` làm đầu vào và khóa và mã bí mật api Pinata trong tiêu đề của nó, tất cả để thực hiện một yêu cầu POST đến API `pinJSONToIPFS` của họ.

- Nếu yêu cầu POST này thành công, thì hàm của chúng ta sẽ trả về một đối tượng JSON với boolean `success` là true và `pinataUrl` nơi siêu dữ liệu của chúng ta được ghim. Chúng ta sẽ sử dụng `pinataUrl` được trả về này làm đầu vào `tokenURI` cho hàm đúc của hợp đồng thông minh của chúng ta.
- Nếu yêu cầu post này không thành công, thì hàm của chúng ta sẽ trả về một đối tượng JSON với boolean `success` là false và một chuỗi `message` chuyển tiếp lỗi của chúng ta.

Như với các loại trả về của hàm `connectWallet` của chúng ta, chúng ta đang trả về các đối tượng JSON để có thể sử dụng các tham số của chúng để cập nhật các biến trạng thái và UI của mình.

## Tải hợp đồng thông minh của bạn {#load-your-smart-contract}

Bây giờ chúng ta đã có cách để tải siêu dữ liệu NFT của mình lên IPFS thông qua hàm `pinJSONToIPFS`, chúng ta sẽ cần một cách để tải một phiên bản của hợp đồng thông minh của mình để có thể gọi hàm `mintNFT` của nó.

Như chúng ta đã đề cập trước đó, trong hướng dẫn này, chúng ta sẽ sử dụng [hợp đồng thông minh NFT hiện có này](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); tuy nhiên, nếu bạn muốn tìm hiểu cách chúng tôi đã tạo ra nó, hoặc tự tạo một cái, chúng tôi thực sự khuyên bạn nên xem hướng dẫn khác của chúng tôi, ["Cách tạo một NFT."](https://www.alchemy.com/docs/how-to-create-an-nft).

### Giao diện nhị phân ứng dụng hợp đồng {#contract-abi}

Nếu bạn đã kiểm tra kỹ các tệp của chúng ta, bạn sẽ nhận thấy rằng trong thư mục `src` của mình, có một tệp `contract-abi.json`. Một Giao diện nhị phân ứng dụng là cần thiết để chỉ định hàm nào mà một hợp đồng sẽ gọi cũng như đảm bảo rằng hàm sẽ trả về dữ liệu ở định dạng bạn đang mong đợi.

Chúng ta cũng sẽ cần một khóa Giao diện Lập trình Ứng dụng Alchemy và Giao diện Lập trình Ứng dụng Alchemy Web3 để kết nối với chuỗi khối Ethereum và tải hợp đồng thông minh của mình.

### Tạo khóa Giao diện Lập trình Ứng dụng Alchemy của bạn {#create-alchemy-api}

Nếu bạn chưa có tài khoản Alchemy, [hãy đăng ký miễn phí tại đây.](https://alchemy.com/?a=eth-org-nft-minter)

Khi bạn đã tạo tài khoản Alchemy, bạn có thể tạo một khoá API bằng cách tạo một ứng dụng. Điều này sẽ cho phép chúng ta tạo các yêu cầu gửi đến mạng thử nghiệm Ropsten.

Điều hướng đến trang “Create App” trong bảng điều khiển Alchemy của bạn bằng cách di chuột qua “Apps” trong thanh điều hướng và nhấp vào “Create App”.

Đặt tên cho ứng dụng của bạn, chúng tôi đã chọn "My First NFT!", cung cấp một mô tả ngắn, chọn “Staging” cho Môi trường được sử dụng để lưu trữ ứng dụng của bạn và chọn “Ropsten” cho mạng của bạn.

Nhấp vào "Create app" và thế là xong! Ứng dụng của bạn sẽ xuất hiện trong bảng dưới đây.

Tuyệt vời, bây giờ chúng ta đã tạo URL API HTTP Alchemy của mình, hãy sao chép nó vào clipboard của bạn...

…và sau đó hãy thêm nó vào tệp `.env` của chúng ta. Nói chung, tệp .env của bạn sẽ trông như thế này:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Bây giờ chúng ta đã có Giao diện nhị phân ứng dụng hợp đồng và khóa Giao diện Lập trình Ứng dụng Alchemy của mình, chúng ta đã sẵn sàng để tải hợp đồng thông minh của mình bằng [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Thiết lập điểm cuối và hợp đồng Alchemy Web3 của bạn {#setup-alchemy-endpoint}

Đầu tiên, nếu bạn chưa có, bạn sẽ cần cài đặt [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) bằng cách điều hướng đến thư mục Trang chủ: `nft-minter-tutorial` trong terminal:

```text
cd ..
npm install @alch/alchemy-web3
```

Tiếp theo, hãy quay lại tệp `interact.js` của chúng ta. Ở đầu tệp, hãy thêm mã sau để nhập khóa Alchemy của bạn từ tệp .env và thiết lập điểm cuối Alchemy Web3 của bạn:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) là một trình bao bọc xung quanh [Web3.js](https://docs.web3js.org/), cung cấp các phương thức Giao diện Lập trình Ứng dụng nâng cao và các lợi ích quan trọng khác để giúp cuộc sống của bạn với tư cách là một nhà phát triển web3 dễ dàng hơn. Nó được thiết kế để yêu cầu cấu hình tối thiểu để bạn có thể bắt đầu sử dụng nó trong ứng dụng của mình ngay lập tức!

Tiếp theo, hãy thêm Giao diện nhị phân ứng dụng hợp đồng và địa chỉ hợp đồng của chúng ta vào tệp.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Một khi chúng ta có cả hai, chúng ta đã sẵn sàng để bắt đầu viết mã hàm đúc của mình!

## Triển khai hàm mintNFT {#implement-the-mintnft-function}

Bên trong tệp `interact.js` của bạn, hãy xác định hàm `mintNFT`, hàm này sẽ đúc NFT của chúng ta.

Bởi vì chúng ta sẽ thực hiện nhiều lệnh gọi bất đồng bộ (đến Pinata để ghim siêu dữ liệu của chúng ta vào IPFS, Alchemy Web3 để tải hợp đồng thông minh của chúng ta, và MetaMask để ký các giao dịch của chúng ta), hàm của chúng ta cũng sẽ là bất đồng bộ.

Ba đầu vào cho hàm của chúng ta sẽ là `url` của tài sản kỹ thuật số, `name`, và `description`. Thêm chữ ký hàm sau bên dưới hàm `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Xử lý lỗi đầu vào {#input-error-handling}

Đương nhiên, việc có một số loại xử lý lỗi đầu vào ở đầu hàm là hợp lý, để chúng ta thoát khỏi hàm này nếu các tham số đầu vào của chúng ta không chính xác. Bên trong hàm của chúng ta, hãy thêm mã sau:

```javascript
export const mintNFT = async (url, name, description) => {
  //xử lý lỗi
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Vui lòng đảm bảo tất cả các trường đã được hoàn thành trước khi đúc.",
    }
  }
}
```

Về cơ bản, nếu bất kỳ tham số đầu vào nào là một chuỗi rỗng, thì chúng ta sẽ trả về một đối tượng JSON trong đó boolean `success` là false, và chuỗi `status` chuyển tiếp rằng tất cả các trường trong UI của chúng ta phải được hoàn thành.

### Tải siêu dữ liệu lên IPFS {#upload-metadata-to-ipfs}

Một khi chúng ta biết siêu dữ liệu của mình đã được định dạng đúng cách, bước tiếp theo là gói nó vào một đối tượng JSON và tải nó lên IPFS thông qua `pinJSONToIPFS` mà chúng ta đã viết!

Để làm điều đó, trước tiên chúng ta cần nhập hàm `pinJSONToIPFS` vào tệp `interact.js` của mình. Ở đầu tệp `interact.js`, hãy thêm:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Hãy nhớ lại rằng `pinJSONToIPFS` nhận vào một thân JSON. Vì vậy, trước khi chúng ta gọi nó, chúng ta sẽ cần định dạng các tham số `url`, `name`, và `description` của mình thành một đối tượng JSON.

Hãy cập nhật mã của chúng ta để tạo một đối tượng JSON có tên `metadata` và sau đó thực hiện một lệnh gọi đến `pinJSONToIPFS` với tham số `metadata` này:

```javascript
export const mintNFT = async (url, name, description) => {
  //xử lý lỗi
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Vui lòng đảm bảo tất cả các trường đã được hoàn thành trước khi đúc.",
    }
  }

  //tạo siêu dữ liệu
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //thực hiện lệnh gọi pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Đã xảy ra lỗi khi tải lên tokenURI của bạn.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Lưu ý, chúng ta lưu trữ phản hồi của lệnh gọi đến `pinJSONToIPFS(metadata)` trong đối tượng `pinataResponse`. Sau đó, chúng ta phân tích đối tượng này để tìm bất kỳ lỗi nào.

Nếu có lỗi, chúng ta sẽ trả về một đối tượng JSON trong đó boolean `success` là false và chuỗi `status` của chúng ta chuyển tiếp rằng lệnh gọi của chúng ta đã thất bại. Ngược lại, chúng ta trích xuất `pinataURL` từ `pinataResponse` và lưu trữ nó làm biến `tokenURI` của mình.

Bây giờ là lúc tải hợp đồng thông minh của chúng ta bằng Giao diện Lập trình Ứng dụng Alchemy Web3 mà chúng ta đã khởi tạo ở đầu tệp của mình. Thêm dòng mã sau vào cuối hàm `mintNFT` để thiết lập hợp đồng tại biến toàn cục `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

Điều cuối cùng cần thêm vào hàm `mintNFT` của chúng ta là giao dịch Ethereum của chúng ta:

```javascript
//thiết lập giao dịch Ethereum của bạn
const transactionParameters = {
  to: contractAddress, // Bắt buộc ngoại trừ trong quá trình xuất bản hợp đồng.
  from: window.ethereum.selectedAddress, // phải khớp với địa chỉ đang hoạt động của người dùng.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //thực hiện lệnh gọi đến hợp đồng thông minh NFT
}

//ký giao dịch qua MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Kiểm tra giao dịch của bạn trên Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Đã xảy ra lỗi: " + error.message,
  }
}
```

Nếu bạn đã quen thuộc với các giao dịch Ethereum, bạn sẽ nhận thấy rằng cấu trúc khá tương tự với những gì bạn đã thấy.

- Đầu tiên, chúng ta thiết lập các tham số giao dịch của mình.
  - `to` chỉ định địa chỉ người nhận (hợp đồng thông minh của chúng ta)
  - `from` chỉ định người ký giao dịch (địa chỉ được kết nối của người dùng với MetaMask: `window.ethereum.selectedAddress`)
  - `data` chứa lệnh gọi đến phương thức `mintNFT` của hợp đồng thông minh của chúng ta, phương thức này nhận `tokenURI` và địa chỉ ví của người dùng, `window.ethereum.selectedAddress`, làm đầu vào
- Sau đó, chúng ta thực hiện một lệnh gọi await, `window.ethereum.request,` trong đó chúng ta yêu cầu MetaMask ký giao dịch. Lưu ý, trong yêu cầu này, chúng ta đang chỉ định phương thức eth của mình (eth_SentTransaction) và chuyển vào các `transactionParameters` của chúng ta. Tại thời điểm này, MetaMask sẽ mở ra trong trình duyệt và nhắc người dùng ký hoặc từ chối giao dịch.
  - Nếu giao dịch thành công, hàm sẽ trả về một đối tượng JSON trong đó boolean `success` được thiết lập là true và chuỗi `status` nhắc người dùng kiểm tra Etherscan để biết thêm thông tin về giao dịch của họ.
  - Nếu giao dịch không thành công, hàm sẽ trả về một đối tượng JSON trong đó boolean `success` được thiết lập là false và chuỗi `status` chuyển tiếp thông điệp lỗi.

Nói chung, hàm `mintNFT` của chúng ta sẽ trông như thế này:

```javascript
export const mintNFT = async (url, name, description) => {
  //xử lý lỗi
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Vui lòng đảm bảo tất cả các trường đã được hoàn thành trước khi đúc.",
    }
  }

  //tạo siêu dữ liệu
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //yêu cầu ghim pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Đã xảy ra lỗi khi tải lên tokenURI của bạn.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //tải hợp đồng thông minh
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //thiết lập giao dịch Ethereum của bạn
  const transactionParameters = {
    to: contractAddress, // Bắt buộc ngoại trừ trong quá trình xuất bản hợp đồng.
    from: window.ethereum.selectedAddress, // phải khớp với địa chỉ đang hoạt động của người dùng.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //thực hiện lệnh gọi đến hợp đồng thông minh NFT
  }

  //ký giao dịch qua MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Kiểm tra giao dịch của bạn trên Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Đã xảy ra lỗi: " + error.message,
    }
  }
}
```

Đó là một hàm khổng lồ! Bây giờ, chúng ta chỉ cần kết nối hàm `mintNFT` của mình với thành phần `Minter.js`...

## Kết nối mintNFT với frontend Minter.js của chúng ta {#connect-our-frontend}

Mở tệp `Minter.js` của bạn và cập nhật dòng `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` ở trên cùng thành:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Cuối cùng, triển khai hàm `onMintPressed` để thực hiện lệnh gọi await đến hàm `mintNFT` đã nhập của bạn và cập nhật biến trạng thái `status` để phản ánh xem giao dịch của chúng ta có thành công hay không:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Triển khai NFT của bạn lên một trang web trực tiếp {#deploy-your-NFT}

Sẵn sàng đưa dự án của bạn lên mạng để người dùng tương tác chưa? Hãy xem [hướng dẫn này](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) để triển khai Minter của bạn lên một trang web trực tiếp.

Một bước cuối cùng...

## Khuấy đảo thế giới blockchain {#take-the-blockchain-world-by-storm}

Chỉ đùa thôi, bạn đã hoàn thành hướng dẫn rồi!

Tóm lại, bằng cách xây dựng một NFT minter, bạn đã học thành công cách:

- Kết nối với MetaMask thông qua dự án frontend của bạn
- Gọi các phương thức hợp đồng thông minh từ frontend của bạn
- Ký các giao dịch bằng MetaMask

Có lẽ, bạn muốn có thể khoe các NFT được đúc thông qua ứng dụng phi tập trung của mình trong ví của bạn — vì vậy hãy chắc chắn xem hướng dẫn nhanh của chúng tôi [Cách xem NFT của bạn trong Ví](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

Và, như mọi khi, nếu bạn có bất kỳ câu hỏi nào, chúng tôi ở đây để Trợ giúp trong [Alchemy Discord](https://discord.gg/gWuC7zB). Chúng tôi rất nóng lòng được xem bạn áp dụng các khái niệm từ hướng dẫn này vào các dự án trong tương lai của mình như thế nào!
