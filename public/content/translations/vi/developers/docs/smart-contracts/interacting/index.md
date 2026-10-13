---
title: Tương tác với hợp đồng thông minh
description: Tìm hiểu cách đọc và ghi vào các hợp đồng thông minh đã được triển khai trên Ethereum.
lang: vi
---

Bạn không phải lúc nào cũng cần viết và triển khai hợp đồng thông minh của riêng mình. Hầu hết thời gian với tư cách là một nhà phát triển, bạn sẽ muốn tương tác với các hợp đồng thông minh mà người khác đã triển khai trên mạng lưới Ethereum.

Trang này đề cập đến hai cách cơ bản để tương tác với một hợp đồng thông minh—**đọc** dữ liệu và **ghi** dữ liệu—cùng với các công cụ bạn cần để thực hiện cả hai.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu rõ:

- [Cách hoạt động của hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Tài khoản Ethereum và cách chúng ký giao dịch](/developers/docs/accounts/)
- [Giao dịch là gì](/developers/docs/transactions/)

## Hai cách để tương tác với một hợp đồng thông minh {#two-ways}

Việc tương tác với một hợp đồng thông minh được chia thành hai loại:

### Đọc từ một hợp đồng {#reading-from-a-contract}

Đọc là một thao tác **miễn phí**, không tạo ra giao dịch và không thay đổi bất kỳ trạng thái nào trên Chuỗi khối.

Khi bạn đọc từ một hợp đồng, bạn chỉ đơn giản là truy vấn dữ liệu đã tồn tại. Ví dụ:

- Kiểm tra số dư token ERC-20
- Đọc giá hiện tại từ một sàn giao dịch phi tập trung
- Lấy thông tin chủ sở hữu của một NFT

Vì việc đọc không sửa đổi trạng thái, chúng không tốn [Gas](/developers/docs/gas/) và có thể được thực hiện bởi bất kỳ ai mà không cần ETH.

### Ghi vào một hợp đồng {#writing-to-a-contract}

Ghi là một thao tác **thay đổi trạng thái**, yêu cầu một giao dịch và tốn Gas.

Khi bạn ghi vào một hợp đồng, bạn đang kích hoạt một hàm làm sửa đổi trạng thái Chuỗi khối. Ví dụ:

- Chuyển token
- Hoán đổi token trên một sàn giao dịch phi tập trung
- Việc đúc một NFT

Việc ghi luôn yêu cầu:

1. Một [Tài khoản thuộc sở hữu bên ngoài (EOA)](/developers/docs/accounts/#types-of-account) có đủ ETH để trả Gas
2. Một giao dịch được ký bằng khóa riêng tư của tài khoản
3. Giao dịch phải được khai thác và đưa vào một khối

Với [trừu tượng hóa tài khoản](/roadmap/account-abstraction/), một tài khoản hợp đồng thông minh cũng có thể khởi tạo các thao tác ghi, và một bên trả phí có thể trả Gas thay cho người dùng—vì vậy một EOA nắm giữ ETH không hoàn toàn bắt buộc.

## Hiểu về ABI của hợp đồng {#understanding-contract-abis}

Để tương tác với một hợp đồng thông minh, ứng dụng của bạn cần biết hợp đồng đó có thể làm *những gì*. Đây là lúc **Giao diện nhị phân ứng dụng (ABI)** phát huy tác dụng.

ABI là một tài liệu JSON mô tả:

- Mọi hàm mà hợp đồng cung cấp (tên, đầu vào, đầu ra)
- Mọi sự kiện mà hợp đồng có thể phát ra
- Cách mã hóa và giải mã dữ liệu khi giao tiếp với hợp đồng

Hãy coi ABI như sổ tay hướng dẫn của hợp đồng—nếu không có nó, ứng dụng của bạn sẽ không biết những hàm nào tồn tại hoặc chúng mong đợi những tham số nào.

### Nơi tìm ABI của một hợp đồng {#where-to-find-abis}

- **Các hợp đồng đã được xác minh trên Etherscan** - [Etherscan](https://etherscan.io) tự động cung cấp ABI cho mã nguồn đã được xác minh
- **Từ nhà phát triển** - nhiều dự án công bố ABI của họ trong tài liệu hoặc các gói npm
- **Tạo từ mã nguồn** - nếu bạn có mã nguồn Solidity, bạn có thể [biên dịch](/developers/docs/smart-contracts/compiling/) nó để tạo ra ABI

## Các công cụ và thư viện để tương tác với hợp đồng {#tools-and-libraries}

Các nhà phát triển thường sử dụng một Thư viện JavaScript/TypeScript để tương tác với các hợp đồng từ một ứng dụng web, backend hoặc tập lệnh.

### Thư viện máy khách (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - Giao diện TypeScript hiện đại, nhẹ nhàng cho Ethereum với độ an toàn kiểu dữ liệu (type safety) hàng đầu
- **[ethers.js](https://docs.ethers.org/)** - Thư viện đã được thử nghiệm thực tế để tương tác với Chuỗi khối Ethereum
- **[Web3.js](https://web3js.org/)** - API JavaScript nguyên bản của Ethereum

### Thư viện backend {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - Cũng hoạt động trong Node.js cho các tập lệnh phía máy chủ và bot
- **[Web3.py](https://web3py.readthedocs.io/)** - Thư viện Python để tương tác với Ethereum
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Thư viện Go chính thức từ đội ngũ Geth

### Ví dụ: đọc số dư token bằng Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// Địa chỉ hợp đồng USDC và ABI (một phần, cho balanceOf)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC có 6 chữ số thập phân
```

### Ví dụ: gửi một giao dịch bằng ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ABI chuyển ERC-20
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // chờ giao dịch được đào
console.log(`Transferred! TX: ${tx.hash}`)
```

## Sự kiện và nhật ký {#events-and-logs}

Các hợp đồng thông minh có thể phát ra các **sự kiện** để báo hiệu rằng có điều gì đó đã xảy ra. Ứng dụng của bạn có thể lắng nghe các sự kiện này để phản hồi theo thời gian thực.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Theo dõi các sự kiện Transfer USDC
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Mô phỏng giao dịch {#simulating}

Trước khi gửi một giao dịch, bạn có thể **mô phỏng** nó để kiểm tra xem nó có thành công hay không—và để xem giá trị trả về của nó—mà không tốn Gas. Điều này rất hữu ích để phát hiện lỗi sớm và xem trước kết quả.

Hầu hết các thư viện máy khách đều hỗ trợ điều này thông qua `eth_call`:

```ts
// Với Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Ví và việc ký {#wallets-and-signing}

Trong một ứng dụng phi tập trung (dapp), ví của người dùng (như MetaMask, Rainbow hoặc WalletConnect) sẽ xử lý việc ký. Bạn không quản lý trực tiếp các khóa riêng tư.

[Các thư viện ví và công cụ kết nối](/developers/docs/apis/javascript/) trừu tượng hóa điều này để bạn có thể tập trung vào việc xây dựng logic ứng dụng của mình.

## Các hướng dẫn liên quan {#related-tutorials}

- [Gọi một hợp đồng thông minh từ JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Gửi giao dịch bằng Web3.js và Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Cách xem NFT trong ví của bạn](/developers/tutorials/how-to-view-nft-in-metamask/)

## Đọc thêm {#further-reading}

- [Tài liệu Viem: Đọc và ghi vào hợp đồng](https://viem.sh/docs/contract/readContract)
- [Tài liệu ethers.js: Hợp đồng](https://docs.ethers.org/v6/api/contract/)
- [Đặc tả ABI của Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ABI là gì? - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Các chủ đề liên quan {#related-topics}

- [Biên dịch hợp đồng thông minh](/developers/docs/smart-contracts/compiling/)
- [Triển khai hợp đồng thông minh](/developers/docs/smart-contracts/deploying/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API Backend](/developers/docs/apis/backend/)