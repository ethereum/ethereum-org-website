---
title: "Các thành phần máy chủ và tác nhân cho ứng dụng web3"
description: "Sau khi đọc hướng dẫn này, bạn sẽ có thể viết các máy chủ TypeScript lắng nghe các sự kiện trên một chuỗi khối và phản hồi tương ứng bằng các giao dịch của riêng chúng. Điều này sẽ cho phép bạn viết các ứng dụng tập trung (vì máy chủ là một điểm lỗi duy nhất), nhưng có thể tương tác với các thực thể web3. Các kỹ thuật tương tự cũng có thể được sử dụng để viết một tác nhân phản hồi các sự kiện trên chuỗi mà không cần sự can thiệp của con người."

author: Ori Pomerantz
lang: vi
tags: [ "tác nhân", "máy chủ", "ngoài chuỗi" ]
skill: beginner
published: 2024-07-15
---

## Giới thiệu {#introduction}

Trong hầu hết các trường hợp, một ứng dụng phi tập trung sử dụng một máy chủ để phân phối phần mềm, nhưng tất cả các tương tác thực tế xảy ra giữa máy khách (thường là trình duyệt web) và chuỗi khối.

![Tương tác thông thường giữa máy chủ web, máy khách và chuỗi khối](./fig-1.svg)

Tuy nhiên, có một số trường hợp một ứng dụng sẽ được hưởng lợi từ việc có một thành phần máy chủ chạy độc lập. Một máy chủ như vậy sẽ có thể phản hồi các sự kiện và các yêu cầu đến từ các nguồn khác, chẳng hạn như API, bằng cách phát hành các giao dịch.

![Tương tác với sự bổ sung của một máy chủ](./fig-2.svg)

Có một số nhiệm vụ khả thi mà một máy chủ như vậy có thể thực hiện.

- Người nắm giữ trạng thái bí mật. Trong trò chơi, việc không cung cấp tất cả thông tin mà trò chơi biết cho người chơi thường rất hữu ích. Tuy nhiên, _không có bí mật nào trên chuỗi khối_, bất kỳ thông tin nào trên chuỗi khối đều dễ dàng cho bất kỳ ai tìm ra. Do đó, nếu một phần trạng thái của trò chơi cần được giữ bí mật, nó phải được lưu trữ ở nơi khác (và có thể có các tác động của trạng thái đó được xác minh bằng cách sử dụng [bằng chứng không kiến thức](/zero-knowledge-proofs)).

- Oracle tập trung. Nếu rủi ro đủ thấp, một máy chủ bên ngoài đọc một số thông tin trực tuyến và sau đó đăng nó lên chuỗi có thể đủ tốt để sử dụng như một [oracle](/developers/docs/oracles/).

- Tác nhân. Không có gì xảy ra trên chuỗi khối nếu không có giao dịch để kích hoạt nó. Một máy chủ có thể thay mặt người dùng thực hiện các hành động như [kinh doanh chênh lệch giá](/developers/docs/mev/#mev-examples-dex-arbitrage) khi có cơ hội.

## Chương trình mẫu {#sample-program}

Bạn có thể xem một máy chủ mẫu [trên github](https://github.com/qbzzt/20240715-server-component). Máy chủ này lắng nghe các sự kiện đến từ [hợp đồng này](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), một phiên bản sửa đổi của Greeter của Hardhat. Khi lời chào được thay đổi, nó sẽ thay đổi lại.

Để chạy nó:

1. Sao chép kho lưu trữ.

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

5. Đi tới [một trình khám phá khối](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract), và sử dụng một địa chỉ khác với địa chỉ có khóa riêng tư để sửa đổi lời chào. Xem lời chào được tự động sửa đổi lại.

### Nó hoạt động như thế nào? {#how-it-works}

Cách dễ nhất để hiểu cách viết một thành phần máy chủ là xem qua mẫu từng dòng một.

#### `src/app.ts` {#src-app-ts}

Phần lớn chương trình được chứa trong [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Tạo các đối tượng tiên quyết

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Đây là các thực thể [Viem](https://viem.sh/) mà chúng ta cần, các hàm và [kiểu `Address`](https://viem.sh/docs/glossary/types#address). Máy chủ này được viết bằng [TypeScript](https://www.typescriptlang.org/), là một phần mở rộng của JavaScript giúp nó [định kiểu mạnh](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Hàm này](https://viem.sh/docs/accounts/privateKey) cho phép chúng ta tạo thông tin ví, bao gồm địa chỉ, tương ứng với một khóa riêng tư.

```typescript
import { holesky } from "viem/chains"
```

Để sử dụng chuỗi khối trong Viem, bạn cần nhập định nghĩa của nó. Trong trường hợp này, chúng ta muốn kết nối với chuỗi khối thử nghiệm [Holesky](https://github.com/eth-clients/holesky).

```typescript
// Đây là cách chúng tôi thêm các định nghĩa trong .env vào process.env.
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

Để sử dụng một hợp đồng, chúng ta cần địa chỉ và [ABI](/glossary/#abi) của nó. Chúng tôi cung cấp cả hai ở đây.

Trong JavaScript (và do đó là TypeScript), bạn không thể gán một giá trị mới cho một hằng số, nhưng bạn _có thể_ sửa đổi đối tượng được lưu trữ trong đó. Bằng cách sử dụng hậu tố `as const`, chúng ta đang nói với TypeScript rằng chính danh sách đó là hằng số và không thể thay đổi.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Tạo một [máy khách công khai](https://viem.sh/docs/clients/public.html) của Viem. Các máy khách công khai không có khóa riêng tư đính kèm, và do đó không thể gửi các giao dịch. Chúng có thể gọi [các hàm `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), đọc số dư tài khoản, v.v.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Các biến môi trường có sẵn trong [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Tuy nhiên, TypeScript được định kiểu mạnh. Một biến môi trường có thể là bất kỳ chuỗi nào, hoặc trống, vì vậy kiểu của một biến môi trường là `string | undefined`. Tuy nhiên, một khóa được định nghĩa trong Viem là `0x${string}` (`0x` theo sau là một chuỗi). Ở đây chúng ta nói với TypeScript rằng biến môi trường `PRIVATE_KEY` sẽ thuộc loại đó. Nếu không, chúng ta sẽ nhận được một lỗi thời gian chạy.

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

Bây giờ chúng ta đã có tất cả các điều kiện tiên quyết, cuối cùng chúng ta có thể tạo một [thể hiện hợp đồng](https://viem.sh/docs/contract/getContract). Chúng ta sẽ sử dụng thể hiện hợp đồng này để giao tiếp với hợp đồng trên chuỗi.

##### Đọc từ chuỗi khối

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Các hàm hợp đồng chỉ đọc ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) và [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) có sẵn trong `read`. Trong trường hợp này, chúng ta sử dụng nó để truy cập hàm [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), hàm này trả về lời chào.

JavaScript là đơn luồng, vì vậy khi chúng ta khởi động một tiến trình chạy dài, chúng ta cần [chỉ định rằng chúng ta thực hiện nó một cách bất đồng bộ](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Việc gọi chuỗi khối, ngay cả đối với một hoạt động chỉ đọc, đòi hỏi một tương tác hai chiều giữa máy tính và một nút chuỗi khối. Đó là lý do tại sao ở đây chúng ta chỉ định mã cần `await` kết quả.

Nếu bạn quan tâm đến cách hoạt động của nó, bạn có thể [đọc về nó ở đây](https://www.w3schools.com/js/js_promise.asp), nhưng về mặt thực tế, tất cả những gì bạn cần biết là bạn `await` kết quả nếu bạn bắt đầu một hoạt động mất nhiều thời gian, và bất kỳ hàm nào làm điều này đều phải được khai báo là `async`.

##### Phát hành giao dịch

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Đây là hàm bạn gọi để phát hành một giao dịch thay đổi lời chào. Vì đây là một hoạt động dài, hàm được khai báo là `async`. Do cách triển khai nội bộ, bất kỳ hàm `async` nào cũng cần trả về một đối tượng `Promise`. Trong trường hợp này, `Promise<any>` có nghĩa là chúng ta không chỉ định chính xác những gì sẽ được trả về trong `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Trường `write` của thể hiện hợp đồng có tất cả các hàm ghi vào trạng thái chuỗi khối (những hàm yêu cầu gửi một giao dịch), chẳng hạn như [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Các tham số, nếu có, được cung cấp dưới dạng một danh sách, và hàm trả về hàm băm của giao dịch.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Báo cáo hàm băm của giao dịch (như một phần của URL đến trình khám phá khối để xem nó) và trả về nó.

##### Phản hồi sự kiện

```typescript
greeter.watchEvent.SetGreeting({
```

[Hàm `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) cho phép bạn chỉ định một hàm sẽ chạy khi một sự kiện được phát ra. Nếu bạn chỉ quan tâm đến một loại sự kiện (trong trường hợp này là `SetGreeting`), bạn có thể sử dụng cú pháp này để giới hạn mình trong loại sự kiện đó.

```typescript
    onLogs: logs => {
```

Hàm `onLogs` được gọi khi có các mục nhật ký. Trong Ethereum, "nhật ký" và "sự kiện" thường có thể thay thế cho nhau.

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

Các tập lệnh là các hành động ứng dụng khác nhau. Trong trường hợp này, cái duy nhất chúng ta có là `start`, nó biên dịch và sau đó chạy máy chủ. Lệnh `tsc` là một phần của gói `typescript` và biên dịch TypeScript thành JavaScript. Nếu bạn muốn chạy nó theo cách thủ công, nó nằm trong `node_modules/.bin`. Lệnh thứ hai chạy máy chủ.

```json
  "type": "module",
```

Có nhiều loại ứng dụng node JavaScript. Loại `module` cho phép chúng ta có `await` trong mã cấp cao nhất, điều này quan trọng khi bạn thực hiện các hoạt động chậm (và do đó là bất đồng bộ).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Đây là những gói chỉ cần thiết cho việc phát triển. Ở đây chúng ta cần `typescript` và vì chúng ta đang sử dụng nó với Node.js, chúng ta cũng đang nhận được các kiểu cho các biến và đối tượng của node, chẳng hạn như `process`. [Ký hiệu `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) có nghĩa là phiên bản đó hoặc một phiên bản cao hơn không có các thay đổi đột phá. Xem [ở đây](https://semver.org) để biết thêm thông tin về ý nghĩa của các số phiên bản.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Đây là những gói được yêu cầu tại thời gian chạy, khi chạy `dist/app.js`.

## Kết luận {#conclusion}

Máy chủ tập trung mà chúng tôi đã tạo ở đây thực hiện công việc của nó, đó là hoạt động như một tác nhân cho một người dùng. Bất kỳ ai khác muốn dapp tiếp tục hoạt động và sẵn sàng chi trả gas đều có thể chạy một phiên bản mới của máy chủ với địa chỉ của riêng họ.

Tuy nhiên, điều này chỉ hoạt động khi các hành động của máy chủ tập trung có thể được xác minh dễ dàng. Nếu máy chủ tập trung có bất kỳ thông tin trạng thái bí mật nào, hoặc chạy các phép tính khó, nó là một thực thể tập trung mà bạn cần tin tưởng để sử dụng ứng dụng, điều mà các chuỗi khối cố gắng tránh. Trong một bài viết trong tương lai, tôi dự định sẽ chỉ ra cách sử dụng [bằng chứng không kiến thức](/zero-knowledge-proofs) để giải quyết vấn đề này.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).
