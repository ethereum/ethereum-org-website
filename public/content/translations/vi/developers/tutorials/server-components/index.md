---
title: "Các thành phần máy chủ và tác nhân cho ứng dụng web3"
description: "Sau khi đọc hướng dẫn này, bạn sẽ có thể viết các máy chủ TypeScript lắng nghe các sự kiện trên chuỗi khối và phản hồi tương ứng bằng các giao dịch của riêng chúng. Điều này sẽ cho phép bạn viết các ứng dụng tập trung (vì máy chủ là một điểm lỗi), nhưng có thể tương tác với các thực thể web3. Các kỹ thuật tương tự cũng có thể được sử dụng để viết một tác nhân phản hồi các sự kiện trên chuỗi mà không cần sự can thiệp của con người."
author: Ori Pomerantz
lang: vi
tags:
  - tác nhân
  - máy chủ
  - ngoài chuỗi
  - dapps
skill: beginner
breadcrumb: "Các thành phần máy chủ"
published: 2024-07-15
---

## Giới thiệu {#introduction}

Trong hầu hết các trường hợp, một ứng dụng phi tập trung (dapp) sử dụng một máy chủ để phân phối phần mềm, nhưng tất cả các tương tác thực tế đều diễn ra giữa máy khách (thường là trình duyệt web) và chuỗi khối.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

Tuy nhiên, có một số trường hợp mà một ứng dụng sẽ được hưởng lợi từ việc có một thành phần máy chủ chạy độc lập. Một máy chủ như vậy sẽ có thể phản hồi các sự kiện và các yêu cầu đến từ các nguồn khác, chẳng hạn như một API, bằng cách phát hành các giao dịch.

![The interaction with the addition of a server](./fig-2.svg)

Có một số tác vụ khả thi mà một máy chủ như vậy có thể thực hiện.

- Nơi lưu giữ trạng thái bí mật. Trong trò chơi, việc không cung cấp tất cả thông tin mà trò chơi biết cho người chơi thường rất hữu ích. Tuy nhiên, _không có bí mật nào trên chuỗi khối_, bất kỳ thông tin nào nằm trên chuỗi khối đều dễ dàng để bất kỳ ai tìm ra. Do đó, nếu một phần của trạng thái trò chơi cần được giữ bí mật, nó phải được lưu trữ ở nơi khác (và có thể xác minh các tác động của trạng thái đó bằng cách sử dụng [bằng chứng không tri thức](/zero-knowledge-proofs)).

- Nguồn cấp dữ liệu tập trung. Nếu rủi ro đủ thấp, một máy chủ bên ngoài đọc một số thông tin trực tuyến và sau đó đăng nó lên chuỗi có thể đủ tốt để sử dụng như một [nguồn cấp dữ liệu](/developers/docs/oracles/).

- Tác nhân. Không có gì xảy ra trên chuỗi khối mà không có một giao dịch để kích hoạt nó. Một máy chủ có thể thay mặt người dùng thực hiện các hành động như [kinh doanh chênh lệch giá](/developers/docs/mev/#mev-examples-dex-arbitrage) khi có cơ hội.

## Chương trình mẫu {#sample-program}

Bạn có thể xem một máy chủ mẫu [trên GitHub](https://github.com/qbzzt/20240715-server-component). Máy chủ này lắng nghe các sự kiện đến từ [hợp đồng này](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), một phiên bản sửa đổi của Greeter của Hardhat. Khi lời chào bị thay đổi, nó sẽ thay đổi trở lại.

Để chạy nó:

1. Sao chép kho lưu trữ (clone repository).

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Cài đặt các gói cần thiết. Nếu bạn chưa có, hãy [cài đặt Node trước](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Chỉnh sửa `.env` để chỉ định khóa riêng tư của một tài khoản có ETH trên mạng thử nghiệm Holesky. Nếu bạn không có ETH trên Holesky, bạn có thể [sử dụng vòi này](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. Khởi động máy chủ.

   ```sh copy
   npm start
   ```

5. Truy cập [một trình khám phá khối](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) và sử dụng một địa chỉ khác với địa chỉ có khóa riêng tư để sửa đổi lời chào. Bạn sẽ thấy lời chào tự động được sửa đổi trở lại.

### Nó hoạt động như thế nào? {#how-it-works}

Cách dễ nhất để hiểu cách viết một thành phần máy chủ là xem qua mẫu từng dòng một.

#### `src/app.ts` {#src-app-ts}

Phần lớn chương trình được chứa trong [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Tạo các đối tượng tiên quyết {#}

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Đây là các thực thể [Viem](https://viem.sh/) mà chúng ta cần, các hàm và [kiểu `Address`](https://viem.sh/docs/glossary/types#address). Máy chủ này được viết bằng [TypeScript](https://www.typescriptlang.org/), một phần mở rộng của JavaScript giúp nó [được định kiểu mạnh](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Hàm này](https://viem.sh/docs/accounts/privateKey) cho phép chúng ta tạo thông tin ví, bao gồm địa chỉ, tương ứng với một khóa riêng tư.

```typescript
import { holesky } from "viem/chains"
```

Để sử dụng một chuỗi khối trong Viem, bạn cần nhập định nghĩa của nó. Trong trường hợp này, chúng ta muốn kết nối với chuỗi khối thử nghiệm [Holesky](https://github.com/eth-clients/holesky).

```typescript
// Đây là cách chúng ta thêm các định nghĩa trong .env vào process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

Đây là cách chúng ta đọc `.env` vào môi trường. Chúng ta cần nó cho khóa riêng tư (xem phần sau).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Để sử dụng một hợp đồng, chúng ta cần địa chỉ của nó và [ABI](/glossary/#abi) cho nó. Chúng ta cung cấp cả hai ở đây.

Trong JavaScript (và do đó là TypeScript), bạn không thể gán một giá trị mới cho một hằng số, nhưng bạn _có thể_ sửa đổi đối tượng được lưu trữ trong đó. Bằng cách sử dụng hậu tố `as const`, chúng ta đang nói với TypeScript rằng bản thân danh sách là hằng số và không thể bị thay đổi.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Tạo một [máy khách công khai](https://viem.sh/docs/clients/public.html) Viem. Các máy khách công khai không có khóa riêng tư đính kèm và do đó không thể gửi giao dịch. Chúng có thể gọi [các hàm `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), đọc số dư tài khoản, v.v.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Các biến môi trường có sẵn trong [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Tuy nhiên, TypeScript được định kiểu mạnh. Một biến môi trường có thể là bất kỳ chuỗi nào, hoặc trống, vì vậy kiểu cho một biến môi trường là `string | undefined`. Tuy nhiên, một khóa được định nghĩa trong Viem là `0x${string}` (`0x` theo sau là một chuỗi). Ở đây chúng ta nói với TypeScript rằng biến môi trường `PRIVATE_KEY` sẽ thuộc kiểu đó. Nếu không, chúng ta sẽ gặp lỗi thời gian chạy (runtime error).

Hàm [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) sau đó sử dụng khóa riêng tư này để tạo một đối tượng tài khoản đầy đủ.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Tiếp theo, chúng ta sử dụng đối tượng tài khoản để tạo một [máy khách ví](https://viem.sh/docs/clients/wallet). Máy khách này có một khóa riêng tư và một địa chỉ, vì vậy nó có thể được sử dụng để gửi các giao dịch.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Bây giờ chúng ta đã có tất cả các điều kiện tiên quyết, cuối cùng chúng ta có thể tạo một [phiên bản hợp đồng](https://viem.sh/docs/contract/getContract). Chúng ta sẽ sử dụng phiên bản hợp đồng này để giao tiếp với hợp đồng trên chuỗi.

##### Đọc từ chuỗi khối {#}

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Các hàm hợp đồng chỉ đọc ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) và [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) có sẵn trong `read`. Trong trường hợp này, chúng ta sử dụng nó để truy cập hàm [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), hàm này trả về lời chào.

JavaScript là đơn luồng, vì vậy khi chúng ta kích hoạt một quá trình chạy dài, chúng ta cần [chỉ định rằng chúng ta thực hiện nó một cách bất đồng bộ](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Việc gọi chuỗi khối, ngay cả đối với một thao tác chỉ đọc, cũng yêu cầu một chuyến đi khứ hồi giữa máy tính và một nút chuỗi khối. Đó là lý do chúng ta chỉ định ở đây rằng mã cần `await` (chờ) kết quả.

Nếu bạn quan tâm đến cách thức hoạt động của nó, bạn có thể [đọc về nó ở đây](https://www.w3schools.com/js/js_promise.asp), nhưng về mặt thực tế, tất cả những gì bạn cần biết là bạn `await` kết quả nếu bạn bắt đầu một thao tác mất nhiều thời gian và bất kỳ hàm nào thực hiện điều này đều phải được khai báo là `async`.

##### Phát hành giao dịch {#}

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Đây là hàm bạn gọi để phát hành một giao dịch làm thay đổi lời chào. Vì đây là một thao tác dài, hàm được khai báo là `async`. Do việc triển khai nội bộ, bất kỳ hàm `async` nào cũng cần trả về một đối tượng `Promise`. Trong trường hợp này, `Promise<any>` có nghĩa là chúng ta không chỉ định chính xác những gì sẽ được trả về trong `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Trường `write` của phiên bản hợp đồng có tất cả các hàm ghi vào trạng thái chuỗi khối (những hàm yêu cầu gửi một giao dịch), chẳng hạn như [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Các tham số, nếu có, được cung cấp dưới dạng một danh sách và hàm trả về mã băm của giao dịch.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Báo cáo mã băm của giao dịch (như một phần của URL đến trình khám phá khối để xem nó) và trả về nó.

##### Phản hồi các sự kiện {#}

```typescript
greeter.watchEvent.SetGreeting({
```

[Hàm `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) cho phép bạn chỉ định rằng một hàm sẽ chạy khi một sự kiện được phát ra. Nếu bạn chỉ quan tâm đến một loại sự kiện (trong trường hợp này là `SetGreeting`), bạn có thể sử dụng cú pháp này để giới hạn bản thân ở loại sự kiện đó.

```typescript
    onLogs: logs => {
```

Hàm `onLogs` được gọi khi có các mục nhật ký. Trong Ethereum, "nhật ký" và "sự kiện" thường có thể hoán đổi cho nhau.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Có thể có nhiều sự kiện, nhưng để đơn giản, chúng ta chỉ quan tâm đến sự kiện đầu tiên. `logs[0].args` là các đối số của sự kiện, trong trường hợp này là `sender` và `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Nếu người gửi _không phải_ là máy chủ này, hãy sử dụng `setGreeting` để thay đổi lời chào.

#### `package.json` {#package-json}

[Tệp này](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) kiểm soát cấu hình [Node.js](https://nodejs.org/en). Bài viết này chỉ giải thích các định nghĩa quan trọng.

```json
{
  "main": "dist/index.js",
```

Định nghĩa này chỉ định tệp JavaScript nào sẽ chạy.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Các tập lệnh là các hành động ứng dụng khác nhau. Trong trường hợp này, tập lệnh duy nhất chúng ta có là `start`, nó biên dịch và sau đó chạy máy chủ. Lệnh `tsc` là một phần của gói `typescript` và biên dịch TypeScript thành JavaScript. Nếu bạn muốn chạy nó theo cách thủ công, nó nằm trong `node_modules/.bin`. Lệnh thứ hai chạy máy chủ.

```json
  "type": "module",
```

Có nhiều loại ứng dụng nút JavaScript. Kiểu `module` cho phép chúng ta có `await` trong mã cấp cao nhất, điều này rất quan trọng khi bạn thực hiện các thao tác chậm (và do đó là bất đồng bộ).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Đây là các gói chỉ cần thiết cho quá trình phát triển. Ở đây chúng ta cần `typescript` và vì chúng ta đang sử dụng nó với Node.js, chúng ta cũng đang lấy các kiểu cho các biến và đối tượng nút, chẳng hạn như `process`. [Ký hiệu `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) có nghĩa là phiên bản đó hoặc một phiên bản cao hơn không có các thay đổi phá vỡ (breaking changes). Xem [tại đây](https://semver.org) để biết thêm thông tin về ý nghĩa của các số phiên bản.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Đây là các gói được yêu cầu trong thời gian chạy, khi chạy `dist/app.js`.

## Kết luận {#conclusion}

Máy chủ tập trung mà chúng ta đã tạo ở đây thực hiện công việc của nó, đó là hoạt động như một tác nhân cho người dùng. Bất kỳ ai khác muốn dapp tiếp tục hoạt động và sẵn sàng chi trả Gas đều có thể chạy một phiên bản mới của máy chủ với địa chỉ của riêng họ.

Tuy nhiên, điều này chỉ hoạt động khi các hành động của máy chủ tập trung có thể dễ dàng được xác minh. Nếu máy chủ tập trung có bất kỳ thông tin trạng thái bí mật nào, hoặc chạy các tính toán khó, nó là một thực thể tập trung mà bạn cần tin tưởng để sử dụng ứng dụng, đây chính xác là điều mà các chuỗi khối cố gắng tránh. Trong một bài viết trong tương lai, tôi dự định sẽ chỉ ra cách sử dụng [bằng chứng không tri thức](/zero-knowledge-proofs) để giải quyết vấn đề này.

[Xem tại đây để biết thêm về các công việc của tôi](https://cryptodocguy.pro/).