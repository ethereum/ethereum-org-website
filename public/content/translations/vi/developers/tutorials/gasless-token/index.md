---
title: "Cho phép người dùng không cần Gas của bạn nắm giữ token và gọi hợp đồng"
description: "Sử dụng trừu tượng hóa tài khoản, chúng ta có thể tạo các ví hợp đồng thông minh chấp nhận các giao dịch được gửi bởi một EOA cụ thể hoặc được ký bởi EOA đó. Các hợp đồng thông minh này sau đó có thể sở hữu token, nằm dưới sự kiểm soát của EOA."
author: Ori Pomerantz
tags:
  - không cần gas
  - erc-20
  - trừu tượng hóa tài khoản
skill: intermediate
breadcrumb: "Token không cần Gas"
lang: vi
published: 2026-04-01
---

## Giới thiệu {#introduction}

Một [bài viết trước](/developers/tutorials/gasless/) đã thảo luận về việc sử dụng quyền truy cập không cần Gas vào ứng dụng của riêng bạn bằng cách sử dụng chữ ký EIP-712, nhưng nó bị giới hạn ở các hợp đồng thông minh của riêng bạn. Sử dụng [trừu tượng hóa tài khoản](/roadmap/account-abstraction/), chúng ta có thể tạo các ví hợp đồng thông minh chấp nhận hai loại giao dịch và chuyển tiếp chúng đến một đích được yêu cầu:

- Các giao dịch được gửi bởi một EOA cụ thể (yêu cầu EOA đó phải có ETH)
- Các giao dịch được gửi từ bất kỳ đâu, nhưng được ký bởi cùng một EOA.

Bằng cách này, chúng ta có thể cung cấp một cách không cần Gas để một Tài khoản nắm giữ tài sản (token, v.v.) và thực hiện tất cả các chức năng mà một EOA có Gas có thể làm.

### Tại sao chúng ta không thể chỉ chuyển tiếp yêu cầu? {#why-no-tx-origin}

Trong ERC-20 và các tiêu chuẩn liên quan, chủ sở hữu Tài khoản là [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), Địa chỉ đã gọi hợp đồng token, không nhất thiết phải là người khởi tạo giao dịch, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). Điều này được yêu cầu vì [lý do bảo mật](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). Điều này có nghĩa là nếu chúng ta chuyển tiếp các yêu cầu chuyển token, chúng sẽ cố gắng chuyển token từ Địa chỉ của người chuyển tiếp thay vì Địa chỉ do người dùng kiểm soát.

Có một giải pháp cho phép bạn sử dụng Địa chỉ EOA thông qua [EIP-7702](https://eip7702.io/), nhưng nó yêu cầu việc ký một sự ủy quyền có khả năng gây nguy hiểm, vì vậy bạn chỉ có thể sử dụng nó để ủy quyền cho một hợp đồng thông minh mà nhà cung cấp Ví chấp thuận. Đối với hướng dẫn này, tôi thích phương pháp đơn giản hơn nhiều là tạo một hợp đồng thông minh làm proxy (đại diện) cho người dùng.

## Xem nó hoạt động {#in-action}

1. Đảm bảo bạn có cả [Node](https://nodejs.org/en/download) và [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Sao chép (clone) ứng dụng và cài đặt phần mềm cần thiết.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Chỉnh sửa `.env` để đặt `SEPOLIA_PRIVATE_KEY` thành một Ví có ETH trên Sepolia. Nếu bạn cần Sepolia ETH, hãy [sử dụng một vòi](/developers/docs/networks/#sepolia) để lấy nó. Lý tưởng nhất là khóa riêng tư này nên khác với khóa bạn có trong Ví trình duyệt của mình.

4. Khởi động máy chủ.

   ```sh
   npm run dev
   ```

5. Duyệt đến ứng dụng tại URL [`http://localhost:5173`](http://localhost:5173).

6. Nhấp vào **Connect with Injected** để kết nối với một Ví. Chấp thuận trong Ví và chấp thuận việc chuyển sang Sepolia nếu cần.

7. Cuộn xuống và nhấp vào **Deploy UserProxy (slow process)**.

8. Bạn có thể thấy khi proxy người dùng được triển khai vì có một Địa chỉ bên cạnh **UserProxy access**. Nếu bạn đã đợi 24 giây (2 khối) mà điều đó vẫn chưa xảy ra, có thể có vấn đề với việc phát hiện các thay đổi.

   Nếu đúng như vậy, hãy truy cập [trình khám phá khối Sepolia](https://eth-sepolia.blockscout.com/) và nhập mã băm giao dịch triển khai mà bạn thấy trong đầu ra của máy chủ tại `npm run dev`. Nhấp vào hợp đồng đã tạo để xem Địa chỉ của nó, sau đó sao chép nó. Dán Địa chỉ vào trường _Or enter existing proxy address_, sau đó nhấp vào **Set proxy address**.

9. Nhấp vào **Request more tokens for proxy** để gửi một lệnh gọi đến hàm [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) của hợp đồng ERC-20 để nhận token. **Xác nhận** chữ ký trong Ví. Tất nhiên, các token sẽ đến Địa chỉ của proxy, chứ không phải của người dùng.

10. Cuộn xuống và nhấp vào liên kết dưới _Last transaction:_. Thao tác này sẽ mở trình duyệt để hiển thị cho bạn giao dịch `faucet`.

11. Trong phần _amount to transfer_, hãy nhập một số từ một đến một nghìn. Nhấp vào **Transfer** để chuyển token đến Địa chỉ của riêng bạn. Trước khi bạn nhấp vào **Xác nhận** cho yêu cầu, hãy xem rằng dữ liệu đang được ký là không rõ ràng. Người dùng sẽ gặp khó khăn trong việc hiểu những gì họ đang ký. Hãy nhớ rằng chúng ta sẽ thảo luận về nó [bên dưới](#vulnerabilities).

12. Sau khi giao dịch được xác nhận, hãy đợi để xem sự thay đổi trong cả _your balance_ và _proxy balance_. Lưu ý rằng điều này cũng sẽ mất một chút thời gian, vì Sepolia có thời gian tạo khối là 12 giây.

## Cách thức hoạt động {#how-work}

Để có trải nghiệm không cần Gas, chúng ta cần một giao diện người dùng cho người dùng, một máy chủ để định tuyến các thông điệp từ giao diện người dùng đến Chuỗi và một hợp đồng thông minh để nhận và xác minh chúng.

### Hợp đồng thông minh của ví {#wallet-smart-contract}

Đây là [hợp đồng thông minh](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Mục đích của nó là làm bất cứ điều gì chủ sở hữu thực sự yêu cầu, bất kể kênh nào được sử dụng để yêu cầu nó và bỏ qua mọi thứ khác. Để làm điều này, các hàm của nó nhận một Địa chỉ đích để gọi và dữ liệu để sử dụng để gọi nó.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

Danh tính của chủ sở hữu và một [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) để ngăn các thông điệp bị lặp lại. Vì nonce là một biến `public`, trình biên dịch Solidity cũng tạo ra một hàm view, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), cho phép mã ngoài chuỗi đọc giá trị của nó.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

Thông tin cần thiết để xác minh [chữ ký EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

Một `UserProxy` được gắn với một Địa chỉ chủ sở hữu duy nhất. Điều này là cần thiết vì nó có thể sở hữu tài sản (token ERC-20, NFT, v.v.). Chúng ta không muốn trộn lẫn tài sản thuộc về các chủ sở hữu khác nhau.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[Bộ phân tách miền (domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Nó không thể được tính toán tại thời điểm biên dịch, vì nó phụ thuộc vào ID Chuỗi và Địa chỉ hợp đồng. Điều này khiến cho một UserProxy không thể bị đánh lừa bởi một thông điệp được chuẩn bị cho một UserProxy khác.

```solidity
    event CallResult(address target, bytes returnData);
```

Ghi Nhật ký kết quả của một lệnh gọi.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Hàm này có thể được gọi trực tiếp bởi chủ sở hữu. Nếu không có bộ chuyển tiếp nào khả dụng, chủ sở hữu vẫn có thể truy cập trực tiếp vào tài sản trên Chuỗi khối (nếu người dùng có ETH).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Nếu chúng ta được gọi _trực tiếp_ bởi chủ sở hữu, hãy gọi đích đến với dữ liệu lệnh gọi được cung cấp.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

Đây là hàm chính của `UserProxy`. Nó nhận `target` và `data`, cũng như một chữ ký.

```solidity
    external returns (bytes memory) {
        // Tính toán bản tóm tắt EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

Bản tóm tắt (digest) cũng bao gồm nonce, nhưng chúng ta không cần nhận nó từ giao dịch; chúng ta đã biết giá trị đúng. Một chữ ký với nonce sai sẽ bị từ chối.

```solidity

    // Khôi phục người ký
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Nếu chữ ký không hợp lệ, `ecrecover` thường sẽ trả về một Địa chỉ khác và nó sẽ không được chấp nhận.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Gọi hợp đồng mà người dùng đã yêu cầu chúng ta gọi và hoàn nguyên nếu không thành công.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Tăng nonce để ngăn chặn phát lại

    return returnData;
}
```

Nếu thành công, phát ra một sự kiện Nhật ký và tăng nonce.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

Đây là các biến thể gần như giống hệt nhau cho phép bạn cũng chuyển ETH ra khỏi hợp đồng.

### Bộ chuyển tiếp (relayer) {#relayer}

Bộ chuyển tiếp là một [thành phần máy chủ](/developers/tutorials/server-components/). Nó được viết bằng JavaScript; bạn có thể xem mã nguồn [tại đây](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

Các thư viện chúng ta cần. Đây là một máy chủ [Express](https://expressjs.com/), sử dụng [Vite](https://vite.dev/) để phục vụ mã giao diện người dùng. Chúng ta sử dụng [Viem](https://viem.sh/) để giao tiếp với Chuỗi khối và [dotenv](https://www.dotenv.org/) để đọc khóa riêng tư cho Địa chỉ gửi giao dịch.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

Đây là một cách đơn giản để đọc `UserProxy` đã biên dịch. Chúng ta cần ABI để có thể gọi `UserProxy` và mã đã biên dịch để có thể triển khai nó cho người dùng.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Đọc tệp `.env`, trích xuất Địa chỉ và in nó ra bảng điều khiển (console).

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Các client Viem giao tiếp với Chuỗi khối.

```js
const start = async () => {
  const app = express()
```

Chạy một máy chủ Express.

```js
  app.use(express.json())
```

Yêu cầu Express đọc phần thân yêu cầu (request body) và nếu nó là JSON thì phân tích cú pháp nó.

```js
  app.post("/server/deploy", async (req, res) => {
```

Đây là mã xử lý các yêu cầu triển khai proxy. Lưu ý rằng chúng ta dễ bị tấn công [từ chối dịch vụ (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) ở đây vì kẻ tấn công có thể spam chúng ta bằng các yêu cầu triển khai proxy cho đến khi ETH của chúng ta cạn kiệt. Trên một hệ thống sản xuất, chúng ta có thể sẽ yêu cầu rằng yêu cầu triển khai proxy phải được ký và người ký phải là một khách hàng hiện tại.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Lấy Địa chỉ của chủ sở hữu từ yêu cầu.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[Triển khai hợp đồng](https://viem.sh/docs/contract/deployContract#deploycontract) và [đợi cho đến khi nó được triển khai](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Nếu mọi thứ đều ổn, trả về Địa chỉ proxy cho giao diện người dùng.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Nếu có vấn đề, hãy báo cáo nó.

```js
  app.post("/server/message", async (req, res) => {
```

Đây là mã xử lý các thông điệp của người dùng cho hợp đồng `UserProxy`. Đây là một điểm khác dễ bị tấn công từ chối dịch vụ.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

Lấy dữ liệu yêu cầu và sử dụng nó để gọi `signedAccess` trên proxy.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Báo cáo lại mã băm giao dịch. Điều này cho phép UI hiển thị một URL để người dùng kiểm tra giao dịch.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Một lần nữa, nếu có vấn đề, hãy báo cáo nó.

```js
  // Để Vite xử lý mọi thứ khác
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

Đối với mọi thứ khác, hãy sử dụng Vite, công cụ xử lý việc phục vụ giao diện người dùng cho chúng ta.

### Giao diện người dùng {#user-interface}

[Đây là mã giao diện người dùng](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). Hầu hết mã gần như giống hệt với mã được ghi lại trong [bài viết này](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through), ngoại trừ [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Các phần của [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) tương tự như [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) trong [bài viết này](/developers/tutorials/gasless/#ui-changes). Dưới đây là các phần mới.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Hàm này](https://viem.sh/docs/contract/encodeFunctionData) tạo dữ liệu lệnh gọi cho một lệnh gọi hàm EVM. Điều này là cần thiết để người dùng có thể ký dữ liệu lệnh gọi.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`, đã được giải thích ở trên.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Hợp đồng này](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) chủ yếu là một hợp đồng ERC-20 bình thường, với việc bổ sung một hàm quan trọng, `faucet()`. Hàm này cấp token cho bất kỳ ai yêu cầu chúng cho mục đích thử nghiệm.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

Địa chỉ cho `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Thành phần này xuất ra một Địa chỉ với một liên kết đến hợp đồng trên một trình khám phá khối.

```js
const Token = () => {
    ...
```

Đây là thành phần chính thực hiện hầu hết công việc.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

Số dư token của Địa chỉ người dùng.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

Địa chỉ của một proxy thuộc sở hữu của người dùng.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

Số dư token của proxy.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Trường này được sử dụng khi người dùng thiết lập Địa chỉ proxy theo cách thủ công. Việc có khả năng thiết lập Địa chỉ proxy theo cách thủ công cho phép người dùng sử dụng một proxy hiện có thay vì triển khai một proxy mới mỗi lần (và mất tất cả các token thuộc sở hữu của proxy cũ).

```js
  const [ txHash, setTxHash ] = useState(null)
```

Mã băm của giao dịch cuối cùng, được sử dụng để hiển thị một liên kết đến trình khám phá để người dùng có thể kiểm tra giao dịch đó.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Tất cả các trường này được sử dụng để gửi các lệnh chuyển token đến một hợp đồng ERC-20. Đây có thể là `FaucetToken`, nhưng không bắt buộc. Hàm [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) là một phần của tiêu chuẩn ERC-20.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Đọc hai số dư token mà chúng ta quan tâm, người dùng sở hữu bao nhiêu và proxy sở hữu bao nhiêu.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Để ngăn chặn các cuộc tấn công phát lại (ví dụ: một người bán phát lại một giao dịch mang lại tiền cho họ), chúng ta sử dụng một [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Chúng ta cần biết giá trị hiện tại để thêm nó vào dữ liệu mà chúng ta ký.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

Sử dụng [`useEffect`](https://react.dev/reference/react/useEffect) để cập nhật số dư được hiển thị cho người dùng khi thông tin đọc từ Chuỗi khối thay đổi.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

Mặc định là chuyển token `FaucetToken` đến Tài khoản của chính người dùng. Ở đây chúng ta thiết lập các giá trị này khi chúng ta nhận được chúng từ Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Các trình xử lý sự kiện cho khi các trường văn bản thay đổi.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Yêu cầu máy chủ triển khai một proxy cho người dùng này.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Ký một thông điệp trước khi gửi nó đến máy chủ để gửi đến `UserProxy` trên chuỗi. Điều này được giải thích [tại đây](/developers/tutorials/gasless/#ui-changes). Chúng ta cần ký một thông điệp với cả Địa chỉ đích (Địa chỉ của token mà chúng ta đang gọi) và dữ liệu lệnh gọi để gửi.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Gửi một thông điệp đã ký đến `UserProxy`, nó sẽ xác minh chữ ký và sau đó gửi nó đến `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // cả hai Địa chỉ
          data,           // dữ liệu lệnh gọi để gửi đến mục tiêu
          v, r, s         // chữ ký
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Gửi một yêu cầu đến máy chủ và khi bạn nhận được phản hồi, hãy lấy mã băm giao dịch.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Mô phỏng việc gọi hàm `faucet`. Chúng ta chỉ bật nút vòi nếu điều này thành công.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

Để gọi một hàm thông qua máy chủ và `UserProxy`, chúng ta làm theo ba bước:

1. Tạo dữ liệu lệnh gọi để ký và gửi bằng cách sử dụng [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Ký thông điệp (Địa chỉ đích, dữ liệu lệnh gọi và nonce).

3. Gửi thông điệp đến máy chủ.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

Phần này của thành phần cho phép bạn sử dụng `FaucetToken` trực tiếp từ trình duyệt. Mục đích chính của nó là tạo điều kiện thuận lợi cho việc gỡ lỗi.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Cho phép người dùng triển khai một `UserProxy` mới.

```js
         <br /><br />
         <input type="text" placeholder="Or enter existing proxy address" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Chỉ cho phép người dùng nhấp vào **Set proxy address** khi họ nhập một Địa chỉ hợp pháp. Lưu ý rằng điều này không đảm bảo rằng Địa chỉ được đề cập thực sự là một hợp đồng `UserProxy`. Có thể thêm một kiểm tra như vậy, nhưng nó sẽ chậm hơn nhiều (trải nghiệm người dùng kém hơn) và không cải thiện bảo mật (những kẻ tấn công luôn có thể sử dụng mã của riêng họ cho giao diện người dùng).

```js
         <br /><br />
         { proxyAddr && (
```

Hiển thị phần còn lại _chỉ_ khi có một Địa chỉ proxy hợp pháp.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

Người dùng không cần biết nonce; điều này chỉ dành cho mục đích gỡ lỗi.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Chúng ta không thể mô phỏng một lệnh gọi đến `faucet()` thông qua proxy. Tuy nhiên, ít nhất chúng ta có thể đảm bảo rằng chúng ta có một proxy và proxy đó đã báo cáo một nonce cho chúng ta.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

Cho phép người dùng phát hành các giao dịch chuyển ERC-20.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

Nếu có mã băm giao dịch cuối cùng, hãy hiển thị một liên kết để người dùng có thể xem nó trong một trình khám phá khối.

```js
 
</div>
    </>
  )
}

export {Token}
```

Đây chỉ là mã soạn sẵn (boilerplate) của React.

## Các lỗ hổng {#vulnerabilities}

Máy chủ của chúng ta dễ bị tấn công từ chối dịch vụ. Cuộc tấn công này được giải thích [trong bài viết trước của loạt bài](/developers/tutorials/gasless/#dos-on-server).

Ngoài ra, chúng ta đang khuyến khích hành vi xấu của người dùng. Đây là những gì chúng ta yêu cầu người dùng ký:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_Chúng ta_ biết đây là một giao dịch chuyển ERC-20 hợp pháp cho token, số lượng và Địa chỉ đích mà người dùng muốn chuyển. Nhưng hầu hết người dùng không biết cách diễn giải dữ liệu lệnh gọi và không biết họ đang ký cái gì. Đó là một thiết kế tồi, vì hai lý do:

- Một số người dùng sẽ không sử dụng chúng ta vì họ không tin tưởng vào dữ liệu mà chúng ta yêu cầu họ ký.
- Những người dùng khác _sẽ_ tin tưởng chúng ta và học được rằng họ chỉ nên ký dữ liệu lệnh gọi mà không cần hiểu nó là gì. Điều này có nghĩa là nếu Kẻ tấn công Adam (Adam Attacker) tìm cách chuyển hướng họ đến trang web của hắn, hắn có thể yêu cầu họ ký một giao dịch cấp cho hắn tất cả USDC (hoặc DAI, hoặc bất kỳ ERC-20 nào khác) mà người dùng sở hữu.

Giải pháp là có các hàm riêng biệt trong `UserProxy` cho các hàm thường được sử dụng, chẳng hạn như chuyển. Sau đó, người dùng có thể ký một cái gì đó mà họ hiểu.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Lưu ý:** Mặc dù người dùng có thể sử dụng bất kỳ Ví nào họ muốn, nhưng chúng tôi đặc biệt khuyến nghị các ứng dụng sử dụng EIP-712 khuyến khích họ sử dụng một Ví [hiển thị toàn bộ dữ liệu chữ ký](https://rabby.io/). Một số Ví cắt bớt Địa chỉ, điều này không an toàn. Kẻ tấn công có thể tạo một Địa chỉ có các ký tự bắt đầu và kết thúc giống nhau, nhưng khác nhau ở giữa.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Kết luận {#conclusion}

Ngoài các lỗ hổng ở trên, giải pháp trong hướng dẫn này có một số nhược điểm mà Ethereum có thể giúp chúng ta giải quyết.

- _Khả năng chống kiểm duyệt_. Hiện tại, người dùng có thể sử dụng máy chủ của bạn, một máy chủ cạnh tranh do người khác thiết lập hoặc kết nối trực tiếp với Ethereum, điều này phát sinh chi phí Gas. Sử dụng [ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) cho phép người dùng cung cấp giao dịch của họ cho một nhóm lớn các máy chủ, giảm khả năng các giao dịch của họ bị kiểm duyệt.
- _Tài sản do EOA sở hữu_. Như đã lưu ý ở trên, [EIP-7702](https://eip7702.io/) có thể được sử dụng để quản lý các tài sản đã thuộc sở hữu của một Địa chỉ EOA. Điều này có những khó khăn riêng, nhưng đôi khi nó là cần thiết.

Tôi hy vọng sẽ xuất bản các hướng dẫn về việc thêm các tính năng này trong tương lai gần.

[Xem thêm các tác phẩm của tôi tại đây](https://cryptodocguy.pro/).
