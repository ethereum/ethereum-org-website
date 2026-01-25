---
title: "웹3 앱을 위한 서버 컴포넌트와 에이전트"
description: 이 튜토리얼을 읽고 나면, 블록체인의 이벤트를 수신하고 자체 트랜잭션으로 이에 따라 응답하는 TypeScript 서버를 작성할 수 있게 될 것입니다. 이를 통해 (서버가 단일 실패 지점이기 때문에) 중앙화된 애플리케이션을 작성할 수 있지만, 웹3 엔티티와 상호 작용할 수 있습니다. 동일한 기술을 사용하여 사람의 개입 없이 온체인 이벤트에 응답하는 에이전트를 작성할 수도 있습니다.

author: Ori Pomerantz
lang: ko
tags: [ "에이전트", "서버", "오프체인" ]
skill: beginner
published: 2024-07-15
---

## 소개 {#introduction}

대부분의 경우 탈중앙화 앱은 서버를 사용하여 소프트웨어를 배포하지만, 실제 모든 상호 작용은 클라이언트(일반적으로 웹 브라우저)와 블록체인 사이에서 발생합니다.

![웹 서버, 클라이언트, 블록체인 간의 일반적인 상호 작용](./fig-1.svg)

그러나 애플리케이션이 독립적으로 실행되는 서버 컴포넌트를 가짐으로써 이점을 얻을 수 있는 경우가 있습니다. 이러한 서버는 트랜잭션을 발행함으로써 이벤트 및 API와 같은 다른 소스에서 오는 요청에 응답할 수 있습니다.

![서버 추가 시의 상호 작용](./fig-2.svg)

이러한 서버가 수행할 수 있는 몇 가지 가능한 작업이 있습니다.

- 비밀 상태 보유자. 게임에서는 게임이 알고 있는 모든 정보를 플레이어가 이용할 수 없도록 하는 것이 종종 유용합니다. 하지만, _블록체인에는 비밀이 없습니다_. 블록체인에 있는 모든 정보는 누구나 쉽게 알아낼 수 있습니다. 따라서 게임 상태의 일부를 비밀로 유지하려면 다른 곳에 저장해야 합니다(그리고 해당 상태의 효과를 [영지식 증명](/zero-knowledge-proofs)을 사용하여 검증해야 할 수도 있습니다).

- 중앙화된 오라클. 위험 부담이 충분히 낮은 경우, 온라인에서 정보를 읽어 체인에 게시하는 외부 서버를 [오라클](/developers/docs/oracles/)로 사용하기에 충분할 수 있습니다.

- 에이전트. 블록체인에서는 그것을 활성화시키는 트랜잭션 없이는 아무 일도 일어나지 않습니다. 서버는 기회가 생겼을 때 사용자를 대신하여 [차익 거래](/developers/docs/mev/#mev-examples-dex-arbitrage)와 같은 작업을 수행할 수 있습니다.

## 샘플 프로그램 {#sample-program}

샘플 서버는 [github](https://github.com/qbzzt/20240715-server-component)에서 볼 수 있습니다. 이 서버는 Hardhat의 Greeter를 수정한 버전인 [이 계약](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code)에서 오는 이벤트를 수신합니다. 인사가 변경되면, 서버가 이를 다시 원래대로 변경합니다.

실행 방법:

1. 리포지토리를 복제하세요.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. 필요한 패키지를 설치합니다. 아직 설치하지 않았다면, [Node를 먼저 설치하세요](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Holesky 테스트넷에 ETH가 있는 계정의 개인 키를 지정하려면 `.env`를 편집하세요. Holesky에 ETH가 없다면 [이 파우셋을 사용하세요](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <여기에 개인 키를 입력하세요>
   ```

4. 서버를 시작하세요.

   ```sh copy
   npm start
   ```

5. [블록 탐색기](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract)로 이동하여 개인 키가 있는 주소와 다른 주소를 사용하여 인사를 수정하세요. 인사가 자동으로 다시 수정되는 것을 확인하세요.

### 어떻게 작동하나요? {#how-it-works}

서버 컴포넌트를 작성하는 방법을 이해하는 가장 쉬운 방법은 샘플을 한 줄씩 살펴보는 것입니다.

#### `src/app.ts` {#src-app-ts}

프로그램의 대부분은 [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts)에 포함되어 있습니다.

##### 필수 객체 생성

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

이는 우리가 필요로 하는 [Viem](https://viem.sh/) 엔티티, 함수 및 [`Address` 유형](https://viem.sh/docs/glossary/types#address)입니다. 이 서버는 JavaScript를 [강력한 형식](https://en.wikipedia.org/wiki/Strong_and_weak_typing)으로 만드는 확장 기능인 [TypeScript](https://www.typescriptlang.org/)로 작성되었습니다.

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[이 함수](https://viem.sh/docs/accounts/privateKey)를 사용하면 개인 키에 해당하는 주소를 포함한 지갑 정보를 생성할 수 있습니다.

```typescript
import { holesky } from "viem/chains"
```

Viem에서 블록체인을 사용하려면 해당 정의를 가져와야 합니다. 이 경우 [Holesky](https://github.com/eth-clients/holesky) 테스트 블록체인에 연결하려고 합니다.

```typescript
// .env의 정의를 process.env에 추가하는 방법입니다.
import * as dotenv from "dotenv"
dotenv.config()
```

이것이 `.env`를 환경으로 읽어오는 방법입니다. 이는 개인 키에 필요합니다(나중에 설명).

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

계약을 사용하려면 해당 주소와 [ABI](/glossary/#abi)가 필요합니다. 여기에서는 둘 다 제공합니다.

JavaScript(및 TypeScript)에서는 상수에 새 값을 할당할 수는 없지만, 그 안에 저장된 객체는 수정할 _수_ 있습니다. `as const` 접미사를 사용하여 목록 자체가 상수이며 변경될 수 없음을 TypeScript에 알립니다.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Viem [공개 클라이언트](https://viem.sh/docs/clients/public.html)를 생성합니다. 공개 클라이언트에는 연결된 개인 키가 없으므로 트랜잭션을 보낼 수 없습니다. [`view` 함수](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm)를 호출하고, 계정 잔액을 읽는 등의 작업을 할 수 있습니다.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

환경 변수는 [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env)에서 사용할 수 있습니다. 하지만 TypeScript는 강력한 형식을 사용합니다. 환경 변수는 모든 문자열이거나 비어 있을 수 있으므로 환경 변수의 유형은 `string | undefined`입니다. 하지만 Viem에서 키는 `0x${string}`(`0x` 뒤에 문자열이 옴)으로 정의됩니다. 여기서는 `PRIVATE_KEY` 환경 변수가 해당 유형이 될 것이라고 TypeScript에 알립니다. 그렇지 않으면 런타임 오류가 발생합니다.

그런 다음 [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) 함수는 이 개인 키를 사용하여 전체 계정 객체를 생성합니다.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

다음으로 계정 객체를 사용하여 [지갑 클라이언트](https://viem.sh/docs/clients/wallet)를 만듭니다. 이 클라이언트에는 개인 키와 주소가 있으므로 트랜잭션을 보내는 데 사용할 수 있습니다.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

이제 모든 전제 조건이 갖추어졌으므로 마침내 [계약 인스턴스](https://viem.sh/docs/contract/getContract)를 만들 수 있습니다. 이 계약 인스턴스를 사용하여 온체인 계약과 통신합니다.

##### 블록체인에서 읽기

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

읽기 전용인 계약 함수들([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) 및 [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm))은 `read`에서 사용할 수 있습니다. 이 경우, 인사를 반환하는 [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) 함수에 액세스하는 데 사용됩니다.

JavaScript는 단일 스레드이므로, 장기 실행 프로세스를 시작할 때는 [비동기적으로 수행하도록 지정](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)해야 합니다. 읽기 전용 작업이라 할지라도 블록체인을 호출하려면 컴퓨터와 블록체인 노드 간의 왕복 통신이 필요합니다. 이것이 코드가 결과를 `await`해야 한다고 명시하는 이유입니다.

이것이 어떻게 작동하는지 궁금하다면 [여기에서 읽어볼 수 있습니다](https://www.w3schools.com/js/js_promise.asp). 하지만 실질적으로 알아야 할 것은, 오랜 시간이 걸리는 작업을 시작하면 결과를 `await`해야 한다는 것과 이 작업을 수행하는 모든 함수는 `async`로 선언되어야 한다는 것뿐입니다.

##### 트랜잭션 발행

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

이 함수는 인사를 변경하는 트랜잭션을 발행하기 위해 호출하는 함수입니다. 이는 긴 작업이므로 함수는 `async`로 선언됩니다. 내부 구현으로 인해, 모든 `async` 함수는 `Promise` 객체를 반환해야 합니다. 이 경우 `Promise<any>`는 `Promise`에서 정확히 무엇이 반환될지 지정하지 않음을 의미합니다.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

계약 인스턴스의 `write` 필드에는 블록체인 상태에 쓰는(트랜잭션을 보내야 하는) 모든 함수(예: [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862))가 있습니다. 매개변수가 있는 경우 목록으로 제공되며, 함수는 트랜잭션의 해시를 반환합니다.

```typescript
    console.log(`수정 작업 중, https://eth-holesky.blockscout.com/tx/${txHash} 참조`)

    return txHash
}
```

트랜잭션 해시를 (블록 탐색기에서 볼 수 있는 URL의 일부로) 보고하고 반환합니다.

##### 이벤트에 응답하기

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` 함수](https://viem.sh/docs/actions/public/watchEvent)를 사용하면 이벤트가 발생했을 때 실행될 함수를 지정할 수 있습니다. 한 가지 유형의 이벤트(이 경우 `SetGreeting`)에만 관심이 있는 경우 이 구문을 사용하여 해당 이벤트 유형으로 제한할 수 있습니다.

```typescript
    onLogs: logs => {
```

`onLogs` 함수는 로그 항목이 있을 때 호출됩니다. 이더리움에서 '로그'와 '이벤트'는 보통 서로 바꾸어 사용할 수 있습니다.

```typescript
console.log(
  `주소 ${logs[0].args.sender}가 인사를 ${logs[0].args.greeting}(으)로 변경했습니다`
)
```

여러 이벤트가 있을 수 있지만, 단순화를 위해 첫 번째 이벤트에만 신경 씁니다. `logs[0].args`는 이벤트의 인자이며, 이 경우에는 `sender`와 `greeting`입니다.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address}가 Hello!로 할 것을 고집합니다`)
    }
})
```

보낸 사람이 이 서버가 _아닌_ 경우, `setGreeting`을 사용하여 인사를 변경합니다.

#### `package.json` {#package-json}

[이 파일](https://github.com/qbzzt/20240715-server-component/blob/main/package.json)은 [Node.js](https://nodejs.org/en) 구성을 제어합니다. 이 문서에서는 중요한 정의만 설명합니다.

```json
{
  "main": "dist/index.js",
```

이 정의는 실행할 JavaScript 파일을 지정합니다.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

스크립트는 다양한 애플리케이션 작업입니다. 이 경우, 유일한 스크립트는 `start`이며, 이는 서버를 컴파일한 다음 실행합니다. `tsc` 명령어는 `typescript` 패키지의 일부이며 TypeScript를 JavaScript로 컴파일합니다. 수동으로 실행하려면 `node_modules/.bin`에 있습니다. 두 번째 명령어는 서버를 실행합니다.

```json
  "type": "module",
```

JavaScript 노드 애플리케이션에는 여러 유형이 있습니다. `module` 유형을 사용하면 최상위 코드에 `await`을 사용할 수 있으며, 이는 느린(그리고 비동기적인) 작업을 수행할 때 중요합니다.

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

이 패키지들은 개발에만 필요합니다. 여기서는 `typescript`가 필요하며, Node.js와 함께 사용하므로 `process`와 같은 노드 변수 및 객체에 대한 유형도 가져옵니다. [`^<버전>` 표기법](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004)은 해당 버전 또는 브레이킹 체인지가 없는 상위 버전을 의미합니다. 버전 번호의 의미에 대한 자세한 내용은 [여기](https://semver.org)를 참조하세요.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

이는 `dist/app.js`를 실행할 때 런타임에 필요한 패키지입니다.

## 결론 {#conclusion}

여기서 우리가 만든 중앙화 서버는 사용자를 위한 에이전트 역할을 하는 제 역할을 합니다. 탈중앙화앱이 계속 작동하기를 원하고 가스를 기꺼이 지불하려는 다른 사람은 누구나 자신의 주소로 서버의 새 인스턴스를 실행할 수 있습니다.

하지만 이는 중앙화된 서버의 조치를 쉽게 확인할 수 있는 경우에만 작동합니다. 중앙화된 서버가 비밀 상태 정보를 가지고 있거나 어려운 계산을 실행한다면, 이는 애플리케이션을 사용하기 위해 신뢰해야 하는 중앙화된 주체가 되며, 이는 바로 블록체인이 피하려는 것입니다. 향후 기사에서는 이 문제를 해결하기 위해 [영지식 증명](/zero-knowledge-proofs)을 사용하는 방법을 보여드릴 계획입니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).
