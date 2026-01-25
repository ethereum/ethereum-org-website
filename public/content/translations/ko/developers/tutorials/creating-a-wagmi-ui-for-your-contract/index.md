---
title: "계약용 사용자 인터페이스 구축"
description: TypeScript, React, Vite, Wagmi와 같은 최신 구성 요소를 사용하여 현대적이면서도 최소한의 사용자 인터페이스를 살펴보고, 사용자 인터페이스에 지갑을 연결하고, 스마트 계약을 호출하여 정보를 읽고, 스마트 계약에 트랜잭션을 보내고, 스마트 계약의 이벤트를 모니터링하여 변경 사항을 식별하는 방법을 알아봅니다.
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "프론트엔드" ]
skill: beginner
published: 2023년 11월 1일
lang: ko
sidebarDepth: 3
---

이더리움 생태계에 필요한 기능을 발견했습니다. 이를 구현하기 위해 스마트 계약을 작성했고, 어쩌면 오프체인에서 실행되는 관련 코드를 작성했을 수도 있습니다. 훌륭합니다! 안타깝게도 사용자 인터페이스가 없으면 사용자가 없을 것이고, 마지막으로 웹 사이트를 작성했을 때는 사람들이 전화 접속 모뎀을 사용했으며 JavaScript는 새로운 것이었습니다.

이 글은 바로 당신을 위한 것입니다. 프로그래밍과 JavaScript 및 HTML에 대해 약간 알고 있지만, 사용자 인터페이스 기술은 녹슬고 구식이라고 가정하겠습니다. 요즘에는 어떻게 하는지 볼 수 있도록 간단한 최신 애플리케이션을 함께 살펴보겠습니다.

## 이것이 왜 중요한가요? {#why-important}

이론적으로는 사람들이 [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) 또는 [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract)을 사용하여 계약과 상호 작용하도록 할 수 있습니다. 경험 많은 이더리안에게는 좋을 것입니다. 하지만 저희는 [또 다른 10억 명의 사람들](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion)에게 서비스를 제공하려고 합니다. 훌륭한 사용자 경험 없이는 이런 일이 일어나지 않을 것이며, 친숙한 사용자 인터페이스가 그 큰 부분을 차지합니다.

## Greeter 애플리케이션 {#greeter-app}

최신 UI 작동 방식에 대한 많은 이론이 있으며 [이를 설명하는](https://wagmi.sh/core/getting-started) [많은 좋은 사이트](https://react.dev/learn/thinking-in-react)가 있습니다. 이러한 사이트에서 수행한 훌륭한 작업을 반복하는 대신, 직접 해보면서 배우는 것을 선호하고 직접 다뤄볼 수 있는 애플리케이션으로 시작한다고 가정하겠습니다. 일을 처리하려면 여전히 이론이 필요하며, 저희는 그 이론을 다룰 것입니다. 소스 파일별로 진행하며, 해당 부분에 도달할 때마다 논의할 것입니다.

### 설치 {#installation}

1. 필요한 경우, 지갑에 [Holesky 블록체인](https://chainlist.org/?search=holesky&testnets=true)을 추가하고 [테스트용 ETH를 받으세요](https://www.holeskyfaucet.io/).

2. github 리포지토리를 복제합니다.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. 필요한 패키지를 설치합니다.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. 애플리케이션을 시작합니다.

   ```sh
   pnpm dev
   ```

5. 애플리케이션에 표시된 URL로 이동합니다. 대부분의 경우 [http://localhost:5173/](http://localhost:5173/)입니다.

6. Hardhat의 Greeter를 약간 수정한 버전인 계약 소스 코드를 [블록체인 탐색기](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract)에서 볼 수 있습니다.

### 파일 살펴보기 {#file-walk-through}

#### `index.html` {#index-html}

이 파일은 스크립트 파일을 가져오는 이 줄을 제외하고는 표준 HTML 상용구입니다.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

파일 확장자는 이 파일이 [타입 검사](https://en.wikipedia.org/wiki/Type_system#Type_checking)를 지원하는 JavaScript의 확장인 [TypeScript](https://www.typescriptlang.org/)로 작성된 [React 컴포넌트](https://www.w3schools.com/react/react_components.asp)임을 알려줍니다. TypeScript는 JavaScript로 컴파일되므로 클라이언트 측 실행에 사용할 수 있습니다.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

필요한 라이브러리 코드를 가져옵니다.

```tsx
import { App } from './App'
```

애플리케이션을 구현하는 React 컴포넌트를 가져옵니다(아래 참조).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

루트 React 컴포넌트를 생성합니다. `render`의 매개변수는 HTML과 JavaScript/TypeScript를 모두 사용하는 확장 언어인 [JSX](https://www.w3schools.com/react/react_jsx.asp)입니다. 여기서 느낌표는 TypeScript 컴포넌트에 "`document.getElementById('root')`가 `ReactDOM.createRoot`의 유효한 매개변수가 될지 모르지만, 걱정하지 마세요. 제가 개발자이고 그렇게 될 것이라고 말해주고 있습니다"라고 알려줍니다.

```tsx
  <React.StrictMode>
```

애플리케이션은 [`React.StrictMode` 컴포넌트](https://react.dev/reference/react/StrictMode) 안에 들어갑니다. 이 컴포넌트는 React 라이브러리에 추가 디버깅 검사를 삽입하도록 지시하며, 이는 개발 중에 유용합니다.

```tsx
    <WagmiConfig config={config}>
```

애플리케이션은 또한 [`WagmiConfig` 컴포넌트](https://wagmi.sh/react/api/WagmiProvider) 안에 있습니다. [wagmi(we are going to make it) 라이브러리](https://wagmi.sh/)는 React UI 정의를 이더리움 탈중앙화 애플리케이션 작성을 위한 [viem 라이브러리](https://viem.sh/)와 연결합니다.

```tsx
      <RainbowKitProvider chains={chains}>
```

그리고 마지막으로, [`RainbowKitProvider` 컴포넌트](https://www.rainbowkit.com/)입니다. 이 컴포넌트는 로그인과 지갑과 애플리케이션 간의 통신을 처리합니다.

```tsx
        <App />
```

이제 실제로 UI를 구현하는 애플리케이션용 컴포넌트를 가질 수 있습니다. 컴포넌트 끝에 있는 `/>`는 XML 표준에 따라 이 컴포넌트 내부에 정의가 없다는 것을 React에 알려줍니다.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

물론, 다른 컴포넌트들도 닫아야 합니다.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

이것은 React 컴포넌트를 만드는 표준적인 방법입니다. 렌더링이 필요할 때마다 호출되는 함수를 정의하는 것입니다. 이 함수는 일반적으로 상단에 일부 TypeScript 또는 JavaScript 코드가 있고, 그 뒤에 JSX 코드를 반환하는 `return` 문이 따릅니다.

```tsx
  const { isConnected } = useAccount()
```

여기서는 [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount)를 사용하여 지갑을 통해 블록체인에 연결되어 있는지 여부를 확인합니다.

관례적으로, React에서 `use...`라고 불리는 함수는 일종의 데이터를 반환하는 [훅](https://www.w3schools.com/react/react_hooks.asp)입니다. 이러한 훅을 사용하면 컴포넌트가 데이터를 얻을 뿐만 아니라, 해당 데이터가 변경될 때 컴포넌트가 업데이트된 정보로 다시 렌더링됩니다.

```tsx
  return (
    <>
```

React 컴포넌트의 JSX는 _반드시_ 하나의 컴포넌트를 반환해야 합니다. 여러 컴포넌트가 있고 "자연스럽게" 묶는 것이 없을 때 빈 컴포넌트(`<> ...` </>\`)를 사용하여 단일 컴포넌트로 만듭니다.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

RainbowKit에서 [`ConnectButton` 컴포넌트](https://www.rainbowkit.com/docs/connect-button)를 가져옵니다. 연결되지 않았을 때, 지갑을 설명하고 사용할 지갑을 선택할 수 있는 모달을 여는 `Connect Wallet` 버튼을 제공합니다. 연결되면, 우리가 사용하는 블록체인, 계정 주소, 그리고 ETH 잔액을 표시합니다. 이 디스플레이를 사용하여 네트워크를 전환하거나 연결을 끊을 수 있습니다.

```tsx
      {isConnected && (
```

실제 JavaScript(또는 JavaScript로 컴파일될 TypeScript)를 JSX에 삽입해야 할 때, 우리는 중괄호(`{}`)를 사용합니다.

`a && b` 구문은 [`a ?` b : a`](https://www.w3schools.com/react/react_es6_ternary.asp)의 줄임말입니다. 즉, `a`가 참이면 `b`로 평가되고, 그렇지 않으면 `a`(`false`, `0\` 등일 수 있음)로 평가됩니다. 이는 특정 조건이 충족될 경우에만 컴포넌트를 표시하도록 React에 알리는 쉬운 방법입니다.

이 경우, 사용자가 블록체인에 연결된 경우에만 사용자에게 `Greeter`를 표시하고자 합니다.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

이 파일에는 대부분의 UI 기능이 포함되어 있습니다. 여기에는 일반적으로 여러 파일에 있을 정의가 포함되어 있지만, 이 프로그램은 튜토리얼이므로 성능이나 유지보수의 용이성보다는 처음 이해하기 쉽도록 최적화되어 있습니다.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

이러한 라이브러리 함수를 사용합니다. 다시 말하지만, 이 함수들은 아래에서 사용되는 곳에서 설명됩니다.

```tsx
import { AddressType } from 'abitype'
```

[`abitype` 라이브러리](https://abitype.dev/)는 [`AddressType`](https://abitype.dev/config#addresstype)과 같은 다양한 이더리움 데이터 유형에 대한 TypeScript 정의를 제공합니다.

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter` 계약의 ABI입니다.
계약과 UI를 동시에 개발하는 경우 일반적으로 동일한 리포지토리에 넣고 솔리디티 컴파일러에서 생성된 ABI를 애플리케이션의 파일로 사용합니다. 하지만 계약이 이미 개발되었고 변경되지 않을 것이기 때문에 여기서는 이 작업이 필요하지 않습니다.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript는 강력한 형식의 언어입니다. 이 정의를 사용하여 다른 체인에 배포된 `Greeter` 계약의 주소를 지정합니다. 키는 숫자(chainId)이고 값은 `AddressType`(주소)입니다.

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

지원되는 두 네트워크인 [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code)와 [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code)에서의 계약 주소입니다.

참고: 실제로는 Redstone Holesky에 대한 세 번째 정의가 있으며, 아래에서 설명할 것입니다.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

이 유형은 `ShowObject` 컴포넌트(나중에 설명)의 매개변수로 사용됩니다. 여기에는 객체의 이름과 값이 포함되며, 디버깅 목적으로 표시됩니다.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

어느 시점에서든 인사말이 무엇인지 알 수도 있고(블록체인에서 읽었기 때문에) 모를 수도 있습니다(아직 받지 못했기 때문에). 따라서 문자열이거나 아무것도 아닐 수 있는 유형을 갖는 것이 유용합니다.

##### `Greeter` 컴포넌트 {#greeter-component}

```tsx
const Greeter = () => {
```

마지막으로 컴포넌트를 정의합니다.

```tsx
  const { chain } = useNetwork()
```

사용 중인 체인에 대한 정보는 [wagmi](https://wagmi.sh/react/hooks/useNetwork)에서 제공합니다.
이것은 훅(`use...`)이므로 이 정보가 변경될 때마다 컴포넌트가 다시 그려집니다.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Greeter 계약의 주소는 체인에 따라 다르며(체인 정보가 없거나 해당 계약이 없는 체인에 있는 경우 `undefined`임).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[`useReadContract` 훅](https://wagmi.sh/react/api/hooks/useReadContract)은 계약에서 정보를 읽습니다. UI에서 `readResults`를 확장하면 어떤 정보를 반환하는지 정확히 볼 수 있습니다. 이 경우 인사말이 변경될 때 알림을 받을 수 있도록 계속 확인하기를 원합니다.

**참고:** 인사말이 변경될 때 이를 알기 위해 [`setGreeting` 이벤트](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs)를 수신하고 그런 식으로 업데이트할 수 있습니다. 하지만 더 효율적일 수는 있지만 모든 경우에 적용되지는 않습니다. 사용자가 다른 체인으로 전환하면 인사말도 변경되지만 해당 변경에는 이벤트가 수반되지 않습니다. 코드의 한 부분은 이벤트를 수신하고 다른 부분은 체인 변경을 식별하도록 할 수 있지만, 이는 [`watch` 매개변수](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional)를 설정하는 것보다 더 복잡합니다.

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

React의 [`useState` 훅](https://www.w3schools.com/react/react_usestate.asp)을 사용하면 컴포넌트의 한 렌더링에서 다른 렌더링으로 값이 유지되는 상태 변수를 지정할 수 있습니다. 초기값은 매개변수이며, 이 경우에는 빈 문자열입니다.

`useState` 훅은 두 가지 값을 가진 목록을 반환합니다.

1. 상태 변수의 현재 값입니다.
2. 필요할 때 상태 변수를 수정하는 함수입니다. 이것은 훅이므로 호출될 때마다 컴포넌트가 다시 렌더링됩니다.

이 경우, 사용자가 설정하려는 새 인사말에 대한 상태 변수를 사용하고 있습니다.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

이것은 새 인사말 입력 필드가 변경될 때의 이벤트 핸들러입니다. 유형인 [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)는 이것이 HTML 입력 요소의 값 변경에 대한 핸들러임을 지정합니다. `<HTMLInputElement>` 부분은 이것이 [제네릭 유형](https://www.w3schools.com/typescript/typescript_basic_generics.php)이기 때문에 사용됩니다.

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

이것은 클라이언트 관점에서 블록체인 트랜잭션을 제출하는 프로세스입니다.

1. [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas)를 사용하여 블록체인의 노드에 트랜잭션을 보냅니다.
2. 노드로부터 응답을 기다립니다.
3. 응답을 받으면 사용자에게 지갑을 통해 트랜잭션에 서명하도록 요청합니다. 이 단계는 사용자가 서명하기 전에 트랜잭션의 가스 비용을 보기 때문에 노드 응답을 받은 후에 _반드시_ 발생해야 합니다.
4. 사용자의 승인을 기다립니다.
5. 이번에는 [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction)을 사용하여 트랜잭션을 다시 보냅니다.

2단계는 인지할 수 있는 시간이 걸릴 가능성이 있으며, 이 동안 사용자들은 자신의 명령이 사용자 인터페이스에 의해 실제로 수신되었는지, 왜 아직 트랜잭션에 서명하라는 요청을 받지 못하는지 궁금해할 것입니다. 이는 나쁜 사용자 경험(UX)을 만듭니다.

해결책은 [준비 훅](https://wagmi.sh/react/prepare-hooks)을 사용하는 것입니다. 매개변수가 변경될 때마다 즉시 노드에 `eth_estimateGas` 요청을 보냅니다. 그러면 사용자가 실제로 트랜잭션을 보내고 싶을 때(이 경우 **인사말 업데이트**를 눌러서), 가스 비용이 알려지고 사용자는 즉시 지갑 페이지를 볼 수 있습니다.

```tsx
  return (
```

이제 드디어 반환할 실제 HTML을 만들 수 있습니다.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

`ShowGreeting` 컴포넌트(아래 설명)를 만들지만, 인사말이 블록체인에서 성공적으로 읽혔을 경우에만 만듭니다.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

이것은 사용자가 새 인사말을 설정할 수 있는 입력 텍스트 필드입니다. 사용자가 키를 누를 때마다 `greetingChange`를 호출하고, 이는 `setNewGreeting`을 호출합니다. `setNewGreeting`은 `useState` 훅에서 나오므로 `Greeter` 컴포넌트가 다시 렌더링되게 합니다. 이것은 다음을 의미합니다.

- 새 인사말의 값을 유지하려면 `value`를 지정해야 합니다. 그렇지 않으면 기본값인 빈 문자열로 돌아가기 때문입니다.
- `usePrepareContractWrite`는 `newGreeting`이 변경될 때마다 호출되므로 준비된 트랜잭션에 항상 최신 `newGreeting`이 포함됩니다.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        인사말 업데이트
      </button>
```

`workingTx.write`가 없으면 인사말 업데이트를 보내는 데 필요한 정보를 아직 기다리고 있는 것이므로 버튼이 비활성화됩니다. `workingTx.write` 값이 있으면 그것이 트랜잭션을 보내기 위해 호출할 함수입니다.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

마지막으로, 우리가 무엇을 하고 있는지 쉽게 볼 수 있도록, 우리가 사용하는 세 가지 객체를 보여줍니다.

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` 컴포넌트 {#showgreeting-component}

이 컴포넌트는 다음을 보여줍니다.

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

컴포넌트 함수는 컴포넌트의 모든 속성을 가진 매개변수를 받습니다.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` 컴포넌트 {#showobject-component}

정보 제공을 위해, `ShowObject` 컴포넌트를 사용하여 중요한 객체(인사말을 읽기 위한 `readResults`와 우리가 만드는 트랜잭션을 위한 `preparedTx` 및 `workingTx`)를 보여줍니다.

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

UI를 모든 정보로 어지럽히고 싶지 않으므로, 정보를 보거나 닫을 수 있도록 [`details`](https://www.w3schools.com/tags/tag_details.asp) 태그를 사용합니다.

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

대부분의 필드는 [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp)를 사용하여 표시됩니다.

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

예외는 함수인데, 이들은 [JSON 표준](https://www.json.org/json-en.html)의 일부가 아니므로 별도로 표시해야 합니다.

```tsx
          {funs.map((f, i) =>
```

JSX 내에서 `{` 중괄호 `}` 안의 코드는 JavaScript로 해석됩니다. 그런 다음, `(` 일반 괄호 `)` 안의 코드는 다시 JSX로 해석됩니다.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React는 [DOM 트리](https://www.w3schools.com/js/js_htmldom.asp)의 태그에 고유한 식별자가 있어야 합니다. 이는 동일한 태그의 자식(이 경우, [순서 없는 목록](https://www.w3schools.com/tags/tag_ul.asp))은 다른 `key` 속성이 필요하다는 것을 의미합니다.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

다양한 HTML 태그를 끝냅니다.

##### 최종 `export` {#the-final-export}

```tsx
export { Greeter }
```

`Greeter` 컴포넌트는 애플리케이션에 내보내야 하는 컴포넌트입니다.

#### `src/wagmi.ts` {#wagmi-ts}

마지막으로 WAGMI와 관련된 다양한 정의는 `src/wagmi.ts`에 있습니다. 대부분 변경할 필요가 없는 상용구이므로 여기서는 모든 것을 설명하지 않겠습니다.

여기의 코드는 [github](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts)에 있는 것과 정확히 같지 않습니다. 왜냐하면 기사 뒷부분에서 다른 체인([Redstone Holesky](https://redstone.xyz/docs/network-info))을 추가하기 때문입니다.

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

애플리케이션이 지원하는 블록체인을 가져옵니다. 지원되는 체인 목록은 [viem github](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions)에서 볼 수 있습니다.

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

[WalletConnect](https://walletconnect.com/)를 사용하려면 애플리케이션에 대한 프로젝트 ID가 필요합니다. [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in)에서 얻을 수 있습니다.

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

### 다른 블록체인 추가 {#add-blockchain}

요즘에는 많은 [L2 확장 솔루션](/layer-2/)이 있으며, viem이 아직 지원하지 않는 일부를 지원하고 싶을 수 있습니다. 이를 위해 `src/wagmi.ts`를 수정합니다. 이 지침은 [Redstone Holesky](https://redstone.xyz/docs/network-info)를 추가하는 방법을 설명합니다.

1. viem에서 `defineChain` 유형을 가져옵니다.

   ```ts
   import { defineChain } from 'viem'
   ```

2. 네트워크 정의를 추가합니다.

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

3. `configureChains` 호출에 새 체인을 추가합니다.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. 애플리케이션이 새 네트워크에서 계약 주소를 알고 있는지 확인합니다. 이 경우 `src/components/Greeter.tsx`를 수정합니다.

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

## 결론 {#conclusion}

물론, `Greeter`를 위한 사용자 인터페이스를 제공하는 데는 그다지 관심이 없을 것입니다. 자신만의 계약을 위한 사용자 인터페이스를 만들고 싶을 것입니다. 자신만의 애플리케이션을 만들려면 다음 단계를 실행하세요.

1. wagmi 애플리케이션을 생성하도록 지정합니다.

   ```sh copy
   pnpm create wagmi
   ```

2. 애플리케이션의 이름을 지정합니다.

3. **React** 프레임워크를 선택합니다.

4. **Vite** 변형을 선택합니다.

5. [Rainbow kit를 추가](https://www.rainbowkit.com/docs/installation#manual-setup)할 수 있습니다.

이제 여러분의 계약을 전 세계가 사용할 수 있도록 만들어 보세요.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).

