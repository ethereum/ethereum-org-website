---
title: "Xây dựng giao diện người dùng cho hợp đồng của bạn"
description: "Sử dụng các thành phần hiện đại như TypeScript, React, Vite và Wagmi, chúng ta sẽ xem xét một giao diện người dùng hiện đại nhưng tối giản và tìm hiểu cách kết nối Ví với giao diện người dùng, gọi hợp đồng thông minh để đọc thông tin, gửi giao dịch đến hợp đồng thông minh và theo dõi các sự kiện từ hợp đồng thông minh để xác định các thay đổi."
author: Ori Pomerantz
tags:
  - typescript
  - react
  - vite
  - wagmi
  - giao diện người dùng
skill: beginner
breadcrumb: "Giao diện người dùng với WAGMI"
published: 2023-11-01
lang: vi
sidebarDepth: 3
---

Bạn đã tìm thấy một tính năng mà chúng ta cần trong hệ sinh thái Ethereum. Bạn đã viết các hợp đồng thông minh để triển khai nó, và thậm chí có thể là một số mã liên quan chạy ngoài chuỗi. Điều này thật tuyệt! Thật không may, nếu không có giao diện người dùng, bạn sẽ không có bất kỳ người dùng nào, và lần cuối cùng bạn viết một trang web là khi mọi người còn sử dụng modem quay số và JavaScript vẫn còn mới mẻ.

Bài viết này là dành cho bạn. Tôi giả định rằng bạn biết lập trình, và có thể là một chút JavaScript và HTML, nhưng kỹ năng làm giao diện người dùng của bạn đã bị mai một và lỗi thời. Cùng nhau, chúng ta sẽ xem xét một ứng dụng hiện đại đơn giản để bạn thấy cách mọi thứ được thực hiện ngày nay.

## Tại sao điều này lại quan trọng {#why-important}

Về lý thuyết, bạn có thể chỉ cần yêu cầu mọi người sử dụng [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) hoặc [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) để tương tác với các hợp đồng của bạn. Điều đó thật tuyệt đối với những người dùng Ethereum có kinh nghiệm. Nhưng chúng ta đang cố gắng phục vụ [một tỷ người khác](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Điều này sẽ không xảy ra nếu không có trải nghiệm người dùng tuyệt vời, và một giao diện người dùng thân thiện là một phần lớn trong đó.

## Ứng dụng Greeter {#greeter-app}

Có rất nhiều lý thuyết đằng sau cách hoạt động của giao diện người dùng hiện đại, và [rất nhiều trang web hay](https://react.dev/learn/thinking-in-react) [giải thích về nó](https://wagmi.sh/core/getting-started). Thay vì lặp lại công việc tuyệt vời mà các trang web đó đã làm, tôi sẽ giả định rằng bạn thích học qua thực hành hơn và bắt đầu với một ứng dụng mà bạn có thể thử nghiệm. Bạn vẫn cần lý thuyết để hoàn thành công việc, và chúng ta sẽ đi đến phần đó - chúng ta sẽ chỉ đi qua từng tệp mã nguồn một, và thảo luận về mọi thứ khi chúng ta gặp chúng.

### Cài đặt {#installation}

1. Ứng dụng sử dụng mạng lưới thử nghiệm [Sepolia](https://sepolia.dev/). Nếu cần, hãy [nhận ETH thử nghiệm Sepolia](/developers/docs/networks/#sepolia) và [thêm Sepolia vào Ví của bạn](https://chainlist.org/chain/11155111).

2. Sao chép kho lưu trữ GitHub và cài đặt các gói cần thiết.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. Ứng dụng sử dụng các điểm truy cập miễn phí, vốn có những hạn chế về hiệu suất. Nếu bạn muốn sử dụng một nhà cung cấp [Nút dưới dạng dịch vụ (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/), hãy thay thế các URL trong [`src/wagmi.ts`](#wagmi-ts).

4. Khởi chạy ứng dụng.

   ```sh
   npm run dev
   ```

5. Duyệt đến URL được hiển thị bởi ứng dụng. Trong hầu hết các trường hợp, đó là [http://localhost:5173/](http://localhost:5173/).

6. Bạn có thể xem mã nguồn hợp đồng, một phiên bản sửa đổi của Greeter từ Hardhat, [trên một trình khám phá Chuỗi khối](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Hướng dẫn chi tiết từng tệp {#file-walk-through}

#### `index.html` {#index-html}

Tệp này là một mẫu HTML tiêu chuẩn ngoại trừ dòng này, dùng để nhập tệp tập lệnh.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

Phần mở rộng tệp chỉ ra rằng đây là một [thành phần React](https://www.w3schools.com/react/react_components.asp) được viết bằng [TypeScript](https://www.typescriptlang.org/), một phần mở rộng của JavaScript hỗ trợ [kiểm tra kiểu](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript được biên dịch sang JavaScript, vì vậy chúng ta có thể sử dụng nó ở phía máy khách.

Tệp này chủ yếu được giải thích trong trường hợp bạn quan tâm. Thông thường bạn không sửa đổi tệp này, mà là [`src/App.tsx`](#app-tsx) và các tệp mà nó nhập vào.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Nhập mã Thư viện mà chúng ta cần.

```tsx
import App from './App.tsx'
```

Nhập thành phần React triển khai ứng dụng (xem bên dưới).

```tsx
import { config } from './wagmi.ts'
```

Nhập cấu hình [Wagmi](https://wagmi.sh/), bao gồm cấu hình Chuỗi khối.

```tsx
const queryClient = new QueryClient()
```

Tạo một phiên bản mới của trình quản lý bộ nhớ đệm của [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Đối tượng này sẽ lưu trữ:

- Các lệnh gọi RPC được lưu trong bộ nhớ đệm
- Các lần đọc hợp đồng
- Trạng thái tìm nạp lại trong nền

Chúng ta cần trình quản lý bộ nhớ đệm vì Wagmi v3 sử dụng React Query ở bên trong.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Tạo thành phần React gốc. Tham số cho `render` là [JSX](https://www.w3schools.com/react/react_jsx.asp), một ngôn ngữ mở rộng sử dụng cả HTML và JavaScript/TypeScript. Dấu chấm than ở đây nói với thành phần TypeScript rằng: "bạn không biết rằng `document.getElementById('root')` sẽ là một tham số hợp lệ cho `ReactDOM.createRoot`, nhưng đừng lo - tôi là nhà phát triển và tôi đang nói với bạn rằng nó sẽ hợp lệ".

```tsx
  <React.StrictMode>
```

Ứng dụng sẽ nằm bên trong [một thành phần `React.StrictMode`](https://react.dev/reference/react/StrictMode). Thành phần này yêu cầu Thư viện React chèn thêm các kiểm tra gỡ lỗi, điều này rất hữu ích trong quá trình phát triển.

```tsx
    <WagmiProvider config={config}>
```

Ứng dụng cũng nằm bên trong [một thành phần `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [Thư viện Wagmi (chúng ta sẽ tạo nó)](https://wagmi.sh/) kết nối các định nghĩa giao diện người dùng React với [Thư viện Viem](https://viem.sh/) để viết một ứng dụng phi tập trung (dapp) Ethereum.

```tsx
      <QueryClientProvider client={queryClient}>
```

Và cuối cùng, thêm một nhà cung cấp React Query để bất kỳ thành phần ứng dụng nào cũng có thể sử dụng các truy vấn được lưu trong bộ nhớ đệm.

```tsx
        <App />
```

Bây giờ chúng ta có thể có thành phần cho ứng dụng, nơi thực sự triển khai giao diện người dùng. `/>` ở cuối thành phần cho React biết rằng thành phần này không có bất kỳ định nghĩa nào bên trong nó, theo tiêu chuẩn XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Tất nhiên, chúng ta phải đóng các thành phần khác lại.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

Nhập các Thư viện chúng ta cần, cũng như [thành phần `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

ID Chuỗi của Sepolia.

```
function App() {
```

Đây là cách tiêu chuẩn để tạo một thành phần React: định nghĩa một hàm được gọi bất cứ khi nào nó cần được hiển thị. Hàm này thường chứa mã TypeScript hoặc JavaScript, theo sau là một câu lệnh `return` trả về mã JSX.

```tsx
  const connection = useConnection()
```

Sử dụng [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) để lấy thông tin liên quan đến kết nối hiện tại, chẳng hạn như Địa chỉ và `chainId`.

Theo quy ước, trong React các hàm được gọi là `use...` là các [hook](https://www.w3schools.com/react/react_hooks.asp). Các hàm này không chỉ trả về dữ liệu cho thành phần; chúng còn đảm bảo nó được hiển thị lại (hàm thành phần được thực thi lại và đầu ra của nó thay thế đầu ra trước đó trong HTML) khi dữ liệu đó thay đổi.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Sử dụng [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) để lấy thông tin về kết nối Ví.

```tsx
  const { disconnect } = useDisconnect()
```

[Hook này](https://wagmi.sh/react/api/hooks/useDisconnect) cung cấp cho chúng ta hàm để ngắt kết nối khỏi Ví.

```tsx
  const { switchChain } = useSwitchChain()
```

[Hook này](https://wagmi.sh/react/api/hooks/useSwitchChain) cho phép chúng ta chuyển đổi Chuỗi.

```tsx
  useEffect(() => {
```

Hook React [`useEffect`](https://react.dev/reference/react/useEffect) cho phép bạn chạy một hàm bất cứ khi nào giá trị của một biến thay đổi để đồng bộ hóa một hệ thống bên ngoài.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Nếu chúng ta đã kết nối, nhưng không phải với Chuỗi khối Sepolia, hãy chuyển sang Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Chạy lại hàm mỗi khi trạng thái kết nối hoặc chainId của kết nối thay đổi.

```tsx
  return (
    <>
```

JSX của một thành phần React _phải_ trả về một thành phần HTML duy nhất. Khi chúng ta có nhiều thành phần và không cần một vùng chứa để bọc tất cả chúng lại, chúng ta sử dụng một thành phần trống (`<> ... </>`) để kết hợp chúng thành một thành phần duy nhất.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
 
</div>
```

Cung cấp thông tin về kết nối hiện tại. Trong JSX, `{<expression>}` có nghĩa là đánh giá biểu thức dưới dạng JavaScript.

```tsx
      {connection.status === 'connected' && (
```

Cú pháp `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`".

Đây là cách tiêu chuẩn để đặt các câu lệnh if bên trong JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX tuân theo tiêu chuẩn XML, nghiêm ngặt hơn HTML. Nếu một thẻ không có thẻ đóng tương ứng, nó _phải_ có một dấu gạch chéo (`/`) ở cuối để kết thúc nó.

Ở đây chúng ta có hai thẻ như vậy, `<Greeter />` (thực sự chứa mã HTML giao tiếp với hợp đồng) và [`<hr />` cho một đường ngang](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

Nếu người dùng nhấp vào nút này, hãy gọi hàm `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Nếu chúng ta _chưa_ kết nối, hãy hiển thị các tùy chọn cần thiết để kết nối với Ví.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

Trong `connectors` chúng ta có một danh sách các trình kết nối. Chúng ta sử dụng [`map`](https://www.w3schools.com/jsref/jsref_map.asp) để biến nó thành một danh sách các nút JSX để hiển thị.

```tsx
            <button
              key={connector.uid}
```

Trong JSX, các thẻ "anh em" (các thẻ có cùng một thẻ cha) cần phải có các định danh khác nhau.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Các nút trình kết nối.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

Cung cấp thông tin bổ sung. Cú pháp biểu thức `<variable>?.<field>` cho JavaScript biết rằng nếu biến được định nghĩa, hãy đánh giá trường đó. Nếu biến không được định nghĩa, thì biểu thức này đánh giá thành `undefined`.

Biểu thức `error.message`, khi không có lỗi, sẽ gây ra một ngoại lệ. Sử dụng `error?.message` cho phép chúng ta tránh được vấn đề này.

#### `src/Greeter.tsx` {#greeter-tsx}

Tệp này chứa hầu hết các chức năng của giao diện người dùng. Nó bao gồm các định nghĩa mà thông thường sẽ nằm trong nhiều tệp, nhưng vì đây là một hướng dẫn, chương trình được tối ưu hóa để dễ hiểu trong lần đầu tiên, thay vì hiệu suất hoặc tính dễ bảo trì.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

Chúng ta sử dụng các hàm Thư viện này. Một lần nữa, chúng được giải thích bên dưới ở nơi chúng được sử dụng.

```tsx
import { AddressType } from 'abitype'
```

[Thư viện `abitype`](https://abitype.dev/) cung cấp cho chúng ta các định nghĩa TypeScript cho các kiểu dữ liệu Ethereum khác nhau, chẳng hạn như [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

ABI cho hợp đồng `Greeter`.
Nếu bạn đang phát triển các hợp đồng và giao diện người dùng cùng một lúc, bạn thường sẽ đặt chúng trong cùng một kho lưu trữ và sử dụng ABI được tạo bởi trình biên dịch Solidity dưới dạng một tệp trong ứng dụng của bạn. Tuy nhiên, điều này không cần thiết ở đây vì hợp đồng đã được phát triển và sẽ không thay đổi.

Chúng ta sử dụng [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) để nói với TypeScript rằng đây là một hằng số _thực sự_. Thông thường, khi bạn chỉ định trong JavaScript `const x = {"a": 1}`, bạn có thể thay đổi giá trị trong `x`, bạn chỉ không thể gán lại cho nó.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript được định kiểu mạnh. Chúng ta sử dụng định nghĩa này để chỉ định Địa chỉ nơi hợp đồng `Greeter` được triển khai trên các Chuỗi khác nhau. Khóa là một số (chainId), và giá trị là một `AddressType` (một Địa chỉ).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

Địa chỉ của hợp đồng trên [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Thành phần `Timer` {#timer-component}

Thành phần `Timer` hiển thị số giây kể từ một thời điểm nhất định. Điều này rất quan trọng cho mục đích khả năng sử dụng. Khi người dùng làm điều gì đó, họ mong đợi một phản ứng ngay lập tức. Trong các Chuỗi khối, điều này thường là không thể vì không có gì xảy ra cho đến khi một giao dịch được đưa vào một khối. Một giải pháp là hiển thị thời gian đã trôi qua kể từ khi người dùng thực hiện hành động, để người dùng có thể quyết định xem thời gian yêu cầu có hợp lý hay không.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

Thành phần `Timer` nhận một tham số, `lastUpdate`, là thời gian của hành động cuối cùng.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Chúng ta cần có trạng thái (một biến gắn liền với thành phần) và cập nhật nó để thành phần hoạt động chính xác. Nhưng chúng ta không bao giờ cần đọc nó, vì vậy đừng bận tâm đến việc tạo một biến.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

Hàm [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) cho phép chúng ta lên lịch để một hàm chạy định kỳ. Trong trường hợp này, mỗi giây. Hàm gọi `setNow` để cập nhật trạng thái, vì vậy thành phần `Timer` sẽ được hiển thị lại. Chúng ta bọc nó bên trong [`useEffect`](https://react.dev/reference/react/useEffect) với một danh sách phụ thuộc trống để nó chỉ xảy ra một lần, thay vì mỗi lần thành phần được hiển thị.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Tính số giây kể từ lần cập nhật cuối cùng và trả về nó.

##### Thành phần `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Cuối cùng, chúng ta bắt đầu định nghĩa thành phần.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Thông tin về Chuỗi và tài khoản chúng ta đang sử dụng, được cung cấp bởi [Wagmi](https://wagmi.sh/). Vì đây là một hook (`use...`), thành phần sẽ được hiển thị lại bất cứ khi nào thông tin này thay đổi.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Địa chỉ của hợp đồng Greeter, sẽ là `undefined` nếu chúng ta không có thông tin Chuỗi, hoặc chúng ta đang ở trên một Chuỗi không có hợp đồng đó.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Không có đối số
  })
```

[Hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) gọi hàm `greet` của [hợp đồng](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

[Hook `useState`](https://www.w3schools.com/react/react_usestate.asp) của React cho phép chúng ta chỉ định một biến trạng thái, giá trị của nó được duy trì từ lần hiển thị này sang lần hiển thị khác của thành phần. Giá trị ban đầu là tham số, trong trường hợp này là chuỗi rỗng.

Hook `useState` trả về một danh sách với hai giá trị:

1. Giá trị hiện tại của biến trạng thái.
2. Một hàm để sửa đổi biến trạng thái khi cần. Vì đây là một hook, mỗi khi nó được gọi, thành phần sẽ được hiển thị lại.

Trong trường hợp này, chúng ta đang sử dụng một biến trạng thái cho lời chào mới mà người dùng muốn thiết lập.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Nếu nhiều người dùng đang sử dụng cùng một hợp đồng cùng một lúc, họ có thể ghi đè lên lời chào của nhau. Điều này sẽ khiến người dùng có vẻ như ứng dụng đang bị lỗi. Nếu ứng dụng hiển thị ai là người thiết lập lời chào cuối cùng, người dùng sẽ biết đó là người khác và ứng dụng đang hoạt động chính xác.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Người dùng thích thấy rằng hành động của họ có hiệu lực ngay lập tức. Tuy nhiên, trên một Chuỗi khối, điều này không xảy ra. Các biến trạng thái này cho phép chúng ta ít nhất hiển thị một cái gì đó cho người dùng để họ biết hành động của họ đang được tiến hành.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Nếu `readResults` ở trên thay đổi dữ liệu và nó không được đặt thành giá trị sai (ví dụ: `undefined`), hãy cập nhật lời chào hiện tại thành lời chào được đọc từ Chuỗi khối. Đồng thời, cập nhật trạng thái.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Lắng nghe các sự kiện `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` có nghĩa là nếu giá trị là `false`, hoặc một giá trị được đánh giá là sai, chẳng hạn như `undefined`, `0`, hoặc một chuỗi rỗng, thì toàn bộ biểu thức là `false`. Đối với bất kỳ giá trị nào khác, nó là `true`. Đó là một cách để chuyển đổi các giá trị thành boolean, bởi vì nếu không có `greeterAddr`, chúng ta không muốn lắng nghe các sự kiện.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Khi chúng ta thấy nhật ký (điều này xảy ra khi chúng ta thấy một sự kiện mới), điều đó có nghĩa là lời chào đã được sửa đổi. Trong trường hợp đó, chúng ta có thể cập nhật `currentGreeting` và `lastSetterAddress` thành các giá trị mới. Đồng thời, chúng ta muốn cập nhật hiển thị trạng thái.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Khi chúng ta cập nhật trạng thái, chúng ta muốn làm hai việc:

1. Cập nhật chuỗi trạng thái (`status`)
2. Cập nhật thời gian của lần cập nhật trạng thái cuối cùng (`statusTime`) thành hiện tại.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Đây là trình xử lý sự kiện cho các thay đổi đối với trường nhập lời chào mới. Chúng ta có thể chỉ định kiểu của tham số `evt`, nhưng TypeScript là một ngôn ngữ tùy chọn kiểu. Vì hàm này chỉ được gọi một lần, trong một trình xử lý sự kiện HTML, tôi không nghĩ điều đó là cần thiết.

```tsx
  const { writeContractAsync } = useWriteContract()
```

Hàm để ghi vào một hợp đồng. Nó tương tự như [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), nhưng cho phép cập nhật trạng thái tốt hơn.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Đây là quá trình để gửi một giao dịch Chuỗi khối từ góc độ máy khách:

1. Gửi giao dịch đến một nút trong Chuỗi khối bằng cách sử dụng [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Chờ phản hồi từ nút.
3. Khi nhận được phản hồi, yêu cầu người dùng ký giao dịch thông qua Ví. Bước này _phải_ xảy ra sau khi nhận được phản hồi của nút vì người dùng sẽ được hiển thị chi phí gas của giao dịch trước khi ký nó.
4. Chờ người dùng phê duyệt.
5. Gửi lại giao dịch, lần này sử dụng [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Bước 2 có thể mất một khoảng thời gian đáng kể, trong thời gian đó người dùng có thể tự hỏi liệu lệnh của họ đã được giao diện người dùng nhận hay chưa và tại sao họ vẫn chưa được yêu cầu ký giao dịch. Điều đó tạo ra trải nghiệm người dùng (UX) kém.

Một giải pháp là gửi `eth_estimateGas` mỗi khi một tham số thay đổi. Sau đó, khi người dùng thực sự muốn gửi giao dịch (trong trường hợp này bằng cách nhấn **Cập nhật lời chào**), chi phí gas đã được biết và người dùng có thể thấy trang Ví ngay lập tức.

```tsx
  return (
```

Bây giờ cuối cùng chúng ta có thể tạo HTML thực tế để trả về.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Hiển thị lời chào hiện tại.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Nếu chúng ta biết ai là người thiết lập lời chào cuối cùng, hãy hiển thị thông tin đó. `Greeter` không theo dõi thông tin này và chúng ta không muốn xem lại các sự kiện `SetGreeting`, vì vậy chúng ta chỉ nhận được nó khi lời chào bị thay đổi trong khi chúng ta đang chạy.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Đây là trường văn bản đầu vào nơi người dùng có thể thiết lập một lời chào mới. Mỗi khi người dùng nhấn một phím, chúng ta gọi `greetingChange`, hàm này sẽ gọi `setNewGreeting`. Vì `setNewGreeting` đến từ `useState`, nó khiến thành phần `Greeter` được hiển thị lại. Điều này có nghĩa là:

- Chúng ta cần chỉ định `value` để giữ giá trị của lời chào mới, bởi vì nếu không nó sẽ quay trở lại mặc định, là chuỗi rỗng.
- `simulation` cũng được cập nhật mỗi khi `newGreeting` thay đổi, điều đó có nghĩa là chúng ta sẽ nhận được một mô phỏng với lời chào chính xác. Điều này có thể liên quan vì chi phí gas phụ thuộc vào kích thước của dữ liệu cuộc gọi, vốn phụ thuộc vào độ dài của chuỗi.

```tsx
      <button disabled={!simulation.data}
```

Chỉ bật nút khi chúng ta có thông tin cần thiết để gửi giao dịch.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Cập nhật trạng thái. Tại thời điểm này, người dùng cần xác nhận trong Ví.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` chỉ trả về sau khi giao dịch thực sự được gửi. Điều này cho phép chúng ta hiển thị cho người dùng biết giao dịch đã chờ bao lâu để được đưa vào Chuỗi khối.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Hiển thị trạng thái và thời gian đã trôi qua kể từ khi nó được cập nhật.

```
export {Greeter}
```

Xuất thành phần.

#### `src/wagmi.ts` {#wagmi-ts}

Cuối cùng, các định nghĩa khác nhau liên quan đến Wagmi nằm trong `src/wagmi.ts`. Tôi sẽ không giải thích mọi thứ ở đây, bởi vì hầu hết nó là mã mẫu mà bạn không có khả năng cần phải thay đổi.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Cấu hình Wagmi bao gồm các Chuỗi được ứng dụng này hỗ trợ. Bạn có thể xem [danh sách các Chuỗi có sẵn](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Trình kết nối này](https://wagmi.sh/core/api/connectors/injected) cho phép chúng ta giao tiếp với một Ví được cài đặt trong trình duyệt.

```ts
  transports: {
    [sepolia.id]: http()
```

Điểm cuối HTTP mặc định đi kèm với Viem là đủ tốt. Nếu chúng ta muốn một URL khác, chúng ta có thể sử dụng `http("https:// hostname ")` hoặc `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Thêm một Chuỗi khối khác {#add-blockchain}

Ngày nay có rất nhiều [giải pháp mở rộng quy mô L2](https://ethereum.org/layer-2/), và bạn có thể muốn hỗ trợ một số giải pháp mà Viem chưa hỗ trợ. Để làm điều đó, bạn sửa đổi `src/wagmi.ts`. Các hướng dẫn này giải thích cách thêm [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Chỉnh sửa `src/wagmi.ts`

    A. Nhập kiểu `defineChain` từ Viem.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. Thêm định nghĩa mạng lưới. Bạn không thực sự cần làm điều này cho Optimism Sepolia, [nó đã có trong `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), nhưng bằng cách này bạn học được cách thêm một Chuỗi khối không có trong `viem`.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. Thêm Chuỗi mới vào lệnh gọi `createConfig`.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  Chỉnh sửa `src/App.tsx` để nhận xét (comment out) việc tự động chuyển sang Sepolia. Trên một hệ thống sản xuất, bạn có thể sẽ hiển thị các nút có liên kết đến từng Chuỗi khối mà bạn hỗ trợ.

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  Chỉnh sửa `src/Greeter.tsx` để đảm bảo rằng ứng dụng biết Địa chỉ cho các hợp đồng của bạn trên mạng lưới mới.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  Trong trình duyệt của bạn.

    A. Duyệt đến [ChainList](https://chainlist.org/chain/11155420?testnets=true) và nhấp vào một trong các nút ở bên phải của bảng để thêm Chuỗi vào Ví của bạn.

    B. Trong ứng dụng, **Ngắt kết nối** (Disconnect) và sau đó kết nối lại để thay đổi Chuỗi khối. Có những cách tốt hơn để xử lý việc này, nhưng chúng sẽ yêu cầu thay đổi ứng dụng.

## Kết luận {#conclusion}

Tất nhiên, bạn không thực sự quan tâm đến việc cung cấp giao diện người dùng cho `Greeter`. Bạn muốn tạo một giao diện người dùng cho các hợp đồng của riêng mình. Để tạo ứng dụng của riêng bạn, hãy chạy các bước sau:

1. Chỉ định để tạo một ứng dụng Wagmi.

   ```sh copy
   npm create wagmi
   ```

2. Nhập `y` để tiếp tục.

3. Đặt tên cho ứng dụng.

4. Chọn framework **React**.

5. Chọn biến thể **Vite**.

Bây giờ hãy đi và làm cho các hợp đồng của bạn có thể sử dụng được cho toàn thế giới.

[Xem thêm các tác phẩm của tôi tại đây](https://cryptodocguy.pro/).