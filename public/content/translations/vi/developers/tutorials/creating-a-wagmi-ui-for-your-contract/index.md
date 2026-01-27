---
title: "Xây dựng giao diện người dùng cho hợp đồng của bạn"
description: Sử dụng các thành phần hiện đại như TypeScript, React, Vite và Wagmi, chúng ta sẽ xem xét một giao diện người dùng hiện đại nhưng tối giản và tìm hiểu cách kết nối ví với giao diện người dùng, gọi hợp đồng thông minh để đọc thông tin, gửi giao dịch đến hợp đồng thông minh và giám sát các sự kiện từ hợp đồng thông minh để xác định các thay đổi.
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: beginner
published: 2023-11-01
lang: vi
sidebarDepth: 3
---

Bạn đã tìm thấy một tính năng mà chúng tôi cần trong hệ sinh thái Ethereum. Bạn đã viết các hợp đồng thông minh để triển khai nó và thậm chí có thể một số mã liên quan chạy ngoài chuỗi. Điều này thật tuyệt! Thật không may, nếu không có giao diện người dùng, bạn sẽ không có bất kỳ người dùng nào, và lần cuối cùng bạn viết một trang web là khi mọi người dùng modem quay số và JavaScript vẫn còn mới mẻ.

Bài viết này là dành cho bạn. Tôi cho rằng bạn biết lập trình, và có thể một chút về JavaScript và HTML, nhưng kỹ năng về giao diện người dùng của bạn đã lỗi thời. Chúng ta sẽ cùng nhau xem qua một ứng dụng hiện đại đơn giản để bạn có thể thấy cách thực hiện trong thời đại ngày nay.

## Tại sao điều này lại quan trọng {#why-important}

Về lý thuyết, bạn có thể chỉ cần để mọi người sử dụng [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) hoặc [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) để tương tác với các hợp đồng của bạn. Điều đó sẽ rất tuyệt vời đối với những người dùng Ethereum có kinh nghiệm. Nhưng chúng tôi đang cố gắng phục vụ [thêm một tỷ người nữa](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Điều này sẽ không xảy ra nếu không có trải nghiệm người dùng tuyệt vời, và giao diện người dùng thân thiện là một phần quan trọng trong đó.

## Ứng dụng Greeter {#greeter-app}

Có rất nhiều lý thuyết đằng sau cách hoạt động của một giao diện người dùng hiện đại và [rất nhiều trang web hay](https://react.dev/learn/thinking-in-react) [giải thích về nó](https://wagmi.sh/core/getting-started). Thay vì lặp lại những công việc tốt đẹp đã được thực hiện bởi các trang web đó, tôi sẽ cho rằng bạn thích học bằng cách thực hành và bắt đầu với một ứng dụng mà bạn có thể mày mò. Bạn vẫn cần lý thuyết để hoàn thành công việc, và chúng ta sẽ tìm hiểu về nó - chúng ta sẽ chỉ xem qua từng tệp nguồn một và thảo luận về mọi thứ khi chúng ta tiếp cận chúng.

### Cài đặt {#installation}

1. Nếu cần, hãy thêm [chuỗi khối Holesky](https://chainlist.org/?search=holesky&testnets=true) vào ví của bạn và [nhận ETH thử nghiệm](https://www.holeskyfaucet.io/).

2. Sao chép kho lưu trữ github.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Cài đặt các gói cần thiết.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Khởi động ứng dụng.

   ```sh
   pnpm dev
   ```

5. Duyệt đến URL được hiển thị bởi ứng dụng. Trong hầu hết các trường hợp, đó là [http://localhost:5173/](http://localhost:5173/).

6. Bạn có thể xem mã nguồn của hợp đồng, một phiên bản Greeter của Hardhat đã được sửa đổi một chút, [trên một trình khám phá chuỗi khối](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Xem qua tệp {#file-walk-through}

#### `index.html` {#index-html}

Tệp này là bản mẫu HTML tiêu chuẩn ngoại trừ dòng này, dòng này nhập tệp script.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Phần mở rộng tệp cho chúng ta biết rằng tệp này là một [thành phần React](https://www.w3schools.com/react/react_components.asp) được viết bằng [TypeScript](https://www.typescriptlang.org/), một phần mở rộng của JavaScript hỗ trợ [kiểm tra loại](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript được biên dịch thành JavaScript, vì vậy chúng ta có thể sử dụng nó để thực thi phía máy khách.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Nhập mã thư viện chúng ta cần.

```tsx
import { App } from './App'
```

Nhập thành phần React triển khai ứng dụng (xem bên dưới).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Tạo thành phần React gốc. Tham số cho `render` là [JSX](https://www.w3schools.com/react/react_jsx.asp), một ngôn ngữ mở rộng sử dụng cả HTML và JavaScript/TypeScript. Dấu chấm than ở đây báo cho thành phần TypeScript biết: "bạn không biết rằng `document.getElementById('root')` sẽ là một tham số hợp lệ cho `ReactDOM.createRoot`, nhưng đừng lo - tôi là nhà phát triển và tôi nói với bạn rằng nó sẽ có".

```tsx
  <React.StrictMode>
```

Ứng dụng sẽ nằm bên trong [một thành phần `React.StrictMode`](https://react.dev/reference/react/StrictMode). Thành phần này yêu cầu thư viện React chèn thêm các kiểm tra gỡ lỗi, điều này hữu ích trong quá trình phát triển.

```tsx
    <WagmiConfig config={config}>
```

Ứng dụng cũng nằm bên trong [một thành phần `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). Thư viện [wagmi (we are going to make it)](https://wagmi.sh/) kết nối các định nghĩa giao diện người dùng React với [thư viện viem](https://viem.sh/) để viết một ứng dụng phi tập trung Ethereum.

```tsx
      <RainbowKitProvider chains={chains}>
```

Và cuối cùng là [một thành phần `RainbowKitProvider`](https://www.rainbowkit.com/). Thành phần này xử lý việc đăng nhập và giao tiếp giữa ví và ứng dụng.

```tsx
        <App />
```

Bây giờ chúng ta có thể có thành phần cho ứng dụng, thành phần này thực sự triển khai giao diện người dùng. Dấu `/>` ở cuối thành phần báo cho React biết rằng thành phần này không có bất kỳ định nghĩa nào bên trong nó, theo tiêu chuẩn XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Tất nhiên, chúng ta phải đóng các thành phần khác.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Đây là cách tiêu chuẩn để tạo một thành phần React - xác định một hàm được gọi mỗi khi nó cần được hiển thị. Hàm này thường có một số mã TypeScript hoặc JavaScript ở trên cùng, theo sau là một câu lệnh `return` trả về mã JSX.

```tsx
  const { isConnected } = useAccount()
```

Ở đây, chúng ta sử dụng [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) để kiểm tra xem chúng ta có được kết nối với chuỗi khối thông qua ví hay không.

Theo quy ước, trong React, các hàm được gọi là `use...` là các [hook](https://www.w3schools.com/react/react_hooks.asp) trả về một số loại dữ liệu. Khi bạn sử dụng các hook như vậy, thành phần của bạn không chỉ nhận được dữ liệu mà khi dữ liệu đó thay đổi, thành phần sẽ được hiển thị lại với thông tin được cập nhật.

```tsx
  return (
    <>
```

JSX của một thành phần React _phải_ trả về một thành phần. Khi chúng ta có nhiều thành phần và không có gì bao bọc "một cách tự nhiên", chúng ta sử dụng một thành phần trống (`<> ...` </>\`) để biến chúng thành một thành phần duy nhất.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Chúng ta nhận được [thành phần `ConnectButton`](https://www.rainbowkit.com/docs/connect-button) từ RainbowKit. Khi chúng ta không kết nối, nó cung cấp cho chúng ta một nút `Kết nối Ví` mở ra một cửa sổ giải thích về các ví và cho phép bạn chọn ví nào bạn sử dụng. Khi chúng ta được kết nối, nó sẽ hiển thị chuỗi khối chúng ta sử dụng, địa chỉ tài khoản và số dư ETH của chúng ta. Chúng ta có thể sử dụng các màn hình này để chuyển đổi mạng hoặc ngắt kết nối.

```tsx
      {isConnected && (
```

Khi chúng ta cần chèn JavaScript thực tế (hoặc TypeScript sẽ được biên dịch thành JavaScript) vào JSX, chúng ta sử dụng dấu ngoặc (`{}`).

Cú pháp `a && b` là viết tắt của [`a ?` `b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). Tức là, nếu `a` là true, nó sẽ đánh giá thành `b`, ngược lại nó sẽ đánh giá thành `a` (có thể là `false`, `0`, v.v.). Đây là một cách dễ dàng để báo cho React biết rằng một thành phần chỉ nên được hiển thị nếu một điều kiện nhất định được đáp ứng.

Trong trường hợp này, chúng tôi chỉ muốn hiển thị `Greeter` cho người dùng nếu người dùng được kết nối với một chuỗi khối.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Tệp này chứa hầu hết các chức năng của giao diện người dùng. Nó bao gồm các định nghĩa thường sẽ nằm trong nhiều tệp, nhưng vì đây là một hướng dẫn nên chương trình được tối ưu hóa để dễ hiểu trong lần đầu tiên, thay vì hiệu suất hoặc dễ bảo trì.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Chúng tôi sử dụng các hàm thư viện này. Một lần nữa, chúng được giải thích bên dưới nơi chúng được sử dụng.

```tsx
import { AddressType } from 'abitype'
```

[Thư viện `abitype`](https://abitype.dev/) cung cấp cho chúng ta các định nghĩa TypeScript cho các loại dữ liệu Ethereum khác nhau, chẳng hạn như [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

Giao diện nhị phân ứng dụng cho hợp đồng `Greeter`.
Nếu bạn đang phát triển các hợp đồng và giao diện người dùng cùng một lúc, bạn thường sẽ đặt chúng trong cùng một kho lưu trữ và sử dụng giao diện nhị phân ứng dụng được tạo bởi trình biên dịch Solidity làm tệp trong ứng dụng của bạn. Tuy nhiên, điều này không cần thiết ở đây vì hợp đồng đã được phát triển và sẽ không thay đổi.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript được định kiểu mạnh. Chúng tôi sử dụng định nghĩa này để chỉ định địa chỉ mà hợp đồng `Greeter` được triển khai trên các chuỗi khác nhau. Khóa là một số (chainId), và giá trị là một `AddressType` (một địa chỉ).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

Địa chỉ của hợp đồng trên hai mạng được hỗ trợ: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) và [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Lưu ý: Thực tế có một định nghĩa thứ ba, cho Redstone Holesky, nó sẽ được giải thích bên dưới.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Loại này được sử dụng làm tham số cho thành phần `ShowObject` (sẽ được giải thích sau). Nó bao gồm tên của đối tượng và giá trị của nó, được hiển thị cho mục đích gỡ lỗi.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

Tại bất kỳ thời điểm nào, chúng ta có thể biết lời chào là gì (vì chúng ta đọc nó từ chuỗi khối) hoặc không biết (vì chúng ta chưa nhận được). Vì vậy, rất hữu ích khi có một loại có thể là một chuỗi hoặc không có gì.

##### Thành phần `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Cuối cùng, chúng ta đi đến định nghĩa thành phần.

```tsx
  const { chain } = useNetwork()
```

Thông tin về chuỗi chúng ta đang sử dụng, được cung cấp bởi [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Bởi vì đây là một hook (`use...`), mỗi khi thông tin này thay đổi, thành phần sẽ được vẽ lại.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Địa chỉ của hợp đồng Greeter, thay đổi theo chuỗi (và là `undefined` nếu chúng ta không có thông tin chuỗi hoặc chúng ta đang ở trên một chuỗi không có hợp đồng đó).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // Không có đối số
    watch: true
  })
```

Hook [`useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) đọc thông tin từ một hợp đồng. Bạn có thể xem chính xác thông tin mà nó trả về bằng cách mở rộng `readResults` trong giao diện người dùng. Trong trường hợp này, chúng tôi muốn nó tiếp tục tìm kiếm để chúng tôi sẽ được thông báo khi lời chào thay đổi.

**Lưu ý:** Chúng ta có thể lắng nghe các sự kiện [`setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) để biết khi nào lời chào thay đổi và cập nhật theo cách đó. Tuy nhiên, mặc dù nó có thể hiệu quả hơn, nó sẽ không áp dụng trong mọi trường hợp. Khi người dùng chuyển sang một chuỗi khác, lời chào cũng thay đổi, nhưng sự thay đổi đó không đi kèm với một sự kiện. Chúng ta có thể có một phần mã lắng nghe các sự kiện và một phần khác để xác định các thay đổi chuỗi, nhưng điều đó sẽ phức tạp hơn là chỉ cần đặt [tham số `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

Hook [`useState`](https://www.w3schools.com/react/react_usestate.asp) của React cho phép chúng ta chỉ định một biến trạng thái, giá trị của biến này tồn tại từ lần hiển thị này sang lần hiển thị khác của thành phần. Giá trị ban đầu là tham số, trong trường hợp này là chuỗi rỗng.

Hook `useState` trả về một danh sách với hai giá trị:

1. Giá trị hiện tại của biến trạng thái.
2. Một hàm để sửa đổi biến trạng thái khi cần thiết. Vì đây là một hook, mỗi lần nó được gọi, thành phần sẽ được hiển thị lại.

Trong trường hợp này, chúng ta đang sử dụng một biến trạng thái cho lời chào mới mà người dùng muốn đặt.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Đây là trình xử lý sự kiện khi trường nhập lời chào mới thay đổi. Loại [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), chỉ định rằng đây là trình xử lý cho một sự thay đổi giá trị của một phần tử đầu vào HTML. Phần `<HTMLInputElement>` được sử dụng vì đây là một [loại chung](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Đây là quá trình gửi một giao dịch chuỗi khối từ góc độ máy khách:

1. Gửi giao dịch đến một nút trong chuỗi khối bằng cách sử dụng [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Chờ phản hồi từ nút.
3. Khi nhận được phản hồi, yêu cầu người dùng ký giao dịch thông qua ví. Bước này _phải_ xảy ra sau khi nhận được phản hồi của nút vì người dùng được hiển thị chi phí gas của giao dịch trước khi ký.
4. Chờ người dùng phê duyệt.
5. Gửi lại giao dịch, lần này sử dụng [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Bước 2 có thể sẽ mất một khoảng thời gian đáng kể, trong đó người dùng sẽ tự hỏi liệu lệnh của họ có thực sự được giao diện người dùng nhận được không và tại sao họ chưa được yêu cầu ký giao dịch. Điều đó tạo ra trải nghiệm người dùng (UX) tồi tệ.

Giải pháp là sử dụng [prepare hooks](https://wagmi.sh/react/prepare-hooks). Mỗi khi một tham số thay đổi, ngay lập tức gửi cho nút yêu cầu `eth_estimateGas`. Sau đó, khi người dùng thực sự muốn gửi giao dịch (trong trường hợp này bằng cách nhấn **Cập nhật lời chào**), chi phí gas đã được biết và người dùng có thể thấy trang ví ngay lập tức.

```tsx
  return (
```

Bây giờ chúng ta cuối cùng có thể tạo HTML thực tế để trả về.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Tạo một thành phần `ShowGreeting` (được giải thích bên dưới), nhưng chỉ khi lời chào được đọc thành công từ chuỗi khối.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Đây là trường nhập văn bản nơi người dùng có thể đặt lời chào mới. Mỗi khi người dùng nhấn một phím, chúng ta gọi `greetingChange`, hàm này gọi `setNewGreeting`. Vì `setNewGreeting` đến từ hook `useState`, nó khiến thành phần `Greeter` được hiển thị lại. Điều này có nghĩa là:

- Chúng ta cần chỉ định `value` để giữ giá trị của lời chào mới, bởi vì nếu không nó sẽ trở về mặc định, chuỗi rỗng.
- `usePrepareContractWrite` được gọi mỗi khi `newGreeting` thay đổi, có nghĩa là nó sẽ luôn có `newGreeting` mới nhất trong giao dịch đã chuẩn bị.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Cập nhật lời chào
      </button>
```

Nếu không có `workingTx.write`, chúng ta vẫn đang chờ thông tin cần thiết để gửi cập nhật lời chào, vì vậy nút bị vô hiệu hóa. Nếu có giá trị `workingTx.write`, đó là hàm cần gọi để gửi giao dịch.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Cuối cùng, để giúp bạn thấy những gì chúng ta đang làm, hãy hiển thị ba đối tượng mà chúng ta sử dụng:

- `readResults`
- `preparedTx`
- `workingTx`

##### Thành phần `ShowGreeting` {#showgreeting-component}

Thành phần này hiển thị

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Một hàm thành phần nhận một tham số với tất cả các thuộc tính của thành phần.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Thành phần `ShowObject` {#showobject-component}

Vì mục đích thông tin, chúng ta sử dụng thành phần `ShowObject` để hiển thị các đối tượng quan trọng (`readResults` để đọc lời chào và `preparedTx` và `workingTx` cho các giao dịch chúng ta tạo).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Chúng tôi không muốn làm lộn xộn giao diện người dùng với tất cả thông tin, vì vậy để có thể xem hoặc đóng chúng, chúng tôi sử dụng thẻ [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

Hầu hết các trường được hiển thị bằng [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Hàm:
          <ul>
```

Ngoại lệ là các hàm, không phải là một phần của [tiêu chuẩn JSON](https://www.json.org/json-en.html), vì vậy chúng phải được hiển thị riêng biệt.

```tsx
          {funs.map((f, i) =>
```

Trong JSX, mã bên trong dấu ngoặc nhọn `{` `}` được hiểu là JavaScript. Sau đó, mã bên trong dấu ngoặc đơn `(` `)` lại được hiểu là JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React yêu cầu các thẻ trong [Cây DOM](https://www.w3schools.com/js/js_htmldom.asp) phải có các mã định danh riêng biệt. Điều này có nghĩa là các thẻ con của cùng một thẻ (trong trường hợp này là [danh sách không có thứ tự](https://www.w3schools.com/tags/tag_ul.asp)), cần các thuộc tính `key` khác nhau.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Kết thúc các thẻ HTML khác nhau.

##### `export` cuối cùng {#the-final-export}

```tsx
export { Greeter }
```

Thành phần `Greeter` là thành phần chúng ta cần xuất cho ứng dụng.

#### `src/wagmi.ts` {#wagmi-ts}

Cuối cùng, các định nghĩa khác nhau liên quan đến WAGMI nằm trong `src/wagmi.ts`. Tôi sẽ không giải thích mọi thứ ở đây, vì hầu hết chúng là bản mẫu mà bạn không có khả năng cần phải thay đổi.

Mã ở đây không hoàn toàn giống như [trên github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) vì sau này trong bài viết, chúng ta sẽ thêm một chuỗi khác ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Nhập các chuỗi khối mà ứng dụng hỗ trợ. Bạn có thể xem danh sách các chuỗi được hỗ trợ [trong viem github](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Để có thể sử dụng [WalletConnect](https://walletconnect.com/), bạn cần một ID dự án cho ứng dụng của mình. Bạn có thể lấy nó [trên cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Thêm chuỗi khối khác {#add-blockchain}

Ngày nay có rất nhiều [giải pháp mở rộng L2](/layer-2/), và bạn có thể muốn hỗ trợ một số giải pháp mà viem chưa hỗ trợ. Để làm điều đó, bạn sửa đổi `src/wagmi.ts`. Những hướng dẫn này giải thích cách thêm [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Nhập loại `defineChain` từ viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Thêm định nghĩa mạng.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. Thêm chuỗi mới vào lệnh gọi `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Đảm bảo rằng ứng dụng biết địa chỉ cho các hợp đồng của bạn trên mạng mới. Trong trường hợp này, chúng tôi sửa đổi `src/components/Greeter.tsx`:

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## Kết luận {#conclusion}

Tất nhiên, bạn không thực sự quan tâm đến việc cung cấp giao diện người dùng cho `Greeter`. Bạn muốn tạo giao diện người dùng cho các hợp đồng của riêng mình. Để tạo ứng dụng của riêng bạn, hãy chạy các bước sau:

1. Chỉ định tạo một ứng dụng wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Đặt tên cho ứng dụng.

3. Chọn framework **React**.

4. Chọn biến thể **Vite**.

5. Bạn có thể [thêm bộ Rainbow](https://www.rainbowkit.com/docs/installation#manual-setup).

Bây giờ hãy đi và làm cho các hợp đồng của bạn có thể sử dụng được cho cả thế giới.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).

