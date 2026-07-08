---
title: "컨트랙트를 위한 사용자 인터페이스 구축하기"
description: "TypeScript, React, Vite, Wagmi와 같은 최신 구성 요소를 사용하여 현대적이면서도 최소한의 사용자 인터페이스를 살펴보고, 지갑을 사용자 인터페이스에 연결하는 방법, 스마트 컨트랙트를 호출하여 정보를 읽는 방법, 스마트 컨트랙트에 트랜잭션을 전송하는 방법, 스마트 컨트랙트의 이벤트를 모니터링하여 변경 사항을 식별하는 방법을 알아봅니다."
author: "오리 포메란츠"
tags: ["TypeScript", "React", "Vite", "Wagmi", "프론트엔드"]
skill: beginner
breadcrumb: "WAGMI를 사용한 UI"
published: 2023-11-01
lang: ko
sidebarDepth: 3
---

이더리움 생태계에 필요한 기능을 발견했습니다. 이를 구현하기 위해 스마트 컨트랙트를 작성했고, 오프체인에서 실행되는 관련 코드도 작성했을 수 있습니다. 아주 훌륭합니다! 안타깝게도 사용자 인터페이스가 없다면 사용자를 확보할 수 없을 것이며, 마지막으로 웹사이트를 만들었을 때는 사람들이 전화 접속 모뎀을 사용하고 JavaScript가 새로운 기술이었을지도 모릅니다.

이 글은 바로 여러분을 위한 것입니다. 프로그래밍을 알고 있고 JavaScript와 HTML에 대해서도 조금 알고 있지만, 사용자 인터페이스 기술이 녹슬고 구식이라고 가정하겠습니다. 요즘에는 어떻게 개발하는지 알아보기 위해 간단한 최신 애플리케이션을 함께 살펴보겠습니다.

## 이것이 중요한 이유 {#why-important}

이론적으로는 사람들이 [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract)이나 [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract)을 사용하여 컨트랙트와 상호작용하도록 할 수 있습니다. 이는 경험이 풍부한 이더리움 사용자에게는 훌륭한 방법입니다. 하지만 우리는 [또 다른 10억 명의 사람들](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion)에게 서비스를 제공하고자 합니다. 훌륭한 사용자 경험 없이는 불가능하며, 친숙한 사용자 인터페이스는 그중 큰 부분을 차지합니다.

## Greeter 애플리케이션 {#greeter-app}

최신 UI가 작동하는 방식에 대한 많은 이론이 있으며, [이를 설명하는](https://wagmi.sh/core/getting-started) [좋은 사이트도 많습니다](https://react.dev/learn/thinking-in-react). 이러한 사이트에서 이미 잘 설명한 내용을 반복하는 대신, 여러분이 직접 해보면서 배우는 것을 선호한다고 가정하고 직접 다뤄볼 수 있는 애플리케이션부터 시작하겠습니다. 작업을 완료하려면 여전히 이론이 필요하며, 소스 파일을 하나씩 살펴보면서 필요한 내용을 논의할 것입니다.

### 설치 {#installation}

1. 이 애플리케이션은 [Sepolia](https://sepolia.dev/) 테스트 네트워크를 사용합니다. 필요한 경우 [Sepolia 테스트 ETH를 얻고](/developers/docs/networks/#sepolia) [지갑에 Sepolia를 추가하세요](https://chainlist.org/chain/11155111).

2. GitHub 리포지토리를 클론하고 필요한 패키지를 설치합니다.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. 이 애플리케이션은 성능 제한이 있는 무료 액세스 포인트를 사용합니다. [서비스형 노드(Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) 제공자를 사용하려면 [`src/wagmi.ts`](#wagmi-ts)의 URL을 교체하세요.

4. 애플리케이션을 시작합니다.

   ```sh
   npm run dev
   ```

5. 애플리케이션에 표시된 URL로 이동합니다. 대부분의 경우 [http://localhost:5173/](http://localhost:5173/)입니다.

6. Hardhat의 Greeter를 수정한 버전인 컨트랙트 소스 코드를 [블록체인 탐색기에서](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) 확인할 수 있습니다.

### 파일 살펴보기 {#file-walk-through}

#### `index.html` {#index-html}

이 파일은 스크립트 파일을 가져오는 다음 줄을 제외하고는 표준 HTML 보일러플레이트입니다.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

파일 확장자는 이것이 [타입 검사](https://en.wikipedia.org/wiki/Type_system#Type_checking)를 지원하는 JavaScript의 확장인 [TypeScript](https://www.typescriptlang.org/)로 작성된 [React 컴포넌트](https://www.w3schools.com/react/react_components.asp)임을 나타냅니다. TypeScript는 JavaScript로 컴파일되므로 클라이언트 측에서 사용할 수 있습니다.

이 파일은 관심 있는 분들을 위해 주로 설명되어 있습니다. 일반적으로 이 파일은 수정하지 않으며, [`src/App.tsx`](#app-tsx)와 이 파일이 가져오는 파일들을 수정합니다.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

필요한 라이브러리 코드를 가져옵니다.

```tsx
import App from './App.tsx'
```

애플리케이션을 구현하는 React 컴포넌트를 가져옵니다(아래 참조).

```tsx
import { config } from './wagmi.ts'
```

블록체인 구성을 포함하는 [Wagmi](https://wagmi.sh/) 구성을 가져옵니다.

```tsx
const queryClient = new QueryClient()
```

[React Query](https://tanstack.com/query/latest/docs/framework/react/overview) 캐시 관리자의 새 인스턴스를 생성합니다. 이 객체는 다음을 저장합니다.

- 캐시된 RPC 호출
- 컨트랙트 읽기
- 백그라운드 다시 가져오기 상태

Wagmi v3는 내부적으로 React Query를 사용하므로 캐시 관리자가 필요합니다.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

루트 React 컴포넌트를 생성합니다. `render`의 매개변수는 HTML과 JavaScript/TypeScript를 모두 사용하는 확장 언어인 [JSX](https://www.w3schools.com/react/react_jsx.asp)입니다. 여기서 느낌표는 TypeScript 컴포넌트에게 다음과 같이 알려줍니다. "`document.getElementById('root')`가 `ReactDOM.createRoot`에 유효한 매개변수가 될지 알 수 없겠지만, 걱정하지 마세요. 제가 개발자이고 유효할 것이라고 알려주는 것입니다."

```tsx
  <React.StrictMode>
```

애플리케이션은 [`React.StrictMode` 컴포넌트](https://react.dev/reference/react/StrictMode) 안에 들어갑니다. 이 컴포넌트는 React 라이브러리에 추가 디버깅 검사를 삽입하도록 지시하며, 이는 개발 중에 유용합니다.

```tsx
    <WagmiProvider config={config}>
```

애플리케이션은 또한 [`WagmiProvider` 컴포넌트](https://wagmi.sh/react/api/WagmiProvider) 안에 있습니다. [Wagmi(우리가 만들 예정인) 라이브러리](https://wagmi.sh/)는 이더리움 탈중앙화 애플리케이션(dapp)을 작성하기 위해 React UI 정의를 [Viem 라이브러리](https://viem.sh/)와 연결합니다.

```tsx
      <QueryClientProvider client={queryClient}>
```

마지막으로, 모든 애플리케이션 컴포넌트가 캐시된 쿼리를 사용할 수 있도록 React Query 공급자를 추가합니다.

```tsx
        <App />
```

이제 실제로 UI를 구현하는 애플리케이션용 컴포넌트를 가질 수 있습니다. 컴포넌트 끝에 있는 `/>`는 XML 표준에 따라 이 컴포넌트 내부에 정의가 없음을 React에 알려줍니다.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

물론 다른 컴포넌트들도 닫아주어야 합니다.

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

필요한 라이브러리와 [`Greeter` 컴포넌트](#greeter-tsx)를 가져옵니다.

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia 체인 ID입니다.

```
function App() {
```

이것이 React 컴포넌트를 생성하는 표준 방법입니다. 렌더링이 필요할 때마다 호출되는 함수를 정의합니다. 이 함수는 일반적으로 TypeScript 또는 JavaScript 코드를 포함하며, 그 뒤에 JSX 코드를 반환하는 `return` 문이 옵니다.

```tsx
  const connection = useConnection()
```

[`useConnection`](https://wagmi.sh/react/api/hooks/useConnection)를 사용하여 주소 및 `chainId`와 같은 현재 연결과 관련된 정보를 가져옵니다.

관례상 React에서 `use...`로 시작하는 함수는 [훅(hooks)](https://www.w3schools.com/react/react_hooks.asp)입니다. 이러한 함수는 컴포넌트에 데이터를 반환할 뿐만 아니라, 해당 데이터가 변경될 때 컴포넌트가 다시 렌더링되도록(컴포넌트 함수가 다시 실행되고 그 출력이 HTML의 이전 출력을 대체하도록) 보장합니다.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

[`useConnect`](https://wagmi.sh/react/api/hooks/useConnect)를 사용하여 지갑 연결에 대한 정보를 가져옵니다.

```tsx
  const { disconnect } = useDisconnect()
```

[이 훅](https://wagmi.sh/react/api/hooks/useDisconnect)은 지갑 연결을 해제하는 함수를 제공합니다.

```tsx
  const { switchChain } = useSwitchChain()
```

[이 훅](https://wagmi.sh/react/api/hooks/useSwitchChain)을 사용하면 체인을 전환할 수 있습니다.

```tsx
  useEffect(() => {
```

React 훅인 [`useEffect`](https://react.dev/reference/react/useEffect)를 사용하면 외부 시스템을 동기화하기 위해 변수 값이 변경될 때마다 함수를 실행할 수 있습니다.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

연결되어 있지만 Sepolia 블록체인에 연결되어 있지 않은 경우 Sepolia로 전환합니다.

```tsx
  }, [connection.status, connection.chainId])
```

연결 상태나 연결된 chainId가 변경될 때마다 함수를 다시 실행합니다.

```tsx
  return (
    <>
```

React 컴포넌트의 JSX는 _반드시_ 단일 HTML 컴포넌트를 반환해야 합니다. 여러 컴포넌트가 있고 이를 모두 감쌀 컨테이너가 필요하지 않은 경우, 빈 컴포넌트(`<> ... </>`)를 사용하여 단일 컴포넌트로 결합합니다.

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

현재 연결에 대한 정보를 제공합니다. JSX 내에서 `{<expression>}`는 표현식을 JavaScript로 평가함을 의미합니다.

```tsx
      {connection.status === 'connected' && (
```

구문 `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`"입니다.

이것이 JSX 내부에 if 문을 넣는 표준 방법입니다.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX는 HTML보다 엄격한 XML 표준을 따릅니다. 태그에 해당하는 종료 태그가 없는 경우, 태그를 종료하기 위해 끝에 슬래시(`/`)가 _반드시_ 있어야 합니다.

여기에는 두 개의 이러한 태그가 있습니다. 하나는 `<Greeter />`(실제로 컨트랙트와 통신하는 HTML 코드를 포함함)이고, 다른 하나는 [수평선을 위한 `<hr />`](https://www.w3schools.com/tags/tag_hr.asp)입니다.

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

사용자가 이 버튼을 클릭하면 `disconnect` 함수를 호출합니다.

```tsx
      {connection.status !== 'connected' && (
```

연결되어 있지 _않은_ 경우, 지갑에 연결하는 데 필요한 옵션을 표시합니다.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

`connectors`에는 커넥터 목록이 있습니다. [`map`](https://www.w3schools.com/jsref/jsref_map.asp)를 사용하여 이를 표시할 JSX 버튼 목록으로 변환합니다.

```tsx
            <button
              key={connector.uid}
```

JSX에서는 "형제" 태그(동일한 부모에서 파생된 태그)가 서로 다른 식별자를 가져야 합니다.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

커넥터 버튼입니다.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

추가 정보를 제공합니다. 표현식 구문 `<variable>?.<field>`는 변수가 정의된 경우 해당 필드로 평가하도록 JavaScript에 지시합니다. 변수가 정의되지 않은 경우 이 표현식은 `undefined`로 평가됩니다.

표현식 `error.message`는 오류가 없을 때 예외를 발생시킵니다. `error?.message`를 사용하면 이 문제를 피할 수 있습니다.

#### `src/Greeter.tsx` {#greeter-tsx}

이 파일에는 대부분의 UI 기능이 포함되어 있습니다. 일반적으로 여러 파일에 분산되어 있을 정의들이 포함되어 있지만, 튜토리얼의 목적상 성능이나 유지보수의 용이성보다는 처음 이해하기 쉽도록 프로그램이 최적화되어 있습니다.

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

이러한 라이브러리 함수를 사용합니다. 다시 말하지만, 이 함수들은 사용되는 곳 아래에 설명되어 있습니다.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` 라이브러리](https://abitype.dev/)는 [`AddressType`](https://abitype.dev/config#addresstype)와 같은 다양한 이더리움 데이터 유형에 대한 TypeScript 정의를 제공합니다.

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

`Greeter` 컨트랙트의 ABI입니다.
컨트랙트와 UI를 동시에 개발하는 경우, 일반적으로 동일한 리포지토리에 넣고 Solidity 컴파일러가 생성한 ABI를 애플리케이션의 파일로 사용합니다. 하지만 여기서는 컨트랙트가 이미 개발되었고 변경되지 않으므로 이 작업이 필요하지 않습니다.

[`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)를 사용하여 TypeScript에 이것이 _진짜_ 상수임을 알려줍니다. 일반적으로 JavaScript에서 `const x = {"a": 1}`를 지정하면 `x`의 값을 변경할 수 있으며, 단지 할당만 할 수 없을 뿐입니다.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript는 강력한 타입 언어입니다. 이 정의를 사용하여 여러 체인에 배포된 `Greeter` 컨트랙트의 주소를 지정합니다. 키는 숫자(chainId)이고 값은 `AddressType`(주소)입니다.

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

[Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract)에 있는 컨트랙트의 주소입니다.

##### ``Timer`` 컴포넌트 {#timer-component}

`Timer` 컴포넌트는 주어진 시간 이후의 초 수를 보여줍니다. 이는 사용성 측면에서 중요합니다. 사용자는 무언가를 할 때 즉각적인 반응을 기대합니다. 블록체인에서는 트랜잭션이 블록에 포함될 때까지 아무 일도 일어나지 않기 때문에 이것이 불가능한 경우가 많습니다. 한 가지 해결책은 사용자가 작업을 수행한 지 얼마나 지났는지 보여주어, 사용자가 소요되는 시간이 합리적인지 판단할 수 있게 하는 것입니다.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` 컴포넌트는 마지막 작업 시간인 `lastUpdate`라는 하나의 매개변수를 사용합니다.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

컴포넌트가 올바르게 작동하려면 상태(컴포넌트에 연결된 변수)를 가지고 이를 업데이트해야 합니다. 하지만 이를 읽을 필요는 없으므로 굳이 변수를 만들지 않아도 됩니다.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) 함수를 사용하면 함수가 주기적으로 실행되도록 예약할 수 있습니다. 이 경우에는 매초 실행됩니다. 이 함수는 상태를 업데이트하기 위해 `setNow`를 호출하므로 `Timer` 컴포넌트가 다시 렌더링됩니다. 컴포넌트가 렌더링될 때마다 실행되는 것이 아니라 한 번만 실행되도록 빈 종속성 목록과 함께 [`useEffect`](https://react.dev/reference/react/useEffect) 안에 이를 래핑합니다.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

마지막 업데이트 이후의 초 수를 계산하여 반환합니다.

##### ``Greeter`` 컴포넌트 {#greeter-component}

```tsx
const Greeter = () => {
```

마지막으로 컴포넌트를 정의합니다.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

[Wagmi](https://wagmi.sh/)에서 제공하는, 우리가 사용 중인 체인과 계정에 대한 정보입니다. 이것은 훅(`use...`)이므로 이 정보가 변경될 때마다 컴포넌트가 다시 렌더링됩니다.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Greeter 컨트랙트의 주소입니다. 체인 정보가 없거나 해당 컨트랙트가 없는 체인에 있는 경우 `undefined`가 됩니다.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // 인자 없음
  })
```

[`useReadContract` 훅](https://wagmi.sh/react/api/hooks/useReadContract)은 [컨트랙트](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract)의 `greet` 함수를 호출합니다.

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React의 [`useState` 훅](https://www.w3schools.com/react/react_usestate.asp)을 사용하면 컴포넌트의 한 렌더링에서 다음 렌더링까지 값이 유지되는 상태 변수를 지정할 수 있습니다. 초기값은 매개변수이며, 이 경우에는 빈 문자열입니다.

`useState` 훅은 두 개의 값이 포함된 목록을 반환합니다.

1. 상태 변수의 현재 값.
2. 필요할 때 상태 변수를 수정하는 함수. 이것은 훅이므로 호출될 때마다 컴포넌트가 다시 렌더링됩니다.

이 경우 사용자가 설정하려는 새로운 인사말에 상태 변수를 사용하고 있습니다.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

여러 사용자가 동시에 동일한 컨트랙트를 사용하는 경우 서로의 인사말을 덮어쓸 수 있습니다. 이는 사용자에게 애플리케이션이 오작동하는 것처럼 보일 수 있습니다. 애플리케이션이 마지막으로 인사말을 설정한 사람을 보여준다면, 사용자는 다른 사람이 설정했음을 알게 되고 애플리케이션이 올바르게 작동하고 있음을 이해할 것입니다.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

사용자는 자신의 행동이 즉각적인 효과를 나타내는 것을 보고 싶어 합니다. 하지만 블록체인에서는 그렇지 않습니다. 이러한 상태 변수를 사용하면 최소한 사용자에게 무언가를 표시하여 작업이 진행 중임을 알릴 수 있습니다.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

위의 `readResults`가 데이터를 변경하고 거짓 값(예: `undefined`)으로 설정되지 않은 경우, 현재 인사말을 블록체인에서 읽은 인사말로 업데이트합니다. 또한 상태도 업데이트합니다.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

`SetGreeting` 이벤트를 수신합니다.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>`는 값이 `false`이거나 `undefined`, `0`, 빈 문자열과 같이 거짓으로 평가되는 값인 경우 전체 표현식이 `false`가 됨을 의미합니다. 다른 모든 값에 대해서는 `true`입니다. 이는 값을 부울(boolean)로 변환하는 방법입니다. 왜냐하면 `greeterAddr`가 없으면 이벤트를 수신하고 싶지 않기 때문입니다.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

로그가 보이면(새 이벤트가 발생할 때 나타남) 인사말이 수정되었음을 의미합니다. 이 경우 `currentGreeting` 및 `lastSetterAddress`를 새 값으로 업데이트할 수 있습니다. 또한 상태 표시도 업데이트하고자 합니다.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

상태를 업데이트할 때 두 가지 작업을 수행하고자 합니다.

1. 상태 문자열 업데이트(`status`)
2. 마지막 상태 업데이트 시간(`statusTime`)을 현재로 업데이트.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

이것은 새 인사말 입력 필드의 변경 사항에 대한 이벤트 핸들러입니다. `evt` 매개변수의 타입을 지정할 수도 있지만, TypeScript는 타입 선택적 언어입니다. 이 함수는 HTML 이벤트 핸들러에서 한 번만 호출되므로 굳이 필요하지 않다고 생각합니다.

```tsx
  const { writeContractAsync } = useWriteContract()
```

컨트랙트에 쓰는 함수입니다. [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts)와 유사하지만 더 나은 상태 업데이트를 가능하게 합니다.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

클라이언트 관점에서 블록체인 트랜잭션을 제출하는 과정은 다음과 같습니다.

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas)를 사용하여 블록체인의 노드에 트랜잭션을 전송합니다.
2. 노드의 응답을 기다립니다.
3. 응답을 받으면 사용자에게 지갑을 통해 트랜잭션에 서명하도록 요청합니다. 사용자가 서명하기 전에 트랜잭션의 가스 비용을 확인해야 하므로 이 단계는 _반드시_ 노드 응답을 받은 후에 이루어져야 합니다.
4. 사용자의 승인을 기다립니다.
5. 이번에는 [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction)를 사용하여 트랜잭션을 다시 전송합니다.

2단계는 인지할 수 있을 정도의 시간이 걸릴 가능성이 높으며, 이 시간 동안 사용자는 자신의 명령이 사용자 인터페이스에 제대로 접수되었는지, 왜 아직 트랜잭션 서명 요청이 오지 않는지 궁금해할 수 있습니다. 이는 좋지 않은 사용자 경험(UX)을 초래합니다.

한 가지 해결책은 매개변수가 변경될 때마다 `eth_estimateGas`를 전송하는 것입니다. 그러면 사용자가 실제로 트랜잭션을 전송하고자 할 때(이 경우 **Update greeting**을 누름으로써) 가스 비용을 이미 알고 있으므로 사용자는 즉시 지갑 페이지를 볼 수 있습니다.

```tsx
  return (
```

이제 마침내 반환할 실제 HTML을 생성할 수 있습니다.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

현재 인사말을 표시합니다.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

마지막으로 인사말을 설정한 사람을 알고 있다면 해당 정보를 표시합니다. `Greeter`는 이 정보를 추적하지 않으며, `SetGreeting` 이벤트를 되돌아보고 싶지 않으므로 애플리케이션이 실행되는 동안 인사말이 변경될 때만 이 정보를 가져옵니다.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

사용자가 새 인사말을 설정할 수 있는 입력 텍스트 필드입니다. 사용자가 키를 누를 때마다 `greetingChange`를 호출하고, 이는 다시 `setNewGreeting`를 호출합니다. `setNewGreeting`는 `useState`에서 오기 때문에 `Greeter` 컴포넌트가 다시 렌더링됩니다. 이는 다음을 의미합니다.

- 새 인사말의 값을 유지하려면 `value`를 지정해야 합니다. 그렇지 않으면 기본값인 빈 문자열로 되돌아가기 때문입니다.
- `simulation` 또한 `newGreeting`가 변경될 때마다 업데이트되므로 올바른 인사말로 시뮬레이션을 얻을 수 있습니다. 가스 비용은 콜 데이터의 크기에 따라 달라지고, 이는 문자열의 길이에 따라 달라지므로 이 부분은 중요할 수 있습니다.

```tsx
      <button disabled={!simulation.data}
```

트랜잭션을 전송하는 데 필요한 정보가 있을 때만 버튼을 활성화합니다.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

상태를 업데이트합니다. 이 시점에서 사용자는 지갑에서 확인해야 합니다.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync`는 트랜잭션이 실제로 전송된 후에만 반환됩니다. 이를 통해 트랜잭션이 블록체인에 포함되기 위해 얼마나 기다렸는지 사용자에게 보여줄 수 있습니다.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

상태와 업데이트된 지 얼마나 지났는지 표시합니다.

```
export {Greeter}
```

컴포넌트를 내보냅니다.

#### `src/wagmi.ts` {#wagmi-ts}

마지막으로 Wagmi와 관련된 다양한 정의가 `src/wagmi.ts`에 있습니다. 대부분 변경할 필요가 없는 보일러플레이트이므로 여기서 모든 것을 설명하지는 않겠습니다.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Wagmi 구성에는 이 애플리케이션에서 지원하는 체인이 포함됩니다. [사용 가능한 체인 목록](https://wagmi.sh/core/api/chains)을 확인할 수 있습니다.

```ts
  connectors: [
    injected(),
  ],
```

[이 커넥터](https://wagmi.sh/core/api/connectors/injected)를 사용하면 브라우저에 설치된 지갑과 통신할 수 있습니다.

```ts
  transports: {
    [sepolia.id]: http()
```

Viem과 함께 제공되는 기본 HTTP 엔드포인트로 충분합니다. 다른 URL을 원한다면 `http("https:// hostname ")` 또는 `webSocket("wss:// hostname ")`를 사용할 수 있습니다.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## 다른 블록체인 추가하기 {#add-blockchain}

요즘에는 많은 [L2 확장 솔루션](https://ethereum.org/layer-2/)이 있으며, Viem이 아직 지원하지 않는 일부 솔루션을 지원하고 싶을 수 있습니다. 이를 위해 `src/wagmi.ts`를 수정합니다. 이 지침은 [Optimism Sepolia](https://chainlist.org/chain/11155420)를 추가하는 방법을 설명합니다.

1.  `src/wagmi.ts` 편집

    A. Viem에서 `defineChain` 타입을 가져옵니다.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. 네트워크 정의를 추가합니다. Optimism Sepolia의 경우 [이미 `viem`에 있으므로](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts) 실제로 이 작업을 수행할 필요는 없지만, 이 방법을 통해 `viem`에 없는 블록체인을 추가하는 방법을 배울 수 있습니다.

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

    C. `createConfig` 호출에 새 체인을 추가합니다.

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

2.  `src/App.tsx`를 편집하여 Sepolia로의 자동 전환을 주석 처리합니다. 프로덕션 시스템에서는 지원하는 각 블록체인에 대한 링크가 있는 버튼을 표시하는 것이 좋습니다.

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

3.  `src/Greeter.tsx`를 편집하여 애플리케이션이 새 네트워크에 있는 컨트랙트의 주소를 알 수 있도록 합니다.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  브라우저에서 다음을 수행합니다.

    A. [ChainList](https://chainlist.org/chain/11155420?testnets=true)로 이동하여 표 오른쪽에 있는 버튼 중 하나를 클릭하여 지갑에 체인을 추가합니다.

    B. 애플리케이션에서 **Disconnect**를 클릭한 다음 다시 연결하여 블록체인을 변경합니다. 이를 처리하는 더 좋은 방법이 있지만 애플리케이션을 변경해야 합니다.

## 결론 {#conclusion}

물론 여러분은 `Greeter`를 위한 사용자 인터페이스를 제공하는 데는 큰 관심이 없을 것입니다. 여러분은 자신의 컨트랙트를 위한 사용자 인터페이스를 만들고 싶을 것입니다. 자신만의 애플리케이션을 만들려면 다음 단계를 실행하세요.

1. Wagmi 애플리케이션을 생성하도록 지정합니다.

   ```sh copy
   npm create wagmi
   ```

2. `y`를 입력하여 계속 진행합니다.

3. 애플리케이션의 이름을 지정합니다.

4. **React** 프레임워크를 선택합니다.

5. **Vite** 변형을 선택합니다.

이제 여러분의 컨트랙트를 전 세계에서 사용할 수 있도록 만들어 보세요.

[제 작업물은 여기에서 더 볼 수 있습니다](https://cryptodocguy.pro/).